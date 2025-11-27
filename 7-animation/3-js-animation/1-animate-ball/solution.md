Para quicar, podemos usar a propriedade CSS `top` e `position:absolute` para a bola dentro do campo com `position:relative`.

A coordenada inferior do campo é `field.clientHeight`. Mas a propriedade `top` fornece coordenadas para o topo da bola Então animamos a propriedade `top` a partir de `0` até `field.clientHeight - ball.clientHeight`, isto é até à posição mais baixa do topo da bola.

Para obter o efeito de "quique", podemos usar a função de tempo `bounce` no modo `easeOut`.

Aqui está o código final para a animação:

```js
let to = field.clientHeight - ball.clientHeight;

animate({
  duration: 2000,
  timing: makeEaseOut(bounce),
  draw(progress) {
    ball.style.top = to * progress + 'px'
  }
});
```
