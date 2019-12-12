# *Strings*

Em JavaScript, os dados de texto são armazenados como *strings* (cadeias-de-carateres). Não existe um tipo separado para um único carátere.

O formato interno das *strings* é sempre em [UTF-16](https://en.wikipedia.org/wiki/UTF-16), por isso não está relacionado à codificação da página (*page encoding*).

## Aspas

Vamos relembrar os tipos de aspas.

*Strings* podem estar dentro de aspas simples, aspas duplas ou acentos graves (*backticks*):

```js
let single = 'entre aspas simples';
let double = "entre aspas duplas";

let backticks = `entre acentos graves`;
```

Aspas simples e duplas são essencialmente o mesmo. *Backticks*, contudo, permitem-nos incorporar qualquer expressão numa *string*, incluindo chamadas de funções:

```js run
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

Uma outra vantagem em usar *backticks*, está em que eles permitem a uma *string* estender-se por múltiplas linhas:

```js run
let guestList = `Convidados:
 * John
 * Pete
 * Mary
`;

alert(guestList); // uma lista de convidados, múltiplas linhas
```

Se tentarmos utilizar aspas simples ou duplas, da mesma forma, haverá um erro:
```js run
let guestList = "Convidados:  // Error: Unexpected token ILLEGAL
  * John";
  // (Erro símbolo-sintático [token] inesperado ILEGAL * John)
```

Aspas simples ou duplas vêm de tempos antigos da criação da linguagem, quando a necessidade de *strings* multi-linha não era considerada. Os *backticks* apareceram muito mais tarde e portanto são mais versáteis.

Os *backticks* também nos permitem especifcar uma "função modelo" (*template function*) antes do primeiro *backtick*. A sintaxe é: <code>func&#96;string&#96;</code>. A função `func` é chamada automaticamente, recebe a *string* e expressões nesta incorporadas, e depois pode prosseguir. Você poderá ler mais sobre isso nos [docs](mdn:/JavaScript/Reference/Template_literals#Tagged_template_literals). Isto é chamado de "modelos etiquetados" (*tagged templates*). Esta funcionalidade torna mais fácil embeber *strings* em modelos personalizados ou noutras funcionalidades, mas raramente é utilizada.

## Carateres especiais

Ainda é possível criar *strings* multi-linha com aspas simples utilizando o chamado "carátere de nova-linha", escrito como `\n`, que denota uma quebra de linha:

```js run
let guestList = "Convidados\n * John\n * Pete\n * Mary";

alert(guestList); // uma lista de convidados em múltiplas linhas
```

Por exemplo, estas duas linhas descrevem o mesmo:

```js run
alert( "Hello\nWorld" ); // duas linhas utilizando o "símbolo de nova-linha"

// duas linhas utilizando uma quebra de linha normal e backticks
alert( `Hello
World` );
```

Existem outros, mas menos comuns carateres "especiais". Aqui está a lista:

| Carátere | Descrição |
|-----------|-------------|
|`\b`|Backspace|
|`\f`|Form feed|
|`\n`|New line|
|`\r`|Carriage return|
|`\t`|Tab|
|`\uNNNN`|Um símbolo *unicode* com código hexadecimal `NNNN`; por exemplo `\u00A9` -- é um *unicode* para o símbolo direitos-do-autor (*copyright*) `©`. Devem ser exatamente 4 dígitos hexadecimais. |
|`\u{NNNNNNNN}`|Alguns carateres raros são codificados com dois símbolos *unicode*, tomando até 4 *bytes*. Este longo *unicode* requere chavetas à sua volta.|

Exemplos com *unicode*:

```js run
alert( "\u00A9" ); // ©
alert( "\u{20331}" ); // 佫, um hieróglifo chinês raro (longo unicode)
alert( "\u{1F60D}" ); // 😍, um símbolo de face sorridente (outro longo unicode)
```

Todos os carateres especiais começam por um carátere de barra-invertida (*backslash*) `\`. Também é chamado de "*escape character*" (carátere de escape).

Também o utilizamos quando queremos inserir uma das aspas dentro de uma *string*.

Por exemplo:

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

Como podemos ver, precedemos a aspas interior por backslash `\'`, porque de outra forma ela indicaria o final da *string*.

Evidentemente, isto apenas se refere às aspas iguais às de abertura e fecho. Deste modo, como uma solução mais elegante, poderíamos substitui-las por aspas duplas ou backticks:

```js run
alert( `I'm the Walrus!` ); // I'm the Walrus!
```

Note que a *backslash* `\` serve para a correta leitura da *string* por JavaScript, e depois ela desaparece. A *string* em memória não possui nenhuma `\`. Pode claramente ver nos `alert` dos exemplos anteriores.

Mas, se precisarmos de realmente mostrar uma *backslash* `\` dentro de uma *string*?

Isto é possível, mas precisamos de a duplicar, como `\\`:

```js run
alert( `A backslash: \\` ); // A backslash: \
```

## Comprimento da *string*

A propriedade `length` possui o comprimento da *string*:

```js run
alert( `My\n`.length ); // 3
```

Note que `\n` é um único carátere "especial", assim o comprimento é de facto `3`.

```warn header="`length` é uma propriedade"
Pessoas com conhecimento de outras linguagens por vezes erram ao invocar `str.length()` em vez de apenas `str.length`, o que não funciona.

Por favor, note que `str.length` é uma propriedade, não uma função. Não há necessidade de se adicionar parênteses depois dela.

## Acedendo aos carateres

Para obter o carátere na posição `pos`, use parênteses retos ou invoque o método [str.charAt(pos)](mdn:js/String/charAt). O primeiro carátere começa na posição zero:

```js run
let str = `Olá`;

// o primeiro carátere
alert( str[0] ); // O
alert( str.charAt(0) ); // O
// o último carátere
alert( str[str.length - 1] ); // á
```

Os parênteses retos são uma forma moderna de se obter um carátere, enquanto `charAt` existe mais por razões históricas.

A única diferença entre eles está em que, se nenhum carátere for encontrado, `[]` retorna `undefined`, e `charAt` retorna uma *string* vazia (*empty string*):

```js run
let str = `Olá`;

alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // '' (uma string vazia)
```

Podemos também iterar sobre os carateres utilizando `for..of`:

```js run
for (let char of "Olá") {
  alert(char); // O,l,á (char se torna em "O", depois "l", etc)
}
```

## *Strings* são imutáveis

As *strings* não podem ser alteradas em JavaScript. É impossível modificar um carátere.

Vamos tentar mostrar que isso não resulta:

```js run
let str = 'Hi';

str[0] = 'h'; // erro
alert( str[0] ); //  não resultou
```

Uma solução alternativa comum é criar uma *string* completamente nova, e atribuí-la a `str` para substituir a velha.

Por exemplo:

```js run
let str = 'Hi';

str = 'h' + str[1];  // substitui a string

alert( str ); // hi
```

Nas secções seguintes, veremos mais exemplos disto.

## Alterando para maiúsculas/minúsculas

Os métodos [toLowerCase()](mdn:js/String/toLowerCase) e [toUpperCase()](mdn:js/String/toUpperCase) mudam para maiúsculas/minúsculas (*case*):

```js run
alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface
```

Ou, se quiser um único carátere em minúsculas:

```js
alert( 'Interface'[0].toLowerCase() ); // 'i'
```

## Procurando por uma *substring*

Existem múltiplas formas de procurar por uma *substring* dentro uma *string*.

### str.indexOf

O primeiro método é [str.indexOf(substr, pos)](mdn:js/String/indexOf).

Ele procura pela `substr` em `str`, começando por uma dada posição `pos`, e retorna a posição onde foi encontrada uma equivalência, ou `-1` se nada for encontrado.

Por exemplo:

```js run
let str = 'Widget com id';

alert( str.indexOf('Widget') ); // 0, porque 'Widget' é encontrado no principio
alert( str.indexOf('widget') ); // -1, não encontrado, a pesquisa é sensível a maiúsculas/minúsculas (case-sensitive)

alert( str.indexOf("id") ); // 1, "id" é encontrado na posição 1 (..idget com id)
```

O segundo parâmetro é opcional, e permite-nos começar a pesquisa a partir de uma dada posição.

Por exemplo, a primeira ocorrência de `"id"` está na posição `1`. Para procurarmos pela segunda ocorrência, começemos a pesquisa pela posição `2`:

```js run
let str = 'Widget com id';

alert( str.indexOf('id', 2) ) // 11
```

Se estivermos interessados em todas as ocorrências, podemos executar `indexOf` dentro de um laço (*loop*). Cada nova invocação é efetuada com a posição depois da equivalência anterior:


```js run
let str = 'Tão manhosa como uma raposa, tão forte como um touro';

let target = 'como'; // vamos procurar or ela

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Encontrado em ${foundPos}` );
  pos = foundPos + 1; // continue a pesquisa a partir da próxima posição
}
```

O mesmo algoritmo pode ser colocado de uma forma mais curta:

```js run
let str = "Tão manhosa como uma raposa, tão forte como um touro";
let target = "como";

