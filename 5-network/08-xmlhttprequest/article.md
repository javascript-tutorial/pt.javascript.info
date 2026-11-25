# XMLHttpRequest

`XMLHttpRequest` é um objeto nativo do navegador que permite fazer requisições HTTP em JavaScript.

Apesar de ter a palavra "XML" no nome, ele pode operar com qualquer tipo de dado, não só no formato XML. Podemos fazer upload/download de arquivos, acompanhar o progresso e muito mais.

Atualmente, existe outro método mais moderno, `fetch`, que de certa forma torna o `XMLHttpRequest` obsoleto.

No desenvolvimento web moderno, `XMLHttpRequest` é usado por três motivos:

1. Motivos históricos: precisamos dar suporte a scripts já existentes com `XMLHttpRequest`.
2. Precisamos dar suporte a navegadores antigos, e não queremos polyfills (por exemplo, para manter os scripts pequenos).
3. Precisamos de algo que `fetch` ainda não consegue fazer, por exemplo, acompanhar o progresso de upload.

Isso soa familiar? Se sim, tudo bem, continue com `XMLHttpRequest`. Caso contrário, siga para <info:fetch>.

## O básico

O XMLHttpRequest tem dois modos de operação: síncrono e assíncrono.

Vamos ver o assíncrono primeiro, já que é usado na maioria dos casos.

Para fazer a requisição, precisamos de 3 passos:

1. Criar o `XMLHttpRequest`:
    ```js
    let xhr = new XMLHttpRequest();
    ```
    O construtor não tem argumentos.

2. Inicializá-lo, geralmente logo após `new XMLHttpRequest`:
    ```js
    xhr.open(method, URL, [async, user, password])
    ```

    Esse método especifica os principais parâmetros da requisição:

    - `method` -- método HTTP. Geralmente `"GET"` ou `"POST"`.
    - `URL` -- a URL a ser requisitada, uma string, pode ser um objeto [URL](info:url).
    - `async` -- se definido explicitamente como `false`, então a requisição é síncrona, vamos abordar isso um pouco mais tarde.
    - `user`, `password` -- login e senha para autenticação HTTP básica (se exigido).

    Observe que a chamada `open`, ao contrário do seu nome, não abre a conexão. Ela só configura a requisição, mas a atividade de rede só começa com a chamada de `send`.

3. Enviá-lo.

    ```js
    xhr.send([body])
    ```

    Esse método abre a conexão e envia a requisição ao servidor. O parâmetro opcional `body` contém o corpo da requisição.

    Alguns métodos de requisição como `GET` não têm corpo. E alguns deles como `POST` usam `body` para enviar os dados ao servidor. Vamos ver exemplos disso mais tarde.

4. Escutar os eventos de `xhr` para a resposta.

    Estes três eventos são os mais amplamente usados:
    - `load` -- quando a requisição está completa (mesmo que o status HTTP seja algo como 400 ou 500), e a resposta é totalmente baixada.
    - `error` -- quando a requisição não pôde ser feita, por exemplo, rede fora do ar ou URL inválida.
    - `progress` -- dispara periodicamente enquanto a resposta está sendo baixada, informa quanto já foi baixado.

    ```js
    xhr.onload = function() {
      alert(`Loaded: ${xhr.status} ${xhr.response}`);
    };

    xhr.onerror = function() { // só dispara se a requisição não pôde ser feita de forma alguma
      alert(`Network Error`);
    };

    xhr.onprogress = function(event) { // dispara periodicamente
      // event.loaded - quantos bytes foram baixados
      // event.lengthComputable = true se o servidor enviou o cabeçalho Content-Length
      // event.total - número total de bytes (se lengthComputable)
      alert(`Received ${event.loaded} of ${event.total}`);
    };
    ```

Aqui está um exemplo completo. O código abaixo carrega a URL em `/article/xmlhttprequest/example/load` a partir do servidor e exibe o progresso:

