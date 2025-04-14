# Funções

Muitas vezes nós precisamos realizar uma ação semelhante em muitos lugares do script.

Por exemplo, precisamos mostrar uma boa mensagem quando um usuário efetua login, efetua logout e talvez em outro lugar.

Funções são os principais "building blocks" do programa. Elas permitem que o código seja chamado muitas vezes sem repetição.

Nós já vimos exemplos de "built-in functions", como `alert(message)`, `prompt(message, default)` e `confirm(question)`. Mas nós podemos criar funções próprias também.

## Declaração de função

Para criarmos uma função podemos usar uma *Declaração de função*.

Se parece assim:

```js
function showMessage() {
  alert( 'Olá a todos!' );
}
```

A palavra-chave `function` vem primeiro, depois vem o *nome da função*, e uma lista de *parâmetros* entre os parêntesis (separados por vírgulas, vazia no exemplo acima, veremos exemplos mais tarde) e finalmente o código da função, também chamado de "o corpo da função", entre chaves.

```js
function name(parameter1, parameter2, ... parameterN) {
<<<<<<< HEAD
  ...corpo...
=======
 // body
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
}
```

Nossa nova função pode ser chamada pelo seu nome: `showMessage()`.

Por exemplo:

```js run
function showMessage() {
  alert( 'Olá a todos!' );
}

*!*
showMessage();
showMessage();
*/!*
```

A chamada `showMessage()` executa o código da função. Aqui vemos a mensagem duas vezes.

Este exemplo demonstra claramente um dos principais objetivos das funções: evitar código duplicado.

Se precisarmos mudar a mensagem ou a maneira que ela é mostrada, basta modificar o código em um só lugar: a função que gera isso.

## Variáveis locais

Uma variável declarada dentro de uma função é apenas visível dentro dessa função.

Por exemplo:

```js run
function showMessage() {
*!*
  let message = "Olá, Eu sou JavaScript!"; // variável local
*/!*

  alert( message );
}

showMessage(); // Olá, Eu sou JavaScript!

alert( message ); // <-- Erro! A variável é local para a função
```

## Variáveis externas

Uma função também pode acessar uma variável externa, por exemplo:

```js run no-beautify
let *!*userName*/!* = 'John';

function showMessage() {
  let message = 'Olá, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Olá, John
```

A função tem acesso total à variável externa. Pode modificá-la também.

Por exemplo:

```js run
let *!*userName*/!* = 'John';

function showMessage() {
  *!*userName*/!* = "Bob"; // (1) mudou a variável externa

  let message = 'Olá, ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // *!*John*/!* antes da chamada da função

showMessage();

alert( userName ); // *!*Bob*/!*, o valor foi modificado pela função
```
A variável externa só é usada se não houver uma local.

Se uma variável com o mesmo nome é declarada dentro da função, então ela *encobre (shadows)* a externa. Por exemplo, no código abaixo, a função usa o `userName` local. O exterior é ignorado:

```js run
let userName = 'John';

function showMessage() {
*!*
  let userName = "Bob"; // declara uma variável local
*/!*

  let message = 'Olá, ' + userName; // *!*Bob*/!*
  alert(message);
}

// a função criará e usará o seu próprio userName
showMessage();

alert( userName ); // *!*John*/!*, inalterado, a função não acessou a variável externa
```

```smart header="Variáveis globais"
Variáveis declaradas fora de qualquer função, como o `userName` externo no código acima, são chamados de *globais*.

Variáveis globais são visíveis por qualquer função (a não ser que sejam sombreadas pelas locais).

É uma boa prática minimizar o uso de variáveis ​​globais. Um código moderno tem poucas ou nenhuma variável global. A maioria das variáveis ​​residem em suas funções. Às vezes, porém, elas podem ser úteis para armazenar dados em nível de projeto.
```

## Parâmetros

Podemos passar dados arbitrários para funções usando parâmetros.

No exemplo abaixo, a função possui dois parâmetros: `from` e `text`.

```js run
function showMessage(*!*from, text*/!*) { // parâmetros: from, text
  alert(from + ': ' + text);
}

*!*showMessage('Ann', 'Olá!');*/!* // Ann: Olá! (*)
*!*showMessage('Ann', "E aí?");*/!* // Ann: E aí? (**)
```

