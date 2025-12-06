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

Uma chamada a `throttle(func, ms)` retorna `wrapper`.

1. Durante a primeira chamada, o `wrapper` apenas executa a `func` e define o estado de arrefecimento (`isThrottled = true`).
2. Neste estado todas as chamadas são memorizadas em `savedArgs/savedThis`. É de notar que tanto o contexto como os argumentos são igualmente importantes e devem ser memorizados. Nós precisamos destes simultaneamente para reproduzir a chamada.
3. Após `ms` milissegundos, `setTimeout` é acionada. O estado de arrefecimento é removido (`isThrottled = false`) e, se tivermos ignorado chamadas, o `wrapper` é executado com os últimos argumentos e contexto memorizados.

O terceiro passo não executa a `func`, mas sim o `wrapper`, porque não só precisamos de executar a `func`, como também entrar novamente no estado de arrefecimento e configurar o tempo de espera para reiniciá-lo.
