/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "org.openfeed";

export interface InstrumentDefinition {
  /** / Unique ID used in the data feed. */
  marketId: Long;
  /** / Instrument type as enum... */
  instrumentType: InstrumentDefinition_InstrumentType;
  /** / Supported Book Types */
  supportBookTypes: InstrumentDefinition_BookType[];
  /** / Maximum depth of market-by-price order book */
  bookDepth: number;
  /** / The name of the market data vendor */
  vendorId: string;
  /**
   * / Human readable market symbol, assigned by the exchange or venue.
   * Not necessarily unique as the exchange or vendor could assign the same symbol to different
   * instruments, for example if the instruments trade on different exchanges.
   */
  symbol: string;
  /** / Human readable market description. */
  description: string;
  /** / Market CFI code: http://en.wikipedia.org/wiki/ISO_10962 */
  cfiCode: string;
  /** / Market currency code: http://en.wikipedia.org/wiki/ISO_4217 */
  currencyCode: string;
  /**
   * Market exchange code: http://en.wikipedia.org/wiki/ISO_10383
   * For inter-exchange spreads, use the leg MICs separated by a hyphen
   */
  exchangeCode: string;
  /** / Minimum price increment in market currency. */
  minimumPriceIncrement: number;
  /** / Contract point value in market currency. */
  contractPointValue: number;
  /** / Trading schedule for a typical week */
  schedule:
    | InstrumentDefinition_Schedule
    | undefined;
  /** / Trading calendar (expiration, notice days, holidays?, etc) */
  calendar:
    | InstrumentDefinition_Calendar
    | undefined;
  /** / UTC Timestamp of creation, nano seconds since Unix epoch */
  recordCreateTime: Long;
  /** / UTC Timestamp of update, nano seconds since Unix epoch */
  recordUpdateTime: Long;
  /**
   * / Market time zone TZ database name.
   * Permanent. Can be resolved into timeZoneOffset for given date/time.
   * See http://joda-time.sourceforge.net/timezones.html
   * See http://en.wikipedia.org/wiki/List_of_tz_database_time_zones
   */
  timeZoneName: string;
  /** / Identifies a logical grouping of instruments. By product, for example. */
  instrumentGroup: string;
  /** / The Date of expiration for futures and options. */
  symbolExpiration:
    | InstrumentDefinition_MaturityDate
    | undefined;
  /**
   * / active: can have market state updates, can have historical data
   * passive: can NOT have market state updates, but can have historical data
   * normally "active" means newly listed or currently non expired markets
   * normally "passive" means expired options, de-listed equities, etc.
   */
  state: InstrumentDefinition_State;
  /** / The channel that updates for this instrument will appear on. */
  channel: number;
  /**
   * / The marketId of the underlying asset.
   * Used by Futures and Options when the underlying instrument is defined by the vendor
   */
  underlyingMarketId: Long;
  /** / Display format */
  priceFormat:
    | InstrumentDefinition_PriceFormat
    | undefined;
  /** / Strike price display format */
  optionStrikePriceFormat:
    | InstrumentDefinition_PriceFormat
    | undefined;
  /** / Divide prices by this value to get real price values */
  priceDenominator: number;
  /** / Divide trade quantities by this value to get real quantities */
  quantityDenominator: number;
  /** / true if this is a tradable instrument */
  isTradable: boolean;
  /** / UTC timestamp of transaction, nano seconds since Unix epoch */
  transactionTime: Long;
  /** / For internal use only.   Ignore */
  auxiliaryData: Uint8Array;
  /**
   * / List of alternate symbols for this instrument.  A single instrument
   * may be provided by many different market data vendors, each with
   * their own unique symbology. Allows this instrument to be tagged
   * with as many vendor symbols as necessary.
   */
  symbols: InstrumentDefinition_Symbol[];
  /**
   * / Option strike price in market currency.  Multiply by
   * / factorOptionsStrike to get actual strike
   */
  optionStrike: Long;
  /** / Option type: call vs put. */
  optionType: InstrumentDefinition_OptionType;
  /** / Option style : American vs European. */
  optionStyle: InstrumentDefinition_OptionStyle;
  /** / Divide optionStrike by this value to get real strike price */
  optionStrikeDenominator: number;
  /** / Spread type, can be vendor specific */
  spreadCode: string;
  /** / Ordered list of underlying legs in a spread. */
  spreadLeg: InstrumentDefinition_SpreadLeg[];
  /** / true if user defined spread */
  userDefinedSpread: boolean;
  /** / Listing market classification */
  marketTier: string;
  /** / Current financial status of the issuer */
  financialStatusIndicator: string;
  /** / ISIN: https://en.wikipedia.org/wiki/International_Securities_Identification_Number */
  isin: string;
  /** / Break out of currency pair */
  currencyPair:
    | InstrumentDefinition_CurrencyPair
    | undefined;
  /** / true if exchange sends volume. */
  exchangeSendsVolume: boolean;
  /** / true if exchange sends high. */
  exchangeSendsHigh: boolean;
  /** / true if exchange sends low. */
  exchangeSendsLow: boolean;
  /** / true if exchange sends open. */
  exchangeSendsOpen: boolean;
  /** / true if this instrument represents consolidated NBBO. */
  consolidatedFeedInstrument: boolean;
  /** / true if this instrument represents Pit symbol. */
  openOutcryInstrument: boolean;
  /** / true if this instrument generated FX option. */
  syntheticAmericanOptionInstrument: boolean;
  /** / */
  barchartExchangeCode: string;
  /** / */
  barchartBaseCode: string;
  /** / */
  volumeDenominator: number;
  /** / */
  bidOfferQuantityDenominator: number;
  /** / */
  primaryListingMarketParticipantId: string;
  /** / */
  subscriptionSymbol: string;
  /** / The Month/ Day of expiration for futures and options. Corresponds to the expiration month. */
  contractMaturity: InstrumentDefinition_MaturityDate | undefined;
  underlying: string;
  commodity: string;
}

/** ############################################# */
export enum InstrumentDefinition_InstrumentType {
  UNKNOWN_INSTRUMENT_TYPE = 0,
  FOREX = 1,
  INDEX = 2,
  EQUITY = 3,
  FUTURE = 4,
  OPTION = 5,
  SPREAD = 6,
  MUTUAL_FUND = 7,
  MONEY_MARKET_FUND = 8,
  USER_DEFINED_SPREAD = 9,
  EQUITY_OPTION = 10,
  UNRECOGNIZED = -1,
}

export function instrumentDefinition_InstrumentTypeFromJSON(object: any): InstrumentDefinition_InstrumentType {
  switch (object) {
    case 0:
    case "UNKNOWN_INSTRUMENT_TYPE":
      return InstrumentDefinition_InstrumentType.UNKNOWN_INSTRUMENT_TYPE;
    case 1:
    case "FOREX":
      return InstrumentDefinition_InstrumentType.FOREX;
    case 2:
    case "INDEX":
      return InstrumentDefinition_InstrumentType.INDEX;
    case 3:
    case "EQUITY":
      return InstrumentDefinition_InstrumentType.EQUITY;
    case 4:
    case "FUTURE":
      return InstrumentDefinition_InstrumentType.FUTURE;
    case 5:
    case "OPTION":
      return InstrumentDefinition_InstrumentType.OPTION;
    case 6:
    case "SPREAD":
      return InstrumentDefinition_InstrumentType.SPREAD;
    case 7:
    case "MUTUAL_FUND":
      return InstrumentDefinition_InstrumentType.MUTUAL_FUND;
    case 8:
    case "MONEY_MARKET_FUND":
      return InstrumentDefinition_InstrumentType.MONEY_MARKET_FUND;
    case 9:
    case "USER_DEFINED_SPREAD":
      return InstrumentDefinition_InstrumentType.USER_DEFINED_SPREAD;
    case 10:
    case "EQUITY_OPTION":
      return InstrumentDefinition_InstrumentType.EQUITY_OPTION;
    case -1:
    case "UNRECOGNIZED":
    default:
      return InstrumentDefinition_InstrumentType.UNRECOGNIZED;
  }
}

