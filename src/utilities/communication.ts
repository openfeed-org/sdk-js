import WebSocket from "isomorphic-ws";

import { OptionalUndefined, toT } from "@src/utilities/messages";
import type { OpenfeedGatewayMessage, OpenfeedGatewayRequest } from "@gen/openfeed_api";
import { OpenfeedGatewayMessageDecode, OpenfeedGatewayRequestEncode } from "@gen/openfeed_api";

export const send = (socket: WebSocket, message: OptionalUndefined<OpenfeedGatewayRequest>) => {
    socket.send(OpenfeedGatewayRequestEncode.encode(toT(message)).finish());
};

// eslint-disable-next-line no-bitwise
const getShort = (a: number, b: number) => (a << 8) | (b << 0);

export const receive = (msgEvent: WebSocket.MessageEvent): OpenfeedGatewayMessage[] => {
    const array = new Uint8Array(msgEvent.data as ArrayBuffer);
    let currentIndex = 0;
    const res: OpenfeedGatewayMessage[] = [];
    while (getShort(array[currentIndex], array[currentIndex + 1])) {
        const shortVal = getShort(array[currentIndex], array[currentIndex + 1]) + 2;
        const currentArray = array.subarray(currentIndex + 2, currentIndex + shortVal);
        currentIndex += shortVal;
        res.push(OpenfeedGatewayMessageDecode.decode(currentArray));
    }
    return res;
};
