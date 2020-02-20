# Métodos Arrays

Arrays nos fornece vários métodos. Para deixar esse assunto mais fácil de entender, neste capítulo esses métodos estão divididos em grupos.

## Adicionar/Remover itens

Nós já conhecemos os métodos que adicionam e removem itens do início ou fim de um array:

- `arr.push(...itens)` -- adiciona itens no final de um array,
- `arr.pop()` -- retira um item do final de um array,
- `arr.shift()` -- retira um item do começo de um array,
- `arr.unshift(...itens)` -- adiciona itens no começo de um array.

Abaixo apresentamos alguns outros métodos.

### splice

Como deletar um elemento de um array?

Arrays são objetos, então podemos tentar usar `delete`:

```js run
let arr = ["Eu", "vou", "casa"];

delete arr[1]; // remove "vou"

alert( arr[1] ); // retornará undefined pois o elemento foi apagado

// atualizado arr = ["Eu",  , "casa"];
alert( arr.length ); // 3
```

O elemento foi removido, mas o array ainda possui 3 elementos, nós podemos ver que `arr.length == 3`.

Isso é normal porque `delete obj.chave` remove o valor pela `chave`. É um bom uso para objetos, mas para arrays, nós, normalmente, queremos que o resto dos elementos se movam e ocupem o espaço liberado. Esperávamos um array com menos elementos.

Dessa forma, métodos especiais devem ser usados.

O metodo [arr.splice(str)](mdn:js/Array/splice) é um canivete suíço para arrays. Ele pode fazer qualquer coisa: adicionar, remover e inserir elementos.

Sua sintaxe é:

```js
arr.splice(indexElementoArray[, quantidade, elem1, ..., elemN])
```

Começa em uma posição `indexElmentoArray`: remove uma certa `quantidade` de elementos e então insere `elem1, ..., elemN` em seus lugares. Ele retorna um array com os elementos removidos.

Esse metódo é melhor de se entender com exemplos.

Vamos começar com a remoção de elementos:

```js run
let arr = ["Eu", "estudo", "JavaScript"];

*!*
arr.splice(1, 1); // a partir da posição 1 remova 1 elemento
*/!*

alert( arr ); // ["Eu", "JavaScript"]
```

Fácil, não é? Começando pela posição `1` o método removeu `1` elemento.

No próximo exemplo vamos remover 3 elementos e substituí-los por outros dois elementos:

```js run
let arr = [*!*"Eu", "estudo", "JavaScript",*/!* "agora", "mesmo"];

// remove os 3 primeiros elementos e os substitui por outros
arr.splice(0, 3, "Vamos", "dançar");

alert( arr ) // atualizado [*!*"Vamos", "dançar"*/!*, "agora", "mesmo"]
```

Abaixo podemos ver que `splice` retorna um array dos elementos removidos:

```js run
let arr = [*!*"Eu", "estudo",*/!* "JavaScript", "agora", "mesmo"];

// remove os 2 primeiros elementos
let removido = arr.splice(0, 2);

alert( removido ); // "Eu", "estudo" <-- array de elementos removidos
```

O método `splice` também permite inserir elementos sem remover outros. Para isso, devemos colocar a `quantidade` em `0`:

```js run
let arr = ["Eu", "estudo", "JavaScript"];

// a partir da posição 2
// delete 0 elementos
// então insira "linguagem" e "complexa"
arr.splice(2, 0, "linguagem", "complexa");

alert( arr ); // "Eu", "estudo", "linguagem", "complexa", "JavaScript"
```

````smart header="Posição negativas são permitidas"
Neste e em outros métodos arrays, posições negativas são permitidas. Eles especificam a posição a partir do fim de um array, por exemplo:

```js run
let arr = [1, 2, 5];

// a partir da posição -1 (uma posição antes da última)
// delete 0 elementos,
// então insira 3 e 4
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5
```
````

### slice

O método [arr.slice](mdn:js/Array/slice) é mais simples do que seu similar anterior `arr.splice`.

Sua sintaxe é:

```js
arr.slice(começo, fim)
```

Ele retorna um novo array contendo todos os itens a partir da posição `"começo"` até `"fim"` (ele não inclui o valor da posição `"fim"`). Ambos `começo` e `fim` podem ser negativos, nesse caso, a posição do final da array é assumida.

Funciona como `str.slice`, porém este cria subarrays em vez de substrings.

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

