# Eval: run a code string

A função interna `eval` permite executar uma string de código.

A sintaxe é:

```js
let resultado = eval(codigo);
```

Por exemplo:

```js run
let codigo = 'alert("Olá")';
eval(codigo); // Olá
```

A string código pode ser longa, conter quebras de linha, declarações de função, variáveis e assim por diante.

O resultado de `eval` é o resultado da última declaração.

Por exemplo:
```js run
let valor = eval('1+1');
alert(valor); // 2
```

```js run
let value = eval('let i = 0; ++i');
alert(valor); // 1
```

O código avaliado é executado no ambiente lexical atual, para que ele possa ver variáveis externas:

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

Também pode alterar variáveis externas:

```js untrusted refresh run
let x = 5;
eval("x = 10");
alert(x); // 10, valor modificado
```

No modo estrito, o `eval` possui seu próprio ambiente lexical. Portanto, funções e variáveis, declaradas dentro de eval, não são visíveis fora:

```js untrusted refresh run
// lembrete: 'use strict' está ativado em exemplos executáveis por padrão

eval("let x = 5; function f() {}");

alert(typeof x); // undefined (não tal variável)
// a função f também não é visível
```

Sem `use strict`,` eval` não possui seu próprio ambiente lexical, portanto veríamos `x` e` f` fora.

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

Uma chamada para `eval(codigo)` executa a string de código e retorna o resultado da última instrução.
- Raramente usado no JavaScript moderno, pois geralmente não há necessidade.
- Pode acessar variáveis locais externas. Isso é considerado uma má prática.
- Em vez disso, para `eval` o código no escopo global, use `window.eval(codigo)`.
- Ou, se o seu código precisar de alguns dados do escopo externo, use `new Function` e passe-os como argumentos.
