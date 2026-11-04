
# Círculo animado com promise

Reescreva a função `showCircle`, da solução da tarefa <info:task/animate-circle-callback>, para que ela retorne uma promise em vez de receber um callback.

O novo uso:

```js
showCircle(150, 150, 100).then(div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

Use a solução da tarefa <info:task/animate-circle-callback> como base.
