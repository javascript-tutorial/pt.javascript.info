<<<<<<< HEAD
# Classes de caracteres

Considere uma tarefa prática - temos um número de telefone como `"+7(903)-123-45-67"` e precisamos transformá-lo em números puros: `79031234567`.

Para fazer isso, podemos encontrar e remover qualquer coisa que não seja um número. Classes de personagens podem ajudar com isso.

Uma *classe de caracteres* é uma notação especial que corresponde a qualquer símbolo de um determinado conjunto.

Para começar, vamos explorar a classe "digit". Está escrito como `padrão: \d` e corresponde a "qualquer dígito único".

Por exemplo, vamos encontrar o primeiro dígito no número de telefone:
=======
# Character classes

Consider a practical task -- we have a phone number like `"+7(903)-123-45-67"`, and we need to turn it into pure numbers: `79031234567`.

To do so, we can find and remove anything that's not a number. Character classes can help with that.

A *character class* is a special notation that matches any symbol from a certain set.

For the start, let's explore the "digit" class. It's written as `pattern:\d` and corresponds to "any single digit".

For instance, the let's find the first digit in the phone number:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let str = "+7(903)-123-45-67";

let regexp = /\d/;

alert( str.match(regexp) ); // 7
```

<<<<<<< HEAD
Sem a flag `padrão:g`, a expressão regular procura apenas a primeira correspondência, que é o primeiro dígito `padrão:\d`.

Vamos adicionar a flag `padrão:g` para encontrar todos os dígitos:
=======
Without the flag `pattern:g`, the regular expression only looks for the first match, that is the first digit `pattern:\d`.

Let's add the `pattern:g` flag to find all digits:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let str = "+7(903)-123-45-67";

let regexp = /\d/g;

<<<<<<< HEAD
alert( str.match(regexp) ); // matriz de correspondências: 7,9,0,3,1,2,3,4,5,6,7

// vamos criar o número de telefone apenas com dígitos:
alert( str.match(regexp).join('') ); // 79031234567
```

Essa era uma classe de caracteres para dígitos. Existem outras classes de caracteres também.

As mais usadas são:

`padrão:\d` ("d" é de "digit")
: Um dígito: um caractere de `0` a `9`.

`padrão:\s` ("s" é de "space")
: Um símbolo de espaço: inclui espaços, tabulações `\t`, novas linhas `\n` e alguns outros caracteres raros, como `\v`, `\f` and `\r`.

`padrão:\w` ("w" é de "word")
: Um caractere de texto: uma letra do alfabeto latino ou um dígito ou um sublinhado `_`. Letras não latinas (como cirílico ou hindu) não pertecem ao `padrão:\w`.

Por exemplo, `padrão:\d\s\w` significa um "dígito" seguido de um "caractere de espaço" seguido de um "caractere de texto", como `correspondência:1 a`.

**Uma regexp pode conter símbolos regulares e classes de caracteres.**

Por exemplo, `padrão:CSS\d` corresponde a uma string `correspondência:CSS` com um dígito após:

```js run
let str = "Existe CSS4?";
=======
alert( str.match(regexp) ); // array of matches: 7,9,0,3,1,2,3,4,5,6,7

// let's make the digits-only phone number of them:
alert( str.match(regexp).join('') ); // 79031234567
```

That was a character class for digits. There are other character classes as well.

Most used are:

`pattern:\d` ("d" is from "digit")
: A digit: a character from `0` to `9`.

`pattern:\s` ("s" is from "space")
: A space symbol: includes spaces, tabs `\t`, newlines `\n` and few other rare characters, such as `\v`, `\f` and `\r`.

`pattern:\w` ("w" is from "word")
: A "wordly" character: either a letter of Latin alphabet or a digit or an underscore `_`. Non-Latin letters (like cyrillic or hindi) do not belong to `pattern:\w`.

For instance, `pattern:\d\s\w` means a "digit" followed by a "space character" followed by a "wordly character", such as `match:1 a`.

**A regexp may contain both regular symbols and character classes.**

For instance, `pattern:CSS\d` matches a string `match:CSS` with a digit after it:

```js run
let str = "Is there CSS4?";
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
let regexp = /CSS\d/

alert( str.match(regexp) ); // CSS4
```

<<<<<<< HEAD
Também podemos usar muitas classes de caracteres:

```js run
alert( "Eu amo HTML5!".match(/\s\w\w\w\w\d/) ); // ' HTML5'
```

A correspondência (cada classe de caracteres regexp possui o caractere de resultado correspondente):

![](love-html5-classes.svg)

## Classes inversas

Para cada classe de caractere existe uma "classe inversa", denotada com a mesma letra, mas em maiúsculas.

O "inverso" significa que ele corresponde a todos os outros caracteres, por exemplo:

`padrão:\D`
: Sem dígito: qualquer caractere, exceto `padrão:\d`, por exemplo, uma letra.

