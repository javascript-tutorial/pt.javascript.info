
# Chame async a partir de não-async

Temos uma função "comum" chamada `f`. Como você pode chamar a função `async` `wait()` e usar o resultado dela dentro de `f`?

```js
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ...o que você deveria escrever aqui?
  // precisamos chamar a wait() async e esperar para obter o 10
  // lembre-se, não podemos usar "await"
}
```

P.S. A tarefa é tecnicamente bem simples, mas a pergunta é bem comum entre desenvolvedores novos no async/await.
