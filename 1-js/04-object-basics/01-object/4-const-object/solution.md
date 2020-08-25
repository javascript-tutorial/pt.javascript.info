Com certeza, funciona, sem problemas.

A `const` apenas protege a própria variável contra alterações.

Por outras palavras, `user` armazena uma referência ao objeto. E não pode ser alterada. Mas, o conteúdo do objeto pode.

```js run
const user = {
  name: "John"
};

*!*
// funciona
user.name = "Pete";
*/!*

// erro
user = 123;
```
