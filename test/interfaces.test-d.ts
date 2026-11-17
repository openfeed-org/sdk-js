import { describe, expectTypeOf, it } from "vitest";
import type { OpenfeedRequest } from "@src/connection/interfaces";

describe("OpenfeedRequest", () => {
    it("takes exactly one kind of request", () => {
        expectTypeOf({ exchangeRequest: {} }).toExtend<OpenfeedRequest>();
        expectTypeOf({ instrumentRequest: { symbol: "ESZ26", instrumentType: [], spreadType: [], version: 1 } }).toExtend<OpenfeedRequest>();
    });

    it("refuses none, two at once, and a login", () => {
        // @ts-expect-error: no kind, which would be an empty message
        const none: OpenfeedRequest = {};
        // @ts-expect-error: two kinds, of which send would only send one
        const two: OpenfeedRequest = { exchangeRequest: {}, listSubscriptionsRequest: {} };
        // @ts-expect-error: a login isn't sent this way
        const login: OpenfeedRequest = { loginRequest: {} };
        expectTypeOf([none, two, login]).toBeArray();
    });
});
