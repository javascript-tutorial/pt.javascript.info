# Arrow functions, o básico

Há outra sintaxe muito simples e abreviada para criar funções, e que frequentemente é melhor do que Expressões de Função (*Function Expressions*).

É chamada de "*arrow functions*" (funções seta), porque é parecida com:

```js
let func = (arg1, arg2, ..., argN) => expression;
```

...Isto cria a função `func` com os argumentos `arg1..argN`, a seguir avalia a `expression` no lado direito com eles, e retorna o resultado.

Por outras palavras, é a versão mais curta de:

```js
let func = function(arg1, arg2, ..., argN) {
  return expression;
};
```

Vejamos um exemplo concreto:

```js run
let sum = (a, b) => a + b;

/* Esta função seta é uma forma mais curta de:

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3
```

Como você pode ver `(a, b) => a + b` significa uma função que aceita dois argumentos, nomeadamente `a` e `b`. No momento da execução, a expressão `a + b` é avaliada e o resultado retornado.

- Se tivermos um só argumento, então os parênteses à sua volta podem ser omitidos, ficando ela ainda mais curta.

    Por exemplo:

    ```js run
    *!*
    let double = n => n * 2;
    // aproximadamente o mesmo que: let double = function(n) { return n * 2 }
    */!*

    alert( double(3) ); // 6
    ```

- Se não houver argumentos, os parênteses estarão vazios, mas devem estar presentes:

    ```js run
    let sayHi = () => alert("Olá!");

    sayHi();
    ```

*Arrow functions* podem ser utilizadas da mesma forma que *Function Expressions*.

Por exemplo, para criar dinamicamente uma função:

```js run
let age = prompt("Que idade você tem?", 18);

let welcome = (age < 18) ?
  () => alert('Olá') :
  () => alert("Saudações!");

welcome();
```

*Funções seta* podem parecer estranhas e não muito legíveis a princípio, mas isso rapidamente muda à medida que os olhos se habituam à estrutura.

Elas são muito convenientes para ações simples com uma única-linha, quando estamos algo ociosos para escrever muitas palavras.

## *Funções seta* com múltiplas linhas

As funções seta vistas até agora foram muito simples. Elas tomaram os argumentos à esquerda de `=>`, e avaliaram e retornaram o resultado da expressão à direita com eles.

Por vezes, precisamos de uma função um pouco mais complexa, com múltiplas expressões e instruções. Neste caso, nós as envolvemos entre chavetas. A maior diferença é que as chavetas precisam de um `return` dentro delas para retornar um valor (tal como uma função comum precisa).

Desta forma:

```js run
let sum = (a, b) => {  // a chaveta abre uma função multi-linha
  let result = a + b;
*!*
  return result; // se usarmos chavetas, então precisamos de um "return" explícito
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="Mais adiante"
Aqui, enaltecemos funções seta pela sua brevidade. Mas não é tudo!

Funções seta têm outras particularidades interessantes.

Para as estudar mais em detalhe, primeiro precisamos de saber outros aspetos de JavaScript, e desta forma iremos retornar a funções seta mais adiante no capitulo <info:arrow-functions>.

Por ora, já podemos usar funções seta para ações com uma única-linha e *callbacks*.
```

## Resumo

*Arrow functions* são apropriadas para ações simples, especialmente com uma única-linha. Elas vêm em dois sabores:

1. Sem chavetas: `(...args) => expression` -- o lado direito é uma expressão; a função a avalia e retorna o resultado. Parenteses podem ser omitidos, se houver só um argumento, ex `n => n*2`. 
2. Com chavetas: `(...args) => { body }` -- chavetas nos possibilitam escrever múltiplas instruções dentro da função, mas precisamos de um explícito `return` para retornar alguma coisa.
