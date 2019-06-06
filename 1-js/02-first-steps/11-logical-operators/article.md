# Operadores lógicos

Existem três operadores lógicos em JavaScript: `||` (OR), `&&` (AND), `!` (NOT).

Embora eles sejam chamados de "lógicos", eles podem ser aplicados a valores de qualquer tipo, não apenas booleanos. Seu resultado também pode ser de qualquer tipo.

Vamos ver os detalhes.

## || (OR)

O operador "OR" é representado por dois símbolos de linhas verticais:

```js
result = a || b;
```

Na programação clássica, o OR lógico é destinado a manipular apenas valores booleanos. Se algum de seus argumentos for `true`, ele retornará `true`, caso contrário, retornará `false`.

Em JavaScript, o operador é um pouco mais complicado e mais poderoso. Mas primeiro, vamos ver o que acontece com valores booleanos.

Existem quatro combinações lógicas possíveis:

```js run
alert( true || true );   // verdadeiro
alert( false || true );  // verdadeiro
alert( true || false );  // verdadeiro
alert( false || false ); // falso
```

Como podemos ver, o resultado é sempre `true`, exceto no caso em que ambos os operandos são `false`.

Se um operando não é um booleano, ele é convertido em booleano para a avaliação.

Por exemplo, o número `1` é tratado como `true`, o número `0` como `false`:

```js run
if (1 || 0) { // funciona como se( verdadeiro || falso )
  alert( 'truthy!' );
}
```

Na maior parte do tempo, OR `||` é usado em uma instrução `if` para testar se *any* das condições dadas é `true`.

Por exemplo:

```js run
let hour = 9;

*!*
if (hour < 10 || hour > 18) {
*/!*
  alert( 'The office is closed.' );
}
```

Nós podemos passar mais condições:

```js run
let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert( 'The office is closed.' ); // É fim de semana
}
```

## OR encontra o primeiro valor verdadeiro

A lógica descrita acima é um pouco clássica. Agora, vamos trazer os recursos "extras" do JavaScript.

O algoritmo estendido funciona da seguinte maneira.

Dado vários valores OR'ed:

```js
result = value1 || value2 || value3;
```

O operador OR `||` faz o seguinte:

- Avalia operandos da esquerda para a direita.
- Para cada operando, converte para booleano. Se o resultado for `true`, parará e retornará o valor original desse operando.
- Se todos os operandos foram avaliados (ou seja, todos eram `false`), retorna o último operando.

Um valor é retornado em sua forma original, sem a conversão.

Em outras palavras, uma cadeia de OU `"||"` retorna o primeiro valor verdadeiro ou o último caso nenhum valor seja encontrado.

Por exemplo:

```js run
alert( 1 || 0 ); // 1 (1 é verdadeiro)
alert( true || 'no matter what' ); // (verdadeiro é verdadeira)

alert( null || 1 ); // 1 (1 é o primeiro valor verdadeiro )
alert( null || 0 || 1 ); // 1 (o primeiro valor verdadeiro)
alert( undefined || null || 0 ); // 0 (todas falsas, retorna o último valor)
```

Isso leva a um uso interessante em comparação com uma "OR pura, clássica, apenas booleana".

1. **Obtendo o primeiro valor verdadeiro a partir de uma lista de variáveis ou expressões.**

    Imagine que temos várias variáveis que podem conter dados ou ser `null/undefined`. Como podemos encontrar o primeiro com dados?

    Nós podemos usar OR `||`:

    ```js run
    let currentUser = null;
    let defaultUser = "John";

    *!*
    let name = currentUser || defaultUser || "unnamed";
    */!*

    alert( name ); // seleciona "John" - o primeiro valor verdadeiro
    ```

    Se ambos `currentUser` e `defaultUser` forem falsos, `"unnamed"` seria o resultado.
2. **Avaliação de curto-circuito.**

    Operandos não precisam ser apenas valores, mas expressões arbitrárias. OR avalia e testa da esquerda para a direita. A avaliação é interrompida quando um valor geral é atingido e o valor é retornado. Esse processo é chamado de "avaliação de curto-circuito", porque é o mais curto possível da esquerda para a direita.

    Isto é claramente visto quando a expressão dada como o segundo argumento tem um efeito colateral como uma atribuição de variável.

    No exemplo abaixo, `x` não é atribuído:

    ```js run no-beautify
    let x;

    *!*true*/!* || (x = 1);

    alert(x); // indefinido, porque (x = 1) não foi avaliado
    ```

    Se, em vez disso, o primeiro argumento for `false`, `||` avaliará o segundo, executando assim a atribuição:

    ```js run no-beautify
    let x;

    *!*false*/!* || (x = 1);

    alert(x); // 1
    ```

    Uma atribuição é um caso simples. Outros efeitos colaterais também podem estar envolvidos.

    Como podemos ver, tal caso de uso é um "modo mais curto de fazer `if`". O primeiro operando é convertido em booleano. Se é falso, o segundo é avaliado.

    Na maioria das vezes, é melhor usar um "regular" `if` para manter o código fácil de entender, mas às vezes isso pode ser útil.

