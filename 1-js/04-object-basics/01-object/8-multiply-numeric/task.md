importance: 3

---

# Multiplica as propriedades numéricas por 2

Crie uma função `multiplyNumeric(obj)` que multiplica todas as proriedades numéricas de `obj` por `2`.

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

P.S. Use `typeof` para verificar por um número aqui.
