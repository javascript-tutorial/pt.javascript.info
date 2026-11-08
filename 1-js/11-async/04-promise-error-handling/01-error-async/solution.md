A resposta é: **não, não vai**:

```js run
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```

Como dito no capítulo, existe um "`try..catch` implícito" ao redor do código da função. Então todos os erros síncronos são tratados.

Mas aqui o erro é gerado não enquanto o executor está rodando, e sim depois. Então a promessa não consegue tratá-lo.
