Usando operador de interrogação `'?'`:

```js
function checkAge(age) {
  return (age > 18) ? true : confirm('Seus pais permitiram?');
}
```

Usando OR `||` (A variante mais curta):

```js
function checkAge(age) {
  return (age > 18) || confirm('Seus pais permitiram?');
}
```

Note que os parêntesis em volta de `age > 18` não são obrigatórios aqui. Eles existem para melhor legibilidade.
