import WebSocket from "isomorphic-ws";
import Long from "long";

import { OptionalUndefined, toT } from "@src/utilities/messages";
import type {
    ExchangeRequest,
    ExchangeResponse,
    ExchangeResponse_Exchange,
    InstrumentReferenceRequest,
    InstrumentReferenceResponse,
    InstrumentRequest,
    SubscriptionRequest,
    SubscriptionRequest_Request,
    SubscriptionType,
} from "@gen/openfeed_api";
import { Result } from "@gen/openfeed_api";
import type { InstrumentDefinition } from "@gen/openfeed_instrument";
import type { Service } from "@gen/openfeed";
import { ResolutionSource } from "@src/utilities/async";
import { receive, send } from "@src/utilities/communication";
import { CorrelationId } from "@src/utilities/correlation_id";
import { TIME } from "@src/utilities/constants";
import { IOpenFeedConnection, IOpenFeedLogger, OpenFeedInstrumentReferenceRequest, OpenFeedInstrumentRequest } from "./interfaces";
import { OpenFeedListeners } from "./listeners";
import { DuplicateLoginError, ConnectionDisposedError } from "./errors";

export class OpenFeedConnection implements IOpenFeedConnection {
    private readonly subscriptionRequests: Map<string, [SubscriptionRequest, ResolutionSource<void>]> = new Map();
    private readonly exchangeRequests: Map<string, ResolutionSource<ExchangeResponse>> = new Map();
    private readonly instrumentRequests: Map<string, ResolutionSource<InstrumentDefinition[]>> = new Map();
    private readonly definitionsInFlight: Map<string, InstrumentDefinition[]> = new Map();
    private readonly instrumentReferenceRequests: Map<string, ResolutionSource<InstrumentReferenceResponse>> = new Map();

    private readonly whenDisconnectedSource = new ResolutionSource<void>();

    constructor(
        private readonly connectionToken: string,
        private readonly socket: WebSocket,
        private readonly listeners: OpenFeedListeners,
        private readonly logger?: IOpenFeedLogger
    ) {
        this.socket.onmessage = this.onMessage;
        this.socket.onerror = this.onError;
        this.socket.onclose = this.onClose;

        this.runConnectionWatchLoop();
    }

    private messageTriggered = false;
    private runConnectionWatchLoop = async () => {
        for (;;) {
            let timeoutId = null;

            const waitPromise = new Promise((resolve) => {
                timeoutId = setTimeout(resolve, TIME.CONNECTION_TIMEOUT + Math.floor(Math.random() * TIME.RECONNECT_RANDOMIZE));
            });

            try {
                // eslint-disable-next-line no-await-in-loop
                await Promise.race([waitPromise, this.whenDisconnectedSource.whenCompleted]);
            } catch {
                // This does not need to do anything
            }
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            if (this.whenDisconnectedSource.completed) {
                break;
            }

            if (!this.messageTriggered) {
                this.logger?.warn("Connection silent, disconnecting");
                this.disconnect(new Error("Socket closed: Connection silent"));

                break;
            }

            this.messageTriggered = false;
        }
    };

