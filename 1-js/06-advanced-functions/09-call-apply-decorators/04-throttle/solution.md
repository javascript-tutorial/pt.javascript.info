```js demo
function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    isThrottled = true;

    func.apply(this, arguments); // (1)

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
```

Uma chamada para `throttle(func, ms` retorna `wrapper`.

1. Durante a primeira chamada, o `wrapper` apenas executa a `func` e configura o estado de espera (`isThrottled = true`).
2. Neste estado todas as chamadas são memorizadas em `savedArgs/savedThis`. Note que ambos o contexto e os argumentos são igualmente importante e devem ser memorizado. Nós precisamos deles simultaneamente reproduzir a chamada.
3. Depois `ms` milissegundos passam, `setTimeout` é acionada. O estado de espera é removido (`isThrottled = false`) e, se nós tivemos ignorado as chamadas, `wrapper` é executado com os últimos argumentos e contexto memorizados.

O terceiro passo executa não `func`, mas o `wrapper`, porque nós não só precisamos executar o `func`, mas mais uma vez, entra no estado de espera e configura o tempo limite para reconfigurá-lo.