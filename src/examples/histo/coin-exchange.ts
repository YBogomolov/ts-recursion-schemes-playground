import { partition } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';

import { histo } from '../../schemes/histo';
import { attr, Cofree, hole } from '../../types/cofree';
import { functorNat, Nat, NatF, succ, URI, zero } from '../../types/Nat';

type NatCofree = Cofree<URI, number[][]>;

const AVAILABLE_COINS = [50, 25, 10, 5, 1];

const expand = (amount: number): Nat => amount === 0 ? zero : succ(expand(amount - 1));

const compress = (n: NatF<NatCofree>): number => {
  switch (n._tag) {
    case 'Zero': return 0;
    case 'Succ': return 1 + compress(hole(n.value));
  }
};

const lookup = <A>(cache: Cofree<URI, A>, n: number): A =>
  n === 0 ? attr(cache) : lookup(hole(cache).value, n - 1);

const exchange = (amount: number): number[][] => {
  function go(curr: NatF<NatCofree>): number[][] {
    switch (curr._tag) {
      case 'Zero': return [[]];
      case 'Succ': {
        const given = compress(curr);
        const validCoins = AVAILABLE_COINS.filter((coin) => coin <= given);
        const remaining = validCoins.map((coin) => [coin, given - coin]);
        const { right: zeroes, left: toProcess } = pipe(remaining, partition((a) => a[1] === 0));
        const results = toProcess.flatMap(
          ([coin, remainder]) => lookup(curr.value, given - 1 - remainder)
            .filter((cs) => cs.every((c) => c <= coin))
            .map((cs) => [coin, ...cs]),
        );

        return zeroes.map(([coin, _remainder]) => [coin]).concat(results);
      }
    }
  }

  return histo(functorNat)(go)(expand(amount));
};

console.log(exchange(25)); // =>
// [
//   [25],
//   [10, 10, 5],
//   [10, 10, 1, 1, 1, 1, 1],
//   [10, 5, 5, 5],
//   [10, 5, 5, 1, 1, 1, 1, 1],
//   [10, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [5, 5, 5, 5, 5],
//   [5, 5, 5, 5, 1, 1, 1, 1, 1],
//   [5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// ]
