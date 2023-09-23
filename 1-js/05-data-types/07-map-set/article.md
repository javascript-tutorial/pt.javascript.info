
# Map e Set

Até agora, aprendemos sobre as seguintes estruturas de dados complexas:

- Objetos são usados para armazenar coleções indexadas.
- Arrays são usados para armazenar coleções ordenadas.

Mas isso não é suficiente para a vida real. É por isso que `Map` e `Set` também existem.

## Map

[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) é uma coleção de itens de dados indexados, assim como um `Object`. Mas a principal diferença é que `Map` permite chaves de qualquer tipo.

Métodos e propriedades são:

- [`new Map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) -- cria o mapa.
- [`map.set(chave, valor)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) -- armazena o valor pela chave.
- [`map.get(chave)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) -- retorna o valor pela chave, `undefined` se a `chave` não existir no mapa.
- [`map.has(chave)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) -- retorna `true` se a `chave` existir, `false` caso contrário.
- [`map.delete(chave)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) -- remove o elemento (o par chave/valor) pela chave.
- [`map.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) -- remove tudo do mapa.
- [`map.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size) -- retorna a contagem atual de elementos.

Por exemplo:

```js run
let map = new Map();

map.set('1', 'str1');   // uma chave de string
map.set(1, 'num1');     // uma chave numérica
map.set(true, 'bool1'); // uma chave booleana

// lembra do objeto normal? Ele converteria as chaves para string
// Map mantém o tipo, então esses dois são diferentes:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

Como podemos ver, ao contrário de objetos, as chaves não são convertidas em strings. Qualquer tipo de chave é possível.

```smart header="`map[chave]` não é a maneira correta de usar um `Map`"
Embora `map[chave]` também funcione, por exemplo, podemos definir `map[chave] = 2`, isso trata o `map` como um objeto JavaScript simples, o que implica todas as limitações correspondentes (apenas chaves de string/símbolo, entre outras).

Portanto, devemos usar os métodos do `map`: `set`, `get` e assim por diante.
```

**Map também pode usar objetos como chaves.**

Por exemplo:

```js run
let john = { name: "John" };

// para cada usuário, vamos armazenar a contagem de suas visitas.
let visitsCountMap = new Map();

// john é a chave para o mapa
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

Usar objetos como chaves é uma das características mais notáveis e importantes do `Map`. O mesmo não se aplica ao `Object`. Usar uma string como chave em um `Object` é aceitável, mas não podemos usar outro `Object` como chave em um `Object`.

Vamos tentar:

```js run
let john = { name: "John" };
let ben = { name: "Ben" };

let visitsCountObj = {}; // tente usar um objeto

visitsCountObj[ben] = 234; // tente usar o objeto ben como chave
visitsCountObj[john] = 123; // tente usar o objeto john como chave, o objeto ben será substituído

*!*
// Isso é o que foi escrito!
alert( visitsCountObj["[object Object]"] ); // 123
*/!*
```

Como `visitsCountObj` é um objeto, ele converte todas as chaves de `Object`, como `john` e `ben` acima, para a mesma string `"[object Object]"`. Definitivamente, não é o que queremos.

```smart header="Como o `Map` compara chaves"
Para testar as chaves quanto à equivalência, o `Map` utiliza o algoritmo [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). Ele é essencialmente o mesmo que a igualdade estrita `===`, mas a diferença é que `NaN` é considerado igual a `NaN`. Portanto, `NaN` pode ser usado como chave também.

Este algoritmo não pode ser alterado ou personalizado.
```

````smart header="Encadeamento"
Cada chamada de `map.set` retorna o próprio mapa, então podemos "encadear" as chamadas:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````

## Iteração sobre o Map

Para fazer um loop em um `map`, existem 3 métodos:

- [`map.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys) -- retorna um iterável para chaves,
- [`map.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values) -- retorna um iterável para valores,
- [`map.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries) -- retorna um iterável para entradas `[chave, valor]`, é usado por padrão em `for..of`.

Por exemplo:

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// itera sobre as chaves (vegetais)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// itera sobre os valores (quantidades)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// itera sobre as entradas [chave, valor]
for (let entry of recipeMap) { // o mesmo que recipeMap.entries()
  alert(entry); // cucumber,500 (e assim por diante)
}
```

```smart header="A ordem de inserção é usada."
A iteração segue a mesma ordem em que os valores foram inseridos. O `Map` preserva essa ordem, ao contrário de um objeto normal.
```

Além disso, o `Map` possui um método embutido chamado `forEach`, semelhante ao `Array`:

```js
// executa a função para cada par (chave, valor)
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 etc
});
```

## Object.entries: Map a partir de Objeto

Quando um `Map` é criado, podemos passar um array (ou outro iterável) com pares chave/valor para inicialização, como este:

```js run
// array de pares [chave, valor]
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```

Se tivermos um objeto simples e gostaríamos de criar um `Map` a partir dele, podemos usar o método embutido [Object.entries(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries), que retorna um array de pares chave/valor para um objeto exatamente nesse formato.

Portanto, podemos criar um mapa a partir de um objeto da seguinte forma:

```js run
let obj = {
  name: "John",
  age: 30
};

*!*
let map = new Map(Object.entries(obj));
*/!*

