
# Acessando array[-1]

Em algumas linguagens de programação, podemos acessar elementos de um array usando índices negativos, contados a partir do final.

Dessa forma :

```js
let array = [1, 2, 3];

array[-1]; // 3, o último elemento
array[-2]; // 2, uma posição a partir do final
array[-3]; // 1, duas posições a partir do final
```

Em outras palavras, `array[-N]` é o mesmo que `array[array.length - N]`.

Crie um proxy para implementar esse comportamento.

É assim que deve funcionar:

```js
let array = [1, 2, 3];

array = new Proxy(array, {
  /* seu código */
});

alert( array[-1] ); // 3
alert( array[-2] ); // 2

// Outras funcionalidades do array devem ser mantidas "como estão".
```
