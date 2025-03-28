import { OpenFeedListeners } from "@src/connection/listeners";
import { OpenfeedGatewayMessage, Result, SubscriptionType } from "@gen/openfeed_api";
import Long from "long";
import { ActionType } from "@gen/openfeed";

const MARKET_ID = Long.fromNumber(12345);
const ALIAS_REGULAR_OLD = "SYM*4";
const ALIAS_REGULAR_NEW = "SYM*5";

const MESSAGES = {
    SUBSCRIPTION_RESPONSE_MESSAGE_OLD: {
        subscriptionResponse: {
            correlationId: Long.fromNumber(1),
            marketId: MARKET_ID,
            symbol: ALIAS_REGULAR_OLD,
            unsubscribe: false,
            subscriptionType: SubscriptionType.ALL,
            status: {
                result: Result.SUCCESS,
            },
        },
    } as Partial<OpenfeedGatewayMessage> as OpenfeedGatewayMessage,
    SUBSCRIPTION_RESPONSE_DEPTH_OLD: {
        subscriptionResponse: {
            correlationId: Long.fromNumber(2),
            marketId: MARKET_ID,
            symbol: ALIAS_REGULAR_OLD,
            unsubscribe: false,
            subscriptionType: SubscriptionType.DEPTH_PRICE,
            status: {
                result: Result.SUCCESS,
            },
        },
    } as Partial<OpenfeedGatewayMessage> as OpenfeedGatewayMessage,
    INSTRUMENT_DEFINITION_MESSAGE_OLD: {
        instrumentDefinition: {
            marketId: MARKET_ID,
            symbol: ALIAS_REGULAR_OLD,
        },
    } as Partial<OpenfeedGatewayMessage> as OpenfeedGatewayMessage,
    DUMMY_SNAPSHOT_MESSAGE: {
        marketSnapshot: {
            marketId: MARKET_ID,
        },
    } as Partial<OpenfeedGatewayMessage> as OpenfeedGatewayMessage,
    INSTRUMENT_ACTION_MESSAGE: {
        instrumentAction: {
            action: ActionType.ALIAS_CHANGED,
            instrument: { marketId: MARKET_ID, symbol: ALIAS_REGULAR_OLD },
            oldAlias: ALIAS_REGULAR_OLD,
            newInstrument: { marketId: MARKET_ID, symbol: ALIAS_REGULAR_NEW },
        },
    } as Partial<OpenfeedGatewayMessage> as OpenfeedGatewayMessage,
    SUBSCRIPTION_RESPONSE_MESSAGE_NEW: {
        subscriptionResponse: {
            correlationId: Long.fromNumber(3),
            marketId: MARKET_ID,
            symbol: ALIAS_REGULAR_NEW,
            unsubscribe: false,
            subscriptionType: SubscriptionType.ALL,
            status: {
                result: Result.SUCCESS,
            },
        },
    } as Partial<OpenfeedGatewayMessage> as OpenfeedGatewayMessage,
    INSTRUMENT_DEFINITION_MESSAGE_NEW: {
        instrumentDefinition: {
            marketId: MARKET_ID,
            symbol: ALIAS_REGULAR_NEW,
        },
    } as Partial<OpenfeedGatewayMessage> as OpenfeedGatewayMessage,
    DUMMY_UPDATE_MESSAGE: {
        marketUpdate: {
            marketId: MARKET_ID,
        },
    } as Partial<OpenfeedGatewayMessage> as OpenfeedGatewayMessage,
    VOLUME_AT_PRICE_MESSAGE: {
        volumeAtPrice: {
            marketId: MARKET_ID,
        },
    } as Partial<OpenfeedGatewayMessage> as OpenfeedGatewayMessage,
    OHLC_MESSAGE: {
        ohlc: {
            marketId: MARKET_ID,
        },
    } as Partial<OpenfeedGatewayMessage> as OpenfeedGatewayMessage,
    DUMMY_SUBSCRIPTION_UNAUTHORIZED: {
        subscriptionResponse: {
            correlationId: Long.fromNumber(1),
            marketId: MARKET_ID,
            symbol: ALIAS_REGULAR_OLD,
            unsubscribe: false,
            subscriptionType: SubscriptionType.ALL,
            status: {
                result: Result.INSUFFICIENT_PRIVILEGES,
            },
        },
    } as Partial<OpenfeedGatewayMessage> as OpenfeedGatewayMessage,
    DUMMY_UNSUBSCRIPTION_UNSUBSCRIBED: {
        subscriptionResponse: {
            correlationId: Long.fromNumber(1),
            marketId: MARKET_ID,
            symbol: ALIAS_REGULAR_OLD,
            unsubscribe: true,
            subscriptionType: SubscriptionType.ALL,
            status: {
                result: Result.NOT_SUBSCRIBED,
            },
        },
    } as Partial<OpenfeedGatewayMessage> as OpenfeedGatewayMessage,
    DUMMY_UNSUBSCRIPTION_DEPTH: {
        subscriptionResponse: {
            correlationId: Long.fromNumber(2),
            marketId: MARKET_ID,
            symbol: ALIAS_REGULAR_OLD,
            unsubscribe: true,
            subscriptionType: SubscriptionType.DEPTH_ORDER,
            status: {
                result: Result.SUCCESS,
            },
        },
    } as Partial<OpenfeedGatewayMessage> as OpenfeedGatewayMessage,
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

    it("should handle multiple different type subscription messages correctly", () => {
        // This one is possible, and we wouldn't like to end up with copies of the same symbol in this case
        listeners.onMessage(MESSAGES.SUBSCRIPTION_RESPONSE_MESSAGE_OLD);
        listeners.onMessage(MESSAGES.SUBSCRIPTION_RESPONSE_DEPTH_OLD);

        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(MESSAGES.SUBSCRIPTION_RESPONSE_MESSAGE_OLD, [ALIAS_REGULAR_OLD], undefined);
        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(MESSAGES.SUBSCRIPTION_RESPONSE_DEPTH_OLD, [ALIAS_REGULAR_OLD], undefined);
    });

    it("should handle multiple subscriptionResponse messages correctly", () => {
        // Not expecting this to happen in regular use, but we still wouldn't like to end up with copies of the same symbol in this case
        listeners.onMessage(MESSAGES.SUBSCRIPTION_RESPONSE_MESSAGE_NEW);
        listeners.onMessage(MESSAGES.SUBSCRIPTION_RESPONSE_MESSAGE_NEW);

        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(MESSAGES.SUBSCRIPTION_RESPONSE_MESSAGE_NEW, [ALIAS_REGULAR_NEW], undefined);
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

    it("should not connect anything on error subscription", async () => {
        // We expect the other messages not to be related with the subscription request if it failed. The listeners will still pass the messages to the client.
        const messagesInOrder = [
            MESSAGES.DUMMY_SUBSCRIPTION_UNAUTHORIZED,
            MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_OLD,
            MESSAGES.DUMMY_SNAPSHOT_MESSAGE,
        ];

        // Simulate the arrival of the messages
        messagesInOrder.forEach((message) => {
            listeners.onMessage(message);
        });

        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(MESSAGES.DUMMY_SUBSCRIPTION_UNAUTHORIZED, [], undefined);
        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_OLD, [], undefined);
        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(
            MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_OLD,
            [],
            MESSAGES.DUMMY_SNAPSHOT_MESSAGE.instrumentDefinition
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

    it("should handle unsubscription messages correctly", () => {
        // We require the subscriptionResponse and instrumentDefinition message to arrive first
        listeners.onMessage(MESSAGES.SUBSCRIPTION_RESPONSE_DEPTH_OLD);
        listeners.onMessage(MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_OLD);
        listeners.onMessage(MESSAGES.DUMMY_UNSUBSCRIPTION_DEPTH);
        listeners.onMessage(MESSAGES.DUMMY_SNAPSHOT_MESSAGE);

        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(MESSAGES.SUBSCRIPTION_RESPONSE_DEPTH_OLD, [ALIAS_REGULAR_OLD], undefined);
        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_OLD, [ALIAS_REGULAR_OLD], undefined);
        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(
            MESSAGES.DUMMY_UNSUBSCRIPTION_DEPTH,
            [ALIAS_REGULAR_OLD],
            MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_OLD.instrumentDefinition
        );
        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(MESSAGES.DUMMY_SNAPSHOT_MESSAGE, [], undefined);
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

    it("should not drop a subscription when receiving an error unsubscription response message", async () => {
        // We expect the messages to arrive in the following order - subscriptionResponse, instrumentDefinition, marketSnapshot
        const messagesInOrder = [
            MESSAGES.SUBSCRIPTION_RESPONSE_MESSAGE_OLD,
            MESSAGES.DUMMY_SUBSCRIPTION_UNAUTHORIZED,
            MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_OLD,
            MESSAGES.DUMMY_SNAPSHOT_MESSAGE,
            MESSAGES.DUMMY_UNSUBSCRIPTION_UNSUBSCRIBED,
            MESSAGES.DUMMY_SNAPSHOT_MESSAGE,
        ];

        // Simulate the arrival of the messages
        messagesInOrder.forEach((message) => {
            listeners.onMessage(message);
        });

        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(MESSAGES.SUBSCRIPTION_RESPONSE_MESSAGE_OLD, [ALIAS_REGULAR_OLD], undefined);
        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(MESSAGES.DUMMY_SUBSCRIPTION_UNAUTHORIZED, [ALIAS_REGULAR_OLD], undefined);
        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_OLD, [ALIAS_REGULAR_OLD], undefined);
        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(
            MESSAGES.DUMMY_SNAPSHOT_MESSAGE,
            [ALIAS_REGULAR_OLD],
            MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_OLD.instrumentDefinition
        );
        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(
            MESSAGES.DUMMY_UNSUBSCRIPTION_UNSUBSCRIBED,
            [ALIAS_REGULAR_OLD],
            MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_OLD.instrumentDefinition
        );
        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(
            MESSAGES.DUMMY_SNAPSHOT_MESSAGE,
            [ALIAS_REGULAR_OLD],
            MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_OLD.instrumentDefinition
        );
    });

    it("should not drop a subscription when receiving an unrelated unsubscription response message", async () => {
        // We expect the messages to arrive in the following order - subscriptionResponse, instrumentDefinition, marketSnapshot
        const messagesInOrder = [
            MESSAGES.SUBSCRIPTION_RESPONSE_MESSAGE_OLD,
            MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_OLD,
            MESSAGES.DUMMY_SNAPSHOT_MESSAGE,
            MESSAGES.DUMMY_UNSUBSCRIPTION_DEPTH,
            MESSAGES.DUMMY_SNAPSHOT_MESSAGE,
        ];

        // Simulate the arrival of the messages
        messagesInOrder.forEach((message) => {
            listeners.onMessage(message);
        });

        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(MESSAGES.SUBSCRIPTION_RESPONSE_MESSAGE_OLD, [ALIAS_REGULAR_OLD], undefined);
        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_OLD, [ALIAS_REGULAR_OLD], undefined);
        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(
            MESSAGES.DUMMY_SNAPSHOT_MESSAGE,
            [ALIAS_REGULAR_OLD],
            MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_OLD.instrumentDefinition
        );
        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(
            MESSAGES.DUMMY_UNSUBSCRIPTION_DEPTH,
            [ALIAS_REGULAR_OLD],
            MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_OLD.instrumentDefinition
        );
        expect(onMessageWithMetadataSpy).toHaveBeenCalledWith(
            MESSAGES.DUMMY_SNAPSHOT_MESSAGE,
            [ALIAS_REGULAR_OLD],
            MESSAGES.INSTRUMENT_DEFINITION_MESSAGE_OLD.instrumentDefinition
        );
    });
});
