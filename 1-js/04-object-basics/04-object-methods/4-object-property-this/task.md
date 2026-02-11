importance: 5

---

# Usando "this" em literal de objeto

Aqui a função `makeUser` retorna um objeto.

Qual é o resultado de acessar seu `ref`? Por quê?

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

