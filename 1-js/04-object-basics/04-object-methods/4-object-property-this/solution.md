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

alert( user.ref.name ); // Error: Cannot read property 'name' of undefined (Erro: não é possível ler a propriedade 'name' de undefined)
```

Isto, porque as regras que regulam `this` não olham para a definição do objeto. O que apenas importa é o momento da chamada.

Aqui, o valor de `this` dentro de `makeUser()` é `undefined`, porque ela é invocada como uma função, não como um método usando a sintaxe com "ponto".

O valor de `this` é o mesmo para toda uma função, e nem blocos de código nem objetos literais o afetam.

Assim, na verdade `ref: this` recebe o presente valor `this` da função.

Nós podemos reescrever a função, e retornar o mesmo `this` com o valor `undefined`:

```js run
function makeUser(){
  return this; // desta vez, não existe um objeto literal
}

alert( makeUser().name ); // Error: Cannot read property 'name' of undefined (Erro: não é possível ler a propriedade 'name' de undefined)
```
Como você pode ver, o resultado de `alert( makeUser().name )` é o mesmo que o resultado de `alert( user.ref.name )` no exemplo anterior.

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

alert( user.ref().name ); // 'John'
```

Agora funciona, porque `user.ref()` é um método. E, o valor de `this` é a referência ao objeto antes do ponto `.`.
