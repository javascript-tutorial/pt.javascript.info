Resposta: `pattern:\d\d[-:]\d\d`.

```js run
let regexp = /\d\d[-:]\d\d/g;
alert( "Café da manhã as 09:00. Jantar as 21-30".match(regexp) ); // 09:00, 21-30
```

Lembre-se que o hífen `pattern:'-'` possui um significado especial entre colchetes, mas apenas quando está entre outros caracteres, não quando está no começo ou no final do conjunto, descartando a necessidade de escapá-lo.
