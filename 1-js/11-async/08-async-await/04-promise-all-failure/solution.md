
A raiz do problema é que o `Promise.all` rejeita imediatamente quando uma das suas promessas é rejeitada, mas ele não faz nada para cancelar as outras promessas.

No nosso caso, a segunda consulta falha, então o `Promise.all` rejeita, e o bloco `try...catch` captura esse erro. Enquanto isso, as outras promessas *não são afetadas* - elas continuam a execução de forma independente. No nosso caso, a terceira consulta lança um erro próprio depois de um tempo. E esse erro nunca é capturado, podemos ver isso no console.

O problema é especialmente perigoso em ambientes do lado do servidor, como o Node.js, quando um erro não capturado pode fazer o processo ser encerrado.

Como corrigir isso?

Uma solução ideal seria cancelar todas as consultas não finalizadas quando uma delas falha. Dessa forma, evitamos qualquer erro em potencial.

Porém, a má notícia é que chamadas de serviço (como `database.query`) são frequentemente implementadas por uma biblioteca de terceiros que não suporta cancelamento. Nesse caso, não há como cancelar uma chamada.

Como alternativa, podemos escrever nossa própria função que envolve o `Promise.all` e adiciona um tratador `then/catch` personalizado a cada promessa para rastreá-las: os resultados são reunidos e, se ocorrer um erro, todas as promessas seguintes são ignoradas.

```js
function customPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let resultsCount = 0;
    let hasError = false; // vamos deixar true no primeiro erro

    promises.forEach((promise, index) => {
      promise
        .then(result => {
          if (hasError) return; // ignora a promessa se já deu erro
          results[index] = result;
          resultsCount++;
          if (resultsCount === promises.length) {
            resolve(results); // quando todos os resultados estão prontos - sucesso
          }
        })
        .catch(error => {
          if (hasError) return; // ignora a promessa se já deu erro
          hasError = true; // opa, erro!
          reject(error); // falha com rejeição
        });
    });
  });
}
```

Essa abordagem tem um problema próprio - geralmente não é desejável fazer `disconnect()` enquanto as consultas ainda estão em andamento.

Pode ser importante que todas as consultas se completem, especialmente se algumas delas fazem atualizações importantes.

Então deveríamos esperar até que todas as promessas sejam estabelecidas antes de seguir com a execução e, por fim, desconectar.

Aqui está outra implementação. Ela se comporta de forma parecida com o `Promise.all` - também rejeita com o primeiro erro, mas espera até que todas as promessas sejam estabelecidas.

```js
function customPromiseAllWait(promises) {
  return new Promise((resolve, reject) => {
    const results = new Array(promises.length);
    let settledCount = 0;
    let firstError = null;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(result => {
          results[index] = result;
        })
        .catch(error => {
          if (firstError === null) {
            firstError = error;
          }
        })
        .finally(() => {
          settledCount++;
          if (settledCount === promises.length) {
            if (firstError !== null) {
              reject(firstError);
            } else {
              resolve(results);
            }
          }
        });
    });
  });
}
```

Agora `await customPromiseAllWait(...)` vai suspender a execução até que todas as consultas sejam processadas.

Essa é uma abordagem mais confiável, já que garante um fluxo de execução previsível.

Por fim, se quisermos processar todos os erros, podemos usar o `Promise.allSettled` ou escrever uma função que o envolve e reúne todos os erros em um único objeto [AggregateError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError) e rejeita com ele.

```js
// espera todas as promessas serem estabelecidas
// retorna os resultados se não houver erros
// lança AggregateError com todos os erros, se houver
function allOrAggregateError(promises) {
  return Promise.allSettled(promises).then(results => {
    const errors = [];
    const values = [];

    results.forEach((res, i) => {
      if (res.status === 'fulfilled') {
        values[i] = res.value;
      } else {
        errors.push(res.reason);
      }
    });

    if (errors.length > 0) {
      throw new AggregateError(errors, 'Uma ou mais promessas falharam');
    }

    return values;
  });
}
```