Quando a função é chamada nas linhas `(*)` e `(**)`, os valores fornecidos são copiados para as variáveis ​​locais `from` e `text`. Em seguida, a função os usa.

Aqui está mais um exemplo: temos uma variável `from` e passamos para a função. Observe: a função muda para a variável `from` do escopo, mas a mudança não é vista fora, porque uma função sempre obtém uma cópia do valor:

```js run
function showMessage(from, text) {

*!*
  from = '*' + from + '*'; // faz "from" parecer mais bonito
*/!*

  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Olá"); // *Ann*: Olá

// o valor de "from" é o mesmo, a função modificou uma cópia local
alert( from ); // Ann
```

Quando um valor é passado como um parâmetro de função, ele também é chamado de *argumento*.

Em outras palavras, para colocar esses termos em ordem:

<<<<<<< HEAD
- Um parâmetro é a variável listada entre parênteses na declaração da função (é um termo de tempo de declaração)
- Um argumento é o valor passado para a função quando ela é chamada (é um termo de tempo de chamada).
=======
- A parameter is the variable listed inside the parentheses in the function declaration (it's a declaration time term).
- An argument is the value that is passed to the function when it is called (it's a call time term).
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Declaramos funções listando seus parâmetros e as chamamos de passagem de argumentos.

No exemplo acima, pode-se dizer: "a função `showMessage` é declarada com dois parâmetros, e então é chamada com dois argumentos: `from` e `"Hello"`".


## Valores padrão

Se uma função for chamada, mas um argumento não for fornecido, o valor correspondente será `undefined`.

Por exemplo, a função acima mencionada `showMessage(from, text)` pode ser chamada com um único argumento:

```js
showMessage("Ann");
```

Isso não é um erro. Tal chamada resultaria em `"*Ann*: undefined"`. Como o valor de `text` não é passado, ele se torna `undefined`.

Podemos especificar o chamado valor "padrão" (para usar se omitido) para um parâmetro na declaração da função, usando `=`:

```js run
function showMessage(from, *!*text = "nenhum texto fornecido"*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: nenhum texto fornecido
```

<<<<<<< HEAD
Agora se o parâmetro `text` não for passado, ele receberá o valor `"nenhum texto fornecido"`
=======
Now if the `text` parameter is not passed, it will get the value `"no text given"`.

The default value also jumps in if the parameter exists, but strictly equals `undefined`, like this:

```js
showMessage("Ann", undefined); // Ann: no text given
```
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Aqui `"nenhum texto fornecido"` é uma string, mas pode ser uma expressão mais complexa, que só é avaliada e atribuída se o parâmetro estiver ausente. Então, isso também é possível:

```js run
function showMessage(from, text = anotherFunction()) {
  // otherFunction() só é executado se nenhum texto for fornecido
  // e seu resultado torna-se o valor de text
}
```

```smart header="Avaliação dos parâmetros padrão"
Em JavaScript, um parâmetro padrão é avaliado toda vez que a função é chamada sem o respectivo parâmetro.

No exemplo acima, `anotherFunction()` não é chamado se o parâmetro `text` for fornecido.

Por outro lado, é chamado independentemente toda vez que `text` está faltando.
```

<<<<<<< HEAD
### Parâmetros padrão alternativos

Às vezes, faz sentido atribuir valores padrão para parâmetros não na declaração da função, mas em um estágio posterior.
=======
````smart header="Default parameters in old JavaScript code"
Several years ago, JavaScript didn't support the syntax for default parameters. So people used other ways to specify them.

Nowadays, we can come across them in old scripts.

For example, an explicit check for `undefined`:

```js
function showMessage(from, text) {
*!*
  if (text === undefined) {
    text = 'no text given';
  }
*/!*

  alert( from + ": " + text );
}
```

...Or using the `||` operator:

```js
function showMessage(from, text) {
  // If the value of text is falsy, assign the default value
  // this assumes that text == "" is the same as no text at all
  text = text || 'no text given';
  ...
}
```
````


### Alternative default parameters

Sometimes it makes sense to assign default values for parameters at a later stage after the function declaration.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Podemos verificar se o parâmetro é passado durante a execução da função, comparando-o com `undefined`:

```js run
function showMessage(text) {
  // ...

*!*
  if (text === undefined) { // se o parâmetro estiver faltando
    text = 'mensagem vazia';
  }
*/!*

  alert(text);
}

showMessage(); // mensagem vazia
```

...Ou poderíamos usar o operador OR `||`:

```js
function showMessage(text) {
  // se o texto for indefinido ou falso, defina-o como 'vazio'
  text = text || 'vazio';
  ...
}
```

Mecanismos JavaScript modernos suportam o [operador de coalescência nula](info:nullish-coalescing-operator) `??`, é melhor quando a maioria dos valores falsos, como `0`, devem ser considerados "normais":

```js run
function showCount(count) {
  // se a contagem for indefinida ou nula, mostre "desconhecido"
  alert(count ?? "desconhecido");
}

showCount(0); // 0
showCount(null); // desconhecido
showCount(); // desconhecido
```

## Retornando um valor

Uma função pode retornar um valor de volta ao código de chamada como resultado.

O exemplo mais simples seria uma função que soma dois valores:

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

A diretiva `return` pode estar em qualquer lugar da função. Quando a execução o atinge, a função para e o valor é retornado ao código de chamada (atribuído a `result` acima).

Pode haver muitas ocorrências de `return` em uma única função. Por exemplo:

```js run
function checkAge(age) {
  if (age >= 18) {
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('Você tem permissão de seus pais?');
*/!*
  }
}

let age = prompt('Quantos anos você tem?', 18);

if ( checkAge(age) ) {
  alert( 'Acesso concedido' );
} else {
  alert( 'Acesso negado' );
}
```

É possível usar `return` sem um valor. Isso faz com que a função saia imediatamente.

Por exemplo:

```js
function showMovie(age) {
  if ( !checkAge(age) ) {
*!*
    return;
*/!*
  }

  alert( "Mostrando o filme" ); // (*)
  // ...
}
```

No código acima, se `checkAge(age)` retornar `false`, então `showMovie` não prosseguirá para o `alert`.

````smart header="Uma função com um `return` vazio ou sem ele retorna `undefined`"
Se uma função não retornar um valor, é o mesmo que retornar `undefined`:

```js run
function doNothing() { /* vazio */ }

alert( doNothing() === undefined ); // true
```

Um `return` vazio também é o mesmo que `return undefined`:

```js run
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```
````

````warn header="Nunca adicione uma nova linha entre `return` e o valor"
Para uma expressão longa em `return`, pode ser tentador colocá-la em uma linha separada, assim:

```js
return
 (some + long + expression + or + whatever * f(a) + f(b))
```
Isso não funciona, porque o JavaScript assume um ponto e vírgula após `return`. Isso funcionará da mesma forma que:

```js
return*!*;*/!*
 (some + long + expression + or + whatever * f(a) + f(b))
```

Assim, torna-se efetivamente um retorno vazio.

Se quisermos que a expressão retornada seja agrupada em várias linhas, devemos iniciá-la na mesma linha que `return`. Ou pelo menos coloque os parênteses de abertura da seguinte forma:

```js
return (
  some + long + expression
  + or +
  whatever * f(a) + f(b)
  )
```
E funcionará exatamente como esperamos.
````

## Nomeando uma função [#function-naming]

Funções são ações. Portanto, seu nome geralmente é um verbo. Deve ser breve, o mais preciso possível e descrever o que a função faz, para que alguém que leia o código tenha uma indicação do que a função faz.

É uma prática comum iniciar uma função com um prefixo verbal que descreva vagamente a ação. Deve haver um acordo em sua equipe sobre o significado dos prefixos.

Por exemplo, funções que começam com `"show"` geralmente mostram algo.

Função que começa com...

- `"get…"` -- retorna um valor,
- `"calc…"` -- calcula algo,
- `"create"` -- cria algo,
- `"check…"` -- verifica algo e retorna um valor booleano, etc.

Exemplos de tais nomes:

```js no-beautify
showMessage(..)     // mostra uma mensagem
getAge(..)          // retorna a idade (obtido de alguma forma)
calcSum(..)         // calcula uma soma e retorna o resultado
createForm(..)      // cria um formulário (e geralmente o retorna)
checkPermission(..) // verifica uma permissão, retorna true/false
```

Com os prefixos no lugar, uma olhada no nome de uma função fornece uma compreensão do trabalho que ela faz e qual o valor que ela retorna.

```smart header="Uma função -- uma ação"
Uma função deve fazer exatamente o que é sugerido pelo seu nome, nada mais.

Duas ações independentes geralmente merecem duas funções, mesmo que sejam normalmente chamadas juntas (nesse caso, podemos fazer uma terceira função que chama essas duas).

Alguns exemplos de quebra dessa regra:

- `getAge` -- seria ruim se mostrasse um `alert` com a idade (deveria apenas obter).
- `createForm` -- seria ruim se modificasse o documento, adicionando um formulário a ele (deveria apenas criá-lo e retornar).
- `checkPermission` -- seria ruim se exibisse a mensagem `acesso concedido/negado` (deveria apenas executar a verificação e retornar o resultado).

Esses exemplos assumem significados comuns de prefixos. Você e sua equipe são livres para concordar com outros significados, mas geralmente não são muito diferentes. Em qualquer caso, você deve ter um entendimento firme do que significa um prefixo, o que uma função prefixada pode e não pode fazer. Todas as funções com o mesmo prefixo devem obedecer às regras. E a equipe deve compartilhar o conhecimento.
```

```smart header="Nomes de função ultracurtos"
As funções que são usadas *com muita frequência* às vezes têm nomes ultracurtos.

<<<<<<< HEAD
Por exemplo, o framework [jQuery](http://jquery.com) define uma função com `$`. A biblioteca [Lodash](http://lodash.com/) tem sua função central chamada `_`.
=======
For example, the [jQuery](https://jquery.com/) framework defines a function with `$`. The [Lodash](https://lodash.com/) library has its core function named `_`.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Estas são exceções. Geralmente, os nomes das funções devem ser concisos e descritivos.
```

## Funções == Comentários

As funções devem ser curtas e fazer exatamente uma coisa. Se essa coisa for grande, talvez valha a pena dividir a função em algumas funções menores. Às vezes, seguir essa regra pode não ser tão fácil, mas é definitivamente uma coisa boa.

Uma função separada não é apenas mais fácil de testar e depurar -- sua própria existência é um ótimo comentário!

Por exemplo, compare às duas funções `showPrimes(n)` abaixo. Cada uma produz [números primos](https://en.wikipedia.org/wiki/Prime_number) até `n`.

A primeira variante usa um rótulo:

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert( i ); // um primo
  }
}
```

A segunda variante usa uma função adicional `isPrime(n)` para testar a primalidade:

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  // um primo
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

A segunda variante é mais fácil de entender, não é? Em vez do trecho de código, vemos o nome da ação (`isPrime`). Às vezes, as pessoas se referem a esse código como *autodescritivo*.

Assim, funções podem ser criadas mesmo que não pretendamos reutilizá-las. Eles estruturam o código e o tornam legível.

## Resumo

Uma declaração de função se parece com isso:

```js
function name(parameters, delimited, by, comma) {
  /* code */
}
```

- Os valores passados ​​para uma função como parâmetros são copiados para suas variáveis ​​locais.
- Uma função pode acessar variáveis ​​externas. Mas funciona apenas de dentro para fora. O código fora da função não vê suas variáveis ​​locais.
- Uma função pode retornar um valor. Se não, então seu resultado é `undefined`.

Para tornar o código limpo e fácil de entender, é recomendável usar principalmente variáveis ​​e parâmetros locais na função, não variáveis ​​externas.

<<<<<<< HEAD
É sempre mais fácil entender uma função que obtém parâmetros, trabalha com eles e retorna um resultado do que uma função que não obtém parâmetros, mas modifica variáveis ​​externas como efeito colateral.
=======
It is always easier to understand a function which gets parameters, works with them and returns a result than a function which gets no parameters, but modifies outer variables as a side effect.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Nomenclatura da função:

- Um nome deve descrever claramente o que a função faz. Quando vemos uma chamada de função no código, um bom nome nos dá instantaneamente uma compreensão do que ela faz e retorna.
- Uma função é uma ação, portanto, os nomes das funções geralmente são verbais.
- Existem muitos prefixos de função bem conhecidos como `create…`, `show…`, `get…`, `check…` e assim por diante. Use-os para sugerir o que uma função faz.

As funções são os principais blocos de construção dos scripts. Agora que cobrimos o básico, podemos começar a criá-los e usá-los. Mas isso é só o começo do caminho. Voltaremos a eles muitas vezes, nos aprofundando em seus recursos avançados.
