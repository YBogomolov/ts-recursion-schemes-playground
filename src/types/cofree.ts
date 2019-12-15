import { Lazy } from 'fp-ts/lib/function';
import { HKT, Kind, URIS } from 'fp-ts/lib/HKT';

/**
 * Cofree – a stream/tree-like structure consisting of a concrete value of type `A` and
 * further computations of type `F<Cofree<F<A>>>`.
 *
 * Value of type `A` is usually called `attribute`,
 * and next computations are called `hole`.
 */
export class Cofree<F, A> {
  // Normally in Cofree you would want something like `Eval` monad.
  // @see https://typelevel.org/cats/datatypes/eval.html for details
  // Port of `Eval` to TypeScript is quite straightforward, but rather lengthy, so for brewity I'll leave `Lazy` here:
  constructor(readonly attribute: A, readonly rest: Lazy<HKT<F, Cofree<F, A>>>) { }
}

// Constuctor
export const cofree = <F, A>(a: A, h: Lazy<HKT<F, Cofree<F, A>>>) => new Cofree(a, h);

// Extract attribute from the cofree structure
export const attr = <F, A>(c: Cofree<F, A>): A => c.attribute;

// Exctract hole from the cofree structure
export function hole<F extends URIS, A>(c: Cofree<F, A>): Kind<F, Cofree<F, A>>;
export function hole<F, A>(c: Cofree<F, A>): HKT<F, Cofree<F, A>> {
  return c.rest();
}