O método [arr.concat](mdn:js/Array/concat) une um array com outros arrays e/ou itens.

Sua sintaxe é:

```js
arr.concat(arg1, arg2...)
```

Este método aceita qualquer número de argumentos -- sendo arrays ou valores.

O resultado vai ser um novo array contendo itens do `arr`, e também do `arg1`, `arg2` etc.

Se o argumento for um array ou possuir a propriedade `Symbol.isConcatSpreadable`, então todos seus elementos são copiados. Caso contrário, o argumento em si é copiado.

Veja o exemplo:

```js run
let arr = [1, 2];

// une arr com [3,4]
alert( arr.concat([3, 4])); // 1,2,3,4

// une arr com [3,4] e [5,6]
alert( arr.concat([3, 4], [5, 6])); // 1,2,3,4,5,6

// une arr com [3,4], e então adiciona os valores 5 e 6
alert( arr.concat([3, 4], 5, 6)); // 1,2,3,4,5,6
```

Normalmente, ele somente copia elementos de um array. Outros objetos, mesmo que eles se pareçam com arrays, são adicionados como um todo:

```js run
let arr = [1, 2];

let exemploDeArray = {
  0: "algo",
  length: 1
};

alert( arr.concat(exemploDeArray) ); // 1,2,[objeto Objeto]
//[1, 2, exemploDeArray] copiou a array em vez de seus elementos armazenados
```

...Mas se um array parecido com um objeto possui a propriedade `Symbol.isConcatSpreadable`, então os seus elementos são adicionados:

```js run
let arr = [1, 2];

let exemploDeArray = {
  0: "qualquer",
  1: "coisa",
*!*
  [Symbol.isConcatSpreadable]: true,
*/!*
  length: 2
};

alert( arr.concat(exemploDeArray) ); // 1,2,qualquer,coisa
```

## Iterate: forEach

O método [arr.forEach](mdn:js/Array/forEach) permite executar uma função para cada elemento de um array.

Sua sintaxe:
```js
arr.forEach(function(item, index, array) {
  // ... faça algo com o item
});
```
`index` sendo a posição do item.

Observe o exemplo abaixo, o código mostra cada elemento de um array:

```js run
// para cada elemento chame o alert
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);
```

Este código é mais elaborado e mostra a posição de cada elemento:

```js run
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} está na posição ${index} em ${array}`);
});
```

O resultado da função (se retornar algum) é descartado e ignorado.


## Buscando valores em um array

Estes são métodos para procurar algo em um array.

### indexOf/lastIndexOf e includes

Os métodos [arr.indexOf](mdn:js/Array/indexOf), [arr.lastIndexOf](mdn:js/Array/lastIndexOf) and [arr.includes](mdn:js/Array/includes) possuem a mesma sintaxe e fazem, essencialmente, a mesma coisa que acontece com as strings, entretanto, eles operam nos itens de um array em vez de caracteres como feito nas strings:

- `arr.indexOf(item, from)` -- procura por `item` começando pela posição `from`, e retorna o index/posição onde o elemento foi encontrado, caso o elemento não seja encontrado, o método retornará `-1`.
- `arr.lastIndexOf(item, from)` -- faz o mesmo que o método acima, porém faz uma busca começando da direita para esquerda.
- `arr.includes(item, from)` -- procura por `item` começando da posição `from`, retorna `true` se achado.

Veja o exemplo:

```js run
let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true
```

Note que o método usa `===` para fazer a comparação. Então, se procuramos por `false`, o método achará exatamente `false` e não zero.

Se queremos saber se um elemento está incluso em um array porém sem necessariamente saber qual sua posição, então `arr.includes` é preferível.

Além disso, uma pequena diferença que o `includes` possui é que ele aceita `NaN`, ao contrário de `indexOf/lastIndexOf`:

```js run
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (deveria ser 0, mas === igualdade não funciona com NaN)
alert( arr.includes(NaN) );// true (correto)
```

### find e findIndex

Imagine que tenhamos um array de objetos. Como achamos um objeto usando uma condição específica?

É nesses momentos que o método [arr.find](mdn:js/Array/find) vem a calhar.

Sua sintaxe é:
```js
let result = arr.find(function(item, index, array) {
  // se a condição de find resultar em true, então item é retornado e o laço é parado
  // se resultar em falso é retornado o valor undefined
});
```

A função dentro de `find` é chamada repetitivamente para cada elemento do array:

- `item` é o elemento.
- `index` é sua posição.
- `array` é o array onde se encontra o elemento.

Se a função resultar em `true`, a busca é parada e o `item` é retornado. Se nada for achado, `undefined` é retornado.

Por exemplo, nós temos um array de usuários, cada um com os campos `id` e `nome`. Vamos achar o usuário com `id == 1`:

```js run
let usuarios = [
  {id: 1, nome: "John"},
  {id: 2, nome: "Pete"},
  {id: 3, nome: "Mary"}
];

