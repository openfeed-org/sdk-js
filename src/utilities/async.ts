/**
 * Class that provides promise that can be resolved using a handler
 */
export class ResolutionSource<T> {
    private readonly _whenCompleted: Promise<T>;
    private _resolve: ((result: T) => void) | null = null;
    private _reject: ((error: Error) => void) | null = null;
    private _completed = false;

    constructor() {
        this._whenCompleted = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }

    private onResolve = (result: T) => {
        this._completed = true;
        this._resolve?.(result);
    };

    private onError = (error: Error) => {
        this._completed = true;
        this._reject?.(error);
    };

    public get completed() {
        return this._completed;
    }
    public get whenCompleted() {
        return this._whenCompleted;
    }
    public get resolve() {
        return this.onResolve;
    }
    public get reject() {
        return this.onError;
    }
}
