```js demo
function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

```

Uma chamada para `debounce` retorna um encapsulador. Quando chamado, ela agenda a função original chama depois de receber `ms` e cancela o tempo limite anterior.
