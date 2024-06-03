importance: 4

---

# Adicione o decorador "defer()" às funções

Adicione ao protótipo de todas as funções o método `defer(ms)` que retorne um *wrapper* (invólucro), atrasando a chamada em `ms` milisegundos.

Aqui está um exemplo de como deveria funcionar:

```js
function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // mostra 3 depois de 1 segundo
```

Note que os argumentos devem ser passados para a função original.
