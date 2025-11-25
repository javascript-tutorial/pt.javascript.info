# Encontre o horário no formato hh:mm ou hh-mm

A string pode estar no formato `horas:minutos` ou `horas-minutos`. Ambas horas e minutos são compostas de 2 dígitos: `09:00` ou `21-30`.

Escreva uma expressão regular que corresponda ao horário:

```js
let regexp = /your regexp/g;
alert( "Café da manhã as 09:00. Jantar as 21-30".match(regexp) ); // 09:00, 21-30
```

P.S. Assuma para essa tarefa que o horário sempre estará correto, e não é necessário filtrar casos impossíveis, como "45:67". Aprenderemos a lidar com esses casos mais a frente também.
