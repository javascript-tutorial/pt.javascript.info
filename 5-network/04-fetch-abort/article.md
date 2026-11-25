
# Fetch: Abortar

Como sabemos, `fetch` retorna uma promessa. E o JavaScript geralmente não tem o conceito de "abortar" uma promessa. Então, como podemos cancelar um `fetch` em andamento? Por exemplo, se as ações do usuário no nosso site indicarem que o `fetch` não é mais necessário.

Existe um objeto nativo especial para esse propósito: `AbortController`. Ele pode ser usado para abortar não só `fetch`, mas outras tarefas assíncronas também.

O uso é bem direto:

## O objeto AbortController

Crie um controlador:

```js
let controller = new AbortController();
```

Um controlador é um objeto extremamente simples.

- Ele tem um único método `abort()`,
- E uma única propriedade `signal`, que permite definir ouvintes de evento nela.

Quando `abort()` é chamado:
- `controller.signal` emite o evento `"abort"`.
- A propriedade `controller.signal.aborted` se torna `true`.

Em geral, temos duas partes no processo:
1. A que realiza uma operação cancelável, que define um ouvinte em `controller.signal`.
2. A que cancela: ela chama `controller.abort()` quando necessário.

Aqui está o exemplo completo (ainda sem `fetch`):

```js run
let controller = new AbortController();
let signal = controller.signal;

// A parte que realiza uma operação cancelável
// obtém o objeto "signal"
// e define o ouvinte para disparar quando controller.abort() for chamado
signal.addEventListener('abort', () => alert("abortar!"));

// A outra parte, que cancela (a qualquer momento depois):
controller.abort(); // abortar!

// O evento dispara e signal.aborted se torna true
alert(signal.aborted); // true
```

Como podemos ver, `AbortController` é só um meio de propagar eventos `abort` quando `abort()` é chamado nele.

Poderíamos implementar o mesmo tipo de escuta de eventos no nosso código por conta própria, sem o objeto `AbortController`.

Mas o que é valioso é que `fetch` sabe como trabalhar com o objeto `AbortController`. Isso está integrado nele.

## Usando com fetch

Para conseguir cancelar o `fetch`, passe a propriedade `signal` de um `AbortController` como uma opção do `fetch`:

```js
let controller = new AbortController();
fetch(url, {
  signal: controller.signal
});
```

O método `fetch` sabe como trabalhar com `AbortController`. Ele vai escutar eventos `abort` em `signal`.

Agora, para abortar, chame `controller.abort()`:

```js
controller.abort();
```

Terminamos: `fetch` recebe o evento de `signal` e aborta a requisição.

Quando um fetch é abortado, sua promessa rejeita com um erro `AbortError`, então devemos tratá-lo, por exemplo, num `try..catch`.

Aqui está o exemplo completo com o `fetch` abortado depois de 1 segundo:

```js run async
// aborta em 1 segundo
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/article/fetch-abort/demo/hang', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') { // trata o abort()
    alert("Abortado!");
  } else {
    throw err;
  }
}
```

## AbortController é escalável

`AbortController` é escalável. Ele permite cancelar vários fetches de uma vez.

Aqui está um esboço de código que busca várias `urls` em paralelo, e usa um único controlador para abortar todas elas:

```js
let urls = [...]; // uma lista de urls para buscar em paralelo

let controller = new AbortController();

// um array de promessas de fetch
let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

// se controller.abort() for chamado de qualquer lugar,
// ele aborta todos os fetches
```

Se tivermos nossas próprias tarefas assíncronas, diferentes de `fetch`, podemos usar um único `AbortController` para interrompê-las, junto com os fetches.

Só precisamos escutar seu evento `abort` nas nossas tarefas:

```js
let urls = [...];
let controller = new AbortController();

let ourJob = new Promise((resolve, reject) => { // nossa tarefa
  ...
  controller.signal.addEventListener('abort', reject);
});

let fetchJobs = urls.map(url => fetch(url, { // fetches
  signal: controller.signal
}));

// Espera os fetches e nossa tarefa em paralelo
let results = await Promise.all([...fetchJobs, ourJob]);

// se controller.abort() for chamado de qualquer lugar,
// ele aborta todos os fetches e ourJob
```

## Resumo

- `AbortController` é um objeto simples que gera um evento `abort` na sua propriedade `signal` quando o método `abort()` é chamado (e também define `signal.aborted` como `true`).
- `fetch` se integra com ele: passamos a propriedade `signal` como opção, e então `fetch` a escuta, então é possível abortar o `fetch`.
- Podemos usar `AbortController` no nosso código. A interação "chamar `abort()`" -> "escutar o evento `abort`" é simples e universal. Podemos usá-la até mesmo sem `fetch`.
