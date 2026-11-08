# Parâmetros rest e sintaxe spread

Muitas funções nativas do JavaScript suportam um número arbitrário de argumentos.

Por exemplo:

- `Math.max(arg1, arg2, ..., argN)` -- retorna o maior dos argumentos.
- `Object.assign(dest, src1, ..., srcN)` -- copia propriedades de `src1..N` para `dest`.
- ...e assim por diante.

Neste capítulo vamos aprender a fazer o mesmo. E também como passar arrays para esse tipo de função como parâmetros.

## Parâmetros rest `...`

Uma função pode ser chamada com qualquer número de argumentos, não importa como ela foi definida.

Como aqui:
```js run
function sum(a, b) {
  return a + b;
}

alert( sum(1, 2, 3, 4, 5) );
```

Não vai haver erro por causa de argumentos "em excesso". Mas, claro, no resultado só os dois primeiros serão contados, então o resultado no código acima é `3`.

O restante dos parâmetros pode ser incluído na definição da função usando três pontos `...` seguidos do nome do array que vai contê-los. Os pontos literalmente significam "reúna os parâmetros restantes em um array".

Por exemplo, para reunir todos os argumentos no array `args`:

```js run
function sumAll(...args) { // args é o nome do array
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6
```

Podemos optar por receber os primeiros parâmetros como variáveis, e reunir só o restante.

Aqui os dois primeiros argumentos vão para variáveis, e o restante vai para o array `titles`:

```js run
function showName(firstName, lastName, ...titles) {
  alert( firstName + ' ' + lastName ); // Julius Caesar

  // o restante vai para o array titles
  // ou seja, titles = ["Consul", "Imperator"]
  alert( titles[0] ); // Consul
  alert( titles[1] ); // Imperator
  alert( titles.length ); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator");
```

````warn header="Os parâmetros rest devem ficar no final"
Os parâmetros rest reúnem todos os argumentos restantes, então o código a seguir não faz sentido e gera um erro:

```js
function f(arg1, ...rest, arg2) { // arg2 depois de ...rest ?!
  // erro
}
```

O `...rest` deve sempre ser o último.
````

## A variável "arguments"

Também existe um objeto especial, semelhante a array, chamado `arguments`, que contém todos os argumentos pelo seu índice.

Por exemplo:

```js run
function showName() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );

  // é iterável
  // for(let arg of arguments) alert(arg);
}

// exibe: 2, Julius, Caesar
showName("Julius", "Caesar");

// exibe: 1, Ilya, undefined (sem segundo argumento)
showName("Ilya");
```

Antigamente, os parâmetros rest não existiam na linguagem, e usar `arguments` era a única forma de obter todos os argumentos da função. E ainda funciona, dá pra encontrar isso em código antigo.

Mas a desvantagem é que, embora `arguments` seja parecido com um array e também seja iterável, ele não é um array de verdade. Ele não suporta métodos de array, então não podemos chamar `arguments.map(...)`, por exemplo.

Além disso, ele sempre contém todos os argumentos. Não conseguimos capturá-los parcialmente, como fazemos com os parâmetros rest.

Então, quando precisamos desses recursos, os parâmetros rest são preferíveis.

````smart header="Funções seta não têm `\"arguments\"`"
Se acessarmos o objeto `arguments` a partir de uma função seta, ele pega os argumentos da função "normal" mais externa.

Aqui está um exemplo:

```js run
function f() {
  let showArg = () => alert(arguments[0]);
  showArg();
}

f(1); // 1
```

Como já vimos, funções seta não têm seu próprio `this`. Agora sabemos que elas também não têm o objeto especial `arguments`.
````


## Sintaxe spread [#spread-syntax]

Acabamos de ver como obter um array a partir de uma lista de parâmetros.

Mas, às vezes, precisamos fazer exatamente o contrário.

Por exemplo, existe uma função nativa [Math.max](mdn:js/Math/max) que retorna o maior número de uma lista:

```js run
alert( Math.max(3, 5, 1) ); // 5
```

Agora digamos que temos um array `[3, 5, 1]`. Como chamamos `Math.max` com ele?

Passá-lo "como está" não vai funcionar, porque `Math.max` espera uma lista de argumentos numéricos, não um único array:

```js run
let arr = [3, 5, 1];

*!*
alert( Math.max(arr) ); // NaN
*/!*
```

E certamente não podemos listar manualmente os itens no código `Math.max(arr[0], arr[1], arr[2])`, porque podemos não saber quantos existem. Conforme nosso script é executado, pode haver muitos, ou pode não haver nenhum. E isso ficaria bem feio.

