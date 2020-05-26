# Padrões e flags

Expressão regular é uma maneira poderosa de buscar e substituir dentro de uma string.

Em JavaScript, expressões regulares são implementadas usando objetos de uma classe 'RegExp' embutida e integrada com strings.

Observe que as expressões regulares variam entre linguagens de programação. Nesse tutorial, nos concentramos em JavaScript. Claro que há muito em comum, mas existem algumas diferenças em Perl, Ruby, PHP, etc.

## Expressões regulares

Uma expressão regular (também "regexp", ou apenas "reg") consiste em um *padrão* e opcionais *flags*.

Existem duas sintaxes para criar um objeto de expressão regular.

A sintaxe longa:

```js
regexp = new RegExp("padrão", "flags");
```

...E a curta, usando barras `"/"`:

```js
regexp = /padrão/; // sem flags
regexp = /padrão/gmi; // com flags `g`, `m` e `i` (que serão detalhadas em breve)
```

Barras `"/"` dizem ao JavaScript que estamos criando uma expressão regular. Elas desempenham o mesmo papel que as aspas para strings.

## Uso

Para buscar dentro de uma string, nós podemos usar o método [search](mdn:js/String/search).

Aqui está um exemplo:

```js run
let str = "Eu amo JavaScript!"; // irá buscar aqui

let regexp = /amo/;
alert( str.search(regexp) ); // 3
```

O método `str.search` busca pelo `padrão:/amo/` e retorna a posição dentro da string. Como devemos adivinhar, `padrão:/love/` é o padrão mais simples possível. O que ele faz é uma simples pesquisa de substring.

O código acima é o mesmo que:

```js run
let str = "Eu amo JavaScript!"; // irá buscar aqui

let substr = 'amo';
alert( str.search(substr) ); // 3
```

Então procurar pelo `padrão:/amo/` é o mesmo que procurar por `"amo"`.

Mas isso é apenas por agora. Em breve nós iremos criar expressões regulares mais complexas com muito mais poder de busca.

```smart header="Cores"
A partir daqui, o esquema de cores é:

- regexp -- `padrão:vermelho`
- string (onde nós buscamos) -- `sujeito:azul`
- result -- `correspondência:verde`
```


````smart header="Quando usar `new RegExp`?"
Normalmente nós usamos a sintaxe curta `/.../`. Mas não suporta inserções variáveis `${...}`.

Por outro lado, `new RegExp` permite construir um padrão dinamicamente de uma string, então é mais flexível.

Aqui está um exemplo de uma regexp gerada dinamicamente:

```js run
let tag = prompt("Qual tag quer procurar?", "h2");
let regexp = new RegExp(`<${tag}>`);

// procura <h2> por padrão
alert( "<h1> <h2> <h3>".search(regexp));
```
````


## Flags

Expressões regulares podem ter flags que afetam a busca.

Existem apenas 5 delas em JavaScript:

`i`
: Com essa flag a busca é case-insensitive: não faz distinção entre `A` e `a` (veja o exemplo abaixo).

`g`
: Com essa flag a busca procura por todas as correspondências, sem ela -- apenas a primeira (nós veremos usos no próximo capítulo).

`m`
: Modo multilinha (abordado no capítulo <info:regexp-multiline-mode>).

`s`
: Modo "dotall", permite que o `.` corresponda às novas linhas (abordado no capítulo <info:regexp-character-classes>).

`u`
: Habilita o suporte completo a unicode. A flag permite o processamento correto dos pares substitutos. Mais sobre isso no capítulo <info:regexp-unicode>.

`y`
: Modo fixo (abordado no capítulo <info:regexp-sticky>)

Abordaremos todas essas flags mais adiante no tutorial.

Por agora, a mais simples flag é `i`, aqui está um exemplo:

```js run
let str = "Eu amo JavaScript!";

alert( str.search(/AMO/i) ); // 3 (encontrado em minúsculas)

alert( str.search(/AMO/) ); // -1 (nada encontrado sem a 'i' flag)
```

Então a `i` flag já faz as expressões regulares mais poderosas do que uma simples pesquisa de substring. Mas ainda há muito mais. Abodaremos outras flags e recursos nos próximos capítulos.


## Sumário

- Uma expressão regular consiste de um padrão e flags opcionais: `g`, `i`, `m`, `u`, `s`, `y`.
- Sem flags e símbolos especiais que iremos estudar depois, a busca por uma regexp é o mesmo que uma pesquisa de substring.
- O método `str.search(regexp)` retorna o índice onde a correspondência é encontrada ou `-1` se não há correspondência. No próximo capítulo veremos outros métodos.
