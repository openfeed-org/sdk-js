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
  VolumeAtPrice,
} from "./openfeed";
import { InstrumentDefinition, InstrumentDefinition_InstrumentType } from "./openfeed_instrument";

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

/** / Symbol type for the subscription filter. */
export enum SymbolType {
  BARCHART = 0,
  EXCHANGE = 1,
  UNRECOGNIZED = -1,
}

/** / Openfeed Server request */
export interface OpenfeedGatewayRequest {
  loginRequest?: LoginRequest | undefined;
  logoutRequest?: LogoutRequest | undefined;
  subscriptionRequest?: SubscriptionRequest | undefined;
  instrumentRequest?: InstrumentRequest | undefined;
  instrumentReferenceRequest?: InstrumentReferenceRequest | undefined;
  exchangeRequest?: ExchangeRequest | undefined;
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

          message.loginRequest = LoginRequest.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.logoutRequest = LogoutRequest.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.subscriptionRequest = SubscriptionRequest.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.instrumentRequest = InstrumentRequest.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.instrumentReferenceRequest = InstrumentReferenceRequest.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.exchangeRequest = ExchangeRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
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

          message.loginResponse = LoginResponse.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.logoutResponse = LogoutResponse.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.instrumentResponse = InstrumentResponse.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.instrumentReferenceResponse = InstrumentReferenceResponse.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.subscriptionResponse = SubscriptionResponse.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.marketStatus = MarketStatus.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.heartBeat = HeartBeat.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.instrumentDefinition = InstrumentDefinition.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.marketSnapshot = MarketSnapshot.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.marketUpdate = MarketUpdate.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.volumeAtPrice = VolumeAtPrice.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.ohlc = Ohlc.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.exchangeResponse = ExchangeResponse.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.instrumentAction = InstrumentAction.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
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

          message.status = Status.decode(reader, reader.uint32());
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

          message.status = Status.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
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
    exchangeId: 0,
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
    if (message.exchangeId !== 0) {
      writer.uint32(64).sint32(message.exchangeId);
    }
    return writer;
  },

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

          message.status = Status.decode(reader, reader.uint32());
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
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
    exchangeId: 0,
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
    if (message.exchangeId !== 0) {
      writer.uint32(96).sint32(message.exchangeId);
    }
    return writer;
  },

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

          message.status = Status.decode(reader, reader.uint32());
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

          message.status = Status.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.exchanges.push(ExchangeResponse_Exchange.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
};

function createBaseExchangeResponse_Exchange(): ExchangeResponse_Exchange {
  return { code: "", description: "", aliases: [], exchangeId: 0 };
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
    if (message.exchangeId !== 0) {
      writer.uint32(32).sint32(message.exchangeId);
    }
    return writer;
  },

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

          message.requests.push(SubscriptionRequest_Request.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
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

          message.bulkSubscriptionFilter.push(BulkSubscriptionFilter.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
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

          message.status = Status.decode(reader, reader.uint32());
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
  },
};

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
