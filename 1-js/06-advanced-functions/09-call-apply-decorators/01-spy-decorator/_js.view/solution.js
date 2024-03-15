function spy(func) {

  function wrapper(...args) {
    // usar `...args` ao invés de `arguments`
    // para armazenar o vetor "real" no `wrapper.calls`
    wrapper.calls.push(args);
    return func.apply(this, args);
  }

  wrapper.calls = [];

  return wrapper;
}
