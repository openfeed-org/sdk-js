import { OpenfeedGatewayMessage } from "@gen/openfeed_api";
import { InstrumentDefinition } from "@gen/openfeed_instrument";
import Long from "long";
import { IOpenFeedConnection } from "./connection_interfaces";

export class OpenFeedListeners {
    private readonly instrumentBySymbol: Map<string, InstrumentDefinition> = new Map<string, InstrumentDefinition>();
    private readonly instrumentByMarketId: Map<string, [InstrumentDefinition?, string[]?]> = new Map<string, [InstrumentDefinition?, string[]?]>();

    constructor() {
        this.onMessage = this.addDetails;
    }

    private addDetails = (message: OpenfeedGatewayMessage) => {
        let def: InstrumentDefinition | undefined;
        let symbols: string[] | undefined;

        const getInstrumentDefinition = (marketId: Long) => {
            const res = this.instrumentByMarketId.get(marketId.toString());

            return res ?? [undefined, undefined];
        };

        if (message.subscriptionResponse) {
            if (message.subscriptionResponse != null && message.subscriptionResponse.marketId !== Long.ZERO) {
                [def, symbols] = getInstrumentDefinition(message.subscriptionResponse.marketId);
                if (!symbols) {
                    symbols = [message.subscriptionResponse.symbol];
                } else if (!symbols.includes(message.subscriptionResponse.symbol)) {
                    symbols = [...symbols, message.subscriptionResponse.symbol];
                }
                this.instrumentByMarketId.set(message.subscriptionResponse.marketId.toString(), [def, symbols]);
            }
        }
        if (message.instrumentDefinition) {
            [def, symbols] = getInstrumentDefinition(message.instrumentDefinition.marketId);
            this.instrumentByMarketId.set(message.instrumentDefinition.marketId.toString(), [message.instrumentDefinition, symbols]);
            this.instrumentBySymbol.set(message.instrumentDefinition.symbol, message.instrumentDefinition);
        }
        if (message.marketSnapshot) {
            [def, symbols] = getInstrumentDefinition(message.marketSnapshot.marketId);
        }
        if (message.marketUpdate) {
            [def, symbols] = getInstrumentDefinition(message.marketUpdate.marketId);
        }
        if (message.ohlc) {
            [def, symbols] = getInstrumentDefinition(message.ohlc.marketId);
        }

        return this.onMessageWithMetadata(message, symbols ?? [], def);
    };

    /* eslint-disable class-methods-use-this */
    public onConnected: (connection: IOpenFeedConnection) => void | Promise<void> = () => {};
    public onCredentialsRejected: () => void | Promise<void> = () => {};
    public onDisconnected: () => void | Promise<void> = () => {};
    public onMessage: (message: OpenfeedGatewayMessage) => void | Promise<void> = () => {};
    public onMessageWithMetadata: (
        message: OpenfeedGatewayMessage,
        symbolNames: string[],
        instrument?: InstrumentDefinition
    ) => void | Promise<void> = () => {};
    /* eslint-enable class-methods-use-this */
}
