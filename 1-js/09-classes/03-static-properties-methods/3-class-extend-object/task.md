importance: 3

---

# Class extends Object?

Como sabemos, todos os objetos normalmente herdam de `Object.prototype` e têm acesso aos métodos "genéricos" de objeto, como `hasOwnProperty`, etc.

Por exemplo:

```js run
class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

*!*
// o método hasOwnProperty vem de Object.prototype
alert( rabbit.hasOwnProperty('name') ); // true
*/!*
```

Mas se escrevermos isso explicitamente como `"class Rabbit extends Object"`, o resultado seria diferente de um simples `"class Rabbit"`?

Qual é a diferença?

Aqui está um exemplo desse código (ele não funciona -- por quê? corrija-o?):

```js
class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // Error
```
