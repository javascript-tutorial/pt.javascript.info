
Não tem nenhum truque aqui. Só substitua o `.catch` por `try..catch` dentro de `demoGithubUser` e adicione `async/await` onde for necessário:

```js run
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

// Pede um nome de usuário até o github retornar um usuário válido
async function demoGithubUser() {

  let user;
  while(true) {
    let name = prompt("Digite um nome:", "iliakan");

    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break; // sem erro, sai do laço
    } catch(err) {
      if (err instanceof HttpError && err.response.status == 404) {
        // o laço continua depois do alert
        alert("Esse usuário não existe, digite de novo.");
      } else {
        // erro desconhecido, relança
        throw err;
      }
    }      
  }


  alert(`Nome completo: ${user.name}.`);
  return user;
}

demoGithubUser();
```
