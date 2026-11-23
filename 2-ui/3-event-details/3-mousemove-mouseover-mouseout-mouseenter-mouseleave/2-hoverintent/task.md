importance: 5

---

# Tooltip "inteligente"

Escreva uma função que mostre uma tooltip sobre um elemento somente se o visitante mover o mouse *até ele*, mas não *através dele*.

Em outras palavras, se o visitante mover o mouse até o elemento e parar lá -- mostre a tooltip. E se ele só moveu o mouse através dele, então não é preciso, quem quer um pisca-pisca extra?

Tecnicamente, podemos medir a velocidade do mouse sobre o elemento, e se ela for baixa, assumimos que ele vem "sobre o elemento" e mostramos a tooltip; se for rápida, então ignoramos.

Faça um objeto universal `new HoverIntent(options)` para isso.

Suas `options`:
- `elem` -- elemento a rastrear.
- `over` -- uma função a ser chamada se o mouse chegou ao elemento: isto é, ele se move lentamente ou parou sobre ele.
- `out` -- uma função a ser chamada quando o mouse deixa o elemento (se `over` foi chamado).

Um exemplo de uso desse objeto para a tooltip:

```js
// uma tooltip de exemplo
let tooltip = document.createElement('div');
tooltip.className = "tooltip";
tooltip.innerHTML = "Tooltip";

// o objeto vai rastrear o mouse e chamar over/out
new HoverIntent({
  elem,
  over() {
    tooltip.style.left = elem.getBoundingClientRect().left + 'px';
    tooltip.style.top = elem.getBoundingClientRect().bottom + 5 + 'px';
    document.body.append(tooltip);
  },
  out() {
    tooltip.remove();
  }
});
```

A demonstração:

[iframe src="solution" height=140]

Se você mover o mouse sobre o "relógio" rápido, nada acontece, e se você fizer isso lentamente ou parar sobre ele, então haverá uma tooltip.

Note bem: a tooltip não "pisca" quando o cursor se move entre os subelementos do relógio.