A *sintaxe spread* vem ao resgate! Ela se parece com os parâmetros rest, também usando `...`, mas faz exatamente o oposto.

Quando `...arr` é usado numa chamada de função, a sintaxe spread "expande" o objeto iterável `arr` na lista de argumentos.

Para `Math.max`:

```js run
let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5 (a sintaxe spread transforma o array numa lista de argumentos)
```

Também podemos passar vários iteráveis dessa forma:

```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(...arr1, ...arr2) ); // 8
```

Podemos até combinar a sintaxe spread com valores normais:


```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
```

Além disso, a sintaxe spread pode ser usada para mesclar arrays:

```js run
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

*!*
let merged = [0, ...arr, 2, ...arr2];
*/!*

alert(merged); // 0,3,5,1,2,8,9,15 (0, depois arr, depois 2, depois arr2)
```

Nos exemplos acima usamos um array para demonstrar a sintaxe spread, mas qualquer iterável serve.

Por exemplo, aqui usamos a sintaxe spread para transformar a string em um array de caracteres:

```js run
let str = "Hello";

alert( [...str] ); // H,e,l,l,o
```

A sintaxe spread usa iteradores internamente para reunir elementos, da mesma forma que o `for..of` faz.

Então, para uma string, `for..of` retorna caracteres e `...str` vira `"H","e","l","l","o"`. A lista de caracteres é passada para o inicializador de array `[...str]`.

Para essa tarefa específica também poderíamos usar `Array.from`, porque ele converte um iterável (como uma string) em um array:

```js run
let str = "Hello";

// Array.from converte um iterável em um array
alert( Array.from(str) ); // H,e,l,l,o
```

O resultado é o mesmo que `[...str]`.

Mas há uma diferença sutil entre `Array.from(obj)` e `[...obj]`:

- `Array.from` funciona tanto com objetos semelhantes a array quanto com iteráveis.
- A sintaxe spread funciona apenas com iteráveis.

Então, para a tarefa de transformar algo em um array, `Array.from` tende a ser mais universal.


## Copiar um array/objeto

Lembra quando falamos sobre `Object.assign()` [no passado](info:object-copy#cloning-and-merging-object-assign)?

É possível fazer a mesma coisa com a sintaxe spread.

```js run
let arr = [1, 2, 3];

*!*
let arrCopy = [...arr]; // espalha o array numa lista de parâmetros
                        // depois coloca o resultado num novo array
*/!*

// os arrays têm o mesmo conteúdo?
alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

// os arrays são iguais?
alert(arr === arrCopy); // false (não é a mesma referência)

// modificar nosso array inicial não modifica a cópia:
arr.push(4);
alert(arr); // 1, 2, 3, 4
alert(arrCopy); // 1, 2, 3
```

Observe que é possível fazer a mesma coisa para criar uma cópia de um objeto:

```js run
let obj = { a: 1, b: 2, c: 3 };

*!*
let objCopy = { ...obj }; // espalha o objeto numa lista de parâmetros
                          // depois retorna o resultado num novo objeto
*/!*

// os objetos têm o mesmo conteúdo?
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// os objetos são iguais?
alert(obj === objCopy); // false (não é a mesma referência)

// modificar nosso objeto inicial não modifica a cópia:
obj.d = 4;
alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}
```

Essa forma de copiar um objeto é bem mais curta do que `let objCopy = Object.assign({}, obj)` ou, para um array, `let arrCopy = Object.assign([], arr)`, então preferimos usá-la sempre que possível.


## Resumo

Quando vemos `"..."` no código, é ou um parâmetro rest ou a sintaxe spread.

Há uma forma fácil de diferenciar os dois:

- Quando `...` está no final dos parâmetros de uma função, é um "parâmetro rest" e reúne o restante da lista de argumentos em um array.
- Quando `...` ocorre numa chamada de função ou algo parecido, é chamado de "sintaxe spread" e expande um array em uma lista.

Padrões de uso:

- Os parâmetros rest são usados para criar funções que aceitam qualquer número de argumentos.
- A sintaxe spread é usada para passar um array para funções que normalmente exigem uma lista de vários argumentos.

Juntos, eles ajudam a transitar entre uma lista e um array de parâmetros com facilidade.

Todos os argumentos de uma chamada de função também estão disponíveis no "estilo antigo" `arguments`: um objeto iterável semelhante a array.
