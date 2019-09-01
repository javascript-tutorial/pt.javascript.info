O método `date.getDay()` retorna o número do dia da semana, a partir do domingo.

Vamos fazer um array de dias da semana, para que possamos obter o nome do dia adequado pelo seu número:

```js run demo
function getWeekDay(date) {
  let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  return days[date.getDay()];
}

let date = new Date(2014, 0, 3); // 3 Jan 2014
alert( getWeekDay(date) ); // FR
```
