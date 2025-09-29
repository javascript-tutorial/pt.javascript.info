# Variáveis

Na maioria das vezes, um aplicativo JavaScript precisa de trabalhar com informações. Aqui estão dois exemplos:
1. Uma loja online -- a informação pode incluir mercadorias vendidas e um carrinho de compras.
2. Uma aplicação de chat -- a informação pode incluir usuários, mensagens e muito mais.

Variáveis são usadas para armazenar esta informação.

## Uma variável

Uma [variável](https://pt.wikipedia.org/wiki/Variável_(programação)) é um "armazenamento nomeado" para dados. Podemos usar variáveis para armazenar artigos, visitantes e outros dados.

Para criar uma variável em JavaScript, use a palavra-chave `let`.

A declaração abaixo cria (em outras palavras: *declara*) uma variável com o nome "message":

```js
let message;
```

Agora, podemos colocar alguns dados usando o operador de atribuição `=`:

```js
let message;

*!*
message = 'Olá'; // armazene a string 'Olá' na variável chamada message
*/!*
```

A string agora é armazenada na área de memória associada à variável. Nós podemos acessá-la usando o nome da variável:

```js run
let message;
message = 'Olá!';

*!*
alert(message); // mostra o conteúdo da variável
*/!*
```

Para ser conciso, podemos combinar a declaração de variável e atribuição em uma única linha:

```js run
let message = 'Olá!'; // define a variável e atribui o valor

alert(message); // Olá!
```

Podemos também declarar múltiplas variáveis em uma linha:

```js no-beautify
let user = 'John', age = 25, message = 'Olá';
```

Isso pode parecer mais curto, mas não o recomendamos. Por uma questão de melhor legibilidade, use uma única linha por variável.

A variante multilinha é um pouco mais longa, mas mais fácil de ler:

```js
let user = 'John';
let age = 25;
let message = 'Olá';
```

<<<<<<< HEAD
Algumas pessoas também definem múltiplas variáveis nesse estilo multilinha:
=======
Some people also define multiple variables in this multiline style:

>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
```js no-beautify
let user = 'John',
  age = 25,
  message = 'Olá';
```

... Ou até mesmo no estilo "vírgula-primeiro":

```js no-beautify
let user = 'John'
  , age = 25
  , message = 'Olá';
```

Tecnicamente, todas estas variantes fazem a mesma coisa. Então, é uma questão de gosto pessoal e estética.

````smart header="`var` em vez de `let`"
Em scripts antigos, você também pode encontrar outra palavra-chave: `var` em vez de `let`:

```js
*!*var*/!* message = 'Olá';
```

<<<<<<< HEAD
A palavra-chave `var` é quase a mesma que `let`. Ela também declara uma variável, mas de um modo um pouco diferente, "old-school".

Existem diferenças sutis entre `let` e `var`, mas elas ainda não são importantes para nós. Nós as abordaremos em detalhes no capítulo <info:var>.
=======
The `var` keyword is *almost* the same as `let`. It also declares a variable but in a slightly different, "old-school" way.

There are subtle differences between `let` and `var`, but they do not matter to us yet. We'll cover them in detail in the chapter <info:var>.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
````

## Uma analogia da vida real

Podemos facilmente compreender o conceito de uma "variável" se a imaginarmos como uma "caixa" para dados, com um adesivo de nome exclusivo.

<<<<<<< HEAD
Por exemplo, a variável `mensagem` pode ser imaginada como uma caixa chamada `"message"`com o valor `"Olá"`!:
=======
For instance, the variable `message` can be imagined as a box labelled `"message"` with the value `"Hello!"` in it:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

![](variable.svg)

Podemos pôr qualquer valor na caixa.

<<<<<<< HEAD
Também podemos mudá-lo quantas vezes quisermos:
=======
We can also change it as many times as we want:

>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
```js run
let message;

message = 'Olá!';

message = 'Mundo!'; // valor modificado

alert(message);
```

Quando o valor é modificado, os dados antigos são removidos da variável:

![](variable-change.svg)

Nós também podemos declarar duas variáveis e copiar dados de uma para a outra.

```js run
let hello = 'Olá Mundo!';

let message;

*!*
// copiar 'Olá Mundo' de hello para message
message = hello;
*/!*

// agora duas variáveis contêm os mesmos dados
alert(hello); // Olá Mundo!
alert(message); // Olá Mundo!
```

````warn header="Declarar duas vezes lança um erro"
Uma variável deve ser declarada apenas uma vez.

Uma declaração repetida da mesma variável é um erro:

```js run
let message = "Isto";

// um 'let' repetido conduz a um erro
let message = "Aquilo"; // SyntaxError: 'message' has already been declared (Erro-de-sintaxe: 'message' já foi declarada)
```
Assim, devemos declarar uma variável apenas uma vez e depois fazer referência a ela sem o `let`.
````

<<<<<<< HEAD
```smart header="Linguagens funcionais"
É interessante notar que existem linguagens de programação [funcionais](https://en.wikipedia.org/wiki/Functional_programming), como [Scala](http://www.scala-lang.org/) ou [Erlang](http://www.erlang.org/), que proíbem a modificação de valores de variáveis.
=======
```smart header="Functional languages"
It's interesting to note that there exist so-called [pure functional](https://en.wikipedia.org/wiki/Purely_functional_programming) programming languages, such as [Haskell](https://en.wikipedia.org/wiki/Haskell), that forbid changing variable values.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

Em tais linguagens, uma vez que o valor é armazenado "na caixa", ele está lá para sempre. Se precisarmos de armazenar algo mais, a linguagem nos obriga a criar uma nova caixa (declarar uma nova variável). Não podemos reutilizar a antiga.

<<<<<<< HEAD
Embora possa parecer um pouco estranho à primeira vista, estas linguagens são bastante capazes de um desenvolvimento sério. Mais do que isso, há áreas como cálculos paralelos onde essa limitação confere certos benefícios. Estudar alguma dessas linguagens (mesmo que você não esteja planejando usá-la em breve) é recomendado para ampliar a mente.
=======
Though it may seem a little odd at first sight, these languages are quite capable of serious development. More than that, there are areas like parallel computations where this limitation confers certain benefits.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
```

## Nomeação de variável [#variable-naming]

Existem duas limitações em nomes de variáveis no JavaScript:

1. O nome deve conter apenas letras, dígitos ou os símbolos `$` e `_`.
2. O primeiro caractere não deve ser um dígito.

Exemplos de nomes válidos:

```js
let userName;
let test123;
```

Quando o nome contém várias palavras, o [camelCase](https://en.wikipedia.org/wiki/CamelCase) é normalmente utilizado. Isto é: as palavras vão uma após a outra, e cada palavra exceto a primeira começa com uma letra maiúscula: `myVeryLongName`.

O que é interessante -- o sinal de dólar `'$'` e o sublinhado `'_'` também podem ser usados em nomes. Eles são símbolos regulares, assim como letras, sem nenhum significado especial.

Estes nomes são válidos:

```js run untrusted
let $ = 1; // declarou uma variável com o nome "$"
let _ = 2; // e agora uma variável com o nome "_"

alert($ + _); // 3
```

Exemplos de nomes de variável incorretos:

```js no-beautify
let 1a; // não pode começar com um dígito

let my-name; // hífens '-' não são permitidos no nome
```

<<<<<<< HEAD
```smart header="Questões de caso"
Variáveis chamadas `apple` e `AppLE` são duas variáveis diferentes.
```

````smart header="Letras não-Latin são permitidas, mas não são recomendadas"
É possível usar qualquer idioma, incluindo letras cirílicas ou até hieróglifos, como estes:
=======
```smart header="Case matters"
Variables named `apple` and `APPLE` are two different variables.
```

````smart header="Non-Latin letters are allowed, but not recommended"
It is possible to use any language, including Cyrillic letters, Chinese logograms and so on, like this:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js
let имя = '...';
let 我 = '...';
```

<<<<<<< HEAD
Tecnicamente, não há erro aqui.  Tais nomes são permitidos, mas há uma tradição internacional de usar o inglês em nomes de variáveis. Mesmo que estejamos escrevendo um pequeno script, ele pode ter uma longa vida pela frente. Pessoas de outros países podem precisar de o ler em algum momento.
=======
Technically, there is no error here. Such names are allowed, but there is an international convention to use English in variable names. Even if we're writing a small script, it may have a long life ahead. People from other countries may need to read it sometime.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
````

````warn header="Nomes reservados"
Existe uma [lista de palavras reservadas](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords), que não podem ser usadas como nomes de variáveis porque elas são usadas pela própria linguagem.

Por exemplo: `let`, `class`, `return`, e `function` são reservadas.

O código abaixo dá um erro de sintaxe:

```js run no-beautify
let let = 5; // não é possível nomear uma variável "let", erro!
let return = 5; // também não pode nomear como "return", erro!
```
````

````warn header="Uma atribuição sem `use strict`"

Normalmente, precisamos definir uma variável antes de a usar. Mas nos velhos tempos, era tecnicamente possível criar uma variável através de uma mera atribuição de valor, sem usar `let`. Isso ainda funciona se não colocarmos `use strict` em nossos scripts para manter a compatibilidade com scripts antigos.

```js run no-strict
// nota: nenhum "use strict" neste exemplo

num = 5; // a variável "num" é criada se não existir

alert(num); // 5
```

Esta é uma má prática e causaria um erro no modo estrito:

```js
"use strict";

*!*
num = 5; // erro: 'num' não está definido
*/!*
```
````

## Constantes

Para declarar uma variável constante (imutável), use `const` em vez de `let`:

```js
const myBirthday = '18.04.1982';
```

Variáveis declaradas usando `const` são chamadas de "constantes". Elas não podem ser alteradas. Uma tentativa de fazer isso causaria um erro:

```js run
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // erro, não é possível reatribuir a constante!
```

<<<<<<< HEAD
Quando um programador está certo de que uma variável nunca mudará, ele pode declará-la com `const` para garantir e comunicar claramente esse fato a todos.

=======
When a programmer is sure that a variable will never change, they can declare it with `const` to guarantee and communicate that fact to everyone.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

### Constantes maiúsculas

<<<<<<< HEAD
Há uma prática generalizada de usar constantes como aliases para valores difíceis de lembrar que são conhecidos antes da execução.
=======
There is a widespread practice to use constants as aliases for difficult-to-remember values that are known before execution.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

Tais constantes são nomeadas usando letras maiúsculas e sublinhados.

Como estas:

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...quando precisamos escolher uma cor
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

Benefícios:

- `COLOR_ORANGE` é muito mais fácil de lembrar do que `"#FF7F00"`.
- É muito mais difícil digitar isto `"#FF7F00"` do que `COLOR_ORANGE`.
- Ao ler o código, `COLOR_ORANGE` é muito mais significativo do que `#FF7F00`.

Quando devemos usar maiúsculas para uma constante e quando devemos nomeá-la normalmente? Vamos deixar isso bem claro.

<<<<<<< HEAD
Ser uma "constante" significa apenas que o valor de uma variável nunca muda. Mas há constantes que são conhecidas antes da execução (como um valor hexadecimal para vermelho) e há constantes que são *calculadas* em tempo de execução, durante a execução, mas não mudam após sua atribuição inicial.

Como por exemplo:
=======
Being a "constant" just means that a variable's value never changes. But some constants are known before execution (like a hexadecimal value for red) and some constants are *calculated* in run-time, during the execution, but do not change after their initial assignment.

For instance:

>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
```js
const pageLoadTime = /* tempo necessário para carregar uma página web */;
```

<<<<<<< HEAD
O valor de `pageLoadTime` não é conhecido antes do carregamento da página, portanto é nomeado normalmente. Mas ainda é uma constante porque não muda após a atribuição.

Em outras palavras, constantes com nomes maiúsculos são usadas apenas como pseudônimos para valores de "codificação rígida".
=======
The value of `pageLoadTime` is not known before the page load, so it's named normally. But it's still a constant because it doesn't change after the assignment.

In other words, capital-named constants are only used as aliases for "hard-coded" values.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

## Nomeie as coisas como devem ser

Falando em variáveis, há mais uma coisa extremamente importante.

O nome de uma variável deveria ter um significado claro e óbvio, descrevendo os dados que ela armazena.

<<<<<<< HEAD
A nomenclatura variável é uma das habilidades mais importantes e complexas em programação. Uma rápida olhada em nomes de variáveis pode revelar que código foi escrito por um iniciante versus um desenvolvedor experiente.

Em um projeto real, a maior parte do tempo é gasto modificando e estendendo uma base de código existente ao invés de escrever algo completamente separado do zero. Quando voltamos a algum código depois de fazer outra coisa por um tempo, é muito mais fácil encontrar informação se for bem rotulada. Ou, em outras palavras, quando as variáveis têm bons nomes.
=======
Variable naming is one of the most important and complex skills in programming. A glance at variable names can reveal which code was written by a beginner versus an experienced developer.

In a real project, most of the time is spent modifying and extending an existing code base rather than writing something completely separate from scratch. When we return to some code after doing something else for a while, it's much easier to find information that is well-labelled. Or, in other words, when the variables have good names.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

Por favor, gaste tempo pensando sobre o nome certo para uma variável antes de declará-lo. Fazê-lo irá recompensá-lo generosamente.

Algumas regras boas para seguir são:

<<<<<<< HEAD
- Use nomes legíveis por humanos como `userName` ou `shoppingCart`.
- Fique longe de abreviações ou nomes curtos como `a`, `b`, `c`, a menos que você realmente saiba o que está fazendo.
- Faça nomes maximamente descritivos e concisos. Exemplos de nomes ruins são `data` e `value`. Tais nomes não dizem nada. Só é possível usá-los se o contexto do código tornar excepcionalmente óbvio quais dados ou valores a variável está referenciando.
- Concorde em termos dentro da sua equipa e na sua própria mente. Se um visitante do site é chamado de "user", então devemos nomear variáveis relacionadas `currentUser` ou `newUser` em vez de `currentVisitor` ou `newManInTown`.
=======
- Use human-readable names like `userName` or `shoppingCart`.
- Stay away from abbreviations or short names like `a`, `b`, and `c`, unless you know what you're doing.
- Make names maximally descriptive and concise. Examples of bad names are `data` and `value`. Such names say nothing. It's only okay to use them if the context of the code makes it exceptionally obvious which data or value the variable is referencing.
- Agree on terms within your team and in your mind. If a site visitor is called a "user" then we should name related variables `currentUser` or `newUser` instead of `currentVisitor` or `newManInTown`.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

Parece simples? Na verdade é, mas criar nomes de variáveis descritivas e concisas na prática não é. Vá em frente.

```smart header="Reutilizar ou criar?"
E a última nota. Existem alguns programadores preguiçosos que, ao invés de declarar novas variáveis, tendem a reutilizar as existentes.

Como resultado, suas variáveis são como caixas em que as pessoas jogam coisas diferentes sem mudar seus adesivos. O que está dentro da caixa agora? Quem sabe? Temos de nos aproximar e verificar.

Tais programadores economizam um pouco na declaração de variáveis, mas perdem dez vezes mais na depuração.

Uma variável extra é bom, não ruim.

Os minificadores e navegadores JavaScript modernos otimizam o código o suficiente para que ele não crie problemas de desempenho. Usar variáveis diferentes para valores diferentes pode até mesmo ajudar o mecanismo a otimizar seu código.
```

## Resumo

Podemos declarar variáveis para armazenar dados usando as palavras-chave `var`, `let`, ou `const`.

- `let` -- é uma declaração de variável moderna.
- `var` -- é uma declaração de variável da velha escola. Normalmente não a usamos de todo, mas vamos cobrir diferenças sutis de `let` no capítulo <info:var>, para o caso de você precisar delas.
- `const` -- é como `let`, mas o valor da variável não pode ser alterado.

As variáveis devem ser nomeadas de uma forma que nos permita compreender facilmente o que está dentro delas.
