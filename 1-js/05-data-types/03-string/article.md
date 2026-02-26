# Strings

Em JavaScript, os dados textuais são armazenados como strings. Não há um tipo separado para um único caractere.

O formato interno para strings é sempre [UTF-16](https://en.wikipedia.org/wiki/UTF-16), isso não está relacionado com a codificação da página.

## Aspas

Vamos recapitular os tipos de aspas.

Strings podem ser delimitadas por aspas simples, aspas duplas ou crases (acento grave):

```js
let single = 'aspas simples';
let double = "aspas duplas";

let backticks = `crases`;
```

Aspas simples e duplas são essencialmente a mesma coisa. Crases, no entanto, nos permite incorporar (interpolar) qualquer expressão na string, colocando-a dentro de `${…}`:

```js run
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

Outra vantagem de usar crases é que elas permitem que uma string ocupe múltiplas linhas:

```js run
let guestList = `Guests:
 * John
 * Pete
 * Mary
`;

alert(guestList); // uma lista de convidados, múltiplas linhas
```

Parece natural, certo? Mas aspas simples ou duplas não funcionam dessa maneira.

Se nós as usarmos e tentarmos utilizar múltiplas linhas, haverá um erro:

```js run
let guestList = "Guests: // Error: Unexpected token ILLEGAL
  * John";
```

Aspas simples e duplas vêm de tempos antigos da criação da linguagem, quando a necessidade por strings em múltiplas linhas não era levada em conta. Crases surgiram bem mais tarde e, assim, são mais versáteis.

Crases também nos permite especificar uma "template function" antes da primeira crase. A sintaxe é: <code>func&#96;string&#96;</code>. A função `func` é chamada automaticamente, recebe a string e as expressões incorporadas e pode as processar. Esse recurso é chamado de "tagged templates", raramente visto, mas você pode ler mais sobre em MDN: [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

## Caracteres especiais

Ainda é possível criar strings em múltiplas linhas com aspas simples e duplas apenas usando o chamado "caractere de nova linha", escrito como `\n`, que representa uma quebra de linha:

```js run
let guestList = "Guests:\n * John\n * Pete\n * Mary";

alert(guestList); // uma lista de convidados em múltiplas linhas, como acima
```

Como um exemplo simplório, estas duas linhas são iguais, apenas escritas diferentemente:

```js run
let str1 = "Hello\nWorld"; // duas linhas usando um "caractere de nova linha"

// duas linhas usando uma nova linha normalmente e crases
let str2 = `Hello
World`;

alert(str1 == str2); // true
```

Existem outros, menos comuns, caracteres especiais:

| Caractere | Descrição |
|-----------|-------------|
|`\n`|Nova linha|
|`\r`|Nos arquivos de texto do Windows uma combinação de dois caracteres `\r\n` representam uma nova quebra, enquanto em SOs não Windows é apenas `\n`. Isso se dá por razões históricas, a maioria dos programas no Windows também compreendem `\n`. |
|`\'`,&nbsp;`\"`,&nbsp;<code>\\`</code>| Aspas |
|`\\`|Barra invertida|
|`\t`|Tab|
|`\b`, `\f`, `\v`| Backspace, Quebra de página(Form Feed) e Barra vertical -- Mencionados para fins de completude, advindos de tempos antigos, não utilizadas atualmente (pode esquecê-los nesse momento) |

Como você pode ver, todos os caracteres especiais começam com o caractere de barra invertida. Também chamado de "caractere de escape".

Por ser tão especial, se precisarmos mostrar uma barra invertida real `\` dentro da string, precisamos duplicá-la:

```js run
alert( `The backslash: \\` ); // A barra invertida: \
```

As chamadas aspas "escapadas" `\'`, `\"`, <code>\\`</code> são usadas para adicionar aspas do mesmo tipo da utilizada na delimitação da string.

Por exemplo:

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

Como você pode ver, temos que adicionar a barra invertida `\'` antes da aspa interna, caso contrário ela indicaria o fim da string.

Claro, apenas as aspas do mesmo tipo utilizadas como delimitador precisam ser "escapadas". Então, como uma solução mais elegante, podemos trocar por aspas duplas ou crases

```js run
alert( "I'm the Walrus!" ); // I'm the Walrus!
```

Apesar desses caracteres especiais, também há uma notação especial para códigos Unicode `\u…`, é raramente utilizada e é abordada no capítulo opcional sobre [Unicode](info:unicode).

## comprimento de string

A propriedade `length` contém o tamanho da string:

```js run
alert( `My\n`.length ); // 3
```

Note que `\n` é um único caractere "especial", então por isso o tamanho é na verdade `3`.

```warn header="`length` é uma propriedade"
Pessoas com alguma experiência em outras linguagens podem errar por chamar `str.length()` ao invés de apenas `str.length`. Isso não funciona.

Veja, por favor, que `str.length` é uma propriedade numérica, não uma função. Não há necessidade  de utilizar parênteses após a chamada. Não `.length()`, mas sim `.length`.
```

## Acessando Caracteres

Para acessar um caractere na posição `pos`, use colchetes `[pos]` ou chame o método [str.at(pos)](mdn:js/String/at). O primeiro caractere  se encontra na posição zero:

```js run
let str = `Hello`;

// o primeiro caractere
alert( str[0] ); // H
alert( str.at(0) ); // H

// o último caractere
alert( str[str.length - 1] ); // o
alert( str.at(-1) );
```

Como você pode ver, o método `.at(pos)` tem o benefício de permitir posições negativas. Se `pos` é negativo, então a contagem começará do fim da string.

Assim `.at(-1)`remete ao último caractere, `.at(-2)` remete ao antepenúltimo, e assim por diante.

Os colchetes sempre retornam `undefined` para índices negativos, por exemplo:

```js run
let str = `Hello`;

alert( str[-2] ); // undefined
alert( str.at(-2) ); // l
```

Também podemos iterar pelos caracteres usando `for..of`:

```js run
for (let char of "Hello") {
  alert(char); // H,e,l,l,o (char vira "H", então "e", então "l" etc)
}
```

## Strings são imutáveis

Strings não podem ser mudadas em JavaScript. É impossível mudar um caractere.

Vamos tentar isso para demonstrar que não funciona:

```js run
let str = 'Hi';

str[0] = 'h'; // error
alert( str[0] ); // não funciona
```

A maneira comum é criar toda uma nova string e atribuí-la a `str` ao invés da antiga.

Por exemplo:

```js run
let str = 'Hi';

str = 'h' + str[1]; // substitui a string

alert( str ); // hi
```

Nas seções posteriores veremos mais exemplos disso.

## Alterando entre maiúscula e minúscula

Métodos [toLowerCase()](mdn:js/String/toLowerCase) e [toUpperCase()](mdn:js/String/toUpperCase) alteram a caixa do caractere:

```js run
alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface
```

Ou, se quisermos que apenas uma letra fique minúscula:

```js run
alert( 'Interface'[0].toLowerCase() ); // 'i'
```

## Procurando por uma substring

Existem muitas maneiras de procurar por uma substring dentro de uma string.

### str.indexOf

O primeiro método é [str.indexOf(substr, pos)](mdn:js/String/indexOf).

O método procura a `substr` na `str`, começando da posição dada em `pos`,  e retorna a posição em que foi encontrada ou retorna `-1` se nada for encontrado.

Por exemplo:

```js run
let str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0, porque 'Widget' encontra-se no começo
alert( str.indexOf('widget') ); // -1, não encontrado, a procura é sensível à forma

alert( str.indexOf("id") ); // 1, "id" encontra-se na posição 1 (..idget complementa o id)
```

O segundo parâmetro opcional permite-nos começar procurando da posição dada.

Por exemplo, a primeira ocorrência de `"id"` é na posição `1`. Para encontrar a próxima ocorrência, vamos começar a procurar da posição `2`:

```js run
let str = 'Widget with id';

alert( str.indexOf('id', 2) ) // 12
```

Se estivermos interessados por todas as ocorrências, podemos chamar `indexOf` em um loop. Toda nova chamada é feita com a posição posterior ao último encontro:

```js run
let str = 'As sly as a fox, as strong as an ox';

let target = 'as'; // Vamos procurar por isso

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Found at ${foundPos}` );
  pos = foundPos + 1; // continue a procura a partir da próxima posição
}
```

O mesmo algoritmo pode ser organizado de maneira mais curta:

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
Também há um método similar [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf) que procura do fim da string ao seu começo.

Isso listaria as ocorrências na ordem inversa.
```

