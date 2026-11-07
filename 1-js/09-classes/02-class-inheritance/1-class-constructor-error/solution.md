Isso acontece porque o construtor filho precisa chamar `super()`.

Aqui está o código corrigido:

```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {  
    *!*
    super(name);
    */!*
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("White Rabbit"); // ok agora
*/!*
alert(rabbit.name); // White Rabbit
```
