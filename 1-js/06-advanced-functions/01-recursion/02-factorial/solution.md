Por definição, um fatorial `n!` pode ser escrito como `n * (n-1)!`.

Em outras palavras, o resultado de `factorial(n)` pode ser calculado como `n` multiplicado pelo resultado de `factorial(n-1)`. E a chamada para `n-1` pode descer recursivamente mais e mais, até `1`.

```js run
function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```

A base da recursão é o valor `1`. Também podemos fazer de `0` a base aqui, não faz muita diferença, mas dá mais um passo recursivo:

```js run
function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```
