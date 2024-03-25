Existem formas variadas, por exemplo:


O `<div>` DOM node:

```js
document.body.firstElementChild
// ou
document.body.children[0]
// ou (o primeiro node é espaço, por isso escolhemos o 2º)
document.body.childNodes[1]
```

O `<ul>` DOM node:

```js
document.body.lastElementChild
// ou
document.body.children[1]
```

O segundo `<li>` (com o Pete):

```js
// Obtém o <ul>, e depois seleciona o último child element
document.body.lastElementChild.lastElementChild
```
