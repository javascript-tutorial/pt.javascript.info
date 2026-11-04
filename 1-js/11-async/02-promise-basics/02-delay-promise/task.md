
# Atraso com uma promise

A função nativa `setTimeout` usa callbacks. Crie uma alternativa baseada em promise.

A função `delay(ms)` deve retornar uma promise. Essa promise deve ser resolvida depois de `ms` milissegundos, de forma que possamos adicionar `.then` a ela, assim:

```js
function delay(ms) {
  // seu código
}

delay(3000).then(() => alert('runs after 3 seconds'));
```
