import Long from "long";

let lastCorrelationId = Long.fromNumber(-1);

export const CorrelationId = {
    create: (): Long => {
        lastCorrelationId = lastCorrelationId.add(1);
        return lastCorrelationId;
    },
};
