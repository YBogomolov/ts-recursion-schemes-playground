import { flow } from 'fp-ts/lib/function';
import { Functor, Functor1, Functor2, Functor3 } from 'fp-ts/lib/Functor';
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from 'fp-ts/lib/HKT';

import { Coalgebra } from '../types/algebras';
import { Fix, fix } from '../types/fix';

// tslint:disable:max-line-length
/** anamorphism - builds up a structure level by level */
export function ana<F extends URIS3>(F: Functor3<F>): <U, L, A>(coalgebra: (a: A) => Kind3<F, U, L, A>) => (a: A) => Fix<F>;
export function ana<F extends URIS2>(F: Functor2<F>): <L, A>(coalgebra: (a: A) => Kind2<F, L, A>) => (a: A) => Fix<F>;
export function ana<F extends URIS>(F: Functor1<F>): <A>(coalgebra: (a: A) => Kind<F, A>) => (a: A) => Fix<F>;
export function ana<F>(F: Functor<F>): <A>(coalgebra: Coalgebra<F, A>) => (a: A) => Fix<F>;
export function ana<F>(F: Functor<F>): <A>(coalgebra: Coalgebra<F, A>) => (a: A) => Fix<F> {
  return (coalgebra) => flow(coalgebra, (x) => F.map(x, ana(F)(coalgebra)), fix);
}
