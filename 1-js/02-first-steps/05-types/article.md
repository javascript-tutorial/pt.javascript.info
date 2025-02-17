# Tipos de dados

Uma variável em JavaScript é sempre de um certo tipo. Por exemplo, uma string ou um número.

Há oito tipos de dados básicos em JavaScript. Aqui, vamos cobri-los, em geral, e nos próximos capítulos vamos falar sobre cada um deles em detalhe.

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

Além dos números regulares, existem os chamados "valores numéricos especiais" que também pertencem aos tipos de dados: `Infinito`, `-Infinito` e `NaN`.

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

    `NaN` é pegajoso. Qualquer outra operação matemática com `NaN` retorna `NaN`:

    ```js run
    alert( NaN + 1 ); // NaN
    alert( 3 * NaN ); // NaN
    alert( "not a number" / 2 - 1 ); // NaN
    ```

     Então, se há um `NaN` em algum lugar em uma expressão matemática, ele se propaga para o resultado inteiro (existe apenas uma exceção nisto: `NaN ** 0` é `1`).

```smart header="As operações matemáticas são seguras"
Fazer matemática é "seguro" em JavaScript. Podemos fazer qualquer coisa: dividir por zero, tratar strings não-numéricas como números, etc.

O script nunca vai parar com um erro fatal ("morrer"). Na pior das hipóteses, teremos o `NaN` como resultado.
```

Os valores numéricos especiais pertencem formalmente ao tipo "número". Claro que não são números no sentido comum desta palavra.

Veremos mais sobre como trabalhar com números no capítulo <info:number>.

## BigInt [#bigint-type]

<<<<<<< HEAD
Em JavaScript, o tipo "number" não pode representar com segurança valores inteiros maiores que <code>(2<sup>53</sup>-1)</code> (que é `9007199254740991`) ou menores que <code>-( 2<sup>53</sup>-1)</code> para negativos.

