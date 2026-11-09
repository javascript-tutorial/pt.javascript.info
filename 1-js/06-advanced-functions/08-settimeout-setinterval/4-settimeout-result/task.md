importance: 5

---

# O que o setTimeout vai mostrar?

No código abaixo, há uma chamada `setTimeout` agendada, depois um cálculo pesado é executado, que leva mais de 100ms para terminar.

Quando a função agendada vai rodar?

1. Depois do laço.
2. Antes do laço.
3. No início do laço.


O que o `alert` vai mostrar?

```js
let i = 0;

setTimeout(() => alert(i), 100); // ?

// assuma que o tempo para executar essa função é >100ms
for(let j = 0; j < 100000000; j++) {
  i++; 
}
```
