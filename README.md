# Recursion Schemes Playground in TypeScript

Playground for various recursion schemes done in TypeScript.

## How to run the examples

The easiest way to play with the examples would be the following:

1. Fork, clone or just download the ZIP archive of this repo.
2. Run `npm ci` to install the dependencies.
3. Run `npm run <scheme>`, where `<scheme>` could be:
   1. `ana:to-expr` – prints an expansion of a natural number to a combination of `+ 1`, `* 2`, `0`, `1` and `2`.
   2. `cata:show` – pretty-prints an expression from example 1.
   3. `cata:natsum` – converts a Peano number to a TS `number`.
   4. `histo:coin-exchange` – solves a dynamic programming problem of coin exchange ("given a set of coins K and an amount M, in how many ways can you exchange M?").
4. Change any inputs or try solving your own tasks using the provided schemes!

## Included schemes

1. Anamorphism: generalized unfold
2. Catamorphism: generalized fold
3. Hylomorphism: unfold followed by fold, recursively
4. Paramorphism: simple recursion which call tree is a cons-list
5. Histomorphism: fold with access to the history of previous computations
6. Futumorphism: unfold with possibility to choose future strategy of unfolding

## Credits

1. [Giulio Canti](https://github.com/gcanti) for his implementation of ana/cata/hylo/para for `fp-ts@1`: https://github.com/gcanti/recursion-schemes-ts
2. [Patrick Thomson](https://github.com/patrickt) for his incredible article series about recursion schemes: https://blog.sumtypeofway.com/posts/introduction-to-recursion-schemes.html
