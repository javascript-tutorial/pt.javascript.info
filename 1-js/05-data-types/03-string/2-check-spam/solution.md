Para tornar a pesquisa não sensível a maiúsculas/minúsculas  (*case-insensitive*), vamos transformar a *string* em minúsculas e depois efetuar a pesquisa:

```js run
function checkSpam(str) {
  let lowerStr = str.toLowerCase();

  return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

alert( checkSpam('compre ViAgRA agora') );
alert( checkSpam('xxxxx grátis') );
alert( checkSpam("coelha inocente") );
```
