# Ramificação condicional: if, '?'

Às vezes, precisamos realizar ações diferentes com base em condições diferentes.

Para fazer isso, podemos usar a instrução `if` e o operador condicional `?`, que também é chamado de operador "ponto de interrogação".

## A instrução "if"

A instrução `if(...)` avalia uma condição entre parênteses e, se o resultado for `true` (verdadeiro), executa um bloco de código.

Por exemplo:

```js run
let year = prompt('Em que ano foi publicada a especificação ECMAScript-2015?', '');

*!*
if (year == 2015) alert( 'Você está certo!' );
*/!*
```

No exemplo acima, a condição é uma simples verificação de igualdade (`year == 2015`), mas pode ser muito mais complexa.

Se quisermos executar mais de uma instrução, temos que envolver o nosso bloco de código entre chaves:

```js
if (year == 2015) {
  alert("Correto!");
  alert("Você é tão esperto!");
}
```

Recomendamos envolver o seu bloco de código entre chaves `{}` toda vez que usar uma instrução `if`, mesmo que haja apenas uma instrução a ser executada. Isso melhora a legibilidade.

## Conversão booleana

A instrução `if (…)` avalia a expressão entre parênteses e converte o resultado em um booleano.

Vamos relembrar as regras de conversão do capítulo <info:type-conversions>:

- Um número `0`, uma ‘string’ vazia `""`, `null`, `undefined` e `NaN` tornam-se `false`. Por isso são entitulados como valores "falsos".
- Outros valores se tornam `true`, então eles são entitulados como "verdadeiros".

Portanto, o código sob esta condição nunca seria executado:

```js
if (0) { // 0 é falso
  ...
}
```

... e dentro desta condição -- sempre será executado:

```js
if (1) { // 1 é verdadeiro
  ...
}
```

Também podemos passar um valor booleano pré-avaliado para `if`, assim:

```js
let cond = (year == 2015); // a igualdade é avaliada como verdadeira ou falsa

if (cond) {
  ...
}
```

## A cláusula "else"

A instrução `if` pode conter um bloco opcional "else" (senão). Ele é executado quando a condição é falsa.

Por exemplo:

```js run
let year = prompt('Em que ano foi publicada a especificação ECMAScript-2015?', '');

if (year == 2015) {
  alert( 'Você acertou!' );
} else {
  alert( 'Como você pode estar tão errado?' ); // qualquer valor exceto 2015
}
```

## Várias condições: "else if"

Às vezes, gostaríamos de testar muitas variantes de uma condição. A cláusula `else if` nos permite fazer isso.

Por exemplo:

```js run
let year = prompt('Em que ano foi publicada a especificação ECMAScript-2015?', '');

if (year < 2015) {
  alert( 'Muito cedo...' );
} else if (year > 2015) {
  alert( 'Tarde demais' );
} else {
  alert( 'Exatamente!' );
}
```

No código acima, o JavaScript primeiro verifica `year < 2015`. Se for falso, vai para a próxima condição `year > 2015`. Se isto também for falso, mostra o último `alert`.

Pode haver mais blocos `else if`. O `else` final é opcional.

## Operador condicional '?'

Às vezes, precisamos atribuir uma variável dependendo de uma condição.

Por exemplo:

```js run no-beautify
let accessAllowed; // (acessoPermitido)
let age = prompt('Quantos anos você tem?', '');

*!*
if (age > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}
*/!*

alert(accessAllowed);
```

O chamado operador "condicional" ou "ponto de interrogação" nos permite fazer isso de uma forma curta e simples.

O operador é representado por um ponto de interrogação `?`. Às vezes é chamado de "ternário", porque o operador possui três operandos. Na verdade, é o único operador em JavaScript que possui tantos. 

A sintaxe é:

```js
let result = condition ? value1 : value2;
```

A `condição` é avaliada: se for verdadeira então `valor1` é retornado, caso contrário -- `valor2`.

Por exemplo:

```js
let accessAllowed = (age > 18) ? true : false;
```

Tecnicamente, podemos omitir os parênteses em torno de `age > 18`. O operador de ponto de interrogação tem uma precedência baixa, então ele é executado após a comparação `>`.

Este exemplo fará a mesma coisa que o anterior:

```js
// o operador de comparação "age > 18" executa primeiro de qualquer maneira
// (não há necessidade de envolvê-lo em parênteses)
let accessAllowed = age > 18 ? true : false;
```

Mas os parênteses tornam o código mais legível, por isso recomendamos usá-los.

````smart
No exemplo acima, você pode evitar usar o operador de ponto de interrogação porque a própria comparação retorna `true/false`:

```js
// mesmo resultado
let accessAllowed = age > 18;
```
````

## Múltiplos '?'

Uma sequência de operadores de ponto de interrogação `?` pode retornar um valor que depende de mais de uma condição.

Por exemplo:

```js run
let age = prompt('Idade?', 18);

let message = (age < 3) ? 'Oi, bebê!' :
  (age < 18) ? 'Olá!' :
  (age < 100) ? 'Saudações!' :
  'Que idade incomum!';

alert( message );
```

Pode ser difícil no início entender o que está acontecendo. Mas depois de um olhar mais atento, percebemos que é apenas uma sequência comum de testes:

1. O primeiro ponto de interrogação verifica se `age < 3`.
2. Se for verdadeiro -- retorna `'Oi, bebê!'`. Caso contrário, continua para a expressão após os dois pontos ":", verificando `age < 18`.
3. Se for verdade -- retorna `'Olá!'`. Caso contrário, continua para a expressão após os próximos dois pontos ":", verificando `age < 100`.
4. Se for verdade -- retorna `'Saudações!'`. Caso contrário, continua com a expressão após os últimos dois-pontos ":", retornando `'Que idade incomum!'`.

Veja como isso fica usando `if..else`:

```js
if (age < 3) {
  message = 'Oi, bebê!';
} else if (age < 18) {
  message = 'Olá!';
} else if (age < 100) {
  message = 'Saudações!';
} else {
  message = 'Que idade incomum!';
}
```

## Uso não tradicional de '?'

Às vezes, o ponto de interrogação `?` é usado como substituto para `if`:

```js run no-beautify
let company = prompt('Que empresa criou o JavaScript?', '');

*!*
(company == 'Netscape') ?
   alert('Correto!') : alert('Errado.');
*/!*
```

Dependendo da condição `company == 'Netscape'`, a primeira ou a segunda expressão após o `?` é executada e mostra um alerta.

Não atribuímos um resultado a uma variável aqui. Em vez disso, executamos um código diferente dependendo da condição.

**Não é recomendado usar o operador de ponto de interrogação dessa maneira.**

A notação é mais curta do que a instrução `if` equivalente, o que atrai alguns programadores. Mas é menos legível.

Aqui está o mesmo código usando `if` para comparação:

```js run no-beautify
let company = prompt('Que empresa criou o JavaScript?', '');

*!*
if (company == 'Netscape') {
  alert('Correto!');
} else {
  alert('Errado.');
}
*/!*
```

Nossos olhos escaneiam o código verticalmente. Blocos de código que abrangem várias linhas são mais fáceis de entender do que um conjunto de instruções longo e horizontal.

O objetivo do operador de ponto de interrogação `?` é retornar um valor ou outro dependendo de sua condição. Por favor, use-o exatamente para isso. Use `if` quando precisar executar diferentes ramificações de código.
