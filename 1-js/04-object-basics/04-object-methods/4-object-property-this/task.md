importance: 5

---

# Usando "this" num objeto literal

Aqui, a função `makeUser` retorna um objeto.

Qual é o resultado de aceder à sua `ref`? Porquê?

```js
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // Qual é o resultado?
```

