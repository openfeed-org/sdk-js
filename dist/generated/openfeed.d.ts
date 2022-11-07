import Long from "long";
import _m0 from "protobufjs/minimal";
import { InstrumentDefinition } from "./openfeed_instrument";
export declare const protobufPackage = "org.openfeed";
/** / Book side */
export declare enum BookSide {
    UNKNOWN_BOOK_SIDE = 0,
    BID = 1,
    OFFER = 2,
    UNRECOGNIZED = -1
}
export declare function bookSideFromJSON(object: any): BookSide;
export declare function bookSideToJSON(object: BookSide): string;
export declare enum InstrumentTradingStatus {
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
export declare function instrumentTradingStatusFromJSON(object: any): InstrumentTradingStatus;
export declare function instrumentTradingStatusToJSON(object: InstrumentTradingStatus): string;
export declare enum RegulationSHOShortSalePriceTest {
    UNKNOWN_PRICE_TEST = 0,
    PRICE_TEST_NONE = 1,
    PRICE_TEST_IN_EFFECT = 2,
    PRICE_TEST_REMAINS_IN_EFFECT = 3,
    UNRECOGNIZED = -1
}
export declare function regulationSHOShortSalePriceTestFromJSON(object: any): RegulationSHOShortSalePriceTest;
export declare function regulationSHOShortSalePriceTestToJSON(object: RegulationSHOShortSalePriceTest): string;
export declare enum SettlementTerms {
    UNKNOWN_SETTLEMENT_TERMS = 0,
    CASH = 1,
    NON_NET = 2,
    CONTINGENT_TRADE = 3,
    CASH_TODAY = 4,
    DATE = 5,
    UNRECOGNIZED = -1
}
export declare function settlementTermsFromJSON(object: any): SettlementTerms;
export declare function settlementTermsToJSON(object: SettlementTerms): string;
export declare enum CrossType {
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
export declare function crossTypeFromJSON(object: any): CrossType;
export declare function crossTypeToJSON(object: CrossType): string;
export declare enum OpenCloseSettlementFlag {
    UNKNOWN = 0,
    DAILY_OPEN = 1,
    INDICATIVE_OPEN_PRICE = 2,
    UNRECOGNIZED = -1
}
export declare function openCloseSettlementFlagFromJSON(object: any): OpenCloseSettlementFlag;
export declare function openCloseSettlementFlagToJSON(object: OpenCloseSettlementFlag): string;
export declare enum SettlementSource {
    UNKNOWN_SETTLEMENT_SOURCE = 0,
    GLOBEX = 1,
    ITC = 2,
    MANUAL = 3,
    UNRECOGNIZED = -1
}
export declare function settlementSourceFromJSON(object: any): SettlementSource;
export declare function settlementSourceToJSON(object: SettlementSource): string;
export declare enum Service {
    UNKNOWN_SERVICE = 0,
    REAL_TIME = 1,
    DELAYED = 2,
    REAL_TIME_SNAPSHOT = 3,
    DELAYED_SNAPSHOT = 4,
    END_OF_DAY = 5,
    UNRECOGNIZED = -1
}
export declare function serviceFromJSON(object: any): Service;
export declare function serviceToJSON(object: Service): string;
export declare enum MarketWideStatus {
    STATUS_UNKNOWN = 0,
    STATUS_START_OF_DAY = 1,
    STATUS_END_OF_DAY = 2,
    STATUS_OPEN = 3,
    STATUS_CLOSE = 4,
    UNRECOGNIZED = -1
}
export declare function marketWideStatusFromJSON(object: any): MarketWideStatus;
export declare function marketWideStatusToJSON(object: MarketWideStatus): string;
export declare enum SnapshotRequestResult {
    SNAPSHOT_REQUEST_UNKNOWN_RESULT = 0,
    SNAPSHOT_REQUEST_SUCCESS = 1,
    SNAPSHOT_REQUEST_NOT_FOUND = 2,
    SNAPSHOT_REQUEST_SERVICE_NOT_AVAILABLE = 3,
    SNAPSHOT_REQUEST_GENERIC_FAILURE = 4,
    UNRECOGNIZED = -1
}
export declare function snapshotRequestResultFromJSON(object: any): SnapshotRequestResult;
export declare function snapshotRequestResultToJSON(object: SnapshotRequestResult): string;
/** / Instrument Actions */
export declare enum ActionType {
    UNKNOWN_ACTION = 0,
    LISTING = 1,
    DELISTING = 2,
    EXCHANGE_MOVE = 3,
    UNRECOGNIZED = -1
}
export declare function actionTypeFromJSON(object: any): ActionType;
export declare function actionTypeToJSON(object: ActionType): string;
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
export declare enum AdminMessage_Status {
    OK = 0,
    UNRECOGNIZED = -1
}
export declare function adminMessage_StatusFromJSON(object: any): AdminMessage_Status;
export declare function adminMessage_StatusToJSON(object: AdminMessage_Status): string;
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
export declare enum MarketSummary_ClearSet {
    NONE = 0,
    ALL = 1,
    BA = 2,
    CUSTOM_1 = 3,
    UNRECOGNIZED = -1
}
export declare function marketSummary_ClearSetFromJSON(object: any): MarketSummary_ClearSet;
export declare function marketSummary_ClearSetToJSON(object: MarketSummary_ClearSet): string;
/** / Used to differentiate various ddf messages. */
export declare enum MarketSummary_SummaryType {
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
export declare function marketSummary_SummaryTypeFromJSON(object: any): MarketSummary_SummaryType;
export declare function marketSummary_SummaryTypeToJSON(object: MarketSummary_SummaryType): string;
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
export declare enum SnapshotRequest_SnapshotRequestType {
    ALL = 0,
    QUOTE = 1,
    DEPTH = 2,
    VOLUME_AT_PRICE = 3,
    UNRECOGNIZED = -1
}
export declare function snapshotRequest_SnapshotRequestTypeFromJSON(object: any): SnapshotRequest_SnapshotRequestType;
export declare function snapshotRequest_SnapshotRequestTypeToJSON(object: SnapshotRequest_SnapshotRequestType): string;
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
    instrument: InstrumentDefinition | undefined;
    newInstrument: InstrumentDefinition | undefined;
}
export declare const OpenfeedMessage: {
    encode(message: OpenfeedMessage, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): OpenfeedMessage;
    fromJSON(object: any): OpenfeedMessage;
    toJSON(message: OpenfeedMessage): unknown;
    fromPartial(object: DeepPartial<OpenfeedMessage>): OpenfeedMessage;
};
export declare const ChannelReset: {
    encode(message: ChannelReset, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ChannelReset;
    fromJSON(object: any): ChannelReset;
    toJSON(message: ChannelReset): unknown;
    fromPartial(object: DeepPartial<ChannelReset>): ChannelReset;
};
export declare const HeartBeat: {
    encode(message: HeartBeat, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): HeartBeat;
    fromJSON(object: any): HeartBeat;
    toJSON(message: HeartBeat): unknown;
    fromPartial(object: DeepPartial<HeartBeat>): HeartBeat;
};
export declare const AdminMessage: {
    encode(message: AdminMessage, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AdminMessage;
    fromJSON(object: any): AdminMessage;
    toJSON(message: AdminMessage): unknown;
    fromPartial(object: DeepPartial<AdminMessage>): AdminMessage;
};
export declare const InstrumentGroupStatus: {
    encode(message: InstrumentGroupStatus, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentGroupStatus;
    fromJSON(object: any): InstrumentGroupStatus;
    toJSON(message: InstrumentGroupStatus): unknown;
    fromPartial(object: DeepPartial<InstrumentGroupStatus>): InstrumentGroupStatus;
};
export declare const MarketStatus: {
    encode(message: MarketStatus, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MarketStatus;
    fromJSON(object: any): MarketStatus;
    toJSON(message: MarketStatus): unknown;
    fromPartial(object: DeepPartial<MarketStatus>): MarketStatus;
};
export declare const EODCommoditySummary: {
    encode(message: EODCommoditySummary, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EODCommoditySummary;
    fromJSON(object: any): EODCommoditySummary;
    toJSON(message: EODCommoditySummary): unknown;
    fromPartial(object: DeepPartial<EODCommoditySummary>): EODCommoditySummary;
};
export declare const MarketSession: {
    encode(message: MarketSession, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MarketSession;
    fromJSON(object: any): MarketSession;
    toJSON(message: MarketSession): unknown;
    fromPartial(object: DeepPartial<MarketSession>): MarketSession;
};
export declare const MarketSnapshot: {
    encode(message: MarketSnapshot, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MarketSnapshot;
    fromJSON(object: any): MarketSnapshot;
    toJSON(message: MarketSnapshot): unknown;
    fromPartial(object: DeepPartial<MarketSnapshot>): MarketSnapshot;
};
export declare const MarketSnapshotResponse: {
    encode(message: MarketSnapshotResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MarketSnapshotResponse;
    fromJSON(object: any): MarketSnapshotResponse;
    toJSON(message: MarketSnapshotResponse): unknown;
    fromPartial(object: DeepPartial<MarketSnapshotResponse>): MarketSnapshotResponse;
};
export declare const MarketUpdate: {
    encode(message: MarketUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MarketUpdate;
    fromJSON(object: any): MarketUpdate;
    toJSON(message: MarketUpdate): unknown;
    fromPartial(object: DeepPartial<MarketUpdate>): MarketUpdate;
};
export declare const DepthPriceLevel: {
    encode(message: DepthPriceLevel, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DepthPriceLevel;
    fromJSON(object: any): DepthPriceLevel;
    toJSON(message: DepthPriceLevel): unknown;
    fromPartial(object: DeepPartial<DepthPriceLevel>): DepthPriceLevel;
};
export declare const DepthPriceLevel_Entry: {
    encode(message: DepthPriceLevel_Entry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DepthPriceLevel_Entry;
    fromJSON(object: any): DepthPriceLevel_Entry;
    toJSON(message: DepthPriceLevel_Entry): unknown;
    fromPartial(object: DeepPartial<DepthPriceLevel_Entry>): DepthPriceLevel_Entry;
};
export declare const DepthOrder: {
    encode(message: DepthOrder, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DepthOrder;
    fromJSON(object: any): DepthOrder;
    toJSON(message: DepthOrder): unknown;
    fromPartial(object: DeepPartial<DepthOrder>): DepthOrder;
};
export declare const DepthOrder_Entry: {
    encode(message: DepthOrder_Entry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DepthOrder_Entry;
    fromJSON(object: any): DepthOrder_Entry;
    toJSON(message: DepthOrder_Entry): unknown;
    fromPartial(object: DeepPartial<DepthOrder_Entry>): DepthOrder_Entry;
};
export declare const News: {
    encode(message: News, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): News;
    fromJSON(object: any): News;
    toJSON(message: News): unknown;
    fromPartial(object: DeepPartial<News>): News;
};
export declare const ClearBook: {
    encode(message: ClearBook, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ClearBook;
    fromJSON(object: any): ClearBook;
    toJSON(message: ClearBook): unknown;
    fromPartial(object: DeepPartial<ClearBook>): ClearBook;
};
export declare const InstrumentStatus: {
    encode(message: InstrumentStatus, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentStatus;
    fromJSON(object: any): InstrumentStatus;
    toJSON(message: InstrumentStatus): unknown;
    fromPartial(object: DeepPartial<InstrumentStatus>): InstrumentStatus;
};
export declare const BestBidOffer: {
    encode(message: BestBidOffer, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): BestBidOffer;
    fromJSON(object: any): BestBidOffer;
    toJSON(message: BestBidOffer): unknown;
    fromPartial(object: DeepPartial<BestBidOffer>): BestBidOffer;
};
export declare const AddPriceLevel: {
    encode(message: AddPriceLevel, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AddPriceLevel;
    fromJSON(object: any): AddPriceLevel;
    toJSON(message: AddPriceLevel): unknown;
    fromPartial(object: DeepPartial<AddPriceLevel>): AddPriceLevel;
};
export declare const DeletePriceLevel: {
    encode(message: DeletePriceLevel, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DeletePriceLevel;
    fromJSON(object: any): DeletePriceLevel;
    toJSON(message: DeletePriceLevel): unknown;
    fromPartial(object: DeepPartial<DeletePriceLevel>): DeletePriceLevel;
};
export declare const ModifyPriceLevel: {
    encode(message: ModifyPriceLevel, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ModifyPriceLevel;
    fromJSON(object: any): ModifyPriceLevel;
    toJSON(message: ModifyPriceLevel): unknown;
    fromPartial(object: DeepPartial<ModifyPriceLevel>): ModifyPriceLevel;
};
export declare const AddOrder: {
    encode(message: AddOrder, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AddOrder;
    fromJSON(object: any): AddOrder;
    toJSON(message: AddOrder): unknown;
    fromPartial(object: DeepPartial<AddOrder>): AddOrder;
};
export declare const DeleteOrder: {
    encode(message: DeleteOrder, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DeleteOrder;
    fromJSON(object: any): DeleteOrder;
    toJSON(message: DeleteOrder): unknown;
    fromPartial(object: DeepPartial<DeleteOrder>): DeleteOrder;
};
export declare const ModifyOrder: {
    encode(message: ModifyOrder, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ModifyOrder;
    fromJSON(object: any): ModifyOrder;
    toJSON(message: ModifyOrder): unknown;
    fromPartial(object: DeepPartial<ModifyOrder>): ModifyOrder;
};
export declare const IndexValue: {
    encode(message: IndexValue, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): IndexValue;
    fromJSON(object: any): IndexValue;
    toJSON(message: IndexValue): unknown;
    fromPartial(object: DeepPartial<IndexValue>): IndexValue;
};
export declare const Trades: {
    encode(message: Trades, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Trades;
    fromJSON(object: any): Trades;
    toJSON(message: Trades): unknown;
    fromPartial(object: DeepPartial<Trades>): Trades;
};
export declare const Trades_Entry: {
    encode(message: Trades_Entry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Trades_Entry;
    fromJSON(object: any): Trades_Entry;
    toJSON(message: Trades_Entry): unknown;
    fromPartial(object: DeepPartial<Trades_Entry>): Trades_Entry;
};
export declare const Trade: {
    encode(message: Trade, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Trade;
    fromJSON(object: any): Trade;
    toJSON(message: Trade): unknown;
    fromPartial(object: DeepPartial<Trade>): Trade;
};
export declare const TradeCorrection: {
    encode(message: TradeCorrection, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TradeCorrection;
    fromJSON(object: any): TradeCorrection;
    toJSON(message: TradeCorrection): unknown;
    fromPartial(object: DeepPartial<TradeCorrection>): TradeCorrection;
};
export declare const TradeCancel: {
    encode(message: TradeCancel, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TradeCancel;
    fromJSON(object: any): TradeCancel;
    toJSON(message: TradeCancel): unknown;
    fromPartial(object: DeepPartial<TradeCancel>): TradeCancel;
};
export declare const Open: {
    encode(message: Open, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Open;
    fromJSON(object: any): Open;
    toJSON(message: Open): unknown;
    fromPartial(object: DeepPartial<Open>): Open;
};
export declare const High: {
    encode(message: High, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): High;
    fromJSON(object: any): High;
    toJSON(message: High): unknown;
    fromPartial(object: DeepPartial<High>): High;
};
export declare const HighRolling: {
    encode(message: HighRolling, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): HighRolling;
    fromJSON(object: any): HighRolling;
    toJSON(message: HighRolling): unknown;
    fromPartial(object: DeepPartial<HighRolling>): HighRolling;
};
export declare const Low: {
    encode(message: Low, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Low;
    fromJSON(object: any): Low;
    toJSON(message: Low): unknown;
    fromPartial(object: DeepPartial<Low>): Low;
};
export declare const LowRolling: {
    encode(message: LowRolling, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): LowRolling;
    fromJSON(object: any): LowRolling;
    toJSON(message: LowRolling): unknown;
    fromPartial(object: DeepPartial<LowRolling>): LowRolling;
};
export declare const Close: {
    encode(message: Close, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Close;
    fromJSON(object: any): Close;
    toJSON(message: Close): unknown;
    fromPartial(object: DeepPartial<Close>): Close;
};
export declare const PrevClose: {
    encode(message: PrevClose, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PrevClose;
    fromJSON(object: any): PrevClose;
    toJSON(message: PrevClose): unknown;
    fromPartial(object: DeepPartial<PrevClose>): PrevClose;
};
export declare const Last: {
    encode(message: Last, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Last;
    fromJSON(object: any): Last;
    toJSON(message: Last): unknown;
    fromPartial(object: DeepPartial<Last>): Last;
};
export declare const YearHigh: {
    encode(message: YearHigh, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): YearHigh;
    fromJSON(object: any): YearHigh;
    toJSON(message: YearHigh): unknown;
    fromPartial(object: DeepPartial<YearHigh>): YearHigh;
};
export declare const YearLow: {
    encode(message: YearLow, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): YearLow;
    fromJSON(object: any): YearLow;
    toJSON(message: YearLow): unknown;
    fromPartial(object: DeepPartial<YearLow>): YearLow;
};
export declare const Volume: {
    encode(message: Volume, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Volume;
    fromJSON(object: any): Volume;
    toJSON(message: Volume): unknown;
    fromPartial(object: DeepPartial<Volume>): Volume;
};
export declare const NumberOfTrades: {
    encode(message: NumberOfTrades, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): NumberOfTrades;
    fromJSON(object: any): NumberOfTrades;
    toJSON(message: NumberOfTrades): unknown;
    fromPartial(object: DeepPartial<NumberOfTrades>): NumberOfTrades;
};
export declare const MonetaryValue: {
    encode(message: MonetaryValue, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MonetaryValue;
    fromJSON(object: any): MonetaryValue;
    toJSON(message: MonetaryValue): unknown;
    fromPartial(object: DeepPartial<MonetaryValue>): MonetaryValue;
};
export declare const Settlement: {
    encode(message: Settlement, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Settlement;
    fromJSON(object: any): Settlement;
    toJSON(message: Settlement): unknown;
    fromPartial(object: DeepPartial<Settlement>): Settlement;
};
export declare const OpenInterest: {
    encode(message: OpenInterest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): OpenInterest;
    fromJSON(object: any): OpenInterest;
    toJSON(message: OpenInterest): unknown;
    fromPartial(object: DeepPartial<OpenInterest>): OpenInterest;
};
export declare const Vwap: {
    encode(message: Vwap, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Vwap;
    fromJSON(object: any): Vwap;
    toJSON(message: Vwap): unknown;
    fromPartial(object: DeepPartial<Vwap>): Vwap;
};
export declare const DividendsIncomeDistributions: {
    encode(message: DividendsIncomeDistributions, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DividendsIncomeDistributions;
    fromJSON(object: any): DividendsIncomeDistributions;
    toJSON(message: DividendsIncomeDistributions): unknown;
    fromPartial(object: DeepPartial<DividendsIncomeDistributions>): DividendsIncomeDistributions;
};
export declare const CapitalDistributions: {
    encode(message: CapitalDistributions, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CapitalDistributions;
    fromJSON(object: any): CapitalDistributions;
    toJSON(message: CapitalDistributions): unknown;
    fromPartial(object: DeepPartial<CapitalDistributions>): CapitalDistributions;
};
export declare const SharesOutstanding: {
    encode(message: SharesOutstanding, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SharesOutstanding;
    fromJSON(object: any): SharesOutstanding;
    toJSON(message: SharesOutstanding): unknown;
    fromPartial(object: DeepPartial<SharesOutstanding>): SharesOutstanding;
};
export declare const NetAssetValue: {
    encode(message: NetAssetValue, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): NetAssetValue;
    fromJSON(object: any): NetAssetValue;
    toJSON(message: NetAssetValue): unknown;
    fromPartial(object: DeepPartial<NetAssetValue>): NetAssetValue;
};
export declare const MarketSummary: {
    encode(message: MarketSummary, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MarketSummary;
    fromJSON(object: any): MarketSummary;
    toJSON(message: MarketSummary): unknown;
    fromPartial(object: DeepPartial<MarketSummary>): MarketSummary;
};
export declare const Context: {
    encode(message: Context, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Context;
    fromJSON(object: any): Context;
    toJSON(message: Context): unknown;
    fromPartial(object: DeepPartial<Context>): Context;
};
export declare const ContextData: {
    encode(message: ContextData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ContextData;
    fromJSON(object: any): ContextData;
    toJSON(message: ContextData): unknown;
    fromPartial(object: DeepPartial<ContextData>): ContextData;
};
export declare const TracePoint: {
    encode(message: TracePoint, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TracePoint;
    fromJSON(object: any): TracePoint;
    toJSON(message: TracePoint): unknown;
    fromPartial(object: DeepPartial<TracePoint>): TracePoint;
};
export declare const TCPHistoricalReplayRequest: {
    encode(message: TCPHistoricalReplayRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TCPHistoricalReplayRequest;
    fromJSON(object: any): TCPHistoricalReplayRequest;
    toJSON(message: TCPHistoricalReplayRequest): unknown;
    fromPartial(object: DeepPartial<TCPHistoricalReplayRequest>): TCPHistoricalReplayRequest;
};
export declare const SnapshotRequest: {
    encode(message: SnapshotRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SnapshotRequest;
    fromJSON(object: any): SnapshotRequest;
    toJSON(message: SnapshotRequest): unknown;
    fromPartial(object: DeepPartial<SnapshotRequest>): SnapshotRequest;
};
export declare const VolumeAtPrice: {
    encode(message: VolumeAtPrice, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): VolumeAtPrice;
    fromJSON(object: any): VolumeAtPrice;
    toJSON(message: VolumeAtPrice): unknown;
    fromPartial(object: DeepPartial<VolumeAtPrice>): VolumeAtPrice;
};
export declare const VolumeAtPrice_PriceLevelVolume: {
    encode(message: VolumeAtPrice_PriceLevelVolume, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): VolumeAtPrice_PriceLevelVolume;
    fromJSON(object: any): VolumeAtPrice_PriceLevelVolume;
    toJSON(message: VolumeAtPrice_PriceLevelVolume): unknown;
    fromPartial(object: DeepPartial<VolumeAtPrice_PriceLevelVolume>): VolumeAtPrice_PriceLevelVolume;
};
export declare const Ohlc: {
    encode(message: Ohlc, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Ohlc;
    fromJSON(object: any): Ohlc;
    toJSON(message: Ohlc): unknown;
    fromPartial(object: DeepPartial<Ohlc>): Ohlc;
};
export declare const InstrumentAction: {
    encode(message: InstrumentAction, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): InstrumentAction;
    fromJSON(object: any): InstrumentAction;
    toJSON(message: InstrumentAction): unknown;
    fromPartial(object: DeepPartial<InstrumentAction>): InstrumentAction;
};
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
