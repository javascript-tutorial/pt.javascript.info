# Arrays 

Objetos permitem que você armazene coleções de valores com chave. Isso é bom.

Mas muitas vezes achamos que precisamos de uma *coleção ordenada*, onde temos um primeiro, um segundo, um terceiro elemento e assim por diante. Por exemplo, precisamos disso para armazenar uma lista de algo: usuários, mercadorias, elementos HTML etc.

Não é conveniente usar um objeto aqui, porque não fornece métodos para gerenciar a ordem dos elementos. Não podemos inserir uma nova propriedade "entre" as existentes. Objetos não são destinados apenas para tal uso.

Existe uma estrutura de dados especial chamada vetor ou `Array`, para armazenar coleções ordenadas.

## Declaração

Existem duas sintaxes para criar um array vazio:

```js
let arr = new Array();
let arr = [];
```

Quase o tempo todo, a segunda sintaxe é usada. Nós podemos fornecer elementos iniciais nos colchetes:

```js
let fruits = ["Apple", "Orange", "Plum"];
```

Os elementos do array são numerados, começando com zero.

Podemos obter um elemento pelo seu número entre colchetes:

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits[0] ); // Apple
alert( fruits[1] ); // Orange
alert( fruits[2] ); // Plum
```

Podemos substituir um elemento:

```js
fruits[2] = 'Pear'; // agora ["Apple", "Orange", "Pear"]
```

... Ou adicionar um novo ao array:

```js
fruits[3] = 'Lemon'; // agora ["Apple", "Orange", "Pear", "Lemon"]
```

A contagem total dos elementos no array é seu `length` (comprimento):

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits.length ); // 3
```

Nós também podemos usar `alert` para mostrar todo o array.

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits ); // Apple,Orange,Plum
```

Um array pode armazenar elementos de qualquer tipo.

Por exemplo:

```js run no-beautify
// mistura de valores
let arr = [ 'Apple', { name: 'John' }, true, function() { alert('hello'); } ];

// obtém o objeto no índice 1 e mostra seu 'name'
alert( arr[1].name ); // John

// obtém a função no índice 3 e executa
arr[3](); // hello
```


````smart header="Vírgula à direita"
Um array, assim como um objeto, pode terminar com uma vírgula:
```js 
let fruits = [
  "Apple", 
  "Orange", 
  "Plum"*!*,*/!*
];
```

O estilo "vírgula à direita" facilita a inserção/remoção de itens, porque todas as linhas se tornam semelhantes.
````


## Metódos pop/push, shift/unshift

Uma fila ou [queue](https://en.wikipedia.org/wiki/Queue_ (abstract_data_type)) é um dos usos mais comuns de um array. Em ciência da computação, isso significa uma coleção ordenada de elementos que suportam duas operações:

- `push` acrescenta um elemento ao final.
- `shift` obtém um elemento do começo, avançando a fila, de modo que o segundo elemento se torne o primeiro.

![](queue.png)

Arrays suportam ambas as operações.

Na prática, precisamos disso com muita frequência. Por exemplo, uma fila de mensagens que precisam ser mostradas na tela.

Há outro caso de uso para matrizes - a estrutura de dados chamada pilha ou [stack](https://en.wikipedia.org/wiki/Stack_ (abstract_data_type)).

Suporta duas operações:

- `push` adiciona um elemento ao final.
- `pop` obtém um elemento do final.

Assim, novos elementos são adicionados ou tirados sempre do "fim".

Uma pilha é normalmente ilustrada como um baralho de cartas: novas cartas são adicionadas ao topo ou tiradas do topo:

![](stack.png)

Para pilhas, o último item enviado é recebido primeiro, também chamado de princípio LIFO (Last-In-First-Out). Para filas, temos FIFO (First-In-First-Out).

Arrays em JavaScript podem funcionar tanto como uma fila quanto como uma pilha. Eles permitem adicionar/remover elementos para/desde o início ou o final.

Na ciência da computação, a estrutura de dados que permite isso é chamada [deque](https://en.wikipedia.org/wiki/Double-ended_queue).

**Métodos que funcionam com o final do array:**

`pop`
: Extrai o último elemento do array e o retorna:

    ```js run
    let fruits = ["Apple", "Orange", "Pear"];

    alert( fruits.pop() ); // remove "Pear" e alerta

    alert( fruits ); // Apple, Orange
    ```

`push`
: Anexa o elemento ao final do array:

    ```js run
    let fruits = ["Apple", "Orange"];

    fruits.push("Pear");

    alert( fruits ); // Apple, Orange, Pear
    ```

    A chamada `fruits.push(...)` é igual a `fruits[fruits.length] = ...`.

**Métodos que funcionam com o começo do array:**

`shift`
: Extrai o primeiro elemento do array e o retorna:

    ```js
    let fruits = ["Apple", "Orange", "Pear"];

    alert( fruits.shift() ); // remove Apple e alerta 

    alert( fruits ); // Orange, Pear
    ```

`unshift`
: Adiciona o elemento ao começo do array:

    ```js
    let fruits = ["Orange", "Pear"];

    fruits.unshift('Apple');

    alert( fruits ); // Apple, Orange, Pear
    ```

Métodos `push` e `unshift` podem adicionar múltiplos elementos de uma vez:

```js run
let fruits = ["Apple"];

