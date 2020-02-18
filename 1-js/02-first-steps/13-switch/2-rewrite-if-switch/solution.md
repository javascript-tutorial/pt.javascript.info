As duas primeiras verificações se tornam em dois `case`. A terceira verificação está dividida em dois casos (*cases*):

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

Por favor, note: o `break` no final não é necessário. Mas o colocamos para salvaguardar futuro código.

No futuro, pode existir a chance de querermos adicionar mais um `case`, por exemplo `case 4`. E, se nos esquecermos de adicionar um *break* antes dele, no fim de `case 3`, haverá um erro. Assim, é uma espécie precaução pessoal.
