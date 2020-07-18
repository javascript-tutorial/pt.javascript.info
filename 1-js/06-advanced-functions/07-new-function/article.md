
# A sintaxe de "new Function"

Existe mais uma maneira de criar uma funcção. Ela é raramente usada, mas as vezes não existe alternativas.

## Sintaxe

A sintaxe para criar uma função:

```js
let func = new Function ([arg1[, arg2[, ...argN]],] functionBody)
```

Em outras palavras, os parâmetros da função (ou, mais precisamente, os nomes deles) vêm primeiro, e o corpo da função vem por último. Todos os argumentos são `strings`.

É mais de compreender olhando um exemplo. Aqui está uma função com dois argumentos:

```js run
let sum = new Function('a', 'b', 'return a + b'); 

alert( sum(1, 2) ); // 3
```

Se não existem argumentos, então somente existe um único argumento, que é o corpo da função:

```js run
let sayHi = new Function('alert("Olá")');

sayHi(); // Olá
```

A maior diferença de outros métodos vistos é que a função é literalmente criada a partir de uma `string`, que é passada em tempo de execução. 

Todas as declarações anteriores requeriam de nós, programadores, escrever o código da função dentro do `script`.

Mas `new Function` permite transformar qualquer `string` em uma função. Por exemplo, nós podemos receber uma nova função de um servidor e executa-la:

```js
let str = ... recebe o código de um servidor dinamicamente ...

let func = new Function(str);
func();
```

Ela é usada em casos muito específicos, como quando nós recebemos código de um servidor, ou para compilar dinamicamente a função a partir de um template. A necessidade disso geralmente surge em estágios avançados de desenvolvimento.

## Closure

No geral, uma função se "lembra" de onde ela foi criada na propiedade especial `[[Environment]]`. Ela referencia o escopo léxico de onde ela foi criada.

Porém quando uma função é criada usando `new Function`, a sua `[[Environment]]` não referencia o atual escopo léxico, mas sim o escopo global.

```js run

function getFunc() {
  let value = "test";

*!*
  let func = new Function('alert(value)');
*/!*

  return func;
}

getFunc()(); // erro: value não foi definido
```

Compare-a com o comportamento padrão:

```js run 
function getFunc() {
  let value = "test";

*!*
  let func = function() { alert(value); };
*/!*

  return func;
}

getFunc()(); // *!*"test"*/!*, do escopo léxico de getFunc
```

Essa caracteristica especial de `new Function` parece estranha, mas se apresenta muito útil na prática.

Imagine that we must create a function from a string. The code of that function is not known at the time of writing the script (that's why we don't use regular functions), but will be known in the process of execution. We may receive it from the server or from another source.

Our new function needs to interact with the main script.

Perhaps we want it to be able to access outer local variables?

The problem is that before JavaScript is published to production, it's compressed using a *minifier* -- a special program that shrinks code by removing extra comments, spaces and -- what's important, renames local variables into shorter ones.

For instance, if a function has `let userName`, minifier replaces it `let a` (or another letter if this one is occupied), and does it everywhere. That's usually a safe thing to do, because the variable is local, nothing outside the function can access it. And inside the function, minifier replaces every mention of it. Minifiers are smart, they analyze the code structure, so they don't break anything. They're not just a dumb find-and-replace.

But, if `new Function` could access outer variables, then it would be unable to find `userName`, since this is passed in as a string *after* the code is minified.

**Even if we could access outer lexical environment in `new Function`, we would have problems with minifiers.**

The "special feature" of `new Function` saves us from mistakes.

And it enforces better code. If we need to pass something to a function created by `new Function`, we should pass it explicitly as an argument.

Our "sum" function actually does that right:

```js run 
*!*
let sum = new Function('a', 'b', 'return a + b');
*/!*

let a = 1, b = 2;

*!*
// outer values are passed as arguments
alert( sum(a, b) ); // 3
*/!*
```

## Summary

The syntax:

```js
let func = new Function(arg1, arg2, ..., body);
```

For historical reasons, arguments can also be given as a comma-separated list. 

These three mean the same:

```js 
new Function('a', 'b', 'return a + b'); // basic syntax
new Function('a,b', 'return a + b'); // comma-separated
new Function('a , b', 'return a + b'); // comma-separated with spaces
```

Functions created with `new Function`, have `[[Environment]]` referencing the global Lexical Environment, not the outer one. Hence, they cannot use outer variables. But that's actually good, because it saves us from errors. Passing parameters explicitly is a much better method architecturally and causes no problems with minifiers.
