**Resposta: um erro.**

Experimente:
```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // Error: Cannot read property 'name' of undefined
```

Isso é porque as regras que definem `this` não olham para a definição do objeto. Apenas o momento da chamada importa.

Aqui o valor de `this` dentro de `makeUser()` é `undefined`, porque ela é chamada como uma função, não como um método com sintaxe de "ponto".

O valor de `this` é único para toda a função, blocos de código e literais de objeto não o afetam.

Então `ref: this` na verdade obtém o `this` atual da função.

Podemos reescrever a função e retornar o mesmo `this` com valor `undefined`:

```js run
function makeUser(){
  return this; // desta vez não há literal de objeto
}

alert( makeUser().name ); // Error: Cannot read property 'name' of undefined
```
Como você pode ver, o resultado de `alert( makeUser().name )` é o mesmo que o resultado de `alert( user.ref.name )` do exemplo anterior.

Aqui está o caso oposto:

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
}

let user = makeUser();

alert( user.ref().name ); // John
```

Agora funciona, porque `user.ref()` é um método. E o valor de `this` é definido como o objeto antes do ponto `.`.