*!*
let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert( pos );
}
*/!*
```

```smart header="`str.lastIndexOf(substr, position)`"
Também existe um método similar [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf) que pesquisa do final para o início de uma string.

Ele listaria ocurrências na ordem invera.
```

Há um ligeiro inconveniente com `indexOf` num teste `if`. Não o podemos utilizar num `if` desta forma:

```js run
let str = "Widget com id";

if (str.indexOf("Widget")) {
    alert("Encontrámos"); // não funciona!
}
```

O `alert` no exemplo acima não é mostrado porque `str.indexOf("Widget")` retorna `0` (o que significa que encontrou uma equivalência na posição inicial). Sim, mas `if` considera `0` como `false`.

Assim, na verdade deveriamos verificar por `-1`, desta forma:

```js run
let str = "Widget com id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("Encontrámos"); // funciona agora!
}
```

````smart header="O truque bitwise NOT"
Um dos velhos truques aqui utilizado é o operador `~` [bitwise NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT). Ele converte o número para um inteiro de 32 bits (remove a parte decimal, se existir) e depois inverte todos os bits dessa representação binária.

Para inteiros de 32 bits, a invocação `~n` significa exatamente o mesmo que `-(n+1)` (devido ao formato IEEE-754).

Por exemplo:

```js run
alert( ~2 ); // -3, o mesmo que -(2+1)
alert( ~1 ); // -2, o mesmo que -(1+1)
alert( ~0 ); // -1, o mesmo que -(0+1)
*!*
alert( ~-1 ); // 0, o mesmo que -(-1+1)
*/!*
```

Como vemos, `~n` é zero apenas se `n == -1`.

Portanto, o teste `if ( ~str.indexOf("...") )` é verdadeiro (truthy) enquanto o resultado de `indexOf` não for `-1`. Por outras palavras, enquanto houver uma equivalência.

As pessoas o utilizam para abreviar verificações com `indexOf`:

```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Encontrada!' ); // funciona
}
```

Geralmente, não é recomendado empregar funcionalidades da linguagem de uma forma não-óbvia, mas este truque em particular é amplamente utilizado em código antigo, assim deveríamos compreendê-lo.

Apenas se lembre: `if (~str.indexOf(...))` se traduz como "se encontrado".
````

### *includes*, *startsWith*, *endsWith*

O método mais moderno [str.includes(substr, pos)](mdn:js/String/includes) retorna `true/false` dependendo de `str` conter a `substr` dentro.

É a escolha certa se precisarmos de testar pela equivalência, mas não precisarmos da sua posição:

```js run
alert( "Widget com id".includes("Widget") ); // true (verdadeiro)

