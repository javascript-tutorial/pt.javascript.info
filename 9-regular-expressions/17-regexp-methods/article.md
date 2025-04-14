# Métodos de RegExp e String

Neste artigo, abordaremos em profundidade vários métodos que funcionam com regexps.

## str.match(regexp)

O método `str.match(regexp)` pesquisa correspondências para `regexp` na string `str`.

Possui 3 modos:

1. Se a `regexp` não tiver a flag `pattern:g`, ela retornará a primeira correspondência como uma matriz com a captura de grupos e propriedades `index` (posição da correspondência), `input` (string de entrada, igual a `str`):

    ```js run
    let str = "Eu amo JavaScript";

    let result = str.match(/Java(Script)/);

    alert( result[0] );     // JavaScript (correspondência completa)
    alert( result[1] );     // Script (primeira captura de grupo)
    alert( result.length ); // 2

    // Informação adicional:
    alert( result.index );  // 7 (posição da correspondÊncia)
    alert( result.input );  // Eu amo JavaScript (string original)
    ```

2. Se a `regexp` tiver a flag `pattern:g`, ela retornará uma matriz com todas as correspondências como strings, sem capturar grupos e outros detalhes.
    ```js run
    let str = "Eu amo JavaScript";

    let result = str.match(/Java(Script)/g);

    alert( result[0] ); // JavaScript
    alert( result.length ); // 1
    ```

3. Se não houver correspondências, não importa se há flag `pattern:g` ou não, `null` é retornado.

    Essa é uma nuance importante. Se não há correspondências, não teremos uma matriz vazia, mas `null`. É fácil de cometer um erro esquecendo disso, por exemplo:

    ```js run
    let str = "Eu amo JavaScript";

    let result = str.match(/HTML/);

    alert(result); // null
    alert(result.length); // Error: Cannot read property 'length' of null (Erro: Não é possível ler a propriedade 'length' de null)
    ```

    Se desejamos que o resultado seja uma matriz, podemos escrever assim:

    ```js
    let result = str.match(regexp) || [];
    ```

## str.matchAll(regexp)

[recent browser="new"]

O método `str.matchAll(regexp)` é uma "nova, melhorada" variante do `str.match`.

É usada principalmente para buscar todas as correspondências com todos os grupos.

Existem 3 diferenças em relação ao `match`:

1. Ela retorna um objeto iterável com correspondências em vez de uma matriz. Podemos fazer dele uma matriz regular usando `Array.from`.
2. Cada correspondência é retornada como uma matriz com grupos de captura (o mesmo formato que `str.match` sem a flag `pattern:g`).
3. Se não houver resultados, não retornará `null`, mas um objeto iterável vazio.

Exemplo de uso:

```js run
let str = '<h1>Olá, mundo!</h1>';
let regexp = /<(.*?)>/g;

let matchAll = str.matchAll(regexp);

alert(matchAll); // [object RegExp String Iterator], não é matriz, mas é iterável

matchAll = Array.from(matchAll); // matriz agora

let firstMatch = matchAll[0];
alert( firstMatch[0] );  // <h1>
alert( firstMatch[1] );  // h1
alert( firstMatch.index );  // 0
alert( firstMatch.input );  // <h1>Olá, mundo!</h1>
```

Se usarmos `for..of` para percorrer as correspondências do `matchAll`, então não precisaremos mais do `Array.from`.

## str.split(regexp|substr, limit)

Divide a string usando regexp (ou uma substring) como um delimitador.

Podemos usar `split` com strings, desse jeito:

```js run
alert('12-34-56'.split('-')) // matriz de ['12', '34', '56']
```

Mas podemos dividir com uma expressão regular, do mesmo modo:

```js run
alert('12, 34, 56'.split(/,\s*/)) // matriz de ['12', '34', '56']
```

## str.search(regexp)

O método `str.search(regexp)` retorna a posição da primeira correspondência ou `-1` se nada for encontrado:

```js run
let str = "Uma gota de tinta pode fazer um milhão pensar";

alert( str.search( /tinta/i ) ); // 12 (posição da primeira correspondência)
```

**A importante limitação: `search` apenas encontra a primeira correspondência.**

Se precisarmos de posições de correspondências mais distantes, devemos usar outros meios, como encontrar todos elas com `str.matchAll(regexp)`.

## str.replace(str|regexp, str|func)

Esse é um método genérico para buscar e substituir, um dos mais úteis. O canivete suíço para procurar e substituir.

