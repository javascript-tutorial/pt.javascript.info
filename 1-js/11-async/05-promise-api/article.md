# API do Promise

Existem 6 métodos estáticos na classe `Promise`. Vamos cobrir rapidamente os seus casos de uso aqui.

## Promise.all

Digamos que queremos que várias promessas sejam executadas em paralelo e esperar até que todas estejam prontas.

Por exemplo, baixar várias URLs em paralelo e processar o conteúdo assim que todas terminarem.

É para isso que serve o `Promise.all`.

A sintaxe é:

```js
let promise = Promise.all(iterable);
```

O `Promise.all` recebe um iterável (geralmente, um array de promessas) e retorna uma nova promessa.

A nova promessa é resolvida quando todas as promessas listadas são resolvidas, e o array dos resultados delas se torna o resultado dela.

Por exemplo, o `Promise.all` abaixo é estabelecido depois de 3 segundos, e então seu resultado é um array `[1, 2, 3]`:

```js run
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 quando as promessas estiverem prontas: cada promessa contribui com um membro do array
```

Repare que a ordem dos membros do array resultante é a mesma das promessas de origem. Mesmo que a primeira promessa leve o maior tempo para ser resolvida, ela continua sendo a primeira no array de resultados.

Um truque comum é mapear um array de dados de trabalho em um array de promessas, e então envolver isso em um `Promise.all`.

Por exemplo, se temos um array de URLs, podemos buscar todas assim:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// mapeia cada url para a promessa do fetch
let requests = urls.map(url => fetch(url));

// Promise.all espera até que todas os trabalhos sejam resolvidos
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

Um exemplo maior, buscando informações de usuário para um array de usuários do GitHub pelos nomes deles (poderíamos buscar um array de produtos pelos ids deles, a lógica é idêntica):

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // todas as respostas foram resolvidas com sucesso
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // mostra 200 para cada url
    }

    return responses;
  })
  // mapeia o array de respostas em um array de response.json() para ler o conteúdo delas
  .then(responses => Promise.all(responses.map(r => r.json())))
  // todas as respostas JSON foram analisadas: "users" é o array delas
  .then(users => users.forEach(user => alert(user.name)));
```

**Se qualquer uma das promessas for rejeitada, a promessa retornada por `Promise.all` é imediatamente rejeitada com esse erro.**

Por exemplo:

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
*!*
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
*/!*
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Whoops!
```

Aqui a segunda promessa é rejeitada em dois segundos. Isso leva a uma rejeição imediata do `Promise.all`, então o `.catch` é executado: o erro da rejeição se torna o resultado de todo o `Promise.all`.

```warn header="Em caso de erro, as outras promessas são ignoradas"
Se uma promessa é rejeitada, o `Promise.all` é imediatamente rejeitado, esquecendo completamente das outras da lista. Os resultados delas são ignorados.

Por exemplo, se houver múltiplas chamadas `fetch`, como no exemplo acima, e uma delas falhar, as outras ainda vão continuar a ser executadas, mas o `Promise.all` não vai mais observá-las. Elas provavelmente serão estabelecidas, mas os resultados delas serão ignorados.

O `Promise.all` não faz nada para cancelá-las, já que não existe o conceito de "cancelamento" em promessas. Em [outro capítulo](info:fetch-abort) vamos cobrir o `AbortController`, que pode ajudar com isso, mas ele não é parte da API do Promise.
```

````smart header="`Promise.all(iterable)` permite valores "normais" (não promessas) no `iterable`"
Normalmente, o `Promise.all(...)` aceita um iterável (na maioria dos casos, um array) de promessas. Mas se qualquer um desses objetos não for uma promessa, ele é passado "como está" para o array resultante.

Por exemplo, aqui os resultados são `[1, 2, 3]`:

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2,
  3
]).then(alert); // 1, 2, 3
```

Então conseguimos passar valores já prontos para o `Promise.all` quando for conveniente.
````

## Promise.allSettled

[recent browser="new"]

O `Promise.all` rejeita por completo se qualquer promessa for rejeitada. Isso é bom para casos do tipo "tudo ou nada", quando precisamos que *todos* os resultados sejam bem-sucedidos para prosseguir:

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // o método render precisa dos resultados de todos os fetches
```

O `Promise.allSettled` apenas espera que todas as promessas sejam estabelecidas, independentemente do resultado. O array resultante tem:

- `{status:"fulfilled", value:result}` para respostas bem-sucedidas,
- `{status:"rejected", reason:error}` para erros.

Por exemplo, gostaríamos de buscar as informações de vários usuários. Mesmo que uma requisição falhe, ainda estamos interessados nas outras.

