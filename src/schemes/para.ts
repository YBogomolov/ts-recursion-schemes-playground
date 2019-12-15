// tslint:disable:max-line-length
import { flow } from 'fp-ts/lib/function';
import { Functor, Functor1, Functor2, Functor3 } from 'fp-ts/lib/Functor';
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from 'fp-ts/lib/HKT';

import { RAlgebra } from '../types/algebras';
import { Fix, unfix } from '../types/fix';

/** paramorphism - tears down a structure with primitive recursion */
export function para<F extends URIS3>(F: Functor3<F>): <U, L, A>(ralgebra: (t: Kind3<F, U, L, [Fix<F>, A]>) => A) => (term: Fix<F>) => A;
export function para<F extends URIS2>(F: Functor2<F>): <L, A>(ralgebra: (t: Kind2<F, L, [Fix<F>, A]>) => A) => (term: Fix<F>) => A;
export function para<F extends URIS>(F: Functor1<F>): <A>(ralgebra: (t: Kind<F, [Fix<F>, A]>) => A) => (term: Fix<F>) => A;
export function para<F>(F: Functor<F>): <A>(ralgebra: RAlgebra<F, A>) => (term: Fix<F>) => A;
export function para<F>(F: Functor<F>): <A>(ralgebra: RAlgebra<F, A>) => (term: Fix<F>) => A {
  return <A>(ralgebra: RAlgebra<F, A>) => {
    function fanout(term: Fix<F>): [Fix<F>, A] {
      return [term, para(F)(ralgebra)(term)];
    }
    return flow(unfix, (x) => F.map(x, fanout), ralgebra);
  };
}
