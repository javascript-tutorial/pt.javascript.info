
# Reescreva o "relançamento" com async/await

Abaixo você pode encontrar o exemplo de "relançamento". Reescreva-o usando `async/await` em vez de `.then/catch`.

E se livre da recursão, usando um laço em `demoGithubUser`: com `async/await` isso fica fácil de fazer.

```js run
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    });
}

// Pede um nome de usuário até o github retornar um usuário válido
function demoGithubUser() {
  let name = prompt("Digite um nome:", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`Nome completo: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("Esse usuário não existe, digite de novo.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```
