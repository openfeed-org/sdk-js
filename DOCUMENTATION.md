# TS/JS SDK for Barchart OpenFeed

## Core Concepts

There are only two objects that you will need in order to work with OpenFeed: a connection client (represented by the `IOpenFeedClient` interface) and a listener.

The connecton client object will connect to the OpenFeed servers and maintain that connection until disposed. It can be used to send requests to subscribe to symbols and exchanges.

The listener object (represented by the `OpenFeedListeners` class) contains five callback delegates that you can wire to your own callback functions in order to process messages coming from the connection.

## The Listeners

The listener object, represented by the `OpenFeedListeners` class is dead-simple, just five variables, that point to functions that handle the connected, disconnected, credentials rejected and new message events sent from the connection client.

```ts
class OpenFeedListeners {
    public onConnected: (connection: IOpenFeedConnection) => void | Promise<void> = () => {};
    public onCredentialsRejected: () => void | Promise<void> = () => {};
    public onDisconnected: () => void | Promise<void> = () => {};
    public onMessage: (message: OpenfeedGatewayMessage) => void | Promise<void> = () => {};
    public onMessageWithMetadata: (
        message: OpenfeedGatewayMessage,
        symbolNames: string[],
        instrument?: InstrumentDefinition
    ) => void | Promise<void> = () => {};
}
```

Each of the delegates contained in the listeners is either a void or returns a Promise. This allows your callback functions to be asynchronous if needed.
Here is an example of how you might implement a super-simple listener that simply outputs what's happening to the console:

```ts
const listeners = new OpenFeedListeners();
listeners.onConnected = () => {
    console.log("Connected");
};
listeners.onDisconnected = () => {
    console.log("Disconnected");
};
listeners.onMessageWithMetadata = (msg, symbolNames, definition) => {
    console.log(`Symbols: ${symbolNames.join(",")}\r\nMessage: ${JSON.stringify(msg)}\r\n\r\nDefinition: ${JSON.stringify(definition)}`);
};
listeners.onCredentialsRejected = () => {
    console.log("Credentials Rejected");
};
```

The first callback we wired was `onConnected`. It simply outputs "Connected." to the console.

The `onDisconnected` callback is similar, it simply outputs "Disconnected.". This will let you know that the connection you might have saved when `onConnected` occurred is no longer valid.

The `onMessageWithMetadata` callback will be called when a new message is received from the OpenFeed servers. For this use-case we connect the message with the symbol definition and symbol names in the background. This wiring uses the `onMessage` callback that's listed above in the background. If you point the `onMessage` callback to a different function the `onMessageWithMetadata` callback will not be called.

The last callback we wired is `onCredentialsRejected`, which will be called if you attempt to connect with wrong credentials or there was a second login with the same credentials. This is a terminal state - if you receive this callbacks no other callbacks will be called and no other connection attempts will be made. The only sensible thing to do in this case is to dispose the connection client object and then create a new one with the correct credentials.

It is OK not to implement all these callbacks as they all have an existing null implementation.

### Asynchronous Handlers

Callbacks can also be implemented as asynchronous handlers. Say you want to print the message to the console after 2 seconds. The `onMessage` callback could then look like this:

```ts
function resolveAfter2Seconds() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("resolved");
        }, 2000);
    });
}
listeners.onMessage = async (msg) => {
    await resolveAfter2Seconds();
    console.log(JSON.stringify(msg));
};
```

## Connection Client

The connection client is represented by the `IOpenfeedClient` interface:

```ts
interface IOpenFeedClient {
    get connection(): Promise<IOpenfeedConnection>;

    subscribe: (
        service: Service,
        subscriptionType: SubscriptionType,
        symbols: string[] | null,
        marketIds: Long[] | null,
        exchanges: string[] | null,
        channels: number[] | null
    ) => Long;
    unsubscribe: (subscriptionId: Long) => void;
}
```

To create a new `IOpenFeedClient` object you can use the `OpenFeedClient` constructor:

