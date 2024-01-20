
# Escapes, caracteres especiais

Como vimos anteriormente, a contrabarra `pattern:\` é usada para demarcar classes de caracteres, como `pattern:\d` por exemplo. Sendo então, um caractere especial em regexes (bem como em strings normais).

Existem outros caracteres especiais que também tem significados especias numa regex, como `pattern:[ ] { } ( ) \ ^ $ . | ? * +`. Esses são usados para realizar buscas mais poderosas.

Não tente decorar a lista -- em breve vamos cobrir cada um deles, e no processo você irá decorá-los automaticamente.

## Escapes

Digamos que precisamos buscar um ponto '.' literal. Não "qualquer caractere", apenas um ponto.

Para usar um caractere especial como um caractere comum, adicionamos uma contrabarra dessa forma: `pattern:\.`.

Isso também é conhecido como "escapar um caractere".

Por exemplo:
```js run
alert( "Chapter 5.1".match(/\d\.\d/) ); // 5.1 (match!)
alert( "Chapter 511".match(/\d\.\d/) ); // null (procurando por um ponto literal \.)
```

Parênteses também são caracteres especiais, então se quisermos usá-los, devemos usar `pattern:\(`. O exemplo abaixo procura a string `"g()"`:

```js run
alert( "function g()".match(/g\(\)/) ); // "g()"
```

Se estivermos buscando por uma contrabarra `\`, que é um caractere especial tanto em strings comuns quanto em regexes, devemos escapá-la também.

```js run
alert( "1\\2".match(/\\/) ); // '\'
```

## Uma barra

O caractere de barra `'/'` não é um caractere especial, mas no JavaSript é usado para delimitar regexes: `pattern:/...pattern.../`, então devemos escapá-la também.

Uma busca por uma barra `'/'` fica assim:

```js run
alert( "/".match(/\//) ); // '/'
```

Por outro lado, se não estivermos usando a sintaxe `pattern:/.../`, mas sim o construtor `new RegExp`, não é necessário usar um escape:

```js run
alert( "/".match(new RegExp("/")) ); // busca um /
```

## new RegExp

Se estivermos criando uma expressão regular com o `new RegExp`, não precisamos escapar o `/`, mas precisamos aplicar outros escapes.

Considere esse exemplo:

```js run
let regexp = new RegExp("\d\.\d");

alert( "Chapter 5.1".match(regexp) ); // null
```

Uma busca muito similar em um dos exemplos anteriores funcionou com o `pattern:/\d\.\d/`, mas nosso `new RegExp("\d\.\d")` não. Por quê?

Isso acontece porque contrabarras são "consumidas" pela string. Como deve se lembrar, strings comuns tem seus próprios caracteres especiais, como o `\n`, e contrabarras são usadas para escapes.

Veja como "\d\.\d" é interpretado:

```js run
alert("\d\.\d"); // d.d
```

Strings comuns "consomem" contrabarras e interpretam-nas separadamente, por exemplo:

- `\n` -- se torna um caractere de quebra de linha,
- `\u1234` -- se torna o caractere Unicode com o código fornecido,
- ...E quando não há nenhum significado especial, como `pattern:\d` ou `\z`, a contrabarra é simplesmente removida.

Então `new RegExp` recebe uma string sem contrabarras. Por isso que a busca não funciona!

Para consertar isso, precisamos escapar a contrabarra, já que strings comuns tornam `\\` em `\`:

```js run
*!*
let regStr = "\\d\\.\\d";
*/!*
alert(regStr); // \d\.\d (correto)

let regexp = new RegExp(regStr);

alert( "Chapter 5.1".match(regexp) ); // 5.1
```

## Resumo

- Para usar caracteres especiais `pattern:[ \ ^ $ . | ? * + ( )` de maneira literal, precisamos usar a contrabarra `\` ("escapar os caracteres").
- Nós também precisamos escapar a `/` se estivermos dentro do `pattern:/.../` (mas não do `new RegExp`).
- Quando passarmos uma string para `new RegExp`, precisamos escapar contrabarras, (`\\`) já que strings consomem uma delas.
