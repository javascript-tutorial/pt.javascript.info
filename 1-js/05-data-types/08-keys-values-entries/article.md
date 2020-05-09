# Object.keys, valores e entradas

Vamos dar um passo à frente em relação às estruturas individuais de dados e falaremos sobre as iterações sobre elas.

No capítulo anterior vimos os métodos `map.keys()`, `map.values()`, `map.entries()`.

Estes métodos são genéricos. Existe um acordo comum para utilizá-los em estruturas de dados. Se criarmos uma estrutura de dados por nós mesmos, deveremos implementar os referidos métodos.

Eles são suportados para:

- `Map`
- `Set`
- `Array` (exceto `arr.values()`)

Objetos simples também suportam métodos semelhantes, mas a sintaxe é um pouco diferente.

## Object.keys, valores e entradas

Para objetos simples, os métodos a seguir estão disponíveis:

- [Object.keys(obj)](mdn:js/Object/keys) -- retorna um array de chaves.
- [Object.values(obj)](mdn:js/Object/values) -- retorna um array de valores.
- [Object.entries(obj)](mdn:js/Object/entries) -- retorna um array de pares `[chave, valor]`.

...mas observe as distinções (em comparação com o *map*, por exemplo):

|             | Map              | Object       |
|-------------|------------------|--------------|
| Sintáxe     | `map.keys()`     | `Object.keys(obj)`, mas não `obj.keys()` |
| Retorno     | iterável         | Array real 

A primeira diferença é que temos que chamar `Object.keys(obj)` e não `obj.keys()`.

Por que? A principal razão é flexibilidade. Lembre-se, objetos são a base de todas as estruturas complexas no JavaScript. Portanto, podemos ter um objeto como `order`, que implementa seu próprio método `order.values()`. E ainda podemos chamar `Object.values (order)` nele.

A segunda diferença é que os métodos `Object.*` retornam objetos de arrays "reais", não apenas iteráveis. Isso acontece principalmente por razões históricas.

Por exemplo:

```js
let user = {
  nome: "John",
  idade: 30
};
```

- `Object.keys(user) = ["nome", "idade"]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["nome","John"], ["idade",30] ]`

Aqui está um exemplo do uso de `Object.values` para fazer um laço (*loop*) sobre os valores da propriedade:

```js executar
let user = {
  nome: "John",
  idade: 30
};

// loop sobre os valores
for (let value of Object.values(user)) {
  alert(value); // John, e depois 30
}
```

```warn header="Object.keys/values/entries ignore symbolic properties"
Just like a `for..in` loop, these methods ignore properties that use `Symbol(...)` as keys.

Usually that's convenient. But if we want symbolic keys too, then there's a separate method [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) that returns an array of only symbolic keys. Also, there exist a method [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) that returns *all* keys.
```