Existe um pequeno inconveniente com `indexOf` em uma condicional `if`. We can't put it in the `if`. Não podemos inserí-lo assim:

```js run
let str = "Widget with id";

if (str.indexOf("Widget")) {
    alert("We found it"); // Não funciona!
}
```

O `alert` no exemplo acima não é mostrado porque `str.indexOf("Widget")` retorna `0` (significando que foi encontrado na posição de início). Certo, mas `if` considera `0` como `false`.

Então, devemos checar através do `-1`, dessa forma:

```js run
let str = "Widget com id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("We found it"); // agora funciona!
}
```

### includes, startsWith, endsWith

O método mais moderno [str.includes(substr, pos)](mdn:js/String/includes) retorna `true/false` a depender se a `str` contém a `substr` dentro.

É a escolha correta se precisamos checar para o encontro, mas não precisamos da sua posição:

```js run
alert( "Widget with id".includes("Widget") ); // true

alert( "Hello".includes("Bye") ); // false
```

The optional second argument of `str.includes` is the position to start searching from:

```js run
alert( "Widget".includes("id") ); // true
alert( "Widget".includes("id", 3) ); // false, a partir da posição 3 não há "id"
```

Os métodos [str.startsWith](mdn:js/String/startsWith) e [str.endsWith](mdn:js/String/endsWith) fazem exatamente o que dizem.

