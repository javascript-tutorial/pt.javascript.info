// Enviando mensagens, um POST simples
function PublishForm(form, url) {

  function sendMessage(message) {
    fetch(url, {
      method: 'POST',
      body: message
    });
  }

  form.onsubmit = function() {
    let message = form.message.value;
    if (message) {
      form.message.value = '';
      sendMessage(message);
    }
    return false;
  };
}

// Recebendo mensagens com long polling
function SubscribePane(elem, url) {

  function showMessage(message) {
    let messageElem = document.createElement('div');
    messageElem.append(message);
    elem.append(messageElem);
  }

  async function subscribe() {
    let response = await fetch(url);

    if (response.status == 502) {
      // Timeout de conexão
      // acontece quando a conexão ficou pendente por tempo demais
      // vamos reconectar
      await subscribe();
    } else if (response.status != 200) {
      // Mostra o erro
      showMessage(response.statusText);
      // Reconecta em um segundo
      await new Promise(resolve => setTimeout(resolve, 1000));
      await subscribe();
    } else {
      // Mensagem recebida
      let message = await response.text();
      showMessage(message);
      await subscribe();
    }
  }

  subscribe();

}
