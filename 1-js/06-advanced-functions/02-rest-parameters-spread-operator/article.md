# Parâmetros rest e operador spread

Várias funções embutidas no JavaScript suportam um número arbitrário de argumentos.

Por exemplo:

- `Math.max(arg1, arg2, ..., argN)` -- retorna o maior dos argumentos.
- `Object.assign(dest, src1, ..., srcN)` -- copia propriedades de `src1..N` para `dest`.
- ...e assim por diante.

Nesse capítulo vamos aprender a fazer o mesmo e, mais importante, se sentindo confortável trabalhando com tais funções e matrizes.

## Parâmetros rest `...`

Uma função pode ser chamada com qualquer número de argumentos, não importa sua definição.

Como por exemlplo:
```js run
function soma(a, b) {
  return a + b;
}

alert( soma(1, 2, 3, 4, 5) );
```

Não haverão erros por "uso excessivo" de argumentos, mas é claro que somente os dois primeiros valores serão levados em consideração no resultado.

Os parâmetros rest podem ser declarados na definição da função com três pontos `...`. Eles literalmente significam "reúna os parâmetros restantes em uma matriz".

Por exemplo, para reunir todos os argumentos em uma matriz `args`:

```js run
function somaTodos(...args) { // args é o nome da matriz
  let soma = 0;

  for (let arg of args) soma += arg;

  return soma;
}

alert( somaTodos(1) ); // 1
alert( somaTodos(1, 2) ); // 3
alert( somaTodos(1, 2, 3) ); // 6
```

Nós podemos escolher receber os primeiros parâmetros como variáveis e reunir o restante.

Abaixo os primeiros dois argumentos vão para variáveis e o restante para a matriz `titulos`:

```js run
function mostraNome(primeiroNome, ultimoNome, ...titulos) {
  alert( primeiroNome + ' ' + ultimoNome ); // Julius Caesar

  // o restante vai para a matriz titulos
  // i.e. titulos = ["Consul", "Imperator"]
  alert( titulos[0] ); // Consul
  alert( titulos[1] ); // Imperator
  alert( titulos.length ); // 2
}

mostraNome("Julius", "Caesar", "Consul", "Imperator");
```

````warn header="Os parâmetros rest devem ficar no final"
Os parâmetros rest reúnem todos os argumentos restantes, então o exemplo seguinte não faz sentido e causa um erro:

```js
function f(arg1, ...rest, arg2) { // arg2 depois ...rest ?!
  // erro
}
```

O `...rest` deve ser sempre no final.
````

## A variável "arguments"

Há também um tipo especial de objeto matriz chamado `arguments` que contém todos os argumentos por seu índice.

Por exemplo:

```js run
function mostraNome() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );

  // é iterável
  // for(let arg of arguments) alert(arg);
}

// exibe: 2, Julius, Caesar
mostraNome("Julius", "Caesar");

// exibe: 1, Ilya, undefined (não possui um segundo argumento)
mostraNome("Ilya");
```

Antigamente, parâmetros rest não existiam na linguagem, portanto usar `arguments` era a única forma de receber todos os argumentos da função, não importando seu total de argumentos.

E isso ainda funciona atualmente.

Mas a desvantagem é que, apesar do `arguments` ser tanto um tipo matriz e iterável, não é uma matriz de fato. Ele não suporta métodos de matrizes, por exemplo, não podemos chamar `arguments.map(...)`.

E além disso, sempre contém todos os argumentos. Não podemos os obter parcialmente, como fizemos com parâmetros rest.

Então quando precisamos dessas funcionalidades, os parâmetros rest são preferência.

<!-- @todo: uncomment here -->
<!-- ````smart header="Arrow functions não possuem `\"arguments\"`"
Se tentarmos acessar o objeto `arguments` de dentro de uma arrow function, ele os recebe da função "normal" externa.

Aqui está um exemplo:

```js run
function f() {
  let mostraArg = () => alert(arguments[0]);
  mostraArg();
}

f(1); // 1
```
```` -->

