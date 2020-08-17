# Funções seta, o básico

Existe outra sintaxe, muito simples e concisa, para criar funções, e que frequentemente é melhor do que Expressões de Funções.

É chamada de "funções seta" (*"arrow functions"*), porque se assemelha a:

```js
let func = (arg1, arg2, ...argN) => expression
```

...Isto, cria a função `func` com os argumentos `arg1..argN`, depois avalia a `expression` no lado direito utilizando os mesmos, e retorna o seu resultado.

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

Como pode ver, `(a, b) => a + b` significa uma função que aceita dois argumentos, nomeadamente `a` e `b`. No momento da execução, esta avalia a expressão `a + b` e retorna o resultado.

- Se tivermos apenas um argumento, então os parênteses à sua volta podem ser omitidos, tornando-a ainda mais curta.

    Por examplo:

    ```js run
    *!*
    let double = n => n * 2;
    // aproximadamente o mesmo que: let double = function(n) { return n * 2 }
    */!*

    alert( double(3) ); // 6
    ```

- Se não houver argumentos, os parênteses estarão vazios (mas devem estar presentes):

    ```js run
    let sayHi = () => alert("Olá!");

    sayHi();
    ```

Funções seta podem ser empregues da mesma forma que Expressões de Função.

Por exemplo, para criar dinamicamente uma função:

```js run
let age = prompt("Que idade tem?", 18);

let welcome = (age < 18) ?
  () => alert('Olá') :
  () => alert("Saudações!");

welcome();
```

Funções seta podem parecer não familiares e não muito legíveis a princípio, mas isso rápidamente muda à medida que os olhos se habituam à estrutura.

Elas são muito convenientes para ações simples numa única-linha, quando estamos preguiçosos demais para escrever muitas palavras.

## Funções seta de múltiplas linhas

Os exemplos acima tomaram os argumentos à esqerda de `=>` e avaliaram a expressão à direita com eles.

Por vezes, precisamos de algo um pouco mais complexo, como múltiplas expressões ou instruções. Isso também é possível, mas deveríamos envolvê-las em chavetas. A seguir, usamos um `return` normal com elas.

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

Para as estudar mais detalhadamente, primeiro precisamos de saber alguns outros aspetos de JavaScript, e desta forma retornaremos a funções seta mais adiante no capitulo <info:arrow-functions>.

Por ora, podemos já usar funções seta para ações numa única-linha e *callbacks*.
```

## Resumo

Funções seta são apropriadas para ações única-linha. Elas vêm em dois sabores:

1. Sem chavetas: `(...args) => expression` -- o lado direito é uma expressão; a função a avalia e retorna o resultado.
2. Com chavetas: `(...args) => { body }` -- chavetas permitem-nos escrever múltiplas instruções dentro da função, mas precisamos de um explícito `return` para retornar alguma coisa.
