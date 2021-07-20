# Conversões de Tipo

Na maior parte do tempo, operadores e funções convertem os valores dados a eles para o tipo certo automaticamente.

Por exemplo, `alert` converte automaticamente qualquer valor para string antes de mostrá-lo. Operações matemáticas convertem os valores para números.

Também existem casos em que precisamos explicitamente de converter um valor para o tipo que precisamos.

```smart header="Não vamos falar de objetos"
Nesse capítulo, não vamos falar sobre objetos. Por agora, vamos abordar apenas os tipos primitivos.

Mais tarde, após abordarmos objetos no capítulo <info:object-toprimitive>, veremos como objetos se comportam em conversões de tipo.
```

## Conversões para String

As conversões para string acontecem quando precisamos da forma string de um valor.

Por exemplo, `alert(value)` faz isso para mostrar o valor.

Também podemos usar a função `String(value)` para converter um valor para string:

```js run
let value = true;
alert(typeof value); // boolean

*!*
value = String(value); // agora value é uma string "true"
alert(typeof value); // string
*/!*
```

Conversões para string são as mais fáceis. `false` se torna `"false"`, `null` vira `"null"`, e assim por diante.
 
## Conversões Numéricas

As conversões numéricas acontecem automaticamente em funções e expressões matemáticas.

Por exemplo, quando `/` é usado com valores que não são números:

```js run
alert( "6" / "2" ); // 3, strings viram números
```

Podemos usar a função Number(`value) para converter `value` para number.

```js run
let str = "123";
alert(typeof str); // string

let num = Number(str); // vira o número 123

alert(typeof num); // number
```

Conversões explícitas geralmente são obrigatórias quando estamos a ler um valor de uma fonte baseada em string - como um texto - mas esperamos receber um valor numérico.

Se a string não é um valor numérico válido, o resultado da conversão é `NaN`. Por exemplo:

```js run
let age = Number("uma string ao invés de um número");

alert(age); // NaN, a conversão falhou
```

Regras de conversões numéricas:

| Valor |  Se torna... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;e&nbsp;false</code>| `1` e `0` |
| `string` | Espaços em branco do início e do fim são removidos. Se a string que sobrar for vazia, o resultado é `0`. Senão, o número é "lido" a partir da string. Um erro nos dá `NaN`|

Exemplos:

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (Erro ao ler um número em "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

Note que `null` e `undefined` se comportam de maneira diferente: `null` se torna zero, enquanto `undefined` vira `NaN`.

A maioria dos operadores matemáticos também executam essa conversão, o que veremos no próximo capítulo.

## Conversões Booleanas

Conversões booleanas são as mais simples de todas.

Acontecem em operações lógicas (depois veremos testes de condição e outras coisas similares), mas também podem acontecer explicitamente ao usar a função `Boolean(value)`.

A regra de conversão:

- Valores que são intuitivamente "vazios", como "0", uma string vazia (""), `null`, `undefined` e `NaN`, viram `false`.
- Outras valores viram `true`.

Por exemplo:

```js run
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("Olá") ); // true
alert( Boolean("") ); // false
```

````warn header="Note que uma string com um zero `\"0\"` é `true`"
Algumas linguagens de programação (como PHP), tratam `\"0\"` como `false`. Mas no JavaScript, uma string não-vazia sempre é `true`.

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // espaços também são true (toda string não-vazia se torna true)
```
````

## Sumário

As três conversões mais comuns são para string, number e boolean.

**`Conversões para String`** -- Ocorrem quando mostramos algum valor. Podem ser explicitamente feitas com `String(value)`. As conversões para string geralmente são óbvias com tipos primitivos.

**`Conversões Numéricas`** -- Ocorrem em operações matemáticas. Podem ser feitas com `Number(value)`.

A conversão segue as seguintes regras:

| Valor |  Se torna... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;/&nbsp;false</code>| `1 / 0` |
| `string` | A string é lida "como ela é", espaços em branco do início e do fim são ignorados. Uma string vazia, vira `0`. Um erro nos dá `NaN`|

**`Conversões Booleanas`** -- Ocorrem em operações lógicas. Podem ser feitas com `Boolean(value)`.

Seguem as regras:

| Valor |  Se torna... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|qualquer outro valor| `true` |


A maior parte dessas regras são fáceis de entender e memorizar. Exceções notáveis em que as pessoas geralmente erram são:

- `undefined` é `NaN` como número, não `0`.
- `"0"` e strings só com espaços `"   "` são `true` como booleanos.

Objetos não são citados aqui. Retornaremos depois no capítulo <info:object-toprimitive> que é dedicado exclusivamente a objetos, após aprendermos coisas mais básicas de JavaScript.
