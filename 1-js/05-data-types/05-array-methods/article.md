# Métodos de array

Arrays fornecem muitos métodos. Para facilitar as coisas, neste capítulo eles são divididas em grupos.

## Adicionar/remover itens

Nós já conhecemos métodos que adicionam e removem itens do começo ou do fim:

- `arr.push(...items)` -- adiciona itens ao final,
- `arr.pop()` -- extrai um item do final,
- `arr.shift()` -- extrai um item do início,
- `arr.unshift(...items)` -- adiciona itens ao começo.

Aqui estão alguns outros.

### splice

Como excluir um elemento do array?

Os arrays são objetos, então podemos tentar usar `delete`:

```js run
let arr = ["I", "go", "home"];

delete arr[1]; // remove "go"

alert( arr[1] ); // undefined

// agora arr = ["I",  , "home"];
alert( arr.length ); // 3
```

O elemento foi removido, mas o array ainda tem 3 elementos, podemos ver que `arr.length == 3`.

Isso é natural, porque `delete obj.key` remove um valor pela `chave`. É tudo que faz. Ótimo para objetos. Mas, para arrays, geralmente queremos que o resto dos elementos se desloque e ocupe o lugar livre. Esperamos ter um array menor agora.

Então, métodos especiais devem ser usados.

O método [arr.splice (str)](mdn:js/Array/splice) é um canivete suíço para arrays. Pode fazer tudo: inserir, remover e substituir elementos.

A sintaxe é:

```js
arr.splice(index[, deleteCount, elem1, ..., elemN])
```

Começa da posição `index`: remove os elementos` deleteCount` e depois insere `elem1, ..., elemN` no lugar deles. Retorna o array de elementos removidos.

Este método é fácil de entender por exemplos.

Vamos começar com a exclusão:

```js run
let arr = ["I", "study", "JavaScript"];

*!*
arr.splice(1, 1); // a partir do index 1 remove 1 elemento
*/!*

alert( arr ); // ["I", "JavaScript"]
```

Fácil, certo? A partir do índice `1` ele removeu `1` elemento.

No próximo exemplo, removemos 3 elementos e os substituímos pelos outros dois:

```js run
let arr = [*!*"I", "study", "JavaScript",*/!* "right", "now"];

// remove os 3 primeiros elementos e os substitui por outro
arr.splice(0, 3, "Let's", "dance");

alert( arr ) // agora [*!*"Let's", "dance"*/!*, "right", "now"]
```

Aqui podemos ver que `splice` retorna o array de elementos removidos:

```js run
let arr = [*!*"I", "study",*/!* "JavaScript", "right", "now"];

// remove os 2 primeiros elementos
let removed = arr.splice(0, 2);

alert( removed ); // "I", "study" <-- array de elementos removidos
```

O método `splice` também é capaz de inserir os elementos sem nenhuma remoção. Para isso, precisamos definir `deleteCount` como` 0`:

```js run
let arr = ["I", "study", "JavaScript"];

// a partir do index 2
// delete 0
// então insira "complex" e "language"
arr.splice(2, 0, "complex", "language");

alert( arr ); // "I", "study", "complex", "language", "JavaScript"
```

````smart header="Índices negativos permitidos"
Aqui e em outros métodos de array, índices negativos são permitidos. Eles especificam a posição a partir do final do array, como aqui:

```js run
let arr = [1, 2, 5];

// a partir do index -1 (um passo do final)
// delete 0 elementos,
// então insira 3 e 4
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5
```
````

### slice

O método [arr.slice](mdn:js/Array/slice) é muito mais simples do que o semelhante `arr.splice`.

A sintaxe é:

```js
arr.slice(start, end)
```

Ele retorna um novo array contendo todos os itens a partir do índice `"start"` até `"end"` (não incluindo `"end"`). Tanto `start` quanto `end` podem ser negativos, neste caso a posição do array end é assumida.

Ele funciona como `str.slice`, mas faz subarrays ao invés de substrings.

Por exemplo:

```js run
let str = "test";
let arr = ["t", "e", "s", "t"];

alert( str.slice(1, 3) ); // es
alert( arr.slice(1, 3) ); // e,s

alert( str.slice(-2) ); // st
alert( arr.slice(-2) ); // s,t
```

### concat

O método [arr.concat](mdn:js/Array/concat) une o array com outros arrays e/ou itens.

A sintaxe é:

```js
arr.concat(arg1, arg2...)
```

Aceita qualquer número de argumentos - arrays ou valores.

O resultado é um novo array contendo itens de `arr`, depois `arg1`, `arg2` etc.

