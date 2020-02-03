importance: 5

---

# Saída de uma lista ligada

Digamos que tenhamos uma lista ligada (como descrito no capítulo <info:recursion>):

```js
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
```

Escreva uma função `printList(list)` que mostra os itens de lista um por um.

Faça duas variantes da solução: usando um loop e usando recursão.

O que é melhor: com recursão ou sem ela?