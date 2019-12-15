// tslint:disable:max-classes-per-file
// tslint:disable:variable-name
// tslint:disable:no-any

import { unsafeCoerce } from 'fp-ts/lib/function';
import { Functor1 } from 'fp-ts/lib/Functor';

import { Fix, fix } from './fix';

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    Nat: NatF<A>;
  }
}

export const URI = 'Nat';
export type URI = typeof URI;

class Zero<A> {
  static value = new Zero<any>();
  public value!: never;
  readonly _tag: 'Zero' = 'Zero';
  readonly '_A'!: A;
  readonly '_URI'!: URI;
  private constructor() { }
}

class Succ<A> {
  readonly _tag: 'Succ' = 'Succ';
  readonly '_A'!: A;
  readonly '_URI'!: URI;
  constructor(public value: A) { }
}

/**
 * Peano-encoded natural numbers: either Zero or a number next to a natural number (Succ)
 */
export type NatF<A> = Zero<A> | Succ<A>;

export type Nat = Fix<URI>;

// Constructors

export const zero = fix(Zero.value);
export const succ = (n: Nat): Nat => fix(new Succ(n));

// Functor instance

export const map = <A, B>(nat: NatF<A>, f: (a: A) => B): NatF<B> => {
  switch (nat._tag) {
    case 'Zero': return unsafeCoerce(nat);
    case 'Succ': return new Succ(f(nat.value));
  }
};

export const functorNat: Functor1<URI> = {
  URI,
  map,
};
