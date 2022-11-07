import { OpenfeedGatewayMessage } from "@gen/openfeed_api";
import { InstrumentDefinition } from "@gen/openfeed_instrument";
import { IOpenFeedConnection } from "./connection_interfaces";
export declare class OpenFeedListeners {
    private readonly instrumentBySymbol;
    private readonly instrumentByMarketId;
    constructor();
    private addDetails;
    onConnected: (connection: IOpenFeedConnection) => void | Promise<void>;
    onCredentialsRejected: () => void | Promise<void>;
    onDisconnected: () => void | Promise<void>;
    onMessage: (message: OpenfeedGatewayMessage) => void | Promise<void>;
    onMessageWithMetadata: (message: OpenfeedGatewayMessage, symbolNames: string[], instrument?: InstrumentDefinition) => void | Promise<void>;
}
