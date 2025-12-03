
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

## Iteração sobre o Set

Podemos fazer um loop sobre um conjunto tanto com `for..of` quanto usando `forEach`:

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// o mesmo com forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

Observe a coisa curiosa. A função de retorno de chamada passada no `forEach` tem 3 argumentos: um `value`, em seguida, *o mesmo valor* `valueAgain`, e depois o objeto de destino. Na verdade, o mesmo valor aparece nos argumentos duas vezes.

Isso é para compatibilidade com o `Map`, onde a função de retorno de chamada passada no `forEach` tem três argumentos. Parece um pouco estranho, com certeza. Mas isso pode ajudar a substituir `Map` por `Set` em determinados casos com facilidade, e vice-versa.

Os mesmos métodos que o `Map` tem para iteradores também são suportados:

- [`set.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/keys) -- retorna um objeto iterável para valores,
- [`set.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values) -- o mesmo que `set.keys()`, para compatibilidade com `Map`,
- [`set.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries) -- retorna um objeto iterável para entradas `[valor, valor]`, existe para compatibilidade com `Map`.

## Resumo

[`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) -- é uma coleção de valores indexados.

Métodos e propriedades:

- [`new Map([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) -- cria o mapa, com um `iterable` opcional (por exemplo, array) de pares `[chave, valor]` para inicialização.
- [`map.set(chave, valor)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) -- armazena o valor pela chave e retorna o próprio mapa.
- [`map.get(chave)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) -- retorna o valor pela chave, `undefined` se a `chave` não existir no mapa.
- [`map.has(chave)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) -- retorna `true` se a `chave` existir, `false` caso contrário.
- [`map.delete(chave)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) -- remove o elemento pela chave e retorna `true` se a `chave` existir no momento da chamada, caso contrário, `false`.
- [`map.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) -- remove tudo do mapa.
- [`map.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size) -- retorna a contagem atual de elementos.

As diferenças em relação a um objeto normal (`Object`):

- Qualquer chave, objetos também podem ser chaves.
- Métodos adicionais convenientes e a propriedade `size`.

[`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) -- é uma coleção de valores únicos.

Métodos e propriedades:

- [`new Set([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) -- cria o conjunto, com um `iterable` opcional (por exemplo, array) de valores para inicialização.
- [`set.add(valor)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) -- adiciona um valor (não faz nada se o `valor` já existir) e retorna o próprio conjunto.
- [`set.delete(valor)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) -- remove o valor e retorna `true` se o `valor` existir no momento da chamada, caso contrário, `false`.
- [`set.has(valor)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) -- retorna `true` se o valor existir no conjunto, caso contrário, `false`.
- [`set.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) -- remove tudo do conjunto.
- [`set.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size) -- representa a contagem de elementos.

A iteração sobre `Map` e `Set` sempre segue a ordem de inserção, então não podemos dizer que essas coleções são desordenadas. No entanto, não podemos reordenar os elementos ou obter um elemento diretamente pelo seu número.
