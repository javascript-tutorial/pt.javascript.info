importance: 5

---

# Conserte a adição

Aqui está um código que pede dois números ao usuário e mostra a soma dos mesmos.

Ele funciona incorretamente. A saída no exemplo abaixo é `12` (para os valores presentes por padrão no prompt, definidos pelo segundo argumento).

Por quê? Conserte isto. O resultado deveria ser `3`.

```js run
let a = prompt("Primeiro número?", 1);
let b = prompt("Segundo número?", 2);

alert(a + b); // 12
```