alert( map.get('name') ); // John
```

Aqui, `Object.entries` retorna o array de pares chave/valor: `[ ["name","John"], ["age", 30] ]`. Isso é o que o `Map` precisa.

## Object.fromEntries: Objeto a partir de Map

Acabamos de ver como criar um `Map` a partir de um objeto simples usando `Object.entries(obj)`.

Existe o método `Object.fromEntries` que faz o inverso: dado um array de pares `[chave, valor]`, ele cria um objeto a partir deles:

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// agora prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

Podemos usar `Object.fromEntries` para obter um objeto simples a partir de um `Map`.

Por exemplo, armazenamos os dados em um `Map`, mas precisamos passá-los para um código de terceiros que espera um objeto simples.

Aqui está:

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

*!*
let obj = Object.fromEntries(map.entries()); // cria um objeto simples (*)
*/!*

// feito!
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

Uma chamada para `map.entries()` retorna um iterável de pares chave/valor, exatamente no formato correto para `Object.fromEntries`.

Também podemos tornar a linha `(*)` mais curta:
```js
let obj = Object.fromEntries(map); // omite .entries()
```

Isso é o mesmo, porque `Object.fromEntries` espera um objeto iterável como argumento. Não necessariamente um array. E a iteração padrão para o `map` retorna os mesmos pares chave/valor que o `map.entries()`. Portanto, obtemos um objeto simples com as mesmas chaves/valores do `map`.

## Set

Um [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) é um tipo especial de coleção - "conjunto de valores" (sem chaves), onde cada valor pode ocorrer apenas uma vez.

Seus principais métodos são:

- [`new Set([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) -- cria o conjunto e, se um objeto `iterable` (geralmente um array) for fornecido, copia os valores dele para o conjunto.
- [`set.add(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) -- adiciona um valor e retorna o próprio conjunto.
- [`set.delete(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) -- remove o valor e retorna `true` se o `value` existir no momento da chamada, caso contrário, retorna `false`.
- [`set.has(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) -- retorna `true` se o valor existir no conjunto, caso contrário, retorna `false`.
- [`set.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) -- remove tudo do conjunto.
- [`set.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size) -- representa a contagem de elementos.

A principal característica é que chamadas repetidas de `set.add(value)` com o mesmo valor não fazem nada. Essa é a razão pela qual cada valor aparece em um `Set` apenas uma vez.

Por exemplo, temos visitantes chegando, e gostaríamos de lembrar de todos. Mas visitas repetidas não devem levar a duplicatas. Um visitante deve ser "contado" apenas uma vez.

`Set` é exatamente o que você precisa para isso:

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visitas, alguns usuários vêm várias vezes
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set mantém apenas valores únicos
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (depois Pete e Mary)
}
```

A alternativa ao `Set` poderia ser um array de usuários e o código para verificar duplicatas em cada inserção usando [arr.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find). No entanto, o desempenho seria muito pior, porque esse método percorre todo o array verificando cada elemento. O `Set` é muito mais otimizado internamente para verificações de unicidade.

## Iteration over Set

We can loop over a set either with `for..of` or using `forEach`:

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// the same with forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

Note the funny thing. The callback function passed in `forEach` has 3 arguments: a `value`, then *the same value* `valueAgain`, and then the target object. Indeed, the same value appears in the arguments twice.

That's for compatibility with `Map` where the callback passed `forEach` has three arguments. Looks a bit strange, for sure. But this may help to replace `Map` with `Set` in certain cases with ease, and vice versa.

The same methods `Map` has for iterators are also supported:

- [`set.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/keys) -- returns an iterable object for values,
- [`set.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values) -- same as `set.keys()`, for compatibility with `Map`,
- [`set.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries) -- returns an iterable object for entries `[value, value]`, exists for compatibility with `Map`.

## Summary

[`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) -- is a collection of keyed values.

Methods and properties:

- [`new Map([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) -- creates the map, with optional `iterable` (e.g. array) of `[key,value]` pairs for initialization.
- [`map.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) -- stores the value by the key, returns the map itself.
- [`map.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) -- returns the value by the key, `undefined` if `key` doesn't exist in map.
- [`map.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) -- returns `true` if the `key` exists, `false` otherwise.
- [`map.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) -- removes the element by the key, returns `true` if `key` existed at the moment of the call, otherwise `false`.
- [`map.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) -- removes everything from the map.
- [`map.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size) -- returns the current element count.

The differences from a regular `Object`:

- Any keys, objects can be keys.
- Additional convenient methods, the `size` property.

[`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) -- is a collection of unique values.

Methods and properties:

- [`new Set([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) -- creates the set, with optional `iterable` (e.g. array) of values for initialization.
- [`set.add(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) -- adds a value (does nothing if `value` exists), returns the set itself.
- [`set.delete(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) -- removes the value, returns `true` if `value` existed at the moment of the call, otherwise `false`.
- [`set.has(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) -- returns `true` if the value exists in the set, otherwise `false`.
- [`set.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) -- removes everything from the set.
- [`set.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size) -- is the elements count.

Iteration over `Map` and `Set` is always in the insertion order, so we can't say that these collections are unordered, but we can't reorder elements or directly get an element by its number.
