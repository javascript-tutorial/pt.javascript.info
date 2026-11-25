
# Fetch API

Até agora, já sabemos bastante sobre `fetch`.

Vamos ver o resto da API, para cobrir todas as suas capacidades.

```smart
Observe: a maioria dessas opções é usada raramente. Você pode pular este capítulo e ainda assim usar bem o `fetch`.

Ainda assim, é bom saber o que `fetch` pode fazer, então, se a necessidade surgir, você pode voltar e ler os detalhes.
```

Aqui está a lista completa de todas as opções possíveis de `fetch`, com seus valores padrão (alternativas nos comentários):

```js
let promise = fetch(url, {
  method: "GET", // POST, PUT, DELETE, etc.
  headers: {
    // o valor do cabeçalho de tipo de conteúdo é geralmente definido automaticamente
    // dependendo do corpo da requisição
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined, // string, FormData, Blob, BufferSource, ou URLSearchParams
  referrer: "about:client", // ou "" para não enviar o cabeçalho Referer,
  // ou uma url da origem atual
  referrerPolicy: "strict-origin-when-cross-origin", // no-referrer-when-downgrade, no-referrer, origin, same-origin...
  mode: "cors", // same-origin, no-cors
  credentials: "same-origin", // omit, include
  cache: "default", // no-store, reload, no-cache, force-cache, ou only-if-cached
  redirect: "follow", // manual, error
  integrity: "", // um hash, como "sha256-abcdef1234567890"
  keepalive: false, // true
  signal: undefined, // AbortController para abortar a requisição
  window: window // null
});
```

Uma lista impressionante, não?

Cobrimos totalmente `method`, `headers` e `body` no capítulo <info:fetch>.

A opção `signal` é coberta em <info:fetch-abort>.

Agora vamos explorar as capacidades restantes.

## referrer, referrerPolicy

Essas opções governam como `fetch` define o cabeçalho HTTP `Referer`.

Normalmente esse cabeçalho é definido automaticamente e contém a url da página que fez a requisição. Na maioria dos cenários, isso não é importante de forma alguma, mas às vezes, por motivos de segurança, faz sentido removê-lo ou encurtá-lo.

**A opção `referrer` permite definir qualquer `Referer` (dentro da origem atual) ou removê-lo.**

Para não enviar nenhum referrer, defina uma string vazia:
```js
fetch('/page', {
*!*
  referrer: "" // sem cabeçalho Referer
*/!*
});
```

Para definir outra url dentro da origem atual:

```js
fetch('/page', {
  // assumindo que estamos em https://javascript.info
  // podemos definir qualquer cabeçalho Referer, mas só dentro da origem atual
*!*
  referrer: "https://javascript.info/anotherpage"
*/!*
});
```

**A opção `referrerPolicy` define regras gerais para `Referer`.**

As requisições são divididas em 3 tipos:

1. Requisição para a mesma origem.
2. Requisição para outra origem.
3. Requisição de HTTPS para HTTP (de protocolo seguro para inseguro).

Diferente da opção `referrer`, que permite definir o valor exato de `Referer`, `referrerPolicy` diz ao navegador regras gerais para cada tipo de requisição.

