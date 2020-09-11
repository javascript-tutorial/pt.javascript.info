**Erro**!

Tente isto:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}

(user.go)() // erro!
```

A mensagem de erro, na maior parte dos navegadores (*browsers*), não nos dá uma compreensão do que ocorre de errado.

**O erro aparece porque falta um ponto-e-vírgula depois de `user = {...}`.**

JavaScript não assume um ponto-e-vírgula antes do parêntese de `(user.go)()`, por isso lê o código como:

```js no-beautify
let user = { go:... }(user.go)()
```

Assim, podemos também observar que, tal expressão conjunta é sintáticamente uma chamada do objeto `{ go: ... }` como uma função, tomando `(user.go)` como argumento. E, isso também ocorre na mesma linha que `let user`, então o objeto `user` ainda não foi definido, e por isto o erro.

Se inserirmos o ponto-e-vírgula, tudo estará bem:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}*!*;*/!*

(user.go)() // 'John'
```

Por favor, note que os parênteses em `(user.go)` nada aqui fazem. Geralmente, eles estabelecem a ordem das operações, mas aqui o ponto `.` já funciona à partida, então não têm efeito algum. Apenas, aquele ponto-e-vírgula importa.
