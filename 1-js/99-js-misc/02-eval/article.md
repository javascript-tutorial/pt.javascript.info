# Eval: executa uma string de código

A função nativa `eval` permite executar uma string de código.

A sintaxe é:

```js
let result = eval(code);
```

Por exemplo:

```js run
let code = 'alert("Hello")';
eval(code); // Hello
```

Uma string de código pode ser longa, conter quebras de linha, declarações de função, variáveis e assim por diante.

O resultado de `eval` é o resultado da última instrução.

Por exemplo:
```js run
let value = eval('1+1');
alert(value); // 2
```

```js run
let value = eval('let i = 0; ++i');
alert(value); // 1
```

O código executado pelo eval roda no Ambiente Léxico atual, então ele consegue ver as variáveis externas:

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

Ele também consegue mudar variáveis externas:

```js untrusted refresh run
let x = 5;
eval("x = 10");
alert(x); // 10, valor modificado
```

No modo estrito, `eval` tem seu próprio Ambiente Léxico. Então funções e variáveis declaradas dentro do eval não são visíveis fora:

```js untrusted refresh run
// lembrete: 'use strict' é ativado por padrão em exemplos executáveis

eval("let x = 5; function f() {}");

alert(typeof x); // undefined (essa variável não existe)
// a função f também não é visível
```

Sem `use strict`, `eval` não tem seu próprio Ambiente Léxico, então veríamos `x` e `f` fora.

## Usando o "eval"

Na programação moderna, o `eval` é usado bem raramente. Costuma-se dizer que "eval is evil" ("eval é maligno").

O motivo é simples: há muito, muito tempo, o JavaScript era uma linguagem bem mais fraca, e muitas coisas só podiam ser feitas com `eval`. Mas essa época passou há uma década.

Hoje em dia, quase não há motivo para usar `eval`. Se alguém está usando, há uma boa chance de que consiga substituir por uma construção moderna da linguagem ou um [Módulo JavaScript](info:modules).

Observe que sua capacidade de acessar variáveis externas tem efeitos colaterais.

Minificadores de código (ferramentas usadas antes do JS ir pra produção, pra comprimi-lo) renomeiam variáveis locais para nomes mais curtos (tipo `a`, `b` etc.) pra deixar o código menor. Isso normalmente é seguro, mas não quando `eval` é usado, já que variáveis locais podem ser acessadas a partir da string de código do eval. Então os minificadores não fazem essa renomeação para todas as variáveis potencialmente visíveis a partir do `eval`. Isso afeta negativamente a taxa de compressão do código.

Usar variáveis locais externas dentro do `eval` também é considerado uma má prática de programação, já que torna a manutenção do código mais difícil.

Existem duas formas de ficar totalmente a salvo desses problemas.

**Se o código executado pelo eval não usa variáveis externas, chame `eval` como `window.eval(...)`:**

Dessa forma, o código é executado no escopo global:

```js untrusted refresh run
let x = 1;
{
  let x = 5;
  window.eval('alert(x)'); // 1 (variável global)
}
```

**Se o código executado pelo eval precisa de variáveis locais, troque `eval` por `new Function` e as passe como argumentos:**

```js run
let f = new Function('a', 'alert(a)');

f(5); // 5
```

A construção `new Function` é explicada no capítulo <info:new-function>. Ela cria uma função a partir de uma string, também no escopo global. Então ela não consegue ver variáveis locais. Mas é muito mais claro passá-las explicitamente como argumentos, como no exemplo acima.

## Resumo

Uma chamada a `eval(code)` roda a string de código e retorna o resultado da última instrução.
- Raramente usado no JavaScript moderno, já que normalmente não há necessidade.
- Pode acessar variáveis locais externas. Isso é considerado má prática.
- Em vez disso, para executar o `eval` do código no escopo global, use `window.eval(code)`.
- Ou, se seu código precisa de alguns dados do escopo externo, use `new Function` e os passe como argumentos.
