importance: 5

---
# Função no if

Olhe o código. Qual vai ser o resultado da chamada na última linha?

```js run
let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}

*!*
sayHi();
*/!*
```
