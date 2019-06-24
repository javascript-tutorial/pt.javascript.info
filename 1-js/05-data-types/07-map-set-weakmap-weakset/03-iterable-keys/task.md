importância: 5

---

# Chaves Iteráveis

Queremos obter um array de `map.keys()` e continuar trabalhando com ele (além do próprio map).

Mas existe um problema:

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
