
Primeiro, vamos ver como *não* fazer isso:

```js
function clear(elem) {
  for (let i=0; i < elem.childNodes.length; i++) {
      elem.childNodes[i].remove();
  }
}
```

Isso não vai funcionar, porque a chamada a `remove()` desloca a coleção `elem.childNodes`, então os elementos começam a partir do índice `0` a cada vez. Mas `i` aumenta, e alguns elementos serão pulados.

O loop `for..of` também faz a mesma coisa.

A variante correta poderia ser:

```js
function clear(elem) {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
}
```

E também há um jeito mais simples de fazer a mesma coisa:

```js
function clear(elem) {
  elem.innerHTML = '';
}
```
