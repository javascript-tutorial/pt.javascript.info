
Isso acontece porque `map.keys()` retorna um iterável, mas não um array.

Podemos convertê-lo em um array usando `Array.from`:


```js run
let map = new Map();

map.set("name", "John");

*!*
let keys = Array.from(map.keys());
*/!*

keys.push("more");

alert(keys); // name, more
```
