Vamos ver cuidadosamente o que está acontecendo na chamada `speedy.eat("apple")`.

1. O método `speedy.eat` é encontrado no protótipo (`=hamster`), e executado usando `this=speedy` (o objeto antes do ponto).

2. Então o método `this.stomach.push()` precisa de encontrar uma propriedade `stomach` e chamar o `push` nela. Ele procura por um `stomach` no `this` (`=speedy`), mas não encontra.

3. Aí ele segue a cadeia de protótipos e encontra `stomach` no `hamster`.

4. Por fim, ele chama o `push`, adicionando a comida (*food*) dentro do *`stomach` do protótipo*.

Então, todos os hamsters compartilham o mesmo estômago!

Toda vez que o `stomach` é obtido do protótipo, o `stomach.push` modifica ele "lá mesmo".

Note que isso não acontece no caso de uma simples atribuição `this.stomach=`:

```js run
let hamster = {
  stomach: [],

  eat(food) {
*!*
    // atribui o valor para this.stomach ao invés de usar this.stomach.push
    this.stomach = [food];
*/!*
  }
};

let speedy = {
   __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// O Speedy acha a comida
speedy.eat("maçã");
alert( speedy.stomach ); // maçã

// O estômago do Lazy continua vazio
alert( lazy.stomach ); // <vazio>
```

Agora tudo funciona bem, porque `this.stomach=` não procura por um `stomach`. O valor é escrito diretamente no `this` do objeto.

Além disso, nós podemos evitar completamente o problema fazendo com que cada hamster tenha seu próprio estômago:

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

let lazy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

// O Speedy acha a comida
speedy.eat("maçã");
alert( speedy.stomach ); // maçã

// O estômago do Lazy continua vazio
alert( lazy.stomach ); // <vazio>
```

É uma solução comum fazer com que todas as propriedades que descrevem um estado particular do objeto, como o `stomach` acima, sejam escritas dentro do próprio objeto. Isso previne esses problemas.