alert( "Hello".includes("Bye") ); // false (falso)
```

O opcional segundo argumento de `str.includes` é a posição para o início da pesquisa:

```js run
alert( "Widget".includes("id") ); // true (verdadeiro)
alert( "Widget".includes("id", 3) ); // false (falso), a partir da posição 3 não existe "id"
```

Os métodos [str.startsWith](mdn:js/String/startsWith) e [str.endsWith](mdn:js/String/endsWith) fazem exatamente o que eles dizem:

```js run
alert( "Widget".startsWith("Wid") ); // true (verdadeiro), "Widget" começa com "Wid"
alert( "Widget".endsWith("get") );   // true (verdadeiro), "Widget" termina com "get"
```

## Obtendo uma *substring*

Existem 3 métodos em JavaScript para se obter uma *substring*: `substring`, `substr` e `slice`.

`str.slice(start [, end])`
: Retorna a parte da *string* a partir de `start` até (mas não incluindo) `end`.

    Por exemplo:

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin', a substring de 0 a 5 (não incluindo 5)
    alert( str.slice(0, 1) ); // 's', de 0 a 1, mas não incluindo 1, portanto apenas o carátere em 0
    ```

    Se não houver um segundo argumento, então `slice` vai até ao final da *string*:

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // 'ringify', a partir da 2da posição até ao fim
    ```

    Valores negativos para `start/end` também são possíveis. Eles significam que a posição é contada a partir do final da *string*:

    ```js run
    let str = "strin*!*gif*/!*y";

    // começa pela 4ta posição a contar pela direita, e termina na 1ra posição à direita
    alert( str.slice(-4, -1) ); // 'gif'
    ```

`str.substring(start [, end])`
: Retorna a parte da string *entre* `start` e `end`.

    Este é quase o mesmo que `slice`, mas permite que `start` seja maior do que `end`.

    Por exemplo:


    ```js run
    let str = "st*!*ring*/!*ify";

    // estas significam o mesmo para substring
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...mas não para slice:
    alert( str.slice(2, 6) ); // "ring" (o mesmo)
    alert( str.slice(6, 2) ); // "" (uma string vazia)
    ```

    Argumentos negativos (ao contrário de slice) não são suportados, eles são tratados como `0`.


`str.substr(start [, length])`
: Retorna a parte da *string* a começar por `start`, com o dado comprimento `length`.

    Em contraste com os métodos anteriores, este permite-nos especificar `length` (o comprimento) em vez da posição final:

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // 'ring', a partir da 2da posição obtenha 4 carateres
    ```

    O primeiro argumento pode ser negativo, para a contagem a partir do fim:

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // 'gi', a partir da 4ta posição otenha 2 carateres
    ```

Vamos recapitular estes métodos afim de evitarmos qualquer confusão:

| método | seleciona... | negativos |
|--------|-----------|-----------|
| `slice(start, end)` | de `start` para `end` (não incluindo `end`) | permite negativos |
| `substring(start, end)` | entre `start` e `end` | valores negativos significam `0` |
| `substr(start, length)` | de `start` obtenha `length` carateres | permite `start` negativo|

```smart header="Qual escolher?"
Todos eles executam o trabalho. Formalmente, `substr` tem uma pequena desvantagem: não está descrito na especificação nuclear de JavaScript, mas no Annex B, que cobre funcionalidades apenas para navegadores (browser-only) que existam principalmente por razões históricas. Assim, ambientes não para navegadores podem não o suportar. Mas, na prática funciona em qualquer lugar.

