import Long from "long";
import _m0 from "protobufjs/minimal";
import { HeartBeat, InstrumentAction, MarketSnapshot, MarketStatus, MarketUpdate, Ohlc, Service, VolumeAtPrice } from "./openfeed";
import { InstrumentDefinition, InstrumentDefinition_InstrumentType } from "./openfeed_instrument";
export declare const protobufPackage = "org.openfeed";
export declare enum Result {
    UNKNOWN_RESULT = 0,
    SUCCESS = 1,
    DUPLICATE_LOGIN = 115,
    INVALID_SYMBOL = 116,
    INVALID_MARKET_ID = 117,
    INVALID_EXCHANGE = 118,
    INVALID_CHANNEL_ID = 119,
    MALFORMED_MESSAGE = 120,
    UNEXPECTED_MESSAGE = 121,
    NOT_SUBSCRIBED = 122,
    DUPLICATE_SUBSCRIPTION = 123,
    INVALID_CREDENTIALS = 124,
    INSUFFICIENT_PRIVILEGES = 125,
    AUTHENTICATION_REQUIRED = 126,
    GENERIC_FAILURE = 127,
    UNRECOGNIZED = -1
}
export declare function resultFromJSON(object: any): Result;
export declare function resultToJSON(object: Result): string;
export declare enum SubscriptionType {
    ALL = 0,
    QUOTE = 1,
    QUOTE_PARTICIPANT = 2,
    DEPTH_PRICE = 3,
    DEPTH_ORDER = 4,
    TRADES = 5,
    CUMLATIVE_VOLUME = 6,
    OHLC = 7,
    OHLC_NON_REGULAR = 8,
    UNRECOGNIZED = -1
}
export declare function subscriptionTypeFromJSON(object: any): SubscriptionType;
export declare function subscriptionTypeToJSON(object: SubscriptionType): string;
/** / Symbol type for the subscription filter. */
export declare enum SymbolType {
    BARCHART = 0,
    EXCHANGE = 1,
    UNRECOGNIZED = -1
}
export declare function symbolTypeFromJSON(object: any): SymbolType;
export declare function symbolTypeToJSON(object: SymbolType): string;
/** / Openfeed Server request */
export interface OpenfeedGatewayRequest {
    loginRequest: LoginRequest | undefined;
    logoutRequest: LogoutRequest | undefined;
    subscriptionRequest: SubscriptionRequest | undefined;
    instrumentRequest: InstrumentRequest | undefined;
    instrumentReferenceRequest: InstrumentReferenceRequest | undefined;
    exchangeRequest: ExchangeRequest | undefined;
}
/** / Openfeed Server Response */
export interface OpenfeedGatewayMessage {
    loginResponse: LoginResponse | undefined;
    logoutResponse: LogoutResponse | undefined;
    instrumentResponse: InstrumentResponse | undefined;
    instrumentReferenceResponse: InstrumentReferenceResponse | undefined;
    subscriptionResponse: SubscriptionResponse | undefined;
    marketStatus: MarketStatus | undefined;
    heartBeat: HeartBeat | undefined;
    instrumentDefinition: InstrumentDefinition | undefined;
    marketSnapshot: MarketSnapshot | undefined;
    marketUpdate: MarketUpdate | undefined;
    volumeAtPrice: VolumeAtPrice | undefined;
    ohlc: Ohlc | undefined;
    exchangeResponse: ExchangeResponse | undefined;
    instrumentAction: InstrumentAction | undefined;
}
/**
 * //////////////////
 * Serivce Messages
 * /////////////////
 */
