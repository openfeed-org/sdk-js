import WebSocket from "isomorphic-ws";

import { OptionalUndefined, toT } from "@src/utilities/messages";
import {
    type OpenfeedGatewayMessage,
    type OpenfeedGatewayRequest,
    OpenfeedGatewayMessageDecode,
    OpenfeedGatewayRequestDecode,
    OpenfeedGatewayRequestEncode,
    OpenfeedGatewayMessageEncode,
} from "@gen/openfeed_api";
import { BinaryWriter } from "@bufbuild/protobuf/wire";

// Every message on the wire is prefixed with its length as a big-endian 16-bit integer
const LENGTH_PREFIX_SIZE = 2;

export const encodeMessage = (message: OpenfeedGatewayRequest): Uint8Array => OpenfeedGatewayRequestEncode.encode(message).finish();

export const decodeRequestMessage = (bytes: Uint8Array): OpenfeedGatewayRequest => OpenfeedGatewayRequestDecode.decode(bytes);

const lengthPrefixPlaceholder = new Uint8Array(LENGTH_PREFIX_SIZE);

export const encodeResponseMessage = (message: OpenfeedGatewayMessage): Uint8Array => {
    const bw = new BinaryWriter();
    bw.raw(lengthPrefixPlaceholder);
    OpenfeedGatewayMessageEncode.encode(message, bw);
    const ret = bw.finish();
    const len = ret.length - LENGTH_PREFIX_SIZE;
    ret[0] = len >> 8;
    ret[1] = len & 0xff;
    return ret;
};

export const send = (socket: WebSocket, message: OptionalUndefined<OpenfeedGatewayRequest>): void => {
    socket.send(encodeMessage(toT(message)));
};

const readLength = (high: number, low: number) => (high << 8) | low;

export const decodeMessages = function* decodeMessages(bytes: Uint8Array): Iterable<OpenfeedGatewayMessage> {
    let currentIndex = 0;
    while (currentIndex < bytes.length) {
        const len = readLength(bytes[currentIndex], bytes[currentIndex + 1]);
        if (len === 0) {
            break;
        }

        const total = len + LENGTH_PREFIX_SIZE;
        const currentArray = bytes.subarray(currentIndex + LENGTH_PREFIX_SIZE, currentIndex + total);
        currentIndex += total;
        yield OpenfeedGatewayMessageDecode.decode(currentArray);
    }
};

export const receive = (msgEvent: WebSocket.MessageEvent): OpenfeedGatewayMessage[] => [
    ...decodeMessages(new Uint8Array(msgEvent.data as ArrayBuffer)),
];
