# Especiais em JavaScript

Este capítulo brevemente revê as funcionalidades do JavaScript que aprendemos até agora, dando atenção especial a momentos subtis.

## Estrutura do código

Instruções são delimitadas por ponto-e-vírgula:

```js run no-beautify
  alert('Olá'); alert('Mundo');
```

Geralmente, uma quebra de linha também é tratada como um delimitador, então isto também iria resultar:

```js run no-beautify
  alert('Olá')
  alert('Mundo')
```

Isto chama-se de "inserção automática de ponto-e-vírgula". Por vezes, não funciona, como neste exemplo:

```js run
  alert("Haverá um erro depois desta mensagem")

  [1, 2].forEach(alert)
```

A maioria dos guias de estilo-de-código concorda que deveríamos colocar um ponto-e-vírgula no final de cada instrução.

Pontos-e-vírgula não são necessários depois de blocos de código `{...}` e construções sintáticas que os utilizem, como *loops* (laços):

```js
  function f() {
    // nenhum ponto-e-vírgula é necessário depois da declaração de função
  }

  for(;;) {
    // nenhum ponto-e-vírgula é necessário depois do loop
  }
```

...Mas mesmo que coloquemos um ponto-e-vírgula "extra" em um lugar, isso não é um erro. Ele será ignorado.

Mais em: <info:structure>.

## Modo *strict*

Para ativar completamente todas as funcionalidades do JavaScript moderno, devemos começar os programas com `"use strict"`.

```js
  'use strict';

  ...
```

A diretiva deve estar no topo de um *script* (programa) ou no início do corpo de uma função.

Sem `"use strict"`, tudo ainda funciona, mas algumas funcionalidades se comportam de maneira antiga, de uma forma "compatível". Nós geralmente iriamos preferir o comportamento moderno.

Algumas funcionalidades modernas da linguagem (como classes que iremos estudar no futuro) ativam o modo *strict* implícitamente.

Mais em: <info:strict-mode>.

## Variáveis

Podem ser declaradas usando:

- `let`
- `const` (constante, não pode ser alterada)
- `var` (estilo-antigo, veremos mais tarde)

O nome de uma varável pode incluir:
- Letras e dígitos, mas o primeiro caractere não pode ser um dígito.
- Carateres `$` e `_` são normais, *on par* às letras.
- Alfabetos não-latinos e hieróglifos também são permitidos, mas geralmente não utilizados.

Variáveis recebem os tipos dinâmicamente. Elas podem armazenar qualquer valor:

```js
  let x = 5;
  x = "John";
```

Existem 8 tipos de dados:

- `number` para números, tanto inteiros (*integer*) como em ponto-flutuante (*floating-point*),
- `bigint` para números inteiros com um comprimento arbitrário,
- `string` para cadeias-de-carateres (*strings*),
- `boolean` para valores lógicos: `true/false` (verdadeiro/falso),
- `null` -- um tipo de dados com só um valor `null`, significando "vazio" ou "não existe",
- `undefined` -- um tipo de dados com só um valor `undefined`, significando "não atribuído",
- `object` e `symbol` -- para estruturas de dados complexas e identificadores únicos, mas ainda não aprendemos ambos.

O operador `typeof` retorna o tipo de um valor, com duas exceções:
```js
  typeof null == "object" // erro na linguagem
  typeof function(){} == "function" // funções são tratadas especialmente
```

Mais em: <info:variables> e <info:types>.

## Interação

Estamos a utilizar um navegador (*browser*) como ambiente de trabalho, assim funções básicas de *UI* (Interface com o Utilizador) serão:

[`prompt(question, [default])`](mdn:api/Window/prompt)
: Faz uma `question`, e retorna o que o visitante inseriu ou `null` se a pessoa clicou em "cancel".

[`confirm(question)`](mdn:api/Window/confirm)
: Faz uma `question` e sugere que a pessoa escolha entre *Ok* e *Cancel*. A escolha é retornada como `true/false` (verdadeiro/falso).

[`alert(message)`](mdn:api/Window/alert)
: Exibe uma `message`.

Todas estas funções são *modais* (*modal*), elas fazem uma pausa no código em execução e impedem o visitante de interagir com a página até que ele responda.

Por exemplo:

```js run
  let userName = prompt("Como se chama?", "Alice");
  let isTeaWanted = confirm("Quer um pouco de chá?");

  alert( "Visitante: " + userName ); // Alice
  alert( "Quer chá: " + isTeaWanted ); // true
```

Mais em: <info:alert-prompt-confirm>.

## Operadores

O JavaScript suporta os seguintes operadores:

Aritméticos
: Regulares: `* + - /`, e também `%` para o resto de uma divisão inteira, e `**` para a potência de um número.

    O operador binário mais `+` concatena *strings*. E se um dos operandos for uma *string*, o outro também é convertido para *string*:

    ```js run
      alert( '1' + 2 ); // '12', *string*
      alert( 1 + '2' ); // '12', *string*
    ```

