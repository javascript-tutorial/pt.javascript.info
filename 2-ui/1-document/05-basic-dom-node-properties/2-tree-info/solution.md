Vamos fazer um loop sobre os `<li>`:

```js
for (let li of document.querySelectorAll('li')) {
  ...
}
```

No loop, precisamos obter o texto dentro de cada `li`.

Podemos ler o texto a partir do primeiro nó filho do `li`, que é o nó de texto:

```js
for (let li of document.querySelectorAll('li')) {
  let title = li.firstChild.data;

  // title é o texto no <li> antes de quaisquer outros nós
}
```

Depois podemos obter o número de descendentes como `li.getElementsByTagName('li').length`.
