import { describe, it, expect, vi, afterEach, onTestFinished } from "vitest";
import WebSocket from "isomorphic-ws";

import { OpenFeedConnection } from "@src/connection/connection";
import { OpenFeedListeners } from "@src/connection/listeners";
import * as communicationModule from "@src/utilities/communication";
import { Service } from "@gen/openfeed";
import { Result, SubscriptionType } from "@gen/openfeed_api";
import { InstrumentLookupError } from "@src/connection/errors";
import { asMessage, defined } from "./helpers";

vi.mock("@src/utilities/communication", () => ({
    send: vi.fn(),
    receive: vi.fn(),
}));
const communication = vi.mocked(communicationModule);

const emptyEvent = {} as WebSocket.MessageEvent;

const setup = () => {
    const mockSocket = {
        onmessage: vi.fn(),
        close: vi.fn(),
    } as unknown as WebSocket;

    const listeners = new OpenFeedListeners();
    const connection = new OpenFeedConnection("test-token", mockSocket, listeners);
    onTestFinished(() => {
        connection.dispose();
    });
    return { connection, mockSocket, listeners };
};

describe("OpenFeedConnection", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should handle heartBeat messages", () => {
        const { mockSocket, listeners } = setup();
        const heartBeatSpy = vi.spyOn(listeners, "onHeartBeat");
        communication.receive.mockReturnValue([asMessage({ heartBeat: true })]);

        mockSocket.onmessage?.(emptyEvent);

        expect(heartBeatSpy).toHaveBeenCalledTimes(1);
    });
    it("should handle instrumentResponse messages", async () => {
        const { connection, mockSocket } = setup();
        const sendSpy = communication.send;
        const instrumentPromise = connection.getInstrument({ symbol: "test-symbol", instrumentType: [], spreadType: [] });

        expect(sendSpy).toHaveBeenCalledTimes(1);
        const [[, sent]] = sendSpy.mock.calls;
        const instrumentRequest = defined(sent.instrumentRequest);
        expect(instrumentRequest.symbol).toBe("test-symbol");
        const id = instrumentRequest.correlationId;
        const mockID = {};

        const mockInstrumentResponse = [
            { instrumentResponse: { correlationId: id, instrumentDefinition: mockID, numberOfDefinitions: 2 } },
            { instrumentResponse: { correlationId: id, instrumentDefinition: mockID, numberOfDefinitions: 2 } },
        ];
        communication.receive.mockReturnValue(mockInstrumentResponse.map(asMessage));
        mockSocket.onmessage?.(emptyEvent);

        const res = await instrumentPromise;
        expect(res.length).toBe(2);
        expect(res[0]).toBe(mockID);
        expect(res[1]).toBe(mockID);
    });

    const lookup = (connection: OpenFeedConnection) => {
        const promise = connection.getInstrument({ symbol: "test-symbol", instrumentType: [], spreadType: [] });
        const [[, sent]] = communication.send.mock.calls;
        return { promise, id: defined(sent.instrumentRequest).correlationId };
    };

    it("should reject an instrument lookup the server refuses, and still pass the response on", async () => {
        const { connection, mockSocket, listeners } = setup();
        const messageSpy = vi.spyOn(listeners, "onMessage");
        const { promise, id } = lookup(connection);

        communication.receive.mockReturnValue([
            asMessage({
                instrumentResponse: {
                    correlationId: id,
                    status: { result: Result.INVALID_SYMBOL, message: "Symbol Not Found: test-symbol" },
                    numberOfDefinitions: 0,
                },
            }),
        ]);
        mockSocket.onmessage?.(emptyEvent);

        const error = await promise.catch((e: unknown) => e);
        expect(error).toBeInstanceOf(InstrumentLookupError);
        expect((error as InstrumentLookupError).result).toBe(Result.INVALID_SYMBOL);
        expect((error as InstrumentLookupError).serverMessage).toBe("Symbol Not Found: test-symbol");
        expect((error as InstrumentLookupError).message).toBe(
            'INVALID_SYMBOL: the instrument lookup failed. Server said: "Symbol Not Found: test-symbol"'
        );
        expect(messageSpy).toHaveBeenCalledTimes(1);
    });

    it("should give an empty list for a successful instrument lookup with no definitions", async () => {
        const { connection, mockSocket } = setup();
        const { promise, id } = lookup(connection);

        communication.receive.mockReturnValue([
            asMessage({ instrumentResponse: { correlationId: id, status: { result: Result.SUCCESS, message: "" }, numberOfDefinitions: 0 } }),
        ]);
        mockSocket.onmessage?.(emptyEvent);

        await expect(promise).resolves.toEqual([]);
    });

    it("should pass on an instrument response that isn't a lookup's, such as one for a request made through send", () => {
        const { connection, mockSocket, listeners } = setup();
        const messageSpy = vi.spyOn(listeners, "onMessage");
        const id = connection.send({ instrumentRequest: { symbol: "test-symbol", instrumentType: [], spreadType: [], version: 1 } });

        const message = asMessage({ instrumentResponse: { correlationId: id, instrumentDefinition: {}, numberOfDefinitions: 1 } });
        communication.receive.mockReturnValue([message]);
        mockSocket.onmessage?.(emptyEvent);

        expect(messageSpy).toHaveBeenCalledWith(message);
    });

    it("should handle instrumentReferenceResponse messages", async () => {
        const { connection, mockSocket } = setup();
        const sendSpy = communication.send;
        const instrumentReferencePromise = connection.getInstrumentReference({ symbol: "test-symbol" });

        expect(sendSpy).toHaveBeenCalledTimes(1);
        const [[, sent]] = sendSpy.mock.calls;
        const instrumentReferenceRequest = defined(sent.instrumentReferenceRequest);
        expect(instrumentReferenceRequest.symbol).toBe("test-symbol");
        const id = instrumentReferenceRequest.correlationId;
        const mockReferenceResponse = { correlationId: id };

        communication.receive.mockReturnValue([asMessage({ instrumentReferenceResponse: mockReferenceResponse })]);
        mockSocket.onmessage?.(emptyEvent);

        const res = await instrumentReferencePromise;
        expect(res).toBe(mockReferenceResponse);
    });

    it("should handle exchangeResponse messages", async () => {
        const { connection, mockSocket } = setup();
        const sendSpy = communication.send;
        const exchangePromise = connection.getExchanges();

        expect(sendSpy).toHaveBeenCalledTimes(1);
        const [[, sent]] = sendSpy.mock.calls;
        const exchangeRequest = defined(sent.exchangeRequest);
        const id = exchangeRequest.correlationId;
        const mockExchangeResponse = {
            correlationId: id,
            exchanges: [{ code: "exchange1" }, { code: "exchange2" }],
        };

        communication.receive.mockReturnValue([asMessage({ exchangeResponse: mockExchangeResponse })]);
        mockSocket.onmessage?.(emptyEvent);

        const res = await exchangePromise;
        expect(res.length).toBe(2);
        expect(res[0].code).toBe("exchange1");
        expect(res[1].code).toBe("exchange2");
    });

    it("should handle subscriptionResponse messages", () => {
        const { connection, mockSocket, listeners } = setup();
        const sendSpy = communication.send;
        const messageSpy = vi.spyOn(listeners, "onMessage");

        const subscriptionType = SubscriptionType.CUMULATIVE_VOLUME;
        const snapshotIntervalSeconds = 3;
        const testSymbols = ["test-symbol-1", "test-symbol-2"];
        const subCorrelationId = connection.subscribe(Service.REAL_TIME, subscriptionType, snapshotIntervalSeconds, testSymbols, null, null, null);

        expect(sendSpy).toHaveBeenCalledTimes(1);
        const [[, sent]] = sendSpy.mock.calls;
        const subscriptionRequest = defined(sent.subscriptionRequest);
        const { requests } = subscriptionRequest;
        expect(requests.length).toBe(testSymbols.length);
        expect(requests[0].symbol).toBe("test-symbol-1");
        expect(requests[1].symbol).toBe("test-symbol-2");

        expect(requests[0].subscriptionType[0]).toBe(requests[1].subscriptionType[0]);
        expect(requests[0].subscriptionType[0]).toBe(subscriptionType);

        expect(requests[0].snapshotIntervalSeconds).toBe(requests[1].snapshotIntervalSeconds);
        expect(requests[0].snapshotIntervalSeconds).toBe(snapshotIntervalSeconds);

        const id = subscriptionRequest.correlationId;
        expect(id).toBe(subCorrelationId);

        const mockSubscriptionResponse = { correlationId: id, unsubscribe: false };

        communication.receive.mockReturnValue([asMessage({ subscriptionResponse: mockSubscriptionResponse })]);

        expect(messageSpy).toHaveBeenCalledTimes(0);
        mockSocket.onmessage?.(emptyEvent);
        expect(messageSpy).toHaveBeenCalledTimes(1);

        const [[message]] = messageSpy.mock.calls;
        expect(message.subscriptionResponse).toBe(mockSubscriptionResponse);
    });
});
