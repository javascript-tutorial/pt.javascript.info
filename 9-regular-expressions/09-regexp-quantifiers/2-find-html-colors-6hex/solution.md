Precisamos buscar pela cerquilha `#` seguida por 6 caracteres hexadecimais.

Um caractere hexadecimal pode ser descrito como `pattern:[0-9a-fA-F]`, ou usando a opção `pattern:i`, apenas `pattern:[0-9a-f]`.

Podemos então buscar por 6 deles usando o quantificador `pattern:{6}`.

Nosso resultado final é a expressão: `pattern:/#[a-f0-9]{6}/gi`.

```js run
let regexp = /#[a-f0-9]{6}/gi;

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2"

alert( str.match(regexp) );  // #121212,#AA00ef
```

Mas temos um problema, essa expressão captura cores em sequências maiores:

```js run
alert( "#12345678".match( /#[a-f0-9]{6}/gi ) ) // #123456
```

Para consertar isso, adicionamos o `pattern:\b` ao final:

```js run
// cor válida
alert( "#123456".match( /#[a-f0-9]{6}\b/gi ) ); // #123456

// cor inválida
alert( "#12345678".match( /#[a-f0-9]{6}\b/gi ) ); // null
```
