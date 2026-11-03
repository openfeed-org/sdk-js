import { describe, it, expect, vi, afterEach, onTestFinished } from "vitest";
import WebSocket from "isomorphic-ws";
import { OpenFeedClient } from "@src/connection/client";
import { OpenFeedConnection } from "@src/connection/connection";
import { OpenFeedListeners } from "@src/connection/listeners";
import * as communicationModule from "@src/utilities/communication";
import { version } from "@gen/version";
import { Result, SubscriptionType } from "@gen/openfeed_api";
import { Service } from "@gen/openfeed";
import { TIME } from "@src/utilities/constants";
import { asMessage, defined } from "./helpers";

vi.mock("@src/utilities/communication", () => ({
    send: vi.fn(),
    receive: vi.fn(),
}));
const communication = vi.mocked(communicationModule);
// Manual mock: vitest automocking would also mock the onopen/onmessage accessors, which swallows the handlers the client assigns
vi.mock("isomorphic-ws", () => {
    const MockWebSocket = Object.assign(
        vi.fn(function FakeWebSocket(this: Record<string, unknown>) {
            this.close = vi.fn();
        }),
        { CONNECTING: 0, OPEN: 1, CLOSING: 2, CLOSED: 3 }
    );
    return { default: MockWebSocket };
});

// vi.mock factories are hoisted above the rest of the file, so the values they use must be hoisted too
const { testVersion, testRelease, testArch } = vi.hoisted(() => ({
    testVersion: "mocked-os-version",
    testRelease: "mocked-os-release",
    testArch: "mocked-os-arch",
}));

// Mock os module because it usees async import (a bit more complicated, but tests our string building)
vi.mock("os", () => ({
    version: vi.fn().mockReturnValue(testVersion),
    release: vi.fn().mockReturnValue(testRelease),
    arch: vi.fn().mockReturnValue(testArch),
}));

const emptyMessageEvent = {} as WebSocket.MessageEvent;
const emptyCloseEvent = {} as WebSocket.CloseEvent;

const testUsername = "test-username";
const testPassword = "test-password";

// Wrap the real class in a mock so we can assert on how it was constructed
vi.mock("@src/connection/connection", async (importOriginal) => {
    const originalModule = await importOriginal<typeof import("@src/connection/connection")>();
    return {
        ...originalModule,
        OpenFeedConnection: vi.fn(class extends originalModule.OpenFeedConnection {}),
    };
});

// Flush all active promises to advance the code stuck on awaits
const yieldToEventLoop = () => new Promise(setImmediate);

const setup = () => {
    const listeners = new OpenFeedListeners();
    const client = new OpenFeedClient("ws://test-url", testUsername, testPassword, listeners);
    onTestFinished(() => {
        client.dispose();
    });
    const mockSocketInstances = vi.mocked(WebSocket).mock.instances;
    const [mockSocket] = mockSocketInstances;
    const connectionMock = vi.mocked(OpenFeedConnection);
    return { client, mockSocket, mockSocketInstances, listeners, connectionMock };
};

