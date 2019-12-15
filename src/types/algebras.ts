import { Free } from 'fp-ts-contrib/lib/Free';
import { HKT } from 'fp-ts/lib/HKT';

import { Cofree } from './cofree';
import { Fix } from './fix';

// Algebra: take `F<A>` and produce `A`
export type Algebra<F, A> = (fa: HKT<F, A>) => A;

// Coalgebra: take `A` and produce `F<A>`
export type Coalgebra<F, A> = (a: A) => HKT<F, A>;

// R-algebra: take `F<Term, A>` and extract `A`
export type RAlgebra<F, A> = (t: HKT<F, [Fix<F>, A]>) => A;

// Course-of-value algebra: take `F<Cofree<F<A>>>` and extract `A`
export type CVAlgebra<F, A> = (fa: HKT<F, Cofree<F, A>>) => A;

// Course-of-value coalgebra: take `A` and generate `F<Free<F<A>>>`
export type CVCoalgebra<F, A> = (a: A) => HKT<F, Free<F, A>>;
