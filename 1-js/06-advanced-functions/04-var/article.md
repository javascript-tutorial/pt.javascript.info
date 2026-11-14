
# O antigo "var"

```smart header="Este artigo é para entender scripts antigos"
A informação neste artigo é útil para entender scripts antigos.

Não é assim que escrevemos código novo.
```

No primeiro capítulo sobre [variáveis](info:variables), mencionamos três formas de declarar uma variável:

1. `let`
2. `const`
3. `var`

A declaração `var` é parecida com `let`. Na maior parte do tempo podemos substituir `let` por `var` ou vice-versa e esperar que tudo funcione:

```js run
var message = "Hi";
alert(message); // Hi
```

Mas internamente `var` é uma fera bem diferente, que vem de tempos bem antigos. Geralmente não é usado em scripts modernos, mas ainda se esconde nos antigos.

Se você não pretende lidar com esse tipo de script, pode até pular este capítulo ou deixá-lo para depois.

Por outro lado, é importante entender as diferenças ao migrar scripts antigos de `var` para `let`, para evitar erros estranhos.

## "var" não tem escopo de bloco

Variáveis declaradas com `var` têm escopo de função ou escopo global. Elas são visíveis através dos blocos.

Por exemplo:

```js run
if (true) {
  var test = true; // use "var" em vez de "let"
}

*!*
alert(test); // true, a variável sobrevive após o if
*/!*
```

Como `var` ignora os blocos de código, acabamos com uma variável global `test`.

Se tivéssemos usado `let test` em vez de `var test`, então a variável só seria visível dentro do `if`:

```js run
if (true) {
  let test = true; // use "let"
}

*!*
alert(test); // ReferenceError: test não está definido
*/!*
```

O mesmo vale para laços: `var` não pode ser local a um bloco ou a um laço:

```js run
for (var i = 0; i < 10; i++) {
  var one = 1;
  // ...
}

*!*
alert(i);   // 10, "i" é visível depois do laço, é uma variável global
alert(one); // 1, "one" é visível depois do laço, é uma variável global
*/!*
```

Se um bloco de código estiver dentro de uma função, então `var` se torna uma variável de nível de função:

```js run
function sayHi() {
  if (true) {
    var phrase = "Hello";
  }

  alert(phrase); // funciona
}

sayHi();
alert(phrase); // ReferenceError: phrase não está definido
```

Como podemos ver, `var` atravessa o `if`, o `for` ou outros blocos de código. Isso acontece porque, há muito tempo, no JavaScript os blocos não tinham Ambientes Léxicos, e `var` é um resquício disso.

## "var" tolera redeclarações

Se declararmos a mesma variável com `let` duas vezes no mesmo escopo, isso é um erro:

```js run
let user;
let user; // SyntaxError: 'user' has already been declared
```

Com `var`, podemos redeclarar uma variável quantas vezes quisermos. Se usarmos `var` com uma variável já declarada, isso simplesmente é ignorado:

```js run
var user = "Pete";

var user = "John"; // esse "var" não faz nada (já declarado)
// ...não dispara um erro

alert(user); // John
```

## Variáveis "var" podem ser declaradas depois de serem usadas

As declarações `var` são processadas quando a função começa (ou quando o script começa, para variáveis globais).

Em outras palavras, as variáveis `var` são definidas desde o início da função, não importa onde a definição esteja (assumindo que a definição não está numa função aninhada).

Então este código:

```js run
function sayHi() {
  phrase = "Hello";

  alert(phrase);

*!*
  var phrase;
*/!*
}
sayHi();
```

...É tecnicamente igual a este (movemos `var phrase` para cima):

```js run
function sayHi() {
*!*
  var phrase;
*/!*

  phrase = "Hello";

  alert(phrase);
}
sayHi();
```

...Ou até mesmo a este (lembre-se, blocos de código são ignorados):

```js run
function sayHi() {
  phrase = "Hello"; // (*)

  *!*
  if (false) {
    var phrase;
  }
  */!*

  alert(phrase);
}
sayHi();
```

As pessoas também chamam esse comportamento de "hoisting" (elevação), porque todos os `var` são "elevados" (hoisted) para o topo da função.

