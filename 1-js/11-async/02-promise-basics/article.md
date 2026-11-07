# Promise

Imagine que você é um cantor famoso, e seus fãs ficam pedindo dia e noite pela sua próxima música.

Pra conseguir um alívio, você promete enviá-la a eles assim que for lançada. Você dá aos seus fãs uma lista. Eles podem preencher seus endereços de e-mail, de forma que, quando a música ficar disponível, todos os inscritos a recebam instantaneamente. E mesmo que algo dê muito errado, digamos, um incêndio no estúdio, impedindo que você publique a música, eles ainda assim serão avisados.

Todo mundo fica feliz: você, porque as pessoas não ficam mais te cercando, e os fãs, porque não vão perder a música.

Essa é uma analogia da vida real para algo que acontece com frequência na programação:

1. Um "código produtor" que faz alguma coisa e leva um tempo pra isso. Por exemplo, algum código que carrega dados pela rede. Esse é o "cantor".
2. Um "código consumidor" que quer o resultado do "código produtor" assim que ele estiver pronto. Várias funções podem precisar desse resultado. Esses são os "fãs".
3. Uma *promessa* é um objeto especial do JavaScript que liga o "código produtor" e o "código consumidor". Em termos da nossa analogia: essa é a "lista de inscrição". O "código produtor" leva o tempo que precisar para produzir o resultado prometido, e a "promessa" disponibiliza esse resultado para todo o código inscrito assim que ele estiver pronto.

A analogia não é totalmente precisa, porque as promessas do JavaScript são mais complexas do que uma simples lista de inscrição: elas têm recursos e limitações adicionais. Mas está de bom tamanho pra começar.

A sintaxe do construtor da promessa é:

```js
let promise = new Promise(function(resolve, reject) {
  // executor (o código produtor, o "cantor")
});
```

A função passada para `new Promise` é chamada de *executor*. Quando um `new Promise` é criado, o executor roda automaticamente. Ele contém o código produtor, que eventualmente deve produzir o resultado. Em termos da analogia acima: o executor é o "cantor".

Seus argumentos `resolve` e `reject` são callbacks fornecidos pelo próprio JavaScript. Nosso código fica apenas dentro do executor.

Quando o executor obtém o resultado, seja logo ou mais tarde, não importa, ele deve chamar um desses callbacks:

- `resolve(value)` — se o trabalho foi concluído com sucesso, com o resultado `value`.
- `reject(error)` — se ocorreu um erro, `error` é o objeto do erro.

Resumindo: o executor roda automaticamente e tenta realizar um trabalho. Quando termina a tentativa, ele chama `resolve` se teve sucesso, ou `reject` se houve um erro.

O objeto `promise` retornado pelo construtor `new Promise` tem estas propriedades internas:

- `state` — inicialmente `"pending"`, depois muda para `"fulfilled"` quando `resolve` é chamado, ou para `"rejected"` quando `reject` é chamado.
- `result` — inicialmente `undefined`, depois muda para `value` quando `resolve(value)` é chamado, ou para `error` quando `reject(error)` é chamado.

Então o executor acaba movendo a `promise` para um desses estados:

![](promise-resolve-reject.svg)

Mais adiante vamos ver como os "fãs" podem se inscrever para essas mudanças.

Aqui está um exemplo de um construtor de promessa e uma função executora simples, com um "código produtor" que leva um tempo (via `setTimeout`):

```js
let promise = new Promise(function(resolve, reject) {
  // a função é executada automaticamente quando a promessa é construída

  // depois de 1 segundo, sinaliza que o trabalho terminou com o resultado "done"
  setTimeout(() => *!*resolve("done")*/!*, 1000);
});
```

Podemos perceber duas coisas rodando o código acima:

1. O executor é chamado automaticamente e imediatamente (pelo `new Promise`).
2. O executor recebe dois argumentos: `resolve` e `reject`. Essas funções já vêm pré-definidas pelo motor do JavaScript, então não precisamos criá-las. Só precisamos chamar uma delas quando estiver pronto.

    Depois de um segundo de "processamento", o executor chama `resolve("done")` para produzir o resultado. Isso muda o estado do objeto `promise`:

    ![](promise-resolve-1.svg)

Esse foi um exemplo de uma conclusão de trabalho bem-sucedida, uma "promessa resolvida" (fulfilled).

E agora um exemplo do executor rejeitando a promessa com um erro:

```js
let promise = new Promise(function(resolve, reject) {
  // depois de 1 segundo, sinaliza que o trabalho terminou com um erro
  setTimeout(() => *!*reject(new Error("Whoops!"))*/!*, 1000);
});
```

A chamada a `reject(...)` move o objeto promessa para o estado `"rejected"`:

![](promise-reject-1.svg)

Resumindo, o executor deve realizar um trabalho (geralmente algo que leva tempo) e então chamar `resolve` ou `reject` para mudar o estado da promessa correspondente.

Uma promessa que foi resolvida ou rejeitada é chamada de "estabelecida" (settled), em contraste com uma promessa inicialmente "pendente" (pending).

````smart header="Só pode haver um único resultado ou um único erro"
O executor deve chamar apenas um `resolve` ou um `reject`. Qualquer mudança de estado é final.

