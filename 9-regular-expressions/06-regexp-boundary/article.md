# Borda de palavra: \b

Uma borda de palavra `pattern:\b` é um teste, como o `pattern:^` e `pattern:$` também são.

Quando o interpretador de regex (um módulo de programa que implementa a busca por expressões regulares) encontra um `pattern:\b`, ele verifica se naquela posição da string ocorre a borda de uma palavra.

Existem três diferentes posições que configuram uma borda de palavra:

- O início de uma string, se o primeiro caractere da string é um caractere de palavra `pattern:\w`.
- Entre dois caracteres de uma string, quando um deles é um caractere de palavra `pattern:\w` e o outro não.
- No fim da string, Se o último caractere for um caractere de palavra `pattern:\w`.

Por exemplo, a regex `pattern:\bJava\b` corresponde com `subject:Hello, Java!`, já que `subject:Java` é uma palavra solta, mas não corresponde com `subject:Hello, JavaScript!`.

```js run
alert( "Hello, Java!".match(/\bJava\b/) ); // Java
alert( "Hello, JavaScript!".match(/\bJava\b/) ); // null
```

Na string `subject:Hello, Java!` as seguintes posições correspondem ao `pattern:\b`:

![](hello-java-boundaries.svg)

Ela corresponde com o padrão `pattern:\bHello\b` por que:

1. Corresponde ao começo da string com o primeiro teste `pattern:\b`.
2. Depois corresponde com a palavra `pattern:Hello`.
3. E então corresponde com o teste `pattern:\b` novamente, dado que estamos entre um `subject:o` e uma vírgula.

Então o padrão `pattern:\bHello\b` corresponderia, mas não o `pattern:\bHell\b` (porque não temos nenhuma borda de palavra após o `l`), e nem o `Java!\b` (porque a exclamação não é um caractere de palavra `pattern:\w`, então não tem uma borda de palavra após ela).

```js run
alert( "Hello, Java!".match(/\bHello\b/) ); // Hello
alert( "Hello, Java!".match(/\bJava\b/) );  // Java
alert( "Hello, Java!".match(/\bHell\b/) );  // null (nenhuma correspondência)
alert( "Hello, Java!".match(/\bJava!\b/) ); // null (nenhuma correspondência)
```

Além de usar o `pattern:\b` com palavras, podemos usá-lo com dígitos também.

O padrão `pattern:\b\d\d\b` procura por números soltos de dois dígitos. Em outras palavras, ele procura por números de dois dígitos delimitados por caracteres diferentes da classe `pattern:\w`, como espaços e pontuação (ou início e final da string)

```js run
alert( "1 23 456 78".match(/\b\d\d\b/g) ); // 23,78
alert( "12,34,56".match(/\b\d\d\b/g) ); // 12,34,56
```

```warn header="A borda de palavra `pattern:\b` não funciona com alfabetos não-latinos"
O teste de borda de palavra `pattern:\b` verifica que existe um caractere `pattern:\w` de um lado da posição e um "não `pattern:\w`" do outro

Mas o `pattern:\w` representa uma letra do alfabeto latino `a-z` (ou dígito, ou underscore '_'), então o teste não funciona para outros alfabetos, como o cirílico ou sinogramas, por exemplo.
```
