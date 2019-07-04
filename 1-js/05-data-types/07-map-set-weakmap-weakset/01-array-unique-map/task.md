importance: 5

---

# Filtrar membros únicos do array

Seja `arr` um array.

Crie uma função `unique(arr)` que deve retornar um array com itens de `arr` únicos.

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

P.S. Aqui strings são usadas, mas poderiam ser valores de qualquer tipo.

P.P.S. Use `Set` para armazenar valores únicos.
