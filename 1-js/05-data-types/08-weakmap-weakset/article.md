# WeakMap e WeakSet

Como sabemos do capítulo <info:garbage-collection>, o mecanismo JavaScript armazena um valor na memória enquanto está acessível (e pode ser potencialmente usado).

Por exemplo:
```js
let john = { name: "John" };

// o objeto pode ser acessado, john é a referência a ele

// substituir a referência
john = null;

*!*
// o objeto será removido da memória
*/!*
```

Geralmente, as propriedades de um objeto ou elementos de um array ou outra estrutura de dados são consideradas acessíveis e mantidas na memória enquanto essa estrutura de dados está na memória.

Por exemplo, se colocarmos um objeto em um array, enquanto o array estiver ativo, o objeto também estará ativo, mesmo que não haja outras referências a ele.

Como isso:

```js
let john = { name: "John" };

let array = [ john ];

john = null; // substitui a referência

*!*
// john é armazenado dentro do array, então não será coletado como lixo
// podemos obtê-lo com array[0]
*/!*
```

Semelhante a isso, se usarmos um objeto como chave em um `Map` comum, enquanto o `Map` existir, esse objeto também existirá. Ele ocupa memória e não pode ser coletado como lixo.

Por exemplo:

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // substitui a referência

*!*
// john é armazenado dentro do map,
// podemos obtê-lo usando map.keys()
*/!*
```

`WeakMap` é fundamentalmente diferente nesse aspecto. Não impede a coleta de lixo dos objetos chave.

Vamos ver o que isso significa em exemplos.

## WeakMap

A primeira diferença do `Map` é que as chaves do `WeakMap` devem ser objetos, não valores primitivos:

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // funciona bem (chave de objeto)

*!*
// não pode usar uma string como chave
weakMap.set("test", "Whoops"); // Erro, porque "test" não é um objeto
*/!*
```

Agora, se usarmos um objeto como a chave nele, e não houver outras referências a esse objeto - ele será removido da memória (e do map) automaticamente.

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // substitui a referência

// john é removido da memória!
```

Compare-o com o exemplo do `Map` normal acima. Agora, se o `john` existir apenas como a chave do `WeakMap` - ele será excluído automaticamente do map (e da memória).

`WeakMap` não suporta iteração e os métodos `keys()`, `values()`, `entries()`, portanto, não há como obter todas as chaves ou valores dele.

`WeakMap` possui apenas os seguintes métodos:

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key)`
- `weakMap.has(key)`

Por que essa limitação? Isso é por razões técnicas. Se um objeto perdeu todas as outras referências (como `john` no código acima), ele deve ser coletado como lixo automaticamente. Mas tecnicamente não é exatamente especificado *quando a limpeza ocorre*.

O mecanismo JavaScript decide isso. Pode optar por executar a limpeza da memória imediatamente ou esperar e fazer a limpeza mais tarde, quando ocorrerem mais exclusões. Portanto, tecnicamente, a contagem atual de elementos de um `WeakMap` não é conhecida. O motor pode ter limpado ou não, ou parcialmente. Por esse motivo, os métodos que acessam todas as chaves/valores não são suportados.

Agora, onde precisamos dessa estrutura de dados?

## Caso de uso: dados adicionais

A principal área de aplicação do `WeakMap` é um *armazenamento de dados adicional*.

Se estivermos trabalhando com um objeto que "pertence" a outro código, talvez até uma biblioteca de terceiros, e que deseje armazenar alguns dados associados a ele, que só devem existir enquanto o objeto estiver ativo - então `WeakMap` é exatamente o que é necessário.

Colocamos os dados em um `WeakMap`, usando o objeto como chave e, quando o objeto é coletado de lixo, esses dados desaparecem automaticamente também.

```js
weakMap.set(john, "secret documents");
// se john morrer, documentos secretos serão destruídos automaticamente
```

Vejamos um exemplo.

Por exemplo, temos um código que mantém uma contagem de visitas para os usuários. As informações são armazenadas em um map: um objeto de usuário é a chave e a contagem de visitas é o valor. Quando um usuário sai (seu objeto é coletado como lixo), não queremos mais armazenar a contagem de visitas.

Aqui está um exemplo de uma função de contagem com `Map`:

```js
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: usuário => contador de visitas

// aumentar a contagem de visitas
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

E aqui está outra parte do código, talvez outro arquivo usando-o:

```js
// 📁 main.js
let john = { name: "John" };

countUser(john); // conta as visitas dele
countUser(john);

