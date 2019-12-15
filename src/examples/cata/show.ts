import { cata } from '../../schemes/cata';
import { add, const_, Expr, ExprF, functorExpr, mul } from '../../types/Expr';

export function show(expr: Expr): string {
  function alg(ex: ExprF<string>): string {
    switch (ex._tag) {
      case 'Const': return `${ex.value}`;
      case 'Add': return `(${ex.x}+${ex.y})`;
      case 'Mul': return `(${ex.x}*${ex.y})`;
    }
  }

  return cata(functorExpr)(alg)(expr);
}

console.log(show(mul(add(const_(1), const_(2)), const_(3)))); // => ((1+2)*3)
