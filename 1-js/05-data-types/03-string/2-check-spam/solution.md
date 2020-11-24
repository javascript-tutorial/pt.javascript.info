Para fazer a pesquisa insensível ao caso (*case-insensitive*), vamos transformar a *string* em minúsculas e a seguir pesquisar:

```js run
function checkSpam(str) {
  let lowerStr = str.toLowerCase();

  return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

alert( checkSpam('compre ViAgRA agora') );
alert( checkSpam('xxxxx grátis') );
alert( checkSpam("coelhinha inocente") );
```

