importance: 5

---

# Excluir referências anteriores

Em casos simples de referências circulares, podemos excluir uma propriedade ofensiva da serialização por seu nome.

Mas às vezes há muitas referências anteriores. E os nomes podem ser usados tanto em referências circulares como em propriedades normais.

Escreva a função `replacer` para transformar tudo em string, mas remova as propriedades que fazem referência a `meetup`:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

*!*
// referências circulares
room.occupiedBy = meetup;
meetup.self = meetup;
*/!*

alert( JSON.stringify(meetup, function replacer(key, value) {
  /* seu código */
}));

/* resultado deve ser:
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```

