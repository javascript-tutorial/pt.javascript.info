**Erro**!

Tente isso:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}

(user.go)() // erro!
```

A mensagem de erro na maioria dos navegadores não fornece muita indicação sobra o que deu errado.

**O erro ocorre porque está faltando um ponto e vírgula após user = {...}.**

JavaScript não insere automaticamente um ponto e vírgula antes de um colchete `(user.go)()`, então ele interpreta o código como: 

```js no-beautify
let user = { go:... }(user.go)()
```

Então também podemos ver que tal expressão conjunta é sintaticamente uma chamada do objeto `{ go: ... }` como uma função com o argumento `(user.go)`. E isso também acontece na mesma linha com `let user`, então o objeto `user` ainda nem foi definido, daí o erro.

Se inserirmos o ponto e vírgula, tudo fica bem:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}*!*;*/!*

(user.go)() // John
```

Por favor, note que os parênteses em torno de `(user.go)` não fazem nada aqui. Normalmente, eles estabelecem a ordem das operações, mas aqui o ponto `.` funciona primeiro de qualquer maneira, então não há efeito. A única coisa que importa é o ponto e vírgula.