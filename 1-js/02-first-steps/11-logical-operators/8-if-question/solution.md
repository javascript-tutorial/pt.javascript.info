Resposta: o primeiro e o terceiro serão executados.

Detalhes:

```js run
// Executa.
// O resultado de -1 || 0 = -1, verdadeiro.
if (-1 || 0) alert( 'primeiro' );

// Não executa.
// -1 && 0 = 0, falso
if (-1 && 0) alert( 'segundo' );

// Executa.
// O operador && tem precedência maior que ||
// então -1  && 1 executa primeiro, nos dando o encadeamento:
// null || -1 && 1  ->  null || 1  ->  1
if (null || -1 && 1) alert( 'terceiro' );
```
