import type { OpenfeedGatewayMessage } from "@gen/openfeed_api";

/** A message built from just the fields a test cares about */
export const asMessage = (fields: object) => fields as OpenfeedGatewayMessage;

/** The value, failing the test if it's missing */
export const defined = <T>(value: T | null | undefined): T => {
    if (value === null || value === undefined) {
        throw new Error("Expected a value");
    }
    return value;
};
