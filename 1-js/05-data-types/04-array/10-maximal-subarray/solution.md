# Solução lenta

Nós podemos calcular todas as possíveis subsomas.

A forma mais simples será tomar cada elemento e calcular as somas de todos os *subarrays* que comecem por ele.

Por exemplo, para `[-1, 2, 3, -9, 11]`:

```js no-beautify
// Começando por -1:
-1
-1 + 2
-1 + 2 + 3
-1 + 2 + 3 + (-9)
-1 + 2 + 3 + (-9) + 11

// Começando por 2:
2
2 + 3
2 + 3 + (-9)
2 + 3 + (-9) + 11

// Começando por 3:
3
3 + (-9)
3 + (-9) + 11

// Começando por -9
-9
-9 + 11

// Começando por 11
11
```

Na verdade, o código é um laço aninhado (*nested loop*): o externo percorre os elementos do *array*, e o interno calcula as subsomas que começam pelo elemento corrente.

```js run
function getMaxSubSum(arr) {
  let maxSum = 0; // se não tomarmos nenhum elemento, zero será retornado

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

A solução tem um tempo de complexidade de [O(n<sup>2</sup>)](https://pt.wikipedia.org/wiki/Grande-O). Por outras palavras, se aumentarmos o tamanho do *array* para o dobro, o algoritmo demorará 4 vezes mais.

Para grandes *arrays* (1000, 10000 ou mais itens) tais algoritmos podem levar a sérias lentidões.

# Solução rápida

Vamos percorrer o *array* e guardar a corrente soma partial dos elementos na variável `s`. Se, a certa altura, `s` se tornar negativo, então faça a atribuição `s=0`. O máximo de todos os `s` será a resposta.

Se a descrição for demasiado vaga, por favor veja o código, é realmente curto:

```js run demo
function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) { // por cada item de arr
    partialSum += item; // adicione-o a partialSum ('s' na descrição)
    maxSum = Math.max(maxSum, partialSum); // guarde o máximo
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

O algoritmo requere exatamente 1 passagem pelo *array*, portanto o tempo de complexidade é O(n).

Pode encontrar informação mais detalhada sobre o algoritmo aqui: [Sublista contígua de soma máxima](https://pt.wikipedia.org/wiki/Sublista_cont%C3%ADgua_de_soma_m%C3%A1xima). Se, ainda não for óbvio porque isso funciona, então por favor rasteie cada algoritmo nos exemplos acima e veja como trabalha, é melhor do que quaisquer palavras.
