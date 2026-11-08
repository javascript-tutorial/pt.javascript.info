
# WeakMap e WeakSet

Como vimos no capítulo <info:garbage-collection>, o motor do JavaScript mantém um valor na memória enquanto ele é "alcançável" e pode, potencialmente, ser usado.

Por exemplo:

```js
let john = { name: "John" };

// o objeto pode ser acessado, john é a referência para ele

// sobrescreve a referência
john = null;

*!*
// o objeto será removido da memória
*/!*
```

Geralmente, propriedades de um objeto ou elementos de um array ou outra estrutura de dados são considerados alcançáveis e permanecem na memória enquanto essa estrutura de dados estiver na memória.

Por exemplo, se colocamos um objeto dentro de um array, então, enquanto o array estiver vivo, o objeto também estará vivo, mesmo que não haja mais nenhuma outra referência a ele.

Assim:

```js
let john = { name: "John" };

let array = [ john ];

john = null; // sobrescreve a referência

*!*
// o objeto anteriormente referenciado por john está guardado dentro do array,
// por isso ele não será removido pelo coletor de lixo
// podemos obtê-lo através de array[0]
*/!*
```

De forma parecida, se usamos um objeto como chave em um `Map` comum, então, enquanto o `Map` existir, esse objeto também vai existir. Ele ocupa memória e pode não ser removido pela coleta de lixo.

Por exemplo:

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // sobrescreve a referência

*!*
// john está guardado dentro do map,
// podemos obtê-lo usando map.keys()
*/!*
```

[`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) é fundamentalmente diferente nesse aspecto. Ele não impede que os objetos usados como chave sejam removidos pelo coletor de lixo.

Vamos ver o que isso significa através de exemplos.

## WeakMap

A primeira diferença entre [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) e [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) é que as chaves precisam ser objetos, não valores primitivos:

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // funciona bem (chave é um objeto)

*!*
// não podemos usar uma string como chave
weakMap.set("test", "Whoops"); // Erro, porque "test" não é um objeto
*/!*
```

Agora, se usamos um objeto como chave nele, e não existe mais nenhuma outra referência a esse objeto -- ele será removido da memória (e do `WeakMap`) automaticamente.

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // sobrescreve a referência

// john é removido da memória!
```

Compare isso com o exemplo do `Map` comum, visto acima. Agora, se `john` existe apenas como chave do `WeakMap` -- ele será automaticamente removido do `WeakMap` (e da memória).

O `WeakMap` não suporta iteração nem os métodos `keys()`, `values()`, `entries()`, então não há como obter todas as chaves ou valores dele.

O `WeakMap` tem apenas os seguintes métodos:

- [`weakMap.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/set)
- [`weakMap.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/get)
- [`weakMap.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/delete)
- [`weakMap.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/has)

Por que essa limitação? É por motivos técnicos. Se um objeto perdeu todas as outras referências (como `john` no código acima), ele deve ser removido automaticamente pela coleta de lixo. Mas, tecnicamente, não é exatamente especificado *quando a limpeza acontece*.

Quem decide isso é o motor do JavaScript. Ele pode escolher fazer a limpeza de memória imediatamente, ou esperar e fazer a limpeza mais tarde, quando mais remoções acontecerem. Então, tecnicamente, a quantidade atual de elementos de um `WeakMap` não é conhecida. O motor pode ter limpado tudo, ou nada, ou feito isso parcialmente. Por esse motivo, os métodos que acessam todas as chaves/valores não são suportados.

Agora, onde precisamos de uma estrutura de dados assim?

## Caso de uso: dados adicionais

A principal área de aplicação do `WeakMap` é um *armazenamento de dados adicional*.

Se estamos trabalhando com um objeto que "pertence" a outro código, talvez até a uma biblioteca de terceiros, e gostaríamos de guardar alguns dados associados a ele, que devem existir apenas enquanto o objeto estiver vivo -- então o `WeakMap` é exatamente o que precisamos.

Colocamos os dados em um `WeakMap`, usando o objeto como chave, e quando o objeto é removido pela coleta de lixo, esses dados também desaparecem automaticamente.

```js
weakMap.set(john, "documentos secretos");
// se john morrer, os documentos secretos serão destruídos automaticamente
```

Vamos ver um exemplo.

Por exemplo, temos um código que mantém uma contagem de visitas de usuários. A informação é guardada em um `Map`: um objeto de usuário é a chave, e a contagem de visitas é o valor. Quando um usuário vai embora (seu objeto é removido pela coleta de lixo), não queremos mais guardar a contagem de visitas dele.

Aqui está um exemplo de uma função de contagem usando `Map`:

```js
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: usuário => contagem de visitas

// aumenta a contagem de visitas
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

E aqui está outra parte do código, talvez em outro arquivo, que usa essa função:

```js
// 📁 main.js
let john = { name: "John" };

countUser(john); // conta a visita dele