Todas as chamadas seguintes de `resolve` e `reject` são ignoradas:

```js
let promise = new Promise(function(resolve, reject) {
*!*
  resolve("done");
*/!*

  reject(new Error("…")); // ignorado
  setTimeout(() => resolve("…")); // ignorado
});
```

A ideia é que um trabalho feito pelo executor só pode ter um resultado ou um erro.

Além disso, `resolve`/`reject` esperam apenas um argumento (ou nenhum), e vão ignorar argumentos adicionais.
````

```smart header="Rejeite com objetos `Error`"
Caso algo dê errado, o executor deve chamar `reject`. Isso pode ser feito com qualquer tipo de argumento (assim como o `resolve`). Mas é recomendado usar objetos `Error` (ou objetos que herdam de `Error`). O motivo pra isso logo vai ficar claro.
```

````smart header="Chamando `resolve`/`reject` imediatamente"
Na prática, um executor geralmente faz algo de forma assíncrona e chama `resolve`/`reject` depois de um tempo, mas isso não é obrigatório. Também podemos chamar `resolve` ou `reject` imediatamente, assim:

```js
let promise = new Promise(function(resolve, reject) {
  // sem gastar tempo pra fazer o trabalho
  resolve(123); // dá o resultado imediatamente: 123
});
```

Por exemplo, isso pode acontecer quando começamos a fazer um trabalho, mas então percebemos que tudo já foi concluído e está em cache.

Tudo bem. Temos imediatamente uma promessa resolvida.
````

```smart header="`state` e `result` são internos"
As propriedades `state` e `result` do objeto Promise são internas. Não podemos acessá-las diretamente. Podemos usar os métodos `.then`/`.catch`/`.finally` para isso. Eles são descritos abaixo.
```

## Consumidores: then, catch

Um objeto Promise serve como uma ligação entre o executor (o "código produtor" ou "cantor") e as funções consumidoras (os "fãs"), que vão receber o resultado ou o erro. Funções consumidoras podem ser registradas (inscritas) usando os métodos `.then` e `.catch`.

### then

O mais importante, o fundamental, é o `.then`.

A sintaxe é:

```js
promise.then(
  function(result) { *!*/* lida com um resultado bem-sucedido */*/!* },
  function(error) { *!*/* lida com um erro */*/!* }
);
```

O primeiro argumento de `.then` é uma função que roda quando a promessa é resolvida, e recebe o resultado.

O segundo argumento de `.then` é uma função que roda quando a promessa é rejeitada, e recebe o erro.

Por exemplo, aqui está uma reação a uma promessa resolvida com sucesso:

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// resolve roda a primeira função dentro de .then
promise.then(
*!*
  result => alert(result), // mostra "done!" depois de 1 segundo
*/!*
  error => alert(error) // não roda
);
```

A primeira função foi executada.

E no caso de uma rejeição, a segunda:

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject roda a segunda função dentro de .then
promise.then(
  result => alert(result), // não roda
*!*
  error => alert(error) // mostra "Error: Whoops!" depois de 1 segundo
*/!*
);
```

Se estamos interessados apenas nas conclusões bem-sucedidas, podemos fornecer apenas um argumento de função ao `.then`:

```js run
let promise = new Promise(resolve => {
  setTimeout(() => resolve("done!"), 1000);
});

*!*
promise.then(alert); // mostra "done!" depois de 1 segundo
*/!*
```

### catch

Se estamos interessados apenas nos erros, podemos usar `null` como primeiro argumento: `.then(null, errorHandlingFunction)`. Ou podemos usar `.catch(errorHandlingFunction)`, que é exatamente a mesma coisa:


```js run
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

*!*
// .catch(f) é o mesmo que promise.then(null, f)
promise.catch(alert); // mostra "Error: Whoops!" depois de 1 segundo
*/!*
```

A chamada `.catch(f)` é um análogo completo de `.then(null, f)`, é só uma forma mais curta de escrever.

## Limpeza: finally

Assim como existe uma cláusula `finally` em um `try {...} catch {...}` comum, existe `finally` em promises também.

A chamada `.finally(f)` é parecida com `.then(f, f)`, no sentido de que `f` sempre roda quando a promessa é estabelecida (settled): seja em `resolve` ou `reject`.

A ideia do `finally` é configurar um tratador para fazer a limpeza/finalização depois que as operações anteriores forem concluídas.

Por exemplo, parar indicadores de carregamento, fechar conexões que não são mais necessárias, etc.

Pense nisso como quem organiza o fim de uma festa. Independente de a festa ter sido boa ou ruim, de quantos amigos estiveram nela, ainda assim precisamos (ou pelo menos deveríamos) fazer uma faxina depois.

O código pode ficar assim:

```js
new Promise((resolve, reject) => {
  /* faz algo que leva tempo, e então chama resolve ou talvez reject */
})
*!*
  // roda quando a promessa é estabelecida, não importa se com sucesso ou não
  .finally(() => para o indicador de carregamento)
  // assim o indicador de carregamento sempre é parado antes de continuarmos
*/!*
  .then(result => mostra o resultado, err => mostra o erro)
```