fruits.push("Orange", "Peach");
fruits.unshift("Pineapple", "Lemon");

// ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]
alert( fruits );
```

## Internamente

Um array é um tipo especial de objeto. Os colchetes usados ​​para acessar uma propriedade `arr[0]` realmente vêm da sintaxe do objeto. Os números são usados ​​como chaves.

Eles estendem objetos fornecendo métodos especiais para trabalhar com coleções ordenadas de dados e também a propriedade `length`. Mas no fundo ainda é um objeto.

Lembre-se, existem apenas 7 tipos básicos em JavaScript. Array é um objeto e, portanto, se comporta como um objeto.

Por exemplo, é copiado por referência:

```js run
let fruits = ["Banana"]

let arr = fruits; // copia por referência (duas variáveis ​​referenciam o mesmo array)

alert( arr === fruits ); // true
 
arr.push("Pear"); // modifica o array por referencia

alert( fruits ); // Banana, Pear - 2 itens agora
```

...Mas o que torna os arrays realmente especiais é sua representação interna. O mecanismo tenta armazenar seus elementos na área de memória contígua, um após o outro, como descrito nas ilustrações deste capítulo, e há outras otimizações também, para fazer com que os arrays funcionem muito rápido.

Mas todos eles se quebram se paramos de trabalhar com um array como uma "coleção ordenada" e começamos a trabalhar com ele como se fosse um objeto regular.

Por exemplo, tecnicamente podemos fazer isso:

```js
let fruits = []; // make an array

fruits[99999] = 5; // assign a property with the index far greater than its length

fruits.age = 25; // create a property with an arbitrary name
```

Isso é possível, porque arrays são objetos em sua base. Podemos adicionar quaisquer propriedades a eles.

Mas o mecanismo verá que estamos trabalhando com o array como um objeto regular. Otimizações específicas de array não são adequadas para esses casos e serão desativadas, seus benefícios desaparecem.

As maneiras de usar mal um array:

- Adicionar uma propriedade não numérica como `arr.test = 5`.
- Fazem buracos, como: add arr[0] `e depois arr[1000]` (e nada entre eles).
- Preencher o array na ordem inversa, como `arr [1000]`, `arr [999]` e assim por diante.

Por favor, pense nos arrays como estruturas especiais para trabalhar com os *dados ordenados*. Eles fornecem métodos especiais para isso. As matrizes são cuidadosamente ajustadas dentro dos mecanismos JavaScript para trabalhar com dados ordenados contíguos, por favor, use-os dessa maneira. E se você precisar de chaves arbitrárias, é grande a probabilidade de realmente precisar de um objeto regular {}.

## Performance

Os métodos `push/pop` são executados rapidamente, enquanto` shift/unshift` são lentos.

![](array-speed.png)

Por que é mais rápido trabalhar com o final de uma matriz do que com seu início? Vamos ver o que acontece durante a execução:

```js
fruits.shift(); // pegue 1 elemento do início
```

Não é suficiente tirar e remover o elemento com o número `0`. Outros elementos também precisam ser renumerados.

A operação `shift` deve fazer 3 coisas:

1. Remove o elemento com o índice `0`.
2. Move todos os elementos para a esquerda, renumerá-os do índice `1` para` 0`, de `2` para` 1` e assim por diante.
3. Atualiza a propriedade `length`.

![](array-shift.png)

**Quanto mais elementos na matriz, mais tempo para movê-los, mais operações na memória.**

O mesmo acontece com o `unshift`: para adicionar um elemento ao início do array, precisamos primeiro mover os elementos existentes para a direita, aumentando seus índices.

E quanto a 'push/pop'? Eles não precisam mover nada. Para extrair um elemento do final, o método `pop` limpa o índice e encurta `length`.

As ações para a operação `pop`:

```js
fruits.pop(); // pegue 1 elemento do final
```

![](array-pop.png)

**O método `pop` não precisa mover nada, porque outros elementos mantêm seus índices. É por isso que é incrivelmente rápido.**

O mesmo acontece com o método `push`.

## Loops

Uma das formas mais antigas de percorrer os itens de um array é o loop `for` sobre os índices:

```js run
let arr = ["Apple", "Orange", "Pear"];

*!*
for (let i = 0; i < arr.length; i++) {
*/!*
  alert( arr[i] );
}
```

Mas para arrays existe outra forma de loop, `for..of`:

```js run
let fruits = ["Apple", "Orange", "Plum"];

// iterates over array elements
for (let fruit of fruits) {
  alert( fruit ); 
}
```

O `for..of` não dá acesso ao número do elemento atual, apenas seu valor, mas na maioria dos casos é suficiente. E é mais curto.

Tecnicamente, como os arrays são objetos, também é possível usar o `for..in`:

```js run
let arr = ["Apple", "Orange", "Pear"];

