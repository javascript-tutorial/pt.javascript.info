importância: 5

---

# Algoritmo de busca

A tarefa tem duas partes.

Dados os objetos a seguir:

```js
let head = {
  glasses: 1
};

let table = {
  pen: 3
};

let bed = {
  sheet: 1,
  pillow: 2
};

let pockets = {
  money: 2000
};
```

1. Use o `__proto__` para atribuir propriedades de uma forma que qualquer busca de propriedades siga o caminho: `pockets` -> `bed` -> `table` -> `head`. Por exemplo, `pockets.pen` deve ter o valor `3` (encontrado em `table`), e `bed.glasses` deve ter valor `1` (encontrado em `head`).
2. Responda a seguinte questão: é mais rápido obter `glasses` como `pockets.glasses` ou como `head.glasses`? Compare (*benchmark*), se necessário.