Repare que `finally(f)` não é exatamente um apelido de `then(f,f)`, porém.

Existem diferenças importantes:

1. Um tratador de `finally` não tem argumentos. No `finally`, não sabemos se a promessa teve sucesso ou não. Tudo bem, porque nossa tarefa geralmente é realizar procedimentos de finalização "gerais".

    Dê uma olhada no exemplo acima: como você pode ver, o tratador de `finally` não tem argumentos, e o resultado da promessa é tratado pelo próximo tratador.
2. Um tratador de `finally` "repassa" o resultado ou o erro para o próximo tratador adequado.

    Por exemplo, aqui o resultado é repassado através do `finally` para o `then`:

    ```js run
    new Promise((resolve, reject) => {
      setTimeout(() => resolve("value"), 2000);
    })
      .finally(() => alert("Promise ready")) // dispara primeiro
      .then(result => alert(result)); // <-- .then mostra "value"
    ```

    Como você pode ver, o `value` retornado pela primeira promessa é repassado através do `finally` até o próximo `then`.

    Isso é bem conveniente, porque o `finally` não é feito pra processar o resultado de uma promessa. Como dito, ele é um lugar pra fazer uma limpeza genérica, não importa qual foi o resultado.

    E aqui está um exemplo de um erro, pra vermos como ele é repassado através do `finally` até o `catch`:

    ```js run
    new Promise((resolve, reject) => {
      throw new Error("error");
    })
      .finally(() => alert("Promise ready")) // dispara primeiro
      .catch(err => alert(err));  // <-- .catch mostra o erro
    ```

3. Um tratador de `finally` também não deveria retornar nada. Se retornar, o valor retornado é silenciosamente ignorado.

    A única exceção a essa regra é quando um tratador de `finally` lança um erro. Nesse caso, o erro vai para o próximo tratador, no lugar de qualquer resultado anterior.

Resumindo:

- Um tratador de `finally` não recebe o resultado do tratador anterior (ele não tem argumentos). Esse resultado é repassado adiante, para o próximo tratador adequado.
- Se um tratador de `finally` retornar alguma coisa, ela é ignorada.
- Quando `finally` lança um erro, a execução vai para o tratador de erro mais próximo.

Esses recursos são úteis e fazem as coisas funcionarem do jeito certo, se usarmos o `finally` da forma como ele deve ser usado: para procedimentos genéricos de limpeza.

````smart header="Podemos anexar tratadores a promessas já estabelecidas"
Se uma promessa está pendente, os tratadores `.then/catch/finally` esperam pelo resultado dela.

Às vezes, pode ser que uma promessa já esteja estabelecida (settled) quando adicionamos um tratador a ela.

Nesse caso, esses tratadores simplesmente rodam imediatamente:

```js run
// a promessa se torna resolvida imediatamente após ser criada
let promise = new Promise(resolve => resolve("done!"));

promise.then(alert); // done! (aparece agora mesmo)
```

Repare que isso torna as promessas mais poderosas do que o cenário real da "lista de inscrição". Se o cantor já lançou a música e, depois, uma pessoa se inscreve na lista, provavelmente ela não vai receber aquela música. Inscrições na vida real precisam ser feitas antes do evento.

Promessas são mais flexíveis. Podemos adicionar tratadores a qualquer momento: se o resultado já estiver lá, eles simplesmente executam.
````

## Exemplo: loadScript [#loadscript]

A seguir, vamos ver exemplos mais práticos de como as promises podem nos ajudar a escrever código assíncrono.

Temos a função `loadScript` para carregar um script, vista no capítulo anterior.

Aqui está a versão baseada em callback, só pra lembrarmos dela:

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}
```

Vamos reescrevê-la usando Promises.

A nova função `loadScript` não vai precisar de um callback. Em vez disso, ela vai criar e retornar um objeto Promise, que é resolvido quando o carregamento é concluído. O código externo pode adicionar tratadores (funções inscritas) a ela usando `.then`:

```js run
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));

    document.head.append(script);
  });
}
```

Uso:

```js run
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
  script => alert(`${script.src} is loaded!`),
  error => alert(`Error: ${error.message}`)
);

promise.then(script => alert('Outro tratador...'));
```

Já conseguimos ver algumas vantagens em comparação com o padrão baseado em callback:


| Promises | Callbacks |
|----------|-----------|
| Promessas nos permitem fazer as coisas na ordem natural. Rodamos `loadScript(script)`, e depois (`.then`) escrevemos o que fazer com o resultado. | Precisamos ter uma função `callback` disponível ao chamar `loadScript(script, callback)`. Em outras palavras, precisamos saber o que fazer com o resultado *antes* de `loadScript` ser chamado. |
| Podemos chamar `.then` em uma promessa quantas vezes quisermos. A cada vez, estamos adicionando um novo "fã", uma nova função inscrita, à "lista de inscrição". Mais sobre isso no próximo capítulo: [](info:promise-chaining). | Só pode haver um único callback. |

Então as promessas nos dão um melhor fluxo de código e mais flexibilidade. Mas tem mais. Vamos ver isso nos próximos capítulos.
