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

O metodo [arr.splice(str)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) é um canivete suíço para arrays. Ele pode fazer qualquer coisa: adicionar, remover e inserir elementos.

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

O método [arr.slice](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) é mais simples do que seu similar anterior `arr.splice`.

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

O método [arr.concat](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) une um array com outros arrays e/ou itens.

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

O método [arr.forEach](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) permite executar uma função para cada elemento de um array.

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

Os métodos [arr.indexOf](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf), [arr.lastIndexOf](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf) e [arr.includes](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/contains) possuem a mesma sintaxe e fazem, essencialmente, a mesma coisa que acontece com as strings, entretanto, eles operam nos itens de um array em vez de caracteres como feito nas strings:

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

É nesses momentos que o método [arr.find](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/find) vem a calhar.

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

O método [arr.findIndex](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) é exatamente o mesmo, mas retorna a posição onde o elemento foi encontrado e não seu elemento e `-1` é retornado quando nada é encontrado.

### filter

O método `find` procura por um único (e o primeiro) elemento que fizer a função retornar `true`.

Se quisermos que retorne mais de um elemento, podemos usar [arr.filter(fn)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/filtro).

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

O método [arr.map](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/map) é um dos mais úteis e usados por programadores.

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

O método [arr.sort](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) ordena um array colocando os elementos *em seus devidos lugares*.

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

Funciona exatamente como a outra versão acima.
````

### reverse

O método [arr.reverse](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse) reverte a ordem dos elementos em `arr`.

Exemplo:

```js run
let arr = [1, 2, 3, 4, 5];
arr.reverse();

alert( arr ); // 5,4,3,2,1
```

It also returns the array `arr` after the reversal.
Ele também retornar o array `arr` depois de revertê-lo.

### split e join

Aqui vai uma situação que ocorre na vida real. Digamos que estamos escrevendo uma aplicativo de mensagem e uma pessoa coloca uma lista dos recebedores delimitado por virgulas: `John, Pete, Mary`. Mas para nós um array de nomes seria muito mais confortável do que uma única string. Como fazer isso?

