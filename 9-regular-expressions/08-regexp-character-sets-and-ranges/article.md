# Conjuntos e alcances [...]

Caracteres ou classes de caracteres dentro de colchetes `[…]` significam "Corresponda com qualquer caractere dentre os fornecidos".

## Conjuntos

O padrão `pattern:[eao]`, por exemplo, corresponde com qualquer um dos 3 caracteres: `'a'`, `'e'`, or `'o'`.

Isso é chamado de *conjunto*. Conjuntos podem ser usados numa regex como qualquer outro caractere normal:

```js run
// Case [t ou m], e então "op"
alert( "Mop top".match(/[tm]op/gi) ); // "Mop", "top"
```

Repare que mesmo que um conjunto possua múltiplos caracteres, ele corresponde a apenas um caractere por vez.

Dessa maneira, o exemplo abaixo não corresponde com nada:

```js run
// Case com "V", depois [o ou i], e então "la"
alert( "Voila".match(/V[oi]la/) ); // null, nenhuma correspondência
```

O padrão está procurando por:

- `pattern:V`,
- seguido de apenas *uma* das letras `pattern:[oi]`,
- seguido de `pattern:la`.

Então casaríamos com `match:Vola` ou `match:Vila`.

## Alcances

Colchetes também podem conter *alcances de caracteres*.

Por exemplo, `pattern:[a-z]` é qualquer caractere entre `a` e `z`, e `pattern:[0-5]` é qualquer dígito entre `0` e `5`.

No exemplo abaixo estamos buscado por um `"x"` seguido de dois dígitos ou letras de `A` a `F`:

```js run
alert( "Exception 0xAF".match(/x[0-9A-F][0-9A-F]/g) ); // xAF
```

O padrão `pattern:[0-9A-F]` tem dois alcances: Ele casa com dígitos de `0` a `9` ou uma letra de `A` a `F`.

Se quisermos casar com letras minúsculas também, podemos adicionar o alcance `a-f` (`pattern:[0-9A-Fa-f]`), ou adicionar a flag `pattern:i`.

Também podemos usar classes de caracteres dentro do `[…]`.

Se quisermos, por exemplo, casar com um caractere "de palavra" `pattern:\w` ou um hífen `pattern:-`, o conjunto fica `pattern:[\w-]`

Também é possível combinar várias classes; o padrão `pattern:[\s\d]`, por exemplo, significa "um caractere de espaço ou um dígito".

```smart header="Classes de caracteres são atalhos para certos conjuntos de caracteres"
Por exemplo:

- **\d** -- é o mesmo padrão que `pattern:[0-9]`,
- **\w** -- é o mesmo padrão que `pattern:[a-zA-Z0-9_]`,
- **\s** -- é o mesmo padrão que `pattern:[\t\n\v\f\r ]`, com a adição de mais alguns caracteres Unicode de espaço raros.
```

### Exemplo: \w multilinguagens

Como a classe de caracteres `pattern:\w` é um atalho para `pattern:[a-zA-Z0-9_]`, ele não casa com ideogramas, letras cirílicas, etc.

Nós podemos escrever um padrão mais universal, que casa com caracteres usados em palavras de qualquer língua. Fica fácil usando propriedades Unicode: `pattern:[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]`.

Vamos decifrar o padrão. Similarmente ao `pattern:\w`, estamos criando nosso próprio conjunto que inclui caracteres com as seguintes propriedades Unicode:

- `Alphabetic` (`Alpha`) - para letras,
- `Mark` (`M`) - para acentos,
- `Decimal_Number` (`Nd`) - para dígitos,
- `Connector_Punctuation` (`Pc`) - para o *underscore* `'_'` e caracteres similares,
- `Join_Control` (`Join_C`) - para dois códigos especiais, `200c` e `200d`, usados em ligaturas Árabes, por exemplo.

Vejamos um caso de uso:

```js run
let regexp = /[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/gu;

let str = `Hi 你好 12`;

// Encontra todas as letras e dígitos:
alert( str.match(regexp) ); // H,i,你,好,1,2
```

E claro, podemos mudar esse padrão adicionando ou removendo propriedades Unicode. Propriedades Unicode são discutidas em maior profundidade no artigo <info:regexp-unicode>.

```warn header="Propriedades Unicode não são suportadas no IE"
Propriedades Unicode `pattern:p{…}` não são implementadas no Internet Explorer. Se for realmente necessário dar suporte ao navegador, pode-se usar uma biblioteca como a [XRegExp](https://xregexp.com/).

Outra opção é utilizar alcances de caracteres da língua relevante, como `pattern:[а-я]` para o alfabeto cirílico, por exemplo.
```

## Alcances negados

