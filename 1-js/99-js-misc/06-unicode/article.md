
<<<<<<< HEAD
# Unicode, detalhes internos da String

```warn header="Conhecimento avançado"
Esta seção aprofunda nos detalhes internos das strings. Este conhecimento será útil se você planeja lidar com emojis, caracteres matemáticos raros, hieróglifos ou outros símbolos raros.
```

Já sabemos que, as strings do JavaScript são baseadas no [Unicode](https://en.wikipedia.org/wiki/Unicode): cada caractere é representado por uma sequência de bytes de 1 a 4 bytes.

JavaScript nos permite inserir um caractere em uma string ao especificar o seu código Unicode hexadecimal com uma dessas três notações:

- `\xXX`

    `XX` deve ser composto por dois digitos hexadecimais com um valor entre `00` e `FF`, assim `\xXX` representa o caractere cujo o código Unicode é `XX`.

    Uma vez que a notação `\xXX` suporta apenas dois dígitos hexadecimais, ela pode ser usada apenas para os primeiros 256 caracteres Unicode.

    Esses primeiros 256 caracteres incluem o alfabeto latino, a maioria dos caracteres de sintaxe básica e alguns outros. Por exemplo, `"\x7A"` é o mesmo que `"z"` (Unicode `U+007A`).

    ```js run
    alert( "\x7A" ); // z
    alert( "\xA9" ); // ©, O símbolo de direitos autorais.
    ```

- `\uXXXX`
    `XXXX` deve ser composto por exatamente quatro dígitos hexadecimais com um valor entre `0000` e `FFFF`, assim `\uXXXX` representa o caractere cujo o código Unicode é `XXXX`.

    Carateres com valores Unicode maiores que `U+FFFF` também podem ser representados com essa notação, mas nesse caso, precisaremos usar o chamado par de substitutos (falaremos sobre pares de substitutos mais tarde neste capítulo).

    ```js run
    alert( "\u00A9" ); // ©, o mesmo que \xA9, usando a notação hexadecimal de 4 dígitos
    alert( "\u044F" ); // я, a letra do alfabeto cirílico
    alert( "\u2191" ); // ↑, o símbolo da seta para cima
=======
# Unicode, String internals

```warn header="Advanced knowledge"
The section goes deeper into string internals. This knowledge will be useful for you if you plan to deal with emoji, rare mathematical or hieroglyphic characters, or other rare symbols.
```

As we already know, JavaScript strings are based on [Unicode](https://en.wikipedia.org/wiki/Unicode): each character is represented by a byte sequence of 1-4 bytes.

JavaScript allows us to insert a character into a string by specifying its hexadecimal Unicode code with one of these three notations:

- `\xXX`

    `XX` must be two hexadecimal digits with a value between `00` and `FF`, then `\xXX` is the character whose Unicode code is `XX`.

    Because the `\xXX` notation supports only two hexadecimal digits, it can be used only for the first 256 Unicode characters.

    These first 256 characters include the Latin alphabet, most basic syntax characters, and some others. For example, `"\x7A"` is the same as `"z"` (Unicode `U+007A`).

    ```js run
    alert( "\x7A" ); // z
    alert( "\xA9" ); // ©, the copyright symbol
    ```

- `\uXXXX`
    `XXXX` must be exactly 4 hex digits with the value between `0000` and `FFFF`, then `\uXXXX` is the character whose Unicode code is `XXXX`.

    Characters with Unicode values greater than `U+FFFF` can also be represented with this notation, but in this case, we will need to use a so called surrogate pair (we will talk about surrogate pairs later in this chapter).

    ```js run
    alert( "\u00A9" ); // ©, the same as \xA9, using the 4-digit hex notation
    alert( "\u044F" ); // я, the Cyrillic alphabet letter
    alert( "\u2191" ); // ↑, the arrow up symbol
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
    ```

- `\u{X…XXXXXX}`

<<<<<<< HEAD
    `X...XXXXXX` deve ser um valor hexadecimal de 1 a 6 bytes entre `0` e `10FFFF` (o maior ponto de código definido pelo Unicode). Esta notação nos permite representar facilmente todos os caracteres Unicode existentes.

    ```js run
    alert( "\u{20331}" ); // 佫, um caractere chinês raro (Unicode longo)
    alert( "\u{1F60D}" ); // 😍, um símbolo de rosto sorridente (outro Unicode longo)
    ```

## Pares substitutos

Todos os caracteres usados frequentemente têm códigos de 2 bytes (4 dígitos hexadecimais). Letras na maioria das linguagens Europeias, números e os conjuntos ideográficos unificados básicos CJK (CJK -- dos sistemas de escrita Chinês, Japonês e Coreano), têm uma representação de 2 bytes.

Inicialmente, o JavaScript era baseado na codificação UTF-16 que permitia apenas 2 bytes por caractere. Mas 2 bytes só permitem 65536 combinações e isso não é suficiente para todos os símbolos possíveis do Unicode.

Então, símbolos raros que requerem mais de 2 bytes são codificados com um par de caracteres de 2 bytes chamados de "par substituto".

Como efeito colateral, o comprimento de tais símbolos é `2`:

```js run
alert( '𝒳'.length ); // 2, caractere matemático X maiúsculo
alert( '😂'.length ); // 2, rosto com lágrimas de alegria
alert( '𩷶'.length ); // 2, um caractere chinês raro
```

Isso ocorre porque pares substitutos não existiam na época em que o JavaScript foi criado e, portanto, não são processados corretamente pela linguagem!

Na verdade, temos um único símbolo em cada uma das strings acima, mas a propriedade `length` mostra um comprimento de `2`.

Obter um símbolo também pode ser complicado, porque a maioria dos recursos da linguagem tratam pares substitutos como dois caracteres.

Por exemplo, aqui podemos ver dois caracteres estranhos na saída:

```js run
alert( '𝒳'[0] ); // mostra símbolos estranhos...
alert( '𝒳'[1] ); // ...partes de um par substituto
```

Partes de um par substituto não têm significado sem o outro. Então, os alertas no exemplo acima na verdade exibem caracteres inválidos.

Tecnicamente, pares substitutos também são detectáveis pelos seus códigos: se um caractere tem o código no intervalo de `0xd800..0xdbff`, então ele é a primeira parte do par substituto. O próximo caractere (segunda parte) deve ter o código no intervalo `0xdc00..0xdfff`. Esses intervalos são reservados exclusivamente para pares substitutos por padrão.

Então, os métodos [String.fromCodePoint](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint) e [str.codePointAt](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt) foram adicionados no JavaScript para lidar com pares substitutos.

Eles são essencialmente os mesmos que [String.fromCharCode](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode) e [str.charCodeAt](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt), mas eles tratam pares substitutos corretamente.

Podemos ver a diferença aqui:

```js run
// charCodeAt não reconhece pares substitutos, então fornece códigos para a 1ª parte de 𝒳:

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835

// codePointAt reconhece pares substitutos
alert( '𝒳'.codePointAt(0).toString(16) ); // 1d4b3, lê ambas as partes do par substituto
```
Dito isto, se partirmos da posição 1 (e isso está bastante incorreto aqui), então ambos retornam apenas a 2ª parte do par:
=======
    `X…XXXXXX` must be a hexadecimal value of 1 to 6 bytes between `0` and `10FFFF` (the highest code point defined by Unicode). This notation allows us to easily represent all existing Unicode characters.

    ```js run
    alert( "\u{20331}" ); // 佫, a rare Chinese character (long Unicode)
    alert( "\u{1F60D}" ); // 😍, a smiling face symbol (another long Unicode)
    ```

## Surrogate pairs

All frequently used characters have 2-byte codes (4 hex digits). Letters in most European languages, numbers, and the basic unified CJK ideographic sets (CJK -- from Chinese, Japanese, and Korean writing systems), have a 2-byte representation.

Initially, JavaScript was based on UTF-16 encoding that only allowed 2 bytes per character. But 2 bytes only allow 65536 combinations and that's not enough for every possible symbol of Unicode.

So rare symbols that require more than 2 bytes are encoded with a pair of 2-byte characters called "a surrogate pair".

As a side effect, the length of such symbols is `2`:

```js run
alert( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
alert( '😂'.length ); // 2, FACE WITH TEARS OF JOY
alert( '𩷶'.length ); // 2, a rare Chinese character
```

That's because surrogate pairs did not exist at the time when JavaScript was created, and thus are not correctly processed by the language!

We actually have a single symbol in each of the strings above, but the `length` property shows a length of `2`.

Getting a symbol can also be tricky, because most language features treat surrogate pairs as two characters.

For example, here we can see two odd characters in the output:

```js run
alert( '𝒳'[0] ); // shows strange symbols...
alert( '𝒳'[1] ); // ...pieces of the surrogate pair
```

Pieces of a surrogate pair have no meaning without each other. So the alerts in the example above actually display garbage.

Technically, surrogate pairs are also detectable by their codes: if a character has the code in the interval of `0xd800..0xdbff`, then it is the first part of the surrogate pair. The next character (second part) must have the code in interval `0xdc00..0xdfff`. These intervals are reserved exclusively for surrogate pairs by the standard.

So the methods [String.fromCodePoint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint) and [str.codePointAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt) were added in JavaScript to deal with surrogate pairs.

They are essentially the same as [String.fromCharCode](mdn:js/String/fromCharCode) and [str.charCodeAt](mdn:js/String/charCodeAt), but they treat surrogate pairs correctly.

One can see the difference here:

```js run
// charCodeAt is not surrogate-pair aware, so it gives codes for the 1st part of 𝒳:

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835

// codePointAt is surrogate-pair aware
alert( '𝒳'.codePointAt(0).toString(16) ); // 1d4b3, reads both parts of the surrogate pair
```

That said, if we take from position 1 (and that's rather incorrect here), then they both return only the 2nd part of the pair:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3
alert( '𝒳'.codePointAt(1).toString(16) ); // dcb3
<<<<<<< HEAD
// segunda parte do par sem sentido
```
Você encontrará mais maneiras de lidar com pares substitutos mais tarde no capítulo <info:iterable>. Provavelmente existem bibliotecas especiais para isso também, mas nada famoso o suficiente para sugerir aqui.

````warn header="Conclusão: dividir strings em um ponto arbitrário é perigoso"
Nós não podemos simplesmente dividir uma string em uma posição arbitrária, por exemplo, pegar `str.slice(0, 4)` e esperar que seja uma string válida, por exemplo:
=======
// meaningless 2nd half of the pair
```

You will find more ways to deal with surrogate pairs later in the chapter <info:iterable>. There are probably special libraries for that too, but nothing famous enough to suggest here.

````warn header="Takeaway: splitting strings at an arbitrary point is dangerous"
We can't just split a string at an arbitrary position, e.g. take `str.slice(0, 4)` and expect it to be a valid string, e.g.:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
alert( 'hi 😂'.slice(0, 4) ); //  hi [?]
```
<<<<<<< HEAD
Aqui podemos ver um caractere inválido (primeira metade do par substituto) na saída.

Apenas fique ciente disso se você pretende trabalhar de forma confiável com pares substitutos. Pode não ser um grande problema, mas pelo menos você deve entender o que acontece.
````

## Marcas diacríticas e normalização

Em várias linguagens, existem símbolos que são compostos do caractere base com uma marca acima/abaixo dele.

Por exemplo, a letra `a` pode ser o caractere base para esses caracteres: `àáâäãåā`.

Os caracteres "compostos" mais comuns têm seu próprio código na tabela Unicode. Mas nem todos eles, porque existem muitas combinações possíveis.

Para auxiliar composições arbitrárias, o padrão Unicode nos permite usar vários caracteres Unicode: o caractere base seguido por um ou vários caracteres "marca" que o "decoram".

Por exemplo, se tivermos `S` seguido pelo caractere especial "ponto acima" (código `\u0307`), ele será mostrado como Ṡ.
=======

Here we can see a garbage character (first half of the smile surrogate pair) in the output.

Just be aware of it if you intend to reliably work with surrogate pairs. May not be a big problem, but at least you should understand what happens.
````

## Diacritical marks and normalization

In many languages, there are symbols that are composed of the base character with a mark above/under it.

For instance, the letter `a` can be the base character for these characters: `àáâäãåā`.

Most common "composite" characters have their own code in the Unicode table. But not all of them, because there are too many possible combinations.

To support arbitrary compositions, the Unicode standard allows us to use several Unicode characters: the base character followed by one or many "mark" characters that "decorate" it.

For instance, if we have `S` followed by the special "dot above" character (code `\u0307`), it is shown as Ṡ.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
alert( 'S\u0307' ); // Ṡ
```
<<<<<<< HEAD
Se precisarmos de uma marca adicional acima da letra (ou abaixo dela) -- sem problemas, apenas adicione o caractere de marca necessário.

Por exemplo, se anexarmos o caractere "ponto abaixo" (código `\u0323`), então teremos "S com pontos acima e abaixo": `Ṩ`.

Por exemplo:
=======

If we need an additional mark above the letter (or below it) -- no problem, just add the necessary mark character.

For instance, if we append a character "dot below" (code `\u0323`), then we'll have "S with dots above and below": `Ṩ`.

For example:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```
<<<<<<< HEAD
Isso fornece grande flexibilidade, mas também um problema interessante: dois caracteres podem parecer visualmente iguais, mas serem representados com diferentes composições Unicode.

Por exemplo:

```js run
let s1 = 'S\u0307\u0323'; // Ṩ, S + ponto acima + ponto abaixo
let s2 = 'S\u0323\u0307'; // Ṩ, S + ponto abaixo + ponto acima

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // falso embora os caracteres pareçam identicos (?!)
```

Para resolver isso, existe um algoritmo de "normalização Unicode" que traz cada string para a única forma "normal".

Ele é implementado por [str.normalize()](mdn:js/String/normalize).

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // verdadeiro
```

É engraçado que na nossa situação `normalize()` realmente junta uma sequência de 3 caracteres em um: `\u1e68` (S com dois pontos).
=======

This provides great flexibility, but also an interesting problem: two characters may visually look the same, but be represented with different Unicode compositions.

For instance:

```js run
let s1 = 'S\u0307\u0323'; // Ṩ, S + dot above + dot below
let s2 = 'S\u0323\u0307'; // Ṩ, S + dot below + dot above

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false though the characters look identical (?!)
```

To solve this, there exists a "Unicode normalization" algorithm that brings each string to the single "normal" form.

It is implemented by [str.normalize()](mdn:js/String/normalize).

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

It's funny that in our situation `normalize()` actually brings together a sequence of 3 characters to one: `\u1e68` (S with two dots).
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

<<<<<<< HEAD
alert( "S\u0307\u0323".normalize() == "\u1e68" ); // verdadeiro
```

Na realidade, isso nem sempre é o caso. O motivo é que o símbolo `Ṩ` é "comum o suficiente", então os criadores do Unicode o incluíram na tabela principal e deram o código.

Se você deseja aprender mais sobre regras de normalização e variantes -- elas são descritas no apêndice do padrão Unicode: [Unicode Normalization Forms](https://www.unicode.org/reports/tr15/), mas para a maioria dos propósitos práticos a informação desta seção é suficiente.
=======
alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

In reality, this is not always the case. The reason is that the symbol `Ṩ` is "common enough", so Unicode creators included it in the main table and gave it the code.

If you want to learn more about normalization rules and variants -- they are described in the appendix of the Unicode standard: [Unicode Normalization Forms](https://www.unicode.org/reports/tr15/), but for most practical purposes the information from this section is enough.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
