/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import {
  HeartBeat,
  InstrumentAction,
  MarketSnapshot,
  MarketStatus,
  MarketUpdate,
  Ohlc,
  Service,
  serviceFromJSON,
  serviceToJSON,
  VolumeAtPrice,
} from "./openfeed";
import {
  InstrumentDefinition,
  InstrumentDefinition_InstrumentType,
  instrumentDefinition_InstrumentTypeFromJSON,
  instrumentDefinition_InstrumentTypeToJSON,
} from "./openfeed_instrument";

export const protobufPackage = "org.openfeed";

export enum Result {
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
  UNRECOGNIZED = -1,
}

export function resultFromJSON(object: any): Result {
  switch (object) {
    case 0:
    case "UNKNOWN_RESULT":
      return Result.UNKNOWN_RESULT;
    case 1:
    case "SUCCESS":
      return Result.SUCCESS;
    case 115:
    case "DUPLICATE_LOGIN":
      return Result.DUPLICATE_LOGIN;
    case 116:
    case "INVALID_SYMBOL":
      return Result.INVALID_SYMBOL;
    case 117:
    case "INVALID_MARKET_ID":
      return Result.INVALID_MARKET_ID;
    case 118:
    case "INVALID_EXCHANGE":
      return Result.INVALID_EXCHANGE;
    case 119:
    case "INVALID_CHANNEL_ID":
      return Result.INVALID_CHANNEL_ID;
    case 120:
    case "MALFORMED_MESSAGE":
      return Result.MALFORMED_MESSAGE;
    case 121:
    case "UNEXPECTED_MESSAGE":
      return Result.UNEXPECTED_MESSAGE;
    case 122:
    case "NOT_SUBSCRIBED":
      return Result.NOT_SUBSCRIBED;
    case 123:
    case "DUPLICATE_SUBSCRIPTION":
      return Result.DUPLICATE_SUBSCRIPTION;
    case 124:
    case "INVALID_CREDENTIALS":
      return Result.INVALID_CREDENTIALS;
    case 125:
    case "INSUFFICIENT_PRIVILEGES":
      return Result.INSUFFICIENT_PRIVILEGES;
    case 126:
    case "AUTHENTICATION_REQUIRED":
      return Result.AUTHENTICATION_REQUIRED;
    case 127:
    case "GENERIC_FAILURE":
      return Result.GENERIC_FAILURE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Result.UNRECOGNIZED;
  }
}

