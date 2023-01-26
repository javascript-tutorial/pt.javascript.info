Na atividade <info:task/animate-ball> nós tínhamos apenas uma propriedade para animar. Agora precisamos de mais uma: `elem.style.left`.

A coordenada horizontal é modificada por outra regra: ela não "quica", mas gradativamente aumenta a movimentação da bola para a direita.

Podemos escrever mais um `animate` para isso.

Como função de tempo podemos usar `linear`, mas algo como `makeEaseOut(quad)` parece bem melhor.

O código:

```js
let height = field.clientHeight - ball.clientHeight;
let width = 100;

// anime o topo (quicando)
animate({
  duration: 2000,
  timing: makeEaseOut(bounce),
  draw: function (progress) {
    ball.style.top = height * progress + "px"
  }
});

// anime a esquerda (movendo para a direita)
animate({
  duration: 2000,
  timing: makeEaseOut(quad),
  draw: function (progress) {
    ball.style.left = width * progress + "px"
  }
});
```
