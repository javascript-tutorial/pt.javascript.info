importância: 5

---

# Por que os dois hamsters estão cheios?

Nós temos dois hamsters: `speedy` e `lazy`, que herdam do objeto genérico `hamster`.

Quando nós alimentamos um deles, o outro também fica cheio. Por quê? Como podemos corrigir isso?

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// Esse aqui encontrou a comida
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Esse aqui também comeu, por quê? Corrija, por favor.
alert( lazy.stomach ); // apple
```

