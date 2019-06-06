A resposta: primeiro `1`, depois `2`.

```js run
alert( alert(1) || 2 || alert(3) );
```

A chamada para `alert` não retorna um valor. Ou, em outras palavras, retorna `undefined`.

1. O primeiro OR `||` avalia seu operando esquerdo `alert (1)`. Isso mostra a primeira mensagem com `1`.
2. O `alert` retorna `undefined`, então OR passa para o segundo operando procurando por um valor geral.
3. O segundo operando `2` é verdadeiro, então a execução é interrompida, `2` é retornado e então mostrado pelo alerta externo.

Não haverá `3`, porque a avaliação não alcança `alert (3)`.
