# Operadores lógicos

Existem três operadores lógicos em JavaScript: `||` (OU), `&&` (E), `!` (NÃO).

Embora eles sejam chamados de "lógicos", podem ser aplicados a valores de qualquer tipo, não apenas a boolean. Seus resultados também podem ser de qualquer tipo.

Vamos ver os detalhes.

## || (OU)

O operador "OU" é representado com dois símbolos de linha vertical:

```js
result = a || b;
```

Em programação clássica, o operador OU é mencionado para manipular apenas valores booleanos. Se qualquer um dos seus argumentos for `true`, ele retorna `true`, se não, retorna `false`.

Em JavaScript, este operador é um pouco mais útil e poderoso. Mas primeiro, vamos ver o que acontece com valores booleanos.

Existem quatro combinações lógicas possíveis:

```js run
alert( true || true );   // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false
```

Como podemos ver, o resultado é sempre `true`, exceto para o caso onde os dois operandos são `false`.

Se um operando não é um boolean, ele é convertido em um boolean para ser avaliado.

Por exemplo, o número `1` é tratado com `true` e o número `0` como `false`.

```js run
if (1 || 0) { // funciona como if( true || false)
  alert( 'verdadeiro!');
}
```

Na maioria das vezes, OU `||` é usado dentro de uma expressão `if` para testar se *qualquer* uma das condições dadas é `true`.

Por exemplo:

```js run
let hour = 0;

*!*
if (hour < 10 || hour > 18) {
*/!*
  alert( 'O escritório está fechado.' );
}
```

Nós podemos passar mais condições:

```js run
let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert( 'O escritório está fechado.' ); // é final de semana
}
```

## OU encontra o primeiro valor verdadeiro

A lógica descrita acima é algo clássico. Agora, vamos ver as funcionalidades "extras" do JavaScript.

O algorítmo extendido funciona da seguinte forma.

Dando múltiplos valores encadeados em OU's:

```js
result = value1 || value2 || value3;
```

O operador OU `||` faz o seguinte:

- Avalia os operandos da esquerda para a direita.
- Para cada operando, o converte para boolean. Se o resultado é `true`, para e retorna o valor original daquele operando.
- Se todos os operandos foram avaliados (i.e. todos são `false`), retorna o último operando.

Um valor é retornado na sua forma original, sem conversão.

Em outras palavras, uma cadeia de OU `"||"` retorna o primeiro valor verdadeiro ou o último se nenhum `true` for encontrado.

Por exemplo:

```js run
alert( 1 || 0 ); // 1 (1 é verdadeiro)
alert( true || 'não importa o quê' ); // (true é verdadeiro)

alert( null || 1 ); // 1 (1 é o primeiro valor verdadeiro)
alert( null || 0 || 1 ); // 1 (o primeiro valor verdadeiro)
alert( undefined || null || 0 ); // 0 (todos falsos, retorna o último valor)
```

Isso nos mostra algumas utilidades interessantes comparadas ao "puro, clássico, apenas-boolean OU".

1. **Obtendo o primeiro valor verdadeiro de uma lista de variáveis ou expressões.**

    Imagine que temos várias variáveis que podem conter algum dado ou ser `null/undefined`. Como podemos encontrar a primeira com algum dado?

    Nós podemos usar OU `||`:

    ```js run
    let currentUser = null;
    let defaultUser = "John";

    *!*
    let name = currentUser || defaultUser || "unnamed";
    */!*

    alert( name ); // seleciona "John" - o primeiro valor verdadeiro
    ```

    Se ambos `currentUser` e `defaultUser` forem falsos, o resultado será `"unnamed"`.
2. **Avaliação de curto-circuito**

    Operandos podem não ser apenas valores, mas operações arbitrárias. OU interpreta e testa elas da esquerda para a direita. A avaliação é interrompida quando um valor verdadeiro é encontrado e este valor é retornado. Este processo é chamado de "avaliação de curto-circuito" pois vai o mais curto possível da esquerda para a direita.

    Isto é claramente visto quando a expressão dada como segundo argumento tem um efeito como a atribuição de uma variável.

    No exemplo abaixo, `x` não tem nenhuma atribuição:

    ```js run no-beautify
    let x;

    *!*true*/!* || (x = 1);

    alert(x); // undefined, pois (x = 1) não é avaliado
    ```

    Se, por outro lado, o primeiro argumento é `false`, `||` avalia o segundo, fazendo assim a atribuição:

    ```js run no-beautify
    let x;

    *!*false*/!* || (x = 1);

    alert(x); // 1
    ```

    Uma atribuição é um caso simples. Outros ##SIDE EFFECTS(???)## podem também estarem envolvidos.

    Como podemos ver, esse caso é como "uma maneira mais curta de se usar `if`". O primeiro operando é convertido para boolean. Se for false, o segundo operando é avaliado.

    Na maioria das vezes, é melhor usar o `if` "regular" para manter a facilidade de entendimento do código, mas vez ou outra isso pode ser útil.

