# Funções

Muitas vezes nós precisamos realizar uma ação semelhante em muitos lugares do script.

Por exemplo, precisamos mostrar uma boa mensagem quando um usuário efetua login, efetua logout e talvez em outro lugar.

Funções são os principais "building blocks" do programa. Elas permitem que o código sejam chamados muitas vezes sem repetição.

Nós já vimos exemplos de built-in functions, como `alert(message)`, `prompt(message, default)` e `confirm(question)`. Mas nós podemos criar funções próprias também.

## Function Declaration

Para criarmos uma função podemos usar uma *function declaration*.

Se parece assim:

```js
function showMessage() {
  alert( 'Olá a todos!' );
}
```

A palavra-chave `function` vem primeiro, depois vem o *nome da função*, e uma lista de *parâmetros* entre os parêntesis (vazio no exemplo acima) e finalmente o código da função, também chamado de "o corpo da função", entre chaves.

![](function_basics.png)

Nossa nova função pode ser chamada pelo seu nome: `showMessage()`.

Por exemplo:

```js run
function showMessage() {
  alert( 'Olá a todos!' );
}

*!*
showMessage();
showMessage();
*/!*
```

A chamada `showMessage()` executa o código da função. Aqui vemos a mensagem duas vezes.

Este exemplo demonstra claramente um dos principais objetivos das funções: evitar código duplicado.

Se precisarmos mudar a mensagem ou a maneira que ela é mostrada, basta modificar o código em um só lugar: a função que gera isso.

## Variáveis locais

Uma variável declarada dentro de uma função é apenas visível dentro dessa função.

Por exemplo:

```js run
function showMessage() {
*!*
  let message = "Olá, Eu sou JavaScript!"; // variável local
*/!*

  alert( message );
}

showMessage(); // Olá, Eu sou JavaScript!

alert( message ); // <-- Erro! A variável é local para a função
```

## Variáveis externas

Uma função também pode acessar uma variável externa, por exemplo:

```js run no-beautify
let *!*userName*/!* = 'John';

function showMessage() {
  let message = 'Olá, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Olá, John
```

A função tem acesso total à variável externa. Pode modificá-la também.

Por exemplo:

```js run
let *!*userName*/!* = 'John';

function showMessage() {
  *!*userName*/!* = "Bob"; // (1) mudou a variável externa

  let message = 'Olá, ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // *!*John*/!* antes da chamada da função

showMessage();

alert( userName ); // *!*Bob*/!*, o valor foi modificado pela função
```

A variável externa é apenas usada se não existir uma local. Então, uma modificação ocasional pode acontencer se esquercermos do `let`.

Se uma variável com o mesmo nome é declarada dentro da função, então ela *shadows* a externa. Por exemplo, no código abaixo, a função usa o `userName` local. O exterior é ignorado:

```js run
let userName = 'John';

function showMessage() {
*!*
  let userName = "Bob"; // declara uma variável local
*/!*

  let message = 'Olá, ' + userName; // *!*Bob*/!*
  alert(message);
}

// a função criará e usará seu próprio userName
showMessage();

alert( userName ); // *!*John*/!*, inalterado, a função não acessou a variável externa
```

```smart header="Global variables"
Variáveis declaradas fora de qualquer função, como o `userName` externo no código acima, são chamados de *globais*.

Variáveis globais são visíveis por qualquer função (a não ser que sejam shadowed pelas locais).

Normalmente, uma função declara todas as variáveis específicas de sua tarefa. As variáveis globais armazenam apenas dados em nível de projeto e é importante que essas variáveis sejam acessíveis de qualquer lugar. Código moderno tem poucos ou nenhum globais. A maioria das variáveis reside em suas funções.
```

## Parâmetros

Nós podemos passar dados arbitrários para funções usando parâmetros (também chamados de *function arguments*) .

No exemplo abaixo, a função tem dois parâmetros: `from` e `text`.

```js run
function showMessage(*!*from, text*/!*) { // argumentos: from, text
  alert(from + ': ' + text);
}

*!*
showMessage('Ann', 'Olá!'); // Ann: Olá! (*)
showMessage('Ann', "Estás bem?"); // Ann: Estás bem? (**)
*/!*
```

Quando uma função é chamada em linhas `(*)` e `(**)`, os valores passados são copiados para as variáveis locais `from` e `text`. Então a função os usa.

