import { OpenfeedGatewayMessage } from "@gen/openfeed_api";
import { InstrumentDefinition } from "@gen/openfeed_instrument";
import Long from "long";
import { ActionType, HeartBeat } from "@gen/openfeed";
import { IOpenFeedConnection } from "./interfaces";

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
            const { marketId, symbol, unsubscribe } = message.subscriptionResponse;
            if (marketId !== Long.ZERO) {
                [def, symbols] = getInstrumentDefinition(marketId);
                if (!unsubscribe) {
                    if (!symbols) {
                        symbols = [symbol];
                    } else if (!symbols.includes(symbol)) {
                        symbols = [...symbols, symbol];
                    }
                } else {
                    if (symbols) {
                        symbols = symbols.filter((s) => s !== symbol);
                    }
                    if (!symbols) {
                        this.instrumentByMarketId.delete(marketId.toString());
                    }
                    this.instrumentBySymbol.delete(symbol);
                }
                this.instrumentByMarketId.set(marketId.toString(), [def, symbols]);
            }
        } else if (message.instrumentDefinition) {
            [def, symbols] = getInstrumentDefinition(message.instrumentDefinition.marketId);
            const { instrumentDefinition } = message;
            this.instrumentByMarketId.set(message.instrumentDefinition.marketId.toString(), [message.instrumentDefinition, symbols]);
            this.instrumentBySymbol.set(message.instrumentDefinition.symbol, instrumentDefinition);
            symbols?.forEach((s) => this.instrumentBySymbol.set(s, instrumentDefinition));
        } else if (message.instrumentAction) {
            const { marketId } = message.instrumentAction?.instrument ?? {};
            if (message.instrumentAction.action === ActionType.ALIAS_CHANGED && marketId) {
                const { oldAlias } = message.instrumentAction;
                const [root, num] = oldAlias.split("*");
                const newAliasNum = oldAlias.endsWith("*0") ? 0 : Number.parseInt(num, 10) + 1;
                const newAlias = `${root}*${newAliasNum}`;
                // remove the old symbol in the source
                [def, symbols] = getInstrumentDefinition(marketId);
                const newSymbols = symbols?.filter((s) => s !== oldAlias) ?? [];
                if (!newSymbols.length) {
                    this.instrumentByMarketId.delete(marketId.toString());
                } else {
                    this.instrumentByMarketId.set(marketId.toString(), [def, newSymbols]);
                }

                const { marketId: newMarketId } = message.instrumentAction.newInstrument ?? {};
                // remove new alias from the destination, unless it's *0
                if (newMarketId) {
                    const [newDef, newSym] = getInstrumentDefinition(newMarketId);
                    const newSymbolsFiltered = (newAlias === oldAlias ? newSym : newSym?.filter((s) => s !== newAlias)) ?? [];
                    if (!newSymbolsFiltered.length) {
                        this.instrumentByMarketId.delete(newMarketId.toString());
                    } else {
                        this.instrumentByMarketId.set(newMarketId.toString(), [newDef, newSymbolsFiltered]);
                    }
                }
            }
            // In the event of exchange move, we just remove the instrument subscription and let the subscription response do the rest
            if (message.instrumentAction.action === ActionType.EXCHANGE_MOVE && marketId) {
                [def, symbols] = getInstrumentDefinition(marketId);
                this.instrumentByMarketId.delete(marketId.toString());
                const newMarketId = message.instrumentAction.newInstrument?.marketId?.toString();
                if (newMarketId) {
                    this.instrumentByMarketId.set(newMarketId, [def, symbols]);
                }
            }
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
    public onHeartBeat: (heartBeat: HeartBeat) => void | Promise<void> = () => {};
    /* eslint-enable class-methods-use-this */
}
