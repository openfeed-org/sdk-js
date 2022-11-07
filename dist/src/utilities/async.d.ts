/**
 * Class that provides promise that can be resolved using a handler
 */
export declare class ResolutionSource<T> {
    private readonly _whenCompleted;
    private _resolve;
    private _reject;
    private _completed;
    constructor();
    private onResolve;
    private onError;
    get completed(): boolean;
    get whenCompleted(): Promise<T>;
    get resolve(): (result: T) => void;
    get reject(): (error: Error) => void;
}
