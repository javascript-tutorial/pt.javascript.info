
# Fetch

Com JavaScript é possível enviar requisições de rede ao servidor e carregar novas informações sempre que necessário.

Por exemplo, podemos usar uma requisição de rede para:

- Enviar um pedido,
- Carregar informações do usuário,
- Receber atualizações mais recentes do servidor,
- ...etc.

...E tudo isso sem precisar recarregar a página!

Existe um termo genérico chamado "AJAX" (abreviação de <b>A</b>synchronous <b>J</b>avaScript <b>A</b>nd <b>X</b>ML) para requisições de rede feitas com JavaScript. Não precisamos usar XML, na verdade — o termo vem de uma época mais antiga, é por isso que essa palavra ainda está lá. Provavelmente você já deve ter ouvido falar.

Existem várias formas de enviar uma requisição de rede e obter informações do servidor.

O método `fetch()` é moderno e versátil, então vamos começar por ele. Navegadores muito antigos não o suportam (para isso, existem polyfills disponíveis), porém entre os modernos o suporte é excelente.

A sintaxe básica é a seguinte:

````js
let promise = fetch(url, [options])
````

- **`url`** -- a URL a ser acessada.
- **`options`** -- parâmetros opcionais: método, cabeçalhos etc.

Sem `options`, é uma simples requisição GET que baixa o conteúdo da `url`.

O navegador inicia a requisição imediatamente e retorna uma promise — quem fez a chamada deve usá-la para obter o resultado.

Receber uma resposta normalmente é um processo de duas fases.

**Primeiro, a `promise` retornada por `fetch` é resolvida com um objeto da classe nativa [Response](https://fetch.spec.whatwg.org/#response-class) assim que o servidor responde com os cabeçalhos.**

Nesse momento já podemos verificar o status HTTP, para saber se foi bem-sucedida ou não, e os headers — mas ainda não temos o body.

A promise é rejeitada se o `fetch` não conseguir fazer a requisição HTTP — por exemplo, por problemas de rede ou se o site não existir. Status HTTP anormais, como 404 ou 500, não causam um erro.

Podemos ver o status HTTP nas propriedades da resposta:

- **`status`** -- código de status HTTP, ex: 200.
- **`ok`** -- booleano, `true` se o código de status HTTP estiver entre 200 e 299.

Por exemplo:

````js
let response = await fetch(url);

if (response.ok) { // se o status HTTP estiver entre 200-299
  // obtém o body da resposta (o método é explicado abaixo)
  let json = await response.json();
} else {
  alert("HTTP-Error: " + response.status);
}
````

**Segundo, para obter o body da resposta, precisamos chamar um método adicional.**

`Response` oferece vários métodos baseados em promises para acessar o body em diferentes formatos:

- **`response.text()`** -- lê a resposta e retorna como texto,
- **`response.json()`** -- interpreta a resposta como JSON,
- **`response.formData()`** -- retorna a resposta como objeto `FormData` (explicado no [próximo capítulo](info:formdata)),
- **`response.blob()`** -- retorna a resposta como [Blob](info:blob) (dados binários com tipo),
- **`response.arrayBuffer()`** -- retorna a resposta como [ArrayBuffer](info:arraybuffer-binary-arrays) (representação de baixo nível de dados binários),
- além disso, `response.body` é um objeto [ReadableStream](https://streams.spec.whatwg.org/#rs-class) que permite ler o body pedaço por pedaço — veremos um exemplo disso mais adiante.

Por exemplo, vamos obter os commits mais recentes do GitHub em formato JSON:

````js run async
let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
let response = await fetch(url);

*!*
let commits = await response.json(); // lê o body da resposta e interpreta como JSON
*/!*

alert(commits[0].author.login);
````

Ou, o mesmo código sem `await`, usando a sintaxe de promises pura:

````js run
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));
````

Para obter o texto da resposta, use `await response.text()` em vez de `.json()`:

````js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

let text = await response.text(); // lê o body da resposta como texto

alert(text.slice(0, 80) + '...');
````

