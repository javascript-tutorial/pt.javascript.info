
# Objetos iteráveis

Objetos *iteráveis* são uma generalização dos arrays. Esse é um conceito que permite usar qualquer objeto em um laço `for..of`.

Claro, arrays são iteráveis. Mas existem vários outros objetos nativos que também são iteráveis. Strings, por exemplo, também são iteráveis.

Se um objeto não é tecnicamente um array, mas representa uma coleção (lista, conjunto) de alguma coisa, o `for..of` é uma ótima sintaxe para percorrê-lo -- então vamos ver como fazer isso funcionar.


## Symbol.iterator

Podemos entender bem o conceito de objetos iteráveis criando um do zero.

Por exemplo, temos um objeto que não é um array, mas parece ser um bom candidato para o `for..of`.

Como um objeto `range`, que representa um intervalo de números:

```js
let range = {
  from: 1,
  to: 5
};

// Queremos que o for..of funcione:
// for(let num of range) ... num=1,2,3,4,5
```

Para tornar o objeto `range` iterável (e assim fazer o `for..of` funcionar), precisamos adicionar um método ao objeto chamado `Symbol.iterator` (um símbolo especial, já embutido na linguagem, feito justamente para isso).

1. Quando o `for..of` começa, ele chama esse método uma única vez (ou lança um erro se não encontrá-lo). O método deve retornar um *iterador* -- um objeto com o método `next`.
2. A partir daí, o `for..of` trabalha *apenas com esse objeto retornado*.
3. Quando o `for..of` quer o próximo valor, ele chama `next()` nesse objeto.
4. O resultado de `next()` deve ter a forma `{done: Boolean, value: any}`, onde `done=true` significa que o laço terminou, e, caso contrário, `value` é o próximo valor.

Aqui está a implementação completa do `range`, com comentários explicando cada parte:

```js run
let range = {
  from: 1,
  to: 5
};

// 1. a chamada inicial do for..of invoca isso
range[Symbol.iterator] = function() {

  // ...e retorna o objeto iterador:
  // 2. a partir daí, o for..of trabalha apenas com esse iterador, pedindo a ele os próximos valores
  return {
    current: this.from,
    last: this.to,

    // 3. next() é chamado a cada iteração do laço for..of
    next() {
      // 4. ele deve retornar o valor como um objeto {done:.., value :...}
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
  alert(num); // 1, depois 2, 3, 4, 5
}
```

Observe a característica central dos objetos iteráveis: a separação de responsabilidades.

- O `range` em si não possui o método `next()`.
- Em vez disso, outro objeto, chamado "iterador", é criado pela chamada `range[Symbol.iterator]()`, e é o `next()` desse iterador que gera os valores da iteração.

Ou seja, o objeto iterador fica separado do objeto sobre o qual ele itera.

Tecnicamente, podemos juntar os dois e usar o próprio `range` como iterador, deixando o código mais simples.

Desta forma:

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
  alert(num); // 1, depois 2, 3, 4, 5
}
```

Agora `range[Symbol.iterator]()` retorna o próprio objeto `range`: ele já tem o método `next()` necessário e guarda o progresso da iteração atual em `this.current`. Mais curto? Sim. E às vezes isso também serve.

A desvantagem é que agora fica impossível ter dois laços `for..of` rodando sobre o objeto ao mesmo tempo: eles vão compartilhar o estado da iteração, já que existe apenas um iterador -- o próprio objeto. Mas dois `for..of` em paralelo é algo raro, mesmo em cenários assíncronos.

```smart header="Iteradores infinitos"
Iteradores infinitos também são possíveis. Por exemplo, o `range` se torna infinito se usarmos `range.to = Infinity`. Ou podemos criar um objeto iterável que gera uma sequência infinita de números pseudoaleatórios. Isso também pode ser útil.

Não há nenhuma restrição sobre o `next`, ele pode continuar retornando valores indefinidamente, e isso é perfeitamente normal.

Claro, um laço `for..of` sobre um iterável desses nunca terminaria por conta própria. Mas sempre podemos interrompê-lo usando `break`.
```


## Strings são iteráveis

Arrays e strings são os objetos iteráveis nativos mais usados.

Em uma string, o `for..of` percorre seus caracteres:

```js run
for (let char of "test") {
  // é executado 4 vezes: uma para cada caractere
  alert( char ); // t, depois e, depois s, depois t
}
```

E funciona corretamente até com pares substitutos!

```js run
let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳, e depois 😂
}
```

## Chamando um iterador explicitamente

Para entender melhor como tudo isso funciona por baixo dos panos, vamos usar um iterador de forma explícita.

Vamos percorrer uma string exatamente da mesma forma que o `for..of` faz, mas chamando os métodos diretamente. Esse código cria um iterador de string e pega os valores dele "manualmente":

```js run
let str = "Hello";

// faz o mesmo que
// for (let char of str) alert(char);