    private onMessage = (event: WebSocket.MessageEvent) => {
        try {
            this.messageTriggered = true;

            const messages = receive(event);

            for (const message of messages) {
                if (message.heartBeat) {
                    this.listeners.onHeartBeat(message.heartBeat);
                    continue;
                }

                if (message.logoutResponse?.status?.result === Result.DUPLICATE_LOGIN) {
                    this.logger?.warn("Duplicate login");
                    this.disconnect(new DuplicateLoginError("Duplicate login"));
                    return;
                }

                if (message.instrumentResponse) {
                    const { correlationId, instrumentDefinition, numberOfDefinitions } = message.instrumentResponse;
                    const idString = correlationId.toString();
                    const request = this.instrumentRequests.get(idString);
                    if (!request) throw new Error(`Instrument request ID ${idString} not found`);
                    if (!instrumentDefinition) throw new Error(`Instrument definition not found in response ID ${idString}`);
                    let definitions = this.definitionsInFlight.get(idString);
                    if (!definitions) {
                        definitions = [instrumentDefinition];
                    } else {
                        definitions.push(instrumentDefinition);
                    }
                    if (definitions.length === numberOfDefinitions) {
                        this.definitionsInFlight.delete(idString);
                        request.resolve(definitions);
                    } else {
                        this.definitionsInFlight.set(idString, definitions);
                    }
                    continue;
                }

                if (message.instrumentReferenceResponse) {
                    const { correlationId } = message.instrumentReferenceResponse;
                    const request = this.instrumentReferenceRequests.get(correlationId.toString());
                    if (!request) throw new Error(`Exchange request ID ${correlationId} not found`);
                    request.resolve(message.instrumentReferenceResponse);
                    continue;
                }

                if (message.exchangeResponse) {
                    const { correlationId } = message.exchangeResponse;
                    const request = this.exchangeRequests.get(correlationId.toString());
                    if (!request) throw new Error(`Exchange request ID ${correlationId} not found`);
                    request.resolve(message.exchangeResponse);
                    continue;
                }

                if (message.subscriptionResponse) {
                    const { correlationId, unsubscribe } = message.subscriptionResponse;
                    if (!unsubscribe) {
                        const request = this.subscriptionRequests.get(correlationId.toString());
                        if (!request) throw new Error(`Subscription response ID ${correlationId} not found`);
                        const [, sub] = request;
                        sub.resolve();
                    }
                }

                this.listeners.onMessage(message);
            }
        } catch (error) {
            this.logger?.error(error);
        }
    };

    private disconnect(error: Error) {
        this.socket.onmessage = () => {};
        this.socket.onerror = () => {};
        this.socket.onclose = () => {};

        const cleanRequests = <T>(requests: Map<string, ResolutionSource<T>>) => {
            for (const [, request] of requests) {
                request.reject(error);
            }
        };

        cleanRequests(this.exchangeRequests);
        cleanRequests(this.instrumentRequests);
        cleanRequests(this.instrumentReferenceRequests);

        // This takes a while to actually fire a close event. that's why  we'll clear this connection and exit
        this.socket.close(1000, error.message);
        this.whenDisconnectedSource.reject(error);
    }

    private onError = (error: WebSocket.ErrorEvent) => {
        this.logger?.warn(`Socket error: ${error.message}`);
        this.disconnect(new Error(`Socket error: ${error.message}`));
    };

    private onClose = (event: WebSocket.CloseEvent) => {
        this.logger?.warn(`Socket closed: ${event.reason}`);
        this.disconnect(new Error(`Socket closed: ${event.reason}`));
    };

    subscribe = (
        service: Service,
        subscriptionType: SubscriptionType,
        snapshotIntervalSeconds: number,
        symbols: string[] | null = null,
        marketIds: Long[] | null = null,
        exchanges: string[] | null = null,
        channels: number[] | null = null
    ) => {
        if (this.whenDisconnectedSource.completed) {
            throw new ConnectionDisposedError("This connection was closed");
        }
        const correlationId = CorrelationId.create();

        const requests: OptionalUndefined<SubscriptionRequest_Request>[] = [];

        const common: Omit<SubscriptionRequest_Request, "symbols" | "marketId" | "exchange" | "channelId"> = {
            subscriptionType: [subscriptionType],
            snapshotIntervalSeconds,
            instrumentType: [],
            bulkSubscriptionFilter: [],
            spreadTypeFilter: [],
            subscriptionDoNotSendInstruments: false,
            subscriptionDoNotSendSnapshots: false,
        };

        if (symbols) {
            for (const symbol of symbols) {
                const req: OptionalUndefined<SubscriptionRequest_Request> = {
                    symbol,
                    ...common,
                };
                requests.push(req);
            }
        }
        if (marketIds) {
            for (const marketId of marketIds) {
                const req: OptionalUndefined<SubscriptionRequest_Request> = {
                    marketId,
                    ...common,
                };
                requests.push(req);
            }
        }
        if (exchanges) {
            for (const exchange of exchanges) {
                const req: OptionalUndefined<SubscriptionRequest_Request> = {
                    exchange,
                    ...common,
                };
                requests.push(req);
            }
        }
        if (channels) {
            for (const channelId of channels) {
                const req: OptionalUndefined<SubscriptionRequest_Request> = {
                    channelId,
                    ...common,
                };
                requests.push(req);
            }
        }

        const subscriptionRequest: OptionalUndefined<SubscriptionRequest> = {
            service,
            correlationId,
            token: this.connectionToken,
            requests: requests.map((r) => toT(r)),
            unsubscribe: false,
        };

        const source = new ResolutionSource<void>();
        this.subscriptionRequests.set(correlationId.toString(), [subscriptionRequest, source]);
        send(this.socket, { subscriptionRequest });
        return correlationId;
    };

