
# Iteráveis

Objetos *iteráveis* são uma generalização dos arrays. Este é um conceito que permite que objetos sejam utilizados em laços (*loops*) `for..of`.

Claro, arrays são iteráveis. Mas existem muitos objetos nativos que também são iteráveis. Strings são outro exemplo de objetos iteráveis. Como veremos à frente, muitos operadores e métodos nativos atuam sobre eles.

Se um objeto representa uma coleção (list, set) de algo, então `for..of` é um ótimo método para iterar através dele. Veremos como isso funciona.

## Symbol.iterator

Podemos compreender facilmente o conceito de objetos iteráveis ao criar um destes objetos.
Como exemplo, temos um objeto que não é um array, mas pode ser iterado usando `for..of`.
É como um objeto *range* que representa um intervalo de números:

```js
let range = {
  from: 1,
  to: 5
};

// Vamos utilizar o for..of no objeto criado:
// for(let num of range) ... num=1,2,3,4,5
```

Para tornar o `range` iterável (e portanto permitir que `for..of` funcione) precisamos adicionar ao objeto um método chamado `Symbol.iterator` (um símbolo especial nativo criado para isso).

1. Quando o `for..of` começa, ele chama este método uma vez (ou dispara erros, se o método não for encontrado). O método deve retornar um *iterador* -- um objeto com o método `next`.
2. A seguir, o `for..of` passa a trabalhar *somente com o objeto retornado*.
3. Quando o `for..of` necessita de um novo valor, ele chama o método `next()` no objeto em questão.
4. O resultado do método `next()` precisa ser um formulário `{done: Boolean, value: any}`, onde `done=true` indica que aquela iteração foi finalizada, caso contrário, `value` precisa ser um novo valor.

Esta é a implementação completa para o objeto chamado `range`:

```js executar
let range = {
  from: 1,
  to: 5
};

// 1. a chamada para o for..of aciona inicialmente o código abaixo
range[Symbol.iterator] = function() {

  // ...ele retorna o objeto iterador:
  // 2. Daqui em diante, o for..of trabalha somente com esse iterador, solicitando a ele novos valores
  return {
    current: this.from,
    last: this.to,      

    // 3. o método next() é acionado a cada iteração pelo laço for..of
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

// agora o for..of funciona!
for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

Por favor, observe o principal recurso dos objetos iteráveis, isto é, uma importante separação de conceitos (<a href="https://pt.wikipedia.org/wiki/Separa%C3%A7%C3%A3o_de_conceitos">Separação de conceitos</a>):

- O objeto `range` original não possui o método `next()`
- Ao invés disso, outro objeto chamado "iterador" é criado ao acionar `range[Symbol.iterator]()`, e ele lida com toda a iteração.

Logo, o objeto "iterador" é um objeto separado do original.

Tecnicamente, podemos mesclá-los e usar o próprio objeto `range` de modo a tonar o código mais simples.

Desse modo:

```js executar
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
  alert(num); // 1, e depois 2, 3, 4, 5
}
```

Agora `range[Symbol.iterator]()` retorna o objeto `range` original, ele também possui o método `next()` e `this.current` representa o progresso da iteração neste objeto. Mais sucinto? Sim. Em muitos casos isso é algo bom.

A desvantagem é que agora é impossível ter dois laços `for..of` executando simultaneamente no objeto: eles compartilharão o estado da iteração porque existe apenas um iterador, ou seja, o próprio objeto. Mas dois laços `for..of` paralelos é algo raro, factível em alguns cenários assíncronos.

```smart header="Infinite iterators"
Iteradores infinitos são possíveis. Como exemplo, o `range` se torna infinito pelo uso de `range.to = Infinity`. 
Também podemos criar um objeto iterável que gera uma sequência infinita de números pseudoaleatórios. 
Isso pode ser útil.

Não existe limitação para o método `next`, ele pode retornar mais e mais valores, é algo normal.
Claro, neste cenário o laço `for..of` seria infinito. Mas sempre podemos pará-lo usando um `break`.

```

## Strings são iteráveis

Arrays e Strings são os objetos iteráveis mais comumente usados.

No caso de uma string, um laço `for..of` percorre os seus caracteres:

```js executar
for (let char of "test") {
  // a linha abaixo executa 4 vezes: uma vez para cada caracter
  alert( char ); // t, depois e, depois s e por último t
}
```

E funciona corretamente com caracteres substitutos!

```js executar
let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳, e depois 😂
}
```
## Chamando um iterador explicitamente

Normalmente, o mecanismo interno dos objetos iteráveis não é visível. O laço `for..of` funciona e isso é tudo o que se precisa saber.

Mas para entender as coisas um pouco mais detalhadamente, veremos como criar um iterador explicitamente.

Vamos iterar sobre uma string do mesmo modo que um laço `for..of`, mas com chamadas diretas. O código a seguir cria um iterador para uma string e o chama "manualmente":

```js executar
let str = "Olá";

// faz o mesmo que
// for (let char of str) alert(char);

