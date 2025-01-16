import { OpenFeedListeners } from "@src/connection/listeners";
import { OpenfeedGatewayMessage } from "@gen/openfeed_api";
import Long from "long";
import { ActionType } from "@gen/openfeed";

const MARKET_ID = Long.fromNumber(12345);
const ALIAS_REGULAR_OLD = "SYM*4";
const ALIAS_REGULAR_NEW = "SYM*5";

const MESSAGES = {
    SUBSCRIPTION_RESPONSE_MESSAGE_OLD: {
        subscriptionResponse: {
            marketId: MARKET_ID,
            symbol: ALIAS_REGULAR_OLD,
            unsubscribe: false,
        },
    } as unknown as OpenfeedGatewayMessage,
    INSTRUMENT_DEFINITION_MESSAGE_OLD: {
        instrumentDefinition: {
            marketId: MARKET_ID,
            symbol: ALIAS_REGULAR_OLD,
        },
    } as unknown as OpenfeedGatewayMessage,
    DUMMY_SNAPSHOT_MESSAGE: {
        marketSnapshot: {
            marketId: MARKET_ID,
        },
    } as unknown as OpenfeedGatewayMessage,
    INSTRUMENT_ACTION_MESSAGE: {
        instrumentAction: {
            action: ActionType.ALIAS_CHANGED,
            instrument: { marketId: MARKET_ID, symbol: ALIAS_REGULAR_OLD },
            oldAlias: ALIAS_REGULAR_OLD,
            newInstrument: { marketId: MARKET_ID, symbol: ALIAS_REGULAR_NEW },
        },
    } as unknown as OpenfeedGatewayMessage,
    SUBSCRIPTION_RESPONSE_MESSAGE_NEW: {
        subscriptionResponse: {
            marketId: MARKET_ID,
            symbol: ALIAS_REGULAR_NEW,
            unsubscribe: false,
        },
    } as unknown as OpenfeedGatewayMessage,
    INSTRUMENT_DEFINITION_MESSAGE_NEW: {
        instrumentDefinition: {
            marketId: MARKET_ID,
            symbol: ALIAS_REGULAR_NEW,
        },
    } as unknown as OpenfeedGatewayMessage,
    DUMMY_UPDATE_MESSAGE: {
        marketUpdate: {
            marketId: MARKET_ID,
        },
    } as unknown as OpenfeedGatewayMessage,
    VOLUME_AT_PRICE_MESSAGE: {
        volumeAtPrice: {
            marketId: MARKET_ID,
        },
    } as unknown as OpenfeedGatewayMessage,
    OHLC_MESSAGE: {
        ohlc: {
            marketId: MARKET_ID,
        },
    } as unknown as OpenfeedGatewayMessage,
};

