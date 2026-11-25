
A primeira chamada tem `this == rabbit`, as outras têm `this` igual a `Rabbit.prototype`, porque ele é, na verdade, o objeto antes do ponto.

Então só a primeira chamada mostra `Rabbit`, as outras mostram `undefined`:

```js run
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert( this.name );
}

let rabbit = new Rabbit("Rabbit");

rabbit.sayHi();                        // Rabbit
Rabbit.prototype.sayHi();              // undefined
Object.getPrototypeOf(rabbit).sayHi(); // undefined
rabbit.__proto__.sayHi();              // undefined
```
