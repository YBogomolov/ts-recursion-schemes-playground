// tslint:disable:max-line-length
import { Free } from 'fp-ts-contrib/lib/Free';
import { Functor, Functor1, Functor2, Functor3 } from 'fp-ts/lib/Functor';
import { Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from 'fp-ts/lib/HKT';

import { CVCoalgebra } from '../types/algebras';
import { Fix, fix } from '../types/fix';

export function futu<F extends URIS3>(F: Functor3<F>): <U, L, A>(coalgebra: (a: A) => Kind3<F, U, L, Free<F, A>>) => (a: A) => Fix<F>;
export function futu<F extends URIS2>(F: Functor2<F>): <L, A>(coalgebra: (a: A) => Kind2<F, L, Free<F, A>>) => (a: A) => Fix<F>;
export function futu<F extends URIS>(F: Functor1<F>): <A>(coalgebra: (a: A) => Kind<F, Free<F, A>>) => (a: A) => Fix<F>;
export function futu<F>(F: Functor<F>): <A>(coalgebra: CVCoalgebra<F, A>) => (a: A) => Fix<F>;
export function futu<F>(F: Functor<F>): <A>(coalgebra: CVCoalgebra<F, A>) => (a: A) => Fix<F> {
  return <A>(coalgebra: CVCoalgebra<F, A>) => {
    return function self(a: A): Fix<F> {
      const worker = (t: Free<F, A>): Fix<F> => {
        switch (t._tag) {
          case 'Pure': return self(t.value);
          case 'Impure': return fix(F.map(t.fx, worker));
        }
      };
      return fix(F.map(coalgebra(a), worker));
    };
  };
}
