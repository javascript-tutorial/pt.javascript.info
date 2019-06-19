
# Map, Set, WeakMap e WeakSet

Agora já aprendemos sobre as seguintes estruturas de dados complexas:

- Objetos para armazenar coleções com chave.
- Arrays para armazenar coleções ordenadas.

Mas isso não é suficiente para a vida real. É por isso que `Map` e `Set` também existem.

## Map

[Map](mdn:js/Map) é uma coleção de itens de dados com chave, assim como um `Objeto`. Mas a principal diferença é que o `Map` permite chaves de qualquer tipo.

Os principais métodos são:

- `new Map()` -- cria o map.
- `map.set(key, value)` -- armazena o valor (value) pela chave (key).
- `map.get(key)` -- retorna o valor (value) pela chave (key), `undefined` se `key` não existe no map.
- `map.has(key)` -- retorna `true` se a `key` existe, `false` caso contrário.
- `map.delete(key)` -- remove o valor pela chave (key).
- `map.clear()` -- limpa o map.
- `map.size` -- retorna a atual contagem de elementos.

Por exemplo:

```js run
let map = new Map();

map.set('1', 'str1');   // uma chave string
map.set(1, 'num1');     // uma chave numérica
map.set(true, 'bool1'); // uma chave booleana

// lembra do Objeto regular? ele converteria chaves em string
// Map mantém o tipo, então esses dois são diferentes:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

Como podemos ver, ao contrário dos objetos, as chaves não são convertidas em strings. Qualquer tipo de chave é possível.

**Map também pode usar objetos como chaves.**

Por exemplo:
```js run
let john = { name: "John" };

// para cada usuário, vamos armazenar suas visitas
let visitsCountMap = new Map();

// john é a chave para o map
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

Usar objetos como chaves é um dos recursos mais notáveis ​​e importantes do `Map`. Para chaves de string, o `Object` pode ser bom, mas seria difícil substituir o `Map` por um `Object` regular no exemplo acima.

Vamos tentar:

```js run
let john = { name: "John" };

let visitsCountObj = {}; // tenta usar um objeto

visitsCountObj[john] = 123; // tenta usar john como chave

*!*
// Isso é o que foi escrito!
alert( visitsCountObj["[object Object]"] ); // 123
*/!*
```

Como `john` é um objeto, ele foi convertido para a string de chave `"[object Object]"`. Todos os objetos sem uma manipulação especial de conversão são convertidos para essa string, então todos eles serão danificados.

Nos tempos antigos, antes da existência do `Map`, as pessoas costumavam adicionar identificadores exclusivos a objetos para isso:

```js run
// adicionamos o campo id
let john = { name: "John", *!*id: 1*/!* };

let visitsCounts = {};

// agora armazenamos o valor por id
visitsCounts[john.id] = 123;

alert( visitsCounts[john.id] ); // 123
```

...Mas `Map` é muito mais elegante.


````smart header="How `Map` compara chaves"
Para testar valores por equivalência, `Map` usa o algorítimo [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). É aproximadamente o mesmo que igualdade estrita `===`, mas a diferença é que `NaN` é considerado igual a `NaN`. Então, `NaN` pode ser usado como chave também.

Este algoritmo não pode ser alterado ou personalizado.
````


````smart header="Encadeamento"

Toda chamada `map.set` retorna o próprio map, então podemos "encadear" as chamadas:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````

## Map a partir de Objeto

Quando um `Map` é criado, podemos passar um array (ou outro iterável) com pares de valor-chave, como este:

```js
// array de pares [key, value]
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);
```

Existe um método integrado [Object.entries(obj)](mdn:js/Object/entries) que retorna um array de pares chave/valor a partir de um objeto exatamente naquele formato.

Então podemos inicializar um map a partir de um objeto como este:

```js
let map = new Map(Object.entries({
  name: "John",
  age: 30
}));
```

Aqui, `Object.entries` retorna o array de pares chave/valor: `[ ["name","John"], ["age", 30] ]`. Isso é o que `Map` precisa.

## Iteração sobre Map

Para fazer um loop em um `map`, existem 3 métodos:

- `map.keys()` -- retorna um iterável para as chaves,
- `map.values()` -- retorna um iterável para os valores,
- `map.entries()` -- retorna um iterável para as entradas `[key, value]`, é usadopor padrão no `for..of`.

