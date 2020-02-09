# *Arrays*

Objetos permitem-lhe armazenar coleções de valores por chaves. É bom.

Mas, frequentemente precisamos de uma *coleção ordenada*, onde tenhamos um 1º, 2º, 3º elemento e assim por diante. Por exemplo, precisamos dela para armazenar uma lista de algo como: visitantes, bens, elementos de HTML, etc. 

Não é conveniente usar um objeto aqui, porque ele não dispõe de métodos para gerir a ordem dos elementos. Não podemos inserir uma nova propriedade “entre” outras já existentes. Objetos simplesmente não são adequados a tal uso.

Existe uma estrutura de dados especial chamada `Array`,  para armazenar coleções ordenadas.

## Declaração

Existem duas sintaxes para criar um *array* vazio:

```js
let arr = new Array();
let arr = [];
```

Quase sempre é usada a segunda sintaxe. Podemos fornecer elementos iniciais entre os parênteses:

```js
let fruits = ["Maçã", "Laranja", "Ameixa"];
```

Os elementos de um  *array* são numerados, começando por zero.

Podemos obter um elemento por meio do seu número entre parênteses retos:

```js run
let fruits = ["Maçã", "Laranja", "Ameixa"];

alert( fruits[0] ); // Maçã
alert( fruits[1] ); // Laranja
alert( fruits[2] ); // Ameixa
```

Podemos substituir um elemento:

```js
fruits[2] = 'Pêra'; // now ["Maçã", "Laranja", "Pêra"]
```

...Ou adicionar um novo ao *array*:

```js
fruits[3] = 'Limão'; // now ["Maçã", "Laranja", "Pêra", "Limão"]
```

A contagem total dos elementos no *array* é o seu `*length*` (comprimento):

```js run
let fruits = ["Maçã", "Laranja", "Ameixa"];

alert( fruits.length ); // 3
```

Podemos também utilizar `alert` para mostrar todo o *array*.

```js run
let fruits = ["Maçã", "Laranja", "Ameixa"];

alert( fruits ); // Maçã,Laranja,Ameixa
```

Um *array* pode armazenar elementos de qualquer tipo.

Por exemplo:

```js run no-beautify
// mistura de valores
let arr = [ 'Maçã', { name: 'John' }, true, function() { alert('olá'); } ];

// obtenha o objeto no índice 1 e a seguir mostre o seu nome
alert( arr[1].name ); // John

// obtenha a função no índice 3 e a execute
arr[3](); // olá
```


````smart header="Vírgula final"
Um array, tal como um objeto, pode terminar por uma vírgula:
```js
let fruits = [
  "Maçã",
  "Laranja",
  "Ameixa"*!*,*/!*
];
```

O estilo de "vírgula final" torna mais fácil inserir/remover itens, porque todas as linhas se tornam semelhantes.
````

## Métodos pop/push, shift/unshift

