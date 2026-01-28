Há muitos algoritmos para esta tarefa.

Vamos usar um laço aninhado:

```js
Para cada i no intervalo {
  verificar se i tem um divisor de 1..i
  se sim => o valor não é primo
  se não => o valor é primo, mostre-o
}
```

O código usando um rótulo:

```js run
let n = 10;

nextPrime:
for (let i = 2; i <= n; i++) { // para cada i...

  for (let j = 2; j < i; j++) { // procura por um divisor..
    if (i % j == 0) continue nextPrime; // não é primo, vai para o próximo i
  }

  alert( i ); // um primo
}
```

Há muito espaço para otimização. Por exemplo, poderíamos procurar por divisores de `2` até a raiz quadrada de `i`. Mas de qualquer forma, se quisermos ser realmente eficientes para intervalos grandes, precisamos mudar a abordagem e usar matemática avançada e algoritmos complexos como [Crivo quadrático](https://pt.wikipedia.org/wiki/Crivo_quadr%C3%A1tico), [Crivo do corpo de números gerais](https://pt.wikipedia.org/wiki/Crivo_de_corpo_de_n%C3%BAmeros_gerais) etc.