Como exemplo de leitura em formato binário, vamos buscar e exibir a logo da [especificação do "fetch"](https://fetch.spec.whatwg.org) (veja o capítulo [Blob](info:blob) para mais detalhes sobre operações com `Blob`):

````js async run
let response = await fetch('/article/fetch/logo-fetch.svg');

*!*
let blob = await response.blob(); // baixa como objeto Blob
*/!*

// cria um elemento <img> para exibi-lo
let img = document.createElement('img');
img.style = 'position:fixed;top:10px;left:10px;width:100px';
document.body.append(img);

// exibe a imagem
img.src = URL.createObjectURL(blob);

setTimeout(() => { // oculta após três segundos
  img.remove();
  URL.revokeObjectURL(img.src);
}, 3000);
````

````warn
Só podemos usar um método de leitura do body por vez.

Se já lemos o body com `response.text()`, então `response.json()` não vai funcionar, pois o body já foi consumido.

```js
let text = await response.text(); // body consumido
let parsed = await response.json(); // falha (já consumido)
```
````

## Headers de resposta

Os headers da resposta ficam disponíveis em `response.headers`, um objeto semelhante a um Map.

Não é exatamente um Map, mas possui métodos parecidos para obter headers individuais pelo nome ou para iterar sobre eles:

````js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

// obtém um cabeçalho específico
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8

// itera sobre todos os cabeçalhos
for (let [key, value] of response.headers) {
  alert(`${key} = ${value}`);
}
````

## Headers de requisição

Para definir headers na requisição com fetch, usamos a opção `headers`, passando um objeto com os headers desejados:

````js
let response = fetch(protectedUrl, {
  headers: {
    Authentication: 'secret'
  }
});
````

...Porém existe uma lista de [headers HTTP proibidos](https://fetch.spec.whatwg.org/#forbidden-header-name) que não podemos definir:

- `Accept-Charset`, `Accept-Encoding`
- `Access-Control-Request-Headers`
- `Access-Control-Request-Method`
- `Connection`
- `Content-Length`
- `Cookie`, `Cookie2`
- `Date`
- `DNT`
- `Expect`
- `Host`
- `Keep-Alive`
- `Origin`
- `Referer`
- `TE`
- `Trailer`
- `Transfer-Encoding`
- `Upgrade`
- `Via`
- `Proxy-*`
- `Sec-*`

Esses headers garantem um HTTP correto e seguro, por isso são controlados exclusivamente pelo navegador.

## Requisições POST

Para fazer uma requisição `POST`, ou qualquer outro método, precisamos usar as opções do `fetch`:

- **`method`** -- método HTTP, ex: `POST`,
- **`body`** -- o body da requisição, que pode ser:
  - uma string (ex: codificada em JSON),
  - um objeto `FormData`, para enviar os dados como `multipart/form-data`,
  - `Blob`/`BufferSource` para enviar dados binários,
  - [URLSearchParams](info:url), para enviar os dados com encoding `x-www-form-urlencoded` — pouco utilizado.

O formato JSON é o mais usado na maioria das vezes.

Por exemplo, este código envia o objeto `user` como JSON:

````js run async
let user = {
  name: 'John',
  surname: 'Smith'
};

*!*
let response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
});
*/!*

let result = await response.json();
alert(result.message);
````

Atenção: se o `body` da requisição for uma string, o header `Content-Type` é definido como `text/plain;charset=UTF-8` por padrão.

Mas como vamos enviar JSON, usamos a opção `headers` para enviar `application/json` — o `Content-Type` correto para dados codificados em JSON.

## Enviando uma imagem

Também podemos enviar dados binários com `fetch` usando objetos `Blob` ou `BufferSource`.

Neste exemplo, há um `<canvas>` onde podemos desenhar movendo o mouse sobre ele. Um clique no botão "Submit" envia a imagem ao servidor:

````html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Submit" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
      let response = await fetch('/article/fetch/post/image', {
        method: 'POST',
        body: blob
      });

      // o servidor responde com uma confirmação e o tamanho da imagem
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
````

Repare que não definimos o header `Content-Type` manualmente aqui, porque um objeto `Blob` já possui um tipo embutido (neste caso `image/png`, gerado pelo `toBlob`). Para objetos `Blob`, esse tipo se torna o valor do `Content-Type`.

A função `submit()` pode ser reescrita sem `async/await` assim:

````js
function submit() {
  canvasElem.toBlob(function(blob) {        
    fetch('/article/fetch/post/image', {
      method: 'POST',
      body: blob
    })
      .then(response => response.json())
      .then(result => alert(JSON.stringify(result, null, 2)))
  }, 'image/png');
}
````

## Resumo

Uma requisição fetch típica consiste em dois `await`:

````js
let response = await fetch(url, options); // resolve com os headers da resposta
let result = await response.json(); // lê o body como JSON
````

Ou, sem `await`:

````js
fetch(url, options)
  .then(response => response.json())
  .then(result => /* processar result */)
````

Propriedades da resposta:
- `response.status` -- código HTTP da resposta,
- `response.ok` -- `true` se o status for 200-299.
- `response.headers` -- objeto semelhante a um Map com os headers HTTP.

Métodos para ler o body da resposta:
- **`response.text()`** -- retorna a resposta como texto,
- **`response.json()`** -- interpreta a resposta como objeto JSON,
- **`response.formData()`** -- retorna a resposta como um objeto `FormData` (encoding `multipart/form-data`, veja o próximo capítulo),
- **`response.blob()`** -- retorna a resposta como um [Blob](info:blob) (dados binários com tipo),
- **`response.arrayBuffer()`** -- retorna a resposta como um [ArrayBuffer](info:arraybuffer-binary-arrays) (dados binários de baixo nível),

Opções do fetch vistas até agora:
- `method` -- método HTTP,
- `headers` -- objeto com os headers da requisição (nem todos os headers são permitidos),
- `body` -- os dados a enviar (body da requisição) como `string`, `FormData`, `BufferSource`, `Blob` ou `UrlSearchParams`.

Nos próximos capítulos veremos mais opções e casos de uso do `fetch`.