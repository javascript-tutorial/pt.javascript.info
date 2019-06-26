importância: 4

---

# Formate a data relativa

Escreva uma função `formatDate(date)` que deve formatar `date` da seguinte maneira:

- Se desde `date` passou menos de 1 segundo, então` "right now" `.
- Caso contrário, se desde `date` passou menos de 1 minuto, então `"n sec. ago"`.
- Caso contrário, se menos de uma hora, então `"m min. ago"`.
- Caso contrário, a data completa no formato `"DD.MM.YY HH:mm"`. Ou seja: `"dia.mês.ano horas:minutos"`, tudo em formato de 2 dígitos, por ex. `31.12.16 10:00`.

Por exemplo:

```js
alert( formatDate(new Date(new Date - 1)) ); // "right now"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

// yesterday's date like 31.12.2016, 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```
