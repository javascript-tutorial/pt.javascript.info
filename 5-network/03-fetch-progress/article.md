
# Fetch: Progresso do download

O método `fetch` permite acompanhar o progresso do *download*.

Observe: atualmente não existe uma forma de `fetch` acompanhar o progresso do *upload*. Para esse propósito, use [XMLHttpRequest](info:xmlhttprequest), vamos abordá-lo mais tarde.

Para acompanhar o progresso do download, podemos usar a propriedade `response.body`. É um `ReadableStream` -- um objeto especial que fornece o corpo pedaço por pedaço, conforme ele chega. Streams legíveis são descritos na especificação [Streams API](https://streams.spec.whatwg.org/#rs-class).

Diferente de `response.text()`, `response.json()` e outros métodos, `response.body` dá controle total sobre o processo de leitura, e podemos contar quanto já foi consumido a qualquer momento.

Aqui está um esboço de código que lê a resposta a partir de `response.body`:

```js
// em vez de response.json() e outros métodos
const reader = response.body.getReader();

// laço infinito enquanto o corpo está sendo baixado
while(true) {
  // done é true para o último pedaço
  // value é um Uint8Array dos bytes do pedaço
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Recebidos ${value.length} bytes`)
}
```

O resultado da chamada `await reader.read()` é um objeto com duas propriedades:
- **`done`** -- `true` quando a leitura estiver completa, caso contrário `false`.
- **`value`** -- um array tipado de bytes: `Uint8Array`.

```smart
A Streams API também descreve iteração assíncrona sobre `ReadableStream` com o laço `for await..of`, mas isso ainda não é muito bem suportado (veja [problemas de navegadores](https://github.com/whatwg/streams/issues/778#issuecomment-461341033)), então usamos o laço `while`.
```

Recebemos os pedaços da resposta no laço, até o carregamento terminar, ou seja: até `done` se tornar `true`.

Para registrar o progresso, só precisamos, para cada fragmento `value` recebido, adicionar seu tamanho ao contador.

Aqui está o exemplo completo funcionando, que obtém a resposta e registra o progresso no console, mais explicações a seguir:

```js run async
// Passo 1: inicia o fetch e obtém um reader
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

const reader = response.body.getReader();

// Passo 2: obtém o tamanho total
const contentLength = +response.headers.get('Content-Length');

// Passo 3: lê os dados
let receivedLength = 0; // quantos bytes foram recebidos até o momento
let chunks = []; // array de pedaços binários recebidos (compõe o corpo)
while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  chunks.push(value);
  receivedLength += value.length;

  console.log(`Recebidos ${receivedLength} de ${contentLength}`)
}

// Passo 4: concatena os pedaços num único Uint8Array
let chunksAll = new Uint8Array(receivedLength); // (4.1)
let position = 0;
for(let chunk of chunks) {
	chunksAll.set(chunk, position); // (4.2)
	position += chunk.length;
}

// Passo 5: decodifica numa string
let result = new TextDecoder("utf-8").decode(chunksAll);

// Terminamos!
let commits = JSON.parse(result);
alert(commits[0].author.login);
```

Vamos explicar isso passo a passo:

1. Realizamos o `fetch` como de costume, mas em vez de chamar `response.json()`, obtemos um leitor de stream `response.body.getReader()`.

    Observe que não podemos usar os dois métodos para ler a mesma resposta: ou usamos um leitor, ou um método de resposta para obter o resultado.
2. Antes de ler, podemos descobrir o tamanho total da resposta a partir do cabeçalho `Content-Length`.

    Ele pode estar ausente em requisições cross-origin (veja o capítulo <info:fetch-crossorigin>) e, bem, tecnicamente um servidor não é obrigado a defini-lo. Mas geralmente ele está presente.
3. Chamamos `await reader.read()` até terminar.

    Reunimos os pedaços da resposta no array `chunks`. Isso é importante, porque depois que a resposta é consumida, não vamos conseguir "reler" usando `response.json()` ou outra forma (você pode tentar, vai dar erro).
4. No final, temos `chunks` -- um array de pedaços `Uint8Array` de bytes. Precisamos juntá-los num único resultado. Infelizmente, não existe um único método que os concatene, então é preciso um pouco de código para isso:
    1. Criamos `chunksAll = new Uint8Array(receivedLength)` -- um array do mesmo tipo com o tamanho combinado.
    2. Então usamos o método `.set(chunk, position)` para copiar cada `chunk` um após o outro nele.
5. Temos o resultado em `chunksAll`. Mas é um array de bytes, não uma string.

    Para criar uma string, precisamos interpretar esses bytes. O [TextDecoder](info:text-decoder) nativo faz exatamente isso. Então podemos fazer `JSON.parse` nele, se necessário.

    E se precisarmos de conteúdo binário em vez de uma string? Isso é ainda mais simples. Substitua os passos 4 e 5 por uma única linha que cria um `Blob` a partir de todos os pedaços:
    ```js
    let blob = new Blob(chunks);
    ```

No final temos o resultado (como uma string ou um blob, o que for conveniente), e o acompanhamento de progresso no processo.

De novo, observe que isso não serve para progresso de *upload* (não há como agora com `fetch`), só para progresso de *download*.

Além disso, se o tamanho for desconhecido, devemos checar `receivedLength` no laço e interrompê-lo assim que atingir um certo limite. Assim, `chunks` não vai estourar a memória.
