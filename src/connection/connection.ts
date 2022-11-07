import WebSocket from "isomorphic-ws";
import Long from "long";
import platform from "platform";

import { OptionalUndefined, toT } from "@src/utilities/messages";
import {
    ExchangeRequest,
    ExchangeResponse,
    ExchangeResponse_Exchange,
    InstrumentReferenceRequest,
    InstrumentReferenceResponse,
    InstrumentRequest,
    InstrumentResponse,
    OpenfeedGatewayMessage,
    OpenfeedGatewayRequest,
    Result,
    SubscriptionRequest,
    SubscriptionRequest_Request,
    SubscriptionType,
} from "@gen/openfeed_api";
import { Service } from "@gen/openfeed";
import { ResolutionSource } from "@src/utilities/async";
import { version } from "@gen/version";
import {
    IOpenFeedClient,
    IOpenFeedConnection,
    IOpenFeedLogger,
    OpenFeedInstrumentReferenceRequest,
    OpenFeedInstrumentRequest,
} from "./connection_interfaces";
import { OpenFeedListeners } from "./listeners";

const send = (socket: WebSocket, message: OptionalUndefined<OpenfeedGatewayRequest>) => {
    socket.send(OpenfeedGatewayRequest.encode(toT(message)).finish());
};

const receive = (msgEvent: WebSocket.MessageEvent): OpenfeedGatewayMessage => {
    return OpenfeedGatewayMessage.decode(new Uint8Array(msgEvent.data as ArrayBuffer));
};

class CorrelationId {
    private static correlationId = Long.fromNumber(-1);

    public static create = () => this.correlationId.add(1);
}

class DuplicateLoginError extends Error {
    public get name() {
        return this.constructor.name;
    }
}

class InvalidCredentialsError extends Error {
    public get name() {
        return this.constructor.name;
    }
}

class ConnectionDisposedError extends Error {
    public get name() {
        return this.constructor.name;
    }
}

class OpenFeedConnection implements IOpenFeedConnection {
    private readonly subscriptions: Map<string, SubscriptionRequest> = new Map<string, SubscriptionRequest>();
    private readonly exchangeRequests: Map<string, ResolutionSource<ExchangeResponse>> = new Map<string, ResolutionSource<ExchangeResponse>>();
    private readonly instrumentRequests: Map<string, ResolutionSource<InstrumentResponse>> = new Map<string, ResolutionSource<InstrumentResponse>>();
    private readonly instrumentReferenceRequests: Map<string, ResolutionSource<InstrumentReferenceResponse>> = new Map<
        string,
        ResolutionSource<InstrumentReferenceResponse>
    >();

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
                timeoutId = setTimeout(resolve, 15_000);
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

