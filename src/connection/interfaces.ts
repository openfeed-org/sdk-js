import Long from "long";

import type { Service } from "@gen/openfeed";
import type {
    ExchangeResponse_Exchange,
    InstrumentReferenceRequest,
    InstrumentReferenceResponse,
    InstrumentRequest,
    OpenfeedGatewayRequest,
    SubscriptionType,
} from "@gen/openfeed_api";
import { OptionalUndefined } from "@src/utilities/messages";
import type { InstrumentDefinition } from "@gen/openfeed_instrument";

export type OpenFeedInstrumentRequest = Omit<OptionalUndefined<InstrumentRequest>, "correlationId" | "token" | "version">;
export type OpenFeedInstrumentReferenceRequest = Omit<OptionalUndefined<InstrumentReferenceRequest>, "correlationId" | "token">;

type OmitDistributive<T, K extends PropertyKey> = T extends unknown ? (T extends object ? Id<Omit<T, K>> : T) : never;
// Cosmetic only: makes tooltips expand the type, can be removed
type Id<T> = {} & { [P in keyof T]: T[P] };
type OmitRecursively<T, K extends PropertyKey> = { [P in keyof T]: OmitDistributive<T[P], K> };

type SendableRequests = OmitRecursively<Required<Omit<OpenfeedGatewayRequest, "loginRequest" | "logoutRequest">>, "correlationId" | "token">;

/**
 * What `send` takes: exactly one of the gateway request's kinds, other than login and logout, without the correlation id
 * and token it fills in. `{}`, or two kinds at once, doesn't type-check.
 */
export type OpenfeedRequest = {
    [K in keyof SendableRequests]: { [P in K]: SendableRequests[P] } & { [P in Exclude<keyof SendableRequests, K>]?: never };
}[keyof SendableRequests];

export interface IOpenFeedConnection {
    subscribe: (
        service: Service,
        subscriptionType: SubscriptionType,
        snapshotIntervalSeconds: number,
        symbols: string[] | null,
        marketIds: Long[] | null,
        exchanges: string[] | null,
        channels: number[] | null
    ) => Long;
    unsubscribe: (subscriptionId: Long) => void;
    whenDisconnected: () => Promise<void>;
    getExchanges: () => Promise<ExchangeResponse_Exchange[]>;
    getInstrument: (request: OpenFeedInstrumentRequest) => Promise<InstrumentDefinition[]>;
    getInstrumentReference: (request: OpenFeedInstrumentReferenceRequest) => Promise<InstrumentReferenceResponse>;

    send(msg: OpenfeedRequest, correlationId?: Long): Long;
}

export interface IOpenFeedClient {
    get connection(): Promise<IOpenFeedConnection>;

    subscribe: (
        service: Service,
        subscriptionType: SubscriptionType,
        snapshotIntervalSeconds: number,
        symbols: string[] | null,
        marketIds: Long[] | null,
        exchanges: string[] | null,
        channels: number[] | null
    ) => Long;
    unsubscribe: (subscriptionId: Long) => void;
    dispose: () => void;
}

export interface IOpenFeedLogger {
    log: (...data: unknown[]) => void;
    warn: (...data: unknown[]) => void;
    error: (...data: unknown[]) => void;
}
