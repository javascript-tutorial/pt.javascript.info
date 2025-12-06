# Operadores lógicos

Existem quatro operadores lógicos em JavaScript: `||` (*OR*), `&&` (*AND*), `!` (*NOT*), `??` (*Nullish Coalescing*). Aqui cobrimos os três primeiros, o operador `??` está no próximo artigo.

Embora eles sejam chamados de "lógicos", podem ser aplicados a valores de qualquer tipo, não apenas ao tipo `boolean`. Seus resultados também podem ser de qualquer tipo.

Vamos ver os detalhes.

## || (OR)

O operador "*OR*" é representado por dois símbolos de linha vertical:

```js
result = a || b;
```

Em programação clássica, o operador *OR* é utilizado para manipular apenas valores do tipo `boolean`. Se qualquer um dos seus argumentos for `true`, ele retorna `true`, se não, retorna `false`.

Em JavaScript, este operador é um pouco mais útil e poderoso. Mas primeiro, vamos ver o que acontece com valores do tipo `boolean`.

Existem quatro combinações lógicas possíveis:

```js run
alert( true || true );   // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false
```

Como podemos ver, o resultado é sempre `true`, exceto para o caso onde os dois operandos são `false`.

Se um operando não é um `boolean`, ele é convertido em um `boolean` para ser avaliado.

Por exemplo, o número `1` é tratado com `true` e o número `0` como `false`.

```js run
if (1 || 0) { // funciona como if( true || false)
  alert( 'verdadeiro!');
}
```

Na maioria das vezes, *OR* `||` é usado dentro de uma expressão `if` para testar se *qualquer* uma das condições dadas é `true`.

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

## *OR* "||" encontra o primeiro valor verdadeiro [#or-finds-the-first-truthy-value]

A lógica descrita acima é algo clássica. Agora, vamos ver as funcionalidades "extras" do JavaScript.

O algoritmo estendido funciona da seguinte forma.

Dando múltiplos valores encadeados em OR's:

```js
result = value1 || value2 || value3;
```

O operador *OR* `||` faz o seguinte:

- Avalia os operandos da esquerda para a direita.
- Para cada operando, o converte para o tipo `boolean`. Se o resultado é `true`, para e retorna o valor original daquele operando.
- Se todos os operandos foram avaliados (i.e. todos são `false`), retorna o último operando.

Um valor é retornado na sua forma original, sem conversão.

Em outras palavras, uma cadeia de *OR* `"||"`, retorna o primeiro valor verdadeiro ou o último se nenhum `true` for encontrado.

Por exemplo:

```js run
alert( 1 || 0 ); // 1 (1 é verdadeiro)

alert( null || 1 ); // 1 (1 é o primeiro valor verdadeiro)
alert( null || 0 || 1 ); // 1 (o primeiro valor verdadeiro)

alert( undefined || null || 0 ); // 0 (todos falsos, retorna o último valor)
```

Isso nos mostra algumas utilidades interessantes comparadas ao "puro, clássico, apenas-booleano OR".

1. **Obtendo o primeiro valor verdadeiro de uma lista de variáveis ou expressões.**

    Por exemplo, temos as variáveis ​​`firstName`, `lastName` e `nickName`, todas opcionais (ou seja, podem ser indefinidas ou ter valores falsos).

    Vamos usar *OR* `||` para escolher aquele que tem os dados e mostrá-lo (ou `"Anonymous"` se nada for definido):

    ```js run
    let firstName = "";
    let lastName = "";
    let nickName = "SuperCoder";

    *!*
    alert( firstName || lastName || nickName || "Anonymous"); // SuperCoder
    */!*
    ```
    
    Se todas as variáveis ​​fossem falsas, apareceria `"Anonymous"`.

2. **Avaliação em curto-circuito.**

    Outra característica do operador *OR* `||` é a chamado de avaliação em "curto-circuito".

    Isso significa que `||` processa seus argumentos até que o primeiro valor verdadeiro seja alcançado, e então o valor é retornado imediatamente, sem sequer tocar no outro argumento.

    A importância desse recurso torna-se óbvia se um operando não for apenas um valor, mas uma expressão com um efeito colateral, como uma atribuição de variável ou uma chamada de função.

    No exemplo abaixo, apenas a segunda mensagem é impressa:

    ```js run no-beautify
    *!*true*/!* || alert("não impresso");
    *!*false*/!* || alert("impresso");
    ```

    Na primeira linha, o operador *OR* `||` interrompe a avaliação imediatamente ao ver `true`, portanto, o `alert` não é executado.

    Às vezes, as pessoas usam esse recurso para executar comandos apenas se a condição na parte esquerda for falsa.

