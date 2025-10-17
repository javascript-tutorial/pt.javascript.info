# Especiais do JavaScript

Este capítulo recapitula brevemente os recursos do JavaScript que aprendemos até agora, prestando atenção especial a momentos sutis.

## Estrutura do código

As instruções são delimitadas com um ponto e vírgula:

```js run no-beautify
alert('Olá'); alert('Mundo');
```

Normalmente, uma quebra de linha também é tratada como um delimitador, então isso também funcionaria:

```js run no-beautify
alert('Olá')
alert('Mundo')
```

Isso é chamado de "inserção automática de ponto e vírgula". Às vezes não funciona, por exemplo:

```js run
alert("Haverá um erro após esta mensagem")

[1, 2].forEach(alert)
```

A maioria dos guias de estilo de código concorda que devemos colocar um ponto e vírgula após cada instrução.

Ponto e vírgula não são necessários após blocos de código `{...}` e construções de sintaxe com eles, como laços:

```js
function f() {
  // não é necessário ponto e vírgula após a declaração da função
}

for(;;) {
  // não é necessário ponto e vírgula após o laço
}
```

...Mas mesmo que possamos colocar um ponto e vírgula "extra" em algum lugar, isso não é um erro. Será ignorado.

Mais em: <info:structure>.

## Modo estrito

Para habilitar totalmente todos os recursos do JavaScript moderno, devemos iniciar os scripts com `"use strict"`.

```js
'use strict';

...
```

A diretiva deve estar no topo de um script ou no início do corpo de uma função.

Sem `"use strict"`, tudo ainda funciona, mas alguns recursos se comportam da maneira antiga, "compatível". Geralmente, preferimos o comportamento moderno.

Alguns recursos modernos da linguagem (como classes que estudaremos no futuro) ativam o modo estrito implicitamente.

Mais em: <info:strict-mode>.

## Variáveis

Podem ser declaradas usando:

- `let`
- `const` (constante, não pode ser alterada)
- `var` (estilo antigo, veremos mais tarde)

Um nome de variável pode incluir:
- Letras e dígitos, mas o primeiro caractere não pode ser um dígito.
- Os caracteres `$` e `_` são normais, assim como as letras.
- Alfabetos não latinos e hieróglifos também são permitidos, mas comumente não são usados.

As variáveis são de tipo dinâmico. Elas podem armazenar qualquer valor:

```js
let x = 5;
x = "João";
```

Existem 8 tipos de dados:

- `number` para números de ponto flutuante e inteiros,
- `bigint` para números inteiros de comprimento arbitrário,
- `string` para strings,
- `boolean` para valores lógicos: `true/false`,
- `null` -- um tipo com um único valor `null`, significando "vazio" ou "não existe",
- `undefined` -- um tipo com um único valor `undefined`, significando "não atribuído",
- `object` e `symbol` -- para estruturas de dados complexas e identificadores únicos, ainda não os aprendemos.

O operador `typeof` retorna o tipo de um valor, com duas exceções:
```js
typeof null == "object" // erro na linguagem
typeof function(){} == "function" // as funções são tratadas de forma especial
```

Mais em: <info:variables> e <info:types>.

## Interação

Estamos usando um navegador como ambiente de trabalho, então as funções básicas da interface do usuário serão:

[`prompt(pergunta, [padrão])`](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/prompt)
: Faz uma `pergunta` e retorna o que o visitante inseriu ou `null` se ele clicou em "cancelar".

[`confirm(pergunta)`](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/confirm)
: Faz uma `pergunta` e sugere a escolha entre Ok e Cancelar. A escolha é retornada como `true/false`.

[`alert(mensagem)`](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/alert)
: Exibe uma `mensagem`.

Todas essas funções são *modais*, elas pausam a execução do código e impedem que o visitante interaja com a página até que responda.

Por exemplo:

```js run
let nomeDeUsuario = prompt("Qual é o seu nome?", "Alice");
let querCha = confirm("Você quer um pouco de chá?");

alert( "Visitante: " + nomeDeUsuario ); // Alice
alert( "Chá desejado: " + querCha ); // true
```

Mais em: <info:alert-prompt-confirm>.

## Operadores

O JavaScript suporta os seguintes operadores:

Aritméticos
: Regulares: `* + - /`, também `%` para o resto e `**` para a potência de um número.

    O `+` binário concatena strings. E se um dos operandos for uma string, o outro também será convertido em string:

    ```js run
    alert( '1' + 2 ); // '12', string
    alert( 1 + '2' ); // '12', string
    ```

