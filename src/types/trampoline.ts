export type Trampoline<T> = T | (() => Trampoline<T>);

export function trampoline<T>(firstResult: Trampoline<T>) {
  let result = firstResult;
  while (result instanceof Function) {
    result = result();
  }
  return result;
}
