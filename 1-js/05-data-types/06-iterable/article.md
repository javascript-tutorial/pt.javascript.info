
# Iteráveis

Objetos *Iteráveis* são uma generalização de arrays. Esse é um conceito que permite tornar qualquer objeto utilizável em um loop `for..of`.

Claro, Arrays são iteráveis. Mas há muitos outros objetos internos, que também são iteráveis. Por exemplo, Strings são iteráveis ​​também. Como veremos, muitos operadores e métodos integrados dependem deles.

Se um objeto representa uma coleção (lista, conjunto) de alguma coisa, então `for..of` é uma ótima sintaxe para fazer um loop sobre ele, então vamos ver como fazê-lo funcionar.


## Symbol.iterator

Podemos facilmente entender o conceito de iteráveis ​​fazendo o nosso próprio.

Por exemplo, temos um objeto, que não é um array, mas parece adequado para `for..of`.

Como um objeto `range` que representa um intervalo de números:

```js
let range = {
  from: 1,
  to: 5
};

// Queremos que o for..of funcione:
// for(let num of range) ... num=1,2,3,4,5
```

Para tornar o `range` iterável (e, portanto, fazer o `for..of` funcionar), precisamos adicionar um método ao objeto chamado `Symbol.iterator` (um símbolo embutido especialmente para isso).

1. Quando `for..of` inicia, ele chama esse método uma vez (ou erros se não for encontrado). O método deve retornar um *iterador* - um objeto com o método `next`.
2. Em diante, `for..of` funciona *apenas com esse objeto retornado*.
3. Quando `for..of` quer o próximo valor, ele chama `next()` nesse objeto.
4. O resultado de `next ()` deve ter a forma `{done: Boolean, value: any}`, onde `done = true` significa que a iteração está terminada, caso contrário `value` deve ser o novo valor.

Aqui está a implementação completa para o `range`:

```js run
let range = {
  from: 1,
  to: 5
};

// 1. chamada para for..of inicialmente chama isso
range[Symbol.iterator] = function() {

// ...retorna o objeto iterador:
  // 2. Daqui em diante, for..of funciona apenas com este iterador, solicitando os próximos valores
  return {
    current: this.from,
    last: this.to,      

    // 3. next () é chamado em cada iteração pelo loop for..of
    next() {
      // 4. ele deve retornar o valor como um objeto {done:.., value:...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// agora funciona!
for (let num of range) {
  alert(num); // 1, então 2, 3, 4, 5
}
```

Observe a principal característica dos iteráveis: uma importante separação de interesses:

- O `range` em si não possui o método `next() `.
- Em vez disso, outro objeto, o chamado "iterador", é criado pela chamada para `range[Symbol.iterator]()`, e manipula toda a iteração.

Assim, o objeto iterador é separado do objeto que é iterado.

Tecnicamente, podemos mesclá-los e usar `range` como o iterador para tornar o código mais simples.

Assim:

```js run
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};

for (let num of range) {
  alert(num); // 1, então 2, 3, 4, 5
}
```

Agora o `range[Symbol.iterator]()` retorna o objeto `range` em si: ele possui o método `next()` necessário e lembra o progresso atual da iteração em `this.current`. Mais curta? Sim. E às vezes tudo bem também.

A desvantagem é que agora é impossível ter dois loops `for..of` passando sobre o objeto simultaneamente: eles compartilharão o estado de iteração, porque há apenas um iterador - o objeto em si. Mas dois aspectos paralelos são uma coisa rara, factível com alguns cenários assíncronos.

```smart header="Iteradores infinitos"
Os iteradores infinitos também são possíveis. Por exemplo, o `range` se torna infinito para `range.to = Infinity`. Ou podemos fazer um objeto iterável que gera uma sequência infinita de números pseudo-aleatórios. Também pode ser útil.

Não há limitações em `next`, ele pode retornar mais e mais valores, isso é normal.

É claro que o loop `for..of` sobre tal iterável seria infinito. Mas sempre podemos pará-lo usando `break`.
```


## A string é iterável

Arrays e strings são os iteráveis ​​incorporados mais usados.

Para uma string, `for..of` itera sobre seus caracteres:

```js run
for (let char of "test") {
  // dispara 4 vezes: uma vez para cada caractere
  alert( char ); // t, então e, então s, então t
}
```

E funciona corretamente com pares substitutos!

```js run
let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳, e depois 😂
}
```

## Chamando um iterador explicitamente

Normalmente, os internos de iteráveis ​​são ocultados do código externo. Existe um loop `for..of` que funciona, é tudo que ele precisa saber.

Mas, para entender as coisas um pouco mais profundamente, vamos ver como criar um iterador explicitamente.

Vamos iterar por uma string da mesma maneira que `for..of`, mas com chamadas diretas. Esse código obtém um iterador de string e o chama "manualmente":

```js run
let str = "Hello";

// faz o mesmo que
// for (let char of str) alert(char);

let iterator = str[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // alerta caracteres um por um
}
```

