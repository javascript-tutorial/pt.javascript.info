# Async/await

Existe uma sintaxe especial para trabalhar com promessas de uma forma mais confortável, chamada "async/await". É surpreendentemente fácil de entender e usar.

## Funções async

Vamos começar com a palavra-chave `async`. Ela pode ser colocada antes de uma função, assim:

```js
async function f() {
  return 1;
}
```

A palavra "async" antes de uma função significa uma coisa simples: a função sempre retorna uma promessa. Outros valores são automaticamente envolvidos em uma promessa resolvida.

Por exemplo, esta função retorna uma promessa resolvida com o resultado `1`; vamos testar:

```js run
async function f() {
  return 1;
}

f().then(alert); // 1
```

...Poderíamos retornar explicitamente uma promessa, o que daria no mesmo:

```js run
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

Então, o `async` garante que a função retorne uma promessa, e envolve valores que não são promessas nela. Simples o suficiente, certo? Mas não é só isso. Existe outra palavra-chave, `await`, que funciona apenas dentro de funções `async`, e é bem interessante.

## Await

A sintaxe:

```js
// funciona apenas dentro de funções async
let value = await promise;
```

A palavra-chave `await` faz o JavaScript esperar até que a promessa seja estabelecida e retorna o resultado dela.

Aqui está um exemplo com uma promessa que é resolvida em 1 segundo:
```js run
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

*!*
  let result = await promise; // espera até que a promessa seja resolvida (*)
*/!*

  alert(result); // "done!"
}

