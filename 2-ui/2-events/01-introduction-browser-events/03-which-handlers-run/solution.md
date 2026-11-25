A resposta: `1` e `2`.

O primeiro manipulador é acionado, porque não é removido por `removeEventListener`. Para remover o manipulador precisamos passar exatamente a função que foi atribuída. E no código uma nova função é passada, que parece a mesma, mas ainda é outra função.

Para remover um objeto de função, precisamos armazenar uma referência a ele, assim:

```js
function handler() {
  alert(1);
}

button.addEventListener("click", handler);
button.removeEventListener("click", handler);
```

O manipulador `button.onclick` funciona independentemente, além do `addEventListener`.
