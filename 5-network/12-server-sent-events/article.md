# Eventos enviados pelo servidor (Server-Sent Events)

A especificação [Server-Sent Events](https://html.spec.whatwg.org/multipage/comms.html#the-eventsource-interface) descreve uma classe nativa `EventSource`, que mantém a conexão com o servidor e permite receber eventos dele.

Assim como o `WebSocket`, a conexão é persistente.

Mas existem várias diferenças importantes:

| `WebSocket` | `EventSource` |
|-------------|---------------|
| Bidirecional: tanto cliente quanto servidor podem trocar mensagens | Unidirecional: só o servidor envia dados |
| Dados binários e de texto | Só texto |
| Protocolo WebSocket | HTTP comum |

`EventSource` é uma forma menos poderosa de se comunicar com o servidor do que `WebSocket`.

Por que alguém usaria isso?

O principal motivo: é mais simples. Em muitas aplicações, o poder do `WebSocket` é um pouco demais.

Precisamos receber um fluxo de dados do servidor: talvez mensagens de chat ou preços de mercado, ou qualquer coisa assim. É nisso que `EventSource` é bom. Também suporta reconexão automática, algo que precisamos implementar manualmente com `WebSocket`. Além disso, é um HTTP simples e comum, não um protocolo novo.

## Obtendo mensagens

Para começar a receber mensagens, só precisamos criar `new EventSource(url)`.

O navegador vai se conectar a `url` e manter a conexão aberta, esperando por eventos.

O servidor deve responder com status 200 e o cabeçalho `Content-Type: text/event-stream`, então manter a conexão e escrever mensagens nela num formato especial, assim:

```
data: Mensagem 1

data: Mensagem 2

data: Mensagem 3
data: de duas linhas
```

- O texto de uma mensagem vem depois de `data:`, o espaço depois dos dois-pontos é opcional.
- Mensagens são delimitadas com quebras de linha duplas `\n\n`.
- Para enviar uma quebra de linha `\n`, podemos imediatamente enviar mais um `data:` (3ª mensagem acima).

Na prática, mensagens complexas geralmente são enviadas codificadas em JSON. Quebras de linha são codificadas como `\n` dentro delas, então mensagens `data:` multilinha não são necessárias.

Por exemplo:

```js
data: {"user":"John","message":"First line*!*\n*/!* Second line"}
```

...Então podemos assumir que um `data:` contém exatamente uma mensagem.

Para cada mensagem desse tipo, o evento `message` é gerado:

```js
let eventSource = new EventSource("/events/subscribe");

eventSource.onmessage = function(event) {
  console.log("Nova mensagem", event.data);
  // vai registrar 3 vezes para o fluxo de dados acima
};

// ou eventSource.addEventListener('message', ...)
```

### Requisições cross-origin

`EventSource` suporta requisições cross-origin, como `fetch` e qualquer outro método de rede. Podemos usar qualquer URL:

```js
let source = new EventSource("https://another-site.com/events");
```

O servidor remoto vai receber o cabeçalho `Origin` e deve responder com `Access-Control-Allow-Origin` para prosseguir.

Para passar credenciais, devemos definir a opção adicional `withCredentials`, assim:

```js
let source = new EventSource("https://another-site.com/events", {
  withCredentials: true
});
```

Veja o capítulo <info:fetch-crossorigin> para mais detalhes sobre cabeçalhos cross-origin.


## Reconexão

Na criação, `new EventSource` se conecta ao servidor, e se a conexão for quebrada -- reconecta.

Isso é bem conveniente, já que não precisamos nos preocupar com isso.

Existe um pequeno atraso entre reconexões, alguns segundos por padrão.

O servidor pode definir o atraso recomendado usando `retry:` na resposta (em milissegundos):

```js
retry: 15000
data: Olá, defini o atraso de reconexão para 15 segundos
```

O `retry:` pode vir tanto junto com algum dado, quanto como uma mensagem independente.

O navegador deve esperar essa quantidade de milissegundos antes de reconectar. Ou mais, por exemplo, se o navegador sabe (pelo SO) que não há conexão de rede no momento, ele pode esperar até a conexão aparecer, e então tentar de novo.

- Se o servidor quiser que o navegador pare de reconectar, ele deve responder com status HTTP 204.
- Se o navegador quiser fechar a conexão, ele deve chamar `eventSource.close()`:

```js
let eventSource = new EventSource(...);

eventSource.close();
```

Além disso, não vai haver reconexão se a resposta tiver um `Content-Type` incorreto ou seu status HTTP for diferente de 301, 307, 200 e 204. Nesses casos, o evento `"error"` vai ser emitido, e o navegador não vai reconectar.

```smart
Quando uma conexão é finalmente fechada, não há como "reabri-la". Se quisermos conectar de novo, basta criar um novo `EventSource`.
```

## Id da mensagem

Quando uma conexão quebra por causa de problemas de rede, nenhum dos lados pode ter certeza de quais mensagens foram recebidas, e quais não foram.

Para retomar a conexão corretamente, cada mensagem deve ter um campo `id`, assim:

```
data: Mensagem 1
id: 1

data: Mensagem 2
id: 2

data: Mensagem 3
data: de duas linhas
id: 3
```

Quando uma mensagem com `id:` é recebida, o navegador:

- Define a propriedade `eventSource.lastEventId` com seu valor.
- Ao reconectar, envia o cabeçalho `Last-Event-ID` com esse `id`, para que o servidor possa reenviar as mensagens seguintes.

```smart header="Coloque `id:` depois de `data:`"
Observe: o `id` é anexado depois do `data` da mensagem pelo servidor, para garantir que `lastEventId` seja atualizado depois que a mensagem for recebida.
```

## Status da conexão: readyState

O objeto `EventSource` tem a propriedade `readyState`, que tem um de três valores:

```js no-beautify
EventSource.CONNECTING = 0; // conectando ou reconectando
EventSource.OPEN = 1;       // conectado
EventSource.CLOSED = 2;     // conexão fechada
```

Quando um objeto é criado, ou a conexão está fora do ar, `readyState` é sempre `EventSource.CONNECTING` (igual a `0`).

Podemos consultar essa propriedade para saber o estado do `EventSource`.

## Tipos de evento

Por padrão, o objeto `EventSource` gera três eventos:

- `message` -- uma mensagem recebida, disponível como `event.data`.
- `open` -- a conexão está aberta.
- `error` -- a conexão não pôde ser estabelecida, por exemplo, o servidor retornou status HTTP 500.

O servidor pode especificar outro tipo de evento com `event: ...` no início do evento.

Por exemplo:

```
event: join
data: Bob

data: Hello

event: leave
data: Bob
```

Para tratar eventos personalizados, devemos usar `addEventListener`, não `onmessage`:

```js
eventSource.addEventListener('join', event => {
  alert(`Joined ${event.data}`);
});

eventSource.addEventListener('message', event => {
  alert(`Said: ${event.data}`);
});

eventSource.addEventListener('leave', event => {
  alert(`Left ${event.data}`);
});
```

## Exemplo completo

Aqui está o servidor que envia mensagens com `1`, `2`, `3`, depois `bye` e quebra a conexão.

Então o navegador reconecta automaticamente.

[codetabs src="eventsource"]

## Resumo

O objeto `EventSource` estabelece automaticamente uma conexão persistente e permite que o servidor envie mensagens por ela.

Ele oferece:
- Reconexão automática, com timeout `retry` ajustável.
- Ids de mensagem para retomar eventos, o último identificador recebido é enviado no cabeçalho `Last-Event-ID` ao reconectar.
- O estado atual está na propriedade `readyState`.

Isso faz do `EventSource` uma alternativa viável ao `WebSocket`, já que este último é mais de baixo nível e não tem esses recursos nativos (embora eles possam ser implementados).

Em muitas aplicações da vida real, o poder do `EventSource` é suficiente.

Suportado em todos os navegadores modernos (não no IE).

A sintaxe é:

```js
let source = new EventSource(url, [credentials]);
```

O segundo argumento tem só uma opção possível: `{ withCredentials: true }`, que permite enviar credenciais cross-origin.

No geral, a segurança cross-origin é a mesma de `fetch` e outros métodos de rede.

### Propriedades de um objeto `EventSource`

`readyState`
: O estado atual da conexão: `EventSource.CONNECTING (=0)`, `EventSource.OPEN (=1)` ou `EventSource.CLOSED (=2)`.

`lastEventId`
: O último `id` recebido. Ao reconectar, o navegador o envia no cabeçalho `Last-Event-ID`.

### Métodos

`close()`
: Fecha a conexão.

### Eventos

`message`
: Mensagem recebida, o dado está em `event.data`.

`open`
: A conexão foi estabelecida.

`error`
: Em caso de erro, incluindo tanto conexão perdida (vai reconectar automaticamente) quanto erros fatais. Podemos checar `readyState` para ver se a reconexão está sendo tentada.

O servidor pode definir um nome de evento personalizado em `event:`. Esses eventos devem ser tratados usando `addEventListener`, não `on<event>`.

### Formato da resposta do servidor

O servidor envia mensagens, delimitadas por `\n\n`.

Uma mensagem pode ter os seguintes campos:

- `data:` -- corpo da mensagem, uma sequência de múltiplos `data` é interpretada como uma única mensagem, com `\n` entre as partes.
- `id:` -- renova `lastEventId`, enviado em `Last-Event-ID` ao reconectar.
- `retry:` -- recomenda um atraso de nova tentativa para reconexões em ms. Não há como defini-lo a partir do JavaScript.
- `event:` -- nome do evento, deve preceder `data:`.

Uma mensagem pode incluir um ou mais campos em qualquer ordem, mas `id:` geralmente vai por último.
