importance: 5

---

# Atribuição via desestruturação

Temos um objeto:

```js
let user = {
  name: "John",
  years: 30
};
```

Escreva a atribuição via desestruturação que leia:

- A propriedade `name` para a variável `name`.
- A propriedade `years` para a variável `age`.
- A propriedade `isAdmin` para a variável `isAdmin` (false, se essa propriedade não existir)

Aqui está um exemplo dos valores depois da sua atribuição:

```js
let user = { name: "John", years: 30 };

// seu código do lado esquerdo:
// ... = user

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false
```