Então, no exemplo acima, o ramo `if (false)` nunca é executado, mas isso não importa. O `var` dentro dele é processado no início da função, então, no momento do `(*)`, a variável já existe.

**As declarações são elevadas, mas as atribuições não.**

Isso fica melhor demonstrado com um exemplo:

```js run
function sayHi() {
  alert(phrase);

*!*
  var phrase = "Hello";
*/!*
}

sayHi();
```

A linha `var phrase = "Hello"` tem duas ações nela:

1. Declaração da variável `var`
2. Atribuição da variável `=`.

A declaração é processada no início da execução da função ("hoisted"/elevada), mas a atribuição sempre acontece no lugar onde ela aparece. Então o código funciona essencialmente assim:

```js run
function sayHi() {
*!*
  var phrase; // a declaração funciona no início...
*/!*

  alert(phrase); // undefined

*!*
  phrase = "Hello"; // ...atribuição - quando a execução chega até ela.
*/!*
}

sayHi();
```

Como todas as declarações `var` são processadas no início da função, podemos referenciá-las em qualquer lugar. Mas as variáveis ficam undefined até as atribuições.

Em ambos os exemplos acima, o `alert` roda sem erro, porque a variável `phrase` existe. Mas seu valor ainda não foi atribuído, então ele mostra `undefined`.

## IIFE

No passado, como só existia `var`, e ele não tem visibilidade em nível de bloco, os programadores inventaram uma forma de emular isso. O que eles fizeram foi chamado de "expressões de função imediatamente invocadas" (abreviado como IIFE, do inglês *immediately-invoked function expressions*).

Isso não é algo que devemos usar hoje em dia, mas você pode encontrar isso em scripts antigos.

Uma IIFE se parece com isto:

```js run
(function() {

  var message = "Hello";

  alert(message); // Hello

})();
```

Aqui, uma Expressão de Função é criada e chamada imediatamente. Então o código é executado na hora e tem suas próprias variáveis privadas.

A Expressão de Função é envolvida por parênteses `(function {...})`, porque quando o motor do JavaScript encontra `"function"` no código principal, ele entende isso como o início de uma Declaração de Função. Mas uma Declaração de Função precisa ter um nome, então esse tipo de código vai gerar um erro:

```js run
// Tenta declarar e chamar imediatamente uma função
function() { // <-- SyntaxError: Function statements require a function name

  var message = "Hello";

  alert(message); // Hello

}();
```

Mesmo que digamos: "ok, vamos adicionar um nome", isso não vai funcionar, já que o JavaScript não permite que Declarações de Função sejam chamadas imediatamente:

```js run
// erro de sintaxe por causa dos parênteses abaixo
function go() {

}(); // <-- não é possível chamar uma Declaração de Função imediatamente
```

Então, os parênteses em torno da função são um truque para mostrar ao JavaScript que a função é criada no contexto de outra expressão, e, portanto, é uma Expressão de Função: ela não precisa de nome e pode ser chamada imediatamente.

Existem outras formas, além dos parênteses, de dizer ao JavaScript que queremos dizer uma Expressão de Função:

```js run
// Formas de criar uma IIFE

*!*(*/!*function() {
  alert("Parênteses em torno da função");
}*!*)*/!*();

*!*(*/!*function() {
  alert("Parênteses em torno de tudo");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("Operador NOT bit a bit inicia a expressão");
}();

*!*+*/!*function() {
  alert("Operador unário de adição inicia a expressão");
}();
```

Em todos os casos acima, declaramos uma Expressão de Função e a executamos imediatamente. Vamos observar de novo: hoje em dia não há motivo para escrever esse tipo de código.

## Resumo

Existem duas diferenças principais de `var` em comparação com `let/const`:

1. As variáveis `var` não têm escopo de bloco, sua visibilidade tem escopo na função atual, ou global, se declaradas fora de uma função.
2. As declarações `var` são processadas no início da função (início do script, para variáveis globais).

Existe mais uma diferença bem pequena relacionada ao objeto global, que vamos abordar no próximo capítulo.

Essas diferenças fazem com que `var` seja pior que `let` na maior parte do tempo. Variáveis de nível de bloco são algo muito bom. É por isso que `let` foi introduzido no padrão há muito tempo, e hoje é a principal forma (junto com `const`) de declarar uma variável.