*!*
for (let key in arr) {
*/!*
  alert( arr[key] ); // Apple, Orange, Pear
}
```

Mas isso é realmente uma má ideia. Existem problemas potenciais com isso:

1. O loop `for..in` itera sobre *todas as propriedades*, não apenas as numéricas.

  Existem os chamados objetos "array-like" no navegador e em outros ambientes, que *se parecem com arrays*. Ou seja, eles possuem propriedades length e indíces, mas também podem ter outras propriedades e métodos não-numéricos, que normalmente não precisamos. O loop `for..in` irá listá-las. Portanto, se precisarmos trabalhar com objetos do tipo array, essas propriedades "extras" podem se tornar um problema.

2. O loop `for..in` é otimizado para objetos genéricos, não para arrays, e portanto é 10 a 100 vezes mais lento. Claro, ainda é muito rápido. O aumento de velocidade só pode importar em gargalos ou parecer irrelevante. Mas ainda devemos estar conscientes da diferença.

Geralmente, não devemos usar `for..in` para matrizes.


## Uma conversa sobre "length"

A propriedade `length` é atualizada automaticamente quando modificamos o array. Para ser preciso, na verdade não é a contagem de valores no array, mas o maior índice numérico mais um.

Por exemplo, um único elemento com um índice grande dá um grande tamanho:

```js run
let fruits = [];
fruits[123] = "Apple";

alert( fruits.length ); // 124
```

Note que normalmente não usamos arrays assim.

Outra coisa interessante sobre a propriedade `length` é que ela é gravável.

Se aumentarmos manualmente, nada de interessante acontece. Mas se diminuirmos, o array será truncado. O processo é irreversível, aqui está o exemplo:

```js run
let arr = [1, 2, 3, 4, 5];

arr.length = 2; // truncado para 2 elements
alert( arr ); // [1, 2]

arr.length = 5; // volta length ao valor original
alert( arr[3] ); // undefined: o valor não volta ao original
```

Então, a maneira mais simples de limpar o array é: `arr.length = 0;`.


## new Array() [#new-array]

Há mais uma sintaxe para criar um array:

```js
let arr = *!*new Array*/!*("Apple", "Pear", "etc");
```

É raramente usado, porque os colchetes `[]` são mais curtos. Também há um recurso complicado com isso.

Se `new Array` é chamado com um único argumento que é um número, então ele cria um array *sem itens, mas com o comprimento dado*.

Vamos ver como se pode atirar no pé:

```js run
let arr = new Array(2); // irá criar um array de [2]?

alert( arr[0] ); // undefined! nenhum elemento.

alert( arr.length ); // length 2
```

No código acima, `new Array(number)` possui todos elementos como `undefined`.

Para evitar essas surpresas, geralmente usamos colchetes, a menos que realmente saibamos o que estamos fazendo.

## Arrays multidimensionais

Arrays podem ter itens que também são arrays. Podemos usá-lo para arrays multidimensionais, para armazenar matrizes:

```js run
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

alert( matrix[1][1] ); // o elemento central
```

## toString

Arrays têm sua própria implementação do método `toString` que retorna uma lista de elementos separados por vírgulas.

Por exemplo:


```js run
let arr = [1, 2, 3];

alert( arr ); // 1,2,3
alert( String(arr) === '1,2,3' ); // true
```

Além disso, vamos tentar isso:

```js run
alert( [] + 1 ); // "1"
alert( [1] + 1 ); // "11"
alert( [1,2] + 1 ); // "1,21"
```

Arrays não possuem `Symbol.toPrimitive` nem um viável` valueOf`, eles implementam apenas a conversão `toString`, então aqui` [] `se torna uma string vazia,` [1] `torna-se` "1" `e` [ 1,2] `torna-se` "1,2" `.

When the binary plus `"+"` operator adds something to a string, it converts it to a string as well, so the next step looks like this:

```js run
alert( "" + 1 ); // "1"
alert( "1" + 1 ); // "11"
alert( "1,2" + 1 ); // "1,21"
```

## Resumo

Array é um tipo especial de objeto, adequado para armazenar e gerenciar itens de dados ordenados.

- A declaração:

    ```js
    // square brackets (usual)
    let arr = [item1, item2...];

    // new Array (exceptionally rare)
    let arr = new Array(item1, item2...);
    ```

    A chamada para `new Array (number)` cria um array com o comprimento dado, mas sem elementos.

- A propriedade `length` é o comprimento do array ou, para ser mais preciso, seu último índice numérico mais um. Ele é ajustado automaticamente por métodos de array.
- Se encurtarmos `length` manualmente, o array será truncado.

Podemos usar um array como um deque com as seguintes operações:

- `push(...items)` adiciona `items` no final.
- `pop()` remove o elemento do final e o retorna.
- `shift()` remove o elemento do começo e o retorna.
- `unshift(...items)` adiciona `items` no começo.

Para percorrer os elementos do array:
  - `for (let i=0; i<arr.length; i++)` -- funciona mais rápido, compatível com navegadores antigos.
  - `for (let item of arr)` -- a sintaxe moderna para itens apenas
  - `for (let i in arr)` -- nunca use.

Retornaremos aos arrays e estudaremos mais métodos para adicionar, remover, extrair elementos e classificar arrays no capítulo <info:array-methods>.

