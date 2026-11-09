importance: 5

---

# Filtra através de uma função

Temos um método nativo `arr.filter(f)` para arrays. Ele filtra todos os elementos através da função `f`. Se ela retornar `true`, então esse elemento é incluído no array resultante.

Faça um conjunto de filtros "prontos pra usar":

- `inBetween(a, b)` -- entre `a` e `b` ou igual a eles (de forma inclusiva).
- `inArray([...])` -- está no array dado.

O uso deve ser assim:

- `arr.filter(inBetween(3,6))` -- seleciona só os valores entre 3 e 6.
- `arr.filter(inArray([1,2,3]))` -- seleciona só os elementos que correspondem a um dos membros de `[1,2,3]`.

Por exemplo:

```js
/* .. seu código para inBetween e inArray */
let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
```

