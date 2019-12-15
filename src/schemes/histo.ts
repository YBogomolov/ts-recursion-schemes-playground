// tslint:disable:max-line-length
import { Functor, Functor1, Functor2, Functor3 } from 'fp-ts/lib/Functor';
import { Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from 'fp-ts/lib/HKT';

import { CVAlgebra } from '../types/algebras';
import { attr, Cofree, cofree } from '../types/cofree';
import { Fix, unfix } from '../types/fix';

export function histo<F extends URIS3>(F: Functor3<F>): <U, L, A>(algebra: (fa: Kind3<F, U, L, Cofree<F, A>>) => A) => (term: Fix<F>) => A;
export function histo<F extends URIS2>(F: Functor2<F>): <L, A>(algebra: (fa: Kind2<F, L, Cofree<F, A>>) => A) => (term: Fix<F>) => A;
export function histo<F extends URIS>(F: Functor1<F>): <A>(algebra: (fa: Kind<F, Cofree<F, A>>) => A) => (term: Fix<F>) => A;
export function histo<F>(F: Functor<F>): <A>(algebra: CVAlgebra<F, A>) => (term: Fix<F>) => A;
export function histo<F>(F: Functor<F>): <A>(algebra: CVAlgebra<F, A>) => (term: Fix<F>) => A {
  return <A>(algebra: CVAlgebra<F, A>) => {
    return function self(term): A {
      const worker = (t: Fix<F>): Cofree<F, A> => {
        const calc = F.map(unfix(t), worker);
        return cofree(algebra(calc), () => calc);
      };
      return attr(worker(term));
    };
  };
}
