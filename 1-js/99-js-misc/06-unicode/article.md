
# Unicode, detalhes internos de Strings

```warn header="Conhecimento avançado"
Esta seção aprofunda nos detalhes internos de strings. Este conhecimento será útil se você planeja lidar com emojis, caracteres matemáticos raros, hieróglifos ou outros símbolos raros.
```

Como já sabemos, strings em JavaScript são baseadas em [Unicode](https://en.wikipedia.org/wiki/Unicode): cada caractere é representado por uma sequência de bytes de 1 a 4 bytes.

JavaScript nos permite inserir um caractere em uma string ao especificar o seu código Unicode hexadecimal com uma dessas três notações:

- `\xXX`

    `XX` deve ser composto por dois digitos hexadecimais com um valor entre `00` e `FF`, assim `\xXX` representa o caractere cujo o código Unicode é `XX`.

    Porque a notação `\xXX` suporta apenas dois dígitos hexadecimais, ela pode ser usada apenas para os primeiros 256 caracteres Unicode.

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
    ```

- `\u{X…XXXXXX}`

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

Então, os métodos [String.fromCodePoint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint) e [str.codePointAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt) foram adicionados no JavaScript para lidar com pares substitutos.

Eles são essencialmente os mesmos que [String.fromCharCode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode) e [str.charCodeAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt), mas eles tratam pares substitutos corretamente.

Podemos ver a diferença aqui:

```js run
// charCodeAt não reconhece pares substitutos, então fornece códigos para a 1ª parte de 𝒳:

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835

// codePointAt reconhece pares substitutos
alert( '𝒳'.codePointAt(0).toString(16) ); // 1d4b3, lê ambas as partes do par substituto
```
Dito isto, se partirmos da posição 1 (e isso está bastante incorreto aqui), então ambos retornam apenas a 2ª parte do par:

```js run
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3
alert( '𝒳'.codePointAt(1).toString(16) ); // dcb3
// segunda parte do par sem sentido
```
Você encontrará mais maneiras de lidar com pares substitutos mais tarde no capítulo <info:iterable>. Provavelmente existem bibliotecas especiais para isso também, mas nada famoso o suficiente para sugerir aqui.

````warn header="Conclusão: dividir strings em um ponto arbitrário é perigoso"
Nós não podemos simplesmente dividir uma string em uma posição arbitrária, por exemplo, pegar `str.slice(0, 4)` e esperar que seja uma string válida, por exemplo:

```js run
alert( 'hi 😂'.slice(0, 4) ); //  hi [?]
```
Aqui podemos ver um caractere inválido (primeira metade do par substituto) na saída.

Apenas fique ciente disso se você pretende trabalhar de forma confiável com pares substitutos. Pode não ser um grande problema, mas pelo menos você deve entender o que acontece.
````

## Marcas diacríticas e normalização

Em várias linguagens, existem símbolos que são compostos do caractere base com uma marca acima/abaixo dele.

Por exemplo, a letra `a` pode ser o caractere base para esses caracteres: `àáâäãåā`.

Os caracteres "compostos" mais comuns têm seu próprio código na tabela Unicode. Mas nem todos eles, porque existem muitas combinações possíveis.

Para auxiliar composições arbitrárias, o padrão Unicode nos permite usar vários caracteres Unicode: o caractere base seguido por um ou vários caracteres "marca" que o "decoram".

Por exemplo, se tivermos `S` seguido pelo caractere especial "ponto acima" (código `\u0307`), ele será mostrado como Ṡ.

```js run
alert( 'S\u0307' ); // Ṡ
```
Se precisarmos de uma marca adicional acima da letra (ou abaixo dela) -- sem problemas, apenas adicione o caractere de marca necessário.

Por exemplo, se anexarmos o caractere "ponto abaixo" (código `\u0323`), então teremos "S com pontos acima e abaixo": `Ṩ`.

Por exemplo:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```
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

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // verdadeiro
```

Na realidade, isso nem sempre é o caso. O motivo é que o símbolo `Ṩ` é "comum o suficiente", então os criadores do Unicode o incluíram na tabela principal e deram o código.

Se você deseja aprender mais sobre regras de normalização e variantes -- elas são descritas no apêndice do padrão Unicode: [Unicode Normalization Forms](https://www.unicode.org/reports/tr15/), mas para a maioria dos propósitos práticos a informação desta seção é suficiente.