O método [str.split(delim)](https://www.devmedia.com.br/javascript-split-dividindo-separando-strings/39254) faz exatamente isso. Ele separa a string em uma array dado por seu delimitador `delim`.

No exemplo abaixo, nós separamos por uma vírgula seguido por um espaço:

```js run
let nomes = 'Bilbo, Gandalf, Nazgul';

let arr = nomes.split(', ');

for (let nome of arr) {
  alert( `Uma mensagem para ${name}.` ); // Uma mensagem para Bilbo  (outros nomes)
}
```

O método `split` possui um segundo argumento numérico opcional -- um limite para o tamanho de uma array. Se for aprovado, então os outros elemento são ignorados. Na prática, é raramente usado:

```js run
let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

alert(arr); // Bilbo, Gandalf
```

````smart header="Separe por letras"
Ao chamar `split(s)` com o `s` vazio, separaria a string e teríamos um array de letras:

```js run
let str = "teste";

alert( str.split('') ); // t,e,s,t,e
```
````

O método [arr.join(separator)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/join) faz o contrário de `split`. Ele cria uma string dos itens de `arr` juntando-os por um `separator` entre eles.

Por exemplo:

```js run
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';');

alert( str ); // Bilbo;Gandalf;Nazgul
```

### reduce/reduceRight

Quando precisamos percorrer um array -- podemos usar `forEach`, `for` ou `for..of`.

Quando precisamos percorrer e retornar uma informação por cada elemento -- usamos o `map`.

Os métodos [arr.reduce](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) e [arr.reduceRight](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight) também pertence á esse grupo, porém eles podem ser um pouco mais confusos. Eles são usados para calcular um único valor baseado em um array.

Sua sintaxe é:

```js
let value = arr.reduce(function(previousValue, item, index, array) {
  // ...
}, initial);
```

A função é aplicada nos elementos. Você pode ter notado os argumentos familiares, começando pelo o segundo:

- `item` -- é o atual item da array.
- `index` -- é sua posição.
- `array` -- é a array.

Até agora, é similiar ao método `forEach/map`. Porém há mais um argumento:

- `previousValue` -- é o resultado da última chamada da função, `initial` seria o valor inicial.

O jeito mais fácil de se entender é por meio de exemplos.

Aqui vamos somar os elementos de um array:

```js run
let arr = [1, 2, 3, 4, 5];

let resultado = arr.reduce((sum, current) => {
  
  return  sum + current,

}, 0);

alert(resultado); // 15
```

Neste exemplo, usamos a forma mais simples de se usar `reduce`, o qual recebe somente 2 argumentos.

Vamos entender os detalhes do que está acontecendo.

1. Na 1º execução, podemos notar que o último argumento de `reduce` é igual a `0`, logo esse será o valor inicial de `sum`, e `current` terá o valor do primeiro elemento do array: `1`. A função está retornando a soma das variáveis `sum` e `current`, então o resultado é `1`.
2. Na 2º execução, `sum` passa a ter o resultado como valor `sum = 1` e `current` passa a ter o segundo elemento do array `current = 2` e, então, retorna a soma destes.
3. Na 3º execução, `sum = 3` e `current` passa a ter o próximo elemento do array e assim por diante...

Abaixo, a imagem mostra o fluxo da calculação:

![](reduce.svg)

Ou por meio de uma tabela, onde cada linha representa uma chamada da função no próximo elemento do array:

|   |`sum`|`current`|`resultado`|
|---|-----|---------|---------|
|1º chamada|`0`|`1`|`1`|
|2º chamada|`1`|`2`|`3`|
|3º chamada|`3`|`3`|`6`|
|4º chamada|`6`|`4`|`10`|
|5º chamada|`10`|`5`|`15`|


Como podemos ver, o resultado da última chamada se torna o valor do primeiro argumento na próxima chamada.

Podemos também omitir o valor inicial:

```js run
let arr = [1, 2, 3, 4, 5];

// valor inicial de reduce foi removido (sem 0)
let resultado = arr.reduce((sum, current) => {

  return sum + current

});

alert( resultado ); // 15
```

O resultado é o mesmo. Isto ocorre porque, se não houver um valor inicial, `reduce` irá pegar o primeiro elemento do array como este valor e `current` começará a partir do 2º elemento.

A tabela de calculação será a mesma de cima, menos a primeira linha.

Porém, o uso deste método requer extremo cuidado. Se um array estiver vazio e `reduce` for acionado sem um valor inicial, será retornado um erro.

Aqui esta um exemplo:

```js run
let arr = [];

// Erro: Reduce de array vazia sem valor inicial
// se o valor inicial existir, reduce irá retorná-lo para dentro da array vazia.
arr.reduce((sum, current) => sum + current);
```


Portanto, é aconselhável que o valor inicial seja sempre colocado.

O método [arr.reduceRight](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight) faz o mesmo, mas começando da direita para a esquerda.


## Array.isArray

Arrays não formam um outro tipo de linguagem. Eles são baseados em objetos.

Mesmo usando `typeof` não é possível distinguir um objeto de um array:

```js run
alert(typeof {}); // objeto
alert(typeof []); // objeto
```

...Mas arrays são usados tão frequentemente que há um método especial para isso: [Array.isArray(valor)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray). Este método retorna `true` se o `valor` for um array e `false` se não for.

```js run
alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
```

## A maioria dos métodos suportam "thisArg"

Quase todos os métodos arrays que chamam uma função -- como `find`, `filter`, `map`, com exceção de `sort` -- aceitam um parâmetro adicional opcional `thisArg`.

Este parâmetro não foi explicado nas seções anteriores porque é raramente usado. Entretanto, para um ensinamento melhor e completo, decidimos mostrá-lo.

Abaixo mostramos a sintaxe completa destes métodos:

```js
arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// thisArg é o último argumento opcional
```

O valor do parâmetro `thisArg` se torna o `this` para `func`.

No exemplo abaixo, usamos um objeto como filtro e acabou que `thisArg` facilitou o uso do método:

```js run
let usuario = {
  idade: 18,
  maisNovo(outroUsuario) {
    return outroUsuario.idade < this.idade;
  }
};

let usuarios = [
  {idade: 12},
  {idade: 16},
  {idade: 32}
];

*!*
// ache todos os usuarios mais novos que o usuario
let maisNovoUsers = usuarios.filter(usuario.maisNovo, usuario);
*/!*

alert(maisNovoUsuario.length); // 2
```

No exemplo acima, nós usamos `usuario.maisNovo` como um filtro e também fornecemos `usuario` como contexto. Se não tivéssemos fornecido o contexto, `usuarios.filter(usuario.maisNovo)` iria chamar `usuario.maisNovo` como uma funçao de parâmetro único, com `this=undefined`. No final, ele retornaria um erro.

## Resumo

Uma *cola* com os métodos arrays abordados:

- Para adicionar/remover elementos:
  - `push(...items)` -- adiciona itens no final,
  - `pop()` -- retira um item do final,
  - `shift()` -- retira um item do começo,
  - `unshift(...items)` -- adiciona um item no começo.
  - `splice(posicao, quantidade, ...items)` -- no index `posicao`, deleta uma certa `quantidade` de elementos e insere outros `items`.
  - `slice(comeco, fim)` -- cria um novo array, copia elementos a partir da posição `comeco` até `fim` (que não é incluso) para dentro do array.
  - `concat(...items)` -- retorna um novo array: une elementos de um array atual com outros `items` e adiciona a array nova. Se algum `items` for um array, então seus elementos também são capturados e adicionados.

- Para procurar entre os elementos:
  - `indexOf/lastIndexOf(item, posicao)` -- procura por `item` começando pela `posicao`, retorna o index/posição ou `-1` se não for encontrado.
  - `includes(valor)` -- retorna `true` se o array possuir o `valor`, do contrário, retornará `false`.
  - `find/filter(func)` -- filtra elementos por meio de uma função, retorna o primeiro - ou todos - valor que fizer a função retornar `true`.
  - `findIndex` é como `find`, mas retorna o index e não o valor.
  
- Para percorrer os elementos:
  - `forEach(func)` -- chama `func` para cada elemento, não retorna um valor.

- Para transformar um array:
  - `map(func)` -- cria um novo array a partir do resultado da chamada de `func` para cada elemento.
  - `sort(func)` -- ordena o array e o retorna.
  - `reverse()` -- inverte o array e o retorna.
  - `split/join` -- converte uma string para array/array para string.
  - `reduce(func, initial)` -- calcula um único valor a partir de um array ao chamar `func` para cada elemento e passando um resultado intermediário entre as chamadas.

- Adicional:
  - `Array.isArray(arr)` checa se `arr` é um array.

Por favor, note que os métodos `sort`, `reverse` e `splice` modificam o array.

Este métodos são os mais usados, eles cobrem 99% em casos de uso. Porém, existem outros:

- [arr.some(fn)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/some)/[arr.every(fn)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/every) examina o array.

  A função `fn` é chamada em cada elemento do array como em `map`. Se algum/todos os resultados for `true`, retorna `true`, do contrário `false`.

- [arr.fill(valor, comeco, fim)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/fill) -- preenche um array com o `valor` dado repetitivamente a partir da posição `comeco` até `fim`.

- [arr.copyWithin(target, start, end)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin) -- copia *seus próprios elementos* e os leva para outra posição *dentro da mesma array*. A cópia dos elementos começa a partir da posição `start` até a posição `end`, e os elementos são realocados para a posição `target` (sobescrevendo os elementos existentes). Este método não adiciona novos itens ao array.

Para a lista completa, veja o [manual](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array).

Á primeira vista, pode parecer que são muitos métodos e que se torna difícil de lembrá-los. Mas, na verdade, isso é mais simples do que parece.

Examine esta lista de *cola* só para ter uma noção deles e depois resolva os exercícios deste capítulo para praticar. Desta forma, você vai ter uma experiência com métodos arrays.

Mais tarde, sempre que precisar fazer algo com arrays -- e você não souber como -- venha até aqui, olhe nossa cola e ache o método correto. Exemplos vão lhe ajudar a escrever corretamente. Logo você irá lembrar dos métodos automaticamente, sem esforços específicos.
