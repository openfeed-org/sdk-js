type KeysOfType<T, SelectedType> = {
    [key in keyof T]: SelectedType extends T[key] ? key : never;
}[keyof T];

type Optional<T> = Partial<Pick<T, KeysOfType<T, undefined>>>;

type Required<T> = Omit<T, KeysOfType<T, undefined>>;

export type OptionalUndefined<T> = Optional<T> & Required<T>;

export const toT = <T>(obj: OptionalUndefined<T>) => obj as T;
