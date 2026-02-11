importance: 2

---

# Encadeamento

Existe um objeto `ladder` que permite subir e descer:

```js
let ladder = {
  step: 0,
  up() {
    this.step++;
  },
  down() {
    this.step--;
  },
  showStep: function() { // mostra o degrau atual
    alert( this.step );
  }
};
```

Agora, se precisarmos fazer várias chamadas em sequência, podemos fazer assim:

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
```

Modifique o código de `up`, `down` e `showStep` para tornar as chamadas encadeáveis, assim:

```js
ladder.up().up().down().showStep().down().showStep(); // mostra 1 depois 0
```

Essa abordagem é amplamente usada em bibliotecas JavaScript.
