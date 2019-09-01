Para obter o número de milissegundos até amanhã, podemos a partir de "amanhã 00:00:00" e subtrair a data atual.

Primeiro, geramos esse "amanhã" e depois fazemos:

```js run
function getSecondsToTomorrow() {
  let now = new Date();

  // data de amanh
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), *!*now.getDate()+1*/!*);

  let diff = tomorrow - now; // diferença em ms
  return Math.round(diff / 1000); // converte para segundos
}
```

Solução alternativa:

```js run
function getSecondsToTomorrow() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
  let totalSecondsInADay = 86400;

  return totalSecondsInADay - totalSecondsToday;
}
```

Por favor, note que muitos países têm horário de verão (DST), então pode haver dias com 23 ou 25 horas. Podemos querer tratar esses dias separadamente.
