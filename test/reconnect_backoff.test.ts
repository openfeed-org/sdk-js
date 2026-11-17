import { describe, it, expect, vi, afterEach } from "vitest";
import { ReconnectBackoff } from "@src/utilities/reconnect_backoff";
import { TIME } from "@src/utilities/constants";

describe("ReconnectBackoff", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    const delays = (backoff: ReconnectBackoff, count: number) => Array.from({ length: count }, () => backoff.nextDelay());

    it("doubles the delay up to the maximum, waiting in its upper half", () => {
        const backoff = new ReconnectBackoff();

        vi.spyOn(Math, "random").mockReturnValue(0);
        expect(delays(backoff, 5)).toEqual([5_000, 10_000, 20_000, 30_000, 30_000]);

        backoff.reset();
        vi.spyOn(Math, "random").mockReturnValue(0.999_999);
        expect(delays(backoff, 5)).toEqual([9_999, 19_999, 39_999, 59_999, 59_999]);
    });

    it("never goes past the maximum", () => {
        const backoff = new ReconnectBackoff();
        for (const delay of delays(backoff, 100)) {
            expect(delay).toBeGreaterThanOrEqual(TIME.RECONNECT);
            expect(delay).toBeLessThan(TIME.RECONNECT_MAX);
        }
    });

    it("starts again from the shortest wait once reset", () => {
        const backoff = new ReconnectBackoff();
        vi.spyOn(Math, "random").mockReturnValue(0);
        delays(backoff, 4);

        backoff.reset();
        expect(backoff.nextDelay()).toBe(TIME.RECONNECT);
    });
});
