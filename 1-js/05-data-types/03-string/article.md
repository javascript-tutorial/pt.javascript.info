# Strings

Em JavaScript, os dados textuais são armazenados como strings. Não existe um tipo separado para um único caractere.

O formato interno para strings é sempre [UTF-16](https://pt.wikipedia.org/wiki/UTF-16), não está vinculado à codificação da página.

## Citações

Vamos lembrar os tipos de citações.

As strings podem ser colocadas entre aspas simples, aspas duplas ou acento grave:

```js
let single = 'aspas simples';
let double = "aspas duplas";

let backticks = `acento grave`;
```

Aspas simples e duplas são essencialmente as mesmas. Acento grave, no entanto, nos permitem incorporar qualquer expressão na string, envolvendo-a em `${…}`:

```js run
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

Outra vantagem do uso de acento agudo é que ele permite que uma string ocupe várias linhas:

```js run
let guestList = `Convidados:
 * John
 * Pete
 * Mary
`;

alert(guestList); // uma lista de convidados, múltiplas linhas
```

Parece natural, certo? Mas aspas simples ou duplas não funcionam dessa maneira.

Se as usarmos e tentarmos usar várias linhas, haverá um erro:

```js run
let guestList = "Convidados: // Error: Unexpected token ILLEGAL
  * John";
```

Aspas simples e duplas vêm de tempos antigos de criação da linguagem quando a necessidade de strings de múltiplas linhas não foi levada em conta. Acento agudo apareceu muito mais tarde e, portanto, são mais versáteis.

Acento agudo também nos permitem especificar uma "função de modelo" antes do primeiro acento agudo. A sintaxe é: <code>func&#96;string&#96;</code>. A função `func` é chamada automaticamente, recebe a string e expressões incorporadas e pode processá-las. Você pode ler mais sobre isso no [docs](mdn: / JavaScript / Referência / Template_literals # Tagged_template_literals). Isso é chamado de "modelos marcados". Esse recurso facilita o encapsulamento de strings em modelos personalizados ou outras funcionalidades, mas raramente é usado.

## Caracteres especiais

Ainda é possível criar strings de múltiplas linhas com aspas simples e duplas usando o chamado "caractere de nova linha", escrito como `\n`, que indica uma quebra de linha:

```js run
let guestList = "Convidados:\n * John\n * Pete\n * Mary";

alert(guestList); // uma lista de convidados com múltiplas linhas
```

Por exemplo, estas duas linhas são iguais, apenas escritas de maneiras diferentes:

```js run
let str1 = "Hello\nWorld"; // duas linhas usando um "símbolo de nova linha"

// duas linhas usando uma nova linha normal e acento agudo
let str2 = `Hello
World`;

alert(str1 == str2); // true
```

Existem outros caracteres "especiais" menos comuns:

Aqui está a lista completa:

| Caractere | Descrição |
|-----------|-------------|
|`\n`|Nova linha|
|`\r`|Quebra de linha: não usado sozinho. Os arquivos de texto do Windows usam uma combinação de dois caracteres `\r\n` para representar uma quebra de linha.|
|`\'`, `\"`|Aspas|
|`\\`|Barra invertida|
|`\t`|Tab|
|`\b`, `\f`,`\v`| Backspace, Feed de formulário, Tab Vertical - mantidos para compatibilidade, não utilizados atualmente. |
|`\xXX`|Caractere Unicode com o dado Unicode hexadimal `XX`, por exemplo `'\x7A'` é o mesmo que `'z'`.|
|`\uXXXX`|Um símbolo unicode com o código hexadecimal `XXXX` na codificação UTF-16, por exemplo `\u00A9` -- é um unicode para o símbolo de direitos autorais `©`. Ele deve ter exatamente 4 dígitos hexadecimais. |
|`\u{X…XXXXXX}` (1 a 6 caracteres hexadecimais) | Um símbolo unicode com a codificação UTF-32 fornecida. Alguns caracteres raros são codificados com dois símbolos unicode, ocupando até 4 bytes. Dessa forma, podemos inserir códigos longos.|

Exemplos com unicode:

```js run
alert( "\u00A9" ); // ©
alert( "\u{20331}" ); // 佫, um hieróglifo Chinês raro (unicode longo)
alert( "\u{1F60D}" ); // 😍, um símbolo de rosto sorridente (outro unicode longo)
```

Todos os caracteres especiais começam com um caractere de barra invertida `\`. Também é chamado de "caractere de escape".

Nós também o usaríamos se quiséssemos inserir uma citação na string.

Por exemplo:

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

Como você pode ver, temos que prefixar a aspas internas pela barra invertida `\'`, porque senão indicaria o final da string.

Naturalmente, apenas às aspas que são as mesmas que as contidas precisam ser escapadas. Então, como uma solução mais elegante, poderíamos alternar entre aspas duplas ou acento agudo:

```js run
alert( `I'm the Walrus!` ); // I'm the Walrus!
```

Note que a barra invertida `\` serve para a leitura correta da string por JavaScript, depois desaparece. A string na memória não possui `\`. Você pode ver isso claramente no "alerta" dos exemplos acima.

Mas e se precisarmos realmente mostrar uma barra invertida `\` dentro da string?

Isso é possível, mas precisamos de duas como `\\`:

```js run
alert( `The backslash: \\` ); // The backslash: \
```

## Comprimento String

A propriedade `length` guarda o comprimento da string:

```js run
alert( `My\n`.length ); // 3
```

Note que `\n` é um único caractere "especial", então o comprimento é de fato `3`.

```warn header="`length` é uma propriedade"
Pessoas com experiência em algumas outras linguagens às vezes digitam `str.length ()` ao invés de apenas `str.length`. Isso não funciona.

Por favor note que `str.length` é uma propriedade numérica, não uma função. Não há necessidade de adicionar parênteses depois dela.
```

## Acessando caracteres

Para obter um caractere na posição `pos`, use colchetes `[pos]` ou chame o método [str.charAt(pos)](mdn:js/String/charAt). O primeiro caractere começa na posição zero:

```js run
let str = `Hello`;

// o primeiro caractere
alert( str[0] ); // H
alert( str.charAt(0) ); // H

// o último caractere
alert( str[str.length - 1] ); // o
```

Os colchetes são uma maneira moderna de obter um caractere, enquanto o `charAt` existe principalmente por razões históricas.

A única diferença entre eles é que se nenhum caractere for encontrado, `[]` retorna `undefined` e `charAt` retorna uma string vazia:

```js run
let str = `Hello`;

alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // '' (uma string vazia)
```

Nós também podemos iterar sobre os caracteres usando `for..of`:

```js run
for (let char of "Hello") {
  alert(char); // H,e,l,l,o (char torna-se "H", depois "e", depois "l" etc)
}
```

## Strings são imutáveis

As strings não podem ser alteradas em JavaScript. É impossível mudar um caractere.

Vamos tentar para mostrar que não funciona:

```js run
let str = 'Hi';

str[0] = 'h'; // erro
alert( str[0] ); // não funciona
```

A solução usual é criar uma nova string inteira e atribuí-la ao `str` em vez da antiga.

For instance:

```js run
let str = 'Hi';

str = 'h' + str[1]; // substitui string

alert( str ); // hi
```

Nas seções a seguir, veremos mais exemplos disso.

## Mudando a caixa da letra

Métodos [toLowerCase()](mdn:js/String/toLowerCase) e [toUpperCase()](mdn:js/String/toUpperCase) mudam a caixa da letra:

```js run
alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface
```

Ou, se queremos um único caractere em minúsculas:

```js
alert( 'Interface'[0].toLowerCase() ); // 'i'
```

## Procurando por uma substring

Existem várias maneiras de procurar por uma substring dentro de uma string.

### str.indexOf

O primeiro método é [str.indexOf(substr, pos)](mdn:js/String/indexOf).

Procura pela `substr` em `str`, começando da posição dada `pos`, e retorna a posição onde a correspondência foi encontrada ou `-1` se nada for encontrado.

Por exemplo:

```js run
let str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0, porque 'Widget' é encontrado no começo
alert( str.indexOf('widget') ); // -1, não encontrado, a pesquisa faz distinção entre maiúsculas e minúsculas

alert( str.indexOf("id") ); // 1, "id" é encontrado na posição 1 (..idget com id)
```

O segundo parâmetro opcional nos permite pesquisar a partir da posição determinada.

Por exemplo, a primeira ocorrência de `"id"` está na posição `1`. Para procurar a próxima ocorrência, vamos iniciar a pesquisa a partir da posição `2`:

```js run
let str = 'Widget with id';

alert( str.indexOf('id', 2) ) // 12
```

Se estivermos interessados ​​em todas as ocorrências, podemos executar o `indexOf` em um loop. Cada nova chamada é feita com a posição após a partida anterior:

```js run
let str = 'As sly as a fox, as strong as an ox';

let target = 'as'; // vamos procurar

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Found at ${foundPos}` );
  pos = foundPos + 1; // continue a busca a partir da próxima posição
}
```

O mesmo algoritmo pode ser apresentado mais curto:

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
Existe também um método semelhante [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf) que procura do final de uma string até o começo dela.

Listaria as ocorrências na ordem inversa.
```

Existe um pequeno inconveniente com `indexOf` no teste` if`. Não podemos colocá-lo no `se 'assim:

```js run
let str = "Widget with id";

if (str.indexOf("Widget")) {
    alert("We found it"); // não funciona
}
```

O `alert` no exemplo acima não é exibido porque `str.indexOf("Widget")` retorna `0` (significa que encontrou a sub-string na posição inicial). Certo, mas `if` considera `0` como `false`.

Então, nós deveríamos realmente checar por `-1`, assim:

```js run
let str = "Widget with id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("We found it"); // agora funciona!
}
```

#### O truque NOT bit a bit

Um dos velhos truques usados ​​aqui é o operador [NOT bit a bit](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT) `~`. Ele converte o número em um inteiro de 32 bits (remove a parte decimal, se existir) e, em seguida, inverte todos os bits em sua representação binária.

Na prática, isso significa uma coisa simples: para números inteiros de 32 bits `~n` é igual a `-(n+1)`.

Por exemplo:

```js run
alert( ~2 ); // -3, o mesmo que -(2+1)
alert( ~1 ); // -2, o mesmo que -(1+1)
alert( ~0 ); // -1, o mesmo que -(0+1)
*!*
alert( ~-1 ); // 0, o mesmo que -(-1+1)
*/!*
```

Como podemos ver, `~n` é zero somente se `n == -1` (isso é para qualquer número inteiro com sinal de 32 bits `n`).

Então, o teste `if ( ~str.indexOf("...") )` é verdadeiro quando o resultado de `indexOf` não é `-1`. Em outras palavras, quando encontrou uma combinação.

As pessoas usam isso para encurtar as verificações do `indexOf`:

```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Found it!' ); // funciona
}
```

Geralmente, não é recomendado usar os recursos de linguagem de maneira não óbvia, mas esse truque específico é amplamente usado em códigos antigos, por isso devemos entendê-lo.

Lembre-se: `if (~str.indexOf(...))` lê-se como "se encontrado".

Para ser preciso, porém, como os números grandes são truncados para 32 bits pelo operador `~`; existem outros números que dão `0`, o menor é` `~4294967295=0`. Isso faz com que essa verificação esteja correta apenas se uma sequência não for tão longa.

No momento, podemos ver esse truque apenas no código antigo, pois o JavaScript moderno fornece o método `.includes` (veja abaixo).

### includes, startsWith, endsWith

O método mais moderno [str.includes(substr, pos)](mdn:js/String/includes) retorna `true/false` dependendo se `str` contém a `substr` dentro.

É a escolha certa se precisarmos testar a combinação, mas não precisamos da posição dela:

```js run
alert( "Widget with id".includes("Widget") ); // true

alert( "Hello".includes("Bye") ); // false
```

O segundo argumento opcional de `str.includes` é a posição para começar a procurar em:

```js run
alert( "Widget".includes("id") ); // true
alert( "Widget".includes("id", 3) ); // false, a partir da posição 3 não existe nenhum "id"
```

Os métodos [str.startsWith](mdn:js/String/startsWith) e [str.endsWith](mdn:js/String/endsWith) fazem exatamente o que eles dizem:

```js run
alert( "Widget".startsWith("Wid") ); // true, "Widget" começa com "Wid"
alert( "Widget".endsWith("get") );  // true, "Widget" termina com "get"
```

## Obtendo uma substring

Existem 3 métodos em JavaScript para obter uma substring: `substring`,` substr` e `slice`.

`str.slice(start [, end])`
: Retorna a parte da string de `start` até (mas não incluindo) `end`.

    Por exemplo:

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin', a substring de 0 até 5 (não incluindo 5)
    alert( str.slice(0, 1) ); // 's', de 0 até 1, mas não incluindo 1, então apenas o caractere na posição 0
    ```

    Se não houver um segundo argumento, o `slice` vai até o final da string:

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // ringify, da segunda posição até o final
    ```

    Valores negativos para `start/end` também são possíveis. Eles significam que a posição é contada a partir do final da string:

    ```js run
    let str = "strin*!*gif*/!*y";

    // começa na quarta posição a partir da direita, termine na primeira da direita
    alert( str.slice(-4, -1) ); // gif
    ```

`str.substring(start [, end])`
: Retorna a parte da string *entre* `start` e `end`.

    Isso é quase o mesmo que `slice`, mas permite que `start` seja maior que `end`.

    Por exemplo:

    ```js run
    let str = "st*!*ring*/!*ify";

    // estes são os mesmos para substring
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...mas não para slice:
    alert( str.slice(2, 6) ); // "ring" (o mesmo)
    alert( str.slice(6, 2) ); // "" (uma string vazia)

    ```

    Argumentos negativos são (ao contrário de slice) não suportados, eles são tratados como `0`.

`str.substr(start [, length])`
: Retorna a parte da string a partir de `start`, com o dado comprimento `length`.

    Em contraste com os métodos anteriores, este nos permite especificar o comprimento em vez da posição final:

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // ring, a partir da segunda posição obtém 4 caracteres
    ```

    O primeiro argumento pode ser negativo, contar a partir do final:

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // gi, a partir da quarta posição recebe 2 caracteres
    ```

Vamos recapitular esses métodos para evitar qualquer confusão:

| método | seleciona... | negativos |
|--------|-----------|-----------|
| `slice(start, end)` | de `start` até `end` (não incluindo `end`) | permite negativos |
| `substring(start, end)` | entre `start` e `end` |  valores negativos sgnificam `0` |
| `substr(start, length)` | de `start` obtenha `length` caracteres | permite `start` negativo |

```smart header="Qual escolher?"
Todos eles podem fazer o trabalho. Formalmente, o `substr` tem uma pequena desvantagem: é descrito não na especificação principal do JavaScript, mas no Anexo B, que cobre recursos somente do navegador que existem principalmente por razões históricas. Assim, ambientes sem navegador podem falhar em suportá-lo. Mas na prática funciona em todos os lugares.

Das outras duas variantes, o `slice` é um pouco mais flexível, permite argumentos negativos e é menor para escrever. Portanto, basta lembrar apenas `slice` desses três métodos.
```

## Comparando strings

Como sabemos no capítulo <info:comparison>, as strings são comparadas caractere por caractere em ordem alfabética.

Embora haja algumas esquisitices.

1. Uma letra minúscula é sempre maior que a maiúscula:

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. Letras com marcas diacríticas estão "fora de ordem":

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

Isso pode levar a resultados estranhos se classificarmos esses nomes de países. Normalmente as pessoas esperariam que o `Zealand` viesse depois de `Österreich` na lista.

Para entender o que acontece, vamos revisar a representação interna de strings em JavaScript.

Todas as strings são codificadas usando [UTF-16](https://pt.wikipedia.org/wiki/UTF-16). Ou seja: cada caractere tem um código numérico correspondente. Existem métodos especiais que permitem obter o caractere para o código e vice versa.

`str.codePointAt(pos)`
: Retorna o código para o caractere na posição `pos`:

    ```js run
    // letras com caixas diferentes têm códigos diferentes
    alert( "z".codePointAt(0) ); // 122
    alert( "Z".codePointAt(0) ); // 90
    ```

`String.fromCodePoint(code)`
: Cria um caractere pelo seu `codigo` numérico

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    ```

    Nós também podemos adicionar caracteres unicode por seus códigos usando `\u` seguido pelo código hexadecimal:

    ```js run
    // 90 é 5a no sistema hexadecimal
    alert( '\u005a' ); // Z
    ```

Agora vamos ver os caracteres com os códigos `65..220` (o alfabeto latino e um pouco extra) fazendo uma string deles:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

Viu? Os caracteres maiúsculos são os primeiros, depois alguns especiais e, em seguida, os caracteres minúsculos, e `Ö` perto do final da saída.

Agora ficou óbvio por quê `a > Z`.

Os caracteres são comparados por seu código numérico. O código maior significa que o caractere é maior. O código para `a` (97) é maior que o código para` Z` (90).

- Todas as letras minúsculas seguem letras maiúsculas porque seus códigos são maiores.
- Algumas letras como `Ö` destacam-se do alfabeto principal. Aqui, o código é maior que qualquer coisa de `a` até `z`.

### Comparações corretas

O algoritmo "certo" para fazer comparações de cadeias é mais complexo do que parece, porque os alfabetos são diferentes para idiomas diferentes.

Então, o navegador precisa conhecer o idioma para comparar.

Felizmente, todos os navegadores modernos (IE10 - requer a biblioteca adicional [Intl.JS](https://github.com/andyearnshaw/Intl.js/)) suportam o padrão de internacionalização [ECMA 402](http: //www.ecma -international.org/ecma-402/1.0/ECMA-402.pdf).

Ele fornece um método especial para comparar strings em diferentes idiomas, seguindo suas regras.

A chamada [str.localeCompare(str2)](mdn:js/String/localeCompare) retorna um número inteiro indicando se `str` é menor, igual ou maior que a `str2` de acordo com as regras de idioma:

- Retorna um número negativo se `str` for menor que `str2`.
- Retorna um número positivo se `str` for maior que `str2`.
- Retorna `0` se elas forem equivalentes.

Por exemplo:

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

Este método possui dois argumentos adicionais especificados em [a documentação](mdn: js / String / localeCompare), que permite especificar o idioma (por padrão, extraído do ambiente, a ordem das letras depende do idioma) e configurar regras adicionais, como maiúsculas e minúsculas, ou `"a"` e `"á"` ser tratado como o mesmo etc.

## Internos, Unicode

```warn header="Conhecimento avançado"
A seção vai mais fundo nos componentes internos das strings. Este conhecimento será útil se você planeja lidar com emoji, caracteres matemáticos ou hieroglíficos raros ou outros símbolos raros.

Você pode pular a seção se não pretende usá-los.
```

### Pares substitutos

Todos caracteres frequentemente usados tem um código de 2 bytes. As letras na maioria das linguagens européias, números e até a maioria dos hieróglifos têm uma representação de 2 bytes.

Mas 2 bytes só permitem 65536 combinações e isso não é suficiente para todos os símbolos possíveis. Então símbolos raros são codificados com um par de caracteres de 2 bytes chamado "um par substituto".

O comprimento de tais símbolos é "2":

```js run
alert( '𝒳'.length ); // 2, SCRIPT MATEMÁTICO CAPITAL X
alert( '😂'.length ); // 2, FACE COM LÁGRIMAS DE ALEGRIA
alert( '𩷶'.length ); // 2, um hieróglifo Chinês raro
```

Observe que os pares substitutos não existiam no momento em que o JavaScript foi criado e, portanto, não são processados ​​corretamente pela linguagem!

Na verdade, temos um único símbolo em cada uma das strings acima, mas o `length` mostra um comprimento de `2`.

`String.fromCodePoint` e `str.codePointAt` são alguns métodos raros que lidam com pares substitutos corretamente. Eles apareceram recentemente no idioma. Antes deles, havia apenas [String.fromCharCode](mdn: js / String / fromCharCode) e [str.charCodeAt](mdn: js / String / charCodeAt). Esses métodos são, na verdade, iguais a `fromCodePoint/codePointAt`, mas não funcionam com pares substitutos.

Obter um símbolo pode ser complicado, porque os pares substitutos são tratados como dois caracteres:

```js run
alert( '𝒳'[0] ); // símbolos estranhos...
alert( '𝒳'[1] ); // ...pedaços do par substituto
```

Note que pedaços do par substituto não têm significado um para o outro. Portanto, os alertas no exemplo acima realmente exibem lixo.

Tecnicamente, os pares substitutos também são detectáveis ​​por seus códigos: se um caractere tiver o código no intervalo de `0xd800..0xdbff`, então é a primeira parte do par substituto. O próximo caractere (segunda parte) deve ter o código no intervalo `0xdc00..0xdfff`. Esses intervalos são reservados exclusivamente para pares substitutos pelo padrão.

No caso acima:

```js run
// charCodeAt não está ciente de par substituto, então dá códigos para partes

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835, between 0xd800 and 0xdbff
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3, between 0xdc00 and 0xdfff
```

Você encontrará mais maneiras de lidar com pares substitutos posteriormente no capítulo <info:iterable>. Existem provavelmente bibliotecas especiais para isso também, mas nada de famoso o suficiente para sugerir aqui.

### Marcas diacríticas e normalização

Em muitos idiomas existem símbolos que são compostos do caractere base com uma marca acima/abaixo dela.

Por exemplo, a letra 'a' pode ser o caractere base para: `aáâäãå`. O caractere "composto" mais comum tem seu próprio código na tabela UTF-16. Mas nem todos eles, porque existem muitas combinações possíveis.

Para suportar composições arbitrárias, o UTF-16 nos permite usar vários caracteres unicode: o caractere base seguido de um ou vários caracteres "marcados" que "decoram".

Por exemplo, se temos `S` seguido do caracter especial" ponto acima "(código` \ u0307`), ele é mostrado como Ṡ.

```js run
alert( 'S\u0307' ); // Ṡ
```

Se precisarmos de uma marca adicional acima da letra (ou abaixo dela) - não há problema, basta adicionar o caractere de marca necessário.

Por exemplo, se acrescentarmos um caractere "ponto abaixo" (código `\ u0323`), então teremos" S com pontos acima e abaixo ":` Ṩ`.

Por exemplo:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

Isso proporciona uma grande flexibilidade, mas também um problema interessante: dois caracteres podem parecer visualmente iguais, mas serem representados com diferentes composições unicode.

Por exemplo:

```js run
let s1 = 'S\u0307\u0323'; // Ṩ, S + ponto acima + ponto abaixo
let s2 = 'S\u0323\u0307'; // Ṩ, S + ponto abaixo + ponto acima

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false embora os caracteres pareçam idênticos (?!)
```

Para resolver isso, existe um algoritmo de "normalização unicode" que traz cada string para a única forma "normal".

É implementado por [str.normalize()](mdn:js/String/normalize).

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

É engraçado que na nossa situação `normalize()` realmente reúne uma sequência de 3 caracteres para um: `\u1e68` (S com dois pontos).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

Na realidade, isso nem sempre é o caso. A razão é que o símbolo `Ṩ` é "bastante comum", então os criadores de UTF-16 o incluíram na tabela principal e deram o código.

Se você quiser aprender mais sobre as regras e variantes de normalização - elas estão descritas no apêndice do padrão Unicode: [Unicode Normalization Forms](http://www.unicode.org/reports/tr15/), mas para a maioria dos casos práticos fins, as informações desta seção são suficientes.

## Resumo

- Existem 3 tipos de citações. Acento agudo permitem que uma string abranja várias linhas e incorpore expressões `${…}`.
- Strings em JavaScript são codificadas usando UTF-16.
- Podemos usar caracteres especiais como `\n` e inserir letras pelo unicode usando `\u ... `.
- Para obter um caractere, use: `[]`.
- Para obter uma substring, use: `slice` ou `substring`.
- Para transformar uma string em letras minúsculas/maiúsculas, use: `toLowerCase/toUpperCase`.
- Para procurar por uma substring, use: `indexOf`, ou `includes/startsWith/endsWith` para verificações simples.
- Para comparar strings de acordo com a linguagem, use: `localeCompare`, caso contrário elas serão comparadas por códigos de caracteres.

Existem vários outros métodos úteis em strings:

- `str.trim()` - remove ("apara") espaços do começo e fim da string.
- `str.repeat(n)` - repete a string `n` vezes.
- ...e mais a ser encontrado no [manual](mdn:js/String).

As strings também possuem métodos para pesquisar/substituir com expressões regulares. Mas esse tópico merece um capítulo separado, então voltaremos a isso mais tarde.
