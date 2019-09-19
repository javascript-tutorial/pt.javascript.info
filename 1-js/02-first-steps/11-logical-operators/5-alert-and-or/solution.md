Resposta: `3`.

```js run
alert( null || 2 && 3 || 4 );
```

A precedência de E `&&` é maior do que OU `||`. então ele é executado primeiro.

O resultado de `2 && 3 = 3`, então a expressão se torna:

```
null || 3 || 4
```

Agora o resultado é o primeiro valor verdadeiro: `3`.