Além dos alcances normais, existem os alcances negados que usam a sintaxe `pattern:[^…]`.

Eles são demarcados pelo acento circunflexo `^` no começo e casam com qualquer caractere *exceto os incluídos no alcance* 

Por exemplo:

- `pattern:[^aeyo]` -- casa qualquer caractere exceto  `'a'`, `'e'`, `'y'` e `'o'`.
- `pattern:[^0-9]` -- casa qualquer caractere exceto um dígito, equivalente ao `pattern:\D`.
- `pattern:[^\s]` -- casa qualquer caractere que não seja um espaço em branco, equivalente ao `\S`.

O exemplo abaixo busca por qualquer caractere que não seja uma letra, um dígito ou um espaço:

```js run
alert( "alice15@gmail.com".match(/[^\d\sA-Z]/gi) ); // @ e .
```

## Escapes dentro do […]

Normalmente quando queremos encontrar um caractere especial precisamos escapá-lo com a contrabarra `pattern:\.`. Se precisamos casar com uma contrabarra, escapamos ela também (`pattern:\\`), e assim por diante

Dentro de colchetes podemos usar a grande maioria de caracteres especiais sem nenhum escape:

- Os símbolos `pattern:. + ( )` nunca precisam de escape.
- Um hífen `pattern:-` não precisa ser escapado se estiver no começo ou no final do conjunto(onde ele não define nenhum alcance).
- O acento circunflexo `pattern:^` só precisa ser escapado caso seja o primeiro elemento do conjunto (onde ele sinaliza a negação do conjunto).
- O colchete direito `pattern:]` sempre deve ser escapado (caso precisemos buscar por ele).

Em outras palavras, todos os caracteres especiais podem ser usados sem escapes, exceto nos casos onde eles modificam o comportamento do conjunto em si.

O ponto `.` dentro de um conjunto representa um ponto literal. O padrão `pattern:[.,]` casa com um ponto ou uma vírgula.

No exemplo abaixo, a expressão `pattern:[-().^+]` casa com qualquer um dos caracteres `-().^+`:

```js run
// Não é necessário escapar nada
let regexp = /[-().^+]/g;

alert( "1 + 2 - 3".match(regexp) ); // Casa com +, -
```

...Mas caso você queira escapar "só para garantir", o efeito é o mesmo:

```js run
// Tudo escapado
let regexp = /[\-\(\)\.\^\+]/g;

alert( "1 + 2 - 3".match(regexp) ); // Também casa: +, -
```

## Alcances e a flag "u"

Se existem pares substitutos no conjunto, a flag `pattern:u` é obrigatória para garantir seu funcionamento correto.

No exemplo abaixo queremos casar com o padrão `pattern:[𝒳𝒴]` na string `subject:𝒳`:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/) ); // Mostra um caractere estranho, como um [?]
// (A pesquisa não teve sucesso, retornamos apenas metade de um caractere)
```

O resultado está errado, já que a a expressão regular "não enxerga" o par substituto.

O interpretador de expressões regulares pensa que o conjunto `[𝒳𝒴]` contém quatro caracteres, não dois:

1. Metade esquerda do `𝒳` `(1)`,
2. Metade direita do `𝒳` `(2)`,
3. Metade esquerda do `𝒴` `(3)`,
4. Metade direita do `𝒴` `(4)`.

Podemos ler seus códigos dessa maneira:

```js run
for(let i=0; i<'𝒳𝒴'.length; i++) {
  alert('𝒳𝒴'.charCodeAt(i)); // 55349, 56499, 55349, 56500
};
```

Por conta disso, o exemplo acima casa apenas com a metade esquerda do `𝒳`.

Agora, se adicionarmos a flag `pattern:u`, o comportamento é o esperado:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/u) ); // 𝒳
```

Uma situação parecida acontece quando estamos buscando por um alcance, como `[𝒳-𝒴]`.

Se não usarmos a flag `pattern:u`, um erro ocorre:

```js run
'𝒳'.match(/[𝒳-𝒴]/); // Error: Invalid regular expression (Expressão regular inválida)
```

Isso ocorre porque sem a flag `pattern:u`, pares substitutos são percebidos como dois caracteres separados, então o alcance `[𝒳-𝒴]` é interpretado como `[<55349><56499>-<55349><56500>]` (cada par substituto é substituído pelos seus códigos constituintes). Dessa forma é fácil perceber que o alcance `56499-55349` é inválido: Seu código inicial `56499` é maior que seu código final, `55349`, causando o erro.

Com a flag `pattern:u`, entretanto, o padrão funciona como esperado:

```js run
// Case com caracteres entre 𝒳 e 𝒵
alert( '𝒴'.match(/[𝒳-𝒵]/u) ); // 𝒴
```
