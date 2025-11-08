declare namespace ASOD {
  type Primitive =
    | string
    | number
    | bigint
    | boolean
    | symbol
    | null
    | undefined;

  type ObjectKey = string | symbol | number;
  type Object<TValue = any> = Record<ObjectKey, TValue>;
}

export = ASOD;
export as namespace ASOD;
