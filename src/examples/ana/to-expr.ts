import { ana } from '../../schemes/ana';
import { cata } from '../../schemes/cata';
import { Add, Const, Expr, ExprF, functorExpr, Mul } from '../../types/Expr';

function show(expr: Expr): string {
  function alg(ex: ExprF<string>): string {
    switch (ex._tag) {
      case 'Const': return `${ex.value}`;
      case 'Add': return `(${ex.x}+${ex.y})`;
      case 'Mul': return `(${ex.x}*${ex.y})`;
    }
  }

  return cata(functorExpr)(alg)(expr);
}

function toExpr(n: number): Expr {
  function coalg(a: number): ExprF<number> {
    // poor man's pattern matching:
    switch (true) {
      case a === 0: return new Const(0);
      case a === 1: return new Const(1);
      case a === 2: return new Const(2);
      case a % 2 === 0: return new Mul(2, a / 2);
      default: return new Add(1, a - 1);
    }
  }

  return ana(functorExpr)(coalg)(n);
}

console.log(show(toExpr(42))); // > (2*(1+(2*(2*(1+(2*2))))))
