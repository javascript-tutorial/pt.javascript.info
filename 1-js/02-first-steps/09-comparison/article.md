# Comparações

Conhecemos muitos operadores de comparação de matemática:

Em JavaScript eles são escritos assim:

- Maior/menor que: <code>a &gt; b</code>, <code>a &lt; b</code>.
- Maior/menor ou igual: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- Igual: `a == b`, observe o sinal de igualdade duplo `==` significa o teste de igualdade, enquanto um único `a = b` significa uma atribuição.
- Diferente: Em matemática a notação é <code>&ne;</code>, mas em JavaScript é escrita como <code>a != b</code>.

Neste artigo vamos aprender mais sobre diferentes tipos de comparações, como o JavaScript as processa, incluindo peculiaridades importantes.

No final, você encontrará uma boa receita para evitar problemas relacionados a "peculiaridades do JavaScript".

## Booleano é o resultado

Todos os operadores de comparação retornam um valor booleano:

- `true` -- significa "sim", "correto" ou "verdadeiro".
- `false` -- significa "não", "errado" ou "falso".

Por exemplo:

```js run
alert( 2 > 1 );  // true (verdadeiro)
alert( 2 == 1 ); // false (falso)
alert( 2 != 1 ); // true (verdadeiro)
```

Um resultado de comparação pode ser atribuído a uma variável, exatamente como qualquer valor:

```js run
let result = 5 > 4; // atribui o resultado da comparação
alert( result ); // true
```

## Comparação de strings

Para ver se uma string é maior que outra, o JavaScript usa a chamada ordem "dicionário" ou "lexicográfica".

Em outras palavras, as strings são comparadas letra a letra.

Por exemplo:

```js run
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

O algoritmo para comparar duas strings é simples:

1. Compare o primeiro caractere de ambas as strings.
2. Se o primeiro caractere da primeira string for maior (ou menor) que o da outra string, então a primeira string será maior (ou menor) que a segunda e a operação será concluída.
3. Caso contrário, se os primeiros caracteres de ambas as strings forem iguais, compare os segundos caracteres da mesma maneira.
4. Repita até o final de uma das strings.
5. Se ambas as strings terminarem com o mesmo comprimento, elas serão iguais. Caso contrário, a string mais longa é maior.

No primeiro exemplo acima, a comparação `'Z' > 'A'` obtém um resultado na primeira etapa.

A segunda comparação `'Glow'` e `'Glee'` precisa de mais etapas, pois as strings são comparadas caractere por caractere:

1. `G` é o mesmo que `G`.
2. `l` é o mesmo que `l`.
3. `o` é maior que `e`. Pare aqui. A primeira string é maior.

```smart header="Não é um dicionário real, mas ordem Unicode"
O algoritmo de comparação fornecido acima é aproximadamente equivalente ao usado em dicionários ou listas telefônicas, mas não é exatamente o mesmo.

