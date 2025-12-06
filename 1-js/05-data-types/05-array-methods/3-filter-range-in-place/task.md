importance: 4

---

# Filter range "in place"

Escreva uma função `filterRangeInPlace(arr, a, b)` que pegue um array `arr` e remova dele todos os valores exceto aqueles que estão entre `a` e `b`. A condição é: `a ≤ arr[i] ≤ b`.

A função deve modificar a array. Não deve retornar um valor.

Exemplo:
```js
let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // remove os números exceto números de 1 á 4

alert( arr ); // [3, 1]
```
