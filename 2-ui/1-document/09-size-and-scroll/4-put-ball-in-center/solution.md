A bola tem `position:absolute`. Isso significa que suas coordenadas `left/top` são medidas a partir do elemento posicionado mais próximo, que é `#field` (porque ele tem `position:relative`).

As coordenadas começam a partir do canto interno superior-esquerdo do campo:

![](field.svg)

A largura/altura interna do campo é `clientWidth/clientHeight`. Então o centro do campo tem coordenadas `(clientWidth/2, clientHeight/2)`.

...Mas se definirmos `ball.style.left/top` com esses valores, então não será a bola como um todo, mas o canto superior-esquerdo da bola que ficará no centro:

```js
ball.style.left = Math.round(field.clientWidth / 2) + 'px';
ball.style.top = Math.round(field.clientHeight / 2) + 'px';
```

Veja como fica:

[iframe height=180 src="ball-half"]

Para alinhar o centro da bola com o centro do campo, devemos mover a bola em metade da sua largura para a esquerda e em metade da sua altura para cima:

```js
ball.style.left = Math.round(field.clientWidth / 2 - ball.offsetWidth / 2) + 'px';
ball.style.top = Math.round(field.clientHeight / 2 - ball.offsetHeight / 2) + 'px';
```

Agora a bola está finalmente centralizada.

````warn header="Atenção: a armadilha!"

O código não vai funcionar de forma confiável enquanto a `<img>` não tiver width/height:

```html
<img src="ball.png" id="ball">
```
````

Quando o navegador não sabe a largura/altura de uma imagem (a partir de atributos da tag ou do CSS), ele assume que elas são iguais a `0` até que a imagem termine de carregar.

Então o valor de `ball.offsetWidth` será `0` até a imagem carregar. Isso leva a coordenadas erradas no código acima.

Depois do primeiro carregamento, o navegador geralmente armazena a imagem em cache, e nos recarregamentos ela terá o tamanho imediatamente. Mas no primeiro carregamento o valor de `ball.offsetWidth` é `0`.

Devemos corrigir isso adicionando `width/height` à `<img>`:

```html
<img src="ball.png" *!*width="40" height="40"*/!* id="ball">
```

...Ou fornecer o tamanho no CSS:

```css
#ball {
  width: 40px;
  height: 40px;
}
```