Se um argumento é um array ou possui a propriedade `Symbol.isConcatSpreadable`, então todos os seus elementos são copiados. Caso contrário, o argumento em si é copiado.

Por exemplo:

```js run
let arr = [1, 2];

// mescla arr com [3,4]
alert( arr.concat([3, 4])); // 1,2,3,4

// mescla arr com [3,4] e [5,6]
alert( arr.concat([3, 4], [5, 6])); // 1,2,3,4,5,6

// mescla arr com [3,4], em seguida, adiciona os valores 5 e 6
alert( arr.concat([3, 4], 5, 6)); // 1,2,3,4,5,6
```

Normalmente, apenas copia elementos de arrays ("espalha"). Outros objetos, mesmo se parecidos com arrays, são adicionados como um todo:

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  length: 1
};

alert( arr.concat(arrayLike) ); // 1,2,[object Object]
//[1, 2, arrayLike]
```

... Mas se um objeto tipo array tiver a propriedade `Symbol.isConcatSpreadable`, então seus elementos serão adicionados:

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  1: "else",
*!*
  [Symbol.isConcatSpreadable]: true,
*/!*
  length: 2
};

alert( arr.concat(arrayLike) ); // 1,2,something,else
```

## Iterar: forEach

O método [arr.forEach](mdn:js/Array/forEach) permite executar uma função para cada elemento do array.

A sintaxe:
```js
arr.forEach(function(item, index, array) {
  // ... faça algo com item
});
```

Por exemplo, isso mostra cada elemento do array:

```js run
// para cada elemento chame alert
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);
```

E esse código é mais elaborado sobre suas posições no array de destino:

```js run
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} is at index ${index} in ${array}`);
});
```

O resultado da função (se retornar algum) é descartado e ignorado.


## Pesquisando em array

Estes são métodos para procurar por algo em um array.

### indexOf/lastIndexOf e includes

Os métodos [arr.indexOf](mdn:js/Array/indexOf), [arr.lastIndexOf](mdn:js/Array/lastIndexOf) e [arr.includes](mdn:js/Array/includes) têm a mesma sintaxe e fazem essencialmente o mesmo que suas contrapartes de string, mas operam em itens em vez de caracteres:

- `arr.indexOf (item, from)` procura por `item` iniciando no índice `from` e retorna o índice onde foi encontrado, caso contrário `-1`.
- `arr.lastIndexOf (item, from)` - mesmo, mas procura da direita para a esquerda.
- `arr.includes(item, from)` -- procura por `item` iniciando no índice `from`, retorna `true` se econtrar.

Por exemplo:

```js run
let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true
```

Note que os métodos usam a comparação `===`. Então, se procurarmos por 'false', ele encontrará exatamente 'false' e não o zero.

Se quisermos verificar a inclusão e não quisermos saber o índice exato, então o `arr.includes` é preferido.

Além disso, uma pequena diferença de `includes` é que ele lida corretamente com `NaN`, ao contrário de `indexOf/lastIndexOf`:

```js run
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (deveria ser 0, mas a igualdade === não funciona com NaN)
alert( arr.includes(NaN) );// true (correto)
```

### find e findIndex

Imagine que temos um array de objetos. Como encontramos um objeto com a condição específica?

Aqui o método [arr.find](mdn:js/Array/find) é útil.

A sintaxe é:
```js
let result = arr.find(function(item, index, array) {
  // se true é retornado, o item é retornado e a iteração é interrompida
  // para casos falsos retorna undefined
});
```

A função é chamada repetidamente para cada elemento do array:

- `item` é o elemento.
- `index` é o índice.
- `array` é o próprio array.

Se retornar `true`, a busca é parada, o `item` é retornado. Se nada for encontrado, `undefined` será retornado.

Por exemplo, temos um array de usuários, cada um com os campos `id` e `name`. Vamos encontrar aquele com `id == 1`:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1);

alert(user.name); // John
```

Na vida real, arrays de objetos é uma coisa comum, então o método `find` é muito útil.

Note que no exemplo nós fornecemos para `find` a função `item => item.id == 1` com um argumento. Outros argumentos desta função são raramente usados.

O método [arr.findIndex](mdn:js/Array/findIndex) é essencialmente o mesmo, mas retorna o índice onde o elemento foi encontrado ao invés do próprio elemento e o `-1` é retornado quando nada é encontrado.

### filter

O método `find` procura por um único elemento (primeiro) que faz a função retornar `true`.

Se houver muitos, podemos usar [arr.filter (fn)](mdn:js/Array/filter).

