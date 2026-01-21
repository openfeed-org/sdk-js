/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { InstrumentDefinition, InstrumentDefinitionEncode, InstrumentDefinitionDecode } from "./openfeed_instrument";
/** / Book side */
export enum BookSide {
    UNKNOWN_BOOK_SIDE = 0,
    BID = 1,
    OFFER = 2,
    UNRECOGNIZED = -1
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
    UNRECOGNIZED = -1
}
export enum RegulationSHOShortSalePriceTest {
    UNKNOWN_PRICE_TEST = 0,
    PRICE_TEST_NONE = 1,
    PRICE_TEST_IN_EFFECT = 2,
    PRICE_TEST_REMAINS_IN_EFFECT = 3,
    UNRECOGNIZED = -1
}
export enum SettlementTerms {
    UNKNOWN_SETTLEMENT_TERMS = 0,
    CASH = 1,
    NON_NET = 2,
    CONTINGENT_TRADE = 3,
    CASH_TODAY = 4,
    DATE = 5,
    UNRECOGNIZED = -1
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
    UNRECOGNIZED = -1
}
export enum OpenCloseSettlementFlag {
    UNKNOWN = 0,
    DAILY_OPEN = 1,
    INDICATIVE_OPEN_PRICE = 2,
    UNRECOGNIZED = -1
}
export enum SettlementSource {
    UNKNOWN_SETTLEMENT_SOURCE = 0,
    GLOBEX = 1,
    ITC = 2,
    MANUAL = 3,
    UNRECOGNIZED = -1
}
export enum Service {
    UNKNOWN_SERVICE = 0,
    REAL_TIME = 1,
    DELAYED = 2,
    REAL_TIME_SNAPSHOT = 3,
    DELAYED_SNAPSHOT = 4,
    END_OF_DAY = 5,
    UNRECOGNIZED = -1
}
export enum MarketWideStatus {
    STATUS_UNKNOWN = 0,
    STATUS_START_OF_DAY = 1,
    STATUS_END_OF_DAY = 2,
    STATUS_OPEN = 3,
    STATUS_CLOSE = 4,
    UNRECOGNIZED = -1
}
export enum SnapshotRequestResult {
    SNAPSHOT_REQUEST_UNKNOWN_RESULT = 0,
    SNAPSHOT_REQUEST_SUCCESS = 1,
    SNAPSHOT_REQUEST_NOT_FOUND = 2,
    SNAPSHOT_REQUEST_SERVICE_NOT_AVAILABLE = 3,
    SNAPSHOT_REQUEST_GENERIC_FAILURE = 4,
    UNRECOGNIZED = -1
}
/** / Instrument Actions */
export enum ActionType {
    UNKNOWN_ACTION = 0,
    LISTING = 1,
    DELISTING = 2,
    EXCHANGE_MOVE = 3,
    ALIAS_CHANGED = 4,
    UNRECOGNIZED = -1
}
/**
 * / A wrapper for Openfeed data.  Will contain exactly one of the supported
 * message types
 */
