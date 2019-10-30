# Parâmetros _rest_ e operador _spread_

Várias funções embutidas no JavaScript suportam um número arbitrário de argumentos.

Por exemplo:

- `Math.max(arg1, arg2, ..., argN)` -- retorna o maior dos argumentos.
- `Object.assign(dest, src1, ..., srcN)` -- copia propriedades de `src1..N` para `dest`.
- ...e assim por diante.

Neste capítulo vamos aprender a fazer o mesmo e, o mais importante, se sentindo confortável trabalhando com tais funções e listas (_arrays_).

## Parâmetros _rest_ `...`

Uma função pode ser chamada com qualquer número de argumentos, não importa a sua definição.

Como por exemplo:
```js run
function sum(a, b) {
  return a + b;
}

alert( sum(1, 2, 3, 4, 5) );
```

Não haverão erros por "uso excessivo" de argumentos, mas é claro que somente os dois primeiros valores serão levados em consideração no resultado.

Os parâmetros _rest_, podem ser declarados na definição da função com três pontos `...`. Eles literalmente significam "reúna os parâmetros restantes em uma lista (_array_)".

Por exemplo, para reunir todos os argumentos em um _array_ `args`:

```js run
function sumAll(...args) { // args é o nome do 'array'
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6
```

Nós podemos escolher receber os primeiros parâmetros como variáveis, e reunir os restantes.

Abaixo os primeiros dois argumentos vão para variáveis, e os restantes para o _array_ `titles`:

```js run
function showName(firstName, lastName, ...titles) {
  alert( firstName + ' ' + lastName ); // Julius Caesar

  // o restante vai para o array titles
  // i.e. titles = ["Consul", "Imperator"]
  alert( titles[0] ); // Consul
  alert( titles[1] ); // Imperator
  alert( titles.length ); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator");
```

````warn header="Os parâmetros rest devem estar no final"
Os parâmetros _rest_ reúnem todos os argumentos restantes, então o exemplo seguinte não faz sentido e causa um erro:

```js
function f(arg1, ...rest, arg2) { // arg2 depois de ...rest ?!
  // erro
}
```

O `...rest` deve estar sempre no final.
````

## A variável "arguments"

Há também, um tipo especial de objeto com caracteristicas de listas (_array-like_, ou lista genérica), chamado de arguments que contém todos os argumentos segundo a ordem dos seus índices.

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

// exibe: 1, Ilya, undefined (não possui um segundo argumento)
showName("Ilya");
```

Antigamente, parâmetros _rest_ não existiam na linguagem, portanto usar `arguments` era a única forma de receber todos os argumentos da função, não importando o total dos seus argumentos.

E isso ainda funciona atualmente.

Mas a desvantagem é que, apesar do `arguments` ter algumas caracteristicas de _arrays_ e de ser iterável, não é um _array_ de fato. Ele não suporta métodos de _arrays_, por exemplo, não podemos chamar `arguments.map(...)`.

E além disso, sempre contém todos os argumentos. Não podemos os obter parcialmente, como o fizemos com parâmetros _rest_.

Então, quando precisamos dessas funcionalidades, os parâmetros _rest_ são a preferência.

````smart header="Funções arrow não possuem `\"arguments\"`"
Se tentarmos acessar o objeto `arguments` de dentro de uma função _arrow_, ele os recebe da função "normal" externa.

Aqui está um exemplo:

```js run
function f() {
  let showArg = () => alert(arguments[0]);
  showArg();
}

f(1); // 1
```
````

Como nos lembramos, funções _arrow_ não possuem seu próprio `this`. Agora, sabemos que elas também não possuem o especial `arguments`.

## Operador _spread_ [_spread-operator_]

Acabamos de ver como obter um _array_ de uma lista simples de parâmetros (apenas lista em sequência, não _array_).

Mas às vezes precisamos fazer exatamente o oposto.

Por exemplo, existe uma função embutida [Math.max](mdn:js/Math/max) que retorna o maior número de uma lista simples (não _array_):

```js run
alert( Math.max(3, 5, 1) ); // 5
```

Agora vamos dizer que temos um _array_ `[3, 5, 1]`. Como podemos fazer para chamar `Math.max` com ele?

Passar o _array_ "como ele é" não irá funcionar porque, `Math.max` espera uma lista simples de argumentos numéricos, não num todo num _array_.

```js run
let arr = [3, 5, 1];

*!*
alert( Math.max(arr) ); // NaN
*/!*
```

E certamente, não podemos listar os itens manualmente no código `Math.max(arr[0], arr[1], arr[2])` porque podemos não a ter certeza de quantos argumentos são. Conforme nosso script é executado, podem haver muitos parâmetros ou pode não haver nenhum. E isso ficaria muito feio.

O *operador spread* vem para nos salvar! Ele é bem similar ao parâmetro _rest_, também usando `...`, mas faz o contrário.

Quando `...arr` é usado em uma chamada de função, ele "expande" um objeto iterável `arr` em uma lista simples de argumentos.

Para `Math.max`:

```js run
let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5 (spread transforma um array em uma lista de argumentos)
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

Além disso, o operador spread também pode ser usado para juntar valores individuais de _arrays_:

```js run
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

*!*
let merged = [0, ...arr, 2, ...arr2];
*/!*

alert(merged); // 0,3,5,1,2,8,9,15 (0, depois arr, depois 2, depois arr2)
```

Nos exemplos acima usamos um _array_ para demonstrar o operador _spread_, mas qualquer iterável também funcionaria.

Por exemplo, aqui usamos o operador _spread_ para transformar uma string em um _array_ de caracteres:

```js run
let str = "Olá";

alert( [...str] ); // O,l,á
```

Internamente, o operador _spread_ usa iteradores (_iterators_) para reunir elementos, da mesma forma como `for..of` faz.

Então, para uma string, `for..of` retorna caracteres, e `...str` se torna `"O","l","á"`. A lista de caracteres é passada para o inicializador do _array_ `[...str]`

Para essa tarefa em particular nós também poderíamos usar `Array.from`, porque ele converte um iterável (como uma string) em um _array_.

```js run
let str = "Olá";

// Array.from converte um interável em um _array_
alert( Array.from(str) ); // O,l,á
```

O resultado é o mesmo que `...[str]`.

Mas há uma diferença sútil entre `Array.from(obj)` e `[...obj]`:

- `Array.from` opera tanto em listas-genéricas (_array-likes_) como em iteráveis.
- O operador _spread_ opera somente em iteráveis.

Então, para a tarefa de transformar algo em um _array_, `Array.from` tende a ser uma solução mais universal.

## Sumário

Quando nos depararmos com `"..."` no código, estamos falando de parâmetros _rest_ ou do operador _spread_.

Existe uma forma fácil para distinguir entre eles:

- Quando `...` está no final dos parâmetros da função, é "parâmetros _rest_" e reune o restante da lista de argumentos em um _array_.
- Quando `...` ocorre em uma chamada de função ou similar, é chamado de "operador _spread_" e expande um _array_ em uma lista.

Padrões de uso:

- Operadores _rest_ são usados para criar funções que aceitem qualquer número de argumentos.
- O operador _spread_ é usado para passar um _array_ em funções que normalmente requerem uma lista de muitos argumentos.

Juntos, eles nos ajudam a efetuar a transição entre uma lista e um _array_ de parâmetros com facilidade.

Todos os argumentos de uma chamada de função também estão disponíveis na "moda antiga" `arguments`: objeto iterável tipo lista-genérica (_array-like_).
