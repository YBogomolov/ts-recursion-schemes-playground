// tslint:disable:max-line-length
import { Functor, Functor1, Functor2, Functor3 } from 'fp-ts/lib/Functor';
import { Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from 'fp-ts/lib/HKT';

import { Algebra } from '../types/algebras';
import { Fix, unfix } from '../types/fix';

/** catamorphism - tears down a structure level by level */
export function cata<F extends URIS3>(F: Functor3<F>, ): <U, L, A>(algebra: (fa: Kind3<F, U, L, A>) => A) => (term: Fix<F>) => A;
export function cata<F extends URIS2>(F: Functor2<F>): <L, A>(algebra: (fa: Kind2<F, L, A>) => A) => (term: Fix<F>) => A;
export function cata<F extends URIS>(F: Functor1<F>): <A>(algebra: (fa: Kind<F, A>) => A) => (term: Fix<F>) => A;
export function cata<F>(F: Functor<F>): <A>(algebra: Algebra<F, A>) => (term: Fix<F>) => A;
export function cata<F>(F: Functor<F>): <A>(algebra: Algebra<F, A>) => (term: Fix<F>) => A {
  return <A>(algebra: Algebra<F, A>) =>
    function self(term): A {
      return algebra(F.map(unfix(term), self));
    };
}
