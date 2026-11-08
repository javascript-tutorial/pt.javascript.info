importance: 5

---

# Excluir referências cíclicas

Em casos simples de referências circulares, podemos excluir uma propriedade problemática da serialização pelo seu nome.

Mas às vezes não podemos simplesmente usar o nome, já que ele pode ser usado tanto em referências circulares quanto em propriedades normais. Então podemos verificar a propriedade pelo seu valor.

Escreva uma função `replacer` para transformar tudo em string, mas removendo propriedades que referenciam `meetup`:

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

/* o resultado deve ser:
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```
