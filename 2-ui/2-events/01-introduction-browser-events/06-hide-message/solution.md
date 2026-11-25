
Para adicionar o botão podemos usar `position:absolute` (e tornar o painel `position:relative`) ou `float:right`. O `float:right` tem a vantagem de o botão nunca sobrepor o texto, mas `position:absolute` dá mais liberdade. Então a escolha é sua.

Então, para cada painel, o código pode ser assim:
```js
pane.insertAdjacentHTML("afterbegin", '<button class="remove-button">[x]</button>');
```

Então o `<button>` se torna `pane.firstChild`, então podemos adicionar um manipulador a ele assim:

```js
pane.firstChild.onclick = () => pane.remove();
```
