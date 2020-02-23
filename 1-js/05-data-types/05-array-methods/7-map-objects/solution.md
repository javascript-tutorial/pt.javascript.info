
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

Por favor, note que para usar arrow functions, precisamos usar colchetes adicionais. 

Não podemos escrevê-lo dessa forma:
```js
let usersMapped = users.map(user => *!*{*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
});
```

Como sabemos, existem dois tipos de arrow functions: sem corpo `value => expr` e com corpo `value => {...}`.

JavaScript irá tratar `{` como o começo do corpo de uma função, não o começo do objeto. A *gambiarra* é os colocar em volta de colchetes "normais", ou seja, primeiro os parênteses e depois os colchetes `({ ... })`:

```js
let usersMapped = users.map(user => *!*({*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
```

Dessa forma, nosso código está correto.


