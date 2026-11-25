A resposta: `null`.


```js run
function f() {
  alert( this ); // null
}

let user = {
  g: f.bind(null)
};

user.g();
```

O contexto de uma função vinculada é fixado de forma definitiva. Não tem como mudá-lo depois.

Então, mesmo quando rodamos `user.g()`, a função original é chamada com `this=null`.
