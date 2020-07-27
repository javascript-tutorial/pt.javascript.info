<<<<<<< HEAD
# Métodos de RegExp e String

Neste artigo, abordaremos vários métodos que funcionam com regexps em profundidade.

## str.match(regexp)

O método `str.macth(regexp)` pesquisa correspondências para `regexp` na string `str`.

Possui 3 modos:

1. Se a `regexp` não tiver a flag `padrão:g`, ela retornará a primeira correspondências como uma matriz com a captura de grupos e propriedades `index` (posição da correspondência), `input` (string de entrada, igual a `str`):

    ```js run
    let str = "Eu amo JavaScript";

    let result = str.match(/Java(Script)/);

    alert( result[0] );     // JavaScript (correspondência completa)
    alert( result[1] );     // Script (primeira captura de grupo)
    alert( result.length ); // 2

    // Informação adicional:
    alert( result.index );  // 0 (posição da correspondÊncia)
    alert( result.input );  // Eu amo JavaScript (string original)
    ```

2. Se a `regexp` tiver a flag `padrão:g`, ela retornará uma matriz de todas as correspondências como strings, sem capturar grupos e outros detalhes.
    ```js run
    let str = "Eu amo JavaScript";
=======
# Methods of RegExp and String

In this article we'll cover various methods that work with regexps in-depth.

## str.match(regexp)

The method `str.match(regexp)` finds matches for `regexp` in the string `str`.

It has 3 modes:

1. If the `regexp` doesn't have flag `pattern:g`, then it returns the first match as an array with capturing groups and properties `index` (position of the match), `input` (input string, equals `str`):

    ```js run
    let str = "I love JavaScript";

    let result = str.match(/Java(Script)/);

    alert( result[0] );     // JavaScript (full match)
    alert( result[1] );     // Script (first capturing group)
    alert( result.length ); // 2

    // Additional information:
    alert( result.index );  // 0 (match position)
    alert( result.input );  // I love JavaScript (source string)
    ```

2. If the `regexp` has flag `pattern:g`, then it returns an array of all matches as strings, without capturing groups and other details.
    ```js run
    let str = "I love JavaScript";
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

    let result = str.match(/Java(Script)/g);

    alert( result[0] ); // JavaScript
    alert( result.length ); // 1
    ```

<<<<<<< HEAD
3. Se não houver correspondências, não importa se há flag `padrão:g` ou não, `null` é retornado.

    Essa é uma nuance importante. Se não há correspondências, não teremos uma matriz vazia, mas `null`. É fácil de cometer um erro esquecendo disso, por exemplo:

    ```js run
    let str = "Eu amo JavaScript";
=======
3. If there are no matches, no matter if there's flag `pattern:g` or not, `null` is returned.

    That's an important nuance. If there are no matches, we don't get an empty array, but `null`. It's easy to make a mistake forgetting about it, e.g.:

    ```js run
    let str = "I love JavaScript";
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

    let result = str.match(/HTML/);

    alert(result); // null
    alert(result.length); // Error: Cannot read property 'length' of null
    ```

<<<<<<< HEAD
    Se desejamos que o resultado seja uma matriz, podemos escrever assim:
=======
    If we want the result to be an array, we can write like this:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

    ```js
    let result = str.match(regexp) || [];
    ```

## str.matchAll(regexp)

<<<<<<< HEAD
[navegador recente="new"]

O método `str.matchAll(regexp)` é uma "nova, melhorada" variante do `str.match`.

É usada principalmente para buscar todas as correspondências com todos os grupos.

Existem 3 diferenças em relação ao `match`:

1. Ela retorna um objeto iterável com correspondências em vez de uma matriz. Podemos fazer uma matriz regular usando `Array.from`.
2. Cada correspondência é retornada como uma matriz com grupos de captura (o mesmo formate que `str.match` sem a flag `padrão:g`).
3. Se não houver resultados, não retornará `null`, mas um objeto iterável vazio.

Exemplo de uso:

```js run
let str = '<h1>Olá, mundo!</h1>';
=======
[recent browser="new"]

The method `str.matchAll(regexp)` is a "newer, improved" variant of `str.match`.

It's used mainly to search for all matches with all groups.

There are 3 differences from `match`:

1. It returns an iterable object with matches instead of an array. We can make a regular array from it using `Array.from`.
2. Every match is returned as an array with capturing groups (the same format as `str.match` without flag `pattern:g`).
3. If there are no results, it returns not `null`, but an empty iterable object.

Usage example:

```js run
let str = '<h1>Hello, world!</h1>';
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2
let regexp = /<(.*?)>/g;

