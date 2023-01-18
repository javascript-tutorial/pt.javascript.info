# Function Expressions

Em JavaScript, uma função não é uma "estrutura mágica da linguagem", mas sim uma espécie de valor especial.

A sintaxe que empregámos antes é chamada de Declaração de Função (*Function Declaration*):

```js
  function sayHi() {
    alert( "Olá" );
  }
```

Existe outra sintaxe para criar uma função que é chamada de Expressão de Função (*Function Expression*).

Ela nos permite criar uma função no meio de qualquer expressão.

Por exemplo:

```js
  let sayHi = function() {
    alert( "Olá" );
  };
```

Aqui, vemos um valor atribuído à variável `sayHi`, que se trata da função criada como `function() { alert("Hello"); }`.

Como a criação da função é feita no contexto de uma expressão de atribuição (no lado direito de `=`), isto é uma *Expressão de Função* (Function Expression).

Por favor, note que não há nenhum nome depois da palavra-chave `function`. A omissão do nome é permitida em Expressões de Funções.

Aqui, nós imediatamente atribuímos a função à variável, assim o significado destas amostras de código é o mesmo que: "crie uma função e a coloque na variável `sayHi`".

Em situações mais avançadas, que veremos mais adiante, uma função pode ser criada e imediatamente executada ou agendada para execução mais tarde, sem contudo ser guardada em nenhum lugar, permanecendo assim anónima.

## Uma função é um valor

Vamos sublinhar: não importa como uma função é criada, uma função é um valor. Em ambos os exemplos acima, uma função é guardada na variável `sayHi`.

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

Mas, ainda se trata de um valor. Então, o podemos manusear como acontece com outros tipos de valores.

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
2. Na linha em `(2)` é copiada para a variável `func`. Por favor, note outra vez: não existem parênteses depois de `sayHi`. Se houvesse, então `func = sayHi()` iria escrever *o resultado da chamada* `sayHi()` em `func`, não a própria *função* `sayHi`.
3. Agora, a função pode ser invocada tanto como `sayHi()` como também `func()`.

Também poderíamos ter usado uma Expressão de Função para declarar `sayHi` na primeira linha:

```js
  let sayHi = function() { // (1) criação
    alert( "Olá" );
  };

  let func = sayHi;
  // ...
```

Tudo iria funcionar do mesmo modo.


````smart header="Porque há um ponto e vírgula no final?"
Poderá se perguntar, porque terá uma Expressão de Função um ponto e vírgula `;` no final, mas a Declaração de Função não:

```js
  function sayHi() {
    // ...
  }

  let sayHi = function() {
    // ...
  }*!*;*/!*
```

A resposta é simples: uma Expressão de Função é criada aqui, como `function(…) {…}`, dentro da instrução de atribuição `let sayHi = …;`. O ponto e vírgula `;`, é recomendado no final de qualquer instrução, assim não faz parte da sintaxe da função.

O ponto e vírgula estaria lá numa atribuição mais simples, como por exemplo `let sayHi = 5;`, então também lá está numa atribuição de função.
````

## Funções callback

Vejamos mais exemplos de passagem de funções como valores e do uso de Expressões de Função.

Vamos escrever uma função `ask(question, yes, no)` com três parâmetros:

`question`
: Texto da questão

`yes`
: Função a executar se a resposta for "Sim"

`no`
: Função a executar se a resposta for "Não"

A função deverá fazer a `question` e, dependendo da resposta do utilizador, chamar `yes()` ou `no()`:

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

Podemos utilizar Expressões de Função para escrever essa função numa versão mais curta:

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

Aqui, as funções são declaradas precisamente dentro da chamada a `ask(...)`. Elas não têm nome, e por isso são chamadas de *anónimas*. Não é possível o acesso a tais funções fora de `ask` (porque elas não estão atribuídas a variáveis), mas é só o que queremos neste exemplo.

Tal código ocorre muito naturalmente nos nossos programas (*scripts*), ele está no espírito do JavaScript.

```smart header="Uma função é um valor que representa uma \"ação\""
Valores comuns como strings ou números representam os *dados*.

Uma função pode ser vista como uma *ação*.

Podemos passá-la de variável para variável, e executá-la quando pretendermos.
```


## Expressões de Função vs Declarações de Função

Vamos formular diferenças chave entre Declarações de Função e Expressões de Função.

Primeiro, a sintaxe: como as diferenciar no código.

- *Declaração de Função:* uma função, declarada como uma instrução em separado, no fluxo principal do código.

    ```js
      // Function Declaration
      function sum(a, b) {
        return a + b;
      }
    ```
- *Expressão de Função:* uma função, criada dentro de uma expressão ou dentro de outra construção sintática. Aqui, a função é criada no lado direito da "expressão de atribuição" `=`:

    ```js
      // Function Expression
      let sum = function(a, b) {
        return a + b;
      };
    ```

