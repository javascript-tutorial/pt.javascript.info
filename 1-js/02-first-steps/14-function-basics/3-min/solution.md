Uma solução usando `if`:

```js
function min(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}
```

Uma solução com o operador de interrogação `'?'`:

```js
function min(a, b) {
  return a < b ? a : b;
}
```

P.S. No caso de igualdade `a == b`, não importa o que retorna.
