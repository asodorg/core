/// <reference path="global.d.ts" />

declare namespace ASOD {
  type Primitive =
    | string
    | number
    | bigint
    | boolean
    | symbol
    | null
    | undefined;
}

export = ASOD;
export as namespace ASOD;
