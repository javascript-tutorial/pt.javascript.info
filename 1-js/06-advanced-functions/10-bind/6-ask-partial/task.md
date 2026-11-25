importance: 5

---

# Aplicação parcial para login

A tarefa é uma variante um pouco mais complexa de <info:task/question-use-bind>. 

O objeto `user` foi modificado. Agora, em vez de duas funções `loginOk/loginFail`, ele tem uma única função `user.login(true/false)`.

O que devemos passar para `askPassword` no código abaixo, para que ele chame `user.login(true)` como `ok` e `user.login(false)` como `fail`?

```js
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  login(result) {
    alert( this.name + (result ? ' logged in' : ' failed to log in') );
  }
};

*!*
askPassword(?, ?); // ?
*/!*
```

Suas mudanças devem modificar apenas o fragmento destacado.

