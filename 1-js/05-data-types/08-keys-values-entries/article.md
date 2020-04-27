# Object.keys, valores e entradas

Vamos dar um passo à frente em relação às estruturas individuais de dados e falaremos sobre as iterações sobre elas.

No capítulo anterior vimos os métodos `map.keys()`, `map.values()`, `map.entries()`.

Estes métodos são genéricos. Existe um acordo comum para utilizá-los em estruturas de dados. Se criarmos uma estrutura de dados por nós mesmos, deveremos implementar os referidos métodos.

Eles são suportados para:

- `Map`
- `Set`
- `Array` (except `arr.values()`)

Objetos simples também suportam métodos semelhantes, mas a sintaxe é um pouco diferente.

## Object.keys, valores e entradas

Para objetos simples, os métodos a seguir estão disponíveis:

- [Object.keys(obj)](mdn:js/Object/keys) -- retorna um array de chaves.
- [Object.values(obj)](mdn:js/Object/values) -- retorna um array de valores.
- [Object.entries(obj)](mdn:js/Object/entries) -- retorna um array de pares `[chave, valor]`.

...mas observe as distinções (em comparação com o *map*, por exemplo):

|             | Map              | Object       |
|-------------|------------------|--------------|
| Sintáxe     | `map.keys()`     | `Object.keys(obj)`, but not `obj.keys()` |
| Retorno     | iterável         | Array real 



The first difference is that we have to call `Object.keys(obj)`, and not `obj.keys()`.

Why so? The main reason is flexibility. Remember, objects are a base of all complex structures in JavaScript. So we may have an object of our own like `order` that implements its own `order.values()` method. And we still can call `Object.values(order)` on it.

The second difference is that `Object.*` methods return "real" array objects, not just an iterable. That's mainly for historical reasons.

For instance:

```js
let user = {
  name: "John",
  age: 30
};
```

- `Object.keys(user) = ["name", "age"]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

Here's an example of using `Object.values` to loop over property values:

```js run
let user = {
  name: "John",
  age: 30
};

// loop over values
for (let value of Object.values(user)) {
  alert(value); // John, then 30
}
```

## Object.keys/values/entries ignore symbolic properties

Just like a `for..in` loop, these methods ignore properties that use `Symbol(...)` as keys.

Usually that's convenient. But if we want symbolic keys too, then there's a separate method [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) that returns an array of only symbolic keys. Also, the method [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) returns *all* keys.
