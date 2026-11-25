
# FormData

Este capítulo é sobre o envio de formulários HTML: com ou sem arquivos, com campos adicionais e assim por diante.

Objetos [FormData](https://xhr.spec.whatwg.org/#interface-formdata) podem ajudar com isso. Como você deve ter imaginado, é o objeto que representa os dados de um formulário HTML.

O construtor é:
```js
let formData = new FormData([form]);
```

Se o elemento HTML `form` for fornecido, ele captura automaticamente seus campos.

O que torna o `FormData` especial é que métodos de rede, como `fetch`, podem aceitar um objeto `FormData` como corpo. Ele é codificado e enviado com `Content-Type: multipart/form-data`.

Do ponto de vista do servidor, isso se parece com um envio de formulário comum.

## Enviando um formulário simples

Vamos enviar um formulário simples primeiro.

Como você pode ver, isso é quase uma linha só:

```html run autorun
<form id="formElem">
  <input type="text" name="name" value="John">
  <input type="text" name="surname" value="Smith">
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/article/formdata/post/user', {
      method: 'POST',
*!*
      body: new FormData(formElem)
*/!*
    });

    let result = await response.json();

    alert(result.message);
  };
</script>
```

Neste exemplo, o código do servidor não é apresentado, já que está fora do nosso escopo. O servidor aceita a requisição POST e responde "Usuário salvo".

## Métodos de FormData

Podemos modificar campos em `FormData` com métodos:

- `formData.append(name, value)` - adiciona um campo de formulário com o `name` e `value` dados,
- `formData.append(name, blob, fileName)` - adiciona um campo como se fosse `<input type="file">`, o terceiro argumento `fileName` define o nome do arquivo (não o nome do campo do formulário), como se fosse o nome do arquivo no sistema de arquivos do usuário,
- `formData.delete(name)` - remove o campo com o `name` dado,
- `formData.get(name)` - obtém o valor do campo com o `name` dado,
- `formData.has(name)` - se existir um campo com o `name` dado, retorna `true`, caso contrário `false`

Um formulário é tecnicamente autorizado a ter vários campos com o mesmo `name`, então várias chamadas a `append` adicionam mais campos com o mesmo nome.

Também existe o método `set`, com a mesma sintaxe de `append`. A diferença é que `.set` remove todos os campos com o `name` dado, e então adiciona um novo campo. Então ele garante que existe só um campo com esse `name`, o resto é igual a `append`:

- `formData.set(name, value)`,
- `formData.set(name, blob, fileName)`.

Também podemos iterar sobre os campos de formData usando o laço `for..of`:

```js run
let formData = new FormData();
formData.append('key1', 'value1');
formData.append('key2', 'value2');

// Lista os pares chave/valor
for(let [name, value] of formData) {
  alert(`${name} = ${value}`); // key1 = value1, depois key2 = value2
}
```

## Enviando um formulário com um arquivo

O formulário é sempre enviado como `Content-Type: multipart/form-data`, essa codificação permite enviar arquivos. Então, campos `<input type="file">` também são enviados, de forma parecida com um envio de formulário comum.

Aqui está um exemplo com um formulário desse tipo:

```html run autorun
<form id="formElem">
  <input type="text" name="firstName" value="John">
  Foto: <input type="file" name="picture" accept="image/*">
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/article/formdata/post/user-avatar', {
      method: 'POST',
*!*
      body: new FormData(formElem)
*/!*
    });

    let result = await response.json();

    alert(result.message);
  };
</script>
```

## Enviando um formulário com dados Blob

Como vimos no capítulo <info:fetch>, é fácil enviar dados binários gerados dinamicamente, por exemplo, uma imagem, como `Blob`. Podemos fornecê-lo diretamente como o parâmetro `body` do `fetch`.

Na prática, porém, geralmente é conveniente enviar uma imagem não separadamente, mas como parte do formulário, com campos adicionais, como "nome" e outros metadados.

Além disso, os servidores costumam estar mais preparados para aceitar formulários codificados como multipart, em vez de dados binários crus.

Este exemplo envia uma imagem de um `<canvas>`, junto com alguns outros campos, como um formulário, usando `FormData`:

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Enviar" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let imageBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

*!*
      let formData = new FormData();
      formData.append("firstName", "John");
      formData.append("image", imageBlob, "image.png");
*/!*    

      let response = await fetch('/article/formdata/post/image-form', {
        method: 'POST',
        body: formData
      });
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

Observe como o `Blob` da imagem é adicionado:

```js
formData.append("image", imageBlob, "image.png");
```

Isso é o mesmo que se existisse `<input type="file" name="image">` no formulário, e o visitante tivesse enviado um arquivo chamado `"image.png"` (3º argumento) com os dados `imageBlob` (2º argumento) a partir do sistema de arquivos dele.

O servidor lê os dados do formulário e o arquivo, como se fosse um envio de formulário comum.

## Resumo

Objetos [FormData](https://xhr.spec.whatwg.org/#interface-formdata) são usados para capturar um formulário HTML e enviá-lo usando `fetch` ou outro método de rede.

Podemos tanto criar `new FormData(form)` a partir de um formulário HTML, quanto criar um objeto sem nenhum formulário, e então adicionar campos com métodos:

- `formData.append(name, value)`
- `formData.append(name, blob, fileName)`
- `formData.set(name, value)`
- `formData.set(name, blob, fileName)`

Vamos notar duas peculiaridades aqui:

1. O método `set` remove campos com o mesmo nome, `append` não. Essa é a única diferença entre eles.
2. Para enviar um arquivo, a sintaxe de 3 argumentos é necessária, o último argumento é um nome de arquivo, que normalmente é obtido do sistema de arquivos do usuário para `<input type="file">`.

Outros métodos são:

- `formData.delete(name)`
- `formData.get(name)`
- `formData.has(name)`

É isso!
