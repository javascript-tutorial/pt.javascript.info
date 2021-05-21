importance: 2

---

# Um *subarray* máximo

A entrada é um *array* de números, ex. `arr = [1, -2, 3, 4, -9, 6]`.

A tarefa é: encontrar o contíguo *subarray* de `arr` com a máxima soma de itens.

Escreva a função `getMaxSubSum(arr)` que irá retornar essa soma.

Por exemplo:

```js
getMaxSubSum([-1, *!*2, 3*/!*, -9]) == 5 (a soma dos itens em destaque)
getMaxSubSum([*!*2, -1, 2, 3*/!*, -9]) == 6
getMaxSubSum([-1, 2, 3, -9, *!*11*/!*]) == 11
getMaxSubSum([-2, -1, *!*1, 2*/!*]) == 3
getMaxSubSum([*!*100*/!*, -9, 2, -3, 5]) == 100
getMaxSubSum([*!*1, 2, 3*/!*]) == 6 (tome todos)
```

Se todos os itens forem negativos, significa que não tomamos nenhum (o *subarray* está vazio), então a soma é zero:

```js
getMaxSubSum([-1, -2, -3]) = 0
```

Por favor, tente pensar numa solução rápida: [O(n<sup>2</sup>)](https://pt.wikipedia.org/wiki/Grande-O), ou mesmo O(n) se puder.
