importance: 4

---

# Reescreva a função usando '?' ou '||'

A função a seguir retorna `true` se o parâmetro `age` for maior que `18`.

Caso contrário, ele pede uma confirmação e retorna seu resultado.

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    return confirm('Seus pais permitiram?');
  }
}
```

Reescreva-o, para executar o mesmo, mas sem `if`, em uma única linha.

Faça duas variantes de `checkAge`:

1. Usando o operador de ponto de interrogação `?`
2. Usando OR `||`
