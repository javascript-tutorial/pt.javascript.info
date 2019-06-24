
# Object.keys, values, entries

Vamos nos afastar das estruturas de dados individuais e falar sobre as iterações sobre elas.

No capítulo anterior vimos os métodos `map.keys()`, `map.values​​()`, `map.entries()`.

Esses métodos são genéricos, há um acordo comum para usá-los para estruturas de dados. Se alguma vez criarmos uma estrutura de dados própria, devemos implementá-los também.

Eles são suportados por:

- `Map`
- `Set`
- `Array` (exceto `arr.values()`)

Objetos simples também suportam métodos similares, mas a sintaxe é um pouco diferente.

## Object.keys, values, entries

Para objetos simples, os seguintes métodos estão disponíveis:

- [Object.keys(obj)](mdn:js/Object/keys) -- retorna um array de chaves.
- [Object.values(obj)](mdn:js/Object/values) -- retorna um array de valores.
- [Object.entries(obj)](mdn:js/Object/entries) -- retorna um array de pares `[chave, valor]`.

...Mas, por favor, note as distinções (em comparação com o map, por exemplo):

|             | Map              | Object       |
|-------------|------------------|--------------|
| Sintaxe de chamada | `map.keys()`  | `Object.keys(obj)`, mas não `obj.keys()` |
| Retorna     | iterável    | Array "reais"                     |

A primeira diferença é que temos que chamar `Object.keys(obj)`, e não `obj.keys()`.

Por quê? O principal motivo é a flexibilidade. Lembre-se, os objetos são uma base de todas as estruturas complexas em JavaScript. Portanto, podemos ter um objeto próprio como `order` que implementa seu próprio método `order.values​​()`. E nós ainda podemos chamar `Object.values(order)` nela.

A segunda diferença é que os métodos `Object.*` retornam objetos array "reais", não apenas iteráveis. Isso é principalmente por razões históricas.

Por exemplo:

```js
let user = {
  name: "John",
  age: 30
};
```

- `Object.keys(user) = ["name", "age"]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

Aqui está um exemplo de usar o `Object.values` para fazer um loop sobre os valores da propriedade:

```js run
let user = {
  name: "John",
  age: 30
};

// loop sobre valores
for (let value of Object.values(user)) {
  alert(value); // John, então 30
}
```

```warn header="Object.keys/values/entries ignoram propriedades simbólicas"
Assim como um loop `for..in`, esses métodos ignoram propriedades que usam o `Symbol(...)` como chaves.

Geralmente isso é conveniente. Mas se quisermos chaves simbólicas também, então existe um método separado [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) que retorna uma matriz de apenas chaves simbólicas. Além disso, existe um método [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) que retorna *todas* chaves.
```

## Object.fromEntries para transformar objetos

Às vezes precisamos realizar uma transformação de um objeto para `Mapear` e voltar.

Nós já temos `new Map(Object.entries(obj))` para fazer um `Map` de` obj`.

A sintaxe de `Object.fromEntries` faz o contrário. Dado um array de pares `[key, value]`, ele cria um objeto:

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// agora prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

Vamos ver aplicações práticas.

Por exemplo, gostaríamos de criar um novo objeto com preços dobrados em relação ao existente.

Para arrays, temos o método `.map` que permite transformar um array, mas não há nada como isso para objetos.

Então podemos usar um loop:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = {};
for(let [product, price] of Object.entries(prices)) {
  doublePrices[product] = price * 2;
}

alert(doublePrices.meat); // 8
```

...Ou podemos representar o objeto como um `Array` usando o `Object.entries`, então executar as operações com `map` (e potencialmente outros métodos de array), e então voltar usando `Object.fromEntries`.

Let's do it for our object:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

*!*
let doublePrices = Object.fromEntries(
  // converte para array, map e, em seguida, fromEntries devolve o objeto
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);
*/!*

alert(doublePrices.meat); // 8
```   

Pode parecer difícil à primeira vista, mas fica fácil de entender depois de usá-lo uma ou duas vezes.

Nós também podemos usar `fromEntries` para pegar um objeto de `Map`.

Por exemplo. temos um `Map` de preços, mas precisamos passá-lo para um código de terceiros que espera um objeto.

Aqui vamos nós:

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

let obj = Object.fromEntries(map);

// agora obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```
