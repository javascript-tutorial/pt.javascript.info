
Solução:

```js run
let regexp = /\.{3,}/g;
alert( "Olá!... Como está?.....".match(regexp) ); // ..., .....
```

Note que o ponto é um caractere especial (também conhecido como metacaractere), então devemos escapá-lo usando uma contrabarra: `\.`.