export function resultToJSON(object: Result): string {
  switch (object) {
    case Result.UNKNOWN_RESULT:
      return "UNKNOWN_RESULT";
    case Result.SUCCESS:
      return "SUCCESS";
    case Result.DUPLICATE_LOGIN:
      return "DUPLICATE_LOGIN";
    case Result.INVALID_SYMBOL:
      return "INVALID_SYMBOL";
    case Result.INVALID_MARKET_ID:
      return "INVALID_MARKET_ID";
    case Result.INVALID_EXCHANGE:
      return "INVALID_EXCHANGE";
    case Result.INVALID_CHANNEL_ID:
      return "INVALID_CHANNEL_ID";
    case Result.MALFORMED_MESSAGE:
      return "MALFORMED_MESSAGE";
    case Result.UNEXPECTED_MESSAGE:
      return "UNEXPECTED_MESSAGE";
    case Result.NOT_SUBSCRIBED:
      return "NOT_SUBSCRIBED";
    case Result.DUPLICATE_SUBSCRIPTION:
      return "DUPLICATE_SUBSCRIPTION";
    case Result.INVALID_CREDENTIALS:
      return "INVALID_CREDENTIALS";
    case Result.INSUFFICIENT_PRIVILEGES:
      return "INSUFFICIENT_PRIVILEGES";
    case Result.AUTHENTICATION_REQUIRED:
      return "AUTHENTICATION_REQUIRED";
    case Result.GENERIC_FAILURE:
      return "GENERIC_FAILURE";
    case Result.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum SubscriptionType {
  ALL = 0,
  QUOTE = 1,
  QUOTE_PARTICIPANT = 2,
  DEPTH_PRICE = 3,
  DEPTH_ORDER = 4,
  TRADES = 5,
  CUMLATIVE_VOLUME = 6,
  OHLC = 7,
  OHLC_NON_REGULAR = 8,
  UNRECOGNIZED = -1,
}

export function subscriptionTypeFromJSON(object: any): SubscriptionType {
  switch (object) {
    case 0:
    case "ALL":
      return SubscriptionType.ALL;
    case 1:
    case "QUOTE":
      return SubscriptionType.QUOTE;
    case 2:
    case "QUOTE_PARTICIPANT":
      return SubscriptionType.QUOTE_PARTICIPANT;
    case 3:
    case "DEPTH_PRICE":
      return SubscriptionType.DEPTH_PRICE;
    case 4:
    case "DEPTH_ORDER":
      return SubscriptionType.DEPTH_ORDER;
    case 5:
    case "TRADES":
      return SubscriptionType.TRADES;
    case 6:
    case "CUMLATIVE_VOLUME":
      return SubscriptionType.CUMLATIVE_VOLUME;
    case 7:
    case "OHLC":
      return SubscriptionType.OHLC;
    case 8:
    case "OHLC_NON_REGULAR":
      return SubscriptionType.OHLC_NON_REGULAR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SubscriptionType.UNRECOGNIZED;
  }
}

export function subscriptionTypeToJSON(object: SubscriptionType): string {
  switch (object) {
    case SubscriptionType.ALL:
      return "ALL";
    case SubscriptionType.QUOTE:
      return "QUOTE";
    case SubscriptionType.QUOTE_PARTICIPANT:
      return "QUOTE_PARTICIPANT";
    case SubscriptionType.DEPTH_PRICE:
      return "DEPTH_PRICE";
    case SubscriptionType.DEPTH_ORDER:
      return "DEPTH_ORDER";
    case SubscriptionType.TRADES:
      return "TRADES";
    case SubscriptionType.CUMLATIVE_VOLUME:
      return "CUMLATIVE_VOLUME";
    case SubscriptionType.OHLC:
      return "OHLC";
    case SubscriptionType.OHLC_NON_REGULAR:
      return "OHLC_NON_REGULAR";
    case SubscriptionType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** / Symbol type for the subscription filter. */
export enum SymbolType {
  BARCHART = 0,
  EXCHANGE = 1,
  UNRECOGNIZED = -1,
}

export function symbolTypeFromJSON(object: any): SymbolType {
  switch (object) {
    case 0:
    case "BARCHART":
      return SymbolType.BARCHART;
    case 1:
    case "EXCHANGE":
      return SymbolType.EXCHANGE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SymbolType.UNRECOGNIZED;
  }
}

export function symbolTypeToJSON(object: SymbolType): string {
  switch (object) {
    case SymbolType.BARCHART:
      return "BARCHART";
    case SymbolType.EXCHANGE:
      return "EXCHANGE";
    case SymbolType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

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

function createBaseOpenfeedGatewayRequest(): OpenfeedGatewayRequest {
  return {
    loginRequest: undefined,
    logoutRequest: undefined,
    subscriptionRequest: undefined,
    instrumentRequest: undefined,
    instrumentReferenceRequest: undefined,
    exchangeRequest: undefined,
  };
}

export const OpenfeedGatewayRequest = {
  encode(message: OpenfeedGatewayRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.loginRequest !== undefined) {
      LoginRequest.encode(message.loginRequest, writer.uint32(10).fork()).ldelim();
    }
    if (message.logoutRequest !== undefined) {
      LogoutRequest.encode(message.logoutRequest, writer.uint32(18).fork()).ldelim();
    }
    if (message.subscriptionRequest !== undefined) {
      SubscriptionRequest.encode(message.subscriptionRequest, writer.uint32(26).fork()).ldelim();
    }
    if (message.instrumentRequest !== undefined) {
      InstrumentRequest.encode(message.instrumentRequest, writer.uint32(34).fork()).ldelim();
    }
    if (message.instrumentReferenceRequest !== undefined) {
      InstrumentReferenceRequest.encode(message.instrumentReferenceRequest, writer.uint32(42).fork()).ldelim();
    }
    if (message.exchangeRequest !== undefined) {
      ExchangeRequest.encode(message.exchangeRequest, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OpenfeedGatewayRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpenfeedGatewayRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.loginRequest = LoginRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.logoutRequest = LogoutRequest.decode(reader, reader.uint32());
          break;
        case 3:
          message.subscriptionRequest = SubscriptionRequest.decode(reader, reader.uint32());
          break;
        case 4:
          message.instrumentRequest = InstrumentRequest.decode(reader, reader.uint32());
          break;
        case 5:
          message.instrumentReferenceRequest = InstrumentReferenceRequest.decode(reader, reader.uint32());
          break;
        case 6:
          message.exchangeRequest = ExchangeRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OpenfeedGatewayRequest {
    return {
      loginRequest: isSet(object.loginRequest) ? LoginRequest.fromJSON(object.loginRequest) : undefined,
      logoutRequest: isSet(object.logoutRequest) ? LogoutRequest.fromJSON(object.logoutRequest) : undefined,
      subscriptionRequest: isSet(object.subscriptionRequest)
        ? SubscriptionRequest.fromJSON(object.subscriptionRequest)
        : undefined,
      instrumentRequest: isSet(object.instrumentRequest)
        ? InstrumentRequest.fromJSON(object.instrumentRequest)
        : undefined,
      instrumentReferenceRequest: isSet(object.instrumentReferenceRequest)
        ? InstrumentReferenceRequest.fromJSON(object.instrumentReferenceRequest)
        : undefined,
      exchangeRequest: isSet(object.exchangeRequest) ? ExchangeRequest.fromJSON(object.exchangeRequest) : undefined,
    };
  },

  toJSON(message: OpenfeedGatewayRequest): unknown {
    const obj: any = {};
    message.loginRequest !== undefined &&
      (obj.loginRequest = message.loginRequest ? LoginRequest.toJSON(message.loginRequest) : undefined);
    message.logoutRequest !== undefined &&
      (obj.logoutRequest = message.logoutRequest ? LogoutRequest.toJSON(message.logoutRequest) : undefined);
    message.subscriptionRequest !== undefined && (obj.subscriptionRequest = message.subscriptionRequest
      ? SubscriptionRequest.toJSON(message.subscriptionRequest)
      : undefined);
    message.instrumentRequest !== undefined && (obj.instrumentRequest = message.instrumentRequest
      ? InstrumentRequest.toJSON(message.instrumentRequest)
      : undefined);
    message.instrumentReferenceRequest !== undefined &&
      (obj.instrumentReferenceRequest = message.instrumentReferenceRequest
        ? InstrumentReferenceRequest.toJSON(message.instrumentReferenceRequest)
        : undefined);
    message.exchangeRequest !== undefined &&
      (obj.exchangeRequest = message.exchangeRequest ? ExchangeRequest.toJSON(message.exchangeRequest) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<OpenfeedGatewayRequest>): OpenfeedGatewayRequest {
    const message = createBaseOpenfeedGatewayRequest();
    message.loginRequest = (object.loginRequest !== undefined && object.loginRequest !== null)
      ? LoginRequest.fromPartial(object.loginRequest)
      : undefined;
    message.logoutRequest = (object.logoutRequest !== undefined && object.logoutRequest !== null)
      ? LogoutRequest.fromPartial(object.logoutRequest)
      : undefined;
    message.subscriptionRequest = (object.subscriptionRequest !== undefined && object.subscriptionRequest !== null)
      ? SubscriptionRequest.fromPartial(object.subscriptionRequest)
      : undefined;
    message.instrumentRequest = (object.instrumentRequest !== undefined && object.instrumentRequest !== null)
      ? InstrumentRequest.fromPartial(object.instrumentRequest)
      : undefined;
    message.instrumentReferenceRequest =
      (object.instrumentReferenceRequest !== undefined && object.instrumentReferenceRequest !== null)
        ? InstrumentReferenceRequest.fromPartial(object.instrumentReferenceRequest)
        : undefined;
    message.exchangeRequest = (object.exchangeRequest !== undefined && object.exchangeRequest !== null)
      ? ExchangeRequest.fromPartial(object.exchangeRequest)
      : undefined;
    return message;
  },
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
  };
}

export const OpenfeedGatewayMessage = {
  encode(message: OpenfeedGatewayMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.loginResponse !== undefined) {
      LoginResponse.encode(message.loginResponse, writer.uint32(10).fork()).ldelim();
    }
    if (message.logoutResponse !== undefined) {
      LogoutResponse.encode(message.logoutResponse, writer.uint32(18).fork()).ldelim();
    }
    if (message.instrumentResponse !== undefined) {
      InstrumentResponse.encode(message.instrumentResponse, writer.uint32(26).fork()).ldelim();
    }
    if (message.instrumentReferenceResponse !== undefined) {
      InstrumentReferenceResponse.encode(message.instrumentReferenceResponse, writer.uint32(34).fork()).ldelim();
    }
    if (message.subscriptionResponse !== undefined) {
      SubscriptionResponse.encode(message.subscriptionResponse, writer.uint32(42).fork()).ldelim();
    }
    if (message.marketStatus !== undefined) {
      MarketStatus.encode(message.marketStatus, writer.uint32(50).fork()).ldelim();
    }
    if (message.heartBeat !== undefined) {
      HeartBeat.encode(message.heartBeat, writer.uint32(58).fork()).ldelim();
    }
    if (message.instrumentDefinition !== undefined) {
      InstrumentDefinition.encode(message.instrumentDefinition, writer.uint32(66).fork()).ldelim();
    }
    if (message.marketSnapshot !== undefined) {
      MarketSnapshot.encode(message.marketSnapshot, writer.uint32(74).fork()).ldelim();
    }
    if (message.marketUpdate !== undefined) {
      MarketUpdate.encode(message.marketUpdate, writer.uint32(82).fork()).ldelim();
    }
    if (message.volumeAtPrice !== undefined) {
      VolumeAtPrice.encode(message.volumeAtPrice, writer.uint32(90).fork()).ldelim();
    }
    if (message.ohlc !== undefined) {
      Ohlc.encode(message.ohlc, writer.uint32(98).fork()).ldelim();
    }
    if (message.exchangeResponse !== undefined) {
      ExchangeResponse.encode(message.exchangeResponse, writer.uint32(106).fork()).ldelim();
    }
    if (message.instrumentAction !== undefined) {
      InstrumentAction.encode(message.instrumentAction, writer.uint32(114).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OpenfeedGatewayMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpenfeedGatewayMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.loginResponse = LoginResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.logoutResponse = LogoutResponse.decode(reader, reader.uint32());
          break;
        case 3:
          message.instrumentResponse = InstrumentResponse.decode(reader, reader.uint32());
          break;
        case 4:
          message.instrumentReferenceResponse = InstrumentReferenceResponse.decode(reader, reader.uint32());
          break;
        case 5:
          message.subscriptionResponse = SubscriptionResponse.decode(reader, reader.uint32());
          break;
        case 6:
          message.marketStatus = MarketStatus.decode(reader, reader.uint32());
          break;
        case 7:
          message.heartBeat = HeartBeat.decode(reader, reader.uint32());
          break;
        case 8:
          message.instrumentDefinition = InstrumentDefinition.decode(reader, reader.uint32());
          break;
        case 9:
          message.marketSnapshot = MarketSnapshot.decode(reader, reader.uint32());
          break;
        case 10:
          message.marketUpdate = MarketUpdate.decode(reader, reader.uint32());
          break;
        case 11:
          message.volumeAtPrice = VolumeAtPrice.decode(reader, reader.uint32());
          break;
        case 12:
          message.ohlc = Ohlc.decode(reader, reader.uint32());
          break;
        case 13:
          message.exchangeResponse = ExchangeResponse.decode(reader, reader.uint32());
          break;
        case 14:
          message.instrumentAction = InstrumentAction.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OpenfeedGatewayMessage {
    return {
      loginResponse: isSet(object.loginResponse) ? LoginResponse.fromJSON(object.loginResponse) : undefined,
      logoutResponse: isSet(object.logoutResponse) ? LogoutResponse.fromJSON(object.logoutResponse) : undefined,
      instrumentResponse: isSet(object.instrumentResponse)
        ? InstrumentResponse.fromJSON(object.instrumentResponse)
        : undefined,
      instrumentReferenceResponse: isSet(object.instrumentReferenceResponse)
        ? InstrumentReferenceResponse.fromJSON(object.instrumentReferenceResponse)
        : undefined,
      subscriptionResponse: isSet(object.subscriptionResponse)
        ? SubscriptionResponse.fromJSON(object.subscriptionResponse)
        : undefined,
      marketStatus: isSet(object.marketStatus) ? MarketStatus.fromJSON(object.marketStatus) : undefined,
      heartBeat: isSet(object.heartBeat) ? HeartBeat.fromJSON(object.heartBeat) : undefined,
      instrumentDefinition: isSet(object.instrumentDefinition)
        ? InstrumentDefinition.fromJSON(object.instrumentDefinition)
        : undefined,
      marketSnapshot: isSet(object.marketSnapshot) ? MarketSnapshot.fromJSON(object.marketSnapshot) : undefined,
      marketUpdate: isSet(object.marketUpdate) ? MarketUpdate.fromJSON(object.marketUpdate) : undefined,
      volumeAtPrice: isSet(object.volumeAtPrice) ? VolumeAtPrice.fromJSON(object.volumeAtPrice) : undefined,
      ohlc: isSet(object.ohlc) ? Ohlc.fromJSON(object.ohlc) : undefined,
      exchangeResponse: isSet(object.exchangeResponse) ? ExchangeResponse.fromJSON(object.exchangeResponse) : undefined,
      instrumentAction: isSet(object.instrumentAction) ? InstrumentAction.fromJSON(object.instrumentAction) : undefined,
    };
  },

  toJSON(message: OpenfeedGatewayMessage): unknown {
    const obj: any = {};
    message.loginResponse !== undefined &&
      (obj.loginResponse = message.loginResponse ? LoginResponse.toJSON(message.loginResponse) : undefined);
    message.logoutResponse !== undefined &&
      (obj.logoutResponse = message.logoutResponse ? LogoutResponse.toJSON(message.logoutResponse) : undefined);
    message.instrumentResponse !== undefined && (obj.instrumentResponse = message.instrumentResponse
      ? InstrumentResponse.toJSON(message.instrumentResponse)
      : undefined);
    message.instrumentReferenceResponse !== undefined &&
      (obj.instrumentReferenceResponse = message.instrumentReferenceResponse
        ? InstrumentReferenceResponse.toJSON(message.instrumentReferenceResponse)
        : undefined);
    message.subscriptionResponse !== undefined && (obj.subscriptionResponse = message.subscriptionResponse
      ? SubscriptionResponse.toJSON(message.subscriptionResponse)
      : undefined);
    message.marketStatus !== undefined &&
      (obj.marketStatus = message.marketStatus ? MarketStatus.toJSON(message.marketStatus) : undefined);
    message.heartBeat !== undefined &&
      (obj.heartBeat = message.heartBeat ? HeartBeat.toJSON(message.heartBeat) : undefined);
    message.instrumentDefinition !== undefined && (obj.instrumentDefinition = message.instrumentDefinition
      ? InstrumentDefinition.toJSON(message.instrumentDefinition)
      : undefined);
    message.marketSnapshot !== undefined &&
      (obj.marketSnapshot = message.marketSnapshot ? MarketSnapshot.toJSON(message.marketSnapshot) : undefined);
    message.marketUpdate !== undefined &&
      (obj.marketUpdate = message.marketUpdate ? MarketUpdate.toJSON(message.marketUpdate) : undefined);
    message.volumeAtPrice !== undefined &&
      (obj.volumeAtPrice = message.volumeAtPrice ? VolumeAtPrice.toJSON(message.volumeAtPrice) : undefined);
    message.ohlc !== undefined && (obj.ohlc = message.ohlc ? Ohlc.toJSON(message.ohlc) : undefined);
    message.exchangeResponse !== undefined &&
      (obj.exchangeResponse = message.exchangeResponse ? ExchangeResponse.toJSON(message.exchangeResponse) : undefined);
    message.instrumentAction !== undefined &&
      (obj.instrumentAction = message.instrumentAction ? InstrumentAction.toJSON(message.instrumentAction) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<OpenfeedGatewayMessage>): OpenfeedGatewayMessage {
    const message = createBaseOpenfeedGatewayMessage();
    message.loginResponse = (object.loginResponse !== undefined && object.loginResponse !== null)
      ? LoginResponse.fromPartial(object.loginResponse)
      : undefined;
    message.logoutResponse = (object.logoutResponse !== undefined && object.logoutResponse !== null)
      ? LogoutResponse.fromPartial(object.logoutResponse)
      : undefined;
    message.instrumentResponse = (object.instrumentResponse !== undefined && object.instrumentResponse !== null)
      ? InstrumentResponse.fromPartial(object.instrumentResponse)
      : undefined;
    message.instrumentReferenceResponse =
      (object.instrumentReferenceResponse !== undefined && object.instrumentReferenceResponse !== null)
        ? InstrumentReferenceResponse.fromPartial(object.instrumentReferenceResponse)
        : undefined;
    message.subscriptionResponse = (object.subscriptionResponse !== undefined && object.subscriptionResponse !== null)
      ? SubscriptionResponse.fromPartial(object.subscriptionResponse)
      : undefined;
    message.marketStatus = (object.marketStatus !== undefined && object.marketStatus !== null)
      ? MarketStatus.fromPartial(object.marketStatus)
      : undefined;
    message.heartBeat = (object.heartBeat !== undefined && object.heartBeat !== null)
      ? HeartBeat.fromPartial(object.heartBeat)
      : undefined;
    message.instrumentDefinition = (object.instrumentDefinition !== undefined && object.instrumentDefinition !== null)
      ? InstrumentDefinition.fromPartial(object.instrumentDefinition)
      : undefined;
    message.marketSnapshot = (object.marketSnapshot !== undefined && object.marketSnapshot !== null)
      ? MarketSnapshot.fromPartial(object.marketSnapshot)
      : undefined;
    message.marketUpdate = (object.marketUpdate !== undefined && object.marketUpdate !== null)
      ? MarketUpdate.fromPartial(object.marketUpdate)
      : undefined;
    message.volumeAtPrice = (object.volumeAtPrice !== undefined && object.volumeAtPrice !== null)
      ? VolumeAtPrice.fromPartial(object.volumeAtPrice)
      : undefined;
    message.ohlc = (object.ohlc !== undefined && object.ohlc !== null) ? Ohlc.fromPartial(object.ohlc) : undefined;
    message.exchangeResponse = (object.exchangeResponse !== undefined && object.exchangeResponse !== null)
      ? ExchangeResponse.fromPartial(object.exchangeResponse)
      : undefined;
    message.instrumentAction = (object.instrumentAction !== undefined && object.instrumentAction !== null)
      ? InstrumentAction.fromPartial(object.instrumentAction)
      : undefined;
    return message;
  },
};

function createBaseStatus(): Status {
  return { result: 0, message: "", service: 0 };
}

export const Status = {
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
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Status {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader.int32() as any;
          break;
        case 2:
          message.message = reader.string();
          break;
        case 3:
          message.service = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Status {
    return {
      result: isSet(object.result) ? resultFromJSON(object.result) : 0,
      message: isSet(object.message) ? String(object.message) : "",
      service: isSet(object.service) ? serviceFromJSON(object.service) : 0,
    };
  },

  toJSON(message: Status): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = resultToJSON(message.result));
    message.message !== undefined && (obj.message = message.message);
    message.service !== undefined && (obj.service = serviceToJSON(message.service));
    return obj;
  },

  fromPartial(object: DeepPartial<Status>): Status {
    const message = createBaseStatus();
    message.result = object.result ?? 0;
    message.message = object.message ?? "";
    message.service = object.service ?? 0;
    return message;
  },
};

function createBaseLoginRequest(): LoginRequest {
  return { correlationId: Long.ZERO, username: "", password: "", clientVersion: "", protocolVersion: 0 };
}

export const LoginRequest = {
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
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader.sint64() as Long;
          break;
        case 2:
          message.username = reader.string();
          break;
        case 3:
          message.password = reader.string();
          break;
        case 4:
          message.clientVersion = reader.string();
          break;
        case 5:
          message.protocolVersion = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoginRequest {
    return {
      correlationId: isSet(object.correlationId) ? Long.fromValue(object.correlationId) : Long.ZERO,
      username: isSet(object.username) ? String(object.username) : "",
      password: isSet(object.password) ? String(object.password) : "",
      clientVersion: isSet(object.clientVersion) ? String(object.clientVersion) : "",
      protocolVersion: isSet(object.protocolVersion) ? Number(object.protocolVersion) : 0,
    };
  },

  toJSON(message: LoginRequest): unknown {
    const obj: any = {};
    message.correlationId !== undefined && (obj.correlationId = (message.correlationId || Long.ZERO).toString());
    message.username !== undefined && (obj.username = message.username);
    message.password !== undefined && (obj.password = message.password);
    message.clientVersion !== undefined && (obj.clientVersion = message.clientVersion);
    message.protocolVersion !== undefined && (obj.protocolVersion = Math.round(message.protocolVersion));
    return obj;
  },

  fromPartial(object: DeepPartial<LoginRequest>): LoginRequest {
    const message = createBaseLoginRequest();
    message.correlationId = (object.correlationId !== undefined && object.correlationId !== null)
      ? Long.fromValue(object.correlationId)
      : Long.ZERO;
    message.username = object.username ?? "";
    message.password = object.password ?? "";
    message.clientVersion = object.clientVersion ?? "";
    message.protocolVersion = object.protocolVersion ?? 0;
    return message;
  },
};

function createBaseLoginResponse(): LoginResponse {
  return { correlationId: Long.ZERO, status: undefined, token: "" };
}

export const LoginResponse = {
  encode(message: LoginResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.correlationId.isZero()) {
      writer.uint32(8).sint64(message.correlationId);
    }
    if (message.status !== undefined) {
      Status.encode(message.status, writer.uint32(18).fork()).ldelim();
    }
    if (message.token !== "") {
      writer.uint32(26).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader.sint64() as Long;
          break;
        case 2:
          message.status = Status.decode(reader, reader.uint32());
          break;
        case 3:
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoginResponse {
    return {
      correlationId: isSet(object.correlationId) ? Long.fromValue(object.correlationId) : Long.ZERO,
      status: isSet(object.status) ? Status.fromJSON(object.status) : undefined,
      token: isSet(object.token) ? String(object.token) : "",
    };
  },

  toJSON(message: LoginResponse): unknown {
    const obj: any = {};
    message.correlationId !== undefined && (obj.correlationId = (message.correlationId || Long.ZERO).toString());
    message.status !== undefined && (obj.status = message.status ? Status.toJSON(message.status) : undefined);
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },

  fromPartial(object: DeepPartial<LoginResponse>): LoginResponse {
    const message = createBaseLoginResponse();
    message.correlationId = (object.correlationId !== undefined && object.correlationId !== null)
      ? Long.fromValue(object.correlationId)
      : Long.ZERO;
    message.status = (object.status !== undefined && object.status !== null)
      ? Status.fromPartial(object.status)
      : undefined;
    message.token = object.token ?? "";
    return message;
  },
};

function createBaseLogoutRequest(): LogoutRequest {
  return { correlationId: Long.ZERO, token: "" };
}

export const LogoutRequest = {
  encode(message: LogoutRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.correlationId.isZero()) {
      writer.uint32(8).sint64(message.correlationId);
    }
    if (message.token !== "") {
      writer.uint32(26).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LogoutRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLogoutRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader.sint64() as Long;
          break;
        case 3:
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LogoutRequest {
    return {
      correlationId: isSet(object.correlationId) ? Long.fromValue(object.correlationId) : Long.ZERO,
      token: isSet(object.token) ? String(object.token) : "",
    };
  },

  toJSON(message: LogoutRequest): unknown {
    const obj: any = {};
    message.correlationId !== undefined && (obj.correlationId = (message.correlationId || Long.ZERO).toString());
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },

  fromPartial(object: DeepPartial<LogoutRequest>): LogoutRequest {
    const message = createBaseLogoutRequest();
    message.correlationId = (object.correlationId !== undefined && object.correlationId !== null)
      ? Long.fromValue(object.correlationId)
      : Long.ZERO;
    message.token = object.token ?? "";
    return message;
  },
};

function createBaseLogoutResponse(): LogoutResponse {
  return { correlationId: Long.ZERO, status: undefined };
}

export const LogoutResponse = {
  encode(message: LogoutResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.correlationId.isZero()) {
      writer.uint32(8).sint64(message.correlationId);
    }
    if (message.status !== undefined) {
      Status.encode(message.status, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LogoutResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLogoutResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader.sint64() as Long;
          break;
        case 2:
          message.status = Status.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LogoutResponse {
    return {
      correlationId: isSet(object.correlationId) ? Long.fromValue(object.correlationId) : Long.ZERO,
      status: isSet(object.status) ? Status.fromJSON(object.status) : undefined,
    };
  },

  toJSON(message: LogoutResponse): unknown {
    const obj: any = {};
    message.correlationId !== undefined && (obj.correlationId = (message.correlationId || Long.ZERO).toString());
    message.status !== undefined && (obj.status = message.status ? Status.toJSON(message.status) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<LogoutResponse>): LogoutResponse {
    const message = createBaseLogoutResponse();
    message.correlationId = (object.correlationId !== undefined && object.correlationId !== null)
      ? Long.fromValue(object.correlationId)
      : Long.ZERO;
    message.status = (object.status !== undefined && object.status !== null)
      ? Status.fromPartial(object.status)
      : undefined;
    return message;
  },
};

function createBaseInstrumentRequest(): InstrumentRequest {
  return {
    correlationId: Long.ZERO,
    token: "",
    symbol: undefined,
    marketId: undefined,
    exchange: undefined,
    channelId: undefined,
  };
}

export const InstrumentRequest = {
  encode(message: InstrumentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstrumentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader.sint64() as Long;
          break;
        case 2:
          message.token = reader.string();
          break;
        case 10:
          message.symbol = reader.string();
          break;
        case 11:
          message.marketId = reader.sint64() as Long;
          break;
        case 12:
          message.exchange = reader.string();
          break;
        case 13:
          message.channelId = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InstrumentRequest {
    return {
      correlationId: isSet(object.correlationId) ? Long.fromValue(object.correlationId) : Long.ZERO,
      token: isSet(object.token) ? String(object.token) : "",
      symbol: isSet(object.symbol) ? String(object.symbol) : undefined,
      marketId: isSet(object.marketId) ? Long.fromValue(object.marketId) : undefined,
      exchange: isSet(object.exchange) ? String(object.exchange) : undefined,
      channelId: isSet(object.channelId) ? Number(object.channelId) : undefined,
    };
  },

  toJSON(message: InstrumentRequest): unknown {
    const obj: any = {};
    message.correlationId !== undefined && (obj.correlationId = (message.correlationId || Long.ZERO).toString());
    message.token !== undefined && (obj.token = message.token);
    message.symbol !== undefined && (obj.symbol = message.symbol);
    message.marketId !== undefined && (obj.marketId = (message.marketId || undefined).toString());
    message.exchange !== undefined && (obj.exchange = message.exchange);
    message.channelId !== undefined && (obj.channelId = Math.round(message.channelId));
    return obj;
  },

  fromPartial(object: DeepPartial<InstrumentRequest>): InstrumentRequest {
    const message = createBaseInstrumentRequest();
    message.correlationId = (object.correlationId !== undefined && object.correlationId !== null)
      ? Long.fromValue(object.correlationId)
      : Long.ZERO;
    message.token = object.token ?? "";
    message.symbol = object.symbol ?? undefined;
    message.marketId = (object.marketId !== undefined && object.marketId !== null)
      ? Long.fromValue(object.marketId)
      : undefined;
    message.exchange = object.exchange ?? undefined;
    message.channelId = object.channelId ?? undefined;
    return message;
  },
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
  };
}

export const InstrumentResponse = {
  encode(message: InstrumentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.correlationId.isZero()) {
      writer.uint32(8).sint64(message.correlationId);
    }
    if (message.status !== undefined) {
      Status.encode(message.status, writer.uint32(18).fork()).ldelim();
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
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstrumentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader.sint64() as Long;
          break;
        case 2:
          message.status = Status.decode(reader, reader.uint32());
          break;
        case 3:
          message.numberOfDefinitions = reader.sint32();
          break;
        case 4:
          message.symbol = reader.string();
          break;
        case 5:
          message.marketId = reader.sint64() as Long;
          break;
        case 6:
          message.exchange = reader.string();
          break;
        case 7:
          message.channelId = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InstrumentResponse {
    return {
      correlationId: isSet(object.correlationId) ? Long.fromValue(object.correlationId) : Long.ZERO,
      status: isSet(object.status) ? Status.fromJSON(object.status) : undefined,
      numberOfDefinitions: isSet(object.numberOfDefinitions) ? Number(object.numberOfDefinitions) : 0,
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      marketId: isSet(object.marketId) ? Long.fromValue(object.marketId) : Long.ZERO,
      exchange: isSet(object.exchange) ? String(object.exchange) : "",
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
    };
  },

  toJSON(message: InstrumentResponse): unknown {
    const obj: any = {};
    message.correlationId !== undefined && (obj.correlationId = (message.correlationId || Long.ZERO).toString());
    message.status !== undefined && (obj.status = message.status ? Status.toJSON(message.status) : undefined);
    message.numberOfDefinitions !== undefined && (obj.numberOfDefinitions = Math.round(message.numberOfDefinitions));
    message.symbol !== undefined && (obj.symbol = message.symbol);
    message.marketId !== undefined && (obj.marketId = (message.marketId || Long.ZERO).toString());
    message.exchange !== undefined && (obj.exchange = message.exchange);
    message.channelId !== undefined && (obj.channelId = Math.round(message.channelId));
    return obj;
  },

  fromPartial(object: DeepPartial<InstrumentResponse>): InstrumentResponse {
    const message = createBaseInstrumentResponse();
    message.correlationId = (object.correlationId !== undefined && object.correlationId !== null)
      ? Long.fromValue(object.correlationId)
      : Long.ZERO;
    message.status = (object.status !== undefined && object.status !== null)
      ? Status.fromPartial(object.status)
      : undefined;
    message.numberOfDefinitions = object.numberOfDefinitions ?? 0;
    message.symbol = object.symbol ?? "";
    message.marketId = (object.marketId !== undefined && object.marketId !== null)
      ? Long.fromValue(object.marketId)
      : Long.ZERO;
    message.exchange = object.exchange ?? "";
    message.channelId = object.channelId ?? 0;
    return message;
  },
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

export const InstrumentReferenceRequest = {
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
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentReferenceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstrumentReferenceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader.sint64() as Long;
          break;
        case 2:
          message.token = reader.string();
          break;
        case 10:
          message.symbol = reader.string();
          break;
        case 11:
          message.marketId = reader.sint64() as Long;
          break;
        case 12:
          message.exchange = reader.string();
          break;
        case 13:
          message.channelId = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InstrumentReferenceRequest {
    return {
      correlationId: isSet(object.correlationId) ? Long.fromValue(object.correlationId) : Long.ZERO,
      token: isSet(object.token) ? String(object.token) : "",
      symbol: isSet(object.symbol) ? String(object.symbol) : undefined,
      marketId: isSet(object.marketId) ? Long.fromValue(object.marketId) : undefined,
      exchange: isSet(object.exchange) ? String(object.exchange) : undefined,
      channelId: isSet(object.channelId) ? Number(object.channelId) : undefined,
    };
  },

  toJSON(message: InstrumentReferenceRequest): unknown {
    const obj: any = {};
    message.correlationId !== undefined && (obj.correlationId = (message.correlationId || Long.ZERO).toString());
    message.token !== undefined && (obj.token = message.token);
    message.symbol !== undefined && (obj.symbol = message.symbol);
    message.marketId !== undefined && (obj.marketId = (message.marketId || undefined).toString());
    message.exchange !== undefined && (obj.exchange = message.exchange);
    message.channelId !== undefined && (obj.channelId = Math.round(message.channelId));
    return obj;
  },

  fromPartial(object: DeepPartial<InstrumentReferenceRequest>): InstrumentReferenceRequest {
    const message = createBaseInstrumentReferenceRequest();
    message.correlationId = (object.correlationId !== undefined && object.correlationId !== null)
      ? Long.fromValue(object.correlationId)
      : Long.ZERO;
    message.token = object.token ?? "";
    message.symbol = object.symbol ?? undefined;
    message.marketId = (object.marketId !== undefined && object.marketId !== null)
      ? Long.fromValue(object.marketId)
      : undefined;
    message.exchange = object.exchange ?? undefined;
    message.channelId = object.channelId ?? undefined;
    return message;
  },
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
  };
}

export const InstrumentReferenceResponse = {
  encode(message: InstrumentReferenceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.correlationId.isZero()) {
      writer.uint32(8).sint64(message.correlationId);
    }
    if (message.status !== undefined) {
      Status.encode(message.status, writer.uint32(18).fork()).ldelim();
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
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentReferenceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstrumentReferenceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader.sint64() as Long;
          break;
        case 2:
          message.status = Status.decode(reader, reader.uint32());
          break;
        case 3:
          message.numberOfDefinitions = reader.sint32();
          break;
        case 4:
          message.channelId = reader.sint32();
          break;
        case 5:
          message.marketId = reader.sint64() as Long;
          break;
        case 6:
          message.symbol = reader.string();
          break;
        case 7:
          message.exchange = reader.string();
          break;
        case 8:
          message.ddfSymbol = reader.string();
          break;
        case 9:
          message.ddfExchange = reader.string();
          break;
        case 10:
          message.ddfBaseCode = reader.string();
          break;
        case 11:
          message.exchangeSymbol = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InstrumentReferenceResponse {
    return {
      correlationId: isSet(object.correlationId) ? Long.fromValue(object.correlationId) : Long.ZERO,
      status: isSet(object.status) ? Status.fromJSON(object.status) : undefined,
      numberOfDefinitions: isSet(object.numberOfDefinitions) ? Number(object.numberOfDefinitions) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      marketId: isSet(object.marketId) ? Long.fromValue(object.marketId) : Long.ZERO,
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      exchange: isSet(object.exchange) ? String(object.exchange) : "",
      ddfSymbol: isSet(object.ddfSymbol) ? String(object.ddfSymbol) : "",
      ddfExchange: isSet(object.ddfExchange) ? String(object.ddfExchange) : "",
      ddfBaseCode: isSet(object.ddfBaseCode) ? String(object.ddfBaseCode) : "",
      exchangeSymbol: isSet(object.exchangeSymbol) ? String(object.exchangeSymbol) : "",
    };
  },

  toJSON(message: InstrumentReferenceResponse): unknown {
    const obj: any = {};
    message.correlationId !== undefined && (obj.correlationId = (message.correlationId || Long.ZERO).toString());
    message.status !== undefined && (obj.status = message.status ? Status.toJSON(message.status) : undefined);
    message.numberOfDefinitions !== undefined && (obj.numberOfDefinitions = Math.round(message.numberOfDefinitions));
    message.channelId !== undefined && (obj.channelId = Math.round(message.channelId));
    message.marketId !== undefined && (obj.marketId = (message.marketId || Long.ZERO).toString());
    message.symbol !== undefined && (obj.symbol = message.symbol);
    message.exchange !== undefined && (obj.exchange = message.exchange);
    message.ddfSymbol !== undefined && (obj.ddfSymbol = message.ddfSymbol);
    message.ddfExchange !== undefined && (obj.ddfExchange = message.ddfExchange);
    message.ddfBaseCode !== undefined && (obj.ddfBaseCode = message.ddfBaseCode);
    message.exchangeSymbol !== undefined && (obj.exchangeSymbol = message.exchangeSymbol);
    return obj;
  },

  fromPartial(object: DeepPartial<InstrumentReferenceResponse>): InstrumentReferenceResponse {
    const message = createBaseInstrumentReferenceResponse();
    message.correlationId = (object.correlationId !== undefined && object.correlationId !== null)
      ? Long.fromValue(object.correlationId)
      : Long.ZERO;
    message.status = (object.status !== undefined && object.status !== null)
      ? Status.fromPartial(object.status)
      : undefined;
    message.numberOfDefinitions = object.numberOfDefinitions ?? 0;
    message.channelId = object.channelId ?? 0;
    message.marketId = (object.marketId !== undefined && object.marketId !== null)
      ? Long.fromValue(object.marketId)
      : Long.ZERO;
    message.symbol = object.symbol ?? "";
    message.exchange = object.exchange ?? "";
    message.ddfSymbol = object.ddfSymbol ?? "";
    message.ddfExchange = object.ddfExchange ?? "";
    message.ddfBaseCode = object.ddfBaseCode ?? "";
    message.exchangeSymbol = object.exchangeSymbol ?? "";
    return message;
  },
};

function createBaseExchangeRequest(): ExchangeRequest {
  return { correlationId: Long.ZERO, token: "" };
}

export const ExchangeRequest = {
  encode(message: ExchangeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.correlationId.isZero()) {
      writer.uint32(8).sint64(message.correlationId);
    }
    if (message.token !== "") {
      writer.uint32(18).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExchangeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExchangeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader.sint64() as Long;
          break;
        case 2:
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ExchangeRequest {
    return {
      correlationId: isSet(object.correlationId) ? Long.fromValue(object.correlationId) : Long.ZERO,
      token: isSet(object.token) ? String(object.token) : "",
    };
  },

  toJSON(message: ExchangeRequest): unknown {
    const obj: any = {};
    message.correlationId !== undefined && (obj.correlationId = (message.correlationId || Long.ZERO).toString());
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },

  fromPartial(object: DeepPartial<ExchangeRequest>): ExchangeRequest {
    const message = createBaseExchangeRequest();
    message.correlationId = (object.correlationId !== undefined && object.correlationId !== null)
      ? Long.fromValue(object.correlationId)
      : Long.ZERO;
    message.token = object.token ?? "";
    return message;
  },
};

function createBaseExchangeResponse(): ExchangeResponse {
  return { correlationId: Long.ZERO, status: undefined, exchanges: [] };
}

export const ExchangeResponse = {
  encode(message: ExchangeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.correlationId.isZero()) {
      writer.uint32(8).sint64(message.correlationId);
    }
    if (message.status !== undefined) {
      Status.encode(message.status, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.exchanges) {
      ExchangeResponse_Exchange.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExchangeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExchangeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader.sint64() as Long;
          break;
        case 2:
          message.status = Status.decode(reader, reader.uint32());
          break;
        case 3:
          message.exchanges.push(ExchangeResponse_Exchange.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ExchangeResponse {
    return {
      correlationId: isSet(object.correlationId) ? Long.fromValue(object.correlationId) : Long.ZERO,
      status: isSet(object.status) ? Status.fromJSON(object.status) : undefined,
      exchanges: Array.isArray(object?.exchanges)
        ? object.exchanges.map((e: any) => ExchangeResponse_Exchange.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ExchangeResponse): unknown {
    const obj: any = {};
    message.correlationId !== undefined && (obj.correlationId = (message.correlationId || Long.ZERO).toString());
    message.status !== undefined && (obj.status = message.status ? Status.toJSON(message.status) : undefined);
    if (message.exchanges) {
      obj.exchanges = message.exchanges.map((e) => e ? ExchangeResponse_Exchange.toJSON(e) : undefined);
    } else {
      obj.exchanges = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ExchangeResponse>): ExchangeResponse {
    const message = createBaseExchangeResponse();
    message.correlationId = (object.correlationId !== undefined && object.correlationId !== null)
      ? Long.fromValue(object.correlationId)
      : Long.ZERO;
    message.status = (object.status !== undefined && object.status !== null)
      ? Status.fromPartial(object.status)
      : undefined;
    message.exchanges = object.exchanges?.map((e) => ExchangeResponse_Exchange.fromPartial(e)) || [];
    return message;
  },
};

function createBaseExchangeResponse_Exchange(): ExchangeResponse_Exchange {
  return { code: "", description: "", aliases: [] };
}

export const ExchangeResponse_Exchange = {
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
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExchangeResponse_Exchange {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExchangeResponse_Exchange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.aliases.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ExchangeResponse_Exchange {
    return {
      code: isSet(object.code) ? String(object.code) : "",
      description: isSet(object.description) ? String(object.description) : "",
      aliases: Array.isArray(object?.aliases) ? object.aliases.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: ExchangeResponse_Exchange): unknown {
    const obj: any = {};
    message.code !== undefined && (obj.code = message.code);
    message.description !== undefined && (obj.description = message.description);
    if (message.aliases) {
      obj.aliases = message.aliases.map((e) => e);
    } else {
      obj.aliases = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ExchangeResponse_Exchange>): ExchangeResponse_Exchange {
    const message = createBaseExchangeResponse_Exchange();
    message.code = object.code ?? "";
    message.description = object.description ?? "";
    message.aliases = object.aliases?.map((e) => e) || [];
    return message;
  },
};

function createBaseBulkSubscriptionFilter(): BulkSubscriptionFilter {
  return { symbolType: 0, symbolPattern: "" };
}

export const BulkSubscriptionFilter = {
  encode(message: BulkSubscriptionFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.symbolType !== 0) {
      writer.uint32(8).int32(message.symbolType);
    }
    if (message.symbolPattern !== "") {
      writer.uint32(18).string(message.symbolPattern);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BulkSubscriptionFilter {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBulkSubscriptionFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.symbolType = reader.int32() as any;
          break;
        case 2:
          message.symbolPattern = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BulkSubscriptionFilter {
    return {
      symbolType: isSet(object.symbolType) ? symbolTypeFromJSON(object.symbolType) : 0,
      symbolPattern: isSet(object.symbolPattern) ? String(object.symbolPattern) : "",
    };
  },

  toJSON(message: BulkSubscriptionFilter): unknown {
    const obj: any = {};
    message.symbolType !== undefined && (obj.symbolType = symbolTypeToJSON(message.symbolType));
    message.symbolPattern !== undefined && (obj.symbolPattern = message.symbolPattern);
    return obj;
  },

  fromPartial(object: DeepPartial<BulkSubscriptionFilter>): BulkSubscriptionFilter {
    const message = createBaseBulkSubscriptionFilter();
    message.symbolType = object.symbolType ?? 0;
    message.symbolPattern = object.symbolPattern ?? "";
    return message;
  },
};

function createBaseSubscriptionRequest(): SubscriptionRequest {
  return { correlationId: Long.ZERO, token: "", service: 0, unsubscribe: false, requests: [] };
}

export const SubscriptionRequest = {
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
      SubscriptionRequest_Request.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscriptionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader.sint64() as Long;
          break;
        case 2:
          message.token = reader.string();
          break;
        case 3:
          message.service = reader.int32() as any;
          break;
        case 4:
          message.unsubscribe = reader.bool();
          break;
        case 5:
          message.requests.push(SubscriptionRequest_Request.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SubscriptionRequest {
    return {
      correlationId: isSet(object.correlationId) ? Long.fromValue(object.correlationId) : Long.ZERO,
      token: isSet(object.token) ? String(object.token) : "",
      service: isSet(object.service) ? serviceFromJSON(object.service) : 0,
      unsubscribe: isSet(object.unsubscribe) ? Boolean(object.unsubscribe) : false,
      requests: Array.isArray(object?.requests)
        ? object.requests.map((e: any) => SubscriptionRequest_Request.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SubscriptionRequest): unknown {
    const obj: any = {};
    message.correlationId !== undefined && (obj.correlationId = (message.correlationId || Long.ZERO).toString());
    message.token !== undefined && (obj.token = message.token);
    message.service !== undefined && (obj.service = serviceToJSON(message.service));
    message.unsubscribe !== undefined && (obj.unsubscribe = message.unsubscribe);
    if (message.requests) {
      obj.requests = message.requests.map((e) => e ? SubscriptionRequest_Request.toJSON(e) : undefined);
    } else {
      obj.requests = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<SubscriptionRequest>): SubscriptionRequest {
    const message = createBaseSubscriptionRequest();
    message.correlationId = (object.correlationId !== undefined && object.correlationId !== null)
      ? Long.fromValue(object.correlationId)
      : Long.ZERO;
    message.token = object.token ?? "";
    message.service = object.service ?? 0;
    message.unsubscribe = object.unsubscribe ?? false;
    message.requests = object.requests?.map((e) => SubscriptionRequest_Request.fromPartial(e)) || [];
    return message;
  },
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
  };
}

export const SubscriptionRequest_Request = {
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
      BulkSubscriptionFilter.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionRequest_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscriptionRequest_Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.symbol = reader.string();
          break;
        case 2:
          message.marketId = reader.sint64() as Long;
          break;
        case 3:
          message.exchange = reader.string();
          break;
        case 4:
          message.channelId = reader.sint32();
          break;
        case 10:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.subscriptionType.push(reader.int32() as any);
            }
          } else {
            message.subscriptionType.push(reader.int32() as any);
          }
          break;
        case 11:
          message.snapshotIntervalSeconds = reader.sint32();
          break;
        case 12:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.instrumentType.push(reader.int32() as any);
            }
          } else {
            message.instrumentType.push(reader.int32() as any);
          }
          break;
        case 13:
          message.bulkSubscriptionFilter.push(BulkSubscriptionFilter.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SubscriptionRequest_Request {
    return {
      symbol: isSet(object.symbol) ? String(object.symbol) : undefined,
      marketId: isSet(object.marketId) ? Long.fromValue(object.marketId) : undefined,
      exchange: isSet(object.exchange) ? String(object.exchange) : undefined,
      channelId: isSet(object.channelId) ? Number(object.channelId) : undefined,
      subscriptionType: Array.isArray(object?.subscriptionType)
        ? object.subscriptionType.map((e: any) => subscriptionTypeFromJSON(e))
        : [],
      snapshotIntervalSeconds: isSet(object.snapshotIntervalSeconds) ? Number(object.snapshotIntervalSeconds) : 0,
      instrumentType: Array.isArray(object?.instrumentType)
        ? object.instrumentType.map((e: any) => instrumentDefinition_InstrumentTypeFromJSON(e))
        : [],
      bulkSubscriptionFilter: Array.isArray(object?.bulkSubscriptionFilter)
        ? object.bulkSubscriptionFilter.map((e: any) => BulkSubscriptionFilter.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SubscriptionRequest_Request): unknown {
    const obj: any = {};
    message.symbol !== undefined && (obj.symbol = message.symbol);
    message.marketId !== undefined && (obj.marketId = (message.marketId || undefined).toString());
    message.exchange !== undefined && (obj.exchange = message.exchange);
    message.channelId !== undefined && (obj.channelId = Math.round(message.channelId));
    if (message.subscriptionType) {
      obj.subscriptionType = message.subscriptionType.map((e) => subscriptionTypeToJSON(e));
    } else {
      obj.subscriptionType = [];
    }
    message.snapshotIntervalSeconds !== undefined &&
      (obj.snapshotIntervalSeconds = Math.round(message.snapshotIntervalSeconds));
    if (message.instrumentType) {
      obj.instrumentType = message.instrumentType.map((e) => instrumentDefinition_InstrumentTypeToJSON(e));
    } else {
      obj.instrumentType = [];
    }
    if (message.bulkSubscriptionFilter) {
      obj.bulkSubscriptionFilter = message.bulkSubscriptionFilter.map((e) =>
        e ? BulkSubscriptionFilter.toJSON(e) : undefined
      );
    } else {
      obj.bulkSubscriptionFilter = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<SubscriptionRequest_Request>): SubscriptionRequest_Request {
    const message = createBaseSubscriptionRequest_Request();
    message.symbol = object.symbol ?? undefined;
    message.marketId = (object.marketId !== undefined && object.marketId !== null)
      ? Long.fromValue(object.marketId)
      : undefined;
    message.exchange = object.exchange ?? undefined;
    message.channelId = object.channelId ?? undefined;
    message.subscriptionType = object.subscriptionType?.map((e) => e) || [];
    message.snapshotIntervalSeconds = object.snapshotIntervalSeconds ?? 0;
    message.instrumentType = object.instrumentType?.map((e) => e) || [];
    message.bulkSubscriptionFilter = object.bulkSubscriptionFilter?.map((e) => BulkSubscriptionFilter.fromPartial(e)) ||
      [];
    return message;
  },
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

export const SubscriptionResponse = {
  encode(message: SubscriptionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.correlationId.isZero()) {
      writer.uint32(8).sint64(message.correlationId);
    }
    if (message.status !== undefined) {
      Status.encode(message.status, writer.uint32(18).fork()).ldelim();
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
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscriptionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.correlationId = reader.sint64() as Long;
          break;
        case 2:
          message.status = Status.decode(reader, reader.uint32());
          break;
        case 3:
          message.symbol = reader.string();
          break;
        case 4:
          message.marketId = reader.sint64() as Long;
          break;
        case 5:
          message.exchange = reader.string();
          break;
        case 6:
          message.channelId = reader.sint32();
          break;
        case 7:
          message.numberOfDefinitions = reader.sint32();
          break;
        case 8:
          message.subscriptionType = reader.int32() as any;
          break;
        case 9:
          message.unsubscribe = reader.bool();
          break;
        case 10:
          message.snapshotIntervalSeconds = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SubscriptionResponse {
    return {
      correlationId: isSet(object.correlationId) ? Long.fromValue(object.correlationId) : Long.ZERO,
      status: isSet(object.status) ? Status.fromJSON(object.status) : undefined,
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      marketId: isSet(object.marketId) ? Long.fromValue(object.marketId) : Long.ZERO,
      exchange: isSet(object.exchange) ? String(object.exchange) : "",
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      numberOfDefinitions: isSet(object.numberOfDefinitions) ? Number(object.numberOfDefinitions) : 0,
      subscriptionType: isSet(object.subscriptionType) ? subscriptionTypeFromJSON(object.subscriptionType) : 0,
      unsubscribe: isSet(object.unsubscribe) ? Boolean(object.unsubscribe) : false,
      snapshotIntervalSeconds: isSet(object.snapshotIntervalSeconds) ? Number(object.snapshotIntervalSeconds) : 0,
    };
  },

  toJSON(message: SubscriptionResponse): unknown {
    const obj: any = {};
    message.correlationId !== undefined && (obj.correlationId = (message.correlationId || Long.ZERO).toString());
    message.status !== undefined && (obj.status = message.status ? Status.toJSON(message.status) : undefined);
    message.symbol !== undefined && (obj.symbol = message.symbol);
    message.marketId !== undefined && (obj.marketId = (message.marketId || Long.ZERO).toString());
    message.exchange !== undefined && (obj.exchange = message.exchange);
    message.channelId !== undefined && (obj.channelId = Math.round(message.channelId));
    message.numberOfDefinitions !== undefined && (obj.numberOfDefinitions = Math.round(message.numberOfDefinitions));
    message.subscriptionType !== undefined && (obj.subscriptionType = subscriptionTypeToJSON(message.subscriptionType));
    message.unsubscribe !== undefined && (obj.unsubscribe = message.unsubscribe);
    message.snapshotIntervalSeconds !== undefined &&
      (obj.snapshotIntervalSeconds = Math.round(message.snapshotIntervalSeconds));
    return obj;
  },

  fromPartial(object: DeepPartial<SubscriptionResponse>): SubscriptionResponse {
    const message = createBaseSubscriptionResponse();
    message.correlationId = (object.correlationId !== undefined && object.correlationId !== null)
      ? Long.fromValue(object.correlationId)
      : Long.ZERO;
    message.status = (object.status !== undefined && object.status !== null)
      ? Status.fromPartial(object.status)
      : undefined;
    message.symbol = object.symbol ?? "";
    message.marketId = (object.marketId !== undefined && object.marketId !== null)
      ? Long.fromValue(object.marketId)
      : Long.ZERO;
    message.exchange = object.exchange ?? "";
    message.channelId = object.channelId ?? 0;
    message.numberOfDefinitions = object.numberOfDefinitions ?? 0;
    message.subscriptionType = object.subscriptionType ?? 0;
    message.unsubscribe = object.unsubscribe ?? false;
    message.snapshotIntervalSeconds = object.snapshotIntervalSeconds ?? 0;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
