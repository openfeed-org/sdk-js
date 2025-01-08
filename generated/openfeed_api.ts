/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { HeartBeat, HeartBeatEncode, HeartBeatDecode, InstrumentAction, InstrumentActionEncode, InstrumentActionDecode, MarketSnapshot, MarketSnapshotEncode, MarketSnapshotDecode, MarketStatus, MarketStatusEncode, MarketStatusDecode, MarketUpdate, MarketUpdateEncode, MarketUpdateDecode, Ohlc, OhlcEncode, OhlcDecode, Service, VolumeAtPrice, VolumeAtPriceEncode, VolumeAtPriceDecode } from "./openfeed";
import { InstrumentDefinition, InstrumentDefinitionEncode, InstrumentDefinitionDecode, InstrumentDefinition_InstrumentType } from "./openfeed_instrument";
export enum Result {
    UNKNOWN_RESULT = 0,
    SUCCESS = 1,
    INSTRUMENTS_NOT_FOUND = 112,
    JWT_EXPIRED = 113,
    JWT_INVALID = 114,
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
    INVALID_USERNAME = 128,
    UNRECOGNIZED = -1
}
export enum SubscriptionType {
    ALL = 0,
    QUOTE = 1,
    QUOTE_PARTICIPANT = 2,
    DEPTH_PRICE = 3,
    DEPTH_ORDER = 4,
    TRADES = 5,
    CUMULATIVE_VOLUME = 6,
    OHLC = 7,
    OHLC_NON_REGULAR = 8,
    SETTLEMENT = 9,
    UNRECOGNIZED = -1
}
/** / Symbol type for the subscription filter. */
export enum SymbolType {
    BARCHART = 0,
    EXCHANGE = 1,
    UNRECOGNIZED = -1
}
/** / Openfeed Server request */
export interface OpenfeedGatewayRequest {
    loginRequest?: LoginRequest | undefined;
    logoutRequest?: LogoutRequest | undefined;
    subscriptionRequest?: SubscriptionRequest | undefined;
    instrumentRequest?: InstrumentRequest | undefined;
    instrumentReferenceRequest?: InstrumentReferenceRequest | undefined;
    exchangeRequest?: ExchangeRequest | undefined;
    listSubscriptionsRequest?: ListSubscriptionsRequest | undefined;
}
/** / Openfeed Server Response */
export interface OpenfeedGatewayMessage {
    loginResponse?: LoginResponse | undefined;
    logoutResponse?: LogoutResponse | undefined;
    instrumentResponse?: InstrumentResponse | undefined;
    instrumentReferenceResponse?: InstrumentReferenceResponse | undefined;
    subscriptionResponse?: SubscriptionResponse | undefined;
    marketStatus?: MarketStatus | undefined;
    heartBeat?: HeartBeat | undefined;
    instrumentDefinition?: InstrumentDefinition | undefined;
    marketSnapshot?: MarketSnapshot | undefined;
    marketUpdate?: MarketUpdate | undefined;
    volumeAtPrice?: VolumeAtPrice | undefined;
    ohlc?: Ohlc | undefined;
    exchangeResponse?: ExchangeResponse | undefined;
    instrumentAction?: InstrumentAction | undefined;
    listSubscriptionsResponse?: ListSubscriptionsResponse | undefined;
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
    /** / JSON Web Token */
    jwt: string;
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
    /** / Filter on these instrument types */
    instrumentType: InstrumentDefinition_InstrumentType[];
    /** / Filter on these spread types */
    spreadType: string[];
    /** / If version >= 1 then will send InstrumentDefinition in the InstrumentResponse */
    version: number;
    symbol?: string | undefined;
    marketId?: Long | undefined;
    exchange?: string | undefined;
    channelId?: number | undefined;
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
    exchangeId: number;
    /** / Will be set if InstrumentRequest.version >= 1 */
    instrumentDefinition: InstrumentDefinition | undefined;
}
/** / Instrument References, returns InstrumentReferenceResponse(s) */
export interface InstrumentReferenceRequest {
    correlationId: Long;
    token: string;
    symbol?: string | undefined;
    marketId?: Long | undefined;
    exchange?: string | undefined;
    channelId?: number | undefined;
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
    exchangeId: number;
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
    exchangeId: number;
}
/** / Bulk subscription filter. */
export interface BulkSubscriptionFilter {
    /** / Type of the symbol: Barchart or Exchange. Barchart is the default. */
    symbolType: SymbolType;
    /** / regular expression pattern for the symbol */
    symbolPattern: string;
}
/** / Subscription Request */
export interface SubscriptionRequest {
    /** / Client-assigned id for this request.  Response will include same id */
    correlationId: Long;
    token: string;
    /** / Preferred service (realtime or delayed). REAL_TIME is the default. */
    service: Service;
    unsubscribe: boolean;
    requests: SubscriptionRequest_Request[];
}
export interface SubscriptionRequest_Request {
    symbol?: string | undefined;
    marketId?: Long | undefined;
    exchange?: string | undefined;
    channelId?: number | undefined;
    subscriptionType: SubscriptionType[];
    /** / 0 = send only current snapshot once, else send at interval seconds */
    snapshotIntervalSeconds: number;
    /** / Spreads and Options must be explicitly requested. */
    instrumentType: InstrumentDefinition_InstrumentType[];
    /** / Filter for the exchange and channel subscriptions. */
    bulkSubscriptionFilter: BulkSubscriptionFilter[];
    /** / Filter for Spread Types */
    spreadTypeFilter: string[];
    /** / Do not send instrument(s) on successful subscription */
    subscriptionDoNotSendInstruments: boolean;
    /** / Do not send market snapshot(s) on successful subscription */
    subscriptionDoNotSendSnapshots: boolean;
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
/** / List Subscriptions for a user */
export interface ListSubscriptionsRequest {
    correlationId: Long;
    token: string;
    username: string;
}
export interface ListSubscriptionsResponse {
    correlationId: Long;
    status: Status | undefined;
    username: string;
    sessions: ListSubscriptionsResponse_Session[];
}
export interface ListSubscriptionsResponse_Session {
    /** / Nano second unix epoch */
    loginTime: Long;
    token: string;
    clientVersion: string;
    marketSubscriptions: ListSubscriptionsResponse_Subscription[];
    exchangeSubscriptions: ListSubscriptionsResponse_Subscription[];
}
export interface ListSubscriptionsResponse_Subscription {
    subscriptionId: string;
    symbolId: string;
    marketId: Long;
    symbolCounts: ListSubscriptionsResponse_SymbolCount[];
    exchange: string;
    root: string;
}
export interface ListSubscriptionsResponse_SymbolCount {
    symbol: string;
    count: number;
}
function createBaseOpenfeedGatewayRequest(): OpenfeedGatewayRequest {
    return {
        loginRequest: undefined,
        logoutRequest: undefined,
        subscriptionRequest: undefined,
        instrumentRequest: undefined,
        instrumentReferenceRequest: undefined,
        exchangeRequest: undefined,
        listSubscriptionsRequest: undefined,
    };
}
export const OpenfeedGatewayRequestEncode = {
    encode(message: OpenfeedGatewayRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.loginRequest !== undefined) {
            LoginRequestEncode.encode(message.loginRequest, writer.uint32(10).fork()).ldelim();
        }
        if (message.logoutRequest !== undefined) {
            LogoutRequestEncode.encode(message.logoutRequest, writer.uint32(18).fork()).ldelim();
        }
        if (message.subscriptionRequest !== undefined) {
            SubscriptionRequestEncode.encode(message.subscriptionRequest, writer.uint32(26).fork()).ldelim();
        }
        if (message.instrumentRequest !== undefined) {
            InstrumentRequestEncode.encode(message.instrumentRequest, writer.uint32(34).fork()).ldelim();
        }
        if (message.instrumentReferenceRequest !== undefined) {
            InstrumentReferenceRequestEncode.encode(message.instrumentReferenceRequest, writer.uint32(42).fork()).ldelim();
        }
        if (message.exchangeRequest !== undefined) {
            ExchangeRequestEncode.encode(message.exchangeRequest, writer.uint32(50).fork()).ldelim();
        }
        if (message.listSubscriptionsRequest !== undefined) {
            ListSubscriptionsRequestEncode.encode(message.listSubscriptionsRequest, writer.uint32(58).fork()).ldelim();
        }
        return writer;
    }
}, OpenfeedGatewayRequestDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): OpenfeedGatewayRequest {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOpenfeedGatewayRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.loginRequest = LoginRequestDecode.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.logoutRequest = LogoutRequestDecode.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.subscriptionRequest = SubscriptionRequestDecode.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.instrumentRequest = InstrumentRequestDecode.decode(reader, reader.uint32());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.instrumentReferenceRequest = InstrumentReferenceRequestDecode.decode(reader, reader.uint32());
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.exchangeRequest = ExchangeRequestDecode.decode(reader, reader.uint32());
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.listSubscriptionsRequest = ListSubscriptionsRequestDecode.decode(reader, reader.uint32());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    }
};
function createBaseOpenfeedGatewayMessage(): OpenfeedGatewayMessage {
    return {
        loginResponse: undefined,
        logoutResponse: undefined,
        instrumentResponse: undefined,
        instrumentReferenceResponse: undefined,
        subscriptionResponse: undefined,
        marketStatus: undefined,
        heartBeat: undefined,
        instrumentDefinition: undefined,
        marketSnapshot: undefined,
        marketUpdate: undefined,
        volumeAtPrice: undefined,
        ohlc: undefined,
        exchangeResponse: undefined,
        instrumentAction: undefined,
        listSubscriptionsResponse: undefined,
    };
}
export const OpenfeedGatewayMessageEncode = {
    encode(message: OpenfeedGatewayMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.loginResponse !== undefined) {
            LoginResponseEncode.encode(message.loginResponse, writer.uint32(10).fork()).ldelim();
        }
        if (message.logoutResponse !== undefined) {
            LogoutResponseEncode.encode(message.logoutResponse, writer.uint32(18).fork()).ldelim();
        }
        if (message.instrumentResponse !== undefined) {
            InstrumentResponseEncode.encode(message.instrumentResponse, writer.uint32(26).fork()).ldelim();
        }
        if (message.instrumentReferenceResponse !== undefined) {
            InstrumentReferenceResponseEncode.encode(message.instrumentReferenceResponse, writer.uint32(34).fork()).ldelim();
        }
        if (message.subscriptionResponse !== undefined) {
            SubscriptionResponseEncode.encode(message.subscriptionResponse, writer.uint32(42).fork()).ldelim();
        }
        if (message.marketStatus !== undefined) {
            MarketStatusEncode.encode(message.marketStatus, writer.uint32(50).fork()).ldelim();
        }
        if (message.heartBeat !== undefined) {
            HeartBeatEncode.encode(message.heartBeat, writer.uint32(58).fork()).ldelim();
        }
        if (message.instrumentDefinition !== undefined) {
            InstrumentDefinitionEncode.encode(message.instrumentDefinition, writer.uint32(66).fork()).ldelim();
        }
        if (message.marketSnapshot !== undefined) {
            MarketSnapshotEncode.encode(message.marketSnapshot, writer.uint32(74).fork()).ldelim();
        }
        if (message.marketUpdate !== undefined) {
            MarketUpdateEncode.encode(message.marketUpdate, writer.uint32(82).fork()).ldelim();
        }
        if (message.volumeAtPrice !== undefined) {
            VolumeAtPriceEncode.encode(message.volumeAtPrice, writer.uint32(90).fork()).ldelim();
        }
        if (message.ohlc !== undefined) {
            OhlcEncode.encode(message.ohlc, writer.uint32(98).fork()).ldelim();
        }
        if (message.exchangeResponse !== undefined) {
            ExchangeResponseEncode.encode(message.exchangeResponse, writer.uint32(106).fork()).ldelim();
        }
        if (message.instrumentAction !== undefined) {
            InstrumentActionEncode.encode(message.instrumentAction, writer.uint32(114).fork()).ldelim();
        }
        if (message.listSubscriptionsResponse !== undefined) {
            ListSubscriptionsResponseEncode.encode(message.listSubscriptionsResponse, writer.uint32(122).fork()).ldelim();
        }
        return writer;
    }
}, OpenfeedGatewayMessageDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): OpenfeedGatewayMessage {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOpenfeedGatewayMessage();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.loginResponse = LoginResponseDecode.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.logoutResponse = LogoutResponseDecode.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.instrumentResponse = InstrumentResponseDecode.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.instrumentReferenceResponse = InstrumentReferenceResponseDecode.decode(reader, reader.uint32());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.subscriptionResponse = SubscriptionResponseDecode.decode(reader, reader.uint32());
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.marketStatus = MarketStatusDecode.decode(reader, reader.uint32());
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.heartBeat = HeartBeatDecode.decode(reader, reader.uint32());
                    continue;
                case 8:
                    if (tag !== 66) {
                        break;
                    }
                    message.instrumentDefinition = InstrumentDefinitionDecode.decode(reader, reader.uint32());
                    continue;
                case 9:
                    if (tag !== 74) {
                        break;
                    }
                    message.marketSnapshot = MarketSnapshotDecode.decode(reader, reader.uint32());
                    continue;
                case 10:
                    if (tag !== 82) {
                        break;
                    }
                    message.marketUpdate = MarketUpdateDecode.decode(reader, reader.uint32());
                    continue;
                case 11:
                    if (tag !== 90) {
                        break;
                    }
                    message.volumeAtPrice = VolumeAtPriceDecode.decode(reader, reader.uint32());
                    continue;
                case 12:
                    if (tag !== 98) {
                        break;
                    }
                    message.ohlc = OhlcDecode.decode(reader, reader.uint32());
                    continue;
                case 13:
                    if (tag !== 106) {
                        break;
                    }
                    message.exchangeResponse = ExchangeResponseDecode.decode(reader, reader.uint32());
                    continue;
                case 14:
                    if (tag !== 114) {
                        break;
                    }
                    message.instrumentAction = InstrumentActionDecode.decode(reader, reader.uint32());
                    continue;
                case 15:
                    if (tag !== 122) {
                        break;
                    }
                    message.listSubscriptionsResponse = ListSubscriptionsResponseDecode.decode(reader, reader.uint32());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    }
};
function createBaseStatus(): Status {
    return { result: 0, message: "", service: 0 };
}
export const StatusEncode = {
    encode(message: Status, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.result !== 0) {
            writer.uint32(8).int32(message.result);
        }
        if (message.message !== "") {
            writer.uint32(18).string(message.message);
        }
        if (message.service !== 0) {
            writer.uint32(24).int32(message.service);
        }
        return writer;
    }
}, StatusDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): Status {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStatus();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.result = reader.int32() as any;
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.message = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.service = reader.int32() as any;
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    }
};
function createBaseLoginRequest(): LoginRequest {
    return { correlationId: Long.ZERO, username: "", password: "", clientVersion: "", protocolVersion: 0, jwt: "" };
}
export const LoginRequestEncode = {
    encode(message: LoginRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.correlationId.isZero()) {
            writer.uint32(8).sint64(message.correlationId);
        }
        if (message.username !== "") {
            writer.uint32(18).string(message.username);
        }
        if (message.password !== "") {
            writer.uint32(26).string(message.password);
        }
        if (message.clientVersion !== "") {
            writer.uint32(34).string(message.clientVersion);
        }
        if (message.protocolVersion !== 0) {
            writer.uint32(40).sint32(message.protocolVersion);
        }
        if (message.jwt !== "") {
            writer.uint32(50).string(message.jwt);
        }
        return writer;
    }
}, LoginRequestDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): LoginRequest {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLoginRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.correlationId = reader.sint64() as Long;
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.username = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.password = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.clientVersion = reader.string();
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.protocolVersion = reader.sint32();
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.jwt = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    }
};
function createBaseLoginResponse(): LoginResponse {
    return { correlationId: Long.ZERO, status: undefined, token: "" };
}
export const LoginResponseEncode = {
    encode(message: LoginResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.correlationId.isZero()) {
            writer.uint32(8).sint64(message.correlationId);
        }
        if (message.status !== undefined) {
            StatusEncode.encode(message.status, writer.uint32(18).fork()).ldelim();
        }
        if (message.token !== "") {
            writer.uint32(26).string(message.token);
        }
        return writer;
    }
}, LoginResponseDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): LoginResponse {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLoginResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.correlationId = reader.sint64() as Long;
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.status = StatusDecode.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.token = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    }
};
function createBaseLogoutRequest(): LogoutRequest {
    return { correlationId: Long.ZERO, token: "" };
}
export const LogoutRequestEncode = {
    encode(message: LogoutRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.correlationId.isZero()) {
            writer.uint32(8).sint64(message.correlationId);
        }
        if (message.token !== "") {
            writer.uint32(26).string(message.token);
        }
        return writer;
    }
}, LogoutRequestDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): LogoutRequest {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLogoutRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.correlationId = reader.sint64() as Long;
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.token = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    }
};
function createBaseLogoutResponse(): LogoutResponse {
    return { correlationId: Long.ZERO, status: undefined };
}
export const LogoutResponseEncode = {
    encode(message: LogoutResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.correlationId.isZero()) {
            writer.uint32(8).sint64(message.correlationId);
        }
        if (message.status !== undefined) {
            StatusEncode.encode(message.status, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    }
}, LogoutResponseDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): LogoutResponse {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLogoutResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.correlationId = reader.sint64() as Long;
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.status = StatusDecode.decode(reader, reader.uint32());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    }
};
function createBaseInstrumentRequest(): InstrumentRequest {
    return {
        correlationId: Long.ZERO,
        token: "",
        instrumentType: [],
        spreadType: [],
        version: 0,
        symbol: undefined,
        marketId: undefined,
        exchange: undefined,
        channelId: undefined,
    };
}
export const InstrumentRequestEncode = {
    encode(message: InstrumentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.correlationId.isZero()) {
            writer.uint32(8).sint64(message.correlationId);
        }
        if (message.token !== "") {
            writer.uint32(18).string(message.token);
        }
        writer.uint32(26).fork();
        for (const v of message.instrumentType) {
            writer.int32(v);
        }
        writer.ldelim();
        for (const v of message.spreadType) {
            writer.uint32(34).string(v!);
        }
        if (message.version !== 0) {
            writer.uint32(40).sint32(message.version);
        }
        if (message.symbol !== undefined) {
            writer.uint32(82).string(message.symbol);
        }
        if (message.marketId !== undefined) {
            writer.uint32(88).sint64(message.marketId);
        }
        if (message.exchange !== undefined) {
            writer.uint32(98).string(message.exchange);
        }
        if (message.channelId !== undefined) {
            writer.uint32(104).sint32(message.channelId);
        }
        return writer;
    }
}, InstrumentRequestDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentRequest {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInstrumentRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.correlationId = reader.sint64() as Long;
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.token = reader.string();
                    continue;
                case 3:
                    if (tag === 24) {
                        message.instrumentType.push(reader.int32() as any);
                        continue;
                    }
                    if (tag === 26) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.instrumentType.push(reader.int32() as any);
                        }
                        continue;
                    }
                    break;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.spreadType.push(reader.string());
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.version = reader.sint32();
                    continue;
                case 10:
                    if (tag !== 82) {
                        break;
                    }
                    message.symbol = reader.string();
                    continue;
                case 11:
                    if (tag !== 88) {
                        break;
                    }
                    message.marketId = reader.sint64() as Long;
                    continue;
                case 12:
                    if (tag !== 98) {
                        break;
                    }
                    message.exchange = reader.string();
                    continue;
                case 13:
                    if (tag !== 104) {
                        break;
                    }
                    message.channelId = reader.sint32();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    }
};
function createBaseInstrumentResponse(): InstrumentResponse {
    return {
        correlationId: Long.ZERO,
        status: undefined,
        numberOfDefinitions: 0,
        symbol: "",
        marketId: Long.ZERO,
        exchange: "",
        channelId: 0,
        exchangeId: 0,
        instrumentDefinition: undefined,
    };
}
export const InstrumentResponseEncode = {
    encode(message: InstrumentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.correlationId.isZero()) {
            writer.uint32(8).sint64(message.correlationId);
        }
        if (message.status !== undefined) {
            StatusEncode.encode(message.status, writer.uint32(18).fork()).ldelim();
        }
        if (message.numberOfDefinitions !== 0) {
            writer.uint32(24).sint32(message.numberOfDefinitions);
        }
        if (message.symbol !== "") {
            writer.uint32(34).string(message.symbol);
        }
        if (!message.marketId.isZero()) {
            writer.uint32(40).sint64(message.marketId);
        }
        if (message.exchange !== "") {
            writer.uint32(50).string(message.exchange);
        }
        if (message.channelId !== 0) {
            writer.uint32(56).sint32(message.channelId);
        }
        if (message.exchangeId !== 0) {
            writer.uint32(64).sint32(message.exchangeId);
        }
        if (message.instrumentDefinition !== undefined) {
            InstrumentDefinitionEncode.encode(message.instrumentDefinition, writer.uint32(122).fork()).ldelim();
        }
        return writer;
    }
}, InstrumentResponseDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentResponse {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInstrumentResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.correlationId = reader.sint64() as Long;
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.status = StatusDecode.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.numberOfDefinitions = reader.sint32();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.symbol = reader.string();
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.marketId = reader.sint64() as Long;
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.exchange = reader.string();
                    continue;
                case 7:
                    if (tag !== 56) {
                        break;
                    }
                    message.channelId = reader.sint32();
                    continue;
                case 8:
                    if (tag !== 64) {
                        break;
                    }
                    message.exchangeId = reader.sint32();
                    continue;
                case 15:
                    if (tag !== 122) {
                        break;
                    }
                    message.instrumentDefinition = InstrumentDefinitionDecode.decode(reader, reader.uint32());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    }
};
function createBaseInstrumentReferenceRequest(): InstrumentReferenceRequest {
    return {
        correlationId: Long.ZERO,
        token: "",
        symbol: undefined,
        marketId: undefined,
        exchange: undefined,
        channelId: undefined,
    };
}
export const InstrumentReferenceRequestEncode = {
    encode(message: InstrumentReferenceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.correlationId.isZero()) {
            writer.uint32(8).sint64(message.correlationId);
        }
        if (message.token !== "") {
            writer.uint32(18).string(message.token);
        }
        if (message.symbol !== undefined) {
            writer.uint32(82).string(message.symbol);
        }
        if (message.marketId !== undefined) {
            writer.uint32(88).sint64(message.marketId);
        }
        if (message.exchange !== undefined) {
            writer.uint32(98).string(message.exchange);
        }
        if (message.channelId !== undefined) {
            writer.uint32(104).sint32(message.channelId);
        }
        return writer;
    }
}, InstrumentReferenceRequestDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentReferenceRequest {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInstrumentReferenceRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.correlationId = reader.sint64() as Long;
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.token = reader.string();
                    continue;
                case 10:
                    if (tag !== 82) {
                        break;
                    }
                    message.symbol = reader.string();
                    continue;
                case 11:
                    if (tag !== 88) {
                        break;
                    }
                    message.marketId = reader.sint64() as Long;
                    continue;
                case 12:
                    if (tag !== 98) {
                        break;
                    }
                    message.exchange = reader.string();
                    continue;
                case 13:
                    if (tag !== 104) {
                        break;
                    }
                    message.channelId = reader.sint32();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    }
};
function createBaseInstrumentReferenceResponse(): InstrumentReferenceResponse {
    return {
        correlationId: Long.ZERO,
        status: undefined,
        numberOfDefinitions: 0,
        channelId: 0,
        marketId: Long.ZERO,
        symbol: "",
        exchange: "",
        ddfSymbol: "",
        ddfExchange: "",
        ddfBaseCode: "",
        exchangeSymbol: "",
        exchangeId: 0,
    };
}
export const InstrumentReferenceResponseEncode = {
    encode(message: InstrumentReferenceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.correlationId.isZero()) {
            writer.uint32(8).sint64(message.correlationId);
        }
        if (message.status !== undefined) {
            StatusEncode.encode(message.status, writer.uint32(18).fork()).ldelim();
        }
        if (message.numberOfDefinitions !== 0) {
            writer.uint32(24).sint32(message.numberOfDefinitions);
        }
        if (message.channelId !== 0) {
            writer.uint32(32).sint32(message.channelId);
        }
        if (!message.marketId.isZero()) {
            writer.uint32(40).sint64(message.marketId);
        }
        if (message.symbol !== "") {
            writer.uint32(50).string(message.symbol);
        }
        if (message.exchange !== "") {
            writer.uint32(58).string(message.exchange);
        }
        if (message.ddfSymbol !== "") {
            writer.uint32(66).string(message.ddfSymbol);
        }
        if (message.ddfExchange !== "") {
            writer.uint32(74).string(message.ddfExchange);
        }
        if (message.ddfBaseCode !== "") {
            writer.uint32(82).string(message.ddfBaseCode);
        }
        if (message.exchangeSymbol !== "") {
            writer.uint32(90).string(message.exchangeSymbol);
        }
        if (message.exchangeId !== 0) {
            writer.uint32(96).sint32(message.exchangeId);
        }
        return writer;
    }
}, InstrumentReferenceResponseDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentReferenceResponse {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInstrumentReferenceResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.correlationId = reader.sint64() as Long;
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.status = StatusDecode.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.numberOfDefinitions = reader.sint32();
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.channelId = reader.sint32();
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.marketId = reader.sint64() as Long;
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.symbol = reader.string();
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.exchange = reader.string();
                    continue;
                case 8:
                    if (tag !== 66) {
                        break;
                    }
                    message.ddfSymbol = reader.string();
                    continue;
                case 9:
                    if (tag !== 74) {
                        break;
                    }
                    message.ddfExchange = reader.string();
                    continue;
                case 10:
                    if (tag !== 82) {
                        break;
                    }
                    message.ddfBaseCode = reader.string();
                    continue;
                case 11:
                    if (tag !== 90) {
                        break;
                    }
                    message.exchangeSymbol = reader.string();
                    continue;
                case 12:
                    if (tag !== 96) {
                        break;
                    }
                    message.exchangeId = reader.sint32();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    }
};
function createBaseExchangeRequest(): ExchangeRequest {
    return { correlationId: Long.ZERO, token: "" };
}
export const ExchangeRequestEncode = {
    encode(message: ExchangeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.correlationId.isZero()) {
            writer.uint32(8).sint64(message.correlationId);
        }
        if (message.token !== "") {
            writer.uint32(18).string(message.token);
        }
        return writer;
    }
}, ExchangeRequestDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): ExchangeRequest {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseExchangeRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.correlationId = reader.sint64() as Long;
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.token = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    }
};
function createBaseExchangeResponse(): ExchangeResponse {
    return { correlationId: Long.ZERO, status: undefined, exchanges: [] };
}
export const ExchangeResponseEncode = {
    encode(message: ExchangeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.correlationId.isZero()) {
            writer.uint32(8).sint64(message.correlationId);
        }
        if (message.status !== undefined) {
            StatusEncode.encode(message.status, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.exchanges) {
            ExchangeResponse_ExchangeEncode.encode(v!, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    }
}, ExchangeResponseDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): ExchangeResponse {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseExchangeResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.correlationId = reader.sint64() as Long;
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.status = StatusDecode.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.exchanges.push(ExchangeResponse_ExchangeDecode.decode(reader, reader.uint32()));
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    }
};
function createBaseExchangeResponse_Exchange(): ExchangeResponse_Exchange {
    return { code: "", description: "", aliases: [], exchangeId: 0 };
}
export const ExchangeResponse_ExchangeEncode = {
    encode(message: ExchangeResponse_Exchange, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.code !== "") {
            writer.uint32(10).string(message.code);
        }
        if (message.description !== "") {
            writer.uint32(18).string(message.description);
        }
        for (const v of message.aliases) {
            writer.uint32(26).string(v!);
        }
        if (message.exchangeId !== 0) {
            writer.uint32(32).sint32(message.exchangeId);
        }
        return writer;
    }
}, ExchangeResponse_ExchangeDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): ExchangeResponse_Exchange {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseExchangeResponse_Exchange();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.code = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.description = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.aliases.push(reader.string());
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.exchangeId = reader.sint32();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    }
};
function createBaseBulkSubscriptionFilter(): BulkSubscriptionFilter {
    return { symbolType: 0, symbolPattern: "" };
}
export const BulkSubscriptionFilterEncode = {
    encode(message: BulkSubscriptionFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.symbolType !== 0) {
            writer.uint32(8).int32(message.symbolType);
        }
        if (message.symbolPattern !== "") {
            writer.uint32(18).string(message.symbolPattern);
        }
        return writer;
    }
}, BulkSubscriptionFilterDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): BulkSubscriptionFilter {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBulkSubscriptionFilter();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.symbolType = reader.int32() as any;
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.symbolPattern = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    }
};
function createBaseSubscriptionRequest(): SubscriptionRequest {
    return { correlationId: Long.ZERO, token: "", service: 0, unsubscribe: false, requests: [] };
}
export const SubscriptionRequestEncode = {
    encode(message: SubscriptionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.correlationId.isZero()) {
            writer.uint32(8).sint64(message.correlationId);
        }
        if (message.token !== "") {
            writer.uint32(18).string(message.token);
        }
        if (message.service !== 0) {
            writer.uint32(24).int32(message.service);
        }
        if (message.unsubscribe === true) {
            writer.uint32(32).bool(message.unsubscribe);
        }
        for (const v of message.requests) {
            SubscriptionRequest_RequestEncode.encode(v!, writer.uint32(42).fork()).ldelim();
        }
        return writer;
    }
}, SubscriptionRequestDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionRequest {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSubscriptionRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.correlationId = reader.sint64() as Long;
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.token = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.service = reader.int32() as any;
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.unsubscribe = reader.bool();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.requests.push(SubscriptionRequest_RequestDecode.decode(reader, reader.uint32()));
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    }
};
function createBaseSubscriptionRequest_Request(): SubscriptionRequest_Request {
    return {
        symbol: undefined,
        marketId: undefined,
        exchange: undefined,
        channelId: undefined,
        subscriptionType: [],
        snapshotIntervalSeconds: 0,
        instrumentType: [],
        bulkSubscriptionFilter: [],
        spreadTypeFilter: [],
        subscriptionDoNotSendInstruments: false,
        subscriptionDoNotSendSnapshots: false,
    };
}
export const SubscriptionRequest_RequestEncode = {
    encode(message: SubscriptionRequest_Request, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.symbol !== undefined) {
            writer.uint32(10).string(message.symbol);
        }
        if (message.marketId !== undefined) {
            writer.uint32(16).sint64(message.marketId);
        }
        if (message.exchange !== undefined) {
            writer.uint32(26).string(message.exchange);
        }
        if (message.channelId !== undefined) {
            writer.uint32(32).sint32(message.channelId);
        }
        writer.uint32(82).fork();
        for (const v of message.subscriptionType) {
            writer.int32(v);
        }
        writer.ldelim();
        if (message.snapshotIntervalSeconds !== 0) {
            writer.uint32(88).sint32(message.snapshotIntervalSeconds);
        }
        writer.uint32(98).fork();
        for (const v of message.instrumentType) {
            writer.int32(v);
        }
        writer.ldelim();
        for (const v of message.bulkSubscriptionFilter) {
            BulkSubscriptionFilterEncode.encode(v!, writer.uint32(106).fork()).ldelim();
        }
        for (const v of message.spreadTypeFilter) {
            writer.uint32(114).string(v!);
        }
        if (message.subscriptionDoNotSendInstruments === true) {
            writer.uint32(120).bool(message.subscriptionDoNotSendInstruments);
        }
        if (message.subscriptionDoNotSendSnapshots === true) {
            writer.uint32(128).bool(message.subscriptionDoNotSendSnapshots);
        }
        return writer;
    }
}, SubscriptionRequest_RequestDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionRequest_Request {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSubscriptionRequest_Request();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.symbol = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.marketId = reader.sint64() as Long;
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.exchange = reader.string();
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.channelId = reader.sint32();
                    continue;
                case 10:
                    if (tag === 80) {
                        message.subscriptionType.push(reader.int32() as any);
                        continue;
                    }
                    if (tag === 82) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.subscriptionType.push(reader.int32() as any);
                        }
                        continue;
                    }
                    break;
                case 11:
                    if (tag !== 88) {
                        break;
                    }
                    message.snapshotIntervalSeconds = reader.sint32();
                    continue;
                case 12:
                    if (tag === 96) {
                        message.instrumentType.push(reader.int32() as any);
                        continue;
                    }
                    if (tag === 98) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.instrumentType.push(reader.int32() as any);
                        }
                        continue;
                    }
                    break;
                case 13:
                    if (tag !== 106) {
                        break;
                    }
                    message.bulkSubscriptionFilter.push(BulkSubscriptionFilterDecode.decode(reader, reader.uint32()));
                    continue;
                case 14:
                    if (tag !== 114) {
                        break;
                    }
                    message.spreadTypeFilter.push(reader.string());
                    continue;
                case 15:
                    if (tag !== 120) {
                        break;
                    }
                    message.subscriptionDoNotSendInstruments = reader.bool();
                    continue;
                case 16:
                    if (tag !== 128) {
                        break;
                    }
                    message.subscriptionDoNotSendSnapshots = reader.bool();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    }
};
function createBaseSubscriptionResponse(): SubscriptionResponse {
    return {
        correlationId: Long.ZERO,
        status: undefined,
        symbol: "",
        marketId: Long.ZERO,
        exchange: "",
        channelId: 0,
        numberOfDefinitions: 0,
        subscriptionType: 0,
        unsubscribe: false,
        snapshotIntervalSeconds: 0,
    };
}
export const SubscriptionResponseEncode = {
    encode(message: SubscriptionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.correlationId.isZero()) {
            writer.uint32(8).sint64(message.correlationId);
        }
        if (message.status !== undefined) {
            StatusEncode.encode(message.status, writer.uint32(18).fork()).ldelim();
        }
        if (message.symbol !== "") {
            writer.uint32(26).string(message.symbol);
        }
        if (!message.marketId.isZero()) {
            writer.uint32(32).sint64(message.marketId);
        }
        if (message.exchange !== "") {
            writer.uint32(42).string(message.exchange);
        }
        if (message.channelId !== 0) {
            writer.uint32(48).sint32(message.channelId);
        }
        if (message.numberOfDefinitions !== 0) {
            writer.uint32(56).sint32(message.numberOfDefinitions);
        }
        if (message.subscriptionType !== 0) {
            writer.uint32(64).int32(message.subscriptionType);
        }
        if (message.unsubscribe === true) {
            writer.uint32(72).bool(message.unsubscribe);
        }
        if (message.snapshotIntervalSeconds !== 0) {
            writer.uint32(80).sint32(message.snapshotIntervalSeconds);
        }
        return writer;
    }
}, SubscriptionResponseDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionResponse {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSubscriptionResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.correlationId = reader.sint64() as Long;
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.status = StatusDecode.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.symbol = reader.string();
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.marketId = reader.sint64() as Long;
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.exchange = reader.string();
                    continue;
                case 6:
                    if (tag !== 48) {
                        break;
                    }
                    message.channelId = reader.sint32();
                    continue;
                case 7:
                    if (tag !== 56) {
                        break;
                    }
                    message.numberOfDefinitions = reader.sint32();
                    continue;
                case 8:
                    if (tag !== 64) {
                        break;
                    }
                    message.subscriptionType = reader.int32() as any;
                    continue;
                case 9:
                    if (tag !== 72) {
                        break;
                    }
                    message.unsubscribe = reader.bool();
                    continue;
                case 10:
                    if (tag !== 80) {
                        break;
                    }
                    message.snapshotIntervalSeconds = reader.sint32();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    }
};
function createBaseListSubscriptionsRequest(): ListSubscriptionsRequest {
    return { correlationId: Long.ZERO, token: "", username: "" };
}
export const ListSubscriptionsRequestEncode = {
    encode(message: ListSubscriptionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.correlationId.isZero()) {
            writer.uint32(8).sint64(message.correlationId);
        }
        if (message.token !== "") {
            writer.uint32(18).string(message.token);
        }
        if (message.username !== "") {
            writer.uint32(26).string(message.username);
        }
        return writer;
    }
}, ListSubscriptionsRequestDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): ListSubscriptionsRequest {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseListSubscriptionsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.correlationId = reader.sint64() as Long;
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.token = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.username = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    }
};
function createBaseListSubscriptionsResponse(): ListSubscriptionsResponse {
    return { correlationId: Long.ZERO, status: undefined, username: "", sessions: [] };
}
export const ListSubscriptionsResponseEncode = {
    encode(message: ListSubscriptionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.correlationId.isZero()) {
            writer.uint32(8).sint64(message.correlationId);
        }
        if (message.status !== undefined) {
            StatusEncode.encode(message.status, writer.uint32(18).fork()).ldelim();
        }
        if (message.username !== "") {
            writer.uint32(26).string(message.username);
        }
        for (const v of message.sessions) {
            ListSubscriptionsResponse_SessionEncode.encode(v!, writer.uint32(82).fork()).ldelim();
        }
        return writer;
    }
}, ListSubscriptionsResponseDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): ListSubscriptionsResponse {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseListSubscriptionsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.correlationId = reader.sint64() as Long;
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.status = StatusDecode.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.username = reader.string();
                    continue;
                case 10:
                    if (tag !== 82) {
                        break;
                    }
                    message.sessions.push(ListSubscriptionsResponse_SessionDecode.decode(reader, reader.uint32()));
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    }
};
function createBaseListSubscriptionsResponse_Session(): ListSubscriptionsResponse_Session {
    return { loginTime: Long.ZERO, token: "", clientVersion: "", marketSubscriptions: [], exchangeSubscriptions: [] };
}
export const ListSubscriptionsResponse_SessionEncode = {
    encode(message: ListSubscriptionsResponse_Session, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.loginTime.isZero()) {
            writer.uint32(8).sint64(message.loginTime);
        }
        if (message.token !== "") {
            writer.uint32(18).string(message.token);
        }
        if (message.clientVersion !== "") {
            writer.uint32(26).string(message.clientVersion);
        }
        for (const v of message.marketSubscriptions) {
            ListSubscriptionsResponse_SubscriptionEncode.encode(v!, writer.uint32(82).fork()).ldelim();
        }
        for (const v of message.exchangeSubscriptions) {
            ListSubscriptionsResponse_SubscriptionEncode.encode(v!, writer.uint32(90).fork()).ldelim();
        }
        return writer;
    }
}, ListSubscriptionsResponse_SessionDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): ListSubscriptionsResponse_Session {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseListSubscriptionsResponse_Session();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.loginTime = reader.sint64() as Long;
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.token = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.clientVersion = reader.string();
                    continue;
                case 10:
                    if (tag !== 82) {
                        break;
                    }
                    message.marketSubscriptions.push(ListSubscriptionsResponse_SubscriptionDecode.decode(reader, reader.uint32()));
                    continue;
                case 11:
                    if (tag !== 90) {
                        break;
                    }
                    message.exchangeSubscriptions.push(ListSubscriptionsResponse_SubscriptionDecode.decode(reader, reader.uint32()));
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    }
};
function createBaseListSubscriptionsResponse_Subscription(): ListSubscriptionsResponse_Subscription {
    return { subscriptionId: "", symbolId: "", marketId: Long.ZERO, symbolCounts: [], exchange: "", root: "" };
}
export const ListSubscriptionsResponse_SubscriptionEncode = {
    encode(message: ListSubscriptionsResponse_Subscription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.subscriptionId !== "") {
            writer.uint32(10).string(message.subscriptionId);
        }
        if (message.symbolId !== "") {
            writer.uint32(18).string(message.symbolId);
        }
        if (!message.marketId.isZero()) {
            writer.uint32(24).sint64(message.marketId);
        }
        for (const v of message.symbolCounts) {
            ListSubscriptionsResponse_SymbolCountEncode.encode(v!, writer.uint32(34).fork()).ldelim();
        }
        if (message.exchange !== "") {
            writer.uint32(82).string(message.exchange);
        }
        if (message.root !== "") {
            writer.uint32(90).string(message.root);
        }
        return writer;
    }
}, ListSubscriptionsResponse_SubscriptionDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): ListSubscriptionsResponse_Subscription {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseListSubscriptionsResponse_Subscription();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.subscriptionId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.symbolId = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.marketId = reader.sint64() as Long;
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.symbolCounts.push(ListSubscriptionsResponse_SymbolCountDecode.decode(reader, reader.uint32()));
                    continue;
                case 10:
                    if (tag !== 82) {
                        break;
                    }
                    message.exchange = reader.string();
                    continue;
                case 11:
                    if (tag !== 90) {
                        break;
                    }
                    message.root = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    }
};
function createBaseListSubscriptionsResponse_SymbolCount(): ListSubscriptionsResponse_SymbolCount {
    return { symbol: "", count: 0 };
}
export const ListSubscriptionsResponse_SymbolCountEncode = {
    encode(message: ListSubscriptionsResponse_SymbolCount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.symbol !== "") {
            writer.uint32(10).string(message.symbol);
        }
        if (message.count !== 0) {
            writer.uint32(16).sint32(message.count);
        }
        return writer;
    }
}, ListSubscriptionsResponse_SymbolCountDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): ListSubscriptionsResponse_SymbolCount {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseListSubscriptionsResponse_SymbolCount();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.symbol = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.count = reader.sint32();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    }
};
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long as any;
    _m0.configure();
}
