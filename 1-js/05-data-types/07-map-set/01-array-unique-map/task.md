importance: 5

---

# Filtrar elementos únicos de um array

Seja `arr` um array.

Crie uma função `unique(arr)` que deve retornar um array com itens únicos de `arr`.

Por exemplo:

```js
function unique(arr) {
  /* your code */
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(values) ); // Hare, Krishna, :-O
```

Observação: Aqui estão sendo usadas strings, mas os valores podem ser de qualquer tipo.

Observação adicional: Use `Set` para armazenar valores únicos.