A sintaxe é semelhante a `find`, mas o filtro continua a iterar para todos os elementos do array, mesmo que `true` já tenha sido retornado:

```js
let results = arr.filter(function(item, index, array) {
  // se true o item é enviado para results e a iteração continua
  // retorna array vazio para um cenário falso completo
});
```

Por exemplo:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// retorna o array dos dois primeiros usuários
let someUsers = users.filter(item => item.id < 3);

alert(someUsers.length); // 2
```

## Transforme um array

Esta seção é sobre os métodos que transformam ou reordenam o array.


### map

O método [arr.map](mdn:js/Array/map) é um dos mais úteis e frequentemente usados.

A sintaxe é:

```js
let result = arr.map(function(item, index, array) {
// retorna o novo valor em vez do item
})
```

Ele chama a função para cada elemento do array e retorna o array de resultados.

Por exemplo, aqui nós transformamos cada elemento em seu comprimento:

```js run
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6
```

### sort(fn)

O método [arr.sort](mdn:js/Array/sort) coloca o array *em ordem*.

Por exemplo:

```js run
let arr = [ 1, 2, 15 ];

// o método reordena o conteúdo de arr (e retorna)
arr.sort();

alert( arr );  // *!*1, 15, 2*/!*
```

Você notou algo estranho no resultado?

A ordem se tornou `1, 15, 2`. Incorreta. Mas por que?

**Os itens são ordenados como strings por padrão.**

Literalmente, todos os elementos são convertidos em strings e depois comparados. Então, o ordenamento lexicográfico é aplicado e de fato `"2" > "15"`.

Para usar nossa própria ordem de classificação, precisamos fornecer uma função de dois argumentos como o argumento de `arr.sort()`.

A função deve funcionar assim:
```js
function compare(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}
```

Por exemplo:

```js run
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let arr = [ 1, 2, 15 ];

*!*
arr.sort(compareNumeric);
*/!*

alert(arr);  // *!*1, 2, 15*/!*
```

Agora funciona como pretendido.

Vamos nos afastar e pensar o que está acontecendo. O `arr` pode ser array de qualquer coisa, certo? Pode conter números ou strings ou elementos html ou qualquer outra coisa. Nós temos um conjunto de *algo*. Para classificá-lo, precisamos de uma *função de ordenação* que saiba como comparar seus elementos. O padrão é uma ordem de string.

O método `arr.sort(fn)` possui uma implementação incorporada do algoritmo de ordenação. Nós não precisamos nos importar como isso funciona exatamente (um [quicksort](https://en.wikipedia.org/wiki/Quicksort) otimizado  na maior parte do tempo). Ele irá percorrer o array, comparar seus elementos usando a função fornecida e reordená-los, tudo o que precisamos é fornecer o `fn` que faz a comparação.

A propósito, se quisermos saber quais elementos são comparados - nada impede de alertá-los:

```js run
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
});
```

O algoritmo pode comparar um elemento várias vezes no processo, mas tenta fazer o menor número possível de comparações.


````smart header="Uma função de comparação pode retornar qualquer número"
Na verdade, em uma função de comparação só é necessári retornar um número positivo para dizer "maior" e um número negativo para dizer "menos".

Isso permite escrever funções mais curtas:

```js run
let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // *!*1, 2, 15*/!*
```
````

````smart header="Funções arrow são as melhores"
Lembra das [funções arrow](info:function-expressions-arrows#arrow-functions)? Podemos usá-las aqui para uma ordenação simplificada:

```js
arr.sort( (a, b) => a - b );
```

Isso funciona exatamente da mesma forma que a outra versão mais longa acima.
````

### reverse

O método [arr.reverse](mdn:js/Array/reverse) inverte a ordem dos elementos em `arr`.

Por exemplo:

```js run
let arr = [1, 2, 3, 4, 5];
arr.reverse();

alert( arr ); // 5,4,3,2,1
```

Também retorna o array `arr` após a reversão.

### split e join

Aqui está a situação da vida real. Estamos escrevendo um aplicativo de mensagens e a pessoa entra na lista de receptores delimitada por vírgulas: `John, Pete, Mary`. Mas para nós, um array de nomes seria muito mais confortável do que uma única string. Como conseguir isso?

O método [str.split(delim)](mdn:js/String/split) faz exatamente isso. Ele divide a string em um array pelo delimitador dado `delim`.

No exemplo abaixo, dividimos por uma vírgula seguida de espaço:

```js run
let names = 'Bilbo, Gandalf, Nazgul';

let arr = names.split(', ');