Por exemplo:

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// itera sobre as chaves (vegetables)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// itera sobre valores (amounts)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// itera sobre entradas [key, value]
for (let entry of recipeMap) { // o mesmo que recipeMap.entries()
  alert(entry); // cucumber,500 (e assim por diante)
}
```

```smart header="O pedido de inserção é usado"
A iteração segue na mesma ordem em que os valores foram inseridos. `Map` preserva esta ordem, ao contrário de um `Object` regular.
```

Além disso, o `Map` tem um método `forEach` integrado, similar ao `Array`:

```js
// executa a função para cada par (key, value)
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 etc
});
```


## Set

Um `Set` é uma coleção de valores, onde cada valor pode ocorrer apenas uma vez.

Seus principais métodos são:

- `new Set(iterable)` -- cria o set, e se um objeto `iterable` é fornecido (geralmente um array), copia valores dele para dentro do set.
- `set.add(value)` -- adiciona um valor, retorna o próprio set.
- `set.delete(value)` -- remove o valor, retorna `true` se `value` existir no momento da chamada, caso contrário `false`.
- `set.has(value)` -- retorna `true` se o valor existe no set, caso contrário `false`.
- `set.clear()` -- remove tudo do set.
- `set.size` -- é uma contagem de elementos.

Por exemplo, temos visitantes chegando e gostaríamos de lembrar de todos. Mas as visitas repetidas não devem levar a duplicatas. Um visitante deve ser "contado" apenas uma vez.

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
  alert(user.name); // John (então Pete e Mary)
}
```

A alternativa para `Set` poderia ser um array de usuários, e o código para checar por duplicatas em cada inserção usando [arr.find](mdn:js/Array/find). Mas o desempenho seria muito pior, porque esse método percorre todo o array verificando cada elemento. `Set` é muito melhor otimizado internamente para verificações de unicidade.

## Iteração sobre Set

Podemos fazer um loop em um set com o `for..of` ou usando o` forEach`:

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// o mesmo com forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

Note a coisa engraçada. A função de callback passada em `forEach` possui 3 argumentos: um valor, então *novamente um valor*, e então o objeto alvo. De fato, o mesmo valor aparece nos argumentos duas vezes.

Isso é para compatibilidade com o `Map` onde o callback passado `forEach` tem três argumentos. Parece um pouco estranho, com certeza. Mas pode ajudar a substituir `Map` por `Set` em certos casos com facilidade, e vice-versa.

Os mesmos métodos `Map` tem para iteradores também são suportados:

- `set.keys()` - retorna um objeto iterável para valores,
- `set.values​​()` - o mesmo que `set.keys`, para compatibilidade com `Map`,
- `set.entries()` - retorna um objeto iterável para entradas `[value, value]`, existe para compatibilidade com `Map`.

## WeakMap e WeakSet

`WeakSet` é um tipo especial de `Set` que não impede o JavaScript de remover seus itens da memória. `WeakMap` é a mesma coisa para `Map`.

Como sabemos no capítulo <info:garbage-collection>, o mecanismo JavaScript armazena um valor na memória enquanto ele está ao alcance (e pode potencialmente ser usado).

Por exemplo:
```js
let john = { name: "John" };

// o objeto pode ser acessado, john é a referência a ele

// sobrescreve a referência
john = null;

*!*
// o objeto será removido da memória
*/!*
```

Geralmente, as propriedades de um objeto ou elementos de um array ou outra estrutura de dados são consideradas acessíveis e mantidas na memória enquanto essa estrutura de dados está na memória.

Por exemplo, se colocarmos um objeto em um array, enquanto o array estiver vivo, o objeto também estará ativo, mesmo que não haja outras referências a ele.

Tipo isso:

```js
let john = { name: "John" };

let array = [ john ];

john = null; // sobrescreve a referência

*!*
// john é armazenado dentro do array, então não será coletado como lixo
// podemos obtê-lo com array[0]
*/!*
```

Ou, se usarmos um objeto como a chave em um `Map` regular, enquanto o `Map` existir, esse objeto também existe. Ele ocupa a memória e pode não ser coletado como lixo.

Por exemplo:

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // sobrescreve a referência

*!*
// john é armazenado dentro do map,
// podemos obtê-lo usando map.keys()
*/!*
```

`WeakMap/WeakSet` são fundamentalmente diferentes neste aspecto. Eles não impedem a coleta de lixo de objetos-chave.

Vamos explicar isso começando com `WeakMap`.

A primeira diferença do `Map` é que as chaves `WeakMap` devem ser objetos, não valores primitivos:

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // funciona (objeto como chave)

*!*
// não pode usar uma string como chave
weakMap.set("test", "Whoops"); // Erro, porque "test" não é um objeto
*/!*
```

Agora, se usarmos um objeto como a chave nele, e não houver outras referências a esse objeto, ele será removido da memória (e do map) automaticamente.

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // sobrescreve a referência

// john é removido da memória!
```

Compare-o com o exemplo regular de "Map" acima. Agora, se o `john` existir apenas como a chave do `WeakMap` - ele será automaticamente excluído.

`WeakMap` não suporta iteração e métodos `keys()`, `values​​()`, `entries()`, então não há como obter todas as chaves ou valores a partir dele.

`WeakMap` possui apenas os seguintes métodos:

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key)`
- `weakMap.has(key)`

Por que tal limitação? Isso é por razões técnicas. Se um objeto perdeu todas as outras referências (como `john` no código acima), então ele deve ser coletado automaticamente. Mas tecnicamente não é exatamente especificado *quando a limpeza acontece*.

