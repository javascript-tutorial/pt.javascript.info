# Expressões de função

Em JavaScript, uma função não é uma "estrutura mágica da linguagem", mas um valor de um tipo especial.

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

Em JavaScript, uma função é um valor, então podemos lidar com ela como com um valor. O código acima mostra a sua definição em formato de texto (*string*), isto é o código fonte.

Óbviamente, uma função é um valor especial, porque podemos invocá-lo usando `sayHi()`.

Mas ainda assim é um valor. Então, podemos manuseá-lo como com outros tipos de valores.

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

Na prática, tais funções são muito úteis. A maior difereça entre uma `ask` num programa real [real-life] e o exemplo acima, é que funções num programa real usam formas mais complexas de interagir com o utilizador do que um simples `confirm`. No navegador (*browser*), geralmente tal função desenha uma bonita janela com a questão. Mas isso é outra história.

**Os argumentos `showOk` e `showCancel` de `ask` são chamados de *funções de retorno de chamada* (callback functions) ou apenas *callbacks*.**

A ideia é que nós passamos uma função e esperamos que ela seja "chamada" mais tarde se necessário.  No nosso caso, `showOk` se torna na função de retorno de chamada (callback) para a resposta "yes", e `showCancel` para a resposta "no".

Podemos utilizar Expressões de Funções para escrever uma versão mais curta da mesma função:

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

Aqui, as funções são declaradas justamente dentro da chamada a `ask(...)`. Elas não têm nome, e por isso são chamadas de *anónimas*. Tais funções não podem ser acedidas fora de `ask` (porque não estão atribuidas a variáveis), mas é apenas o que queremos para aqui.

Código semelhante aparece nos nossos programas (scripts) muito naturalmente, está no espírito de JavaScript.


```smart header="A function is a value representing an \"action\""
Valores comuns como cadeias-de-caráteres (strings) ou números representam os *dados*.

Uma função pode ser tida como uma *ação*.

Podemos passá-la entre variáveis e executá-la quando pretendermos.
```


## Expressões de função vs Declarações de função

Vamos formular diferenças chave entre Declarações de Função e Expressões.

Primeiro, a sintaxe: como verificar qual é qual no código.

- *Declaração de Função:* uma função, declarada como uma instrução em separado, no fluxo do código principal.

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

**Uma Expressão de Função é criada quando a execução chega até si, e é utilizável a partir daí.**

Ao passar o fluxo de execução para o lado direito da atribuição `let sum = function…` -- aí é que é, a função é criada e pode ser utilizada (atribuida, chamada, etc.) a partir daí.

Declarações de Função sao diferentes.

**Uma Declaração de Função pode ser chamada antes de ser definida.**

Por exemplo, uma Declaração de Função é visível em todo o programa (*script*), não importa onde estiver.

Isto se deve a algoritmos internos. Quando o JavaScript se prepara para correr o programa, ele primeiro procura nele por Declarações de Função globais e cria as funções. Podemos pensar nisto como um "estágio de inicialização".

Após o processamento de todas as Declarações de Função, o código é executado. Desta maneira, é tem acesso a estas funções.

Por exemplo, isto funciona:

```js run refresh untrusted
*!*
sayHi("John"); // Olá, John
*/!*

function sayHi(name) {
  alert( `Olá, ${name}` );
}
```

A Declaração de Função `sayHi` é criada quando JavaScript se prepara para iniciar o script e é visível em todo o lugar nele.

...Se fosse uma Expressão de Função, então não funcionaria:

```js run refresh untrusted
*!*
sayHi("John"); // erro!
*/!*

let sayHi = function(name) {  // (*) nenhuma mágica mais
  alert( `Olá, ${name}` );
};
```

As Expressões de Função são criadas quando a execução as alcança. O que aconteceria apenas na linha `(*)`. Tarde demais.

Uma outra funcionalidade especial de Declarações de Função é o seu escopo de bloco (*block scope*).

**Quando uma Declaração de Função é feita dentro de um bloco de código, ela é visível em todo o lugar dentro desse bloco. Mas não fora dele.**

Por exemplo, imaginemos que precisamos de declarar uma função `welcome()` que dependa da variável `age` que obtemos durante o tempo de execução (runtime). E que planejamos utilizá-la algures mais tarde.

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


