// tslint:disable:max-classes-per-file
// tslint:disable:variable-name

import { unsafeCoerce } from 'fp-ts/lib/function';
import { Functor1 } from 'fp-ts/lib/Functor';

import { Fix, fix } from './fix';

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    Expr: ExprF<A>;
  }
}

export const URI = 'Expr';
export type URI = typeof URI;

export class Const<A> {
  readonly _tag: 'Const' = 'Const';
  readonly '_A'!: A;
  readonly '_URI'!: URI;
  constructor(public value: number) { }
}

export class Add<A> {
  readonly _tag: 'Add' = 'Add';
  readonly '_A'!: A;
  readonly '_URI'!: URI;
  constructor(public x: A, public y: A) { }
}

export class Mul<A> {
  readonly _tag: 'Mul' = 'Mul';
  readonly '_A'!: A;
  readonly '_URI'!: URI;
  constructor(public x: A, public y: A) { }
}

// Simple arithmetic expression, consisting of constants, additions or multiplications
export type ExprF<A> = Const<A> | Add<A> | Mul<A>;

export type Expr = Fix<URI>;

// Constructors

export function const_(n: number): Expr {
  return fix<URI>(new Const(n));
}

export function add(x: Expr, y: Expr): Expr {
  return fix(new Add(x, y));
}

export function mul(x: Expr, y: Expr): Expr {
  return fix(new Mul(x, y));
}

// Functor instance

export const map = <A, B>(expr: ExprF<A>, f: (a: A) => B): ExprF<B> => {
  switch (expr._tag) {
    case 'Const': return unsafeCoerce(expr);
    case 'Add': return new Add(f(expr.x), f(expr.y));
    case 'Mul': return new Mul(f(expr.x), f(expr.y));
  }
};

export const functorExpr: Functor1<URI> = {
  URI,
  map,
};
