importance: 2

---

# Um subarray máximo

A entrada é um array de números, ex.: `arr = [1, -2, 3, 4, -9, 6]`.

A tarefa é: encontrar o subarray contíguo de `arr` com a maior soma de itens.

Escreva a função `getMaxSubSum(arr)` que retornará essa soma.

Por exemplo:

```js
getMaxSubSum([-1, *!*2, 3*/!*, -9]) == 5 (a soma dos itens destacados)
getMaxSubSum([*!*2, -1, 2, 3*/!*, -9]) == 6
getMaxSubSum([-1, 2, 3, -9, *!*11*/!*]) == 11
getMaxSubSum([-2, -1, *!*1, 2*/!*]) == 3
getMaxSubSum([*!*100*/!*, -9, 2, -3, 5]) == 100
getMaxSubSum([*!*1, 2, 3*/!*]) == 6 (pega todos)
```

Se todos os itens forem negativos, significa que não pegamos nenhum (o subarray está vazio), então a soma é zero:

```js
getMaxSubSum([-1, -2, -3]) = 0
```

Tente pensar numa solução rápida: [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation) ou até O(n), se conseguir.
