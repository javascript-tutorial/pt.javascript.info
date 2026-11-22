importance: 5

---

# Crie uma árvore a partir do objeto

Escreva uma função `createTree` que cria uma lista `ul/li` aninhada a partir do objeto aninhado.

Por exemplo:

```js
let data = {
  "Peixe": {
    "truta": {},
    "salmão": {}
  },

  "Árvore": {
    "Enorme": {
      "sequoia": {},
      "carvalho": {}
    },
    "Florescente": {
      "macieira": {},
      "magnólia": {}
    }
  }
};
```

A sintaxe:

```js
let container = document.getElementById('container');
*!*
createTree(container, data); // cria a árvore no container
*/!*
```

O resultado (a árvore) deve ficar assim:

[iframe border=1 src="build-tree-dom"]

Escolha uma de duas formas de resolver essa tarefa:

1. Crie o HTML para a árvore e depois atribua a `container.innerHTML`.
2. Crie nós da árvore e anexe-os com métodos do DOM.

Seria ótimo se você conseguisse fazer os dois.

P.S. A árvore não deve ter elementos "extras", como `<ul></ul>` vazios para as folhas.
