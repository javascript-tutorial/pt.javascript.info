Precisamos "mapear" todos os valores do intervalo 0..1 para valores de `min` a `max`.

Isso pode ser feito em duas etapas:

1. Se multiplicarmos um número aleatório de 0..1 por `max-min`, o intervalo de valores possíveis aumenta de `0..1` para `0..max-min`.
2. Agora, se somarmos `min`, o intervalo possível passa a ser de `min` a `max`.

A função:

```js run
function random(min, max) {
  return min + Math.random() * (max - min);
}

alert( random(1, 5) ); 
alert( random(1, 5) ); 
alert( random(1, 5) ); 
```

