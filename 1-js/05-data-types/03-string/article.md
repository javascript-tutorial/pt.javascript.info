# Strings

Em JavaScript, os dados de texto são armazenados como *strings* (cadeias-de-carateres). E não existe um tipo separado para um único caractere.

O formato interno das *strings* é sempre em [UTF-16](https://en.wikipedia.org/wiki/UTF-16), por isso não está conectado à codificação da página (*page encoding*).

## Aspas

Vamos nos lembrar dos tipos de aspas.

As *strings* podem estar dentro de aspas simples, aspas duplas ou acentos graves (*backticks*):

```js
let single = 'entre aspas simples';
let double = "entre aspas duplas";

let backticks = `entre acentos graves`;
```

Aspas simples e duplas são essencialmente o mesmo. *Backticks*, contudo, nos permitem inserir qualquer expressão numa *string*, envolvendo ela em `${…}`:

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

Parece natural, não? Mas aspas simples ou duplas não funcionam desta maneira.

Se as usarmos e tentarmos estender por múltiplas linhas, irá ocorrer um erro:

```js run
let guestList = "Guests: // Error: Unexpected token ILLEGAL
  * John";
```

Aspas simples e duplas vêm de tempos antigos da criação da linguagem, quando a necessidade de *strings* multi-linha não era tida em consideração. Os *backticks* apareceram muito mais tarde e portanto são mais versáteis.

Os *backticks* também nos permitem especificar uma "função modelo" (*template function*) antes do primeiro *backtick*. A sintaxe é: <code>func&#96;string&#96;</code>. A função `func` é chamada automaticamente, recebe a *string* e expressões nesta inseridas, e as pode processar. Isto é chamado de "modelos etiquetados" (*tagged templates*). Esta funcionalidade torna mais fácil implementar modelos personalizados (*custom templating*), mas na prática raramente é utilizada. Você poderá ler mais sobre isso no [manual](mdn:/JavaScript/Reference/Template_literals#Tagged_templates).

## Carateres especiais

Ainda é possível criar *strings* multi-linha com aspas simples ou duplas usando o chamado "caractere de nova-linha", escrito como `\n`, que denota uma quebra de linha:

```js run
let guestList = "Guests:\n * John\n * Pete\n * Mary";

alert(guestList); // uma lista de convidados em múltiplas linhas
```

Por exemplo, estas duas linhas são iguais, apenas escritas de forma diferente:

```js run
let str1 = "Olá\Mundo"; // duas linhas usando o "símbolo de nova-linha"

// duas linhas usando uma quebra de linha normal e backticks
let str2 = `Olá
World`;

alert(str1 == str2); // true
```

Existem outros, mas menos comuns carateres "especiais".

Aqui está uma lista:

| Caractere | Descrição |
|-----------|-------------|
|`\n`|Nova linha|
|`\r`|Carriage return: não usado sózinho. Ficheiros de texto no Windows usam uma combinação de dois carateres `\r\n` para representar uma quebra de linha. |
|`\'`, `\"`|Aspas|
|`\\`|Backslash|
|`\t`|Tab|
|`\b`, `\f`, `\v`| Backspace, Form Feed, Vertical Tab -- mantidos por compatibilidade, hoje em dia não usados. |
|`\xXX`|Caractere Unicode com unicode em hexadecimal `XX`; ex. `'\x7A'` é o mesmo que `'z'`.|
|`\uXXXX`|Um símbolo unicode com um código em hexadecimal `XXXX` na codificação UTF-16; por exemplo `\u00A9` -- é um unicode para o símbolo de copyright `©`. Devem ser exatamente 4 dígitos hexadecimais. |
|`\u{X…XXXXXX}` (1 a 6 carateres hexadecimais)|Um símbolo unicode na codificação UTF-32. Alguns carateres raros são codificados com dois símbolos unicode, tomando 4 bytes. Desta maneira nós podemos inserir longos códigos de carateres. |

Exemplos com *unicode*:

```js run
alert( "\u00A9" ); // ©
alert( "\u{20331}" ); // 佫, um hieróglifo chinês raro (unicode longo)
alert( "\u{1F60D}" ); // 😍, um símbolo de face sorridente (outro unicode longo)
```

Todos os carateres especiais começam por um caractere *backslash* (barra-invertida) `\`. Também é chamado de "*escape character*" (caractere de escape).

Também o utilizamos quando queremos inserir uma das aspas dentro de uma *string*.

Por exemplo:

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

Como você pode ver, precedemos a aspas interior por backslash `\'`, porque de outra forma ela iria indicar o final da *string*.

Evidentemente, apenas as aspas iguais às de abertura e fecho precisam de escape. Mas, como uma solução mais elegante, podemos trocar por aspas duplas ou backticks:

```js run
alert( `I'm the Walrus!` ); // I'm the Walrus!
```

Note que a *backslash* `\` serve para a correta leitura da *string* pelo JavaScript, e depois ela desaparece. A *string* em memória não possui nenhuma `\`. Você pode claramente ver nos `alert` dos exemplos anteriores.

Mas, e se precisarmos de realmente mostrar uma *backslash* `\` dentro de uma *string*?

Isto é possível, mas precisamos de a duplicar, como `\\`:

```js run
alert( `A backslash: \\` ); // A backslash: \
```

## Comprimento da *string*

A propriedade `length` contém o comprimento da *string*:

```js run
alert( `My\n`.length ); // 3
```

Note que `\n` é um único caractere "especial", assim o comprimento é na verdade `3`.

```warn header="`length` é uma propriedade"
Pessoas que estudaram algumas outras linguagens por vezes erradamente escrevem `str.length()` em vez de apenas `str.length`, e por isso não funciona.

Por favor, note que `str.length` é uma propriedade numérica, não uma função. Não há necessidade de se adicionar parênteses depois dela.
```

## Acedendo aos carateres

Para obter o caractere na posição `pos`, use parênteses retos `[pos]` ou invoque o método [str.charAt(pos)](mdn:js/String/charAt). O primeiro caractere começa na posição zero:

```js run
let str = `Olá`;

// o primeiro caractere
alert( str[0] ); // O
alert( str.charAt(0) ); // O

// o último caractere
alert( str[str.length - 1] ); // á
```

Os parênteses retos são uma forma moderna de se obter um caractere, enquanto `charAt` existe mais por razões históricas.

A única diferença entre eles está em que, se nenhum caractere for encontrado, `[]` retorna `undefined`, e `charAt` retorna uma *string* vazia:

```js run
let str = `Olá`;

alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // '' (uma string vazia)
```

Podemos também iterar sobre os carateres utilizando `for..of`:

```js run
for (let char of "Olá") {
  alert(char); // O,l,á ('char' se torna em "O", depois "l", etc)
}
```

## *Strings* são imutáveis

As *strings* não podem ser alteradas em JavaScript. É impossível modificar um caractere.

Vamos tentar fazê-lo para mostrar que não resulta:

```js run
let str = 'Hi';

str[0] = 'h'; // erro
alert( str[0] ); // não resulta
```

Uma comum solução alternativa é criar uma *string* completamente nova, e a atribuir a `str` para substituir a velha.

Por exemplo:

```js run
let str = 'Hi';

str = 'h' + str[1]; // substitua a string

alert( str ); // hi
```

Nas secções seguintes, iremos ver mais exemplos disto.

## Alterando o caso

Os métodos [toLowerCase()](mdn:js/String/toLowerCase) e [toUpperCase()](mdn:js/String/toUpperCase) mudam o caso (maiúsculas/minúsculas):

```js run
alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface
```

Ou, se quisermos um só caractere em minúsculas:

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

alert( str.indexOf('Widget') ); // 0, porque 'Widget' é encontrada no inicio
alert( str.indexOf('widget') ); // -1, não encontrada, a pesquisa é sensível ao caso (maiúsculas/minúsculas)

alert( str.indexOf("id") ); // 1, "id" é encontrada na posição 1 (..idget com id)
```

O segundo parâmetro é opcional, e nos permite começar a pesquisa a partir de uma dada posição.

Por exemplo, a primeira ocorrência de `"id"` está na posição `1`. Para procurarmos pela ocorrência seguinte, vamos começar a pesquisa pela posição `2`:

```js run
let str = 'Widget com id';

alert( str.indexOf('id', 2) ) // 11
```

Se estivermos interessados em todas as ocorrências, podemos invocar `indexOf` dentro de um laço (*loop*). Cada nova chamada é feita tendo uma posição que se segue à equivalência anterior:

```js run
let str = 'As sly as a fox, as strong as an ox';

let target = 'as'; // vamos procurar por essa

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Encontrada em ${foundPos}` );
  pos = foundPos + 1; // continue a pesquisa a partir da posição a seguir
}
```

O mesmo algoritmo pode ser colocado de uma forma mais curta:

```js run
let str = "As sly as a fox, as strong as an ox";
let target = "as";

