# Tipo Conversões

Na maioria das vezes, os operadores e as funções convertem automaticamente os valores dados a eles para o tipo correto. 

Por exemplo, o `alert` converte automaticamente qualquer valor para uma string para mostrá-lo. Operações matemáticas convertem valores em números.

Há também casos em que precisamos explicitamente converter um valor para o tipo esperado.

```smart header="Not talking about objects yet"
Neste capítulo, não cobriremos objectos. Em vez disso, estudaremos os primitivos primeiro. Mais tarde, depois de aprendermos sobre objetos, veremos como a conversão de objetos funciona no capítulo <info:object-toprimitive>.
```

## Para String

A conversão para strings acontece quando precisamos da forma de string de um valor.

Por exemplo, `alert(value)` faz isso para mostrar o valor.

Nós também podemos chamar a função `String(value)` para converter um valor em uma string:
```js run
let value = true;
alert(typeof value); // booleano

*!*
value = String(value); // agora value é uma string "true"
alert(typeof value); // string
*/!*
```

A conversão de strings é mais óbvia. Uma `false` torna-se `"false"`, `null` torna-se `"null"`, etc.

## Para Número

A conversão numérica acontece automaticamente em funções e expressões matemáticas.

Por exemplo, quando a divisão `/` é aplicada para não-numeros:

```js run
alert( "6" / "2" ); // 3, strings são convertidas para números
```

Podemos usar a função `Number(value)` para converter explicitamente um `value` para um número:

```js run
let str = "123";
alert(typeof str); // string

let num = Number(str); // torna-se um número 123

alert(typeof num); // número

```

A conversão explícita é normalmente necessária quando lemos um valor de uma fonte baseada em string como um formulário de texto, mas esperamos que um número seja inserido.

Se a cadeia não for um número válido, o resultado de tal conversão é `NaN'. Por exemplo:

```js run
let age = Number("uma string arbitrária em vez de um número");

alert(age); // NaN, conversão falhou
```

Regras de conversão numéricas:

| Valor |  Torna-se... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;and&nbsp;false</code> | `1` and `0` |
| `string` | Espaços em branco do ínicio e fim são removidos. Se a string restante estiver vazia, o resultado é `0`. Casa contrário, o número é "lido" a partir da string. Um erro dá `NaN`. |

Exemplos:

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (erro ao ler um número em "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

Por favor note que `null` e `undefined` se comportam diferente aqui: `null` torna-se zero enquanto `undefined` torna-se `NaN`.

````smart header="Adição '+' concatenações de strings"
Quase todas as operações matemáticas convertem valores em números. Uma exceção notável é a adição `+`. Se um dos valores adicionados é uma string, a outra também é convertida para uma string.

Então, ele concatena (junta-se a eles):

```js run
alert( 1 + '2' ); // '12' (string para a direita)
alert( '1' + 2 ); // '12' (string para a esquerda)
```

Isso só acontece quando pelo menos um dos argumentos é uma string. Caso contrário, os valores são convertidos em números.
````

## Para Booleano

A conversão booleana é a mais simples.

Isso acontece em operações lógicas (mais tarde vamos encontrar testes de condição e outras coisas similares), mas também pode ser feito explicitamente com uma chamada para `Boolean(value)`.

A regra de conversão:

- Valores que são intuitivamente "vazios", como `0`, uma string vazia, `null`, `undefined`, e `NaN`, tornam-se `false`.
- Outros valores tornam-se `true`.

Por exemplo:

```js run
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("olá") ); // true
alert( Boolean("") ); // false
```

````warn header="Por favor note: a string com `\"0\"` é `true`"
Algumas linguagens (especificamente PHP) tratam `"0"` como `false`. Mas em JavaScript, uma string não vazia é sempre `true`.

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // espaços, também true (qualquer string não vaiza é true)
```
````


## Resumo

As três conversões de tipo mais usadas são para string, para número e para booleano.

**`Para String`** -- Ocorre quando produzimos algo. Pode ser executado com `String(value)`. A conversão para string é geralmente óbvia para valores primitivos.

**`Para Número`** -- Ocorre em operações matemáticas. Pode ser executado com `Number(value)`.

Regras de conversão numéricas:

| Valor |  Torna-se... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;and&nbsp;false</code> | `1` and `0` |
| `string` | Espaços em branco do ínicio e fim são removidos. Se a string restante estiver vazia, o resultado é `0`. Casa contrário, o número é "lido" a partir da string. Um erro dá `NaN`. |

**`Para Booleano`** -- Ocorre em operações lógicas. Pode ser executado com `Boolean(value)`.

Segue as regras:

| Valor |  Torna-se... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|qualquer outro valor| `true` |


A maioria destas regras são fáceis de entender e memorizar. As exceções notáveis onde as pessoas normalmente cometem erros são:

- `undefined` is `NaN` como um número, não `0`.
- `"0"` e strings com espaço apenas `"   "` são verdadeiras como booleanas.

Objetos não são abordados aqui. Voltaremos a eles mais tarde no capítulo <info:object-toprimitive> que é dedicado exclusivamente a objetos, depois de aprendermos coisas mais básicas sobre JavaScript.
