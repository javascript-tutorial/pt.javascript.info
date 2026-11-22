
Primeiro precisamos escolher um método de posicionamento da bola.

Não podemos usar `position:fixed` para ela, porque rolar a página moveria a bola para fora do campo.

Então devemos usar `position:absolute` e, para tornar o posicionamento realmente sólido, tornar o próprio `field` posicionado.

Então a bola será posicionada em relação ao campo:

```css
#field {
  width: 200px;
  height: 150px;
  position: relative;
}

#ball {
  position: absolute;
  left: 0; /* relativo ao ancestral posicionado mais próximo (field) */
  top: 0;
  transition: 1s all; /* animação CSS para left/top faz a bola "voar" */
}
```

Agora precisamos atribuir o `ball.style.left/top` correto. Eles agora contêm coordenadas relativas ao campo.

Aqui está a imagem:

![](move-ball-coords.svg)

Temos `event.clientX/clientY` -- coordenadas do clique relativas à janela.

Para obter a coordenada `left` do clique relativa ao campo, podemos subtrair a borda esquerda do campo e a largura da borda:

```js
let left = event.clientX - fieldCoords.left - field.clientLeft;
```

Normalmente, `ball.style.left` significa "a borda esquerda do elemento" (a bola). Então, se atribuirmos esse `left`, a borda da bola, não o centro, ficaria sob o cursor do mouse.

Precisamos mover a bola metade da largura para a esquerda e metade da altura para cima, para centralizá-la.

Então o `left` final seria:

```js
let left = event.clientX - fieldCoords.left - field.clientLeft - ball.offsetWidth/2;
```

A coordenada vertical é calculada usando a mesma lógica.

Note que a largura/altura da bola deve ser conhecida no momento em que acessamos `ball.offsetWidth`. Deve ser especificada em HTML ou CSS.
