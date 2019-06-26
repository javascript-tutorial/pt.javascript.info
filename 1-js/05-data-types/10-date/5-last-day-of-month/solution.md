Vamos criar uma data usando o próximo mês, mas passe zero como o dia:
```js run demo
function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

alert( getLastDayOfMonth(2012, 0) ); // 31
alert( getLastDayOfMonth(2012, 1) ); // 29
alert( getLastDayOfMonth(2013, 1) ); // 28
```

Normalmente, as datas começam em 1, mas tecnicamente podemos passar qualquer número, a data será auto-ajustada. Então quando passamos 0, então significa "um dia antes do primeiro dia do mês", em outras palavras: "o último dia do mês anterior".
