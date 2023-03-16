Importance: 5

---

# instanceof estranho

No código abaixo, por que `instanceof` retorna `true`? Podemos ver facilmente que `a` não é criado por `B()`.

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // true
*/!*
```
