# Erro ao ler propriedade inexistente

Normalmente, uma tentativa de ler uma propriedade inexistente retorna `undefined`.

Crie um proxy que lança um erro numa tentativa de ler uma propriedade inexistente.

Isso pode ajudar a detectar erros de programação antecipadamente.

Escreva uma função `wrap(target)` que recebe um objeto `target` e retorna um proxy que adiciona esse aspecto funcional

É assim que deve funcionar:

```js
let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
*!*
      /* seu código */
*/!*
  });
}

user = wrap(user);

alert(user.name); // John
*!*
alert(user.age); // ReferenceError: A propriedade não existe: "age"
*/!*
```
