declare type KeysOfType<T, SelectedType> = {
    [key in keyof T]: SelectedType extends T[key] ? key : never;
}[keyof T];
declare type Optional<T> = Partial<Pick<T, KeysOfType<T, undefined>>>;
declare type Required<T> = Omit<T, KeysOfType<T, undefined>>;
export declare type OptionalUndefined<T> = Optional<T> & Required<T>;
export declare const toT: <T>(obj: OptionalUndefined<T>) => T;
export {};
