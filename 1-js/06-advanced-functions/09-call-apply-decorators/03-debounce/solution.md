```js demo
function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

```

Uma chamada de `debounce` retorna um encapsulador. Quando chamada, ela agenda a chamada original da função depois de certos `ms` e cancela o tempo de espera (timeout) anterior.
