Usando o operador de ponto de interrogação `'?'`:

```js
function checkAge(age) {
  return (age > 18) ? true : confirm('Seus pais permitiram?');
}
```

Usando OR `||` (a variante mais curta):

```js
function checkAge(age) {
  return (age > 18) || confirm('Seus pais permitiram?');
}
```

Observe que os parênteses em torno de `age > 18` não são necessários aqui. Eles existem para melhor legibilidade.
