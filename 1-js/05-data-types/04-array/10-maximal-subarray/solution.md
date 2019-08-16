# Solução lenta

Podemos calcular todas somas possíveis.

A maneira mais simples é pegar todos os elementos e calcular somas de todos os subarrays a partir dele.

Por exemplo, para `[-1, 2, 3, -9, 11]`:

```js no-beautify
// Começando de -1:
-1
-1 + 2
-1 + 2 + 3
-1 + 2 + 3 + (-9)
-1 + 2 + 3 + (-9) + 11

// Começando de 2:
2
2 + 3
2 + 3 + (-9)
2 + 3 + (-9) + 11

// Começando de 3:
3
3 + (-9)
3 + (-9) + 11

// Começando de -9
-9
-9 + 11

// Começando de 11
11
```

O código é, na verdade, um loop aninhado: o loop externo sobre os elementos da matriz e as contagens internas, que começam com o elemento atual.

```js run
function getMaxSubSum(arr) {
  let maxSum = 0; // se pegarmos nenhum elemento, será retornado zero

  for (let i = 0; i < arr.length; i++) {
    let sumFixedStart = 0;
    for (let j = i; j < arr.length; j++) {
      sumFixedStart += arr[j];
      maxSum = Math.max(maxSum, sumFixedStart);
    }
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
```

A solução tem uma complexidade de tempo de [O(n<sup>2</sup>)](https://pt.wikipedia.org/wiki/Grande-O). Em outras palavras, se aumentarmos o tamanho do array 2 vezes, o algoritmo demorará 4 vezes mais.

Para arrays grandes (1000, 10000 or more items) tais algoritmos podem levar a uma séria lentidão.

# Solução rápida

Vamos andar o array e manter a soma parcial atual dos elementos na variável `s`. Se `s` se tornar negativo em algum ponto, então atribua `s = 0`. O máximo de todos esses `s` será a resposta.

Se a descrição for muito vaga, por favor, veja o código, é curto o suficiente:

```js run demo
function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) { // para cada item de arr
    partialSum += item; // adicione-o a soma parcial partialSum
    maxSum = Math.max(maxSum, partialSum); // lembre do máximo
    if (partialSum < 0) partialSum = 0; // zero se negativo
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([-1, -2, -3]) ); // 0
```

O algoritmo requer exatamente 1 passagem de matriz, então a complexidade de tempo é O(n).
Você pode encontrar mais informações detalhadas sobre o algoritmo aqui: [Maximum subarray problem](https://pt.wikipedia.org/wiki/Sublista_cont%C3%ADgua_de_soma_m%C3%A1xima). Se ainda não é óbvio por que isso funciona, então, por favor, investigue o algoritmo nos exemplos acima, veja como funciona, isso é melhor que qualquer palavra.
