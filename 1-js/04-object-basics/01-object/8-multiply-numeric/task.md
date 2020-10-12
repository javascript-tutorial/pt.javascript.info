importância: 3

---

<<<<<<< HEAD
# Multiplica as propriedades numéricas por 2

Crie uma função `multiplyNumeric(obj)` que multiplique todas as propriedades numéricas de `obj` por `2`.
=======
# Multiply numeric property values by 2

Create a function `multiplyNumeric(obj)` that multiplies all numeric property values of `obj` by `2`.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

Por exemplo:

```js
// antes da chamada
let menu = {
  width: 200,
  height: 300,
  title: "O meu menu"
};

multiplyNumeric(menu);

// depois da chamada
menu = {
  width: 400,
  height: 600,
  title: "O meu menu"
};
```

Por favor, note que `multiplyNumeric` não precisa de retornar nada. Deve modificar o próprio objecto.

P.S. Use `typeof` aqui para verificar se é um número.