let user = usuarios.find(item => item.id == 1);

alert(user.nome); // John
```

Na vida real, arrays de objetos é uma coisa comum, dessa forma, o método `find` é muito útil.

Note que no exemplo nós demos para `find` uma função `item => item.id == 1` com somente um argumento. Os outros argumentos dessa função raramente são usados.

O método [arr.findIndex](mdn:js/Array/findIndex) é exatamente o mesmo, mas retorna a posição onde o elemento foi encontrado e não seu elemento e `-1` é retornado quando nada é encontrado.

### filter

O método `find` procura por um único (e o primeiro) elemento que fizer a função retornar `true`.

Se quisermos que retorne mais de um elemento, podemos usar [arr.filter(fn)](mdn:js/Array/filter).

A sintaxe é parecida com `find`, porém o `filter` continua o loop por todos os elementos do array mesmo se `true` já tiver sindo retornado:

```js
let resultado = arr.filter(function(item, index, array) {
  //se um elemento que atende aos requisitos for alocado na variável resultado e o loop continuar
  //retorna um array vazio por completar um cenário falso
});
```

Por exemplo:

```js run
let usuarios = [
  {id: 1, nome: "John"},
  {id: 2, nome: "Pete"},
  {id: 3, nome: "Mary"}
];

//retorna um array com os dois primeiros usuários
let algunsUsuarios = usuarios.filter(item => item.id < 3);

alert(algunsUsuarios.length); // 2
```

## Transformando um array

Esta seção irá abordar os métodos que transformam ou reorganizam um array.

### map

O método [arr.map](mdn:js/Array/map) é um dos mais úteis e usados por programadores.

Sua sintaxe é:

```js
let resultado = arr.map(function(item, index, array) {
  //retorna um novo valor e não seu item
})
```

Ele chama a função para cada elemento do array e retorna um array com o resultado.

Abaixo, transformamos cada elemento em seu tamanho:

```js run
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6
```

### sort(fn)

O método [arr.sort](mdn:js/Array/sort) ordena um array colocando os elementos *em seus devidos lugares*.

Exemplo:

```js run
let arr = [ 1, 2, 15 ];

//o método reordena o conteúdo do array (e o retorna)
arr.sort();

alert( arr );  // *!*1, 15, 2*/!*
```

Você notou alguma coisa estranha non resultado?

A ordem ficou `1, 15, 2`. Incorreto. Mas por quê?

**Os itens são ordenados como strings por padrão.**

Literalmente, todos os elementos são convertidos para strings e então comparados. A ordenação lexicográfica é aplicada e, de fato, `"2" > "15"`.

Para usar nossa própria ordenação, precisamos produzir uma função que recebe dois argumentos como argumento de `arr.sort()`.

A função deve funcionar desse jeito:
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

Vamos parar um pouco e pensar sobre o que exatamente está acontecendo. O `arr` pode ser um array de qualquer coisa, correto? Ele pode conter números ou strings ou elementos HTML ou qualquer outra coisa. Nós vamos ter um array de *alguma coisa*. Para ordená-lo, precisamos de uma *função de ordenação* que saiba comparar os elementos. O padrão é uma ordenação de strings.

O método `arr.sort(fn)` possui uma implementação interna (built-in) de ordenação de algoritmos. Não precisamos saber exatamente como funciona (na maioria do tempo, ele é [quicksort](https://pt.wikipedia.org/wiki/Quicksort) otimizado). Ele vai percorrer o array, comparar seus elementos usando a função providenciada e reordená-los, tudo que precisamos é fornecer o `fn` que irá fazer a comparação.

A propósito, se em algum momento quisermos saber quais elementos são comparados -- nada nos previne de usar um `alert` neles:

```js run
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
});
```

O algoritmo pode até comparar um elemento múltiplas vezes durante o processo, porém ele tenta fazer o menor número de comparações possíveis.


````smart header="Uma função de comparação pode retornar qualquer número"
Na verdade, numa função de comparação é somente exigido que retorne um número positivo para dizer "maior que" e um negativo para "menor que".

Isso permite escrever funções menores:

```js run
let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // *!*1, 2, 15*/!*
```
````

````smart header="Arrow functions para o melhor"
Você se lembra de [arrow functions](info:function-expressions-arrows#arrow-functions)? Podemos usá-lo aqui para deixar o código mais limpo:

```js
arr.sort( (a, b) => a - b );
```

Funciona exatamente como a outra versão - maior - acima.
````

### reverse

The method [arr.reverse](mdn:js/Array/reverse) reverses the order of elements in `arr`.

For instance:

```js run
let arr = [1, 2, 3, 4, 5];
arr.reverse();

