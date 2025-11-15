import type ASOD from '../../index';
import { isObject, isFunction, isNumber, isBigint, isString, isFalsy } from './built-in';

type ExtractOperand<TValue, TOperand> = TValue extends TOperand ? TValue : Extract<TValue, TOperand>;

type FalsyOperand<TValue> = ExtractOperand<TValue, ASOD.FalsyPrimitive | ASOD.IFalsy>;

type NeutralOperand<TValue> = ExtractOperand<TValue, number | bigint | string | ASOD.INeutral>;

type IdentityOperand<TValue> = ExtractOperand<TValue, number | bigint | ASOD.IIdentifiable>;

export const isComparableOperand = (value: unknown): value is ASOD.IComparable => {
  return isObject(value) && 'compare' in value && isFunction(value.compare) && value.compare.length > 0;
};

export const isFalsyOperand = <TValue = unknown>(value: TValue): value is FalsyOperand<TValue> => {
  return isFalsy(value) || (isObject(value) && isFunction(value.isFalsy) && !!value.isFalsy());
};

export const isNeutralOperand = <TValue = unknown>(value: TValue): value is NeutralOperand<TValue> => {
  if (isNumber(value)) return value === 0;
  if (isBigint(value)) return value === 0n;
  if (isString(value)) return value === '';
  if (isObject(value) && isFunction(value.isNeutral)) return !!value.isNeutral();
  return false;
};

export const isIdentityOperand = <TValue = unknown>(value: TValue): value is IdentityOperand<TValue> => {
  if (isNumber(value)) return value === 1;
  if (isBigint(value)) return value === 1n;
  if (isObject(value) && isFunction(value.isIdentity)) return !!value.isIdentity();
  return false;
};
