importance: 5

---

# Map para objetos

Você tem um array de objetos `user`, cada um possui `name`, `surname` e `id`.

Escreva um código para criar um novo array a partir de `user`, também será um array de objetos com as propriedades `id` e `fullName`, onde `fullName` é gerado a partir da junção de `name` e `surname`.

Exemplo:

```js no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = /* ... seu código ... */
*/!*

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

alert( usersMapped[0].id ) // 1
alert( usersMapped[0].fullName ) // John Smith
```

Então, na realidade, você precisa copiar um array de objetos para o outro. Tente usar `=>` aqui. Há uma pegadinha neste exercício.