alert( arr ); // 5,4,3,2,1
```

It also returns the array `arr` after the reversal.

### split and join

Here's the situation from the real life. We are writing a messaging app, and the person enters the comma-delimited list of receivers: `John, Pete, Mary`. But for us an array of names would be much more comfortable than a single string. How to get it?

The [str.split(delim)](mdn:js/String/split) method does exactly that. It splits the string into an array by the given delimiter `delim`.

In the example below, we split by a comma followed by space:

```js run
let names = 'Bilbo, Gandalf, Nazgul';

let arr = names.split(', ');

for (let name of arr) {
  alert( `A message to ${name}.` ); // A message to Bilbo  (and other names)
}
```

The `split` method has an optional second numeric argument -- a limit on the array length. If it is provided, then the extra elements are ignored. In practice it is rarely used though:

```js run
let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

alert(arr); // Bilbo, Gandalf
```

````smart header="Split into letters"
The call to `split(s)` with an empty `s` would split the string into an array of letters:

```js run
let str = "test";

alert( str.split('') ); // t,e,s,t
```
````

The call [arr.join(separator)](mdn:js/Array/join) does the reverse to `split`. It creates a string of `arr` items glued by `separator` between them.

For instance:

```js run
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';');

alert( str ); // Bilbo;Gandalf;Nazgul
```

### reduce/reduceRight

When we need to iterate over an array -- we can use `forEach`, `for` or `for..of`.

When we need to iterate and return the data for each element -- we can use `map`.

The methods [arr.reduce](mdn:js/Array/reduce) and [arr.reduceRight](mdn:js/Array/reduceRight) also belong to that breed, but are a little bit more intricate. They are used to calculate a single value based on the array.

The syntax is:

```js
let value = arr.reduce(function(previousValue, item, index, array) {
  // ...
}, initial);
```

The function is applied to the elements. You may notice the familiar arguments, starting from the 2nd:

- `item` -- is the current array item.
- `index` -- is its position.
- `array` -- is the array.

So far, like `forEach/map`. But there's one more argument:

- `previousValue` -- is the result of the previous function call, `initial` for the first call.

The easiest way to grasp that is by example.

Here we get a sum of array in one line:

```js run
let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
```

Here we used the most common variant of `reduce` which uses only 2 arguments.

Let's see the details of what's going on.

1. On the first run, `sum` is the initial value (the last argument of `reduce`), equals `0`, and `current` is the first array element, equals `1`. So the result is `1`.
2. On the second run, `sum = 1`, we add the second array element (`2`) to it and return.
3. On the 3rd run, `sum = 3` and we add one more element to it, and so on...

The calculation flow:

![](reduce.svg)

Or in the form of a table, where each row represents a function call on the next array element:

|   |`sum`|`current`|`result`|
|---|-----|---------|---------|
|the first call|`0`|`1`|`1`|
|the second call|`1`|`2`|`3`|
|the third call|`3`|`3`|`6`|
|the fourth call|`6`|`4`|`10`|
|the fifth call|`10`|`5`|`15`|


As we can see, the result of the previous call becomes the first argument of the next one.

We also can omit the initial value:

```js run
let arr = [1, 2, 3, 4, 5];

// removed initial value from reduce (no 0)
let result = arr.reduce((sum, current) => sum + current);

alert( result ); // 15
```

The result is the same. That's because if there's no initial, then `reduce` takes the first element of the array as the initial value and starts the iteration from the 2nd element.

The calculation table is the same as above, minus the first row.

But such use requires an extreme care. If the array is empty, then `reduce` call without initial value gives an error.

Here's an example:

```js run
let arr = [];

