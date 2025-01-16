import Long from "long";

export class CorrelationId {
    private static correlationId = Long.fromNumber(-1);

    public static create = () => {
        this.correlationId = this.correlationId.add(1);
        return this.correlationId;
    };
}
