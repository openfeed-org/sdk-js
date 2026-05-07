import WebSocket from "isomorphic-ws";

import { OptionalUndefined, toT } from "@src/utilities/messages";
import type { OpenfeedGatewayMessage, OpenfeedGatewayRequest } from "@gen/openfeed_api";
import { OpenfeedGatewayMessageDecode, OpenfeedGatewayRequestEncode } from "@gen/openfeed_api";

export function encodeMessage(message: OpenfeedGatewayRequest): Uint8Array {
    return OpenfeedGatewayRequestEncode.encode(message).finish();
}

export function send(socket: WebSocket, message: OptionalUndefined<OpenfeedGatewayRequest>): void {
    socket.send(encodeMessage(toT(message)));
}

// eslint-disable-next-line no-bitwise
const getShort = (a: number, b: number) => (a << 8) | (b << 0);

export function* decodeMessages(bytes: Uint8Array): Iterable<OpenfeedGatewayMessage> {
    let currentIndex = 0;
    while (currentIndex < bytes.length) {
        const len = getShort(bytes[currentIndex], bytes[currentIndex + 1]);
        if (len === 0) break;

        const total = len + 2;
        const currentArray = bytes.subarray(currentIndex + 2, currentIndex + total);
        currentIndex += total;
        yield OpenfeedGatewayMessageDecode.decode(currentArray);
    }
}

export function receive(msgEvent: WebSocket.MessageEvent): OpenfeedGatewayMessage[] {
    return [...decodeMessages(new Uint8Array(msgEvent.data as ArrayBuffer))];
}