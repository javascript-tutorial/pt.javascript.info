O comprimento máximo deve ser `maxlength`, assim precisamos de a cortar um pouco antes, para dar espaço às reticências (*ellipsis*).

Note que na verdade existe apenas um único carátere *unicode* para as reticências. Não são três pontos.

```js execute demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
