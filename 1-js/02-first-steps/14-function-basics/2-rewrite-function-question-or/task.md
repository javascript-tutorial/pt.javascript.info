importance: 4

---

# Reescreva a função usando '?' ou '||'

A função a seguir retorna `true` se o parâmetro `age` é maior que `18`.

Caso contrário, pede por uma confirmação e retorna seu resultado.

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    return confirm('Você tem permissão de seus pais para acessar esta página?');
  }
}
```

Reescreva, para executar a mesma, mas sem `if`, em uma única linha.

Faça duas variantes de `checkAge`:

1. Usando um operador de interrogação `?`
2. Usando OR `||`