Uma [fila](https://pt.wikipedia.org/wiki/FIFO) (*queue*) é um dos usos mais comuns de um *array*. Em ciência dos computadores, isto significa uma coleção ordenada de elementos  que suporta duas operações:

- `push` adiciona um elemento ao final.
- `shift` obtem um elemento do início, avançando a fila, de modo que o 2º elemento se torne no 1º.

![](queue.svg)

Os *arrays* suportam ambas as operações.

Na prática, nós as precisamos frequentemente. Por exemplo, uma fila de mensagens que precise de ser mostrada no ecrâ.

Existe um outro caso prático para *arrays* -- a estrutura de dados chamada [pilha](https://pt.wikipedia.org/wiki/Pilha_(inform%C3%A1tica)) (stack).

Ela suporta duas operações:

- `push` adiciona um elemento ao final.
- `pop` toma um elemento do final.

Assim, novos elementos são adicionados ou tomados sempre a partir do "final".

Uma pilha (*stack*) é geralmente ilustrada como um baralho de cartas: novas cartas são adicionadas ao topo ou tiradas do topo:

![](stack.svg)

Para pilhas (*stacks*), o último item inserido é recebido primeiro, o que também é chamado de princípio *LIFO* (*Last-In-First-Out*) [o-Último-a-Entrar-é-o-Primeiro-a-Sair]. Para filas (*queues*), nós temos *FIFO* (*First-In-First-Out*) [o-Primeiro-a-Entrar-é-o-Primeiro-a-Sair].
Os *arrays* em JavaScript podem funcionar tanto como uma fila, como uma pilha. Eles permitem-lhe adicionar/remover elementos quer ao/do início como ao/do final.

Em ciência dos computadores, a estrutura de dados que o permite é chamada [deque](https://pt.wikipedia.org/wiki/Deque_(estruturas_de_dados)).

**Métodos que trabalham no final do _array_:**

`*pop*`
: Extrai o último elemento do *array* e o retorna:

    ```js run
    let fruits = ["Maçã", "Laranja", "Pêra"];

    alert( fruits.pop() ); // remove "Pêra" e o exibe

    alert( fruits ); // Maçã, Laranja
    ```

`*push*`
: Adiciona o elemento ao final do *array*:

    ```js run
    let fruits = ["Maçã", "Laranja"];

    fruits.push("Pêra");

    alert( fruits ); // Maçã, Laranja, Pêra
    ```

    A invocação `fruits.push(...)` é igual a `fruits[fruits.length] = ...`.

**Métodos que trabalham no início do _array_:**

`*shift*`
: Extrai o primeiro elemento do *array* e o retorna:

    ```js
    let fruits = ["Maçã", "Laranja", "Pêra"];

    alert( fruits.shift() ); // remove Maçã e o exibe

    alert( fruits ); // Laranja, Pêra
    ```

`*unshift*`
: Adiciona o elemento ao início do *array*:

    ```js
    let fruits = ["Laranja", "Pêra"];

    fruits.unshift('Maçã');

    alert( fruits ); // Maçã, Laranja, Pêra
    ```

Os métodos `*push*` e `*unshift*` podem adicionar múltiplos elementos de uma só vez:

```js run
let fruits = ["Maçã"];

fruits.push("Laranja", "Pêssego");
fruits.unshift("Ananás", "Limão");

// ["Ananás", "Limão", "Maçã", "Laranja", "Pêssego"]
alert( fruits );
```

## Internamente

Um *array* é um tipo especial de objeto. Os parêntesis retos utilizados para aceder a uma propriedade `arr[0]` vêm, na verdade, da sintaxe de objetos. Números são usados como chaves.

Eles são uma extensão aos objetos, fornecendo métodos especiais para trabalhar com coleções ordenadas de dados e também a propriedade `length`. Assim, no seu núcleo um *array* é um objeto.

Lembre-se, existem apenas 7 tipos básicos em JavaScript. O *array* é um objeto e portanto comporta-se como um objeto.

Por exemplo, ele é copiado por referência:

```js run
let fruits = ["Banana"]

let arr = fruits; // cópia por referência (duas variáveis referenciam o mesmo array)

alert( arr === fruits ); // true (verdadeiro)
 
arr.push("Pear"); // modifique o array por referência

alert( fruits ); // Banana, Pêra - 2 itens agora
```

...Mas, o que torna *arrays* realmente  especiais é a sua representação interna. O interpretador de JavaScript tenta armazenar os seus elementos numa área contígua de memória, um após outro, precisamente como mostrado nas ilustrações deste capítulo, e existem também outras optimizações para fazerem os *arrays* trabalhar verdadeiramente rápido.

Mas, todas elas quebram se pararmos de trabalhar com um *array* como uma "coleção ordenada", e começarmos a trabalhar com ele como se fosse um objeto regular.

Por exemplo, tecnicamente nós podemos fazer isto:

```js
let fruits = []; // cria um array

fruits[99999] = 5; // atribui uma propriedade com um índice muito maior do que o seu comprimento

fruits.age = 25; // cria uma propriedade com um nome arbitrário
```

Isso é possível, porque *arrays* são objetos na sua base. Podemos adicionar qualquer propriedade a eles.

Mas, o interpretador de JavaScript (*JavaSript engine*) verá que nós estamos a trabalhar com o *array* como com um objeto regular. Optimizações especificas para *arrays* não são adequadas a estes casos e serão desativadas, os seus benifícios desaparecem.

Formas de má utilização de um *array*:

- Adicionar uma propriedade não-numérica como `arr.test = 5`. 
- Formar buracos, como: adicionar `arr[0]` e depois `arr[1000]` (e nada entre eles).
- Preencher o *array* por ordem inversa, como `arr[1000]`, `arr[999]` e assim por diante.

Por favor, pense em *arrays* como estruturas especiais para trabalhar com *dados ordenados*. Eles fornecem métodos especiais para isso. *Arrays* são cuidadosamente afinados dentro dos interpretadores de JavaScript (*JavaScript engines*) para trabalharem com dados ordenados contíguos, por favor os utilize dessa forma. E, se precisar de chaves arbitrárias, são altas as chances de que na verdade necessite de um objeto regular `{}`.

## Performance

Métodos `push/pop` são executados rápidamente, enquanto `shift/unshift` são lentos.

![](array-speed.svg)

Porque é mais rápido trabalhar  no final de um *array*, do que  no seu início? Vejamos o que acontece durante a execução:

```js
fruits.shift(); // tome 1 elemento do início
```

Não é suficiente tomar e remover o elemento com o número `0`. Os outros elementos também necessitam de ser renumerados.

A operação `shift` deve efetuar 3 coisas:

1. Remover o elemento com o indice `0`.
2. Mover todos os elementos para a esquerda, renumerando-os do indice `1` para `0`, do `2` para `1`, e assim por diante.
3. Atualizar a propriedade `length`.

![](array-shift.svg)

**Quantos mais elementos no *array*, mais tempo se leva para os mover, e mais operações em memória.**

À semelhança acontece com `unshift`: para adicionar um elemento ao início do *array*, nós primeiro precisamos de mover os elementos existentes para à direita, e aumentar os seus indices.

E, o que se passa com `push/pop`? Eles, não precisam de mover nada. Para extrair um elemento do final, o método `pop` elimina o indice e diminui `length`.

As ações para a operação `pop`:

```js
fruits.pop(); // tome 1 elemento do final
```

![](array-pop.svg)

**O método `pop` não precisa de mover nada, porque os outros elementos mantêm os seus indices. É por isso que são extremamente rápidos.**

O semelhante se passa com o método `push`.

## *Loops*

Uma das velhas formas para percorrer itens de um *array*, é através de um ciclo (*loop*) `for` sobre os seus indices:

```js run
let arr = ["Maçã", "Laranja", "Pêra"];

*!*
for (let i = 0; i < arr.length; i++) {
*/!*
  alert( arr[i] );
}
```

Mas, para *arrays* existe um outro ciclo (*loop*), `for..of`:

```js run
let fruits = ["Maçã", "Laranja", "Ameixa"];

// itera sobre os elementos do array
for (let fruit of fruits) {
  alert( fruit ); 
}
```

O `for..of` não dá acesso ao número do elemento atual, mas apenas ao seu valor, contudo em muitos casos é o suficiente. E a sintaxe é mais curta.

Tecnicamente, uma vez que *arrays* são objetos, também é possível usar `for..in`:

```js run
let arr = ["Maçã", "Laranja", "Pêra"];

*!*
for (let key in arr) {
*/!*
  alert( arr[key] ); // Maçã, Laranja, Pêra
}
```

Mas, na verdade é uma má ideia. Existem  problemas potenciais com isso:

1. O laço (*loop*) `for..in` itera sobre *todas as propriedades*, não apenas sobre as numéricas.

    Existem os objetos chamados de "semelhantes-a-arrays" (*array-like*), no navegador (*browser*) e em outros ambientes, que *se parecem com _arrays_*. Isto é, eles têm as propriedades `length` (comprimento) e indices, mas também podem ter outras propriedades e métodos não-numéricos, que geralmente não precisamos. Contudo, o laço (*loop*) `for..in` listará todos eles. Assim, se nós precisarmos de trabalhar com objetos semelhantes-a-arrays, aí estas propriedades "extra" podem constituir um problema.

2. O laço (*loop*)  `for..in` está optimizado para objetos genéricos, não *arrays*, e desta forma é 10-100 mais lento. Contudo, ainda é muito rápido. A velocidade pode apenas ser importante em pontos cruciais (*bottlenecks*), e em caso contrário parecer irrelevante. Mas, ainda assim deveríamos estar de sobreaviso sobre a diferença.

Em geral, não deveríamos usar `for..in` para *arrays*.

## Uma palavra sobre "comprimento"

A propriedade `length` (comprimento) se atualiza automaticamente quando nós modificamos o *array*. Para ser preciso, na verdade ela não é a contagem dos valores no *array*, mas sim o maior indice numérico mais um.

Por exemplo, um único elemento com um indice alto produz um comprimento grande:

```js run
let fruits = [];
fruits[123] = "Maçã";

alert( fruits.length ); // 124
```

Note que geralmente nós não usamos *arrays* dessa forma.

Uma outra coisa interessante sobre a propriedade `length`, é que pode ser alterada.

Se a aumentarmos manualmente, nada de interessante acontece. Mas, se nós a diminuirmos, o *array* é truncado. O processo é irreversível, e aqui está um exemplo:

```js run
let arr = [1, 2, 3, 4, 5];

arr.length = 2; // trunque para 2 elementos
alert( arr ); // [1, 2]

arr.length = 5; // retorna o comprimento de volta
alert( arr[3] ); // undefined: os valores não reaparecem
```

Assim, a forma mais simples de limpar um array é: `arr.length = 0;`.


## new Array() [#novo-array]

Há mais uma sintaxe para se criar um *array*:

```js
let arr = *!*new Array*/!*("Maçã", "Pêra", "etc");
```

Raramente é usada, porque os parênteses retos são mais curtos `[]`. Além disso, existe uma característica peculiar a acompanhá-la.

Se `new Array` for chamada com um número como único argumento, então ela cria um *array* *sem itens*, mas com esse comprimento (*length*).

Vejamos como alguém pode se atraiçoar:

```js run
let arr = new Array(2); // irá criar um array como [2] ?

alert( arr[0] ); // 'undefined!' elemento não definido.

alert( arr.length ); // comprimento 2
```

No código acima, `new Array(number)` possui todos os elementos como `undefined`.

Para evitar tais surpresas, nós geralmente utilizamos parênteses retos, a não ser que realmente saibamos o que estamos a fazer.

## *Arrays* multidimensionais

*Arrays* podem ter itens que também sejam arrays. Podemos os empregar em *arrays* multidimensionais, para armazenar matrizes:

```js run
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

alert( matrix[1][1] ); // o elemento central
```

## *toString*

Os *arrays* têm a sua própria implementação do método `toString`, que retorna uma lista de elementos separados por vírgulas.

Por exemplo:

```js run
let arr = [1, 2, 3];

alert( arr ); // 1,2,3
alert( String(arr) === '1,2,3' ); // true (verdadeiro)
```

De igual modo, vamos tentar isto:

```js run
alert( [] + 1 ); // "1"
alert( [1] + 1 ); // "11"
alert( [1,2] + 1 ); // "1,21"
```

*Arrays* não têm `Symbol.toPrimitive`, nem um `valueOf` útil, eles apenas implementam a conversão `toString`, e assim `[]` se torna numa *string* vazia, `[1]` se torna em `"1"` e `[1,2]` em `"1,2"`.

Quando o operador mais `"+"` binário adiciona algo a uma *string*, ele também converte esse elemento para *string*, e assim os passos anteriores se parecem com:

```js run
alert( "" + 1 ); // "1"
alert( "1" + 1 ); // "11"
alert( "1,2" + 1 ); // "1,21"
```

## Sumário

O *array* é um tipo especial de objeto, apropriado para armazenar e gerir itens de dados ordenados.

- A declaração:

    ```js
    // parênteses retos (usual)
    let arr = [item1, item2...];

    // new Array (excepcionalmente rara)
    let arr = new Array(item1, item2...);
    ```

    A chamada a `new Array(number)` cria um *array* com o dado comprimento, mas sem elementos.

- A propriedade `length` refere-se ao comprimento do *array* ou, para ser preciso, ao seu último indice numérico mais um. Ela é auto-ajustada por intermédio de métodos do *array*.
- Se nós encurtarmos `length` manualmente, o *array* é truncado.

Podemos usar um *array* como uma (estrutura de dados) *deque*, com as seguintes operações:

- `push(...items)` adiciona `items` ao final.
- `pop()` remove o elemento no final, e o retorna.
- `shift()` remove o elemento no início, e o retorna.
- `unshift(...items)` adiciona itens ao início.

Para percorrer os elementos do *array*:
  - `for (let i=0; i<arr.length; i++)` -- o mais rápido a executar, compatível com navegadores (*browsers*) antigos.
  - `for (let item of arr)` -- sintaxe moderna apenas para itens.
  - `for (let i in arr)` -- nunca use.

Nós voltaremos aos *arrays*, e estudaremos mais métodos para adicionar, remover, extrair elementos e ordenar *arrays* no capítulo <info:array-methods>.
