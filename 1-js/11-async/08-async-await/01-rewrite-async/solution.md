
As notas estão abaixo do código:

```js run
async function loadJson(url) { // (1)
  let response = await fetch(url); // (2)

  if (response.status == 200) {
    let json = await response.json(); // (3)
    return json;
  }

  throw new Error(response.status);
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404 (4)
```

Notas:

1. A função `loadJson` se torna `async`.
2. Todos os `.then` dentro dela são substituídos por `await`.
3. Podemos fazer `return response.json()` em vez de esperar por ele com `await`, assim:

    ```js
    if (response.status == 200) {
      return response.json(); // (3)
    }
    ```

    Então o código externo teria que usar `await` para essa promessa ser resolvida. No nosso caso, não faz diferença.
4. O erro lançado por `loadJson` é tratado pelo `.catch`. Não podemos usar `await loadJson(…)` ali, porque não estamos dentro de uma função `async`.