let matchAll = str.matchAll(regexp);

<<<<<<< HEAD
alert(matchAll); // [object RegExp String Iterator], não é matriz, mas é iterável

matchAll = Array.from(matchAll); // matriz agora
=======
alert(matchAll); // [object RegExp String Iterator], not array, but an iterable

matchAll = Array.from(matchAll); // array now
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

let firstMatch = matchAll[0];
alert( firstMatch[0] );  // <h1>
alert( firstMatch[1] );  // h1
alert( firstMatch.index );  // 0
<<<<<<< HEAD
alert( firstMatch.input );  // <h1>Olá, mundo!</h1>
```

Se usarmos `for..of` para repetir as correspondências do `matchAll`, então não precisaremos mais do `Array.from`.

## str.split(regexp|substr, limit)

Divide a string usando regexp (ou uma substring) como um delimitador.

Podemos usar `split` com strings, desse jeito:

```js run
alert('12-34-56'.split('-')) // matriz de [12, 34, 56]
```

Mas podemos dividir por uma expressão regular, do mesmo modo:

```js run
alert('12, 34, 56'.split(/,\s*/)) // matriz de [12, 34, 56]
=======
alert( firstMatch.input );  // <h1>Hello, world!</h1>
```

If we use `for..of` to loop over `matchAll` matches, then we don't need `Array.from` any more.

## str.split(regexp|substr, limit)

Splits the string using the regexp (or a substring) as a delimiter.

We can use `split` with strings, like this:

```js run
alert('12-34-56'.split('-')) // array of [12, 34, 56]
```

But we can split by a regular expression, the same way:

```js run
alert('12, 34, 56'.split(/,\s*/)) // array of [12, 34, 56]
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2
```

## str.search(regexp)

<<<<<<< HEAD
O método `str.search(regexp)` retorna a posição da primeira correspondência ou `-1` se nada for encontrado:

```js run
let str = "Uma gota de tinta pode fazer um milhão pensar";

alert( str.search( /tinta/i ) ); // 12 (posição da primeira correspondência)
```

**A importante limitação: `search` apenas encontra a primeira correspondência.**

Se precisarmos de posições de correspondências mais distantes, devemos usar outros meios, como encontrar todos eles com `str.matchAll(regexp)`.

## str.replace(str|regexp, str|func)

Esse é um método genério para buscar e substituir, um dos mais úteis. O canivete suíço para procurar e substituir.

Podemos usá-lo sem regexps, para buscar e substituir uma substring:

```js run
// substitui um hífen por dois-pontos
alert('12-34-56'.replace("-", ":")) // 12:34-56
```

No entanto há uma armadilha.

**Quando o primeiro argumento do `replace` é uma string, ele apenas substitui a primeira correspondência**

Você pode ver isso no exemplo acima: apenas o primeiro `"-"` é substituído por `":"`.

Para encontrar todos os hífens, não precisamos usar a string `"-"`, mas a regexp `padrão:/-/g`, com a flag obrigatória `padrão:g`:

```js run
// substitui todos os hífens por um dois-pontos
alert( '12-34-56'.replace( /-/g, ":" ) )  // 12:34:56
```

O segundo argumento é uma string substituta. Podemos usar caracteres especiais:

| Símbolos | Ação na string substituta |
|--------|--------|
|`$&`|insere a correspondência toda|
|<code>$&#096;</code>|insere uma parte da string antes da correspondência|
|`$'`|insere uma parte da string depois da correspondência|
|`$n`|se `n` for um número de 1-2 dígitos, insere o conteúdo do n-ésimo grupo de captura, para detalhes, consulte [](info:regexp-groups)|
|`$<name>`|insere o conteúdo dos parênteses com `name` fornecido, para detalhes, consulte [](info:regexp-groups)|
|`$$`|insere o caractere `$` |

Por exemplo:
=======
The method `str.search(regexp)` returns the position of the first match or `-1` if none found:

```js run
let str = "A drop of ink may make a million think";

alert( str.search( /ink/i ) ); // 10 (first match position)
```

**The important limitation: `search` only finds the first match.**

If we need positions of further matches, we should use other means, such as finding them all with `str.matchAll(regexp)`.

## str.replace(str|regexp, str|func)

This is a generic method for searching and replacing, one of most useful ones. The swiss army knife for searching and replacing.  

