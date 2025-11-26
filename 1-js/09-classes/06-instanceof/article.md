# Verificação de classe: "instanceof"

O operador `instanceof` permite checar se um objeto pertence a uma determinada classe. Também leva a herança em consideração.

Essa verificação pode ser necessária em diversos casos. Por exemplo, pode ser usada para construir uma função *polimórfica*, aquela que lida com argumentos de forma diferente dependendo do seu tipo.

## O operador instanceof [#ref-instanceof]

A sintaxe é:
```js
obj instanceof Class
```

O código retorna `true` se `obj` pertence à `Class` ou a uma classe herdada dela.

Por exemplo:

```js run
class Rabbit {}
let rabbit = new Rabbit();

// é um objeto da classe Rabbit?
*!*
alert( rabbit instanceof Rabbit ); // true
*/!*
```

Também funciona com funções construtoras:

```js run
*!*
// ao invés de class
function Rabbit() {}
*/!*

alert( new Rabbit() instanceof Rabbit ); // true
```

...E também com classes nativas como `Array`:

```js run
let arr = [1, 2, 3];
alert( arr instanceof Array ); // true
alert( arr instanceof Object ); // true
```

Perceba que `arr` também pertence à classe `Object`. Isso porque `Array` de forma prototípica herda de `Object`.

Normalmente `instanceof` examina a cadeia de protótipos para a verificação. Também podemos definir uma lógica customizada no método estático `Symbol.hasInstance`. 

O algoritmo de `obj instanceof Class` funciona mais ou menos da seguinte forma:

1. Se houver um método estático `Symbol.hasInstance`, basta executá-lo como: `Class[Symbol.hasInstance](obj)`. Ele deve retornar `true` ou `false`, e é tudo. É assim que podemos customizar o comportamento de `instanceof`.

    Por exemplo:

    ```js run
    // configura a verificação de instanceOf para assumir que
    // qualquer coisa com a propriedade canEat é um animal
    class Animal {
      static [Symbol.hasInstance](obj) {
        if (obj.canEat) return true;
      }
    }

    let obj = { canEat: true };

    alert(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) é executado
    ```

2. A maioria das classes não possui `Symbol.hasInstance`. Nesse caso, a lógica padrão é usada: `obj instanceOf Class` verfica se  `Class.prototype` é igual a um dos protótipos na cadeia de protótipos de `obj`.

    Em outras palavras, compara um após o outro:
    ```js
    obj.__proto__ === Class.prototype?
    obj.__proto__.__proto__ === Class.prototype?
    obj.__proto__.__proto__.__proto__ === Class.prototype?
    ...
    // se qualquer reposta for verdadeira, retorna true
    // do contrário, se chegarmos ao fim da cedeia, retorna false
    ```

    No exemplo acima `rabbit.__proto__ === Rabbit.prototype`, de modo que dá a resposta imediatamente.

    No caso de uma herança, a correspondência será na segunda etapa: 

    ```js run
    class Animal {}
    class Rabbit extends Animal {}

    let rabbit = new Rabbit();
    *!*
    alert(rabbit instanceof Animal); // true
    */!*

    // rabbit.__proto__ === Animal.prototype (sem correspondência)
    *!*
    // rabbit.__proto__.__proto__ === Animal.prototype (correspondência!)
    */!*
    ```

Aqui está a ilustração do que `rabbit instanceof Animal` vai comparar com `Animal.prototype`

![](instanceof.svg)

A propósito, também existe um método [objA.isPrototypeOf(objB)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf), que retorna `true` se `objA` está em algum lugar na cadeia de protótipos do `objB`. Então o teste de `obj instanceof Class` pode ser reescrito como `Class.prototype.isPrototypeOf(obj)`.

É engraçado, mas o próprio construtor `Class` não participa na verificação! Apenas a cadeia de protótipos e `Class.prototype` importam.  

Isso pode levar a consequências interessantes quando uma propriedade `prototype` é alterada depois que um objeto é criado. 

Como nesse exemplo:

```js run
function Rabbit() {}
let rabbit = new Rabbit();

// alterou o prototype
Rabbit.prototype = {};

// ...não é mais um coelho!
*!*
alert( rabbit instanceof Rabbit ); // false
*/!*
```

## Bonus: Object.prototype.toString para o tipo

Já sabemos que objetos simples convertidos para string exibem o texto `[object Object]`:

```js run
let obj = {};

alert(obj); // [object Object]
alert(obj.toString()); // o mesmo
```

Essa é a implementação deles de `toString`. Porém, há uma característica escondida que torna `toString` realmente muito mais poderoso do que isso. Podemos usá-lo como um `typeof` estendido e uma alternativa para `instanceof`

Soa estranho? De fato. Vamos desmistificar.

Pela [especificação](https://tc39.github.io/ecma262/#sec-object.prototype.tostring), o `toString` nativo pode ser extraído do objeto e executado no contexto de qualquer outro valor. E o seu resultado depende desse valor.

- Para um número, será `[object Number]`
- Para boleano, será `[object Boolean]`
- Para `null`: `[object Null]`
- Para `undefined`: `[object Undefined]`
- Para arrays: `[object Array]`
- ...etc (customizável).

Vamos demonstrar:

```js run
// copia o método toString para uma variável por conveniência
let objectToString = Object.prototype.toString;

// Que tipo é esse?
let arr = [];

alert( objectToString.call(arr) ); // [object *!*Array*/!*]
```

Aqui usamos [call](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Function/call) como descrito no capítulo [](info:call-apply-decorators) para executar a função `objectToString` no contexto `this=arr`.

Internamente, o algoritmo `toString` examina `this` e retorna o resultado correspondente. Mais exemplos:

```js run
let s = Object.prototype.toString;

alert( s.call(123) ); // [object Number]
alert( s.call(null) ); // [object Null]
alert( s.call(alert) ); // [object Function]
```

### Symbol.toStringTag

O comportamento de Object `toString` pode ser personalizado usando uma propriedade de objeto especial `Symbol.toStringTag`.

Por exemplo:

```js run
let user = {
  [Symbol.toStringTag]: "User"
};

alert( {}.toString.call(user) ); // [object User]
```

Para a maioria dos objetos nativos aos diversos ambientes, existe essa propriedade. Aqui estão alguns exemplos específicos do navegador:

```js run
// toStringTag para o objeto e a classe nativos ao ambiente:
alert( window[Symbol.toStringTag]); // Window
alert( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

alert( {}.toString.call(window) ); // [object Window]
alert( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]
```

Como pode ver, o resultado é exatamente `Symbol.toStringTag` (Se existir), dentro de `[object ...]`.

No final, temos "typeof com esteróides" que não funciona apenas para dados primitivos, mas também para objetos nativos e pode até mesmo ser personalizado.

Podemos usar `{}.toString.call` ao invés de `instanceof` para objetos nativos quando queremos obter o tipo como uma string em vez de apenas verificar.

## Conclusão

Vamos listar os métodos de checagem de tipos que conhecemos:

|               | funciona para   |  retorna      |
|---------------|-----------------|---------------|
| `typeof`      | primitivos      |  string       |
| `{}.toString` | primitivos, objetos nativos, objetos com `Symbol.toStringTag`   |       string |
| `instanceof`  | objetos         |  true/false   |

Como podemos ver, `{}.toString` é tecnicamente um `typeof` "mais avançado".

E o operador `instanceof` realmente brilha quando estamos trabalhando com uma hierarquia de classe e queremos verificar a classe considerando a herança.
