import Long from "long";

import { Service } from "@gen/openfeed";
import {
    ExchangeResponse_Exchange,
    InstrumentReferenceRequest,
    InstrumentReferenceResponse,
    InstrumentRequest,
    InstrumentResponse,
    SubscriptionType,
} from "@gen/openfeed_api";
import { OptionalUndefined } from "@src/utilities/messages";

export type OpenFeedInstrumentRequest = Omit<OptionalUndefined<InstrumentRequest>, "correlationId" | "token">;
export type OpenFeedInstrumentReferenceRequest = Omit<OptionalUndefined<InstrumentReferenceRequest>, "correlationId" | "token">;

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
    getInstrument: (request: OpenFeedInstrumentRequest) => Promise<InstrumentResponse>;
    getInstrumentReference: (request: OpenFeedInstrumentReferenceRequest) => Promise<InstrumentReferenceResponse>;
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
