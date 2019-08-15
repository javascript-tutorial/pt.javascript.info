# Comparações

Conhecemos muitos operadores de comparação de matemática:

- Maior/menor que: <code>a &gt; b</code>, <code>a &lt; b</code>.
- Maior/menor ou igual que: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- Igual: `a == b` (observe o sinal de igual duplo `=`. Um único sinal de igual `a = b` significaria uma atribuição).
- Diferente. Em matemática, a notação é <code>&ne;</code>, mas em JavaScript é escrita como uma atribuição com um sinal de exclamação antes: <code>a != b</code>.

## Booleano é o resultado

Como todos os outros operadores, uma comparação retorna um valor. Nesse caso, o valor é um booleano.

- `true` -- significa "sim", "correto" ou "verdade".
- `false` -- significa "não", "errado" ou "falso".

Por exemplo:

```js run
alert( 2 > 1 );  // true (correct)
alert( 2 == 1 ); // false (wrong)
alert( 2 != 1 ); // true (correct)
```

Um resultado de comparação pode ser atribuído a uma variável, assim como qualquer valor:

```js run
let result = 5 > 4; // assign the result of the comparison
alert( result ); // true
```

## Comparação de strings

Para ver se uma string é maior que outra, o JavaScript usa o chamado ordem "dicionário" ou "lexicográfico".

Em outras palavras, as strings são comparadas letra a letra.

Por exemplo:

```js run
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

O algoritmo para comparar duas strings é simples:

1. Compare o primeiro caractere de ambas as strings.
2. Se o primeiro caractere da primeira string for maior (ou menor que) da outra, a primeira string será maior (ou menor) que a segunda. Nós terminamos
3. Caso contrário, se os primeiros caracteres das duas sequências forem os mesmos, compare os segundos caracteres da mesma maneira.
4. Repita até o final de qualquer string.
5. Se ambas as seqüências terminarem no mesmo comprimento, elas serão iguais. Caso contrário, a string mais longa é maior.

Nos exemplos acima, a comparação `'Z' > 'A'` chega a um resultado no primeiro passo enquanto as strings `"Glow"` e `"Glee"`são comparadas caractere por caractere:

1. `G` é o mesmo que `G`.
2. `l` é o mesmo que `l`.
3. `o` é maior que `e`. Pare aqui. A primeira string é maior.

```smart header="Not a real dictionary, but Unicode order"
O algoritmo de comparação dado acima é aproximadamente equivalente ao usado em dicionários ou catálogos telefônicos, mas não é exatamente o mesmo.

