Há muitos algotimos para esta tarefa.

Vamos utilizar um loop dentro de outro (isto é, aninhado):

```js
Para cada i no intervalo {
  testar se  i tem um divisor de 1 a i
  se sim => o valor não é um primo
  se não => o valor e um primo, mostre-o
}
```

O código usando um label:

```js run
let n = 10;

nextPrime:
for (let i = 2; i <= n; i++) { // para cada i...

  for (let j = 2; j < i; j++) { // procurar um divisor..
    if (i % j == 0) continue nextPrime; // não é primo, passar para o próximo i
  }

  alert( i ); // é primo
}
```

Há muitas maneiras de otimizá-lo. Por exemplo, podemos procurar divisores de `2` até a raiz quadrada de `i`. De qualquer modo, se quisermos ser realmente eficientes para intervalos maiores, precisamos mudar a abordagem e nos embasar em matemática avançada e  algoritmos complexos como o [Crivo Quadrático](https://en.wikipedia.org/wiki/Quadratic_sieve), o [Crivo do Corpo de Números Geral](https://en.wikipedia.org/wiki/General_number_field_sieve), etc.