O mecanismo JavaScript decide isso. Pode optar por executar a limpeza de memória imediatamente ou aguardar e fazer a limpeza mais tarde, quando ocorrerem mais exclusões. Então, tecnicamente a contagem de elementos atuais de um `WeakMap` não é conhecida. O motor pode ter limpado ou não, ou parcialmente. Por essa razão, os métodos que acessam o `WeakMap` como um todo não são suportados.

Agora, onde precisamos de tal coisa?

A idéia do `WeakMap` é que podemos armazenar algo para um objeto que deve existir apenas enquanto o objeto existir. Mas nós não forçamos o objeto a viver pelo simples fato de armazenarmos algo para ele.

```js
weakMap.set(john, "secret documents");
// se john morre, documentos secretos serão destruídos automaticamente
```

Isso é útil para situações em que temos um armazenamento principal para os objetos em algum lugar e precisamos manter informações adicionais, que são relevantes apenas enquanto o objeto está vivo.

Vamos ver um exemplo.

Por exemplo, temos código que mantém uma contagem de visitas para cada usuário. As informações são armazenadas em um map: um usuário é a chave e a contagem de visitas é o valor. Quando um usuário sai, não queremos mais armazenar a contagem de visitas.

Uma maneira seria controlar os usuários e, quando eles saírem, limpar o map manualmente:

```js run
let john = { name: "John" };

// map: usuário => contador de visitas
let visitsCountMap = new Map();

// john é a chave para o map
visitsCountMap.set(john, 123);

// agora o john nos deixa, não precisamos mais dele
john = null;

*!*
// mas ainda está no map, precisamos limpá-lo!
*/!*
alert( visitsCountMap.size ); // 1
// e john também está na memória, porque Map o usa como chave
```

Outra maneira seria usar `WeakMap`:

```js
let john = { name: "John" };

let visitsCountMap = new WeakMap();

visitsCountMap.set(john, 123);

// agora o john nos deixa, não precisamos mais dele
john = null;

// não há referências exceto WeakMap,
// então o objeto é removido da memória e do visitsCountMap automaticamente
```

Com um `Map` regular, a limpeza depois que o usuário é deixado torna-se uma tarefa tediosa: não precisamos apenas remover o usuário de seu armazenamento principal (seja uma variável ou um array), mas também precisamos limpar os armazenamentos adicionais como `visitsCountMap`. E pode tornar-se pesado em casos mais complexos quando os usuários são gerenciados em um local do código e a estrutura adicional está em outro local e não está recebendo informações sobre remoções.

```Resumo
O `WeakMap` pode simplificar as coisas, porque é limpo automaticamente. As informações contidas nela, como as visitas, contam no exemplo acima, apenas enquanto o objeto-chave existe.
```

`WeakSet` se comporta de forma similar:

- É análogo a `Set`, mas só podemos adicionar objetos ao `WeakSet` (não primitivos).
- Um objeto existe no set enquanto é alcançável de outro lugar.
- Como `Set`, ele suporta `add`, `has` e `delete`, mas não `size`, `keys()` e nenhuma iteração.

Por exemplo, podemos usá-lo para rastrear se uma mensagem é lida:

```js
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];

// preencha com elementos do array (3 itens)
let unreadSet = new WeakSet(messages);

// use unreadSet para ver se uma mensagem não foi lida
alert(unreadSet.has(messages[1])); // true

// remova-o do set depois de ler
unreadSet.delete(messages[1]); // true

// e quando mudamos nosso histórico de mensagens, o set é limpo automaticamente
messages.shift();

*!*
// não há necessidade de limpar o unreadSet, agora ele tem 2 itens
*/!*
// (embora tecnicamente não saibamos com certeza quando o mecanismo JS limpa)
```

A limitação mais notável de `WeakMap` e` WeakSet` é a ausência de iterações e a incapacidade de obter todo o conteúdo atual. Isso pode parecer inconveniente, mas não impede que o WeakMap/WeakSet execute seu trabalho principal - seja um armazenamento "adicional" de dados para objetos que são armazenados/gerenciados em outro local.

## Resumo

Coleções regulares:
- `Map` -- é uma coleção de valores com chave.

    As diferenças para um `Object`:

    - Quaisquer chaves, objetos podem ser chaves.
    - Itera na ordem de inserção.
    - Métodos convenientes adicionais, a propriedade `size`.

- `Set` -- é uma coleção de valores únicos.

    - Ao contrário de um array, não permite reordenar elementos.
    - Mantém a ordem de inserção.

Coleções que permitem a coleta de lixo:

- `WeakMap` - uma variante do `Map` que permite apenas objetos como chaves e os remove quando ficam inacessíveis por outros meios.

    - Ele não suporta operações na estrutura como um todo: sem `size`, sem `clear()`, sem iterações.

- `WeakSet` - é uma variante do `Set` que apenas armazena objetos e os remove quando eles se tornam inacessíveis por outros meios.

    - Também não suporta `size/clear()` e iterações.

`WeakMap` e `WeakSet` são usados ​​como estruturas de dados "secundárias" além do armazenamento "principal" de objetos. Uma vez que o objeto é removido do armazenamento principal, se for encontrado apenas no `WeakMap/WeakSet`, ele será limpo automaticamente.