// Error: Reduce of empty array with no initial value
// if the initial value existed, reduce would return it for the empty arr.
arr.reduce((sum, current) => sum + current);
```


So it's advised to always specify the initial value.

The method [arr.reduceRight](mdn:js/Array/reduceRight) does the same, but goes from right to left.


## Array.isArray

Arrays do not form a separate language type. They are based on objects.

So `typeof` does not help to distinguish a plain object from an array:

```js run
alert(typeof {}); // object
alert(typeof []); // same
```

...But arrays are used so often that there's a special method for that: [Array.isArray(value)](mdn:js/Array/isArray). It returns `true` if the `value` is an array, and `false` otherwise.

```js run
alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
```

## Most methods support "thisArg"

Almost all array methods that call functions -- like `find`, `filter`, `map`, with a notable exception of `sort`, accept an optional additional parameter `thisArg`.

That parameter is not explained in the sections above, because it's rarely used. But for completeness we have to cover it.

Here's the full syntax of these methods:

```js
arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// thisArg is the optional last argument
```

The value of `thisArg` parameter becomes `this` for `func`.

For instance, here we use an object method as a filter and `thisArg` comes in handy:

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
// find all users younger than user
let youngerUsers = users.filter(user.younger, user);
*/!*

alert(youngerUsers.length); // 2
```

In the call above, we use `user.younger` as a filter and also provide `user` as the context for it. If we didn't provide the context, `users.filter(user.younger)` would call `user.younger` as a standalone function, with `this=undefined`. That would mean an instant error.

## Summary

A cheatsheet of array methods:

- To add/remove elements:
  - `push(...items)` -- adds items to the end,
  - `pop()` -- extracts an item from the end,
  - `shift()` -- extracts an item from the beginning,
  - `unshift(...items)` -- adds items to the beginning.
  - `splice(pos, deleteCount, ...items)` -- at index `pos` delete `deleteCount` elements and insert `items`.
  - `slice(start, end)` -- creates a new array, copies elements from position `start` till `end` (not inclusive) into it.
  - `concat(...items)` -- returns a new array: copies all members of the current one and adds `items` to it. If any of `items` is an array, then its elements are taken.

- To search among elements:
  - `indexOf/lastIndexOf(item, pos)` -- look for `item` starting from position `pos`, return the index or `-1` if not found.
  - `includes(value)` -- returns `true` if the array has `value`, otherwise `false`.
  - `find/filter(func)` -- filter elements through the function, return first/all values that make it return `true`.
  - `findIndex` is like `find`, but returns the index instead of a value.
  
- To iterate over elements:
  - `forEach(func)` -- calls `func` for every element, does not return anything.

- To transform the array:
  - `map(func)` -- creates a new array from results of calling `func` for every element.
  - `sort(func)` -- sorts the array in-place, then returns it.
  - `reverse()` -- reverses the array in-place, then returns it.
  - `split/join` -- convert a string to array and back.
  - `reduce(func, initial)` -- calculate a single value over the array by calling `func` for each element and passing an intermediate result between the calls.

- Additionally:
  - `Array.isArray(arr)` checks `arr` for being an array.

Please note that methods `sort`, `reverse` and `splice` modify the array itself.

These methods are the most used ones, they cover 99% of use cases. But there are few others:

- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) checks the array.

  The function `fn` is called on each element of the array similar to `map`. If any/all results are `true`, returns `true`, otherwise `false`.

- [arr.fill(value, start, end)](mdn:js/Array/fill) -- fills the array with repeating `value` from index `start` to `end`.

- [arr.copyWithin(target, start, end)](mdn:js/Array/copyWithin) -- copies its elements from position `start` till position `end` into *itself*, at position `target` (overwrites existing).

For the full list, see the [manual](mdn:js/Array).

From the first sight it may seem that there are so many methods, quite difficult to remember. But actually that's much easier than it seems.

Look through the cheatsheet just to be aware of them. Then solve the tasks of this chapter to practice, so that you have experience with array methods.

Afterwards whenever you need to do something with an array, and you don't know how -- come here, look at the cheatsheet and find the right method. Examples will help you to write it correctly. Soon you'll automatically remember the methods, without specific efforts from your side.
