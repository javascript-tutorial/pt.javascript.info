O tamanho máximo deve ser `maxlength`, então precisamos cortar a string um pouco para dar espaço à reticências.

Note que há apenas um único caractere Unicode para reticências. Não são três pontos.

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