`padrão:\S`
: Sem espaço: qualquer caractere, exceto `padrão:\s`, por exemplo, uma letra.

`padrão:\W`
: Caractere não verbal: qualquer coisa, exceto `padrão:\w`, por exemploo uma letra não latina ou um espaço.

No início do capítulo, vimos como criar um número de telefone somente para números a partir de uma string como `subject:+7(903)-123-45-67`: encontre todos os dígitos e junte-se a eles.
=======
Also we can use many character classes:

```js run
alert( "I love HTML5!".match(/\s\w\w\w\w\d/) ); // ' HTML5'
```

The match (each regexp character class has the corresponding result character):

![](love-html5-classes.svg)

## Inverse classes

For every character class there exists an "inverse class", denoted with the same letter, but uppercased.

The "inverse" means that it matches all other characters, for instance:

`pattern:\D`
: Non-digit: any character except `pattern:\d`, for instance a letter.

`pattern:\S`
: Non-space: any character except `pattern:\s`, for instance a letter.

`pattern:\W`
: Non-wordly character: anything but `pattern:\w`, e.g a non-latin letter or a space.

In the beginning of the chapter we saw how to make a number-only phone number from a string like `subject:+7(903)-123-45-67`: find all digits and join them.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let str = "+7(903)-123-45-67";

alert( str.match(/\d/g).join('') ); // 79031234567
```

<<<<<<< HEAD
Uma maneira alternativa e mais curta é encontrar um `padrão:\D` não-dígito e removê-lo da string:
=======
An alternative, shorter way is to find non-digits `pattern:\D` and remove them from the string:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let str = "+7(903)-123-45-67";

alert( str.replace(/\D/g, "") ); // 79031234567
```

<<<<<<< HEAD
## Um ponto é "qualquer caractere"

Um ponto `padrão:.` é uma classe de caractere especial que corresponde a "qualquer caractere, exceto uma nova linha".

Por exemplo:
=======
## A dot is "any character"

A dot `pattern:.` is a special character class that matches "any character except a newline".

For instance:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
alert( "Z".match(/./) ); // Z
```

<<<<<<< HEAD
Ou no meio de uma regexp:
=======
Or in the middle of a regexp:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let regexp = /CS.4/;

alert( "CSS4".match(regexp) ); // CSS4
alert( "CS-4".match(regexp) ); // CS-4
<<<<<<< HEAD
alert( "CS 4".match(regexp) ); // CS 4 (o espaço é também um caractere)
```

Observe que um ponto significa "qualquer caractere", mas não a "ausência de um caractere". Deve haver um caractere para corresponder a ele:

```js run
alert( "CS4".match(/CS.4/) ); // null, sem correspondência porque não há caractere para o ponto
```

### Ponto como literalmente qualquer caractere com a flag "s"

Por padrão, um ponto não corresponde ao caractere de nova linha `\n`.

Por exemplo, a regexp `padrão:A.B` corresponde `corresponde:A` e, em seguida, `corresponde:B` com qualquer caractere entre eles, exceto uma nova linha `\n`:

```js run
alert( "A\nB".match(/A.B/) ); // null (sem correspondência)
```

Há muitas situações em que gostaríamos que um ponto significasse literalmente "qualquer caractere", incluindo a nova linha.

É o que flag `padrão:s` faz. Se uma regexp possui, então um ponto `padrão:.` corresponde literalmente a qualquer caractere:

```js run
alert( "A\nB".match(/A.B/s) ); // A\nB (correspondência!)
```

````warn header="Não suportado no Firefox, IE, Edge"
Verifique <https://caniuse.com/#search=dotall> para obter o estado de suporte mais recente. No momento da redação deste documento, não inclui o Firefox, IE, Edge.

Felizmente, há uma alternativa, que funciona em qualquer lugar. Podemos usar uma regexp como `padrão:[\s\S]` para corresponder a "qualquer caractere".
=======
alert( "CS 4".match(regexp) ); // CS 4 (space is also a character)
```

Please note that a dot means "any character", but not the "absense of a character". There must be a character to match it:

```js run
alert( "CS4".match(/CS.4/) ); // null, no match because there's no character for the dot
```

### Dot as literally any character with "s" flag

By default, a dot doesn't match the newline character `\n`.

For instance, the regexp `pattern:A.B` matches `match:A`, and then `match:B` with any character between them, except a newline `\n`:

```js run
alert( "A\nB".match(/A.B/) ); // null (no match)
```

There are many situations when we'd like a dot to mean literally "any character", newline included.

That's what flag `pattern:s` does. If a regexp has it, then a dot `pattern:.` matches literally any character:

```js run
alert( "A\nB".match(/A.B/s) ); // A\nB (match!)
```

````warn header="Not supported in Firefox, IE, Edge"
Check <https://caniuse.com/#search=dotall> for the most recent state of support. At the time of writing it doesn't include Firefox, IE, Edge.

Luckily, there's an alternative, that works everywhere. We can use a regexp like `pattern:[\s\S]` to match "any character".
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
alert( "A\nB".match(/A[\s\S]B/) ); // A\nB (match!)
```

