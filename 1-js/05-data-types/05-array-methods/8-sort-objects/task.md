importance: 5

---

# Classificar usuários por idade

Escreva a função `sortByAge(users)` que obtém um array de objetos com a propriedade `age` e classifica-os por `age`.

Por exemplo:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ pete, john, mary ];

sortByAge(arr);

// now: [john, mary, pete]
alert(arr[0].name); // John
alert(arr[1].name); // Mary
alert(arr[2].name); // Pete
```
