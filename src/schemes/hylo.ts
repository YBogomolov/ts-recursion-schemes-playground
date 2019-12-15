// tslint:disable:max-line-length
import { compose } from 'fp-ts/lib/function';
import { Functor, Functor1, Functor2, Functor3 } from 'fp-ts/lib/Functor';
import { Type, Type2, Type3, URIS, URIS2, URIS3 } from 'fp-ts/lib/HKT';

import { Algebra, Coalgebra } from './algebra';

export function hylo<F extends URIS3>(F: Functor3<F>): <U, L, A, B>(algebra: (fa: Type3<F, U, L, B>) => B, coalgebra: (a: A) => Type3<F, U, L, A>) => (a: A) => B;
export function hylo<F extends URIS2>(F: Functor2<F>): <L, A, B>(algebra: (fa: Type2<F, L, B>) => B, coalgebra: (a: A) => Type2<F, L, A>) => (a: A) => B;
export function hylo<F extends URIS>(F: Functor1<F>): <A, B>(algebra: (fa: Type<F, B>) => B, coalgebra: (a: A) => Type<F, A>) => (a: A) => B;
export function hylo<F>(F: Functor<F>): <A, B>(algebra: Algebra<F, B>, coalgebra: Coalgebra<F, A>) => (a: A) => B;
export function hylo<F>(F: Functor<F>): <A, B>(algebra: Algebra<F, B>, coalgebra: Coalgebra<F, A>) => (a: A) => B {
  return (algebra, coalgebra) => compose(algebra, (x) => F.map(x, hylo(F)(algebra, coalgebra)), coalgebra);
}
