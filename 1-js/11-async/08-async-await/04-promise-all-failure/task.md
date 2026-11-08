
# Promise.all perigoso

O `Promise.all` é uma ótima forma de paralelizar múltiplas operações. É especialmente útil quando precisamos fazer requisições em paralelo para vários serviços.

Porém, existe um perigo escondido. Vamos ver um exemplo nessa tarefa e explorar como evitá-lo.

Digamos que temos uma conexão com um serviço remoto, como um banco de dados.

Existem duas funções: `connect()` e `disconnect()`.

Quando conectados, podemos enviar requisições usando `database.query(...)` - uma função async que geralmente retorna o resultado, mas também pode lançar um erro.

Aqui está uma implementação simples:

```js
let database;

function connect() {
  database = {
    async query(isOk) {
      if (!isOk) throw new Error('Query failed');
    }
  };
}

function disconnect() {
  database = null;
}

// uso pretendido:
// connect()
// ...
// database.query(true) para simular uma chamada bem-sucedida
// database.query(false) para simular uma chamada que falha
// ...
// disconnect()
```

Agora aqui está o problema.

Escrevemos o código para conectar e enviar 3 consultas em paralelo (todas elas levam tempos diferentes, por exemplo 100, 200 e 300ms), e então desconectar:

```js
// Função auxiliar para chamar a função async `fn` depois de `ms` milissegundos
function delay(fn, ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => fn().then(resolve, reject), ms);
  });
}

async function run() {
  connect();

  try {
    await Promise.all([
      // esses 3 trabalhos em paralelo levam tempos diferentes: 100, 200 e 300 ms
      // usamos o auxiliar `delay` para conseguir esse efeito
*!*
      delay(() => database.query(true), 100),
      delay(() => database.query(false), 200),
      delay(() => database.query(false), 300)
*/!*
    ]);
  } catch(error) {
    console.log('Erro tratado (ou será que foi?)');
  }

  disconnect();
}

run();
```

Duas dessas consultas acabam não tendo sucesso, mas somos espertos o bastante para envolver a chamada do `Promise.all` em um bloco `try..catch`.

Porém, isso não ajuda! Esse script na verdade leva a um erro não capturado no console!

Por quê? Como evitar isso?