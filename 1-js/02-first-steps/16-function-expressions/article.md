# Expressões de função

Em JavaScript, uma função não é uma "estrutura mágica da linguagem", mas um valor de tipo especial.

A sintaxe que usámos antes é chamada de *Declaração de Função* (*Function Declaration*):

```js
  function sayHi() {
    alert( "Olá" );
  }
```

Existe outra sintaxe para criar uma função que é chamada de *Expressão de Função* (*Function Expression*).

É similar a:

```js
  let sayHi = function() {
    alert( "Olá" );
  };
```

Aqui, a função é criada e atribuida explícitamente à variável, como qualquer outro valor. Não importa como a função é definida, é apenas um valor armazenado na variável `sayHi`.

O significado destas amostras de código é o mesmo: "crie uma função e a coloque na variável `sayHi`".

Podemos até exibir esse valor usando `alert`:

```js run
  function sayHi() {
    alert( "Olá" );
  }

  *!*
  alert( sayHi ); // mostra o código da função
  */!*
```

Por favor, note que a última linha não executa a função, porque não existem parênteses depois de `sayHi`. Existem linguagens de programação onde qualquer menção ao nome de uma função provoca a sua execução, mas em JavaScript não é assim.

Em JavaScript, uma função é um valor, então podemos lidar com ela como com um valor. O código acima mostra a sua definição em formato de texto (*string*), isto é, o código fonte.

Óbviamente, uma função é um valor especial, porque podemos invocá-lo usando `sayHi()`.

Mas ainda assim é um valor. Então, podemos manuseá-lo como acontece com outros tipos de valores.

Podemos copiar uma função para outra variável:

```js run no-beautify
  function sayHi() {  // (1) crie
    alert( "Olá" );
  }

  let func = sayHi;   // (2) copie

  func(); // Olá      // (3) execute a cópia (funciona)!
  sayHi(); // Olá     //     isto também ainda funciona (porque não?)
```

Aqui está o que acima acontece, em detalhe:

1. A Declaração de Função `(1)` cria uma função e a coloca na variável chamada `sayHi`.
2. Na linha em `(2)` é copiada para a variável `func`. Por favor, note outra vez: não existem parênteses depois de `sayHi`. Se os houvessem, então `func = sayHi()` escreveria *o resultado da chamada* `sayHi()` em `func`, não a própria *função* `sayHi`.
3. Agora, a função pode ser invocada tanto como `sayHi()` como `func()`.

Note que também poderíamos ter utilizado uma Expressão de Função para declarar `sayHi`, na primeira linha:

```js
  let sayHi = function() {
    alert( "Olá" );
  };

  let func = sayHi;
  // ...
```

Tudo funcionaria do mesmo modo.

````smart header="Porque há um ponto-e-vírgula no final?"
Poderá perguntar-se, porque terá uma Expressão de Função um ponto-e-vírgula `;` no final, mas a Declaração de Função não:

```js
  function sayHi() {
    // ...
  }

  let sayHi = function() {
    // ...
  }*!*;*/!*
```

A resposta é simples:
- Não há necessidade para um `;` no fim de blocos de código e estruturas sintáticas que os usem como `if { ... }`, `for {  }`, `function f { }` etc.
- Uma Expressão de Função é usada dentro de uma instrução: `let sayHi = ...;`, tal como o é um valor. Não é um bloco de código, mas sim uma atribuição. O ponto-e-vírgula `;` é recomendado no final de instruções, independentemente do seu valor. Assim, o ponto-e-vírgula aqui não está relacionado à Função de Expressão em si, mas simplesmente termina a instrução.
````

## Funções callback

Vejamos mais exemplos de passagem de funções como valores e de uso de expressões de função.

Escreveremos uma função `ask(question, yes, no)` com três parametros:

`question`: Texto da questão

`yes`: Função a executar se a resposta for "Sim"

`no`: Função a executar se a resposta for "Não"

A função deverá efetuar a `question` e, dependendo da resposta do utilizador, chamar `yes()` ou `no()`:

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

// uso: as funções showOk, showCancel são passadas como argumentos a ask
ask("Você concorda?", showOk, showCancel);
```

Na prática, tais funções são muito úteis. A maior difereça entre uma `ask` num programa real [real-life] e o exemplo acima, é que funções num programa real usam formas mais complexas de interação com o utilizador, do que um simples `confirm`. No navegador (*browser*), geralmente tal função desenha uma bonita janela com a questão. Mas isso é outra história.

**Os argumentos `showOk` e `showCancel` de `ask` são chamados de *funções de retorno de chamada* (callback functions) ou apenas *callbacks*.**

A ideia é que nós passamos uma função e esperamos que ela seja "chamada" mais tarde se necessário.  No nosso caso, `showOk` se torna na função *callback*  para a resposta "yes", e `showCancel` para a resposta "no".

Podemos utilizar Expressões de Funções para escrever essa função numa versão mais curta:

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

Aqui, as funções são declaradas precisamente dentro da chamada a `ask(...)`. Elas não têm nome, e por isso são chamadas de *anónimas*. Tais funções não podem ser acedidas fora de `ask` (porque não estão atribuidas a variáveis), mas é apenas o que queremos para este caso.

Tal código aparece muito naturalmente nos nossos programas (*scripts*); ele está no espírito de JavaScript.

```smart header="Uma função é um valor que representa uma \"ação\""
Valores comuns como *strings* (cadeias-de-caráteres) ou números representam os *dados*.

Uma função pode ser tida como uma *ação*.

