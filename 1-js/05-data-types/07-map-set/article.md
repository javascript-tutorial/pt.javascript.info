
# Map e Set

Agora, aprendemos sobre as seguintes estruturas de dados complexas:

- Objetos para armazenar coleções com chave.
- Arrays para armazenar coleções ordenadas.

Mas isso não é suficiente para a vida real. É por isso que `Map` e `Set` também existem.

## Map

[Map](mdn:js/Map) é uma coleção de itens de dados com chave, assim como um `Object`. Mas a principal diferença é que `Map` permite chaves de qualquer tipo.

Métodos e propriedades são:

- `new Map()` -- cria o map.
- `map.set(key, value)` -- armazena o valor pela chave.
- `map.get(key)` -- retorna o valor pela chave, `undefined` se `key` não existe no map.
- `map.has(key)` -- retorna `true` se a `key` existe, `false` caso contrário.
- `map.delete(key)` -- remove o valor pela chave.
- `map.clear()` -- remove tudo do map.
- `map.size` -- retorna a contagem atual de elementos.

Por exemplo:

```js run
let map = new Map();

map.set('1', 'str1');   // uma chave de string
map.set(1, 'num1');     // uma chave numérica
map.set(true, 'bool1'); // uma chave booleana

// lembra do objeto normal? converteria chaves em string
// Map mantém o tipo, portanto, esses dois são diferentes:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

Como podemos ver, diferentemente dos objetos, as chaves não são convertidas em strings. Qualquer tipo de chave é possível.

**Map também pode usar objetos como chaves.**

Por exemplo:

```js run
let john = { name: "John" };

// para cada usuário, vamos armazenar sua contagem de visitas
let visitsCountMap = new Map();

// john é a chave para o map
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

Usar objetos como chaves é um dos recursos mais importantes do `Map`. Para chaves de string, o `Object` pode ser bom, mas não para chaves de objeto.

Vamos tentar:

```js run
let john = { name: "John" };

let visitsCountObj = {}; // tente usar um objeto

visitsCountObj[john] = 123; // tente usar o objeto john como a chave

*!*
// Foi isso que foi escrito!
alert( visitsCountObj["[object Object]"] ); // 123
*/!*
```

Como `visitsCountObj` é um objeto, ele converte todas as chaves, como `john` em strings, então temos a chave de string `"[object Object]"`. Definitivamente não é o que queremos.

```smart header="Como `Map` compara chaves"
Para testar chaves para equivalência, `Map` usa o algoritmo [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). É aproximadamente o mesmo que igualdade estrita `===`, mas a diferença é que `NaN` é considerado igual a `NaN`. Então `NaN` também pode ser usado como chave.

Este algoritmo não pode ser alterado ou personalizado.
```

````smart header="Encadeamento"
Toda chamada `map.set` retorna o próprio map, então podemos "encadear" as chamadas:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````


## Iteração sobre Map

Para fazer um loop sobre um `map`, existem 3 métodos:

- `map.keys()` -- retorna um iterável para chaves,
- `map.values()` -- retorna um iterável para valores,
- `map.entries()` -- retorna um iterável para entradas `[key, value]`, é usado por padrão em `for..of`.

