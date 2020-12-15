importance: 2

---

# Encadeamento

Existe um objeto `ladder` (escada) que permite subir e descer:

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

Agora, se precisarmos de fazer várias chamadas em sequência, podemos as efetuar desta forma:

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
```

Modifique o código de `up`, `down` e `showStep` para tornar as chamadas encadeáveis, como:

```js
ladder.up().up().down().showStep(); // 1
```

Tal abordagem é amplamente utilizada em bibliotecas (*libraries*) de JavaScript.
