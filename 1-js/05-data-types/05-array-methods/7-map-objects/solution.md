
```js run no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = users.map(user => ({
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
*/!*

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

alert( usersMapped[0].id ); // 1
alert( usersMapped[0].fullName ); // John Smith
```

Por favor, note que para as funções de flecha, precisamos usar colchetes adicionais.

Nós não podemos escrever assim:
```js
let usersMapped = users.map(user => *!*{*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
});
```

Como nos lembramos, existem duas funções de flecha: sem corpo `value => expr` e com corpo `value => {...}`.

Aqui JavaScript trataria `{` como o início do corpo da função, não o início do objeto. A solução é envolvê-los nos parênteses "normais":

```js
let usersMapped = users.map(user => *!*({*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
```

Agora está certo.

