O comprimento máximo deve ser `maxlength`, portanto precisamos de a cortar um pouco antes, para dar espaço às reticências.

Note que realmente existe um caractere *unicode* único para as reticências. Não são três pontos.

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
