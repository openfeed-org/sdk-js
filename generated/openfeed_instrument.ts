/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
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
    /** / Barchart Underlying Symbol */
    underlying: string;
    commodity: string;
    /** / Barchart Exchange Id */
    exchangeId: number;
    /** / Barchart Price Scaling Exponent */
    priceScalingExponent: number;
    /** / The Openfeed marketId of the underlying asset. */
    underlyingOpenfeedMarketId: Long;
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
    UNRECOGNIZED = -1
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
    UNRECOGNIZED = -1
}
/** / Option type. */
export enum InstrumentDefinition_OptionType {
    UNKNOWN_OPTION_TYPE = 0,
    CALL = 1,
    PUT = 2,
    UNRECOGNIZED = -1
}
/** / Option style. */
export enum InstrumentDefinition_OptionStyle {
    UNKNOWN_OPTIONS_STYLE = 0,
    DEFAULT = 1,
    AMERICAN = 2,
    EUROPEAN = 3,
    UNRECOGNIZED = -1
}
export enum InstrumentDefinition_State {
    UNKNOWN_STATE = 0,
    ACTIVE = 1,
    PASSIVE = 2,
    UNRECOGNIZED = -1
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
    UNRECOGNIZED = -1
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
    /** / Epoch time in ms */
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
    UNRECOGNIZED = -1
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
        auxiliaryData: new Uint8Array(0),
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
        exchangeId: 0,
        priceScalingExponent: 0,
        underlyingOpenfeedMarketId: Long.ZERO,
    };
}
export const InstrumentDefinitionEncode = {
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
            InstrumentDefinition_ScheduleEncode.encode(message.schedule, writer.uint32(106).fork()).ldelim();
        }
        if (message.calendar !== undefined) {
            InstrumentDefinition_CalendarEncode.encode(message.calendar, writer.uint32(114).fork()).ldelim();
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
            InstrumentDefinition_MaturityDateEncode.encode(message.symbolExpiration, writer.uint32(154).fork()).ldelim();
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
            InstrumentDefinition_PriceFormatEncode.encode(message.priceFormat, writer.uint32(186).fork()).ldelim();
        }
        if (message.optionStrikePriceFormat !== undefined) {
            InstrumentDefinition_PriceFormatEncode.encode(message.optionStrikePriceFormat, writer.uint32(194).fork()).ldelim();
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
            InstrumentDefinition_SymbolEncode.encode(v!, writer.uint32(802).fork()).ldelim();
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
            InstrumentDefinition_SpreadLegEncode.encode(v!, writer.uint32(1690).fork()).ldelim();
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
            InstrumentDefinition_CurrencyPairEncode.encode(message.currencyPair, writer.uint32(1730).fork()).ldelim();
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
            InstrumentDefinition_MaturityDateEncode.encode(message.contractMaturity, writer.uint32(1842).fork()).ldelim();
        }
        if (message.underlying !== "") {
            writer.uint32(1850).string(message.underlying);
        }
        if (message.commodity !== "") {
            writer.uint32(1858).string(message.commodity);
        }
        if (message.exchangeId !== 0) {
            writer.uint32(1864).sint32(message.exchangeId);
        }
        if (message.priceScalingExponent !== 0) {
            writer.uint32(1872).sint32(message.priceScalingExponent);
        }
        if (!message.underlyingOpenfeedMarketId.isZero()) {
            writer.uint32(1880).sint64(message.underlyingOpenfeedMarketId);
        }
        return writer;
    }
}, InstrumentDefinitionDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInstrumentDefinition();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.marketId = reader.sint64() as Long;
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.instrumentType = reader.int32() as any;
                    continue;
                case 3:
                    if (tag === 24) {
                        message.supportBookTypes.push(reader.int32() as any);
                        continue;
                    }
                    if (tag === 26) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.supportBookTypes.push(reader.int32() as any);
                        }
                        continue;
                    }
                    break;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.bookDepth = reader.sint32();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.vendorId = reader.string();
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
                    message.description = reader.string();
                    continue;
                case 8:
                    if (tag !== 66) {
                        break;
                    }
                    message.cfiCode = reader.string();
                    continue;
                case 9:
                    if (tag !== 74) {
                        break;
                    }
                    message.currencyCode = reader.string();
                    continue;
                case 10:
                    if (tag !== 82) {
                        break;
                    }
                    message.exchangeCode = reader.string();
                    continue;
                case 11:
                    if (tag !== 93) {
                        break;
                    }
                    message.minimumPriceIncrement = reader.float();
                    continue;
                case 12:
                    if (tag !== 101) {
                        break;
                    }
                    message.contractPointValue = reader.float();
                    continue;
                case 13:
                    if (tag !== 106) {
                        break;
                    }
                    message.schedule = InstrumentDefinition_ScheduleDecode.decode(reader, reader.uint32());
                    continue;
                case 14:
                    if (tag !== 114) {
                        break;
                    }
                    message.calendar = InstrumentDefinition_CalendarDecode.decode(reader, reader.uint32());
                    continue;
                case 15:
                    if (tag !== 120) {
                        break;
                    }
                    message.recordCreateTime = reader.sint64() as Long;
                    continue;
                case 16:
                    if (tag !== 128) {
                        break;
                    }
                    message.recordUpdateTime = reader.sint64() as Long;
                    continue;
                case 17:
                    if (tag !== 138) {
                        break;
                    }
                    message.timeZoneName = reader.string();
                    continue;
                case 18:
                    if (tag !== 146) {
                        break;
                    }
                    message.instrumentGroup = reader.string();
                    continue;
                case 19:
                    if (tag !== 154) {
                        break;
                    }
                    message.symbolExpiration = InstrumentDefinition_MaturityDateDecode.decode(reader, reader.uint32());
                    continue;
                case 20:
                    if (tag !== 160) {
                        break;
                    }
                    message.state = reader.int32() as any;
                    continue;
                case 21:
                    if (tag !== 168) {
                        break;
                    }
                    message.channel = reader.sint32();
                    continue;
                case 22:
                    if (tag !== 176) {
                        break;
                    }
                    message.underlyingMarketId = reader.sint64() as Long;
                    continue;
                case 23:
                    if (tag !== 186) {
                        break;
                    }
                    message.priceFormat = InstrumentDefinition_PriceFormatDecode.decode(reader, reader.uint32());
                    continue;
                case 24:
                    if (tag !== 194) {
                        break;
                    }
                    message.optionStrikePriceFormat = InstrumentDefinition_PriceFormatDecode.decode(reader, reader.uint32());
                    continue;
                case 28:
                    if (tag !== 224) {
                        break;
                    }
                    message.priceDenominator = reader.sint32();
                    continue;
                case 29:
                    if (tag !== 232) {
                        break;
                    }
                    message.quantityDenominator = reader.sint32();
                    continue;
                case 30:
                    if (tag !== 240) {
                        break;
                    }
                    message.isTradable = reader.bool();
                    continue;
                case 50:
                    if (tag !== 400) {
                        break;
                    }
                    message.transactionTime = reader.sint64() as Long;
                    continue;
                case 99:
                    if (tag !== 794) {
                        break;
                    }
                    message.auxiliaryData = reader.bytes();
                    continue;
                case 100:
                    if (tag !== 802) {
                        break;
                    }
                    message.symbols.push(InstrumentDefinition_SymbolDecode.decode(reader, reader.uint32()));
                    continue;
                case 200:
                    if (tag !== 1600) {
                        break;
                    }
                    message.optionStrike = reader.sint64() as Long;
                    continue;
                case 202:
                    if (tag !== 1616) {
                        break;
                    }
                    message.optionType = reader.int32() as any;
                    continue;
                case 203:
                    if (tag !== 1624) {
                        break;
                    }
                    message.optionStyle = reader.int32() as any;
                    continue;
                case 204:
                    if (tag !== 1632) {
                        break;
                    }
                    message.optionStrikeDenominator = reader.sint32();
                    continue;
                case 210:
                    if (tag !== 1682) {
                        break;
                    }
                    message.spreadCode = reader.string();
                    continue;
                case 211:
                    if (tag !== 1690) {
                        break;
                    }
                    message.spreadLeg.push(InstrumentDefinition_SpreadLegDecode.decode(reader, reader.uint32()));
                    continue;
                case 212:
                    if (tag !== 1696) {
                        break;
                    }
                    message.userDefinedSpread = reader.bool();
                    continue;
                case 213:
                    if (tag !== 1706) {
                        break;
                    }
                    message.marketTier = reader.string();
                    continue;
                case 214:
                    if (tag !== 1714) {
                        break;
                    }
                    message.financialStatusIndicator = reader.string();
                    continue;
                case 215:
                    if (tag !== 1722) {
                        break;
                    }
                    message.isin = reader.string();
                    continue;
                case 216:
                    if (tag !== 1730) {
                        break;
                    }
                    message.currencyPair = InstrumentDefinition_CurrencyPairDecode.decode(reader, reader.uint32());
                    continue;
                case 217:
                    if (tag !== 1736) {
                        break;
                    }
                    message.exchangeSendsVolume = reader.bool();
                    continue;
                case 218:
                    if (tag !== 1744) {
                        break;
                    }
                    message.exchangeSendsHigh = reader.bool();
                    continue;
                case 219:
                    if (tag !== 1752) {
                        break;
                    }
                    message.exchangeSendsLow = reader.bool();
                    continue;
                case 220:
                    if (tag !== 1760) {
                        break;
                    }
                    message.exchangeSendsOpen = reader.bool();
                    continue;
                case 221:
                    if (tag !== 1768) {
                        break;
                    }
                    message.consolidatedFeedInstrument = reader.bool();
                    continue;
                case 222:
                    if (tag !== 1776) {
                        break;
                    }
                    message.openOutcryInstrument = reader.bool();
                    continue;
                case 223:
                    if (tag !== 1784) {
                        break;
                    }
                    message.syntheticAmericanOptionInstrument = reader.bool();
                    continue;
                case 224:
                    if (tag !== 1794) {
                        break;
                    }
                    message.barchartExchangeCode = reader.string();
                    continue;
                case 225:
                    if (tag !== 1802) {
                        break;
                    }
                    message.barchartBaseCode = reader.string();
                    continue;
                case 226:
                    if (tag !== 1808) {
                        break;
                    }
                    message.volumeDenominator = reader.sint32();
                    continue;
                case 227:
                    if (tag !== 1816) {
                        break;
                    }
                    message.bidOfferQuantityDenominator = reader.sint32();
                    continue;
                case 228:
                    if (tag !== 1826) {
                        break;
                    }
                    message.primaryListingMarketParticipantId = reader.string();
                    continue;
                case 229:
                    if (tag !== 1834) {
                        break;
                    }
                    message.subscriptionSymbol = reader.string();
                    continue;
                case 230:
                    if (tag !== 1842) {
                        break;
                    }
                    message.contractMaturity = InstrumentDefinition_MaturityDateDecode.decode(reader, reader.uint32());
                    continue;
                case 231:
                    if (tag !== 1850) {
                        break;
                    }
                    message.underlying = reader.string();
                    continue;
                case 232:
                    if (tag !== 1858) {
                        break;
                    }
                    message.commodity = reader.string();
                    continue;
                case 233:
                    if (tag !== 1864) {
                        break;
                    }
                    message.exchangeId = reader.sint32();
                    continue;
                case 234:
                    if (tag !== 1872) {
                        break;
                    }
                    message.priceScalingExponent = reader.sint32();
                    continue;
                case 235:
                    if (tag !== 1880) {
                        break;
                    }
                    message.underlyingOpenfeedMarketId = reader.sint64() as Long;
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
function createBaseInstrumentDefinition_Schedule(): InstrumentDefinition_Schedule {
    return { sessions: [] };
}
export const InstrumentDefinition_ScheduleEncode = {
    encode(message: InstrumentDefinition_Schedule, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        for (const v of message.sessions) {
            InstrumentDefinition_TimeSpanEncode.encode(v!, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    }
}, InstrumentDefinition_ScheduleDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_Schedule {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInstrumentDefinition_Schedule();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.sessions.push(InstrumentDefinition_TimeSpanDecode.decode(reader, reader.uint32()));
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
function createBaseInstrumentDefinition_TimeSpan(): InstrumentDefinition_TimeSpan {
    return { timeStart: Long.ZERO, timeFinish: Long.ZERO };
}
export const InstrumentDefinition_TimeSpanEncode = {
    encode(message: InstrumentDefinition_TimeSpan, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.timeStart.isZero()) {
            writer.uint32(8).sint64(message.timeStart);
        }
        if (!message.timeFinish.isZero()) {
            writer.uint32(16).sint64(message.timeFinish);
        }
        return writer;
    }
}, InstrumentDefinition_TimeSpanDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_TimeSpan {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInstrumentDefinition_TimeSpan();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.timeStart = reader.sint64() as Long;
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.timeFinish = reader.sint64() as Long;
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
function createBaseInstrumentDefinition_Calendar(): InstrumentDefinition_Calendar {
    return { events: [] };
}
export const InstrumentDefinition_CalendarEncode = {
    encode(message: InstrumentDefinition_Calendar, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        for (const v of message.events) {
            InstrumentDefinition_EventEncode.encode(v!, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    }
}, InstrumentDefinition_CalendarDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_Calendar {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInstrumentDefinition_Calendar();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.events.push(InstrumentDefinition_EventDecode.decode(reader, reader.uint32()));
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
function createBaseInstrumentDefinition_Event(): InstrumentDefinition_Event {
    return { type: 0, date: Long.ZERO };
}
export const InstrumentDefinition_EventEncode = {
    encode(message: InstrumentDefinition_Event, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.type !== 0) {
            writer.uint32(8).int32(message.type);
        }
        if (!message.date.isZero()) {
            writer.uint32(16).sint64(message.date);
        }
        return writer;
    }
}, InstrumentDefinition_EventDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_Event {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInstrumentDefinition_Event();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.type = reader.int32() as any;
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.date = reader.sint64() as Long;
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
function createBaseInstrumentDefinition_SpreadLeg(): InstrumentDefinition_SpreadLeg {
    return { marketId: Long.ZERO, ratio: 0, symbol: "", longSymbol: "", legOptionDelta: 0, legPrice: 0 };
}
export const InstrumentDefinition_SpreadLegEncode = {
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
    }
}, InstrumentDefinition_SpreadLegDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_SpreadLeg {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInstrumentDefinition_SpreadLeg();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.marketId = reader.sint64() as Long;
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.ratio = reader.sint32();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.symbol = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.longSymbol = reader.string();
                    continue;
                case 5:
                    if (tag !== 45) {
                        break;
                    }
                    message.legOptionDelta = reader.float();
                    continue;
                case 6:
                    if (tag !== 53) {
                        break;
                    }
                    message.legPrice = reader.float();
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
function createBaseInstrumentDefinition_MaturityDate(): InstrumentDefinition_MaturityDate {
    return { year: 0, month: 0, day: 0 };
}
export const InstrumentDefinition_MaturityDateEncode = {
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
    }
}, InstrumentDefinition_MaturityDateDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_MaturityDate {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInstrumentDefinition_MaturityDate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.year = reader.sint32();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.month = reader.sint32();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.day = reader.sint32();
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
function createBaseInstrumentDefinition_Symbol(): InstrumentDefinition_Symbol {
    return { vendor: "", symbol: "", longSymbol: "" };
}
export const InstrumentDefinition_SymbolEncode = {
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
    }
}, InstrumentDefinition_SymbolDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_Symbol {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInstrumentDefinition_Symbol();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.vendor = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.symbol = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.longSymbol = reader.string();
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
function createBaseInstrumentDefinition_PriceFormat(): InstrumentDefinition_PriceFormat {
    return { isFractional: false, denominator: 0, subDenominator: 0, subFormat: 0 };
}
export const InstrumentDefinition_PriceFormatEncode = {
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
    }
}, InstrumentDefinition_PriceFormatDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_PriceFormat {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInstrumentDefinition_PriceFormat();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.isFractional = reader.bool();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.denominator = reader.sint32();
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.subDenominator = reader.sint32();
                    continue;
                case 6:
                    if (tag !== 48) {
                        break;
                    }
                    message.subFormat = reader.int32() as any;
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
function createBaseInstrumentDefinition_CurrencyPair(): InstrumentDefinition_CurrencyPair {
    return { currency1: "", currency2: "" };
}
export const InstrumentDefinition_CurrencyPairEncode = {
    encode(message: InstrumentDefinition_CurrencyPair, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.currency1 !== "") {
            writer.uint32(10).string(message.currency1);
        }
        if (message.currency2 !== "") {
            writer.uint32(18).string(message.currency2);
        }
        return writer;
    }
}, InstrumentDefinition_CurrencyPairDecode = {
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentDefinition_CurrencyPair {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInstrumentDefinition_CurrencyPair();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.currency1 = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.currency2 = reader.string();
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