## && (AND)

O operador *AND* (E) é representado por dois e's comerciais `&&`:

```js
result = a && b;
```

Em programação clássica, *AND* retorna `true` se ambos os operandos forem verdadeiros ou `false`, caso contrário:

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

Da mesma forma que o OR, qualquer valor é permitido como um operando de AND:

```js run
if (1 && 0) { // avaliado como true && false
  alert( "não funciona, pois o resultado é falso" );
}
```


## "*AND*" encontra o primeiro valor falso

Dados múltiplos valores encadeados em AND's:

```js
result = value1 && value2 && value3;
```

O operador `&&` faz o seguinte:

- Avalia os operandos da esquerda para a direita.
- Para cada operando, o converte para o tipo `boolean`. Se o resultado for `false`, interrompe e retorna o valor original daquele operando.
- Se todos os operandos foram avaliados (i.e. todos são verdadeiros), retorna o último operando.

Em outras palavras, *AND* retorna o primeiro valor falso ou o último valor se nenhum for falso.

As regras acima são similares ao OR. A diferença é que *AND* retorna o primeiro valor *falso* enquanto *OR* retorna o primeiro valor *verdadeiro*.

Exemplos:

```js run
// se o primeiro valor for verdadeiro,
// AND retorna o segundo parâmetro:
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// se o primeiro valor é falso,
// AND retorna ele. O segundo operando é ignorado.
alert( null && 5 ); // null
alert( 0 && "não importa o quê" ); // 0
```

Nós podemos também passar vários valores em cadeia. Veja como o primeiro falso é retornado:

```js run
alert( 1 && 2 && null && 3 ); // null
```

Quando todos valores são falsos, o último valor é retornado:

```js run
alert( 1 && 2 && 3 ); // 3, que é o último
```

````smart header="Precedência do *AND* `&&` é maior do que do *OR* `||`"
A precedência do operador *AND* `&&` é maior do que do *OR* `||`.

Portanto, o código `a && b || c && d` é essencialmente o mesmo como se as expressões `&&` estivessem entre parênteses: `(a && b) || (c && d)`.
````

````warn header="Não substitua `if` por `||` ou `&&`"
Às vezes, as pessoas usam o operador AND `&&` como uma "maneira mais curta de escrever `if`".
````

Por exemplo:

```js run
let x = 1;

(x > 0) && alert( 'Maior que zero!' );
```

A ação na parte direita do `&&` executaria somente se a avaliação chegasse até ela. Ou seja, apenas se `(x > 0)` fosse verdade.

Então, basicamente temos uma analogia para:

```js run
let x = 1;

if (x > 0) {
  alert( 'Maior que zero!' );
}
```

Embora a variante com `&&` pareça mais curta, `if` é mais óbvia e tende a ser um pouco mais legível. Portanto, recomendamos usar cada construção para seu propósito: use `if` se quisermos `if` e use `&&` se quisermos AND.

## ! (NÃO)

O operador booleano NÃO é representado por um sinal de exclamação `!`.

Sua sintaxe é bem simples:

```js
result = !value;
```

O operador aceita um único argumento e faz o seguinte:

1. Converte o operando para um tipo `boolean`: `true/false`.
2. Retorna o seu valor inverso.

Por exemplo:

```js run
alert( !true ); // false
alert( !0 );    // true
```

Uma repetição do NÃO `!!` às vezes é usada para converter um valor para o tipo `boolean`:

```js run
alert( !!"string não vazia" ); // true
alert( !!null );               // false
```

Ou seja, o primeiro NÃO converte o valor para o tipo `boolean` e retorna o seu inverso e o segundo NÃO o inverte de novo. No final, nós temos uma conversão do valor para o tipo `boolean`.

Existe uma outra forma mais extensas de se fazer a mesma coisa -- a função incorporada `Boolean`:

```js run
alert( Boolean("string não vazia") ); // true
alert( Boolean(null) ); // false
```

A precedência do NÃO `!` é a mais alta entre todos os operadores lógicos, então ele é executado primeiro, antes que `&&` ou `||`.
