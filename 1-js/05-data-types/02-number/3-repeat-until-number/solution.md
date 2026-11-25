
```js run demo
function readNumber() {
  let num;

  do {
    num = prompt("Digite um número, por favor?", 0);
  } while ( !isFinite(num) );

  if (num === null || num === '') return null;
  
  return +num;
}

alert(`Lido: ${readNumber()}`);
```

A solução é um pouco mais complexa do que poderia ser porque precisamos tratar os casos de `null`/linhas vazias.

Então, na verdade, aceitamos a entrada até que ela seja um "número normal". Tanto `null` (cancelar) quanto a linha vazia também se encaixam nessa condição, porque, na forma numérica, eles são `0`.

Depois de parar, precisamos tratar `null` e a linha vazia de forma especial (retornando `null`), porque convertê-los para um número retornaria `0`.

