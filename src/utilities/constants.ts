export const TIME = {
    // reconnects back off exponentially from this, see ReconnectBackoff
    RECONNECT: 5_000,
    RECONNECT_MAX: 60_000,
    // fixed, as in sdk-net: the backoff already spreads the reconnects out
    CONNECTION_TIMEOUT: 20_000,
    SUBSCRIPTION_RETRY: 100,
};
