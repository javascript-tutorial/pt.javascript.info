Primeiro, vamos ver por que o segundo código não funciona.

O motivo fica óbvio se tentarmos rodá-lo. O construtor de uma classe que herda precisa chamar `super()`. Caso contrário, o `"this"` não será "definido".

Então aqui está a correção:

```js run
class Rabbit extends Object {
  constructor(name) {
*!*
    super(); // precisamos chamar o construtor da classe pai ao herdar
*/!*
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // true
```

Mas isso ainda não é tudo.

Mesmo depois da correção, ainda existe uma diferença importante entre `"class Rabbit extends Object"` e `class Rabbit`.

Como sabemos, a sintaxe "extends" configura dois protótipos:

1. Entre o `"prototype"` das funções construtoras (para métodos).
2. Entre as próprias funções construtoras (para métodos estáticos).

No caso de `class Rabbit extends Object`, isso significa:

```js run
class Rabbit extends Object {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) true
```

Então `Rabbit` agora fornece acesso aos métodos estáticos de `Object` através de `Rabbit`, assim:

```js run
class Rabbit extends Object {}

*!*
// normalmente chamamos Object.getOwnPropertyNames
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // a,b
*/!*
```

Mas se não tivermos `extends Object`, então `Rabbit.__proto__` não é definido como `Object`.

Aqui está a demonstração:

```js run
class Rabbit {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) false (!)
alert( Rabbit.__proto__ === Function.prototype ); // como qualquer função por padrão

*!*
// erro, não existe essa função em Rabbit
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // Error
*/!*
```

Então, nesse caso, `Rabbit` não fornece acesso aos métodos estáticos de `Object`.

Aliás, `Function.prototype` também tem métodos "genéricos" de função, como `call`, `bind`, etc. Eles acabam disponíveis em ambos os casos, porque, para o construtor nativo `Object`, `Object.__proto__ === Function.prototype`.

Aqui está a imagem:

![](rabbit-extends-object.svg)

Então, resumindo, existem duas diferenças:

| class Rabbit | class Rabbit extends Object  |
|--------------|------------------------------|
| --             | precisa chamar `super()` no construtor |
| `Rabbit.__proto__ === Function.prototype` | `Rabbit.__proto__ === Object` |
