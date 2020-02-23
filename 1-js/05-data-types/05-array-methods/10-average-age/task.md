importance: 4

---

# Pegar a média de idade

Escreva a função `getAverageAge(users)` que recebe um array de objetos com a propriedade `age` e pega a média entre eles.

A fórmula da média é `(age1 + age2 + ... + ageN) / N`.

Por exemplo:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [ john, pete, mary ];

alert( getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28
```