for (let name of arr) {
  alert( `A message to ${name}.` ); // Uma menssagem à Bilbo  (e outros nomes)
}
```

O método `split` possui um segundo argumento numérico opcional - um limite no tamanho do array. Se for fornecido, os elementos extras serão ignorados. Na prática, raramente é usado:

```js run
let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

alert(arr); // Bilbo, Gandalf
```

````smart header="Dividido em letras"
A chamada para `split(s)` com um `s` vazio iria dividir a string em um array de letras:

```js run
let str = "test";

alert( str.split('') ); // t,e,s,t
```
````

A chamada [arr.join(separador)](mdn:js/Array/join) faz o contrário de `split`. Cria uma string de itens `arr` colados por `separador` entre eles.

Por exemplo:

```js run
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';');

alert( str ); // Bilbo;Gandalf;Nazgul
```

### reduce/reduceRight

Quando precisamos fazer uma iteração em um array - podemos usar `forEach`, `for` ou `for..of`.

Quando precisamos iterar e retornar os dados para cada elemento, podemos usar o `map`.

Os métodos [arr.reduce](mdn:js/Array/reduce) e [arr.reduceRight](mdn:js/Array/reduceRight) também pertencem a esse tipo, mas são um pouco mais complexos. Eles são usados ​​para calcular um único valor com base no array.

A sintaxe é:

```js
let value = arr.reduce(function(previousValue, item, index, array) {
  // ...
}, initial);
```

A função é aplicada aos elementos. Você pode notar os argumentos familiares, a partir do segundo:

- `item` -- é o item atual do array.
- `index` -- é sua posição position.
- `array` -- é o array.

Até agora, igual a `forEach/map`. Mas há mais um argumento:

- `previousValue` - é o resultado da chamada de função anterior, `inicial` para a primeira chamada.

A maneira mais fácil de entender isso é pelo exemplo.

Aqui nós temos uma soma de array em uma linha:

```js run
let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
```

Aqui nós usamos a variante mais comum de `reduce` que usa apenas 2 argumentos.

Vamos ver os detalhes do que está acontecendo.

1. Na primeira execução, `sum` é o valor inicial (o último argumento de `reduce`), igual a `0` e `current` é o primeiro elemento do array, igual a `1`. Então o resultado é "1".
2. Na segunda execução, `sum = 1`, adicionamos o segundo elemento do array (`2`) a ele e retornamos.
3. Na terceira corrida, `sum = 3` e adicionamos mais um elemento a ele, e assim por diante ...

O fluxo de cálculo:

![](reduce.png)

Ou na forma de uma tabela, em que cada linha representa uma chamada de função no próximo elemento do array:

|   |`sum`|`current`|`result`|
|---|-----|---------|---------|
|a primeira chamada|`0`|`1`|`1`|
|a segunda chamada|`1`|`2`|`3`|
|a terceira chamada|`3`|`3`|`6`|
|a quarta chamada|`6`|`4`|`10`|
|a quinta chamada|`10`|`5`|`15`|


Como podemos ver, o resultado da chamada anterior torna-se o primeiro argumento do próximo.

Nós também podemos omitir o valor inicial:

```js run
let arr = [1, 2, 3, 4, 5];

// removido o valor inicial de reduce (sem 0)
let result = arr.reduce((sum, current) => sum + current);

alert( result ); // 15
```

O resultado é o mesmo. Isso porque se não houver uma inicial, então, `reduce` toma o primeiro elemento do array como o valor inicial e inicia a iteração a partir do segundo elemento.

A tabela de cálculo é a mesma que acima, menos a primeira linha.

Mas tal uso requer um cuidado extremo. Se o array está vazio, então a chamada `reduce` sem valor inicial dá um erro.

Aqui está um exemplo:

```js run
let arr = [];