Isso raramente é necessário, mas nos dá mais controle sobre o processo do que `for..of`. Por exemplo, podemos dividir o processo de iteração: iterar um pouco, depois parar, fazer outra coisa e depois retomar mais tarde.

## Iteráveis e array-likes [#array-like]

Existem dois termos oficiais que parecem semelhantes, mas são muito diferentes. Por favor, certifique-se de entendê-los bem para evitar a confusão.

- *Iteráveis* são objetos que implementam o método `Symbol.iterator`, conforme descrito acima.
- *Array-likes* são objetos que possuem índices e `length`, então eles se parecem com arrays.

Naturalmente, essas propriedades podem combinar. Por exemplo, as strings são iteráveis ​​(`for..of` funciona nelas) e são parecidas com array (possuem índices numéricos e `length`).

Mas um iterável pode não ser um array-like. E vice-versa, um array-like pode não ser iterável.

Por exemplo, o `range` no exemplo acima é iterável, mas não é array-like, porque não possui propriedades indexadas e` length`.

E aqui está o objeto que é semelhante a um array, mas não é iterável:

```js run
let arrayLike = { // tem índices e length => array-like
  0: "Hello",
  1: "World",
  length: 2
};

*!*
// Erro (não possui Symbol.iterator)
for (let item of arrayLike) {}
*/!*
```

O que eles têm em comum? Ambos iteráveis e array-likes são geralmente *não arrays*, eles não têm `push`, `pop` etc. Isso é bastante inconveniente se tivermos um objeto e quisermos trabalhar com ele como em um array.

## Array.from

Existe um método universal [Array.from](mdn:js/Array/from) que os une. Ele recebe um valor iterável ou semelhante a um array e cria um "array" "real" a partir dele. Então podemos chamar métodos de array nele.

Por exemplo:

```js run
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

*!*
let arr = Array.from(arrayLike); // (*)
*/!*
alert(arr.pop()); // World (o método funciona)
```

`Array.from` na linha `(*)` pega o objeto, examina se é iterável ou array-like, então cria um novo array e copia todos os itens.

O mesmo acontece para um iterável:

```js
// assumindo que range é obtido do exemplo acima
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (conversão array toString funciona)
```

A sintaxe completa do `Array.from` permite fornecer uma função opcional de "mapeamento ":
```js
Array.from(obj[, mapFn, thisArg])
```

O segundo argumento `mapFn` deve ser a função a ser aplicada a cada elemento antes de ser adicionado ao array, e `thisArg` permite definir `this` para ele.

Por exemplo:

```js
// assumindo que range é obtido do exemplo acima

// eleva cada número ao quadrado
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
```

Aqui nós usamos `Array.from` para transformar uma string em um array de caracteres:

```js run
let str = '𝒳😂';

// divide str em um array de caracteres
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

Ao contrário de `str.split`, ele depende da natureza iterável da string e, assim como `for..of`, funciona corretamente com pares substitutos.

Tecnicamente aqui faz o mesmo que:

```js run
let str = '𝒳😂';

let chars = []; // Array.from internamente faz o mesmo loop
for (let char of str) {
  chars.push(char);
}

alert(chars);
```

...mas é mais curto.

Nós podemos até criar `slice` que entendem pares substitutos nele:

```js run
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str = '𝒳😂𩷶';

alert( slice(str, 1, 3) ); // 😂𩷶

// método nativo não suporta pares substitutos
alert( str.slice(1, 3) ); // lixo (duas partes de diferentes pares substitutos)
```


## Resumo

Objetos que podem ser usados ​​em `for..of` são chamados *iteráveis*.

Tecnicamente, os iteráveis devem implementar o método chamado `Symbol.iterator`.
    - O resultado de `obj[Symbol.iterator]` é chamado de *iterador*. Ele lida com o processo de iteração adicional.
    - Um iterador deve ter o método `next()` que retorna um objeto `{done: Boolean, value: any}`, aqui `done: true` denota o fim da iteração, caso contrário o `value` é o próximo valor.
- O método `Symbol.iterator` é chamado automaticamente por `for..of`, mas também podemos fazê-lo diretamente.
- Iteráveis internos, como strings ou arrays, também implementam o `Symbol.iterator`.
- Iteradores de string reconhecem pares substitutos.


Objetos que possuem propriedades indexadas e `length` são chamados de *array-like*. Esses objetos também podem ter outras propriedades e métodos, mas não possuem os métodos incorporados de arrays.

Se olharmos dentro da especificação - veremos que a maioria dos métodos incorporados pressupõe que eles trabalhem com iteráveis ​​ou com arrays em vez de arrays "reais", porque isso é mais abstrato.

`Array.from(obj[, mapFn, thisArg])` faz um `Array` real de um `obj` iterável ou um array-like, e nós podemos usar métodos array nele. Os argumentos opcionais `mapFn` e` thisArg` nos permitem aplicar uma função para cada item.
