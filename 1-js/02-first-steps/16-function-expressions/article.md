# Expressões de função

Em JavaScript, uma função não é uma "estrutura mágica da linguagem", mas um tipo especial de valor.

A sintaxe que usamos antes é chamada de *Declaração de Função*:

```js
function sayHi() {
  alert( "Olá" );
}
```

Há outra sintaxe para criar uma função que é chamada de *Expressão de Função*.

Ela nos permite criar uma nova função no meio de qualquer expressão.

Por exemplo:

```js
let sayHi = function() {
  alert( "Olá" );
};
```

Aqui podemos ver uma variável `sayHi` recebendo um valor, a nova função, criada como `function() { alert("Olá"); }`.

Como a criação da função acontece no contexto da expressão de atribuição (à direita do `=`), isto é uma *Expressão de Função*.

Note que não há nome após a palavra-chave `function`. Omitir o nome é permitido para Expressões de Função.

Aqui nós imediatamente a atribuímos à variável, então o significado desses exemplos de código é o mesmo: "criar uma função e colocá-la na variável `sayHi`".

Em situações mais avançadas, que encontraremos mais tarde, uma função pode ser criada e imediatamente chamada ou agendada para execução posterior, sem ser armazenada em lugar nenhum, permanecendo assim anônima.

## Função é um valor

Vamos reiterar: não importa como a função é criada, uma função é um valor. Ambos os exemplos acima armazenam uma função na variável `sayHi`.

Podemos até imprimir esse valor usando `alert`:

```js run
function sayHi() {
  alert( "Olá" );
}

*!*
alert( sayHi ); // mostra o código da função
*/!*
```

Note que a última linha não executa a função, porque não há parênteses após `sayHi`. Existem linguagens de programação onde qualquer menção ao nome de uma função causa sua execução, mas JavaScript não é assim.

Em JavaScript, uma função é um valor, então podemos tratá-la como um valor. O código acima mostra sua representação em texto, que é o código-fonte.

Certamente, uma função é um valor especial, no sentido de que podemos chamá-la como `sayHi()`.

Mas ainda assim é um valor. Então podemos trabalhar com ela como com outros tipos de valores.

Podemos copiar uma função para outra variável:

```js run no-beautify
function sayHi() {   // (1) criar
  alert( "Olá" );
}

let func = sayHi;    // (2) copiar

func(); // Olá     // (3) executar a cópia (funciona)!
sayHi(); // Olá    //     isto ainda funciona também (por que não funcionaria)
```

Aqui está o que acontece acima em detalhes:

1. A Declaração de Função `(1)` cria a função e a coloca na variável chamada `sayHi`.
2. A linha `(2)` a copia para a variável `func`. Note novamente: não há parênteses após `sayHi`. Se houvesse, então `func = sayHi()` escreveria *o resultado da chamada* `sayHi()` em `func`, não *a função* `sayHi` em si.
3. Agora a função pode ser chamada tanto como `sayHi()` quanto como `func()`.

Poderíamos também ter usado uma Expressão de Função para declarar `sayHi`, na primeira linha:

```js
let sayHi = function() { // (1) criar
  alert( "Olá" );
};

let func = sayHi;  //(2)
// ...
```

Tudo funcionaria da mesma forma.


````smart header="Por que há um ponto e vírgula no final?"
Você pode se perguntar, por que Expressões de Função têm um ponto e vírgula `;` no final, mas Declarações de Função não:

```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
}*!*;*/!*
```

A resposta é simples: uma Expressão de Função é criada aqui como `function(…) {…}` dentro da instrução de atribuição: `let sayHi = …;`. O ponto e vírgula `;` é recomendado no final da instrução, não é parte da sintaxe da função.

O ponto e vírgula estaria lá para uma atribuição mais simples, como `let sayHi = 5;`, e também está lá para uma atribuição de função.
````

## Funções de retorno de chamada

Vamos ver mais exemplos de passar funções como valores e usar expressões de função.

Vamos escrever uma função `ask(question, yes, no)` com três parâmetros:

`question`
: Texto da pergunta

