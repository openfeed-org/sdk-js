import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "org.openfeed";
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
    schedule: InstrumentDefinition_Schedule | undefined;
    /** / Trading calendar (expiration, notice days, holidays?, etc) */
    calendar: InstrumentDefinition_Calendar | undefined;
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
    symbolExpiration: InstrumentDefinition_MaturityDate | undefined;
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
    priceFormat: InstrumentDefinition_PriceFormat | undefined;
    /** / Strike price display format */
    optionStrikePriceFormat: InstrumentDefinition_PriceFormat | undefined;
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
    currencyPair: InstrumentDefinition_CurrencyPair | undefined;
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
}
/** ############################################# */
export declare enum InstrumentDefinition_InstrumentType {
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
    UNRECOGNIZED = -1
}
export declare function instrumentDefinition_InstrumentTypeFromJSON(object: any): InstrumentDefinition_InstrumentType;
export declare function instrumentDefinition_InstrumentTypeToJSON(object: InstrumentDefinition_InstrumentType): string;
/** / Market depth implementation type */
export declare enum InstrumentDefinition_BookType {
    UNKNOWN_BOOK_TYPE = 0,
    /** TOP_OF_BOOK - BBO */
    TOP_OF_BOOK = 1,
    /** PRICE_LEVEL_DEPTH - Book uses price level */
    PRICE_LEVEL_DEPTH = 2,
    /** ORDER_DEPTH - Book uses order-id */
    ORDER_DEPTH = 3,
    UNRECOGNIZED = -1
}
export declare function instrumentDefinition_BookTypeFromJSON(object: any): InstrumentDefinition_BookType;
export declare function instrumentDefinition_BookTypeToJSON(object: InstrumentDefinition_BookType): string;
/** / Option type. */
export declare enum InstrumentDefinition_OptionType {
    UNKNOWN_OPTION_TYPE = 0,
    CALL = 1,
    PUT = 2,
    UNRECOGNIZED = -1
}
export declare function instrumentDefinition_OptionTypeFromJSON(object: any): InstrumentDefinition_OptionType;
export declare function instrumentDefinition_OptionTypeToJSON(object: InstrumentDefinition_OptionType): string;
/** / Option style. */
export declare enum InstrumentDefinition_OptionStyle {
    UNKNOWN_OPTIONS_STYLE = 0,
    DEFAULT = 1,
    AMERICAN = 2,
    EUROPEAN = 3,
    UNRECOGNIZED = -1
}
export declare function instrumentDefinition_OptionStyleFromJSON(object: any): InstrumentDefinition_OptionStyle;
export declare function instrumentDefinition_OptionStyleToJSON(object: InstrumentDefinition_OptionStyle): string;
export declare enum InstrumentDefinition_State {
    UNKNOWN_STATE = 0,
    ACTIVE = 1,
    PASSIVE = 2,
    UNRECOGNIZED = -1
}
export declare function instrumentDefinition_StateFromJSON(object: any): InstrumentDefinition_State;
export declare function instrumentDefinition_StateToJSON(object: InstrumentDefinition_State): string;
export declare enum InstrumentDefinition_EventType {
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
    UNRECOGNIZED = -1
}
export declare function instrumentDefinition_EventTypeFromJSON(object: any): InstrumentDefinition_EventType;
export declare function instrumentDefinition_EventTypeToJSON(object: InstrumentDefinition_EventType): string;
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
export declare enum InstrumentDefinition_PriceFormat_SubFormat {
    FLAT = 0,
    FRACTIONAL = 1,
    DECIMAL = 2,
    UNRECOGNIZED = -1
}
export declare function instrumentDefinition_PriceFormat_SubFormatFromJSON(object: any): InstrumentDefinition_PriceFormat_SubFormat;
export declare function instrumentDefinition_PriceFormat_SubFormatToJSON(object: InstrumentDefinition_PriceFormat_SubFormat): string;
/** / Currency Pair */
export interface InstrumentDefinition_CurrencyPair {
    currency1: string;
    currency2: string;
}
export declare const InstrumentDefinition: {
    encode(message: InstrumentDefinition, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition;
    fromJSON(object: any): InstrumentDefinition;
    toJSON(message: InstrumentDefinition): unknown;
    fromPartial(object: DeepPartial<InstrumentDefinition>): InstrumentDefinition;
};
export declare const InstrumentDefinition_Schedule: {
    encode(message: InstrumentDefinition_Schedule, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_Schedule;
    fromJSON(object: any): InstrumentDefinition_Schedule;
    toJSON(message: InstrumentDefinition_Schedule): unknown;
    fromPartial(object: DeepPartial<InstrumentDefinition_Schedule>): InstrumentDefinition_Schedule;
};
export declare const InstrumentDefinition_TimeSpan: {
    encode(message: InstrumentDefinition_TimeSpan, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_TimeSpan;
    fromJSON(object: any): InstrumentDefinition_TimeSpan;
    toJSON(message: InstrumentDefinition_TimeSpan): unknown;
    fromPartial(object: DeepPartial<InstrumentDefinition_TimeSpan>): InstrumentDefinition_TimeSpan;
};
export declare const InstrumentDefinition_Calendar: {
    encode(message: InstrumentDefinition_Calendar, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_Calendar;
    fromJSON(object: any): InstrumentDefinition_Calendar;
    toJSON(message: InstrumentDefinition_Calendar): unknown;
    fromPartial(object: DeepPartial<InstrumentDefinition_Calendar>): InstrumentDefinition_Calendar;
};
export declare const InstrumentDefinition_Event: {
    encode(message: InstrumentDefinition_Event, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_Event;
    fromJSON(object: any): InstrumentDefinition_Event;
    toJSON(message: InstrumentDefinition_Event): unknown;
    fromPartial(object: DeepPartial<InstrumentDefinition_Event>): InstrumentDefinition_Event;
};
export declare const InstrumentDefinition_SpreadLeg: {
    encode(message: InstrumentDefinition_SpreadLeg, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_SpreadLeg;
    fromJSON(object: any): InstrumentDefinition_SpreadLeg;
    toJSON(message: InstrumentDefinition_SpreadLeg): unknown;
    fromPartial(object: DeepPartial<InstrumentDefinition_SpreadLeg>): InstrumentDefinition_SpreadLeg;
};
export declare const InstrumentDefinition_MaturityDate: {
    encode(message: InstrumentDefinition_MaturityDate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_MaturityDate;
    fromJSON(object: any): InstrumentDefinition_MaturityDate;
    toJSON(message: InstrumentDefinition_MaturityDate): unknown;
    fromPartial(object: DeepPartial<InstrumentDefinition_MaturityDate>): InstrumentDefinition_MaturityDate;
};
export declare const InstrumentDefinition_Symbol: {
    encode(message: InstrumentDefinition_Symbol, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_Symbol;
    fromJSON(object: any): InstrumentDefinition_Symbol;
    toJSON(message: InstrumentDefinition_Symbol): unknown;
    fromPartial(object: DeepPartial<InstrumentDefinition_Symbol>): InstrumentDefinition_Symbol;
};
export declare const InstrumentDefinition_PriceFormat: {
    encode(message: InstrumentDefinition_PriceFormat, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_PriceFormat;
    fromJSON(object: any): InstrumentDefinition_PriceFormat;
    toJSON(message: InstrumentDefinition_PriceFormat): unknown;
    fromPartial(object: DeepPartial<InstrumentDefinition_PriceFormat>): InstrumentDefinition_PriceFormat;
};
export declare const InstrumentDefinition_CurrencyPair: {
    encode(message: InstrumentDefinition_CurrencyPair, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_CurrencyPair;
    fromJSON(object: any): InstrumentDefinition_CurrencyPair;
    toJSON(message: InstrumentDefinition_CurrencyPair): unknown;
    fromPartial(object: DeepPartial<InstrumentDefinition_CurrencyPair>): InstrumentDefinition_CurrencyPair;
};
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
