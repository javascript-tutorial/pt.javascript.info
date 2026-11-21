Para obter a largura da barra de rolagem, podemos criar um elemento com rolagem, mas sem bordas e preenchimentos.

Então a diferença entre sua largura total `offsetWidth` e a largura da área de conteúdo interna `clientWidth` será exatamente a barra de rolagem:

```js run
// cria um div com rolagem
let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// precisa colocá-lo no documento, senão os tamanhos serão 0
document.body.append(div);
let scrollWidth = div.offsetWidth - div.clientWidth;

div.remove();

alert(scrollWidth);
```