export function instrumentDefinition_InstrumentTypeToJSON(object: InstrumentDefinition_InstrumentType): string {
  switch (object) {
    case InstrumentDefinition_InstrumentType.UNKNOWN_INSTRUMENT_TYPE:
      return "UNKNOWN_INSTRUMENT_TYPE";
    case InstrumentDefinition_InstrumentType.FOREX:
      return "FOREX";
    case InstrumentDefinition_InstrumentType.INDEX:
      return "INDEX";
    case InstrumentDefinition_InstrumentType.EQUITY:
      return "EQUITY";
    case InstrumentDefinition_InstrumentType.FUTURE:
      return "FUTURE";
    case InstrumentDefinition_InstrumentType.OPTION:
      return "OPTION";
    case InstrumentDefinition_InstrumentType.SPREAD:
      return "SPREAD";
    case InstrumentDefinition_InstrumentType.MUTUAL_FUND:
      return "MUTUAL_FUND";
    case InstrumentDefinition_InstrumentType.MONEY_MARKET_FUND:
      return "MONEY_MARKET_FUND";
    case InstrumentDefinition_InstrumentType.USER_DEFINED_SPREAD:
      return "USER_DEFINED_SPREAD";
    case InstrumentDefinition_InstrumentType.EQUITY_OPTION:
      return "EQUITY_OPTION";
    case InstrumentDefinition_InstrumentType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** / Market depth implementation type */
export enum InstrumentDefinition_BookType {
  UNKNOWN_BOOK_TYPE = 0,
  /** TOP_OF_BOOK - BBO */
  TOP_OF_BOOK = 1,
  /** PRICE_LEVEL_DEPTH - Book uses price level */
  PRICE_LEVEL_DEPTH = 2,
  /** ORDER_DEPTH - Book uses order-id */
  ORDER_DEPTH = 3,
  UNRECOGNIZED = -1,
}

export function instrumentDefinition_BookTypeFromJSON(object: any): InstrumentDefinition_BookType {
  switch (object) {
    case 0:
    case "UNKNOWN_BOOK_TYPE":
      return InstrumentDefinition_BookType.UNKNOWN_BOOK_TYPE;
    case 1:
    case "TOP_OF_BOOK":
      return InstrumentDefinition_BookType.TOP_OF_BOOK;
    case 2:
    case "PRICE_LEVEL_DEPTH":
      return InstrumentDefinition_BookType.PRICE_LEVEL_DEPTH;
    case 3:
    case "ORDER_DEPTH":
      return InstrumentDefinition_BookType.ORDER_DEPTH;
    case -1:
    case "UNRECOGNIZED":
    default:
      return InstrumentDefinition_BookType.UNRECOGNIZED;
  }
}

export function instrumentDefinition_BookTypeToJSON(object: InstrumentDefinition_BookType): string {
  switch (object) {
    case InstrumentDefinition_BookType.UNKNOWN_BOOK_TYPE:
      return "UNKNOWN_BOOK_TYPE";
    case InstrumentDefinition_BookType.TOP_OF_BOOK:
      return "TOP_OF_BOOK";
    case InstrumentDefinition_BookType.PRICE_LEVEL_DEPTH:
      return "PRICE_LEVEL_DEPTH";
    case InstrumentDefinition_BookType.ORDER_DEPTH:
      return "ORDER_DEPTH";
    case InstrumentDefinition_BookType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** / Option type. */
export enum InstrumentDefinition_OptionType {
  UNKNOWN_OPTION_TYPE = 0,
  CALL = 1,
  PUT = 2,
  UNRECOGNIZED = -1,
}

export function instrumentDefinition_OptionTypeFromJSON(object: any): InstrumentDefinition_OptionType {
  switch (object) {
    case 0:
    case "UNKNOWN_OPTION_TYPE":
      return InstrumentDefinition_OptionType.UNKNOWN_OPTION_TYPE;
    case 1:
    case "CALL":
      return InstrumentDefinition_OptionType.CALL;
    case 2:
    case "PUT":
      return InstrumentDefinition_OptionType.PUT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return InstrumentDefinition_OptionType.UNRECOGNIZED;
  }
}

export function instrumentDefinition_OptionTypeToJSON(object: InstrumentDefinition_OptionType): string {
  switch (object) {
    case InstrumentDefinition_OptionType.UNKNOWN_OPTION_TYPE:
      return "UNKNOWN_OPTION_TYPE";
    case InstrumentDefinition_OptionType.CALL:
      return "CALL";
    case InstrumentDefinition_OptionType.PUT:
      return "PUT";
    case InstrumentDefinition_OptionType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** / Option style. */
export enum InstrumentDefinition_OptionStyle {
  UNKNOWN_OPTIONS_STYLE = 0,
  DEFAULT = 1,
  AMERICAN = 2,
  EUROPEAN = 3,
  UNRECOGNIZED = -1,
}

export function instrumentDefinition_OptionStyleFromJSON(object: any): InstrumentDefinition_OptionStyle {
  switch (object) {
    case 0:
    case "UNKNOWN_OPTIONS_STYLE":
      return InstrumentDefinition_OptionStyle.UNKNOWN_OPTIONS_STYLE;
    case 1:
    case "DEFAULT":
      return InstrumentDefinition_OptionStyle.DEFAULT;
    case 2:
    case "AMERICAN":
      return InstrumentDefinition_OptionStyle.AMERICAN;
    case 3:
    case "EUROPEAN":
      return InstrumentDefinition_OptionStyle.EUROPEAN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return InstrumentDefinition_OptionStyle.UNRECOGNIZED;
  }
}

export function instrumentDefinition_OptionStyleToJSON(object: InstrumentDefinition_OptionStyle): string {
  switch (object) {
    case InstrumentDefinition_OptionStyle.UNKNOWN_OPTIONS_STYLE:
      return "UNKNOWN_OPTIONS_STYLE";
    case InstrumentDefinition_OptionStyle.DEFAULT:
      return "DEFAULT";
    case InstrumentDefinition_OptionStyle.AMERICAN:
      return "AMERICAN";
    case InstrumentDefinition_OptionStyle.EUROPEAN:
      return "EUROPEAN";
    case InstrumentDefinition_OptionStyle.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum InstrumentDefinition_State {
  UNKNOWN_STATE = 0,
  ACTIVE = 1,
  PASSIVE = 2,
  UNRECOGNIZED = -1,
}

export function instrumentDefinition_StateFromJSON(object: any): InstrumentDefinition_State {
  switch (object) {
    case 0:
    case "UNKNOWN_STATE":
      return InstrumentDefinition_State.UNKNOWN_STATE;
    case 1:
    case "ACTIVE":
      return InstrumentDefinition_State.ACTIVE;
    case 2:
    case "PASSIVE":
      return InstrumentDefinition_State.PASSIVE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return InstrumentDefinition_State.UNRECOGNIZED;
  }
}

export function instrumentDefinition_StateToJSON(object: InstrumentDefinition_State): string {
  switch (object) {
    case InstrumentDefinition_State.UNKNOWN_STATE:
      return "UNKNOWN_STATE";
    case InstrumentDefinition_State.ACTIVE:
      return "ACTIVE";
    case InstrumentDefinition_State.PASSIVE:
      return "PASSIVE";
    case InstrumentDefinition_State.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum InstrumentDefinition_EventType {
  UNKNOWN_EVENT_TYPE = 0,
  /** FIRST_TRADE_DATE - All instruments */
  FIRST_TRADE_DATE = 1,
  LAST_TRADE_DATE = 2,
  /** MATURITY_DATE - Futures only */
  MATURITY_DATE = 10,
  FIRST_DELIVERY_DATE = 11,
  LAST_DELIVERY_DATE = 12,
  FIRST_NOTICE_DATE = 13,
  LAST_NOTICE_DATE = 14,
  FIRST_HOLDING_DATE = 15,
  LAST_HOLDING_DATE = 16,
  FIRST_POSITION_DATE = 17,
  LAST_POSITION_DATE = 18,
  /** DELIVERY_START_DATE - Grain Bids */
  DELIVERY_START_DATE = 30,
  DELIVERY_END_DATE = 31,
  UNRECOGNIZED = -1,
}

export function instrumentDefinition_EventTypeFromJSON(object: any): InstrumentDefinition_EventType {
  switch (object) {
    case 0:
    case "UNKNOWN_EVENT_TYPE":
      return InstrumentDefinition_EventType.UNKNOWN_EVENT_TYPE;
    case 1:
    case "FIRST_TRADE_DATE":
      return InstrumentDefinition_EventType.FIRST_TRADE_DATE;
    case 2:
    case "LAST_TRADE_DATE":
      return InstrumentDefinition_EventType.LAST_TRADE_DATE;
    case 10:
    case "MATURITY_DATE":
      return InstrumentDefinition_EventType.MATURITY_DATE;
    case 11:
    case "FIRST_DELIVERY_DATE":
      return InstrumentDefinition_EventType.FIRST_DELIVERY_DATE;
    case 12:
    case "LAST_DELIVERY_DATE":
      return InstrumentDefinition_EventType.LAST_DELIVERY_DATE;
    case 13:
    case "FIRST_NOTICE_DATE":
      return InstrumentDefinition_EventType.FIRST_NOTICE_DATE;
    case 14:
    case "LAST_NOTICE_DATE":
      return InstrumentDefinition_EventType.LAST_NOTICE_DATE;
    case 15:
    case "FIRST_HOLDING_DATE":
      return InstrumentDefinition_EventType.FIRST_HOLDING_DATE;
    case 16:
    case "LAST_HOLDING_DATE":
      return InstrumentDefinition_EventType.LAST_HOLDING_DATE;
    case 17:
    case "FIRST_POSITION_DATE":
      return InstrumentDefinition_EventType.FIRST_POSITION_DATE;
    case 18:
    case "LAST_POSITION_DATE":
      return InstrumentDefinition_EventType.LAST_POSITION_DATE;
    case 30:
    case "DELIVERY_START_DATE":
      return InstrumentDefinition_EventType.DELIVERY_START_DATE;
    case 31:
    case "DELIVERY_END_DATE":
      return InstrumentDefinition_EventType.DELIVERY_END_DATE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return InstrumentDefinition_EventType.UNRECOGNIZED;
  }
}

export function instrumentDefinition_EventTypeToJSON(object: InstrumentDefinition_EventType): string {
  switch (object) {
    case InstrumentDefinition_EventType.UNKNOWN_EVENT_TYPE:
      return "UNKNOWN_EVENT_TYPE";
    case InstrumentDefinition_EventType.FIRST_TRADE_DATE:
      return "FIRST_TRADE_DATE";
    case InstrumentDefinition_EventType.LAST_TRADE_DATE:
      return "LAST_TRADE_DATE";
    case InstrumentDefinition_EventType.MATURITY_DATE:
      return "MATURITY_DATE";
    case InstrumentDefinition_EventType.FIRST_DELIVERY_DATE:
      return "FIRST_DELIVERY_DATE";
    case InstrumentDefinition_EventType.LAST_DELIVERY_DATE:
      return "LAST_DELIVERY_DATE";
    case InstrumentDefinition_EventType.FIRST_NOTICE_DATE:
      return "FIRST_NOTICE_DATE";
    case InstrumentDefinition_EventType.LAST_NOTICE_DATE:
      return "LAST_NOTICE_DATE";
    case InstrumentDefinition_EventType.FIRST_HOLDING_DATE:
      return "FIRST_HOLDING_DATE";
    case InstrumentDefinition_EventType.LAST_HOLDING_DATE:
      return "LAST_HOLDING_DATE";
    case InstrumentDefinition_EventType.FIRST_POSITION_DATE:
      return "FIRST_POSITION_DATE";
    case InstrumentDefinition_EventType.LAST_POSITION_DATE:
      return "LAST_POSITION_DATE";
    case InstrumentDefinition_EventType.DELIVERY_START_DATE:
      return "DELIVERY_START_DATE";
    case InstrumentDefinition_EventType.DELIVERY_END_DATE:
      return "DELIVERY_END_DATE";
    case InstrumentDefinition_EventType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** / Typical trading week schedule */
export interface InstrumentDefinition_Schedule {
  sessions: InstrumentDefinition_TimeSpan[];
}

/**
 * / Trading session
 * Times are in nanos since midnight UTC on the Sunday starting a given trading week
 */
export interface InstrumentDefinition_TimeSpan {
  timeStart: Long;
  timeFinish: Long;
}

export interface InstrumentDefinition_Calendar {
  events: InstrumentDefinition_Event[];
}

export interface InstrumentDefinition_Event {
  type: InstrumentDefinition_EventType;
  date: Long;
}

export interface InstrumentDefinition_SpreadLeg {
  /** The marketId of the leg */
  marketId: Long;
  /**
   * The ratio of the this leg with respect to the spread.
   * Negative means short the absolute value, positive means long the absolute value.
   * FIXME? Alternatively, we could have separate LONG/SHORT indicator in the message
   * and use this field as only the absolute value
   */
  ratio: number;
  symbol: string;
  longSymbol: string;
  legOptionDelta: number;
  /**
   * Additional information about the leg will be found in the instrument definition
   * for the leg.  It is not included here to reduce duplication.
   */
  legPrice: number;
}

/** / Date and time with time zone. */
export interface InstrumentDefinition_MaturityDate {
  /** Year of century. */
  year: number;
  /** Month of year. */
  month: number;
  /** Day of month. */
  day: number;
}

/** / A vendor's symbol for an instrument */
export interface InstrumentDefinition_Symbol {
  /** The vendor that provides this symbol. */
  vendor: string;
  /** The symbol assigned by the vendor. */
  symbol: string;
  /** The long symbol assigned by the vendor. Includes 2 char year for futures. */
  longSymbol: string;
}

/** / Recommended display format for prices. */
export interface InstrumentDefinition_PriceFormat {
  isFractional: boolean;
  denominator: number;
  subDenominator: number;
  subFormat: InstrumentDefinition_PriceFormat_SubFormat;
}

export enum InstrumentDefinition_PriceFormat_SubFormat {
  FLAT = 0,
  FRACTIONAL = 1,
  DECIMAL = 2,
  UNRECOGNIZED = -1,
}

export function instrumentDefinition_PriceFormat_SubFormatFromJSON(
  object: any,
): InstrumentDefinition_PriceFormat_SubFormat {
  switch (object) {
    case 0:
    case "FLAT":
      return InstrumentDefinition_PriceFormat_SubFormat.FLAT;
    case 1:
    case "FRACTIONAL":
      return InstrumentDefinition_PriceFormat_SubFormat.FRACTIONAL;
    case 2:
    case "DECIMAL":
      return InstrumentDefinition_PriceFormat_SubFormat.DECIMAL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return InstrumentDefinition_PriceFormat_SubFormat.UNRECOGNIZED;
  }
}

export function instrumentDefinition_PriceFormat_SubFormatToJSON(
  object: InstrumentDefinition_PriceFormat_SubFormat,
): string {
  switch (object) {
    case InstrumentDefinition_PriceFormat_SubFormat.FLAT:
      return "FLAT";
    case InstrumentDefinition_PriceFormat_SubFormat.FRACTIONAL:
      return "FRACTIONAL";
    case InstrumentDefinition_PriceFormat_SubFormat.DECIMAL:
      return "DECIMAL";
    case InstrumentDefinition_PriceFormat_SubFormat.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** / Currency Pair */
export interface InstrumentDefinition_CurrencyPair {
  currency1: string;
  currency2: string;
}

function createBaseInstrumentDefinition(): InstrumentDefinition {
  return {
    marketId: Long.ZERO,
    instrumentType: 0,
    supportBookTypes: [],
    bookDepth: 0,
    vendorId: "",
    symbol: "",
    description: "",
    cfiCode: "",
    currencyCode: "",
    exchangeCode: "",
    minimumPriceIncrement: 0,
    contractPointValue: 0,
    schedule: undefined,
    calendar: undefined,
    recordCreateTime: Long.ZERO,
    recordUpdateTime: Long.ZERO,
    timeZoneName: "",
    instrumentGroup: "",
    symbolExpiration: undefined,
    state: 0,
    channel: 0,
    underlyingMarketId: Long.ZERO,
    priceFormat: undefined,
    optionStrikePriceFormat: undefined,
    priceDenominator: 0,
    quantityDenominator: 0,
    isTradable: false,
    transactionTime: Long.ZERO,
    auxiliaryData: new Uint8Array(),
    symbols: [],
    optionStrike: Long.ZERO,
    optionType: 0,
    optionStyle: 0,
    optionStrikeDenominator: 0,
    spreadCode: "",
    spreadLeg: [],
    userDefinedSpread: false,
    marketTier: "",
    financialStatusIndicator: "",
    isin: "",
    currencyPair: undefined,
    exchangeSendsVolume: false,
    exchangeSendsHigh: false,
    exchangeSendsLow: false,
    exchangeSendsOpen: false,
    consolidatedFeedInstrument: false,
    openOutcryInstrument: false,
    syntheticAmericanOptionInstrument: false,
    barchartExchangeCode: "",
    barchartBaseCode: "",
    volumeDenominator: 0,
    bidOfferQuantityDenominator: 0,
    primaryListingMarketParticipantId: "",
    subscriptionSymbol: "",
    contractMaturity: undefined,
    underlying: "",
    commodity: "",
  };
}

export const InstrumentDefinition = {
  encode(message: InstrumentDefinition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.marketId.isZero()) {
      writer.uint32(8).sint64(message.marketId);
    }
    if (message.instrumentType !== 0) {
      writer.uint32(16).int32(message.instrumentType);
    }
    writer.uint32(26).fork();
    for (const v of message.supportBookTypes) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.bookDepth !== 0) {
      writer.uint32(32).sint32(message.bookDepth);
    }
    if (message.vendorId !== "") {
      writer.uint32(42).string(message.vendorId);
    }
    if (message.symbol !== "") {
      writer.uint32(50).string(message.symbol);
    }
    if (message.description !== "") {
      writer.uint32(58).string(message.description);
    }
    if (message.cfiCode !== "") {
      writer.uint32(66).string(message.cfiCode);
    }
    if (message.currencyCode !== "") {
      writer.uint32(74).string(message.currencyCode);
    }
    if (message.exchangeCode !== "") {
      writer.uint32(82).string(message.exchangeCode);
    }
    if (message.minimumPriceIncrement !== 0) {
      writer.uint32(93).float(message.minimumPriceIncrement);
    }
    if (message.contractPointValue !== 0) {
      writer.uint32(101).float(message.contractPointValue);
    }
    if (message.schedule !== undefined) {
      InstrumentDefinition_Schedule.encode(message.schedule, writer.uint32(106).fork()).ldelim();
    }
    if (message.calendar !== undefined) {
      InstrumentDefinition_Calendar.encode(message.calendar, writer.uint32(114).fork()).ldelim();
    }
    if (!message.recordCreateTime.isZero()) {
      writer.uint32(120).sint64(message.recordCreateTime);
    }
    if (!message.recordUpdateTime.isZero()) {
      writer.uint32(128).sint64(message.recordUpdateTime);
    }
    if (message.timeZoneName !== "") {
      writer.uint32(138).string(message.timeZoneName);
    }
    if (message.instrumentGroup !== "") {
      writer.uint32(146).string(message.instrumentGroup);
    }
    if (message.symbolExpiration !== undefined) {
      InstrumentDefinition_MaturityDate.encode(message.symbolExpiration, writer.uint32(154).fork()).ldelim();
    }
    if (message.state !== 0) {
      writer.uint32(160).int32(message.state);
    }
    if (message.channel !== 0) {
      writer.uint32(168).sint32(message.channel);
    }
    if (!message.underlyingMarketId.isZero()) {
      writer.uint32(176).sint64(message.underlyingMarketId);
    }
    if (message.priceFormat !== undefined) {
      InstrumentDefinition_PriceFormat.encode(message.priceFormat, writer.uint32(186).fork()).ldelim();
    }
    if (message.optionStrikePriceFormat !== undefined) {
      InstrumentDefinition_PriceFormat.encode(message.optionStrikePriceFormat, writer.uint32(194).fork()).ldelim();
    }
    if (message.priceDenominator !== 0) {
      writer.uint32(224).sint32(message.priceDenominator);
    }
    if (message.quantityDenominator !== 0) {
      writer.uint32(232).sint32(message.quantityDenominator);
    }
    if (message.isTradable === true) {
      writer.uint32(240).bool(message.isTradable);
    }
    if (!message.transactionTime.isZero()) {
      writer.uint32(400).sint64(message.transactionTime);
    }
    if (message.auxiliaryData.length !== 0) {
      writer.uint32(794).bytes(message.auxiliaryData);
    }
    for (const v of message.symbols) {
      InstrumentDefinition_Symbol.encode(v!, writer.uint32(802).fork()).ldelim();
    }
    if (!message.optionStrike.isZero()) {
      writer.uint32(1600).sint64(message.optionStrike);
    }
    if (message.optionType !== 0) {
      writer.uint32(1616).int32(message.optionType);
    }
    if (message.optionStyle !== 0) {
      writer.uint32(1624).int32(message.optionStyle);
    }
    if (message.optionStrikeDenominator !== 0) {
      writer.uint32(1632).sint32(message.optionStrikeDenominator);
    }
    if (message.spreadCode !== "") {
      writer.uint32(1682).string(message.spreadCode);
    }
    for (const v of message.spreadLeg) {
      InstrumentDefinition_SpreadLeg.encode(v!, writer.uint32(1690).fork()).ldelim();
    }
    if (message.userDefinedSpread === true) {
      writer.uint32(1696).bool(message.userDefinedSpread);
    }
    if (message.marketTier !== "") {
      writer.uint32(1706).string(message.marketTier);
    }
    if (message.financialStatusIndicator !== "") {
      writer.uint32(1714).string(message.financialStatusIndicator);
    }
    if (message.isin !== "") {
      writer.uint32(1722).string(message.isin);
    }
    if (message.currencyPair !== undefined) {
      InstrumentDefinition_CurrencyPair.encode(message.currencyPair, writer.uint32(1730).fork()).ldelim();
    }
    if (message.exchangeSendsVolume === true) {
      writer.uint32(1736).bool(message.exchangeSendsVolume);
    }
    if (message.exchangeSendsHigh === true) {
      writer.uint32(1744).bool(message.exchangeSendsHigh);
    }
    if (message.exchangeSendsLow === true) {
      writer.uint32(1752).bool(message.exchangeSendsLow);
    }
    if (message.exchangeSendsOpen === true) {
      writer.uint32(1760).bool(message.exchangeSendsOpen);
    }
    if (message.consolidatedFeedInstrument === true) {
      writer.uint32(1768).bool(message.consolidatedFeedInstrument);
    }
    if (message.openOutcryInstrument === true) {
      writer.uint32(1776).bool(message.openOutcryInstrument);
    }
    if (message.syntheticAmericanOptionInstrument === true) {
      writer.uint32(1784).bool(message.syntheticAmericanOptionInstrument);
    }
    if (message.barchartExchangeCode !== "") {
      writer.uint32(1794).string(message.barchartExchangeCode);
    }
    if (message.barchartBaseCode !== "") {
      writer.uint32(1802).string(message.barchartBaseCode);
    }
    if (message.volumeDenominator !== 0) {
      writer.uint32(1808).sint32(message.volumeDenominator);
    }
    if (message.bidOfferQuantityDenominator !== 0) {
      writer.uint32(1816).sint32(message.bidOfferQuantityDenominator);
    }
    if (message.primaryListingMarketParticipantId !== "") {
      writer.uint32(1826).string(message.primaryListingMarketParticipantId);
    }
    if (message.subscriptionSymbol !== "") {
      writer.uint32(1834).string(message.subscriptionSymbol);
    }
    if (message.contractMaturity !== undefined) {
      InstrumentDefinition_MaturityDate.encode(message.contractMaturity, writer.uint32(1842).fork()).ldelim();
    }
    if (message.underlying !== "") {
      writer.uint32(1850).string(message.underlying);
    }
    if (message.commodity !== "") {
      writer.uint32(1858).string(message.commodity);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstrumentDefinition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader.sint64() as Long;
          break;
        case 2:
          message.instrumentType = reader.int32() as any;
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.supportBookTypes.push(reader.int32() as any);
            }
          } else {
            message.supportBookTypes.push(reader.int32() as any);
          }
          break;
        case 4:
          message.bookDepth = reader.sint32();
          break;
        case 5:
          message.vendorId = reader.string();
          break;
        case 6:
          message.symbol = reader.string();
          break;
        case 7:
          message.description = reader.string();
          break;
        case 8:
          message.cfiCode = reader.string();
          break;
        case 9:
          message.currencyCode = reader.string();
          break;
        case 10:
          message.exchangeCode = reader.string();
          break;
        case 11:
          message.minimumPriceIncrement = reader.float();
          break;
        case 12:
          message.contractPointValue = reader.float();
          break;
        case 13:
          message.schedule = InstrumentDefinition_Schedule.decode(reader, reader.uint32());
          break;
        case 14:
          message.calendar = InstrumentDefinition_Calendar.decode(reader, reader.uint32());
          break;
        case 15:
          message.recordCreateTime = reader.sint64() as Long;
          break;
        case 16:
          message.recordUpdateTime = reader.sint64() as Long;
          break;
        case 17:
          message.timeZoneName = reader.string();
          break;
        case 18:
          message.instrumentGroup = reader.string();
          break;
        case 19:
          message.symbolExpiration = InstrumentDefinition_MaturityDate.decode(reader, reader.uint32());
          break;
        case 20:
          message.state = reader.int32() as any;
          break;
        case 21:
          message.channel = reader.sint32();
          break;
        case 22:
          message.underlyingMarketId = reader.sint64() as Long;
          break;
        case 23:
          message.priceFormat = InstrumentDefinition_PriceFormat.decode(reader, reader.uint32());
          break;
        case 24:
          message.optionStrikePriceFormat = InstrumentDefinition_PriceFormat.decode(reader, reader.uint32());
          break;
        case 28:
          message.priceDenominator = reader.sint32();
          break;
        case 29:
          message.quantityDenominator = reader.sint32();
          break;
        case 30:
          message.isTradable = reader.bool();
          break;
        case 50:
          message.transactionTime = reader.sint64() as Long;
          break;
        case 99:
          message.auxiliaryData = reader.bytes();
          break;
        case 100:
          message.symbols.push(InstrumentDefinition_Symbol.decode(reader, reader.uint32()));
          break;
        case 200:
          message.optionStrike = reader.sint64() as Long;
          break;
        case 202:
          message.optionType = reader.int32() as any;
          break;
        case 203:
          message.optionStyle = reader.int32() as any;
          break;
        case 204:
          message.optionStrikeDenominator = reader.sint32();
          break;
        case 210:
          message.spreadCode = reader.string();
          break;
        case 211:
          message.spreadLeg.push(InstrumentDefinition_SpreadLeg.decode(reader, reader.uint32()));
          break;
        case 212:
          message.userDefinedSpread = reader.bool();
          break;
        case 213:
          message.marketTier = reader.string();
          break;
        case 214:
          message.financialStatusIndicator = reader.string();
          break;
        case 215:
          message.isin = reader.string();
          break;
        case 216:
          message.currencyPair = InstrumentDefinition_CurrencyPair.decode(reader, reader.uint32());
          break;
        case 217:
          message.exchangeSendsVolume = reader.bool();
          break;
        case 218:
          message.exchangeSendsHigh = reader.bool();
          break;
        case 219:
          message.exchangeSendsLow = reader.bool();
          break;
        case 220:
          message.exchangeSendsOpen = reader.bool();
          break;
        case 221:
          message.consolidatedFeedInstrument = reader.bool();
          break;
        case 222:
          message.openOutcryInstrument = reader.bool();
          break;
        case 223:
          message.syntheticAmericanOptionInstrument = reader.bool();
          break;
        case 224:
          message.barchartExchangeCode = reader.string();
          break;
        case 225:
          message.barchartBaseCode = reader.string();
          break;
        case 226:
          message.volumeDenominator = reader.sint32();
          break;
        case 227:
          message.bidOfferQuantityDenominator = reader.sint32();
          break;
        case 228:
          message.primaryListingMarketParticipantId = reader.string();
          break;
        case 229:
          message.subscriptionSymbol = reader.string();
          break;
        case 230:
          message.contractMaturity = InstrumentDefinition_MaturityDate.decode(reader, reader.uint32());
          break;
        case 231:
          message.underlying = reader.string();
          break;
        case 232:
          message.commodity = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InstrumentDefinition {
    return {
      marketId: isSet(object.marketId) ? Long.fromValue(object.marketId) : Long.ZERO,
      instrumentType: isSet(object.instrumentType)
        ? instrumentDefinition_InstrumentTypeFromJSON(object.instrumentType)
        : 0,
      supportBookTypes: Array.isArray(object?.supportBookTypes)
        ? object.supportBookTypes.map((e: any) => instrumentDefinition_BookTypeFromJSON(e))
        : [],
      bookDepth: isSet(object.bookDepth) ? Number(object.bookDepth) : 0,
      vendorId: isSet(object.vendorId) ? String(object.vendorId) : "",
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      description: isSet(object.description) ? String(object.description) : "",
      cfiCode: isSet(object.cfiCode) ? String(object.cfiCode) : "",
      currencyCode: isSet(object.currencyCode) ? String(object.currencyCode) : "",
      exchangeCode: isSet(object.exchangeCode) ? String(object.exchangeCode) : "",
      minimumPriceIncrement: isSet(object.minimumPriceIncrement) ? Number(object.minimumPriceIncrement) : 0,
      contractPointValue: isSet(object.contractPointValue) ? Number(object.contractPointValue) : 0,
      schedule: isSet(object.schedule) ? InstrumentDefinition_Schedule.fromJSON(object.schedule) : undefined,
      calendar: isSet(object.calendar) ? InstrumentDefinition_Calendar.fromJSON(object.calendar) : undefined,
      recordCreateTime: isSet(object.recordCreateTime) ? Long.fromValue(object.recordCreateTime) : Long.ZERO,
      recordUpdateTime: isSet(object.recordUpdateTime) ? Long.fromValue(object.recordUpdateTime) : Long.ZERO,
      timeZoneName: isSet(object.timeZoneName) ? String(object.timeZoneName) : "",
      instrumentGroup: isSet(object.instrumentGroup) ? String(object.instrumentGroup) : "",
      symbolExpiration: isSet(object.symbolExpiration)
        ? InstrumentDefinition_MaturityDate.fromJSON(object.symbolExpiration)
        : undefined,
      state: isSet(object.state) ? instrumentDefinition_StateFromJSON(object.state) : 0,
      channel: isSet(object.channel) ? Number(object.channel) : 0,
      underlyingMarketId: isSet(object.underlyingMarketId) ? Long.fromValue(object.underlyingMarketId) : Long.ZERO,
      priceFormat: isSet(object.priceFormat)
        ? InstrumentDefinition_PriceFormat.fromJSON(object.priceFormat)
        : undefined,
      optionStrikePriceFormat: isSet(object.optionStrikePriceFormat)
        ? InstrumentDefinition_PriceFormat.fromJSON(object.optionStrikePriceFormat)
        : undefined,
      priceDenominator: isSet(object.priceDenominator) ? Number(object.priceDenominator) : 0,
      quantityDenominator: isSet(object.quantityDenominator) ? Number(object.quantityDenominator) : 0,
      isTradable: isSet(object.isTradable) ? Boolean(object.isTradable) : false,
      transactionTime: isSet(object.transactionTime) ? Long.fromValue(object.transactionTime) : Long.ZERO,
      auxiliaryData: isSet(object.auxiliaryData) ? bytesFromBase64(object.auxiliaryData) : new Uint8Array(),
      symbols: Array.isArray(object?.symbols)
        ? object.symbols.map((e: any) => InstrumentDefinition_Symbol.fromJSON(e))
        : [],
      optionStrike: isSet(object.optionStrike) ? Long.fromValue(object.optionStrike) : Long.ZERO,
      optionType: isSet(object.optionType) ? instrumentDefinition_OptionTypeFromJSON(object.optionType) : 0,
      optionStyle: isSet(object.optionStyle) ? instrumentDefinition_OptionStyleFromJSON(object.optionStyle) : 0,
      optionStrikeDenominator: isSet(object.optionStrikeDenominator) ? Number(object.optionStrikeDenominator) : 0,
      spreadCode: isSet(object.spreadCode) ? String(object.spreadCode) : "",
      spreadLeg: Array.isArray(object?.spreadLeg)
        ? object.spreadLeg.map((e: any) => InstrumentDefinition_SpreadLeg.fromJSON(e))
        : [],
      userDefinedSpread: isSet(object.userDefinedSpread) ? Boolean(object.userDefinedSpread) : false,
      marketTier: isSet(object.marketTier) ? String(object.marketTier) : "",
      financialStatusIndicator: isSet(object.financialStatusIndicator) ? String(object.financialStatusIndicator) : "",
      isin: isSet(object.isin) ? String(object.isin) : "",
      currencyPair: isSet(object.currencyPair)
        ? InstrumentDefinition_CurrencyPair.fromJSON(object.currencyPair)
        : undefined,
      exchangeSendsVolume: isSet(object.exchangeSendsVolume) ? Boolean(object.exchangeSendsVolume) : false,
      exchangeSendsHigh: isSet(object.exchangeSendsHigh) ? Boolean(object.exchangeSendsHigh) : false,
      exchangeSendsLow: isSet(object.exchangeSendsLow) ? Boolean(object.exchangeSendsLow) : false,
      exchangeSendsOpen: isSet(object.exchangeSendsOpen) ? Boolean(object.exchangeSendsOpen) : false,
      consolidatedFeedInstrument: isSet(object.consolidatedFeedInstrument)
        ? Boolean(object.consolidatedFeedInstrument)
        : false,
      openOutcryInstrument: isSet(object.openOutcryInstrument) ? Boolean(object.openOutcryInstrument) : false,
      syntheticAmericanOptionInstrument: isSet(object.syntheticAmericanOptionInstrument)
        ? Boolean(object.syntheticAmericanOptionInstrument)
        : false,
      barchartExchangeCode: isSet(object.barchartExchangeCode) ? String(object.barchartExchangeCode) : "",
      barchartBaseCode: isSet(object.barchartBaseCode) ? String(object.barchartBaseCode) : "",
      volumeDenominator: isSet(object.volumeDenominator) ? Number(object.volumeDenominator) : 0,
      bidOfferQuantityDenominator: isSet(object.bidOfferQuantityDenominator)
        ? Number(object.bidOfferQuantityDenominator)
        : 0,
      primaryListingMarketParticipantId: isSet(object.primaryListingMarketParticipantId)
        ? String(object.primaryListingMarketParticipantId)
        : "",
      subscriptionSymbol: isSet(object.subscriptionSymbol) ? String(object.subscriptionSymbol) : "",
      contractMaturity: isSet(object.contractMaturity)
        ? InstrumentDefinition_MaturityDate.fromJSON(object.contractMaturity)
        : undefined,
      underlying: isSet(object.underlying) ? String(object.underlying) : "",
      commodity: isSet(object.commodity) ? String(object.commodity) : "",
    };
  },

  toJSON(message: InstrumentDefinition): unknown {
    const obj: any = {};
    message.marketId !== undefined && (obj.marketId = (message.marketId || Long.ZERO).toString());
    message.instrumentType !== undefined &&
      (obj.instrumentType = instrumentDefinition_InstrumentTypeToJSON(message.instrumentType));
    if (message.supportBookTypes) {
      obj.supportBookTypes = message.supportBookTypes.map((e) => instrumentDefinition_BookTypeToJSON(e));
    } else {
      obj.supportBookTypes = [];
    }
    message.bookDepth !== undefined && (obj.bookDepth = Math.round(message.bookDepth));
    message.vendorId !== undefined && (obj.vendorId = message.vendorId);
    message.symbol !== undefined && (obj.symbol = message.symbol);
    message.description !== undefined && (obj.description = message.description);
    message.cfiCode !== undefined && (obj.cfiCode = message.cfiCode);
    message.currencyCode !== undefined && (obj.currencyCode = message.currencyCode);
    message.exchangeCode !== undefined && (obj.exchangeCode = message.exchangeCode);
    message.minimumPriceIncrement !== undefined && (obj.minimumPriceIncrement = message.minimumPriceIncrement);
    message.contractPointValue !== undefined && (obj.contractPointValue = message.contractPointValue);
    message.schedule !== undefined &&
      (obj.schedule = message.schedule ? InstrumentDefinition_Schedule.toJSON(message.schedule) : undefined);
    message.calendar !== undefined &&
      (obj.calendar = message.calendar ? InstrumentDefinition_Calendar.toJSON(message.calendar) : undefined);
    message.recordCreateTime !== undefined &&
      (obj.recordCreateTime = (message.recordCreateTime || Long.ZERO).toString());
    message.recordUpdateTime !== undefined &&
      (obj.recordUpdateTime = (message.recordUpdateTime || Long.ZERO).toString());
    message.timeZoneName !== undefined && (obj.timeZoneName = message.timeZoneName);
    message.instrumentGroup !== undefined && (obj.instrumentGroup = message.instrumentGroup);
    message.symbolExpiration !== undefined && (obj.symbolExpiration = message.symbolExpiration
      ? InstrumentDefinition_MaturityDate.toJSON(message.symbolExpiration)
      : undefined);
    message.state !== undefined && (obj.state = instrumentDefinition_StateToJSON(message.state));
    message.channel !== undefined && (obj.channel = Math.round(message.channel));
    message.underlyingMarketId !== undefined &&
      (obj.underlyingMarketId = (message.underlyingMarketId || Long.ZERO).toString());
    message.priceFormat !== undefined &&
      (obj.priceFormat = message.priceFormat
        ? InstrumentDefinition_PriceFormat.toJSON(message.priceFormat)
        : undefined);
    message.optionStrikePriceFormat !== undefined && (obj.optionStrikePriceFormat = message.optionStrikePriceFormat
      ? InstrumentDefinition_PriceFormat.toJSON(message.optionStrikePriceFormat)
      : undefined);
    message.priceDenominator !== undefined && (obj.priceDenominator = Math.round(message.priceDenominator));
    message.quantityDenominator !== undefined && (obj.quantityDenominator = Math.round(message.quantityDenominator));
    message.isTradable !== undefined && (obj.isTradable = message.isTradable);
    message.transactionTime !== undefined && (obj.transactionTime = (message.transactionTime || Long.ZERO).toString());
    message.auxiliaryData !== undefined &&
      (obj.auxiliaryData = base64FromBytes(
        message.auxiliaryData !== undefined ? message.auxiliaryData : new Uint8Array(),
      ));
    if (message.symbols) {
      obj.symbols = message.symbols.map((e) => e ? InstrumentDefinition_Symbol.toJSON(e) : undefined);
    } else {
      obj.symbols = [];
    }
    message.optionStrike !== undefined && (obj.optionStrike = (message.optionStrike || Long.ZERO).toString());
    message.optionType !== undefined && (obj.optionType = instrumentDefinition_OptionTypeToJSON(message.optionType));
    message.optionStyle !== undefined &&
      (obj.optionStyle = instrumentDefinition_OptionStyleToJSON(message.optionStyle));
    message.optionStrikeDenominator !== undefined &&
      (obj.optionStrikeDenominator = Math.round(message.optionStrikeDenominator));
    message.spreadCode !== undefined && (obj.spreadCode = message.spreadCode);
    if (message.spreadLeg) {
      obj.spreadLeg = message.spreadLeg.map((e) => e ? InstrumentDefinition_SpreadLeg.toJSON(e) : undefined);
    } else {
      obj.spreadLeg = [];
    }
    message.userDefinedSpread !== undefined && (obj.userDefinedSpread = message.userDefinedSpread);
    message.marketTier !== undefined && (obj.marketTier = message.marketTier);
    message.financialStatusIndicator !== undefined && (obj.financialStatusIndicator = message.financialStatusIndicator);
    message.isin !== undefined && (obj.isin = message.isin);
    message.currencyPair !== undefined && (obj.currencyPair = message.currencyPair
      ? InstrumentDefinition_CurrencyPair.toJSON(message.currencyPair)
      : undefined);
    message.exchangeSendsVolume !== undefined && (obj.exchangeSendsVolume = message.exchangeSendsVolume);
    message.exchangeSendsHigh !== undefined && (obj.exchangeSendsHigh = message.exchangeSendsHigh);
    message.exchangeSendsLow !== undefined && (obj.exchangeSendsLow = message.exchangeSendsLow);
    message.exchangeSendsOpen !== undefined && (obj.exchangeSendsOpen = message.exchangeSendsOpen);
    message.consolidatedFeedInstrument !== undefined &&
      (obj.consolidatedFeedInstrument = message.consolidatedFeedInstrument);
    message.openOutcryInstrument !== undefined && (obj.openOutcryInstrument = message.openOutcryInstrument);
    message.syntheticAmericanOptionInstrument !== undefined &&
      (obj.syntheticAmericanOptionInstrument = message.syntheticAmericanOptionInstrument);
    message.barchartExchangeCode !== undefined && (obj.barchartExchangeCode = message.barchartExchangeCode);
    message.barchartBaseCode !== undefined && (obj.barchartBaseCode = message.barchartBaseCode);
    message.volumeDenominator !== undefined && (obj.volumeDenominator = Math.round(message.volumeDenominator));
    message.bidOfferQuantityDenominator !== undefined &&
      (obj.bidOfferQuantityDenominator = Math.round(message.bidOfferQuantityDenominator));
    message.primaryListingMarketParticipantId !== undefined &&
      (obj.primaryListingMarketParticipantId = message.primaryListingMarketParticipantId);
    message.subscriptionSymbol !== undefined && (obj.subscriptionSymbol = message.subscriptionSymbol);
    message.contractMaturity !== undefined && (obj.contractMaturity = message.contractMaturity
      ? InstrumentDefinition_MaturityDate.toJSON(message.contractMaturity)
      : undefined);
    message.underlying !== undefined && (obj.underlying = message.underlying);
    message.commodity !== undefined && (obj.commodity = message.commodity);
    return obj;
  },

  fromPartial(object: DeepPartial<InstrumentDefinition>): InstrumentDefinition {
    const message = createBaseInstrumentDefinition();
    message.marketId = (object.marketId !== undefined && object.marketId !== null)
      ? Long.fromValue(object.marketId)
      : Long.ZERO;
    message.instrumentType = object.instrumentType ?? 0;
    message.supportBookTypes = object.supportBookTypes?.map((e) => e) || [];
    message.bookDepth = object.bookDepth ?? 0;
    message.vendorId = object.vendorId ?? "";
    message.symbol = object.symbol ?? "";
    message.description = object.description ?? "";
    message.cfiCode = object.cfiCode ?? "";
    message.currencyCode = object.currencyCode ?? "";
    message.exchangeCode = object.exchangeCode ?? "";
    message.minimumPriceIncrement = object.minimumPriceIncrement ?? 0;
    message.contractPointValue = object.contractPointValue ?? 0;
    message.schedule = (object.schedule !== undefined && object.schedule !== null)
      ? InstrumentDefinition_Schedule.fromPartial(object.schedule)
      : undefined;
    message.calendar = (object.calendar !== undefined && object.calendar !== null)
      ? InstrumentDefinition_Calendar.fromPartial(object.calendar)
      : undefined;
    message.recordCreateTime = (object.recordCreateTime !== undefined && object.recordCreateTime !== null)
      ? Long.fromValue(object.recordCreateTime)
      : Long.ZERO;
    message.recordUpdateTime = (object.recordUpdateTime !== undefined && object.recordUpdateTime !== null)
      ? Long.fromValue(object.recordUpdateTime)
      : Long.ZERO;
    message.timeZoneName = object.timeZoneName ?? "";
    message.instrumentGroup = object.instrumentGroup ?? "";
    message.symbolExpiration = (object.symbolExpiration !== undefined && object.symbolExpiration !== null)
      ? InstrumentDefinition_MaturityDate.fromPartial(object.symbolExpiration)
      : undefined;
    message.state = object.state ?? 0;
    message.channel = object.channel ?? 0;
    message.underlyingMarketId = (object.underlyingMarketId !== undefined && object.underlyingMarketId !== null)
      ? Long.fromValue(object.underlyingMarketId)
      : Long.ZERO;
    message.priceFormat = (object.priceFormat !== undefined && object.priceFormat !== null)
      ? InstrumentDefinition_PriceFormat.fromPartial(object.priceFormat)
      : undefined;
    message.optionStrikePriceFormat =
      (object.optionStrikePriceFormat !== undefined && object.optionStrikePriceFormat !== null)
        ? InstrumentDefinition_PriceFormat.fromPartial(object.optionStrikePriceFormat)
        : undefined;
    message.priceDenominator = object.priceDenominator ?? 0;
    message.quantityDenominator = object.quantityDenominator ?? 0;
    message.isTradable = object.isTradable ?? false;
    message.transactionTime = (object.transactionTime !== undefined && object.transactionTime !== null)
      ? Long.fromValue(object.transactionTime)
      : Long.ZERO;
    message.auxiliaryData = object.auxiliaryData ?? new Uint8Array();
    message.symbols = object.symbols?.map((e) => InstrumentDefinition_Symbol.fromPartial(e)) || [];
    message.optionStrike = (object.optionStrike !== undefined && object.optionStrike !== null)
      ? Long.fromValue(object.optionStrike)
      : Long.ZERO;
    message.optionType = object.optionType ?? 0;
    message.optionStyle = object.optionStyle ?? 0;
    message.optionStrikeDenominator = object.optionStrikeDenominator ?? 0;
    message.spreadCode = object.spreadCode ?? "";
    message.spreadLeg = object.spreadLeg?.map((e) => InstrumentDefinition_SpreadLeg.fromPartial(e)) || [];
    message.userDefinedSpread = object.userDefinedSpread ?? false;
    message.marketTier = object.marketTier ?? "";
    message.financialStatusIndicator = object.financialStatusIndicator ?? "";
    message.isin = object.isin ?? "";
    message.currencyPair = (object.currencyPair !== undefined && object.currencyPair !== null)
      ? InstrumentDefinition_CurrencyPair.fromPartial(object.currencyPair)
      : undefined;
    message.exchangeSendsVolume = object.exchangeSendsVolume ?? false;
    message.exchangeSendsHigh = object.exchangeSendsHigh ?? false;
    message.exchangeSendsLow = object.exchangeSendsLow ?? false;
    message.exchangeSendsOpen = object.exchangeSendsOpen ?? false;
    message.consolidatedFeedInstrument = object.consolidatedFeedInstrument ?? false;
    message.openOutcryInstrument = object.openOutcryInstrument ?? false;
    message.syntheticAmericanOptionInstrument = object.syntheticAmericanOptionInstrument ?? false;
    message.barchartExchangeCode = object.barchartExchangeCode ?? "";
    message.barchartBaseCode = object.barchartBaseCode ?? "";
    message.volumeDenominator = object.volumeDenominator ?? 0;
    message.bidOfferQuantityDenominator = object.bidOfferQuantityDenominator ?? 0;
    message.primaryListingMarketParticipantId = object.primaryListingMarketParticipantId ?? "";
    message.subscriptionSymbol = object.subscriptionSymbol ?? "";
    message.contractMaturity = (object.contractMaturity !== undefined && object.contractMaturity !== null)
      ? InstrumentDefinition_MaturityDate.fromPartial(object.contractMaturity)
      : undefined;
    message.underlying = object.underlying ?? "";
    message.commodity = object.commodity ?? "";
    return message;
  },
};

function createBaseInstrumentDefinition_Schedule(): InstrumentDefinition_Schedule {
  return { sessions: [] };
}

export const InstrumentDefinition_Schedule = {
  encode(message: InstrumentDefinition_Schedule, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.sessions) {
      InstrumentDefinition_TimeSpan.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_Schedule {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstrumentDefinition_Schedule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sessions.push(InstrumentDefinition_TimeSpan.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InstrumentDefinition_Schedule {
    return {
      sessions: Array.isArray(object?.sessions)
        ? object.sessions.map((e: any) => InstrumentDefinition_TimeSpan.fromJSON(e))
        : [],
    };
  },

  toJSON(message: InstrumentDefinition_Schedule): unknown {
    const obj: any = {};
    if (message.sessions) {
      obj.sessions = message.sessions.map((e) => e ? InstrumentDefinition_TimeSpan.toJSON(e) : undefined);
    } else {
      obj.sessions = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<InstrumentDefinition_Schedule>): InstrumentDefinition_Schedule {
    const message = createBaseInstrumentDefinition_Schedule();
    message.sessions = object.sessions?.map((e) => InstrumentDefinition_TimeSpan.fromPartial(e)) || [];
    return message;
  },
};

function createBaseInstrumentDefinition_TimeSpan(): InstrumentDefinition_TimeSpan {
  return { timeStart: Long.ZERO, timeFinish: Long.ZERO };
}

export const InstrumentDefinition_TimeSpan = {
  encode(message: InstrumentDefinition_TimeSpan, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.timeStart.isZero()) {
      writer.uint32(8).sint64(message.timeStart);
    }
    if (!message.timeFinish.isZero()) {
      writer.uint32(16).sint64(message.timeFinish);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_TimeSpan {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstrumentDefinition_TimeSpan();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timeStart = reader.sint64() as Long;
          break;
        case 2:
          message.timeFinish = reader.sint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InstrumentDefinition_TimeSpan {
    return {
      timeStart: isSet(object.timeStart) ? Long.fromValue(object.timeStart) : Long.ZERO,
      timeFinish: isSet(object.timeFinish) ? Long.fromValue(object.timeFinish) : Long.ZERO,
    };
  },

  toJSON(message: InstrumentDefinition_TimeSpan): unknown {
    const obj: any = {};
    message.timeStart !== undefined && (obj.timeStart = (message.timeStart || Long.ZERO).toString());
    message.timeFinish !== undefined && (obj.timeFinish = (message.timeFinish || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<InstrumentDefinition_TimeSpan>): InstrumentDefinition_TimeSpan {
    const message = createBaseInstrumentDefinition_TimeSpan();
    message.timeStart = (object.timeStart !== undefined && object.timeStart !== null)
      ? Long.fromValue(object.timeStart)
      : Long.ZERO;
    message.timeFinish = (object.timeFinish !== undefined && object.timeFinish !== null)
      ? Long.fromValue(object.timeFinish)
      : Long.ZERO;
    return message;
  },
};

function createBaseInstrumentDefinition_Calendar(): InstrumentDefinition_Calendar {
  return { events: [] };
}

export const InstrumentDefinition_Calendar = {
  encode(message: InstrumentDefinition_Calendar, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.events) {
      InstrumentDefinition_Event.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_Calendar {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstrumentDefinition_Calendar();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.events.push(InstrumentDefinition_Event.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InstrumentDefinition_Calendar {
    return {
      events: Array.isArray(object?.events)
        ? object.events.map((e: any) => InstrumentDefinition_Event.fromJSON(e))
        : [],
    };
  },

  toJSON(message: InstrumentDefinition_Calendar): unknown {
    const obj: any = {};
    if (message.events) {
      obj.events = message.events.map((e) => e ? InstrumentDefinition_Event.toJSON(e) : undefined);
    } else {
      obj.events = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<InstrumentDefinition_Calendar>): InstrumentDefinition_Calendar {
    const message = createBaseInstrumentDefinition_Calendar();
    message.events = object.events?.map((e) => InstrumentDefinition_Event.fromPartial(e)) || [];
    return message;
  },
};

function createBaseInstrumentDefinition_Event(): InstrumentDefinition_Event {
  return { type: 0, date: Long.ZERO };
}

export const InstrumentDefinition_Event = {
  encode(message: InstrumentDefinition_Event, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (!message.date.isZero()) {
      writer.uint32(16).sint64(message.date);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_Event {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstrumentDefinition_Event();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.date = reader.sint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InstrumentDefinition_Event {
    return {
      type: isSet(object.type) ? instrumentDefinition_EventTypeFromJSON(object.type) : 0,
      date: isSet(object.date) ? Long.fromValue(object.date) : Long.ZERO,
    };
  },

  toJSON(message: InstrumentDefinition_Event): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = instrumentDefinition_EventTypeToJSON(message.type));
    message.date !== undefined && (obj.date = (message.date || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<InstrumentDefinition_Event>): InstrumentDefinition_Event {
    const message = createBaseInstrumentDefinition_Event();
    message.type = object.type ?? 0;
    message.date = (object.date !== undefined && object.date !== null) ? Long.fromValue(object.date) : Long.ZERO;
    return message;
  },
};

function createBaseInstrumentDefinition_SpreadLeg(): InstrumentDefinition_SpreadLeg {
  return { marketId: Long.ZERO, ratio: 0, symbol: "", longSymbol: "", legOptionDelta: 0, legPrice: 0 };
}

export const InstrumentDefinition_SpreadLeg = {
  encode(message: InstrumentDefinition_SpreadLeg, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.marketId.isZero()) {
      writer.uint32(8).sint64(message.marketId);
    }
    if (message.ratio !== 0) {
      writer.uint32(16).sint32(message.ratio);
    }
    if (message.symbol !== "") {
      writer.uint32(26).string(message.symbol);
    }
    if (message.longSymbol !== "") {
      writer.uint32(34).string(message.longSymbol);
    }
    if (message.legOptionDelta !== 0) {
      writer.uint32(45).float(message.legOptionDelta);
    }
    if (message.legPrice !== 0) {
      writer.uint32(53).float(message.legPrice);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_SpreadLeg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstrumentDefinition_SpreadLeg();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader.sint64() as Long;
          break;
        case 2:
          message.ratio = reader.sint32();
          break;
        case 3:
          message.symbol = reader.string();
          break;
        case 4:
          message.longSymbol = reader.string();
          break;
        case 5:
          message.legOptionDelta = reader.float();
          break;
        case 6:
          message.legPrice = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InstrumentDefinition_SpreadLeg {
    return {
      marketId: isSet(object.marketId) ? Long.fromValue(object.marketId) : Long.ZERO,
      ratio: isSet(object.ratio) ? Number(object.ratio) : 0,
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      longSymbol: isSet(object.longSymbol) ? String(object.longSymbol) : "",
      legOptionDelta: isSet(object.legOptionDelta) ? Number(object.legOptionDelta) : 0,
      legPrice: isSet(object.legPrice) ? Number(object.legPrice) : 0,
    };
  },

  toJSON(message: InstrumentDefinition_SpreadLeg): unknown {
    const obj: any = {};
    message.marketId !== undefined && (obj.marketId = (message.marketId || Long.ZERO).toString());
    message.ratio !== undefined && (obj.ratio = Math.round(message.ratio));
    message.symbol !== undefined && (obj.symbol = message.symbol);
    message.longSymbol !== undefined && (obj.longSymbol = message.longSymbol);
    message.legOptionDelta !== undefined && (obj.legOptionDelta = message.legOptionDelta);
    message.legPrice !== undefined && (obj.legPrice = message.legPrice);
    return obj;
  },

  fromPartial(object: DeepPartial<InstrumentDefinition_SpreadLeg>): InstrumentDefinition_SpreadLeg {
    const message = createBaseInstrumentDefinition_SpreadLeg();
    message.marketId = (object.marketId !== undefined && object.marketId !== null)
      ? Long.fromValue(object.marketId)
      : Long.ZERO;
    message.ratio = object.ratio ?? 0;
    message.symbol = object.symbol ?? "";
    message.longSymbol = object.longSymbol ?? "";
    message.legOptionDelta = object.legOptionDelta ?? 0;
    message.legPrice = object.legPrice ?? 0;
    return message;
  },
};

function createBaseInstrumentDefinition_MaturityDate(): InstrumentDefinition_MaturityDate {
  return { year: 0, month: 0, day: 0 };
}

export const InstrumentDefinition_MaturityDate = {
  encode(message: InstrumentDefinition_MaturityDate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.year !== 0) {
      writer.uint32(8).sint32(message.year);
    }
    if (message.month !== 0) {
      writer.uint32(16).sint32(message.month);
    }
    if (message.day !== 0) {
      writer.uint32(24).sint32(message.day);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_MaturityDate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstrumentDefinition_MaturityDate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.year = reader.sint32();
          break;
        case 2:
          message.month = reader.sint32();
          break;
        case 3:
          message.day = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InstrumentDefinition_MaturityDate {
    return {
      year: isSet(object.year) ? Number(object.year) : 0,
      month: isSet(object.month) ? Number(object.month) : 0,
      day: isSet(object.day) ? Number(object.day) : 0,
    };
  },

  toJSON(message: InstrumentDefinition_MaturityDate): unknown {
    const obj: any = {};
    message.year !== undefined && (obj.year = Math.round(message.year));
    message.month !== undefined && (obj.month = Math.round(message.month));
    message.day !== undefined && (obj.day = Math.round(message.day));
    return obj;
  },

  fromPartial(object: DeepPartial<InstrumentDefinition_MaturityDate>): InstrumentDefinition_MaturityDate {
    const message = createBaseInstrumentDefinition_MaturityDate();
    message.year = object.year ?? 0;
    message.month = object.month ?? 0;
    message.day = object.day ?? 0;
    return message;
  },
};

function createBaseInstrumentDefinition_Symbol(): InstrumentDefinition_Symbol {
  return { vendor: "", symbol: "", longSymbol: "" };
}

export const InstrumentDefinition_Symbol = {
  encode(message: InstrumentDefinition_Symbol, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.vendor !== "") {
      writer.uint32(10).string(message.vendor);
    }
    if (message.symbol !== "") {
      writer.uint32(18).string(message.symbol);
    }
    if (message.longSymbol !== "") {
      writer.uint32(26).string(message.longSymbol);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_Symbol {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstrumentDefinition_Symbol();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vendor = reader.string();
          break;
        case 2:
          message.symbol = reader.string();
          break;
        case 3:
          message.longSymbol = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InstrumentDefinition_Symbol {
    return {
      vendor: isSet(object.vendor) ? String(object.vendor) : "",
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      longSymbol: isSet(object.longSymbol) ? String(object.longSymbol) : "",
    };
  },

  toJSON(message: InstrumentDefinition_Symbol): unknown {
    const obj: any = {};
    message.vendor !== undefined && (obj.vendor = message.vendor);
    message.symbol !== undefined && (obj.symbol = message.symbol);
    message.longSymbol !== undefined && (obj.longSymbol = message.longSymbol);
    return obj;
  },

  fromPartial(object: DeepPartial<InstrumentDefinition_Symbol>): InstrumentDefinition_Symbol {
    const message = createBaseInstrumentDefinition_Symbol();
    message.vendor = object.vendor ?? "";
    message.symbol = object.symbol ?? "";
    message.longSymbol = object.longSymbol ?? "";
    return message;
  },
};

function createBaseInstrumentDefinition_PriceFormat(): InstrumentDefinition_PriceFormat {
  return { isFractional: false, denominator: 0, subDenominator: 0, subFormat: 0 };
}

export const InstrumentDefinition_PriceFormat = {
  encode(message: InstrumentDefinition_PriceFormat, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.isFractional === true) {
      writer.uint32(8).bool(message.isFractional);
    }
    if (message.denominator !== 0) {
      writer.uint32(16).sint32(message.denominator);
    }
    if (message.subDenominator !== 0) {
      writer.uint32(32).sint32(message.subDenominator);
    }
    if (message.subFormat !== 0) {
      writer.uint32(48).int32(message.subFormat);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_PriceFormat {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstrumentDefinition_PriceFormat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.isFractional = reader.bool();
          break;
        case 2:
          message.denominator = reader.sint32();
          break;
        case 4:
          message.subDenominator = reader.sint32();
          break;
        case 6:
          message.subFormat = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InstrumentDefinition_PriceFormat {
    return {
      isFractional: isSet(object.isFractional) ? Boolean(object.isFractional) : false,
      denominator: isSet(object.denominator) ? Number(object.denominator) : 0,
      subDenominator: isSet(object.subDenominator) ? Number(object.subDenominator) : 0,
      subFormat: isSet(object.subFormat) ? instrumentDefinition_PriceFormat_SubFormatFromJSON(object.subFormat) : 0,
    };
  },

  toJSON(message: InstrumentDefinition_PriceFormat): unknown {
    const obj: any = {};
    message.isFractional !== undefined && (obj.isFractional = message.isFractional);
    message.denominator !== undefined && (obj.denominator = Math.round(message.denominator));
    message.subDenominator !== undefined && (obj.subDenominator = Math.round(message.subDenominator));
    message.subFormat !== undefined &&
      (obj.subFormat = instrumentDefinition_PriceFormat_SubFormatToJSON(message.subFormat));
    return obj;
  },

  fromPartial(object: DeepPartial<InstrumentDefinition_PriceFormat>): InstrumentDefinition_PriceFormat {
    const message = createBaseInstrumentDefinition_PriceFormat();
    message.isFractional = object.isFractional ?? false;
    message.denominator = object.denominator ?? 0;
    message.subDenominator = object.subDenominator ?? 0;
    message.subFormat = object.subFormat ?? 0;
    return message;
  },
};

function createBaseInstrumentDefinition_CurrencyPair(): InstrumentDefinition_CurrencyPair {
  return { currency1: "", currency2: "" };
}

export const InstrumentDefinition_CurrencyPair = {
  encode(message: InstrumentDefinition_CurrencyPair, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.currency1 !== "") {
      writer.uint32(10).string(message.currency1);
    }
    if (message.currency2 !== "") {
      writer.uint32(18).string(message.currency2);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_CurrencyPair {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstrumentDefinition_CurrencyPair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currency1 = reader.string();
          break;
        case 2:
          message.currency2 = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InstrumentDefinition_CurrencyPair {
    return {
      currency1: isSet(object.currency1) ? String(object.currency1) : "",
      currency2: isSet(object.currency2) ? String(object.currency2) : "",
    };
  },

  toJSON(message: InstrumentDefinition_CurrencyPair): unknown {
    const obj: any = {};
    message.currency1 !== undefined && (obj.currency1 = message.currency1);
    message.currency2 !== undefined && (obj.currency2 = message.currency2);
    return obj;
  },

  fromPartial(object: DeepPartial<InstrumentDefinition_CurrencyPair>): InstrumentDefinition_CurrencyPair {
    const message = createBaseInstrumentDefinition_CurrencyPair();
    message.currency1 = object.currency1 ?? "";
    message.currency2 = object.currency2 ?? "";
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
