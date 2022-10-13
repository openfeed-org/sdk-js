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
    const username = "";
    const password = "";
    const client = new OpenFeedClient(url, username, password, listeners, logger);
    const id = client.subscribe(Service.REAL_TIME, SubscriptionType.ALL, 1, ["MSFT"]);
    logger.log("Got the ID", id.toString());

    setTimeout(async () => {
        try {
            const connection = await client.connection;
            try {
                const exch = await connection.getExchanges();
                logger.log(`Got the Exchanges: ${JSON.stringify(exch)}`);
            } catch (e) {
                logger.error("Got the error for Exchanges:", e);
            }
            try {
                const instrument = await connection.getInstrument({
                    symbol: "MSFT",
                });
                logger.log(`Got the Instrument: ${JSON.stringify(instrument)}`);
            } catch (e) {
                logger.error("Got the error for the Instrument:", e);
            }
            try {
                const reference = await connection.getInstrument({
                    symbol: "MSFT",
                });
                logger.log(`Got the Instrument Reference: ${JSON.stringify(reference)}`);
            } catch (e) {
                logger.error("Got the error for the Instrument Reference:", e);
            }
        } catch (e) {
            logger.error("Got the connection error", e);
        }
    }, 20_000);

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
    }, 25_000);
};

connect();
