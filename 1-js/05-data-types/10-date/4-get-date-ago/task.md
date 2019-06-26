importância: 4

---

# Que dia do mês foi há muitos dias?

Crie uma função `getDateAgo(date, days)` para retornar o dia do mês `days` antes da `data`.

Por exemplo, se hoje for 20, então `getDateAgo(new Date(), 1)` deverá ser 19 e `getDateAgo(new Date(), 2)` deverá ser 18º.

Deve também trabalhar durante meses/anos de forma confiável:

```js
let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)
```

P.S. A função não deve modificar a `date` dada.