    private onMessage = async (event: WebSocket.MessageEvent) => {
        try {
            this.messageTriggered = true;

            const message = receive(event);
            if (message.heartBeat) {
                return;
            }

            if (message.logoutResponse?.status?.result === Result.DUPLICATE_LOGIN) {
                this.logger?.warn("Duplicate login");
                this.disconnect(new DuplicateLoginError("Duplicate login"));
                return;
            }

            if (message.instrumentResponse) {
                const { correlationId } = message.instrumentResponse;
                const request = this.instrumentRequests.get(correlationId.toString());
                if (!request) throw new Error(`Instrument request ID ${correlationId} not found`);
                request.resolve(message.instrumentResponse);
                return;
            }

            if (message.instrumentReferenceResponse) {
                const { correlationId } = message.instrumentReferenceResponse;
                const request = this.instrumentReferenceRequests.get(correlationId.toString());
                if (!request) throw new Error(`Exchange request ID ${correlationId} not found`);
                request.resolve(message.instrumentReferenceResponse);
                return;
            }

            if (message.exchangeResponse) {
                const { correlationId } = message.exchangeResponse;
                const request = this.exchangeRequests.get(correlationId.toString());
                if (!request) throw new Error(`Exchange request ID ${correlationId} not found`);
                request.resolve(message.exchangeResponse);
                return;
            }

            await this.listeners.onMessage(message);
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

        const common = {
            subscriptionType: [subscriptionType],
            snapshotIntervalSeconds,
            instrumentType: [],
            bulkSubscriptionFilter: [],
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

        this.subscriptions.set(correlationId.toString(), subscriptionRequest);
        send(this.socket, { subscriptionRequest });
        return correlationId;
    };

    unsubscribe = (subscriptionId: Long) => {
        if (this.whenDisconnectedSource.completed) {
            throw new ConnectionDisposedError("This connection was closed");
        }

        const subscription = this.subscriptions.get(subscriptionId.toString());
        if (!subscription) {
            throw new Error(`Subscription ID ${subscriptionId} does not exist.`);
        }
        const subscriptionRequest = { ...subscription, unsubscribe: true };
        send(this.socket, { subscriptionRequest });

        this.subscriptions.delete(subscriptionId.toString());
    };

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

    getInstrument = async (request: OpenFeedInstrumentRequest): Promise<InstrumentResponse> => {
        if (this.whenDisconnectedSource.completed) {
            throw new ConnectionDisposedError("This connection was closed");
        }
        const correlationId = CorrelationId.create();
        const source = new ResolutionSource<InstrumentResponse>();

        this.instrumentRequests.set(correlationId.toString(), source);
        try {
            const instrumentRequest = toT<InstrumentRequest>({ ...request, correlationId, token: this.connectionToken });

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

export class OpenFeedClient implements IOpenFeedClient {
    private socket: WebSocket | null = null;
    private _connection: OpenFeedConnection | null = null;

    // We are going to throw errors internally, outside needs to know only when disposed
    private whenConnectedInternalSource = new ResolutionSource<OpenFeedConnection>();
    private whenConnectedSource = new ResolutionSource<OpenFeedConnection>();
    private loopResetSource = new ResolutionSource<void>();
    private subscribeResetSource = new ResolutionSource<void>();

    private readonly subscriptions: Map<string, ResolutionSource<void>> = new Map<string, ResolutionSource<void>>();

    constructor(
        private readonly url: string,
        private readonly username: string,
        private readonly password: string,
        private readonly listeners: OpenFeedListeners,
        private readonly logger?: IOpenFeedLogger,
        private readonly clientId?: string
    ) {
        this.runConnectLoop();
    }

    private onOpen = () => {
        if (!this.socket) return;
        const clientVersion = `sdk-js:${version};client-id:${this.clientId ?? "default"};platform:${platform.description}`;
        const loginRequest: OptionalUndefined<OpenfeedGatewayRequest> = {
            loginRequest: {
                correlationId: CorrelationId.create(),
                username: this.username,
                password: this.password,
                clientVersion,
                protocolVersion: 0,
            },
        };
        send(this.socket, loginRequest);
    };

    private onMessage = async (event: WebSocket.MessageEvent) => {
        const message = receive(event);
        if (message.loginResponse?.token && this.socket) {
            this._connection = new OpenFeedConnection(message.loginResponse?.token, this.socket, this.listeners, this.logger);
            this.whenConnectedInternalSource.resolve(this._connection);
            this.whenConnectedSource.resolve(this._connection);

            await this.listeners.onConnected(this._connection);
            // this can't be caught in subscriptions,
            // we need to be able to catch disconnects even if there are no subscribers
            try {
                await this._connection.whenDisconnected();
            } catch (e) {
                if (e instanceof DuplicateLoginError) {
                    this.logger?.warn("Received duplicate login message, disconnecting...");
                    this.loopResetSource.reject(e);
                }
                if (e instanceof ConnectionDisposedError) {
                    this.logger?.warn("Disposing...");
                    this.loopResetSource.reject(e);
                }
            } finally {
                await this.listeners.onDisconnected();
                this.loopResetSource.resolve();
            }
        } else if (
            [Result.INSUFFICIENT_PRIVILEGES, Result.INVALID_CREDENTIALS, Result.AUTHENTICATION_REQUIRED].includes(
                message.loginResponse?.status?.result ?? Result.SUCCESS
            )
        ) {
            this.logger?.warn("Received authentication error, disconnecting...");
            this.whenConnectedInternalSource.reject(
                new InvalidCredentialsError("Invalid credentials provided. Please update credentials and try again.")
            );
        }
    };

    private onError = (error: WebSocket.ErrorEvent) => {
        this.logger?.log(`Socket error: ${error.message}`);
        if (!this.whenConnectedInternalSource.completed) {
            this.whenConnectedInternalSource.reject(new Error(`Error when connecting to socket: ${error.message}`));
        }
    };

    private onClose = (event: WebSocket.CloseEvent) => {
        this.logger?.log(`Socket closed: ${event.reason}`);
        if (!this.whenConnectedInternalSource.completed) {
            this.whenConnectedInternalSource.reject(new Error(`Socket closed: ${event.reason}`));
        }
    };

    private runConnectLoop = async () => {
        for (;;) {
            let timeoutId = null;

            if (this.socket) {
                // It's expected to have a closing state when bad connection happens
                if (this.socket.readyState !== WebSocket.CLOSED && this.socket.readyState !== WebSocket.CLOSING) {
                    this.socket.close(1000, "Closed from socket loop");
                }
                this.socket = null;
            }

            try {
                this.socket = new WebSocket(this.url);
                this.socket.binaryType = "arraybuffer";

                this.socket.onopen = this.onOpen;
                // We will override the 3 below in the connection and it will be the new listener
                this.socket.onmessage = this.onMessage;
                this.socket.onerror = this.onError;
                this.socket.onclose = this.onClose;

                // eslint-disable-next-line no-await-in-loop
                await this.whenConnectedInternalSource.whenCompleted;

                // eslint-disable-next-line no-await-in-loop
                await this.loopResetSource.whenCompleted;
            } catch (e) {
                const socket = this.socket!;
                // these will fire, even though the connection error means we should be already disconnected
                socket.onerror = () => {};
                socket.onclose = () => {};
                socket.onopen = () => {};

                if (socket.readyState !== WebSocket.CLOSED && socket.readyState !== WebSocket.CLOSING) {
                    socket.close(1000, "Socket closed");
                }

                if (e instanceof DuplicateLoginError || e instanceof InvalidCredentialsError) {
                    this.logger?.warn("Stopping the client because of unrecoverable error");
                    // eslint-disable-next-line no-await-in-loop
                    await this.listeners.onCredentialsRejected();
                    this.cleanUp();
                    break;
                }

                if (e instanceof ConnectionDisposedError) {
                    this.logger?.warn("Stopping the client because of disposal");
                    // eslint-disable-next-line no-await-in-loop
                    await this.listeners.onDisconnected();
                    this.cleanUp();
                    break;
                }
            }

            this._connection = null;
            if (this.whenConnectedInternalSource.completed) {
                this.whenConnectedInternalSource = new ResolutionSource<OpenFeedConnection>();
            }
            if (this.whenConnectedSource.completed) {
                this.whenConnectedSource = new ResolutionSource<OpenFeedConnection>();
            }
            this.loopResetSource = new ResolutionSource<void>();
            this.subscribeResetSource.resolve();
            this.subscribeResetSource = new ResolutionSource<void>();

            try {
                // eslint-disable-next-line no-await-in-loop
                await new Promise((resolve) => {
                    timeoutId = setTimeout(resolve, 5_000);
                });
            } finally {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            }
        }
    };

    private cleanUp = () => {
        for (const [, sub] of this.subscriptions) {
            sub.resolve();
        }
        this.subscriptions.clear();
        this.whenConnectedSource.reject(new Error("Connection disposed"));
    };

    private runSubscribeLoop = async (
        service: Service,
        subscriptionType: SubscriptionType,
        snapshotIntervalSeconds: number,
        symbols: string[] | null,
        marketIds: Long[] | null,
        exchanges: string[] | null,
        channels: number[] | null,
        cancelSource: ResolutionSource<void>
    ) => {
        for (;;) {
            // This is for cross-environment compatibility
            let timeoutId: any = null;
            try {
                // race will trigger even if rejected
                // eslint-disable-next-line no-await-in-loop
                const connection = await Promise.race([this.connection, cancelSource.whenCompleted]);
                if (cancelSource.completed || /* can't actually happen */ !(connection instanceof OpenFeedConnection)) {
                    return;
                }

                const subscriptionId = connection.subscribe(
                    service,
                    subscriptionType,
                    snapshotIntervalSeconds,
                    symbols,
                    marketIds,
                    exchanges,
                    channels
                );

                // eslint-disable-next-line no-await-in-loop
                await Promise.race([this.subscribeResetSource.whenCompleted, cancelSource.whenCompleted]);

                if (cancelSource.completed) {
                    try {
                        connection.unsubscribe(subscriptionId);
                    } catch (e) {
                        // unsubscribe throws if the connection is not available, this is expected
                    }
                    return;
                }
            } catch (error) {
                this.logger?.warn("Subscription error:", error);
                // eslint-disable-next-line no-await-in-loop
                await new Promise((resolve) => {
                    timeoutId = setTimeout(resolve, 100);
                });
            } finally {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            }
        }
    };

    public subscribe = (
        service: Service,
        subscriptionType: SubscriptionType,
        snapshotIntervalSeconds: number,
        symbols: string[] | null = null,
        marketIds: Long[] | null = null,
        exchanges: string[] | null = null,
        channels: number[] | null = null
    ) => {
        const id = CorrelationId.create();

        const cancelSource = new ResolutionSource<void>();
        this.subscriptions.set(id.toString(), cancelSource);

        this.runSubscribeLoop(service, subscriptionType, snapshotIntervalSeconds, symbols, marketIds, exchanges, channels, cancelSource);

        return id;
    };

    public unsubscribe = (subscriptionId: Long) => {
        const cancelSource = this.subscriptions.get(subscriptionId.toString());
        if (!cancelSource) {
            throw new Error(`Subscription ID ${subscriptionId} does not exist.`);
        }

        this.subscriptions.delete(subscriptionId.toString());
        cancelSource.resolve();
    };

    public get connection() {
        if (this._connection) return Promise.resolve(this._connection);
        if (this.whenConnectedSource.completed) {
            throw new ConnectionDisposedError("Connection disposed");
        }
        return this.whenConnectedSource.whenCompleted;
    }

    public dispose = () => {
        if (this._connection) {
            this._connection.dispose();
        } else {
            this.whenConnectedInternalSource.reject(new ConnectionDisposedError("Connection disposed"));
        }
    };
}
