
Esse é um caso em que saber como funciona por dentro ajuda.

Basta tratar a chamada `async` como uma promessa e anexar `.then` a ela:
```js run
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // mostra 10 depois de 1 segundo
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
