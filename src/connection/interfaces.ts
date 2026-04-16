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

type OmitDistributive<T, K extends PropertyKey> = T extends any ? (T extends object ? Id<Omit<T, K>> : T) : never;
type Id<T> = {} & { [P in keyof T] : T[P]} // Cosmetic use only makes the tooltips expad the type can be removed 
type OmitRecursively<T, K extends PropertyKey> = { [P in keyof T]: OmitDistributive<T[P], K> }

export type OpenfeedRequest = OmitRecursively<Omit<OpenfeedGatewayRequest, "loginRequest" | "logoutRequest">, "correlationId" | "token">;

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
    log: (...data: any[]) => void;
    warn: (...data: any[]) => void;
    error: (...data: any[]) => void;
}
