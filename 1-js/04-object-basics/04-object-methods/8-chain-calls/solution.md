A solução será retornar o próprio objeto em cada invocação.

```js run demo
let ladder = {
  step: 0,
  up() {
    this.step++;
*!*
    return this;
*/!*
  },
  down() {
    this.step--;
*!*
    return this;
*/!*
  },
  showStep() {
    alert( this.step );
*!*
    return this;
*/!*
  }
};

ladder.up().up().down().up().down().showStep(); // 1
```

Nós também podemos escrever uma única invocação por linha. Para longas cadeias é mais legível:

```js
ladder
  .up()
  .up()
  .down()
  .up()
  .down()
  .showStep(); // 1
```
