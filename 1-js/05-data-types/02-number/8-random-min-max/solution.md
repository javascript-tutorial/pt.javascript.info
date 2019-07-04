Precisamos "mapear" todos valores do intervalo 0..1 para valores entre `min` e `max`.

Isso pode ser feito em dois estágios:

1. Se multiplicarmos um número aleatório no intervalo 0..1 por `max-min`, então o intervalo de valores possíveis aumenta de `0..1` para `0..max-min`.
2. Agora se adicionarmos `min`, o intervalo possível torna-se de `min` a `max`.

A função:

```js run
function random(min, max) {
  return min + Math.random() * (max - min);
}

alert( random(1, 5) ); 
alert( random(1, 5) ); 
alert( random(1, 5) ); 
```

