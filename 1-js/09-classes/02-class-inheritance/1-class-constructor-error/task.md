importance: 5

---

# Erro ao criar uma instância

Aqui está o código com `Rabbit` estendendo `Animal`.

Infelizmente, objetos de `Rabbit` não podem ser criados. O que está errado? Corrija.
```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {  
    this.name = name;
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("White Rabbit"); // Error: this is not defined
*/!*
alert(rabbit.name);
```