`yes`
: Função a executar se a resposta for "Sim"

`no`
: Função a executar se a resposta for "Não"

A função deve fazer a `question` e, dependendo da resposta do usuário, chamar `yes()` ou `no()`:

```js run
*!*
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
*/!*

function showOk() {
  alert( "Você concordou." );
}

function showCancel() {
  alert( "Você cancelou a execução." );
}

// uso: funções showOk, showCancel são passadas como argumentos para ask
ask("Você concorda?", showOk, showCancel);
```

Na prática, tais funções são bastante úteis. A maior diferença entre um `ask` da vida real e o exemplo acima é que funções da vida real usam formas mais complexas de interagir com o usuário do que um simples `confirm`. No navegador, tais funções geralmente desenham uma janela de pergunta com boa aparência. Mas isso é outra história.

**Os argumentos `showOk` e `showCancel` de `ask` são chamados de *funções de retorno de chamada* ou apenas *callbacks*.**

A ideia é que passamos uma função e esperamos que ela seja "chamada de volta" mais tarde, se necessário. No nosso caso, `showOk` se torna o retorno de chamada para a resposta "sim", e `showCancel` para a resposta "não".

Podemos usar Expressões de Função para escrever uma função equivalente e mais curta:

```js run no-beautify
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

*!*
ask(
  "Você concorda?",
  function() { alert("Você concordou."); },
  function() { alert("Você cancelou a execução."); }
);
*/!*
```

Aqui, as funções são declaradas diretamente dentro da chamada `ask(...)`. Elas não têm nome, e por isso são chamadas de *anônimas*. Tais funções não são acessíveis fora de `ask` (porque não são atribuídas a variáveis), mas é exatamente isso que queremos aqui.

Tal código aparece em nossos scripts muito naturalmente, está no espírito do JavaScript.

```smart header="Uma função é um valor representando uma \"ação\""
Valores regulares como strings ou números representam os *dados*.

Uma função pode ser percebida como uma *ação*.

Podemos passá-la entre variáveis e executar quando quisermos.
```


## Expressão de Função vs Declaração de Função

Vamos formular as principais diferenças entre Declarações de Função e Expressões.

Primeiro, a sintaxe: como diferenciá-las no código.

- *Declaração de Função:* uma função, declarada como uma instrução separada, no fluxo principal do código:

    ```js
    // Declaração de Função
    function sum(a, b) {
      return a + b;
    }
    ```
- *Expressão de Função:* uma função, criada dentro de uma expressão ou dentro de outra construção sintática. Aqui, a função é criada no lado direito da "expressão de atribuição" `=`:

    ```js
    // Expressão de Função
    let sum = function(a, b) {
      return a + b;
    };
    ```

A diferença mais sutil é *quando* uma função é criada pelo motor JavaScript.

**Uma Expressão de Função é criada quando a execução a alcança e é utilizável apenas a partir desse momento.**

Uma vez que o fluxo de execução passa para o lado direito da atribuição `let sum = function…` -- pronto, a função é criada e pode ser usada (atribuída, chamada, etc.) a partir de agora.

Declarações de Função são diferentes.

**Uma Declaração de Função pode ser chamada antes de ser definida.**

Por exemplo, uma Declaração de Função global é visível em todo o script, não importa onde esteja.

Isso se deve a algoritmos internos. Quando o JavaScript se prepara para executar o script, ele primeiro procura por Declarações de Função globais nele e cria as funções. Podemos pensar nisso como um "estágio de inicialização".

E depois que todas as Declarações de Função são processadas, o código é executado. Então ele tem acesso a essas funções.

Por exemplo, isso funciona:

```js run refresh untrusted
*!*
sayHi("John"); // Olá, John
*/!*

function sayHi(name) {
  alert( `Olá, ${name}` );
}
```

A Declaração de Função `sayHi` é criada quando o JavaScript está se preparando para iniciar o script e é visível em todo lugar nele.

...Se fosse uma Expressão de Função, então não funcionaria:

```js run refresh untrusted
*!*
sayHi("John"); // erro!
*/!*

let sayHi = function(name) {  // (*) sem mágica mais
  alert( `Olá, ${name}` );
};
```

