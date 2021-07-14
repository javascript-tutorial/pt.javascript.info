# Padrões e flags

Expressões regulares são padrões que fornecem uma maneira poderosa de pesquisar e substituir no texto.

Em JavaScript, elas estão disponíveis através do objeto [RegExp](mdn:js/RegExp), além de estarem integradas em métodos de strings.

## Expressões regulares

Uma expressão regular (também "regexp" ou apenas "reg") consiste em um *padrão* e *flags* opcionais.

Existem duas sintaxes que podem ser usadas para criar um objeto de expressão regular.

A sintaxe "longa":

```js
regexp = new RegExp("padrão", "flags");
```

E a "curta", usando barras `"/"`:

```js
regexp = /padrão/; // sem flags
regexp = /padrão/gmi; // com flags `g`, `m` e `i` (a ser abordado em breve)
```

Barras `padrão:/.../` informam ao JavaScript que estamos criando uma expressão regular. Eles desempenham o mesmo papel que aspas para strings.

Em ambos os casos, a `regexp` se torna numa instância da classe interna `RegExp`.

A principal diferença entre essas duas sintaxes é que o padrão usando barras `/.../` não permite a inserção de expressões (como modelos de string literais com `${...}`). Eles são totalmente estáticos.

As barras são usadas quando conhecemos a expressão regular no momento da escrita do código - e essa é a situação mais comum. Enquanto `new RegExp` é mais frequentemente usada quando precisamos criar uma regexp "de improviso" a partir de uma string gerada dinamicamente. Por exemplo:

```js
let tag = prompt("Qual tag você deseja encontrar?", "h2");

let regexp = new RegExp(`<${tag}>`); // igual a /<h2>/ se respondeu "h2" no prompt acima
```

## Flags

Expressões regulares podem ter flags que afetam a pesquisa.

Existem apenas 6 delas em JavaScript:

`padrão:i`
: Com essa flag, a pesquisa não diferencia maiúsculas de minúsculas: não há diferença entre `A` e `a` (veja o exemplo abaixo).

`padrão:g`
: Com essa flag, a pesquisa procura todas as correspondências, sem ela - somente a primeira correspondência é retornada.

`padrão:m`
: Modo multilinha (abordado no capítulo <info:regexp-multiline-mode>).

`padrão:s`
: Ativa o modo "dotall", que permite que um ponto `padrão:.` corresponda ao caractere de nova linha `\n` (abordado no capítulo <info:regexp-character-classes>).

`padrão:u`
: Ativa o suporte completo de Unicode. A flag permite o processamento correto de pares substitutos. Mais sobre isso no capítulo <info:regexp-unicode>.

`padrão:y`
: Modo "fixo": pesquisando na posição exata no texto (abordado no capítulo <info:regexp-sticky>)

```smart header="Cores"
A partir daqui, o esquema de cores é:

- regexp -- `padrão:vermelho`
- string (onde pesquisamos) -- `fonte:azul`
- result -- `correspondência:verde`
```

## Pesquisando: str.match

Como mencionado anteriormente, expressões regulares são integradas a métodos de string.

O método `str.match(regexp)` encontra todas as correspondências de `regexp` na string `str`.

Possui 3 modos de trabalho:

1. Se a expressão regular tiver flag `padrão:g`, ela retornará uma matriz de todas as correspondências:
    ```js run
    let str = "Nós vamos, nós vamos sacudir você";

    alert( str.match(/nós/gi) ); // Nós, nós (uma matriz de 2 substrings que correspondem)
    ```
    Observe que ambas `correspondência:Nós` e `correspondência:nós` são encontradas, porque flag `padrão:i` torna a expressão regular sem distinção entre maiúsculas e minúsculas.

