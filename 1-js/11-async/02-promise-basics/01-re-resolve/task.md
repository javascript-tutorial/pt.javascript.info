
# Resolver uma promise de novo?


Qual é a saída do código abaixo?

```js
let promise = new Promise(function(resolve, reject) {
  resolve(1);

  setTimeout(() => resolve(2), 1000);
});

promise.then(alert);
```
