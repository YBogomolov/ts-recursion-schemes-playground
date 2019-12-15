import { cata } from '../../schemes/cata';
import { functorNat, Nat, NatF, succ, zero } from '../../types/Nat';

export function natsum(nat: Nat): number {
  function alg(n: NatF<number>): number {
    switch (n._tag) {
      case 'Zero': return 0;
      case 'Succ': return 1 + n.value;
    }
  }

  return cata(functorNat)(alg)(nat);
}

console.log(natsum(succ(succ(succ(succ(zero))))));