Os valores possíveis são descritos na especificação [Referrer Policy](https://w3c.github.io/webappsec-referrer-policy/):

- **`"strict-origin-when-cross-origin"`** -- o valor padrão: para mesma origem envia o `Referer` completo, para cross-origin envia só a origem, a menos que seja uma requisição HTTPS→HTTP, nesse caso não envia nada.
- **`"no-referrer-when-downgrade"`** -- o `Referer` completo é sempre enviado, a menos que enviemos uma requisição de HTTPS para HTTP (para o protocolo menos seguro).
- **`"no-referrer"`** -- nunca envia `Referer`.
- **`"origin"`** -- envia só a origem no `Referer`, não a URL completa da página, por exemplo, só `http://site.com` em vez de `http://site.com/path`.
- **`"origin-when-cross-origin"`** -- envia o `Referer` completo para a mesma origem, mas só a parte da origem para requisições cross-origin (como acima).
- **`"same-origin"`** -- envia o `Referer` completo para a mesma origem, mas nenhum `Referer` para requisições cross-origin.
- **`"strict-origin"`** -- envia só a origem, e nenhum `Referer` para requisições HTTPS→HTTP.
- **`"unsafe-url"`** -- sempre envia a url completa no `Referer`, até mesmo para requisições HTTPS→HTTP.

Aqui está uma tabela com todas as combinações:

| Valor | Para a mesma origem | Para outra origem | HTTPS→HTTP |
|-------|----------------|-------------------|------------|
| `"no-referrer"` | - | - | - |
| `"no-referrer-when-downgrade"` | completo | completo | - |
| `"origin"` | origem | origem | origem |
| `"origin-when-cross-origin"` | completo | origem | origem |
| `"same-origin"` | completo | - | - |
| `"strict-origin"` | origem | origem | - |
| `"strict-origin-when-cross-origin"` ou `""` (padrão) | completo | origem | - |
| `"unsafe-url"` | completo | completo | completo |

Digamos que temos uma zona de administração com uma estrutura de URL que não deveria ser conhecida de fora do site.

Se enviarmos um `fetch`, então por padrão ele sempre envia o cabeçalho `Referer` com a url completa da nossa página (exceto quando requisitamos de HTTPS para HTTP, nesse caso nenhum `Referer`).

Por exemplo, `Referer: https://javascript.info/admin/secret/paths`.

Se quisermos que outros sites conheçam só a parte da origem, não o caminho da URL, podemos definir a opção:

```js
fetch('https://another.com/page', {
  // ...
  referrerPolicy: "origin-when-cross-origin" // Referer: https://javascript.info
});
```

Podemos colocar isso em todas as chamadas de `fetch`, talvez integrando numa biblioteca JavaScript do nosso projeto que faz todas as requisições e usa `fetch` internamente.

Sua única diferença comparada ao comportamento padrão é que, para requisições para outra origem, `fetch` envia só a parte da origem da URL (por exemplo, `https://javascript.info`, sem o caminho). Para requisições para a nossa origem, ainda obtemos o `Referer` completo (talvez útil para fins de depuração).

```smart header="A política de referrer não é só para `fetch`"
A política de referrer, descrita na [especificação](https://w3c.github.io/webappsec-referrer-policy/), não é só para `fetch`, mas sim mais global.

Em particular, é possível definir a política padrão para a página inteira usando o cabeçalho HTTP `Referrer-Policy`, ou por link, com `<a rel="noreferrer">`.
```

## mode

A opção `mode` é uma proteção que evita requisições cross-origin acidentais:

- **`"cors"`** -- o padrão, requisições cross-origin são permitidas, como descrito em <info:fetch-crossorigin>,
- **`"same-origin"`** -- requisições cross-origin são proibidas,
- **`"no-cors"`** -- só requisições cross-origin seguras são permitidas.

Essa opção pode ser útil quando a URL para `fetch` vem de terceiros, e queremos um "interruptor de desligamento" para limitar as capacidades cross-origin.

## credentials

A opção `credentials` especifica se `fetch` deve enviar cookies e cabeçalhos HTTP-Authorization com a requisição.

- **`"same-origin"`** -- o padrão, não envia para requisições cross-origin,
- **`"include"`** -- sempre envia, exige `Access-Control-Allow-Credentials` do servidor cross-origin para que o JavaScript acesse a resposta, o que foi coberto no capítulo <info:fetch-crossorigin>,
- **`"omit"`** -- nunca envia, nem mesmo para requisições de mesma origem.

## cache

Por padrão, requisições `fetch` fazem uso do cache HTTP padrão. Ou seja, respeitam os cabeçalhos `Expires` e `Cache-Control`, enviam `If-Modified-Since` e assim por diante. Assim como requisições HTTP comuns fazem.

A opção `cache` permite ignorar o cache HTTP ou ajustar finamente seu uso:

- **`"default"`** -- `fetch` usa as regras e cabeçalhos padrão do cache HTTP,
- **`"no-store"`** -- ignora totalmente o cache HTTP, esse modo se torna o padrão se definirmos um cabeçalho `If-Modified-Since`, `If-None-Match`, `If-Unmodified-Since`, `If-Match`, ou `If-Range`,
- **`"reload"`** -- não pega o resultado do cache HTTP (se houver), mas popula o cache com a resposta (se os cabeçalhos da resposta permitirem essa ação),
- **`"no-cache"`** -- cria uma requisição condicional se houver uma resposta em cache, e uma requisição normal caso contrário. Popula o cache HTTP com a resposta,
- **`"force-cache"`** -- usa uma resposta do cache HTTP, mesmo que esteja desatualizada. Se não houver resposta no cache HTTP, faz uma requisição HTTP normal, se comporta normalmente,
- **`"only-if-cached"`** -- usa uma resposta do cache HTTP, mesmo que esteja desatualizada. Se não houver resposta no cache HTTP, então dá erro. Só funciona quando `mode` é `"same-origin"`.

## redirect

Normalmente, `fetch` segue redirecionamentos HTTP de forma transparente, como 301, 302 etc.

A opção `redirect` permite mudar isso:

- **`"follow"`** -- o padrão, segue redirecionamentos HTTP,
- **`"error"`** -- erro no caso de redirecionamento HTTP,
- **`"manual"`** -- permite processar redirecionamentos HTTP manualmente. No caso de redirecionamento, vamos obter um objeto de resposta especial, com `response.type="opaqueredirect"` e o status e a maioria das outras propriedades zerados/vazios.

## integrity

A opção `integrity` permite checar se a resposta corresponde ao checksum conhecido previamente.

Como descrito na [especificação](https://w3c.github.io/webappsec-subresource-integrity/), as funções hash suportadas são SHA-256, SHA-384 e SHA-512, podem existir outras dependendo do navegador.

Por exemplo, estamos baixando um arquivo, e sabemos que seu checksum SHA-256 é "abcdef" (um checksum real é mais longo, claro).

Podemos colocá-lo na opção `integrity`, assim:

```js
fetch('http://site.com/file', {
  integrity: 'sha256-abcdef'
});
```

Então `fetch` vai calcular o SHA-256 por conta própria e compará-lo com a nossa string. Em caso de incompatibilidade, um erro é disparado.

## keepalive

A opção `keepalive` indica que a requisição pode "sobreviver" à página web que a iniciou.

Por exemplo, coletamos estatísticas sobre como o visitante atual usa nossa página (cliques do mouse, fragmentos da página que ele vê), para analisar e melhorar a experiência do usuário.

Quando o visitante sai da nossa página -- gostaríamos de salvar os dados no nosso servidor.

Podemos usar o evento `window.onunload` para isso:

```js run
window.onunload = function() {
  fetch('/analytics', {
    method: 'POST',
    body: "statistics",
*!*
    keepalive: true
*/!*
  });
};
```

Normalmente, quando um documento é descarregado, todas as requisições de rede associadas são abortadas. Mas a opção `keepalive` diz ao navegador para realizar a requisição em segundo plano, mesmo depois que ele sair da página. Então essa opção é essencial para que nossa requisição tenha sucesso.

Ela tem algumas limitações:

- Não podemos enviar megabytes: o limite do corpo para requisições `keepalive` é 64KB.
    - Se precisarmos coletar muitas estatísticas sobre a visita, devemos enviá-las regularmente em pacotes, para que não sobre muita coisa para a última requisição `onunload`.
    - Esse limite se aplica a todas as requisições `keepalive` juntas. Em outras palavras, podemos realizar várias requisições `keepalive` em paralelo, mas a soma dos tamanhos de seus corpos não deve exceder 64KB.
- Não podemos tratar a resposta do servidor se o documento for descarregado. Então, no nosso exemplo, `fetch` vai ter sucesso graças ao `keepalive`, mas as funções seguintes não vão funcionar.
    - Na maioria dos casos, como enviar estatísticas, isso não é um problema, já que o servidor só aceita os dados e geralmente envia uma resposta vazia para esse tipo de requisição.