2. Se não houver essa flag, ela retornará apenas a primeira correspondência na forma de uma matriz, com a correspondência completa no índice `0` e alguns detalhes adicionais nas propriedades:
    ```js run
    let str = "Nós vamos, nós vamos sacudir você";

    let result = str.match(/nós/i); // sem flag g

    alert( result[0] );     // Nós (1º correspondência)
    alert( result.length ); // 1

    // Detalhes:
    alert( result.index );  // 0 (posição da correspondência)
    alert( result.input );  // Nós vamos, nós vamos sacudir você (string de origem)
    ```
    A matriz pode ter outros índices, além de `0` se uma parte da expressão regular estiver entre parênteses. Abordaremos isso no capítulo <info:regexp-groups>.

3. E, finalmente, se não houver correspondências, `null` é retornado (não importa se há flags `padrão:g` ou não).

    Esta é uma nuance muito importante. Se não houver correspondências, não receberemos uma matriz vazia, mas receberemos `null`. Esquecer isso pode levar a erros, por exemplo:

    ```js run
    let matches = "JavaScript".match(/HTML/); // = null

    if (!matches.length) { // Error: Cannot read property 'length' of null
      alert("Erro na linha acima");
    }
    ```

    Se quisermos que o resultado seja sempre uma matriz, podemos escrevê-lo desta maneira:

    ```js run
    let matches = "JavaScript".match(/HTML/) || [];

    if (!matches.length) {
      alert("Sem correspondências"); // agora funciona
    }
    ```

## Substituindo: str.replace

O método `str.replace(regexp, substituição)` substitui as correspondências encontradas usando `regexp` na string ` str` por `substituição` (todas as correspondências se houver flag `padrão:g`, caso contrário, apenas a primeira).

Por exemplo:

```js run
// sem flag g
alert( "Nós vamos, nós vamos".replace(/nós/i, "Eu") ); // Eu vamos, nós vamos

// com flag g
alert( "Nós vamos, nós vamos".replace(/nós/ig, "Eu") ); // Eu vamos, Eu vamos
```

O segundo argumento é a string de `substituição`. Podemos usar combinações especiais de caracteres para inserir fragmentos da correspondência:

| Símbolos | Ação na string de substituição |
|--------|--------|
|`$&`|insere toda a correspondência|
|<code>$&#096;</code>|insere uma parte da string antes da correspondência|
|`$'`|insere uma parte da string depois da correspondência|
|`$n`|se `n` for um número de 1-2 dígitos, ela inserirá o conteúdo dos enésimos parênteses, mais sobre isso no capítulo <info:regexp-groups>|
|`$<nome>`|insere o conteúdo dos parênteses com o `nome` fornecido, mais sobre isso no capítulo <info:regexp-groups>|
|`$$`|insere o caractere `$` |

Um exemplo com o `padrão:$&`:

```js run
alert( "Eu amo HTML".replace(/HTML/, "$& and JavaScript") ); // Eu amo HTML and JavaScript
```

## Teste: regexp.test

O método `regexp.test(str)` procura pelo menos uma correspondência, se encontrada, retorna `true`, caso contrário,`false`.

```js run
let str = "Eu amo JavaScript";
let regexp = /AMO/i;

alert( regexp.test(str) ); // true
```

Mais adiante neste capítulo, estudaremos mais expressões regulares, examinaremos mais exemplos e também conheceremos outros métodos.

Informações completas sobre os métodos são fornecidas no artigo <info:regexp-methods>.

## Resumo

- Uma expressão regular consiste em um padrão e flags opcionais: `padrão:g`, `padrão:i`, `padrão:m`, `padrão:u`, `padrão:s`, `padrão:y`.
- Sem flags e símbolos especiais (que estudaremos mais adiante), a pesquisa por uma regexp é igual à pesquisa com substring.
- O método `str.match(regexp)` procura por correspondências: todas elas se houver a flag `padrão:g`, caso contrário, apenas a primeira.
- O método `str.replace(regexp, substituição)` substitui as correspondências encontradas usando `regexp` por 'substituição': todas elas se houver uma flag `padrão:g`, caso contrário, somente a primeira.
- O método `regexp.test(str)` retorna `true` se houver pelo menos uma correspondência, caso contrário, retorna `false`.
