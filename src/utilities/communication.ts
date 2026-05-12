import WebSocket from "isomorphic-ws";

import { OptionalUndefined, toT } from "@src/utilities/messages";
import type { OpenfeedGatewayMessage, OpenfeedGatewayRequest } from "@gen/openfeed_api";
import { OpenfeedGatewayMessageDecode, OpenfeedGatewayRequestDecode, OpenfeedGatewayRequestEncode, OpenfeedGatewayMessageEncode } from "@gen/openfeed_api";
import { BinaryWriter } from "@bufbuild/protobuf/wire";

export function encodeMessage(message: OpenfeedGatewayRequest): Uint8Array {
    return OpenfeedGatewayRequestEncode.encode(message).finish();
}

export function decodeRequestMessage(bytes: Uint8Array): OpenfeedGatewayRequest {
    return OpenfeedGatewayRequestDecode.decode(bytes);
}

const bytes = new Uint8Array(2);
bytes[0] = 0;
bytes[1] = 0;

export function encodeResponseMessage(message: OpenfeedGatewayMessage): Uint8Array {
    const bw = new BinaryWriter();
    bw.raw(bytes);
    OpenfeedGatewayMessageEncode.encode(message, bw);
    const ret = bw.finish();
    const len = ret.length - 2;
    ret[0] = len >> 8;
    ret[1] = len & 0xff;
    return ret;
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