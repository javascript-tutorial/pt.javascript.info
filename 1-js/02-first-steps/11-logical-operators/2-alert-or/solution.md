The answer: first `1`, then `2`.
A resposta: primeiro `1`, depois `2`.

```js run
alert( alert(1) || 2 || alert(3) );
```

Ao chamar `alert` não é retornado nenhum valor. Ou seja, é retornado `undefined`.

1. O primeiro OU `||` avalia o operando da esquerda `alert(1)`. Que mostra a primeira mensagem com `1`.
2. O `alert` retorna `undefined`, então OU vai ao segundo operando procurando por um valor verdadeiro.
3. O segundo operando `2` é verdadeiro, então a execução é interrompida, `2` é retornado e é mostrado pelo `alert` externo.

Não haverá `3`, pois a execução não chega a `alert(3)`.
