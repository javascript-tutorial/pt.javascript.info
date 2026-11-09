importance: 5

---

# Exiba uma lista encadeada simples

Digamos que temos uma lista encadeada simples (como descrito no capítulo <info:recursion>):

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

Escreva uma função `printList(list)` que exiba os itens da lista um por um.

Faça duas variantes da solução: usando um laço e usando recursão.

O que é melhor: com recursão ou sem ela?
