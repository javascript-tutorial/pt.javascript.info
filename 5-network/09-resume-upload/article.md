# Resumable file upload

Com o método `fetch` é bem fácil fazer upload de um arquivo.

Como retomar o upload depois de perder a conexão? Não existe nenhuma opção nativa para isso, mas temos as peças para implementá-lo.

Uploads retomáveis devem vir com indicação de progresso de upload, já que esperamos arquivos grandes (se é que podemos precisar retomar). Então, como `fetch` não permite acompanhar o progresso de upload, vamos usar o [XMLHttpRequest](info:xmlhttprequest).

## O evento de progresso nem tão útil assim

Para retomar o upload, precisamos saber quanto foi enviado até a conexão ser perdida.

Existe o `xhr.upload.onprogress` para acompanhar o progresso de upload.

Infelizmente, isso não vai nos ajudar a retomar o upload aqui, já que ele dispara quando os dados são *enviados*, mas será que eles foram recebidos pelo servidor? O navegador não sabe.

Talvez tenham sido colocados em buffer por um proxy de rede local, ou talvez o processo do servidor remoto tenha simplesmente morrido e não conseguido processá-los, ou foram simplesmente perdidos no meio do caminho e não chegaram ao destinatário.

É por isso que esse evento só é útil para mostrar uma boa barra de progresso.

Para retomar o upload, precisamos saber *exatamente* o número de bytes recebidos pelo servidor. E só o servidor pode dizer isso, então vamos fazer uma requisição adicional.

## Algoritmo

1. Primeiro, cria um id de arquivo, para identificar unicamente o arquivo que vamos enviar:
    ```js
    let fileId = file.name + '-' + file.size + '-' + file.lastModified;
    ```
    Isso é necessário para retomar o upload, para dizer ao servidor o que estamos retomando.

    Se o nome, ou o tamanho, ou a data da última modificação mudar, então vai existir outro `fileId`.

2. Envia uma requisição ao servidor, perguntando quantos bytes ele já tem, assim:
    ```js
    let response = await fetch('status', {
      headers: {
        'X-File-Id': fileId
      }
    });

    // O servidor tem essa quantidade de bytes
    let startByte = +await response.text();
    ```

    Isso assume que o servidor rastreia uploads de arquivos pelo cabeçalho `X-File-Id`. Deve ser implementado do lado do servidor.

    Se o arquivo ainda não existir no servidor, então a resposta do servidor deve ser `0`

3. Então, podemos usar o método `slice` de `Blob` para enviar o arquivo a partir de `startByte`:
    ```js
    xhr.open("POST", "upload");

    // Id do arquivo, para que o servidor saiba qual arquivo estamos enviando
    xhr.setRequestHeader('X-File-Id', fileId);

    // O byte a partir do qual estamos retomando, para que o servidor saiba que estamos retomando
    xhr.setRequestHeader('X-Start-Byte', startByte);

    xhr.upload.onprogress = (e) => {
      console.log(`Uploaded ${startByte + e.loaded} of ${startByte + e.total}`);
    };

    // o arquivo pode vir de input.files[0] ou outra fonte
    xhr.send(file.slice(startByte));
    ```

    Aqui enviamos ao servidor tanto o id do arquivo como `X-File-Id`, para que ele saiba qual arquivo estamos enviando, quanto o byte inicial como `X-Start-Byte`, para que ele saiba que não estamos enviando pela primeira vez, mas retomando.

    O servidor deve checar seus registros, e se já houve um upload desse arquivo, e o tamanho atualmente enviado é exatamente `X-Start-Byte`, então acrescentar os dados a ele.


Aqui está a demo com o código tanto do cliente quanto do servidor, escrita em Node.js.

Ela funciona só parcialmente neste site, já que o Node.js está atrás de outro servidor chamado Nginx, que coloca os uploads em buffer, passando-os para o Node.js quando totalmente completos.

Mas você pode baixá-la e rodar localmente para a demonstração completa:

[codetabs src="upload-resume" height=200]

Como podemos ver, os métodos de rede modernos estão próximos de gerenciadores de arquivos em suas capacidades -- controle sobre cabeçalhos, indicador de progresso, envio de partes do arquivo, etc.

Podemos implementar upload retomável e muito mais.
