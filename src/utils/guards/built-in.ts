import type ASOD from '../../index';

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isSymbol = (value: unknown): value is symbol => typeof value === 'symbol';

export const isNumber = (value: unknown): value is number => typeof value === 'number';

export const isBigint = (value: unknown): value is bigint => typeof value === 'bigint';

export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

export const isNull = (value: unknown): value is null => value === null;

export const isUndefined = (value: unknown): value is undefined => typeof value === 'undefined';

export const isFunction = (value: unknown): value is Function => typeof value === 'function';

export const isObject = <TValue = unknown>(value: unknown): value is ASOD.IObject<TValue> => typeof value === 'object' && !isNull(value);

export const isArray = <TItem = unknown>(value: unknown, predicate?: (item: unknown) => item is TItem): value is TItem[] =>
  Array.isArray(value) && (!predicate || value.every(predicate));

export const isTruthy = <TValue = unknown>(value: TValue): value is TValue extends ASOD.Primitive ? Extract<TValue, ASOD.TruthyPrimitive> : TValue =>
  !!value;

export const isFalsy = <TValue = unknown>(value: unknown): value is TValue extends ASOD.Primitive ? Extract<TValue, ASOD.FalsyPrimitive> : never =>
  !value;

export const isPrimitive = (value: unknown): value is ASOD.Primitive =>
  isString(value) || isNumber(value) || isBigint(value) || isBoolean(value) || isSymbol(value) || isNull(value) || isUndefined(value);