## && (E)

O operador E é representado com dois e's comerciais `&&`:

```js
result = a && b;
```

Em programação clássica, E retorna `true` se ambos os operandos forem verdadeiros ou `false`, caso contrário:

```js run
alert( true && true );   // true
alert( false && true );  // false
alert( true && false );  // false
alert( false && false ); // false
```

Um exemplo com `if`:

```js run
let hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
  alert( 'Agora são 12:30' );
}
```

Da mesma forma que o OU, qualquer valor é permitido como um operando de E:

```js run
if (1 && 0) { // interpreta como true && false
  alert( "não funciona, pois o resultado é falso" );
}
```

## "E" encontra o primeiro valor falso

Dados múltiplos valores encadeados em E's:

```js
result = value1 && value2 && value3;
```

O operador `&&` faz o seguinte:

- Avalia os operandos da esquerda para a direita.
- Para cada operando, o converte para um boolean. Se o resultado for `false`, interrompe e retorna o valor original daquele operando.
- Se todos os operandos foram avaliados (i.e. todos são verdadeiros), retorna o último operando.

Em outras palavras, E retorna o primeiro valor falso ou o último valor se nenhum for falso.

As regras acima são similares ao OU. A diferença é que E retorna o primeiro valor *falso* enquanto OR retorna o primeiro valor *verdadeiro*.

Exemplos:

```js run
// se o primeiro valor é verdadeiro,
// E retorna o segundo parâmetro:
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// se o primeiro valor é falso,
// E retorna ele. O segundo operando é ignorado.
alert( null && 5 ); // null
alert( 0 && "não importa o quê" ); // 0
```

Nós podemos também passar vários valores seguidos. Veja como o primeiro falso é retornado:

```js run
alert( 1 && 2 && null && 3 ); // null
```

Quando todos valores são falsos, o último valor é retornado:

```js run
alert( 1 && 2 && 3 ); // 3, que é o último
```

````smart header="Precedência do E `&&` é maior do que do OU `||`"
A precedência do operador E `&&` é maior do que do OU `||`.

Portanto, o código `a && b || c && d` é essencialmente o mesmo como se as expressões `&&` estivessem entre parênteses: `(a && b) || (c && d)`.
````

Assim como OU, o operador E `&&` às vezes pode substituir um `if`.

Por exemplo:

```js run
let x = 1;

(x > 0) && alert( 'Maior que zero!' );
```

A ação na parte direita do `&&` executaria somente se a avaliação chegasse até ela. Ou seja, apenas se `(x > 0)` for verdadeiro.

Então, basicamente temos uma analogia para:

```js run
let x = 1;

if (x > 0) {
  alert( 'Maior que zero!' );
}
```

A variação com `&&` parece mais curta. Mas `if` é mais óbvio e tende a ser um pouco mais legível.

Então recomendamos a utilização de cada CONSTRUCT para seu propósito: use `if` se queremos SE e use `&&` se queremos E.

## ! (NÃO)

O operador booleano NÃO é representado com um sinal de exclamação `!`.

Sua sintaxe é bem simples:

```js
result = !value;
```

O operador aceita um único argumento e faz o seguinte:

1. Converte o operando para um tipo boolean: `true/false`.
2. Retorna o seu valor inverso.

Por exemplo:

```js run
alert( !true ); // false
alert( !0 );    // true
```

Uma repetição do NÃO `!!` às vezes é usado para converter um valor para o tipo boolean:

```js run
alert( !!"string não vazia" ); // true
alert( !!null );               // false
```

Ou seja, o primeiro NÃO converte o valor para boolean e retorna o seu inverso e o segundo NÃO o inverte de novo. No final, nós temos uma conversão do valor para boolean.

Existem outras formas mais extensas de se fazer a mesma coisa -- uma função `Boolean`:

```js run
alert( Boolean("string não vazia") ); // true
alert( Boolean(null) ); // false
```

A precedência do NÃO `!` é a mais alta entre todos os operadores lógicos, então ele é executado primeiro, antes que `&&` ou `||`.
