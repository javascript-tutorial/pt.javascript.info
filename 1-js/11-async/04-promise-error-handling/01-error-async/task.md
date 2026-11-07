# Erro no setTimeout

O que você acha? O `.catch` vai disparar? Explique sua resposta.

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