We can use it without regexps, to search and replace a substring:

```js run
// replace a dash by a colon
alert('12-34-56'.replace("-", ":")) // 12:34-56
```

There's a pitfall though.

**When the first argument of `replace` is a string, it only replaces the first match.**

You can see that in the example above: only the first `"-"` is replaced by `":"`.

To find all hyphens, we need to use not the string `"-"`, but a regexp `pattern:/-/g`, with the obligatory `pattern:g` flag:

```js run
// replace all dashes by a colon
alert( '12-34-56'.replace( *!*/-/g*/!*, ":" ) )  // 12:34:56
```

The second argument is a replacement string. We can use special character in it:

| Symbols | Action in the replacement string |
|--------|--------|
|`$&`|inserts the whole match|
|<code>$&#096;</code>|inserts a part of the string before the match|
|`$'`|inserts a part of the string after the match|
|`$n`|if `n` is a 1-2 digit number, inserts the contents of n-th capturing group, for details see [](info:regexp-groups)|
|`$<name>`|inserts the contents of the parentheses with the given `name`, for details see [](info:regexp-groups)|
|`$$`|inserts character `$` |

For instance:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

```js run
let str = "John Smith";

<<<<<<< HEAD
// troca nome e sobrenome
alert(str.replace(/(john) (smith)/i, '$2, $1')) // Smith, John
```

**Para situações que exigem "inteligentes" substituições, o segundo argumento pode ser uma função**

Isso será chamado para cada correspondência e o valor retornado será inserido como uma substituição.

A função é chamada com argumentos `func(match, p1, p2, ..., pn, offset, input, groups)`:

1. `match` -- a correspondência,
2. `p1, p2, ..., pn` -- conteúdo dos grupos de captura (se existir algum),
3. `offset` -- posição da correspondência,
4. `input` -- a string original,
5. `groups` -- um objeto com grupos nomeados.

Se não existem parênteses na regexp, terá apenas 3 argumentos: `func(str, offset, input)`.

Por exemplo, vamos colocar todas as correspondências em maiúsculas:

```js run
let str = "html e css";

let result = str.replace(/html|css/gi, str => str.toUpperCase());

alert(result); // HTML e CSS
```

Substituir cada correspondência pela sua posição na string:
=======
// swap first and last name
alert(str.replace(/(john) (smith)/i, '$2, $1')) // Smith, John
```

**For situations that require "smart" replacements, the second argument can be a function.**

It will be called for each match, and the returned value will be inserted as a replacement.

The function is called with arguments `func(match, p1, p2, ..., pn, offset, input, groups)`:

1. `match` -- the match,
2. `p1, p2, ..., pn` -- contents of capturing groups (if there are any),
3. `offset` -- position of the match,
4. `input` -- the source string,
5. `groups` -- an object with named groups.

If there are no parentheses in the regexp, then there are only 3 arguments: `func(str, offset, input)`.

For example, let's uppercase all matches:

```js run
let str = "html and css";

let result = str.replace(/html|css/gi, str => str.toUpperCase());

alert(result); // HTML and CSS
```

Replace each match by its position in the string:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

```js run
alert("Ho-Ho-ho".replace(/ho/gi, (match, offset) => offset)); // 0-3-6
```

<<<<<<< HEAD
No exemplo abaixo, existem dois parênteses, então a função de substituição é chamada com 5 argumentos: o primeiro é a correspondência completa, em seguida, 2 parênteses, e depois dele (não usado no exemplo) a posição da correspondência e a string original:
=======
In the example below there are two parentheses, so the replacement function is called with 5 arguments: the first is the full match, then 2 parentheses, and after it (not used in the example) the match position and the source string:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

```js run
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (match, name, surname) => `${surname}, ${name}`);

alert(result); // Smith, John
```

<<<<<<< HEAD
Se existirem muitos grupos, é conveniente usar os parâmetros de descanso para acessá-los:
=======
If there are many groups, it's convenient to use rest parameters to access them:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

```js run
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (...match) => `${match[2]}, ${match[1]}`);

alert(result); // Smith, John
```

<<<<<<< HEAD
Ou, se usarmos grupos nomeados, o objeto `groups` com eles é sempre o último, para que possamos obtê-los assim:
=======
Or, if we're using named groups, then `groups` object with them is always the last, so we can obtain it like this:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

```js run
let str = "John Smith";

let result = str.replace(/(?<name>\w+) (?<surname>\w+)/, (...match) => {
  let groups = match.pop();

  return `${groups.surname}, ${groups.name}`;
});