describe("OpenFeedListeners", () => {
    let listeners: OpenFeedListeners;
    let onMessageWithMetadataSpy: jest.SpyInstance;

    beforeEach(() => {
        listeners = new OpenFeedListeners();
        onMessageWithMetadataSpy = jest.spyOn(listeners, "onMessageWithMetadata");
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should handle single subscriptionResponse messages", () => {
        listeners.onMessage(MESSAGES.SUBSCRIPTION_RESPONSE_MESSAGE_NEW);

        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(MESSAGES.SUBSCRIPTION_RESPONSE_MESSAGE_NEW, [ALIAS_REGULAR_NEW], undefined);
    });

    it("should handle instrumentDefinition messages correctly", () => {
        // We require the subscriptionResponse message to arrive first
        listeners.onMessage(MESSAGES.SUBSCRIPTION_RESPONSE_MESSAGE_NEW);
        listeners.onMessage(MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_NEW);

        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(MESSAGES.SUBSCRIPTION_RESPONSE_MESSAGE_NEW, [ALIAS_REGULAR_NEW], undefined);
        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_NEW, [ALIAS_REGULAR_NEW], undefined);
    });

    it("should handle marketSnapshot messages correctly", () => {
        // We require the subscriptionResponse and instrumentDefinition message to arrive first
        listeners.onMessage(MESSAGES.SUBSCRIPTION_RESPONSE_MESSAGE_NEW);
        listeners.onMessage(MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_NEW);
        listeners.onMessage(MESSAGES.DUMMY_SNAPSHOT_MESSAGE);

        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(
            MESSAGES.DUMMY_SNAPSHOT_MESSAGE,
            [ALIAS_REGULAR_NEW],
            MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_NEW.instrumentDefinition
        );
    });

    it("should handle marketUpdate messages correctly", () => {
        // We require the subscriptionResponse and instrumentDefinition message to arrive first
        listeners.onMessage(MESSAGES.SUBSCRIPTION_RESPONSE_MESSAGE_NEW);
        listeners.onMessage(MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_NEW);
        listeners.onMessage(MESSAGES.DUMMY_UPDATE_MESSAGE);

        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(
            MESSAGES.DUMMY_UPDATE_MESSAGE,
            [ALIAS_REGULAR_NEW],
            MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_NEW.instrumentDefinition
        );
    });

    it("should handle volumeAtPrice messages correctly", () => {
        // We require the subscriptionResponse and instrumentDefinition message to arrive first
        listeners.onMessage(MESSAGES.SUBSCRIPTION_RESPONSE_MESSAGE_NEW);
        listeners.onMessage(MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_NEW);
        listeners.onMessage(MESSAGES.VOLUME_AT_PRICE_MESSAGE);

        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(
            MESSAGES.VOLUME_AT_PRICE_MESSAGE,
            [ALIAS_REGULAR_NEW],
            MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_NEW.instrumentDefinition
        );
    });

    it("should handle ohlc messages correctly", () => {
        // We require the subscriptionResponse and instrumentDefinition message to arrive first
        listeners.onMessage(MESSAGES.SUBSCRIPTION_RESPONSE_MESSAGE_NEW);
        listeners.onMessage(MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_NEW);
        listeners.onMessage(MESSAGES.OHLC_MESSAGE);

        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(
            MESSAGES.OHLC_MESSAGE,
            [ALIAS_REGULAR_NEW],
            MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_NEW.instrumentDefinition
        );
    });

    it("should handle alias_changed instrument action correctly", () => {
        // We expect the messages to arrive in the following order - subscriptionResponse, instrumentDefinition, marketSnapshot
        // after an alias change - we expect the subscriptionResponse and instrumentDefinition to be repeated so that we can reconnect everything
        const messagesInOrder = [
            MESSAGES.SUBSCRIPTION_RESPONSE_MESSAGE_OLD,
            MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_OLD,
            MESSAGES.DUMMY_SNAPSHOT_MESSAGE,
            MESSAGES.INSTRUMENT_ACTION_MESSAGE,
            MESSAGES.SUBSCRIPTION_RESPONSE_MESSAGE_NEW,
            MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_NEW,
            MESSAGES.DUMMY_SNAPSHOT_MESSAGE,
        ];

        // Simulate the arrival of the messages
        messagesInOrder.forEach((message) => {
            listeners.onMessage(message);
        });

        // Verify that onMessageWithMetadata was called with the correct arguments
        // We expect to get the symbol names from the very start, and the instrument definition only after the instrument definition message
        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(MESSAGES.SUBSCRIPTION_RESPONSE_MESSAGE_OLD, [ALIAS_REGULAR_OLD], undefined);
        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_OLD, [ALIAS_REGULAR_OLD], undefined);
        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(
            MESSAGES.DUMMY_SNAPSHOT_MESSAGE,
            [ALIAS_REGULAR_OLD],
            MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_OLD.instrumentDefinition
        );

        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(
            MESSAGES.INSTRUMENT_ACTION_MESSAGE,
            [ALIAS_REGULAR_OLD],
            MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_OLD.instrumentDefinition
        );
        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(MESSAGES.SUBSCRIPTION_RESPONSE_MESSAGE_NEW, [ALIAS_REGULAR_NEW], undefined);
        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_NEW, [ALIAS_REGULAR_NEW], undefined);
        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(
            MESSAGES.DUMMY_SNAPSHOT_MESSAGE,
            [ALIAS_REGULAR_NEW],
            MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_NEW.instrumentDefinition
        );
    });
});
