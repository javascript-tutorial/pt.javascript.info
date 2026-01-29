
```js run demo
let num;

do {
  num = prompt("Digite um número maior que 100?", 0);
} while (num <= 100 && num);
```

O laço `do..while` repete enquanto ambas as verificações são verdadeiras:

1. A verificação `num <= 100` -- ou seja, o valor inserido ainda não é maior que `100`.
2. A verificação `&& num` é falsa quando `num` é `null` ou uma string vazia. Então o laço `while` também para.

P.S. Se `num` é `null` então `num <= 100` é `true`, então sem a 2ª verificação o laço não pararia se o usuário clicasse CANCELAR. Ambas as verificações são necessárias.
