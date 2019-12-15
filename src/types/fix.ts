import { HKT } from 'fp-ts/lib/HKT';

/**
 * Fixpoint of type `F`
 * @see https://en.wikibooks.org/wiki/Haskell/Fix_and_recursion for more details
 */
export class Fix<F> {
  constructor(public readonly value: HKT<F, Fix<F>>) { }
}

export const fix = <F>(value: HKT<F, Fix<F>>): Fix<F> => new Fix(value);
export const unfix = <F>(term: Fix<F>): HKT<F, Fix<F>> => term.value;
