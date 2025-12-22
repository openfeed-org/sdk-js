import WebSocket from "isomorphic-ws";
import Long from "long";

import { OptionalUndefined } from "@src/utilities/messages";
import type { SubscriptionType, OpenfeedGatewayRequest } from "@gen/openfeed_api";
import { Result } from "@gen/openfeed_api";
import type { Service } from "@gen/openfeed";
import { ResolutionSource } from "@src/utilities/async";
import { CorrelationId } from "@src/utilities/correlation_id";
import { OpenFeedConnection } from "@src/connection/connection";
import { receive, send } from "@src/utilities/communication";
import { getClientVersion } from "@src/utilities/client_version";
import { TIME } from "@src/utilities/constants";
import { IOpenFeedClient, IOpenFeedConnection, IOpenFeedLogger } from "./interfaces";
import { OpenFeedListeners } from "./listeners";
import { ConnectionDisposedError, DuplicateLoginError, InvalidCredentialsError } from "./errors";

export class OpenFeedClient implements IOpenFeedClient {
    private socket: WebSocket | null = null;
    private _connection: OpenFeedConnection | null = null;

    // We are going to throw errors internally, outside needs to know only when disposed
    private whenConnectedInternalSource = new ResolutionSource<OpenFeedConnection>();
    private whenConnectedSource = new ResolutionSource<IOpenFeedConnection>();
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

    private onOpen = async () => {
        if (!this.socket) return;

        const clientVersion = await getClientVersion(this.clientId);
        const loginRequest: OptionalUndefined<OpenfeedGatewayRequest> = {
            loginRequest: {
                correlationId: CorrelationId.create(),
                username: this.username,
                password: this.password,
                clientVersion,
                protocolVersion: 1,
                jwt: "",
            },
        };
        send(this.socket, loginRequest);
    };

    private onMessage = async (event: WebSocket.MessageEvent) => {
        const [message] = receive(event);
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
                await this.listeners.onCleanup();
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
                this.logger?.error("Error when connecting to socket:", e);
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
                    /* eslint-disable no-await-in-loop */
                    await this.listeners.onCleanup();
                    await this.listeners.onDisconnected();
                    /* eslint-enable no-await-in-loop */
                    this.cleanUp();
                    break;
                }
            }

            this._connection = null;
            if (this.whenConnectedInternalSource.completed) {
                this.whenConnectedInternalSource = new ResolutionSource<OpenFeedConnection>();
            }
            if (this.whenConnectedSource.completed) {
                this.whenConnectedSource = new ResolutionSource<IOpenFeedConnection>();
            }
            this.loopResetSource = new ResolutionSource<void>();
            this.subscribeResetSource.resolve();
            this.subscribeResetSource = new ResolutionSource<void>();

            // eslint-disable-next-line no-await-in-loop
            await new Promise((resolve) => {
                setTimeout(resolve, TIME.RECONNECT);
            });
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
            try {
                // race will trigger even if rejected
                // eslint-disable-next-line no-await-in-loop
                const connection = await Promise.race([this.connection, cancelSource.whenCompleted]);
                if (cancelSource.completed || /* can't actually happen */ !connection) {
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
                    setTimeout(resolve, TIME.SUBSCRIPTION_RETRY);
                });
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
