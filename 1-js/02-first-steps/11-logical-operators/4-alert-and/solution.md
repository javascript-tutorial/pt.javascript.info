Resposta: `1`, e depois `undefined`.

```js run
alert( alert(1) && alert(2) );
```

A chamada de `alert` retorna `undefined` (apenas mostra uma mensagem, então não existe nenhum retorno significativo).

Por causa disso, `&&` avalia o operando à esquerda (mostra `1`), e imediatamente interrompe, pois, `undefined` é um valor falso. *AND* `&&` procura por um valor falso e o retorna, então está feito.
