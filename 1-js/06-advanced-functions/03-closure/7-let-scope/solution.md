O resultado é: **erro**.

Tente rodar:

```js run
let x = 1;

function func() {
*!*
  console.log(x); // ReferenceError: Cannot access 'x' before initialization
*/!*
  let x = 2;
}

func();
```

Neste exemplo podemos observar a diferença peculiar entre uma variável "inexistente" e uma "não inicializada".

Como você deve ter lido no artigo [](info:closure), uma variável começa no estado "não inicializado" a partir do momento em que a execução entra num bloco de código (ou numa função). E ela continua não inicializada até a instrução `let` correspondente.

Em outras palavras, a variável tecnicamente existe, mas não pode ser usada antes do `let`.

O código acima demonstra isso.

```js
function func() {
*!*
  // o motor sabe da variável local x desde o início da função,
  // mas ela está "não inicializada" (inutilizável) até o let ("zona morta")
  // daí o erro
*/!*

  console.log(x); // ReferenceError: Cannot access 'x' before initialization

  let x = 2;
}
```

Essa zona de inutilização temporária de uma variável (desde o início do bloco de código até o `let`) às vezes é chamada de "zona morta" (*dead zone*).