// Erro: reduce em array vazio sem valor inicial
// se o valor inicial existisse, reduce o retornaria para o arr vazio.
arr.reduce((sum, current) => sum + current);
```


Por isso, é aconselhável sempre especificar o valor inicial.

O método [arr.reduceRight](mdn:js/Array/reduceRight) faz o mesmo, mas vai da direita para a esquerda.


## Array.isArray

Arrays não formam um tipo separado na linguagem. Eles são baseados em objetos.

Então, `typeof` não ajuda a distinguir um objeto simples de um array:

```js run
alert(typeof {}); // object
alert(typeof []); // o mesmo
```

... Mas os arrays são usados ​​com tanta frequência que há um método especial para isso: [Array.isArray (value)](mdn:js/Array/isArray). Ele retorna `true` se o `value` for um array, e `false` caso contrário.

```js run
alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
```

## A maioria dos métodos suporta "thisArg"

Almost all array methods that call functions -- like `find`, `filter`, `map`, with a notable exception of `sort`, accept an optional additional parameter `thisArg`.

Esse parâmetro não é explicado nas seções acima, porque é raramente usado. Mas, para completar, temos que cobri-lo.

Aqui está a sintaxe completa desses métodos:

```js
arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// thisArg é o último argumento opcional
```

O valor do parâmetro `thisArg` se torna `this` para `func`.

Por exemplo, aqui nós usamos um método de objeto como um filtro e `thisArg` vem a calhar:

```js run
let user = {
  age: 18,
  younger(otherUser) {
    return otherUser.age < this.age;
  }
};

let users = [
  {age: 12},
  {age: 16},
  {age: 32}
];

*!*
// encontrar todos os usuários mais jovens que o user
let youngerUsers = users.filter(user.younger, user);
*/!*

alert(youngerUsers.length); // 2
```

Na chamada acima, usamos `user.younger` como um filtro e também fornecemos `user` como contexto para isso. Se não fornecermos o contexto, `users.filter(user.younger)` chamaria `user.younger` como uma função autônoma, com `this = undefined`. Isso significaria um erro instantâneo.

## Resumo

Uma cheatsheet de métodos de array:

- Para adicionar/remover elementos:
  - `push(...items)` -- adiciona itens no final,
  - `pop()` -- extrai um item do final,
  - `shift()` -- extrai um item do começo,
  - `unshift(...items)` -- adiciona itens no começo.
  - `splice(pos, deleteCount, ...items)` -- no índice `pos` deleta `deleteCount` elementos e insere `items`.
  - `slice(start, end)` -- cria um novo array, copia elementos nele a partir da posição `start` até `end` (não incluindo).
  - `concat(...items)` -- retorna um novo array: copia todos membros do atual e adiciona `items` a ele. Se qualquer um dos `items` é um array, então os elementos dele são adicionados.

- Para pesquisar entre os elementos:
  - `indexOf/lastIndexOf(item, pos)` - procure por `item` iniciando da posição `pos`, retorne o índice ou `-1` se não for encontrado.
  - `includes(value)` -- retorna `true` se o array possui `value`, caso contrário `false`.
  - `find/filter(func)` - filtra os elementos através da função, retorna primeiro/todos os valores que retornam `true`.
  - `findIndex` é como `find`, mas retorna o índice em vez de um valor.
  
- Para iterar sobre elementos:
  - `forEach(func)` - chama `func` para todo elemento, não retorna nada.

- Para transformar o array:
  - `map(func)` - cria um novo array a partir dos resultados da chamada `func` para cada elemento.
  - `sort(func)` -- ordena o array, então o retorna.
  - `reverse()` -- coloca o array em ordem reversa, então o retorna.
  - `split/join` -- converte uma string para array e vice-versa.
- `reduce(func, initial)` - calcula um único valor sobre o array chamando `func` para cada elemento e passando um resultado intermediário entre as chamadas.

- Além disso:
  - `Array.isArray(arr)` verifica `arr` é um array.

Por favor, note que os métodos `sort`, `reverse` e ​​`splice` modificam o próprio array.

Esses métodos são os mais usados, eles cobrem 99% dos casos de uso. Mas existem alguns outros:

- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) veifica o array.

  A função `fn` é chamada em cada elemento do array similar ao `map`. Se algum/todos os resultados forem `true`, retornará `true`, caso contrário, `false`.

- [arr.fill(value, start, end)](mdn:js/Array/fill) -- preenche o array com `value` repetidos a partir do índice `start` até `end`.

- [arr.copyWithin(target, start, end)](mdn:js/Array/copyWithin) -- copia os elementos a partir da posição `start` até a posição `end` dentro de *si mesmo*, na posição `target` (sobrescreve existente).

Para a lista completa, veja o [manual](mdn:js/Array).

À primeira vista, pode parecer que existem muitos métodos, difíceis de lembrar. Mas na verdade isso é muito mais fácil do que parece.

Olhe a cheatsheet apenas para estar ciente deles. Em seguida, resolva as tarefas deste capítulo para praticar, para que você tenha experiência com métodos de array.

Depois, sempre que você precisar fazer algo com um array e não souber como - examine a planilha e encontre o método correto. Exemplos irão ajudá-lo a escrever corretamente. Em breve, você se lembrará automaticamente dos métodos, sem esforços específicos do seu lado.
