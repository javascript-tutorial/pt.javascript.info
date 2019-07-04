
```js run demo
function readNumber() {
  let num;

  do {
    num = prompt("Entre um número por favor?", 0);
  } while ( !isFinite(num) );

  if (num === null || num === '') return null;
  
  return +num;
}

alert(`Lido: ${readNumber()}`);
```

A solução é um pouco mais complexa do que poderia ser porque precisamos lidar com `null`/linha vazia.

Então nósaceitamos a entrada até que seja um "número regular". Ambos `null` (cancel) e linha vazia também encaixam na condição, porque na forma numérica eles são `0`.

Depois que paramos, precisamos tratar `null` e linha vazia especialmente (retornar `null`), porque convertê-los para número retornaria `0`.