Por exemplo:

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// itera sobre chaves (vegetais)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// itera sobre valores (quantidades)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// itera sobre entradas [key, value]
for (let entry of recipeMap) { // o mesmo que de recipeMap.entries()
  alert(entry); // cucumber,500 (e assim por diante)
}
```

```smart header="O pedido de inserção é usado"
A iteração segue na mesma ordem em que os valores foram inseridos. `Map` preserva essa ordem, diferentemente de `Object`.
```

Além disso, o `Map` possui um método interno `forEach`, semelhante ao `Array`:

```js
// executa a função para cada par (key, value)
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 etc
});
```

## Object.entries: Map a partir de Object

Quando um `Map` é criado, podemos passar um array (ou outro iterável) com pares de chave/valor para inicialização, assim:

```js run
// array de pares [key, value]
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```

Se temos um objeto simples e gostaríamos de criar um `Map` a partir dele, podemos usar o método interno [Object.entries(obj)](mdn:js/Object/entries) que retorna um array de pares de chave/valor para um objeto exatamente nesse formato.

Então, podemos criar um mapa a partir de um objeto como este:

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

Aqui, `Object.entries` retorna o array de pares chave/valor: `[ ["name","John"], ["age", 30] ]`. É disso que o `Map` precisa.


## Object.fromEntries: Object a partir de um Map

Acabamos de ver como criar o `Map` a partir de um objeto simples com `Object.entries(obj)`.

Existe o método `Object.fromEntries` que faz o inverso: dado um array de pares `[chave, valor]`, ele cria um objeto a partir deles:

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// now prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

Podemos usar `Object.fromEntries` para obter um objeto simples de `Map`.

Por exemplo. nós armazenamos os dados em um `Map`, mas precisamos passá-los para um código de terceiros que espera um objeto simples.

Aqui vamos nós:

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

*!*
let obj = Object.fromEntries(map.entries()); // faz um objeto simples (*)
*/!*

// feito!
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

Uma chamada para `map.entries()` retorna um array de pares de chave/valor, exatamente no formato correto para `Object.fromEntries`.

Nós também poderíamos fazer a linha`(*)` mais curta:
```js
let obj = Object.fromEntries(map); // omitimos .entries()
```

É o mesmo, porque `Object.fromEntries` espera um objeto iterável como argumento. Não necessariamente um array. E a iteração padrão para `map` retorna os mesmos pares de chave/valor que `map.entries()`. Portanto, obtemos um objeto simples com a mesma chave/valores que o `map`.

## Set

Um `Set` é um tipo de coleção especial - "conjunto de valores" (sem chaves), onde cada valor pode ocorrer apenas uma vez.

Seus principais métodos são:

- `new Set(iterable)` -- cria o set e, se um objeto iterável for fornecido (geralmente um array), copia os valores dele para o set.
- `set.add(value)` -- adiciona um valor, retorna o set em si.
- `set.delete(value)` -- remove o valor, retorna `true` se existisse `value` no momento da chamada, caso contrário, `false`.
- `set.has(value)` -- retorna `true` se o valor existir no set, caso contrário,`false`.
- `set.clear()` -- remove tudo do set.
- `set.size` -- é a contagem de elementos.

A principal característica é que chamadas repetidas de `set.add(value)` com o mesmo valor não fazem nada. Essa é a razão pela qual cada valor aparece em um `Set` apenas uma vez.

Por exemplo, temos visitantes chegando e gostaríamos de lembrar de todos. Mas visitas repetidas não devem levar a duplicatas. Um visitante deve ser "contado" apenas uma vez.

`Set` é a coisa certa para isso:

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

A alternativa ao `Set` pode ser um array de usuários e o código para verificar se há duplicatas em cada inserção usando [arr.find](mdn:js/Array/find). Mas o desempenho seria muito pior, porque esse método percorre todo array verificando todos os elementos. O `Set` é muito melhor otimizado internamente para verificações de exclusividade.

## Iteração sobre Set

Podemos fazer um loop sobre um set com `for..of` ou usando `forEach`:

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// o mesmo com forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

Observe a coisa engraçada. A função de retorno de chamada passada em `forEach` possui 3 argumentos: um valor `value`, então *o mesmo valor* `valueAgain` e, em seguida, o objeto de destino. De fato, o mesmo valor aparece nos argumentos duas vezes.

Isso é para compatibilidade com `Map` onde a callback passada para `forEach` possui três argumentos. Parece um pouco estranho, com certeza. Mas pode ajudar a substituir o `Map` por `Set` em alguns casos com facilidade e vice-versa.

Os mesmos métodos que o `Map` possui para iteradores também são suportados:

- `set.keys()` -- retorna um objeto iterável para valores,
- `set.values()` -- igual a `set.keys()`, para compatibilidade com `Map`,
- `set.entries()` -- retorna um objeto iterável para as entradas `[valor, valor]`, existe para compatibilidade com `Map`.

## Resumo

`Map` -- é uma coleção de valores com chave.

Métodos e propriedades:

- `new Map([iterable])` -- cria o map, com `iterable` opcional (por exemplo array) de pares `[chave,valor]` para inicialização.
- `map.set(key, value)` -- armazena o valor pela chave.
- `map.get(key)` -- retorna o valor pela chave, `undefined` se `key` não existir no map.
- `map.has(key)` -- retorna `true` se `key` existe, `false` caso contrário.
- `map.delete(key)` -- remove o valor pela chave.
- `map.clear()` -- remove tudo do map.
- `map.size` -- retorna a contagem atual de elementos.

As diferenças em relação a um `Object`:

- Quaisquer chaves, objetos podem ser chaves.
- Métodos convenientes adicionais, a propriedade `size`.

`Set` -- é uma coleção de valores únicos.

Métodos e propriedades:

- `new Set([iterable])` -- cria o set, com um `iterable` opcional (por exemplo array) de valores para inicialização.
- `set.add(value)` -- adiciona um valor (não faz nada se já existir `value`), retorna o set em si.
- `set.delete(value)` -- remove o valor, retorna `true` se `value` existia no momento da chamada, caso contrário `false`.
- `set.has(value)` -- retorna `true` se o valor existe no set, caso contrário `false`.
- `set.clear()` -- remove tudo do set.
- `set.size` -- é a contagem de elementos.

A iteração sobre `Map` e `Set` está sempre na ordem de inserção, portanto, não podemos dizer que essas coleções não são ordenadas, mas não podemos reordenar elementos ou obter diretamente um elemento por seu número.
