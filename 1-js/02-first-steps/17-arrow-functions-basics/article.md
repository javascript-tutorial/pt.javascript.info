<<<<<<< HEAD
# Funções seta, o básico

Existe outra sintaxe, muito simples e concisa, para criar funções, e que frequentemente é melhor do que Expressões de Funções.

É chamada de "funções seta" (*"arrow functions"*), porque se assemelha a:
=======
# Arrow functions, the basics

There's another very simple and concise syntax for creating functions, that's often better than Function Expressions.

It's called "arrow functions", because it looks like this:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```js
let func = (arg1, arg2, ...argN) => expression
```

<<<<<<< HEAD
...Isto, cria a função `func` com os argumentos `arg1..argN`, depois avalia a `expression` no lado direito utilizando os mesmos, e retorna o seu resultado.

Por outras palavras, é a versão mais curta de:
=======
...This creates a function `func` that accepts arguments `arg1..argN`, then evaluates the `expression` on the right side with their use and returns its result.

In other words, it's the shorter version of:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```js
let func = function(arg1, arg2, ...argN) {
  return expression;
};
```

<<<<<<< HEAD
Vejamos um exemplo concreto:
=======
Let's see a concrete example:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```js run
let sum = (a, b) => a + b;

<<<<<<< HEAD
/* Esta função seta é uma forma mais curta de:
=======
/* This arrow function is a shorter form of:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3
```

<<<<<<< HEAD
Como pode ver, `(a, b) => a + b` significa uma função que aceita dois argumentos, nomeadamente `a` e `b`. No momento da execução, esta avalia a expressão `a + b` e retorna o resultado.

- Se tivermos apenas um argumento, então os parênteses à sua volta podem ser omitidos, tornando-a ainda mais curta.

    Por examplo:
=======
As you can, see `(a, b) => a + b` means a function that accepts two arguments named `a` and `b`. Upon the execution, it evaluates the expression `a + b` and returns the result.

- If we have only one argument, then parentheses around parameters can be omitted, making that even shorter.

    For example:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

    ```js run
    *!*
    let double = n => n * 2;
<<<<<<< HEAD
    // aproximadamente o mesmo que: let double = function(n) { return n * 2 }
=======
    // roughly the same as: let double = function(n) { return n * 2 }
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
    */!*

    alert( double(3) ); // 6
    ```

<<<<<<< HEAD
- Se não houver argumentos, os parênteses estarão vazios (mas devem estar presentes):

    ```js run
    let sayHi = () => alert("Olá!");
=======
- If there are no arguments, parentheses will be empty (but they should be present):

    ```js run
    let sayHi = () => alert("Hello!");
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

    sayHi();
    ```

<<<<<<< HEAD
Funções seta podem ser empregues da mesma forma que Expressões de Função.

Por exemplo, para criar dinamicamente uma função:

```js run
let age = prompt("Que idade tem?", 18);

let welcome = (age < 18) ?
  () => alert('Olá') :
  () => alert("Saudações!");
=======
Arrow functions can be used in the same way as Function Expressions.

For instance, to dynamically create a function:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

welcome();
```

<<<<<<< HEAD
Funções seta podem parecer não familiares e não muito legíveis a princípio, mas isso rápidamente muda à medida que os olhos se habituam à estrutura.

Elas são muito convenientes para ações simples numa única-linha, quando estamos preguiçosos demais para escrever muitas palavras.

## Funções seta de múltiplas linhas

Os exemplos acima tomaram os argumentos à esqerda de `=>` e avaliaram a expressão à direita com eles.

Por vezes, precisamos de algo um pouco mais complexo, como múltiplas expressões ou instruções. Isso também é possível, mas deveríamos envolvê-las em chavetas. A seguir, usamos um `return` normal com elas.

Desta forma:

```js run
let sum = (a, b) => {  // a chaveta abre uma função multi-linha
  let result = a + b;
*!*
  return result; // se usarmos chavetas, então precisamos de um "return" explícito
=======
Arrow functions may appear unfamiliar and not very readable at first, but that quickly changes as the eyes get used to the structure.

They are very convenient for simple one-line actions, when we're just too lazy to write many words.

## Multiline arrow functions

The examples above took arguments from the left of `=>` and evaluated the right-side expression with them.

Sometimes we need something a little bit more complex, like multiple expressions or statements. It is also possible, but we should enclose them in curly braces. Then use a normal `return` within them.

Like this:

```js run
let sum = (a, b) => {  // the curly brace opens a multiline function
  let result = a + b;
*!*
  return result; // if we use curly braces, then we need an explicit "return" 
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
*/!*
};

alert( sum(1, 2) ); // 3
```

<<<<<<< HEAD
```smart header="Mais adiante"
Aqui, enaltecemos funções seta pela sua brevidade. Mas não é tudo!

Para as estudar mais detalhadamente, primeiro precisamos de saber alguns outros aspetos de JavaScript, e desta forma retornaremos a funções seta mais adiante no capitulo <info:arrow-functions>.

Por ora, podemos já usar funções seta para ações numa única-linha e *callbacks*.
```

## Resumo

Funções seta são apropriadas para ações única-linha. Elas vêm em dois sabores:

1. Sem chavetas: `(...args) => expression` -- o lado direito é uma expressão; a função a avalia e retorna o resultado.
2. Com chavetas: `(...args) => { body }` -- chavetas permitem-nos escrever múltiplas instruções dentro da função, mas precisamos de um explícito `return` para retornar alguma coisa.
=======
```smart header="More to come"
Here we praised arrow functions for brevity. But that's not all!

Arrow functions have other interesting features.

To study them in-depth, we first need to get to know some other aspects of JavaScript, so we'll return to arrow functions later in the chapter <info:arrow-functions>.

For now, we can already use arrow functions for one-line actions and callbacks.
```

## Summary

Arrow functions are handy for one-liners. They come in two flavors:

1. Without curly braces: `(...args) => expression` -- the right side is an expression: the function evaluates it and returns the result.
2. With curly braces: `(...args) => { body }` -- brackets allow us to write multiple statements inside the function, but we need an explicit `return` to return something.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
