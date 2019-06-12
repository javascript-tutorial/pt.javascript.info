importância: 4

---

# # Intervalo de filtragem "no lugar"

Escreva uma função `filterRangeInPlace(arr, a, b)` que recebe um array `arr` e remove dele todos valores eceto aqueles que estão entre `a` e `b`. O teste é: `a ≤ arr[i] ≤ b`.

A função só deve modificar o array. Não deve retornar nada.

Por exemplo:
```js
let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // removeu os números eceto de 1 a 4

alert( arr ); // [3, 1]
```