```js run
// 1. Cria um novo objeto XMLHttpRequest
let xhr = new XMLHttpRequest();

// 2. Configura: requisição GET para a URL /article/.../load
xhr.open('GET', '/article/xmlhttprequest/example/load');

// 3. Envia a requisição pela rede
xhr.send();

// 4. Isso vai ser chamado depois que a resposta for recebida
xhr.onload = function() {
  if (xhr.status != 200) { // analisa o status HTTP da resposta
    alert(`Error ${xhr.status}: ${xhr.statusText}`); // por exemplo, 404: Not Found
  } else { // mostra o resultado
    alert(`Done, got ${xhr.response.length} bytes`); // response é a resposta do servidor
  }
};

xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    alert(`Received ${event.loaded} of ${event.total} bytes`);
  } else {
    alert(`Received ${event.loaded} bytes`); // sem Content-Length
  }

};

xhr.onerror = function() {
  alert("Request failed");
};
```

Assim que o servidor responder, podemos receber o resultado nas seguintes propriedades de `xhr`:

`status`
: Código de status HTTP (um número): `200`, `404`, `403` e assim por diante, pode ser `0` no caso de uma falha não HTTP.

`statusText`
: Mensagem de status HTTP (uma string): geralmente `OK` para `200`, `Not Found` para `404`, `Forbidden` para `403` e assim por diante.

`response` (scripts antigos podem usar `responseText`)
: O corpo da resposta do servidor.

Também podemos especificar um timeout usando a propriedade correspondente:

```js
xhr.timeout = 10000; // timeout em ms, 10 segundos
```

Se a requisição não tiver sucesso dentro do tempo dado, ela é cancelada e o evento `timeout` dispara.

````smart header="Parâmetros de busca da URL"
Para adicionar parâmetros à URL, como `?name=value`, e garantir a codificação adequada, podemos usar o objeto [URL](info:url):

```js
let url = new URL('https://google.com/search');
url.searchParams.set('q', 'test me!');

// o parâmetro 'q' é codificado
xhr.open('GET', url); // https://google.com/search?q=test+me%21
```

````

## Tipo de resposta

Podemos usar a propriedade `xhr.responseType` para definir o formato da resposta:

- `""` (padrão) -- obtém como string,
- `"text"` -- obtém como string,
- `"arraybuffer"` -- obtém como `ArrayBuffer` (para dados binários, veja o capítulo <info:arraybuffer-binary-arrays>),
- `"blob"` -- obtém como `Blob` (para dados binários, veja o capítulo <info:blob>),
- `"document"` -- obtém como documento XML (pode usar XPath e outros métodos XML) ou documento HTML (baseado no tipo MIME dos dados recebidos),
- `"json"` -- obtém como JSON (analisado automaticamente).

Por exemplo, vamos obter a resposta como JSON:

```js run
let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/example/json');

*!*
xhr.responseType = 'json';
*/!*

xhr.send();

// a resposta é {"message": "Hello, world!"}
xhr.onload = function() {
  let responseObj = xhr.response;
  alert(responseObj.message); // Hello, world!
};
```

```smart
Nos scripts antigos você também pode encontrar as propriedades `xhr.responseText` e até `xhr.responseXML`.

Elas existem por motivos históricos, para obter uma string ou um documento XML. Hoje em dia, devemos definir o formato em `xhr.responseType` e obter `xhr.response` como demonstrado acima.
```

## Estados de prontidão

`XMLHttpRequest` muda entre estados conforme avança. O estado atual é acessível como `xhr.readyState`.

