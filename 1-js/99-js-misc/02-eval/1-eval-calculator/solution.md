Vamos usar `eval` para calcular a expressão matemática:

```js demo run
let expr = prompt("Escreva uma expressão aritmética?", '2*3+2');

alert( eval(expr) );
```

Contudo, o usuário pode dar entrada a qualquer texto ou código.

Para tornar as coisas seguras, e limitar a entrada a apenas aritméticas, nós podemos checar `expr` usando uma [expressão regular](info:regular-expressions), de forma que apenas possa conter dígitos e operadores.
