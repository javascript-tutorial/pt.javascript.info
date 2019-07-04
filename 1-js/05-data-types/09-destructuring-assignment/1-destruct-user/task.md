importance: 5

---

# Atribuição de desestruturação

Nós temos um objeto:

```js
let user = {
  name: "John",
  years: 30
};
```

Escreva a atribuição de desestruturação que lê:

- a propriedade `name` na variável `name`.
- a propriedade `years` na variável `age`.
- a propriedade `isAdmin` na variável `isAdmin` (false se ausente)

Os valores após a atribuição devem ser:

```js
let user = { name: "John", years: 30 };

// seu código para o lado esquerdo:
// ... = user

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false
```