```smart header="When should you choose Function Declaration versus Function Expression?"
Como uma regra do polegar, quando precisarmos de declarar uma função, o primeiro a considerar é uma sintaxe de Declaração de Função, como utilizámos acima. Ela providencia mais liberdade para organizar o código, porque podemos chamar tais funções antes de serem declaradas.


Também é um pouco mais fácil procurar por `function f(…) {…}` no código do que `let f = function(…) {…}`. Declarações de Função "sobressaem" mais à vista.

...Mas se por alguma razão uma Declaração de Função não nos for útil, (vimos um exemplo acima), então uma Expressão de Função será a escolha.
```


## Arrow functions [#arrow-functions]

Existe mais uma sintaxe muito simples e concisa para criar funções, e que frequentemente é melhor do que Expressões de Funções. É chamada de "Arrow functions", porque se assemelha a:


```js
let func = (arg1, arg2, ...argN) => expression
```

...Isto cria a função `func` com os argumentos `arg1..argN`, evalua a `expression` no lado direito utilizando os mesmos e retorna o seu resultado.

Por outras palavras, é aproximadamente o mesmo que:

```js
let func = function(arg1, arg2, ...argN) {
  return expression;
};
```

...Mas muito mais concisa.

Vejamos um exemplo:

```js run
let sum = (a, b) => a + b;

/* A função seta é uma forma mais curta de:

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3

```

Se tivermos apenas um argumento, então os parênteses podem ser omitidos, tornando-a ainda mais curta:

```js run
// o mesmo que
// let double = function(n) { return n * 2 }
*!*
let double = n => n * 2;
*/!*

alert( double(3) ); // 6
```

Se não houver argumentos, devem existir parênteses vazios (mas devem estar presentes):

```js run
let sayHi = () => alert("Olá!");

sayHi();
```

Arrow functions podem ser empregues da mesma forma que Expressões de Função.

A exemplo, aqui re-escrito está o código com `welcome()`:

```js run
let age = prompt("Que idade tem?", 18);

let welcome = (age < 18) ?
  () => alert('Olá') :
  () => alert("Saudações!");

welcome(); // bem, agora
```

Arrow functions podem parecer não familiares e não muito legíveis a princípio, mas isso rápidamente muda à medida que os olhos habituam-se à estrutura.

Elas são muito convenientes para simples ações numa única-linha, quando estamos preguiçosos demais para escrever muitas palavras.

```smart header="Multiline arrow functions"

Os exemplos acima tomaram argumentos à esqerda de `=>` e evaluaram a expressão à direita com eles.

Por vezes, precisamos de algo um pouco mais complexo, como múltiplas expressões e instruções. Também é possível, mas deveríamos envolvê-las em chavetas. Aí, usamos um `return` normal com elas.

Desta forma:

```js run
let sum = (a, b) => {  // a chaveta abre uma função multi-linha
  let result = a + b;
*!*
  return result; // ao utilizarmos chavetas, usamos `return` para obter o resultado
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="More to come"
Aqui enaltecemos Arrow functions pela brevidade. Mas não é tudo! Arrow functions têm outras particulariedades interessantes. Voltaremos a elas mais adiante no capitulo <info:arrow-functions>.

Por ora, podemos já usá-las para ações de única-linha e callbacks.
```

## Sumário

- Funções são valores. Elas podem ser atribuidas, copiadas ou declaradas em qualquer parte do código.
- Se a função for declarada como uma instrução separada no fluxo do código principal, é chamada de "Declaração de Função".
- Se a função for criada como  parte de uma expressão, é chamada de "Expressão de função".
- Declarações de Função são processadas antes de um bloco de código ser executado. Elas são visíveis em qualquer lugar dentro do bloco.
- Expressões de função são criadas quando o fluxo de execução as alcança.


Na maior parte dos casos, quando precisarmos de declarar uma função, uma Declaração de Função é preferível, porque é visível antes da própria definição. Isso dá-nos mais flexibilidade para a organização do código, e geralmente é mais legível.

Assim, deveríamos empregar uma Expressão de Função apenas quando a Declaração de Função não se adequasse à tarefa. Vimos alguns exemplos disso no capítulo, e veremos mais no futuro.

Arrow functions são apropriadas para ações única-linha. Elas vêm em dois sabores:

1. Sem chavetas: `(...args) => expression` -- o lado direito é uma expressão: a função a evalua e retorna o resultado.
2. Com chavetas: `(...args) => { body }` -- chavetas permitem-nos escrever múltiplas instruções dentro da função, mas precisamos de um explícito `return` para retornar alguma coisa.
