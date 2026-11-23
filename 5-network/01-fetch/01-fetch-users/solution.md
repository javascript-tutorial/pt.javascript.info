
Para buscar um usuário, precisamos de algo assim: `fetch('https://api.github.com/users/USERNAME')`.

Se a resposta tiver status `200`, chamamos `.json()` para ler o objeto JS.

Caso contrário, se o `fetch` falhar ou a resposta tiver um status diferente de 200, simplesmente retornamos `null` na lista (array) resultante.

Aqui está o código:

```js demo
async function getUsers(names) {
  let jobs = [];

  for(let name of names) {
    let job = fetch(`https://api.github.com/users/${name}`).then(
      successResponse => {
        if (successResponse.status != 200) {
          return null;
        } else {
          return successResponse.json();
        }
      },
      failResponse => {
        return null;
      }
    );
    jobs.push(job);
  }

  let results = await Promise.all(jobs);

  return results;
}
```

Atenção: Repare que a chamada `.then` está encadeada diretamente no `fetch` — assim, ao receber a resposta, ela não espera pelos outros fetches e já começa a ler o `.json()` imediatamente.

Se usássemos `await Promise.all(names.map(name => fetch(...)))` e chamássemos `.json()` nos resultados depois, teríamos que esperar que todos os fetches respondessem primeiro. Ao encadear `.json()` diretamente em cada `fetch`, garantimos que cada requisição começa a processar os dados como JSON de forma independente, sem esperar pelas demais.

Esse é um exemplo de como a API de baixo nível de Promises ainda pode ser muito útil, mesmo quando usamos `async/await` na maior parte do tempo.