f();
```

A execução da função "pausa" na linha `(*)` e retoma quando a promessa é estabelecida, com `result` se tornando o resultado dela. Então o código acima mostra "done!" em um segundo.

Vamos reforçar: o `await` literalmente suspende a execução da função até que a promessa seja estabelecida, e então a retoma com o resultado da promessa. Isso não custa nenhum recurso de CPU, porque o motor do JavaScript pode fazer outros trabalhos nesse meio tempo: executar outros scripts, tratar eventos, etc.

É só uma sintaxe mais elegante de obter o resultado da promessa do que o `promise.then`. E é mais fácil de ler e escrever.

````warn header="Não dá para usar `await` em funções comuns"
Se tentarmos usar `await` em uma função que não seja `async`, teremos um erro de sintaxe:

```js run
function f() {
  let promise = Promise.resolve(1);
*!*
  let result = await promise; // Erro de sintaxe
*/!*
}
```

Podemos ter esse erro se esquecermos de colocar `async` antes de uma função. Como dito antes, o `await` só funciona dentro de uma função `async`.
````

Vamos pegar o exemplo do `showAvatar()` do capítulo <info:promise-chaining> e reescrevê-lo usando `async/await`:

1. Vamos precisar substituir as chamadas `.then` por `await`.
2. Também precisamos tornar a função `async` para que funcionem.

```js run
async function showAvatar() {

  // lê nosso JSON
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // lê o usuário do github
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // mostra o avatar
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // espera 3 segundos
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

Bem limpo e fácil de ler, não é? Bem melhor do que antes.

````smart header="Navegadores modernos permitem `await` de nível superior em módulos"
Em navegadores modernos, o `await` em nível superior funciona perfeitamente bem, quando estamos dentro de um módulo. Vamos abordar módulos no artigo <info:modules-intro>.

Por exemplo:

```js run module
// supomos que esse código roda em nível superior, dentro de um módulo
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();

console.log(user);
```

Se não estivermos usando módulos, ou se [navegadores mais antigos](https://caniuse.com/mdn-javascript_operators_await_top_level) precisarem ser suportados, existe uma receita universal: envolver tudo em uma função async anônima.

Assim:

```js
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

````

````smart header="`await` aceita \"thenables\""
Assim como o `promise.then`, o `await` nos permite usar objetos thenable (aqueles com um método `then` chamável). A ideia é que um objeto de terceiros pode não ser uma promessa, mas ser compatível com promessas: se ele suporta `.then`, isso já é suficiente para usá-lo com `await`.

Aqui está uma classe `Thenable` de demonstração; o `await` abaixo aceita instâncias dela:

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // resolve com this.num*2 depois de 1000ms
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f() {
  // espera 1 segundo, então o resultado se torna 2
  let result = await new Thenable(1);
  alert(result);
}

f();
```

Se o `await` recebe um objeto que não é uma promessa, mas tem `.then`, ele chama esse método fornecendo as funções nativas `resolve` e `reject` como argumentos (assim como faz para um executor de `Promise` normal). Então o `await` espera até que uma delas seja chamada (no exemplo acima isso acontece na linha `(*)`) e então prossegue com o resultado.
````

````smart header="Métodos async de classe"
Para declarar um método async de classe, basta colocar `async` antes dele:

```js run
class Waiter {
*!*
  async wait() {
*/!*
    return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
  .then(alert); // 1 (isso é o mesmo que (result => alert(result)))
```
O significado é o mesmo: garante que o valor retornado seja uma promessa e habilita o `await`.

````
## Tratamento de erros

Se uma promessa é resolvida normalmente, então `await promise` retorna o resultado. Mas, no caso de uma rejeição, ele lança o erro, exatamente como se houvesse um comando `throw` naquela linha.

Este código:

```js
async function f() {
*!*
  await Promise.reject(new Error("Whoops!"));
*/!*
}
```

...é o mesmo que isso:

```js
async function f() {
*!*
  throw new Error("Whoops!");
*/!*
}
```

Em situações reais, a promessa pode levar algum tempo antes de ser rejeitada. Nesse caso, vai haver um atraso antes do `await` lançar um erro.

Podemos capturar esse erro usando `try..catch`, da mesma forma que um `throw` normal:

```js run
async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
*!*
    alert(err); // TypeError: failed to fetch
*/!*
  }
}

f();
```

No caso de um erro, o controle salta para o bloco `catch`. Também podemos envolver várias linhas:

```js run
async function f() {

  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    // captura erros tanto no fetch quanto no response.json
    alert(err);
  }
}

f();
```

Se não tivermos `try..catch`, então a promessa gerada pela chamada da função async `f()` se torna rejeitada. Podemos adicionar `.catch` para tratá-la:

```js run
async function f() {
  let response = await fetch('http://no-such-url');
}

// f() se torna uma promessa rejeitada
*!*
f().catch(alert); // TypeError: failed to fetch // (*)
*/!*
```

Se esquecermos de adicionar o `.catch` ali, então temos um erro de promessa não tratado (visível no console). Podemos capturar esses erros usando um tratador global do evento `unhandledrejection`, como descrito no capítulo <info:promise-error-handling>.


```smart header="`async/await` e `promise.then/catch`"
Quando usamos `async/await`, raramente precisamos do `.then`, porque o `await` cuida da espera para nós. E podemos usar um `try..catch` normal em vez de `.catch`. Isso geralmente é (mas nem sempre) mais conveniente.

Mas no nível superior do código, quando estamos fora de qualquer função `async`, não conseguimos usar `await` sintaticamente, então é uma prática normal adicionar `.then/catch` para tratar o resultado final ou algum erro que não foi tratado, como na linha `(*)` do exemplo acima.
```

````smart header="`async/await` funciona bem com `Promise.all`"
Quando precisamos esperar por várias promessas, podemos envolvê-las em `Promise.all` e então usar `await`:

```js
// espera pelo array de resultados
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

No caso de um erro, ele se propaga normalmente, da promessa que falhou para o `Promise.all`, e então se torna uma exceção que podemos capturar usando `try..catch` ao redor da chamada.

````

## Resumo

A palavra-chave `async` antes de uma função tem dois efeitos:

1. Faz com que ela sempre retorne uma promessa.
2. Permite que o `await` seja usado dentro dela.

A palavra-chave `await` antes de uma promessa faz o JavaScript esperar até que a promessa seja estabelecida, e então:

1. Se for um erro, uma exceção é gerada — o mesmo que se `throw error` fosse chamado naquele exato lugar.
2. Caso contrário, retorna o resultado.

Juntas, elas fornecem uma ótima estrutura para escrever código assíncrono que é fácil tanto de ler quanto de escrever.

Com `async/await`, raramente precisamos escrever `promise.then/catch`, mas ainda assim não devemos esquecer que eles são baseados em promessas, porque às vezes (por exemplo, no escopo mais externo) precisamos usar esses métodos. Além disso, o `Promise.all` é ótimo quando estamos esperando por várias tarefas simultaneamente.
