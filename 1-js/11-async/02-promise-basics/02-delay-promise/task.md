
# Atraso com uma promessa

A função nativa `setTimeout` usa callbacks. Crie uma alternativa baseada em promessa.

A função `delay(ms)` deve retornar uma promessa. Essa promessa deve ser resolvida depois de `ms` milissegundos, de forma que possamos adicionar `.then` a ela, assim:

```js
function delay(ms) {
  // seu código
}

delay(3000).then(() => alert('roda depois de 3 segundos'));
```
