# Unicode: flag "u" e classe \p{...}

O JavaScript usa a [codificação Unicode](https://pt.wikipedia.org/wiki/Unicode) para strings. A maioria dos caracteres são codificados com 2 bytes, mas isso permite representar no máximo 65536 caracteres diferentes.

Esse alcance não é grande o bastante para codificar todos os caracteres possíveis, por isso alguns caracteres são codificados com 4 bytes, como o `𝒳` (X matemático) ou o `😄` (emoji sorridente), alguns ideogramas e assim por diante.

Aqui estão os códigos Unicode de alguns caracteres:

| Carácter | Unicode   | Tamanho em bytes do caractere em Unicode |
| -------- | --------- | ---------------------------------------- |
| a        | `0x0061`  | 2                                        |
| ≈        | `0x2248`  | 2                                        |
| 𝒳        | `0x1d4b3` | 4                                        |
| 𝒴        | `0x1d4b4` | 4                                        |
| 😄       | `0x1f604` | 4                                        |

Note que caracteres como `a` e `≈` ocupam 2 bytes, enquanto os códigos para `𝒳`, `𝒴` e `😄` são maiores, e ocupam 4 bytes.

Há muito tempo atrás, quando o JavaScript foi criado, a codificação Unicode era mais simples: não haviam caracteres de 4 bytes. Então, algumas funcionalidades da linguagem ainda lidam com estes incorretamente.

Por exemplo, o método `length` pensa que aqui há dois caracteres:

```js run
alert("😄".length); // 2
alert("𝒳".length); // 2
```

...Mas nós podemos ver que há apenas um, certo? O ponto é que o método `length` trata 4 bytes como dois caracteres de 2 bytes. Isso está errado, porque eles devem ser somente considerados juntos (os chamados "pares substitutos", você pode ler mais sobre eles no artigo <info:string>).

Por padrão, expressões regulares também tratam "caracteres compridos" de 4 bytes como um par de caracteres de 2 bytes. E, da mesma maneira que acontece com strings, isso pode levar a resultados estranhos. Veremos isso mais adiante, no artigo <info:regexp-character-sets-and-ranges>.

Diferente de strings, expressões regulares têm a flag `pattern:u` que resolve tais problemas. com essa flag, uma regexp lida com caracteres de 4 bytes corretamente. Busca por propriedades do Unicode também se torna disponível, abordaremos o assunto a seguir.

## Propriedades Unicode \p{...}

Cada caractere no Unicode tem diversas propriedades. Elas descrevem a "categoria" a qual o caractere pertence, e contém informações miscelâneas sobre ele.

Por exemplo, se um caractere possui a propriedade `Letter`, isso significa que o caractere pertence a um alfabeto (de qualquer língua). A propriedade `Number` indica que é um dígito: talvez Árabe ou Chinês, e assim por diante.

Podemos buscar por caracteres baseado em suas propriedades, escrito como `pattern:\p{…}`. Para usar o `pattern:\p{…}`, a expressão regular deve possuir a flag `pattern:u`.

Por exemplo, `\p{Letter}` denota uma letra em qualquer língua. Também podemos usar `\p{L}`, já que `L` é um apelido (do Inglês: _alias_) de `Letter`. Existem apelidos curtos para quase todas as propriedades.

No exemplo abaixo três tipos de letras serão encontrados: Inglês, Georgiano e Coreano.

```js run
let str = "A ბ ㄱ";

alert(str.match(/\p{L}/gu)); // A,ბ,ㄱ
alert(str.match(/\p{L}/g)); // null (nenhuma correspondência, \p não funciona sem a flag "u")
```

Estas são as principais categorias de caracteres e suas sub-categorias:

- Letra (Letter) `L`:
  - minúscula `Ll`
  - modificadora `Lm`,
  - titular `Lt`,
  - maiúscula `Lu`,
  - outra `Lo`.
- Número (Number) `N`:
  - dígito decimal `Nd`,
  - letras numéricas `Nl`,
  - outro `No`.
- Pontuação (Punctuation) `P`:
  - conector `Pc`,
  - traço `Pd`,
  - aspas esquerdas `Pi`,
  - aspas direitas `Pf`,
  - abertura `Ps`,
  - fechamento `Pe`,
  - outro `Po`.
- Marcações Diacríticas (Mark) `M`:
  - com espaço `Mc`,
  - envolvente `Me`,
  - sem espaço `Mn`.
- Símbolos (Symbol) `S`:
  - moeda `Sc`,
  - modificador `Sk`,
  - matemático `Sm`,
  - outro `So`.
- Separadores (Separator) `Z`:
  - linha `Zl`,
  - parágrafo `Zp`,
  - espaço `Zs`.
- Outros (Other) `C`:
  - controle `Cc`,
  - formato `Cf`,
  - não atribuído `Cn`,
  - uso reservado `Co`,
  - substituto `Cs`.

Então, se precisarmos de letras minúsculas por exemplo, podemos escrever `pattern:\p{Ll}`, símbolos de pontuação: `pattern:\p{P}` e assim por diante.

Existem outras categorias derivadas, como:

- `Alphabetic` (`Alpha`), inclui a categoria "Letters" `L`, e letras numéricas `Nl` (Exemplo: Ⅻ - Um caractere para o número romano 12), além de alguns outros símbolos `Other_Alphabetic` (`OAlpha`).
- `Hex_Digit` inclui dígitos hexadecimais: `0-9`, `a-f`.
- ...E assim por diante.

O Unicode suporta muitas propriedades diferentes, e a lista completa precisaria de muito espaço, então aqui estão as referências:

- Lista de todas as propriedades por caractere: <https://unicode.org/cldr/utility/character.jsp>.
- Lista de todos os caracteres por propriedade: <https://unicode.org/cldr/utility/list-unicodeset.jsp>.
- Apelidos curtos das propriedades: <https://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt>.
- A base completa dos caracteres Unicode em formato textual, com todas as suas propriedades, está aqui: <https://www.unicode.org/Public/UCD/latest/ucd/>.

### Exemplo: Números hexadecimais

Para este exemplo, vamos procurar por números hexadecimais, escritos como `xFF`, onde `F` é um dígito hexadecimal (0..9 ou A..F).

Um dígito hexadecimal pode ser indicado por `pattern:\p{Hex_Digit}`:

```js run
let regexp = /x\p{Hex_Digit}\p{Hex_Digit}/u;

alert("number: xAF".match(regexp)); // xAF
```

### Exemplo: Sinogramas Chineses

Vamos procurar por sinogramas chineses.

Há uma propriedade Unicode chamada `Script` (sistema de escrita), que pode receber diferentes valores: `Cyrillic` (Cirílico: Russo, Ucraniano, Sérvio), `Greek` (Grego), `Arabic` (Árabe), `Han` (Chinês) e assim por diante, [a lista completa pode ser encontrada aqui](<https://en.wikipedia.org/wiki/Script_(Unicode)>).

Para procurar por caracteres de um sistema de escrita específico nós devemos usar o `pattern:Script=<value>`. Para buscar letras cirílicas, por exemplo: `pattern:\p{sc=Cyrillic}`, para sinogramas chineses: `pattern:\p{sc=Han}`, e assim por diante:

```js run
let regexp = /\p{sc=Han}/gu; // retorna sinogramas chineses

let str = `Hello Привет 你好 123_456`;

alert(str.match(regexp)); // 你,好
```

### Exemplo: Moeda

Caracteres que representam uma moeda, como `$`, `€`, `¥`, possuem a propriedade Unicode `pattern:\p{Currency_Symbol}`, de apelido: `pattern:\p{Sc}`.

Vamos usá-la para procurar por preços no formato "símbolo de moeda, seguido de um dígito":

```js run
let regexp = /\p{Sc}\d/gu;

let str = `Prices: $2, €1, ¥9`;

alert(str.match(regexp)); // $2,€1,¥9
```

Mais adiante, no artigo <info:regexp-quantifiers> veremos como procurar por números que contém vários dígitos.

## Sumário

A flag `pattern:u` ativa o suporte ao Unicode em expressões regulares.

Isso resulta em duas coisas:

1. Caracteres de 4 bytes são reconhecidos corretamente: como um único caractere, não dois caracteres de 2 bytes.
2. Propriedades Unicode podem ser usadas na busca, usando `\p{…}`.

Com as propriedades Unicode podemos buscar por palavras em línguas específicas, caracteres especiais (aspas, símbolos de moeda) e assim por diante.