    unsubscribe = (subscriptionId: Long) => {
        if (this.whenDisconnectedSource.completed) {
            throw new ConnectionDisposedError("This connection was closed");
        }

        const subscription = this.subscriptionRequests.get(subscriptionId.toString());
        if (!subscription) {
            throw new Error(`Subscription ID ${subscriptionId} does not exist.`);
        }
        const [originalRequest, sub] = subscription;

        // We won't wait for this to complete to keep things quicker, but we need to keep an eye on it
        this.fireUnsubscribeWhenReady(originalRequest, sub);
    };

    // We are keeping this fire and forget, because our problems
    // would be caused by disconnection, and reconnect will clean up the rest
    private async fireUnsubscribeWhenReady(originalRequest: SubscriptionRequest, sub: ResolutionSource<void>) {
        try {
            await sub.whenCompleted;
            // the response message will cause symbol to be removed in listeners
            const subscriptionRequest = { ...originalRequest, unsubscribe: true };
            send(this.socket, { subscriptionRequest });
        } catch (e) {
            // This is expected
        } finally {
            this.subscriptionRequests.delete(originalRequest.correlationId.toString());
        }
    }

    getExchanges = async (): Promise<ExchangeResponse_Exchange[]> => {
        if (this.whenDisconnectedSource.completed) {
            throw new ConnectionDisposedError("This connection was closed");
        }
        const correlationId = CorrelationId.create();
        const source = new ResolutionSource<ExchangeResponse>();

        this.exchangeRequests.set(correlationId.toString(), source);
        try {
            const exchangeRequest: ExchangeRequest = {
                correlationId,
                token: this.connectionToken,
            };

            send(this.socket, { exchangeRequest });
            const result = await source.whenCompleted;
            return result.exchanges;
        } catch (error) {
            this.logger?.error(error);
            throw error;
        } finally {
            this.exchangeRequests.delete(correlationId.toString());
        }
    };

    getInstrument = async (request: OpenFeedInstrumentRequest): Promise<InstrumentDefinition[]> => {
        if (this.whenDisconnectedSource.completed) {
            throw new ConnectionDisposedError("This connection was closed");
        }
        const correlationId = CorrelationId.create();
        const source = new ResolutionSource<InstrumentDefinition[]>();

        this.instrumentRequests.set(correlationId.toString(), source);
        try {
            const instrumentRequest = toT<InstrumentRequest>({
                ...request,
                correlationId,
                token: this.connectionToken,
                version: 1,
            });

            send(this.socket, { instrumentRequest });
            const result = await source.whenCompleted;
            return result;
        } catch (error) {
            this.logger?.error(error);
            throw error;
        } finally {
            this.instrumentRequests.delete(correlationId.toString());
        }
    };

    getInstrumentReference = async (request: OpenFeedInstrumentReferenceRequest): Promise<InstrumentReferenceResponse> => {
        if (this.whenDisconnectedSource.completed) {
            throw new ConnectionDisposedError("This connection was closed");
        }
        const correlationId = CorrelationId.create();
        const source = new ResolutionSource<InstrumentReferenceResponse>();

        this.instrumentReferenceRequests.set(correlationId.toString(), source);

        try {
            const instrumentReferenceRequest = toT<InstrumentReferenceRequest>({ ...request, correlationId, token: this.connectionToken });

            send(this.socket, { instrumentReferenceRequest });
            const result = await source.whenCompleted;
            return result;
        } catch (error) {
            this.logger?.error(error);
            throw error;
        } finally {
            this.instrumentRequests.delete(correlationId.toString());
        }
    };

    whenDisconnected = () => this.whenDisconnectedSource.whenCompleted;
    dispose = () => this.disconnect(new ConnectionDisposedError("Disposed"));
}
