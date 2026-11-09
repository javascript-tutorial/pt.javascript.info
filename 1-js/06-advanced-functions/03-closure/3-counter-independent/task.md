importance: 5

---

# Os contadores são independentes?

Aqui criamos dois contadores: `counter` e `counter2`, usando a mesma função `makeCounter`.

Eles são independentes? O que o segundo contador vai mostrar? `0,1` ou `2,3` ou outra coisa?

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

*!*
alert( counter2() ); // ?
alert( counter2() ); // ?
*/!*
```

