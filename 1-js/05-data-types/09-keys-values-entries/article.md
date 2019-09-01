
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

...Por favor, note as distinções (em comparação com o map, por exemplo):

|             | Map              | Object       |
|-------------|------------------|--------------|
| Sintaxe de chamada | `map.keys()`  | `Object.keys(obj)`, mas não `obj.keys()` |
| Retorna     | iterável    | Array "reais"                     |

A primeira diferença é que temos que chamar `Object.keys(obj)`, e não `obj.keys()`.

Por quê? O principal motivo é a flexibilidade. Lembre-se, os objetos são uma base de todas as estruturas complexas em JavaScript. Portanto, podemos ter um objeto próprio como `data` que implementa seu próprio método `data.values​​()`. E nós ainda podemos chamar `Object.values(data)` nela.

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


## Transformando objetos

Os objetos não possuem muitos métodos existentes para arrays, por exemplo `map`, `filter` e outros.

Se quisermos aplicá-los, podemos usar `Object.entries` seguido de `Object.fromEntries`:

1. Use `Object.entries(obj)` para obter um array de pares de chave/valor de `obj`.
2. Use métodos de array nesse array, por exemplo `map`.
3. Use `Object.fromEntries(array)` no array resultante para transformá-la novamente em um objeto.

Por exemplo, temos um objeto com preços e gostaríamos de dobrá-los:

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

Podemos criar códigos de uma linha poderosos para transformações mais complexas dessa maneira. É importante manter o equilíbrio, para que o código ainda seja simples o suficiente para entendê-lo.