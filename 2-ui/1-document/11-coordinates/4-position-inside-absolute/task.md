importance: 5

---

# Posicione a nota dentro (absolute)

Estenda a tarefa anterior <info:task/position-at-absolute>: ensine a função `positionAt(anchor, position, elem)` a inserir `elem` dentro do `anchor`.

Novos valores para `position`:

- `top-out`, `right-out`, `bottom-out` -- funcionam como antes, eles inserem o `elem` acima/à direita/abaixo de `anchor`.
- `top-in`, `right-in`, `bottom-in` -- inserem `elem` dentro do `anchor`: colam-no na borda superior/direita/inferior.

Por exemplo:

```js
// mostra a nota acima de blockquote
positionAt(blockquote, "top-out", note);

// mostra a nota dentro de blockquote, no topo
positionAt(blockquote, "top-in", note);
```

O resultado:

[iframe src="solution" height="310" border="1" link]

Como código fonte, use a solução da tarefa <info:task/position-at-absolute>.
