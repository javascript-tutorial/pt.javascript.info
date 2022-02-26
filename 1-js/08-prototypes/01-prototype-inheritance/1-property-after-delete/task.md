importance: 5

---

# Trabalhando com protótipos

Aqui está o código que cria um par de objetos, e depois os modifica.

Que valores são mostrados no processo?

```js
let animal = {
  jumps: null
};
let rabbit = {
  __proto__: animal,
  jumps: true
};

alert( rabbit.jumps ); // ? (1)

delete rabbit.jumps;

alert( rabbit.jumps ); // ? (2)

delete animal.jumps;

alert( rabbit.jumps ); // ? (3)
```

Deve haver 3 respostas.