export interface OpenfeedMessage {
    /** / Nano second unix epoch at time of message transmission (UTC) */
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
    channelReset?: ChannelReset | undefined;
    heartBeat?: HeartBeat | undefined;
    adminMessage?: AdminMessage | undefined;
    instrumentDefinition?: InstrumentDefinition | undefined;
    instrumentGroupStatus?: InstrumentGroupStatus | undefined;
    marketSnapshot?: MarketSnapshot | undefined;
    marketUpdate?: MarketUpdate | undefined;
    marketStatus?: MarketStatus | undefined;
    eodCommoditySummary?: EODCommoditySummary | undefined;
    instrumentAction?: InstrumentAction | undefined;
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
    UNRECOGNIZED = -1
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
    open: Open | undefined;
    /** / High price for the trading session */
    high: High | undefined;
    /** / Low price for the trading session */
    low: Low | undefined;
    /** / Most recent traded price and quantity */
    last: Last | undefined;
    /** / Total traded volume */
    volume: Volume | undefined;
    /** / Most recent settlement price */
    settlement: Settlement | undefined;
    /** / Most recent settlement price */
    prevSettlement: Settlement | undefined;
    /** / Most recent open interest */
    openInterest: OpenInterest | undefined;
    /** / Number of trades */
    numberOfTrades: NumberOfTrades | undefined;
    /** / Monetary value */
    monetaryValue: MonetaryValue | undefined;
    /** UTC Timestamp, nano seconds since Unix epoch */
    transactionTime: Long;
    officialBestBidOffer: OfficialBestBidOffer | undefined;
    referenceVolatilityPrice: ReferenceVolatilityPrice | undefined;
    priceLimits: PriceLimits | undefined;
    marketOpenInterest: MarketOpenInterest | undefined;
    vwap: Vwap | undefined;
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
    instrumentStatus: InstrumentStatus | undefined;
    /** Best Bid Offer */
    bbo: BestBidOffer | undefined;
    /** Index Value */
    index: IndexValue | undefined;
    /** Price Level Book */
    priceLevels: AddPriceLevel[];
    /** Order Book */
    orders: AddOrder[];
    news: News | undefined;
    /** / Most recent opening price */
    open: Open | undefined;
    /** / High price for the trading session */
    high: High | undefined;
    /** / Low price for the trading session */
    low: Low | undefined;
    /** / Most recent closing price */
    close: Close | undefined;
    /** / Previous closing price */
    prevClose: PrevClose | undefined;
    /** / Most recent traded price and quantity */
    last: Last | undefined;
    /** / Year high price */
    yearHigh: YearHigh | undefined;
    /** / Year low price */
    yearLow: YearLow | undefined;
    /** / Total traded volume */
    volume: Volume | undefined;
    /** / Most recent settlement price */
    settlement: Settlement | undefined;
    /** / Most recent open interest */
    openInterest: OpenInterest | undefined;
    /** / Most recent volume weighted average price */
    vwap: Vwap | undefined;
    dividendsIncomeDistributions: DividendsIncomeDistributions | undefined;
    numberOfTrades: NumberOfTrades | undefined;
    monetaryValue: MonetaryValue | undefined;
    capitalDistributions: CapitalDistributions | undefined;
    sharesOutstanding: SharesOutstanding | undefined;
    netAssetValue: NetAssetValue | undefined;
    /** / Previous session. */
    previousSession: MarketSession | undefined;
    /** / 'T' session. */
    tSession: MarketSession | undefined;
    /** / Volume at price. Used by the market state/ JERQ. */
    volumeAtPrice: VolumeAtPrice | undefined;
    highRolling: HighRolling | undefined;
    lowRolling: LowRolling | undefined;
    /** / 'Z' session. Includes all trades, even the ones that do not update Last. */
    zSession: MarketSession | undefined;
    referenceVolatilityPrice: ReferenceVolatilityPrice | undefined;
    priceLimits: PriceLimits | undefined;
    /** / Older previous sessions */
    sessions: MarketSession[];
    officialBestBidOffer: OfficialBestBidOffer | undefined;
    marketOpenInterest: MarketOpenInterest | undefined;
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
    context: Context | undefined;
    /** / Current session. This is used to 'enhance' updates from the translator in the Market State */
    session: MarketSession | undefined;
    /** / 'T' session. This is used to 'enhance' updates from the translator in the Market State */
    tSession: MarketSession | undefined;
    /** / Previous session. This is used to 'enhance' updates from the translator in the Market State */
    previousSession: MarketSession | undefined;
    /** / True if message applies to regional/participant member */
    regional: boolean;
    /** / 'Z' session. Includes all trades, even the ones that do not update Last. */
    zSession: MarketSession | undefined;
    news?: News | undefined;
    clearBook?: ClearBook | undefined;
    instrumentStatus?: InstrumentStatus | undefined;
    bbo?: BestBidOffer | undefined;
    depthPriceLevel?: DepthPriceLevel | undefined;
    depthOrder?: DepthOrder | undefined;
    index?: IndexValue | undefined;
    trades?: Trades | undefined;
    open?: Open | undefined;
    high?: High | undefined;
    low?: Low | undefined;
    close?: Close | undefined;
    prevClose?: PrevClose | undefined;
    last?: Last | undefined;
    yearHigh?: YearHigh | undefined;
    yearLow?: YearLow | undefined;
    volume?: Volume | undefined;
    settlement?: Settlement | undefined;
    openInterest?: OpenInterest | undefined;
    vwap?: Vwap | undefined;
    dividendsIncomeDistributions?: DividendsIncomeDistributions | undefined;
    numberOfTrades?: NumberOfTrades | undefined;
    monetaryValue?: MonetaryValue | undefined;
    capitalDistributions?: CapitalDistributions | undefined;
    sharesOutstanding?: SharesOutstanding | undefined;
    netAssetValue?: NetAssetValue | undefined;
    marketSummary?: MarketSummary | undefined;
    highRolling?: HighRolling | undefined;
    lowRolling?: LowRolling | undefined;
    requestForQuote?: RequestForQuote | undefined;
    referenceVolatilityPrice?: ReferenceVolatilityPrice | undefined;
    priceLimits?: PriceLimits | undefined;
    officialBestBidOffer?: OfficialBestBidOffer | undefined;
    marketOpenInterest?: MarketOpenInterest | undefined;
}
/** / Depth Price Level */
export interface DepthPriceLevel {
    levels: DepthPriceLevel_Entry[];
}
export interface DepthPriceLevel_Entry {
    addPriceLevel?: AddPriceLevel | undefined;
    deletePriceLevel?: DeletePriceLevel | undefined;
    modifyPriceLevel?: ModifyPriceLevel | undefined;
}
/** / Depth By Order */
export interface DepthOrder {
    orders: DepthOrder_Entry[];
}
export interface DepthOrder_Entry {
    addOrder?: AddOrder | undefined;
    deleteOrder?: DeleteOrder | undefined;
    modifyOrder?: ModifyOrder | undefined;
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
    /** / Trading status. */
    tradingStatus: InstrumentTradingStatus;
    /** UTC Timestamp, nano seconds since Unix epoch */
    openingTime: Long;
    note: string;
    /** / Date only, format 2012-07-04 -> 20120704 */
    tradeDate: number;
    regulationSHOShortSalePriceTest: RegulationSHOShortSalePriceTest;
    /** / Prior trading status for the instrument. */
    priorTradingStatus: InstrumentTradingStatus;
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
/** / Official Best Bid and Offer. */
export interface OfficialBestBidOffer {
    /** / Date only, format 2012-07-04 -> 20120704 */
    tradeDate: number;
    /** UTC Timestamp, nano seconds since Unix epoch */
    transactionTime: Long;
    /** / Divide by priceDenominator */
    bidPrice: Long;
    /** / Divide by priceDenominator */
    offerPrice: Long;
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
    trade?: Trade | undefined;
    tradeCorrection?: TradeCorrection | undefined;
    tradeCancel?: TradeCancel | undefined;
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
/** / Market Open interest */
export interface MarketOpenInterest {
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
/** / Price limits. */
export interface PriceLimits {
    /** / trade date */
    tradeDate: number;
    /** / Transaction time. */
    transactionTime: Long;
    /** / Upper price limit for the outright tradable instrument for the current trading day */
    upperPriceLimit: Long;
    /** / Lower price limit for the outright tradable instrument for the current trading day */
    lowerPriceLimit: Long;
}
/** / The Reference Volatility Price message provides ‘raw’ strikes. LME volatilities are quoted in Delta space. */
export interface ReferenceVolatilityPrice {
    /** / trade date */
    tradeDate: number;
    /** / Identifies the ATM strike (1) or delta point (0). */
    atm: number;
    /** / Indicates whether the reference volatility was created in Delta or Strike space. */
    surfaceDomain: string;
    /** / Volatility */
    volatility: Long;
    /** / premium */
    premium: Long;
    /** / Option delta for the volatility point. */
    delta: Long;
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
    vwap: Vwap | undefined;
    /** / Used by CME ITC. */
    session: string;
    summaryType: MarketSummary_SummaryType;
    /** / Total traded volume for the prior day. */
    prevVolume: Volume | undefined;
    /** / True if not persisted in the EOD database. */
    transient: boolean;
}
/** Clears sets of fields */
export enum MarketSummary_ClearSet {
    NONE = 0,
    ALL = 1,
    BA = 2,
    CUSTOM_1 = 3,
    UNRECOGNIZED = -1
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
    UNRECOGNIZED = -1
}
export interface Context {
    data: ContextData[];
    tracePoints: TracePoint[];
}
export interface ContextData {
    id: string;
    vstring?: string | undefined;
    vbytes?: Uint8Array | undefined;
    vbool?: boolean | undefined;
    vsint32?: number | undefined;
    vsint64?: Long | undefined;
    vfloat?: number | undefined;
    vdouble?: number | undefined;
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
    UNRECOGNIZED = -1
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
    close: Close | undefined;
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
    oldAlias: string;
    instrument: InstrumentDefinition | undefined;
    newInstrument: InstrumentDefinition | undefined;
}
/** / Request For Quote */
export interface RequestForQuote {
    quoteRequestId: string;
    symbol: string;
    securityId: Long;
    orderQuantity: number;
    quoteType: number;
    side: number;
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
export const OpenfeedMessageEncode = {
    encode(message: OpenfeedMessage, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.sendingTime.equals(Long.ZERO)) {
            writer.uint32(8).sint64(message.sendingTime.toString());
        }
        if (message.totalCount !== 0) {
            writer.uint32(16).sint32(message.totalCount);
        }
        if (!message.syncSequence.equals(Long.ZERO)) {
            writer.uint32(24).int64(message.syncSequence.toString());
        }
        if (message.context !== undefined) {
            ContextEncode.encode(message.context, writer.uint32(34).fork()).join();
        }
        if (message.channelReset !== undefined) {
            ChannelResetEncode.encode(message.channelReset, writer.uint32(82).fork()).join();
        }
        if (message.heartBeat !== undefined) {
            HeartBeatEncode.encode(message.heartBeat, writer.uint32(90).fork()).join();
        }
        if (message.adminMessage !== undefined) {
            AdminMessageEncode.encode(message.adminMessage, writer.uint32(98).fork()).join();
        }
        if (message.instrumentDefinition !== undefined) {
            InstrumentDefinitionEncode.encode(message.instrumentDefinition, writer.uint32(106).fork()).join();
        }
        if (message.instrumentGroupStatus !== undefined) {
            InstrumentGroupStatusEncode.encode(message.instrumentGroupStatus, writer.uint32(114).fork()).join();
        }
        if (message.marketSnapshot !== undefined) {
            MarketSnapshotEncode.encode(message.marketSnapshot, writer.uint32(122).fork()).join();
        }
        if (message.marketUpdate !== undefined) {
            MarketUpdateEncode.encode(message.marketUpdate, writer.uint32(130).fork()).join();
        }
        if (message.marketStatus !== undefined) {
            MarketStatusEncode.encode(message.marketStatus, writer.uint32(138).fork()).join();
        }
        if (message.eodCommoditySummary !== undefined) {
            EODCommoditySummaryEncode.encode(message.eodCommoditySummary, writer.uint32(146).fork()).join();
        }
        if (message.instrumentAction !== undefined) {
            InstrumentActionEncode.encode(message.instrumentAction, writer.uint32(154).fork()).join();
        }
        return writer;
    }
}, OpenfeedMessageDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): OpenfeedMessage {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOpenfeedMessage();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }
                    message.sendingTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 2: {
                    if (tag !== 16) {
                        break;
                    }
                    message.totalCount = reader.sint32();
                    continue;
                }
                case 3: {
                    if (tag !== 24) {
                        break;
                    }
                    message.syncSequence = Long.fromString(reader.int64().toString());
                    continue;
                }
                case 4: {
                    if (tag !== 34) {
                        break;
                    }
                    message.context = ContextDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 10: {
                    if (tag !== 82) {
                        break;
                    }
                    message.channelReset = ChannelResetDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 11: {
                    if (tag !== 90) {
                        break;
                    }
                    message.heartBeat = HeartBeatDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 12: {
                    if (tag !== 98) {
                        break;
                    }
                    message.adminMessage = AdminMessageDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 13: {
                    if (tag !== 106) {
                        break;
                    }
                    message.instrumentDefinition = InstrumentDefinitionDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 14: {
                    if (tag !== 114) {
                        break;
                    }
                    message.instrumentGroupStatus = InstrumentGroupStatusDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 15: {
                    if (tag !== 122) {
                        break;
                    }
                    message.marketSnapshot = MarketSnapshotDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 16: {
                    if (tag !== 130) {
                        break;
                    }
                    message.marketUpdate = MarketUpdateDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 17: {
                    if (tag !== 138) {
                        break;
                    }
                    message.marketStatus = MarketStatusDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 18: {
                    if (tag !== 146) {
                        break;
                    }
                    message.eodCommoditySummary = EODCommoditySummaryDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 19: {
                    if (tag !== 154) {
                        break;
                    }
                    message.instrumentAction = InstrumentActionDecode.decode(reader, reader.uint32());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseChannelReset(): ChannelReset {
    return { channel: 0, transactionTime: Long.ZERO };
}
export const ChannelResetEncode = {
    encode(message: ChannelReset, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (message.channel !== 0) {
            writer.uint32(8).sint32(message.channel);
        }
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(16).sint64(message.transactionTime.toString());
        }
        return writer;
    }
}, ChannelResetDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): ChannelReset {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseChannelReset();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }
                    message.channel = reader.sint32();
                    continue;
                }
                case 2: {
                    if (tag !== 16) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseHeartBeat(): HeartBeat {
    return { transactionTime: Long.ZERO, status: "", exchange: false, channel: 0 };
}
export const HeartBeatEncode = {
    encode(message: HeartBeat, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(8).sint64(message.transactionTime.toString());
        }
        if (message.status !== "") {
            writer.uint32(18).string(message.status);
        }
        if (message.exchange !== false) {
            writer.uint32(24).bool(message.exchange);
        }
        if (message.channel !== 0) {
            writer.uint32(32).sint32(message.channel);
        }
        return writer;
    }
}, HeartBeatDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): HeartBeat {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseHeartBeat();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 2: {
                    if (tag !== 18) {
                        break;
                    }
                    message.status = reader.string();
                    continue;
                }
                case 3: {
                    if (tag !== 24) {
                        break;
                    }
                    message.exchange = reader.bool();
                    continue;
                }
                case 4: {
                    if (tag !== 32) {
                        break;
                    }
                    message.channel = reader.sint32();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseAdminMessage(): AdminMessage {
    return { originationTime: Long.ZERO, source: "", languageCode: "", headLine: "", text: "", status: 0, channel: 0 };
}
export const AdminMessageEncode = {
    encode(message: AdminMessage, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.originationTime.equals(Long.ZERO)) {
            writer.uint32(8).sint64(message.originationTime.toString());
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
    }
}, AdminMessageDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): AdminMessage {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAdminMessage();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }
                    message.originationTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 2: {
                    if (tag !== 18) {
                        break;
                    }
                    message.source = reader.string();
                    continue;
                }
                case 3: {
                    if (tag !== 26) {
                        break;
                    }
                    message.languageCode = reader.string();
                    continue;
                }
                case 4: {
                    if (tag !== 34) {
                        break;
                    }
                    message.headLine = reader.string();
                    continue;
                }
                case 5: {
                    if (tag !== 42) {
                        break;
                    }
                    message.text = reader.string();
                    continue;
                }
                case 6: {
                    if (tag !== 48) {
                        break;
                    }
                    message.status = reader.int32() as any;
                    continue;
                }
                case 7: {
                    if (tag !== 56) {
                        break;
                    }
                    message.channel = reader.sint32();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseInstrumentGroupStatus(): InstrumentGroupStatus {
    return { transactionTime: Long.ZERO, instrumentGroupId: "", tradingStatus: 0, tradeDate: 0, channel: 0 };
}
export const InstrumentGroupStatusEncode = {
    encode(message: InstrumentGroupStatus, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(8).sint64(message.transactionTime.toString());
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
    }
}, InstrumentGroupStatusDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): InstrumentGroupStatus {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInstrumentGroupStatus();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 2: {
                    if (tag !== 18) {
                        break;
                    }
                    message.instrumentGroupId = reader.string();
                    continue;
                }
                case 3: {
                    if (tag !== 24) {
                        break;
                    }
                    message.tradingStatus = reader.int32() as any;
                    continue;
                }
                case 4: {
                    if (tag !== 32) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 5: {
                    if (tag !== 40) {
                        break;
                    }
                    message.channel = reader.sint32();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseMarketStatus(): MarketStatus {
    return { transactionTime: Long.ZERO, channel: 0, marketWideStatus: 0 };
}
export const MarketStatusEncode = {
    encode(message: MarketStatus, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(8).sint64(message.transactionTime.toString());
        }
        if (message.channel !== 0) {
            writer.uint32(16).sint32(message.channel);
        }
        if (message.marketWideStatus !== 0) {
            writer.uint32(24).int32(message.marketWideStatus);
        }
        return writer;
    }
}, MarketStatusDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): MarketStatus {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMarketStatus();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 2: {
                    if (tag !== 16) {
                        break;
                    }
                    message.channel = reader.sint32();
                    continue;
                }
                case 3: {
                    if (tag !== 24) {
                        break;
                    }
                    message.marketWideStatus = reader.int32() as any;
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseEODCommoditySummary(): EODCommoditySummary {
    return {
        tradeDate: 0,
        contractRoot: "",
        consolidatedVolume: Long.ZERO,
        consolidatedOpenInterest: Long.ZERO,
        auxiliaryData: new Uint8Array(0),
    };
}
export const EODCommoditySummaryEncode = {
    encode(message: EODCommoditySummary, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (message.tradeDate !== 0) {
            writer.uint32(8).sint32(message.tradeDate);
        }
        if (message.contractRoot !== "") {
            writer.uint32(18).string(message.contractRoot);
        }
        if (!message.consolidatedVolume.equals(Long.ZERO)) {
            writer.uint32(24).sint64(message.consolidatedVolume.toString());
        }
        if (!message.consolidatedOpenInterest.equals(Long.ZERO)) {
            writer.uint32(32).sint64(message.consolidatedOpenInterest.toString());
        }
        if (message.auxiliaryData.length !== 0) {
            writer.uint32(794).bytes(message.auxiliaryData);
        }
        return writer;
    }
}, EODCommoditySummaryDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): EODCommoditySummary {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEODCommoditySummary();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 2: {
                    if (tag !== 18) {
                        break;
                    }
                    message.contractRoot = reader.string();
                    continue;
                }
                case 3: {
                    if (tag !== 24) {
                        break;
                    }
                    message.consolidatedVolume = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 4: {
                    if (tag !== 32) {
                        break;
                    }
                    message.consolidatedOpenInterest = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 99: {
                    if (tag !== 794) {
                        break;
                    }
                    message.auxiliaryData = reader.bytes();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
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
        officialBestBidOffer: undefined,
        referenceVolatilityPrice: undefined,
        priceLimits: undefined,
        marketOpenInterest: undefined,
        vwap: undefined,
    };
}
export const MarketSessionEncode = {
    encode(message: MarketSession, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (message.tradeDate !== 0) {
            writer.uint32(32).sint32(message.tradeDate);
        }
        if (message.open !== undefined) {
            OpenEncode.encode(message.open, writer.uint32(242).fork()).join();
        }
        if (message.high !== undefined) {
            HighEncode.encode(message.high, writer.uint32(250).fork()).join();
        }
        if (message.low !== undefined) {
            LowEncode.encode(message.low, writer.uint32(258).fork()).join();
        }
        if (message.last !== undefined) {
            LastEncode.encode(message.last, writer.uint32(282).fork()).join();
        }
        if (message.volume !== undefined) {
            VolumeEncode.encode(message.volume, writer.uint32(306).fork()).join();
        }
        if (message.settlement !== undefined) {
            SettlementEncode.encode(message.settlement, writer.uint32(314).fork()).join();
        }
        if (message.prevSettlement !== undefined) {
            SettlementEncode.encode(message.prevSettlement, writer.uint32(354).fork()).join();
        }
        if (message.openInterest !== undefined) {
            OpenInterestEncode.encode(message.openInterest, writer.uint32(322).fork()).join();
        }
        if (message.numberOfTrades !== undefined) {
            NumberOfTradesEncode.encode(message.numberOfTrades, writer.uint32(330).fork()).join();
        }
        if (message.monetaryValue !== undefined) {
            MonetaryValueEncode.encode(message.monetaryValue, writer.uint32(338).fork()).join();
        }
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(344).sint64(message.transactionTime.toString());
        }
        if (message.officialBestBidOffer !== undefined) {
            OfficialBestBidOfferEncode.encode(message.officialBestBidOffer, writer.uint32(362).fork()).join();
        }
        if (message.referenceVolatilityPrice !== undefined) {
            ReferenceVolatilityPriceEncode.encode(message.referenceVolatilityPrice, writer.uint32(370).fork()).join();
        }
        if (message.priceLimits !== undefined) {
            PriceLimitsEncode.encode(message.priceLimits, writer.uint32(378).fork()).join();
        }
        if (message.marketOpenInterest !== undefined) {
            MarketOpenInterestEncode.encode(message.marketOpenInterest, writer.uint32(386).fork()).join();
        }
        if (message.vwap !== undefined) {
            VwapEncode.encode(message.vwap, writer.uint32(394).fork()).join();
        }
        return writer;
    }
}, MarketSessionDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): MarketSession {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMarketSession();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 4: {
                    if (tag !== 32) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 30: {
                    if (tag !== 242) {
                        break;
                    }
                    message.open = OpenDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 31: {
                    if (tag !== 250) {
                        break;
                    }
                    message.high = HighDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 32: {
                    if (tag !== 258) {
                        break;
                    }
                    message.low = LowDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 35: {
                    if (tag !== 282) {
                        break;
                    }
                    message.last = LastDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 38: {
                    if (tag !== 306) {
                        break;
                    }
                    message.volume = VolumeDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 39: {
                    if (tag !== 314) {
                        break;
                    }
                    message.settlement = SettlementDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 44: {
                    if (tag !== 354) {
                        break;
                    }
                    message.prevSettlement = SettlementDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 40: {
                    if (tag !== 322) {
                        break;
                    }
                    message.openInterest = OpenInterestDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 41: {
                    if (tag !== 330) {
                        break;
                    }
                    message.numberOfTrades = NumberOfTradesDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 42: {
                    if (tag !== 338) {
                        break;
                    }
                    message.monetaryValue = MonetaryValueDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 43: {
                    if (tag !== 344) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 45: {
                    if (tag !== 362) {
                        break;
                    }
                    message.officialBestBidOffer = OfficialBestBidOfferDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 46: {
                    if (tag !== 370) {
                        break;
                    }
                    message.referenceVolatilityPrice = ReferenceVolatilityPriceDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 47: {
                    if (tag !== 378) {
                        break;
                    }
                    message.priceLimits = PriceLimitsDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 48: {
                    if (tag !== 386) {
                        break;
                    }
                    message.marketOpenInterest = MarketOpenInterestDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 49: {
                    if (tag !== 394) {
                        break;
                    }
                    message.vwap = VwapDecode.decode(reader, reader.uint32());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
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
        referenceVolatilityPrice: undefined,
        priceLimits: undefined,
        sessions: [],
        officialBestBidOffer: undefined,
        marketOpenInterest: undefined,
    };
}
export const MarketSnapshotEncode = {
    encode(message: MarketSnapshot, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.marketId.equals(Long.ZERO)) {
            writer.uint32(8).sint64(message.marketId.toString());
        }
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(16).sint64(message.transactionTime.toString());
        }
        if (!message.marketSequence.equals(Long.ZERO)) {
            writer.uint32(24).int64(message.marketSequence.toString());
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
            InstrumentStatusEncode.encode(message.instrumentStatus, writer.uint32(82).fork()).join();
        }
        if (message.bbo !== undefined) {
            BestBidOfferEncode.encode(message.bbo, writer.uint32(90).fork()).join();
        }
        if (message.index !== undefined) {
            IndexValueEncode.encode(message.index, writer.uint32(98).fork()).join();
        }
        for (const v of message.priceLevels) {
            AddPriceLevelEncode.encode(v!, writer.uint32(106).fork()).join();
        }
        for (const v of message.orders) {
            AddOrderEncode.encode(v!, writer.uint32(114).fork()).join();
        }
        if (message.news !== undefined) {
            NewsEncode.encode(message.news, writer.uint32(122).fork()).join();
        }
        if (message.open !== undefined) {
            OpenEncode.encode(message.open, writer.uint32(242).fork()).join();
        }
        if (message.high !== undefined) {
            HighEncode.encode(message.high, writer.uint32(250).fork()).join();
        }
        if (message.low !== undefined) {
            LowEncode.encode(message.low, writer.uint32(258).fork()).join();
        }
        if (message.close !== undefined) {
            CloseEncode.encode(message.close, writer.uint32(266).fork()).join();
        }
        if (message.prevClose !== undefined) {
            PrevCloseEncode.encode(message.prevClose, writer.uint32(274).fork()).join();
        }
        if (message.last !== undefined) {
            LastEncode.encode(message.last, writer.uint32(282).fork()).join();
        }
        if (message.yearHigh !== undefined) {
            YearHighEncode.encode(message.yearHigh, writer.uint32(290).fork()).join();
        }
        if (message.yearLow !== undefined) {
            YearLowEncode.encode(message.yearLow, writer.uint32(298).fork()).join();
        }
        if (message.volume !== undefined) {
            VolumeEncode.encode(message.volume, writer.uint32(306).fork()).join();
        }
        if (message.settlement !== undefined) {
            SettlementEncode.encode(message.settlement, writer.uint32(314).fork()).join();
        }
        if (message.openInterest !== undefined) {
            OpenInterestEncode.encode(message.openInterest, writer.uint32(322).fork()).join();
        }
        if (message.vwap !== undefined) {
            VwapEncode.encode(message.vwap, writer.uint32(330).fork()).join();
        }
        if (message.dividendsIncomeDistributions !== undefined) {
            DividendsIncomeDistributionsEncode.encode(message.dividendsIncomeDistributions, writer.uint32(338).fork()).join();
        }
        if (message.numberOfTrades !== undefined) {
            NumberOfTradesEncode.encode(message.numberOfTrades, writer.uint32(346).fork()).join();
        }
        if (message.monetaryValue !== undefined) {
            MonetaryValueEncode.encode(message.monetaryValue, writer.uint32(354).fork()).join();
        }
        if (message.capitalDistributions !== undefined) {
            CapitalDistributionsEncode.encode(message.capitalDistributions, writer.uint32(362).fork()).join();
        }
        if (message.sharesOutstanding !== undefined) {
            SharesOutstandingEncode.encode(message.sharesOutstanding, writer.uint32(370).fork()).join();
        }
        if (message.netAssetValue !== undefined) {
            NetAssetValueEncode.encode(message.netAssetValue, writer.uint32(378).fork()).join();
        }
        if (message.previousSession !== undefined) {
            MarketSessionEncode.encode(message.previousSession, writer.uint32(386).fork()).join();
        }
        if (message.tSession !== undefined) {
            MarketSessionEncode.encode(message.tSession, writer.uint32(394).fork()).join();
        }
        if (message.volumeAtPrice !== undefined) {
            VolumeAtPriceEncode.encode(message.volumeAtPrice, writer.uint32(402).fork()).join();
        }
        if (message.highRolling !== undefined) {
            HighRollingEncode.encode(message.highRolling, writer.uint32(410).fork()).join();
        }
        if (message.lowRolling !== undefined) {
            LowRollingEncode.encode(message.lowRolling, writer.uint32(418).fork()).join();
        }
        if (message.zSession !== undefined) {
            MarketSessionEncode.encode(message.zSession, writer.uint32(426).fork()).join();
        }
        if (message.referenceVolatilityPrice !== undefined) {
            ReferenceVolatilityPriceEncode.encode(message.referenceVolatilityPrice, writer.uint32(434).fork()).join();
        }
        if (message.priceLimits !== undefined) {
            PriceLimitsEncode.encode(message.priceLimits, writer.uint32(442).fork()).join();
        }
        for (const v of message.sessions) {
            MarketSessionEncode.encode(v!, writer.uint32(450).fork()).join();
        }
        if (message.officialBestBidOffer !== undefined) {
            OfficialBestBidOfferEncode.encode(message.officialBestBidOffer, writer.uint32(458).fork()).join();
        }
        if (message.marketOpenInterest !== undefined) {
            MarketOpenInterestEncode.encode(message.marketOpenInterest, writer.uint32(466).fork()).join();
        }
        return writer;
    }
}, MarketSnapshotDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): MarketSnapshot {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMarketSnapshot();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }
                    message.marketId = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 2: {
                    if (tag !== 16) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 3: {
                    if (tag !== 24) {
                        break;
                    }
                    message.marketSequence = Long.fromString(reader.int64().toString());
                    continue;
                }
                case 4: {
                    if (tag !== 32) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 5: {
                    if (tag !== 40) {
                        break;
                    }
                    message.totalChunks = reader.sint32();
                    continue;
                }
                case 6: {
                    if (tag !== 48) {
                        break;
                    }
                    message.currentChunk = reader.sint32();
                    continue;
                }
                case 7: {
                    if (tag !== 58) {
                        break;
                    }
                    message.symbol = reader.string();
                    continue;
                }
                case 8: {
                    if (tag !== 64) {
                        break;
                    }
                    message.priceDenominator = reader.sint32();
                    continue;
                }
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.service = reader.int32() as any;
                    continue;
                }
                case 10: {
                    if (tag !== 82) {
                        break;
                    }
                    message.instrumentStatus = InstrumentStatusDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 11: {
                    if (tag !== 90) {
                        break;
                    }
                    message.bbo = BestBidOfferDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 12: {
                    if (tag !== 98) {
                        break;
                    }
                    message.index = IndexValueDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 13: {
                    if (tag !== 106) {
                        break;
                    }
                    message.priceLevels.push(AddPriceLevelDecode.decode(reader, reader.uint32()));
                    continue;
                }
                case 14: {
                    if (tag !== 114) {
                        break;
                    }
                    message.orders.push(AddOrderDecode.decode(reader, reader.uint32()));
                    continue;
                }
                case 15: {
                    if (tag !== 122) {
                        break;
                    }
                    message.news = NewsDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 30: {
                    if (tag !== 242) {
                        break;
                    }
                    message.open = OpenDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 31: {
                    if (tag !== 250) {
                        break;
                    }
                    message.high = HighDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 32: {
                    if (tag !== 258) {
                        break;
                    }
                    message.low = LowDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 33: {
                    if (tag !== 266) {
                        break;
                    }
                    message.close = CloseDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 34: {
                    if (tag !== 274) {
                        break;
                    }
                    message.prevClose = PrevCloseDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 35: {
                    if (tag !== 282) {
                        break;
                    }
                    message.last = LastDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 36: {
                    if (tag !== 290) {
                        break;
                    }
                    message.yearHigh = YearHighDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 37: {
                    if (tag !== 298) {
                        break;
                    }
                    message.yearLow = YearLowDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 38: {
                    if (tag !== 306) {
                        break;
                    }
                    message.volume = VolumeDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 39: {
                    if (tag !== 314) {
                        break;
                    }
                    message.settlement = SettlementDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 40: {
                    if (tag !== 322) {
                        break;
                    }
                    message.openInterest = OpenInterestDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 41: {
                    if (tag !== 330) {
                        break;
                    }
                    message.vwap = VwapDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 42: {
                    if (tag !== 338) {
                        break;
                    }
                    message.dividendsIncomeDistributions = DividendsIncomeDistributionsDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 43: {
                    if (tag !== 346) {
                        break;
                    }
                    message.numberOfTrades = NumberOfTradesDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 44: {
                    if (tag !== 354) {
                        break;
                    }
                    message.monetaryValue = MonetaryValueDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 45: {
                    if (tag !== 362) {
                        break;
                    }
                    message.capitalDistributions = CapitalDistributionsDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 46: {
                    if (tag !== 370) {
                        break;
                    }
                    message.sharesOutstanding = SharesOutstandingDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 47: {
                    if (tag !== 378) {
                        break;
                    }
                    message.netAssetValue = NetAssetValueDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 48: {
                    if (tag !== 386) {
                        break;
                    }
                    message.previousSession = MarketSessionDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 49: {
                    if (tag !== 394) {
                        break;
                    }
                    message.tSession = MarketSessionDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 50: {
                    if (tag !== 402) {
                        break;
                    }
                    message.volumeAtPrice = VolumeAtPriceDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 51: {
                    if (tag !== 410) {
                        break;
                    }
                    message.highRolling = HighRollingDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 52: {
                    if (tag !== 418) {
                        break;
                    }
                    message.lowRolling = LowRollingDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 53: {
                    if (tag !== 426) {
                        break;
                    }
                    message.zSession = MarketSessionDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 54: {
                    if (tag !== 434) {
                        break;
                    }
                    message.referenceVolatilityPrice = ReferenceVolatilityPriceDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 55: {
                    if (tag !== 442) {
                        break;
                    }
                    message.priceLimits = PriceLimitsDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 56: {
                    if (tag !== 450) {
                        break;
                    }
                    message.sessions.push(MarketSessionDecode.decode(reader, reader.uint32()));
                    continue;
                }
                case 57: {
                    if (tag !== 458) {
                        break;
                    }
                    message.officialBestBidOffer = OfficialBestBidOfferDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 58: {
                    if (tag !== 466) {
                        break;
                    }
                    message.marketOpenInterest = MarketOpenInterestDecode.decode(reader, reader.uint32());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseMarketSnapshotResponse(): MarketSnapshotResponse {
    return { result: 0, message: "", marketSnapshot: undefined };
}
export const MarketSnapshotResponseEncode = {
    encode(message: MarketSnapshotResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (message.result !== 0) {
            writer.uint32(8).int32(message.result);
        }
        if (message.message !== "") {
            writer.uint32(18).string(message.message);
        }
        if (message.marketSnapshot !== undefined) {
            MarketSnapshotEncode.encode(message.marketSnapshot, writer.uint32(26).fork()).join();
        }
        return writer;
    }
}, MarketSnapshotResponseDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): MarketSnapshotResponse {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMarketSnapshotResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }
                    message.result = reader.int32() as any;
                    continue;
                }
                case 2: {
                    if (tag !== 18) {
                        break;
                    }
                    message.message = reader.string();
                    continue;
                }
                case 3: {
                    if (tag !== 26) {
                        break;
                    }
                    message.marketSnapshot = MarketSnapshotDecode.decode(reader, reader.uint32());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseMarketUpdate(): MarketUpdate {
    return {
        marketId: Long.ZERO,
        symbol: "",
        transactionTime: Long.ZERO,
        distributionTime: Long.ZERO,
        marketSequence: Long.ZERO,
        sourceSequence: Long.ZERO,
        originatorId: new Uint8Array(0),
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
        requestForQuote: undefined,
        referenceVolatilityPrice: undefined,
        priceLimits: undefined,
        officialBestBidOffer: undefined,
        marketOpenInterest: undefined,
    };
}
export const MarketUpdateEncode = {
    encode(message: MarketUpdate, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.marketId.equals(Long.ZERO)) {
            writer.uint32(8).sint64(message.marketId.toString());
        }
        if (message.symbol !== "") {
            writer.uint32(18).string(message.symbol);
        }
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(24).sint64(message.transactionTime.toString());
        }
        if (!message.distributionTime.equals(Long.ZERO)) {
            writer.uint32(32).sint64(message.distributionTime.toString());
        }
        if (!message.marketSequence.equals(Long.ZERO)) {
            writer.uint32(40).sint64(message.marketSequence.toString());
        }
        if (!message.sourceSequence.equals(Long.ZERO)) {
            writer.uint32(48).sint64(message.sourceSequence.toString());
        }
        if (message.originatorId.length !== 0) {
            writer.uint32(58).bytes(message.originatorId);
        }
        if (message.priceDenominator !== 0) {
            writer.uint32(72).sint32(message.priceDenominator);
        }
        if (message.context !== undefined) {
            ContextEncode.encode(message.context, writer.uint32(82).fork()).join();
        }
        if (message.session !== undefined) {
            MarketSessionEncode.encode(message.session, writer.uint32(90).fork()).join();
        }
        if (message.tSession !== undefined) {
            MarketSessionEncode.encode(message.tSession, writer.uint32(98).fork()).join();
        }
        if (message.previousSession !== undefined) {
            MarketSessionEncode.encode(message.previousSession, writer.uint32(106).fork()).join();
        }
        if (message.regional !== false) {
            writer.uint32(112).bool(message.regional);
        }
        if (message.zSession !== undefined) {
            MarketSessionEncode.encode(message.zSession, writer.uint32(122).fork()).join();
        }
        if (message.news !== undefined) {
            NewsEncode.encode(message.news, writer.uint32(162).fork()).join();
        }
        if (message.clearBook !== undefined) {
            ClearBookEncode.encode(message.clearBook, writer.uint32(170).fork()).join();
        }
        if (message.instrumentStatus !== undefined) {
            InstrumentStatusEncode.encode(message.instrumentStatus, writer.uint32(178).fork()).join();
        }
        if (message.bbo !== undefined) {
            BestBidOfferEncode.encode(message.bbo, writer.uint32(186).fork()).join();
        }
        if (message.depthPriceLevel !== undefined) {
            DepthPriceLevelEncode.encode(message.depthPriceLevel, writer.uint32(194).fork()).join();
        }
        if (message.depthOrder !== undefined) {
            DepthOrderEncode.encode(message.depthOrder, writer.uint32(202).fork()).join();
        }
        if (message.index !== undefined) {
            IndexValueEncode.encode(message.index, writer.uint32(210).fork()).join();
        }
        if (message.trades !== undefined) {
            TradesEncode.encode(message.trades, writer.uint32(218).fork()).join();
        }
        if (message.open !== undefined) {
            OpenEncode.encode(message.open, writer.uint32(226).fork()).join();
        }
        if (message.high !== undefined) {
            HighEncode.encode(message.high, writer.uint32(234).fork()).join();
        }
        if (message.low !== undefined) {
            LowEncode.encode(message.low, writer.uint32(242).fork()).join();
        }
        if (message.close !== undefined) {
            CloseEncode.encode(message.close, writer.uint32(250).fork()).join();
        }
        if (message.prevClose !== undefined) {
            PrevCloseEncode.encode(message.prevClose, writer.uint32(258).fork()).join();
        }
        if (message.last !== undefined) {
            LastEncode.encode(message.last, writer.uint32(266).fork()).join();
        }
        if (message.yearHigh !== undefined) {
            YearHighEncode.encode(message.yearHigh, writer.uint32(274).fork()).join();
        }
        if (message.yearLow !== undefined) {
            YearLowEncode.encode(message.yearLow, writer.uint32(282).fork()).join();
        }
        if (message.volume !== undefined) {
            VolumeEncode.encode(message.volume, writer.uint32(290).fork()).join();
        }
        if (message.settlement !== undefined) {
            SettlementEncode.encode(message.settlement, writer.uint32(298).fork()).join();
        }
        if (message.openInterest !== undefined) {
            OpenInterestEncode.encode(message.openInterest, writer.uint32(306).fork()).join();
        }
        if (message.vwap !== undefined) {
            VwapEncode.encode(message.vwap, writer.uint32(314).fork()).join();
        }
        if (message.dividendsIncomeDistributions !== undefined) {
            DividendsIncomeDistributionsEncode.encode(message.dividendsIncomeDistributions, writer.uint32(322).fork()).join();
        }
        if (message.numberOfTrades !== undefined) {
            NumberOfTradesEncode.encode(message.numberOfTrades, writer.uint32(330).fork()).join();
        }
        if (message.monetaryValue !== undefined) {
            MonetaryValueEncode.encode(message.monetaryValue, writer.uint32(338).fork()).join();
        }
        if (message.capitalDistributions !== undefined) {
            CapitalDistributionsEncode.encode(message.capitalDistributions, writer.uint32(346).fork()).join();
        }
        if (message.sharesOutstanding !== undefined) {
            SharesOutstandingEncode.encode(message.sharesOutstanding, writer.uint32(354).fork()).join();
        }
        if (message.netAssetValue !== undefined) {
            NetAssetValueEncode.encode(message.netAssetValue, writer.uint32(362).fork()).join();
        }
        if (message.marketSummary !== undefined) {
            MarketSummaryEncode.encode(message.marketSummary, writer.uint32(370).fork()).join();
        }
        if (message.highRolling !== undefined) {
            HighRollingEncode.encode(message.highRolling, writer.uint32(378).fork()).join();
        }
        if (message.lowRolling !== undefined) {
            LowRollingEncode.encode(message.lowRolling, writer.uint32(386).fork()).join();
        }
        if (message.requestForQuote !== undefined) {
            RequestForQuoteEncode.encode(message.requestForQuote, writer.uint32(394).fork()).join();
        }
        if (message.referenceVolatilityPrice !== undefined) {
            ReferenceVolatilityPriceEncode.encode(message.referenceVolatilityPrice, writer.uint32(402).fork()).join();
        }
        if (message.priceLimits !== undefined) {
            PriceLimitsEncode.encode(message.priceLimits, writer.uint32(410).fork()).join();
        }
        if (message.officialBestBidOffer !== undefined) {
            OfficialBestBidOfferEncode.encode(message.officialBestBidOffer, writer.uint32(418).fork()).join();
        }
        if (message.marketOpenInterest !== undefined) {
            MarketOpenInterestEncode.encode(message.marketOpenInterest, writer.uint32(426).fork()).join();
        }
        return writer;
    }
}, MarketUpdateDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): MarketUpdate {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMarketUpdate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }
                    message.marketId = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 2: {
                    if (tag !== 18) {
                        break;
                    }
                    message.symbol = reader.string();
                    continue;
                }
                case 3: {
                    if (tag !== 24) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 4: {
                    if (tag !== 32) {
                        break;
                    }
                    message.distributionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 5: {
                    if (tag !== 40) {
                        break;
                    }
                    message.marketSequence = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 6: {
                    if (tag !== 48) {
                        break;
                    }
                    message.sourceSequence = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 7: {
                    if (tag !== 58) {
                        break;
                    }
                    message.originatorId = reader.bytes();
                    continue;
                }
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.priceDenominator = reader.sint32();
                    continue;
                }
                case 10: {
                    if (tag !== 82) {
                        break;
                    }
                    message.context = ContextDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 11: {
                    if (tag !== 90) {
                        break;
                    }
                    message.session = MarketSessionDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 12: {
                    if (tag !== 98) {
                        break;
                    }
                    message.tSession = MarketSessionDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 13: {
                    if (tag !== 106) {
                        break;
                    }
                    message.previousSession = MarketSessionDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 14: {
                    if (tag !== 112) {
                        break;
                    }
                    message.regional = reader.bool();
                    continue;
                }
                case 15: {
                    if (tag !== 122) {
                        break;
                    }
                    message.zSession = MarketSessionDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 20: {
                    if (tag !== 162) {
                        break;
                    }
                    message.news = NewsDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 21: {
                    if (tag !== 170) {
                        break;
                    }
                    message.clearBook = ClearBookDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 22: {
                    if (tag !== 178) {
                        break;
                    }
                    message.instrumentStatus = InstrumentStatusDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 23: {
                    if (tag !== 186) {
                        break;
                    }
                    message.bbo = BestBidOfferDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 24: {
                    if (tag !== 194) {
                        break;
                    }
                    message.depthPriceLevel = DepthPriceLevelDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 25: {
                    if (tag !== 202) {
                        break;
                    }
                    message.depthOrder = DepthOrderDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 26: {
                    if (tag !== 210) {
                        break;
                    }
                    message.index = IndexValueDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 27: {
                    if (tag !== 218) {
                        break;
                    }
                    message.trades = TradesDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 28: {
                    if (tag !== 226) {
                        break;
                    }
                    message.open = OpenDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 29: {
                    if (tag !== 234) {
                        break;
                    }
                    message.high = HighDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 30: {
                    if (tag !== 242) {
                        break;
                    }
                    message.low = LowDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 31: {
                    if (tag !== 250) {
                        break;
                    }
                    message.close = CloseDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 32: {
                    if (tag !== 258) {
                        break;
                    }
                    message.prevClose = PrevCloseDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 33: {
                    if (tag !== 266) {
                        break;
                    }
                    message.last = LastDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 34: {
                    if (tag !== 274) {
                        break;
                    }
                    message.yearHigh = YearHighDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 35: {
                    if (tag !== 282) {
                        break;
                    }
                    message.yearLow = YearLowDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 36: {
                    if (tag !== 290) {
                        break;
                    }
                    message.volume = VolumeDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 37: {
                    if (tag !== 298) {
                        break;
                    }
                    message.settlement = SettlementDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 38: {
                    if (tag !== 306) {
                        break;
                    }
                    message.openInterest = OpenInterestDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 39: {
                    if (tag !== 314) {
                        break;
                    }
                    message.vwap = VwapDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 40: {
                    if (tag !== 322) {
                        break;
                    }
                    message.dividendsIncomeDistributions = DividendsIncomeDistributionsDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 41: {
                    if (tag !== 330) {
                        break;
                    }
                    message.numberOfTrades = NumberOfTradesDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 42: {
                    if (tag !== 338) {
                        break;
                    }
                    message.monetaryValue = MonetaryValueDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 43: {
                    if (tag !== 346) {
                        break;
                    }
                    message.capitalDistributions = CapitalDistributionsDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 44: {
                    if (tag !== 354) {
                        break;
                    }
                    message.sharesOutstanding = SharesOutstandingDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 45: {
                    if (tag !== 362) {
                        break;
                    }
                    message.netAssetValue = NetAssetValueDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 46: {
                    if (tag !== 370) {
                        break;
                    }
                    message.marketSummary = MarketSummaryDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 47: {
                    if (tag !== 378) {
                        break;
                    }
                    message.highRolling = HighRollingDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 48: {
                    if (tag !== 386) {
                        break;
                    }
                    message.lowRolling = LowRollingDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 49: {
                    if (tag !== 394) {
                        break;
                    }
                    message.requestForQuote = RequestForQuoteDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 50: {
                    if (tag !== 402) {
                        break;
                    }
                    message.referenceVolatilityPrice = ReferenceVolatilityPriceDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 51: {
                    if (tag !== 410) {
                        break;
                    }
                    message.priceLimits = PriceLimitsDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 52: {
                    if (tag !== 418) {
                        break;
                    }
                    message.officialBestBidOffer = OfficialBestBidOfferDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 53: {
                    if (tag !== 426) {
                        break;
                    }
                    message.marketOpenInterest = MarketOpenInterestDecode.decode(reader, reader.uint32());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseDepthPriceLevel(): DepthPriceLevel {
    return { levels: [] };
}
export const DepthPriceLevelEncode = {
    encode(message: DepthPriceLevel, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        for (const v of message.levels) {
            DepthPriceLevel_EntryEncode.encode(v!, writer.uint32(10).fork()).join();
        }
        return writer;
    }
}, DepthPriceLevelDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): DepthPriceLevel {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDepthPriceLevel();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 10) {
                        break;
                    }
                    message.levels.push(DepthPriceLevel_EntryDecode.decode(reader, reader.uint32()));
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseDepthPriceLevel_Entry(): DepthPriceLevel_Entry {
    return { addPriceLevel: undefined, deletePriceLevel: undefined, modifyPriceLevel: undefined };
}
export const DepthPriceLevel_EntryEncode = {
    encode(message: DepthPriceLevel_Entry, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (message.addPriceLevel !== undefined) {
            AddPriceLevelEncode.encode(message.addPriceLevel, writer.uint32(10).fork()).join();
        }
        if (message.deletePriceLevel !== undefined) {
            DeletePriceLevelEncode.encode(message.deletePriceLevel, writer.uint32(18).fork()).join();
        }
        if (message.modifyPriceLevel !== undefined) {
            ModifyPriceLevelEncode.encode(message.modifyPriceLevel, writer.uint32(26).fork()).join();
        }
        return writer;
    }
}, DepthPriceLevel_EntryDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): DepthPriceLevel_Entry {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDepthPriceLevel_Entry();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 10) {
                        break;
                    }
                    message.addPriceLevel = AddPriceLevelDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 2: {
                    if (tag !== 18) {
                        break;
                    }
                    message.deletePriceLevel = DeletePriceLevelDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 3: {
                    if (tag !== 26) {
                        break;
                    }
                    message.modifyPriceLevel = ModifyPriceLevelDecode.decode(reader, reader.uint32());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseDepthOrder(): DepthOrder {
    return { orders: [] };
}
export const DepthOrderEncode = {
    encode(message: DepthOrder, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        for (const v of message.orders) {
            DepthOrder_EntryEncode.encode(v!, writer.uint32(10).fork()).join();
        }
        return writer;
    }
}, DepthOrderDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): DepthOrder {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDepthOrder();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 10) {
                        break;
                    }
                    message.orders.push(DepthOrder_EntryDecode.decode(reader, reader.uint32()));
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseDepthOrder_Entry(): DepthOrder_Entry {
    return { addOrder: undefined, deleteOrder: undefined, modifyOrder: undefined };
}
export const DepthOrder_EntryEncode = {
    encode(message: DepthOrder_Entry, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (message.addOrder !== undefined) {
            AddOrderEncode.encode(message.addOrder, writer.uint32(10).fork()).join();
        }
        if (message.deleteOrder !== undefined) {
            DeleteOrderEncode.encode(message.deleteOrder, writer.uint32(18).fork()).join();
        }
        if (message.modifyOrder !== undefined) {
            ModifyOrderEncode.encode(message.modifyOrder, writer.uint32(26).fork()).join();
        }
        return writer;
    }
}, DepthOrder_EntryDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): DepthOrder_Entry {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDepthOrder_Entry();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 10) {
                        break;
                    }
                    message.addOrder = AddOrderDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 2: {
                    if (tag !== 18) {
                        break;
                    }
                    message.deleteOrder = DeleteOrderDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 3: {
                    if (tag !== 26) {
                        break;
                    }
                    message.modifyOrder = ModifyOrderDecode.decode(reader, reader.uint32());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseNews(): News {
    return { originationTime: Long.ZERO, source: "", languageCode: "", headLine: "", text: "", symbols: [] };
}
export const NewsEncode = {
    encode(message: News, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.originationTime.equals(Long.ZERO)) {
            writer.uint32(8).sint64(message.originationTime.toString());
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
    }
}, NewsDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): News {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseNews();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }
                    message.originationTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 2: {
                    if (tag !== 18) {
                        break;
                    }
                    message.source = reader.string();
                    continue;
                }
                case 3: {
                    if (tag !== 26) {
                        break;
                    }
                    message.languageCode = reader.string();
                    continue;
                }
                case 4: {
                    if (tag !== 34) {
                        break;
                    }
                    message.headLine = reader.string();
                    continue;
                }
                case 5: {
                    if (tag !== 42) {
                        break;
                    }
                    message.text = reader.string();
                    continue;
                }
                case 6: {
                    if (tag !== 50) {
                        break;
                    }
                    message.symbols.push(reader.string());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseClearBook(): ClearBook {
    return { reserved: 0, transactionTime: Long.ZERO };
}
export const ClearBookEncode = {
    encode(message: ClearBook, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (message.reserved !== 0) {
            writer.uint32(8).sint32(message.reserved);
        }
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(16).sint64(message.transactionTime.toString());
        }
        return writer;
    }
}, ClearBookDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): ClearBook {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseClearBook();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }
                    message.reserved = reader.sint32();
                    continue;
                }
                case 2: {
                    if (tag !== 16) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseInstrumentStatus(): InstrumentStatus {
    return {
        transactionTime: Long.ZERO,
        tradingStatus: 0,
        openingTime: Long.ZERO,
        note: "",
        tradeDate: 0,
        regulationSHOShortSalePriceTest: 0,
        priorTradingStatus: 0,
    };
}
export const InstrumentStatusEncode = {
    encode(message: InstrumentStatus, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (message.tradingStatus !== 0) {
            writer.uint32(80).int32(message.tradingStatus);
        }
        if (!message.openingTime.equals(Long.ZERO)) {
            writer.uint32(88).sint64(message.openingTime.toString());
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
        if (message.priorTradingStatus !== 0) {
            writer.uint32(120).int32(message.priorTradingStatus);
        }
        return writer;
    }
}, InstrumentStatusDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): InstrumentStatus {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInstrumentStatus();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.tradingStatus = reader.int32() as any;
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.openingTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 12: {
                    if (tag !== 98) {
                        break;
                    }
                    message.note = reader.string();
                    continue;
                }
                case 13: {
                    if (tag !== 104) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 14: {
                    if (tag !== 112) {
                        break;
                    }
                    message.regulationSHOShortSalePriceTest = reader.int32() as any;
                    continue;
                }
                case 15: {
                    if (tag !== 120) {
                        break;
                    }
                    message.priorTradingStatus = reader.int32() as any;
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseBestBidOffer(): BestBidOffer {
    return {
        transactionTime: Long.ZERO,
        bidPrice: Long.ZERO,
        bidQuantity: Long.ZERO,
        bidOrderCount: 0,
        bidOriginator: new Uint8Array(0),
        bidQuoteCondition: new Uint8Array(0),
        offerPrice: Long.ZERO,
        offerQuantity: Long.ZERO,
        offerOrderCount: 0,
        offerOriginator: new Uint8Array(0),
        offerQuoteCondition: new Uint8Array(0),
        quoteCondition: new Uint8Array(0),
        regional: false,
        transient: false,
    };
}
export const BestBidOfferEncode = {
    encode(message: BestBidOffer, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (!message.bidPrice.equals(Long.ZERO)) {
            writer.uint32(80).sint64(message.bidPrice.toString());
        }
        if (!message.bidQuantity.equals(Long.ZERO)) {
            writer.uint32(88).sint64(message.bidQuantity.toString());
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
        if (!message.offerPrice.equals(Long.ZERO)) {
            writer.uint32(160).sint64(message.offerPrice.toString());
        }
        if (!message.offerQuantity.equals(Long.ZERO)) {
            writer.uint32(168).sint64(message.offerQuantity.toString());
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
        if (message.regional !== false) {
            writer.uint32(256).bool(message.regional);
        }
        if (message.transient !== false) {
            writer.uint32(264).bool(message.transient);
        }
        return writer;
    }
}, BestBidOfferDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): BestBidOffer {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBestBidOffer();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.bidPrice = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.bidQuantity = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 12: {
                    if (tag !== 96) {
                        break;
                    }
                    message.bidOrderCount = reader.sint32();
                    continue;
                }
                case 13: {
                    if (tag !== 106) {
                        break;
                    }
                    message.bidOriginator = reader.bytes();
                    continue;
                }
                case 14: {
                    if (tag !== 114) {
                        break;
                    }
                    message.bidQuoteCondition = reader.bytes();
                    continue;
                }
                case 20: {
                    if (tag !== 160) {
                        break;
                    }
                    message.offerPrice = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 21: {
                    if (tag !== 168) {
                        break;
                    }
                    message.offerQuantity = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 22: {
                    if (tag !== 176) {
                        break;
                    }
                    message.offerOrderCount = reader.sint32();
                    continue;
                }
                case 23: {
                    if (tag !== 186) {
                        break;
                    }
                    message.offerOriginator = reader.bytes();
                    continue;
                }
                case 24: {
                    if (tag !== 194) {
                        break;
                    }
                    message.offerQuoteCondition = reader.bytes();
                    continue;
                }
                case 30: {
                    if (tag !== 242) {
                        break;
                    }
                    message.quoteCondition = reader.bytes();
                    continue;
                }
                case 32: {
                    if (tag !== 256) {
                        break;
                    }
                    message.regional = reader.bool();
                    continue;
                }
                case 33: {
                    if (tag !== 264) {
                        break;
                    }
                    message.transient = reader.bool();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseOfficialBestBidOffer(): OfficialBestBidOffer {
    return { tradeDate: 0, transactionTime: Long.ZERO, bidPrice: Long.ZERO, offerPrice: Long.ZERO };
}
export const OfficialBestBidOfferEncode = {
    encode(message: OfficialBestBidOffer, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (message.tradeDate !== 0) {
            writer.uint32(64).sint32(message.tradeDate);
        }
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (!message.bidPrice.equals(Long.ZERO)) {
            writer.uint32(80).sint64(message.bidPrice.toString());
        }
        if (!message.offerPrice.equals(Long.ZERO)) {
            writer.uint32(88).sint64(message.offerPrice.toString());
        }
        return writer;
    }
}, OfficialBestBidOfferDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): OfficialBestBidOffer {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOfficialBestBidOffer();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 8: {
                    if (tag !== 64) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.bidPrice = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.offerPrice = Long.fromString(reader.sint64().toString());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
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
export const AddPriceLevelEncode = {
    encode(message: AddPriceLevel, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (message.level !== 0) {
            writer.uint32(80).sint32(message.level);
        }
        if (message.side !== 0) {
            writer.uint32(88).int32(message.side);
        }
        if (!message.price.equals(Long.ZERO)) {
            writer.uint32(96).sint64(message.price.toString());
        }
        if (!message.quantity.equals(Long.ZERO)) {
            writer.uint32(104).sint64(message.quantity.toString());
        }
        if (message.orderCount !== 0) {
            writer.uint32(112).sint32(message.orderCount);
        }
        if (!message.impliedQuantity.equals(Long.ZERO)) {
            writer.uint32(120).sint64(message.impliedQuantity.toString());
        }
        return writer;
    }
}, AddPriceLevelDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): AddPriceLevel {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAddPriceLevel();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.level = reader.sint32();
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.side = reader.int32() as any;
                    continue;
                }
                case 12: {
                    if (tag !== 96) {
                        break;
                    }
                    message.price = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 13: {
                    if (tag !== 104) {
                        break;
                    }
                    message.quantity = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 14: {
                    if (tag !== 112) {
                        break;
                    }
                    message.orderCount = reader.sint32();
                    continue;
                }
                case 15: {
                    if (tag !== 120) {
                        break;
                    }
                    message.impliedQuantity = Long.fromString(reader.sint64().toString());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseDeletePriceLevel(): DeletePriceLevel {
    return { transactionTime: Long.ZERO, level: 0, side: 0 };
}
export const DeletePriceLevelEncode = {
    encode(message: DeletePriceLevel, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (message.level !== 0) {
            writer.uint32(80).sint32(message.level);
        }
        if (message.side !== 0) {
            writer.uint32(88).int32(message.side);
        }
        return writer;
    }
}, DeletePriceLevelDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): DeletePriceLevel {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDeletePriceLevel();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.level = reader.sint32();
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.side = reader.int32() as any;
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
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
export const ModifyPriceLevelEncode = {
    encode(message: ModifyPriceLevel, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (message.level !== 0) {
            writer.uint32(80).sint32(message.level);
        }
        if (message.side !== 0) {
            writer.uint32(88).int32(message.side);
        }
        if (!message.price.equals(Long.ZERO)) {
            writer.uint32(96).sint64(message.price.toString());
        }
        if (!message.quantity.equals(Long.ZERO)) {
            writer.uint32(104).sint64(message.quantity.toString());
        }
        if (message.orderCount !== 0) {
            writer.uint32(112).sint32(message.orderCount);
        }
        if (!message.impliedQuantity.equals(Long.ZERO)) {
            writer.uint32(120).sint64(message.impliedQuantity.toString());
        }
        return writer;
    }
}, ModifyPriceLevelDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): ModifyPriceLevel {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseModifyPriceLevel();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.level = reader.sint32();
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.side = reader.int32() as any;
                    continue;
                }
                case 12: {
                    if (tag !== 96) {
                        break;
                    }
                    message.price = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 13: {
                    if (tag !== 104) {
                        break;
                    }
                    message.quantity = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 14: {
                    if (tag !== 112) {
                        break;
                    }
                    message.orderCount = reader.sint32();
                    continue;
                }
                case 15: {
                    if (tag !== 120) {
                        break;
                    }
                    message.impliedQuantity = Long.fromString(reader.sint64().toString());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
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
export const AddOrderEncode = {
    encode(message: AddOrder, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (!message.orderId.equals(Long.ZERO)) {
            writer.uint32(80).sint64(message.orderId.toString());
        }
        if (message.side !== 0) {
            writer.uint32(88).int32(message.side);
        }
        if (!message.price.equals(Long.ZERO)) {
            writer.uint32(96).sint64(message.price.toString());
        }
        if (!message.quantity.equals(Long.ZERO)) {
            writer.uint32(104).sint64(message.quantity.toString());
        }
        if (message.isImplied !== false) {
            writer.uint32(112).bool(message.isImplied);
        }
        if (!message.priority.equals(Long.ZERO)) {
            writer.uint32(120).sint64(message.priority.toString());
        }
        return writer;
    }
}, AddOrderDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): AddOrder {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAddOrder();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.orderId = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.side = reader.int32() as any;
                    continue;
                }
                case 12: {
                    if (tag !== 96) {
                        break;
                    }
                    message.price = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 13: {
                    if (tag !== 104) {
                        break;
                    }
                    message.quantity = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 14: {
                    if (tag !== 112) {
                        break;
                    }
                    message.isImplied = reader.bool();
                    continue;
                }
                case 15: {
                    if (tag !== 120) {
                        break;
                    }
                    message.priority = Long.fromString(reader.sint64().toString());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseDeleteOrder(): DeleteOrder {
    return { transactionTime: Long.ZERO, orderId: Long.ZERO, side: 0 };
}
export const DeleteOrderEncode = {
    encode(message: DeleteOrder, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (!message.orderId.equals(Long.ZERO)) {
            writer.uint32(80).sint64(message.orderId.toString());
        }
        if (message.side !== 0) {
            writer.uint32(88).int32(message.side);
        }
        return writer;
    }
}, DeleteOrderDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): DeleteOrder {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDeleteOrder();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.orderId = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.side = reader.int32() as any;
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
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
export const ModifyOrderEncode = {
    encode(message: ModifyOrder, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (!message.orderId.equals(Long.ZERO)) {
            writer.uint32(80).sint64(message.orderId.toString());
        }
        if (message.side !== 0) {
            writer.uint32(88).int32(message.side);
        }
        if (!message.price.equals(Long.ZERO)) {
            writer.uint32(96).sint64(message.price.toString());
        }
        if (!message.quantity.equals(Long.ZERO)) {
            writer.uint32(104).sint64(message.quantity.toString());
        }
        if (message.isImplied !== false) {
            writer.uint32(112).bool(message.isImplied);
        }
        if (!message.priority.equals(Long.ZERO)) {
            writer.uint32(120).sint64(message.priority.toString());
        }
        return writer;
    }
}, ModifyOrderDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): ModifyOrder {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseModifyOrder();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.orderId = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.side = reader.int32() as any;
                    continue;
                }
                case 12: {
                    if (tag !== 96) {
                        break;
                    }
                    message.price = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 13: {
                    if (tag !== 104) {
                        break;
                    }
                    message.quantity = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 14: {
                    if (tag !== 112) {
                        break;
                    }
                    message.isImplied = reader.bool();
                    continue;
                }
                case 15: {
                    if (tag !== 120) {
                        break;
                    }
                    message.priority = Long.fromString(reader.sint64().toString());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
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
export const IndexValueEncode = {
    encode(message: IndexValue, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (message.tradeDate !== 0) {
            writer.uint32(80).sint32(message.tradeDate);
        }
        if (!message.last.equals(Long.ZERO)) {
            writer.uint32(88).sint64(message.last.toString());
        }
        if (!message.volume.equals(Long.ZERO)) {
            writer.uint32(96).sint64(message.volume.toString());
        }
        if (!message.open.equals(Long.ZERO)) {
            writer.uint32(104).sint64(message.open.toString());
        }
        if (!message.settlementOpen.equals(Long.ZERO)) {
            writer.uint32(112).sint64(message.settlementOpen.toString());
        }
        if (!message.specialOpen.equals(Long.ZERO)) {
            writer.uint32(120).sint64(message.specialOpen.toString());
        }
        if (!message.high.equals(Long.ZERO)) {
            writer.uint32(128).sint64(message.high.toString());
        }
        if (!message.low.equals(Long.ZERO)) {
            writer.uint32(136).sint64(message.low.toString());
        }
        if (!message.close.equals(Long.ZERO)) {
            writer.uint32(144).sint64(message.close.toString());
        }
        if (!message.bid.equals(Long.ZERO)) {
            writer.uint32(152).sint64(message.bid.toString());
        }
        if (!message.offer.equals(Long.ZERO)) {
            writer.uint32(160).sint64(message.offer.toString());
        }
        return writer;
    }
}, IndexValueDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): IndexValue {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIndexValue();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.last = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 12: {
                    if (tag !== 96) {
                        break;
                    }
                    message.volume = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 13: {
                    if (tag !== 104) {
                        break;
                    }
                    message.open = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 14: {
                    if (tag !== 112) {
                        break;
                    }
                    message.settlementOpen = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 15: {
                    if (tag !== 120) {
                        break;
                    }
                    message.specialOpen = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 16: {
                    if (tag !== 128) {
                        break;
                    }
                    message.high = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 17: {
                    if (tag !== 136) {
                        break;
                    }
                    message.low = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 18: {
                    if (tag !== 144) {
                        break;
                    }
                    message.close = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 19: {
                    if (tag !== 152) {
                        break;
                    }
                    message.bid = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 20: {
                    if (tag !== 160) {
                        break;
                    }
                    message.offer = Long.fromString(reader.sint64().toString());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseTrades(): Trades {
    return { trades: [] };
}
export const TradesEncode = {
    encode(message: Trades, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        for (const v of message.trades) {
            Trades_EntryEncode.encode(v!, writer.uint32(10).fork()).join();
        }
        return writer;
    }
}, TradesDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): Trades {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTrades();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 10) {
                        break;
                    }
                    message.trades.push(Trades_EntryDecode.decode(reader, reader.uint32()));
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseTrades_Entry(): Trades_Entry {
    return { trade: undefined, tradeCorrection: undefined, tradeCancel: undefined };
}
export const Trades_EntryEncode = {
    encode(message: Trades_Entry, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (message.trade !== undefined) {
            TradeEncode.encode(message.trade, writer.uint32(10).fork()).join();
        }
        if (message.tradeCorrection !== undefined) {
            TradeCorrectionEncode.encode(message.tradeCorrection, writer.uint32(18).fork()).join();
        }
        if (message.tradeCancel !== undefined) {
            TradeCancelEncode.encode(message.tradeCancel, writer.uint32(26).fork()).join();
        }
        return writer;
    }
}, Trades_EntryDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): Trades_Entry {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTrades_Entry();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 10) {
                        break;
                    }
                    message.trade = TradeDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 2: {
                    if (tag !== 18) {
                        break;
                    }
                    message.tradeCorrection = TradeCorrectionDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 3: {
                    if (tag !== 26) {
                        break;
                    }
                    message.tradeCancel = TradeCancelDecode.decode(reader, reader.uint32());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseTrade(): Trade {
    return {
        originatorId: new Uint8Array(0),
        transactionTime: Long.ZERO,
        price: Long.ZERO,
        quantity: Long.ZERO,
        tradeId: new Uint8Array(0),
        side: 0,
        tradeDate: 0,
        buyerId: new Uint8Array(0),
        sellerId: new Uint8Array(0),
        openingTrade: false,
        systemPriced: false,
        marketOnClose: false,
        oddLot: false,
        settlementTerms: 0,
        crossType: 0,
        byPass: false,
        lastPrice: Long.ZERO,
        saleCondition: new Uint8Array(0),
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
export const TradeEncode = {
    encode(message: Trade, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (message.originatorId.length !== 0) {
            writer.uint32(66).bytes(message.originatorId);
        }
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (!message.price.equals(Long.ZERO)) {
            writer.uint32(80).sint64(message.price.toString());
        }
        if (!message.quantity.equals(Long.ZERO)) {
            writer.uint32(88).sint64(message.quantity.toString());
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
        if (message.openingTrade !== false) {
            writer.uint32(136).bool(message.openingTrade);
        }
        if (message.systemPriced !== false) {
            writer.uint32(144).bool(message.systemPriced);
        }
        if (message.marketOnClose !== false) {
            writer.uint32(152).bool(message.marketOnClose);
        }
        if (message.oddLot !== false) {
            writer.uint32(160).bool(message.oddLot);
        }
        if (message.settlementTerms !== 0) {
            writer.uint32(168).int32(message.settlementTerms);
        }
        if (message.crossType !== 0) {
            writer.uint32(176).int32(message.crossType);
        }
        if (message.byPass !== false) {
            writer.uint32(184).bool(message.byPass);
        }
        if (!message.lastPrice.equals(Long.ZERO)) {
            writer.uint32(192).sint64(message.lastPrice.toString());
        }
        if (message.saleCondition.length !== 0) {
            writer.uint32(202).bytes(message.saleCondition);
        }
        if (message.currency !== "") {
            writer.uint32(210).string(message.currency);
        }
        if (message.doesNotUpdateLast !== false) {
            writer.uint32(216).bool(message.doesNotUpdateLast);
        }
        if (message.doesNotUpdateVolume !== false) {
            writer.uint32(224).bool(message.doesNotUpdateVolume);
        }
        if (message.session !== "") {
            writer.uint32(242).string(message.session);
        }
        if (message.blockTrade !== false) {
            writer.uint32(248).bool(message.blockTrade);
        }
        if (!message.distributionTime.equals(Long.ZERO)) {
            writer.uint32(256).sint64(message.distributionTime.toString());
        }
        if (!message.transactionTime2.equals(Long.ZERO)) {
            writer.uint32(264).sint64(message.transactionTime2.toString());
        }
        if (message.consolidatedPriceIndicator !== "") {
            writer.uint32(274).string(message.consolidatedPriceIndicator);
        }
        if (message.transient !== false) {
            writer.uint32(280).bool(message.transient);
        }
        if (message.indexShortName !== "") {
            writer.uint32(290).string(message.indexShortName);
        }
        return writer;
    }
}, TradeDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): Trade {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTrade();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 8: {
                    if (tag !== 66) {
                        break;
                    }
                    message.originatorId = reader.bytes();
                    continue;
                }
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.price = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.quantity = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 12: {
                    if (tag !== 98) {
                        break;
                    }
                    message.tradeId = reader.bytes();
                    continue;
                }
                case 13: {
                    if (tag !== 104) {
                        break;
                    }
                    message.side = reader.int32() as any;
                    continue;
                }
                case 14: {
                    if (tag !== 112) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 15: {
                    if (tag !== 122) {
                        break;
                    }
                    message.buyerId = reader.bytes();
                    continue;
                }
                case 16: {
                    if (tag !== 130) {
                        break;
                    }
                    message.sellerId = reader.bytes();
                    continue;
                }
                case 17: {
                    if (tag !== 136) {
                        break;
                    }
                    message.openingTrade = reader.bool();
                    continue;
                }
                case 18: {
                    if (tag !== 144) {
                        break;
                    }
                    message.systemPriced = reader.bool();
                    continue;
                }
                case 19: {
                    if (tag !== 152) {
                        break;
                    }
                    message.marketOnClose = reader.bool();
                    continue;
                }
                case 20: {
                    if (tag !== 160) {
                        break;
                    }
                    message.oddLot = reader.bool();
                    continue;
                }
                case 21: {
                    if (tag !== 168) {
                        break;
                    }
                    message.settlementTerms = reader.int32() as any;
                    continue;
                }
                case 22: {
                    if (tag !== 176) {
                        break;
                    }
                    message.crossType = reader.int32() as any;
                    continue;
                }
                case 23: {
                    if (tag !== 184) {
                        break;
                    }
                    message.byPass = reader.bool();
                    continue;
                }
                case 24: {
                    if (tag !== 192) {
                        break;
                    }
                    message.lastPrice = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 25: {
                    if (tag !== 202) {
                        break;
                    }
                    message.saleCondition = reader.bytes();
                    continue;
                }
                case 26: {
                    if (tag !== 210) {
                        break;
                    }
                    message.currency = reader.string();
                    continue;
                }
                case 27: {
                    if (tag !== 216) {
                        break;
                    }
                    message.doesNotUpdateLast = reader.bool();
                    continue;
                }
                case 28: {
                    if (tag !== 224) {
                        break;
                    }
                    message.doesNotUpdateVolume = reader.bool();
                    continue;
                }
                case 30: {
                    if (tag !== 242) {
                        break;
                    }
                    message.session = reader.string();
                    continue;
                }
                case 31: {
                    if (tag !== 248) {
                        break;
                    }
                    message.blockTrade = reader.bool();
                    continue;
                }
                case 32: {
                    if (tag !== 256) {
                        break;
                    }
                    message.distributionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 33: {
                    if (tag !== 264) {
                        break;
                    }
                    message.transactionTime2 = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 34: {
                    if (tag !== 274) {
                        break;
                    }
                    message.consolidatedPriceIndicator = reader.string();
                    continue;
                }
                case 35: {
                    if (tag !== 280) {
                        break;
                    }
                    message.transient = reader.bool();
                    continue;
                }
                case 36: {
                    if (tag !== 290) {
                        break;
                    }
                    message.indexShortName = reader.string();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseTradeCorrection(): TradeCorrection {
    return {
        originatorId: new Uint8Array(0),
        transactionTime: Long.ZERO,
        price: Long.ZERO,
        quantity: Long.ZERO,
        tradeId: new Uint8Array(0),
        side: 0,
        tradeDate: 0,
        buyerId: new Uint8Array(0),
        sellerId: new Uint8Array(0),
        openingTrade: false,
        systemPriced: false,
        marketOnClose: false,
        oddLot: false,
        settlementTerms: 0,
        crossType: 0,
        byPass: false,
        originalTradeId: new Uint8Array(0),
        saleCondition: new Uint8Array(0),
        currency: "",
        distributionTime: Long.ZERO,
        transactionTime2: Long.ZERO,
        originalTradePrice: Long.ZERO,
        originalTradeQuantity: Long.ZERO,
    };
}
export const TradeCorrectionEncode = {
    encode(message: TradeCorrection, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (message.originatorId.length !== 0) {
            writer.uint32(66).bytes(message.originatorId);
        }
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (!message.price.equals(Long.ZERO)) {
            writer.uint32(80).sint64(message.price.toString());
        }
        if (!message.quantity.equals(Long.ZERO)) {
            writer.uint32(88).sint64(message.quantity.toString());
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
        if (message.openingTrade !== false) {
            writer.uint32(136).bool(message.openingTrade);
        }
        if (message.systemPriced !== false) {
            writer.uint32(144).bool(message.systemPriced);
        }
        if (message.marketOnClose !== false) {
            writer.uint32(152).bool(message.marketOnClose);
        }
        if (message.oddLot !== false) {
            writer.uint32(160).bool(message.oddLot);
        }
        if (message.settlementTerms !== 0) {
            writer.uint32(168).int32(message.settlementTerms);
        }
        if (message.crossType !== 0) {
            writer.uint32(176).int32(message.crossType);
        }
        if (message.byPass !== false) {
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
        if (!message.distributionTime.equals(Long.ZERO)) {
            writer.uint32(216).sint64(message.distributionTime.toString());
        }
        if (!message.transactionTime2.equals(Long.ZERO)) {
            writer.uint32(224).sint64(message.transactionTime2.toString());
        }
        if (!message.originalTradePrice.equals(Long.ZERO)) {
            writer.uint32(232).sint64(message.originalTradePrice.toString());
        }
        if (!message.originalTradeQuantity.equals(Long.ZERO)) {
            writer.uint32(240).sint64(message.originalTradeQuantity.toString());
        }
        return writer;
    }
}, TradeCorrectionDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): TradeCorrection {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTradeCorrection();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 8: {
                    if (tag !== 66) {
                        break;
                    }
                    message.originatorId = reader.bytes();
                    continue;
                }
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.price = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.quantity = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 12: {
                    if (tag !== 98) {
                        break;
                    }
                    message.tradeId = reader.bytes();
                    continue;
                }
                case 13: {
                    if (tag !== 104) {
                        break;
                    }
                    message.side = reader.int32() as any;
                    continue;
                }
                case 14: {
                    if (tag !== 112) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 15: {
                    if (tag !== 122) {
                        break;
                    }
                    message.buyerId = reader.bytes();
                    continue;
                }
                case 16: {
                    if (tag !== 130) {
                        break;
                    }
                    message.sellerId = reader.bytes();
                    continue;
                }
                case 17: {
                    if (tag !== 136) {
                        break;
                    }
                    message.openingTrade = reader.bool();
                    continue;
                }
                case 18: {
                    if (tag !== 144) {
                        break;
                    }
                    message.systemPriced = reader.bool();
                    continue;
                }
                case 19: {
                    if (tag !== 152) {
                        break;
                    }
                    message.marketOnClose = reader.bool();
                    continue;
                }
                case 20: {
                    if (tag !== 160) {
                        break;
                    }
                    message.oddLot = reader.bool();
                    continue;
                }
                case 21: {
                    if (tag !== 168) {
                        break;
                    }
                    message.settlementTerms = reader.int32() as any;
                    continue;
                }
                case 22: {
                    if (tag !== 176) {
                        break;
                    }
                    message.crossType = reader.int32() as any;
                    continue;
                }
                case 23: {
                    if (tag !== 184) {
                        break;
                    }
                    message.byPass = reader.bool();
                    continue;
                }
                case 24: {
                    if (tag !== 194) {
                        break;
                    }
                    message.originalTradeId = reader.bytes();
                    continue;
                }
                case 25: {
                    if (tag !== 202) {
                        break;
                    }
                    message.saleCondition = reader.bytes();
                    continue;
                }
                case 26: {
                    if (tag !== 210) {
                        break;
                    }
                    message.currency = reader.string();
                    continue;
                }
                case 27: {
                    if (tag !== 216) {
                        break;
                    }
                    message.distributionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 28: {
                    if (tag !== 224) {
                        break;
                    }
                    message.transactionTime2 = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 29: {
                    if (tag !== 232) {
                        break;
                    }
                    message.originalTradePrice = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 30: {
                    if (tag !== 240) {
                        break;
                    }
                    message.originalTradeQuantity = Long.fromString(reader.sint64().toString());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseTradeCancel(): TradeCancel {
    return {
        originatorId: new Uint8Array(0),
        transactionTime: Long.ZERO,
        correctedTradePrice: Long.ZERO,
        correctedTradeQuantity: Long.ZERO,
        tradeId: new Uint8Array(0),
        saleCondition: new Uint8Array(0),
        currency: "",
        distributionTime: Long.ZERO,
        transactionTime2: Long.ZERO,
    };
}
export const TradeCancelEncode = {
    encode(message: TradeCancel, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (message.originatorId.length !== 0) {
            writer.uint32(66).bytes(message.originatorId);
        }
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (!message.correctedTradePrice.equals(Long.ZERO)) {
            writer.uint32(80).sint64(message.correctedTradePrice.toString());
        }
        if (!message.correctedTradeQuantity.equals(Long.ZERO)) {
            writer.uint32(88).sint64(message.correctedTradeQuantity.toString());
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
        if (!message.distributionTime.equals(Long.ZERO)) {
            writer.uint32(120).sint64(message.distributionTime.toString());
        }
        if (!message.transactionTime2.equals(Long.ZERO)) {
            writer.uint32(128).sint64(message.transactionTime2.toString());
        }
        return writer;
    }
}, TradeCancelDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): TradeCancel {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTradeCancel();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 8: {
                    if (tag !== 66) {
                        break;
                    }
                    message.originatorId = reader.bytes();
                    continue;
                }
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.correctedTradePrice = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.correctedTradeQuantity = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 12: {
                    if (tag !== 98) {
                        break;
                    }
                    message.tradeId = reader.bytes();
                    continue;
                }
                case 13: {
                    if (tag !== 106) {
                        break;
                    }
                    message.saleCondition = reader.bytes();
                    continue;
                }
                case 14: {
                    if (tag !== 114) {
                        break;
                    }
                    message.currency = reader.string();
                    continue;
                }
                case 15: {
                    if (tag !== 120) {
                        break;
                    }
                    message.distributionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 16: {
                    if (tag !== 128) {
                        break;
                    }
                    message.transactionTime2 = Long.fromString(reader.sint64().toString());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseOpen(): Open {
    return { transactionTime: Long.ZERO, tradeDate: 0, price: Long.ZERO, OpenCloseSettlementFlag: 0, currency: "" };
}
export const OpenEncode = {
    encode(message: Open, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (message.tradeDate !== 0) {
            writer.uint32(80).sint32(message.tradeDate);
        }
        if (!message.price.equals(Long.ZERO)) {
            writer.uint32(88).sint64(message.price.toString());
        }
        if (message.OpenCloseSettlementFlag !== 0) {
            writer.uint32(96).int32(message.OpenCloseSettlementFlag);
        }
        if (message.currency !== "") {
            writer.uint32(106).string(message.currency);
        }
        return writer;
    }
}, OpenDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): Open {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOpen();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.price = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 12: {
                    if (tag !== 96) {
                        break;
                    }
                    message.OpenCloseSettlementFlag = reader.int32() as any;
                    continue;
                }
                case 13: {
                    if (tag !== 106) {
                        break;
                    }
                    message.currency = reader.string();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseHigh(): High {
    return { transactionTime: Long.ZERO, tradeDate: 0, price: Long.ZERO, currency: "" };
}
export const HighEncode = {
    encode(message: High, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (message.tradeDate !== 0) {
            writer.uint32(80).sint32(message.tradeDate);
        }
        if (!message.price.equals(Long.ZERO)) {
            writer.uint32(88).sint64(message.price.toString());
        }
        if (message.currency !== "") {
            writer.uint32(98).string(message.currency);
        }
        return writer;
    }
}, HighDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): High {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseHigh();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.price = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 12: {
                    if (tag !== 98) {
                        break;
                    }
                    message.currency = reader.string();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseHighRolling(): HighRolling {
    return { transactionTime: Long.ZERO, tradeDate: 0, price: Long.ZERO, currency: "" };
}
export const HighRollingEncode = {
    encode(message: HighRolling, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (message.tradeDate !== 0) {
            writer.uint32(80).sint32(message.tradeDate);
        }
        if (!message.price.equals(Long.ZERO)) {
            writer.uint32(88).sint64(message.price.toString());
        }
        if (message.currency !== "") {
            writer.uint32(98).string(message.currency);
        }
        return writer;
    }
}, HighRollingDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): HighRolling {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseHighRolling();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.price = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 12: {
                    if (tag !== 98) {
                        break;
                    }
                    message.currency = reader.string();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseLow(): Low {
    return { transactionTime: Long.ZERO, tradeDate: 0, price: Long.ZERO, currency: "" };
}
export const LowEncode = {
    encode(message: Low, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (message.tradeDate !== 0) {
            writer.uint32(80).sint32(message.tradeDate);
        }
        if (!message.price.equals(Long.ZERO)) {
            writer.uint32(88).sint64(message.price.toString());
        }
        if (message.currency !== "") {
            writer.uint32(98).string(message.currency);
        }
        return writer;
    }
}, LowDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): Low {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLow();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.price = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 12: {
                    if (tag !== 98) {
                        break;
                    }
                    message.currency = reader.string();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseLowRolling(): LowRolling {
    return { transactionTime: Long.ZERO, tradeDate: 0, price: Long.ZERO, currency: "" };
}
export const LowRollingEncode = {
    encode(message: LowRolling, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (message.tradeDate !== 0) {
            writer.uint32(80).sint32(message.tradeDate);
        }
        if (!message.price.equals(Long.ZERO)) {
            writer.uint32(88).sint64(message.price.toString());
        }
        if (message.currency !== "") {
            writer.uint32(98).string(message.currency);
        }
        return writer;
    }
}, LowRollingDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): LowRolling {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLowRolling();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.price = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 12: {
                    if (tag !== 98) {
                        break;
                    }
                    message.currency = reader.string();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseClose(): Close {
    return { transactionTime: Long.ZERO, tradeDate: 0, price: Long.ZERO, currency: "" };
}
export const CloseEncode = {
    encode(message: Close, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (message.tradeDate !== 0) {
            writer.uint32(80).sint32(message.tradeDate);
        }
        if (!message.price.equals(Long.ZERO)) {
            writer.uint32(88).sint64(message.price.toString());
        }
        if (message.currency !== "") {
            writer.uint32(98).string(message.currency);
        }
        return writer;
    }
}, CloseDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): Close {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseClose();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.price = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 12: {
                    if (tag !== 98) {
                        break;
                    }
                    message.currency = reader.string();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBasePrevClose(): PrevClose {
    return { transactionTime: Long.ZERO, tradeDate: 0, price: Long.ZERO, currency: "" };
}
export const PrevCloseEncode = {
    encode(message: PrevClose, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (message.tradeDate !== 0) {
            writer.uint32(80).sint32(message.tradeDate);
        }
        if (!message.price.equals(Long.ZERO)) {
            writer.uint32(88).sint64(message.price.toString());
        }
        if (message.currency !== "") {
            writer.uint32(98).string(message.currency);
        }
        return writer;
    }
}, PrevCloseDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): PrevClose {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePrevClose();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.price = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 12: {
                    if (tag !== 98) {
                        break;
                    }
                    message.currency = reader.string();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseLast(): Last {
    return { transactionTime: Long.ZERO, tradeDate: 0, price: Long.ZERO, quantity: Long.ZERO, currency: "", session: "" };
}
export const LastEncode = {
    encode(message: Last, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (message.tradeDate !== 0) {
            writer.uint32(80).sint32(message.tradeDate);
        }
        if (!message.price.equals(Long.ZERO)) {
            writer.uint32(88).sint64(message.price.toString());
        }
        if (!message.quantity.equals(Long.ZERO)) {
            writer.uint32(96).sint64(message.quantity.toString());
        }
        if (message.currency !== "") {
            writer.uint32(106).string(message.currency);
        }
        if (message.session !== "") {
            writer.uint32(242).string(message.session);
        }
        return writer;
    }
}, LastDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): Last {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLast();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.price = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 12: {
                    if (tag !== 96) {
                        break;
                    }
                    message.quantity = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 13: {
                    if (tag !== 106) {
                        break;
                    }
                    message.currency = reader.string();
                    continue;
                }
                case 30: {
                    if (tag !== 242) {
                        break;
                    }
                    message.session = reader.string();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseYearHigh(): YearHigh {
    return { transactionTime: Long.ZERO, price: Long.ZERO, currency: "" };
}
export const YearHighEncode = {
    encode(message: YearHigh, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (!message.price.equals(Long.ZERO)) {
            writer.uint32(80).sint64(message.price.toString());
        }
        if (message.currency !== "") {
            writer.uint32(90).string(message.currency);
        }
        return writer;
    }
}, YearHighDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): YearHigh {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseYearHigh();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.price = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 11: {
                    if (tag !== 90) {
                        break;
                    }
                    message.currency = reader.string();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseYearLow(): YearLow {
    return { transactionTime: Long.ZERO, price: Long.ZERO, currency: "" };
}
export const YearLowEncode = {
    encode(message: YearLow, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (!message.price.equals(Long.ZERO)) {
            writer.uint32(80).sint64(message.price.toString());
        }
        if (message.currency !== "") {
            writer.uint32(90).string(message.currency);
        }
        return writer;
    }
}, YearLowDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): YearLow {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseYearLow();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.price = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 11: {
                    if (tag !== 90) {
                        break;
                    }
                    message.currency = reader.string();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseVolume(): Volume {
    return { transactionTime: Long.ZERO, tradeDate: 0, volume: Long.ZERO };
}
export const VolumeEncode = {
    encode(message: Volume, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (message.tradeDate !== 0) {
            writer.uint32(80).sint32(message.tradeDate);
        }
        if (!message.volume.equals(Long.ZERO)) {
            writer.uint32(88).sint64(message.volume.toString());
        }
        return writer;
    }
}, VolumeDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): Volume {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseVolume();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.volume = Long.fromString(reader.sint64().toString());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseNumberOfTrades(): NumberOfTrades {
    return { transactionTime: Long.ZERO, tradeDate: 0, numberTrades: Long.ZERO };
}
export const NumberOfTradesEncode = {
    encode(message: NumberOfTrades, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (message.tradeDate !== 0) {
            writer.uint32(80).sint32(message.tradeDate);
        }
        if (!message.numberTrades.equals(Long.ZERO)) {
            writer.uint32(88).sint64(message.numberTrades.toString());
        }
        return writer;
    }
}, NumberOfTradesDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): NumberOfTrades {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseNumberOfTrades();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.numberTrades = Long.fromString(reader.sint64().toString());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseMonetaryValue(): MonetaryValue {
    return { transactionTime: Long.ZERO, tradeDate: 0, value: Long.ZERO, valueCurrencyCode: "" };
}
export const MonetaryValueEncode = {
    encode(message: MonetaryValue, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (message.tradeDate !== 0) {
            writer.uint32(80).sint32(message.tradeDate);
        }
        if (!message.value.equals(Long.ZERO)) {
            writer.uint32(88).sint64(message.value.toString());
        }
        if (message.valueCurrencyCode !== "") {
            writer.uint32(98).string(message.valueCurrencyCode);
        }
        return writer;
    }
}, MonetaryValueDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): MonetaryValue {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMonetaryValue();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.value = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 12: {
                    if (tag !== 98) {
                        break;
                    }
                    message.valueCurrencyCode = reader.string();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
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
export const SettlementEncode = {
    encode(message: Settlement, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (message.tradeDate !== 0) {
            writer.uint32(80).sint32(message.tradeDate);
        }
        if (!message.price.equals(Long.ZERO)) {
            writer.uint32(88).sint64(message.price.toString());
        }
        if (message.preliminarySettle !== false) {
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
        if (message.transient !== false) {
            writer.uint32(128).bool(message.transient);
        }
        if (message.reserved !== false) {
            writer.uint32(1016).bool(message.reserved);
        }
        return writer;
    }
}, SettlementDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): Settlement {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSettlement();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.price = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 12: {
                    if (tag !== 96) {
                        break;
                    }
                    message.preliminarySettle = reader.bool();
                    continue;
                }
                case 13: {
                    if (tag !== 106) {
                        break;
                    }
                    message.currency = reader.string();
                    continue;
                }
                case 14: {
                    if (tag !== 112) {
                        break;
                    }
                    message.settlementSource = reader.int32() as any;
                    continue;
                }
                case 15: {
                    if (tag !== 122) {
                        break;
                    }
                    message.session = reader.string();
                    continue;
                }
                case 16: {
                    if (tag !== 128) {
                        break;
                    }
                    message.transient = reader.bool();
                    continue;
                }
                case 127: {
                    if (tag !== 1016) {
                        break;
                    }
                    message.reserved = reader.bool();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseOpenInterest(): OpenInterest {
    return { transactionTime: Long.ZERO, tradeDate: 0, volume: Long.ZERO };
}
export const OpenInterestEncode = {
    encode(message: OpenInterest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (message.tradeDate !== 0) {
            writer.uint32(80).sint32(message.tradeDate);
        }
        if (!message.volume.equals(Long.ZERO)) {
            writer.uint32(88).sint64(message.volume.toString());
        }
        return writer;
    }
}, OpenInterestDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): OpenInterest {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOpenInterest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.volume = Long.fromString(reader.sint64().toString());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseMarketOpenInterest(): MarketOpenInterest {
    return { transactionTime: Long.ZERO, tradeDate: 0, volume: Long.ZERO };
}
export const MarketOpenInterestEncode = {
    encode(message: MarketOpenInterest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (message.tradeDate !== 0) {
            writer.uint32(80).sint32(message.tradeDate);
        }
        if (!message.volume.equals(Long.ZERO)) {
            writer.uint32(88).sint64(message.volume.toString());
        }
        return writer;
    }
}, MarketOpenInterestDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): MarketOpenInterest {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMarketOpenInterest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.volume = Long.fromString(reader.sint64().toString());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseVwap(): Vwap {
    return { transactionTime: Long.ZERO, tradeDate: 0, vwap: Long.ZERO };
}
export const VwapEncode = {
    encode(message: Vwap, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.transactionTime.toString());
        }
        if (message.tradeDate !== 0) {
            writer.uint32(80).sint32(message.tradeDate);
        }
        if (!message.vwap.equals(Long.ZERO)) {
            writer.uint32(88).sint64(message.vwap.toString());
        }
        return writer;
    }
}, VwapDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): Vwap {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseVwap();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.vwap = Long.fromString(reader.sint64().toString());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
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
export const DividendsIncomeDistributionsEncode = {
    encode(message: DividendsIncomeDistributions, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(48).sint64(message.transactionTime.toString());
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
        if (!message.amount.equals(Long.ZERO)) {
            writer.uint32(104).sint64(message.amount.toString());
        }
        if (message.currencyCode !== "") {
            writer.uint32(114).string(message.currencyCode);
        }
        for (const v of message.notes) {
            writer.uint32(122).string(v!);
        }
        if (!message.totalCashDistribution.equals(Long.ZERO)) {
            writer.uint32(128).sint64(message.totalCashDistribution.toString());
        }
        if (!message.nonQualifiedCashDistribution.equals(Long.ZERO)) {
            writer.uint32(136).sint64(message.nonQualifiedCashDistribution.toString());
        }
        if (!message.qualifiedCashDistribution.equals(Long.ZERO)) {
            writer.uint32(144).sint64(message.qualifiedCashDistribution.toString());
        }
        if (!message.taxFreeCashDistribution.equals(Long.ZERO)) {
            writer.uint32(152).sint64(message.taxFreeCashDistribution.toString());
        }
        if (!message.ordinaryForeignTaxCredit.equals(Long.ZERO)) {
            writer.uint32(160).sint64(message.ordinaryForeignTaxCredit.toString());
        }
        if (!message.qualifiedForeignTaxCredit.equals(Long.ZERO)) {
            writer.uint32(168).sint64(message.qualifiedForeignTaxCredit.toString());
        }
        if (!message.stockDividendRatio.equals(Long.ZERO)) {
            writer.uint32(176).sint64(message.stockDividendRatio.toString());
        }
        if (message.reinvestDate !== 0) {
            writer.uint32(184).sint32(message.reinvestDate);
        }
        return writer;
    }
}, DividendsIncomeDistributionsDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): DividendsIncomeDistributions {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDividendsIncomeDistributions();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 6: {
                    if (tag !== 48) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 7: {
                    if (tag !== 58) {
                        break;
                    }
                    message.instrumentType = reader.string();
                    continue;
                }
                case 8: {
                    if (tag !== 66) {
                        break;
                    }
                    message.corporateAction = reader.string();
                    continue;
                }
                case 9: {
                    if (tag !== 74) {
                        break;
                    }
                    message.distributionType = reader.string();
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.payableDate = reader.sint32();
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.recordDate = reader.sint32();
                    continue;
                }
                case 12: {
                    if (tag !== 96) {
                        break;
                    }
                    message.exDividendDate = reader.sint32();
                    continue;
                }
                case 13: {
                    if (tag !== 104) {
                        break;
                    }
                    message.amount = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 14: {
                    if (tag !== 114) {
                        break;
                    }
                    message.currencyCode = reader.string();
                    continue;
                }
                case 15: {
                    if (tag !== 122) {
                        break;
                    }
                    message.notes.push(reader.string());
                    continue;
                }
                case 16: {
                    if (tag !== 128) {
                        break;
                    }
                    message.totalCashDistribution = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 17: {
                    if (tag !== 136) {
                        break;
                    }
                    message.nonQualifiedCashDistribution = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 18: {
                    if (tag !== 144) {
                        break;
                    }
                    message.qualifiedCashDistribution = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 19: {
                    if (tag !== 152) {
                        break;
                    }
                    message.taxFreeCashDistribution = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 20: {
                    if (tag !== 160) {
                        break;
                    }
                    message.ordinaryForeignTaxCredit = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 21: {
                    if (tag !== 168) {
                        break;
                    }
                    message.qualifiedForeignTaxCredit = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 22: {
                    if (tag !== 176) {
                        break;
                    }
                    message.stockDividendRatio = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 23: {
                    if (tag !== 184) {
                        break;
                    }
                    message.reinvestDate = reader.sint32();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
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
export const CapitalDistributionsEncode = {
    encode(message: CapitalDistributions, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(64).sint64(message.transactionTime.toString());
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
        if (!message.shortTermCapitalGain.equals(Long.ZERO)) {
            writer.uint32(112).sint64(message.shortTermCapitalGain.toString());
        }
        if (!message.longTermCapitalGain.equals(Long.ZERO)) {
            writer.uint32(120).sint64(message.longTermCapitalGain.toString());
        }
        if (!message.unallocatedDistributions.equals(Long.ZERO)) {
            writer.uint32(128).sint64(message.unallocatedDistributions.toString());
        }
        if (!message.returnOfCapital.equals(Long.ZERO)) {
            writer.uint32(136).sint64(message.returnOfCapital.toString());
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
    }
}, CapitalDistributionsDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): CapitalDistributions {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCapitalDistributions();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 8: {
                    if (tag !== 64) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 9: {
                    if (tag !== 74) {
                        break;
                    }
                    message.instrumentType = reader.string();
                    continue;
                }
                case 10: {
                    if (tag !== 82) {
                        break;
                    }
                    message.corporateAction = reader.string();
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.payableDate = reader.sint32();
                    continue;
                }
                case 12: {
                    if (tag !== 96) {
                        break;
                    }
                    message.recordDate = reader.sint32();
                    continue;
                }
                case 13: {
                    if (tag !== 104) {
                        break;
                    }
                    message.exDate = reader.sint32();
                    continue;
                }
                case 14: {
                    if (tag !== 112) {
                        break;
                    }
                    message.shortTermCapitalGain = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 15: {
                    if (tag !== 120) {
                        break;
                    }
                    message.longTermCapitalGain = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 16: {
                    if (tag !== 128) {
                        break;
                    }
                    message.unallocatedDistributions = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 17: {
                    if (tag !== 136) {
                        break;
                    }
                    message.returnOfCapital = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 18: {
                    if (tag !== 146) {
                        break;
                    }
                    message.currencyCode = reader.string();
                    continue;
                }
                case 19: {
                    if (tag !== 154) {
                        break;
                    }
                    message.notes.push(reader.string());
                    continue;
                }
                case 20: {
                    if (tag !== 160) {
                        break;
                    }
                    message.reinvestDate = reader.sint32();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseSharesOutstanding(): SharesOutstanding {
    return { sharesOutstanding: Long.ZERO, transactionTime: Long.ZERO };
}
export const SharesOutstandingEncode = {
    encode(message: SharesOutstanding, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.sharesOutstanding.equals(Long.ZERO)) {
            writer.uint32(8).sint64(message.sharesOutstanding.toString());
        }
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(16).sint64(message.transactionTime.toString());
        }
        return writer;
    }
}, SharesOutstandingDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): SharesOutstanding {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSharesOutstanding();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }
                    message.sharesOutstanding = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 2: {
                    if (tag !== 16) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBasePriceLimits(): PriceLimits {
    return { tradeDate: 0, transactionTime: Long.ZERO, upperPriceLimit: Long.ZERO, lowerPriceLimit: Long.ZERO };
}
export const PriceLimitsEncode = {
    encode(message: PriceLimits, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (message.tradeDate !== 0) {
            writer.uint32(8).sint32(message.tradeDate);
        }
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(16).sint64(message.transactionTime.toString());
        }
        if (!message.upperPriceLimit.equals(Long.ZERO)) {
            writer.uint32(24).sint64(message.upperPriceLimit.toString());
        }
        if (!message.lowerPriceLimit.equals(Long.ZERO)) {
            writer.uint32(32).sint64(message.lowerPriceLimit.toString());
        }
        return writer;
    }
}, PriceLimitsDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): PriceLimits {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePriceLimits();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 2: {
                    if (tag !== 16) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 3: {
                    if (tag !== 24) {
                        break;
                    }
                    message.upperPriceLimit = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 4: {
                    if (tag !== 32) {
                        break;
                    }
                    message.lowerPriceLimit = Long.fromString(reader.sint64().toString());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseReferenceVolatilityPrice(): ReferenceVolatilityPrice {
    return { tradeDate: 0, atm: 0, surfaceDomain: "", volatility: Long.ZERO, premium: Long.ZERO, delta: Long.ZERO };
}
export const ReferenceVolatilityPriceEncode = {
    encode(message: ReferenceVolatilityPrice, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (message.tradeDate !== 0) {
            writer.uint32(8).sint32(message.tradeDate);
        }
        if (message.atm !== 0) {
            writer.uint32(16).sint32(message.atm);
        }
        if (message.surfaceDomain !== "") {
            writer.uint32(26).string(message.surfaceDomain);
        }
        if (!message.volatility.equals(Long.ZERO)) {
            writer.uint32(32).sint64(message.volatility.toString());
        }
        if (!message.premium.equals(Long.ZERO)) {
            writer.uint32(40).sint64(message.premium.toString());
        }
        if (!message.delta.equals(Long.ZERO)) {
            writer.uint32(48).sint64(message.delta.toString());
        }
        return writer;
    }
}, ReferenceVolatilityPriceDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): ReferenceVolatilityPrice {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseReferenceVolatilityPrice();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 2: {
                    if (tag !== 16) {
                        break;
                    }
                    message.atm = reader.sint32();
                    continue;
                }
                case 3: {
                    if (tag !== 26) {
                        break;
                    }
                    message.surfaceDomain = reader.string();
                    continue;
                }
                case 4: {
                    if (tag !== 32) {
                        break;
                    }
                    message.volatility = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 5: {
                    if (tag !== 40) {
                        break;
                    }
                    message.premium = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 6: {
                    if (tag !== 48) {
                        break;
                    }
                    message.delta = Long.fromString(reader.sint64().toString());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseNetAssetValue(): NetAssetValue {
    return { netAssetValue: Long.ZERO, transactionTime: Long.ZERO };
}
export const NetAssetValueEncode = {
    encode(message: NetAssetValue, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.netAssetValue.equals(Long.ZERO)) {
            writer.uint32(8).sint64(message.netAssetValue.toString());
        }
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(16).sint64(message.transactionTime.toString());
        }
        return writer;
    }
}, NetAssetValueDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): NetAssetValue {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseNetAssetValue();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }
                    message.netAssetValue = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 2: {
                    if (tag !== 16) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
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
export const MarketSummaryEncode = {
    encode(message: MarketSummary, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(8).sint64(message.transactionTime.toString());
        }
        if (message.tradingDate !== 0) {
            writer.uint32(16).sint32(message.tradingDate);
        }
        if (message.startOfDay !== false) {
            writer.uint32(24).bool(message.startOfDay);
        }
        if (message.endOfDay !== false) {
            writer.uint32(32).bool(message.endOfDay);
        }
        if (message.clear !== 0) {
            writer.uint32(40).int32(message.clear);
        }
        if (message.instrumentStatus !== undefined) {
            InstrumentStatusEncode.encode(message.instrumentStatus, writer.uint32(74).fork()).join();
        }
        if (message.bbo !== undefined) {
            BestBidOfferEncode.encode(message.bbo, writer.uint32(82).fork()).join();
        }
        if (message.open !== undefined) {
            OpenEncode.encode(message.open, writer.uint32(90).fork()).join();
        }
        if (message.high !== undefined) {
            HighEncode.encode(message.high, writer.uint32(98).fork()).join();
        }
        if (message.low !== undefined) {
            LowEncode.encode(message.low, writer.uint32(106).fork()).join();
        }
        if (message.close !== undefined) {
            CloseEncode.encode(message.close, writer.uint32(114).fork()).join();
        }
        if (message.prevClose !== undefined) {
            PrevCloseEncode.encode(message.prevClose, writer.uint32(122).fork()).join();
        }
        if (message.last !== undefined) {
            LastEncode.encode(message.last, writer.uint32(130).fork()).join();
        }
        if (message.volume !== undefined) {
            VolumeEncode.encode(message.volume, writer.uint32(138).fork()).join();
        }
        if (message.settlement !== undefined) {
            SettlementEncode.encode(message.settlement, writer.uint32(146).fork()).join();
        }
        if (message.openInterest !== undefined) {
            OpenInterestEncode.encode(message.openInterest, writer.uint32(154).fork()).join();
        }
        if (message.vwap !== undefined) {
            VwapEncode.encode(message.vwap, writer.uint32(162).fork()).join();
        }
        if (message.session !== "") {
            writer.uint32(170).string(message.session);
        }
        if (message.summaryType !== 0) {
            writer.uint32(176).int32(message.summaryType);
        }
        if (message.prevVolume !== undefined) {
            VolumeEncode.encode(message.prevVolume, writer.uint32(186).fork()).join();
        }
        if (message.transient !== false) {
            writer.uint32(192).bool(message.transient);
        }
        return writer;
    }
}, MarketSummaryDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): MarketSummary {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMarketSummary();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 2: {
                    if (tag !== 16) {
                        break;
                    }
                    message.tradingDate = reader.sint32();
                    continue;
                }
                case 3: {
                    if (tag !== 24) {
                        break;
                    }
                    message.startOfDay = reader.bool();
                    continue;
                }
                case 4: {
                    if (tag !== 32) {
                        break;
                    }
                    message.endOfDay = reader.bool();
                    continue;
                }
                case 5: {
                    if (tag !== 40) {
                        break;
                    }
                    message.clear = reader.int32() as any;
                    continue;
                }
                case 9: {
                    if (tag !== 74) {
                        break;
                    }
                    message.instrumentStatus = InstrumentStatusDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 10: {
                    if (tag !== 82) {
                        break;
                    }
                    message.bbo = BestBidOfferDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 11: {
                    if (tag !== 90) {
                        break;
                    }
                    message.open = OpenDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 12: {
                    if (tag !== 98) {
                        break;
                    }
                    message.high = HighDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 13: {
                    if (tag !== 106) {
                        break;
                    }
                    message.low = LowDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 14: {
                    if (tag !== 114) {
                        break;
                    }
                    message.close = CloseDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 15: {
                    if (tag !== 122) {
                        break;
                    }
                    message.prevClose = PrevCloseDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 16: {
                    if (tag !== 130) {
                        break;
                    }
                    message.last = LastDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 17: {
                    if (tag !== 138) {
                        break;
                    }
                    message.volume = VolumeDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 18: {
                    if (tag !== 146) {
                        break;
                    }
                    message.settlement = SettlementDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 19: {
                    if (tag !== 154) {
                        break;
                    }
                    message.openInterest = OpenInterestDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 20: {
                    if (tag !== 162) {
                        break;
                    }
                    message.vwap = VwapDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 21: {
                    if (tag !== 170) {
                        break;
                    }
                    message.session = reader.string();
                    continue;
                }
                case 22: {
                    if (tag !== 176) {
                        break;
                    }
                    message.summaryType = reader.int32() as any;
                    continue;
                }
                case 23: {
                    if (tag !== 186) {
                        break;
                    }
                    message.prevVolume = VolumeDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 24: {
                    if (tag !== 192) {
                        break;
                    }
                    message.transient = reader.bool();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseContext(): Context {
    return { data: [], tracePoints: [] };
}
export const ContextEncode = {
    encode(message: Context, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        for (const v of message.data) {
            ContextDataEncode.encode(v!, writer.uint32(10).fork()).join();
        }
        for (const v of message.tracePoints) {
            TracePointEncode.encode(v!, writer.uint32(18).fork()).join();
        }
        return writer;
    }
}, ContextDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): Context {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseContext();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 10) {
                        break;
                    }
                    message.data.push(ContextDataDecode.decode(reader, reader.uint32()));
                    continue;
                }
                case 2: {
                    if (tag !== 18) {
                        break;
                    }
                    message.tracePoints.push(TracePointDecode.decode(reader, reader.uint32()));
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
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
export const ContextDataEncode = {
    encode(message: ContextData, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
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
            writer.uint32(72).sint64(message.vsint64.toString());
        }
        if (message.vfloat !== undefined) {
            writer.uint32(85).float(message.vfloat);
        }
        if (message.vdouble !== undefined) {
            writer.uint32(89).double(message.vdouble);
        }
        return writer;
    }
}, ContextDataDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): ContextData {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseContextData();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 10) {
                        break;
                    }
                    message.id = reader.string();
                    continue;
                }
                case 5: {
                    if (tag !== 42) {
                        break;
                    }
                    message.vstring = reader.string();
                    continue;
                }
                case 6: {
                    if (tag !== 50) {
                        break;
                    }
                    message.vbytes = reader.bytes();
                    continue;
                }
                case 7: {
                    if (tag !== 56) {
                        break;
                    }
                    message.vbool = reader.bool();
                    continue;
                }
                case 8: {
                    if (tag !== 64) {
                        break;
                    }
                    message.vsint32 = reader.sint32();
                    continue;
                }
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.vsint64 = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 85) {
                        break;
                    }
                    message.vfloat = reader.float();
                    continue;
                }
                case 11: {
                    if (tag !== 89) {
                        break;
                    }
                    message.vdouble = reader.double();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseTracePoint(): TracePoint {
    return { id: "", componentId: "", timestampNs: Long.ZERO, componentLatencyNs: 0 };
}
export const TracePointEncode = {
    encode(message: TracePoint, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.componentId !== "") {
            writer.uint32(18).string(message.componentId);
        }
        if (!message.timestampNs.equals(Long.ZERO)) {
            writer.uint32(24).sint64(message.timestampNs.toString());
        }
        if (message.componentLatencyNs !== 0) {
            writer.uint32(32).int32(message.componentLatencyNs);
        }
        return writer;
    }
}, TracePointDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): TracePoint {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTracePoint();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 10) {
                        break;
                    }
                    message.id = reader.string();
                    continue;
                }
                case 2: {
                    if (tag !== 18) {
                        break;
                    }
                    message.componentId = reader.string();
                    continue;
                }
                case 3: {
                    if (tag !== 24) {
                        break;
                    }
                    message.timestampNs = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 4: {
                    if (tag !== 32) {
                        break;
                    }
                    message.componentLatencyNs = reader.int32();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseTCPHistoricalReplayRequest(): TCPHistoricalReplayRequest {
    return { channel: 0, resetNumber: 0, sequence: Long.ZERO, count: 0, requestId: "" };
}
export const TCPHistoricalReplayRequestEncode = {
    encode(message: TCPHistoricalReplayRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (message.channel !== 0) {
            writer.uint32(8).int32(message.channel);
        }
        if (message.resetNumber !== 0) {
            writer.uint32(16).int32(message.resetNumber);
        }
        if (!message.sequence.equals(Long.ZERO)) {
            writer.uint32(24).int64(message.sequence.toString());
        }
        if (message.count !== 0) {
            writer.uint32(32).int32(message.count);
        }
        if (message.requestId !== "") {
            writer.uint32(42).string(message.requestId);
        }
        return writer;
    }
}, TCPHistoricalReplayRequestDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): TCPHistoricalReplayRequest {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTCPHistoricalReplayRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }
                    message.channel = reader.int32();
                    continue;
                }
                case 2: {
                    if (tag !== 16) {
                        break;
                    }
                    message.resetNumber = reader.int32();
                    continue;
                }
                case 3: {
                    if (tag !== 24) {
                        break;
                    }
                    message.sequence = Long.fromString(reader.int64().toString());
                    continue;
                }
                case 4: {
                    if (tag !== 32) {
                        break;
                    }
                    message.count = reader.int32();
                    continue;
                }
                case 5: {
                    if (tag !== 42) {
                        break;
                    }
                    message.requestId = reader.string();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseSnapshotRequest(): SnapshotRequest {
    return { channel: 0, resetNumber: 0, requestId: "", snapshotRequestTypes: [] };
}
export const SnapshotRequestEncode = {
    encode(message: SnapshotRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
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
        writer.join();
        return writer;
    }
}, SnapshotRequestDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): SnapshotRequest {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSnapshotRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }
                    message.channel = reader.int32();
                    continue;
                }
                case 2: {
                    if (tag !== 16) {
                        break;
                    }
                    message.resetNumber = reader.int32();
                    continue;
                }
                case 3: {
                    if (tag !== 26) {
                        break;
                    }
                    message.requestId = reader.string();
                    continue;
                }
                case 4: {
                    if (tag === 32) {
                        message.snapshotRequestTypes.push(reader.int32() as any);
                        continue;
                    }
                    if (tag === 34) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.snapshotRequestTypes.push(reader.int32() as any);
                        }
                        continue;
                    }
                    break;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
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
export const VolumeAtPriceEncode = {
    encode(message: VolumeAtPrice, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.marketId.equals(Long.ZERO)) {
            writer.uint32(8).sint64(message.marketId.toString());
        }
        if (message.symbol !== "") {
            writer.uint32(18).string(message.symbol);
        }
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(24).sint64(message.transactionTime.toString());
        }
        if (!message.lastPrice.equals(Long.ZERO)) {
            writer.uint32(32).sint64(message.lastPrice.toString());
        }
        if (!message.lastQuantity.equals(Long.ZERO)) {
            writer.uint32(40).sint64(message.lastQuantity.toString());
        }
        if (!message.lastCumulativeVolume.equals(Long.ZERO)) {
            writer.uint32(48).sint64(message.lastCumulativeVolume.toString());
        }
        if (message.tradeDate !== 0) {
            writer.uint32(56).sint32(message.tradeDate);
        }
        for (const v of message.priceVolumes) {
            VolumeAtPrice_PriceLevelVolumeEncode.encode(v!, writer.uint32(66).fork()).join();
        }
        return writer;
    }
}, VolumeAtPriceDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): VolumeAtPrice {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseVolumeAtPrice();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }
                    message.marketId = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 2: {
                    if (tag !== 18) {
                        break;
                    }
                    message.symbol = reader.string();
                    continue;
                }
                case 3: {
                    if (tag !== 24) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 4: {
                    if (tag !== 32) {
                        break;
                    }
                    message.lastPrice = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 5: {
                    if (tag !== 40) {
                        break;
                    }
                    message.lastQuantity = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 6: {
                    if (tag !== 48) {
                        break;
                    }
                    message.lastCumulativeVolume = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 7: {
                    if (tag !== 56) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 8: {
                    if (tag !== 66) {
                        break;
                    }
                    message.priceVolumes.push(VolumeAtPrice_PriceLevelVolumeDecode.decode(reader, reader.uint32()));
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseVolumeAtPrice_PriceLevelVolume(): VolumeAtPrice_PriceLevelVolume {
    return { price: Long.ZERO, volume: Long.ZERO };
}
export const VolumeAtPrice_PriceLevelVolumeEncode = {
    encode(message: VolumeAtPrice_PriceLevelVolume, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.price.equals(Long.ZERO)) {
            writer.uint32(8).sint64(message.price.toString());
        }
        if (!message.volume.equals(Long.ZERO)) {
            writer.uint32(16).sint64(message.volume.toString());
        }
        return writer;
    }
}, VolumeAtPrice_PriceLevelVolumeDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): VolumeAtPrice_PriceLevelVolume {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseVolumeAtPrice_PriceLevelVolume();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }
                    message.price = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 2: {
                    if (tag !== 16) {
                        break;
                    }
                    message.volume = Long.fromString(reader.sint64().toString());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
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
export const OhlcEncode = {
    encode(message: Ohlc, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.marketId.equals(Long.ZERO)) {
            writer.uint32(8).sint64(message.marketId.toString());
        }
        if (message.symbol !== "") {
            writer.uint32(18).string(message.symbol);
        }
        if (message.open !== undefined) {
            OpenEncode.encode(message.open, writer.uint32(26).fork()).join();
        }
        if (message.high !== undefined) {
            HighEncode.encode(message.high, writer.uint32(34).fork()).join();
        }
        if (message.low !== undefined) {
            LowEncode.encode(message.low, writer.uint32(42).fork()).join();
        }
        if (message.close !== undefined) {
            CloseEncode.encode(message.close, writer.uint32(50).fork()).join();
        }
        if (!message.volume.equals(Long.ZERO)) {
            writer.uint32(56).sint64(message.volume.toString());
        }
        if (message.priceVolume !== 0) {
            writer.uint32(65).double(message.priceVolume);
        }
        if (!message.numberTrades.equals(Long.ZERO)) {
            writer.uint32(72).sint64(message.numberTrades.toString());
        }
        if (message.tradeDate !== 0) {
            writer.uint32(80).sint32(message.tradeDate);
        }
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(88).sint64(message.transactionTime.toString());
        }
        for (const v of message.tradeIds) {
            writer.uint32(98).string(v!);
        }
        if (!message.openStartTime.equals(Long.ZERO)) {
            writer.uint32(104).sint64(message.openStartTime.toString());
        }
        if (!message.closeEndTime.equals(Long.ZERO)) {
            writer.uint32(112).sint64(message.closeEndTime.toString());
        }
        return writer;
    }
}, OhlcDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): Ohlc {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOhlc();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }
                    message.marketId = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 2: {
                    if (tag !== 18) {
                        break;
                    }
                    message.symbol = reader.string();
                    continue;
                }
                case 3: {
                    if (tag !== 26) {
                        break;
                    }
                    message.open = OpenDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 4: {
                    if (tag !== 34) {
                        break;
                    }
                    message.high = HighDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 5: {
                    if (tag !== 42) {
                        break;
                    }
                    message.low = LowDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 6: {
                    if (tag !== 50) {
                        break;
                    }
                    message.close = CloseDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 7: {
                    if (tag !== 56) {
                        break;
                    }
                    message.volume = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 8: {
                    if (tag !== 65) {
                        break;
                    }
                    message.priceVolume = reader.double();
                    continue;
                }
                case 9: {
                    if (tag !== 72) {
                        break;
                    }
                    message.numberTrades = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 10: {
                    if (tag !== 80) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 11: {
                    if (tag !== 88) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 12: {
                    if (tag !== 98) {
                        break;
                    }
                    message.tradeIds.push(reader.string());
                    continue;
                }
                case 13: {
                    if (tag !== 104) {
                        break;
                    }
                    message.openStartTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 14: {
                    if (tag !== 112) {
                        break;
                    }
                    message.closeEndTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseInstrumentAction(): InstrumentAction {
    return {
        transactionTime: Long.ZERO,
        tradeDate: 0,
        action: 0,
        message: "",
        oldAlias: "",
        instrument: undefined,
        newInstrument: undefined,
    };
}
export const InstrumentActionEncode = {
    encode(message: InstrumentAction, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (!message.transactionTime.equals(Long.ZERO)) {
            writer.uint32(8).sint64(message.transactionTime.toString());
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
        if (message.oldAlias !== "") {
            writer.uint32(42).string(message.oldAlias);
        }
        if (message.instrument !== undefined) {
            InstrumentDefinitionEncode.encode(message.instrument, writer.uint32(82).fork()).join();
        }
        if (message.newInstrument !== undefined) {
            InstrumentDefinitionEncode.encode(message.newInstrument, writer.uint32(90).fork()).join();
        }
        return writer;
    }
}, InstrumentActionDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): InstrumentAction {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInstrumentAction();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }
                    message.transactionTime = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 2: {
                    if (tag !== 16) {
                        break;
                    }
                    message.tradeDate = reader.sint32();
                    continue;
                }
                case 3: {
                    if (tag !== 24) {
                        break;
                    }
                    message.action = reader.int32() as any;
                    continue;
                }
                case 4: {
                    if (tag !== 34) {
                        break;
                    }
                    message.message = reader.string();
                    continue;
                }
                case 5: {
                    if (tag !== 42) {
                        break;
                    }
                    message.oldAlias = reader.string();
                    continue;
                }
                case 10: {
                    if (tag !== 82) {
                        break;
                    }
                    message.instrument = InstrumentDefinitionDecode.decode(reader, reader.uint32());
                    continue;
                }
                case 11: {
                    if (tag !== 90) {
                        break;
                    }
                    message.newInstrument = InstrumentDefinitionDecode.decode(reader, reader.uint32());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
function createBaseRequestForQuote(): RequestForQuote {
    return { quoteRequestId: "", symbol: "", securityId: Long.ZERO, orderQuantity: 0, quoteType: 0, side: 0 };
}
export const RequestForQuoteEncode = {
    encode(message: RequestForQuote, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (message.quoteRequestId !== "") {
            writer.uint32(10).string(message.quoteRequestId);
        }
        if (message.symbol !== "") {
            writer.uint32(18).string(message.symbol);
        }
        if (!message.securityId.equals(Long.ZERO)) {
            writer.uint32(24).sint64(message.securityId.toString());
        }
        if (message.orderQuantity !== 0) {
            writer.uint32(32).sint32(message.orderQuantity);
        }
        if (message.quoteType !== 0) {
            writer.uint32(40).sint32(message.quoteType);
        }
        if (message.side !== 0) {
            writer.uint32(48).sint32(message.side);
        }
        return writer;
    }
}, RequestForQuoteDecode = {
    decode(input: BinaryReader | Uint8Array, length?: number): RequestForQuote {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestForQuote();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 10) {
                        break;
                    }
                    message.quoteRequestId = reader.string();
                    continue;
                }
                case 2: {
                    if (tag !== 18) {
                        break;
                    }
                    message.symbol = reader.string();
                    continue;
                }
                case 3: {
                    if (tag !== 24) {
                        break;
                    }
                    message.securityId = Long.fromString(reader.sint64().toString());
                    continue;
                }
                case 4: {
                    if (tag !== 32) {
                        break;
                    }
                    message.orderQuantity = reader.sint32();
                    continue;
                }
                case 5: {
                    if (tag !== 40) {
                        break;
                    }
                    message.quoteType = reader.sint32();
                    continue;
                }
                case 6: {
                    if (tag !== 48) {
                        break;
                    }
                    message.side = reader.sint32();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    }
};
