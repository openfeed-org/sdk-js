import { OpenfeedGatewayMessage } from "@gen/openfeed_api";
import { InstrumentDefinition } from "@gen/openfeed_instrument";
import Long from "long";
import { IOpenFeedConnection } from "./connection_interfaces";

const IDGetters: ((msg: OpenfeedGatewayMessage) => Long | undefined)[] = [
    (msg) => msg.marketSnapshot?.marketId,
    (msg) => msg.marketUpdate?.marketId,
    (msg) => msg.ohlc?.marketId,
    (msg) => msg.volumeAtPrice?.marketId,
];
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
        } else if (message.instrumentDefinition) {
            [def, symbols] = getInstrumentDefinition(message.instrumentDefinition.marketId);
            this.instrumentByMarketId.set(message.instrumentDefinition.marketId.toString(), [message.instrumentDefinition, symbols]);
            this.instrumentBySymbol.set(message.instrumentDefinition.symbol, message.instrumentDefinition);
        } else if (message.instrumentAction) {
            // TODO
        } else {
            for (const getter of IDGetters) {
                const id = getter(message);
                if (id !== undefined) {
                    [def, symbols] = getInstrumentDefinition(id);
                    break;
                }
            }
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