Para ser realmente preciso, o tipo "number" pode armazenar números inteiros maiores (até <code>1.7976931348623157 * 10<sup>308</sup></code>), mas fora do intervalo de números inteiros seguros <code>±(2 <sup>53</sup>-1)</code> haverá um erro de precisão, porque nem todos os dígitos cabem no armazenamento fixo de 64 bits. Portanto, um valor “aproximado” pode ser armazenado.
=======
In JavaScript, the "number" type cannot safely represent integer values larger than <code>(2<sup>53</sup>-1)</code> (that's `9007199254740991`), or less than <code>-(2<sup>53</sup>-1)</code> for negatives.

To be really precise, the "number" type can store larger integers (up to <code>1.7976931348623157 * 10<sup>308</sup></code>), but outside of the safe integer range <code>±(2<sup>53</sup>-1)</code> there'll be a precision error, because not all digits fit into the fixed 64-bit storage. So an "approximate" value may be stored.

For example, these two numbers (right above the safe range) are the same:

```js
console.log(9007199254740991 + 1); // 9007199254740992
console.log(9007199254740991 + 2); // 9007199254740992
```

So to say, all odd integers greater than <code>(2<sup>53</sup>-1)</code> can't be stored at all in the "number" type.

For most purposes <code>±(2<sup>53</sup>-1)</code> range is quite enough, but sometimes we need the entire range of really big integers, e.g. for cryptography or microsecond-precision timestamps.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Por exemplo, estes dois números (logo acima da faixa segura) são iguais:

```js
console.log(9007199254740991 + 1); // 9007199254740992
console.log(9007199254740991 + 2); // 9007199254740992
```

Por assim dizer, todos os números inteiros ímpares maiores que <code>(2<sup>53</sup>-1)</code> não podem ser armazenados no tipo "número".

Para a maioria dos propósitos, o intervalo <code>±(2<sup>53</sup>-1)</code> é suficiente, mas às vezes precisamos de todo o intervalo de números inteiros realmente grandes, por exemplo, para criptografia ou carimbo do instante exato da data ou hora com precisão de microssegundos.

O tipo `BigInt` foi adicionado recentemente à linguagem para representar inteiros de comprimento arbitrário. 

Um valor `BigInt` é criado anexando `n` ao final de um inteiro:

```js
// o "n" no final significa que é um BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

Como os números `BigInt` raramente são necessários, nós não os cobrimos aqui, mas dedicamos-lhes um capítulo separado <info:bigint>. Leia-o quando precisar de números tão grandes.

<<<<<<< HEAD
```smart header="Problemas de compatibilidade"
No momento, o `BigInt` é suportado no Firefox/Chrome/Edge/Safari, mas não no IE.
```

Você pode verificar a [tabela de compatibilidade do *MDN* sobre BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#browser_compatibility) para saber quais versões de um navegador são suportadas.

=======
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
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

// Incorporando uma variável
alert( `Olá, *!*${name}*/!*!` ); // Olá, John!

// Incorporando uma expressão
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

O significado de `undefined` é "valor não foi atribuído".

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

Todos os outros tipos são chamados de "primitivos" porque seus valores podem conter apenas uma única coisa (seja ela uma string, ou um número, ou qualquer outra). Por outro lado, os objetos são usados para armazenar coleções de dados e entidades mais complexas.

Por serem tão importantes, os objetos merecem um tratamento especial. Nós vamos lidar com eles no capítulo <info:object>, depois que aprendermos mais sobre primitivos.

O tipo `symbol` é usado para criar identificadores únicos para objetos. Nós o temos que mencionar aqui para completude, mas também adiaremos os seus detalhes até sabermos sobre objetos.

## The typeof operator [#type-typeof]

<<<<<<< HEAD
O operador `typeof` retorna o tipo do argumento. É útil quando queremos processar valores de diferentes tipos ou apenas queremos fazer uma verificação rápida.
=======
The `typeof` operator returns the type of the operand. It's useful when we want to process values of different types differently or just want to do a quick check.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

A chamada para `typeof x` retorna uma string com o nome do tipo:

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

1. `Math` é um objeto embutido que fornece operações matemáticas. Nós o vamos aprender no capítulo <info:number>. Aqui, ele serve apenas como um exemplo de um objeto.
2. O resultado de `typeof null` é `"object"`. É um erro oficialmente reconhecido no comportamento de `typeof`, vindo dos primeiros dias do JavaScript e mantido para compatibilidade. Naturalmente, `null` não é um objeto. É um valor especial com um tipo separado próprio. O comportamento de `typeof` é errado aqui.
3. O resultado de `typeof alert` é `"function"`, porque `alert` é uma função. Vamos estudar as funções nos próximos capítulos onde veremos também que não há nenhum tipo especial "função" em JavaScript. As funções pertencem ao tipo objeto. Mas o `typeof` as trata de forma diferente, retornando `"function"`. Isto, também vem dos primeiros dias do JavaScript. Tecnicamente, é incorreto, mas muito conveniente, na prática.

```smart header="A `sintaxe typeof(x)`"
Você pode também encontrar outra sintaxe: `typeof(x)`. é o mesmo que `typeof x`.

Para deixar claro: `typeof` é um operador, não uma função. Os parênteses aqui não fazem parte de `typeof`. São os parênteses usados em matemática para agrupamento.

Geralmente, tais parênteses contêm uma expressão matemática, como em `(2 + 2)`, mas aqui eles contêm apenas um argumento `(x)`. Sintaticamente, eles permitem evitar o espaço entre o operador `typeof` e o seu argumento, e algumas pessoas gostam disso.

Algumas pessoas preferem `typeof(x)`, embora a sintaxe `typeof x` seja muito mais comum.
```

## Resumo

Existem 8 tipos básicos em JavaScript.

<<<<<<< HEAD
- `number` para números de qualquer tipo: inteiro ou ponto flutuante; inteiros estão limitados a <code>±(2<sup>53</sup>-1)</code>.
- `bigint` é para números inteiros de comprimento arbitrário.
- `string` para cadeias-de-caracteres. Uma *string* pode ter zero ou mais caracteres, não há nenhum tipo de caractere único separado.
- `boolean` para `true`/`false`.
- `null` para valores desconhecidos -- um tipo autônomo que tem um único valor `null`.
- `undefined` para valores não atribuídos -- um tipo autônomo que tem um único valor `undefined`.
- `object` para estruturas de dados mais complexas.
- `symbol` para identificadores exclusivos.
=======
- Seven primitive data types:
    - `number` for numbers of any kind: integer or floating-point, integers are limited by <code>±(2<sup>53</sup>-1)</code>.
    - `bigint` for integer numbers of arbitrary length.
    - `string` for strings. A string may have zero or more characters, there's no separate single-character type.
    - `boolean` for `true`/`false`.
    - `null` for unknown values -- a standalone type that has a single value `null`.
    - `undefined` for unassigned values -- a standalone type that has a single value `undefined`.
    - `symbol` for unique identifiers.
- And one non-primitive data type:
    - `object` for more complex data structures.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

O operador `typeof` nos permite ver que tipo está armazenado em uma variável.

- Geralmente, usado como `typeof x`, mas `typeof(x)` também é possível.
- Retorna uma string com o nome do tipo, como `"string"`.
- Para `null` retorna `"object"` -- isso é um erro na linguagem, não é realmente um objeto.

Nos próximos capítulos, nos vamos concentrar nos valores primitivos e, uma vez familiarizados com eles, passaremos para os objetos.
