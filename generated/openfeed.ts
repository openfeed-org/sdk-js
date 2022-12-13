/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { InstrumentDefinition } from "./openfeed_instrument";

/** / Book side */
export enum BookSide {
  UNKNOWN_BOOK_SIDE = 0,
  BID = 1,
  OFFER = 2,
  UNRECOGNIZED = -1,
}

export function bookSideFromJSON(object: any): BookSide {
  switch (object) {
    case 0:
    case "UNKNOWN_BOOK_SIDE":
      return BookSide.UNKNOWN_BOOK_SIDE;
    case 1:
    case "BID":
      return BookSide.BID;
    case 2:
    case "OFFER":
      return BookSide.OFFER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BookSide.UNRECOGNIZED;
  }
}

export function bookSideToJSON(object: BookSide): string {
  switch (object) {
    case BookSide.UNKNOWN_BOOK_SIDE:
      return "UNKNOWN_BOOK_SIDE";
    case BookSide.BID:
      return "BID";
    case BookSide.OFFER:
      return "OFFER";
    case BookSide.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum InstrumentTradingStatus {
  UNKNOWN_TRADING_STATUS = 0,
  TRADING_RESUME = 1,
  PRE_OPEN = 2,
  OPEN = 3,
  PRE_CLOSE = 4,
  CLOSE = 5,
  TRADING_HALT = 6,
  QUOTATION_RESUME = 7,
  OPEN_DELAY = 8,
  NO_OPEN_NO_RESUME = 9,
  FAST_MARKET = 10,
  FAST_MARKET_END = 11,
  LATE_MARKET = 12,
  LATE_MARKET_END = 13,
  POST_SESSION = 14,
  POST_SESSION_END = 15,
  NEW_PRICE_INDICATION = 16,
  NOT_AVAILABLE_FOR_TRADING = 17,
  PRE_CROSS = 18,
  CROSS = 19,
  POST_CLOSE = 20,
  NO_CHANGE = 21,
  /** NAFT - Not available for trading. */
  NAFT = 22,
  TRADING_RANGE_INDICATION = 23,
  MARKET_IMBALANCE_BUY = 24,
  MARKET_IMBALANCE_SELL = 25,
  /** MOC_IMBALANCE_BUY - Market On Close Imbalance Buy */
  MOC_IMBALANCE_BUY = 26,
  MOC_IMBALANCE_SELL = 27,
  NO_MARKET_IMBALANCE = 28,
  NO_MOC_IMBALANCE = 29,
  SHORT_SELL_RESTRICTION = 30,
  LIMIT_UP_LIMIT_DOWN = 31,
  UNRECOGNIZED = -1,
}

export function instrumentTradingStatusFromJSON(object: any): InstrumentTradingStatus {
  switch (object) {
    case 0:
    case "UNKNOWN_TRADING_STATUS":
      return InstrumentTradingStatus.UNKNOWN_TRADING_STATUS;
    case 1:
    case "TRADING_RESUME":
      return InstrumentTradingStatus.TRADING_RESUME;
    case 2:
    case "PRE_OPEN":
      return InstrumentTradingStatus.PRE_OPEN;
    case 3:
    case "OPEN":
      return InstrumentTradingStatus.OPEN;
    case 4:
    case "PRE_CLOSE":
      return InstrumentTradingStatus.PRE_CLOSE;
    case 5:
    case "CLOSE":
      return InstrumentTradingStatus.CLOSE;
    case 6:
    case "TRADING_HALT":
      return InstrumentTradingStatus.TRADING_HALT;
    case 7:
    case "QUOTATION_RESUME":
      return InstrumentTradingStatus.QUOTATION_RESUME;
    case 8:
    case "OPEN_DELAY":
      return InstrumentTradingStatus.OPEN_DELAY;
    case 9:
    case "NO_OPEN_NO_RESUME":
      return InstrumentTradingStatus.NO_OPEN_NO_RESUME;
    case 10:
    case "FAST_MARKET":
      return InstrumentTradingStatus.FAST_MARKET;
    case 11:
    case "FAST_MARKET_END":
      return InstrumentTradingStatus.FAST_MARKET_END;
    case 12:
    case "LATE_MARKET":
      return InstrumentTradingStatus.LATE_MARKET;
    case 13:
    case "LATE_MARKET_END":
      return InstrumentTradingStatus.LATE_MARKET_END;
    case 14:
    case "POST_SESSION":
      return InstrumentTradingStatus.POST_SESSION;
    case 15:
    case "POST_SESSION_END":
      return InstrumentTradingStatus.POST_SESSION_END;
    case 16:
    case "NEW_PRICE_INDICATION":
      return InstrumentTradingStatus.NEW_PRICE_INDICATION;
    case 17:
    case "NOT_AVAILABLE_FOR_TRADING":
      return InstrumentTradingStatus.NOT_AVAILABLE_FOR_TRADING;
    case 18:
    case "PRE_CROSS":
      return InstrumentTradingStatus.PRE_CROSS;
    case 19:
    case "CROSS":
      return InstrumentTradingStatus.CROSS;
    case 20:
    case "POST_CLOSE":
      return InstrumentTradingStatus.POST_CLOSE;
    case 21:
    case "NO_CHANGE":
      return InstrumentTradingStatus.NO_CHANGE;
    case 22:
    case "NAFT":
      return InstrumentTradingStatus.NAFT;
    case 23:
    case "TRADING_RANGE_INDICATION":
      return InstrumentTradingStatus.TRADING_RANGE_INDICATION;
    case 24:
    case "MARKET_IMBALANCE_BUY":
      return InstrumentTradingStatus.MARKET_IMBALANCE_BUY;
    case 25:
    case "MARKET_IMBALANCE_SELL":
      return InstrumentTradingStatus.MARKET_IMBALANCE_SELL;
    case 26:
    case "MOC_IMBALANCE_BUY":
      return InstrumentTradingStatus.MOC_IMBALANCE_BUY;
    case 27:
    case "MOC_IMBALANCE_SELL":
      return InstrumentTradingStatus.MOC_IMBALANCE_SELL;
    case 28:
    case "NO_MARKET_IMBALANCE":
      return InstrumentTradingStatus.NO_MARKET_IMBALANCE;
    case 29:
    case "NO_MOC_IMBALANCE":
      return InstrumentTradingStatus.NO_MOC_IMBALANCE;
    case 30:
    case "SHORT_SELL_RESTRICTION":
      return InstrumentTradingStatus.SHORT_SELL_RESTRICTION;
    case 31:
    case "LIMIT_UP_LIMIT_DOWN":
      return InstrumentTradingStatus.LIMIT_UP_LIMIT_DOWN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return InstrumentTradingStatus.UNRECOGNIZED;
  }
}

export function instrumentTradingStatusToJSON(object: InstrumentTradingStatus): string {
  switch (object) {
    case InstrumentTradingStatus.UNKNOWN_TRADING_STATUS:
      return "UNKNOWN_TRADING_STATUS";
    case InstrumentTradingStatus.TRADING_RESUME:
      return "TRADING_RESUME";
    case InstrumentTradingStatus.PRE_OPEN:
      return "PRE_OPEN";
    case InstrumentTradingStatus.OPEN:
      return "OPEN";
    case InstrumentTradingStatus.PRE_CLOSE:
      return "PRE_CLOSE";
    case InstrumentTradingStatus.CLOSE:
      return "CLOSE";
    case InstrumentTradingStatus.TRADING_HALT:
      return "TRADING_HALT";
    case InstrumentTradingStatus.QUOTATION_RESUME:
      return "QUOTATION_RESUME";
    case InstrumentTradingStatus.OPEN_DELAY:
      return "OPEN_DELAY";
    case InstrumentTradingStatus.NO_OPEN_NO_RESUME:
      return "NO_OPEN_NO_RESUME";
    case InstrumentTradingStatus.FAST_MARKET:
      return "FAST_MARKET";
    case InstrumentTradingStatus.FAST_MARKET_END:
      return "FAST_MARKET_END";
    case InstrumentTradingStatus.LATE_MARKET:
      return "LATE_MARKET";
    case InstrumentTradingStatus.LATE_MARKET_END:
      return "LATE_MARKET_END";
    case InstrumentTradingStatus.POST_SESSION:
      return "POST_SESSION";
    case InstrumentTradingStatus.POST_SESSION_END:
      return "POST_SESSION_END";
    case InstrumentTradingStatus.NEW_PRICE_INDICATION:
      return "NEW_PRICE_INDICATION";
    case InstrumentTradingStatus.NOT_AVAILABLE_FOR_TRADING:
      return "NOT_AVAILABLE_FOR_TRADING";
    case InstrumentTradingStatus.PRE_CROSS:
      return "PRE_CROSS";
    case InstrumentTradingStatus.CROSS:
      return "CROSS";
    case InstrumentTradingStatus.POST_CLOSE:
      return "POST_CLOSE";
    case InstrumentTradingStatus.NO_CHANGE:
      return "NO_CHANGE";
    case InstrumentTradingStatus.NAFT:
      return "NAFT";
    case InstrumentTradingStatus.TRADING_RANGE_INDICATION:
      return "TRADING_RANGE_INDICATION";
    case InstrumentTradingStatus.MARKET_IMBALANCE_BUY:
      return "MARKET_IMBALANCE_BUY";
    case InstrumentTradingStatus.MARKET_IMBALANCE_SELL:
      return "MARKET_IMBALANCE_SELL";
    case InstrumentTradingStatus.MOC_IMBALANCE_BUY:
      return "MOC_IMBALANCE_BUY";
    case InstrumentTradingStatus.MOC_IMBALANCE_SELL:
      return "MOC_IMBALANCE_SELL";
    case InstrumentTradingStatus.NO_MARKET_IMBALANCE:
      return "NO_MARKET_IMBALANCE";
    case InstrumentTradingStatus.NO_MOC_IMBALANCE:
      return "NO_MOC_IMBALANCE";
    case InstrumentTradingStatus.SHORT_SELL_RESTRICTION:
      return "SHORT_SELL_RESTRICTION";
    case InstrumentTradingStatus.LIMIT_UP_LIMIT_DOWN:
      return "LIMIT_UP_LIMIT_DOWN";
    case InstrumentTradingStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum RegulationSHOShortSalePriceTest {
  UNKNOWN_PRICE_TEST = 0,
  PRICE_TEST_NONE = 1,
  PRICE_TEST_IN_EFFECT = 2,
  PRICE_TEST_REMAINS_IN_EFFECT = 3,
  UNRECOGNIZED = -1,
}

export function regulationSHOShortSalePriceTestFromJSON(object: any): RegulationSHOShortSalePriceTest {
  switch (object) {
    case 0:
    case "UNKNOWN_PRICE_TEST":
      return RegulationSHOShortSalePriceTest.UNKNOWN_PRICE_TEST;
    case 1:
    case "PRICE_TEST_NONE":
      return RegulationSHOShortSalePriceTest.PRICE_TEST_NONE;
    case 2:
    case "PRICE_TEST_IN_EFFECT":
      return RegulationSHOShortSalePriceTest.PRICE_TEST_IN_EFFECT;
    case 3:
    case "PRICE_TEST_REMAINS_IN_EFFECT":
      return RegulationSHOShortSalePriceTest.PRICE_TEST_REMAINS_IN_EFFECT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RegulationSHOShortSalePriceTest.UNRECOGNIZED;
  }
}

export function regulationSHOShortSalePriceTestToJSON(object: RegulationSHOShortSalePriceTest): string {
  switch (object) {
    case RegulationSHOShortSalePriceTest.UNKNOWN_PRICE_TEST:
      return "UNKNOWN_PRICE_TEST";
    case RegulationSHOShortSalePriceTest.PRICE_TEST_NONE:
      return "PRICE_TEST_NONE";
    case RegulationSHOShortSalePriceTest.PRICE_TEST_IN_EFFECT:
      return "PRICE_TEST_IN_EFFECT";
    case RegulationSHOShortSalePriceTest.PRICE_TEST_REMAINS_IN_EFFECT:
      return "PRICE_TEST_REMAINS_IN_EFFECT";
    case RegulationSHOShortSalePriceTest.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum SettlementTerms {
  UNKNOWN_SETTLEMENT_TERMS = 0,
  CASH = 1,
  NON_NET = 2,
  CONTINGENT_TRADE = 3,
  CASH_TODAY = 4,
  DATE = 5,
  UNRECOGNIZED = -1,
}

export function settlementTermsFromJSON(object: any): SettlementTerms {
  switch (object) {
    case 0:
    case "UNKNOWN_SETTLEMENT_TERMS":
      return SettlementTerms.UNKNOWN_SETTLEMENT_TERMS;
    case 1:
    case "CASH":
      return SettlementTerms.CASH;
    case 2:
    case "NON_NET":
      return SettlementTerms.NON_NET;
    case 3:
    case "CONTINGENT_TRADE":
      return SettlementTerms.CONTINGENT_TRADE;
    case 4:
    case "CASH_TODAY":
      return SettlementTerms.CASH_TODAY;
    case 5:
    case "DATE":
      return SettlementTerms.DATE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SettlementTerms.UNRECOGNIZED;
  }
}

export function settlementTermsToJSON(object: SettlementTerms): string {
  switch (object) {
    case SettlementTerms.UNKNOWN_SETTLEMENT_TERMS:
      return "UNKNOWN_SETTLEMENT_TERMS";
    case SettlementTerms.CASH:
      return "CASH";
    case SettlementTerms.NON_NET:
      return "NON_NET";
    case SettlementTerms.CONTINGENT_TRADE:
      return "CONTINGENT_TRADE";
    case SettlementTerms.CASH_TODAY:
      return "CASH_TODAY";
    case SettlementTerms.DATE:
      return "DATE";
    case SettlementTerms.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum CrossType {
  UNKNOWN_CROSS_TYPE = 0,
  DEFAULT = 1,
  INTERNAL = 2,
  BASIS = 3,
  CONTINGENT = 4,
  SPECIAL = 5,
  VWAP = 6,
  REGULAR = 7,
  UNRECOGNIZED = -1,
}

export function crossTypeFromJSON(object: any): CrossType {
  switch (object) {
    case 0:
    case "UNKNOWN_CROSS_TYPE":
      return CrossType.UNKNOWN_CROSS_TYPE;
    case 1:
    case "DEFAULT":
      return CrossType.DEFAULT;
    case 2:
    case "INTERNAL":
      return CrossType.INTERNAL;
    case 3:
    case "BASIS":
      return CrossType.BASIS;
    case 4:
    case "CONTINGENT":
      return CrossType.CONTINGENT;
    case 5:
    case "SPECIAL":
      return CrossType.SPECIAL;
    case 6:
    case "VWAP":
      return CrossType.VWAP;
    case 7:
    case "REGULAR":
      return CrossType.REGULAR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CrossType.UNRECOGNIZED;
  }
}

export function crossTypeToJSON(object: CrossType): string {
  switch (object) {
    case CrossType.UNKNOWN_CROSS_TYPE:
      return "UNKNOWN_CROSS_TYPE";
    case CrossType.DEFAULT:
      return "DEFAULT";
    case CrossType.INTERNAL:
      return "INTERNAL";
    case CrossType.BASIS:
      return "BASIS";
    case CrossType.CONTINGENT:
      return "CONTINGENT";
    case CrossType.SPECIAL:
      return "SPECIAL";
    case CrossType.VWAP:
      return "VWAP";
    case CrossType.REGULAR:
      return "REGULAR";
    case CrossType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum OpenCloseSettlementFlag {
  UNKNOWN = 0,
  DAILY_OPEN = 1,
  INDICATIVE_OPEN_PRICE = 2,
  UNRECOGNIZED = -1,
}

export function openCloseSettlementFlagFromJSON(object: any): OpenCloseSettlementFlag {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return OpenCloseSettlementFlag.UNKNOWN;
    case 1:
    case "DAILY_OPEN":
      return OpenCloseSettlementFlag.DAILY_OPEN;
    case 2:
    case "INDICATIVE_OPEN_PRICE":
      return OpenCloseSettlementFlag.INDICATIVE_OPEN_PRICE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OpenCloseSettlementFlag.UNRECOGNIZED;
  }
}

export function openCloseSettlementFlagToJSON(object: OpenCloseSettlementFlag): string {
  switch (object) {
    case OpenCloseSettlementFlag.UNKNOWN:
      return "UNKNOWN";
    case OpenCloseSettlementFlag.DAILY_OPEN:
      return "DAILY_OPEN";
    case OpenCloseSettlementFlag.INDICATIVE_OPEN_PRICE:
      return "INDICATIVE_OPEN_PRICE";
    case OpenCloseSettlementFlag.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum SettlementSource {
  UNKNOWN_SETTLEMENT_SOURCE = 0,
  GLOBEX = 1,
  ITC = 2,
  MANUAL = 3,
  UNRECOGNIZED = -1,
}

export function settlementSourceFromJSON(object: any): SettlementSource {
  switch (object) {
    case 0:
    case "UNKNOWN_SETTLEMENT_SOURCE":
      return SettlementSource.UNKNOWN_SETTLEMENT_SOURCE;
    case 1:
    case "GLOBEX":
      return SettlementSource.GLOBEX;
    case 2:
    case "ITC":
      return SettlementSource.ITC;
    case 3:
    case "MANUAL":
      return SettlementSource.MANUAL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SettlementSource.UNRECOGNIZED;
  }
}

export function settlementSourceToJSON(object: SettlementSource): string {
  switch (object) {
    case SettlementSource.UNKNOWN_SETTLEMENT_SOURCE:
      return "UNKNOWN_SETTLEMENT_SOURCE";
    case SettlementSource.GLOBEX:
      return "GLOBEX";
    case SettlementSource.ITC:
      return "ITC";
    case SettlementSource.MANUAL:
      return "MANUAL";
    case SettlementSource.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum Service {
  UNKNOWN_SERVICE = 0,
  REAL_TIME = 1,
  DELAYED = 2,
  REAL_TIME_SNAPSHOT = 3,
  DELAYED_SNAPSHOT = 4,
  END_OF_DAY = 5,
  UNRECOGNIZED = -1,
}

export function serviceFromJSON(object: any): Service {
  switch (object) {
    case 0:
    case "UNKNOWN_SERVICE":
      return Service.UNKNOWN_SERVICE;
    case 1:
    case "REAL_TIME":
      return Service.REAL_TIME;
    case 2:
    case "DELAYED":
      return Service.DELAYED;
    case 3:
    case "REAL_TIME_SNAPSHOT":
      return Service.REAL_TIME_SNAPSHOT;
    case 4:
    case "DELAYED_SNAPSHOT":
      return Service.DELAYED_SNAPSHOT;
    case 5:
    case "END_OF_DAY":
      return Service.END_OF_DAY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Service.UNRECOGNIZED;
  }
}

export function serviceToJSON(object: Service): string {
  switch (object) {
    case Service.UNKNOWN_SERVICE:
      return "UNKNOWN_SERVICE";
    case Service.REAL_TIME:
      return "REAL_TIME";
    case Service.DELAYED:
      return "DELAYED";
    case Service.REAL_TIME_SNAPSHOT:
      return "REAL_TIME_SNAPSHOT";
    case Service.DELAYED_SNAPSHOT:
      return "DELAYED_SNAPSHOT";
    case Service.END_OF_DAY:
      return "END_OF_DAY";
    case Service.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum MarketWideStatus {
  STATUS_UNKNOWN = 0,
  STATUS_START_OF_DAY = 1,
  STATUS_END_OF_DAY = 2,
  STATUS_OPEN = 3,
  STATUS_CLOSE = 4,
  UNRECOGNIZED = -1,
}

export function marketWideStatusFromJSON(object: any): MarketWideStatus {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return MarketWideStatus.STATUS_UNKNOWN;
    case 1:
    case "STATUS_START_OF_DAY":
      return MarketWideStatus.STATUS_START_OF_DAY;
    case 2:
    case "STATUS_END_OF_DAY":
      return MarketWideStatus.STATUS_END_OF_DAY;
    case 3:
    case "STATUS_OPEN":
      return MarketWideStatus.STATUS_OPEN;
    case 4:
    case "STATUS_CLOSE":
      return MarketWideStatus.STATUS_CLOSE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MarketWideStatus.UNRECOGNIZED;
  }
}

export function marketWideStatusToJSON(object: MarketWideStatus): string {
  switch (object) {
    case MarketWideStatus.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case MarketWideStatus.STATUS_START_OF_DAY:
      return "STATUS_START_OF_DAY";
    case MarketWideStatus.STATUS_END_OF_DAY:
      return "STATUS_END_OF_DAY";
    case MarketWideStatus.STATUS_OPEN:
      return "STATUS_OPEN";
    case MarketWideStatus.STATUS_CLOSE:
      return "STATUS_CLOSE";
    case MarketWideStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum SnapshotRequestResult {
  SNAPSHOT_REQUEST_UNKNOWN_RESULT = 0,
  SNAPSHOT_REQUEST_SUCCESS = 1,
  SNAPSHOT_REQUEST_NOT_FOUND = 2,
  SNAPSHOT_REQUEST_SERVICE_NOT_AVAILABLE = 3,
  SNAPSHOT_REQUEST_GENERIC_FAILURE = 4,
  UNRECOGNIZED = -1,
}

export function snapshotRequestResultFromJSON(object: any): SnapshotRequestResult {
  switch (object) {
    case 0:
    case "SNAPSHOT_REQUEST_UNKNOWN_RESULT":
      return SnapshotRequestResult.SNAPSHOT_REQUEST_UNKNOWN_RESULT;
    case 1:
    case "SNAPSHOT_REQUEST_SUCCESS":
      return SnapshotRequestResult.SNAPSHOT_REQUEST_SUCCESS;
    case 2:
    case "SNAPSHOT_REQUEST_NOT_FOUND":
      return SnapshotRequestResult.SNAPSHOT_REQUEST_NOT_FOUND;
    case 3:
    case "SNAPSHOT_REQUEST_SERVICE_NOT_AVAILABLE":
      return SnapshotRequestResult.SNAPSHOT_REQUEST_SERVICE_NOT_AVAILABLE;
    case 4:
    case "SNAPSHOT_REQUEST_GENERIC_FAILURE":
      return SnapshotRequestResult.SNAPSHOT_REQUEST_GENERIC_FAILURE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SnapshotRequestResult.UNRECOGNIZED;
  }
}

export function snapshotRequestResultToJSON(object: SnapshotRequestResult): string {
  switch (object) {
    case SnapshotRequestResult.SNAPSHOT_REQUEST_UNKNOWN_RESULT:
      return "SNAPSHOT_REQUEST_UNKNOWN_RESULT";
    case SnapshotRequestResult.SNAPSHOT_REQUEST_SUCCESS:
      return "SNAPSHOT_REQUEST_SUCCESS";
    case SnapshotRequestResult.SNAPSHOT_REQUEST_NOT_FOUND:
      return "SNAPSHOT_REQUEST_NOT_FOUND";
    case SnapshotRequestResult.SNAPSHOT_REQUEST_SERVICE_NOT_AVAILABLE:
      return "SNAPSHOT_REQUEST_SERVICE_NOT_AVAILABLE";
    case SnapshotRequestResult.SNAPSHOT_REQUEST_GENERIC_FAILURE:
      return "SNAPSHOT_REQUEST_GENERIC_FAILURE";
    case SnapshotRequestResult.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** / Instrument Actions */
export enum ActionType {
  UNKNOWN_ACTION = 0,
  LISTING = 1,
  DELISTING = 2,
  EXCHANGE_MOVE = 3,
  UNRECOGNIZED = -1,
}

export function actionTypeFromJSON(object: any): ActionType {
  switch (object) {
    case 0:
    case "UNKNOWN_ACTION":
      return ActionType.UNKNOWN_ACTION;
    case 1:
    case "LISTING":
      return ActionType.LISTING;
    case 2:
    case "DELISTING":
      return ActionType.DELISTING;
    case 3:
    case "EXCHANGE_MOVE":
      return ActionType.EXCHANGE_MOVE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ActionType.UNRECOGNIZED;
  }
}

export function actionTypeToJSON(object: ActionType): string {
  switch (object) {
    case ActionType.UNKNOWN_ACTION:
      return "UNKNOWN_ACTION";
    case ActionType.LISTING:
      return "LISTING";
    case ActionType.DELISTING:
      return "DELISTING";
    case ActionType.EXCHANGE_MOVE:
      return "EXCHANGE_MOVE";
    case ActionType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * / A wrapper for Openfeed data.  Will contain exactly one of the supported
 * message types
 */
export interface OpenfeedMessage {
  /** / Nanoecond unix epoch at time of message transmission (UTC) */
  sendingTime: Long;
  /**
   * / The total number of markets available on this channel
   * at the time the message was sent.  For UDP snapshot and definition feeds.
   */
  totalCount: number;
  /**
   * / The most recent packet sequence number sent on the incremental feed
   * at the time this message was sent.  For UDP snapshot and definition feeds.
   */
  syncSequence: Long;
  /** Feed specific context data */
  context: Context | undefined;
  channelReset: ChannelReset | undefined;
  heartBeat: HeartBeat | undefined;
  adminMessage: AdminMessage | undefined;
  instrumentDefinition: InstrumentDefinition | undefined;
  instrumentGroupStatus: InstrumentGroupStatus | undefined;
  marketSnapshot: MarketSnapshot | undefined;
  marketUpdate: MarketUpdate | undefined;
  marketStatus: MarketStatus | undefined;
  eodCommoditySummary: EODCommoditySummary | undefined;
  instrumentAction: InstrumentAction | undefined;
}

/** Channel Reset */
export interface ChannelReset {
  channel: number;
  transactionTime: Long;
}

/** / Heart Beat */
export interface HeartBeat {
  /** / UTC timestamp of transaction, nano seconds since Unix epoch */
  transactionTime: Long;
  status: string;
  exchange: boolean;
  channel: number;
}

/** Administrative Message */
export interface AdminMessage {
  /** Origination time = UTC timestamp nano seconds since Unix epoch */
  originationTime: Long;
  source: string;
  languageCode: string;
  headLine: string;
  text: string;
  status: AdminMessage_Status;
  channel: number;
}

export enum AdminMessage_Status {
  OK = 0,
  UNRECOGNIZED = -1,
}

export function adminMessage_StatusFromJSON(object: any): AdminMessage_Status {
  switch (object) {
    case 0:
    case "OK":
      return AdminMessage_Status.OK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AdminMessage_Status.UNRECOGNIZED;
  }
}

export function adminMessage_StatusToJSON(object: AdminMessage_Status): string {
  switch (object) {
    case AdminMessage_Status.OK:
      return "OK";
    case AdminMessage_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** / Instrument Group Status */
export interface InstrumentGroupStatus {
  /** / UTC Timestamp of transaction, nano seconds since Unix epoch */
  transactionTime: Long;
  instrumentGroupId: string;
  tradingStatus: InstrumentTradingStatus;
  tradeDate: number;
  channel: number;
}

/** / Market Status */
export interface MarketStatus {
  /** / UTC Timestamp of transaction, nano seconds since Unix epoch */
  transactionTime: Long;
  channel: number;
  marketWideStatus: MarketWideStatus;
}

/**
 * / EOD commodity summary. Used to represent consolidated total values for the group of contracts. Total volume for
 * / all ES futures, for example.
 */
export interface EODCommoditySummary {
  /** / Trade date in the format YYYYMMDD */
  tradeDate: number;
  /** / Contract root, for example ES. */
  contractRoot: string;
  /** / Consolidated volume. */
  consolidatedVolume: Long;
  /** Consolidated open interest. */
  consolidatedOpenInterest: Long;
  /** / For internal use only.   Ignore */
  auxiliaryData: Uint8Array;
}

/** / Session used in snapshot. */
export interface MarketSession {
  /** / Date only, format 2012-07-04 -> 20120704 */
  tradeDate: number;
  /** / Most recent opening price */
  open:
    | Open
    | undefined;
  /** / High price for the trading session */
  high:
    | High
    | undefined;
  /** / Low price for the trading session */
  low:
    | Low
    | undefined;
  /** / Most recent traded price and quantity */
  last:
    | Last
    | undefined;
  /** / Total traded volume */
  volume:
    | Volume
    | undefined;
  /** / Most recent settlement price */
  settlement:
    | Settlement
    | undefined;
  /** / Most recent settlement price */
  prevSettlement:
    | Settlement
    | undefined;
  /** / Most recent open interest */
  openInterest:
    | OpenInterest
    | undefined;
  /** / Number of trades */
  numberOfTrades:
    | NumberOfTrades
    | undefined;
  /** / Monetary value */
  monetaryValue:
    | MonetaryValue
    | undefined;
  /** UTC Timestamp, nano seconds since Unix epoch */
  transactionTime: Long;
}

/** / Snapshot for a market */
export interface MarketSnapshot {
  /** / Unique id identifying the market */
  marketId: Long;
  /** UTC Timestamp of transaction, nano seconds since Unix epoch */
  transactionTime: Long;
  /** Instrument level sequence number */
  marketSequence: Long;
  /** / Date only, format 2012-07-04 -> 20120704 */
  tradeDate: number;
  /**
   * / A snapshot with market depth may exceed the maximum message size.
   *  In that case, the snapshot will be broken up across multiple
   *  snapshot messages.
   */
  totalChunks: number;
  currentChunk: number;
  /** Optional symbol identifier */
  symbol: string;
  /**
   * / Divide prices by this value to get real price values.  Optional, use value
   * / from InstrumentDefinition if not set.
   */
  priceDenominator: number;
  /**  */
  service: Service;
  /**  */
  instrumentStatus:
    | InstrumentStatus
    | undefined;
  /** Best Bid Offer */
  bbo:
    | BestBidOffer
    | undefined;
  /** Index Value */
  index:
    | IndexValue
    | undefined;
  /** Price Level Book */
  priceLevels: AddPriceLevel[];
  /** Order Book */
  orders: AddOrder[];
  news:
    | News
    | undefined;
  /** / Most recent opening price */
  open:
    | Open
    | undefined;
  /** / High price for the trading session */
  high:
    | High
    | undefined;
  /** / Low price for the trading session */
  low:
    | Low
    | undefined;
  /** / Most recent closing price */
  close:
    | Close
    | undefined;
  /** / Previous closing price */
  prevClose:
    | PrevClose
    | undefined;
  /** / Most recent traded price and quantity */
  last:
    | Last
    | undefined;
  /** / Year high price */
  yearHigh:
    | YearHigh
    | undefined;
  /** / Year low price */
  yearLow:
    | YearLow
    | undefined;
  /** / Total traded volume */
  volume:
    | Volume
    | undefined;
  /** / Most recent settlement price */
  settlement:
    | Settlement
    | undefined;
  /** / Most recent open interest */
  openInterest:
    | OpenInterest
    | undefined;
  /** / Most recent volume weighted average price */
  vwap: Vwap | undefined;
  dividendsIncomeDistributions: DividendsIncomeDistributions | undefined;
  numberOfTrades: NumberOfTrades | undefined;
  monetaryValue: MonetaryValue | undefined;
  capitalDistributions: CapitalDistributions | undefined;
  sharesOutstanding: SharesOutstanding | undefined;
  netAssetValue:
    | NetAssetValue
    | undefined;
  /** / Previous session. */
  previousSession:
    | MarketSession
    | undefined;
  /** / 'T' session. */
  tSession:
    | MarketSession
    | undefined;
  /** / Volume at price. Used by the market state/ JERQ. */
  volumeAtPrice: VolumeAtPrice | undefined;
  highRolling: HighRolling | undefined;
  lowRolling:
    | LowRolling
    | undefined;
  /** / 'Z' session. Includes all trades, even the ones that do not update Last. */
  zSession: MarketSession | undefined;
}

/** Used by market state to return snapshot. */
export interface MarketSnapshotResponse {
  result: SnapshotRequestResult;
  message: string;
  marketSnapshot: MarketSnapshot | undefined;
}

/** Market Update for an instrument */
export interface MarketUpdate {
  /** / Unique id identifying the market */
  marketId: Long;
  /** Optional symbol identifier */
  symbol: string;
  /**
   * / UTC Timestamp of transaction, nano seconds since Unix epoch
   * / This is usually the execution venue timestamp.
   */
  transactionTime: Long;
  /** / Distribution time in nano seconds since epoch. */
  distributionTime: Long;
  /** / Market level sequencing number */
  marketSequence: Long;
  /** / Data source sequence number */
  sourceSequence: Long;
  /** Market participant/originator */
  originatorId: Uint8Array;
  /**
   * / Divide prices by this value to get real price values.  Optional, use value
   * / from InstrumentDefinition if not set.
   */
  priceDenominator: number;
  /** Feed specific context data set as required. */
  context:
    | Context
    | undefined;
  /** / Current session. This is used to 'enhance' updates from the translator in the Market State */
  session:
    | MarketSession
    | undefined;
  /** / 'T' session. This is used to 'enhance' updates from the translator in the Market State */
  tSession:
    | MarketSession
    | undefined;
  /** / Previous session. This is used to 'enhance' updates from the translator in the Market State */
  previousSession:
    | MarketSession
    | undefined;
  /** / True if message applies to regional/participant member */
  regional: boolean;
  /** / 'Z' session. Includes all trades, even the ones that do not update Last. */
  zSession: MarketSession | undefined;
  news: News | undefined;
  clearBook: ClearBook | undefined;
  instrumentStatus: InstrumentStatus | undefined;
  bbo: BestBidOffer | undefined;
  depthPriceLevel: DepthPriceLevel | undefined;
  depthOrder: DepthOrder | undefined;
  index: IndexValue | undefined;
  trades: Trades | undefined;
  open: Open | undefined;
  high: High | undefined;
  low: Low | undefined;
  close: Close | undefined;
  prevClose: PrevClose | undefined;
  last: Last | undefined;
  yearHigh: YearHigh | undefined;
  yearLow: YearLow | undefined;
  volume: Volume | undefined;
  settlement: Settlement | undefined;
  openInterest: OpenInterest | undefined;
  vwap: Vwap | undefined;
  dividendsIncomeDistributions: DividendsIncomeDistributions | undefined;
  numberOfTrades: NumberOfTrades | undefined;
  monetaryValue: MonetaryValue | undefined;
  capitalDistributions: CapitalDistributions | undefined;
  sharesOutstanding: SharesOutstanding | undefined;
  netAssetValue: NetAssetValue | undefined;
  marketSummary: MarketSummary | undefined;
  highRolling: HighRolling | undefined;
  lowRolling: LowRolling | undefined;
}

/** / Depth Price Level */
export interface DepthPriceLevel {
  levels: DepthPriceLevel_Entry[];
}

export interface DepthPriceLevel_Entry {
  addPriceLevel: AddPriceLevel | undefined;
  deletePriceLevel: DeletePriceLevel | undefined;
  modifyPriceLevel: ModifyPriceLevel | undefined;
}

/** / Depth By Order */
export interface DepthOrder {
  orders: DepthOrder_Entry[];
}

export interface DepthOrder_Entry {
  addOrder: AddOrder | undefined;
  deleteOrder: DeleteOrder | undefined;
  modifyOrder: ModifyOrder | undefined;
}

/** / News or informational message */
export interface News {
  /** Origination time = UTC timestamp nano seconds since Unix epoch */
  originationTime: Long;
  source: string;
  languageCode: string;
  headLine: string;
  text: string;
  symbols: string[];
}

/** / Clear all data from the order books that are configured for this market. */
export interface ClearBook {
  reserved: number;
  transactionTime: Long;
}

/** Instrument Status */
export interface InstrumentStatus {
  /** UTC Timestamp, nano seconds since Unix epoch */
  transactionTime: Long;
  tradingStatus: InstrumentTradingStatus;
  /** UTC Timestamp, nano seconds since Unix epoch */
  openingTime: Long;
  note: string;
  /** / Date only, format 2012-07-04 -> 20120704 */
  tradeDate: number;
  regulationSHOShortSalePriceTest: RegulationSHOShortSalePriceTest;
}

/**
 * / Best Bid and Offer.
 * / If a side is not present, then that side has been deleted.
 * / By default this value is the NBBO, if regional/participant quote then regional = true
 */
export interface BestBidOffer {
  /** UTC Timestamp, nano seconds since Unix epoch */
  transactionTime: Long;
  /** / Divide by priceDenominator */
  bidPrice: Long;
  /** / Divide by quantityDenominator */
  bidQuantity: Long;
  bidOrderCount: number;
  /**
   * / Liquidity provider information
   * For Forex: BANK:CITY
   * For Equities: EXCHANGE_MIC
   */
  bidOriginator: Uint8Array;
  bidQuoteCondition: Uint8Array;
  /** / Divide by priceDenominator */
  offerPrice: Long;
  /** / Divide by quantityDenominator */
  offerQuantity: Long;
  offerOrderCount: number;
  /**
   * / Liquidity provider information
   * For Forex: BANK:CITY
   * For Equities: EXCHANGE_MIC
   */
  offerOriginator: Uint8Array;
  offerQuoteCondition: Uint8Array;
  quoteCondition: Uint8Array;
  /** / True if regional/participant member quote */
  regional: boolean;
  /** / True if not persisted in the EOD database. */
  transient: boolean;
}

/** / Insert a new price level, pushing existing levels down */
export interface AddPriceLevel {
  /** UTC Timestamp, nano seconds since Unix epoch */
  transactionTime: Long;
  /** / price level index, starting at 1 */
  level: number;
  side: BookSide;
  /** / Divide by priceDenominator */
  price: Long;
  /** / Divide by quantityDenominator */
  quantity: Long;
  orderCount: number;
  impliedQuantity: Long;
}

/** / Delete an existing price level, pulling existing levels up */
export interface DeletePriceLevel {
  /** UTC Timestamp, nano seconds since Unix epoch */
  transactionTime: Long;
  /** / price level index, starting at 1 */
  level: number;
  side: BookSide;
}

/**
 * / Modify the quantity or orderCount of an existing price level.
 * / The price itself will not change.
 */
export interface ModifyPriceLevel {
  /** UTC Timestamp, nano seconds since Unix epoch */
  transactionTime: Long;
  /** / price level index, starting at 1 */
  level: number;
  side: BookSide;
  /** / Divide by priceDenominator */
  price: Long;
  /** / Divide by quantityDenominator */
  quantity: Long;
  orderCount: number;
  impliedQuantity: Long;
}

/** Add an order to the order book.  Indexed by orderId, which is unique per channel */
export interface AddOrder {
  transactionTime: Long;
  orderId: Long;
  side: BookSide;
  price: Long;
  quantity: Long;
  isImplied: boolean;
  priority: Long;
}

/** / Delete an order from the order book. Indexed by orderId, which is unique per channel */
export interface DeleteOrder {
  transactionTime: Long;
  orderId: Long;
  side: BookSide;
}

/** / Modify the price or quantity of an order.  The side and implied flag cannot change */
export interface ModifyOrder {
  transactionTime: Long;
  orderId: Long;
  side: BookSide;
  price: Long;
  quantity: Long;
  isImplied: boolean;
  priority: Long;
}

/** / For non-tradable index products */
export interface IndexValue {
  /** UTC Timestamp, nano seconds since Unix epoch */
  transactionTime: Long;
  /** Date only, format 2012-07-04 -> 20120704 */
  tradeDate: number;
  last: Long;
  volume: Long;
  open: Long;
  settlementOpen: Long;
  specialOpen: Long;
  high: Long;
  low: Long;
  close: Long;
  bid: Long;
  offer: Long;
}

/** / Trades */
export interface Trades {
  trades: Trades_Entry[];
}

export interface Trades_Entry {
  trade: Trade | undefined;
  tradeCorrection: TradeCorrection | undefined;
  tradeCancel: TradeCancel | undefined;
}

/** / A live trade.  When received, update the "last" field */
export interface Trade {
  /** Market participant/originator */
  originatorId: Uint8Array;
  /** UTC Timestamp, nano seconds since Unix epoch */
  transactionTime: Long;
  /** / Divide by priceDenominator */
  price: Long;
  /** / Divide by quantityDenominator */
  quantity: Long;
  tradeId: Uint8Array;
  /** / The side of the aggressing order that caused the trade */
  side: BookSide;
  /** / Date only, format 2012-07-04 -> 20120704 */
  tradeDate: number;
  buyerId: Uint8Array;
  sellerId: Uint8Array;
  openingTrade: boolean;
  systemPriced: boolean;
  marketOnClose: boolean;
  oddLot: boolean;
  settlementTerms: SettlementTerms;
  crossType: CrossType;
  byPass: boolean;
  lastPrice: Long;
  saleCondition: Uint8Array;
  currency: string;
  /** Does not update Last */
  doesNotUpdateLast: boolean;
  /** Does not update Volume */
  doesNotUpdateVolume: boolean;
  session: string;
  /** Is this a block trade. */
  blockTrade: boolean;
  /** / Distribution time in nano seconds since epoch. */
  distributionTime: Long;
  /** / time in nano seconds since epoch. */
  transactionTime2: Long;
  consolidatedPriceIndicator: string;
  /** / True if not persisted in the EOD database. */
  transient: boolean;
  /** / Index short name used to identify index. */
  indexShortName: string;
}

/** /  Trade Correction */
export interface TradeCorrection {
  /** Market participant/originator */
  originatorId: Uint8Array;
  transactionTime: Long;
  /** Corrected Price */
  price: Long;
  /** Corrected Quantity */
  quantity: Long;
  tradeId: Uint8Array;
  side: BookSide;
  /** Date only, format 2012-07-04 -> 20120704 */
  tradeDate: number;
  buyerId: Uint8Array;
  sellerId: Uint8Array;
  openingTrade: boolean;
  systemPriced: boolean;
  marketOnClose: boolean;
  oddLot: boolean;
  settlementTerms: SettlementTerms;
  crossType: CrossType;
  byPass: boolean;
  originalTradeId: Uint8Array;
  saleCondition: Uint8Array;
  currency: string;
  /** / Distribution time in nano seconds since epoch. */
  distributionTime: Long;
  /** / time in nano seconds since epoch. */
  transactionTime2: Long;
  /** Original Price */
  originalTradePrice: Long;
  /** Original Quantity */
  originalTradeQuantity: Long;
}

/** Trade Cancel/Break */
export interface TradeCancel {
  /** Market participant/originator */
  originatorId: Uint8Array;
  transactionTime: Long;
  correctedTradePrice: Long;
  correctedTradeQuantity: Long;
  tradeId: Uint8Array;
  saleCondition: Uint8Array;
  currency: string;
  /** / Distribution time in nano seconds since epoch. */
  distributionTime: Long;
  /** / time in nano seconds since epoch. */
  transactionTime2: Long;
}

export interface Open {
  transactionTime: Long;
  /** / Date only, format 2012-07-04 -> 20120704 */
  tradeDate: number;
  /** / Divide by priceDenominator */
  price: Long;
  OpenCloseSettlementFlag: OpenCloseSettlementFlag;
  currency: string;
}

export interface High {
  transactionTime: Long;
  /** / Date only, format 2012-07-04 -> 20120704 */
  tradeDate: number;
  /** / Divide by priceDenominator */
  price: Long;
  currency: string;
}

/** 24 hour rolling window */
export interface HighRolling {
  transactionTime: Long;
  /** / Date only, format 2012-07-04 -> 20120704 */
  tradeDate: number;
  /** / Divide by priceDenominator */
  price: Long;
  currency: string;
}

export interface Low {
  transactionTime: Long;
  /** / Date only, format 2012-07-04 -> 20120704 */
  tradeDate: number;
  /** / Divide by priceDenominator */
  price: Long;
  currency: string;
}

/** 24 hour rolling window */
export interface LowRolling {
  transactionTime: Long;
  /** / Date only, format 2012-07-04 -> 20120704 */
  tradeDate: number;
  /** / Divide by priceDenominator */
  price: Long;
  currency: string;
}

export interface Close {
  transactionTime: Long;
  /** / Date only, format 2012-07-04 -> 20120704 */
  tradeDate: number;
  /** / Divide by priceDenominator */
  price: Long;
  currency: string;
}

export interface PrevClose {
  transactionTime: Long;
  /** / Date only, format 2012-07-04 -> 20120704 */
  tradeDate: number;
  /** / Divide by priceDenominator */
  price: Long;
  currency: string;
}

export interface Last {
  transactionTime: Long;
  /** / Date only, format 2012-07-04 -> 20120704 */
  tradeDate: number;
  /** / Divide by priceDenominator */
  price: Long;
  /** / Divide by quantityDenominator */
  quantity: Long;
  currency: string;
  session: string;
}

/** / 52 week */
export interface YearHigh {
  transactionTime: Long;
  /** / Divide by priceDenominator */
  price: Long;
  currency: string;
}

/** / 52 week */
export interface YearLow {
  transactionTime: Long;
  /** / Divide by priceDenominator */
  price: Long;
  currency: string;
}

/** / Total volume traded */
export interface Volume {
  transactionTime: Long;
  /** / Date only, format 2012-07-04 -> 20120704 */
  tradeDate: number;
  /** Total volume traded. */
  volume: Long;
}

/** / Total number of trades */
export interface NumberOfTrades {
  transactionTime: Long;
  /** / Date only, format 2012-07-04 -> 20120704 */
  tradeDate: number;
  numberTrades: Long;
}

/** / Total monetary value of trades */
export interface MonetaryValue {
  transactionTime: Long;
  /** / Date only, format 2012-07-04 -> 20120704 */
  tradeDate: number;
  /** / 2 decimals of precision */
  value: Long;
  valueCurrencyCode: string;
}

/** // Settlement value for futures and options markets. */
export interface Settlement {
  transactionTime: Long;
  /** / Date only, format 2012-07-04 -> 20120704 */
  tradeDate: number;
  /** / Divide by priceDenominator */
  price: Long;
  preliminarySettle: boolean;
  currency: string;
  settlementSource: SettlementSource;
  /** / Used by CME ITC. */
  session: string;
  /** / True if not persisted in the EOD database. */
  transient: boolean;
  /** / Reserved */
  reserved: boolean;
}

/** / Open interest */
export interface OpenInterest {
  transactionTime: Long;
  /** Date only, format 2012-07-04 -> 20120704 */
  tradeDate: number;
  volume: Long;
}

/** / Volume Weighted Average Price */
export interface Vwap {
  transactionTime: Long;
  /** Date only, format 2012-07-04 -> 20120704 */
  tradeDate: number;
  vwap: Long;
}

/** / Dividends and Income Distributions */
export interface DividendsIncomeDistributions {
  transactionTime: Long;
  instrumentType: string;
  /** Corporate Action */
  corporateAction: string;
  /** Distribution Type */
  distributionType: string;
  /** Date only, format 2012-07-04 -> 20120704 */
  payableDate: number;
  recordDate: number;
  exDividendDate: number;
  /** Cash amount of distribution */
  amount: Long;
  currencyCode: string;
  notes: string[];
  /**  */
  totalCashDistribution: Long;
  nonQualifiedCashDistribution: Long;
  qualifiedCashDistribution: Long;
  taxFreeCashDistribution: Long;
  ordinaryForeignTaxCredit: Long;
  qualifiedForeignTaxCredit: Long;
  stockDividendRatio: Long;
  /**  */
  reinvestDate: number;
}

/** / Capital Distributions */
export interface CapitalDistributions {
  transactionTime: Long;
  instrumentType: string;
  /** Corporate Action */
  corporateAction: string;
  /** Date only, format 2012-07-04 -> 20120704 */
  payableDate: number;
  recordDate: number;
  exDate: number;
  /** Distributions */
  shortTermCapitalGain: Long;
  longTermCapitalGain: Long;
  unallocatedDistributions: Long;
  returnOfCapital: Long;
  currencyCode: string;
  notes: string[];
  /**  */
  reinvestDate: number;
}

/**  */
export interface SharesOutstanding {
  sharesOutstanding: Long;
  transactionTime: Long;
}

/**  */
export interface NetAssetValue {
  netAssetValue: Long;
  transactionTime: Long;
}

/** / Intra and EOD Market Summary */
export interface MarketSummary {
  transactionTime: Long;
  /** / Date only, format 2012-07-04 -> 20120704 */
  tradingDate: number;
  startOfDay: boolean;
  endOfDay: boolean;
  clear: MarketSummary_ClearSet;
  /**  */
  instrumentStatus: InstrumentStatus | undefined;
  bbo: BestBidOffer | undefined;
  open: Open | undefined;
  high: High | undefined;
  low: Low | undefined;
  close: Close | undefined;
  prevClose: PrevClose | undefined;
  last: Last | undefined;
  volume: Volume | undefined;
  settlement: Settlement | undefined;
  openInterest: OpenInterest | undefined;
  vwap:
    | Vwap
    | undefined;
  /** / Used by CME ITC. */
  session: string;
  summaryType: MarketSummary_SummaryType;
  /** / Total traded volume for the prior day. */
  prevVolume:
    | Volume
    | undefined;
  /** / True if not persisted in the EOD database. */
  transient: boolean;
}

/** Clears sets of fields */
export enum MarketSummary_ClearSet {
  NONE = 0,
  ALL = 1,
  BA = 2,
  CUSTOM_1 = 3,
  UNRECOGNIZED = -1,
}

export function marketSummary_ClearSetFromJSON(object: any): MarketSummary_ClearSet {
  switch (object) {
    case 0:
    case "NONE":
      return MarketSummary_ClearSet.NONE;
    case 1:
    case "ALL":
      return MarketSummary_ClearSet.ALL;
    case 2:
    case "BA":
      return MarketSummary_ClearSet.BA;
    case 3:
    case "CUSTOM_1":
      return MarketSummary_ClearSet.CUSTOM_1;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MarketSummary_ClearSet.UNRECOGNIZED;
  }
}

export function marketSummary_ClearSetToJSON(object: MarketSummary_ClearSet): string {
  switch (object) {
    case MarketSummary_ClearSet.NONE:
      return "NONE";
    case MarketSummary_ClearSet.ALL:
      return "ALL";
    case MarketSummary_ClearSet.BA:
      return "BA";
    case MarketSummary_ClearSet.CUSTOM_1:
      return "CUSTOM_1";
    case MarketSummary_ClearSet.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** / Used to differentiate various ddf messages. */
export enum MarketSummary_SummaryType {
  /** EXCHANGE_REFRESH - DDF 2/1 Exchange refresh */
  EXCHANGE_REFRESH = 0,
  /** REFRESH_LIVE_PRICE - DDF 2/6 Live Prices refresh */
  REFRESH_LIVE_PRICE = 1,
  /** EOD_COMMODITY_PRICES - DDF 3/C end-of-day commodity prices */
  EOD_COMMODITY_PRICES = 2,
  /** EOD_STOCK_FOREX_PRICES - DDF 3/S end-of-day stock and forex prices and volume */
  EOD_STOCK_FOREX_PRICES = 3,
  /** EOD_COMMODITY_STATS - DDF 3/I end-of-day commodity volume and open interest message */
  EOD_COMMODITY_STATS = 4,
  UNRECOGNIZED = -1,
}

export function marketSummary_SummaryTypeFromJSON(object: any): MarketSummary_SummaryType {
  switch (object) {
    case 0:
    case "EXCHANGE_REFRESH":
      return MarketSummary_SummaryType.EXCHANGE_REFRESH;
    case 1:
    case "REFRESH_LIVE_PRICE":
      return MarketSummary_SummaryType.REFRESH_LIVE_PRICE;
    case 2:
    case "EOD_COMMODITY_PRICES":
      return MarketSummary_SummaryType.EOD_COMMODITY_PRICES;
    case 3:
    case "EOD_STOCK_FOREX_PRICES":
      return MarketSummary_SummaryType.EOD_STOCK_FOREX_PRICES;
    case 4:
    case "EOD_COMMODITY_STATS":
      return MarketSummary_SummaryType.EOD_COMMODITY_STATS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MarketSummary_SummaryType.UNRECOGNIZED;
  }
}

export function marketSummary_SummaryTypeToJSON(object: MarketSummary_SummaryType): string {
  switch (object) {
    case MarketSummary_SummaryType.EXCHANGE_REFRESH:
      return "EXCHANGE_REFRESH";
    case MarketSummary_SummaryType.REFRESH_LIVE_PRICE:
      return "REFRESH_LIVE_PRICE";
    case MarketSummary_SummaryType.EOD_COMMODITY_PRICES:
      return "EOD_COMMODITY_PRICES";
    case MarketSummary_SummaryType.EOD_STOCK_FOREX_PRICES:
      return "EOD_STOCK_FOREX_PRICES";
    case MarketSummary_SummaryType.EOD_COMMODITY_STATS:
      return "EOD_COMMODITY_STATS";
    case MarketSummary_SummaryType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Context {
  data: ContextData[];
  tracePoints: TracePoint[];
}

export interface ContextData {
  id: string;
  vstring: string | undefined;
  vbytes: Uint8Array | undefined;
  vbool: boolean | undefined;
  vsint32: number | undefined;
  vsint64: Long | undefined;
  vfloat: number | undefined;
  vdouble: number | undefined;
}

/** Tracing */
export interface TracePoint {
  id: string;
  componentId: string;
  timestampNs: Long;
  componentLatencyNs: number;
}

/** TCP replay request. */
export interface TCPHistoricalReplayRequest {
  channel: number;
  resetNumber: number;
  sequence: Long;
  count: number;
  requestId: string;
}

/** / Request for the snapshot to the Market state. */
export interface SnapshotRequest {
  channel: number;
  resetNumber: number;
  requestId: string;
  snapshotRequestTypes: SnapshotRequest_SnapshotRequestType[];
}

export enum SnapshotRequest_SnapshotRequestType {
  ALL = 0,
  QUOTE = 1,
  DEPTH = 2,
  VOLUME_AT_PRICE = 3,
  UNRECOGNIZED = -1,
}

export function snapshotRequest_SnapshotRequestTypeFromJSON(object: any): SnapshotRequest_SnapshotRequestType {
  switch (object) {
    case 0:
    case "ALL":
      return SnapshotRequest_SnapshotRequestType.ALL;
    case 1:
    case "QUOTE":
      return SnapshotRequest_SnapshotRequestType.QUOTE;
    case 2:
    case "DEPTH":
      return SnapshotRequest_SnapshotRequestType.DEPTH;
    case 3:
    case "VOLUME_AT_PRICE":
      return SnapshotRequest_SnapshotRequestType.VOLUME_AT_PRICE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SnapshotRequest_SnapshotRequestType.UNRECOGNIZED;
  }
}

export function snapshotRequest_SnapshotRequestTypeToJSON(object: SnapshotRequest_SnapshotRequestType): string {
  switch (object) {
    case SnapshotRequest_SnapshotRequestType.ALL:
      return "ALL";
    case SnapshotRequest_SnapshotRequestType.QUOTE:
      return "QUOTE";
    case SnapshotRequest_SnapshotRequestType.DEPTH:
      return "DEPTH";
    case SnapshotRequest_SnapshotRequestType.VOLUME_AT_PRICE:
      return "VOLUME_AT_PRICE";
    case SnapshotRequest_SnapshotRequestType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * / The VolumeAtPrice class encapsulates all of the trades throughout the day,
 * / and organizes a table of volume at prices.
 */
export interface VolumeAtPrice {
  marketId: Long;
  symbol: string;
  /** / UTC Timestamp of transaction, nano seconds since Unix epoch */
  transactionTime: Long;
  lastPrice: Long;
  lastQuantity: Long;
  lastCumulativeVolume: Long;
  /** / Date only, format 2012-07-04 -> 20120704 */
  tradeDate: number;
  priceVolumes: VolumeAtPrice_PriceLevelVolume[];
}

export interface VolumeAtPrice_PriceLevelVolume {
  price: Long;
  volume: Long;
}

/** / Open,High,Low,Close */
export interface Ohlc {
  marketId: Long;
  symbol: string;
  open: Open | undefined;
  high: High | undefined;
  low: Low | undefined;
  close:
    | Close
    | undefined;
  /** / Sum of volume */
  volume: Long;
  /** / Sum of price volume using normalized price */
  priceVolume: number;
  numberTrades: Long;
  tradeDate: number;
  /** / UTC Timestamp, nano seconds since Unix epoch */
  transactionTime: Long;
  /** / Trade Ids used in this OHLC */
  tradeIds: string[];
  openStartTime: Long;
  closeEndTime: Long;
}

/** / Instrument Action */
export interface InstrumentAction {
  transactionTime: Long;
  tradeDate: number;
  action: ActionType;
  message: string;
  instrument: InstrumentDefinition | undefined;
  newInstrument: InstrumentDefinition | undefined;
}

function createBaseOpenfeedMessage(): OpenfeedMessage {
  return {
    sendingTime: Long.ZERO,
    totalCount: 0,
    syncSequence: Long.ZERO,
    context: undefined,
    channelReset: undefined,
    heartBeat: undefined,
    adminMessage: undefined,
    instrumentDefinition: undefined,
    instrumentGroupStatus: undefined,
    marketSnapshot: undefined,
    marketUpdate: undefined,
    marketStatus: undefined,
    eodCommoditySummary: undefined,
    instrumentAction: undefined,
  };
}

export const OpenfeedMessage = {
  encode(message: OpenfeedMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.sendingTime.isZero()) {
      writer.uint32(8).sint64(message.sendingTime);
    }
    if (message.totalCount !== 0) {
      writer.uint32(16).sint32(message.totalCount);
    }
    if (!message.syncSequence.isZero()) {
      writer.uint32(24).int64(message.syncSequence);
    }
    if (message.context !== undefined) {
      Context.encode(message.context, writer.uint32(34).fork()).ldelim();
    }
    if (message.channelReset !== undefined) {
      ChannelReset.encode(message.channelReset, writer.uint32(82).fork()).ldelim();
    }
    if (message.heartBeat !== undefined) {
      HeartBeat.encode(message.heartBeat, writer.uint32(90).fork()).ldelim();
    }
    if (message.adminMessage !== undefined) {
      AdminMessage.encode(message.adminMessage, writer.uint32(98).fork()).ldelim();
    }
    if (message.instrumentDefinition !== undefined) {
      InstrumentDefinition.encode(message.instrumentDefinition, writer.uint32(106).fork()).ldelim();
    }
    if (message.instrumentGroupStatus !== undefined) {
      InstrumentGroupStatus.encode(message.instrumentGroupStatus, writer.uint32(114).fork()).ldelim();
    }
    if (message.marketSnapshot !== undefined) {
      MarketSnapshot.encode(message.marketSnapshot, writer.uint32(122).fork()).ldelim();
    }
    if (message.marketUpdate !== undefined) {
      MarketUpdate.encode(message.marketUpdate, writer.uint32(130).fork()).ldelim();
    }
    if (message.marketStatus !== undefined) {
      MarketStatus.encode(message.marketStatus, writer.uint32(138).fork()).ldelim();
    }
    if (message.eodCommoditySummary !== undefined) {
      EODCommoditySummary.encode(message.eodCommoditySummary, writer.uint32(146).fork()).ldelim();
    }
    if (message.instrumentAction !== undefined) {
      InstrumentAction.encode(message.instrumentAction, writer.uint32(154).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OpenfeedMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpenfeedMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sendingTime = reader.sint64() as Long;
          break;
        case 2:
          message.totalCount = reader.sint32();
          break;
        case 3:
          message.syncSequence = reader.int64() as Long;
          break;
        case 4:
          message.context = Context.decode(reader, reader.uint32());
          break;
        case 10:
          message.channelReset = ChannelReset.decode(reader, reader.uint32());
          break;
        case 11:
          message.heartBeat = HeartBeat.decode(reader, reader.uint32());
          break;
        case 12:
          message.adminMessage = AdminMessage.decode(reader, reader.uint32());
          break;
        case 13:
          message.instrumentDefinition = InstrumentDefinition.decode(reader, reader.uint32());
          break;
        case 14:
          message.instrumentGroupStatus = InstrumentGroupStatus.decode(reader, reader.uint32());
          break;
        case 15:
          message.marketSnapshot = MarketSnapshot.decode(reader, reader.uint32());
          break;
        case 16:
          message.marketUpdate = MarketUpdate.decode(reader, reader.uint32());
          break;
        case 17:
          message.marketStatus = MarketStatus.decode(reader, reader.uint32());
          break;
        case 18:
          message.eodCommoditySummary = EODCommoditySummary.decode(reader, reader.uint32());
          break;
        case 19:
          message.instrumentAction = InstrumentAction.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OpenfeedMessage {
    return {
      sendingTime: isSet(object.sendingTime) ? Long.fromValue(object.sendingTime) : Long.ZERO,
      totalCount: isSet(object.totalCount) ? Number(object.totalCount) : 0,
      syncSequence: isSet(object.syncSequence) ? Long.fromValue(object.syncSequence) : Long.ZERO,
      context: isSet(object.context) ? Context.fromJSON(object.context) : undefined,
      channelReset: isSet(object.channelReset) ? ChannelReset.fromJSON(object.channelReset) : undefined,
      heartBeat: isSet(object.heartBeat) ? HeartBeat.fromJSON(object.heartBeat) : undefined,
      adminMessage: isSet(object.adminMessage) ? AdminMessage.fromJSON(object.adminMessage) : undefined,
      instrumentDefinition: isSet(object.instrumentDefinition)
        ? InstrumentDefinition.fromJSON(object.instrumentDefinition)
        : undefined,
      instrumentGroupStatus: isSet(object.instrumentGroupStatus)
        ? InstrumentGroupStatus.fromJSON(object.instrumentGroupStatus)
        : undefined,
      marketSnapshot: isSet(object.marketSnapshot) ? MarketSnapshot.fromJSON(object.marketSnapshot) : undefined,
      marketUpdate: isSet(object.marketUpdate) ? MarketUpdate.fromJSON(object.marketUpdate) : undefined,
      marketStatus: isSet(object.marketStatus) ? MarketStatus.fromJSON(object.marketStatus) : undefined,
      eodCommoditySummary: isSet(object.eodCommoditySummary)
        ? EODCommoditySummary.fromJSON(object.eodCommoditySummary)
        : undefined,
      instrumentAction: isSet(object.instrumentAction) ? InstrumentAction.fromJSON(object.instrumentAction) : undefined,
    };
  },

  toJSON(message: OpenfeedMessage): unknown {
    const obj: any = {};
    message.sendingTime !== undefined && (obj.sendingTime = (message.sendingTime || Long.ZERO).toString());
    message.totalCount !== undefined && (obj.totalCount = Math.round(message.totalCount));
    message.syncSequence !== undefined && (obj.syncSequence = (message.syncSequence || Long.ZERO).toString());
    message.context !== undefined && (obj.context = message.context ? Context.toJSON(message.context) : undefined);
    message.channelReset !== undefined &&
      (obj.channelReset = message.channelReset ? ChannelReset.toJSON(message.channelReset) : undefined);
    message.heartBeat !== undefined &&
      (obj.heartBeat = message.heartBeat ? HeartBeat.toJSON(message.heartBeat) : undefined);
    message.adminMessage !== undefined &&
      (obj.adminMessage = message.adminMessage ? AdminMessage.toJSON(message.adminMessage) : undefined);
    message.instrumentDefinition !== undefined && (obj.instrumentDefinition = message.instrumentDefinition
      ? InstrumentDefinition.toJSON(message.instrumentDefinition)
      : undefined);
    message.instrumentGroupStatus !== undefined && (obj.instrumentGroupStatus = message.instrumentGroupStatus
      ? InstrumentGroupStatus.toJSON(message.instrumentGroupStatus)
      : undefined);
    message.marketSnapshot !== undefined &&
      (obj.marketSnapshot = message.marketSnapshot ? MarketSnapshot.toJSON(message.marketSnapshot) : undefined);
    message.marketUpdate !== undefined &&
      (obj.marketUpdate = message.marketUpdate ? MarketUpdate.toJSON(message.marketUpdate) : undefined);
    message.marketStatus !== undefined &&
      (obj.marketStatus = message.marketStatus ? MarketStatus.toJSON(message.marketStatus) : undefined);
    message.eodCommoditySummary !== undefined && (obj.eodCommoditySummary = message.eodCommoditySummary
      ? EODCommoditySummary.toJSON(message.eodCommoditySummary)
      : undefined);
    message.instrumentAction !== undefined &&
      (obj.instrumentAction = message.instrumentAction ? InstrumentAction.toJSON(message.instrumentAction) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<OpenfeedMessage>): OpenfeedMessage {
    const message = createBaseOpenfeedMessage();
    message.sendingTime = (object.sendingTime !== undefined && object.sendingTime !== null)
      ? Long.fromValue(object.sendingTime)
      : Long.ZERO;
    message.totalCount = object.totalCount ?? 0;
    message.syncSequence = (object.syncSequence !== undefined && object.syncSequence !== null)
      ? Long.fromValue(object.syncSequence)
      : Long.ZERO;
    message.context = (object.context !== undefined && object.context !== null)
      ? Context.fromPartial(object.context)
      : undefined;
    message.channelReset = (object.channelReset !== undefined && object.channelReset !== null)
      ? ChannelReset.fromPartial(object.channelReset)
      : undefined;
    message.heartBeat = (object.heartBeat !== undefined && object.heartBeat !== null)
      ? HeartBeat.fromPartial(object.heartBeat)
      : undefined;
    message.adminMessage = (object.adminMessage !== undefined && object.adminMessage !== null)
      ? AdminMessage.fromPartial(object.adminMessage)
      : undefined;
    message.instrumentDefinition = (object.instrumentDefinition !== undefined && object.instrumentDefinition !== null)
      ? InstrumentDefinition.fromPartial(object.instrumentDefinition)
      : undefined;
    message.instrumentGroupStatus =
      (object.instrumentGroupStatus !== undefined && object.instrumentGroupStatus !== null)
        ? InstrumentGroupStatus.fromPartial(object.instrumentGroupStatus)
        : undefined;
    message.marketSnapshot = (object.marketSnapshot !== undefined && object.marketSnapshot !== null)
      ? MarketSnapshot.fromPartial(object.marketSnapshot)
      : undefined;
    message.marketUpdate = (object.marketUpdate !== undefined && object.marketUpdate !== null)
      ? MarketUpdate.fromPartial(object.marketUpdate)
      : undefined;
    message.marketStatus = (object.marketStatus !== undefined && object.marketStatus !== null)
      ? MarketStatus.fromPartial(object.marketStatus)
      : undefined;
    message.eodCommoditySummary = (object.eodCommoditySummary !== undefined && object.eodCommoditySummary !== null)
      ? EODCommoditySummary.fromPartial(object.eodCommoditySummary)
      : undefined;
    message.instrumentAction = (object.instrumentAction !== undefined && object.instrumentAction !== null)
      ? InstrumentAction.fromPartial(object.instrumentAction)
      : undefined;
    return message;
  },
};

function createBaseChannelReset(): ChannelReset {
  return { channel: 0, transactionTime: Long.ZERO };
}

export const ChannelReset = {
  encode(message: ChannelReset, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel !== 0) {
      writer.uint32(8).sint32(message.channel);
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(16).sint64(message.transactionTime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelReset {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelReset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel = reader.sint32();
          break;
        case 2:
          message.transactionTime = reader.sint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelReset {
    return {
      channel: isSet(object.channel) ? Number(object.channel) : 0,
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
    };
  },

  toJSON(message: ChannelReset): unknown {
    const obj: any = {};
    message.channel !== undefined && (obj.channel = Math.round(message.channel));
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<ChannelReset>): ChannelReset {
    const message = createBaseChannelReset();
    message.channel = object.channel ?? 0;
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    return message;
  },
};

function createBaseHeartBeat(): HeartBeat {
  return { transactionTime: Long.ZERO, status: "", exchange: false, channel: 0 };
}

export const HeartBeat = {
  encode(message: HeartBeat, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(8).sint64(message.transactionTime);
    }
    if (message.status !== "") {
      writer.uint32(18).string(message.status);
    }
    if (message.exchange === true) {
      writer.uint32(24).bool(message.exchange);
    }
    if (message.channel !== 0) {
      writer.uint32(32).sint32(message.channel);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HeartBeat {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeartBeat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 2:
          message.status = reader.string();
          break;
        case 3:
          message.exchange = reader.bool();
          break;
        case 4:
          message.channel = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HeartBeat {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      status: isSet(object.status) ? String(object.status) : "",
      exchange: isSet(object.exchange) ? Boolean(object.exchange) : false,
      channel: isSet(object.channel) ? Number(object.channel) : 0,
    };
  },

  toJSON(message: HeartBeat): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.status !== undefined && (obj.status = message.status);
    message.exchange !== undefined && (obj.exchange = message.exchange);
    message.channel !== undefined && (obj.channel = Math.round(message.channel));
    return obj;
  },

  fromPartial(object: DeepPartial<HeartBeat>): HeartBeat {
    const message = createBaseHeartBeat();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.status = object.status ?? "";
    message.exchange = object.exchange ?? false;
    message.channel = object.channel ?? 0;
    return message;
  },
};

function createBaseAdminMessage(): AdminMessage {
  return { originationTime: Long.ZERO, source: "", languageCode: "", headLine: "", text: "", status: 0, channel: 0 };
}

export const AdminMessage = {
  encode(message: AdminMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.originationTime.isZero()) {
      writer.uint32(8).sint64(message.originationTime);
    }
    if (message.source !== "") {
      writer.uint32(18).string(message.source);
    }
    if (message.languageCode !== "") {
      writer.uint32(26).string(message.languageCode);
    }
    if (message.headLine !== "") {
      writer.uint32(34).string(message.headLine);
    }
    if (message.text !== "") {
      writer.uint32(42).string(message.text);
    }
    if (message.status !== 0) {
      writer.uint32(48).int32(message.status);
    }
    if (message.channel !== 0) {
      writer.uint32(56).sint32(message.channel);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AdminMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAdminMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.originationTime = reader.sint64() as Long;
          break;
        case 2:
          message.source = reader.string();
          break;
        case 3:
          message.languageCode = reader.string();
          break;
        case 4:
          message.headLine = reader.string();
          break;
        case 5:
          message.text = reader.string();
          break;
        case 6:
          message.status = reader.int32() as any;
          break;
        case 7:
          message.channel = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AdminMessage {
    return {
      originationTime: isSet(object.originationTime) ? Long.fromValue(object.originationTime) : Long.ZERO,
      source: isSet(object.source) ? String(object.source) : "",
      languageCode: isSet(object.languageCode) ? String(object.languageCode) : "",
      headLine: isSet(object.headLine) ? String(object.headLine) : "",
      text: isSet(object.text) ? String(object.text) : "",
      status: isSet(object.status) ? adminMessage_StatusFromJSON(object.status) : 0,
      channel: isSet(object.channel) ? Number(object.channel) : 0,
    };
  },

  toJSON(message: AdminMessage): unknown {
    const obj: any = {};
    message.originationTime !== undefined && (obj.originationTime = (message.originationTime || Long.ZERO).toString());
    message.source !== undefined && (obj.source = message.source);
    message.languageCode !== undefined && (obj.languageCode = message.languageCode);
    message.headLine !== undefined && (obj.headLine = message.headLine);
    message.text !== undefined && (obj.text = message.text);
    message.status !== undefined && (obj.status = adminMessage_StatusToJSON(message.status));
    message.channel !== undefined && (obj.channel = Math.round(message.channel));
    return obj;
  },

  fromPartial(object: DeepPartial<AdminMessage>): AdminMessage {
    const message = createBaseAdminMessage();
    message.originationTime = (object.originationTime !== undefined && object.originationTime !== null)
      ? Long.fromValue(object.originationTime)
      : Long.ZERO;
    message.source = object.source ?? "";
    message.languageCode = object.languageCode ?? "";
    message.headLine = object.headLine ?? "";
    message.text = object.text ?? "";
    message.status = object.status ?? 0;
    message.channel = object.channel ?? 0;
    return message;
  },
};

function createBaseInstrumentGroupStatus(): InstrumentGroupStatus {
  return { transactionTime: Long.ZERO, instrumentGroupId: "", tradingStatus: 0, tradeDate: 0, channel: 0 };
}

export const InstrumentGroupStatus = {
  encode(message: InstrumentGroupStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(8).sint64(message.transactionTime);
    }
    if (message.instrumentGroupId !== "") {
      writer.uint32(18).string(message.instrumentGroupId);
    }
    if (message.tradingStatus !== 0) {
      writer.uint32(24).int32(message.tradingStatus);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(32).sint32(message.tradeDate);
    }
    if (message.channel !== 0) {
      writer.uint32(40).sint32(message.channel);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentGroupStatus {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstrumentGroupStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 2:
          message.instrumentGroupId = reader.string();
          break;
        case 3:
          message.tradingStatus = reader.int32() as any;
          break;
        case 4:
          message.tradeDate = reader.sint32();
          break;
        case 5:
          message.channel = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InstrumentGroupStatus {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      instrumentGroupId: isSet(object.instrumentGroupId) ? String(object.instrumentGroupId) : "",
      tradingStatus: isSet(object.tradingStatus) ? instrumentTradingStatusFromJSON(object.tradingStatus) : 0,
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      channel: isSet(object.channel) ? Number(object.channel) : 0,
    };
  },

  toJSON(message: InstrumentGroupStatus): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.instrumentGroupId !== undefined && (obj.instrumentGroupId = message.instrumentGroupId);
    message.tradingStatus !== undefined && (obj.tradingStatus = instrumentTradingStatusToJSON(message.tradingStatus));
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    message.channel !== undefined && (obj.channel = Math.round(message.channel));
    return obj;
  },

  fromPartial(object: DeepPartial<InstrumentGroupStatus>): InstrumentGroupStatus {
    const message = createBaseInstrumentGroupStatus();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.instrumentGroupId = object.instrumentGroupId ?? "";
    message.tradingStatus = object.tradingStatus ?? 0;
    message.tradeDate = object.tradeDate ?? 0;
    message.channel = object.channel ?? 0;
    return message;
  },
};

function createBaseMarketStatus(): MarketStatus {
  return { transactionTime: Long.ZERO, channel: 0, marketWideStatus: 0 };
}

export const MarketStatus = {
  encode(message: MarketStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(8).sint64(message.transactionTime);
    }
    if (message.channel !== 0) {
      writer.uint32(16).sint32(message.channel);
    }
    if (message.marketWideStatus !== 0) {
      writer.uint32(24).int32(message.marketWideStatus);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MarketStatus {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarketStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 2:
          message.channel = reader.sint32();
          break;
        case 3:
          message.marketWideStatus = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MarketStatus {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      channel: isSet(object.channel) ? Number(object.channel) : 0,
      marketWideStatus: isSet(object.marketWideStatus) ? marketWideStatusFromJSON(object.marketWideStatus) : 0,
    };
  },

  toJSON(message: MarketStatus): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.channel !== undefined && (obj.channel = Math.round(message.channel));
    message.marketWideStatus !== undefined && (obj.marketWideStatus = marketWideStatusToJSON(message.marketWideStatus));
    return obj;
  },

  fromPartial(object: DeepPartial<MarketStatus>): MarketStatus {
    const message = createBaseMarketStatus();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.channel = object.channel ?? 0;
    message.marketWideStatus = object.marketWideStatus ?? 0;
    return message;
  },
};

function createBaseEODCommoditySummary(): EODCommoditySummary {
  return {
    tradeDate: 0,
    contractRoot: "",
    consolidatedVolume: Long.ZERO,
    consolidatedOpenInterest: Long.ZERO,
    auxiliaryData: new Uint8Array(),
  };
}

export const EODCommoditySummary = {
  encode(message: EODCommoditySummary, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tradeDate !== 0) {
      writer.uint32(8).sint32(message.tradeDate);
    }
    if (message.contractRoot !== "") {
      writer.uint32(18).string(message.contractRoot);
    }
    if (!message.consolidatedVolume.isZero()) {
      writer.uint32(24).sint64(message.consolidatedVolume);
    }
    if (!message.consolidatedOpenInterest.isZero()) {
      writer.uint32(32).sint64(message.consolidatedOpenInterest);
    }
    if (message.auxiliaryData.length !== 0) {
      writer.uint32(794).bytes(message.auxiliaryData);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EODCommoditySummary {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEODCommoditySummary();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tradeDate = reader.sint32();
          break;
        case 2:
          message.contractRoot = reader.string();
          break;
        case 3:
          message.consolidatedVolume = reader.sint64() as Long;
          break;
        case 4:
          message.consolidatedOpenInterest = reader.sint64() as Long;
          break;
        case 99:
          message.auxiliaryData = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EODCommoditySummary {
    return {
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      contractRoot: isSet(object.contractRoot) ? String(object.contractRoot) : "",
      consolidatedVolume: isSet(object.consolidatedVolume) ? Long.fromValue(object.consolidatedVolume) : Long.ZERO,
      consolidatedOpenInterest: isSet(object.consolidatedOpenInterest)
        ? Long.fromValue(object.consolidatedOpenInterest)
        : Long.ZERO,
      auxiliaryData: isSet(object.auxiliaryData) ? bytesFromBase64(object.auxiliaryData) : new Uint8Array(),
    };
  },

  toJSON(message: EODCommoditySummary): unknown {
    const obj: any = {};
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    message.contractRoot !== undefined && (obj.contractRoot = message.contractRoot);
    message.consolidatedVolume !== undefined &&
      (obj.consolidatedVolume = (message.consolidatedVolume || Long.ZERO).toString());
    message.consolidatedOpenInterest !== undefined &&
      (obj.consolidatedOpenInterest = (message.consolidatedOpenInterest || Long.ZERO).toString());
    message.auxiliaryData !== undefined &&
      (obj.auxiliaryData = base64FromBytes(
        message.auxiliaryData !== undefined ? message.auxiliaryData : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<EODCommoditySummary>): EODCommoditySummary {
    const message = createBaseEODCommoditySummary();
    message.tradeDate = object.tradeDate ?? 0;
    message.contractRoot = object.contractRoot ?? "";
    message.consolidatedVolume = (object.consolidatedVolume !== undefined && object.consolidatedVolume !== null)
      ? Long.fromValue(object.consolidatedVolume)
      : Long.ZERO;
    message.consolidatedOpenInterest =
      (object.consolidatedOpenInterest !== undefined && object.consolidatedOpenInterest !== null)
        ? Long.fromValue(object.consolidatedOpenInterest)
        : Long.ZERO;
    message.auxiliaryData = object.auxiliaryData ?? new Uint8Array();
    return message;
  },
};

function createBaseMarketSession(): MarketSession {
  return {
    tradeDate: 0,
    open: undefined,
    high: undefined,
    low: undefined,
    last: undefined,
    volume: undefined,
    settlement: undefined,
    prevSettlement: undefined,
    openInterest: undefined,
    numberOfTrades: undefined,
    monetaryValue: undefined,
    transactionTime: Long.ZERO,
  };
}

export const MarketSession = {
  encode(message: MarketSession, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tradeDate !== 0) {
      writer.uint32(32).sint32(message.tradeDate);
    }
    if (message.open !== undefined) {
      Open.encode(message.open, writer.uint32(242).fork()).ldelim();
    }
    if (message.high !== undefined) {
      High.encode(message.high, writer.uint32(250).fork()).ldelim();
    }
    if (message.low !== undefined) {
      Low.encode(message.low, writer.uint32(258).fork()).ldelim();
    }
    if (message.last !== undefined) {
      Last.encode(message.last, writer.uint32(282).fork()).ldelim();
    }
    if (message.volume !== undefined) {
      Volume.encode(message.volume, writer.uint32(306).fork()).ldelim();
    }
    if (message.settlement !== undefined) {
      Settlement.encode(message.settlement, writer.uint32(314).fork()).ldelim();
    }
    if (message.prevSettlement !== undefined) {
      Settlement.encode(message.prevSettlement, writer.uint32(354).fork()).ldelim();
    }
    if (message.openInterest !== undefined) {
      OpenInterest.encode(message.openInterest, writer.uint32(322).fork()).ldelim();
    }
    if (message.numberOfTrades !== undefined) {
      NumberOfTrades.encode(message.numberOfTrades, writer.uint32(330).fork()).ldelim();
    }
    if (message.monetaryValue !== undefined) {
      MonetaryValue.encode(message.monetaryValue, writer.uint32(338).fork()).ldelim();
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(344).sint64(message.transactionTime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MarketSession {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarketSession();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 4:
          message.tradeDate = reader.sint32();
          break;
        case 30:
          message.open = Open.decode(reader, reader.uint32());
          break;
        case 31:
          message.high = High.decode(reader, reader.uint32());
          break;
        case 32:
          message.low = Low.decode(reader, reader.uint32());
          break;
        case 35:
          message.last = Last.decode(reader, reader.uint32());
          break;
        case 38:
          message.volume = Volume.decode(reader, reader.uint32());
          break;
        case 39:
          message.settlement = Settlement.decode(reader, reader.uint32());
          break;
        case 44:
          message.prevSettlement = Settlement.decode(reader, reader.uint32());
          break;
        case 40:
          message.openInterest = OpenInterest.decode(reader, reader.uint32());
          break;
        case 41:
          message.numberOfTrades = NumberOfTrades.decode(reader, reader.uint32());
          break;
        case 42:
          message.monetaryValue = MonetaryValue.decode(reader, reader.uint32());
          break;
        case 43:
          message.transactionTime = reader.sint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MarketSession {
    return {
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      open: isSet(object.open) ? Open.fromJSON(object.open) : undefined,
      high: isSet(object.high) ? High.fromJSON(object.high) : undefined,
      low: isSet(object.low) ? Low.fromJSON(object.low) : undefined,
      last: isSet(object.last) ? Last.fromJSON(object.last) : undefined,
      volume: isSet(object.volume) ? Volume.fromJSON(object.volume) : undefined,
      settlement: isSet(object.settlement) ? Settlement.fromJSON(object.settlement) : undefined,
      prevSettlement: isSet(object.prevSettlement) ? Settlement.fromJSON(object.prevSettlement) : undefined,
      openInterest: isSet(object.openInterest) ? OpenInterest.fromJSON(object.openInterest) : undefined,
      numberOfTrades: isSet(object.numberOfTrades) ? NumberOfTrades.fromJSON(object.numberOfTrades) : undefined,
      monetaryValue: isSet(object.monetaryValue) ? MonetaryValue.fromJSON(object.monetaryValue) : undefined,
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
    };
  },

  toJSON(message: MarketSession): unknown {
    const obj: any = {};
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    message.open !== undefined && (obj.open = message.open ? Open.toJSON(message.open) : undefined);
    message.high !== undefined && (obj.high = message.high ? High.toJSON(message.high) : undefined);
    message.low !== undefined && (obj.low = message.low ? Low.toJSON(message.low) : undefined);
    message.last !== undefined && (obj.last = message.last ? Last.toJSON(message.last) : undefined);
    message.volume !== undefined && (obj.volume = message.volume ? Volume.toJSON(message.volume) : undefined);
    message.settlement !== undefined &&
      (obj.settlement = message.settlement ? Settlement.toJSON(message.settlement) : undefined);
    message.prevSettlement !== undefined &&
      (obj.prevSettlement = message.prevSettlement ? Settlement.toJSON(message.prevSettlement) : undefined);
    message.openInterest !== undefined &&
      (obj.openInterest = message.openInterest ? OpenInterest.toJSON(message.openInterest) : undefined);
    message.numberOfTrades !== undefined &&
      (obj.numberOfTrades = message.numberOfTrades ? NumberOfTrades.toJSON(message.numberOfTrades) : undefined);
    message.monetaryValue !== undefined &&
      (obj.monetaryValue = message.monetaryValue ? MonetaryValue.toJSON(message.monetaryValue) : undefined);
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<MarketSession>): MarketSession {
    const message = createBaseMarketSession();
    message.tradeDate = object.tradeDate ?? 0;
    message.open = (object.open !== undefined && object.open !== null) ? Open.fromPartial(object.open) : undefined;
    message.high = (object.high !== undefined && object.high !== null) ? High.fromPartial(object.high) : undefined;
    message.low = (object.low !== undefined && object.low !== null) ? Low.fromPartial(object.low) : undefined;
    message.last = (object.last !== undefined && object.last !== null) ? Last.fromPartial(object.last) : undefined;
    message.volume = (object.volume !== undefined && object.volume !== null)
      ? Volume.fromPartial(object.volume)
      : undefined;
    message.settlement = (object.settlement !== undefined && object.settlement !== null)
      ? Settlement.fromPartial(object.settlement)
      : undefined;
    message.prevSettlement = (object.prevSettlement !== undefined && object.prevSettlement !== null)
      ? Settlement.fromPartial(object.prevSettlement)
      : undefined;
    message.openInterest = (object.openInterest !== undefined && object.openInterest !== null)
      ? OpenInterest.fromPartial(object.openInterest)
      : undefined;
    message.numberOfTrades = (object.numberOfTrades !== undefined && object.numberOfTrades !== null)
      ? NumberOfTrades.fromPartial(object.numberOfTrades)
      : undefined;
    message.monetaryValue = (object.monetaryValue !== undefined && object.monetaryValue !== null)
      ? MonetaryValue.fromPartial(object.monetaryValue)
      : undefined;
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    return message;
  },
};

function createBaseMarketSnapshot(): MarketSnapshot {
  return {
    marketId: Long.ZERO,
    transactionTime: Long.ZERO,
    marketSequence: Long.ZERO,
    tradeDate: 0,
    totalChunks: 0,
    currentChunk: 0,
    symbol: "",
    priceDenominator: 0,
    service: 0,
    instrumentStatus: undefined,
    bbo: undefined,
    index: undefined,
    priceLevels: [],
    orders: [],
    news: undefined,
    open: undefined,
    high: undefined,
    low: undefined,
    close: undefined,
    prevClose: undefined,
    last: undefined,
    yearHigh: undefined,
    yearLow: undefined,
    volume: undefined,
    settlement: undefined,
    openInterest: undefined,
    vwap: undefined,
    dividendsIncomeDistributions: undefined,
    numberOfTrades: undefined,
    monetaryValue: undefined,
    capitalDistributions: undefined,
    sharesOutstanding: undefined,
    netAssetValue: undefined,
    previousSession: undefined,
    tSession: undefined,
    volumeAtPrice: undefined,
    highRolling: undefined,
    lowRolling: undefined,
    zSession: undefined,
  };
}

export const MarketSnapshot = {
  encode(message: MarketSnapshot, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.marketId.isZero()) {
      writer.uint32(8).sint64(message.marketId);
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(16).sint64(message.transactionTime);
    }
    if (!message.marketSequence.isZero()) {
      writer.uint32(24).int64(message.marketSequence);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(32).sint32(message.tradeDate);
    }
    if (message.totalChunks !== 0) {
      writer.uint32(40).sint32(message.totalChunks);
    }
    if (message.currentChunk !== 0) {
      writer.uint32(48).sint32(message.currentChunk);
    }
    if (message.symbol !== "") {
      writer.uint32(58).string(message.symbol);
    }
    if (message.priceDenominator !== 0) {
      writer.uint32(64).sint32(message.priceDenominator);
    }
    if (message.service !== 0) {
      writer.uint32(72).int32(message.service);
    }
    if (message.instrumentStatus !== undefined) {
      InstrumentStatus.encode(message.instrumentStatus, writer.uint32(82).fork()).ldelim();
    }
    if (message.bbo !== undefined) {
      BestBidOffer.encode(message.bbo, writer.uint32(90).fork()).ldelim();
    }
    if (message.index !== undefined) {
      IndexValue.encode(message.index, writer.uint32(98).fork()).ldelim();
    }
    for (const v of message.priceLevels) {
      AddPriceLevel.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    for (const v of message.orders) {
      AddOrder.encode(v!, writer.uint32(114).fork()).ldelim();
    }
    if (message.news !== undefined) {
      News.encode(message.news, writer.uint32(122).fork()).ldelim();
    }
    if (message.open !== undefined) {
      Open.encode(message.open, writer.uint32(242).fork()).ldelim();
    }
    if (message.high !== undefined) {
      High.encode(message.high, writer.uint32(250).fork()).ldelim();
    }
    if (message.low !== undefined) {
      Low.encode(message.low, writer.uint32(258).fork()).ldelim();
    }
    if (message.close !== undefined) {
      Close.encode(message.close, writer.uint32(266).fork()).ldelim();
    }
    if (message.prevClose !== undefined) {
      PrevClose.encode(message.prevClose, writer.uint32(274).fork()).ldelim();
    }
    if (message.last !== undefined) {
      Last.encode(message.last, writer.uint32(282).fork()).ldelim();
    }
    if (message.yearHigh !== undefined) {
      YearHigh.encode(message.yearHigh, writer.uint32(290).fork()).ldelim();
    }
    if (message.yearLow !== undefined) {
      YearLow.encode(message.yearLow, writer.uint32(298).fork()).ldelim();
    }
    if (message.volume !== undefined) {
      Volume.encode(message.volume, writer.uint32(306).fork()).ldelim();
    }
    if (message.settlement !== undefined) {
      Settlement.encode(message.settlement, writer.uint32(314).fork()).ldelim();
    }
    if (message.openInterest !== undefined) {
      OpenInterest.encode(message.openInterest, writer.uint32(322).fork()).ldelim();
    }
    if (message.vwap !== undefined) {
      Vwap.encode(message.vwap, writer.uint32(330).fork()).ldelim();
    }
    if (message.dividendsIncomeDistributions !== undefined) {
      DividendsIncomeDistributions.encode(message.dividendsIncomeDistributions, writer.uint32(338).fork()).ldelim();
    }
    if (message.numberOfTrades !== undefined) {
      NumberOfTrades.encode(message.numberOfTrades, writer.uint32(346).fork()).ldelim();
    }
    if (message.monetaryValue !== undefined) {
      MonetaryValue.encode(message.monetaryValue, writer.uint32(354).fork()).ldelim();
    }
    if (message.capitalDistributions !== undefined) {
      CapitalDistributions.encode(message.capitalDistributions, writer.uint32(362).fork()).ldelim();
    }
    if (message.sharesOutstanding !== undefined) {
      SharesOutstanding.encode(message.sharesOutstanding, writer.uint32(370).fork()).ldelim();
    }
    if (message.netAssetValue !== undefined) {
      NetAssetValue.encode(message.netAssetValue, writer.uint32(378).fork()).ldelim();
    }
    if (message.previousSession !== undefined) {
      MarketSession.encode(message.previousSession, writer.uint32(386).fork()).ldelim();
    }
    if (message.tSession !== undefined) {
      MarketSession.encode(message.tSession, writer.uint32(394).fork()).ldelim();
    }
    if (message.volumeAtPrice !== undefined) {
      VolumeAtPrice.encode(message.volumeAtPrice, writer.uint32(402).fork()).ldelim();
    }
    if (message.highRolling !== undefined) {
      HighRolling.encode(message.highRolling, writer.uint32(410).fork()).ldelim();
    }
    if (message.lowRolling !== undefined) {
      LowRolling.encode(message.lowRolling, writer.uint32(418).fork()).ldelim();
    }
    if (message.zSession !== undefined) {
      MarketSession.encode(message.zSession, writer.uint32(426).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MarketSnapshot {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarketSnapshot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader.sint64() as Long;
          break;
        case 2:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 3:
          message.marketSequence = reader.int64() as Long;
          break;
        case 4:
          message.tradeDate = reader.sint32();
          break;
        case 5:
          message.totalChunks = reader.sint32();
          break;
        case 6:
          message.currentChunk = reader.sint32();
          break;
        case 7:
          message.symbol = reader.string();
          break;
        case 8:
          message.priceDenominator = reader.sint32();
          break;
        case 9:
          message.service = reader.int32() as any;
          break;
        case 10:
          message.instrumentStatus = InstrumentStatus.decode(reader, reader.uint32());
          break;
        case 11:
          message.bbo = BestBidOffer.decode(reader, reader.uint32());
          break;
        case 12:
          message.index = IndexValue.decode(reader, reader.uint32());
          break;
        case 13:
          message.priceLevels.push(AddPriceLevel.decode(reader, reader.uint32()));
          break;
        case 14:
          message.orders.push(AddOrder.decode(reader, reader.uint32()));
          break;
        case 15:
          message.news = News.decode(reader, reader.uint32());
          break;
        case 30:
          message.open = Open.decode(reader, reader.uint32());
          break;
        case 31:
          message.high = High.decode(reader, reader.uint32());
          break;
        case 32:
          message.low = Low.decode(reader, reader.uint32());
          break;
        case 33:
          message.close = Close.decode(reader, reader.uint32());
          break;
        case 34:
          message.prevClose = PrevClose.decode(reader, reader.uint32());
          break;
        case 35:
          message.last = Last.decode(reader, reader.uint32());
          break;
        case 36:
          message.yearHigh = YearHigh.decode(reader, reader.uint32());
          break;
        case 37:
          message.yearLow = YearLow.decode(reader, reader.uint32());
          break;
        case 38:
          message.volume = Volume.decode(reader, reader.uint32());
          break;
        case 39:
          message.settlement = Settlement.decode(reader, reader.uint32());
          break;
        case 40:
          message.openInterest = OpenInterest.decode(reader, reader.uint32());
          break;
        case 41:
          message.vwap = Vwap.decode(reader, reader.uint32());
          break;
        case 42:
          message.dividendsIncomeDistributions = DividendsIncomeDistributions.decode(reader, reader.uint32());
          break;
        case 43:
          message.numberOfTrades = NumberOfTrades.decode(reader, reader.uint32());
          break;
        case 44:
          message.monetaryValue = MonetaryValue.decode(reader, reader.uint32());
          break;
        case 45:
          message.capitalDistributions = CapitalDistributions.decode(reader, reader.uint32());
          break;
        case 46:
          message.sharesOutstanding = SharesOutstanding.decode(reader, reader.uint32());
          break;
        case 47:
          message.netAssetValue = NetAssetValue.decode(reader, reader.uint32());
          break;
        case 48:
          message.previousSession = MarketSession.decode(reader, reader.uint32());
          break;
        case 49:
          message.tSession = MarketSession.decode(reader, reader.uint32());
          break;
        case 50:
          message.volumeAtPrice = VolumeAtPrice.decode(reader, reader.uint32());
          break;
        case 51:
          message.highRolling = HighRolling.decode(reader, reader.uint32());
          break;
        case 52:
          message.lowRolling = LowRolling.decode(reader, reader.uint32());
          break;
        case 53:
          message.zSession = MarketSession.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MarketSnapshot {
    return {
      marketId: isSet(object.marketId) ? Long.fromValue(object.marketId) : Long.ZERO,
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      marketSequence: isSet(object.marketSequence) ? Long.fromValue(object.marketSequence) : Long.ZERO,
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      totalChunks: isSet(object.totalChunks) ? Number(object.totalChunks) : 0,
      currentChunk: isSet(object.currentChunk) ? Number(object.currentChunk) : 0,
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      priceDenominator: isSet(object.priceDenominator) ? Number(object.priceDenominator) : 0,
      service: isSet(object.service) ? serviceFromJSON(object.service) : 0,
      instrumentStatus: isSet(object.instrumentStatus) ? InstrumentStatus.fromJSON(object.instrumentStatus) : undefined,
      bbo: isSet(object.bbo) ? BestBidOffer.fromJSON(object.bbo) : undefined,
      index: isSet(object.index) ? IndexValue.fromJSON(object.index) : undefined,
      priceLevels: Array.isArray(object?.priceLevels)
        ? object.priceLevels.map((e: any) => AddPriceLevel.fromJSON(e))
        : [],
      orders: Array.isArray(object?.orders) ? object.orders.map((e: any) => AddOrder.fromJSON(e)) : [],
      news: isSet(object.news) ? News.fromJSON(object.news) : undefined,
      open: isSet(object.open) ? Open.fromJSON(object.open) : undefined,
      high: isSet(object.high) ? High.fromJSON(object.high) : undefined,
      low: isSet(object.low) ? Low.fromJSON(object.low) : undefined,
      close: isSet(object.close) ? Close.fromJSON(object.close) : undefined,
      prevClose: isSet(object.prevClose) ? PrevClose.fromJSON(object.prevClose) : undefined,
      last: isSet(object.last) ? Last.fromJSON(object.last) : undefined,
      yearHigh: isSet(object.yearHigh) ? YearHigh.fromJSON(object.yearHigh) : undefined,
      yearLow: isSet(object.yearLow) ? YearLow.fromJSON(object.yearLow) : undefined,
      volume: isSet(object.volume) ? Volume.fromJSON(object.volume) : undefined,
      settlement: isSet(object.settlement) ? Settlement.fromJSON(object.settlement) : undefined,
      openInterest: isSet(object.openInterest) ? OpenInterest.fromJSON(object.openInterest) : undefined,
      vwap: isSet(object.vwap) ? Vwap.fromJSON(object.vwap) : undefined,
      dividendsIncomeDistributions: isSet(object.dividendsIncomeDistributions)
        ? DividendsIncomeDistributions.fromJSON(object.dividendsIncomeDistributions)
        : undefined,
      numberOfTrades: isSet(object.numberOfTrades) ? NumberOfTrades.fromJSON(object.numberOfTrades) : undefined,
      monetaryValue: isSet(object.monetaryValue) ? MonetaryValue.fromJSON(object.monetaryValue) : undefined,
      capitalDistributions: isSet(object.capitalDistributions)
        ? CapitalDistributions.fromJSON(object.capitalDistributions)
        : undefined,
      sharesOutstanding: isSet(object.sharesOutstanding)
        ? SharesOutstanding.fromJSON(object.sharesOutstanding)
        : undefined,
      netAssetValue: isSet(object.netAssetValue) ? NetAssetValue.fromJSON(object.netAssetValue) : undefined,
      previousSession: isSet(object.previousSession) ? MarketSession.fromJSON(object.previousSession) : undefined,
      tSession: isSet(object.tSession) ? MarketSession.fromJSON(object.tSession) : undefined,
      volumeAtPrice: isSet(object.volumeAtPrice) ? VolumeAtPrice.fromJSON(object.volumeAtPrice) : undefined,
      highRolling: isSet(object.highRolling) ? HighRolling.fromJSON(object.highRolling) : undefined,
      lowRolling: isSet(object.lowRolling) ? LowRolling.fromJSON(object.lowRolling) : undefined,
      zSession: isSet(object.zSession) ? MarketSession.fromJSON(object.zSession) : undefined,
    };
  },

  toJSON(message: MarketSnapshot): unknown {
    const obj: any = {};
    message.marketId !== undefined && (obj.marketId = (message.marketId || Long.ZERO).toString());
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.marketSequence !== undefined && (obj.marketSequence = (message.marketSequence || Long.ZERO).toString());
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    message.totalChunks !== undefined && (obj.totalChunks = Math.round(message.totalChunks));
    message.currentChunk !== undefined && (obj.currentChunk = Math.round(message.currentChunk));
    message.symbol !== undefined && (obj.symbol = message.symbol);
    message.priceDenominator !== undefined && (obj.priceDenominator = Math.round(message.priceDenominator));
    message.service !== undefined && (obj.service = serviceToJSON(message.service));
    message.instrumentStatus !== undefined &&
      (obj.instrumentStatus = message.instrumentStatus ? InstrumentStatus.toJSON(message.instrumentStatus) : undefined);
    message.bbo !== undefined && (obj.bbo = message.bbo ? BestBidOffer.toJSON(message.bbo) : undefined);
    message.index !== undefined && (obj.index = message.index ? IndexValue.toJSON(message.index) : undefined);
    if (message.priceLevels) {
      obj.priceLevels = message.priceLevels.map((e) => e ? AddPriceLevel.toJSON(e) : undefined);
    } else {
      obj.priceLevels = [];
    }
    if (message.orders) {
      obj.orders = message.orders.map((e) => e ? AddOrder.toJSON(e) : undefined);
    } else {
      obj.orders = [];
    }
    message.news !== undefined && (obj.news = message.news ? News.toJSON(message.news) : undefined);
    message.open !== undefined && (obj.open = message.open ? Open.toJSON(message.open) : undefined);
    message.high !== undefined && (obj.high = message.high ? High.toJSON(message.high) : undefined);
    message.low !== undefined && (obj.low = message.low ? Low.toJSON(message.low) : undefined);
    message.close !== undefined && (obj.close = message.close ? Close.toJSON(message.close) : undefined);
    message.prevClose !== undefined &&
      (obj.prevClose = message.prevClose ? PrevClose.toJSON(message.prevClose) : undefined);
    message.last !== undefined && (obj.last = message.last ? Last.toJSON(message.last) : undefined);
    message.yearHigh !== undefined && (obj.yearHigh = message.yearHigh ? YearHigh.toJSON(message.yearHigh) : undefined);
    message.yearLow !== undefined && (obj.yearLow = message.yearLow ? YearLow.toJSON(message.yearLow) : undefined);
    message.volume !== undefined && (obj.volume = message.volume ? Volume.toJSON(message.volume) : undefined);
    message.settlement !== undefined &&
      (obj.settlement = message.settlement ? Settlement.toJSON(message.settlement) : undefined);
    message.openInterest !== undefined &&
      (obj.openInterest = message.openInterest ? OpenInterest.toJSON(message.openInterest) : undefined);
    message.vwap !== undefined && (obj.vwap = message.vwap ? Vwap.toJSON(message.vwap) : undefined);
    message.dividendsIncomeDistributions !== undefined &&
      (obj.dividendsIncomeDistributions = message.dividendsIncomeDistributions
        ? DividendsIncomeDistributions.toJSON(message.dividendsIncomeDistributions)
        : undefined);
    message.numberOfTrades !== undefined &&
      (obj.numberOfTrades = message.numberOfTrades ? NumberOfTrades.toJSON(message.numberOfTrades) : undefined);
    message.monetaryValue !== undefined &&
      (obj.monetaryValue = message.monetaryValue ? MonetaryValue.toJSON(message.monetaryValue) : undefined);
    message.capitalDistributions !== undefined && (obj.capitalDistributions = message.capitalDistributions
      ? CapitalDistributions.toJSON(message.capitalDistributions)
      : undefined);
    message.sharesOutstanding !== undefined && (obj.sharesOutstanding = message.sharesOutstanding
      ? SharesOutstanding.toJSON(message.sharesOutstanding)
      : undefined);
    message.netAssetValue !== undefined &&
      (obj.netAssetValue = message.netAssetValue ? NetAssetValue.toJSON(message.netAssetValue) : undefined);
    message.previousSession !== undefined &&
      (obj.previousSession = message.previousSession ? MarketSession.toJSON(message.previousSession) : undefined);
    message.tSession !== undefined &&
      (obj.tSession = message.tSession ? MarketSession.toJSON(message.tSession) : undefined);
    message.volumeAtPrice !== undefined &&
      (obj.volumeAtPrice = message.volumeAtPrice ? VolumeAtPrice.toJSON(message.volumeAtPrice) : undefined);
    message.highRolling !== undefined &&
      (obj.highRolling = message.highRolling ? HighRolling.toJSON(message.highRolling) : undefined);
    message.lowRolling !== undefined &&
      (obj.lowRolling = message.lowRolling ? LowRolling.toJSON(message.lowRolling) : undefined);
    message.zSession !== undefined &&
      (obj.zSession = message.zSession ? MarketSession.toJSON(message.zSession) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MarketSnapshot>): MarketSnapshot {
    const message = createBaseMarketSnapshot();
    message.marketId = (object.marketId !== undefined && object.marketId !== null)
      ? Long.fromValue(object.marketId)
      : Long.ZERO;
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.marketSequence = (object.marketSequence !== undefined && object.marketSequence !== null)
      ? Long.fromValue(object.marketSequence)
      : Long.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.totalChunks = object.totalChunks ?? 0;
    message.currentChunk = object.currentChunk ?? 0;
    message.symbol = object.symbol ?? "";
    message.priceDenominator = object.priceDenominator ?? 0;
    message.service = object.service ?? 0;
    message.instrumentStatus = (object.instrumentStatus !== undefined && object.instrumentStatus !== null)
      ? InstrumentStatus.fromPartial(object.instrumentStatus)
      : undefined;
    message.bbo = (object.bbo !== undefined && object.bbo !== null) ? BestBidOffer.fromPartial(object.bbo) : undefined;
    message.index = (object.index !== undefined && object.index !== null)
      ? IndexValue.fromPartial(object.index)
      : undefined;
    message.priceLevels = object.priceLevels?.map((e) => AddPriceLevel.fromPartial(e)) || [];
    message.orders = object.orders?.map((e) => AddOrder.fromPartial(e)) || [];
    message.news = (object.news !== undefined && object.news !== null) ? News.fromPartial(object.news) : undefined;
    message.open = (object.open !== undefined && object.open !== null) ? Open.fromPartial(object.open) : undefined;
    message.high = (object.high !== undefined && object.high !== null) ? High.fromPartial(object.high) : undefined;
    message.low = (object.low !== undefined && object.low !== null) ? Low.fromPartial(object.low) : undefined;
    message.close = (object.close !== undefined && object.close !== null) ? Close.fromPartial(object.close) : undefined;
    message.prevClose = (object.prevClose !== undefined && object.prevClose !== null)
      ? PrevClose.fromPartial(object.prevClose)
      : undefined;
    message.last = (object.last !== undefined && object.last !== null) ? Last.fromPartial(object.last) : undefined;
    message.yearHigh = (object.yearHigh !== undefined && object.yearHigh !== null)
      ? YearHigh.fromPartial(object.yearHigh)
      : undefined;
    message.yearLow = (object.yearLow !== undefined && object.yearLow !== null)
      ? YearLow.fromPartial(object.yearLow)
      : undefined;
    message.volume = (object.volume !== undefined && object.volume !== null)
      ? Volume.fromPartial(object.volume)
      : undefined;
    message.settlement = (object.settlement !== undefined && object.settlement !== null)
      ? Settlement.fromPartial(object.settlement)
      : undefined;
    message.openInterest = (object.openInterest !== undefined && object.openInterest !== null)
      ? OpenInterest.fromPartial(object.openInterest)
      : undefined;
    message.vwap = (object.vwap !== undefined && object.vwap !== null) ? Vwap.fromPartial(object.vwap) : undefined;
    message.dividendsIncomeDistributions =
      (object.dividendsIncomeDistributions !== undefined && object.dividendsIncomeDistributions !== null)
        ? DividendsIncomeDistributions.fromPartial(object.dividendsIncomeDistributions)
        : undefined;
    message.numberOfTrades = (object.numberOfTrades !== undefined && object.numberOfTrades !== null)
      ? NumberOfTrades.fromPartial(object.numberOfTrades)
      : undefined;
    message.monetaryValue = (object.monetaryValue !== undefined && object.monetaryValue !== null)
      ? MonetaryValue.fromPartial(object.monetaryValue)
      : undefined;
    message.capitalDistributions = (object.capitalDistributions !== undefined && object.capitalDistributions !== null)
      ? CapitalDistributions.fromPartial(object.capitalDistributions)
      : undefined;
    message.sharesOutstanding = (object.sharesOutstanding !== undefined && object.sharesOutstanding !== null)
      ? SharesOutstanding.fromPartial(object.sharesOutstanding)
      : undefined;
    message.netAssetValue = (object.netAssetValue !== undefined && object.netAssetValue !== null)
      ? NetAssetValue.fromPartial(object.netAssetValue)
      : undefined;
    message.previousSession = (object.previousSession !== undefined && object.previousSession !== null)
      ? MarketSession.fromPartial(object.previousSession)
      : undefined;
    message.tSession = (object.tSession !== undefined && object.tSession !== null)
      ? MarketSession.fromPartial(object.tSession)
      : undefined;
    message.volumeAtPrice = (object.volumeAtPrice !== undefined && object.volumeAtPrice !== null)
      ? VolumeAtPrice.fromPartial(object.volumeAtPrice)
      : undefined;
    message.highRolling = (object.highRolling !== undefined && object.highRolling !== null)
      ? HighRolling.fromPartial(object.highRolling)
      : undefined;
    message.lowRolling = (object.lowRolling !== undefined && object.lowRolling !== null)
      ? LowRolling.fromPartial(object.lowRolling)
      : undefined;
    message.zSession = (object.zSession !== undefined && object.zSession !== null)
      ? MarketSession.fromPartial(object.zSession)
      : undefined;
    return message;
  },
};

function createBaseMarketSnapshotResponse(): MarketSnapshotResponse {
  return { result: 0, message: "", marketSnapshot: undefined };
}

export const MarketSnapshotResponse = {
  encode(message: MarketSnapshotResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.marketSnapshot !== undefined) {
      MarketSnapshot.encode(message.marketSnapshot, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MarketSnapshotResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarketSnapshotResponse();
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
          message.marketSnapshot = MarketSnapshot.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MarketSnapshotResponse {
    return {
      result: isSet(object.result) ? snapshotRequestResultFromJSON(object.result) : 0,
      message: isSet(object.message) ? String(object.message) : "",
      marketSnapshot: isSet(object.marketSnapshot) ? MarketSnapshot.fromJSON(object.marketSnapshot) : undefined,
    };
  },

  toJSON(message: MarketSnapshotResponse): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = snapshotRequestResultToJSON(message.result));
    message.message !== undefined && (obj.message = message.message);
    message.marketSnapshot !== undefined &&
      (obj.marketSnapshot = message.marketSnapshot ? MarketSnapshot.toJSON(message.marketSnapshot) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MarketSnapshotResponse>): MarketSnapshotResponse {
    const message = createBaseMarketSnapshotResponse();
    message.result = object.result ?? 0;
    message.message = object.message ?? "";
    message.marketSnapshot = (object.marketSnapshot !== undefined && object.marketSnapshot !== null)
      ? MarketSnapshot.fromPartial(object.marketSnapshot)
      : undefined;
    return message;
  },
};

function createBaseMarketUpdate(): MarketUpdate {
  return {
    marketId: Long.ZERO,
    symbol: "",
    transactionTime: Long.ZERO,
    distributionTime: Long.ZERO,
    marketSequence: Long.ZERO,
    sourceSequence: Long.ZERO,
    originatorId: new Uint8Array(),
    priceDenominator: 0,
    context: undefined,
    session: undefined,
    tSession: undefined,
    previousSession: undefined,
    regional: false,
    zSession: undefined,
    news: undefined,
    clearBook: undefined,
    instrumentStatus: undefined,
    bbo: undefined,
    depthPriceLevel: undefined,
    depthOrder: undefined,
    index: undefined,
    trades: undefined,
    open: undefined,
    high: undefined,
    low: undefined,
    close: undefined,
    prevClose: undefined,
    last: undefined,
    yearHigh: undefined,
    yearLow: undefined,
    volume: undefined,
    settlement: undefined,
    openInterest: undefined,
    vwap: undefined,
    dividendsIncomeDistributions: undefined,
    numberOfTrades: undefined,
    monetaryValue: undefined,
    capitalDistributions: undefined,
    sharesOutstanding: undefined,
    netAssetValue: undefined,
    marketSummary: undefined,
    highRolling: undefined,
    lowRolling: undefined,
  };
}

export const MarketUpdate = {
  encode(message: MarketUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.marketId.isZero()) {
      writer.uint32(8).sint64(message.marketId);
    }
    if (message.symbol !== "") {
      writer.uint32(18).string(message.symbol);
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(24).sint64(message.transactionTime);
    }
    if (!message.distributionTime.isZero()) {
      writer.uint32(32).sint64(message.distributionTime);
    }
    if (!message.marketSequence.isZero()) {
      writer.uint32(40).sint64(message.marketSequence);
    }
    if (!message.sourceSequence.isZero()) {
      writer.uint32(48).sint64(message.sourceSequence);
    }
    if (message.originatorId.length !== 0) {
      writer.uint32(58).bytes(message.originatorId);
    }
    if (message.priceDenominator !== 0) {
      writer.uint32(72).sint32(message.priceDenominator);
    }
    if (message.context !== undefined) {
      Context.encode(message.context, writer.uint32(82).fork()).ldelim();
    }
    if (message.session !== undefined) {
      MarketSession.encode(message.session, writer.uint32(90).fork()).ldelim();
    }
    if (message.tSession !== undefined) {
      MarketSession.encode(message.tSession, writer.uint32(98).fork()).ldelim();
    }
    if (message.previousSession !== undefined) {
      MarketSession.encode(message.previousSession, writer.uint32(106).fork()).ldelim();
    }
    if (message.regional === true) {
      writer.uint32(112).bool(message.regional);
    }
    if (message.zSession !== undefined) {
      MarketSession.encode(message.zSession, writer.uint32(122).fork()).ldelim();
    }
    if (message.news !== undefined) {
      News.encode(message.news, writer.uint32(162).fork()).ldelim();
    }
    if (message.clearBook !== undefined) {
      ClearBook.encode(message.clearBook, writer.uint32(170).fork()).ldelim();
    }
    if (message.instrumentStatus !== undefined) {
      InstrumentStatus.encode(message.instrumentStatus, writer.uint32(178).fork()).ldelim();
    }
    if (message.bbo !== undefined) {
      BestBidOffer.encode(message.bbo, writer.uint32(186).fork()).ldelim();
    }
    if (message.depthPriceLevel !== undefined) {
      DepthPriceLevel.encode(message.depthPriceLevel, writer.uint32(194).fork()).ldelim();
    }
    if (message.depthOrder !== undefined) {
      DepthOrder.encode(message.depthOrder, writer.uint32(202).fork()).ldelim();
    }
    if (message.index !== undefined) {
      IndexValue.encode(message.index, writer.uint32(210).fork()).ldelim();
    }
    if (message.trades !== undefined) {
      Trades.encode(message.trades, writer.uint32(218).fork()).ldelim();
    }
    if (message.open !== undefined) {
      Open.encode(message.open, writer.uint32(226).fork()).ldelim();
    }
    if (message.high !== undefined) {
      High.encode(message.high, writer.uint32(234).fork()).ldelim();
    }
    if (message.low !== undefined) {
      Low.encode(message.low, writer.uint32(242).fork()).ldelim();
    }
    if (message.close !== undefined) {
      Close.encode(message.close, writer.uint32(250).fork()).ldelim();
    }
    if (message.prevClose !== undefined) {
      PrevClose.encode(message.prevClose, writer.uint32(258).fork()).ldelim();
    }
    if (message.last !== undefined) {
      Last.encode(message.last, writer.uint32(266).fork()).ldelim();
    }
    if (message.yearHigh !== undefined) {
      YearHigh.encode(message.yearHigh, writer.uint32(274).fork()).ldelim();
    }
    if (message.yearLow !== undefined) {
      YearLow.encode(message.yearLow, writer.uint32(282).fork()).ldelim();
    }
    if (message.volume !== undefined) {
      Volume.encode(message.volume, writer.uint32(290).fork()).ldelim();
    }
    if (message.settlement !== undefined) {
      Settlement.encode(message.settlement, writer.uint32(298).fork()).ldelim();
    }
    if (message.openInterest !== undefined) {
      OpenInterest.encode(message.openInterest, writer.uint32(306).fork()).ldelim();
    }
    if (message.vwap !== undefined) {
      Vwap.encode(message.vwap, writer.uint32(314).fork()).ldelim();
    }
    if (message.dividendsIncomeDistributions !== undefined) {
      DividendsIncomeDistributions.encode(message.dividendsIncomeDistributions, writer.uint32(322).fork()).ldelim();
    }
    if (message.numberOfTrades !== undefined) {
      NumberOfTrades.encode(message.numberOfTrades, writer.uint32(330).fork()).ldelim();
    }
    if (message.monetaryValue !== undefined) {
      MonetaryValue.encode(message.monetaryValue, writer.uint32(338).fork()).ldelim();
    }
    if (message.capitalDistributions !== undefined) {
      CapitalDistributions.encode(message.capitalDistributions, writer.uint32(346).fork()).ldelim();
    }
    if (message.sharesOutstanding !== undefined) {
      SharesOutstanding.encode(message.sharesOutstanding, writer.uint32(354).fork()).ldelim();
    }
    if (message.netAssetValue !== undefined) {
      NetAssetValue.encode(message.netAssetValue, writer.uint32(362).fork()).ldelim();
    }
    if (message.marketSummary !== undefined) {
      MarketSummary.encode(message.marketSummary, writer.uint32(370).fork()).ldelim();
    }
    if (message.highRolling !== undefined) {
      HighRolling.encode(message.highRolling, writer.uint32(378).fork()).ldelim();
    }
    if (message.lowRolling !== undefined) {
      LowRolling.encode(message.lowRolling, writer.uint32(386).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MarketUpdate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarketUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader.sint64() as Long;
          break;
        case 2:
          message.symbol = reader.string();
          break;
        case 3:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 4:
          message.distributionTime = reader.sint64() as Long;
          break;
        case 5:
          message.marketSequence = reader.sint64() as Long;
          break;
        case 6:
          message.sourceSequence = reader.sint64() as Long;
          break;
        case 7:
          message.originatorId = reader.bytes();
          break;
        case 9:
          message.priceDenominator = reader.sint32();
          break;
        case 10:
          message.context = Context.decode(reader, reader.uint32());
          break;
        case 11:
          message.session = MarketSession.decode(reader, reader.uint32());
          break;
        case 12:
          message.tSession = MarketSession.decode(reader, reader.uint32());
          break;
        case 13:
          message.previousSession = MarketSession.decode(reader, reader.uint32());
          break;
        case 14:
          message.regional = reader.bool();
          break;
        case 15:
          message.zSession = MarketSession.decode(reader, reader.uint32());
          break;
        case 20:
          message.news = News.decode(reader, reader.uint32());
          break;
        case 21:
          message.clearBook = ClearBook.decode(reader, reader.uint32());
          break;
        case 22:
          message.instrumentStatus = InstrumentStatus.decode(reader, reader.uint32());
          break;
        case 23:
          message.bbo = BestBidOffer.decode(reader, reader.uint32());
          break;
        case 24:
          message.depthPriceLevel = DepthPriceLevel.decode(reader, reader.uint32());
          break;
        case 25:
          message.depthOrder = DepthOrder.decode(reader, reader.uint32());
          break;
        case 26:
          message.index = IndexValue.decode(reader, reader.uint32());
          break;
        case 27:
          message.trades = Trades.decode(reader, reader.uint32());
          break;
        case 28:
          message.open = Open.decode(reader, reader.uint32());
          break;
        case 29:
          message.high = High.decode(reader, reader.uint32());
          break;
        case 30:
          message.low = Low.decode(reader, reader.uint32());
          break;
        case 31:
          message.close = Close.decode(reader, reader.uint32());
          break;
        case 32:
          message.prevClose = PrevClose.decode(reader, reader.uint32());
          break;
        case 33:
          message.last = Last.decode(reader, reader.uint32());
          break;
        case 34:
          message.yearHigh = YearHigh.decode(reader, reader.uint32());
          break;
        case 35:
          message.yearLow = YearLow.decode(reader, reader.uint32());
          break;
        case 36:
          message.volume = Volume.decode(reader, reader.uint32());
          break;
        case 37:
          message.settlement = Settlement.decode(reader, reader.uint32());
          break;
        case 38:
          message.openInterest = OpenInterest.decode(reader, reader.uint32());
          break;
        case 39:
          message.vwap = Vwap.decode(reader, reader.uint32());
          break;
        case 40:
          message.dividendsIncomeDistributions = DividendsIncomeDistributions.decode(reader, reader.uint32());
          break;
        case 41:
          message.numberOfTrades = NumberOfTrades.decode(reader, reader.uint32());
          break;
        case 42:
          message.monetaryValue = MonetaryValue.decode(reader, reader.uint32());
          break;
        case 43:
          message.capitalDistributions = CapitalDistributions.decode(reader, reader.uint32());
          break;
        case 44:
          message.sharesOutstanding = SharesOutstanding.decode(reader, reader.uint32());
          break;
        case 45:
          message.netAssetValue = NetAssetValue.decode(reader, reader.uint32());
          break;
        case 46:
          message.marketSummary = MarketSummary.decode(reader, reader.uint32());
          break;
        case 47:
          message.highRolling = HighRolling.decode(reader, reader.uint32());
          break;
        case 48:
          message.lowRolling = LowRolling.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MarketUpdate {
    return {
      marketId: isSet(object.marketId) ? Long.fromValue(object.marketId) : Long.ZERO,
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      distributionTime: isSet(object.distributionTime) ? Long.fromValue(object.distributionTime) : Long.ZERO,
      marketSequence: isSet(object.marketSequence) ? Long.fromValue(object.marketSequence) : Long.ZERO,
      sourceSequence: isSet(object.sourceSequence) ? Long.fromValue(object.sourceSequence) : Long.ZERO,
      originatorId: isSet(object.originatorId) ? bytesFromBase64(object.originatorId) : new Uint8Array(),
      priceDenominator: isSet(object.priceDenominator) ? Number(object.priceDenominator) : 0,
      context: isSet(object.context) ? Context.fromJSON(object.context) : undefined,
      session: isSet(object.session) ? MarketSession.fromJSON(object.session) : undefined,
      tSession: isSet(object.tSession) ? MarketSession.fromJSON(object.tSession) : undefined,
      previousSession: isSet(object.previousSession) ? MarketSession.fromJSON(object.previousSession) : undefined,
      regional: isSet(object.regional) ? Boolean(object.regional) : false,
      zSession: isSet(object.zSession) ? MarketSession.fromJSON(object.zSession) : undefined,
      news: isSet(object.news) ? News.fromJSON(object.news) : undefined,
      clearBook: isSet(object.clearBook) ? ClearBook.fromJSON(object.clearBook) : undefined,
      instrumentStatus: isSet(object.instrumentStatus) ? InstrumentStatus.fromJSON(object.instrumentStatus) : undefined,
      bbo: isSet(object.bbo) ? BestBidOffer.fromJSON(object.bbo) : undefined,
      depthPriceLevel: isSet(object.depthPriceLevel) ? DepthPriceLevel.fromJSON(object.depthPriceLevel) : undefined,
      depthOrder: isSet(object.depthOrder) ? DepthOrder.fromJSON(object.depthOrder) : undefined,
      index: isSet(object.index) ? IndexValue.fromJSON(object.index) : undefined,
      trades: isSet(object.trades) ? Trades.fromJSON(object.trades) : undefined,
      open: isSet(object.open) ? Open.fromJSON(object.open) : undefined,
      high: isSet(object.high) ? High.fromJSON(object.high) : undefined,
      low: isSet(object.low) ? Low.fromJSON(object.low) : undefined,
      close: isSet(object.close) ? Close.fromJSON(object.close) : undefined,
      prevClose: isSet(object.prevClose) ? PrevClose.fromJSON(object.prevClose) : undefined,
      last: isSet(object.last) ? Last.fromJSON(object.last) : undefined,
      yearHigh: isSet(object.yearHigh) ? YearHigh.fromJSON(object.yearHigh) : undefined,
      yearLow: isSet(object.yearLow) ? YearLow.fromJSON(object.yearLow) : undefined,
      volume: isSet(object.volume) ? Volume.fromJSON(object.volume) : undefined,
      settlement: isSet(object.settlement) ? Settlement.fromJSON(object.settlement) : undefined,
      openInterest: isSet(object.openInterest) ? OpenInterest.fromJSON(object.openInterest) : undefined,
      vwap: isSet(object.vwap) ? Vwap.fromJSON(object.vwap) : undefined,
      dividendsIncomeDistributions: isSet(object.dividendsIncomeDistributions)
        ? DividendsIncomeDistributions.fromJSON(object.dividendsIncomeDistributions)
        : undefined,
      numberOfTrades: isSet(object.numberOfTrades) ? NumberOfTrades.fromJSON(object.numberOfTrades) : undefined,
      monetaryValue: isSet(object.monetaryValue) ? MonetaryValue.fromJSON(object.monetaryValue) : undefined,
      capitalDistributions: isSet(object.capitalDistributions)
        ? CapitalDistributions.fromJSON(object.capitalDistributions)
        : undefined,
      sharesOutstanding: isSet(object.sharesOutstanding)
        ? SharesOutstanding.fromJSON(object.sharesOutstanding)
        : undefined,
      netAssetValue: isSet(object.netAssetValue) ? NetAssetValue.fromJSON(object.netAssetValue) : undefined,
      marketSummary: isSet(object.marketSummary) ? MarketSummary.fromJSON(object.marketSummary) : undefined,
      highRolling: isSet(object.highRolling) ? HighRolling.fromJSON(object.highRolling) : undefined,
      lowRolling: isSet(object.lowRolling) ? LowRolling.fromJSON(object.lowRolling) : undefined,
    };
  },

  toJSON(message: MarketUpdate): unknown {
    const obj: any = {};
    message.marketId !== undefined && (obj.marketId = (message.marketId || Long.ZERO).toString());
    message.symbol !== undefined && (obj.symbol = message.symbol);
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.distributionTime !== undefined &&
      (obj.distributionTime = (message.distributionTime || Long.ZERO).toString());
    message.marketSequence !== undefined && (obj.marketSequence = (message.marketSequence || Long.ZERO).toString());
    message.sourceSequence !== undefined && (obj.sourceSequence = (message.sourceSequence || Long.ZERO).toString());
    message.originatorId !== undefined &&
      (obj.originatorId = base64FromBytes(
        message.originatorId !== undefined ? message.originatorId : new Uint8Array(),
      ));
    message.priceDenominator !== undefined && (obj.priceDenominator = Math.round(message.priceDenominator));
    message.context !== undefined && (obj.context = message.context ? Context.toJSON(message.context) : undefined);
    message.session !== undefined &&
      (obj.session = message.session ? MarketSession.toJSON(message.session) : undefined);
    message.tSession !== undefined &&
      (obj.tSession = message.tSession ? MarketSession.toJSON(message.tSession) : undefined);
    message.previousSession !== undefined &&
      (obj.previousSession = message.previousSession ? MarketSession.toJSON(message.previousSession) : undefined);
    message.regional !== undefined && (obj.regional = message.regional);
    message.zSession !== undefined &&
      (obj.zSession = message.zSession ? MarketSession.toJSON(message.zSession) : undefined);
    message.news !== undefined && (obj.news = message.news ? News.toJSON(message.news) : undefined);
    message.clearBook !== undefined &&
      (obj.clearBook = message.clearBook ? ClearBook.toJSON(message.clearBook) : undefined);
    message.instrumentStatus !== undefined &&
      (obj.instrumentStatus = message.instrumentStatus ? InstrumentStatus.toJSON(message.instrumentStatus) : undefined);
    message.bbo !== undefined && (obj.bbo = message.bbo ? BestBidOffer.toJSON(message.bbo) : undefined);
    message.depthPriceLevel !== undefined &&
      (obj.depthPriceLevel = message.depthPriceLevel ? DepthPriceLevel.toJSON(message.depthPriceLevel) : undefined);
    message.depthOrder !== undefined &&
      (obj.depthOrder = message.depthOrder ? DepthOrder.toJSON(message.depthOrder) : undefined);
    message.index !== undefined && (obj.index = message.index ? IndexValue.toJSON(message.index) : undefined);
    message.trades !== undefined && (obj.trades = message.trades ? Trades.toJSON(message.trades) : undefined);
    message.open !== undefined && (obj.open = message.open ? Open.toJSON(message.open) : undefined);
    message.high !== undefined && (obj.high = message.high ? High.toJSON(message.high) : undefined);
    message.low !== undefined && (obj.low = message.low ? Low.toJSON(message.low) : undefined);
    message.close !== undefined && (obj.close = message.close ? Close.toJSON(message.close) : undefined);
    message.prevClose !== undefined &&
      (obj.prevClose = message.prevClose ? PrevClose.toJSON(message.prevClose) : undefined);
    message.last !== undefined && (obj.last = message.last ? Last.toJSON(message.last) : undefined);
    message.yearHigh !== undefined && (obj.yearHigh = message.yearHigh ? YearHigh.toJSON(message.yearHigh) : undefined);
    message.yearLow !== undefined && (obj.yearLow = message.yearLow ? YearLow.toJSON(message.yearLow) : undefined);
    message.volume !== undefined && (obj.volume = message.volume ? Volume.toJSON(message.volume) : undefined);
    message.settlement !== undefined &&
      (obj.settlement = message.settlement ? Settlement.toJSON(message.settlement) : undefined);
    message.openInterest !== undefined &&
      (obj.openInterest = message.openInterest ? OpenInterest.toJSON(message.openInterest) : undefined);
    message.vwap !== undefined && (obj.vwap = message.vwap ? Vwap.toJSON(message.vwap) : undefined);
    message.dividendsIncomeDistributions !== undefined &&
      (obj.dividendsIncomeDistributions = message.dividendsIncomeDistributions
        ? DividendsIncomeDistributions.toJSON(message.dividendsIncomeDistributions)
        : undefined);
    message.numberOfTrades !== undefined &&
      (obj.numberOfTrades = message.numberOfTrades ? NumberOfTrades.toJSON(message.numberOfTrades) : undefined);
    message.monetaryValue !== undefined &&
      (obj.monetaryValue = message.monetaryValue ? MonetaryValue.toJSON(message.monetaryValue) : undefined);
    message.capitalDistributions !== undefined && (obj.capitalDistributions = message.capitalDistributions
      ? CapitalDistributions.toJSON(message.capitalDistributions)
      : undefined);
    message.sharesOutstanding !== undefined && (obj.sharesOutstanding = message.sharesOutstanding
      ? SharesOutstanding.toJSON(message.sharesOutstanding)
      : undefined);
    message.netAssetValue !== undefined &&
      (obj.netAssetValue = message.netAssetValue ? NetAssetValue.toJSON(message.netAssetValue) : undefined);
    message.marketSummary !== undefined &&
      (obj.marketSummary = message.marketSummary ? MarketSummary.toJSON(message.marketSummary) : undefined);
    message.highRolling !== undefined &&
      (obj.highRolling = message.highRolling ? HighRolling.toJSON(message.highRolling) : undefined);
    message.lowRolling !== undefined &&
      (obj.lowRolling = message.lowRolling ? LowRolling.toJSON(message.lowRolling) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MarketUpdate>): MarketUpdate {
    const message = createBaseMarketUpdate();
    message.marketId = (object.marketId !== undefined && object.marketId !== null)
      ? Long.fromValue(object.marketId)
      : Long.ZERO;
    message.symbol = object.symbol ?? "";
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.distributionTime = (object.distributionTime !== undefined && object.distributionTime !== null)
      ? Long.fromValue(object.distributionTime)
      : Long.ZERO;
    message.marketSequence = (object.marketSequence !== undefined && object.marketSequence !== null)
      ? Long.fromValue(object.marketSequence)
      : Long.ZERO;
    message.sourceSequence = (object.sourceSequence !== undefined && object.sourceSequence !== null)
      ? Long.fromValue(object.sourceSequence)
      : Long.ZERO;
    message.originatorId = object.originatorId ?? new Uint8Array();
    message.priceDenominator = object.priceDenominator ?? 0;
    message.context = (object.context !== undefined && object.context !== null)
      ? Context.fromPartial(object.context)
      : undefined;
    message.session = (object.session !== undefined && object.session !== null)
      ? MarketSession.fromPartial(object.session)
      : undefined;
    message.tSession = (object.tSession !== undefined && object.tSession !== null)
      ? MarketSession.fromPartial(object.tSession)
      : undefined;
    message.previousSession = (object.previousSession !== undefined && object.previousSession !== null)
      ? MarketSession.fromPartial(object.previousSession)
      : undefined;
    message.regional = object.regional ?? false;
    message.zSession = (object.zSession !== undefined && object.zSession !== null)
      ? MarketSession.fromPartial(object.zSession)
      : undefined;
    message.news = (object.news !== undefined && object.news !== null) ? News.fromPartial(object.news) : undefined;
    message.clearBook = (object.clearBook !== undefined && object.clearBook !== null)
      ? ClearBook.fromPartial(object.clearBook)
      : undefined;
    message.instrumentStatus = (object.instrumentStatus !== undefined && object.instrumentStatus !== null)
      ? InstrumentStatus.fromPartial(object.instrumentStatus)
      : undefined;
    message.bbo = (object.bbo !== undefined && object.bbo !== null) ? BestBidOffer.fromPartial(object.bbo) : undefined;
    message.depthPriceLevel = (object.depthPriceLevel !== undefined && object.depthPriceLevel !== null)
      ? DepthPriceLevel.fromPartial(object.depthPriceLevel)
      : undefined;
    message.depthOrder = (object.depthOrder !== undefined && object.depthOrder !== null)
      ? DepthOrder.fromPartial(object.depthOrder)
      : undefined;
    message.index = (object.index !== undefined && object.index !== null)
      ? IndexValue.fromPartial(object.index)
      : undefined;
    message.trades = (object.trades !== undefined && object.trades !== null)
      ? Trades.fromPartial(object.trades)
      : undefined;
    message.open = (object.open !== undefined && object.open !== null) ? Open.fromPartial(object.open) : undefined;
    message.high = (object.high !== undefined && object.high !== null) ? High.fromPartial(object.high) : undefined;
    message.low = (object.low !== undefined && object.low !== null) ? Low.fromPartial(object.low) : undefined;
    message.close = (object.close !== undefined && object.close !== null) ? Close.fromPartial(object.close) : undefined;
    message.prevClose = (object.prevClose !== undefined && object.prevClose !== null)
      ? PrevClose.fromPartial(object.prevClose)
      : undefined;
    message.last = (object.last !== undefined && object.last !== null) ? Last.fromPartial(object.last) : undefined;
    message.yearHigh = (object.yearHigh !== undefined && object.yearHigh !== null)
      ? YearHigh.fromPartial(object.yearHigh)
      : undefined;
    message.yearLow = (object.yearLow !== undefined && object.yearLow !== null)
      ? YearLow.fromPartial(object.yearLow)
      : undefined;
    message.volume = (object.volume !== undefined && object.volume !== null)
      ? Volume.fromPartial(object.volume)
      : undefined;
    message.settlement = (object.settlement !== undefined && object.settlement !== null)
      ? Settlement.fromPartial(object.settlement)
      : undefined;
    message.openInterest = (object.openInterest !== undefined && object.openInterest !== null)
      ? OpenInterest.fromPartial(object.openInterest)
      : undefined;
    message.vwap = (object.vwap !== undefined && object.vwap !== null) ? Vwap.fromPartial(object.vwap) : undefined;
    message.dividendsIncomeDistributions =
      (object.dividendsIncomeDistributions !== undefined && object.dividendsIncomeDistributions !== null)
        ? DividendsIncomeDistributions.fromPartial(object.dividendsIncomeDistributions)
        : undefined;
    message.numberOfTrades = (object.numberOfTrades !== undefined && object.numberOfTrades !== null)
      ? NumberOfTrades.fromPartial(object.numberOfTrades)
      : undefined;
    message.monetaryValue = (object.monetaryValue !== undefined && object.monetaryValue !== null)
      ? MonetaryValue.fromPartial(object.monetaryValue)
      : undefined;
    message.capitalDistributions = (object.capitalDistributions !== undefined && object.capitalDistributions !== null)
      ? CapitalDistributions.fromPartial(object.capitalDistributions)
      : undefined;
    message.sharesOutstanding = (object.sharesOutstanding !== undefined && object.sharesOutstanding !== null)
      ? SharesOutstanding.fromPartial(object.sharesOutstanding)
      : undefined;
    message.netAssetValue = (object.netAssetValue !== undefined && object.netAssetValue !== null)
      ? NetAssetValue.fromPartial(object.netAssetValue)
      : undefined;
    message.marketSummary = (object.marketSummary !== undefined && object.marketSummary !== null)
      ? MarketSummary.fromPartial(object.marketSummary)
      : undefined;
    message.highRolling = (object.highRolling !== undefined && object.highRolling !== null)
      ? HighRolling.fromPartial(object.highRolling)
      : undefined;
    message.lowRolling = (object.lowRolling !== undefined && object.lowRolling !== null)
      ? LowRolling.fromPartial(object.lowRolling)
      : undefined;
    return message;
  },
};

function createBaseDepthPriceLevel(): DepthPriceLevel {
  return { levels: [] };
}

export const DepthPriceLevel = {
  encode(message: DepthPriceLevel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.levels) {
      DepthPriceLevel_Entry.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DepthPriceLevel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDepthPriceLevel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.levels.push(DepthPriceLevel_Entry.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DepthPriceLevel {
    return {
      levels: Array.isArray(object?.levels) ? object.levels.map((e: any) => DepthPriceLevel_Entry.fromJSON(e)) : [],
    };
  },

  toJSON(message: DepthPriceLevel): unknown {
    const obj: any = {};
    if (message.levels) {
      obj.levels = message.levels.map((e) => e ? DepthPriceLevel_Entry.toJSON(e) : undefined);
    } else {
      obj.levels = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<DepthPriceLevel>): DepthPriceLevel {
    const message = createBaseDepthPriceLevel();
    message.levels = object.levels?.map((e) => DepthPriceLevel_Entry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDepthPriceLevel_Entry(): DepthPriceLevel_Entry {
  return { addPriceLevel: undefined, deletePriceLevel: undefined, modifyPriceLevel: undefined };
}

export const DepthPriceLevel_Entry = {
  encode(message: DepthPriceLevel_Entry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.addPriceLevel !== undefined) {
      AddPriceLevel.encode(message.addPriceLevel, writer.uint32(10).fork()).ldelim();
    }
    if (message.deletePriceLevel !== undefined) {
      DeletePriceLevel.encode(message.deletePriceLevel, writer.uint32(18).fork()).ldelim();
    }
    if (message.modifyPriceLevel !== undefined) {
      ModifyPriceLevel.encode(message.modifyPriceLevel, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DepthPriceLevel_Entry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDepthPriceLevel_Entry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addPriceLevel = AddPriceLevel.decode(reader, reader.uint32());
          break;
        case 2:
          message.deletePriceLevel = DeletePriceLevel.decode(reader, reader.uint32());
          break;
        case 3:
          message.modifyPriceLevel = ModifyPriceLevel.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DepthPriceLevel_Entry {
    return {
      addPriceLevel: isSet(object.addPriceLevel) ? AddPriceLevel.fromJSON(object.addPriceLevel) : undefined,
      deletePriceLevel: isSet(object.deletePriceLevel) ? DeletePriceLevel.fromJSON(object.deletePriceLevel) : undefined,
      modifyPriceLevel: isSet(object.modifyPriceLevel) ? ModifyPriceLevel.fromJSON(object.modifyPriceLevel) : undefined,
    };
  },

  toJSON(message: DepthPriceLevel_Entry): unknown {
    const obj: any = {};
    message.addPriceLevel !== undefined &&
      (obj.addPriceLevel = message.addPriceLevel ? AddPriceLevel.toJSON(message.addPriceLevel) : undefined);
    message.deletePriceLevel !== undefined &&
      (obj.deletePriceLevel = message.deletePriceLevel ? DeletePriceLevel.toJSON(message.deletePriceLevel) : undefined);
    message.modifyPriceLevel !== undefined &&
      (obj.modifyPriceLevel = message.modifyPriceLevel ? ModifyPriceLevel.toJSON(message.modifyPriceLevel) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<DepthPriceLevel_Entry>): DepthPriceLevel_Entry {
    const message = createBaseDepthPriceLevel_Entry();
    message.addPriceLevel = (object.addPriceLevel !== undefined && object.addPriceLevel !== null)
      ? AddPriceLevel.fromPartial(object.addPriceLevel)
      : undefined;
    message.deletePriceLevel = (object.deletePriceLevel !== undefined && object.deletePriceLevel !== null)
      ? DeletePriceLevel.fromPartial(object.deletePriceLevel)
      : undefined;
    message.modifyPriceLevel = (object.modifyPriceLevel !== undefined && object.modifyPriceLevel !== null)
      ? ModifyPriceLevel.fromPartial(object.modifyPriceLevel)
      : undefined;
    return message;
  },
};

function createBaseDepthOrder(): DepthOrder {
  return { orders: [] };
}

export const DepthOrder = {
  encode(message: DepthOrder, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.orders) {
      DepthOrder_Entry.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DepthOrder {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDepthOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orders.push(DepthOrder_Entry.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DepthOrder {
    return { orders: Array.isArray(object?.orders) ? object.orders.map((e: any) => DepthOrder_Entry.fromJSON(e)) : [] };
  },

  toJSON(message: DepthOrder): unknown {
    const obj: any = {};
    if (message.orders) {
      obj.orders = message.orders.map((e) => e ? DepthOrder_Entry.toJSON(e) : undefined);
    } else {
      obj.orders = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<DepthOrder>): DepthOrder {
    const message = createBaseDepthOrder();
    message.orders = object.orders?.map((e) => DepthOrder_Entry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDepthOrder_Entry(): DepthOrder_Entry {
  return { addOrder: undefined, deleteOrder: undefined, modifyOrder: undefined };
}

export const DepthOrder_Entry = {
  encode(message: DepthOrder_Entry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.addOrder !== undefined) {
      AddOrder.encode(message.addOrder, writer.uint32(10).fork()).ldelim();
    }
    if (message.deleteOrder !== undefined) {
      DeleteOrder.encode(message.deleteOrder, writer.uint32(18).fork()).ldelim();
    }
    if (message.modifyOrder !== undefined) {
      ModifyOrder.encode(message.modifyOrder, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DepthOrder_Entry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDepthOrder_Entry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addOrder = AddOrder.decode(reader, reader.uint32());
          break;
        case 2:
          message.deleteOrder = DeleteOrder.decode(reader, reader.uint32());
          break;
        case 3:
          message.modifyOrder = ModifyOrder.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DepthOrder_Entry {
    return {
      addOrder: isSet(object.addOrder) ? AddOrder.fromJSON(object.addOrder) : undefined,
      deleteOrder: isSet(object.deleteOrder) ? DeleteOrder.fromJSON(object.deleteOrder) : undefined,
      modifyOrder: isSet(object.modifyOrder) ? ModifyOrder.fromJSON(object.modifyOrder) : undefined,
    };
  },

  toJSON(message: DepthOrder_Entry): unknown {
    const obj: any = {};
    message.addOrder !== undefined && (obj.addOrder = message.addOrder ? AddOrder.toJSON(message.addOrder) : undefined);
    message.deleteOrder !== undefined &&
      (obj.deleteOrder = message.deleteOrder ? DeleteOrder.toJSON(message.deleteOrder) : undefined);
    message.modifyOrder !== undefined &&
      (obj.modifyOrder = message.modifyOrder ? ModifyOrder.toJSON(message.modifyOrder) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<DepthOrder_Entry>): DepthOrder_Entry {
    const message = createBaseDepthOrder_Entry();
    message.addOrder = (object.addOrder !== undefined && object.addOrder !== null)
      ? AddOrder.fromPartial(object.addOrder)
      : undefined;
    message.deleteOrder = (object.deleteOrder !== undefined && object.deleteOrder !== null)
      ? DeleteOrder.fromPartial(object.deleteOrder)
      : undefined;
    message.modifyOrder = (object.modifyOrder !== undefined && object.modifyOrder !== null)
      ? ModifyOrder.fromPartial(object.modifyOrder)
      : undefined;
    return message;
  },
};

function createBaseNews(): News {
  return { originationTime: Long.ZERO, source: "", languageCode: "", headLine: "", text: "", symbols: [] };
}

export const News = {
  encode(message: News, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.originationTime.isZero()) {
      writer.uint32(8).sint64(message.originationTime);
    }
    if (message.source !== "") {
      writer.uint32(18).string(message.source);
    }
    if (message.languageCode !== "") {
      writer.uint32(26).string(message.languageCode);
    }
    if (message.headLine !== "") {
      writer.uint32(34).string(message.headLine);
    }
    if (message.text !== "") {
      writer.uint32(42).string(message.text);
    }
    for (const v of message.symbols) {
      writer.uint32(50).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): News {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNews();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.originationTime = reader.sint64() as Long;
          break;
        case 2:
          message.source = reader.string();
          break;
        case 3:
          message.languageCode = reader.string();
          break;
        case 4:
          message.headLine = reader.string();
          break;
        case 5:
          message.text = reader.string();
          break;
        case 6:
          message.symbols.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): News {
    return {
      originationTime: isSet(object.originationTime) ? Long.fromValue(object.originationTime) : Long.ZERO,
      source: isSet(object.source) ? String(object.source) : "",
      languageCode: isSet(object.languageCode) ? String(object.languageCode) : "",
      headLine: isSet(object.headLine) ? String(object.headLine) : "",
      text: isSet(object.text) ? String(object.text) : "",
      symbols: Array.isArray(object?.symbols) ? object.symbols.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: News): unknown {
    const obj: any = {};
    message.originationTime !== undefined && (obj.originationTime = (message.originationTime || Long.ZERO).toString());
    message.source !== undefined && (obj.source = message.source);
    message.languageCode !== undefined && (obj.languageCode = message.languageCode);
    message.headLine !== undefined && (obj.headLine = message.headLine);
    message.text !== undefined && (obj.text = message.text);
    if (message.symbols) {
      obj.symbols = message.symbols.map((e) => e);
    } else {
      obj.symbols = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<News>): News {
    const message = createBaseNews();
    message.originationTime = (object.originationTime !== undefined && object.originationTime !== null)
      ? Long.fromValue(object.originationTime)
      : Long.ZERO;
    message.source = object.source ?? "";
    message.languageCode = object.languageCode ?? "";
    message.headLine = object.headLine ?? "";
    message.text = object.text ?? "";
    message.symbols = object.symbols?.map((e) => e) || [];
    return message;
  },
};

function createBaseClearBook(): ClearBook {
  return { reserved: 0, transactionTime: Long.ZERO };
}

export const ClearBook = {
  encode(message: ClearBook, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reserved !== 0) {
      writer.uint32(8).sint32(message.reserved);
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(16).sint64(message.transactionTime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClearBook {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClearBook();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reserved = reader.sint32();
          break;
        case 2:
          message.transactionTime = reader.sint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClearBook {
    return {
      reserved: isSet(object.reserved) ? Number(object.reserved) : 0,
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
    };
  },

  toJSON(message: ClearBook): unknown {
    const obj: any = {};
    message.reserved !== undefined && (obj.reserved = Math.round(message.reserved));
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<ClearBook>): ClearBook {
    const message = createBaseClearBook();
    message.reserved = object.reserved ?? 0;
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    return message;
  },
};

function createBaseInstrumentStatus(): InstrumentStatus {
  return {
    transactionTime: Long.ZERO,
    tradingStatus: 0,
    openingTime: Long.ZERO,
    note: "",
    tradeDate: 0,
    regulationSHOShortSalePriceTest: 0,
  };
}

export const InstrumentStatus = {
  encode(message: InstrumentStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradingStatus !== 0) {
      writer.uint32(80).int32(message.tradingStatus);
    }
    if (!message.openingTime.isZero()) {
      writer.uint32(88).sint64(message.openingTime);
    }
    if (message.note !== "") {
      writer.uint32(98).string(message.note);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(104).sint32(message.tradeDate);
    }
    if (message.regulationSHOShortSalePriceTest !== 0) {
      writer.uint32(112).int32(message.regulationSHOShortSalePriceTest);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentStatus {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstrumentStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.tradingStatus = reader.int32() as any;
          break;
        case 11:
          message.openingTime = reader.sint64() as Long;
          break;
        case 12:
          message.note = reader.string();
          break;
        case 13:
          message.tradeDate = reader.sint32();
          break;
        case 14:
          message.regulationSHOShortSalePriceTest = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InstrumentStatus {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradingStatus: isSet(object.tradingStatus) ? instrumentTradingStatusFromJSON(object.tradingStatus) : 0,
      openingTime: isSet(object.openingTime) ? Long.fromValue(object.openingTime) : Long.ZERO,
      note: isSet(object.note) ? String(object.note) : "",
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      regulationSHOShortSalePriceTest: isSet(object.regulationSHOShortSalePriceTest)
        ? regulationSHOShortSalePriceTestFromJSON(object.regulationSHOShortSalePriceTest)
        : 0,
    };
  },

  toJSON(message: InstrumentStatus): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradingStatus !== undefined && (obj.tradingStatus = instrumentTradingStatusToJSON(message.tradingStatus));
    message.openingTime !== undefined && (obj.openingTime = (message.openingTime || Long.ZERO).toString());
    message.note !== undefined && (obj.note = message.note);
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    message.regulationSHOShortSalePriceTest !== undefined &&
      (obj.regulationSHOShortSalePriceTest = regulationSHOShortSalePriceTestToJSON(
        message.regulationSHOShortSalePriceTest,
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<InstrumentStatus>): InstrumentStatus {
    const message = createBaseInstrumentStatus();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.tradingStatus = object.tradingStatus ?? 0;
    message.openingTime = (object.openingTime !== undefined && object.openingTime !== null)
      ? Long.fromValue(object.openingTime)
      : Long.ZERO;
    message.note = object.note ?? "";
    message.tradeDate = object.tradeDate ?? 0;
    message.regulationSHOShortSalePriceTest = object.regulationSHOShortSalePriceTest ?? 0;
    return message;
  },
};

function createBaseBestBidOffer(): BestBidOffer {
  return {
    transactionTime: Long.ZERO,
    bidPrice: Long.ZERO,
    bidQuantity: Long.ZERO,
    bidOrderCount: 0,
    bidOriginator: new Uint8Array(),
    bidQuoteCondition: new Uint8Array(),
    offerPrice: Long.ZERO,
    offerQuantity: Long.ZERO,
    offerOrderCount: 0,
    offerOriginator: new Uint8Array(),
    offerQuoteCondition: new Uint8Array(),
    quoteCondition: new Uint8Array(),
    regional: false,
    transient: false,
  };
}

export const BestBidOffer = {
  encode(message: BestBidOffer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (!message.bidPrice.isZero()) {
      writer.uint32(80).sint64(message.bidPrice);
    }
    if (!message.bidQuantity.isZero()) {
      writer.uint32(88).sint64(message.bidQuantity);
    }
    if (message.bidOrderCount !== 0) {
      writer.uint32(96).sint32(message.bidOrderCount);
    }
    if (message.bidOriginator.length !== 0) {
      writer.uint32(106).bytes(message.bidOriginator);
    }
    if (message.bidQuoteCondition.length !== 0) {
      writer.uint32(114).bytes(message.bidQuoteCondition);
    }
    if (!message.offerPrice.isZero()) {
      writer.uint32(160).sint64(message.offerPrice);
    }
    if (!message.offerQuantity.isZero()) {
      writer.uint32(168).sint64(message.offerQuantity);
    }
    if (message.offerOrderCount !== 0) {
      writer.uint32(176).sint32(message.offerOrderCount);
    }
    if (message.offerOriginator.length !== 0) {
      writer.uint32(186).bytes(message.offerOriginator);
    }
    if (message.offerQuoteCondition.length !== 0) {
      writer.uint32(194).bytes(message.offerQuoteCondition);
    }
    if (message.quoteCondition.length !== 0) {
      writer.uint32(242).bytes(message.quoteCondition);
    }
    if (message.regional === true) {
      writer.uint32(256).bool(message.regional);
    }
    if (message.transient === true) {
      writer.uint32(264).bool(message.transient);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BestBidOffer {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBestBidOffer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.bidPrice = reader.sint64() as Long;
          break;
        case 11:
          message.bidQuantity = reader.sint64() as Long;
          break;
        case 12:
          message.bidOrderCount = reader.sint32();
          break;
        case 13:
          message.bidOriginator = reader.bytes();
          break;
        case 14:
          message.bidQuoteCondition = reader.bytes();
          break;
        case 20:
          message.offerPrice = reader.sint64() as Long;
          break;
        case 21:
          message.offerQuantity = reader.sint64() as Long;
          break;
        case 22:
          message.offerOrderCount = reader.sint32();
          break;
        case 23:
          message.offerOriginator = reader.bytes();
          break;
        case 24:
          message.offerQuoteCondition = reader.bytes();
          break;
        case 30:
          message.quoteCondition = reader.bytes();
          break;
        case 32:
          message.regional = reader.bool();
          break;
        case 33:
          message.transient = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BestBidOffer {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      bidPrice: isSet(object.bidPrice) ? Long.fromValue(object.bidPrice) : Long.ZERO,
      bidQuantity: isSet(object.bidQuantity) ? Long.fromValue(object.bidQuantity) : Long.ZERO,
      bidOrderCount: isSet(object.bidOrderCount) ? Number(object.bidOrderCount) : 0,
      bidOriginator: isSet(object.bidOriginator) ? bytesFromBase64(object.bidOriginator) : new Uint8Array(),
      bidQuoteCondition: isSet(object.bidQuoteCondition) ? bytesFromBase64(object.bidQuoteCondition) : new Uint8Array(),
      offerPrice: isSet(object.offerPrice) ? Long.fromValue(object.offerPrice) : Long.ZERO,
      offerQuantity: isSet(object.offerQuantity) ? Long.fromValue(object.offerQuantity) : Long.ZERO,
      offerOrderCount: isSet(object.offerOrderCount) ? Number(object.offerOrderCount) : 0,
      offerOriginator: isSet(object.offerOriginator) ? bytesFromBase64(object.offerOriginator) : new Uint8Array(),
      offerQuoteCondition: isSet(object.offerQuoteCondition)
        ? bytesFromBase64(object.offerQuoteCondition)
        : new Uint8Array(),
      quoteCondition: isSet(object.quoteCondition) ? bytesFromBase64(object.quoteCondition) : new Uint8Array(),
      regional: isSet(object.regional) ? Boolean(object.regional) : false,
      transient: isSet(object.transient) ? Boolean(object.transient) : false,
    };
  },

  toJSON(message: BestBidOffer): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.bidPrice !== undefined && (obj.bidPrice = (message.bidPrice || Long.ZERO).toString());
    message.bidQuantity !== undefined && (obj.bidQuantity = (message.bidQuantity || Long.ZERO).toString());
    message.bidOrderCount !== undefined && (obj.bidOrderCount = Math.round(message.bidOrderCount));
    message.bidOriginator !== undefined &&
      (obj.bidOriginator = base64FromBytes(
        message.bidOriginator !== undefined ? message.bidOriginator : new Uint8Array(),
      ));
    message.bidQuoteCondition !== undefined &&
      (obj.bidQuoteCondition = base64FromBytes(
        message.bidQuoteCondition !== undefined ? message.bidQuoteCondition : new Uint8Array(),
      ));
    message.offerPrice !== undefined && (obj.offerPrice = (message.offerPrice || Long.ZERO).toString());
    message.offerQuantity !== undefined && (obj.offerQuantity = (message.offerQuantity || Long.ZERO).toString());
    message.offerOrderCount !== undefined && (obj.offerOrderCount = Math.round(message.offerOrderCount));
    message.offerOriginator !== undefined &&
      (obj.offerOriginator = base64FromBytes(
        message.offerOriginator !== undefined ? message.offerOriginator : new Uint8Array(),
      ));
    message.offerQuoteCondition !== undefined &&
      (obj.offerQuoteCondition = base64FromBytes(
        message.offerQuoteCondition !== undefined ? message.offerQuoteCondition : new Uint8Array(),
      ));
    message.quoteCondition !== undefined &&
      (obj.quoteCondition = base64FromBytes(
        message.quoteCondition !== undefined ? message.quoteCondition : new Uint8Array(),
      ));
    message.regional !== undefined && (obj.regional = message.regional);
    message.transient !== undefined && (obj.transient = message.transient);
    return obj;
  },

  fromPartial(object: DeepPartial<BestBidOffer>): BestBidOffer {
    const message = createBaseBestBidOffer();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.bidPrice = (object.bidPrice !== undefined && object.bidPrice !== null)
      ? Long.fromValue(object.bidPrice)
      : Long.ZERO;
    message.bidQuantity = (object.bidQuantity !== undefined && object.bidQuantity !== null)
      ? Long.fromValue(object.bidQuantity)
      : Long.ZERO;
    message.bidOrderCount = object.bidOrderCount ?? 0;
    message.bidOriginator = object.bidOriginator ?? new Uint8Array();
    message.bidQuoteCondition = object.bidQuoteCondition ?? new Uint8Array();
    message.offerPrice = (object.offerPrice !== undefined && object.offerPrice !== null)
      ? Long.fromValue(object.offerPrice)
      : Long.ZERO;
    message.offerQuantity = (object.offerQuantity !== undefined && object.offerQuantity !== null)
      ? Long.fromValue(object.offerQuantity)
      : Long.ZERO;
    message.offerOrderCount = object.offerOrderCount ?? 0;
    message.offerOriginator = object.offerOriginator ?? new Uint8Array();
    message.offerQuoteCondition = object.offerQuoteCondition ?? new Uint8Array();
    message.quoteCondition = object.quoteCondition ?? new Uint8Array();
    message.regional = object.regional ?? false;
    message.transient = object.transient ?? false;
    return message;
  },
};

function createBaseAddPriceLevel(): AddPriceLevel {
  return {
    transactionTime: Long.ZERO,
    level: 0,
    side: 0,
    price: Long.ZERO,
    quantity: Long.ZERO,
    orderCount: 0,
    impliedQuantity: Long.ZERO,
  };
}

export const AddPriceLevel = {
  encode(message: AddPriceLevel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.level !== 0) {
      writer.uint32(80).sint32(message.level);
    }
    if (message.side !== 0) {
      writer.uint32(88).int32(message.side);
    }
    if (!message.price.isZero()) {
      writer.uint32(96).sint64(message.price);
    }
    if (!message.quantity.isZero()) {
      writer.uint32(104).sint64(message.quantity);
    }
    if (message.orderCount !== 0) {
      writer.uint32(112).sint32(message.orderCount);
    }
    if (!message.impliedQuantity.isZero()) {
      writer.uint32(120).sint64(message.impliedQuantity);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddPriceLevel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddPriceLevel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.level = reader.sint32();
          break;
        case 11:
          message.side = reader.int32() as any;
          break;
        case 12:
          message.price = reader.sint64() as Long;
          break;
        case 13:
          message.quantity = reader.sint64() as Long;
          break;
        case 14:
          message.orderCount = reader.sint32();
          break;
        case 15:
          message.impliedQuantity = reader.sint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddPriceLevel {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      level: isSet(object.level) ? Number(object.level) : 0,
      side: isSet(object.side) ? bookSideFromJSON(object.side) : 0,
      price: isSet(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      quantity: isSet(object.quantity) ? Long.fromValue(object.quantity) : Long.ZERO,
      orderCount: isSet(object.orderCount) ? Number(object.orderCount) : 0,
      impliedQuantity: isSet(object.impliedQuantity) ? Long.fromValue(object.impliedQuantity) : Long.ZERO,
    };
  },

  toJSON(message: AddPriceLevel): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.level !== undefined && (obj.level = Math.round(message.level));
    message.side !== undefined && (obj.side = bookSideToJSON(message.side));
    message.price !== undefined && (obj.price = (message.price || Long.ZERO).toString());
    message.quantity !== undefined && (obj.quantity = (message.quantity || Long.ZERO).toString());
    message.orderCount !== undefined && (obj.orderCount = Math.round(message.orderCount));
    message.impliedQuantity !== undefined && (obj.impliedQuantity = (message.impliedQuantity || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<AddPriceLevel>): AddPriceLevel {
    const message = createBaseAddPriceLevel();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.level = object.level ?? 0;
    message.side = object.side ?? 0;
    message.price = (object.price !== undefined && object.price !== null) ? Long.fromValue(object.price) : Long.ZERO;
    message.quantity = (object.quantity !== undefined && object.quantity !== null)
      ? Long.fromValue(object.quantity)
      : Long.ZERO;
    message.orderCount = object.orderCount ?? 0;
    message.impliedQuantity = (object.impliedQuantity !== undefined && object.impliedQuantity !== null)
      ? Long.fromValue(object.impliedQuantity)
      : Long.ZERO;
    return message;
  },
};

function createBaseDeletePriceLevel(): DeletePriceLevel {
  return { transactionTime: Long.ZERO, level: 0, side: 0 };
}

export const DeletePriceLevel = {
  encode(message: DeletePriceLevel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.level !== 0) {
      writer.uint32(80).sint32(message.level);
    }
    if (message.side !== 0) {
      writer.uint32(88).int32(message.side);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeletePriceLevel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeletePriceLevel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.level = reader.sint32();
          break;
        case 11:
          message.side = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeletePriceLevel {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      level: isSet(object.level) ? Number(object.level) : 0,
      side: isSet(object.side) ? bookSideFromJSON(object.side) : 0,
    };
  },

  toJSON(message: DeletePriceLevel): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.level !== undefined && (obj.level = Math.round(message.level));
    message.side !== undefined && (obj.side = bookSideToJSON(message.side));
    return obj;
  },

  fromPartial(object: DeepPartial<DeletePriceLevel>): DeletePriceLevel {
    const message = createBaseDeletePriceLevel();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.level = object.level ?? 0;
    message.side = object.side ?? 0;
    return message;
  },
};

function createBaseModifyPriceLevel(): ModifyPriceLevel {
  return {
    transactionTime: Long.ZERO,
    level: 0,
    side: 0,
    price: Long.ZERO,
    quantity: Long.ZERO,
    orderCount: 0,
    impliedQuantity: Long.ZERO,
  };
}

export const ModifyPriceLevel = {
  encode(message: ModifyPriceLevel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.level !== 0) {
      writer.uint32(80).sint32(message.level);
    }
    if (message.side !== 0) {
      writer.uint32(88).int32(message.side);
    }
    if (!message.price.isZero()) {
      writer.uint32(96).sint64(message.price);
    }
    if (!message.quantity.isZero()) {
      writer.uint32(104).sint64(message.quantity);
    }
    if (message.orderCount !== 0) {
      writer.uint32(112).sint32(message.orderCount);
    }
    if (!message.impliedQuantity.isZero()) {
      writer.uint32(120).sint64(message.impliedQuantity);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModifyPriceLevel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModifyPriceLevel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.level = reader.sint32();
          break;
        case 11:
          message.side = reader.int32() as any;
          break;
        case 12:
          message.price = reader.sint64() as Long;
          break;
        case 13:
          message.quantity = reader.sint64() as Long;
          break;
        case 14:
          message.orderCount = reader.sint32();
          break;
        case 15:
          message.impliedQuantity = reader.sint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ModifyPriceLevel {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      level: isSet(object.level) ? Number(object.level) : 0,
      side: isSet(object.side) ? bookSideFromJSON(object.side) : 0,
      price: isSet(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      quantity: isSet(object.quantity) ? Long.fromValue(object.quantity) : Long.ZERO,
      orderCount: isSet(object.orderCount) ? Number(object.orderCount) : 0,
      impliedQuantity: isSet(object.impliedQuantity) ? Long.fromValue(object.impliedQuantity) : Long.ZERO,
    };
  },

  toJSON(message: ModifyPriceLevel): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.level !== undefined && (obj.level = Math.round(message.level));
    message.side !== undefined && (obj.side = bookSideToJSON(message.side));
    message.price !== undefined && (obj.price = (message.price || Long.ZERO).toString());
    message.quantity !== undefined && (obj.quantity = (message.quantity || Long.ZERO).toString());
    message.orderCount !== undefined && (obj.orderCount = Math.round(message.orderCount));
    message.impliedQuantity !== undefined && (obj.impliedQuantity = (message.impliedQuantity || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<ModifyPriceLevel>): ModifyPriceLevel {
    const message = createBaseModifyPriceLevel();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.level = object.level ?? 0;
    message.side = object.side ?? 0;
    message.price = (object.price !== undefined && object.price !== null) ? Long.fromValue(object.price) : Long.ZERO;
    message.quantity = (object.quantity !== undefined && object.quantity !== null)
      ? Long.fromValue(object.quantity)
      : Long.ZERO;
    message.orderCount = object.orderCount ?? 0;
    message.impliedQuantity = (object.impliedQuantity !== undefined && object.impliedQuantity !== null)
      ? Long.fromValue(object.impliedQuantity)
      : Long.ZERO;
    return message;
  },
};

function createBaseAddOrder(): AddOrder {
  return {
    transactionTime: Long.ZERO,
    orderId: Long.ZERO,
    side: 0,
    price: Long.ZERO,
    quantity: Long.ZERO,
    isImplied: false,
    priority: Long.ZERO,
  };
}

export const AddOrder = {
  encode(message: AddOrder, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (!message.orderId.isZero()) {
      writer.uint32(80).sint64(message.orderId);
    }
    if (message.side !== 0) {
      writer.uint32(88).int32(message.side);
    }
    if (!message.price.isZero()) {
      writer.uint32(96).sint64(message.price);
    }
    if (!message.quantity.isZero()) {
      writer.uint32(104).sint64(message.quantity);
    }
    if (message.isImplied === true) {
      writer.uint32(112).bool(message.isImplied);
    }
    if (!message.priority.isZero()) {
      writer.uint32(120).sint64(message.priority);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddOrder {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.orderId = reader.sint64() as Long;
          break;
        case 11:
          message.side = reader.int32() as any;
          break;
        case 12:
          message.price = reader.sint64() as Long;
          break;
        case 13:
          message.quantity = reader.sint64() as Long;
          break;
        case 14:
          message.isImplied = reader.bool();
          break;
        case 15:
          message.priority = reader.sint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddOrder {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      orderId: isSet(object.orderId) ? Long.fromValue(object.orderId) : Long.ZERO,
      side: isSet(object.side) ? bookSideFromJSON(object.side) : 0,
      price: isSet(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      quantity: isSet(object.quantity) ? Long.fromValue(object.quantity) : Long.ZERO,
      isImplied: isSet(object.isImplied) ? Boolean(object.isImplied) : false,
      priority: isSet(object.priority) ? Long.fromValue(object.priority) : Long.ZERO,
    };
  },

  toJSON(message: AddOrder): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.orderId !== undefined && (obj.orderId = (message.orderId || Long.ZERO).toString());
    message.side !== undefined && (obj.side = bookSideToJSON(message.side));
    message.price !== undefined && (obj.price = (message.price || Long.ZERO).toString());
    message.quantity !== undefined && (obj.quantity = (message.quantity || Long.ZERO).toString());
    message.isImplied !== undefined && (obj.isImplied = message.isImplied);
    message.priority !== undefined && (obj.priority = (message.priority || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<AddOrder>): AddOrder {
    const message = createBaseAddOrder();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.orderId = (object.orderId !== undefined && object.orderId !== null)
      ? Long.fromValue(object.orderId)
      : Long.ZERO;
    message.side = object.side ?? 0;
    message.price = (object.price !== undefined && object.price !== null) ? Long.fromValue(object.price) : Long.ZERO;
    message.quantity = (object.quantity !== undefined && object.quantity !== null)
      ? Long.fromValue(object.quantity)
      : Long.ZERO;
    message.isImplied = object.isImplied ?? false;
    message.priority = (object.priority !== undefined && object.priority !== null)
      ? Long.fromValue(object.priority)
      : Long.ZERO;
    return message;
  },
};

function createBaseDeleteOrder(): DeleteOrder {
  return { transactionTime: Long.ZERO, orderId: Long.ZERO, side: 0 };
}

export const DeleteOrder = {
  encode(message: DeleteOrder, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (!message.orderId.isZero()) {
      writer.uint32(80).sint64(message.orderId);
    }
    if (message.side !== 0) {
      writer.uint32(88).int32(message.side);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteOrder {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.orderId = reader.sint64() as Long;
          break;
        case 11:
          message.side = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteOrder {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      orderId: isSet(object.orderId) ? Long.fromValue(object.orderId) : Long.ZERO,
      side: isSet(object.side) ? bookSideFromJSON(object.side) : 0,
    };
  },

  toJSON(message: DeleteOrder): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.orderId !== undefined && (obj.orderId = (message.orderId || Long.ZERO).toString());
    message.side !== undefined && (obj.side = bookSideToJSON(message.side));
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteOrder>): DeleteOrder {
    const message = createBaseDeleteOrder();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.orderId = (object.orderId !== undefined && object.orderId !== null)
      ? Long.fromValue(object.orderId)
      : Long.ZERO;
    message.side = object.side ?? 0;
    return message;
  },
};

function createBaseModifyOrder(): ModifyOrder {
  return {
    transactionTime: Long.ZERO,
    orderId: Long.ZERO,
    side: 0,
    price: Long.ZERO,
    quantity: Long.ZERO,
    isImplied: false,
    priority: Long.ZERO,
  };
}

export const ModifyOrder = {
  encode(message: ModifyOrder, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (!message.orderId.isZero()) {
      writer.uint32(80).sint64(message.orderId);
    }
    if (message.side !== 0) {
      writer.uint32(88).int32(message.side);
    }
    if (!message.price.isZero()) {
      writer.uint32(96).sint64(message.price);
    }
    if (!message.quantity.isZero()) {
      writer.uint32(104).sint64(message.quantity);
    }
    if (message.isImplied === true) {
      writer.uint32(112).bool(message.isImplied);
    }
    if (!message.priority.isZero()) {
      writer.uint32(120).sint64(message.priority);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModifyOrder {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModifyOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.orderId = reader.sint64() as Long;
          break;
        case 11:
          message.side = reader.int32() as any;
          break;
        case 12:
          message.price = reader.sint64() as Long;
          break;
        case 13:
          message.quantity = reader.sint64() as Long;
          break;
        case 14:
          message.isImplied = reader.bool();
          break;
        case 15:
          message.priority = reader.sint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ModifyOrder {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      orderId: isSet(object.orderId) ? Long.fromValue(object.orderId) : Long.ZERO,
      side: isSet(object.side) ? bookSideFromJSON(object.side) : 0,
      price: isSet(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      quantity: isSet(object.quantity) ? Long.fromValue(object.quantity) : Long.ZERO,
      isImplied: isSet(object.isImplied) ? Boolean(object.isImplied) : false,
      priority: isSet(object.priority) ? Long.fromValue(object.priority) : Long.ZERO,
    };
  },

  toJSON(message: ModifyOrder): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.orderId !== undefined && (obj.orderId = (message.orderId || Long.ZERO).toString());
    message.side !== undefined && (obj.side = bookSideToJSON(message.side));
    message.price !== undefined && (obj.price = (message.price || Long.ZERO).toString());
    message.quantity !== undefined && (obj.quantity = (message.quantity || Long.ZERO).toString());
    message.isImplied !== undefined && (obj.isImplied = message.isImplied);
    message.priority !== undefined && (obj.priority = (message.priority || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<ModifyOrder>): ModifyOrder {
    const message = createBaseModifyOrder();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.orderId = (object.orderId !== undefined && object.orderId !== null)
      ? Long.fromValue(object.orderId)
      : Long.ZERO;
    message.side = object.side ?? 0;
    message.price = (object.price !== undefined && object.price !== null) ? Long.fromValue(object.price) : Long.ZERO;
    message.quantity = (object.quantity !== undefined && object.quantity !== null)
      ? Long.fromValue(object.quantity)
      : Long.ZERO;
    message.isImplied = object.isImplied ?? false;
    message.priority = (object.priority !== undefined && object.priority !== null)
      ? Long.fromValue(object.priority)
      : Long.ZERO;
    return message;
  },
};

function createBaseIndexValue(): IndexValue {
  return {
    transactionTime: Long.ZERO,
    tradeDate: 0,
    last: Long.ZERO,
    volume: Long.ZERO,
    open: Long.ZERO,
    settlementOpen: Long.ZERO,
    specialOpen: Long.ZERO,
    high: Long.ZERO,
    low: Long.ZERO,
    close: Long.ZERO,
    bid: Long.ZERO,
    offer: Long.ZERO,
  };
}

export const IndexValue = {
  encode(message: IndexValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.last.isZero()) {
      writer.uint32(88).sint64(message.last);
    }
    if (!message.volume.isZero()) {
      writer.uint32(96).sint64(message.volume);
    }
    if (!message.open.isZero()) {
      writer.uint32(104).sint64(message.open);
    }
    if (!message.settlementOpen.isZero()) {
      writer.uint32(112).sint64(message.settlementOpen);
    }
    if (!message.specialOpen.isZero()) {
      writer.uint32(120).sint64(message.specialOpen);
    }
    if (!message.high.isZero()) {
      writer.uint32(128).sint64(message.high);
    }
    if (!message.low.isZero()) {
      writer.uint32(136).sint64(message.low);
    }
    if (!message.close.isZero()) {
      writer.uint32(144).sint64(message.close);
    }
    if (!message.bid.isZero()) {
      writer.uint32(152).sint64(message.bid);
    }
    if (!message.offer.isZero()) {
      writer.uint32(160).sint64(message.offer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IndexValue {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIndexValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.last = reader.sint64() as Long;
          break;
        case 12:
          message.volume = reader.sint64() as Long;
          break;
        case 13:
          message.open = reader.sint64() as Long;
          break;
        case 14:
          message.settlementOpen = reader.sint64() as Long;
          break;
        case 15:
          message.specialOpen = reader.sint64() as Long;
          break;
        case 16:
          message.high = reader.sint64() as Long;
          break;
        case 17:
          message.low = reader.sint64() as Long;
          break;
        case 18:
          message.close = reader.sint64() as Long;
          break;
        case 19:
          message.bid = reader.sint64() as Long;
          break;
        case 20:
          message.offer = reader.sint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): IndexValue {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      last: isSet(object.last) ? Long.fromValue(object.last) : Long.ZERO,
      volume: isSet(object.volume) ? Long.fromValue(object.volume) : Long.ZERO,
      open: isSet(object.open) ? Long.fromValue(object.open) : Long.ZERO,
      settlementOpen: isSet(object.settlementOpen) ? Long.fromValue(object.settlementOpen) : Long.ZERO,
      specialOpen: isSet(object.specialOpen) ? Long.fromValue(object.specialOpen) : Long.ZERO,
      high: isSet(object.high) ? Long.fromValue(object.high) : Long.ZERO,
      low: isSet(object.low) ? Long.fromValue(object.low) : Long.ZERO,
      close: isSet(object.close) ? Long.fromValue(object.close) : Long.ZERO,
      bid: isSet(object.bid) ? Long.fromValue(object.bid) : Long.ZERO,
      offer: isSet(object.offer) ? Long.fromValue(object.offer) : Long.ZERO,
    };
  },

  toJSON(message: IndexValue): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    message.last !== undefined && (obj.last = (message.last || Long.ZERO).toString());
    message.volume !== undefined && (obj.volume = (message.volume || Long.ZERO).toString());
    message.open !== undefined && (obj.open = (message.open || Long.ZERO).toString());
    message.settlementOpen !== undefined && (obj.settlementOpen = (message.settlementOpen || Long.ZERO).toString());
    message.specialOpen !== undefined && (obj.specialOpen = (message.specialOpen || Long.ZERO).toString());
    message.high !== undefined && (obj.high = (message.high || Long.ZERO).toString());
    message.low !== undefined && (obj.low = (message.low || Long.ZERO).toString());
    message.close !== undefined && (obj.close = (message.close || Long.ZERO).toString());
    message.bid !== undefined && (obj.bid = (message.bid || Long.ZERO).toString());
    message.offer !== undefined && (obj.offer = (message.offer || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<IndexValue>): IndexValue {
    const message = createBaseIndexValue();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.last = (object.last !== undefined && object.last !== null) ? Long.fromValue(object.last) : Long.ZERO;
    message.volume = (object.volume !== undefined && object.volume !== null)
      ? Long.fromValue(object.volume)
      : Long.ZERO;
    message.open = (object.open !== undefined && object.open !== null) ? Long.fromValue(object.open) : Long.ZERO;
    message.settlementOpen = (object.settlementOpen !== undefined && object.settlementOpen !== null)
      ? Long.fromValue(object.settlementOpen)
      : Long.ZERO;
    message.specialOpen = (object.specialOpen !== undefined && object.specialOpen !== null)
      ? Long.fromValue(object.specialOpen)
      : Long.ZERO;
    message.high = (object.high !== undefined && object.high !== null) ? Long.fromValue(object.high) : Long.ZERO;
    message.low = (object.low !== undefined && object.low !== null) ? Long.fromValue(object.low) : Long.ZERO;
    message.close = (object.close !== undefined && object.close !== null) ? Long.fromValue(object.close) : Long.ZERO;
    message.bid = (object.bid !== undefined && object.bid !== null) ? Long.fromValue(object.bid) : Long.ZERO;
    message.offer = (object.offer !== undefined && object.offer !== null) ? Long.fromValue(object.offer) : Long.ZERO;
    return message;
  },
};

function createBaseTrades(): Trades {
  return { trades: [] };
}

export const Trades = {
  encode(message: Trades, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.trades) {
      Trades_Entry.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Trades {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrades();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.trades.push(Trades_Entry.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Trades {
    return { trades: Array.isArray(object?.trades) ? object.trades.map((e: any) => Trades_Entry.fromJSON(e)) : [] };
  },

  toJSON(message: Trades): unknown {
    const obj: any = {};
    if (message.trades) {
      obj.trades = message.trades.map((e) => e ? Trades_Entry.toJSON(e) : undefined);
    } else {
      obj.trades = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Trades>): Trades {
    const message = createBaseTrades();
    message.trades = object.trades?.map((e) => Trades_Entry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseTrades_Entry(): Trades_Entry {
  return { trade: undefined, tradeCorrection: undefined, tradeCancel: undefined };
}

export const Trades_Entry = {
  encode(message: Trades_Entry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.trade !== undefined) {
      Trade.encode(message.trade, writer.uint32(10).fork()).ldelim();
    }
    if (message.tradeCorrection !== undefined) {
      TradeCorrection.encode(message.tradeCorrection, writer.uint32(18).fork()).ldelim();
    }
    if (message.tradeCancel !== undefined) {
      TradeCancel.encode(message.tradeCancel, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Trades_Entry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrades_Entry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.trade = Trade.decode(reader, reader.uint32());
          break;
        case 2:
          message.tradeCorrection = TradeCorrection.decode(reader, reader.uint32());
          break;
        case 3:
          message.tradeCancel = TradeCancel.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Trades_Entry {
    return {
      trade: isSet(object.trade) ? Trade.fromJSON(object.trade) : undefined,
      tradeCorrection: isSet(object.tradeCorrection) ? TradeCorrection.fromJSON(object.tradeCorrection) : undefined,
      tradeCancel: isSet(object.tradeCancel) ? TradeCancel.fromJSON(object.tradeCancel) : undefined,
    };
  },

  toJSON(message: Trades_Entry): unknown {
    const obj: any = {};
    message.trade !== undefined && (obj.trade = message.trade ? Trade.toJSON(message.trade) : undefined);
    message.tradeCorrection !== undefined &&
      (obj.tradeCorrection = message.tradeCorrection ? TradeCorrection.toJSON(message.tradeCorrection) : undefined);
    message.tradeCancel !== undefined &&
      (obj.tradeCancel = message.tradeCancel ? TradeCancel.toJSON(message.tradeCancel) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Trades_Entry>): Trades_Entry {
    const message = createBaseTrades_Entry();
    message.trade = (object.trade !== undefined && object.trade !== null) ? Trade.fromPartial(object.trade) : undefined;
    message.tradeCorrection = (object.tradeCorrection !== undefined && object.tradeCorrection !== null)
      ? TradeCorrection.fromPartial(object.tradeCorrection)
      : undefined;
    message.tradeCancel = (object.tradeCancel !== undefined && object.tradeCancel !== null)
      ? TradeCancel.fromPartial(object.tradeCancel)
      : undefined;
    return message;
  },
};

function createBaseTrade(): Trade {
  return {
    originatorId: new Uint8Array(),
    transactionTime: Long.ZERO,
    price: Long.ZERO,
    quantity: Long.ZERO,
    tradeId: new Uint8Array(),
    side: 0,
    tradeDate: 0,
    buyerId: new Uint8Array(),
    sellerId: new Uint8Array(),
    openingTrade: false,
    systemPriced: false,
    marketOnClose: false,
    oddLot: false,
    settlementTerms: 0,
    crossType: 0,
    byPass: false,
    lastPrice: Long.ZERO,
    saleCondition: new Uint8Array(),
    currency: "",
    doesNotUpdateLast: false,
    doesNotUpdateVolume: false,
    session: "",
    blockTrade: false,
    distributionTime: Long.ZERO,
    transactionTime2: Long.ZERO,
    consolidatedPriceIndicator: "",
    transient: false,
    indexShortName: "",
  };
}

export const Trade = {
  encode(message: Trade, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.originatorId.length !== 0) {
      writer.uint32(66).bytes(message.originatorId);
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (!message.price.isZero()) {
      writer.uint32(80).sint64(message.price);
    }
    if (!message.quantity.isZero()) {
      writer.uint32(88).sint64(message.quantity);
    }
    if (message.tradeId.length !== 0) {
      writer.uint32(98).bytes(message.tradeId);
    }
    if (message.side !== 0) {
      writer.uint32(104).int32(message.side);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(112).sint32(message.tradeDate);
    }
    if (message.buyerId.length !== 0) {
      writer.uint32(122).bytes(message.buyerId);
    }
    if (message.sellerId.length !== 0) {
      writer.uint32(130).bytes(message.sellerId);
    }
    if (message.openingTrade === true) {
      writer.uint32(136).bool(message.openingTrade);
    }
    if (message.systemPriced === true) {
      writer.uint32(144).bool(message.systemPriced);
    }
    if (message.marketOnClose === true) {
      writer.uint32(152).bool(message.marketOnClose);
    }
    if (message.oddLot === true) {
      writer.uint32(160).bool(message.oddLot);
    }
    if (message.settlementTerms !== 0) {
      writer.uint32(168).int32(message.settlementTerms);
    }
    if (message.crossType !== 0) {
      writer.uint32(176).int32(message.crossType);
    }
    if (message.byPass === true) {
      writer.uint32(184).bool(message.byPass);
    }
    if (!message.lastPrice.isZero()) {
      writer.uint32(192).sint64(message.lastPrice);
    }
    if (message.saleCondition.length !== 0) {
      writer.uint32(202).bytes(message.saleCondition);
    }
    if (message.currency !== "") {
      writer.uint32(210).string(message.currency);
    }
    if (message.doesNotUpdateLast === true) {
      writer.uint32(216).bool(message.doesNotUpdateLast);
    }
    if (message.doesNotUpdateVolume === true) {
      writer.uint32(224).bool(message.doesNotUpdateVolume);
    }
    if (message.session !== "") {
      writer.uint32(242).string(message.session);
    }
    if (message.blockTrade === true) {
      writer.uint32(248).bool(message.blockTrade);
    }
    if (!message.distributionTime.isZero()) {
      writer.uint32(256).sint64(message.distributionTime);
    }
    if (!message.transactionTime2.isZero()) {
      writer.uint32(264).sint64(message.transactionTime2);
    }
    if (message.consolidatedPriceIndicator !== "") {
      writer.uint32(274).string(message.consolidatedPriceIndicator);
    }
    if (message.transient === true) {
      writer.uint32(280).bool(message.transient);
    }
    if (message.indexShortName !== "") {
      writer.uint32(290).string(message.indexShortName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Trade {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrade();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 8:
          message.originatorId = reader.bytes();
          break;
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.price = reader.sint64() as Long;
          break;
        case 11:
          message.quantity = reader.sint64() as Long;
          break;
        case 12:
          message.tradeId = reader.bytes();
          break;
        case 13:
          message.side = reader.int32() as any;
          break;
        case 14:
          message.tradeDate = reader.sint32();
          break;
        case 15:
          message.buyerId = reader.bytes();
          break;
        case 16:
          message.sellerId = reader.bytes();
          break;
        case 17:
          message.openingTrade = reader.bool();
          break;
        case 18:
          message.systemPriced = reader.bool();
          break;
        case 19:
          message.marketOnClose = reader.bool();
          break;
        case 20:
          message.oddLot = reader.bool();
          break;
        case 21:
          message.settlementTerms = reader.int32() as any;
          break;
        case 22:
          message.crossType = reader.int32() as any;
          break;
        case 23:
          message.byPass = reader.bool();
          break;
        case 24:
          message.lastPrice = reader.sint64() as Long;
          break;
        case 25:
          message.saleCondition = reader.bytes();
          break;
        case 26:
          message.currency = reader.string();
          break;
        case 27:
          message.doesNotUpdateLast = reader.bool();
          break;
        case 28:
          message.doesNotUpdateVolume = reader.bool();
          break;
        case 30:
          message.session = reader.string();
          break;
        case 31:
          message.blockTrade = reader.bool();
          break;
        case 32:
          message.distributionTime = reader.sint64() as Long;
          break;
        case 33:
          message.transactionTime2 = reader.sint64() as Long;
          break;
        case 34:
          message.consolidatedPriceIndicator = reader.string();
          break;
        case 35:
          message.transient = reader.bool();
          break;
        case 36:
          message.indexShortName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Trade {
    return {
      originatorId: isSet(object.originatorId) ? bytesFromBase64(object.originatorId) : new Uint8Array(),
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      price: isSet(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      quantity: isSet(object.quantity) ? Long.fromValue(object.quantity) : Long.ZERO,
      tradeId: isSet(object.tradeId) ? bytesFromBase64(object.tradeId) : new Uint8Array(),
      side: isSet(object.side) ? bookSideFromJSON(object.side) : 0,
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      buyerId: isSet(object.buyerId) ? bytesFromBase64(object.buyerId) : new Uint8Array(),
      sellerId: isSet(object.sellerId) ? bytesFromBase64(object.sellerId) : new Uint8Array(),
      openingTrade: isSet(object.openingTrade) ? Boolean(object.openingTrade) : false,
      systemPriced: isSet(object.systemPriced) ? Boolean(object.systemPriced) : false,
      marketOnClose: isSet(object.marketOnClose) ? Boolean(object.marketOnClose) : false,
      oddLot: isSet(object.oddLot) ? Boolean(object.oddLot) : false,
      settlementTerms: isSet(object.settlementTerms) ? settlementTermsFromJSON(object.settlementTerms) : 0,
      crossType: isSet(object.crossType) ? crossTypeFromJSON(object.crossType) : 0,
      byPass: isSet(object.byPass) ? Boolean(object.byPass) : false,
      lastPrice: isSet(object.lastPrice) ? Long.fromValue(object.lastPrice) : Long.ZERO,
      saleCondition: isSet(object.saleCondition) ? bytesFromBase64(object.saleCondition) : new Uint8Array(),
      currency: isSet(object.currency) ? String(object.currency) : "",
      doesNotUpdateLast: isSet(object.doesNotUpdateLast) ? Boolean(object.doesNotUpdateLast) : false,
      doesNotUpdateVolume: isSet(object.doesNotUpdateVolume) ? Boolean(object.doesNotUpdateVolume) : false,
      session: isSet(object.session) ? String(object.session) : "",
      blockTrade: isSet(object.blockTrade) ? Boolean(object.blockTrade) : false,
      distributionTime: isSet(object.distributionTime) ? Long.fromValue(object.distributionTime) : Long.ZERO,
      transactionTime2: isSet(object.transactionTime2) ? Long.fromValue(object.transactionTime2) : Long.ZERO,
      consolidatedPriceIndicator: isSet(object.consolidatedPriceIndicator)
        ? String(object.consolidatedPriceIndicator)
        : "",
      transient: isSet(object.transient) ? Boolean(object.transient) : false,
      indexShortName: isSet(object.indexShortName) ? String(object.indexShortName) : "",
    };
  },

  toJSON(message: Trade): unknown {
    const obj: any = {};
    message.originatorId !== undefined &&
      (obj.originatorId = base64FromBytes(
        message.originatorId !== undefined ? message.originatorId : new Uint8Array(),
      ));
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.price !== undefined && (obj.price = (message.price || Long.ZERO).toString());
    message.quantity !== undefined && (obj.quantity = (message.quantity || Long.ZERO).toString());
    message.tradeId !== undefined &&
      (obj.tradeId = base64FromBytes(message.tradeId !== undefined ? message.tradeId : new Uint8Array()));
    message.side !== undefined && (obj.side = bookSideToJSON(message.side));
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    message.buyerId !== undefined &&
      (obj.buyerId = base64FromBytes(message.buyerId !== undefined ? message.buyerId : new Uint8Array()));
    message.sellerId !== undefined &&
      (obj.sellerId = base64FromBytes(message.sellerId !== undefined ? message.sellerId : new Uint8Array()));
    message.openingTrade !== undefined && (obj.openingTrade = message.openingTrade);
    message.systemPriced !== undefined && (obj.systemPriced = message.systemPriced);
    message.marketOnClose !== undefined && (obj.marketOnClose = message.marketOnClose);
    message.oddLot !== undefined && (obj.oddLot = message.oddLot);
    message.settlementTerms !== undefined && (obj.settlementTerms = settlementTermsToJSON(message.settlementTerms));
    message.crossType !== undefined && (obj.crossType = crossTypeToJSON(message.crossType));
    message.byPass !== undefined && (obj.byPass = message.byPass);
    message.lastPrice !== undefined && (obj.lastPrice = (message.lastPrice || Long.ZERO).toString());
    message.saleCondition !== undefined &&
      (obj.saleCondition = base64FromBytes(
        message.saleCondition !== undefined ? message.saleCondition : new Uint8Array(),
      ));
    message.currency !== undefined && (obj.currency = message.currency);
    message.doesNotUpdateLast !== undefined && (obj.doesNotUpdateLast = message.doesNotUpdateLast);
    message.doesNotUpdateVolume !== undefined && (obj.doesNotUpdateVolume = message.doesNotUpdateVolume);
    message.session !== undefined && (obj.session = message.session);
    message.blockTrade !== undefined && (obj.blockTrade = message.blockTrade);
    message.distributionTime !== undefined &&
      (obj.distributionTime = (message.distributionTime || Long.ZERO).toString());
    message.transactionTime2 !== undefined &&
      (obj.transactionTime2 = (message.transactionTime2 || Long.ZERO).toString());
    message.consolidatedPriceIndicator !== undefined &&
      (obj.consolidatedPriceIndicator = message.consolidatedPriceIndicator);
    message.transient !== undefined && (obj.transient = message.transient);
    message.indexShortName !== undefined && (obj.indexShortName = message.indexShortName);
    return obj;
  },

  fromPartial(object: DeepPartial<Trade>): Trade {
    const message = createBaseTrade();
    message.originatorId = object.originatorId ?? new Uint8Array();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.price = (object.price !== undefined && object.price !== null) ? Long.fromValue(object.price) : Long.ZERO;
    message.quantity = (object.quantity !== undefined && object.quantity !== null)
      ? Long.fromValue(object.quantity)
      : Long.ZERO;
    message.tradeId = object.tradeId ?? new Uint8Array();
    message.side = object.side ?? 0;
    message.tradeDate = object.tradeDate ?? 0;
    message.buyerId = object.buyerId ?? new Uint8Array();
    message.sellerId = object.sellerId ?? new Uint8Array();
    message.openingTrade = object.openingTrade ?? false;
    message.systemPriced = object.systemPriced ?? false;
    message.marketOnClose = object.marketOnClose ?? false;
    message.oddLot = object.oddLot ?? false;
    message.settlementTerms = object.settlementTerms ?? 0;
    message.crossType = object.crossType ?? 0;
    message.byPass = object.byPass ?? false;
    message.lastPrice = (object.lastPrice !== undefined && object.lastPrice !== null)
      ? Long.fromValue(object.lastPrice)
      : Long.ZERO;
    message.saleCondition = object.saleCondition ?? new Uint8Array();
    message.currency = object.currency ?? "";
    message.doesNotUpdateLast = object.doesNotUpdateLast ?? false;
    message.doesNotUpdateVolume = object.doesNotUpdateVolume ?? false;
    message.session = object.session ?? "";
    message.blockTrade = object.blockTrade ?? false;
    message.distributionTime = (object.distributionTime !== undefined && object.distributionTime !== null)
      ? Long.fromValue(object.distributionTime)
      : Long.ZERO;
    message.transactionTime2 = (object.transactionTime2 !== undefined && object.transactionTime2 !== null)
      ? Long.fromValue(object.transactionTime2)
      : Long.ZERO;
    message.consolidatedPriceIndicator = object.consolidatedPriceIndicator ?? "";
    message.transient = object.transient ?? false;
    message.indexShortName = object.indexShortName ?? "";
    return message;
  },
};

function createBaseTradeCorrection(): TradeCorrection {
  return {
    originatorId: new Uint8Array(),
    transactionTime: Long.ZERO,
    price: Long.ZERO,
    quantity: Long.ZERO,
    tradeId: new Uint8Array(),
    side: 0,
    tradeDate: 0,
    buyerId: new Uint8Array(),
    sellerId: new Uint8Array(),
    openingTrade: false,
    systemPriced: false,
    marketOnClose: false,
    oddLot: false,
    settlementTerms: 0,
    crossType: 0,
    byPass: false,
    originalTradeId: new Uint8Array(),
    saleCondition: new Uint8Array(),
    currency: "",
    distributionTime: Long.ZERO,
    transactionTime2: Long.ZERO,
    originalTradePrice: Long.ZERO,
    originalTradeQuantity: Long.ZERO,
  };
}

export const TradeCorrection = {
  encode(message: TradeCorrection, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.originatorId.length !== 0) {
      writer.uint32(66).bytes(message.originatorId);
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (!message.price.isZero()) {
      writer.uint32(80).sint64(message.price);
    }
    if (!message.quantity.isZero()) {
      writer.uint32(88).sint64(message.quantity);
    }
    if (message.tradeId.length !== 0) {
      writer.uint32(98).bytes(message.tradeId);
    }
    if (message.side !== 0) {
      writer.uint32(104).int32(message.side);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(112).sint32(message.tradeDate);
    }
    if (message.buyerId.length !== 0) {
      writer.uint32(122).bytes(message.buyerId);
    }
    if (message.sellerId.length !== 0) {
      writer.uint32(130).bytes(message.sellerId);
    }
    if (message.openingTrade === true) {
      writer.uint32(136).bool(message.openingTrade);
    }
    if (message.systemPriced === true) {
      writer.uint32(144).bool(message.systemPriced);
    }
    if (message.marketOnClose === true) {
      writer.uint32(152).bool(message.marketOnClose);
    }
    if (message.oddLot === true) {
      writer.uint32(160).bool(message.oddLot);
    }
    if (message.settlementTerms !== 0) {
      writer.uint32(168).int32(message.settlementTerms);
    }
    if (message.crossType !== 0) {
      writer.uint32(176).int32(message.crossType);
    }
    if (message.byPass === true) {
      writer.uint32(184).bool(message.byPass);
    }
    if (message.originalTradeId.length !== 0) {
      writer.uint32(194).bytes(message.originalTradeId);
    }
    if (message.saleCondition.length !== 0) {
      writer.uint32(202).bytes(message.saleCondition);
    }
    if (message.currency !== "") {
      writer.uint32(210).string(message.currency);
    }
    if (!message.distributionTime.isZero()) {
      writer.uint32(216).sint64(message.distributionTime);
    }
    if (!message.transactionTime2.isZero()) {
      writer.uint32(224).sint64(message.transactionTime2);
    }
    if (!message.originalTradePrice.isZero()) {
      writer.uint32(232).sint64(message.originalTradePrice);
    }
    if (!message.originalTradeQuantity.isZero()) {
      writer.uint32(240).sint64(message.originalTradeQuantity);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TradeCorrection {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTradeCorrection();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 8:
          message.originatorId = reader.bytes();
          break;
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.price = reader.sint64() as Long;
          break;
        case 11:
          message.quantity = reader.sint64() as Long;
          break;
        case 12:
          message.tradeId = reader.bytes();
          break;
        case 13:
          message.side = reader.int32() as any;
          break;
        case 14:
          message.tradeDate = reader.sint32();
          break;
        case 15:
          message.buyerId = reader.bytes();
          break;
        case 16:
          message.sellerId = reader.bytes();
          break;
        case 17:
          message.openingTrade = reader.bool();
          break;
        case 18:
          message.systemPriced = reader.bool();
          break;
        case 19:
          message.marketOnClose = reader.bool();
          break;
        case 20:
          message.oddLot = reader.bool();
          break;
        case 21:
          message.settlementTerms = reader.int32() as any;
          break;
        case 22:
          message.crossType = reader.int32() as any;
          break;
        case 23:
          message.byPass = reader.bool();
          break;
        case 24:
          message.originalTradeId = reader.bytes();
          break;
        case 25:
          message.saleCondition = reader.bytes();
          break;
        case 26:
          message.currency = reader.string();
          break;
        case 27:
          message.distributionTime = reader.sint64() as Long;
          break;
        case 28:
          message.transactionTime2 = reader.sint64() as Long;
          break;
        case 29:
          message.originalTradePrice = reader.sint64() as Long;
          break;
        case 30:
          message.originalTradeQuantity = reader.sint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TradeCorrection {
    return {
      originatorId: isSet(object.originatorId) ? bytesFromBase64(object.originatorId) : new Uint8Array(),
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      price: isSet(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      quantity: isSet(object.quantity) ? Long.fromValue(object.quantity) : Long.ZERO,
      tradeId: isSet(object.tradeId) ? bytesFromBase64(object.tradeId) : new Uint8Array(),
      side: isSet(object.side) ? bookSideFromJSON(object.side) : 0,
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      buyerId: isSet(object.buyerId) ? bytesFromBase64(object.buyerId) : new Uint8Array(),
      sellerId: isSet(object.sellerId) ? bytesFromBase64(object.sellerId) : new Uint8Array(),
      openingTrade: isSet(object.openingTrade) ? Boolean(object.openingTrade) : false,
      systemPriced: isSet(object.systemPriced) ? Boolean(object.systemPriced) : false,
      marketOnClose: isSet(object.marketOnClose) ? Boolean(object.marketOnClose) : false,
      oddLot: isSet(object.oddLot) ? Boolean(object.oddLot) : false,
      settlementTerms: isSet(object.settlementTerms) ? settlementTermsFromJSON(object.settlementTerms) : 0,
      crossType: isSet(object.crossType) ? crossTypeFromJSON(object.crossType) : 0,
      byPass: isSet(object.byPass) ? Boolean(object.byPass) : false,
      originalTradeId: isSet(object.originalTradeId) ? bytesFromBase64(object.originalTradeId) : new Uint8Array(),
      saleCondition: isSet(object.saleCondition) ? bytesFromBase64(object.saleCondition) : new Uint8Array(),
      currency: isSet(object.currency) ? String(object.currency) : "",
      distributionTime: isSet(object.distributionTime) ? Long.fromValue(object.distributionTime) : Long.ZERO,
      transactionTime2: isSet(object.transactionTime2) ? Long.fromValue(object.transactionTime2) : Long.ZERO,
      originalTradePrice: isSet(object.originalTradePrice) ? Long.fromValue(object.originalTradePrice) : Long.ZERO,
      originalTradeQuantity: isSet(object.originalTradeQuantity)
        ? Long.fromValue(object.originalTradeQuantity)
        : Long.ZERO,
    };
  },

  toJSON(message: TradeCorrection): unknown {
    const obj: any = {};
    message.originatorId !== undefined &&
      (obj.originatorId = base64FromBytes(
        message.originatorId !== undefined ? message.originatorId : new Uint8Array(),
      ));
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.price !== undefined && (obj.price = (message.price || Long.ZERO).toString());
    message.quantity !== undefined && (obj.quantity = (message.quantity || Long.ZERO).toString());
    message.tradeId !== undefined &&
      (obj.tradeId = base64FromBytes(message.tradeId !== undefined ? message.tradeId : new Uint8Array()));
    message.side !== undefined && (obj.side = bookSideToJSON(message.side));
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    message.buyerId !== undefined &&
      (obj.buyerId = base64FromBytes(message.buyerId !== undefined ? message.buyerId : new Uint8Array()));
    message.sellerId !== undefined &&
      (obj.sellerId = base64FromBytes(message.sellerId !== undefined ? message.sellerId : new Uint8Array()));
    message.openingTrade !== undefined && (obj.openingTrade = message.openingTrade);
    message.systemPriced !== undefined && (obj.systemPriced = message.systemPriced);
    message.marketOnClose !== undefined && (obj.marketOnClose = message.marketOnClose);
    message.oddLot !== undefined && (obj.oddLot = message.oddLot);
    message.settlementTerms !== undefined && (obj.settlementTerms = settlementTermsToJSON(message.settlementTerms));
    message.crossType !== undefined && (obj.crossType = crossTypeToJSON(message.crossType));
    message.byPass !== undefined && (obj.byPass = message.byPass);
    message.originalTradeId !== undefined &&
      (obj.originalTradeId = base64FromBytes(
        message.originalTradeId !== undefined ? message.originalTradeId : new Uint8Array(),
      ));
    message.saleCondition !== undefined &&
      (obj.saleCondition = base64FromBytes(
        message.saleCondition !== undefined ? message.saleCondition : new Uint8Array(),
      ));
    message.currency !== undefined && (obj.currency = message.currency);
    message.distributionTime !== undefined &&
      (obj.distributionTime = (message.distributionTime || Long.ZERO).toString());
    message.transactionTime2 !== undefined &&
      (obj.transactionTime2 = (message.transactionTime2 || Long.ZERO).toString());
    message.originalTradePrice !== undefined &&
      (obj.originalTradePrice = (message.originalTradePrice || Long.ZERO).toString());
    message.originalTradeQuantity !== undefined &&
      (obj.originalTradeQuantity = (message.originalTradeQuantity || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<TradeCorrection>): TradeCorrection {
    const message = createBaseTradeCorrection();
    message.originatorId = object.originatorId ?? new Uint8Array();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.price = (object.price !== undefined && object.price !== null) ? Long.fromValue(object.price) : Long.ZERO;
    message.quantity = (object.quantity !== undefined && object.quantity !== null)
      ? Long.fromValue(object.quantity)
      : Long.ZERO;
    message.tradeId = object.tradeId ?? new Uint8Array();
    message.side = object.side ?? 0;
    message.tradeDate = object.tradeDate ?? 0;
    message.buyerId = object.buyerId ?? new Uint8Array();
    message.sellerId = object.sellerId ?? new Uint8Array();
    message.openingTrade = object.openingTrade ?? false;
    message.systemPriced = object.systemPriced ?? false;
    message.marketOnClose = object.marketOnClose ?? false;
    message.oddLot = object.oddLot ?? false;
    message.settlementTerms = object.settlementTerms ?? 0;
    message.crossType = object.crossType ?? 0;
    message.byPass = object.byPass ?? false;
    message.originalTradeId = object.originalTradeId ?? new Uint8Array();
    message.saleCondition = object.saleCondition ?? new Uint8Array();
    message.currency = object.currency ?? "";
    message.distributionTime = (object.distributionTime !== undefined && object.distributionTime !== null)
      ? Long.fromValue(object.distributionTime)
      : Long.ZERO;
    message.transactionTime2 = (object.transactionTime2 !== undefined && object.transactionTime2 !== null)
      ? Long.fromValue(object.transactionTime2)
      : Long.ZERO;
    message.originalTradePrice = (object.originalTradePrice !== undefined && object.originalTradePrice !== null)
      ? Long.fromValue(object.originalTradePrice)
      : Long.ZERO;
    message.originalTradeQuantity =
      (object.originalTradeQuantity !== undefined && object.originalTradeQuantity !== null)
        ? Long.fromValue(object.originalTradeQuantity)
        : Long.ZERO;
    return message;
  },
};

function createBaseTradeCancel(): TradeCancel {
  return {
    originatorId: new Uint8Array(),
    transactionTime: Long.ZERO,
    correctedTradePrice: Long.ZERO,
    correctedTradeQuantity: Long.ZERO,
    tradeId: new Uint8Array(),
    saleCondition: new Uint8Array(),
    currency: "",
    distributionTime: Long.ZERO,
    transactionTime2: Long.ZERO,
  };
}

export const TradeCancel = {
  encode(message: TradeCancel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.originatorId.length !== 0) {
      writer.uint32(66).bytes(message.originatorId);
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (!message.correctedTradePrice.isZero()) {
      writer.uint32(80).sint64(message.correctedTradePrice);
    }
    if (!message.correctedTradeQuantity.isZero()) {
      writer.uint32(88).sint64(message.correctedTradeQuantity);
    }
    if (message.tradeId.length !== 0) {
      writer.uint32(98).bytes(message.tradeId);
    }
    if (message.saleCondition.length !== 0) {
      writer.uint32(106).bytes(message.saleCondition);
    }
    if (message.currency !== "") {
      writer.uint32(114).string(message.currency);
    }
    if (!message.distributionTime.isZero()) {
      writer.uint32(120).sint64(message.distributionTime);
    }
    if (!message.transactionTime2.isZero()) {
      writer.uint32(128).sint64(message.transactionTime2);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TradeCancel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTradeCancel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 8:
          message.originatorId = reader.bytes();
          break;
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.correctedTradePrice = reader.sint64() as Long;
          break;
        case 11:
          message.correctedTradeQuantity = reader.sint64() as Long;
          break;
        case 12:
          message.tradeId = reader.bytes();
          break;
        case 13:
          message.saleCondition = reader.bytes();
          break;
        case 14:
          message.currency = reader.string();
          break;
        case 15:
          message.distributionTime = reader.sint64() as Long;
          break;
        case 16:
          message.transactionTime2 = reader.sint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TradeCancel {
    return {
      originatorId: isSet(object.originatorId) ? bytesFromBase64(object.originatorId) : new Uint8Array(),
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      correctedTradePrice: isSet(object.correctedTradePrice) ? Long.fromValue(object.correctedTradePrice) : Long.ZERO,
      correctedTradeQuantity: isSet(object.correctedTradeQuantity)
        ? Long.fromValue(object.correctedTradeQuantity)
        : Long.ZERO,
      tradeId: isSet(object.tradeId) ? bytesFromBase64(object.tradeId) : new Uint8Array(),
      saleCondition: isSet(object.saleCondition) ? bytesFromBase64(object.saleCondition) : new Uint8Array(),
      currency: isSet(object.currency) ? String(object.currency) : "",
      distributionTime: isSet(object.distributionTime) ? Long.fromValue(object.distributionTime) : Long.ZERO,
      transactionTime2: isSet(object.transactionTime2) ? Long.fromValue(object.transactionTime2) : Long.ZERO,
    };
  },

  toJSON(message: TradeCancel): unknown {
    const obj: any = {};
    message.originatorId !== undefined &&
      (obj.originatorId = base64FromBytes(
        message.originatorId !== undefined ? message.originatorId : new Uint8Array(),
      ));
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.correctedTradePrice !== undefined &&
      (obj.correctedTradePrice = (message.correctedTradePrice || Long.ZERO).toString());
    message.correctedTradeQuantity !== undefined &&
      (obj.correctedTradeQuantity = (message.correctedTradeQuantity || Long.ZERO).toString());
    message.tradeId !== undefined &&
      (obj.tradeId = base64FromBytes(message.tradeId !== undefined ? message.tradeId : new Uint8Array()));
    message.saleCondition !== undefined &&
      (obj.saleCondition = base64FromBytes(
        message.saleCondition !== undefined ? message.saleCondition : new Uint8Array(),
      ));
    message.currency !== undefined && (obj.currency = message.currency);
    message.distributionTime !== undefined &&
      (obj.distributionTime = (message.distributionTime || Long.ZERO).toString());
    message.transactionTime2 !== undefined &&
      (obj.transactionTime2 = (message.transactionTime2 || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<TradeCancel>): TradeCancel {
    const message = createBaseTradeCancel();
    message.originatorId = object.originatorId ?? new Uint8Array();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.correctedTradePrice = (object.correctedTradePrice !== undefined && object.correctedTradePrice !== null)
      ? Long.fromValue(object.correctedTradePrice)
      : Long.ZERO;
    message.correctedTradeQuantity =
      (object.correctedTradeQuantity !== undefined && object.correctedTradeQuantity !== null)
        ? Long.fromValue(object.correctedTradeQuantity)
        : Long.ZERO;
    message.tradeId = object.tradeId ?? new Uint8Array();
    message.saleCondition = object.saleCondition ?? new Uint8Array();
    message.currency = object.currency ?? "";
    message.distributionTime = (object.distributionTime !== undefined && object.distributionTime !== null)
      ? Long.fromValue(object.distributionTime)
      : Long.ZERO;
    message.transactionTime2 = (object.transactionTime2 !== undefined && object.transactionTime2 !== null)
      ? Long.fromValue(object.transactionTime2)
      : Long.ZERO;
    return message;
  },
};

function createBaseOpen(): Open {
  return { transactionTime: Long.ZERO, tradeDate: 0, price: Long.ZERO, OpenCloseSettlementFlag: 0, currency: "" };
}

export const Open = {
  encode(message: Open, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer.uint32(88).sint64(message.price);
    }
    if (message.OpenCloseSettlementFlag !== 0) {
      writer.uint32(96).int32(message.OpenCloseSettlementFlag);
    }
    if (message.currency !== "") {
      writer.uint32(106).string(message.currency);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Open {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpen();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.price = reader.sint64() as Long;
          break;
        case 12:
          message.OpenCloseSettlementFlag = reader.int32() as any;
          break;
        case 13:
          message.currency = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Open {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      OpenCloseSettlementFlag: isSet(object.OpenCloseSettlementFlag)
        ? openCloseSettlementFlagFromJSON(object.OpenCloseSettlementFlag)
        : 0,
      currency: isSet(object.currency) ? String(object.currency) : "",
    };
  },

  toJSON(message: Open): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== undefined && (obj.price = (message.price || Long.ZERO).toString());
    message.OpenCloseSettlementFlag !== undefined &&
      (obj.OpenCloseSettlementFlag = openCloseSettlementFlagToJSON(message.OpenCloseSettlementFlag));
    message.currency !== undefined && (obj.currency = message.currency);
    return obj;
  },

  fromPartial(object: DeepPartial<Open>): Open {
    const message = createBaseOpen();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.price = (object.price !== undefined && object.price !== null) ? Long.fromValue(object.price) : Long.ZERO;
    message.OpenCloseSettlementFlag = object.OpenCloseSettlementFlag ?? 0;
    message.currency = object.currency ?? "";
    return message;
  },
};

function createBaseHigh(): High {
  return { transactionTime: Long.ZERO, tradeDate: 0, price: Long.ZERO, currency: "" };
}

export const High = {
  encode(message: High, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer.uint32(88).sint64(message.price);
    }
    if (message.currency !== "") {
      writer.uint32(98).string(message.currency);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): High {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHigh();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.price = reader.sint64() as Long;
          break;
        case 12:
          message.currency = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): High {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      currency: isSet(object.currency) ? String(object.currency) : "",
    };
  },

  toJSON(message: High): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== undefined && (obj.price = (message.price || Long.ZERO).toString());
    message.currency !== undefined && (obj.currency = message.currency);
    return obj;
  },

  fromPartial(object: DeepPartial<High>): High {
    const message = createBaseHigh();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.price = (object.price !== undefined && object.price !== null) ? Long.fromValue(object.price) : Long.ZERO;
    message.currency = object.currency ?? "";
    return message;
  },
};

function createBaseHighRolling(): HighRolling {
  return { transactionTime: Long.ZERO, tradeDate: 0, price: Long.ZERO, currency: "" };
}

export const HighRolling = {
  encode(message: HighRolling, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer.uint32(88).sint64(message.price);
    }
    if (message.currency !== "") {
      writer.uint32(98).string(message.currency);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HighRolling {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHighRolling();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.price = reader.sint64() as Long;
          break;
        case 12:
          message.currency = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HighRolling {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      currency: isSet(object.currency) ? String(object.currency) : "",
    };
  },

  toJSON(message: HighRolling): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== undefined && (obj.price = (message.price || Long.ZERO).toString());
    message.currency !== undefined && (obj.currency = message.currency);
    return obj;
  },

  fromPartial(object: DeepPartial<HighRolling>): HighRolling {
    const message = createBaseHighRolling();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.price = (object.price !== undefined && object.price !== null) ? Long.fromValue(object.price) : Long.ZERO;
    message.currency = object.currency ?? "";
    return message;
  },
};

function createBaseLow(): Low {
  return { transactionTime: Long.ZERO, tradeDate: 0, price: Long.ZERO, currency: "" };
}

export const Low = {
  encode(message: Low, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer.uint32(88).sint64(message.price);
    }
    if (message.currency !== "") {
      writer.uint32(98).string(message.currency);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Low {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.price = reader.sint64() as Long;
          break;
        case 12:
          message.currency = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Low {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      currency: isSet(object.currency) ? String(object.currency) : "",
    };
  },

  toJSON(message: Low): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== undefined && (obj.price = (message.price || Long.ZERO).toString());
    message.currency !== undefined && (obj.currency = message.currency);
    return obj;
  },

  fromPartial(object: DeepPartial<Low>): Low {
    const message = createBaseLow();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.price = (object.price !== undefined && object.price !== null) ? Long.fromValue(object.price) : Long.ZERO;
    message.currency = object.currency ?? "";
    return message;
  },
};

function createBaseLowRolling(): LowRolling {
  return { transactionTime: Long.ZERO, tradeDate: 0, price: Long.ZERO, currency: "" };
}

export const LowRolling = {
  encode(message: LowRolling, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer.uint32(88).sint64(message.price);
    }
    if (message.currency !== "") {
      writer.uint32(98).string(message.currency);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LowRolling {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLowRolling();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.price = reader.sint64() as Long;
          break;
        case 12:
          message.currency = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LowRolling {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      currency: isSet(object.currency) ? String(object.currency) : "",
    };
  },

  toJSON(message: LowRolling): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== undefined && (obj.price = (message.price || Long.ZERO).toString());
    message.currency !== undefined && (obj.currency = message.currency);
    return obj;
  },

  fromPartial(object: DeepPartial<LowRolling>): LowRolling {
    const message = createBaseLowRolling();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.price = (object.price !== undefined && object.price !== null) ? Long.fromValue(object.price) : Long.ZERO;
    message.currency = object.currency ?? "";
    return message;
  },
};

function createBaseClose(): Close {
  return { transactionTime: Long.ZERO, tradeDate: 0, price: Long.ZERO, currency: "" };
}

export const Close = {
  encode(message: Close, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer.uint32(88).sint64(message.price);
    }
    if (message.currency !== "") {
      writer.uint32(98).string(message.currency);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Close {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClose();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.price = reader.sint64() as Long;
          break;
        case 12:
          message.currency = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Close {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      currency: isSet(object.currency) ? String(object.currency) : "",
    };
  },

  toJSON(message: Close): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== undefined && (obj.price = (message.price || Long.ZERO).toString());
    message.currency !== undefined && (obj.currency = message.currency);
    return obj;
  },

  fromPartial(object: DeepPartial<Close>): Close {
    const message = createBaseClose();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.price = (object.price !== undefined && object.price !== null) ? Long.fromValue(object.price) : Long.ZERO;
    message.currency = object.currency ?? "";
    return message;
  },
};

function createBasePrevClose(): PrevClose {
  return { transactionTime: Long.ZERO, tradeDate: 0, price: Long.ZERO, currency: "" };
}

export const PrevClose = {
  encode(message: PrevClose, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer.uint32(88).sint64(message.price);
    }
    if (message.currency !== "") {
      writer.uint32(98).string(message.currency);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PrevClose {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePrevClose();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.price = reader.sint64() as Long;
          break;
        case 12:
          message.currency = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PrevClose {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      currency: isSet(object.currency) ? String(object.currency) : "",
    };
  },

  toJSON(message: PrevClose): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== undefined && (obj.price = (message.price || Long.ZERO).toString());
    message.currency !== undefined && (obj.currency = message.currency);
    return obj;
  },

  fromPartial(object: DeepPartial<PrevClose>): PrevClose {
    const message = createBasePrevClose();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.price = (object.price !== undefined && object.price !== null) ? Long.fromValue(object.price) : Long.ZERO;
    message.currency = object.currency ?? "";
    return message;
  },
};

function createBaseLast(): Last {
  return { transactionTime: Long.ZERO, tradeDate: 0, price: Long.ZERO, quantity: Long.ZERO, currency: "", session: "" };
}

export const Last = {
  encode(message: Last, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer.uint32(88).sint64(message.price);
    }
    if (!message.quantity.isZero()) {
      writer.uint32(96).sint64(message.quantity);
    }
    if (message.currency !== "") {
      writer.uint32(106).string(message.currency);
    }
    if (message.session !== "") {
      writer.uint32(242).string(message.session);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Last {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLast();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.price = reader.sint64() as Long;
          break;
        case 12:
          message.quantity = reader.sint64() as Long;
          break;
        case 13:
          message.currency = reader.string();
          break;
        case 30:
          message.session = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Last {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      quantity: isSet(object.quantity) ? Long.fromValue(object.quantity) : Long.ZERO,
      currency: isSet(object.currency) ? String(object.currency) : "",
      session: isSet(object.session) ? String(object.session) : "",
    };
  },

  toJSON(message: Last): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== undefined && (obj.price = (message.price || Long.ZERO).toString());
    message.quantity !== undefined && (obj.quantity = (message.quantity || Long.ZERO).toString());
    message.currency !== undefined && (obj.currency = message.currency);
    message.session !== undefined && (obj.session = message.session);
    return obj;
  },

  fromPartial(object: DeepPartial<Last>): Last {
    const message = createBaseLast();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.price = (object.price !== undefined && object.price !== null) ? Long.fromValue(object.price) : Long.ZERO;
    message.quantity = (object.quantity !== undefined && object.quantity !== null)
      ? Long.fromValue(object.quantity)
      : Long.ZERO;
    message.currency = object.currency ?? "";
    message.session = object.session ?? "";
    return message;
  },
};

function createBaseYearHigh(): YearHigh {
  return { transactionTime: Long.ZERO, price: Long.ZERO, currency: "" };
}

export const YearHigh = {
  encode(message: YearHigh, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (!message.price.isZero()) {
      writer.uint32(80).sint64(message.price);
    }
    if (message.currency !== "") {
      writer.uint32(90).string(message.currency);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): YearHigh {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseYearHigh();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.price = reader.sint64() as Long;
          break;
        case 11:
          message.currency = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): YearHigh {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      price: isSet(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      currency: isSet(object.currency) ? String(object.currency) : "",
    };
  },

  toJSON(message: YearHigh): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.price !== undefined && (obj.price = (message.price || Long.ZERO).toString());
    message.currency !== undefined && (obj.currency = message.currency);
    return obj;
  },

  fromPartial(object: DeepPartial<YearHigh>): YearHigh {
    const message = createBaseYearHigh();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.price = (object.price !== undefined && object.price !== null) ? Long.fromValue(object.price) : Long.ZERO;
    message.currency = object.currency ?? "";
    return message;
  },
};

function createBaseYearLow(): YearLow {
  return { transactionTime: Long.ZERO, price: Long.ZERO, currency: "" };
}

export const YearLow = {
  encode(message: YearLow, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (!message.price.isZero()) {
      writer.uint32(80).sint64(message.price);
    }
    if (message.currency !== "") {
      writer.uint32(90).string(message.currency);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): YearLow {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseYearLow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.price = reader.sint64() as Long;
          break;
        case 11:
          message.currency = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): YearLow {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      price: isSet(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      currency: isSet(object.currency) ? String(object.currency) : "",
    };
  },

  toJSON(message: YearLow): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.price !== undefined && (obj.price = (message.price || Long.ZERO).toString());
    message.currency !== undefined && (obj.currency = message.currency);
    return obj;
  },

  fromPartial(object: DeepPartial<YearLow>): YearLow {
    const message = createBaseYearLow();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.price = (object.price !== undefined && object.price !== null) ? Long.fromValue(object.price) : Long.ZERO;
    message.currency = object.currency ?? "";
    return message;
  },
};

function createBaseVolume(): Volume {
  return { transactionTime: Long.ZERO, tradeDate: 0, volume: Long.ZERO };
}

export const Volume = {
  encode(message: Volume, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.volume.isZero()) {
      writer.uint32(88).sint64(message.volume);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Volume {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVolume();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.volume = reader.sint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Volume {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      volume: isSet(object.volume) ? Long.fromValue(object.volume) : Long.ZERO,
    };
  },

  toJSON(message: Volume): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    message.volume !== undefined && (obj.volume = (message.volume || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<Volume>): Volume {
    const message = createBaseVolume();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.volume = (object.volume !== undefined && object.volume !== null)
      ? Long.fromValue(object.volume)
      : Long.ZERO;
    return message;
  },
};

function createBaseNumberOfTrades(): NumberOfTrades {
  return { transactionTime: Long.ZERO, tradeDate: 0, numberTrades: Long.ZERO };
}

export const NumberOfTrades = {
  encode(message: NumberOfTrades, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.numberTrades.isZero()) {
      writer.uint32(88).sint64(message.numberTrades);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NumberOfTrades {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNumberOfTrades();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.numberTrades = reader.sint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NumberOfTrades {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      numberTrades: isSet(object.numberTrades) ? Long.fromValue(object.numberTrades) : Long.ZERO,
    };
  },

  toJSON(message: NumberOfTrades): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    message.numberTrades !== undefined && (obj.numberTrades = (message.numberTrades || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<NumberOfTrades>): NumberOfTrades {
    const message = createBaseNumberOfTrades();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.numberTrades = (object.numberTrades !== undefined && object.numberTrades !== null)
      ? Long.fromValue(object.numberTrades)
      : Long.ZERO;
    return message;
  },
};

function createBaseMonetaryValue(): MonetaryValue {
  return { transactionTime: Long.ZERO, tradeDate: 0, value: Long.ZERO, valueCurrencyCode: "" };
}

export const MonetaryValue = {
  encode(message: MonetaryValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.value.isZero()) {
      writer.uint32(88).sint64(message.value);
    }
    if (message.valueCurrencyCode !== "") {
      writer.uint32(98).string(message.valueCurrencyCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MonetaryValue {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMonetaryValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.value = reader.sint64() as Long;
          break;
        case 12:
          message.valueCurrencyCode = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MonetaryValue {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      value: isSet(object.value) ? Long.fromValue(object.value) : Long.ZERO,
      valueCurrencyCode: isSet(object.valueCurrencyCode) ? String(object.valueCurrencyCode) : "",
    };
  },

  toJSON(message: MonetaryValue): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    message.value !== undefined && (obj.value = (message.value || Long.ZERO).toString());
    message.valueCurrencyCode !== undefined && (obj.valueCurrencyCode = message.valueCurrencyCode);
    return obj;
  },

  fromPartial(object: DeepPartial<MonetaryValue>): MonetaryValue {
    const message = createBaseMonetaryValue();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.value = (object.value !== undefined && object.value !== null) ? Long.fromValue(object.value) : Long.ZERO;
    message.valueCurrencyCode = object.valueCurrencyCode ?? "";
    return message;
  },
};

function createBaseSettlement(): Settlement {
  return {
    transactionTime: Long.ZERO,
    tradeDate: 0,
    price: Long.ZERO,
    preliminarySettle: false,
    currency: "",
    settlementSource: 0,
    session: "",
    transient: false,
    reserved: false,
  };
}

export const Settlement = {
  encode(message: Settlement, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.price.isZero()) {
      writer.uint32(88).sint64(message.price);
    }
    if (message.preliminarySettle === true) {
      writer.uint32(96).bool(message.preliminarySettle);
    }
    if (message.currency !== "") {
      writer.uint32(106).string(message.currency);
    }
    if (message.settlementSource !== 0) {
      writer.uint32(112).int32(message.settlementSource);
    }
    if (message.session !== "") {
      writer.uint32(122).string(message.session);
    }
    if (message.transient === true) {
      writer.uint32(128).bool(message.transient);
    }
    if (message.reserved === true) {
      writer.uint32(1016).bool(message.reserved);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Settlement {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSettlement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.price = reader.sint64() as Long;
          break;
        case 12:
          message.preliminarySettle = reader.bool();
          break;
        case 13:
          message.currency = reader.string();
          break;
        case 14:
          message.settlementSource = reader.int32() as any;
          break;
        case 15:
          message.session = reader.string();
          break;
        case 16:
          message.transient = reader.bool();
          break;
        case 127:
          message.reserved = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Settlement {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      price: isSet(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      preliminarySettle: isSet(object.preliminarySettle) ? Boolean(object.preliminarySettle) : false,
      currency: isSet(object.currency) ? String(object.currency) : "",
      settlementSource: isSet(object.settlementSource) ? settlementSourceFromJSON(object.settlementSource) : 0,
      session: isSet(object.session) ? String(object.session) : "",
      transient: isSet(object.transient) ? Boolean(object.transient) : false,
      reserved: isSet(object.reserved) ? Boolean(object.reserved) : false,
    };
  },

  toJSON(message: Settlement): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    message.price !== undefined && (obj.price = (message.price || Long.ZERO).toString());
    message.preliminarySettle !== undefined && (obj.preliminarySettle = message.preliminarySettle);
    message.currency !== undefined && (obj.currency = message.currency);
    message.settlementSource !== undefined && (obj.settlementSource = settlementSourceToJSON(message.settlementSource));
    message.session !== undefined && (obj.session = message.session);
    message.transient !== undefined && (obj.transient = message.transient);
    message.reserved !== undefined && (obj.reserved = message.reserved);
    return obj;
  },

  fromPartial(object: DeepPartial<Settlement>): Settlement {
    const message = createBaseSettlement();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.price = (object.price !== undefined && object.price !== null) ? Long.fromValue(object.price) : Long.ZERO;
    message.preliminarySettle = object.preliminarySettle ?? false;
    message.currency = object.currency ?? "";
    message.settlementSource = object.settlementSource ?? 0;
    message.session = object.session ?? "";
    message.transient = object.transient ?? false;
    message.reserved = object.reserved ?? false;
    return message;
  },
};

function createBaseOpenInterest(): OpenInterest {
  return { transactionTime: Long.ZERO, tradeDate: 0, volume: Long.ZERO };
}

export const OpenInterest = {
  encode(message: OpenInterest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.volume.isZero()) {
      writer.uint32(88).sint64(message.volume);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OpenInterest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpenInterest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.volume = reader.sint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OpenInterest {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      volume: isSet(object.volume) ? Long.fromValue(object.volume) : Long.ZERO,
    };
  },

  toJSON(message: OpenInterest): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    message.volume !== undefined && (obj.volume = (message.volume || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<OpenInterest>): OpenInterest {
    const message = createBaseOpenInterest();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.volume = (object.volume !== undefined && object.volume !== null)
      ? Long.fromValue(object.volume)
      : Long.ZERO;
    return message;
  },
};

function createBaseVwap(): Vwap {
  return { transactionTime: Long.ZERO, tradeDate: 0, vwap: Long.ZERO };
}

export const Vwap = {
  encode(message: Vwap, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(72).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.vwap.isZero()) {
      writer.uint32(88).sint64(message.vwap);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Vwap {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVwap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.vwap = reader.sint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Vwap {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      vwap: isSet(object.vwap) ? Long.fromValue(object.vwap) : Long.ZERO,
    };
  },

  toJSON(message: Vwap): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    message.vwap !== undefined && (obj.vwap = (message.vwap || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<Vwap>): Vwap {
    const message = createBaseVwap();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.vwap = (object.vwap !== undefined && object.vwap !== null) ? Long.fromValue(object.vwap) : Long.ZERO;
    return message;
  },
};

function createBaseDividendsIncomeDistributions(): DividendsIncomeDistributions {
  return {
    transactionTime: Long.ZERO,
    instrumentType: "",
    corporateAction: "",
    distributionType: "",
    payableDate: 0,
    recordDate: 0,
    exDividendDate: 0,
    amount: Long.ZERO,
    currencyCode: "",
    notes: [],
    totalCashDistribution: Long.ZERO,
    nonQualifiedCashDistribution: Long.ZERO,
    qualifiedCashDistribution: Long.ZERO,
    taxFreeCashDistribution: Long.ZERO,
    ordinaryForeignTaxCredit: Long.ZERO,
    qualifiedForeignTaxCredit: Long.ZERO,
    stockDividendRatio: Long.ZERO,
    reinvestDate: 0,
  };
}

export const DividendsIncomeDistributions = {
  encode(message: DividendsIncomeDistributions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(48).sint64(message.transactionTime);
    }
    if (message.instrumentType !== "") {
      writer.uint32(58).string(message.instrumentType);
    }
    if (message.corporateAction !== "") {
      writer.uint32(66).string(message.corporateAction);
    }
    if (message.distributionType !== "") {
      writer.uint32(74).string(message.distributionType);
    }
    if (message.payableDate !== 0) {
      writer.uint32(80).sint32(message.payableDate);
    }
    if (message.recordDate !== 0) {
      writer.uint32(88).sint32(message.recordDate);
    }
    if (message.exDividendDate !== 0) {
      writer.uint32(96).sint32(message.exDividendDate);
    }
    if (!message.amount.isZero()) {
      writer.uint32(104).sint64(message.amount);
    }
    if (message.currencyCode !== "") {
      writer.uint32(114).string(message.currencyCode);
    }
    for (const v of message.notes) {
      writer.uint32(122).string(v!);
    }
    if (!message.totalCashDistribution.isZero()) {
      writer.uint32(128).sint64(message.totalCashDistribution);
    }
    if (!message.nonQualifiedCashDistribution.isZero()) {
      writer.uint32(136).sint64(message.nonQualifiedCashDistribution);
    }
    if (!message.qualifiedCashDistribution.isZero()) {
      writer.uint32(144).sint64(message.qualifiedCashDistribution);
    }
    if (!message.taxFreeCashDistribution.isZero()) {
      writer.uint32(152).sint64(message.taxFreeCashDistribution);
    }
    if (!message.ordinaryForeignTaxCredit.isZero()) {
      writer.uint32(160).sint64(message.ordinaryForeignTaxCredit);
    }
    if (!message.qualifiedForeignTaxCredit.isZero()) {
      writer.uint32(168).sint64(message.qualifiedForeignTaxCredit);
    }
    if (!message.stockDividendRatio.isZero()) {
      writer.uint32(176).sint64(message.stockDividendRatio);
    }
    if (message.reinvestDate !== 0) {
      writer.uint32(184).sint32(message.reinvestDate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DividendsIncomeDistributions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDividendsIncomeDistributions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 6:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 7:
          message.instrumentType = reader.string();
          break;
        case 8:
          message.corporateAction = reader.string();
          break;
        case 9:
          message.distributionType = reader.string();
          break;
        case 10:
          message.payableDate = reader.sint32();
          break;
        case 11:
          message.recordDate = reader.sint32();
          break;
        case 12:
          message.exDividendDate = reader.sint32();
          break;
        case 13:
          message.amount = reader.sint64() as Long;
          break;
        case 14:
          message.currencyCode = reader.string();
          break;
        case 15:
          message.notes.push(reader.string());
          break;
        case 16:
          message.totalCashDistribution = reader.sint64() as Long;
          break;
        case 17:
          message.nonQualifiedCashDistribution = reader.sint64() as Long;
          break;
        case 18:
          message.qualifiedCashDistribution = reader.sint64() as Long;
          break;
        case 19:
          message.taxFreeCashDistribution = reader.sint64() as Long;
          break;
        case 20:
          message.ordinaryForeignTaxCredit = reader.sint64() as Long;
          break;
        case 21:
          message.qualifiedForeignTaxCredit = reader.sint64() as Long;
          break;
        case 22:
          message.stockDividendRatio = reader.sint64() as Long;
          break;
        case 23:
          message.reinvestDate = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DividendsIncomeDistributions {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      instrumentType: isSet(object.instrumentType) ? String(object.instrumentType) : "",
      corporateAction: isSet(object.corporateAction) ? String(object.corporateAction) : "",
      distributionType: isSet(object.distributionType) ? String(object.distributionType) : "",
      payableDate: isSet(object.payableDate) ? Number(object.payableDate) : 0,
      recordDate: isSet(object.recordDate) ? Number(object.recordDate) : 0,
      exDividendDate: isSet(object.exDividendDate) ? Number(object.exDividendDate) : 0,
      amount: isSet(object.amount) ? Long.fromValue(object.amount) : Long.ZERO,
      currencyCode: isSet(object.currencyCode) ? String(object.currencyCode) : "",
      notes: Array.isArray(object?.notes) ? object.notes.map((e: any) => String(e)) : [],
      totalCashDistribution: isSet(object.totalCashDistribution)
        ? Long.fromValue(object.totalCashDistribution)
        : Long.ZERO,
      nonQualifiedCashDistribution: isSet(object.nonQualifiedCashDistribution)
        ? Long.fromValue(object.nonQualifiedCashDistribution)
        : Long.ZERO,
      qualifiedCashDistribution: isSet(object.qualifiedCashDistribution)
        ? Long.fromValue(object.qualifiedCashDistribution)
        : Long.ZERO,
      taxFreeCashDistribution: isSet(object.taxFreeCashDistribution)
        ? Long.fromValue(object.taxFreeCashDistribution)
        : Long.ZERO,
      ordinaryForeignTaxCredit: isSet(object.ordinaryForeignTaxCredit)
        ? Long.fromValue(object.ordinaryForeignTaxCredit)
        : Long.ZERO,
      qualifiedForeignTaxCredit: isSet(object.qualifiedForeignTaxCredit)
        ? Long.fromValue(object.qualifiedForeignTaxCredit)
        : Long.ZERO,
      stockDividendRatio: isSet(object.stockDividendRatio) ? Long.fromValue(object.stockDividendRatio) : Long.ZERO,
      reinvestDate: isSet(object.reinvestDate) ? Number(object.reinvestDate) : 0,
    };
  },

  toJSON(message: DividendsIncomeDistributions): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.instrumentType !== undefined && (obj.instrumentType = message.instrumentType);
    message.corporateAction !== undefined && (obj.corporateAction = message.corporateAction);
    message.distributionType !== undefined && (obj.distributionType = message.distributionType);
    message.payableDate !== undefined && (obj.payableDate = Math.round(message.payableDate));
    message.recordDate !== undefined && (obj.recordDate = Math.round(message.recordDate));
    message.exDividendDate !== undefined && (obj.exDividendDate = Math.round(message.exDividendDate));
    message.amount !== undefined && (obj.amount = (message.amount || Long.ZERO).toString());
    message.currencyCode !== undefined && (obj.currencyCode = message.currencyCode);
    if (message.notes) {
      obj.notes = message.notes.map((e) => e);
    } else {
      obj.notes = [];
    }
    message.totalCashDistribution !== undefined &&
      (obj.totalCashDistribution = (message.totalCashDistribution || Long.ZERO).toString());
    message.nonQualifiedCashDistribution !== undefined &&
      (obj.nonQualifiedCashDistribution = (message.nonQualifiedCashDistribution || Long.ZERO).toString());
    message.qualifiedCashDistribution !== undefined &&
      (obj.qualifiedCashDistribution = (message.qualifiedCashDistribution || Long.ZERO).toString());
    message.taxFreeCashDistribution !== undefined &&
      (obj.taxFreeCashDistribution = (message.taxFreeCashDistribution || Long.ZERO).toString());
    message.ordinaryForeignTaxCredit !== undefined &&
      (obj.ordinaryForeignTaxCredit = (message.ordinaryForeignTaxCredit || Long.ZERO).toString());
    message.qualifiedForeignTaxCredit !== undefined &&
      (obj.qualifiedForeignTaxCredit = (message.qualifiedForeignTaxCredit || Long.ZERO).toString());
    message.stockDividendRatio !== undefined &&
      (obj.stockDividendRatio = (message.stockDividendRatio || Long.ZERO).toString());
    message.reinvestDate !== undefined && (obj.reinvestDate = Math.round(message.reinvestDate));
    return obj;
  },

  fromPartial(object: DeepPartial<DividendsIncomeDistributions>): DividendsIncomeDistributions {
    const message = createBaseDividendsIncomeDistributions();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.instrumentType = object.instrumentType ?? "";
    message.corporateAction = object.corporateAction ?? "";
    message.distributionType = object.distributionType ?? "";
    message.payableDate = object.payableDate ?? 0;
    message.recordDate = object.recordDate ?? 0;
    message.exDividendDate = object.exDividendDate ?? 0;
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Long.fromValue(object.amount)
      : Long.ZERO;
    message.currencyCode = object.currencyCode ?? "";
    message.notes = object.notes?.map((e) => e) || [];
    message.totalCashDistribution =
      (object.totalCashDistribution !== undefined && object.totalCashDistribution !== null)
        ? Long.fromValue(object.totalCashDistribution)
        : Long.ZERO;
    message.nonQualifiedCashDistribution =
      (object.nonQualifiedCashDistribution !== undefined && object.nonQualifiedCashDistribution !== null)
        ? Long.fromValue(object.nonQualifiedCashDistribution)
        : Long.ZERO;
    message.qualifiedCashDistribution =
      (object.qualifiedCashDistribution !== undefined && object.qualifiedCashDistribution !== null)
        ? Long.fromValue(object.qualifiedCashDistribution)
        : Long.ZERO;
    message.taxFreeCashDistribution =
      (object.taxFreeCashDistribution !== undefined && object.taxFreeCashDistribution !== null)
        ? Long.fromValue(object.taxFreeCashDistribution)
        : Long.ZERO;
    message.ordinaryForeignTaxCredit =
      (object.ordinaryForeignTaxCredit !== undefined && object.ordinaryForeignTaxCredit !== null)
        ? Long.fromValue(object.ordinaryForeignTaxCredit)
        : Long.ZERO;
    message.qualifiedForeignTaxCredit =
      (object.qualifiedForeignTaxCredit !== undefined && object.qualifiedForeignTaxCredit !== null)
        ? Long.fromValue(object.qualifiedForeignTaxCredit)
        : Long.ZERO;
    message.stockDividendRatio = (object.stockDividendRatio !== undefined && object.stockDividendRatio !== null)
      ? Long.fromValue(object.stockDividendRatio)
      : Long.ZERO;
    message.reinvestDate = object.reinvestDate ?? 0;
    return message;
  },
};

function createBaseCapitalDistributions(): CapitalDistributions {
  return {
    transactionTime: Long.ZERO,
    instrumentType: "",
    corporateAction: "",
    payableDate: 0,
    recordDate: 0,
    exDate: 0,
    shortTermCapitalGain: Long.ZERO,
    longTermCapitalGain: Long.ZERO,
    unallocatedDistributions: Long.ZERO,
    returnOfCapital: Long.ZERO,
    currencyCode: "",
    notes: [],
    reinvestDate: 0,
  };
}

export const CapitalDistributions = {
  encode(message: CapitalDistributions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(64).sint64(message.transactionTime);
    }
    if (message.instrumentType !== "") {
      writer.uint32(74).string(message.instrumentType);
    }
    if (message.corporateAction !== "") {
      writer.uint32(82).string(message.corporateAction);
    }
    if (message.payableDate !== 0) {
      writer.uint32(88).sint32(message.payableDate);
    }
    if (message.recordDate !== 0) {
      writer.uint32(96).sint32(message.recordDate);
    }
    if (message.exDate !== 0) {
      writer.uint32(104).sint32(message.exDate);
    }
    if (!message.shortTermCapitalGain.isZero()) {
      writer.uint32(112).sint64(message.shortTermCapitalGain);
    }
    if (!message.longTermCapitalGain.isZero()) {
      writer.uint32(120).sint64(message.longTermCapitalGain);
    }
    if (!message.unallocatedDistributions.isZero()) {
      writer.uint32(128).sint64(message.unallocatedDistributions);
    }
    if (!message.returnOfCapital.isZero()) {
      writer.uint32(136).sint64(message.returnOfCapital);
    }
    if (message.currencyCode !== "") {
      writer.uint32(146).string(message.currencyCode);
    }
    for (const v of message.notes) {
      writer.uint32(154).string(v!);
    }
    if (message.reinvestDate !== 0) {
      writer.uint32(160).sint32(message.reinvestDate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CapitalDistributions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCapitalDistributions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 8:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 9:
          message.instrumentType = reader.string();
          break;
        case 10:
          message.corporateAction = reader.string();
          break;
        case 11:
          message.payableDate = reader.sint32();
          break;
        case 12:
          message.recordDate = reader.sint32();
          break;
        case 13:
          message.exDate = reader.sint32();
          break;
        case 14:
          message.shortTermCapitalGain = reader.sint64() as Long;
          break;
        case 15:
          message.longTermCapitalGain = reader.sint64() as Long;
          break;
        case 16:
          message.unallocatedDistributions = reader.sint64() as Long;
          break;
        case 17:
          message.returnOfCapital = reader.sint64() as Long;
          break;
        case 18:
          message.currencyCode = reader.string();
          break;
        case 19:
          message.notes.push(reader.string());
          break;
        case 20:
          message.reinvestDate = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CapitalDistributions {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      instrumentType: isSet(object.instrumentType) ? String(object.instrumentType) : "",
      corporateAction: isSet(object.corporateAction) ? String(object.corporateAction) : "",
      payableDate: isSet(object.payableDate) ? Number(object.payableDate) : 0,
      recordDate: isSet(object.recordDate) ? Number(object.recordDate) : 0,
      exDate: isSet(object.exDate) ? Number(object.exDate) : 0,
      shortTermCapitalGain: isSet(object.shortTermCapitalGain)
        ? Long.fromValue(object.shortTermCapitalGain)
        : Long.ZERO,
      longTermCapitalGain: isSet(object.longTermCapitalGain) ? Long.fromValue(object.longTermCapitalGain) : Long.ZERO,
      unallocatedDistributions: isSet(object.unallocatedDistributions)
        ? Long.fromValue(object.unallocatedDistributions)
        : Long.ZERO,
      returnOfCapital: isSet(object.returnOfCapital) ? Long.fromValue(object.returnOfCapital) : Long.ZERO,
      currencyCode: isSet(object.currencyCode) ? String(object.currencyCode) : "",
      notes: Array.isArray(object?.notes) ? object.notes.map((e: any) => String(e)) : [],
      reinvestDate: isSet(object.reinvestDate) ? Number(object.reinvestDate) : 0,
    };
  },

  toJSON(message: CapitalDistributions): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.instrumentType !== undefined && (obj.instrumentType = message.instrumentType);
    message.corporateAction !== undefined && (obj.corporateAction = message.corporateAction);
    message.payableDate !== undefined && (obj.payableDate = Math.round(message.payableDate));
    message.recordDate !== undefined && (obj.recordDate = Math.round(message.recordDate));
    message.exDate !== undefined && (obj.exDate = Math.round(message.exDate));
    message.shortTermCapitalGain !== undefined &&
      (obj.shortTermCapitalGain = (message.shortTermCapitalGain || Long.ZERO).toString());
    message.longTermCapitalGain !== undefined &&
      (obj.longTermCapitalGain = (message.longTermCapitalGain || Long.ZERO).toString());
    message.unallocatedDistributions !== undefined &&
      (obj.unallocatedDistributions = (message.unallocatedDistributions || Long.ZERO).toString());
    message.returnOfCapital !== undefined && (obj.returnOfCapital = (message.returnOfCapital || Long.ZERO).toString());
    message.currencyCode !== undefined && (obj.currencyCode = message.currencyCode);
    if (message.notes) {
      obj.notes = message.notes.map((e) => e);
    } else {
      obj.notes = [];
    }
    message.reinvestDate !== undefined && (obj.reinvestDate = Math.round(message.reinvestDate));
    return obj;
  },

  fromPartial(object: DeepPartial<CapitalDistributions>): CapitalDistributions {
    const message = createBaseCapitalDistributions();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.instrumentType = object.instrumentType ?? "";
    message.corporateAction = object.corporateAction ?? "";
    message.payableDate = object.payableDate ?? 0;
    message.recordDate = object.recordDate ?? 0;
    message.exDate = object.exDate ?? 0;
    message.shortTermCapitalGain = (object.shortTermCapitalGain !== undefined && object.shortTermCapitalGain !== null)
      ? Long.fromValue(object.shortTermCapitalGain)
      : Long.ZERO;
    message.longTermCapitalGain = (object.longTermCapitalGain !== undefined && object.longTermCapitalGain !== null)
      ? Long.fromValue(object.longTermCapitalGain)
      : Long.ZERO;
    message.unallocatedDistributions =
      (object.unallocatedDistributions !== undefined && object.unallocatedDistributions !== null)
        ? Long.fromValue(object.unallocatedDistributions)
        : Long.ZERO;
    message.returnOfCapital = (object.returnOfCapital !== undefined && object.returnOfCapital !== null)
      ? Long.fromValue(object.returnOfCapital)
      : Long.ZERO;
    message.currencyCode = object.currencyCode ?? "";
    message.notes = object.notes?.map((e) => e) || [];
    message.reinvestDate = object.reinvestDate ?? 0;
    return message;
  },
};

function createBaseSharesOutstanding(): SharesOutstanding {
  return { sharesOutstanding: Long.ZERO, transactionTime: Long.ZERO };
}

export const SharesOutstanding = {
  encode(message: SharesOutstanding, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.sharesOutstanding.isZero()) {
      writer.uint32(8).sint64(message.sharesOutstanding);
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(16).sint64(message.transactionTime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SharesOutstanding {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSharesOutstanding();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sharesOutstanding = reader.sint64() as Long;
          break;
        case 2:
          message.transactionTime = reader.sint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SharesOutstanding {
    return {
      sharesOutstanding: isSet(object.sharesOutstanding) ? Long.fromValue(object.sharesOutstanding) : Long.ZERO,
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
    };
  },

  toJSON(message: SharesOutstanding): unknown {
    const obj: any = {};
    message.sharesOutstanding !== undefined &&
      (obj.sharesOutstanding = (message.sharesOutstanding || Long.ZERO).toString());
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<SharesOutstanding>): SharesOutstanding {
    const message = createBaseSharesOutstanding();
    message.sharesOutstanding = (object.sharesOutstanding !== undefined && object.sharesOutstanding !== null)
      ? Long.fromValue(object.sharesOutstanding)
      : Long.ZERO;
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    return message;
  },
};

function createBaseNetAssetValue(): NetAssetValue {
  return { netAssetValue: Long.ZERO, transactionTime: Long.ZERO };
}

export const NetAssetValue = {
  encode(message: NetAssetValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.netAssetValue.isZero()) {
      writer.uint32(8).sint64(message.netAssetValue);
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(16).sint64(message.transactionTime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NetAssetValue {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNetAssetValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.netAssetValue = reader.sint64() as Long;
          break;
        case 2:
          message.transactionTime = reader.sint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NetAssetValue {
    return {
      netAssetValue: isSet(object.netAssetValue) ? Long.fromValue(object.netAssetValue) : Long.ZERO,
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
    };
  },

  toJSON(message: NetAssetValue): unknown {
    const obj: any = {};
    message.netAssetValue !== undefined && (obj.netAssetValue = (message.netAssetValue || Long.ZERO).toString());
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<NetAssetValue>): NetAssetValue {
    const message = createBaseNetAssetValue();
    message.netAssetValue = (object.netAssetValue !== undefined && object.netAssetValue !== null)
      ? Long.fromValue(object.netAssetValue)
      : Long.ZERO;
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    return message;
  },
};

function createBaseMarketSummary(): MarketSummary {
  return {
    transactionTime: Long.ZERO,
    tradingDate: 0,
    startOfDay: false,
    endOfDay: false,
    clear: 0,
    instrumentStatus: undefined,
    bbo: undefined,
    open: undefined,
    high: undefined,
    low: undefined,
    close: undefined,
    prevClose: undefined,
    last: undefined,
    volume: undefined,
    settlement: undefined,
    openInterest: undefined,
    vwap: undefined,
    session: "",
    summaryType: 0,
    prevVolume: undefined,
    transient: false,
  };
}

export const MarketSummary = {
  encode(message: MarketSummary, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(8).sint64(message.transactionTime);
    }
    if (message.tradingDate !== 0) {
      writer.uint32(16).sint32(message.tradingDate);
    }
    if (message.startOfDay === true) {
      writer.uint32(24).bool(message.startOfDay);
    }
    if (message.endOfDay === true) {
      writer.uint32(32).bool(message.endOfDay);
    }
    if (message.clear !== 0) {
      writer.uint32(40).int32(message.clear);
    }
    if (message.instrumentStatus !== undefined) {
      InstrumentStatus.encode(message.instrumentStatus, writer.uint32(74).fork()).ldelim();
    }
    if (message.bbo !== undefined) {
      BestBidOffer.encode(message.bbo, writer.uint32(82).fork()).ldelim();
    }
    if (message.open !== undefined) {
      Open.encode(message.open, writer.uint32(90).fork()).ldelim();
    }
    if (message.high !== undefined) {
      High.encode(message.high, writer.uint32(98).fork()).ldelim();
    }
    if (message.low !== undefined) {
      Low.encode(message.low, writer.uint32(106).fork()).ldelim();
    }
    if (message.close !== undefined) {
      Close.encode(message.close, writer.uint32(114).fork()).ldelim();
    }
    if (message.prevClose !== undefined) {
      PrevClose.encode(message.prevClose, writer.uint32(122).fork()).ldelim();
    }
    if (message.last !== undefined) {
      Last.encode(message.last, writer.uint32(130).fork()).ldelim();
    }
    if (message.volume !== undefined) {
      Volume.encode(message.volume, writer.uint32(138).fork()).ldelim();
    }
    if (message.settlement !== undefined) {
      Settlement.encode(message.settlement, writer.uint32(146).fork()).ldelim();
    }
    if (message.openInterest !== undefined) {
      OpenInterest.encode(message.openInterest, writer.uint32(154).fork()).ldelim();
    }
    if (message.vwap !== undefined) {
      Vwap.encode(message.vwap, writer.uint32(162).fork()).ldelim();
    }
    if (message.session !== "") {
      writer.uint32(170).string(message.session);
    }
    if (message.summaryType !== 0) {
      writer.uint32(176).int32(message.summaryType);
    }
    if (message.prevVolume !== undefined) {
      Volume.encode(message.prevVolume, writer.uint32(186).fork()).ldelim();
    }
    if (message.transient === true) {
      writer.uint32(192).bool(message.transient);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MarketSummary {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarketSummary();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 2:
          message.tradingDate = reader.sint32();
          break;
        case 3:
          message.startOfDay = reader.bool();
          break;
        case 4:
          message.endOfDay = reader.bool();
          break;
        case 5:
          message.clear = reader.int32() as any;
          break;
        case 9:
          message.instrumentStatus = InstrumentStatus.decode(reader, reader.uint32());
          break;
        case 10:
          message.bbo = BestBidOffer.decode(reader, reader.uint32());
          break;
        case 11:
          message.open = Open.decode(reader, reader.uint32());
          break;
        case 12:
          message.high = High.decode(reader, reader.uint32());
          break;
        case 13:
          message.low = Low.decode(reader, reader.uint32());
          break;
        case 14:
          message.close = Close.decode(reader, reader.uint32());
          break;
        case 15:
          message.prevClose = PrevClose.decode(reader, reader.uint32());
          break;
        case 16:
          message.last = Last.decode(reader, reader.uint32());
          break;
        case 17:
          message.volume = Volume.decode(reader, reader.uint32());
          break;
        case 18:
          message.settlement = Settlement.decode(reader, reader.uint32());
          break;
        case 19:
          message.openInterest = OpenInterest.decode(reader, reader.uint32());
          break;
        case 20:
          message.vwap = Vwap.decode(reader, reader.uint32());
          break;
        case 21:
          message.session = reader.string();
          break;
        case 22:
          message.summaryType = reader.int32() as any;
          break;
        case 23:
          message.prevVolume = Volume.decode(reader, reader.uint32());
          break;
        case 24:
          message.transient = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MarketSummary {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradingDate: isSet(object.tradingDate) ? Number(object.tradingDate) : 0,
      startOfDay: isSet(object.startOfDay) ? Boolean(object.startOfDay) : false,
      endOfDay: isSet(object.endOfDay) ? Boolean(object.endOfDay) : false,
      clear: isSet(object.clear) ? marketSummary_ClearSetFromJSON(object.clear) : 0,
      instrumentStatus: isSet(object.instrumentStatus) ? InstrumentStatus.fromJSON(object.instrumentStatus) : undefined,
      bbo: isSet(object.bbo) ? BestBidOffer.fromJSON(object.bbo) : undefined,
      open: isSet(object.open) ? Open.fromJSON(object.open) : undefined,
      high: isSet(object.high) ? High.fromJSON(object.high) : undefined,
      low: isSet(object.low) ? Low.fromJSON(object.low) : undefined,
      close: isSet(object.close) ? Close.fromJSON(object.close) : undefined,
      prevClose: isSet(object.prevClose) ? PrevClose.fromJSON(object.prevClose) : undefined,
      last: isSet(object.last) ? Last.fromJSON(object.last) : undefined,
      volume: isSet(object.volume) ? Volume.fromJSON(object.volume) : undefined,
      settlement: isSet(object.settlement) ? Settlement.fromJSON(object.settlement) : undefined,
      openInterest: isSet(object.openInterest) ? OpenInterest.fromJSON(object.openInterest) : undefined,
      vwap: isSet(object.vwap) ? Vwap.fromJSON(object.vwap) : undefined,
      session: isSet(object.session) ? String(object.session) : "",
      summaryType: isSet(object.summaryType) ? marketSummary_SummaryTypeFromJSON(object.summaryType) : 0,
      prevVolume: isSet(object.prevVolume) ? Volume.fromJSON(object.prevVolume) : undefined,
      transient: isSet(object.transient) ? Boolean(object.transient) : false,
    };
  },

  toJSON(message: MarketSummary): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradingDate !== undefined && (obj.tradingDate = Math.round(message.tradingDate));
    message.startOfDay !== undefined && (obj.startOfDay = message.startOfDay);
    message.endOfDay !== undefined && (obj.endOfDay = message.endOfDay);
    message.clear !== undefined && (obj.clear = marketSummary_ClearSetToJSON(message.clear));
    message.instrumentStatus !== undefined &&
      (obj.instrumentStatus = message.instrumentStatus ? InstrumentStatus.toJSON(message.instrumentStatus) : undefined);
    message.bbo !== undefined && (obj.bbo = message.bbo ? BestBidOffer.toJSON(message.bbo) : undefined);
    message.open !== undefined && (obj.open = message.open ? Open.toJSON(message.open) : undefined);
    message.high !== undefined && (obj.high = message.high ? High.toJSON(message.high) : undefined);
    message.low !== undefined && (obj.low = message.low ? Low.toJSON(message.low) : undefined);
    message.close !== undefined && (obj.close = message.close ? Close.toJSON(message.close) : undefined);
    message.prevClose !== undefined &&
      (obj.prevClose = message.prevClose ? PrevClose.toJSON(message.prevClose) : undefined);
    message.last !== undefined && (obj.last = message.last ? Last.toJSON(message.last) : undefined);
    message.volume !== undefined && (obj.volume = message.volume ? Volume.toJSON(message.volume) : undefined);
    message.settlement !== undefined &&
      (obj.settlement = message.settlement ? Settlement.toJSON(message.settlement) : undefined);
    message.openInterest !== undefined &&
      (obj.openInterest = message.openInterest ? OpenInterest.toJSON(message.openInterest) : undefined);
    message.vwap !== undefined && (obj.vwap = message.vwap ? Vwap.toJSON(message.vwap) : undefined);
    message.session !== undefined && (obj.session = message.session);
    message.summaryType !== undefined && (obj.summaryType = marketSummary_SummaryTypeToJSON(message.summaryType));
    message.prevVolume !== undefined &&
      (obj.prevVolume = message.prevVolume ? Volume.toJSON(message.prevVolume) : undefined);
    message.transient !== undefined && (obj.transient = message.transient);
    return obj;
  },

  fromPartial(object: DeepPartial<MarketSummary>): MarketSummary {
    const message = createBaseMarketSummary();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.tradingDate = object.tradingDate ?? 0;
    message.startOfDay = object.startOfDay ?? false;
    message.endOfDay = object.endOfDay ?? false;
    message.clear = object.clear ?? 0;
    message.instrumentStatus = (object.instrumentStatus !== undefined && object.instrumentStatus !== null)
      ? InstrumentStatus.fromPartial(object.instrumentStatus)
      : undefined;
    message.bbo = (object.bbo !== undefined && object.bbo !== null) ? BestBidOffer.fromPartial(object.bbo) : undefined;
    message.open = (object.open !== undefined && object.open !== null) ? Open.fromPartial(object.open) : undefined;
    message.high = (object.high !== undefined && object.high !== null) ? High.fromPartial(object.high) : undefined;
    message.low = (object.low !== undefined && object.low !== null) ? Low.fromPartial(object.low) : undefined;
    message.close = (object.close !== undefined && object.close !== null) ? Close.fromPartial(object.close) : undefined;
    message.prevClose = (object.prevClose !== undefined && object.prevClose !== null)
      ? PrevClose.fromPartial(object.prevClose)
      : undefined;
    message.last = (object.last !== undefined && object.last !== null) ? Last.fromPartial(object.last) : undefined;
    message.volume = (object.volume !== undefined && object.volume !== null)
      ? Volume.fromPartial(object.volume)
      : undefined;
    message.settlement = (object.settlement !== undefined && object.settlement !== null)
      ? Settlement.fromPartial(object.settlement)
      : undefined;
    message.openInterest = (object.openInterest !== undefined && object.openInterest !== null)
      ? OpenInterest.fromPartial(object.openInterest)
      : undefined;
    message.vwap = (object.vwap !== undefined && object.vwap !== null) ? Vwap.fromPartial(object.vwap) : undefined;
    message.session = object.session ?? "";
    message.summaryType = object.summaryType ?? 0;
    message.prevVolume = (object.prevVolume !== undefined && object.prevVolume !== null)
      ? Volume.fromPartial(object.prevVolume)
      : undefined;
    message.transient = object.transient ?? false;
    return message;
  },
};

function createBaseContext(): Context {
  return { data: [], tracePoints: [] };
}

export const Context = {
  encode(message: Context, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.data) {
      ContextData.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.tracePoints) {
      TracePoint.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Context {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContext();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data.push(ContextData.decode(reader, reader.uint32()));
          break;
        case 2:
          message.tracePoints.push(TracePoint.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Context {
    return {
      data: Array.isArray(object?.data) ? object.data.map((e: any) => ContextData.fromJSON(e)) : [],
      tracePoints: Array.isArray(object?.tracePoints) ? object.tracePoints.map((e: any) => TracePoint.fromJSON(e)) : [],
    };
  },

  toJSON(message: Context): unknown {
    const obj: any = {};
    if (message.data) {
      obj.data = message.data.map((e) => e ? ContextData.toJSON(e) : undefined);
    } else {
      obj.data = [];
    }
    if (message.tracePoints) {
      obj.tracePoints = message.tracePoints.map((e) => e ? TracePoint.toJSON(e) : undefined);
    } else {
      obj.tracePoints = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Context>): Context {
    const message = createBaseContext();
    message.data = object.data?.map((e) => ContextData.fromPartial(e)) || [];
    message.tracePoints = object.tracePoints?.map((e) => TracePoint.fromPartial(e)) || [];
    return message;
  },
};

function createBaseContextData(): ContextData {
  return {
    id: "",
    vstring: undefined,
    vbytes: undefined,
    vbool: undefined,
    vsint32: undefined,
    vsint64: undefined,
    vfloat: undefined,
    vdouble: undefined,
  };
}

export const ContextData = {
  encode(message: ContextData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.vstring !== undefined) {
      writer.uint32(42).string(message.vstring);
    }
    if (message.vbytes !== undefined) {
      writer.uint32(50).bytes(message.vbytes);
    }
    if (message.vbool !== undefined) {
      writer.uint32(56).bool(message.vbool);
    }
    if (message.vsint32 !== undefined) {
      writer.uint32(64).sint32(message.vsint32);
    }
    if (message.vsint64 !== undefined) {
      writer.uint32(72).sint64(message.vsint64);
    }
    if (message.vfloat !== undefined) {
      writer.uint32(85).float(message.vfloat);
    }
    if (message.vdouble !== undefined) {
      writer.uint32(89).double(message.vdouble);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ContextData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContextData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 5:
          message.vstring = reader.string();
          break;
        case 6:
          message.vbytes = reader.bytes();
          break;
        case 7:
          message.vbool = reader.bool();
          break;
        case 8:
          message.vsint32 = reader.sint32();
          break;
        case 9:
          message.vsint64 = reader.sint64() as Long;
          break;
        case 10:
          message.vfloat = reader.float();
          break;
        case 11:
          message.vdouble = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ContextData {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      vstring: isSet(object.vstring) ? String(object.vstring) : undefined,
      vbytes: isSet(object.vbytes) ? bytesFromBase64(object.vbytes) : undefined,
      vbool: isSet(object.vbool) ? Boolean(object.vbool) : undefined,
      vsint32: isSet(object.vsint32) ? Number(object.vsint32) : undefined,
      vsint64: isSet(object.vsint64) ? Long.fromValue(object.vsint64) : undefined,
      vfloat: isSet(object.vfloat) ? Number(object.vfloat) : undefined,
      vdouble: isSet(object.vdouble) ? Number(object.vdouble) : undefined,
    };
  },

  toJSON(message: ContextData): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.vstring !== undefined && (obj.vstring = message.vstring);
    message.vbytes !== undefined &&
      (obj.vbytes = message.vbytes !== undefined ? base64FromBytes(message.vbytes) : undefined);
    message.vbool !== undefined && (obj.vbool = message.vbool);
    message.vsint32 !== undefined && (obj.vsint32 = Math.round(message.vsint32));
    message.vsint64 !== undefined && (obj.vsint64 = (message.vsint64 || undefined).toString());
    message.vfloat !== undefined && (obj.vfloat = message.vfloat);
    message.vdouble !== undefined && (obj.vdouble = message.vdouble);
    return obj;
  },

  fromPartial(object: DeepPartial<ContextData>): ContextData {
    const message = createBaseContextData();
    message.id = object.id ?? "";
    message.vstring = object.vstring ?? undefined;
    message.vbytes = object.vbytes ?? undefined;
    message.vbool = object.vbool ?? undefined;
    message.vsint32 = object.vsint32 ?? undefined;
    message.vsint64 = (object.vsint64 !== undefined && object.vsint64 !== null)
      ? Long.fromValue(object.vsint64)
      : undefined;
    message.vfloat = object.vfloat ?? undefined;
    message.vdouble = object.vdouble ?? undefined;
    return message;
  },
};

function createBaseTracePoint(): TracePoint {
  return { id: "", componentId: "", timestampNs: Long.ZERO, componentLatencyNs: 0 };
}

export const TracePoint = {
  encode(message: TracePoint, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.componentId !== "") {
      writer.uint32(18).string(message.componentId);
    }
    if (!message.timestampNs.isZero()) {
      writer.uint32(24).sint64(message.timestampNs);
    }
    if (message.componentLatencyNs !== 0) {
      writer.uint32(32).int32(message.componentLatencyNs);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TracePoint {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTracePoint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.componentId = reader.string();
          break;
        case 3:
          message.timestampNs = reader.sint64() as Long;
          break;
        case 4:
          message.componentLatencyNs = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TracePoint {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      componentId: isSet(object.componentId) ? String(object.componentId) : "",
      timestampNs: isSet(object.timestampNs) ? Long.fromValue(object.timestampNs) : Long.ZERO,
      componentLatencyNs: isSet(object.componentLatencyNs) ? Number(object.componentLatencyNs) : 0,
    };
  },

  toJSON(message: TracePoint): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.componentId !== undefined && (obj.componentId = message.componentId);
    message.timestampNs !== undefined && (obj.timestampNs = (message.timestampNs || Long.ZERO).toString());
    message.componentLatencyNs !== undefined && (obj.componentLatencyNs = Math.round(message.componentLatencyNs));
    return obj;
  },

  fromPartial(object: DeepPartial<TracePoint>): TracePoint {
    const message = createBaseTracePoint();
    message.id = object.id ?? "";
    message.componentId = object.componentId ?? "";
    message.timestampNs = (object.timestampNs !== undefined && object.timestampNs !== null)
      ? Long.fromValue(object.timestampNs)
      : Long.ZERO;
    message.componentLatencyNs = object.componentLatencyNs ?? 0;
    return message;
  },
};

function createBaseTCPHistoricalReplayRequest(): TCPHistoricalReplayRequest {
  return { channel: 0, resetNumber: 0, sequence: Long.ZERO, count: 0, requestId: "" };
}

export const TCPHistoricalReplayRequest = {
  encode(message: TCPHistoricalReplayRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel !== 0) {
      writer.uint32(8).int32(message.channel);
    }
    if (message.resetNumber !== 0) {
      writer.uint32(16).int32(message.resetNumber);
    }
    if (!message.sequence.isZero()) {
      writer.uint32(24).int64(message.sequence);
    }
    if (message.count !== 0) {
      writer.uint32(32).int32(message.count);
    }
    if (message.requestId !== "") {
      writer.uint32(42).string(message.requestId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TCPHistoricalReplayRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTCPHistoricalReplayRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel = reader.int32();
          break;
        case 2:
          message.resetNumber = reader.int32();
          break;
        case 3:
          message.sequence = reader.int64() as Long;
          break;
        case 4:
          message.count = reader.int32();
          break;
        case 5:
          message.requestId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TCPHistoricalReplayRequest {
    return {
      channel: isSet(object.channel) ? Number(object.channel) : 0,
      resetNumber: isSet(object.resetNumber) ? Number(object.resetNumber) : 0,
      sequence: isSet(object.sequence) ? Long.fromValue(object.sequence) : Long.ZERO,
      count: isSet(object.count) ? Number(object.count) : 0,
      requestId: isSet(object.requestId) ? String(object.requestId) : "",
    };
  },

  toJSON(message: TCPHistoricalReplayRequest): unknown {
    const obj: any = {};
    message.channel !== undefined && (obj.channel = Math.round(message.channel));
    message.resetNumber !== undefined && (obj.resetNumber = Math.round(message.resetNumber));
    message.sequence !== undefined && (obj.sequence = (message.sequence || Long.ZERO).toString());
    message.count !== undefined && (obj.count = Math.round(message.count));
    message.requestId !== undefined && (obj.requestId = message.requestId);
    return obj;
  },

  fromPartial(object: DeepPartial<TCPHistoricalReplayRequest>): TCPHistoricalReplayRequest {
    const message = createBaseTCPHistoricalReplayRequest();
    message.channel = object.channel ?? 0;
    message.resetNumber = object.resetNumber ?? 0;
    message.sequence = (object.sequence !== undefined && object.sequence !== null)
      ? Long.fromValue(object.sequence)
      : Long.ZERO;
    message.count = object.count ?? 0;
    message.requestId = object.requestId ?? "";
    return message;
  },
};

function createBaseSnapshotRequest(): SnapshotRequest {
  return { channel: 0, resetNumber: 0, requestId: "", snapshotRequestTypes: [] };
}

export const SnapshotRequest = {
  encode(message: SnapshotRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel !== 0) {
      writer.uint32(8).int32(message.channel);
    }
    if (message.resetNumber !== 0) {
      writer.uint32(16).int32(message.resetNumber);
    }
    if (message.requestId !== "") {
      writer.uint32(26).string(message.requestId);
    }
    writer.uint32(34).fork();
    for (const v of message.snapshotRequestTypes) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SnapshotRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnapshotRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel = reader.int32();
          break;
        case 2:
          message.resetNumber = reader.int32();
          break;
        case 3:
          message.requestId = reader.string();
          break;
        case 4:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.snapshotRequestTypes.push(reader.int32() as any);
            }
          } else {
            message.snapshotRequestTypes.push(reader.int32() as any);
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SnapshotRequest {
    return {
      channel: isSet(object.channel) ? Number(object.channel) : 0,
      resetNumber: isSet(object.resetNumber) ? Number(object.resetNumber) : 0,
      requestId: isSet(object.requestId) ? String(object.requestId) : "",
      snapshotRequestTypes: Array.isArray(object?.snapshotRequestTypes)
        ? object.snapshotRequestTypes.map((e: any) => snapshotRequest_SnapshotRequestTypeFromJSON(e))
        : [],
    };
  },

  toJSON(message: SnapshotRequest): unknown {
    const obj: any = {};
    message.channel !== undefined && (obj.channel = Math.round(message.channel));
    message.resetNumber !== undefined && (obj.resetNumber = Math.round(message.resetNumber));
    message.requestId !== undefined && (obj.requestId = message.requestId);
    if (message.snapshotRequestTypes) {
      obj.snapshotRequestTypes = message.snapshotRequestTypes.map((e) => snapshotRequest_SnapshotRequestTypeToJSON(e));
    } else {
      obj.snapshotRequestTypes = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<SnapshotRequest>): SnapshotRequest {
    const message = createBaseSnapshotRequest();
    message.channel = object.channel ?? 0;
    message.resetNumber = object.resetNumber ?? 0;
    message.requestId = object.requestId ?? "";
    message.snapshotRequestTypes = object.snapshotRequestTypes?.map((e) => e) || [];
    return message;
  },
};

function createBaseVolumeAtPrice(): VolumeAtPrice {
  return {
    marketId: Long.ZERO,
    symbol: "",
    transactionTime: Long.ZERO,
    lastPrice: Long.ZERO,
    lastQuantity: Long.ZERO,
    lastCumulativeVolume: Long.ZERO,
    tradeDate: 0,
    priceVolumes: [],
  };
}

export const VolumeAtPrice = {
  encode(message: VolumeAtPrice, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.marketId.isZero()) {
      writer.uint32(8).sint64(message.marketId);
    }
    if (message.symbol !== "") {
      writer.uint32(18).string(message.symbol);
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(24).sint64(message.transactionTime);
    }
    if (!message.lastPrice.isZero()) {
      writer.uint32(32).sint64(message.lastPrice);
    }
    if (!message.lastQuantity.isZero()) {
      writer.uint32(40).sint64(message.lastQuantity);
    }
    if (!message.lastCumulativeVolume.isZero()) {
      writer.uint32(48).sint64(message.lastCumulativeVolume);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(56).sint32(message.tradeDate);
    }
    for (const v of message.priceVolumes) {
      VolumeAtPrice_PriceLevelVolume.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VolumeAtPrice {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVolumeAtPrice();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader.sint64() as Long;
          break;
        case 2:
          message.symbol = reader.string();
          break;
        case 3:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 4:
          message.lastPrice = reader.sint64() as Long;
          break;
        case 5:
          message.lastQuantity = reader.sint64() as Long;
          break;
        case 6:
          message.lastCumulativeVolume = reader.sint64() as Long;
          break;
        case 7:
          message.tradeDate = reader.sint32();
          break;
        case 8:
          message.priceVolumes.push(VolumeAtPrice_PriceLevelVolume.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VolumeAtPrice {
    return {
      marketId: isSet(object.marketId) ? Long.fromValue(object.marketId) : Long.ZERO,
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      lastPrice: isSet(object.lastPrice) ? Long.fromValue(object.lastPrice) : Long.ZERO,
      lastQuantity: isSet(object.lastQuantity) ? Long.fromValue(object.lastQuantity) : Long.ZERO,
      lastCumulativeVolume: isSet(object.lastCumulativeVolume)
        ? Long.fromValue(object.lastCumulativeVolume)
        : Long.ZERO,
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      priceVolumes: Array.isArray(object?.priceVolumes)
        ? object.priceVolumes.map((e: any) => VolumeAtPrice_PriceLevelVolume.fromJSON(e))
        : [],
    };
  },

  toJSON(message: VolumeAtPrice): unknown {
    const obj: any = {};
    message.marketId !== undefined && (obj.marketId = (message.marketId || Long.ZERO).toString());
    message.symbol !== undefined && (obj.symbol = message.symbol);
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.lastPrice !== undefined && (obj.lastPrice = (message.lastPrice || Long.ZERO).toString());
    message.lastQuantity !== undefined && (obj.lastQuantity = (message.lastQuantity || Long.ZERO).toString());
    message.lastCumulativeVolume !== undefined &&
      (obj.lastCumulativeVolume = (message.lastCumulativeVolume || Long.ZERO).toString());
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    if (message.priceVolumes) {
      obj.priceVolumes = message.priceVolumes.map((e) => e ? VolumeAtPrice_PriceLevelVolume.toJSON(e) : undefined);
    } else {
      obj.priceVolumes = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<VolumeAtPrice>): VolumeAtPrice {
    const message = createBaseVolumeAtPrice();
    message.marketId = (object.marketId !== undefined && object.marketId !== null)
      ? Long.fromValue(object.marketId)
      : Long.ZERO;
    message.symbol = object.symbol ?? "";
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.lastPrice = (object.lastPrice !== undefined && object.lastPrice !== null)
      ? Long.fromValue(object.lastPrice)
      : Long.ZERO;
    message.lastQuantity = (object.lastQuantity !== undefined && object.lastQuantity !== null)
      ? Long.fromValue(object.lastQuantity)
      : Long.ZERO;
    message.lastCumulativeVolume = (object.lastCumulativeVolume !== undefined && object.lastCumulativeVolume !== null)
      ? Long.fromValue(object.lastCumulativeVolume)
      : Long.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.priceVolumes = object.priceVolumes?.map((e) => VolumeAtPrice_PriceLevelVolume.fromPartial(e)) || [];
    return message;
  },
};

function createBaseVolumeAtPrice_PriceLevelVolume(): VolumeAtPrice_PriceLevelVolume {
  return { price: Long.ZERO, volume: Long.ZERO };
}

export const VolumeAtPrice_PriceLevelVolume = {
  encode(message: VolumeAtPrice_PriceLevelVolume, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.price.isZero()) {
      writer.uint32(8).sint64(message.price);
    }
    if (!message.volume.isZero()) {
      writer.uint32(16).sint64(message.volume);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VolumeAtPrice_PriceLevelVolume {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVolumeAtPrice_PriceLevelVolume();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.price = reader.sint64() as Long;
          break;
        case 2:
          message.volume = reader.sint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VolumeAtPrice_PriceLevelVolume {
    return {
      price: isSet(object.price) ? Long.fromValue(object.price) : Long.ZERO,
      volume: isSet(object.volume) ? Long.fromValue(object.volume) : Long.ZERO,
    };
  },

  toJSON(message: VolumeAtPrice_PriceLevelVolume): unknown {
    const obj: any = {};
    message.price !== undefined && (obj.price = (message.price || Long.ZERO).toString());
    message.volume !== undefined && (obj.volume = (message.volume || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<VolumeAtPrice_PriceLevelVolume>): VolumeAtPrice_PriceLevelVolume {
    const message = createBaseVolumeAtPrice_PriceLevelVolume();
    message.price = (object.price !== undefined && object.price !== null) ? Long.fromValue(object.price) : Long.ZERO;
    message.volume = (object.volume !== undefined && object.volume !== null)
      ? Long.fromValue(object.volume)
      : Long.ZERO;
    return message;
  },
};

function createBaseOhlc(): Ohlc {
  return {
    marketId: Long.ZERO,
    symbol: "",
    open: undefined,
    high: undefined,
    low: undefined,
    close: undefined,
    volume: Long.ZERO,
    priceVolume: 0,
    numberTrades: Long.ZERO,
    tradeDate: 0,
    transactionTime: Long.ZERO,
    tradeIds: [],
    openStartTime: Long.ZERO,
    closeEndTime: Long.ZERO,
  };
}

export const Ohlc = {
  encode(message: Ohlc, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.marketId.isZero()) {
      writer.uint32(8).sint64(message.marketId);
    }
    if (message.symbol !== "") {
      writer.uint32(18).string(message.symbol);
    }
    if (message.open !== undefined) {
      Open.encode(message.open, writer.uint32(26).fork()).ldelim();
    }
    if (message.high !== undefined) {
      High.encode(message.high, writer.uint32(34).fork()).ldelim();
    }
    if (message.low !== undefined) {
      Low.encode(message.low, writer.uint32(42).fork()).ldelim();
    }
    if (message.close !== undefined) {
      Close.encode(message.close, writer.uint32(50).fork()).ldelim();
    }
    if (!message.volume.isZero()) {
      writer.uint32(56).sint64(message.volume);
    }
    if (message.priceVolume !== 0) {
      writer.uint32(65).double(message.priceVolume);
    }
    if (!message.numberTrades.isZero()) {
      writer.uint32(72).sint64(message.numberTrades);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(80).sint32(message.tradeDate);
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(88).sint64(message.transactionTime);
    }
    for (const v of message.tradeIds) {
      writer.uint32(98).string(v!);
    }
    if (!message.openStartTime.isZero()) {
      writer.uint32(104).sint64(message.openStartTime);
    }
    if (!message.closeEndTime.isZero()) {
      writer.uint32(112).sint64(message.closeEndTime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Ohlc {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOhlc();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader.sint64() as Long;
          break;
        case 2:
          message.symbol = reader.string();
          break;
        case 3:
          message.open = Open.decode(reader, reader.uint32());
          break;
        case 4:
          message.high = High.decode(reader, reader.uint32());
          break;
        case 5:
          message.low = Low.decode(reader, reader.uint32());
          break;
        case 6:
          message.close = Close.decode(reader, reader.uint32());
          break;
        case 7:
          message.volume = reader.sint64() as Long;
          break;
        case 8:
          message.priceVolume = reader.double();
          break;
        case 9:
          message.numberTrades = reader.sint64() as Long;
          break;
        case 10:
          message.tradeDate = reader.sint32();
          break;
        case 11:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 12:
          message.tradeIds.push(reader.string());
          break;
        case 13:
          message.openStartTime = reader.sint64() as Long;
          break;
        case 14:
          message.closeEndTime = reader.sint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Ohlc {
    return {
      marketId: isSet(object.marketId) ? Long.fromValue(object.marketId) : Long.ZERO,
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      open: isSet(object.open) ? Open.fromJSON(object.open) : undefined,
      high: isSet(object.high) ? High.fromJSON(object.high) : undefined,
      low: isSet(object.low) ? Low.fromJSON(object.low) : undefined,
      close: isSet(object.close) ? Close.fromJSON(object.close) : undefined,
      volume: isSet(object.volume) ? Long.fromValue(object.volume) : Long.ZERO,
      priceVolume: isSet(object.priceVolume) ? Number(object.priceVolume) : 0,
      numberTrades: isSet(object.numberTrades) ? Long.fromValue(object.numberTrades) : Long.ZERO,
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeIds: Array.isArray(object?.tradeIds) ? object.tradeIds.map((e: any) => String(e)) : [],
      openStartTime: isSet(object.openStartTime) ? Long.fromValue(object.openStartTime) : Long.ZERO,
      closeEndTime: isSet(object.closeEndTime) ? Long.fromValue(object.closeEndTime) : Long.ZERO,
    };
  },

  toJSON(message: Ohlc): unknown {
    const obj: any = {};
    message.marketId !== undefined && (obj.marketId = (message.marketId || Long.ZERO).toString());
    message.symbol !== undefined && (obj.symbol = message.symbol);
    message.open !== undefined && (obj.open = message.open ? Open.toJSON(message.open) : undefined);
    message.high !== undefined && (obj.high = message.high ? High.toJSON(message.high) : undefined);
    message.low !== undefined && (obj.low = message.low ? Low.toJSON(message.low) : undefined);
    message.close !== undefined && (obj.close = message.close ? Close.toJSON(message.close) : undefined);
    message.volume !== undefined && (obj.volume = (message.volume || Long.ZERO).toString());
    message.priceVolume !== undefined && (obj.priceVolume = message.priceVolume);
    message.numberTrades !== undefined && (obj.numberTrades = (message.numberTrades || Long.ZERO).toString());
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    if (message.tradeIds) {
      obj.tradeIds = message.tradeIds.map((e) => e);
    } else {
      obj.tradeIds = [];
    }
    message.openStartTime !== undefined && (obj.openStartTime = (message.openStartTime || Long.ZERO).toString());
    message.closeEndTime !== undefined && (obj.closeEndTime = (message.closeEndTime || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<Ohlc>): Ohlc {
    const message = createBaseOhlc();
    message.marketId = (object.marketId !== undefined && object.marketId !== null)
      ? Long.fromValue(object.marketId)
      : Long.ZERO;
    message.symbol = object.symbol ?? "";
    message.open = (object.open !== undefined && object.open !== null) ? Open.fromPartial(object.open) : undefined;
    message.high = (object.high !== undefined && object.high !== null) ? High.fromPartial(object.high) : undefined;
    message.low = (object.low !== undefined && object.low !== null) ? Low.fromPartial(object.low) : undefined;
    message.close = (object.close !== undefined && object.close !== null) ? Close.fromPartial(object.close) : undefined;
    message.volume = (object.volume !== undefined && object.volume !== null)
      ? Long.fromValue(object.volume)
      : Long.ZERO;
    message.priceVolume = object.priceVolume ?? 0;
    message.numberTrades = (object.numberTrades !== undefined && object.numberTrades !== null)
      ? Long.fromValue(object.numberTrades)
      : Long.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.tradeIds = object.tradeIds?.map((e) => e) || [];
    message.openStartTime = (object.openStartTime !== undefined && object.openStartTime !== null)
      ? Long.fromValue(object.openStartTime)
      : Long.ZERO;
    message.closeEndTime = (object.closeEndTime !== undefined && object.closeEndTime !== null)
      ? Long.fromValue(object.closeEndTime)
      : Long.ZERO;
    return message;
  },
};

function createBaseInstrumentAction(): InstrumentAction {
  return {
    transactionTime: Long.ZERO,
    tradeDate: 0,
    action: 0,
    message: "",
    instrument: undefined,
    newInstrument: undefined,
  };
}

export const InstrumentAction = {
  encode(message: InstrumentAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.transactionTime.isZero()) {
      writer.uint32(8).sint64(message.transactionTime);
    }
    if (message.tradeDate !== 0) {
      writer.uint32(16).sint32(message.tradeDate);
    }
    if (message.action !== 0) {
      writer.uint32(24).int32(message.action);
    }
    if (message.message !== "") {
      writer.uint32(34).string(message.message);
    }
    if (message.instrument !== undefined) {
      InstrumentDefinition.encode(message.instrument, writer.uint32(82).fork()).ldelim();
    }
    if (message.newInstrument !== undefined) {
      InstrumentDefinition.encode(message.newInstrument, writer.uint32(90).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentAction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstrumentAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 2:
          message.tradeDate = reader.sint32();
          break;
        case 3:
          message.action = reader.int32() as any;
          break;
        case 4:
          message.message = reader.string();
          break;
        case 10:
          message.instrument = InstrumentDefinition.decode(reader, reader.uint32());
          break;
        case 11:
          message.newInstrument = InstrumentDefinition.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InstrumentAction {
    return {
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      tradeDate: isSet(object.tradeDate) ? Number(object.tradeDate) : 0,
      action: isSet(object.action) ? actionTypeFromJSON(object.action) : 0,
      message: isSet(object.message) ? String(object.message) : "",
      instrument: isSet(object.instrument) ? InstrumentDefinition.fromJSON(object.instrument) : undefined,
      newInstrument: isSet(object.newInstrument) ? InstrumentDefinition.fromJSON(object.newInstrument) : undefined,
    };
  },

  toJSON(message: InstrumentAction): unknown {
    const obj: any = {};
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.tradeDate !== undefined && (obj.tradeDate = Math.round(message.tradeDate));
    message.action !== undefined && (obj.action = actionTypeToJSON(message.action));
    message.message !== undefined && (obj.message = message.message);
    message.instrument !== undefined &&
      (obj.instrument = message.instrument ? InstrumentDefinition.toJSON(message.instrument) : undefined);
    message.newInstrument !== undefined &&
      (obj.newInstrument = message.newInstrument ? InstrumentDefinition.toJSON(message.newInstrument) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<InstrumentAction>): InstrumentAction {
    const message = createBaseInstrumentAction();
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.tradeDate = object.tradeDate ?? 0;
    message.action = object.action ?? 0;
    message.message = object.message ?? "";
    message.instrument = (object.instrument !== undefined && object.instrument !== null)
      ? InstrumentDefinition.fromPartial(object.instrument)
      : undefined;
    message.newInstrument = (object.newInstrument !== undefined && object.newInstrument !== null)
      ? InstrumentDefinition.fromPartial(object.newInstrument)
      : undefined;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
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
