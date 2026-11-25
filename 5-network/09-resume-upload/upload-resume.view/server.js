let http = require('http');
let static = require('node-static');
let fileServer = new static.Server('.');
let path = require('path');
let fs = require('fs');
let debug = require('debug')('example:resume-upload');

let uploads = Object.create(null);

function onUpload(req, res) {

  let fileId = req.headers['x-file-id'];
  let startByte = +req.headers['x-start-byte'];

  if (!fileId) {
    res.writeHead(400, "Sem id de arquivo");
    res.end();
  }

  // vamos "descartar" os arquivos
  let filePath = '/dev/null';
  // poderíamos usar um caminho real em vez disso, por exemplo
  // let filePath = path.join('/tmp', fileId);

  debug("onUpload fileId: ", fileId);

  // inicializa um novo upload
  if (!uploads[fileId]) uploads[fileId] = {};
  let upload = uploads[fileId];

  debug("bytesReceived:" + upload.bytesReceived + " startByte:" + startByte)

  let fileStream;

  // se startByte for 0 ou não estiver definido, cria um novo arquivo, caso contrário checa o tamanho e acrescenta ao existente
  if (!startByte) {
    upload.bytesReceived = 0;
    fileStream = fs.createWriteStream(filePath, {
      flags: 'w'
    });
    debug("Novo arquivo criado: " + filePath);
  } else {
    // também podemos checar o tamanho do arquivo em disco para ter certeza
    if (upload.bytesReceived != startByte) {
      res.writeHead(400, "Byte inicial incorreto");
      res.end(upload.bytesReceived);
      return;
    }
    // acrescenta ao arquivo existente
    fileStream = fs.createWriteStream(filePath, {
      flags: 'a'
    });
    debug("Arquivo reaberto: " + filePath);
  }


  req.on('data', function(data) {
    debug("bytes recebidos", upload.bytesReceived);
    upload.bytesReceived += data.length;
  });

  // envia o corpo da requisição para o arquivo
  req.pipe(fileStream);

  // quando a requisição termina, e todos os seus dados são escritos
  fileStream.on('close', function() {
    if (upload.bytesReceived == req.headers['x-file-size']) {
      debug("Upload concluído");
      delete uploads[fileId];

      // podemos fazer outra coisa com o arquivo enviado aqui

      res.end("Sucesso " + upload.bytesReceived);
    } else {
      // conexão perdida, deixamos o arquivo inacabado por aí
      debug("Arquivo incompleto, parou em " + upload.bytesReceived);
      res.end();
    }
  });

  // em caso de erro de I/O - termina a requisição
  fileStream.on('error', function(err) {
    debug("erro no fileStream");
    res.writeHead(500, "Erro de arquivo");
    res.end();
  });

}

function onStatus(req, res) {
  let fileId = req.headers['x-file-id'];
  let upload = uploads[fileId];
  debug("onStatus fileId:", fileId, " upload:", upload);
  if (!upload) {
    res.end("0")
  } else {
    res.end(String(upload.bytesReceived));
  }
}


function accept(req, res) {
  if (req.url == '/status') {
    onStatus(req, res);
  } else if (req.url == '/upload' && req.method == 'POST') {
    onUpload(req, res);
  } else {
    fileServer.serve(req, res);
  }

}




// -----------------------------------

if (!module.parent) {
  http.createServer(accept).listen(8080);
  console.log('Servidor escutando na porta 8080');
} else {
  exports.accept = accept;
}
