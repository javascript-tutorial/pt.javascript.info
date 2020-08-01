# Eval: run a code string

The built-in `eval` function allows to execute a string of code.

The syntax is:

```js
let result = eval(code);
```

For example:

```js run
let code = 'alert("Hello")';
eval(code); // Hello
```

A string of code may be long, contain line breaks, function declarations, variables and so on.

The result of `eval` is the result of the last statement.

For example:
```js run
let value = eval('1+1');
alert(value); // 2
```

```js run
let value = eval('let i = 0; ++i');
alert(value); // 1
```

The eval'ed code is executed in the current lexical environment, so it can see outer variables:

```js run no-beautify
let a = 1;

function f() {
  let a = 2;

*!*
  eval('alert(a)'); // 2
*/!*
}

f();
```

It can change outer variables as well:

```js untrusted refresh run
let x = 5;
eval("x = 10");
alert(x); // 10, value modified
```

In strict mode, `eval` has its own lexical environment. So functions and variables, declared inside eval, are not visible outside:

```js untrusted refresh run
// reminder: 'use strict' is enabled in runnable examples by default

eval("let x = 5; function f() {}");

alert(typeof x); // undefined (no such variable)
// function f is also not visible
```

Without `use strict`, `eval` doesn't have its own lexical environment, so we would see `x` and `f` outside.

## Usando "eval"

Na programação moderna `eval` é usado com moderação. Costuma-se dizer que "eval é mau".

O motivo é simples: há muito, muito tempo, o JavaScript era uma linguagem muito mais fraca, muitas coisas só podiam ser feitas com o `eval`. Mas esse tempo passou uma década atrás.

No momento, quase não há razão para usar o `eval`. Se alguém o estiver usando, há uma boa chance de substituí-lo por uma construção de linguagem moderna ou um [JavaScript Module](info:modules).

Observe que sua capacidade de acessar variáveis externas tem efeitos colaterais.

Os minificadores de código (ferramentas usadas antes de JS chegar à produção, para compactá-lo) substituem as variáveis locais por outras mais curtas para otimização. Isso geralmente é seguro, mas não se o `eval` for usado, pois pode fazer referência a eles. Portanto, os minificadores não substituem todas as variáveis locais que podem ser visíveis em `eval`. Isso afeta negativamente a taxa de compactação de código.

Usar variáveis locais externas dentro de `eval` é uma prática ruim de programação, pois dificulta a manutenção do código.

Existem duas maneiras de se proteger totalmente de tais problemas.

**Se o código avaliado não usa variáveis externas, chame `eval` como `window.eval(...)`:**

Dessa forma, o código é executado no escopo global:

```js untrusted refresh run
let x = 1;
{
  let x = 5;
  window.eval('alert(x)'); // 1 (variável global)
}
```

**Se o código avaliado precisa de variáveis locais, mude `eval` para `new Function` e passe-os como argumentos:**

```js run
let f = new Function('a', 'alert(a)');

f(5); // 5
```

A construção `new Function` é explicada no capítulo <info:new-function>. Ele cria uma função a partir de uma string, também no escopo global. Portanto, ele não pode ver variáveis locais. Mas é muito mais claro passá-los explicitamente como argumentos, como no exemplo acima.

## Resumo

A call to `eval(code)` runs the string of code and returns the result of the last statement.
- Rarely used in modern JavaScript, as there's usually no need.
- Can access outer local variables. That's considered bad practice.
- Instead, to `eval` the code in the global scope, use `window.eval(code)`.
- Or, if your code needs some data from the outer scope, use `new Function` and pass it as arguments.
