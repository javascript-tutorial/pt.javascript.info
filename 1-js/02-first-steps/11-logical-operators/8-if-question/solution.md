A resposta: o primeiro e o terceiro serão executados.

Detalhes:

```js run
// Corre.
// O resultado de -1 || 0 = -1, verdadeiro
if (-1 || 0) alert( 'first' );

// Não corre
// -1 && 0 = 0, falso
if (-1 && 0) alert( 'second' );

// Executa
// Operador && tem uma precedência maior que ||
// então -1 && 1 executa primeiro, nos dando a cadeia:
// null || -1 && 1 -> null || 1 -> 1
if (null || -1 && 1) alert( 'third' );
```

