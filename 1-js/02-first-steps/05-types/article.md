# Tipos de dados

Uma variável em JavaScript é sempre de um certo tipo. Por exemplo, uma string ou um número.

Há oito tipos de dados básicos em JavaScript. Aqui, vamos cobri-los em geral e nos próximos capítulos vamos falar sobre cada um deles em detalhe.

Podemos por qualquer tipo numa variável. Por exemplo, uma variável pode em um momento ser uma string e em outro um número:

```js
// nenhum erro
let message = "olá";
message = 123456;
```

As linguagens de programação que permitem tais coisas são chamadas "dinamicamente tipadas", o que significa que existem tipos de dados, mas as variáveis não estão vinculadas a nenhum deles.

## Um número

```js
let n = 123;
n = 12.345;
```

O tipo *número* representa números inteiros e números de ponto flutuante.

Existem muitas operações para números, por exemplo, multiplicação `*`, divisão `/`, adição `+`, subtração `-`, e assim por diante.

Além dos números regulares, existem os chamados "valores numéricos especiais" que também pertencem a este tipo de dados: `Infinito`, `-Infinito` e `NaN`.

- `Infinito` representa a matemática [Infinity](https://en.wikipedia.org/wiki/Infinity) ∞. É um valor especial que é maior que qualquer número.

    Podemos obtê-lo como resultado da divisão por zero:

    ```js run
    alert( 1 / 0 ); // Infinito
    ```

     Ou apenas referi-lo diretamente:

    ```js run
    alert( Infinity ); // Infinito
    ```
- `NaN` representa um erro computacional. É o resultado de uma operação matemática incorreta ou indefinida, por exemplo:

    ```js run
    alert( "not a number" / 2 ); // NaN, tal divisão é errônea
    ```

    `NaN` é pegajoso. Qualquer outra operação em `NaN` retorna `NaN`:

    ```js run
    alert( "not a number" / 2 + 5 ); // NaN
    ```

     Então, se há um `NaN` em algum lugar em uma expressão matemática, ele se propaga para o resultado inteiro.

```smart header="As operações matemáticas são seguras"
Fazer matemática é "seguro" em JavaScript. Podemos fazer qualquer coisa: dividir por zero, tratar strings não-numéricas como números, etc.

O script nunca vai parar com um erro fatal ("morrer"). Na pior das hipóteses, teremos o `NaN` como resultado.
```

Os valores numéricos especiais pertencem formalmente ao tipo "número". Claro que não são números no sentido comum desta palavra.

Veremos mais sobre como trabalhar com números no capítulo <info:number>.

## BigInt [#bigint-type]

In JavaScript, the "number" type cannot represent integer values larger than <code>(2<sup>53</sup>-1)</code> (that's `9007199254740991`), or less than <code>-(2<sup>53</sup>-1)</code> for negatives. It's a technical limitation caused by their internal representation.

For most purposes that's quite enough, but sometimes we need really big numbers, e.g. for cryptography or microsecond-precision timestamps.

`BigInt` type was recently added to the language to represent integers of arbitrary length.

A `BigInt` value is created by appending `n` to the end of an integer:

```js
// the "n" at the end means it's a BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

As `BigInt` numbers are rarely needed, we don't cover them here, but devoted them a separate chapter <info:bigint>. Read it when you need such big numbers.


```smart header="Compatibility issues"
Right now, `BigInt` is supported in Firefox/Chrome/Edge/Safari, but not in IE.
```

You can check [*MDN* BigInt compatibility table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility) to know which versions of a browser are supported.

## String

Uma string em JavaScript deve estar entre aspas.

```js
let str = "Olá";
let str2 = 'Aspas simples também são ok';
let phrase = `pode incorporar outra ${str}`;
```

Em JavaScript, existem 3 tipos de citações.

1. Aspas duplas: `"Olá"`.
2. Aspas simples: `'Olá'`.
3. Backticks: <code>&#96;Olá&#96;</code>.

Aspas duplas e simples são citações "simples". Não há praticamente diferença entre elas em JavaScript.

Backticks são citações de "funcionalidade estendida". Eles nos permitem incorporar variáveis e expressões em uma string envolvendo-as em `$ {…}`, por exemplo:

```js run
let name = "John";

// embed a variable
alert( `Olá, *!*${name}*/!*!` ); // Olá, John!

// embed an expression
alert( `o resultado é *!*${1 + 2}*/!*` ); // o resultado é 3
```

A expressão dentro de `${…}` é avaliada e o resultado torna-se uma parte da string. Podemos colocar qualquer coisa lá: uma variável como `name` ou uma expressão aritmética como `1 + 2` ou algo mais complexo.

Por favor, note que isso só pode ser feito com backticks. Outras citações não têm esta funcionalidade de incorporação!
```js run
alert( "o resultado é ${1 + 2}" ); // o resultado é ${1 + 2} (aspas duplas não fazem nada)
```

Abordaremos as strings mais detalhadamente no capítulo <info:string>.

```smart header="Não há nenhum tipo *caractere*."
Em algumas linguagens, existe um tipo especial "caractere" para um único caractere. Por exemplo, na linguagem C e em Java é chamado `char`.

Em JavaScript, não existe tal tipo. Existe apenas um tipo: `string`. Uma string pode consistir de zero caracteres (ser vazia), apenas um caractere ou muitos deles.
```

## Um booleano (tipo lógico)

O tipo booleano tem apenas dois valores: `true` e `false`.

Este tipo é comumente usado para armazenar valores de sim/não: `true` significa "sim, correto", e `false` significa "não, incorreto".

Por exemplo:

```js
let nameFieldChecked = true; // sim, o campo nome é verificado
let ageFieldChecked = false; // não, o campo idade não é verificado
```

Os valores booleanos também vêm como resultado de comparações:

```js run
let isGreater = 4 > 1;

alert( isGreater ); // true (o resultado da comparação é "sim")
```

Abordaremos os booleanos mais profundamente no capítulo <info:logical-operators>.

## O valor "null"

O valor especial `null` não pertence a nenhum dos tipos descritos acima.

Ele forma um tipo separado do seu próprio que contém apenas o valor `null`:

```js
let age = null;
```

Em JavaScript, `null` não é uma "referência a um objeto não-existente" ou um "ponteiro nulo" como em alguns outros idiomas.

É apenas um valor especial que representa "nada", "vazio" ou "valor desconhecido".

O código acima declara que `age` é desconhecido.

## O valor "undefined"

O valor especial `undefined` também se diferencia. Faz um tipo próprio, tal como `null`.

O significado de `undefined` é "o valor não é atribuído".

Se uma variável é declarada, mas não atribuída, então seu valor é `undefined`:

```js run
let age;

alert(x); // mostra "undefined"
```

Tecnicamente, é possível explicitamente atribuir `undefined` a qualquer variável:

```js run
let age = 100;

// altera o valor para 'undefined'
age = undefined;

alert(age); // "undefined"
```

...mas não recomendamos fazer isso. Normalmente, usamos `null` para atribuir um valor "vazio" ou "desconhecido" a uma variável, enquanto `undefined` é reservado como um valor por defeito inicial para coisas não atribuídas.

## Objetos e Símbolos

O tipo `object` é especial.

Todos os outros tipos são chamados de "primitivos" porque seus valores podem conter apenas uma única coisa (seja ela uma string, ou um número ou qualquer outra). Por outro lado, os objetos são usados para armazenar coleções de dados e entidades mais complexas.

Por serem tão importantes, os objetos merecem um tratamento especial. Nós vamos lidar com eles no capítulo <info: object>, depois que aprendermos mais sobre primitivos.

O tipo `symbol` é usado para criar identificadores únicos para objetos. Nós o temos que mencionar aqui para completude, mas também adiar os seus detalhes até sabermos sobre objetos.

## The typeof operator [#type-typeof]

O operador `typeof` retorna o tipo do argumento. É útil quando queremos processar valores de diferentes tipos de forma diferente ou apenas queremos fazer uma verificação rápida.

<<<<<<< HEAD
Suporta duas formas de sintaxe:

1. Como operador: `typeof x`.
2. Como uma função: `typeof(x)`.

Em outras palavras, trabalha com parênteses ou sem eles. O resultado é o mesmo.

A chamada para `typeof x` retorna uma string com o nome do tipo:
=======
A call to `typeof x` returns a string with the type name:
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

```js
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

*!*
typeof Math // "object"  (1)
*/!*

*!*
typeof null // "object"  (2)
*/!*

*!*
typeof alert // "function"  (3)
*/!*
```

As três últimas linhas podem precisar de explicações adicionais:

<<<<<<< HEAD
1. `Math` é um objeto embutido que fornece operações matemáticas. Nós o vamos aprender no capítulo <info:number>. Aqui, ele serve apenas como um exemplo de um objeto.
2. O resultado de `typeof null` é `"object"`. É um erro oficialmente reconhecido no comportamento de `typeof` e mantido para compatibilidade. Naturalmente, `null` não é um objeto. É um valor especial com um tipo separado próprio.
3. O resultado de `typeof alert` é `"function"`, porque `alert` é uma função. Vamos estudar as funções nos próximos capítulos onde veremos também que não há nenhum tipo especial "função" em JavaScript. As funções pertencem ao tipo objecto. Mas o `typeof` as trata de forma diferente, retornando `"function"`. Isto, também vem dos primeiros dias do JavaScript. Tecnicamente, é incorreto, mas muito conveniente na prática.

## Resumo
=======
1. `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter <info:number>. Here, it serves just as an example of an object.
2. The result of `typeof null` is `"object"`. That's an officially recognized error in `typeof`, coming from very early days of JavaScript and kept for compatibility. Definitely, `null` is not an object. It is a special value with a separate type of its own. The behavior of `typeof` is wrong here.
3. The result of `typeof alert` is `"function"`, because `alert` is a function. We'll study functions in the next chapters where we'll also see that there's no special "function" type in JavaScript. Functions belong to the object type. But `typeof` treats them differently, returning `"function"`. That also comes from the early days of JavaScript. Technically, such behavior isn't correct, but can be convenient in practice.

```smart header="The `typeof(x)` syntax"
You may also come across another syntax: `typeof(x)`. It's the same as `typeof x`.

To put it clear: `typeof` is an operator, not a function. The parentheses here aren't a part of `typeof`. It's the kind of parentheses used for mathematical grouping.

Usually, such parentheses contain a mathematical expression, such as `(2 + 2)`, but here they contain only one argument `(x)`. Syntactically, they allow to avoid a space between the `typeof` operator and its argument, and some people like it.

Some people prefer `typeof(x)`, although the `typeof x` syntax is much more common.
```

## Summary
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

Existem 8 tipos básicos em JavaScript.

- `number` para números de qualquer tipo: inteiro ou ponto flutuante; inteiros estão limitados a <code>±(2<sup>53</sup>-1)</code>.
- `bigint` é para números inteiros de comprimento arbitrário.
- `string` para cadeias-de-caracteres. Uma *string* pode ter zero ou mais caracteres, não há nenhum tipo de caractere único separado.
- `boolean` para `true`/`false`.
- `null` para valores desconhecidos -- um tipo autônomo que tem um único valor `null`.
- `undefined` para valores não atribuídos -- um tipo autônomo que tem um único valor `undefined`.
- `object` para estruturas de dados mais complexas.
- `symbol` para identificadores exclusivos.

O operador `typeof` nos permite ver que tipo está armazenado em uma variável.

<<<<<<< HEAD
- Duas formas: `typeof x` ou `typeof(x)`.
- Retorna uma string com o nome do tipo, como `"string"`.
- Para `null` retorna `"object"` -- isso é um erro na linguagem, não é realmente um objeto.
=======
- Usually used as `typeof x`, but `typeof(x)` is also possible.
- Returns a string with the name of the type, like `"string"`.
- For `null` returns `"object"` -- this is an error in the language, it's not actually an object.
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

Nos próximos capítulos, nos vamos concentrar nos valores primitivos e, uma vez familiarizados com eles, passaremos para os objetos.
