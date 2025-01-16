import WebSocket from "isomorphic-ws";
import { OpenFeedClient } from "@src/connection/client";
import { OpenFeedListeners } from "@src/connection/listeners";
import { version } from "@gen/version";
import { Result, SubscriptionType } from "@gen/openfeed_api";
import { Service } from "@gen/openfeed";
import { TIME } from "@src/utilities/constants";

jest.mock("@src/utilities/communication", () => ({
    send: jest.fn(),
    receive: jest.fn(),
}));
jest.mock("isomorphic-ws");

const testVersion = "mocked-os-version";
const testRelease = "mocked-os-release";
const testArch = "mocked-os-arch";

// Mock os module because it usees async import (a bit more complicated, but tests our string building)
jest.mock("os", () => ({
    version: jest.fn().mockReturnValue(testVersion),
    release: jest.fn().mockReturnValue(testRelease),
    arch: jest.fn().mockReturnValue(testArch),
}));

const emptyMessageEvent = {} as WebSocket.MessageEvent;
const emptyCloseEvent = {} as WebSocket.CloseEvent;

const testUsername = "test-username";
const testPassword = "test-password";

// Mock the import as the following:
// connectionMock = jest.spyOn(jest.requireActual("@src/connection/connection"), "OpenFeedConnection");
// doesn't seem to work to spy on the constructor
jest.mock("@src/connection/connection", () => {
    const originalModule = jest.requireActual("@src/connection/connection");
    return {
        ...originalModule,
        OpenFeedConnection: jest.fn().mockImplementation((...args: any[]) => {
            return new originalModule.OpenFeedConnection(...args);
        }),
    };
});

// Flush all active promises to advance the code stuck on awaits
const yieldToEventLoop = () => new Promise(setImmediate);

describe("OpenFeedClient", () => {
    let client: OpenFeedClient;
    let mockSocket: WebSocket;
    let mockSocketInstances: WebSocket[];
    let listeners: OpenFeedListeners;
    let communication: { send: jest.Mock; receive: jest.Mock };
    let connectionMock: jest.SpyInstance;

    beforeEach(() => {
        listeners = new OpenFeedListeners();
        client = new OpenFeedClient("ws://test-url", testUsername, testPassword, listeners);
        communication = jest.requireMock("@src/utilities/communication");
        const MockSocket = jest.requireMock("isomorphic-ws");
        mockSocketInstances = MockSocket.mock.instances;
        mockSocket = mockSocketInstances[0];
        connectionMock = jest.requireMock("@src/connection/connection").OpenFeedConnection;
    });

    afterEach(() => {
        client.dispose();
        jest.clearAllMocks();
    });

    it("should handle login flow correctly", async () => {
        const sendSpy = jest.spyOn(communication, "send");

        // Simulate socket open event
        mockSocket.onopen?.(emptyMessageEvent);

        // Yield to allow the async import to resolve
        await yieldToEventLoop();

        // Check that the login request was sent
        expect(sendSpy).toHaveBeenCalledTimes(1);
        const [[, loginRequest]] = sendSpy.mock.calls;
        const { correlationId, clientVersion, ...restRequest } = loginRequest.loginRequest;

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

        communication.receive.mockReturnValue([loginResponse]);

        mockSocket.onmessage?.(emptyMessageEvent);

        // This is not how we'll actually use the connection, but it's a good test to ensure the connection is created
        const conn = await client.connection;

        expect(conn).toBeDefined();
        expect(connectionMock).toHaveBeenCalledTimes(1);
        expect(connectionMock).toHaveBeenCalledWith(token, mockSocket, listeners, undefined);
    });

    it("should throw an error if it receives invalid credentials", async () => {
        const sendSpy = jest.spyOn(communication, "send");

        // Simulate socket open event
        mockSocket.onopen?.(emptyMessageEvent);

        // Yield to allow the async import to resolve
        await yieldToEventLoop();

        // Check that the login request was sent
        expect(sendSpy).toHaveBeenCalledTimes(1);

        const [[, loginRequest]] = sendSpy.mock.calls;
        const { correlationId } = loginRequest.loginRequest;
        // Simulate invalid credentials response
        const loginResponse = {
            loginResponse: {
                status: {
                    result: Result.INVALID_CREDENTIALS,
                },
                correlationId,
            },
        };

        communication.receive.mockReturnValue([loginResponse]);
        mockSocket.onmessage?.(emptyMessageEvent);

        await expect(client.connection).rejects.toThrow();
    });

    // This is our most complex test, as it tests the full flow of the client:
    // It logs in, subscribes to a service, disconnects, reconnects, and ensures resubscribe happens automatically
    it("should handle disconnect and attempt to reconnect while there is a subscription", async () => {
        const sendSpy = jest.spyOn(communication, "send");
        const disconnectSpy = jest.spyOn(listeners, "onDisconnected");

        // Simulate socket open event
        mockSocketInstances[0].onopen?.(emptyMessageEvent);

        // Yield to the event loop to allow the async import to resolve
        await yieldToEventLoop();

        const [[, loginRequest]] = sendSpy.mock.calls;
        const { correlationId } = loginRequest.loginRequest;

        // Simulate loginResponse message
        const loginResponse = {
            loginResponse: {
                token: "test-token",
                correlationId,
            },
        };

        communication.receive.mockReturnValue([loginResponse]);
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
        jest.useFakeTimers();
        await jest.advanceTimersByTimeAsync(TIME.RECONNECT);
        jest.useRealTimers();

        expect(disconnectSpy).toHaveBeenCalledTimes(1);

        // Simulate socket open event
        mockSocketInstances[1].onopen?.(emptyMessageEvent);

        // Yield to the event loop to allow the async import to resolve
        await yieldToEventLoop();

        expect(sendSpy).toHaveBeenCalledTimes(3);

        const [, , [, loginRequest2]] = sendSpy.mock.calls;
        const { correlationId: correlationId2 } = loginRequest2.loginRequest;

        // Simulate loginResponse message
        const loginResponse2 = {
            loginResponse: {
                token: "test-token",
                correlationId: correlationId2,
            },
        };

        communication.receive.mockReturnValue([loginResponse2]);
        mockSocketInstances[1].onmessage?.(emptyMessageEvent);

        await yieldToEventLoop();

        expect(sendSpy).toHaveBeenCalledTimes(4);

        const [, , , [, subscriptionRequest]] = sendSpy.mock.calls;
        expect(subscriptionRequest.subscriptionRequest.requests[0]).toMatchObject({
            symbol: testSymbols[0],
            subscriptionType: [subscriptionType],
            snapshotIntervalSeconds,
        });
        expect(subscriptionRequest.subscriptionRequest).toMatchObject({
            service,
            unsubscribe: false,
        });
    });
});