De atribuição
: Existe uma atribuição simples: `a = b`, e combinadas como `a *= 2`.

*Bit-a-bit*
: Operadores *bit-a-bit* (*bitwise operators*) trabalham com números inteiros de 32-bits no nível mais baixo, o do *bit*: veja em [docs](mdn:/JavaScript/Guide/Expressions_and_Operators#Bitwise) quando eles são necessários.

Condicional
: O único operador com três parâmetros: `condition ? resultA : resultB`. Se `condition` for verdadeira, retorna `resultA`, senão o `resultB`.

Lógicos
: Os lógicos *AND* (E) `&&` e OR (OU) `||` executam uma avaliação em curto-circuito (*short-circuit evaluation*) e depois retornam o valor em que pararam (não necessáriamente `true`/`false`). O lógico *NOT* (NÃO) `!` converte o operando para o tipo booleano e retorna o inverso desse booleano.

De coalescência nula (Nullish coalescing)
: O operador `??` dá uma forma de escolher um certo valor de uma lista de variáveis. O resultado de `a ?? b` é `a` se este não for `null/undefined`, mas se for então é `b`.

Comparações
: O de verificação de igualdade `==` para valores de tipos diferentes, os converte para números (exceto `null` e `undefined` que se igualam entre si, e a nada mais); assim os seguintes são similares:

    ```js run
    alert( 0 == false ); // true (verdadeiro)
    alert( 0 == '' ); // true (verdadeiro)
    ```

    Outras comparações também convertem para números.

    O operador de igualdade exata (*strict equality*) `===` não executa a conversão: para ele, tipos diferentes significam sempre valores diferentes.

    Os valores `null` e `undefined` são especiais: eles são iguais `==` entre si e a mais nenhum outro.

    Comparações maior/menor, comparam *strings* caractere-por-caractere, mas outros tipos são convertidos para números.

Outros operadores
: Existem mais uns poucos, como o operador vírgula.

Mais em: <info:operators>, <info:comparison>, <info:logical-operators>, <info:nullish-coalescing-operator>.

## Loops

- Nós vimos 3 tipos de *loops* (laços):

    ```js
      // 1
      while (condição) {
        ...
      }

      // 2
      do {
        ...
      } while (condição);

      // 3
      for(let i = 0; i < 10; i++) {
        ...
      }
    ```

- A variável declarada no ciclo (*loop*) `for(let...)` só é visível dentro do ciclo. Mas também podemos omitir `let` e re-usar uma variável já existente.
- As diretivas `break/continue` permitem sair completamente-do-laço/da-atual-iteração. Use etiquetas (*labels*) para sair (*break*) de laços aninhados (*nested loops*).

Detalhes em: <info:while-for>.

Mais adiante estudaremos outros tipos de *loops* para lidar com objetos.

## A construção "*switch*"

A construção "*switch*" permite substituir múltiplas verificações `if`. Ela emprega `===` (igualdade exata - *strict equality*) nas comparações.

Por exemplo:

```js run
  let age = prompt('Que idade tem?', 18);

  switch (age) {
    case 18:
      alert("Não irá funcionar"); // o resultado de 'prompt' é uma 'string', não um número
      break;

    case "18":
      alert("Isto funciona!");
      break;

    default:
      alert("Qualquer valor não igual aos dos 'case' acima");
  }
```

Detalhes em: <info:switch>.

## Funções

Vimos três formas para criar uma função em JavaScript:

1. Declaração de função: a função no fluxo principal do código

  ```js
    function sum(a, b) {
      let result = a + b;

      return result;
    }
  ```

2. Expressão de função: a função no contexto de uma expressão

  ```js
    let sum = function(a, b) {
      let result = a + b;

      return result;
    }
  ```

3. Funções seta (*arrow functions*):

  ```js
    // expressão no lado direito
    let sum = (a, b) => a + b;

    // ou em sintaxe multi-linha com { ... }, aqui precisa de return
    let sum = (a, b) => {
      // ...
      return a + b;
    }

    // sem argumentos
    let sayHi = () => alert("Olá");

    // com um único argumento
    let double = n => n * 2;
  ```


- Funções podem ter variáveis locais: aquelas declaradas no seu corpo ou entre a lista dos seus parâmetros. Tais variáveis só são visíveis dentro da função.
- Parâmetros podem ter valores por defeito: `function sum(a = 1, b = 2) {...}`.
- Funções sempre retornam algo. Se não houver uma instrução `return`, então o resultado é `undefined`.

Detalhes: veja <info:function-basics>, <info:arrow-functions-basics>.

## Mais adiante

Esta foi uma breve lista de funcionalidades do JavaScript. Até agora apenas estudámos o básico. Mais adiante no tutorial você irá encontrar mais funcionalidades especiais e avançadas do JavaScript.