Como citado anteriormente, arrow functions não possuem seu próprio `this`. Agora sabemos que que elas também não possuem o especial `arguments`.

## Operador spread [#spread-operator]

Acabamos de ver como obter uma matriz de uma lista de parâmetros.

Mas as vezes precisamos fazer exatamente o oposto.

Por exemplo, existe uma função embutida [Math.max](mdn:js/Math/max) que retorna o maior número de uma lista:

```js run
alert( Math.max(3, 5, 1) ); // 5
```

Agora vamos dizer que temos uma matriz `[3, 5, 1]`. Como podemos fazer para chamar `Math.max` com ele?

Passar a matriz "como ela é" não irá funcionar porque `Math.max` espera uma lista de argumentos numéricos, não uma matriz única.

```js run
let arr = [3, 5, 1];

*!*
alert( Math.max(arr) ); // NaN
*/!*
```

E certamente não podemos listar os itens manualmente no código `Math.max(arr[0], arr[1], arr[2])` porque podemos não ter certeza de quantos argumentos são. Conforme nosso script é executado, podem haver muitos parâmetros ou pode não haver nenhum, e isso ficaria muito feio.

O *operador spread* vem para nos salvar! Ele é bem similar ao parâmetro rest, também usando `...`, mas faz o contrário.

Quando `...arr` é usado em uma chamada de função, ele "expande" um objeto iterável `arr` em uma lista de argumentos.

Para `Math.max`:

```js run
let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5 (spread transforma uma matriz em uma lista de argumentos )
```

Também podemos passar múltiplos iteráveis da seguinte forma:

```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(...arr1, ...arr2) ); // 8
```

Podemos até combinar o operador spread com valores normais:

```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
```

Além disso, o operador spread também pode ser usado para juntar matrizes:

```js run
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

*!*
let matrizesReunidas = [0, ...arr, 2, ...arr2];
*/!*

alert(matrizesReunidas); // 0,3,5,1,2,8,9,15 (0, depois arr, depois 2, depois arr2)
```

Nos exemplos abaixo usamos uma matriz para demonstrar o operador spread, mas qualquer iterável também funcionaria.

Por exemplo, aqui usamos o operador spread para transformar uma string em uma matriz de caracteres:

```js run
let str = "Olá";

alert( [...str] ); // O,l,á
```

Internamente, o operador spread usa generators para reunir elementos, da mesma forma como `for..of` faz.

Então, para uma string, `for..of` retorna caracteres, e `...str` se torna `"O","l","á"`. A lista de caracteres é passada para o inicializador de matriz `[...str]`

Para essa tarefa em particular nós também poderíamos usar `Array.from`, porque ele converte um iterável (como uma string) em uma matriz.

```js run
let str = "Olá";

// Array.from converte um interável em uma matriz
alert( Array.from(str) ); // O,l,á
```

O resultado é o mesmo de `...[str]`.

Mas há uma diferença sútil entre `Array.from(obj)` e `[...obj]`:

- `Array.from` opera tanto em tipos matriz como iteráveis.
- O operador spread opera somente em iteráveis.

Então, para a tarefa de transformar algo em uma matriz, `Array.from` tende a ser uma solução mais universal.

## Sumário

Quando nos depararmos com `"..."` no código, estamos falando de parâmetros rest ou operador spread.

Existe uma forma fácil para distinguir entre eles:

- Quando `...` está no final dos parâmetros da função, é "parâmetros rest" e reune o restante da lista de argumentos em uma matriz.
- Quando `...` ocorre em uma chamada de função ou similar, é chamado de "operador spread" e expande uma matriz em uma lista.

Padrões de uso:

- Operadores rest são usados para criar funções que aceitam qualquer número de argumentos.
- O operador spread é usado para passar uma matriz em funções que normalmente requerem uma lista de muitos argumentos.

Juntos eles nos ajudam a manipular entre uma lista e uma matriz de parâmetros com facilidade.

Todos os argumentos de uma chamada de função também estão disponíveis na "moda antiga" `arguments`: objeto tipo matriz iterável.