Aqui está mais um exemplo: temos uma variável `from` e passamos para a função. Por favor anote: a função muda `from`, mas a mudança não é vista de fora, porque uma função sempre recebe uma cópia do valor:


```js run
function showMessage(from, text) {

*!*
  from = '*' + from + '*'; // faz "from" parecer melhor
*/!*

  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Hello"); // *Ann*: Olá

// o valor de "from" é o mesmo, a função modifica a cópia local
alert( from ); // Ann
```

## Valores padrões

Se um parâmetro não é fornecido, então seu valor torna-se `undefined`.

Por exemplo, a função acima mencionada `showMessage(from, text)` pode ser chamada com um único argumento:

```js
showMessage("Ann");
```

Isso não é um erro. Tal chamada produziria `"Ann: undefined"`. Não existe `text`, então é assumido que `text === undefined`.

Se queremos usar um `text` "padrão" nessa caso, então podemos especificá-lo depois `=`:

```js run
function showMessage(from, *!*text = "nenhum texto passado"*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: nenhum texto passado
```

Agora se o parâmetro `text` não foi passado, ele irá retornar o valor `"nenhum texto passado"`

Aqui `"nenhum texto passado"` é uma string, embora ela possa ser uma expressão mais complexa, que só é avaliada e atribuída se o parâmetro estiver faltando. Logo, isso também é possível:

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() apenas é executada se nenhum texto for passado
  // seu resultado torna-se o valor do texto
}
```

```smart header="Avaliação de parâmetros padrão"

Em JavaScript, um parâmetro padrão é avaliado toda vez que a função é chamada sem o respectivo parâmetro. No exemplo acima, `anotherFunction ()` é chamado toda vez que `showMessage ()` é chamado sem o parâmetro `text`. Isto está em contraste com algumas outras linguagens como o Python, onde qualquer parâmetro padrão é avaliado apenas uma vez durante a interpretação inicial.

```


````smart header="Parâmetros padrão no old-style"
Edições antigas de JavaScript não suportavam parâmetros padrão. Portanto, há maneiras alternativas de suportá-las, que você pode encontrar principalmente nos scripts antigos.

Por exemplo, uma verificação explícita por ser `undefined`:


```js
function showMessage(from, text) {
*!*
  if (text === undefined) {
    text = 'nenhum texto passado';
  }
*/!*

  alert( from + ": " + text );
}
```

...Ou o `||` operador:

```js
function showMessage(from, text) {
  // se o texto é falso então retorna o valor "default"
  text = text || 'nenhum texto passado';
  ...
}
```


````


## Retornando um valor

Uma função pode retornar um valor de volta ao código de chamada como resultado.

O exemplo mais simples seria uma função que soma dois valores:

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

A diretiva `return` pode estar em qualquer lugar da função. Quando a execução a alcança, a função para, e o valor é retornado ao código de chamada (atribuído a `result` acima).

Pode haver muita ocorrências de `return` em uma única função. Por exemplo:

```js run
function checkAge(age) {
  if (age > 18) {
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('Você tem permissão dos seus pais?');
*/!*
  }
}

let age = prompt('Quantos anos você tem?', 18);

if ( checkAge(age) ) {
  alert( 'Acesso concedido' );
} else {
  alert( 'Acesso negado' );
}
```

É possível usar `return` sem um valor. Isso faz com que a função saia imediatamente.

Por exemplo:

```js
function showMovie(age) {
  if ( !checkAge(age) ) {
*!*
    return;
*/!*
  }

  alert( "Monstrando-lhe o filme" ); // (*)
  // ...
}
```

No código acima, se `checkAge(age)` retornar `false`, então `showMovie` não vao prosseguir para o `alert`.

````smart header="Uma função com um `return` vazio ou sem ele retorna `undefined`"
Se uma função não retorna um valor, é o mesmo que se retorna-se `undefined`:

```js run
function doNothing() { /* vazia */ }

alert( doNothing() === undefined ); // true
```

Um `return` vazio é também o mesmo que `return undefined`:

```js run
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```
````

````warn header="Nunca adicione uma nova linha entre `return` e o valor"
Para uma expressão longa em `return`, pode ser tentador colocá-lo em uma linha separada, assim:

```js
return
 (some + long + expression + or + whatever * f(a) + f(b))
