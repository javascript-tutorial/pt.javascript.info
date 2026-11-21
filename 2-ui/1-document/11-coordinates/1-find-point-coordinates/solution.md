# Cantos externos

Os cantos externos são basicamente o que obtemos de [elem.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/DOM/element.getBoundingClientRect).

Coordenadas do canto superior-esquerdo `answer1` e do canto inferior-direito `answer2`:

```js
let coords = elem.getBoundingClientRect();

let answer1 = [coords.left, coords.top];
let answer2 = [coords.right, coords.bottom];
```

# Canto interno superior-esquerdo

Esse difere do canto externo pela largura da borda. Uma forma confiável de obter a distância é `clientLeft/clientTop`:

```js
let answer3 = [coords.left + field.clientLeft, coords.top + field.clientTop];
```

# Canto interno inferior-direito

No nosso caso precisamos subtrair o tamanho da borda das coordenadas externas.

Poderíamos usar a abordagem via CSS:

```js
let answer4 = [
  coords.right - parseInt(getComputedStyle(field).borderRightWidth),
  coords.bottom - parseInt(getComputedStyle(field).borderBottomWidth)
];
```

Uma forma alternativa seria adicionar `clientWidth/clientHeight` às coordenadas do canto superior-esquerdo. Isso é provavelmente ainda melhor:

```js
let answer4 = [
  coords.left + elem.clientLeft + elem.clientWidth,
  coords.top + elem.clientTop + elem.clientHeight
];
```
