Para obter o tempo de `date` até agora - vamos subtrair as datas.

```js run demo
function formatDate(date) {
  let diff = new Date() - date; // a diferença em millisegundos

  if (diff < 1000) { // menos de 1 segundo
    return 'right now';
  }

  let sec = Math.floor(diff / 1000); // converte diff para segundos

  if (sec < 60) {
    return sec + ' sec. ago';
  }

  let min = Math.floor(diff / 60000); // converte diff para minutos
  if (min < 60) {
    return min + ' min. ago';
  }

  // formata a data
// adiciona zeros à esquerda a dígitos únicos de dia/mês/horas/minutos
  let d = date;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ].map(component => component.slice(-2)); // pega 2 dígitos de todos componentes

  // junta os componentes na data
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}

alert( formatDate(new Date(new Date - 1)) ); // "right now"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

// yesterday's date like 31.12.2016, 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```

Solução alternativa:

```js run
function formatDate(date) {
  let dayOfMonth = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let diffMs = new Date() - date;
  let diffSec = Math.round(diffMs / 1000);
  let diffMin = diffSec / 60;
  let diffHour = diffMin / 60;

  // formatting
  year = year.toString().slice(-2);
  month = month < 10 ? '0' + month : month;
  dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;

  if (diffSec < 1) {
    return 'right now';  
  } else if (diffMin < 1) {
    return `${diffSec} sec. ago`
  } else if (diffHour < 1) {
    return `${diffMin} min. ago`
  } else {
    return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
  }
}
```
