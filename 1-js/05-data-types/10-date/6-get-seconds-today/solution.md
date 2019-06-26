Para obter o número de segundos, podemos gerar uma data usando o dia de hoje e a hora 00:00:00 e, em seguida, subtraí-la de "now".

A diferença é o número de milissegundos desde o começo do dia, que devemos dividir por 1000 para obter segundos:

```js run
function getSecondsToday() {
  let now = new Date();

// cria um objeto usando o dia/mês/ano atual
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // diferença em ms
  return Math.round(diff / 1000); // transforma para segundos
}

alert( getSecondsToday() );
```

Uma solução alternativa seria obter horas/minutos/segundos e convertê-los em segundos:

```js run
function getSecondsToday() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}
```
