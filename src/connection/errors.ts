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

export class ConnectionDisposedError extends Error {
    public get name() {
        return this.constructor.name;
    }
}