Todos os estados, como [na especificação](https://xhr.spec.whatwg.org/#states):

```js
UNSENT = 0; // estado inicial
OPENED = 1; // open foi chamado
HEADERS_RECEIVED = 2; // cabeçalhos da resposta recebidos
LOADING = 3; // a resposta está carregando (um pacote de dados foi recebido)
DONE = 4; // requisição completa
```

Um objeto `XMLHttpRequest` os percorre na ordem `0` -> `1` -> `2` -> `3` -> ... -> `3` -> `4`. O estado `3` se repete toda vez que um pacote de dados é recebido pela rede.

Podemos acompanhá-los usando o evento `readystatechange`:

```js
xhr.onreadystatechange = function() {
  if (xhr.readyState == 3) {
    // carregando
  }
  if (xhr.readyState == 4) {
    // requisição terminada
  }
};
```

Você pode encontrar ouvintes de `readystatechange` em código bem antigo, ele está lá por motivos históricos, já que houve um tempo em que não existiam os eventos `load` e outros. Hoje em dia, os tratadores `load/error/progress` o tornam obsoleto.

## Abortando a requisição

Podemos terminar a requisição a qualquer momento. A chamada a `xhr.abort()` faz isso:

```js
xhr.abort(); // termina a requisição
```

Isso dispara o evento `abort`, e `xhr.status` se torna `0`.

## Requisições síncronas

Se no método `open` o terceiro parâmetro `async` for definido como `false`, a requisição é feita de forma síncrona.

Em outras palavras, a execução do JavaScript pausa em `send()` e retoma quando a resposta é recebida. De certa forma, como os comandos `alert` ou `prompt`.

Aqui está o exemplo reescrito, o 3º parâmetro de `open` é `false`:

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/hello.txt', *!*false*/!*);

try {
  xhr.send();
  if (xhr.status != 200) {
    alert(`Error ${xhr.status}: ${xhr.statusText}`);
  } else {
    alert(xhr.response);
  }
} catch(err) { // em vez de onerror
  alert("Request failed");
}
```

Isso pode parecer bom, mas chamadas síncronas são usadas raramente, porque bloqueiam o JavaScript da página até o carregamento terminar. Em alguns navegadores fica impossível rolar a página. Se uma chamada síncrona demorar muito tempo, o navegador pode sugerir fechar a página web "travada".

Muitas capacidades avançadas de `XMLHttpRequest`, como requisitar de outro domínio ou especificar um timeout, estão indisponíveis para requisições síncronas. Além disso, como você pode ver, nenhuma indicação de progresso.

Por causa de tudo isso, requisições síncronas são usadas muito raramente, quase nunca. Não vamos mais falar sobre elas.

## Cabeçalhos HTTP

`XMLHttpRequest` permite tanto enviar cabeçalhos personalizados quanto ler cabeçalhos da resposta.

Existem 3 métodos para cabeçalhos HTTP:

`setRequestHeader(name, value)`
: Define o cabeçalho da requisição com o `name` e `value` dados.

    Por exemplo:

    ```js
    xhr.setRequestHeader('Content-Type', 'application/json');
    ```

    ```warn header="Limitações de cabeçalhos"
    Vários cabeçalhos são gerenciados exclusivamente pelo navegador, por exemplo, `Referer` e `Host`.
    A lista completa está [na especificação](https://xhr.spec.whatwg.org/#the-setrequestheader()-method).

    `XMLHttpRequest` não tem permissão para alterá-los, em prol da segurança do usuário e da correção da requisição.
    ```

    ````warn header="Não é possível remover um cabeçalho"
    Outra peculiaridade de `XMLHttpRequest` é que não é possível desfazer `setRequestHeader`.

    Uma vez que o cabeçalho é definido, ele está definido. Chamadas adicionais acrescentam informação ao cabeçalho, não o sobrescrevem.

    Por exemplo:

    ```js
    xhr.setRequestHeader('X-Auth', '123');
    xhr.setRequestHeader('X-Auth', '456');

    // o cabeçalho vai ser:
    // X-Auth: 123, 456
    ```
    ````

`getResponseHeader(name)`
: Obtém o cabeçalho da resposta com o `name` dado (exceto `Set-Cookie` e `Set-Cookie2`).

    Por exemplo:

    ```js
    xhr.getResponseHeader('Content-Type')
    ```

`getAllResponseHeaders()`
: Retorna todos os cabeçalhos da resposta, exceto `Set-Cookie` e `Set-Cookie2`.

    Os cabeçalhos são retornados numa única linha, por exemplo:

    ```http
    Cache-Control: max-age=31536000
    Content-Length: 4260
    Content-Type: image/png
    Date: Sat, 08 Sep 2012 16:53:16 GMT
    ```

    A quebra de linha entre os cabeçalhos é sempre `"\r\n"` (não depende do SO), então podemos facilmente dividi-la em cabeçalhos individuais. O separador entre o nome e o valor é sempre dois-pontos seguido de um espaço `": "`. Isso é fixo na especificação.

    Então, se quisermos obter um objeto com pares nome/valor, precisamos usar um pouco de JS.

    Assim (assumindo que se dois cabeçalhos tiverem o mesmo nome, então o último sobrescreve o anterior):

    ```js
    let headers = xhr
      .getAllResponseHeaders()
      .split('\r\n')
      .reduce((result, current) => {
        let [name, value] = current.split(': ');
        result[name] = value;
        return result;
      }, {});

    // headers['Content-Type'] = 'image/png'
    ```

## POST, FormData

Para fazer uma requisição POST, podemos usar o objeto nativo [FormData](mdn:api/FormData).

A sintaxe:

```js
let formData = new FormData([form]); // cria um objeto, opcionalmente preenchido a partir de <form>
formData.append(name, value); // adiciona um campo
```

Nós o criamos, opcionalmente preenchemos a partir de um formulário, usamos `append` para mais campos se necessário, e então:

1. `xhr.open('POST', ...)` – usa o método `POST`.
2. `xhr.send(formData)` para enviar o formulário ao servidor.

Por exemplo:

```html run refresh
<form name="person">
  <input name="name" value="John">
  <input name="surname" value="Smith">
</form>

<script>
  // pré-preenche o FormData a partir do formulário
  let formData = new FormData(document.forms.person);

  // adiciona mais um campo
  formData.append("middle", "Lee");

  // envia
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/article/xmlhttprequest/post/user");
  xhr.send(formData);

  xhr.onload = () => alert(xhr.response);
</script>
```

O formulário é enviado com a codificação `multipart/form-data`.

Ou, se preferirmos JSON, então `JSON.stringify` e enviamos como uma string.

Só não esqueça de definir o cabeçalho `Content-Type: application/json`, muitos frameworks do lado do servidor decodificam JSON automaticamente com ele:

```js
let xhr = new XMLHttpRequest();

let json = JSON.stringify({
  name: "John",
  surname: "Smith"
});

xhr.open("POST", '/submit')
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

xhr.send(json);
```

O método `.send(body)` é bem onívoro. Ele pode enviar quase qualquer `body`, incluindo objetos `Blob` e `BufferSource`.

## Progresso de upload

O evento `progress` só dispara no estágio de download.

Ou seja: se fizermos um `POST` de algo, `XMLHttpRequest` primeiro envia nossos dados (o corpo da requisição), depois baixa a resposta.

Se estivermos enviando algo grande, então certamente estamos mais interessados em acompanhar o progresso do upload. Mas `xhr.onprogress` não ajuda aqui.

Existe outro objeto, sem métodos, exclusivamente para acompanhar eventos de upload: `xhr.upload`.

Ele gera eventos, parecidos com `xhr`, mas `xhr.upload` os dispara exclusivamente durante o upload:

- `loadstart` -- upload iniciado.
- `progress` -- dispara periodicamente durante o upload.
- `abort` -- upload abortado.
- `error` -- erro não HTTP.
- `load` -- upload terminado com sucesso.
- `timeout` -- upload expirou (se a propriedade `timeout` estiver definida).
- `loadend` -- upload terminado com sucesso ou erro.

Exemplo de tratadores:

```js
xhr.upload.onprogress = function(event) {
  alert(`Uploaded ${event.loaded} of ${event.total} bytes`);
};

xhr.upload.onload = function() {
  alert(`Upload finished successfully.`);
};

xhr.upload.onerror = function() {
  alert(`Error during the upload: ${xhr.status}`);
};
```

Aqui está um exemplo da vida real: upload de arquivo com indicação de progresso:

```html run
<input type="file" onchange="upload(this.files[0])">

<script>
function upload(file) {
  let xhr = new XMLHttpRequest();

  // acompanha o progresso do upload
*!*
  xhr.upload.onprogress = function(event) {
    console.log(`Uploaded ${event.loaded} of ${event.total}`);
  };
*/!*

  // acompanha a conclusão: bem-sucedida ou não
  xhr.onloadend = function() {
    if (xhr.status == 200) {
      console.log("success");
    } else {
      console.log("error " + this.status);
    }
  };

  xhr.open("POST", "/article/xmlhttprequest/post/upload");
  xhr.send(file);
}
</script>
```

## Requisições cross-origin

`XMLHttpRequest` pode fazer requisições cross-origin, usando a mesma política CORS que o [fetch](info:fetch-crossorigin).

Assim como `fetch`, ele não envia cookies e autenticação HTTP para outra origem por padrão. Para habilitá-los, defina `xhr.withCredentials` como `true`:

```js
let xhr = new XMLHttpRequest();
*!*
xhr.withCredentials = true;
*/!*

xhr.open('POST', 'http://anywhere.com/request');
...
```

Veja o capítulo <info:fetch-crossorigin> para detalhes sobre cabeçalhos cross-origin.


## Resumo

Código típico de uma requisição GET com `XMLHttpRequest`:

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/my/url');

xhr.send();

xhr.onload = function() {
  if (xhr.status != 200) { // erro HTTP?
    // trata o erro
    alert( 'Error: ' + xhr.status);
    return;
  }

  // obtém a resposta de xhr.response
};

xhr.onprogress = function(event) {
  // informa o progresso
  alert(`Loaded ${event.loaded} of ${event.total}`);
};

xhr.onerror = function() {
  // trata erro não HTTP (por exemplo, rede fora do ar)
};
```

Na verdade, existem mais eventos, a [especificação moderna](https://xhr.spec.whatwg.org/#events) os lista (na ordem do ciclo de vida):

- `loadstart` -- a requisição começou.
- `progress` -- um pacote de dados da resposta chegou, o corpo inteiro da resposta no momento está em `response`.
- `abort` -- a requisição foi cancelada pela chamada `xhr.abort()`.
- `error` -- ocorreu um erro de conexão, por exemplo, nome de domínio errado. Não acontece para erros HTTP como 404.
- `load` -- a requisição terminou com sucesso.
- `timeout` -- a requisição foi cancelada por causa de timeout (só acontece se ele foi definido).
- `loadend` -- dispara depois de `load`, `error`, `timeout` ou `abort`.

Os eventos `error`, `abort`, `timeout` e `load` são mutuamente exclusivos. Só um deles pode acontecer.

Os eventos mais usados são conclusão do carregamento (`load`), falha no carregamento (`error`), ou podemos usar um único tratador `loadend` e checar as propriedades do objeto de requisição `xhr` para ver o que aconteceu.

Já vimos outro evento: `readystatechange`. Historicamente, ele apareceu há muito tempo, antes da especificação se estabelecer. Hoje em dia, não há necessidade de usá-lo, podemos substituí-lo por eventos mais novos, mas ele costuma ser encontrado em scripts mais antigos.

Se precisarmos acompanhar o upload especificamente, então devemos escutar os mesmos eventos no objeto `xhr.upload`.
