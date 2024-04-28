Sim, é possível.

Se uma função retorna um objeto, então `new` o retorna ao invés de `this`.

Então elas podem, por exemplo, retornar o mesmo objeto `obj` definido externamente:

```js run no-beautify
let obj = {};

function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() ); // true
```
