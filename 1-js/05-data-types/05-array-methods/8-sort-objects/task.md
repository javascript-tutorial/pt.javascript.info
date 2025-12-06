importance: 5

---

# Ordene (sort) users por age

Escreva a função `sortByAge(users)` que recebe um array de objetos com a propriedade `age` e o ordene por `age`.

Por exemplo:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ pete, john, mary ];

sortByAge(arr);

// agora: [john, mary, pete]
alert(arr[0].name); // John
alert(arr[1].name); // Mary
alert(arr[2].name); // Pete
```
