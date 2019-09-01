importance: 5

---

# Chaves Iteráveis

Gostariamos de obter um array de `map.keys()` em uma variável e então aplicar métodos específicos de array nele, por exemplo `.push`.

Mas isso não funciona:

```js run
let map = new Map();

map.set("name", "John");

let keys = map.keys();

*!*
// Erro: keys.push não é uma função
keys.push("more");
*/!*
```

Por quê? Como podemos consertar o código para fazer `keys.push` funcionar?
