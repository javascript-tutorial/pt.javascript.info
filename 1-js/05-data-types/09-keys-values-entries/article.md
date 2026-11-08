
# Object.keys, values, entries

Vamos deixar de lado as estruturas de dados individuais e falar sobre como iterar sobre elas.

No capítulo anterior, vimos os métodos `map.keys()`, `map.values()`, `map.entries()`.

Esses métodos são genéricos: há uma convenção de usá-los em estruturas de dados. Se um dia criarmos nossa própria estrutura de dados, devemos implementá-los também.

Eles são suportados por:

- `Map`
- `Set`
- `Array`

Objetos simples também suportam métodos parecidos, mas a sintaxe é um pouco diferente.

## Object.keys, values, entries

Para objetos simples, os seguintes métodos estão disponíveis:

- [Object.keys(obj)](mdn:js/Object/keys) -- retorna um array com as chaves.
- [Object.values(obj)](mdn:js/Object/values) -- retorna um array com os valores.
- [Object.entries(obj)](mdn:js/Object/entries) -- retorna um array de pares `[chave, valor]`.

Repare nas diferenças (comparando com o map, por exemplo):

|                    | Map           | Object                                   |
|--------------------|---------------|-------------------------------------------|
| Sintaxe de chamada | `map.keys()`  | `Object.keys(obj)`, mas não `obj.keys()` |
| Retorna            | iterável      | Array "de verdade"                       |

A primeira diferença é que precisamos chamar `Object.keys(obj)`, e não `obj.keys()`.

Por que assim? O principal motivo é flexibilidade. Lembre-se, objetos são a base de todas as estruturas complexas em JavaScript. Então podemos ter um objeto nosso, chamado `data`, que implementa seu próprio método `data.values()`. E ainda assim podemos chamar `Object.values(data)`.

A segunda diferença é que os métodos `Object.*` retornam arrays "de verdade", e não apenas iteráveis. Isso se deve principalmente a motivos históricos.

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

Aqui está um exemplo usando `Object.values` para percorrer os valores das propriedades:

```js run
let user = {
  name: "John",
  age: 30
};

// percorre os valores
for (let value of Object.values(user)) {
  alert(value); // John, depois 30
}
```

```warn header="Object.keys/values/entries ignoram propriedades simbólicas"
Assim como um laço `for..in`, esses métodos ignoram propriedades que usam `Symbol(...)` como chave.

Normalmente isso é conveniente. Mas se também quisermos as chaves simbólicas, existe um método separado, [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols), que retorna um array apenas com as chaves simbólicas. Também existe o método [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys), que retorna *todas* as chaves.
```


## Transformando objetos

Objetos não têm muitos métodos que existem para arrays, como `map`, `filter` e outros.

Se quisermos aplicá-los, podemos usar `Object.entries` seguido de `Object.fromEntries`:

1. Use `Object.entries(obj)` para obter um array de pares chave/valor de `obj`.
2. Use métodos de array nesse array, como `map`, para transformar esses pares chave/valor.
3. Use `Object.fromEntries(array)` no array resultante para transformá-lo de volta em um objeto.

Por exemplo, temos um objeto com preços, e gostaríamos de dobrá-los:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

*!*
let doublePrices = Object.fromEntries(
  // converte prices em um array, mapeia cada par chave/valor para outro par
  // e então fromEntries devolve o objeto
  Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
);
*/!*

alert(doublePrices.meat); // 8
```

Pode parecer difícil à primeira vista, mas fica fácil de entender depois que você usa uma ou duas vezes. Dá para montar cadeias de transformações bem poderosas dessa forma.