// mais tarde, john vai embora
john = null;
```

Agora, o objeto `john` deveria ser removido pela coleta de lixo, mas permanece na memória, pois é uma chave em `visitsCountMap`.

Precisamos limpar o `visitsCountMap` quando removemos usuários, senão ele vai crescer indefinidamente na memória. Essa limpeza pode se tornar uma tarefa bem cansativa em arquiteturas complexas.

Podemos evitar isso trocando para `WeakMap`:

```js
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: usuário => contagem de visitas

// aumenta a contagem de visitas
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

Agora não precisamos mais limpar o `visitsCountMap`. Depois que o objeto `john` se torna inalcançável por qualquer outro meio, exceto como chave do `WeakMap`, ele é removido da memória, junto com a informação associada a essa chave no `WeakMap`.

## Caso de uso: cache

Outro exemplo comum é o cache. Podemos guardar em cache os resultados de uma função, para que chamadas futuras sobre o mesmo objeto possam reaproveitá-los.

Para conseguir isso, podemos usar `Map` (não é o cenário ideal):

```js run
// 📁 cache.js
let cache = new Map();

// calcula e guarda o resultado
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* cálculo do resultado para */ obj;

    cache.set(obj, result);
    return result;
  }

  return cache.get(obj);
}

*!*
// Agora usamos process() em outro arquivo:
*/!*

// 📁 main.js
let obj = {/* digamos que temos um objeto */};

let result1 = process(obj); // calculado

// ...mais tarde, em outro lugar do código...
let result2 = process(obj); // resultado lembrado, pego do cache

// ...mais tarde, quando o objeto não é mais necessário:
obj = null;

alert(cache.size); // 1 (Ops! O objeto ainda está no cache, ocupando memória!)
```

Em múltiplas chamadas de `process(obj)` com o mesmo objeto, o resultado só é calculado na primeira vez, e depois é apenas obtido do `cache`. A desvantagem é que precisamos limpar o `cache` quando o objeto não for mais necessário.

Se trocarmos o `Map` por `WeakMap`, esse problema desaparece. O resultado em cache será removido automaticamente da memória depois que o objeto for removido pela coleta de lixo.

```js run
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

// calcula e guarda o resultado
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calcula o resultado para */ obj;

    cache.set(obj, result);
    return result;
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* algum objeto */};

let result1 = process(obj);
let result2 = process(obj);

// ...mais tarde, quando o objeto não é mais necessário:
obj = null;

// Não dá pra pegar cache.size, já que é um WeakMap,
// mas ele é 0 ou logo será 0
// Quando obj for removido pela coleta de lixo, os dados em cache também serão removidos
```

## WeakSet

[`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) se comporta de forma parecida:

- É análogo ao `Set`, mas só podemos adicionar objetos ao `WeakSet` (não primitivos).
- Um objeto existe no `WeakSet` enquanto for alcançável de algum outro lugar.
- Assim como o `Set`, ele suporta [`add`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/add), [`has`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/has) e [`delete`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/delete), mas não `size`, `keys()`, e não há iterações.

Por ser "weak" (fraco), ele também serve como armazenamento adicional. Mas não para dados arbitrários, e sim para fatos do tipo "sim/não". A presença de um objeto em um `WeakSet` pode significar algo sobre esse objeto.

Por exemplo, podemos adicionar usuários a um `WeakSet` para controlar quem visitou nosso site:

```js run
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John nos visitou
visitedSet.add(pete); // Depois Pete
visitedSet.add(john); // John de novo

// visitedSet agora tem 2 usuários

// John nos visitou?
alert(visitedSet.has(john)); // true

// Mary nos visitou?
alert(visitedSet.has(mary)); // false

john = null;

// visitedSet será limpo automaticamente
```

A limitação mais notável de `WeakMap` e `WeakSet` é a ausência de iterações, e a impossibilidade de obter todo o conteúdo atual. Isso pode parecer inconveniente, mas não impede que `WeakMap`/`WeakSet` cumpram seu principal objetivo -- serem um armazenamento "adicional" de dados para objetos que são guardados/gerenciados em outro lugar.

## Resumo

[`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) é uma coleção parecida com `Map` que permite apenas objetos como chaves, e os remove, junto com o valor associado, assim que se tornam inacessíveis por outros meios.

[`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) é uma coleção parecida com `Set` que guarda apenas objetos, e os remove assim que se tornam inacessíveis por outros meios.

Sua principal vantagem é que eles têm uma referência fraca aos objetos, então eles podem ser facilmente removidos pela coleta de lixo.

Isso tem um custo: não há suporte para `clear`, `size`, `keys`, `values`...

`WeakMap` e `WeakSet` são usados como estruturas de dados "secundárias", complementando o armazenamento "principal" de objetos. Assim que o objeto é removido do armazenamento principal, se ele só for encontrado como chave de um `WeakMap` ou dentro de um `WeakSet`, ele será limpo automaticamente.