```js run
alert( "*!*Wid*/!*get".startsWith("Wid") ); // true, "Widget" começa com "Wid"
alert( "Wid*!*get*/!*".endsWith("get") ); // true, "Widget" termina com "get"
```

## Obtendo uma string

Existem 3 métodos em JavaScript para obter uma substring: `substring`, `substr` e `slice`.

`str.slice(start [, end])`
: Retorna a parte da string do começo `start` até (mas não incluindo) o `end`.

    Por exemplo:

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin', a substring do 0 ao 5 (sem incluir o 5)
    alert( str.slice(0, 1) ); // 's', do 0 ao 1, mas sem incluir o 1, então apenas o caractere do 0
    ```

    Se não houver um segundo argumento, então slice irá até o final da string:

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // 'ringify', da segunda posição até o final
    ```

    Valores negativos para `start/end` também são possíveis. Valores assim significam que a posição será contada a partir do final da string:

    ```js run
    let str = "strin*!*gif*/!*y";

    // start na quarta posição a partir da direita e end na primeira posição a partir da direita
    alert( str.slice(-4, -1) ); // 'gif'
    ```

`str.substring(start [, end])`
: Retorna a parte da *entre* `start` e `end` (não incluindo `end`).

    Isso é quase a mesma coisa que `slice`, mas esse método permite que `start` seja maior que `end` (nesse caso os valores de `start` e `end` são simplesmente trocados um pelo outro).

    Por exemplo:

    ```js run
    let str = "st*!*ring*/!*ify";

    // estes são iguais para substring
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...mas não para slice:
    alert( str.slice(2, 6) ); // "ring" (mesma coisa)
    alert( str.slice(6, 2) ); // "" (uma string vazia)

    ```

    Argumentos negativos (a não ser em slice) não são suportados, sendo tratados como `0`.

