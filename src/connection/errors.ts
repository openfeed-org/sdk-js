import { Result } from "@gen/openfeed_api";

export class DuplicateLoginError extends Error {
    public get name() {
        return this.constructor.name;
    }
}

export class InvalidCredentialsError extends Error {
    public get name() {
        return this.constructor.name;
    }
}

/** An instrument lookup the server refused, or found nothing for. Code should decide on `result`. */
export class InstrumentLookupError extends Error {
    constructor(
        public readonly result: Result,
        public readonly serverMessage: string
    ) {
        const name = Result[result] as string | undefined;
        const failure = `${name ?? String(result)}: the instrument lookup failed.`;
        super(serverMessage ? `${failure} Server said: "${serverMessage}"` : failure);
    }

    public get name() {
        return this.constructor.name;
    }
}

export class ConnectionDisposedError extends Error {
    public get name() {
        return this.constructor.name;
    }
}