Por exemplo, um caso importante. Uma letra maiúscula `"A"` não é igual à minúscula `"a"`. Qual delas é maior? A `"a"` minúscula. Por quê? Porque o caractere minúsculo tem um índice maior na tabela de codificação interna que o JavaScript usa (Unicode). Voltaremos a detalhes específicos e conseqüências disso no capítulo <info: string>.
```

## Comparação de diferentes tipos

Ao comparar valores de diferentes tipos, o JavaScript converte os valores em números.

Por exemplo:

```js run
alert( '2' > 1 ); // true, string '2' becomes a number 2
alert( '01' == 1 ); // true, string '01' becomes a number 1
```

Para valores booleanos, `true` torna-se` 1` e `false` torna-se` 0`.

Por exemplo:

```js run
alert( true == 1 ); // true
alert( false == 0 ); // true
```

````smart header="A funny consequence"
É possível que ao mesmo tempo:

- Dois valores são iguais.
- Um deles é `true` como booleano e o outro é` false` como booleano.

Por exemplo:

```js run
let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!
```

Do ponto de vista do JavaScript, esse resultado é normal. Uma verificação de igualdade converte valores usando a conversão numérica (portanto `"0"` torna-se `0`), enquanto a conversão explícita de` Boolean` usa outro conjunto de regras.
````

## Igualdade estrita

Uma verificação de igualdade regular `==` tem um problema. Não é possível diferenciar `0` de` false`:

```js run
alert( 0 == false ); // true
```

A mesma coisa acontece com uma string vazia:

```js run
alert( '' == false ); // true
```

Isso acontece porque operandos de diferentes tipos são convertidos em números pelo operador de igualdade `==`. Uma string vazia, assim como `false`, se torna um zero.

O que fazer se quisermos diferenciar `0` de` false`?

**Um operador de igualdade estrito `===` verifica a igualdade sem conversão de tipo.**

Em outras palavras, se `a` e `b` forem de tipos diferentes, então `a === b` retornará imediatamente `false` sem uma tentativa de convertê-los.

Vamos tentar:

```js run
alert( 0 === false ); // false, because the types are different
```

Existe também um operador "diferença estrita" `!==` análogo a `!=`.

O operador de igualdade estrito é um pouco mais longo para escrever, mas torna óbvio o que está acontecendo e deixa menos espaço para erros.

## Comparação com "null" e "undefined"

Vamos ver mais casos extremos.

Existe um comportamento não intuitivo quando `null` ou` undefined` são comparados com outros valores.


Para uma verificação de igualdade estrita `===` : Esses valores são diferentes, porque cada um deles é um tipo diferente.

    ```js run
    alert( null === undefined ); // false
    ```

Para uma verificação não estrita `==` : Existe uma regra especial. Esses dois são um "lindo casal": eles são iguais (no sentido de "=="), mas com nenhum outro valor.

    ```js run
    alert( null == undefined ); // true
    ```

Para matemática e outras comparações `<> <=> =` : `null/undefined` são convertidos em números: `null` torna-se `0`, enquanto `undefined` torna-se `NaN`.

Agora vamos ver algumas coisas engraçadas que acontecem quando aplicamos essas regras. E, o que é mais importante, como não cair em uma armadilha com eles.

### Resultado estranho: "null" vs "0"

Vamos comparar `null` com um zero:

```js run
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) *!*true*/!*
```

Matematicamente, isso é estranho. O último resultado afirma que "`null` é maior que ou igual a zero", então em uma das comparações acima deve ser `true`, mas ambos casos são falsos.

A razão é que uma verificação de igualdade `==` e comparações `> < >= <=` funcionam de maneira diferente. Comparações convertem `null` para um número, tratando-o como `0`. É por isso que (3) `null >= 0` é verdadeiro e (1) `null > 0` é falso.

Por outro lado, a verificação de igualdade `==` para `undefined` e `null` é definida de tal forma que, sem nenhuma conversão, elas são iguais entre si e não equivalem a qualquer outra coisa. É por isso que (2) `null == 0` é falso.

### Um incomparável "undefined"

O valor `undefined` não deve ser comparado a outros valores:

```js run
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
```

Por que não gostam do zero? Sempre falso!

Obtemos estes resultados porque:

- Comparações `(1)` e `(2)` retornam `false` porque` undefined` é convertido para `NaN` e` NaN` é um valor numérico especial que retorna `false` para todas as comparações.
- A verificação de igualdade `(3)` retorna `false` porque` undefined` somente é igual a `null` e nenhum outro valor.

### Evitar problemas

Por que nós examinamos esses exemplos? Devemos nos lembrar dessas peculiaridades o tempo todo? Bem, na verdade não. Na verdade, essas coisas complicadas gradualmente se tornarão familiares ao longo do tempo, mas há uma maneira sólida de evitar problemas com elas:

Apenas trate qualquer comparação com `undefined / null` exceto a igualdade estrita ` === ` com cuidado excepcional.

Não use comparações `> => <<=` com uma variável que pode ser `null / undefined`, a menos que você tenha certeza do que está fazendo. Se uma variável puder ter esses valores, verifique-os separadamente.

## Resumo

- Operadores de comparação retornam um valor booleano.
- As strings são comparadas letra por letra na ordem "dicionário".
- Quando valores de diferentes tipos são comparados, eles são convertidos em números (com a exclusão de uma verificação de igualdade estrita).
- Os valores `null` e` undefined` usando `==` são iguais entre eles e não são iguais a nenhum outro valor.
- Tenha cuidado ao usar comparações como `>` ou `<` com variáveis que ocasionalmente podem ser 'null / undefined'. Verificar se há "null / undefined" separadamente é uma boa ideia.
