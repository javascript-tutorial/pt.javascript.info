
Acentos graves incorporam a expressão `${...}` dentro da string.

```js run
let name = "Ilya";

// a expressão é um número 1
alert( `olá ${1}` ); // olá 1

// a expressão é uma string "name"
alert( `olá ${"name"}` ); // olá name

// a expressão é uma variável, incorpore-a.
alert( `olá ${name}` ); // olá Ilya
```
