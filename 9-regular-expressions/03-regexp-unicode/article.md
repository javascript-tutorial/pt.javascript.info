# Unicode: flag "u" e classe \p{...}

O JavaScript usa a [codificação Unicode](https://pt.wikipedia.org/wiki/Unicode) para strings. A maioria dos caracteres são codificados com 2 bytes, mas isso só permite representar no máximo 65536 caracteres diferentes.

Esse alcance não é grande o bastante para codificar todos os caracteres possíveis, por isso alguns caracteres são codificados com 4 bytes, como o `𝒳` (X matemático) ou o `😄` (emoji sorridente), alguns hieróglifos e assim por diante.

Aqui estão os valores no Unicode de alguns caracteres:

| Carácter  | Unicode | Contagem de bytes no Unicode  |
|------------|---------|--------|
| a | `0x0061` |  2 |
| ≈ | `0x2248` |  2 |
|𝒳| `0x1d4b3` | 4 |
|𝒴| `0x1d4b4` | 4 |
|😄| `0x1f604` | 4 |

Note que caracteres como `a` e `≈` ocupam 2 bytes, enquanto os códigos para `𝒳`, `𝒴` e `😄` são maiores, e ocupam 4 bytes.

Há muito tempo atrás, quando o JavaScript foi criado, a codificação Unicode era mais simples: não haviam caracteres de 4 bytes. Então, algumas funcionalidades da linguagem ainda lidam com estes incorretamente.

Por exemplo, o método `length` pensa que aqui há dois caracteres:

```js run
alert('😄'.length); // 2
alert('𝒳'.length); // 2
```

...Mas nós podemos ver que há apenas um, certo? O ponto é que o método `length` trata 4 bytes como dois caracteres de 2 bytes. Isso está errado, porque eles devem ser somente considerados juntos (os chamados "pares de substitutos", você pode ler mais sobre eles no artigo <info:string>).

Por padrão, expressões regulares também tratam "caracteres compridos" de 4 bytes como um par de caracteres de 2 bytes. E, da mesma maneira que acontece com strings, isso pode levar a resultados estranhos. Veremos isso mais adiante, no artigo <info:regexp-character-sets-and-ranges>.

Diferente de strings, expressões regulares têm a flag `pattern:u` que resolve tais problemas. com essa flag, uma regexp lida com caracteres de 4 bytes corretamente. Busca por propriedades do Unicode também se torna disponível, abordaremos o assunto a seguir.

## Propriedades Unicode \p{...}

Cada carácter no Unicode tem diversas propriedades. Elas descrevem a "categoria" a qual o carácter pertence, e contém informações miscelâneas sobre ele.

Por exemplo, se um carácter possui a propriedade `Letter`, isso significa que o carácter pertence a um alfabeto (de qualquer língua). A propriedade `Number` indica que é um dígito: talvez Árabe ou Chinês, e assim por diante.

Podemos buscar por caracteres baseado em suas propriedades, escrito como `pattern:\p{…}`. Para usar o `pattern:\p{…}`, a expressão regular deve possuir a flag `pattern:u`.

Por exemplo, `\p{Letter}` denota uma letra em qualquer língua. Também podemos usar `\p{L}`, já que `L` é um apelido (do Inglês: _alias_) de `Letter`. Existem apelidos curtos para quase todas as propriedades.

No exemplo abaixo três tipos de letras serão encontrados: Inglês, Georgiano e Coreano.

```js run
let str = "A ბ ㄱ";

alert( str.match(/\p{L}/gu) ); // A,ბ,ㄱ
alert( str.match(/\p{L}/g) ); // null (nenhuma correspondência, \p não funciona sem a flag "u")
```

Estas são as principais categorias de caracteres e suas sub-categorias:

- Letra `L`:
  - minúscula `Ll`
  - modificadora `Lm`,
  - titular `Lt`,
  - maiúscula `Lu`,
  - outra `Lo`.
- Número `N`:
  - dígito decimal `Nd`,
  - letras numéricas `Nl`,
  - outro `No`.
- Pontuação `P`:
  - conector `Pc`,
  - traço `Pd`,
  - abertura de citação `Pi`,
  - fechamento de citação `Pf`,
  - abertura `Ps`,
  - fechamento `Pe`,
  - outro `Po`.
- Marcação `M` (diacríticos, etc.):
  - com espaço `Mc`,
  - envolvente `Me`,
  - sem espaço `Mn`.
- Símbolo `S`:
  - moeda `Sc`,
  - modificador `Sk`,
  - matemático `Sm`,
  - outro `So`.
- Separador `Z`:
  - linha `Zl`,
  - parágrafo `Zp`,
  - espaço `Zs`.
- Outro `C`:
  - controle `Cc`,
  - formato `Cf`,
  - não atribuído `Cn`,
  - uso reservado `Co`,
  - substituto `Cs`.


Então, se precisarmos de letras minúsculas por exemplo, podemos escrever `pattern:\p{Ll}`, símbolos de pontuação: `pattern:\p{P}` e assim por diante.

Existem outras categorias derivadas, como:
- `Alphabetic` (`Alpha`), inclui a categoria "Letters" `L`, e letras numéricas `Nl` (Exemplo: Ⅻ - Um carácter para o número romano 12), além de alguns outros símbolos `Other_Alphabetic` (`OAlpha`).
- `Hex_Digit` inclui dígitos hexadecimais: `0-9`, `a-f`.
- ...E assim por diante.

O Unicode suporta muitas propriedades diferentes, e a lista completa precisaria de muito espaço, então aqui estão as referências:

- Lista de todas as propriedades por carácter: <https://unicode.org/cldr/utility/character.jsp>.
- Lista de todos os caracteres por propriedade: <https://unicode.org/cldr/utility/list-unicodeset.jsp>.
- Apelidos curtos das propriedades: <https://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt>.
- A base completa dos caracteres Unicode em formato textual, com todas as suas propriedades, está aqui: <https://www.unicode.org/Public/UCD/latest/ucd/>.

### Example: hexadecimal numbers

For instance, let's look for hexadecimal numbers, written as `xFF`, where `F` is a hex digit (0..9 or A..F).

A hex digit can be denoted as `pattern:\p{Hex_Digit}`:

```js run
let regexp = /x\p{Hex_Digit}\p{Hex_Digit}/u;

alert("number: xAF".match(regexp)); // xAF
```

### Example: Chinese hieroglyphs

Let's look for Chinese hieroglyphs.

There's a Unicode property `Script` (a writing system), that may have a value: `Cyrillic`, `Greek`, `Arabic`, `Han` (Chinese) and so on, [here's the full list](https://en.wikipedia.org/wiki/Script_(Unicode)).

To look for characters in a given writing system we should use `pattern:Script=<value>`, e.g. for Cyrillic letters: `pattern:\p{sc=Cyrillic}`, for Chinese hieroglyphs: `pattern:\p{sc=Han}`, and so on:

```js run
let regexp = /\p{sc=Han}/gu; // returns Chinese hieroglyphs

let str = `Hello Привет 你好 123_456`;

alert( str.match(regexp) ); // 你,好
```

### Example: currency

Characters that denote a currency, such as `$`, `€`, `¥`, have Unicode property  `pattern:\p{Currency_Symbol}`, the short alias: `pattern:\p{Sc}`.

Let's use it to look for prices in the format "currency, followed by a digit":

```js run
let regexp = /\p{Sc}\d/gu;

let str = `Prices: $2, €1, ¥9`;

alert( str.match(regexp) ); // $2,€1,¥9
```

Later, in the article <info:regexp-quantifiers> we'll see how to look for numbers that contain many digits.

## Summary

Flag `pattern:u` enables the support of Unicode in regular expressions.

That means two things:

1. Characters of 4 bytes are handled correctly: as a single character, not two 2-byte characters.
2. Unicode properties can be used in the search: `\p{…}`.

With Unicode properties we can look for words in given languages, special characters (quotes, currencies) and so on.