Podemos usá-lo sem regexps, para buscar e substituir uma substring:

```js run
// substitui um hífen por dois-pontos
alert('12-34-56'.replace("-", ":")) // 12:34-56
```

No entanto, há uma armadilha.

**Quando o primeiro argumento do `replace` é uma string, ele apenas substitui a primeira correspondência**

Você pode ver isso no exemplo acima: apenas o primeiro `"-"` é substituído por `":"`.

Para encontrar todos os hífens, não precisamos usar a string `"-"`, mas a regexp `pattern:/-/g`, com a flag obrigatória `pattern:g`:

```js run
// substitui todos os hífens por um dois-pontos
alert( '12-34-56'.replace( *!*/-/g*/!*, ":" ) )  // 12:34:56
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

```js run
let str = "John Smith";

// troca nome e sobrenome
alert(str.replace(/(john) (smith)/i, '$2, $1')) // Smith, John
```

**Para situações que exigem "inteligentes" substituições, o segundo argumento pode ser uma função**

Ela será chamada para cada correspondência e o valor retornado será inserido como uma substituição.

A função é chamada com argumentos `func(match, p1, p2, ..., pn, offset, input, groups)`:

1. `match` -- a correspondência,
2. `p1, p2, ..., pn` -- conteúdo dos grupos de captura (se existir algum),
3. `offset` -- posição da correspondência,
4. `input` -- a string original,
5. `groups` -- um objeto com grupos nomeados.

Se não existirem parênteses na regexp, terá apenas 3 argumentos: `func(str, offset, input)`.

Por exemplo, vamos colocar todas as correspondências em maiúsculas:

```js run
let str = "html e css";

let result = str.replace(/html|css/gi, str => str.toUpperCase());

alert(result); // HTML e CSS
```

Substituir cada correspondência pela sua posição na string:

```js run
alert("Ho-Ho-ho".replace(/ho/gi, (match, offset) => offset)); // 0-3-6
```

No exemplo abaixo, existem dois parênteses, então a função de substituição é chamada com 5 argumentos: o primeiro é a correspondência completa, em seguida, 2 parênteses, e depois disso (não usado no exemplo) a posição da correspondência e a string original:

```js run
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (match, name, surname) => `${surname}, ${name}`);

alert(result); // Smith, John
```

Se existirem muitos grupos, é conveniente usar os parâmetros *rest* para acessá-los:

```js run
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (...match) => `${match[2]}, ${match[1]}`);

alert(result); // Smith, John
```

Ou, se usarmos grupos nomeados, o objeto `groups` com eles é sempre o último, para podermos obtê-los assim:

```js run
let str = "John Smith";

let result = str.replace(/(?<name>\w+) (?<surname>\w+)/, (...match) => {
  let groups = match.pop();

  return `${groups.surname}, ${groups.name}`;
});

alert(result); // Smith, John
```

O uso de uma função nos dá o poder de substituição definitivo, porque ela obtém todas as informações sobre a correspondência, tem acesso a variáveis externas e pode fazer tudo.

## str.replaceAll(str|regexp, str|func)

Este método é essencialmente o mesmo que `str.replace`, com duas diferenças principais:

<<<<<<< HEAD
1. Se o primeiro argumento for uma string, ele substitui *todas as ocorrências* da string, enquanto `replace` substitui apenas a *primeira ocorrência*.
2. Se o primeiro argumento for uma expressão regular sem a flag `g`, haverá um erro. Com a flag `g`, funciona da mesma forma que `replace`.

O principal caso de uso de `replaceAll` é substituir todas as ocorrências de uma string.
=======
1. If the first argument is a string, it replaces *all occurrences* of the string, while `replace` replaces only the *first occurrence*.
2. If the first argument is a regular expression without the `g` flag, there'll be an error. With `g` flag, it works the same as `replace`.

The main use case for `replaceAll` is replacing all occurrences of a string.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Assim:

```js run
// substitui todos os traços por dois pontos
alert('12-34-56'.replaceAll("-", ":")) // 12:34:56
```

## regexp.exec(str)

O método `regexp.exec(str)` retorna uma correspondência para `regexp` na string `str`. Ao contrário dos métodos anteriores, é chamado numa regexp, não em uma string.

Se comporta de modo diferente dependendo se a regexp possui a flag `pattern:g`.

Se não houver `pattern:g`, a `regexp.exec(str)` retorna a primeira correspondência exatamente como `str.match(regexp)`. Esse comportamento não traz nada de novo.

Mas se houver a flag `pattern:g`, então:
- A chamada para `regexp.exec(str)` retorna a primeira correspondência e salva a posição imediatamente após ela na propriedade `regexp.lastIndex`.
- A próxima chamada inicia a pesquisa na posição `regexp.lastIndex`, retorna a próxima correspondência e salva a posição após ela em `regexp.lastIndex`.
- ...e assim por diante.
- Se não houver correspondências, `regexp.exec` retorna `null` e reinicia `regexp.lastIndex` para `0`.

Portanto, repetidas chamadas retornam todas as correspondências uma após outra, usando a propriedade `regexp.lastIndex` para manter o controle da atual posição de busca.

No passado, antes do método `str.matchAll` ser adicionado ao JavaScript, as chamadas de `regexp.exec` eram usadas em repetição para obter todas as correspondências com grupos:

```js run
let str = 'Mais sobre JavaScript em https://javascript.info';
let regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
  alert( `Encontrado ${result[0]} na posição ${result.index}` );
  // Encontrado JavaScript na posição 11, depois
  // Encontrado javascript na posição 33
}
```

Isso também funciona agora, no entanto, para navegadores novos `str.matchAll` é usualmente mais conveniente.

**Podemos usar `regexp.exec` para buscar a partir de uma posição dada, configurando manualmente `lastIndex`.**

Por exemplo:

```js run
let str = 'Olá, mundo!';

