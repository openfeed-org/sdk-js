import { describe, it, expect, vi, afterEach, onTestFinished } from "vitest";
import WebSocket from "isomorphic-ws";

import { OpenFeedConnection } from "@src/connection/connection";
import { OpenFeedListeners } from "@src/connection/listeners";
import * as communicationModule from "@src/utilities/communication";
import { Service } from "@gen/openfeed";
import { SubscriptionType } from "@gen/openfeed_api";
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
