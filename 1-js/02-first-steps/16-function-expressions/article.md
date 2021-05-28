# Function Expressions

Em JavaScript, uma função não é uma "estrutura mágica da linguagem", mas uma espécie de valor especial.

A sintaxe que empregámos antes é chamada de Declaração de Função (*Function Declaration*):

```js
  function sayHi() {
    alert( "Olá" );
  }
```

Existe outra sintaxe para criar uma função que é chamada de Expressão de Função (*Function Expression*).

Ela se parece com:

```js
  let sayHi = function() {
    alert( "Olá" );
  };
```

Aqui, a função é criada e atribuída explícitamente à variável, como qualquer outro valor. Não importa como a função é definida, é apenas um valor armazenado na variável `sayHi`.

O significado destas amostras de código é o mesmo: "crie uma função e a coloque na variável `sayHi`".

Nós podemos até exibir esse valor usando `alert`:

```js run
  function sayHi() {
    alert( "Olá" );
  }

  *!*
  alert( sayHi ); // mostra o código da função
  */!*
```

Por favor, note que a última linha não executa a função, porque não existem parênteses depois de `sayHi`. Existem linguagens de programação onde qualquer menção ao nome de uma função provoca a sua execução, mas não é assim em JavaScript.

Em JavaScript, uma função é um valor, então podemos lidar com ela como com um valor. O código acima mostra a sua representação em formato *string*, isto é, o seu código fonte.

É claro que uma função é um valor especial, porque o podemos invocar usando `sayHi()`.

Mas ainda assim é um valor. Então, o podemos manusear como acontece com outros tipos de valores.

Nós podemos copiar uma função para outra variável:

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
2. Na linha em `(2)` é copiada para a variável `func`. Por favor, note outra vez: não existem parênteses depois de `sayHi`. Se os houvessem, então `func = sayHi()` iria escrever *o resultado da chamada* `sayHi()` em `func`, não a própria *função* `sayHi`.
3. Agora, a função pode ser invocada tanto como `sayHi()` como igualmente `func()`.

Note, que também poderíamos ter utilizado uma Expressão de Função para declarar `sayHi` na primeira linha:

```js
  let sayHi = function() {
    alert( "Olá" );
  };

  let func = sayHi;
  // ...
```

Tudo iria funcionar do mesmo modo.


````smart header="Porque há um ponto-e-vírgula no final?"
Poderá se perguntar, porque terá uma Function Expression um ponto-e-vírgula `;` no final, mas a Function Declaration não:

```js
  function sayHi() {
    // ...
  }

  let sayHi = function() {
    // ...
  }*!*;*/!*
```

A resposta é simples:
- Não há necessidade para um `;` no fim de blocos de código e estruturas sintáticas que usem tais blocos como `if { ... }`, `for {  }`, `function f { }` etc.
- Uma Function Expression é utilizada dentro de uma instrução: `let sayHi = ...;`, a exemplo de um outro valor. Não se trata de um bloco de código, mas duma atribuição. O ponto-e-vírgula `;` é recomendado no final de instruções, independentemente de seu valores. Assim, o ponto-e-vírgula aqui não está relacionado à Function Expression em si, mas simplesmente termina a instrução.
````

## Funções callback

Vejamos mais exemplos de passagem de funções como valores e do uso de Function Expressions.

Vamos escrever uma função `ask(question, yes, no)` com três parâmetros:

`question`
: Texto da questão

`yes`
: Função a executar se a resposta for "Sim"

`no`
: Função a executar se a resposta for "Não"

A função deverá perguntar a `question` e, dependendo da resposta do utilizador, chamar `yes()` ou `no()`:

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

// uso: as funções showOk, showCancel são passadas como argumentos a 'ask'
ask("Você concorda?", showOk, showCancel);
```

Na prática, tais funções são muito úteis. A maior diferença entre `ask` num programa real e no exemplo acima, é que funções num programa real usam formas de interação com o utilizador mais complexas do que um simples `confirm`. No navegador (*browser*), geralmente uma dessas funções desenha uma bonita janela com a questão. Mas isso é outra história.

**Os argumentos `showOk` e `showCancel` de `ask` são chamados de *callback functions* (funções de retorno de chamada) ou simplesmente *callbacks*.**

A ideia é que nós passamos uma função e esperamos que ela seja "chamada mais tarde" se necessário.  No nosso caso, `showOk` se torna na função *callback*  para a resposta "yes", e `showCancel` para a resposta "no".

Podemos utilizar Function Expressions para escrever essa função numa versão mais curta:

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

Aqui, as funções são declaradas justamente dentro da chamada a `ask(...)`. Elas não têm nome, e por isso são chamadas de *anónimas*. Não é possível o acesso a tais funções fora de `ask` (porque elas não estão atribuídas a variáveis), mas é só o que queremos aqui neste caso.

Tal código ocorre muito naturalmente nos nossos programas (*scripts*), ele está no espírito do JavaScript.

```smart header="Uma função é um valor que representa uma \"ação\""
Valores comuns como strings ou números representam os *dados*.

Uma função pode ser tida como uma *ação*.

