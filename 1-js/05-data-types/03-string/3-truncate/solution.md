O comprimento máximo deve ser `maxlength`, então nós precisamos cortar-la um pouco mais curta, para dar espaço às reticências.

Note que existe um caractere único para reticências. Não são três pontos.

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
