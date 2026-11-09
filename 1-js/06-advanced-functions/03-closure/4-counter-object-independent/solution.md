
Com certeza vai funcionar direitinho.

As duas funções aninhadas são criadas dentro do mesmo Ambiente Léxico externo, então elas compartilham acesso à mesma variável `count`:

```js run
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

alert( counter.up() ); // 1
alert( counter.up() ); // 2
alert( counter.down() ); // 1
```
