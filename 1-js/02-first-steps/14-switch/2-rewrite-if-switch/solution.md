As duas primeiras comparações transformam-se em dois `case`. A terceira comparação está divida em dois casos:

```js run
let a = +prompt('a?', '');

switch (a) {
  case 0:
    alert( 0 );
    break;

  case 1:
    alert( 1 );
    break;

  case 2:
  case 3:
    alert( '2,3' );
*!*
    break;
*/!*
}
```

Pr favor, note: o `break` no final não é necessário. Mas o colocamos como segurança no código.

No futuro, poderemos querer colocar mais um `case`, por exemplo `case 4`. E se nos esquecermos de adicionar um break antes dele, no final de `case 3`, ocorrerá um erro. Assim, é uma espécie de prevenção.