describe("OpenFeedClient", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should handle login flow correctly", async () => {
        const { client, mockSocket, listeners, connectionMock } = setup();
        const sendSpy = communication.send;

        // Simulate socket open event
        mockSocket.onopen?.(emptyMessageEvent);

        // Yield to allow the async import to resolve
        await yieldToEventLoop();

        // Check that the login request was sent
        expect(sendSpy).toHaveBeenCalledTimes(1);
        const [[, loginRequest]] = sendSpy.mock.calls;
        const { correlationId, clientVersion, ...restRequest } = defined(loginRequest.loginRequest);

        expect(restRequest).toMatchObject({
            username: testUsername,
            password: testPassword,
            protocolVersion: 1,
            jwt: "",
        });

        const expectedSubstrings = [testVersion, testRelease, testArch, `sdk-js:${version}`, `client-id:default`];

        expect(expectedSubstrings.every((substring) => clientVersion.includes(substring))).toBe(true);

        const token = "test-token";

        // Simulate loginResponse message
        const loginResponse = {
            loginResponse: {
                token,
                correlationId,
            },
        };

        communication.receive.mockReturnValue([asMessage(loginResponse)]);

        mockSocket.onmessage?.(emptyMessageEvent);

        // This is not how we'll actually use the connection, but it's a good test to ensure the connection is created
        const conn = await client.connection;

        expect(conn).toBeDefined();
        expect(connectionMock).toHaveBeenCalledTimes(1);
        expect(connectionMock).toHaveBeenCalledWith(token, mockSocket, listeners, undefined);
    });

    it("should throw an error if it receives invalid credentials", async () => {
        const { client, mockSocket } = setup();
        const sendSpy = communication.send;

        // Simulate socket open event
        mockSocket.onopen?.(emptyMessageEvent);

        // Yield to allow the async import to resolve
        await yieldToEventLoop();

        // Check that the login request was sent
        expect(sendSpy).toHaveBeenCalledTimes(1);

        const [[, loginRequest]] = sendSpy.mock.calls;
        const { correlationId } = defined(loginRequest.loginRequest);
        // Simulate invalid credentials response
        const loginResponse = {
            loginResponse: {
                status: {
                    result: Result.INVALID_CREDENTIALS,
                },
                correlationId,
            },
        };

        communication.receive.mockReturnValue([asMessage(loginResponse)]);
        mockSocket.onmessage?.(emptyMessageEvent);

        await expect(client.connection).rejects.toThrow();
    });

    // This is our most complex test, as it tests the full flow of the client:
    // It logs in, subscribes to a service, disconnects, reconnects, and ensures resubscribe happens automatically
    it("should handle disconnect and attempt to reconnect while there is a subscription", async () => {
        const { client, mockSocketInstances, listeners } = setup();
        const sendSpy = communication.send;
        const disconnectSpy = vi.spyOn(listeners, "onDisconnected");

        // Simulate socket open event
        mockSocketInstances[0].onopen?.(emptyMessageEvent);

        // Yield to the event loop to allow the async import to resolve
        await yieldToEventLoop();

        const [[, loginRequest]] = sendSpy.mock.calls;
        const { correlationId } = defined(loginRequest.loginRequest);

        // Simulate loginResponse message
        const loginResponse = {
            loginResponse: {
                token: "test-token",
                correlationId,
            },
        };

        communication.receive.mockReturnValue([asMessage(loginResponse)]);
        mockSocketInstances[0].onmessage?.(emptyMessageEvent);

        const service = Service.DELAYED;
        const subscriptionType = SubscriptionType.DEPTH_PRICE;
        const snapshotIntervalSeconds = 9;
        const testSymbols = ["MSFT"];

        client.subscribe(service, subscriptionType, snapshotIntervalSeconds, testSymbols);

        // Yield to the event loop to allow for subscribe to go through
        await yieldToEventLoop();

        mockSocketInstances[0].onclose?.(emptyCloseEvent);

        // Use fake timers to fast-forward the reconnect delay
        vi.useFakeTimers();
        await vi.advanceTimersByTimeAsync(TIME.RECONNECT + TIME.RECONNECT_RANDOMIZE);
        vi.useRealTimers();

        expect(disconnectSpy).toHaveBeenCalledTimes(1);

        // Simulate socket open event
        mockSocketInstances[1].onopen?.(emptyMessageEvent);

        // Yield to the event loop to allow the async import to resolve
        await yieldToEventLoop();

        expect(sendSpy).toHaveBeenCalledTimes(3);

        const [, , [, loginRequest2]] = sendSpy.mock.calls;
        const { correlationId: correlationId2 } = defined(loginRequest2.loginRequest);

        // Simulate loginResponse message
        const loginResponse2 = {
            loginResponse: {
                token: "test-token",
                correlationId: correlationId2,
            },
        };

        communication.receive.mockReturnValue([asMessage(loginResponse2)]);
        mockSocketInstances[1].onmessage?.(emptyMessageEvent);

        await yieldToEventLoop();

        expect(sendSpy).toHaveBeenCalledTimes(4);

        const [, , , [, subscriptionRequest]] = sendSpy.mock.calls;
        expect(defined(subscriptionRequest.subscriptionRequest).requests[0]).toMatchObject({
            symbol: testSymbols[0],
            subscriptionType: [subscriptionType],
            snapshotIntervalSeconds,
        });
        expect(defined(subscriptionRequest.subscriptionRequest)).toMatchObject({
            service,
            unsubscribe: false,
        });
    });
});
