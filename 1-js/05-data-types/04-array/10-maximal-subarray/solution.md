# Solução lenta

Podemos calcular todas as somas parciais possíveis.

A forma mais simples é pegar cada elemento e calcular as somas de todos os subarrays a partir dele.

Por exemplo, para `[-1, 2, 3, -9, 11]`:

```js no-beautify
// Começando a partir de -1:
-1
-1 + 2
-1 + 2 + 3
-1 + 2 + 3 + (-9)
-1 + 2 + 3 + (-9) + 11

// Começando a partir de 2:
2
2 + 3
2 + 3 + (-9)
2 + 3 + (-9) + 11

// Começando a partir de 3:
3
3 + (-9)
3 + (-9) + 11

// Começando a partir de -9
-9
-9 + 11

// Começando a partir de 11
11
```

O código, na verdade, é um laço aninhado: o laço externo percorre os elementos do array, e o interno conta as somas parciais começando pelo elemento atual.

```js run
function getMaxSubSum(arr) {
  let maxSum = 0; // se não pegarmos nenhum elemento, zero será retornado

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

A solução tem complexidade de tempo [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation). Em outras palavras, se aumentarmos o tamanho do array 2 vezes, o algoritmo vai demorar 4 vezes mais.

Para arrays grandes (1000, 10000 ou mais itens), algoritmos assim podem causar uma lentidão séria.

# Solução rápida

Vamos percorrer o array e manter a soma parcial atual dos elementos na variável `s`. Se `s` se tornar negativa em algum momento, então atribuímos `s=0`. O maior valor entre todos esses `s` será a resposta.

Se a descrição estiver vaga demais, veja o código, ele é curto o suficiente:

```js run demo
function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) { // para cada item de arr
    partialSum += item; // adiciona ele ao partialSum
    maxSum = Math.max(maxSum, partialSum); // guarda o máximo
    if (partialSum < 0) partialSum = 0; // zera se for negativo
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

O algoritmo exige exatamente 1 passagem pelo array, então a complexidade de tempo é O(n).

Você pode encontrar informações mais detalhadas sobre o algoritmo aqui: [Maximum subarray problem](http://en.wikipedia.org/wiki/Maximum_subarray_problem). Se ainda não estiver óbvio por que isso funciona, tente rastrear o algoritmo nos exemplos acima, veja como ele funciona, isso é melhor do que qualquer explicação.