Podemos passá-la entre variáveis e executá-la quando pretendermos.
```

## Expressões de função vs Declarações de função

Vamos formular diferenças chave entre Declarações de Função e Expressões.

Primeiro, a sintaxe: como as diferenciar no código.

- *Declaração de Função:* uma função, declarada como uma instrução isolada, no fluxo principal do código .

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

A mais subtil diferença é *quando* uma função é criada pelo interpretador de JavaScript [JavaScript engine].

**Uma Expressão de Função é criada quando a execução a alcança, e apenas é utilizável a partir desse momento.**

Quando o fluxo de execução passa para o lado direito da atribuição `let sum = function…` -- aí sim, a função é criada e pode ser utilizada (atribuida, chamada, etc.) daí em diante.

Declarações de Função são diferentes.

**Uma Declaração de Função pode ser invocada antes de ser definida.**

Como outro exemplo, uma Declaração de Função é visível em todo o programa (*script*), não importa onde estiver.

Isto se deve a algoritmos internos. Quando o JavaScript se prepara para correr o programa, ele primeiro procura por Declarações de Função globais e cria as funções. Podemos pensar nisto como uma "fase de inicialização".

E após o processamento de todas as Declarações de Função, o código é executado. Assim, tem acesso a estas funções.

Por exemplo, isto funciona:

```js run refresh untrusted
*!*
sayHi("John"); // Olá, John
*/!*

function sayHi(name) {
  alert( `Olá, ${name}` );
}
```

A Declaração de Função `sayHi` é criada quando JavaScript se prepara para iniciar o script, e é visível em todo o lugar nele.

...Se fosse uma Expressão de Função, então não funcionaria:

```js run refresh untrusted
*!*
sayHi("John"); // erro!
*/!*

let sayHi = function(name) {  // (*) não há mais mágica
  alert( `Olá, ${name}` );
};
```

As Expressões de Função são criadas quando a execução as alcança. Isso apenas aconteceria apenas na linha `(*)`. Demasiado tarde.

Uma outra funcionalidade especial de Declarações de Função é o seu escopo de bloco (*block scope*).

**No modo estrito (*strict mode*), quando uma Declaração de Função está dentro de um bloco de código, ela é visível em todo o lugar dentro desse bloco. Mas não fora dele.**

Por exemplo, imaginemos que precisamos de declarar uma função `welcome()` que dependa da variável `age` que obtemos no momento de execução (runtime) do programa. E que planejamos utilizá-la algures mais tarde.

Se empregarmos uma Declaração de Função, isto não funciona como pretendido:

```js run
let age = prompt("Que idade tem?", 18);

// condicionalmente declare uma função
if (age < 18) {

  function welcome() {
    alert("Olá!");
  }

} else {

  function welcome() {
    alert("Saudações!");
  }

}

// ...utilize-a mais tarde
*!*
welcome(); // Erro: welcome não está definida
*/!*
```

Isto porque uma Declaração de Função apenas é visível dentro do bloco de código onde reside.

Aqui está outro exemplo:

```js run
let age = 16; // tenha 16 como um exemplo

if (age < 18) {
*!*
  welcome();               // \   (executa)
*/!*
                           //  |
  function welcome() {     //  |  
    alert("Olá!");         //  |  Declaração de Função está disponível
  }                        //  |  em todo o lugar no bloco onde é feita
                           //  |
*!*
  welcome();               // /   (executa)
*/!*

} else {

  function welcome() {     //  para age = 16, esta "welcome" nunca é criada
    alert("Saudações!");
  }
}

// Aqui estamos fora das chavetas, portanto não é
// possível ver-se uma Declaração de Função feita dentro delas.

*!*
welcome(); // Erro: welcome não está definida
*/!*
```

O que poderemos fazer para tonar `welcome` visível fora do `if`?

O correto seria empregar uma Função de Expressão e atribuir `welcome` a uma variável declarada fora do `if` e que tenha uma visibilidade adequada.

Agora funciona como pretendido:

```js run
let age = prompt("Que idade tem?", 18);

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
welcome(); // bem, agora
*/!*
```

Ou poderíamos simplificar mais ainda utilizando o operador ponto-de-interrogação `?`:

```js run
let age = prompt("Que idade tem?", 18);

let welcome = (age < 18) ?
  function() { alert("Olá!"); } :
  function() { alert("Saudações!"); };

*!*
welcome(); // bem, agora
*/!*
```

```smart header="Quando escolher uma Function Declaration versus uma Expressão de Função?"
Como uma regra do polegar, quando precisarmos de declarar uma função, a primeira a considerar é uma sintaxe de Declaração de Função. Ela dá uma mior liberdade para organizar o código, porque podemos chamar tais funções antes de serem declaradas.


Também é melhor para legibilidade, porque é mais fácil procurar por `function f(…) {…}` no código do que por `let f = function(…) {…};`. Declarações de Função "sobressaem" mais à vista.

...Mas se por alguma razão uma Declaração de Função não nos for útil, ou precisarmos de uma declaração condicional (vimos um exemplo acima), então uma Expressão de Função será a escolha.
```

## Sumário

- Funções são valores. Elas podem ser atribuidas, copiadas ou declaradas em qualquer parte do código.
- Se a função for declarada como uma instrução separada no fluxo do código principal, é chamada de "Declaração de Função".
- Se a função for criada como  parte de uma expressão, é chamada de "Expressão de função".
- Declarações de Função são processadas antes de um bloco de código ser executado. Elas são visíveis em qualquer lugar dentro do bloco.
- Expressões de função são criadas quando o fluxo de execução as alcança.

Na maior parte dos casos, quando precisarmos de declarar uma função, uma Declaração de Função é preferível, porque é visível antes da própria definição. Isso dá-nos mais flexibilidade para a organização do código, e geralmente é mais legível.

Assim, deveríamos empregar uma Expressão de Função apenas quando a Declaração de Função não se adequasse à tarefa. Vimos alguns exemplos disso no capítulo, e veremos mais no futuro.
