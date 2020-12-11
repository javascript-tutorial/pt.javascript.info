# Arrow functions, o básico

Há outra sintaxe muito simples e abreviada para criar funções, e que frequentemente é melhor do que Function Expressions (Expressões de Função).

É chamada de "*arrow functions*" (funções seta), porque é parecida com:

```js
let func = (arg1, arg2, ...argN) => expression
```

...Isto cria a função `func` com os argumentos `arg1..argN`, a seguir avalia a `expression` no lado direito com eles, e retorna o resultado.

Por outras palavras, é a versão mais curta de:

```js
let func = function(arg1, arg2, ...argN) {
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

Como pode ver `(a, b) => a + b` significa uma função que aceita dois argumentos, nomeadamente `a` e `b`. No momento da execução, a expressão `a + b` é avaliada e o resultado retornado.

- Se tivermos um só argumento, então os parênteses à sua volta podem ser omitidos, ficando ela ainda mais curta.

    Por exemplo:

    ```js run
    *!*
    let double = n => n * 2;
    // aproximadamente o mesmo que: let double = function(n) { return n * 2 }
    */!*

    alert( double(3) ); // 6
    ```

- Se não houver argumentos, os parênteses estão vazios (mas devem estar presentes):

    ```js run
    let sayHi = () => alert("Olá!");

    sayHi();
    ```

*Arrow functions* podem ser utilizadas da mesma forma que *Function Expressions*.

Por exemplo, para criar dinamicamente uma função:

```js run
let age = prompt("Que idade tem?", 18);

let welcome = (age < 18) ?
  () => alert('Olá') :
  () => alert("Saudações!");

welcome();
```

*Arrow functions* podem parecer estranhas e não muito legíveis a princípio, mas isso rápidamente muda à medida que os olhos se habituam à estrutura.

Elas são muito convenientes para ações simples com uma única-linha, quando estamos algo ociosos para escrever muitas palavras.

## *Arrow functions* com múltiplas linhas

Os exemplos acima tomaram os argumentos à esquerda de `=>` e avaliaram a expressão à direita com eles.

Por vezes, precisamos de algo um pouco mais complexo, como múltiplas expressões ou instruções. Isso também é possível, mas temos de as envolver em chavetas. Depois, usamos um `return` normal com elas.

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
Aqui, enaltecemos arrow functions pela sua brevidade. Mas não é tudo!

Arrow functions têm outras particularidades interessantes.

Para as estudar mais em detalhe, primeiro precisamos de saber alguns outros aspetos de JavaScript, e desta forma iremos retornar a funções seta mais adiante no capitulo <info:arrow-functions>.

Por ora, já podemos usar arrow functions para ações com uma única-linha e *callbacks*.
```

## Resumo

*Arrow functions* são apropriadas para ações com uma única-linha. Elas vêm em dois sabores:

1. Sem chavetas: `(...args) => expression` -- o lado direito é uma expressão; a função a avalia e retorna o resultado.
2. Com chavetas: `(...args) => { body }` -- chavetas nos possibilitam escrever múltiplas instruções dentro da função, mas precisamos de um explícito `return` para retornar alguma coisa.
