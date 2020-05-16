importance: 4

---

# "else" é obrigatório?

A função a seguir retorna `true` se o parâmetro `age` é maior que `18`.

Caso contrário, pede uma confirmação e retorna seu resultado:

```js
function checkAge(age) {
  if (age > 18) {
    return true;
*!*
  } else {
    // ...
    return confirm('Seus pais permitiram?');
  }
*/!*
}
```

A função funcionará diferentemente se `else` for removido?

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  }
*!*
  // ...
  return confirm('Seus pais permitiram?');
*/!*
}
```

Existe alguma diferença no comportamento dessas duas variantes?