let regexp = /\w+/g; // sem a flag "g", a propriedade lastIndex é ignorada
regexp.lastIndex = 5; // pesquisa a partir da 5ª posição (a partir da vírgula)

alert( regexp.exec(str) ); // mundo
```

Se a regexp tiver flag `pattern:y`, então a pesquisa será realizada exatamente na posição `regexp.lastIndex`, e não mais adiante.

Vamos substituir a flag `pattern:g` pela `pattern:y` no exemplo acima. Não haverá correspondências, como não haverá palavra na posição `5`:

```js run
let str = 'Olá, mundo!';

let regexp = /\w+/y;
regexp.lastIndex = 5; // pesquisa exatamente na posição 5

alert( regexp.exec(str) ); // null
```

Isso é conveniente para situações em que precisamos de "ler" algo da string por uma regexp nessa posição exata, não em outro lugar.

## regexp.test(str)

O método `regex.test(str)` procura por uma correspondência e retorna `true/false`, em conformidade.

Por exemplo:

```js run
let str = "Eu amo JavaScript";

// esses dois testes fazem o mesmo
alert( *!*/amo/i*/!*.test(str) ); // true
alert( str.search(*!*/amo/i*/!*) != -1 ); // true
```

Um exemplo com a resposta negativa:

```js run
let str = "Bla-bla-bla";

alert( *!*/amo/i*/!*.test(str) ); // false
alert( str.search(*!*/amo/i*/!*) != -1 ); // false
```

Se a regexp tiver a flag `pattern:g`, então `regexp.test` procura a partir da propriedade `regexp.lastIndex` e atualiza esta propriedade, assim como `regexp.exec`.

Então o podemos usar para buscar a partir de uma posição fornecida:

```js run
let regexp = /amo/gi;

let str = "Eu amo JavaScript";

// inicia a pesquisa na posição 10:
regexp.lastIndex = 10;
alert( regexp.test(str) ); // false (sem correspondência)
```

````warn header="A mesma regexp global testada repetidamente em diferentes fontes pode falhar"
Se aplicarmos a mesma regexp global a diferentes entradas, isso poderá levar a um resultado incorreto, porque a chamada `regexp.test` avança a propriedade `regexp.lastIndex`, portanto a pesquisa em outra string pode ter um início numa posição diferente de zero.

Por exemplo, aqui chamamos `regexp.test` duas vezes no mesmo texto e a segunda vez falha:

```js run
let regexp = /javascript/g;  // (regexp recém criada: regexp.lastIndex=0)

alert( regexp.test("javascript") ); // true (regexp.lastIndex=10 agora)
alert( regexp.test("javascript") ); // false
```

Isso é exatamente porque `regexp.lastIndex` é diferente de zero no segundo teste.

Para contornar isso, podemos definir `regexp.lastIndex = 0` antes de cada busca. Ou, em vez de chamar métodos com regexp, usar métodos com string `str.match/search/...`, eles não usam `lastIndex`.
````