## && (AND)

O operador AND é representado por dois e comerciais `&&`:

```js
result = a && b;
```

Na programação clássica, AND retorna `true` se ambos os operandos forem verdadeiros e `false` caso contrário:

```js run
alert( true && true );   // verdadeiro
alert( false && true );  // falso
alert( true && false );  // falso
alert( false && false ); // falso
```

Um exemplo com `if`:

```js run
let hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
  alert( 'The time is 12:30' );
}
```

Assim como com OR, qualquer valor é permitido como um operando de AND:

```js run
if (1 && 0) { // avaliado como verdadeiro && falso
  alert( "won't work, because the result is falsy" );
}
```


## AND encontra o primeiro valor falso

Dado vários valores AND'ed:

```js
result = value1 && value2 && value3;
```

O operador AND `&&` faz o seguinte:

- Avalia operandos da esquerda para a direita.
- Para cada operando, converte para um booleano. Se o resultado for `false`, parará e retornará o valor original desse operando.
- Se todos os operandos tiverem sido avaliados (isto é, todos foram verdadeiros), retorna o último operando.

Em outras palavras, AND retorna o primeiro valor falso ou o último valor, se nenhum foi encontrado.

As regras acima são semelhantes a OR. A diferença é que AND retorna o primeiro valor *falso* enquanto OR retorna o primeiro valor *verdadeiro*.

Exemplos:

```js run
// se o primeiro operando for verdadeiro,
// AND retorna o segundo operando:
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// se o primeiro operando for falso,
// AND o retorna. E o segundo operando é ignorado
alert( null && 5 ); // null
alert( 0 && "no matter what" ); // 0
```

Nós também podemos passar vários valores em uma linha. Veja como o primeiro falso é retornado:

```js run
alert( 1 && 2 && null && 3 ); // null
```

Quando todos os valores são verdadeiros, o último valor é retornado:

```js run
alert( 1 && 2 && 3 ); // 3, o último
```

````smart header="Precedence of AND `&&` is higher than OR `||`"
A precedência do AND `&&` operator é maior que OR `||`.

Então o código `a && b || c && d` é essencialmente o mesmo que se as expressões `&&` estivessem entre parênteses: `(a && b) || (c & d)`.
````

Assim como OR, o operador AND `&&` pode algumas vezes substituir `if`.

Por exemplo:

```js run
let x = 1;

(x > 0) && alert( 'Greater than zero!' );
```

A ação na parte direita de `&&` só seria executada se a avaliação alcançasse. Isto é, somente se `(x> 0)` for verdadeiro.

Então, basicamente, temos um análogo para:

```js run
let x = 1;

if (x > 0) {
  alert( 'Greater than zero!' );
}
```

A variante com `&&` parece mais curta. Mas `if` é mais óbvio e tende a ser um pouco mais legível.

Por isso recomendamos usar cada constructo para o seu propósito: use `if` se quisermos usar if e usar `&&` se quisermos AND.

## ! (NOT)

O operador booleano NOT é representado por um sinal de exclamação `!`.

A sintaxe é bem simples:

```js
result = !value;
```

O operador aceita um único argumento e faz o seguinte:

1. Converte o operando em um tipo booleano: `true/false`.
2. Retorna o valor inverso.

Por exemplo:

```js run
alert( !true ); // falso
alert( !0 ); // verdadeiro
```

Um double NOT `!!` às vezes é usado para converter um valor em um tipo booleano:

```js run
alert( !!"non-empty string" ); // verdadeiro
alert( !!null ); // falso
```

Ou seja, o primeiro NÃO converte o valor em booleano e retorna o inverso, e o segundo NÃO o inverte novamente. No final, temos uma conversão simples de valor em booleano.

Há uma maneira um pouco mais detalhada de fazer a mesma coisa -- uma função `Boolean` incorporada:

```js run
alert( Boolean("non-empty string") ); // verdadeiro
alert( Boolean(null) ); // false
```

A precedência de NOT `!` é o maior de todos os operadores lógicos, então ele sempre executa primeiro, antes de `&&` ou `||`.
