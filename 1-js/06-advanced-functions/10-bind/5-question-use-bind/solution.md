
O erro acontece porque `askPassword` recebe as funções `loginOk/loginFail` sem o objeto.

Quando ele as chama, elas naturalmente assumem `this=undefined`.

Vamos vincular (`bind`) o contexto:

```js run
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  loginOk() {
    alert(`${this.name} logged in`);
  },

  loginFail() {
    alert(`${this.name} failed to log in`);
  },

};

*!*
askPassword(user.loginOk.bind(user), user.loginFail.bind(user));
*/!*
```

Agora funciona.

Uma solução alternativa poderia ser:
```js
//...
askPassword(() => user.loginOk(), () => user.loginFail());
```

Normalmente isso também funciona e fica bom.

Porém, é um pouco menos confiável em situações mais complexas, onde a variável `user` pode mudar *depois* que `askPassword` é chamada, mas *antes* que o visitante responda e chame `() => user.loginOk()`. 
