Vamos usar `eval` para calcular a expressão matemática:

```js demo run
let expr = prompt("Digite uma expressão aritmética?", '2*3+2');

alert( eval(expr) );
```

Porém, o usuário pode digitar qualquer texto ou código.

Para deixar as coisas seguras, e limitar só a aritmética, podemos verificar `expr` usando uma [expressão regular](info:regular-expressions), de forma que ela só possa conter dígitos e operadores.
