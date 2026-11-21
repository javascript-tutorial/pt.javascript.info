class Uploader {

  constructor({file, onProgress}) {
    this.file = file;
    this.onProgress = onProgress;

    // cria o fileId que identifica unicamente o arquivo
    // também poderíamos adicionar um identificador de sessão do usuário (se tivéssemos um), para deixar ainda mais único
    this.fileId = file.name + '-' + file.size + '-' + file.lastModified;
  }

  async getUploadedBytes() {
    let response = await fetch('status', {
      headers: {
        'X-File-Id': this.fileId
      }
    });

    if (response.status != 200) {
      throw new Error("Não foi possível obter os bytes enviados: " + response.statusText);
    }

    let text = await response.text();

    return +text;
  }

  async upload() {
    this.startByte = await this.getUploadedBytes();

    let xhr = this.xhr = new XMLHttpRequest();
    xhr.open("POST", "upload", true);

    // envia o id do arquivo, para que o servidor saiba qual arquivo retomar
    xhr.setRequestHeader('X-File-Id', this.fileId);
    // envia o byte a partir do qual estamos retomando, para que o servidor saiba que estamos retomando
    xhr.setRequestHeader('X-Start-Byte', this.startByte);

    xhr.upload.onprogress = (e) => {
      this.onProgress(this.startByte + e.loaded, this.startByte + e.total);
    };

    console.log("enviando o arquivo, a partir de", this.startByte);
    xhr.send(this.file.slice(this.startByte));

    // retorna
    //   true se o upload foi bem-sucedido,
    //   false se foi abortado
    // lança um erro em caso de falha
    return await new Promise((resolve, reject) => {

      xhr.onload = xhr.onerror = () => {
        console.log("status final do upload:" + xhr.status + " texto:" + xhr.statusText);

        if (xhr.status == 200) {
          resolve(true);
        } else {
          reject(new Error("Falha no upload: " + xhr.statusText));
        }
      };

      // onabort só dispara quando xhr.abort() é chamado
      xhr.onabort = () => resolve(false);

    });

  }

  stop() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

}
