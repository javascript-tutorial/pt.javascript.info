importance: 5

---

# Objeto contador

Aqui um objeto contador é criado com a ajuda de uma função construtora.

Vai funcionar? O que vai mostrar?

```js
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // ?
alert( counter.up() ); // ?
alert( counter.down() ); // ?
```