*!*
let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert( pos );
}
*/!*
```

```smart header="`str.lastIndexOf(substr, position)`"
Também existe um método similar [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf) que pesquisa do final para o início duma string.

Ele iria listar as ocorrências na ordem inversa.
```

Há um pequeno inconveniente com `indexOf` num teste `if`. Não o podemos usar num `if` desta maneira:

```js run
let str = "Widget com id";

if (str.indexOf("Widget")) {
    alert("Nós a encontramos"); // não funciona!
}
```

O `alert` no exemplo acima não é exibido porque `str.indexOf("Widget")` retorna `0` (o que significa que encontrou uma equivalência na primeira posição). Encontrou, mas `if` considera `0` como `false`.

Assim, na verdade nós deveríamos verificar por `-1`. Desta maneira:

```js run
let str = "Widget com id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("Nós a encontramos"); // agora funciona!
}
```

#### O truque bitwise NOT

Um dos velhos truques aqui utilizado é o operador `~` [bitwise NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT). Ele converte um número para um inteiro de 32 bits (removendo a parte decimal, se existir) e depois inverte todos os bits dessa representação binária.

Na prática, isto significa uma simples coisa: para inteiros de 32 bits, `~n` é igual a `-(n+1)`.

Por exemplo:

```js run
alert( ~2 ); // -3, o mesmo que -(2+1)
alert( ~1 ); // -2, o mesmo que -(1+1)
alert( ~0 ); // -1, o mesmo que -(0+1)
*!*
alert( ~-1 ); // 0, o mesmo que -(-1+1)
*/!*
```

Como vemos, `~n` é zero apenas se `n == -1` (isto é, para qualquer inteiro `n` de 32-bits com sinal).

Portanto, o teste `if ( ~str.indexOf("...") )` só é verdadeiro se o resultado de `indexOf` não for `-1`. Por outras palavras, enquanto houver uma equivalência.

As pessoas o usam para encurtar verificações com `indexOf`:

```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Encontramos!' ); // funciona
}
```

Geralmente, não é recomendado empregar funcionalidades da linguagem de uma forma não-óbvia, mas este truque em particular é largamente utilizado em código antigo, por isso deveríamos compreendê-lo.

Apenas se lembre: `if (~str.indexOf(...))` se lê como "se encontrada".

Mas, para ser preciso, se alguns números grandes são truncados para 32 bits pelo operador `~`, existem outros números que resultam em `0`, e o mais pequeno deles é `~4294967295=0`. Isto,  torna aquela verificação correta apenas se uma *string* não for tão longa.

Por enquanto, nós podemos ver este truque apenas em código antigo, porque o JavaScript moderno fornece o método `.includes` (ver abaixo).

### includes, startsWith, endsWith

O método mais moderno [str.includes(substr, pos)](mdn:js/String/includes) retorna `true/false` dependendo de `str` conter ou      não a `substr` dentro.

É a escolha certa se quisermos testar a equivalência, mas não precisarmos da sua posição:

```js run
alert( "Widget com id".includes("Widget") ); // true