alert(result); // Smith, John
```

<<<<<<< HEAD
O uso de uma função nos dá o poder de substituição definitivo, porque obtém todas as informações sobre a correspondência, tem a variáveis externas e pode fazer tudo.

## regexp.exec(str)

O método `regexp.exec(str)` retorna uma correspondência para `regexp` na string `str`. Diferentes dos métodos anteriores, é chamado numa regexp, não em uma string.

Se comporta de modo diferente dependendo se a regexp possui a flag `padrão:g`.

Se não houver `padrão:g`, a `regexp.exec(str)` retorna a primeira correspondência exatamente como `str.match(regexp)`. Esse comportamento não traz nada de novo.

Mas se houver a flag `padrão:g`, então:
- A chamada para `regexp.exec(str)` retorna a primeira correspondência e salva a posição imediatamente após ela na propriedade `regexp.lastIndex`.
- A próxima chamada inicia a pesquisa na posição `regexp.lastIndex`, retorna a próxima correspondência e salva a posição após elas em `regexp.lastIndex`.
- ...e assim por diante.
- Se não houver correspondências, `regexp.exec` retorna `null` e reinicia `regexp.lastIndex` para `0`.

Portanto, repetidas chamadas retornam todas as correspondências uma após outra, usando a propriedade `regexp.lastIndex` para manter o controle da atual posição de busca.

No passado, antes do método `str.matchAll` ser adicionado ao JavaScript, as chamadas de `regexp.exec` eram usadas em repetição para obter todas as correspondências com grupos:

```js run
let str = 'Mais sobre JavaScript em https://javascript.info';
=======
Using a function gives us the ultimate replacement power, because it gets all the information about the match, has access to outer variables and can do everything.

## regexp.exec(str)

The method `regexp.exec(str)` method returns a match for `regexp` in the string `str`.  Unlike previous methods, it's called on a regexp, not on a string.

It behaves differently depending on whether the regexp has flag `pattern:g`.

If there's no `pattern:g`, then `regexp.exec(str)` returns the first match exactly as  `str.match(regexp)`. This behavior doesn't bring anything new.

But if there's flag `pattern:g`, then:
- A call to `regexp.exec(str)` returns the first match and saves the position immediately after it in the property `regexp.lastIndex`.
- The next such call starts the search from position `regexp.lastIndex`, returns the next match and saves the position after it in `regexp.lastIndex`.
- ...And so on.
- If there are no matches, `regexp.exec` returns `null` and resets `regexp.lastIndex` to `0`.

So, repeated calls return all matches one after another, using property `regexp.lastIndex` to keep track of the current search position.

In the past, before the method `str.matchAll` was added to JavaScript, calls of `regexp.exec` were used in the loop to get all matches with groups:

```js run
let str = 'More about JavaScript at https://javascript.info';
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2
let regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
<<<<<<< HEAD
  alert( `Encontrado ${result[0]} na posição ${result.index}` );
  // Encontrado JavaScript na posição 11, depois
  // Encontrado javascript na posição 33
}
```

Isso funciona bem agora, no entanto para navegadores novos `str.matchAll` é usualmente mais conveniente.

**Podemos usar `regexp.exec` para buscar de uma posição dada, configurando manualmente `lastIndex`.**

Por exemplo:

```js run
let str = 'Olá, mundo!';

let regexp = /\w+/g; // sem a flag "g", propriedade lastIndex é ignorada
regexp.lastIndex = 3; // pesquisa a partir da 5º posição (a partir da vírgula)

alert( regexp.exec(str) ); // mundo
```

Se o regexp tiver flag `padrão:y`, então a pesquisa será realizada exatamente na posição `regexp.lastIndex`, nada mais.

Vamos substituir a flag `padrão:g` pela `padrão:y` no exemplo acima. Não haverá correspondências, como não haverá palavra na posição `3`:

```js run
let str = 'Olá, mundo!';

let regexp = /\w+/y;
regexp.lastIndex = 3; // pesquisa exatamente na posição 5
=======
  alert( `Found ${result[0]} at position ${result.index}` );
  // Found JavaScript at position 11, then
  // Found javascript at position 33
}
```

This works now as well, although for newer browsers `str.matchAll` is usually more convenient.

**We can use `regexp.exec` to search from a given position by manually setting `lastIndex`.**

For instance:

