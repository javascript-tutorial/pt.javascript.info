importance: 5

---

# Mapear para objetos

Você tem um array de objetos `user`, cada um tem `name`, `surname` e` id`.

Escreva o código para criar outro array a partir dele, de objetos com `id` e `fullName`, onde `fullName` é gerado a partir de `name` e `surname`.

Por exemplo:

```js no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = /* ... your code ... */
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

Então, na verdade você precisa mapear um array de objetos para outro. Tente usar `=>` aqui. Há uma pegadinha aqui.