Atribuições
: Existe uma atribuição simples: `a = b` e as combinadas como `a *= 2`.

Bitwise
: Os operadores bitwise trabalham com inteiros de 32 bits no nível mais baixo, o nível de bit: veja a [documentação](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Expressions_and_operators#operadores_bit_a_bit) quando forem necessários.

Condicional
: O único operador com três parâmetros: `cond ? resultadoA : resultadoB`. Se `cond` for verdadeiro, retorna `resultadoA`, caso contrário, `resultadoB`.

Operadores lógicos
: O E lógico `&&` e o OU lógico `||` realizam avaliação de curto-circuito e, em seguida, retornam o valor onde pararam (não necessariamente `true`/`false`). O NÃO lógico `!` converte o operando para o tipo booleano e retorna o valor inverso.

Operador de coalescência nula
: O operador `??` fornece uma maneira de escolher um valor definido de uma lista de variáveis. O resultado de `a ?? b` é `a`, a menos que seja `null/undefined`, então é `b`.

Comparações
: A verificação de igualdade `==` para valores de tipos diferentes, os converte em um número (exceto `null` e `undefined`, que são iguais entre si e a mais nada). Então estas são equivalentes:

    ```js run
    alert( 0 == false ); // true
    alert( 0 == '' ); // true
    ```

    Outras comparações também convertem para um número.

    O operador de igualdade estrita `===` não faz a conversão: tipos diferentes sempre significam valores diferentes para ele.

    Os valores `null` e `undefined` são especiais: eles são iguais `==` um ao outro e não são iguais a mais nada.

    As comparações de maior/menor comparam strings caractere por caractere, outros tipos são convertidos em um número.

Outros operadores
: Existem alguns outros, como o operador vírgula.

Mais em: <info:operators>, <info:comparison>, <info:logical-operators>, <info:nullish-coalescing-operator>.

## Laços

- Cobrimos 3 tipos de laços:

    ```js
    // 1
    while (condicao) {
      ...
    }

    // 2
    do {
      ...
    } while (condicao);

    // 3
    for(let i = 0; i < 10; i++) {
      ...
    }
    ```

- A variável declarada no laço `for(let...)` é visível apenas dentro do laço. Mas também podemos omitir `let` e reutilizar uma variável existente.
- As diretivas `break/continue` permitem sair do laço inteiro/iteração atual. Use rótulos para quebrar laços aninhados.

Detalhes em: <info:while-for>.

Mais tarde, estudaremos mais tipos de laços para lidar com objetos.

## A construção "switch"

A construção "switch" pode substituir várias verificações `if`. Ela usa `===` (igualdade estrita) para comparações.

Por exemplo:

```js run
let idade = prompt('Qual é a sua idade?', 18);

switch (idade) {
  case 18:
    alert("Não vai funcionar"); // o resultado do prompt é uma string, não um número
    break;

  case "18":
    alert("Isso funciona!");
    break;

  default:
    alert("Qualquer valor não igual a um dos anteriores");
}
```

Detalhes em: <info:switch>.

## Funções

Cobrimos três maneiras de criar uma função em JavaScript:

1. Declaração de Função: a função no fluxo principal do código

    ```js
    function soma(a, b) {
      let resultado = a + b;

      return resultado;
    }
    ```

2. Expressão de Função: a função no contexto de uma expressão

    ```js
    let soma = function(a, b) {
      let resultado = a + b;

      return resultado;
    };
    ```

3. Funções de Seta:

    ```js
    // expressão do lado direito
    let soma = (a, b) => a + b;

    // ou sintaxe de várias linhas com { ... }, precisa de return aqui:
    let soma = (a, b) => {
      // ...
      return a + b;
    }

    // sem argumentos
    let digaOi = () => alert("Olá");

    // com um único argumento
    let dobro = n => n * 2;
    ```


- As funções podem ter variáveis locais: aquelas declaradas dentro de seu corpo ou em sua lista de parâmetros. Tais variáveis são visíveis apenas dentro da função.
- Os parâmetros podem ter valores padrão: `function soma(a = 1, b = 2) {...}`.
- As funções sempre retornam algo. Se não houver uma instrução `return`, o valor retornado será `undefined`.

Detalhes: veja <info:function-basics>, <info:arrow-functions-basics>.

## Mais por vir

Essa foi uma breve lista de recursos do JavaScript. Até agora, estudamos apenas o básico. Mais adiante no tutorial, você encontrará mais especiais e recursos avançados do JavaScript.