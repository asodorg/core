declare namespace ASOD {
  type FalsyPrimitive = boolean | number | bigint | string | null | undefined;
  type TruthyPrimitive = boolean | number | bigint | string | symbol;
  type Primitive = FalsyPrimitive | TruthyPrimitive;

  interface IObject<TValue = any> {
    [key: string]: TValue;
    [key: symbol]: TValue;
    [key: number]: TValue;
  }

  interface IComparable<TComparedValue = unknown> extends IObject {
    compare?(value: TComparedValue): number;
  }

  interface IFalsy<TFalsyValue = unknown> extends IObject {
    isFalsy?(): boolean;
    toFalsy?(): TFalsyValue;
  }

  interface INeutral<TNeutralValue = unknown> extends IObject {
    isNeutral?(): boolean;
    toNeutral?(): TNeutralValue;
  }

  interface IIdentifiable<TIdentityValue = unknown> extends IObject {
    isIdentity?(): boolean;
    toIdentity?(): TIdentityValue;
  }

  interface IInversive<TInvertedValue = unknown> extends IObject {
    inverse?(): TInvertedValue;
  }

  interface IOpposite<TOpposedValue = unknown> extends IObject {
    oppose?(): TOpposedValue;
  }

  interface IOperand<
    TValue = unknown,
    TFalsyValue = TValue,
    TNeutralValue = TValue,
    TIdentityValue = TValue,
    TInvertedValue = TValue,
    TOpposedValue = TValue,
    TComparedValue = TValue,
  > extends IFalsy<TFalsyValue>,
      INeutral<TNeutralValue>,
      IIdentifiable<TIdentityValue>,
      IInversive<TInvertedValue>,
      IOpposite<TOpposedValue>,
      IComparable<TComparedValue> {}

  type Operand<
    TValue = unknown,
    TNeutralValue = TValue,
    TIdentityValue = TValue,
    TInvertedValue = TValue,
    TOpposedValue = TValue,
    TComparedValue = TValue,
  > = Primitive | IOperand<TValue, TNeutralValue, TIdentityValue, TInvertedValue, TOpposedValue, TComparedValue>;

  /**
   * @def `(∀ i ∈ N: ∀ a[i], b ∈ F)`: `a[i] ∘ a[i + 1] ∘ … = b`
   */
  interface IOperation<TOperands extends Operand<any>[] = Operand[], TResult = TOperands extends Array<infer _Operand> ? _Operand : unknown> {
    (...values: [...TOperands]): TResult;
  }

  /**
   * @def `(∀ a, b, c ∈ F)`: `a ∘ b = c`
   */
  interface IBinaryOperation<
    TLeftOperand extends Operand<any> = Operand,
    TRightOperand extends Operand<any> = TLeftOperand,
    TResult = TLeftOperand | TRightOperand,
  > extends IOperation<[TLeftOperand, TRightOperand], TResult> {
    (left: TLeftOperand, right: TRightOperand): TResult;
  }

  /**
   * @def `(∀ a, b ∈ F)`: `a ∘ b = b ∘ a`
   */
  interface ICommutativeOperation<
    TLeftOperand extends Operand<any> = Operand,
    TRightOperand extends Operand<any> = TLeftOperand,
    TResult = TLeftOperand | TRightOperand,
  > extends IBinaryOperation<TLeftOperand, TRightOperand, TResult> {}

  /**
   * @def `(∀ a, b, 𝑒 ∈ F)`: `a ∘ b =  𝑒 - (b ∘ a)`
   */
  interface IAnticommutativeOperation<
    TLeftOperand extends Operand<any> = Operand,
    TRightOperand extends Operand<any> = TLeftOperand,
    TResult = TLeftOperand | TRightOperand,
  > extends IBinaryOperation<TLeftOperand, TRightOperand, TResult> {}

  /**
   * @def `(∀ a, b, c ∈ F)`: `(a ∘ b) ∘ c = a ∘ (b ∘ c)`
   */
  interface IAssociativeOperation<
    TLeftOperand extends Operand<any> = Operand,
    TRightOperand extends Operand<any> = TLeftOperand,
    TResult = TLeftOperand | TRightOperand,
  > extends IBinaryOperation<TLeftOperand, TRightOperand, TResult> {}

  /**
   * @def `(∀ a, b, c ∈ F)`: `(a ∘ b) * c = (a * c) ∘ (b * c)`
   */
  interface IDistributiveOperation<
    TLeftOperand extends Operand<any> = Operand,
    TRightOperand extends Operand<any> = TLeftOperand,
    TResult = TLeftOperand | TRightOperand,
  > extends IBinaryOperation<TLeftOperand, TRightOperand, TResult> {}

  /**
   * @def `(∀ a ∈ F)`: `a ∘ a = a`
   */
  interface IIdempotentOperation<
    TLeftOperand extends Operand<any> = Operand,
    TRightOperand extends Operand<any> = TLeftOperand,
    TResult = TLeftOperand | TRightOperand,
  > extends IBinaryOperation<TLeftOperand, TRightOperand, TResult> {}
}

export = ASOD;
export as namespace ASOD;
