

```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

// confira
function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // mostra 3 depois de 1 segundo
```

Note que: nós usamos `this` no `f.apply` para nossa decoração funcionar para métodos de objetos.

Então, se a função *wrapper* é chamada como um método de um objeto, então o this é passado para o método `f` original.

```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

let user = {
  name: "John",
  sayHi() {
    alert(this.name);
  }
}

user.sayHi = user.sayHi.defer(1000);

user.sayHi();
```
