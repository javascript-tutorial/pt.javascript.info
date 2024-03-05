```js demo
function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

```

Uma chamada à `debounce` retorna um embrulhador. Quando chamado, este agenda a chamada da função original depois de dados `ms` e cancela o tempo de espera anterior.