O autor vê-se a utilizar `slice` quase pelo tempo todo.
```

## Comparando *strings*

Como sabemos pelo capítulo <info:comparison>, *strings* são comparadas carátere-por-carátere por ordem alfabética.

Contudo, existem algumas particularidades.

1. Uma letra em minúsculas é sempre maior do que uma em maiúsculas:

    ```js run
    alert( 'a' > 'Z' ); // true (verdadeiro)
    ```

2. Letras com marcas diacríticas estão "fora da ordem":

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true (verdadeiro)
    ```

    Isto pode levar a resultados estranhos se ordenarmos estes países por nome. Habitualmente, as pessoas esperam que `Zealand` venha depois de `Österreich` numa lista.

Para se compreender o que acontece, vamos rever a representação interna das *strings* em JavaScript.

Todas as *strings* são codificadas empregando [UTF-16](https://en.wikipedia.org/wiki/UTF-16). Isto é: cada carátere corresponde a um código numérico. Existem métodos especiais que permitem obter o carátere a partir do código, e vice-versa.

`str.codePointAt(pos)`
: Retorna o código para o carátere na posição `pos`:

  ```js run
    // letras minúsculas e maiúsculas têm códigos diferentes
    alert( "z".codePointAt(0) ); // 122
    alert( "Z".codePointAt(0) ); // 90
  ```

`String.fromCodePoint(code)`
: Cria um carátere a partir do seu código numérico (`code`)

  ```js run
    alert( String.fromCodePoint(90) ); // Z
  ```

  Podemos também adicionar carateres *unicode* por intermédio dos seus códigos empregando `\u` seguido pelo seu código hexadecimal:

    ```js run
    // 90 é 5a no sistema hexadecimal
    alert( '\u005a' ); // Z
    ```

Agora, vamos ver os carateres com os códigos `65..220` (o alfabeto latino e um pouco mais extra), formando uma *string* com eles:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

Vê? Carateres maiúsculos vêm primeiro, depois uns poucos especiais, e a seguir carateres minúsculos.

Portanto, torna-se óbvio porque `a > Z`.

Os carateres são comparados por intermédio do seu código numérico. Quanto maior o código maior será o carátere. O código para `a` (97) é maior do que o código para `Z` (90).

- Todas as letras em minúsculas vêm depois das letras em maiúsculas porque os seus códigos são maiores.
- Algumas letras como `Ö` estão separadas do alfabeto principal. Aqui, o seu código é maior do que qualquer um de `a` a `z`.

### Comparações corretas

O algoritmo "correto" para efetuar comparações de *strings* é mais complexo do que parece, porque alfabetos são diferentes em diferentes línguas. Uma letra com o mesmo aspeto pode ter localizações diferentes em diferentes alfabetos.

Assim, o navegador (*browser*) precisa de saber a língua para efetuar a comparação.

Felizmente, todos os navegadores modernos (IE10- requrem uma biblioteca [Intl.JS](https://github.com/andyearnshaw/Intl.js/) adicional) suportam a internacionalização padrão [ECMA 402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).

Ela fornece um método especial para comparar *strings* em línguas diferentes, seguindo as suas regras.

A invocação [str.localeCompare(str2)](mdn:js/String/localeCompare):

- Retorna `1`, se `str` é maior do que `str2`, de acordo com as regras da língua.
- Retorna `-1`, se `str` é menor do que `str2`.
- Retorna `0`, se forem iguais.

Por exemplo:

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

Na verdade, este método tem dois argumentos adicionais especificados em [the documentation](mdn:js/String/localeCompare), que permitem especificar a língua (por defeito, tomada do ambiente local), e configurar regras adicionais como sensibilidade a maiúsculas/minúsculas (*case-sensitivity*) ou se deveriam `"a"` e `"á"` ser tratados como o mesmo, etc.

## Internamente, *Unicode*

```warn header="Conhecimento avançado"
A secção aprofunda o funcionamento interno da string. Este conhecimento lhe será útil se planear lidar com emoji, carateres matemáticos raros, hieróglifos, ou outros símbolos raros.

Pode saltar esta secção se não planear suportá-los.
```

### *Pares substitutos*

Muitos símbolos têm um código de 2-bytes. Letras em muitas línguas europeias, números, e mesmo muitos hieróglifos, têm uma representação em 2-bytes.

Mas, 2 bytes apenas permitem 65536 combinações, o que não é suficiente para todos os símbolos possíveis. Assim, símbolos raros são codificados com um par de carateres de 2-bytes chamado de "par substituto" (*surrogate pair*).

O comprimento de tais símbolos é `2`:

```js run
alert( '𝒳'.length ); // 2, símbolo matemático X maiúsculo
alert( '😂'.length ); // 2, face com lágrimas de alegria
alert( '𩷶'.length ); // 2, um raro hieróglifo chinês
```

Note que pares substitutos não existiam quando JavaScript foi criada, e desta forma não são corretamente processados pela linguagem!

Na verdade, temos um único símbolo em cada uma das *strings* acima, mas `length` mostra um comprimento de `2`.

`String.fromCodePoint` e `str.codePointAt` são dos poucos raros métodos que lidam bem com pares substitutos (*surrogate pairs*). Eles apareceram recentemente na linguagem. Antes deles, apenas existiam [String.fromCharCode](mdn:js/String/fromCharCode) e [str.charCodeAt](mdn:js/String/charCodeAt). Estes métodos são na verdade o mesmo que `fromCodePoint/codePointAt`, mas não trabalham com pares substitutos.

Contudo, por exemplo, para se obter um símbolo pode ser complicado, porque pares substitutos são tratados como dois carateres:

```js run
alert( '𝒳'[0] ); // símbolos estranhos...
alert( '𝒳'[1] ); // ...partes do par substituto
```

Note que partes do par substituto não têm nenhum significado, a não ser que formem um todo. Assim os *alerts* no exemplo acima, na verdade, mostram lixo.

Tecnicamente, pares substitutos também são detetáveis pelo seus códigos: se um carátere tiver o código no intervalo `0xd800..0xdbff`, então é a primeira parte de um par substituto. O carátere seguinte (a segunda parte) deve ter o código no intervalo `0xdc00..0xdfff`. Estes intervalos estão  exclusivamente reservados a pares substitutos pela especificação.

No caso acima:

```js run
// charCodeAt não suporta pares substitutos, assim fornece códigos para as partes

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835, entre 0xd800 e 0xdbff
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3, entre 0xdc00 e 0xdfff
```

Encontrará mais formas para lidar com pares substitutos mais adiante no capítulo
 <info:iterable>. Provavelmente, também existem bibliotecas (*libraries*) especiais para isso, mas nada suficientemente famoso para sugestão aqui.

### Marcas diacríticas e normalização

Em muitas línguas, existem símbolos que são compostos por um carátere base com uma marca acima/abaixo dele.

Por exemplo, a letra `a` pode ser o carátere base para: `àáâäãåā`. Os mais comuns carateres "compostos" têm os seus próprios códigos na tabela UTF-16. Mas não todos, porque existem demasiadas combinações possíveis.

Para suportar composições arbitrárias, UTF-16 permite-nos utilizar múltiplos carateres *unicode*. O carátere base e, um ou muitos, carateres "marca" que o "decorem".

Por exemplo, se tivermos `S` seguido pelo carátere especial "ponto superior" (código `\u0307`), é mostrado como Ṡ.

```js run
alert( 'S\u0307' ); // Ṡ
```

Se, precisarmos de uma marca adicional acima da letra (ou abaixo dela) -- não há problema, apenas adicionamos o necessário carátere marca.

Por exemplo, se acrescentarmos um carátere "ponto abaixo" (código `\u0323`), então teremos "S com pontos acima e abaixo": `Ṩ`.

Por exemplo:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

Isto provê grande flexibilidade, mas também um  problema interessante: dois carateres podem visualmente parecer semelhantes, mas estar representados por composições *unicode* diferentes.

Por exemplo:

```js run
alert( 'S\u0307\u0323' ); // Ṩ, S + ponto acima + ponto abaixo
alert( 'S\u0323\u0307' ); // Ṩ, S + ponto abaixo + ponto acima

alert( 'S\u0307\u0323' == 'S\u0323\u0307' ); // false (falso)
```

Para solucionar isto, existe um algoritmo para "normalização *unicode*" que leva cada *string* a uma única forma "normal".

Ele é implementado por [str.normalize()](mdn:js/String/normalize).

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true (verdadeiro)
```

É engraçado que na nossa situação `normalize()` leve, na realidade, a sequência de 3 carateres para um: `\u1e68` (S com dois pontos).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true (verdadeiro)
```

Na realidade, nem sempre é o caso. A razão para o acima reside no facto de `Ṩ` ser "suficientemente comum", e por isso os criadores do UTF-16 o incluiram na tabela principal e o deram um código.

Se quiser aprender mais sobre regras e variantes de normalização -- elas são descritas no apêndice do padrão Unicode: [Unicode Normalization Forms](http://www.unicode.org/reports/tr15/), mas para a maioria dos propósitos práticos a informação nesta secção é suficiente.

## Sumário

- Existem 3 tipos de aspas. *Backticks* permitem expressões embebidas, e que uma *string* se estenda por múltiplas linhas.
- As *Strings* em JavaScript são codificadas empregando UTF-16.
- Podemos utilizar carateres especiais como `\n`, e inserir letras por intermédio do seu *unicode* utilizando `\u...`.
- Para obter um carátere, use: `[]`.
- Para obter uma *substring*, use: `slice` ou `substring`.
- Para tornar uma *string* em minúsculas/maiúsculas, use: `toLowerCase/toUpperCase`.
- Para procurar por uma *substring*, use: `indexOf`, ou `includes/startsWith/endsWith` para simples verificações.
- Para comparar *strings* de acordo com a língua, use: `localeCompare`, de contrário elas são comparadas pelos códigos dos carateres.

Existem vários outros métodos úteis para *strings*:

- `str.trim()` -- remove ("*trims*") espaços do inicio e final da *string*.
- `str.repeat(n)` -- repete a *string* `n` vezes.
- ...e mais. Veja o [manual](mdn:js/String) para detalhes.

As *strings* também possuem métodos para se efetuar a procura/substituição com expressões regulares (*regular expressions*). Mas, este tópico merece um capítulo em separado, e por isso voltaremos a ele mais adiante.
