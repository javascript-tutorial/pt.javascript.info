
# Estendendo classes nativas

Classes nativas como Array, Map e outras também podem ser estendidas.

Por exemplo, aqui `PowerArray` herda do `Array` nativo:

```js run
// adiciona mais um método (pode fazer mais)
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false
```

Note uma coisa muito interessante. Métodos nativos, como `filter`, `map` e outros retornam novos objetos exatamente do tipo herdado `PowerArray`. Sua implementação interna usa a propriedade `constructor` do objeto para isso.

No exemplo acima,
```js
arr.constructor === PowerArray
```

Quando `arr.filter()` é chamado, ele internamente cria o novo array de resultados usando exatamente `arr.constructor`, não o básico `Array`. Isso é realmente interessante, porque podemos continuar utilizando os métodos de `PowerArray` no resultado.

Ainda mais, podemos personalizar este comportamento.

Podemos adicionar um getter estático especial chamado `Symbol.species` à classe. Se ele existir, deve retornar o construtor que o JavaScript usará internamente para criar novas entidades em `map`, `filter` e assim por diante.

Se quisermos que os métodos nativos como `map` ou `filter` retornem arrays regulares, podemos retornar `Array` em `Symbol.species`, como nesse exemplo:

```js run
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

*!*
  // métodos nativos usarão isso como o construtor
  static get [Symbol.species]() {
    return Array;
  }
*/!*
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

// filter cria um novo array usando arr.constructor[Symbol.species] como constructor
let filteredArr = arr.filter(item => item >= 10); 

*!*
// filteredArr não é PowerArray, mas Array
*/!*
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function
```

Como você pode ver, agora `.filter` retorna `Array`. Assim, a funcionalidade estendida não é repassada adiante.

```smart header="Outras coleções funcionam similarmente"
Outras coleções, como `Map` e `Set, funcionam da mesma forma. Elas também utilizam `Symbol.species`.
```

## Sem herança estática em objetos nativos

Objetos nativos possuem seus próprios métodos estáticos, por exemplo `Object.keys`, `Array.isArray`, etc.

Como já sabemos, classes nativas se estendem. Por exemplo, `Array` estende de `Object`.

Normalmente, quando uma classe estende outra, métodos estáticos e não estáticos são herdados. Isso foi explicado detalhadamente no artigo [](info:static-properties-methods#statics-and-inheritance).

Mas as classes nativas são uma exceção. Elas não herdam métodos estáticos uma das outras.

Por exemplo, tanto `Array` quanto `Date` herdam de `Object`, então suas instâncias têm métodos de `Object.prototype`. No entanto `Array.[[Prototype]]` não referencia `Object`, então não existe, por exemplo, um método estático `Array.keys()` (ou `Date.keys()`).

Aqui está a estrutura visual para `Date` e `Object`:

![](object-date-inheritance.svg)

Como você pode ver, não existe ligação entre `Date` e `Object`. Eles são independentes, apenas `Date.prototype` herda de `Object.prototype`.

Essa é uma diferença importante de herança entre objetos nativos em comparação com o que obtemos com `extends`.
