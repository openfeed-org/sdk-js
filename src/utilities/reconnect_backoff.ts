import { TIME } from "./constants";

/**
 * Exponential backoff with jitter for reconnects, as in `sdk-net`: each attempt doubles the delay, up to the maximum, and
 * waits a random time in its upper half, so clients dropped together don't all come back at once.
 */
export class ReconnectBackoff {
    private delay = TIME.RECONNECT;

    /** The next wait: 5-10s, then 10-20s, 20-40s, and 30-60s from then on, until reset. */
    public nextDelay = () => {
        this.delay = Math.min(this.delay * 2, TIME.RECONNECT_MAX);
        const half = this.delay / 2;
        return half + Math.floor(Math.random() * half);
    };

    /** Called once logged in, so the next disconnect starts again from the shortest wait. */
    public reset = () => {
        this.delay = TIME.RECONNECT;
    };
}