// depois john nos deixa
john = null;
```

Agora, o objeto `john` deve ser coletado como lixo, mas permanece na memória, pois é uma chave no` visitsCountMap`.

Precisamos limpar o `visitsCountMap` quando removermos os usuários, caso contrário, ele crescerá na memória indefinidamente. Essa limpeza pode se tornar uma tarefa tediosa em arquiteturas complexas.

Podemos evitar isso mudando para `WeakMap`:

```js
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: usuário => contador de visitas

// aumenta a contagem de visitas
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

Agora não precisamos limpar o `visitsCountMap`. Depois que o objeto `john` se torna inacessível por todos os meios, exceto como uma chave do `WeakMap`, ele é removido da memória, junto com as informações dessa chave do `WeakMap`.

## Caso de uso: armazenamento em cache

Outro exemplo comum é o armazenamento em cache: quando um resultado de função deve ser lembrado ("em cache"), para que futuras chamadas no mesmo objeto o reutilizem.

Podemos usar o `Map` para armazenar resultados, assim:

```js run
// 📁 cache.js
let cache = new Map();

// calcula e lembra o resultado
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* cálculos do resultado para */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

*!*
// Agora usamos process() em outro arquivo:
*/!*

// 📁 main.js
let obj = {/* digamos que temos um objeto */};

let result1 = process(obj); // calculado

// ...depois, de outro lugar do código...
let result2 = process(obj); // resultado lembrado retirado do cache

// ...depois, quando o objeto não for mais necessário:
obj = null;

alert(cache.size); // 1 (Ai! O objeto ainda está no cache, ocupando memória!)
```

Para várias chamadas de `process(obj)` com o mesmo objeto, ele apenas calcula o resultado na primeira vez e depois o pega do `cache`. A desvantagem é que precisamos limpar o `cache` quando o objeto não for mais necessário.

Se substituirmos `Map` por `WeakMap`, esse problema desaparecerá: o resultado em cache será removido da memória automaticamente depois que o objeto for coletado como lixo.

```js run
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

// calcula e lembra o resultado
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* cálculos do resultado para */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* algum objeto */};

let result1 = process(obj);
let result2 = process(obj);

// ...depois, quando o objeto não for mais necessário:
obj = null;

// Não é possível obter o cache.size, pois é um WeakMap,
// mas é 0 ou logo será 0
// Quando obj for coletado como lixo, os dados em cache também são removidos
```

## WeakSet

`WeakSet` comporta-se da mesma forma:

- É análogo ao `Set`, mas só podemos adicionar objetos ao` WeakSet` (não primitivos).
- Um objeto existe no set enquanto está acessível em outro lugar.
- Como o `Set`, ele suporta `add`, `has` e `delete`, mas não `size`, `keys()` e nenhuma iteração.

Sendo "fraco", também serve como armazenamento adicional. Mas não para dados arbitrários, mas para fatos "sim/não". A associação ao `WeakSet` pode significar algo sobre o objeto.

Por exemplo, podemos adicionar usuários ao `WeakSet` para acompanhar quem visitou nosso site:

```js run
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John nos visitou
visitedSet.add(pete); // Depois Pete
visitedSet.add(john); // John denovo

// visitedSet possui 2 usuários agora

// verificar se John visitou?
alert(visitedSet.has(john)); // true

// verificar se Maria visitou?
alert(visitedSet.has(mary)); // false

john = null;

// visitedSet será limpo automaticamente
```

A limitação mais notável de `WeakMap` e `WeakSet` é a ausência de iterações e a incapacidade de obter todo o conteúdo atual. Isso pode parecer inconveniente, mas não impede que o `WeakMap/WeakSet` faça seu trabalho principal - seja um armazenamento "adicional" de dados para objetos que são armazenados/gerenciados em outro local.

## Resumo

`WeakMap` é uma coleção semelhante a `Map` que permite apenas objetos como chaves e os remove junto com o valor associado quando eles se tornam inacessíveis por outros meios.

`WeakSet` é uma coleção semelhante a `Set` que armazena apenas objetos e os remove quando se tornam inacessíveis por outros meios.

Ambos não oferecem suporte a métodos e propriedades que se referem a todas as chaves ou a sua contagem. Somente operações individuais são permitidas.

`WeakMap` e `WeakSet` são usados ​​como estruturas de dados "secundárias", além do armazenamento de objetos "principal". Depois que o objeto for removido do armazenamento principal, se ele for encontrado apenas como a chave do `WeakMap` ou em um `WeakSet`, ele será limpo automaticamente.
