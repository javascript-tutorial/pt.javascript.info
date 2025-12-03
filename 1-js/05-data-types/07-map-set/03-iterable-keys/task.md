importance: 5

---

# Iterable keys

Gostaríamos de obter um array de `map.keys()` em uma variável e, em seguida, aplicar métodos específicos de array a ele, como `.push`.

Mas isso não funciona:

```js run
let map = new Map();

map.set("name", "John");

let keys = map.keys();

*!*
// Error: keys.push is not a function
keys.push("more");
*/!*
```

Por quê? Como podemos corrigir o código para fazer com que `keys.push` funcione?
