importance: 5

---

# Ordenar por campo

Temos um array de objetos para ordenar:

```js
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
```

A forma normal de fazer isso seria:

```js
// por name (Ann, John, Pete)
users.sort((a, b) => a.name > b.name ? 1 : -1);

// por age (Pete, Ann, John)
users.sort((a, b) => a.age > b.age ? 1 : -1);
```

Será que podemos deixar isso ainda menos verboso, assim?

```js
users.sort(byField('name'));
users.sort(byField('age'));
```

Ou seja, em vez de escrever uma função, só colocar `byField(fieldName)`.

Escreva a função `byField` que possa ser usada para isso.
