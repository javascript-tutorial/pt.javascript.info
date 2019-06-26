O construtor `new Date` usa o fuso horário local por padrão. Portanto, a única coisa importante a lembrar é que os meses começam do zero.

Então fevereiro tem o número 1.

```js run
let d = new Date(2012, 1, 20, 3, 12);
alert( d );
```