*!*
let iterator = str[Symbol.iterator]();
*/!*

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // mostra os caracteres um por um
}
```

Isso raramente é necessário, mas nos dá mais controle sobre o processo do que o `for..of`. Por exemplo, podemos dividir o processo de iteração: iterar um pouco, parar, fazer outra coisa, e continuar depois.

## Iteráveis e objetos semelhantes a array [#array-like]

Dois termos oficiais parecem semelhantes, mas são bem diferentes. Entenda-os bem para não se confundir.

- *Iteráveis* são objetos que implementam o método `Symbol.iterator`, como descrito acima.
- *Array-likes* (ou "semelhantes a array") são objetos que têm índices e `length`, e por isso se parecem com arrays.

Quando usamos JavaScript em tarefas práticas, seja no navegador ou em qualquer outro ambiente, podemos encontrar objetos que são iteráveis, semelhantes a array, ou os dois ao mesmo tempo.

Strings, por exemplo, são tanto iteráveis (o `for..of` funciona nelas) quanto semelhantes a array (elas têm índices numéricos e `length`).

Mas um objeto iterável pode não ser semelhante a array. E o contrário também é verdade: um objeto semelhante a array pode não ser iterável.

Por exemplo, o `range` do exemplo acima é iterável, mas não é semelhante a array, porque não tem propriedades indexadas nem `length`.

E aqui está um objeto que é semelhante a array, mas não é iterável:

```js run
let arrayLike = { // tem índices e length, então é semelhante a array
  0: "Hello",
  1: "World",
  length: 2
};

*!*
// Erro (não tem Symbol.iterator)
for (let item of arrayLike) {}
*/!*
```

Tanto os iteráveis quanto os objetos semelhantes a array geralmente *não são arrays*: eles não têm `push`, `pop`, etc. Isso é bem inconveniente quando temos um objeto desse tipo e queremos trabalhar com ele como se fosse um array. Por exemplo, gostaríamos de usar métodos de array no `range`. Como conseguir isso?

## Array.from

Existe um método universal, [Array.from](mdn:js/Array/from), que recebe um valor iterável ou semelhante a array e cria um `Array` "de verdade" a partir dele. Depois disso, podemos chamar métodos de array nesse novo array.

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

Na linha `(*)`, o `Array.from` recebe o objeto, verifica se ele é iterável ou semelhante a array, cria um novo array e copia todos os itens para ele.

O mesmo acontece com um iterável:

```js run
// supondo que range seja o do exemplo anterior
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (a conversão de array para string funciona)
```

A sintaxe completa do `Array.from` também permite fornecer uma função de "mapeamento" opcional:
```js
Array.from(obj[, mapFn, thisArg])
```

O segundo argumento, `mapFn`, é opcional e pode ser uma função que será aplicada a cada elemento antes de adicioná-lo ao array, e `thisArg` nos permite definir o `this` dessa função.

Por exemplo:

```js run
// supondo que range seja o do exemplo anterior

// eleva cada número ao quadrado
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
```

Aqui usamos o `Array.from` para transformar uma string em um array de caracteres:

```js run
let str = '𝒳😂';

// divide str em um array de caracteres
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

Diferente de `str.split`, esse método se baseia na natureza iterável da string e, assim como o `for..of`, funciona corretamente com pares substitutos.

Tecnicamente, isso faz o mesmo que:

```js run
let str = '𝒳😂';

let chars = []; // o Array.from faz internamente o mesmo laço
for (let char of str) {
  chars.push(char);
}

alert(chars);
```

...Mas é mais curto.

Podemos até construir um `slice` que entende pares substitutos, usando isso:

```js run
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str = '𝒳😂𩷶';

alert( slice(str, 1, 3) ); // 😂𩷶

// o método nativo não funciona bem com pares substitutos
alert( str.slice(1, 3) ); // lixo (dois pedaços de pares substitutos diferentes)
```


## Resumo

Objetos que podem ser usados em um `for..of` são chamados de *iteráveis*.

- Tecnicamente, objetos iteráveis devem implementar o método chamado `Symbol.iterator`.
    - O resultado de `obj[Symbol.iterator]()` é chamado de *iterador*. É ele que controla o processo de iteração.
    - Um iterador deve ter o método `next()`, que retorna um objeto `{done: Boolean, value: any}`, onde `done:true` indica o fim do processo de iteração e, caso contrário, `value` é o próximo valor.
- O método `Symbol.iterator` é chamado automaticamente pelo `for..of`, mas também podemos chamá-lo diretamente.
- Objetos iteráveis nativos, como strings ou arrays, também implementam `Symbol.iterator`.
- O iterador de string sabe lidar com pares substitutos.


Objetos que têm propriedades indexadas e `length` são chamados de *semelhantes a array*. Esses objetos também podem ter outras propriedades e métodos, mas não têm os métodos nativos dos arrays.

Se olharmos para dentro da especificação, veremos que a maioria dos métodos nativos assume que está trabalhando com iteráveis ou semelhantes a array, em vez de arrays "de verdade", porque isso é mais abstrato.

`Array.from(obj[, mapFn, thisArg])` cria um `Array` de verdade a partir de um iterável ou semelhante a array `obj`, e aí podemos usar métodos de array nele. Os argumentos opcionais `mapFn` e `thisArg` nos permitem aplicar uma função a cada item.
