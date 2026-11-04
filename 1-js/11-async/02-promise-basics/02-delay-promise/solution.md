```js run
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('runs after 3 seconds'));
```

Repare que, nessa tarefa, `resolve` é chamado sem argumentos. Não retornamos nenhum valor de `delay`, só garantimos o atraso.
