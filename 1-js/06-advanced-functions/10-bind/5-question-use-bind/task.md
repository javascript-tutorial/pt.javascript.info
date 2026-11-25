importance: 5

---

# Corrija uma função que perde o "this"

A chamada a `askPassword()` no código abaixo deveria verificar a senha e então chamar `user.loginOk/loginFail` dependendo da resposta.

Mas ela causa um erro. Por quê?

Corrija a linha destacada para que tudo comece a funcionar direito (as outras linhas não devem ser mudadas).

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
askPassword(user.loginOk, user.loginFail);
*/!*
```