export interface Status {
    result: Result;
    message: string;
    service: Service;
}
/** / Login */
export interface LoginRequest {
    correlationId: Long;
    username: string;
    password: string;
    clientVersion: string;
    protocolVersion: number;
}
export interface LoginResponse {
    correlationId: Long;
    status: Status | undefined;
    token: string;
}
/** / Logout */
export interface LogoutRequest {
    correlationId: Long;
    token: string;
}
export interface LogoutResponse {
    correlationId: Long;
    status: Status | undefined;
}
/** / Instrument Definition(s), will stream InstrumentDefinition(s) */
export interface InstrumentRequest {
    correlationId: Long;
    token: string;
    symbol: string | undefined;
    marketId: Long | undefined;
    exchange: string | undefined;
    channelId: number | undefined;
}
export interface InstrumentResponse {
    correlationId: Long;
    status: Status | undefined;
    numberOfDefinitions: number;
    /**  */
    symbol: string;
    marketId: Long;
    exchange: string;
    channelId: number;
}
/** / Instrument References, returns InstrumentReferenceResponse(s) */
export interface InstrumentReferenceRequest {
    correlationId: Long;
    token: string;
    symbol: string | undefined;
    marketId: Long | undefined;
    exchange: string | undefined;
    channelId: number | undefined;
}
export interface InstrumentReferenceResponse {
    correlationId: Long;
    status: Status | undefined;
    numberOfDefinitions: number;
    /**  */
    channelId: number;
    marketId: Long;
    symbol: string;
    exchange: string;
    ddfSymbol: string;
    ddfExchange: string;
    ddfBaseCode: string;
    exchangeSymbol: string;
}
/** / Exchange Request, returns ExchangeResponse.  Gives available exchanges. */
export interface ExchangeRequest {
    correlationId: Long;
    token: string;
}
export interface ExchangeResponse {
    correlationId: Long;
    status: Status | undefined;
    exchanges: ExchangeResponse_Exchange[];
}
export interface ExchangeResponse_Exchange {
    code: string;
    description: string;
    aliases: string[];
}
/** / Bulk subscription filter. */
export interface BulkSubscriptionFilter {
    /** / Type of the symbol: Barchart of Exchange. Barchart is the default. */
    symbolType: SymbolType;
    /** / regular expression pattern for the symbol */
    symbolPattern: string;
}
/** / Subscription Request */
export interface SubscriptionRequest {
    /** / Client-assigned id for this request.  Response will include same id */
    correlationId: Long;
    token: string;
    /** / Preferred service (realtime or delayed). */
    service: Service;
    unsubscribe: boolean;
    requests: SubscriptionRequest_Request[];
}
export interface SubscriptionRequest_Request {
    symbol: string | undefined;
    marketId: Long | undefined;
    exchange: string | undefined;
    channelId: number | undefined;
    subscriptionType: SubscriptionType[];
    /** / 0 = send only current snapshot once, else send at interval seconds */
    snapshotIntervalSeconds: number;
    /** / Spreads and Options must be explicitly requested. */
    instrumentType: InstrumentDefinition_InstrumentType[];
    /** / Filter for the exchange and channel subscriptions. */
    bulkSubscriptionFilter: BulkSubscriptionFilter[];
}
export interface SubscriptionResponse {
    correlationId: Long;
    status: Status | undefined;
    symbol: string;
    marketId: Long;
    exchange: string;
    channelId: number;
    numberOfDefinitions: number;
    subscriptionType: SubscriptionType;
    unsubscribe: boolean;
    snapshotIntervalSeconds: number;
}
export declare const OpenfeedGatewayRequest: {
    encode(message: OpenfeedGatewayRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): OpenfeedGatewayRequest;
    fromJSON(object: any): OpenfeedGatewayRequest;
    toJSON(message: OpenfeedGatewayRequest): unknown;
    fromPartial(object: DeepPartial<OpenfeedGatewayRequest>): OpenfeedGatewayRequest;
};
export declare const OpenfeedGatewayMessage: {
    encode(message: OpenfeedGatewayMessage, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): OpenfeedGatewayMessage;
    fromJSON(object: any): OpenfeedGatewayMessage;
    toJSON(message: OpenfeedGatewayMessage): unknown;
    fromPartial(object: DeepPartial<OpenfeedGatewayMessage>): OpenfeedGatewayMessage;
};
export declare const Status: {
    encode(message: Status, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Status;
    fromJSON(object: any): Status;
    toJSON(message: Status): unknown;
    fromPartial(object: DeepPartial<Status>): Status;
};
export declare const LoginRequest: {
    encode(message: LoginRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): LoginRequest;
    fromJSON(object: any): LoginRequest;
    toJSON(message: LoginRequest): unknown;
    fromPartial(object: DeepPartial<LoginRequest>): LoginRequest;
};
export declare const LoginResponse: {
    encode(message: LoginResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): LoginResponse;
    fromJSON(object: any): LoginResponse;
    toJSON(message: LoginResponse): unknown;
    fromPartial(object: DeepPartial<LoginResponse>): LoginResponse;
};
export declare const LogoutRequest: {
    encode(message: LogoutRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): LogoutRequest;
    fromJSON(object: any): LogoutRequest;
    toJSON(message: LogoutRequest): unknown;
    fromPartial(object: DeepPartial<LogoutRequest>): LogoutRequest;
};
export declare const LogoutResponse: {
    encode(message: LogoutResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): LogoutResponse;
    fromJSON(object: any): LogoutResponse;
    toJSON(message: LogoutResponse): unknown;
    fromPartial(object: DeepPartial<LogoutResponse>): LogoutResponse;
};
export declare const InstrumentRequest: {
    encode(message: InstrumentRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentRequest;
    fromJSON(object: any): InstrumentRequest;
    toJSON(message: InstrumentRequest): unknown;
    fromPartial(object: DeepPartial<InstrumentRequest>): InstrumentRequest;
};
export declare const InstrumentResponse: {
    encode(message: InstrumentResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentResponse;
    fromJSON(object: any): InstrumentResponse;
    toJSON(message: InstrumentResponse): unknown;
    fromPartial(object: DeepPartial<InstrumentResponse>): InstrumentResponse;
};
export declare const InstrumentReferenceRequest: {
    encode(message: InstrumentReferenceRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentReferenceRequest;
    fromJSON(object: any): InstrumentReferenceRequest;
    toJSON(message: InstrumentReferenceRequest): unknown;
    fromPartial(object: DeepPartial<InstrumentReferenceRequest>): InstrumentReferenceRequest;
};
export declare const InstrumentReferenceResponse: {
    encode(message: InstrumentReferenceResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentReferenceResponse;
    fromJSON(object: any): InstrumentReferenceResponse;
    toJSON(message: InstrumentReferenceResponse): unknown;
    fromPartial(object: DeepPartial<InstrumentReferenceResponse>): InstrumentReferenceResponse;
};
export declare const ExchangeRequest: {
    encode(message: ExchangeRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ExchangeRequest;
    fromJSON(object: any): ExchangeRequest;
    toJSON(message: ExchangeRequest): unknown;
    fromPartial(object: DeepPartial<ExchangeRequest>): ExchangeRequest;
};
export declare const ExchangeResponse: {
    encode(message: ExchangeResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ExchangeResponse;
    fromJSON(object: any): ExchangeResponse;
    toJSON(message: ExchangeResponse): unknown;
    fromPartial(object: DeepPartial<ExchangeResponse>): ExchangeResponse;
};
export declare const ExchangeResponse_Exchange: {
    encode(message: ExchangeResponse_Exchange, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ExchangeResponse_Exchange;
    fromJSON(object: any): ExchangeResponse_Exchange;
    toJSON(message: ExchangeResponse_Exchange): unknown;
    fromPartial(object: DeepPartial<ExchangeResponse_Exchange>): ExchangeResponse_Exchange;
};
export declare const BulkSubscriptionFilter: {
    encode(message: BulkSubscriptionFilter, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): BulkSubscriptionFilter;
    fromJSON(object: any): BulkSubscriptionFilter;
    toJSON(message: BulkSubscriptionFilter): unknown;
    fromPartial(object: DeepPartial<BulkSubscriptionFilter>): BulkSubscriptionFilter;
};
export declare const SubscriptionRequest: {
    encode(message: SubscriptionRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionRequest;
    fromJSON(object: any): SubscriptionRequest;
    toJSON(message: SubscriptionRequest): unknown;
    fromPartial(object: DeepPartial<SubscriptionRequest>): SubscriptionRequest;
};
export declare const SubscriptionRequest_Request: {
    encode(message: SubscriptionRequest_Request, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionRequest_Request;
    fromJSON(object: any): SubscriptionRequest_Request;
    toJSON(message: SubscriptionRequest_Request): unknown;
    fromPartial(object: DeepPartial<SubscriptionRequest_Request>): SubscriptionRequest_Request;
};
export declare const SubscriptionResponse: {
    encode(message: SubscriptionResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionResponse;
    fromJSON(object: any): SubscriptionResponse;
    toJSON(message: SubscriptionResponse): unknown;
    fromPartial(object: DeepPartial<SubscriptionResponse>): SubscriptionResponse;
};
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
