# Classes de caracteres

Considere uma tarefa prática - temos um número de telefone como `"+7(903)-123-45-67"` e precisamos transformá-lo em números apenas: `79031234567`.

Para fazer isso, podemos encontrar e remover qualquer coisa que não seja um número. Classes de caracteres podem ajudar com isso.

Uma *classe de caracteres* é uma notação especial que corresponde a qualquer símbolo de um determinado conjunto.

Para começar, vamos explorar a classe "digit". Ela é escrita como `padrão:\d` e corresponde a "um único dígito".

Por exemplo, vamos encontrar o primeiro dígito no número de telefone:

```js run
let str = "+7(903)-123-45-67";

let regexp = /\d/;

alert( str.match(regexp) ); // 7
```

Sem a flag `padrão:g`, a expressão regular procura apenas a primeira correspondência, que é o primeiro dígito `padrão:\d`.

Vamos adicionar a flag `padrão:g` para encontrar todos os dígitos:

```js run
let str = "+7(903)-123-45-67";

let regexp = /\d/g;

alert( str.match(regexp) ); // matriz de correspondências: 7,9,0,3,1,2,3,4,5,6,7

// vamos criar o número de telefone apenas com dígitos:
alert( str.match(regexp).join('') ); // 79031234567
```

Essa era uma classe de caracteres para dígitos. Existem outras classes de caracteres.

As mais usadas são:

`padrão:\d` ("d" é de "digit")
: Um dígito: um caractere de `0` a `9`.

`padrão:\s` ("s" é de "space")
: Um símbolo de espaço: inclui espaços, tabulações `\t`, novas linhas `\n` e alguns outros caracteres raros, como `\v`, `\f` e `\r`.

`padrão:\w` ("w" é de "word" (*palavra*))
: Um caractere de texto: uma letra do alfabeto latino ou um dígito ou um sublinhado `_`. Letras não latinas (como cirílico ou hindu) não pertencem ao `padrão:\w`.

Por exemplo, `padrão:\d\s\w` significa um "dígito" seguido de um "caractere de espaço" seguido de um "caractere de texto", como `correspondência:1 a`.

**Uma regexp pode conter símbolos regulares e classes de caracteres.**

Por exemplo, `padrão:CSS\d` corresponde a uma string `correspondência:CSS` com um dígito a seguir:

```js run
let str = "Existe CSS4?";
let regexp = /CSS\d/

alert( str.match(regexp) ); // CSS4
```

Também podemos usar muitas classes de caracteres:

```js run
alert( "Eu amo HTML5!".match(/\s\w\w\w\w\d/) ); // ' HTML5'
```

A correspondência (cada classe de caracteres regexp possui o caractere de resultado correspondente):

![](love-html5-classes.svg)

## Classes inversas

Para cada classe de caracteres existe uma "classe inversa", denotada com a mesma letra, mas em maiúsculas.

O "inverso" significa que ele corresponde a todos os outros caracteres, por exemplo:

`padrão:\D`
: Não-dígito: qualquer caractere, exceto `padrão:\d`, por exemplo, uma letra.

`padrão:\S`
: Não-espaço: qualquer caractere, exceto `padrão:\s`, por exemplo, uma letra.

`padrão:\W`
: Caractere não verbal: qualquer coisa, exceto `padrão:\w`, por exemplo, uma letra não latina ou um espaço.

No início do capítulo, vimos como criar um número de telefone somente com números a partir de uma string como `subject:+7(903)-123-45-67`: encontre todos os dígitos e os junte.

```js run
let str = "+7(903)-123-45-67";

alert( str.match(/\d/g).join('') ); // 79031234567
```

Uma maneira alternativa e mais curta é encontrar não-dígitos `padrão:\D` e removê-los da string:

```js run
let str = "+7(903)-123-45-67";

alert( str.replace(/\D/g, "") ); // 79031234567
```

## Um ponto é "qualquer caractere"

Um ponto `padrão:.` é uma classe de caracteres especial que corresponde a "qualquer caractere, exceto uma nova linha".

Por exemplo:

```js run
alert( "Z".match(/./) ); // Z
```

Ou no meio de uma regexp:

```js run
let regexp = /CS.4/;

alert( "CSS4".match(regexp) ); // CSS4
alert( "CS-4".match(regexp) ); // CS-4
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

É o que a flag `padrão:s` faz. Se uma regexp a possui, então um ponto `padrão:.` corresponde literalmente a qualquer caractere:

```js run
alert( "A\nB".match(/A.B/s) ); // A\nB (correspondência!)
```

````warn header="Não suportado no IE"
A flag `padrão:s` não tem suporte no IE.

Felizmente, há uma alternativa, que funciona em qualquer lugar. Podemos usar uma regexp como `padrão:[\s\S]` para corresponder a "qualquer caractere" (este padrão irá ser estudado no artigo <info:regexp-character-sets-and-ranges>).

```js run
alert( "A\nB".match(/A[\s\S]B/) ); // A\nB (correspondência!)
```

O padrão `padrão:[\s\S]` diz literalmente: "um caractere de espaço OU não um caractere de espaço". Em outras palavras, "qualquer coisa". Poderíamos usar outro par de classes complementares, como `padrão:[\d\D]`, que não importa. Ou mesmo o padrão `padrão:[^]` -- pois significa corresponder a qualquer caractere, exceto nada.

Também podemos usar esse truque se quisermos os dois tipos de "pontos" no mesmo padrão: o ponto real `padrão:.` comportando-se da maneira regular ("não incluindo uma nova linha") e também uma maneira de combinar "qualquer caractere" com `padrão:[\s\S]` ou similar.
````

````warn header="Preste atenção aos espaços"
Geralmente prestamos pouca atenção aos espaços. Para nós, as strings `sujeito:1-5` e `sujeito:1 - 5` são quase idênticas.

Mas se uma regexp não leva em consideração os espaços, ela pode falhar.

Vamos tentar encontrar dígitos separados por um hífen:

```js run
alert( "1 - 5".match(/\d-\d/) ); // null, sem correspondência!
```

Vamos corrigi-lo adicionando espaços à regexp `padrão:\d - \d`:

```js run
alert( "1 - 5".match(/\d - \d/) ); // 1 - 5, agora funciona
// ou podemos usar a classe \s:
alert( "1 - 5".match(/\d\s-\s\d/) ); // 1 - 5, também funciona
```

**Um espaço é um caractere. Igual em importância a qualquer outro caractere.**

Não podemos adicionar ou remover espaços a uma expressão regular e esperar que funcione da mesma maneira.

Em outras palavras, em uma expressão regular, todos os caracteres são importantes, espaços também.
````

## Resumo

Existem as seguintes classes de caracteres:

- `padrão:\d` -- dígitos.
- `padrão:\D` -- não-dígitos.
- `padrão:\s` -- símbolos de espaço, tabulações, novas linhas.
- `padrão:\S` -- todos, exceto `padrão:\s`.
- `padrão:\w` -- Letras latinas, dígitos, sublinhado `'_'`.
- `padrão:\W` -- todos, exceto `padrão:\w`.
- `padrão:.` -- qualquer caractere se estiver com a flag regexp `'s' `; caso contrário, qualquer um, exceto uma nova linha `\n`.

...Mas isso não é tudo!

A codificação Unicode, usada pelo JavaScript para strings, fornece muitas propriedades para caracteres, como: a qual idioma a letra pertence (se for uma letra), é um sinal de pontuação, etc.

Também podemos pesquisar por essas propriedades. Isso requer a flag `padrão:u`, abordada no próximo artigo.