```ts
const url = "wss://openfeed.aws.barchart.com/ws";
const username = "<username>";
const password = "<password>";
const client = new OpenFeedClient(url, username, password, listeners, logger);

// when done
client.dispose();
```

The first argument is the URL of the OpenFeed server, which is typically `"wss://openfeed.aws.barchart.com/ws"`. The second argument is the username, the third is the password, the fourth is the listeners object which we learned to set up in the previous section, and the fifth one is the logger you can optionally pass (you can just pass a `console` object to use it for displaying of your logs).

As soon as you create this object it will attempt to connect to the OpenFeed servers and issue the necessary callbacks to the listener.

When you are done with this object simply `dispose` it and it will disconnect and stop calling the callback listeners.

Once the object is created, you can simply subscribe to what you need and the listener's `onMessage` will be called with the received messages as they arrive. For example:

```ts
const id = client.subscribe(Service.REAL_TIME, SubscriptionType.ALL, 1, ["MSFT"]);

// when done
client.unsubscribe(id);
```

This subscribes to all message types from the real-time service, for MSFT. The number 1 represents a snapshot interval, but as in this case we are subscribing to real-time data and not periodic snapshots it's unused.

The call to Subscribe returns a subscription ID, which you can use to later unsubscribe by calling the `unsubscribe` function.

The available services are:

```ts
enum Service {
    UNKNOWN_SERVICE = 0,
    REAL_TIME = 1,
    DELAYED = 2,
    REAL_TIME_SNAPSHOT = 3,
    DELAYED_SNAPSHOT = 4,
    END_OF_DAY = 5,
}
```

The available subscription types are:

```ts
enum SubscriptionType {
    ALL = 0,
    QUOTE = 1,
    QUOTE_PARTICIPANT = 2,
    DEPTH_PRICE = 3,
    DEPTH_ORDER = 4,
    TRADES = 5,
    CUMLATIVE_VOLUME = 6,
    OHLC = 7,
    OHLC_NON_REGULAR = 8,
}
```

## Putting it all together

Now that we know how to use the listener and client objects, let's put together a little demo that subscribes to all MSFT messages and prints what's happening to the console:

```ts
import { OpenFeedClient } from "./connection/connection";

import { Service } from "../generated/openfeed";
import { SubscriptionType } from "../generated/openfeed_api";
import { OpenFeedListeners } from "./connection/listeners";
import { IOpenFeedLogger } from "./connection/connection_interfaces";

const connect = async () => {
    const logger: IOpenFeedLogger = console;
    logger.log("Starting...");
    const listeners = new OpenFeedListeners();
    listeners.onConnected = () => {
        logger.log("Connected");
    };
    listeners.onMessageWithMetadata = (msg, symbolNames, definition) => {
        logger.log(
            `Message -------\r\nSymbols: ${symbolNames.join(",")}\r\nMessage: ${JSON.stringify(msg)}\r\n\r\nDefinition: ${JSON.stringify(definition)}`
        );
    };
    listeners.onDisconnected = () => {
        logger.log("Disconnected");
    };
    listeners.onCredentialsRejected = () => {
        logger.log("Credentials Rejected");
    };

    const url = "wss://openfeed.aws.barchart.com/ws";
    const username = "<username>";
    const password = "<password>";
    const client = new OpenFeedClient(url, username, password, listeners, logger);
    const id = client.subscribe(Service.REAL_TIME, SubscriptionType.ALL, 1, ["MSFT"]);
    logger.log("Got the ID", id.toString());

    setTimeout(() => {
        logger.log("Unsubscribing...");
        try {
            client.unsubscribe(id);
        } catch (e) {
            logger.warn("Got the error when unsubscribing", e);
        }
    }, 10_000);

    setTimeout(() => {
        client.dispose();
    }, 15_000);
};

connect();
```

This program is a simple amalgamation of what we learned before. We first set up a listener and connect the callbacks that simply print everything that's happening to the console. We update the username and password with our credentials, and then finally we create a client, subscibe to all messages for the symbol MSFT, and dispose of the client after we have unsubscribed from the symbol feed.

## More Information

TBD