```js run
let str = 'Hello, world!';

let regexp = /\w+/g; // without flag "g", lastIndex property is ignored
regexp.lastIndex = 5; // search from 5th position (from the comma)

alert( regexp.exec(str) ); // world
```

If the regexp has flag `pattern:y`, then the search will be performed exactly at the  position `regexp.lastIndex`, not any further.

Let's replace flag `pattern:g` with `pattern:y` in the example above. There will be no matches, as there's no word at position `5`:

```js run
let str = 'Hello, world!';

let regexp = /\w+/y;
regexp.lastIndex = 5; // search exactly at position 5
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

alert( regexp.exec(str) ); // null
```

<<<<<<< HEAD
Isso é conveniente para situações em que precisamos "ler" algo da string por uma regexp nessa posição exata, não em outro lugar.

## regexp.test(str)

O método `regex.test(str)` procura por uma correspondência e retorna `true/false` se existe.

Por exemplo:

```js run
let str = "Eu amo JavaScript";

// esses dois testes fazem o mesmo
alert( /amo/i.test(str) ); // true
alert( str.search(/amo/i) != -1 ); // true
```

Um exemplo com a resposta negativa:
=======
That's convenient for situations when we need to "read" something from the string by a regexp at the exact position, not somewhere further.

## regexp.test(str)

The method `regexp.test(str)` looks for a match and returns `true/false` whether it exists.

For instance:

```js run
let str = "I love JavaScript";

// these two tests do the same
alert( *!*/love/i*/!*.test(str) ); // true
alert( str.search(*!*/love/i*/!*) != -1 ); // true
```

An example with the negative answer:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

```js run
let str = "Bla-bla-bla";

<<<<<<< HEAD
alert( /amo/i.test(str) ); // false
alert( str.search(/love/i) != -1 ); // false
```

Se a regexp tiver a flag `padrão:g`, o `regexp.test` procura na propriedade `regexp.lastIndex` e atualiza-a, assim como `regexp.exec`

Então podemos usar isso para buscar a partir de uma posição fornecida:

```js run
let regexp = /amo/gi;

let str = "Eu amo JavaScript";

// inicia a pesquisa da posição 10:
regexp.lastIndex = 10;
alert( regexp.test(str) ); // false (sem correspondência)
```

````warn header="A mesma regexp global testada repetidamente em diferentes fontes pode falhar"
Se aplicarmos a mesma regexp global em diferentes entradas, isso poderá levar a resultados incorreto, porque a chamada `regexp.test` avança a propriedade `regexp.lastIndex`, portanto a pesquisa em outra string pode ter um início numa posição diferente de zero.

Por exemplo, aqui chamamos `regexp.test` duas vezes no mesmo texto e a segunda vez falha:

```js run
let regexp = /javascript/g;  // (regexp recém criada: regexp.lastIndex=0)

alert( regexp.test("javascript") ); // true (regexp.lastIndex=10 agora)
alert( regexp.test("javascript") ); // false
```

Isso é exatamente porque `regexp.lastIndex` é diferente de zero no segundo teste.

Para contornar isso, podemos definir `regexp.lastIndex = 0` antes de cada busca. Ou, em vez de chamar métodos no regexp, usar métodos de string `str.match/search/...`, eles não usam `lastIndex`.
=======
alert( *!*/love/i*/!*.test(str) ); // false
alert( str.search(*!*/love/i*/!*) != -1 ); // false
```

If the regexp has flag `pattern:g`, then `regexp.test` looks from `regexp.lastIndex` property and updates this property, just like `regexp.exec`.

So we can use it to search from a given position:

```js run
let regexp = /love/gi;

let str = "I love JavaScript";

// start the search from position 10:
regexp.lastIndex = 10;
alert( regexp.test(str) ); // false (no match)
```

````warn header="Same global regexp tested repeatedly on different sources may fail"
If we apply the same global regexp to different inputs, it may lead to wrong result, because `regexp.test` call advances `regexp.lastIndex` property, so the search in another string may start from non-zero position.

For instance, here we call `regexp.test` twice on the same text, and the second time fails:

```js run
let regexp = /javascript/g;  // (regexp just created: regexp.lastIndex=0)

alert( regexp.test("javascript") ); // true (regexp.lastIndex=10 now)
alert( regexp.test("javascript") ); // false
```

That's exactly because `regexp.lastIndex` is non-zero in the second test.

To work around that, we can set `regexp.lastIndex = 0` before each search. Or instead of calling methods on regexp, use string methods `str.match/search/...`, they don't use `lastIndex`.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2
````
