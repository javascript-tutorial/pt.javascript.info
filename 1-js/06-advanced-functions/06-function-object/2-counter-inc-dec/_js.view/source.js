function makeCounter() {
  let count = 0;

  // ... seu código ...
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

counter.set(10); // define a nova contagem

alert( counter() ); // 10

counter.decrease(); // diminui a contagem em 1

alert( counter() ); // 10 (em vez de 11)