Por exemplo, um caso relevante. Uma letra maiúscula `"A"` não é igual à letra minúscula `"a"`. Qual é maior? A letra minúscula `"a"`. Por quê? Porque o caractere minúsculo tem um índice maior na tabela de codificação interna que o JavaScript usa (Unicode). Voltaremos a detalhes específicos e consequências disso no capítulo <info:string>.
```

## Comparação de diferentes tipos

Quando comparado valores de tipos diferentes, o JavaScript converte os valores em números.

Por exemplo:

```js run
alert( '2' > 1 ); // true, string '2' se torna no número 2
alert( '01' == 1 ); // true, string '01' se torna no número 1
```

Para valores booleanos, `true` torna-se `1` e `false` torna-se `0`.

Por exemplo:

```js run
alert( true == 1 ); // true
alert( false == 0 ); // true
```

````smart header="Uma consequência engraçada"
É possível que ao mesmo tempo:

- Dois valores são iguais.
- Um deles é `true` como booleano e o outro é `falso` como booleano.

Por exemplo:

```js run
let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!
```

Do ponto de vista do JavaScript, esse resultado é bastante normal. Uma verificação de igualdade converte valores usando a conversão numérica (portanto, `"0"` se torna `0`), enquanto a conversão `Boolean` explícita usa outro conjunto de regras.
````

## Igualdade estrita

Uma verificação de igualdade regular `==` tem um problema. Ela não pode diferenciar `0` de `false`:

```js run
alert( 0 == false ); // true
```

A mesma coisa acontece com uma string vazia:

```js run
alert( '' == false ); // true
```

Isso acontece porque operandos de tipos diferentes são convertidos em números pelo operador de igualdade `==`. Uma string vazia, assim como `false`, torna-se em um zero.

O que fazer se quisermos diferenciar `0` de `false`?

**Um operador de igualdade estrita `===` verifica a igualdade sem conversão de tipo.**

Em outras palavras, se `a` e `b` forem de tipos diferentes, então `a === b` retornará imediatamente `false` sem tentar convertê-los.

Vamos tentar:

```js run
alert( 0 === false ); // false, porque os tipos são diferentes
```

Há também um operador de "desigualdade estrita" `!==` análogo a `!=`.

O operador de igualdade estrita é um pouco mais longo para escrever, mas torna óbvio o que está acontecendo e deixa menos espaço para erros.

## Comparação com null e undefined

Há um comportamento não intuitivo quando `null` ou `undefined` são comparados a outros valores.

Para uma verificação de igualdade estrita `===`
: Esses valores diferem, porque cada um deles é de um tipo diferente.

    ```js run
    alert( null === undefined ); // false
    ```

Para uma verificação não estrita `==`
: Há uma regra especial. Esses dois são um "casal doce": eles se igualam (no sentido de `==`), mas não a qualquer outro valor.

    ```js run
    alert( null == undefined ); // true
    ```

Para matemática e outras comparações `< > <= >=`
: `null/undefined` são convertidos em números: `null` torna-se `0`, enquanto `undefined` torna-se `NaN`.

Agora vamos ver algumas coisas engraçadas que acontecem quando aplicamos essas regras. E, o que é mais importante, como não cair numa armadilha com eles.: Esses valores diferem, porque cada um deles é de um tipo diferente.

### Resultado estranho: null vs 0

Vamos comparar `null` com zero:

```js run
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) *!*true*/!*
```

Matematicamente, isso é estranho. O último resultado afirma que "`null` é maior ou igual a zero", então em uma das comparações acima deve ser `true`, mas ambos são falsos.

A razão é que uma verificação de igualdade `==` e comparações `> < >= <=` funcionam de forma diferente. As comparações convertem `null` em um número, tratando-o como `0`. É por isso que (3) `null >= 0` é verdadeiro e (1) `null > 0` é falso.

Por outro lado, a verificação de igualdade `==` para `undefined` e `null` é definida de tal forma que, sem nenhuma conversão, eles são iguais entre si, e não são iguais a mais nada. É por isso que (2) `null == 0` é falso.

### Um incomparável "undefined"

O valor `undefined` (indefinido) não deve ser comparado a outros valores:

```js run
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
```

Por que não gostam do zero? Sempre falso!

Obtemos esses resultados porque:

- Comparações `(1)` e `(2)` retornam `false` porque `undefined` é convertido em `NaN`, e `NaN` é um valor numérico especial que retorna `false` para todas as comparações.
- A verificação de igualdade `(3)` retorna `false` porque `undefined` só é igual a `null`, `undefined` e nenhum outro valor.

### Evite problemas

Por que examinamos esses exemplos? Devemos nos lembrar dessas peculiaridades o tempo todo? Bem, na verdade, não. Essas coisas complicadas gradualmente se tornarão familiares com o tempo, mas há uma maneira sólida de evitar problemas com elas:

- Trate qualquer comparação com `undefined/null` exceto a igualdade estrita `===` com cuidado excepcional.
- Não use comparações `>= > < <=` com uma variável que pode ser `null/undefined`, a menos que você tenha a certeza do que está fazendo. Se uma variável tiver `null` ou `undefined`, verifique-os separadamente.

## Resumo

- Os operadores de comparação retornam um valor booleano.
- As strings são comparadas letra a letra na ordem do "dicionário".
- Quando valores de tipos diferentes são comparados, eles são convertidos em números (com a exclusão de uma verificação de igualdade estrita).
- Os valores `null` e `undefined` são iguais `==` entre si e não são iguais a nenhum outro valor.
- Tenha cuidado ao usar comparações, como `>` ou `<`, com variáveis ​​que possam ocasionalmente ser `null/undefined`. Verificar por `null/undefined` separadamente é uma boa ideia.