Vamos usar o `Promise.allSettled`:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
```

O `results` na linha `(*)` acima será:
```js
[
  {status: 'fulfilled', value: ...resposta...},
  {status: 'fulfilled', value: ...resposta...},
  {status: 'rejected', reason: ...objeto de erro...}
]
```

Então, para cada promessa, obtemos o status e o `value`/`error` dela.

### Polyfill

Se o navegador não suportar `Promise.allSettled`, é fácil fazer um polyfill:

```js
if (!Promise.allSettled) {
  const rejectHandler = reason => ({ status: 'rejected', reason });

  const resolveHandler = value => ({ status: 'fulfilled', value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
    return Promise.all(convertedPromises);
  };
}
```

Nesse código, `promises.map` pega os valores de entrada, os transforma em promessas (só por garantia, caso algo que não seja uma promessa tenha sido passado) com `p => Promise.resolve(p)`, e então adiciona um tratador `.then` a cada uma.

Esse tratador transforma um resultado `value` bem-sucedido em `{status:'fulfilled', value}`, e um erro `reason` em `{status:'rejected', reason}`. Esse é exatamente o formato do `Promise.allSettled`.

Agora podemos usar o `Promise.allSettled` para obter os resultados de *todas* as promessas dadas, mesmo que algumas delas sejam rejeitadas.

## Promise.race

Parecido com o `Promise.all`, mas espera apenas pela primeira promessa estabelecida e pega o resultado dela (ou erro).

A sintaxe é:

```js
let promise = Promise.race(iterable);
```

Por exemplo, aqui o resultado será `1`:

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

A primeira promessa aqui foi a mais rápida, então ela se tornou o resultado. Depois que a primeira promessa estabelecida "vence a corrida", todos os outros resultados/erros são ignorados.


## Promise.any

Parecido com o `Promise.race`, mas espera apenas pela primeira promessa resolvida e pega o resultado dela. Se todas as promessas dadas forem rejeitadas, então a promessa retornada é rejeitada com [`AggregateError`](mdn:js/AggregateError) - um objeto de erro especial que guarda todos os erros das promessas na sua propriedade `errors`.

A sintaxe é:

```js
let promise = Promise.any(iterable);
```

Por exemplo, aqui o resultado será `1`:

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

A primeira promessa aqui foi a mais rápida, mas foi rejeitada, então a segunda promessa se tornou o resultado. Depois que a primeira promessa resolvida "vence a corrida", todos os outros resultados são ignorados.

Aqui está um exemplo de quando todas as promessas falham:

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
]).catch(error => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error!
});
```

Como você pode ver, os objetos de erro das promessas que falharam ficam disponíveis na propriedade `errors` do objeto `AggregateError`.

## Promise.resolve/reject

Os métodos `Promise.resolve` e `Promise.reject` raramente são necessários no código moderno, porque a sintaxe `async/await` (vamos cobrir isso [um pouco mais adiante](info:async-await)) os torna meio obsoletos.

Vamos cobri-los aqui por completude, e para quem não pode usar `async/await` por algum motivo.

### Promise.resolve

`Promise.resolve(value)` cria uma promessa resolvida com o resultado `value`.

O mesmo que:

```js
let promise = new Promise(resolve => resolve(value));
```

O método é usado para compatibilidade, quando se espera que uma função retorne uma promessa.

Por exemplo, a função `loadCached` abaixo busca uma URL e lembra (guarda em cache) o seu conteúdo. Para chamadas futuras com a mesma URL, ela pega imediatamente o conteúdo anterior do cache, mas usa o `Promise.resolve` para fazer disso uma promessa, de forma que o valor retornado seja sempre uma promessa:

```js
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
*!*
    return Promise.resolve(cache.get(url)); // (*)
*/!*
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```

Podemos escrever `loadCached(url).then(…)`, porque a função garante retornar uma promessa. Podemos sempre usar `.then` depois de `loadCached`. Esse é o propósito do `Promise.resolve` na linha `(*)`.

### Promise.reject

`Promise.reject(error)` cria uma promessa rejeitada com `error`.

O mesmo que:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

Na prática, esse método quase nunca é usado.

## Resumo

Existem 6 métodos estáticos da classe `Promise`:

1. `Promise.all(promises)` -- espera que todas as promessas sejam resolvidas e retorna um array dos resultados delas. Se qualquer uma das promessas dadas for rejeitada, isso se torna o erro do `Promise.all`, e todos os outros resultados são ignorados.
2. `Promise.allSettled(promises)` (método adicionado recentemente) -- espera que todas as promessas sejam estabelecidas e retorna os resultados delas como um array de objetos com:
    - `status`: `"fulfilled"` ou `"rejected"`
    - `value` (se resolvida) ou `reason` (se rejeitada).
3. `Promise.race(promises)` -- espera que a primeira promessa seja estabelecida, e o resultado/erro dela se torna o resultado final.
4. `Promise.any(promises)` (método adicionado recentemente) -- espera que a primeira promessa seja resolvida, e o resultado dela se torna o resultado final. Se todas as promessas dadas forem rejeitadas, [`AggregateError`](mdn:js/AggregateError) se torna o erro do `Promise.any`.
5. `Promise.resolve(value)` -- faz uma promessa resolvida com o valor dado.
6. `Promise.reject(error)` -- faz uma promessa rejeitada com o erro dado.

De todos esses, o `Promise.all` é provavelmente o mais comum na prática.