Podemos passá-la entre variáveis e a executar quando pretendemos.
```


## Function Expressions vs Function Declarations

Vamos formular diferenças chave entre Function Declarations e Function Expressions.

Primeiro, a sintaxe: como ver a diferença no código.

- *Function Declaration:* uma função, declarada como uma instrução em separado, no fluxo principal do código.

    ```js
      // Function Declaration
      function sum(a, b) {
        return a + b;
      }
    ```
- *Function Expression:* uma função, criada dentro de uma expressão ou dentro de outra construção sintática. Aqui, a função é criada no lado direito da "expressão de atribuição" `=`:

    ```js
      // Function Expression
      let sum = function(a, b) {
        return a + b;
      };
    ```

A mais subtil diferença é *quando* uma função é criada pelo interpretador de JavaScript (*JavaScript engine*).

**Uma Function Expression é criada quando a execução a alcança, e só é utilizável a partir desse momento.**

Quando o fluxo de execução passa para o lado direito da atribuição `let sum = function…` -- aí sim, a função é criada e pode ser utilizada (atribuída, chamada, etc.) daí para frente.

Function Declarations são diferentes.

**Uma Function Declaration pode ser invocada antes de ser definida.**

Por exemplo, uma Function Declaration é visível em todo o *script*, não importa onde estiver.

Isto se deve a algoritmos internos. Quando o JavaScript se prepara para correr o programa, ele primeiro procura nele por Function Declarations globais e cria as funções. Nós podemos pensar nisto como uma "fase de inicialização".

E após o processamento de todas as Function Declarations, o código é executado. Assim, ele tem acesso a essas funções.

Por exemplo, isto funciona:

```js run refresh untrusted
*!*
sayHi("John"); // Olá, John
*/!*

function sayHi(name) {
  alert( `Olá, ${name}` );
}
```

A Function Declaration `sayHi` é criada quando o JavaScript se prepara para iniciar o script, e é visível em todo o lugar nele.

...Se fosse uma Function Expression, então não iria funcionar:

```js run refresh untrusted
*!*
sayHi("John"); // erro!
*/!*

let sayHi = function(name) {  // (*) não há mais mágica
  alert( `Olá, ${name}` );
};
```

As Function Expressions são criadas quando a execução as alcança. Isso só iria acontecer na linha `(*)`. Demasiado tarde.

Uma outra funcionalidade especial de Function Declarations é o seu escopo de bloco (*block scope*).

**No modo estrito (*strict mode*), quando uma Function Declaration está dentro de um bloco de código, ela é visível em todo o lugar dentro desse bloco. Mas não fora dele.**

Por exemplo, imaginemos que precisamos de declarar uma função `welcome()` que dependa da variável `age` que obtemos no momento da execução (runtime) do programa. Depois, planejamos usá-la em algum instante mais tarde.

Se empregamos uma Function Declaration, isto não funciona como pretendido:

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

Isto porque uma Function Declaration só é visível dentro do bloco de código onde reside.

Aqui está outro exemplo:

```js run
let age = 16; // tome 16 como um exemplo

if (age < 18) {
*!*
  welcome();               // \   (executa)
*/!*
                           //  |
  function welcome() {     //  |  
    alert("Olá!");         //  |  A Function Declaration está disponível
  }                        //  |  em todo o lugar no bloco onde é feita
                           //  |
*!*
  welcome();               // /   (executa)
*/!*

} else {

  function welcome() {
    alert("Saudações!");
  }
}

// Aqui estamos fora das chavetas, portanto não é
// possível ver-se uma Function Declaration feita dentro delas.

*!*
welcome(); // Erro: welcome não está definida
*/!*
```

O que poderíamos fazer para tonar `welcome` visível fora do `if`?

O correto seria empregar uma Function Expression e atribuir `welcome` a uma variável declarada fora do `if` e que tenha uma visibilidade adequada.

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

Ou podemos simplificar mais ainda utilizando o operador ponto-de-interrogação `?`:

```js run
let age = prompt("Que idade tem?", 18);

let welcome = (age < 18) ?
  function() { alert("Olá!"); } :
  function() { alert("Saudações!"); };

*!*
welcome(); // bem, agora
*/!*
```


```smart header="Quando escolher uma Function Declaration versus uma Function Expression?"
Como uma regra do polegar, quando precisarmos de declarar uma função, a primeira a considerar é uma sintaxe de Function Declaration. Ela dá uma maior liberdade para organizar o código, porque podemos chamar tais funções antes de serem declaradas.

Também é melhor para a legibilidade, porque é mais fácil procurar por `function f(…) {…}` no código do que por `let f = function(…) {…};`. Function Declarations "sobressaem" mais à vista.

...Mas se por alguma razão uma Function Declaration não nos for útil, ou se precisarmos de uma declaração condicional (vimos um exemplo acima), então uma Function Expression será a escolha.
```

## Sumário

- Funções são valores. Elas podem ser atribuídas, copiadas ou declaradas em qualquer parte do código.
- Se a função for declarada como uma instrução em separado no fluxo principal do código , é chamada de "Function Declaration".
- Se a função for criada como parte de uma expressão, é chamada de "Function Expression".
- Function Declarations são processadas antes de um bloco de código ser executado. Elas são visíveis em qualquer lugar dentro do bloco.
- Function Expressions são criadas quando o fluxo de execução as alcança.

Na maior parte dos casos, quando precisarmos de declarar uma função, uma Function Declaration é preferível, porque é visível antes da própria definição. Isso nos dá mais flexibilidade para a organização do código, e geralmente é mais legível.

Assim, deveríamos empregar uma Function Expression apenas quando a Function Declaration não fosse adequada à tarefa. Vimos alguns exemplos disso no capítulo, e veremos mais no futuro.
