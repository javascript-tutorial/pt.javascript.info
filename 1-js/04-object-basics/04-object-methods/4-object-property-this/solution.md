**Resposta: um erro.**

Tente isto:
```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
};

let user = makeUser();

alert( user.ref.name ); // Error: Cannot read property 'name' of undefined
                        // (Erro: não é possível ler a propriedade 'name' de undefined)
```

Isto, porque regras que estabelecem `this` não têm em conta objetos literais.

Aqui, o valor de `this` dentro de `makeUser()` está `undefined`, porque é invocado como uma função, não como um método.

E um objeto literal não possui qualquer efeito sobre `this`. O valor de `this` é o mesmo para toda uma função, e tanto blocos de código como objetos literais não exercem qualquer influência sobre ele.

Assim, na realidade `ref: this` recebe o valor atual `this` da função.

Aqui, o caso oposto:

```js run
function makeUser() {
  return {
    name: "John",
*!*
    ref() {
      return this;
    }
*/!*
  };
};

let user = makeUser();

alert( user.ref().name ); // 'John'
```

Agora funciona, porque `user.ref()` é um método. E, o valor de `this` já é uma referência ao objeto antes do ponto `.`.