```
Isso não funciona, porque JavaScript assume um ponto e vírgula depois do `return`. Isso vai funcionar o mesmo que:

```js
return*!*;*/!*
 (some + long + expression + or + whatever * f(a) + f(b))
```
Então, ele efetivamente torna-se um retorno vazio. Nós devemos colocar o valor na mesma linha.
````

## Naming a function [#function-naming]

Functions are actions. So their name is usually a verb. It should be brief, as accurate as possible and describe what the function does, so that someone reading the code gets an indication of what the function does.

It is a widespread practice to start a function with a verbal prefix which vaguely describes the action. There must be an agreement within the team on the meaning of the prefixes.

For instance, functions that start with `"show"` usually show something.

Function starting with...

- `"get…"` -- return a value,
- `"calc…"` -- calculate something,
- `"create…"` -- create something,
- `"check…"` -- check something and return a boolean, etc.

Examples of such names:

```js no-beautify
showMessage(..)     // shows a message
getAge(..)          // returns the age (gets it somehow)
calcSum(..)         // calculates a sum and returns the result
createForm(..)      // creates a form (and usually returns it)
checkPermission(..) // checks a permission, returns true/false
```

With prefixes in place, a glance at a function name gives an understanding what kind of work it does and what kind of value it returns.

```smart header="One function -- one action"
A function should do exactly what is suggested by its name, no more.

Two independent actions usually deserve two functions, even if they are usually called together (in that case we can make a 3rd function that calls those two).

A few examples of breaking this rule:

- `getAge` -- would be bad if it shows an `alert` with the age (should only get).
- `createForm` -- would be bad if it modifies the document, adding a form to it (should only create it and return).
- `checkPermission` -- would be bad if it displays the `access granted/denied` message (should only perform the check and return the result).

These examples assume common meanings of prefixes. What they mean for you is determined by you and your team. Maybe it's pretty normal for your code to behave differently. But you should have a firm understanding of what a prefix means, what a prefixed function can and cannot do. All same-prefixed functions should obey the rules. And the team should share the knowledge.
```

```smart header="Ultrashort function names"
Functions that are used *very often* sometimes have ultrashort names.

For example, the [jQuery](http://jquery.com) framework defines a function with `$`. The [Lodash](http://lodash.com/) library has its core function named `_`.

These are exceptions. Generally functions names should be concise and descriptive.
```

## Functions == Comments

Functions should be short and do exactly one thing. If that thing is big, maybe it's worth it to split the function into a few smaller functions. Sometimes following this rule may not be that easy, but it's definitely a good thing.

A separate function is not only easier to test and debug -- its very existence is a great comment!

For instance, compare the two functions `showPrimes(n)` below. Each one outputs [prime numbers](https://en.wikipedia.org/wiki/Prime_number) up to `n`.

The first variant uses a label:

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert( i ); // a prime
  }
}
```

The second variant uses an additional function `isPrime(n)` to test for primality:

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  // a prime
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

The second variant is easier to understand, isn't it? Instead of the code piece we see a name of the action (`isPrime`). Sometimes people refer to such code as *self-describing*.

So, functions can be created even if we don't intend to reuse them. They structure the code and make it readable.

## Summary

A function declaration looks like this:

```js
function name(parameters, delimited, by, comma) {
  /* code */
}
```

- Values passed to a function as parameters are copied to its local variables.
- A function may access outer variables. But it works only from inside out. The code outside of the function doesn't see its local variables.
- A function can return a value. If it doesn't, then its result is `undefined`.

To make the code clean and easy to understand, it's recommended to use mainly local variables and parameters in the function, not outer variables.

It is always easier to understand a function which gets parameters, works with them and returns a result than a function which gets no parameters, but modifies outer variables as a side-effect.

Function naming:

- A name should clearly describe what the function does. When we see a function call in the code, a good name instantly gives us an understanding what it does and returns.
- A function is an action, so function names are usually verbal.
- There exist many well-known function prefixes like `create…`, `show…`, `get…`, `check…` and so on. Use them to hint what a function does.

Functions are the main building blocks of scripts. Now we've covered the basics, so we actually can start creating and using them. But that's only the beginning of the path. We are going to return to them many times, going more deeply into their advanced features.
