importance: 3

---

# Embaralhe um array

Escreva a função `shuffle(array)` que embaralha (reordena aleatoriamente) elementos do array.

Múltiplas execuções de `shuffle` pode levar para diferentes ordenações dos elementos. Por exemplo:

```js
let arr = [1, 2, 3];

shuffle(arr);
// arr = [3, 2, 1]

shuffle(arr);
// arr = [2, 1, 3]

shuffle(arr);
// arr = [3, 1, 2]
// ...
```

Todas as ordenações dos elementos deve ter uma probabilidade igual. Por exemplo, `[1,2,3]` pode ser reordenado como `[1,2,3]` ou `[1,3,2]` ou `[3,1,2]` etc, com probabilidade iguais para cada caso.