Expressões de Função são criadas quando a execução as alcança. Isso aconteceria apenas na linha `(*)`. Tarde demais.

Outra característica especial das Declarações de Função é seu escopo de bloco.

**No modo estrito, quando uma Declaração de Função está dentro de um bloco de código, ela é visível em todo lugar dentro desse bloco. Mas não fora dele.**

Por exemplo, vamos imaginar que precisamos declarar uma função `welcome()` dependendo da variável `age` que obtemos durante a execução. E então planejamos usá-la algum tempo depois.

Se usarmos Declaração de Função, não funcionará como pretendido:

```js run
let age = prompt("Qual é a sua idade?", 18);

// declarar condicionalmente uma função
if (age < 18) {

  function welcome() {
    alert("Olá!");
  }

} else {

  function welcome() {
    alert("Saudações!");
  }

}

// ...usar depois
*!*
welcome(); // Erro: welcome is not defined
*/!*
```

Isso porque uma Declaração de Função só é visível dentro do bloco de código no qual ela reside.

Aqui está outro exemplo:

```js run
let age = 16; // pegar 16 como exemplo

if (age < 18) {
*!*
  welcome();               // \   (executa)
*/!*
                           //  |
  function welcome() {     //  |
    alert("Olá!");         //  |  Declaração de Função está disponível
  }                        //  |  em todo lugar no bloco onde é declarada
                           //  |
*!*
  welcome();               // /   (executa)
*/!*

} else {

  function welcome() {
    alert("Saudações!");
  }
}

// Aqui estamos fora das chaves,
// então não podemos ver Declarações de Função feitas dentro delas.

*!*
welcome(); // Erro: welcome is not defined
*/!*
```

O que podemos fazer para tornar `welcome` visível fora do `if`?

A abordagem correta seria usar uma Expressão de Função e atribuir `welcome` à variável que é declarada fora do `if` e tem a visibilidade adequada.

Este código funciona como pretendido:

```js run
let age = prompt("Qual é a sua idade?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Olá!");
  };

} else {

  welcome = function() {
    alert("Saudações!");
  };

}

*!*
welcome(); // ok agora
*/!*
```

Ou poderíamos simplificar ainda mais usando o operador de interrogação `?`:

```js run
let age = prompt("Qual é a sua idade?", 18);

let welcome = (age < 18) ?
  function() { alert("Olá!"); } :
  function() { alert("Saudações!"); };

*!*
welcome(); // ok agora
*/!*
```


```smart header="Quando escolher Declaração de Função versus Expressão de Função?"
Como regra geral, quando precisamos declarar uma função, a primeira coisa a considerar é a sintaxe de Declaração de Função. Ela dá mais liberdade em como organizar nosso código, porque podemos chamar tais funções antes de serem declaradas.

Isso também é melhor para legibilidade, já que é mais fácil encontrar `function f(…) {…}` no código do que `let f = function(…) {…};`. Declarações de Função são mais "chamativas".

...Mas se uma Declaração de Função não nos serve por algum motivo, ou precisamos de uma declaração condicional (acabamos de ver um exemplo), então Expressão de Função deve ser usada.
```

## Resumo

- Funções são valores. Elas podem ser atribuídas, copiadas ou declaradas em qualquer lugar do código.
- Se a função é declarada como uma instrução separada no fluxo principal do código, isso é chamado de "Declaração de Função".
- Se a função é criada como parte de uma expressão, é chamada de "Expressão de Função".
- Declarações de Função são processadas antes que o bloco de código seja executado. Elas são visíveis em todo lugar no bloco.
- Expressões de Função são criadas quando o fluxo de execução as alcança.

Na maioria dos casos quando precisamos declarar uma função, uma Declaração de Função é preferível, porque ela é visível antes da própria declaração. Isso nos dá mais flexibilidade na organização do código, e geralmente é mais legível.

Então devemos usar uma Expressão de Função apenas quando uma Declaração de Função não é adequada para a tarefa. Vimos alguns exemplos disso neste capítulo, e veremos mais no futuro.