<<<<<<< HEAD
O padrão `padrão:[\s\S]` diz literalmente: "um caractere de espaço OU não um caractere de espaço". Em outras palavras, "qualquer coisa". Poderíamos usar outro par de classes complementares, como `padrão:[\d\D]`, que não importa. Ou mesmo o padrão `padrão:[^]` - pois significa corresponder a qualquer caractere, exceto nada.

Também podemos usar esse truque se quisermos os dois tipos de "pontos" no mesmo padrão: o ponto real `padrão:.` comportando-se da maneira regular ("não incluindo uma nova linha") e também uma maneira de combinar "qualquer caractere" com `padrão:[\s\S]` ou similar.
````

````warn header="Preste atenção nos espaços"
Geralmente prestamos pouca atenção aos espaços. Para nós, as strings `sujeito:1-5` e `sujeito:1 - 5` são quase idênticas.

Mas se uma regexp não leva em consideração os espaços, ela pode falhar.

Vamos tentar encontrar dígitos separados por um hífen:

```js run
alert( "1 - 5".match(/\d-\d/) ); // null, sem correspondência!
```

Vamos corrigi-lo adicionando espaços ao padrão regexp `padrão:\d - \d`:

```js run
alert( "1 - 5".match(/\d - \d/) ); // 1 - 5, agora funciona
// ou podemos usar a classe \s:
alert( "1 - 5".match(/\d\s-\s\d/) ); // 1 - 5, também funciona
```

**Um espaço é um caractere. Igual em importância com qualquer outro caractere.**

Não podemos adicionar ou remover espaços de uma expressão regular e esperamos funcionar da mesma maneira.

Em outras palavras, em uma expressão regular, todos os caracteres são importantes, espaços também.
````

## Resumo

Existem as seguintes classes de caracteres:

- `padrão:\d` - dígitos.
- `padrão:\D` - sem dígitos.
- `padrão:\s` - símbolos de espaço, tabulações, novas linhas.
- `padrão:\S` - todos, exceto `padrão:\s`.
- `padrão:\w` - Letras latinas, dígitos, sublinhado `'_'`.
- `padrão:\W` - todos, exceto `padrão:\w`.
- `padrão:.` - qualquer caractere se estiver com a flag regexp `'s' `; caso contrário, qualquer um, exceto uma nova linha `\n`.

...Mas isso não é tudo!

A codificação unicode, usada pelo JavaScript para strings, fornece muitas propriedades para caracteres, como: a qual idioma a letra pertence (se é uma letra), é um sinal de pontuação etc.

Também podemos pesquisar por essas propriedades. Isso requer a flag `padrão:u`, abordada no próximo artigo.
=======
The pattern `pattern:[\s\S]` literally says: "a space character OR not a space character". In other words, "anything". We could use another pair of complementary classes, such as `pattern:[\d\D]`, that doesn't matter. Or even the `pattern:[^]` -- as it means match any character except nothing.

Also we can use this trick if we want both kind of "dots" in the same pattern: the actual dot `pattern:.` behaving the regular way ("not including a newline"), and also a way to match "any character" with `pattern:[\s\S]` or alike.
````

````warn header="Pay attention to spaces"
Usually we pay little attention to spaces. For us strings `subject:1-5` and `subject:1 - 5` are nearly identical.

But if a regexp doesn't take spaces into account, it may fail to work.

Let's try to find digits separated by a hyphen:

```js run
alert( "1 - 5".match(/\d-\d/) ); // null, no match!
```

Let's fix it adding spaces into the regexp `pattern:\d - \d`:

```js run
alert( "1 - 5".match(/\d - \d/) ); // 1 - 5, now it works
// or we can use \s class:
alert( "1 - 5".match(/\d\s-\s\d/) ); // 1 - 5, also works
```

**A space is a character. Equal in importance with any other character.**

We can't add or remove spaces from a regular expression and expect to work the same.

In other words, in a regular expression all characters matter, spaces too.
````

## Summary

There exist following character classes:

- `pattern:\d` -- digits.
- `pattern:\D` -- non-digits.
- `pattern:\s` -- space symbols, tabs, newlines.
- `pattern:\S` -- all but `pattern:\s`.
- `pattern:\w` -- Latin letters, digits, underscore `'_'`.
- `pattern:\W` -- all but `pattern:\w`.
- `pattern:.` -- any character if with the regexp `'s'` flag, otherwise any except a newline `\n`.

...But that's not all!

Unicode encoding, used by JavaScript for strings, provides many properties for characters, like: which language the letter belongs to (if it's a letter) it is it a punctuation sign, etc.

We can search by these properties as well. That requires flag `pattern:u`, covered in the next article.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