alert( "Hello".includes("Bye") ); // false
```

O segundo argumento de `str.includes` é opcional, e é a posição para o início da pesquisa:

```js run
alert( "Widget".includes("id") ); // true
alert( "Widget".includes("id", 3) ); // false, a partir da posição 3 não existe "id"
```

Os métodos [str.startsWith](mdn:js/String/startsWith) e [str.endsWith](mdn:js/String/endsWith) fazem exatamente o que eles dizem:

```js run
alert( "Widget".startsWith("Wid") ); // true, "Widget" começa por "Wid"
alert( "Widget".endsWith("get") ); // true, "Widget" termina por "get"
```

## Obtendo uma *substring*

Existem 3 métodos em JavaScript para se obter uma *substring*: `substring`, `substr` e `slice`.

`str.slice(start [, end])`
: Retorna a parte da *string* começando por `start` e até (mas não incluindo) `end`.

    Por exemplo:

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin', a substring de 0 a 5 (não incluindo 5)
    alert( str.slice(0, 1) ); // 's', de 0 a 1, mas não incluindo 1, portanto apenas o caractere em 0
    ```

    Se não existir um segundo argumento, então `slice` vai até ao final da *string*:

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // 'ringify', começando pela segunda posição e até ao fim
    ```

    Valores negativos para `start/end` também são possíveis. Eles significam que a posição é contada a partir do final da *string*:

    ```js run
    let str = "strin*!*gif*/!*y";

    // começa pela quarta posição a contar da direita, e termina na primeira posição também à direita
    alert( str.slice(-4, -1) ); // 'gif'
    ```

`str.substring(start [, end])`
: Retorna a parte da string *entre* `start` e `end`.

    Isto, é quase o mesmo que `slice`, mas permite que `start` seja maior do que `end`.

    Por exemplo:

    ```js run
    let str = "st*!*ring*/!*ify";

    // // estas significam o mesmo para substring
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...mas não para slice:
    alert( str.slice(2, 6) ); // "ring" (o mesmo)
    alert( str.slice(6, 2) ); // "" (uma string vazia))

    ```

    Argumentos negativos (ao contrário de slice) não são suportados, eles são tratados como `0`.

`str.substr(start [, length])`
: Retorna a parte da *string* começando por `start`, e com o comprimento dado `length`.

    Em contraste com os métodos anteriores, este nos permite especificar o comprimento `length` em vez da posição final:

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // 'ring', começando pela segunda posição obtenha 4 carateres
    ```

    O primeiro argumento pode ser negativo, para a contagem a partir do fim:

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // 'gi', começando pela quarta posição à direita obtenha 2 carateres
    ```

Vamos recapitular estes métodos para evitar qualquer confusão:

| método | seleciona... | negativos |
|--------|-----------|-----------|
| `slice(start, end)` | de `start` para `end` (não incluindo `end`) | permite negativos |
| `substring(start, end)` | entre `start` e `end` | valores negativos significam `0` |
| `substr(start, length)` | de `start` obtenha `length` carateres | permite `start` negativo |

```smart header="Qual deles escolher?"
Todos eles podem executar o trabalho. Formalmente, `substr` tem uma pequena desvantagem: não está descrito na especificação nuclear de JavaScript, mas no Annex B, que cobre funcionalidades só para navegadores que existam principalmente por razões históricas. Assim, ambientes não para navegadores podem não o suportar. Mas, na prática ele funciona em qualquer lugar.