Contudo, a mais subtil diferença é *quando* uma função é criada pelo interpretador de JavaScript (*JavaScript engine*).

**Uma Expressão de Função é criada quando a execução a alcança, e só é utilizável a partir desse momento.**

Quando o fluxo de execução passa para o lado direito da atribuição `let sum = function…` -- aí sim, a função é criada e pode ser utilizada (atribuída, chamada, etc.) daí para frente.

Declarações de Função são diferentes.

**Uma Declaração de Função pode ser invocada antes de ser definida.**

Por exemplo, uma Declaração de Função é visível em todo o *script*, não importa onde estiver.

Isto se deve a algoritmos internos. Quando o JavaScript se prepara para correr o programa, ele primeiro procura nele por Declarações de Função globais e cria as funções. Nós podemos pensar nisto como uma "fase de inicialização".

E após o processamento de todas as Declarações de Função, o código é executado. Assim, ele tem acesso a essas funções.

Por exemplo, isto funciona:

```js run refresh untrusted
*!*
sayHi("John"); // Olá, John
*/!*

function sayHi(name) {
  alert( `Olá, ${name}` );
}
```

A Declaração de Função `sayHi` é criada quando o JavaScript se prepara para iniciar o script, e é visível em todo o lugar nele.

...Se fosse uma Expressão de Função, então não iria funcionar:

```js run refresh untrusted
*!*
sayHi("John"); // erro!
*/!*

let sayHi = function(name) {  // (*) não há mais mágica
  alert( `Olá, ${name}` );
};
```

As Expressões de Função são criadas quando a execução as alcança. Isso só iria acontecer na linha `(*)`. Demasiado tarde.

Uma outra funcionalidade especial de Declarações de Função é o seu escopo de bloco (*block scope*).

**No modo estrito (*strict mode*), quando uma Declarações de Função está dentro de um bloco de código, ela é visível em todo o lugar dentro desse bloco. Mas não fora dele.**

Por exemplo, imaginemos que precisamos de declarar uma função `welcome()` que dependa da variável `age` que obtemos no momento da execução (runtime) do programa. E que depois planejamos usá-la mais tarde.

Se empregarmos uma Declaração de Função, isto não funciona como pretendido:

```js run
let age = prompt("Que idade você tem?", 18);

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

Isto porque uma Declaração de Função só é visível dentro do bloco de código onde reside.

Aqui está outro exemplo:

```js run
let age = 16; // escolha 16 como um exemplo

if (age < 18) {
*!*
  welcome();               // \   (executa)
*/!*
                           //  |
  function welcome() {     //  |  
    alert("Olá!");         //  |  A Declaração de Função está disponível
  }                        //  |  em todo o lugar no bloco onde é criada
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
// possível ver Declarações de Função criadas dentro delas.

*!*
welcome(); // Erro: welcome não está definida
*/!*
```

O que poderíamos fazer para tornar `welcome` visível fora do `if`?

O correto seria empregar uma Expressão de Função, e atribuir `welcome` a uma variável declarada fora do `if` e que tenha uma visibilidade adequada.

Agora funciona como pretendido:

```js run
let age = prompt("Que idade você tem?", 18);

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
let age = prompt("Que idade você tem?", 18);

let welcome = (age < 18) ?
  function() { alert("Olá!"); } :
  function() { alert("Saudações!"); };

*!*
welcome(); // bem, agora
*/!*
```


```smart header="Quando escolher uma Declaração de Função versus uma Expressão de Função?"
Como regra do polegar, ao precisarmos de declarar uma função, a primeira a considerar é uma sintaxe de Declaração de Função. Ela dá uma maior liberdade para organizar o código, porque podemos chamar tais funções antes de serem declaradas.

Também é melhor para a legibilidade, porque é mais fácil procurar por `function f(…) {…}` no código do que por `let f = function(…) {…};`. Declarações de Função "sobressaem" mais à vista.

...Mas se por alguma razão uma Declaração de Função não nos for útil, ou se precisarmos de uma declaração condicional (vimos um exemplo acima), então uma Expressão de Função será a escolha.
```

## Resumo

- Funções são valores. Elas podem ser atribuídas, copiadas ou declaradas em qualquer parte do código.
- Se a função for declarada como uma instrução em separado no fluxo principal do código, é chamada de "Function Declaration".
- Se a função for criada como parte de uma expressão, é chamada de "Function Expression".
- Function Declarations são processadas antes de um bloco de código ser executado. Elas são visíveis em qualquer lugar dentro do bloco.
- Function Expressions são criadas quando o fluxo de execução as alcança.

Na maior parte dos casos, quando precisarmos de declarar uma função, uma Function Declaration é preferível, porque é visível antes da própria definição. Isso nos dá mais flexibilidade na organização do código, e geralmente é mais legível.

Assim, deveríamos apenas empregar uma Function Expression quando a Function Declaration não fosse adequada à tarefa. Vimos alguns exemplos disto neste capítulo, e veremos mais no futuro.
