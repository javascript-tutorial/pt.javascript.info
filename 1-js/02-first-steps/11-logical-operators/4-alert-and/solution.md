A resposta: `1` e, em seguida, `undefined`.

```js run
alert( alert(1) && alert(2) );
```

A chamada para `alert` retorna `undefined` (apenas mostra uma mensagem, portanto não há retorno significativo).

Por causa disso, o `&&` avalia o operando da esquerda (mostra o `1`), e imediatamente para, porque `undefined` é um valor falso. E `&&` procura por um valor falso e o retorna, então está pronto.