Das outras duas variantes, `slice` é um pouco mais flexível, ele permite argumentos negativos e é mais curto para digitar. Assim, basta apenas se lembrar de `slice` de entre estes três métodos.
```

## Comparando *strings*

Como sabemos pelo capítulo <info:comparison>, *strings* são comparadas caractere-por-caractere por ordem alfabética.

Contudo, existem algumas particularidades.

1. Uma letra minúscula é sempre maior do que uma maiúscula:

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. Letras com marcas diacríticas estão "fora da ordem":

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

    Isto pode levar a resultados estranhos se ordenarmos estes países por nome. Habitualmente, as pessoas esperam que `Zealand` venha depois de `Österreich` numa lista.

Para se compreender o que acontece, vamos rever a representação interna das *strings* em JavaScript.

Todas as *strings* são codificadas empregando [UTF-16](https://en.wikipedia.org/wiki/UTF-16). Isto é: cada caractere tem um código numérico correspondente. Existem métodos especiais que permitem obter o caractere a partir do código, e vice-versa.

`str.codePointAt(pos)`
: Retorna o código para o caractere na posição `pos`:

    ```js run
    // letras minúsculas e maiúsculas têm códigos diferentes
    alert( "z".codePointAt(0) ); // 122
    alert( "Z".codePointAt(0) ); // 90
    ```

`String.fromCodePoint(code)`
: Cria um caractere a partir do seu código (`code`) numérico

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    ```

    Podemos também adicionar carateres *unicode* utilizando os seus códigos por meio de `\u` seguido pelo código em hexadecimal:

    ```js run
    // 90 é 5a no sistema hexadecimal
    alert( '\u005a' ); // Z
    ```

Agora, vamos ver os carateres com os códigos `65..220` (o alfabeto latino e um pouco mais), formando uma *string* com eles:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

