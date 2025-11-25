Nós podemos usar essa abordagem se nós tivermos a certeza de que a propriedade `"constructor"` tem o valor correto.

Por exemplo, se nós não tocarmos no `"prototype"` padrão, então esse código funciona com certeza:

```js run
function User(name) {
  this.name = name;
}

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // Pete (funcionou!)
```

Funcionou, porque `User.prototype.constructor == User`.

...Mas se alguém, por acaso, sobrescrever `User.prototype` e se esquecer de recriar o `constructor` referenciando `User`, então o código irá falhar.

Por exemplo:

```js run
function User(name) {
  this.name = name;
}
*!*
User.prototype = {}; // (*)
*/!*

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // undefined
```

Por que `user2.name` está `undefined`?

Abaixo está como o `new user.constructor('Pete')` funciona:

1. Primeiro, ele procura o `constructor` do `user`. Não o encontra.
2. Depois, ele segue a cadeia de protótipos. O protótipo de `user` é `User.prototype`, e ele também não tem um `constructor` (porque nós nos "esquecemos" de configurá-lo!).
3. Indo adiante na cadeia, `User.prototype` é um objeto vazio, cujo protótipo é o `Object.prototype` padrão.
4. Por último, para o `Object.prototype` padrão existe um `Object.prototype.constructor == Object` padrão. Então, ele é usado.

No fim, nós temos `let user2 = new Object('Pete')`.

Provavelmente não é isso que nós queremos. Nós gostaríamos de criar um `new User`, não um `new Object`. Essa é a consequência da falta de um `constructor`.

(Caso você esteja curioso, a chamada `new Object(...)` converte o seu argumento para um objeto. Isso é algo teórico, mas, na prática, ninguém faz a chamada `new Object` com um valor, e geralmente nós não usamos `new Object` para criar objetos).