`str.substr(start [, length])`
: Retorna a parte da string a partir do `start`, com o `length` (comprimento) fornecido.

    Ao contrário dos métodos anteriores, esse nos permite especificar o `length` no lugar da posição final:

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // 'ring', a partir da segunda posição com 4 caracteres
    ```

    O primeiro argumento pode ser negativo para contar a posição a partir do final:

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // 'gi', a partir da quarta posição inversa com 2 caracteres
    ```

    Esse método reside no [Annex B](https://tc39.es/ecma262/#sec-string.prototype.substr) da especificação da linguagem. Isso significa que apenas engines de JavaScript hospedados em navegadores devem suportá-lo. Na prática, é suportado em todo lugar.

Vamos recapitular esses métodos para evitar qualquer confusão:

| método | seleciona... | negativos |
|--------|-----------|-----------|
| `slice(start, end)` | de `start` a `end` (sem incluir `end`) | permite negativos |
| `substring(start, end)` | entre `start` e `end` (sem incluir `end`) | valores negativos recebem `0` |
| `substr(start, length)` | de `start` com `length` caracteres | permite negativos em `start` |

```smart header="Qual deles escolher?"
Todos eles podem fazer o trabalho. Formalmente, `substr` tem uma pequena desvantagem: não está descrita na especificação principal do JavaScript, mas sim no Annex B, que cobre apenas funcionalidades do navegador principalmente por motivos históricos. Então, ambientes fora dos navegadores podem falhar no suporte a essa funcionalidade. Mas, na prática funciona em qualquer lugar.

Das outras duas variantes, `slice` é um pouco mais flexível, permitindo argumentos negativos e mais curto de escrever.

Então, para usos práticos é suficiente guardar apenas lembrar-se de `slice`.
```

## Comparando strings

Como vimos no capítulo <info:comparison>, strings são comparadas caractere-por-caractere em ordem alfabética.

Entretanto, existem algumas peculiaridades..

1. Uma letra minúscula é sempre menor que uma maiúscula:

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. Letras com sinais diacríticos são "quebrados":

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

    Isso talvez gere resultados estranhos se tentarmos ordenar esses nomes de países. Pessoas normalmente esperariam que `Zealand` viria depois de `Österreich` na lista.

Para entender porque isso acontece, deveríamos ser avisados que strings em JavaScript são codificadas usando [UTF-16](https://en.wikipedia.org/wiki/UTF-16). Isso é: cada caractere tem um código numérico correspondente.

Existem métodos especiais que nos permitem acessar o caractere pelo seu código e vice-versa:

`str.codePointAt(pos)`
: Retorna um número em sistema decimal representando o código para o caractere na posição `pos`:

    ```js run
    // letras maiúsculas e minúsculas têm códigos diferentes
    alert( "Z".codePointAt(0) ); // 90
    alert( "z".codePointAt(0) ); // 122
    alert( "z".codePointAt(0).toString(16) ); // 7a (se precisarmos de um valor hexadecimal)
    ```

`String.fromCodePoint(code)`
: Cria um caractere através do seu código (`code`) numérico.

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    alert( String.fromCodePoint(0x5a) ); // Z (podemos também usar um valor hexadecimal como argumento)
    ```

Agora vamos ver os caracteres com os códigos `65..220` (o alfabeto latino e um pouco mais) fazendo uma string como eles.

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// Output:
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

Vê? Letras maiúsculas vão primeiro, então alguns caracteres especiais, então letras minúsculas e `Ö` perto do final do output

Agora fica óbvio porque `a > Z`.

Os caracteres são comparados através do seu código numérico. Maior código significa caractere maior. O código para `a` (97) é maior que o código para `Z` (90).

- Todas as letras minúsculas vão depois das letras maiúsculas pois seus códigos são maiores.
- Alguma letras como `Ö` residem aparte do alfabeto principal. Nesse sentido, seu código é maior que qualquer coisa do `a` ao `z`.

### Comparações corretas [#correct-comparisons]

O algoritmo "certo" para fazer uma comparação de strings é mais complexo do que pode parecer, isso porque alfabetos são diferentes para idiomas diferentes.

Então, o navegador precisa saber o idioma para comparar.

Felizmente, navegadores modernos suportam o padrão de internacionalização [ECMA-402](https://www.ecma-international.org/publications-and-standards/standards/ecma-402/).

Ela provém um método especial para comparar strings em idiomas diferentes, seguindo suas regras internas.

A chamada [str.localeCompare(str2)](mdn:js/String/localeCompare) retorna um inteiro indicando se `str` é menor, igual ou maior que `str2` de acordo com as regras do idioma:

- Retorna um número negativo se `str` é menor que `str2`.
- Retorna um número positivo se `str` é maior que `str2`.
- Retorna `0` se eles forem equivalentes.

Por exemplo:

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

Esse método na verdade tem dois argumentos adicionais especificados na [documentação](mdn:js/String/localeCompare), que permite especificar o idioma (por padrão sendo pego pelo ambiente, a ordem das letras depende do idioma) e pôr regras extras como sensibilidade à maiúsculo e minúsculo ou ter que tratar `"a"` e `"á"` como iguais, etc.

## Resumo

- Existem três tipos de aspas. Crases permitem uma string ser colocada em múltiplas linhas e interpolar expressões `${…}`.
- Nós podemos usar caracteres especiais, como quebra de linha `\n`.
- Para acessar um caractere, use: método `[]` ou `at`.
- Para acessar uma substring, use: `slice` ou `substring`.
- Para alterar as strings entre minúsculas/maiúsculas, use: `toLowerCase/toUpperCase`.
- Para procurar por uma substring, use: `indexOf`, ou `includes/startsWith/endsWith` para checagens simples.
- Para comparar strings de acordo com o idioma, use: `localeCompare`, caso contrário serão comparadas usando seus códigos de caracteres.

Existem mais diversos métodos úteis em strings:

- `str.trim()` -- remove ("aparas") espaços do começo e do fim da string.
- `str.repeat(n)` -- repete a string `n` vezes.
- ...e mais a ser visto no [manual](mdn:js/String).

Strings também têm métodos para fazer procura/substituição com expressões regulares (Regex). Mas isso é um assunto extenso, então está explicado numa seção separada de tutoriais <info:regular-expressions>.

Também, é importante saber que as strings são baseadas na codificação Unicode e, por isso, existem problemas com comparações. Há mais sobre Unicode no capítulo <info:unicode>.