let iterator = str[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // exibe os caracteres um a um
}
```

Isso é algo raramente utilizado, mas nos dá mais controle sobre o processo do que se estivéssemos utilizando um `for..of`. Como exemplo, podemos dividir o processo de iteração: itere um pouco, então pare, faça alguma outra coisa, e então termine mais tarde.

## Iteráveis e array-likes [#array-like]

Estes dois termos oficiais parecem similares, mas são bastante diferentes. Certifique-se de ter os entendido bem para evitar confusão.

- *Iteráveis* são objetos que implementam o método `Symbol.iterator`, como descrito acima.
- *Array-likes* são objetos que possuem índices e tamanho (`length`), logo, eles se parecem com arrays.

Naturalmente, essas propriedades podem ser combinadas. Por exemplo, strings são objetos iteráveis (`for..of` funciona com eles) e *array-like* (eles possuem índices e tamanho).

Mas um iterável pode não ser um *array-like*. Do mesmo modo, um *array-like* pode não ser um iterável.

Por exemplo, o objeto `range` no exemplo acima por ser um iterável, mas não um *array-like*, porque ele não tem propriedades de índice e tamanho (`length`).

Abaixo um exemplo de objeto que é um *array-like*, mas não um iterável:

```js executar
let arrayLike = { // possui índices e tamanho => array-like
  0: "Olá",
  1: "Mundo",
  length: 2
};

*!*
// Erro (nenhum Symbol.iterator)
for (let item of arrayLike) {}
*/!*
```

O que eles têm em comum? É comum que Iteráveis e *array-likes* não sejam arrays, eles não possuem métodos como `push`, `pop`, etc. Isso é bastante inconveniente quando se deseja que estes objetos trabalhem da mesma forma que um array.

## Array.from

Existe um método universal que os reúne. Ele pega um iterável ou *array-like* e faz dele um `Array` "real". Assim podemos chamar métodos típicos de um array a partir deste objeto.

Por exemplo:

```js executar
let arrayLike = {
  0: "Olá",
  1: "Mundo",
  length: 2
};

*!*
let arr = Array.from(arrayLike); // (*)
*/!*
alert(arr.pop()); // Mundo (o método funciona)
```

`Array.from` na linha `(*)` pega o objeto, examina o mesmo como um objeto iterável ou *array-like*, então cria um novo array e copia todos os itens para ele.

O mesmo acontece com um iterável:

```js
// utilizando o objeto "range" dos primeiros exemplos
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (a conversão do array para string funciona)
```

A sintáxe completa de `Array.from` fornece uma função opcional de "mapeamento":

```js
Array.from(obj[, mapFn, thisArg])
```

O segundo argumento `mapFn` deve ser a função a ser aplicada a cada elemento antes que o mesmo seja adicionado ao array, e `thisArg` permite adicionar o valor `this` a este elemento.

Por exemplo:

```js
// utilizando o objeto "range" dos primeiros exemplos

// calcula o quadrado de cada número
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
```

Aqui usamos `Array.from` para transformar uma string em uma matriz de caracteres:

```js executar
let str = '𝒳😂';

// divide a string em uma matriz de caracteres
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

Ao contrário de `str.split`, o código acima se baseia na natureza iterável da string e, assim como um laço `for..of`, funciona corretamente com caracteres substitutos.

Tecnicamente, acontece conforme o código abaixo:

```js executar
let str = '𝒳😂';

let chars = []; // Array.from internamente executa o mesmo laço
for (let char of str) {
  chars.push(char);
}

alert(chars);
```

...mas de uma forma mais curta e simples.

Podemos inclusive construir um código que reconheça o caracter substituto:

```js executar
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str = '𝒳😂𩷶';

alert( slice(str, 1, 3) ); // 😂𩷶

// método nativo não suporta caracteres substitutos
alert( str.slice(1, 3) ); // lixo (duas partes de diferentes caracteres substitutos)
```

## Sumário

Objetos que podem ser usados em um laço `for..of` são chamados de *iteráveis*.

- Tecnicamente, os iteráveis devem implementar o método chamado `Symbol.iterator`.
    - O resultado de `obj[Symbol.iterator]` é chamado de *iterador*. Ele lida com o processo de iteração adicional.
    - Um iterador deve ter o método chamado `next()` que retorna um objeto `{done: Boolean, value: any}`, aqui `done: true` denota o final da iteração, caso contrário, o `value` é o próximo valor.
- O método `Symbol.iterator` é chamado automaticamente pelo laço `for..of`, mas também podemos fazê-lo diretamente.
- Objetos iteráveis nativos, como strings ou arrays, também implementam o `Symbol.iterator`.
- Um iterador de strings reconhece caracteres substitutos.

Objetos que possuem propriedades índice e tamanho (`length`), são chamados *array-likes*. Esses objetos também podem ter outras propriedades e métodos, mas não possuem os métodos nativos de arrays.

Se investigarmos mais detalhadamente a especificação -- veremos que a maioria dos métodos nativos assumem que funcionam com objetos iteráveis e *array-likes* ao invés de arrays "reais", porque isso é mais abstrato.

`Array.from(obj[, mapFn, thisArg])` cria um array "real" a partir de um objeto iterável ou *array-like*, e consequentemente podemos usar métodos de arrays neles. Os argumentos opcionais `mapFn` e `thisArg` nos permitem aplicar em função a cada item.