Você vê? Carateres maiúsculos vêm primeiro, depois uns poucos especiais, e a seguir carateres minúsculos, e `Ö` está perto do final.

Agora, se torna óbvio porque `a > Z`.

Os carateres são comparados pelo seu código numérico. Quanto maior o código, maior é o caractere. O código para `a` (97) é maior do que o código para `Z` (90).

- Todas as letras minúsculas vêm depois das letras maiúsculas porque os seus códigos são maiores.
- Algumas letras como `Ö` estão separadas do alfabeto principal. Aqui, o seu código é maior do que qualquer um de `a` a `z`.

### Comparações corretas

O algoritmo "correto" para fazer comparações de *strings* é mais complexo do que parece, porque alfabetos são diferentes em línguas diferentes.

Assim, o navegador (*browser*) precisa de saber que língua é para fazer a comparação.

Felizmente, todos os navegadores modernos (IE10- requere a biblioteca adicional [Intl.JS](https://github.com/andyearnshaw/Intl.js/)) suportam o padrão de internacionalização [ECMA 402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).

Ele contém um método especial para comparar *strings* em diferentes línguas, seguindo as suas regras.

A invocação de [str.localeCompare(str2)](mdn:js/String/localeCompare) retorna um inteiro indicando se `str` é menor, igual ou maior do que `str2`, de acordo com as regras da língua:

- Retorna um número negativo, se `str` é menor do que `str2`.
- Retorna um número positivo, se `str` é maior do que `str2`.
- Retorna `0`, se elas forem equivalentes.

Por exemplo:

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

Na verdade, este método tem dois argumentos adicionais especificados na [documentation](mdn:js/String/localeCompare), que permitem especificar a língua (por defeito, ela é tomada do ambiente local; a ordem das letras depende da língua), e configurar regras adicionais como sensibilidade ao caso (*case-sensitivity*) ou se deveriam `"a"` e `"á"` ser tratadas como a mesma, etc.

## Internamente, *Unicode*

```warn header="Conhecimento avançado"
Esta secção vai mais a fundo sobre o funcionamento interno da string. Este conhecimento lhe será útil se planeja lidar com emoji, carateres matemáticos ou hieróglifos raros, ou outros símbolos raros.

Você pode saltar esta secção se não planejar suportá-los.
```

### Pares substitutos

Todos os carateres frequentemente utilizados têm códigos de 2-bytes. Letras na maioria das línguas europeias, números, e até a maioria dos hieróglifos, têm uma representação de 2-bytes.

Mas, 2 bytes só permitem 65536 combinações, o que não é suficiente para todos os símbolos possíveis. Assim, símbolos raros são codificados como um par (dois) de carateres de 2-bytes chamado de "par substituto" (*surrogate pair*).

O comprimento de tais símbolos é `2`:

```js run
alert( '𝒳'.length ); // 2, símbolo matemático X maiúsculo
alert( '😂'.length ); // 2, face com lágrimas de alegria
alert( '𩷶'.length ); // 2, um raro hieróglifo chinês
```

Note que pares substitutos não existiam quando o JavaScript foi criado, e por isso não são corretamente processados pela linguagem!

Na verdade, temos um único símbolo em cada uma das *strings* acima, mas `length` mostra um comprimento de `2`.

`String.fromCodePoint` e `str.codePointAt` são dos poucos raros métodos que lidam corretamente com pares substitutos. Eles apareceram recentemente na linguagem. Antes deles, apenas existiam [String.fromCharCode](mdn:js/String/fromCharCode) e [str.charCodeAt](mdn:js/String/charCodeAt). Estes métodos são na verdade o mesmo que `fromCodePoint/codePointAt`, mas não trabalham com pares substitutos.

Para se obter um símbolo pode ser complicado, porque pares substitutos são tratados como dois carateres:

```js run
alert( '𝒳'[0] ); // símbolos estranhos...
alert( '𝒳'[1] ); // ...partes do par substituto
```

Note que partes de um par substituto não têm nenhum significado, umas sem as outras. Assim os *alerts* no exemplo acima, na verdade, mostram lixo.

Tecnicamente, pares substitutos também são detetáveis pelo seus códigos: se um caractere tiver o código no intervalo `0xd800..0xdbff`, então é a primeira parte de um par substituto. O caractere seguinte (a segunda parte) tem de ter o código no intervalo `0xdc00..0xdfff`. Estes intervalos estão exclusivamente reservados a pares substitutos pela especificação.

No caso acima:

```js run
// charCodeAt não suporta pares substitutos, assim ele fornece códigos para as partes

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835, entre 0xd800 e 0xdbff
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3, entre 0xdc00 e 0xdfff
```

Você irá encontrar mais formas para lidar com pares substitutos mais adiante no capítulo <info:iterable>. Provavelmente, podem também existir bibliotecas (*libraries*) especiais para isso, mas nada com suficiente fama para sugerir aqui.

### Marcas diacríticas e normalização

Em muitas línguas, existem símbolos que são compostos por um caractere base com uma marca acima/abaixo dele.

Por exemplo, a letra `a` pode ser o caractere base para: `àáâäãåā`. Os mais comuns carateres "compostos" têm os seus códigos próprios na tabela UTF-16. Mas não todos eles, porque existem demasiadas combinações possíveis.

Para suportar composições arbitrárias, o UTF-16 nos permite utilizar múltiplos carateres *unicode*: o caractere base, seguido por um ou mais carateres "marca" que o "decoram".

Por exemplo, se tivermos `S` seguido pelo caractere especial "ponto superior" (código `\u0307`), é mostrado como Ṡ.

```js run
alert( 'S\u0307' ); // Ṡ
```

Se, precisarmos de uma marca adicional acima da letra (ou abaixo dela) -- não há problema, apenas adicionamos o necessário caractere marca.

Por exemplo, se adicionarmos um caractere "ponto abaixo" (código `\u0323`), então teremos "S com pontos acima e abaixo": `Ṩ`.

Por exemplo:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

Isto provê grande flexibilidade, mas também um problema interessante: dois carateres podem visualmente ter a mesma aparência, mas estar representados por composições *unicode* diferentes.

Por exemplo:

```js run
let s1 = 'S\u0307\u0323'; // Ṩ, S + ponto acima + ponto abaixo
let s2 = 'S\u0323\u0307'; // Ṩ, S + ponto abaixo + ponto acima

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false embora os caracteres pareçam idênticos (?!)
```

Para solucionar isto, existe um algoritmo para "normalização *unicode*" que transforma cada *string* numa única forma "normal".

Ele é implementado por [str.normalize()](mdn:js/String/normalize).

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

É engraçado que na nossa situação `normalize()` transforma, na verdade, a sequência de 3 carateres em um: `\u1e68` (S com dois pontos).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

Na realidade, nem sempre é o caso. A razão é porque o símbolo `Ṩ` é "algo comum", e por isso os criadores do UTF-16 o incluíram na tabela principal e o deram um código.

Se quiser aprender mais sobre regras e variantes de normalização -- elas estão descritas no apêndice do padrão Unicode: [Unicode Normalization Forms](http://www.unicode.org/reports/tr15/), mas para a maioria dos propósitos práticos a informação nesta secção é suficiente.

## Sumário

- Existem 3 tipos de aspas. Os *backticks* permitem que uma *string* se estenda por múltiplas linhas e expressões embebidas `${…}`.
- As *Strings* em JavaScript são codificadas empregando UTF-16.
- Podemos utilizar carateres especiais como `\n`, e inserir letras por meio do seu *unicode* usando `\u...`.
- Para obter um caractere, use: `[]`.
- Para obter uma *substring*, use: `slice` ou `substring`.
- Para transformar uma *string* em minúsculas/maiúsculas, use: `toLowerCase/toUpperCase`.
- Para procurar por uma *substring*, use: `indexOf`, ou `includes/startsWith/endsWith` para verificações simples.
- Para comparar *strings* de acordo com a língua, use: `localeCompare`, caso contrário elas são comparadas pelos códigos dos carateres.

Existem vários outros métodos úteis para *strings*:

- `str.trim()` -- remove ("*trims*") espaços do inicio e final da *string*.
- `str.repeat(n)` -- repete a *string* `n` vezes.
- ...e mais pode ser encontrado no [manual](mdn:js/String).

As *strings* também têm métodos para se fazer a procura/substituição usando expressões regulares (*regular expressions*). Mas, este é um tópico extenso e por isso é explicado em separado na secção tutorial <info:regular-expressions>.
