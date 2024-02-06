# Quantificadores +, *, ? e {n}

Digamos que temos a string `+7(903)-123-45-67` em mãos e gostaríamos de encontrar todos os números dela. Entretanto, diferente de casos anteriores, não estamos interessados em dígitos soltos, mas sim nos números inteiros: `7, 903, 123, 45, 67`.

Um número é uma sequência de 1 ou mais dígitos `pattern:\d`. Para determinar quantos desses precisamos, usamos um *quantificador*.

## Quantidade {n}

O quantificador mais simples é um número entre chaves: `pattern:{n}`.

Quantificadores são colocados após um caractere (ou uma classe de caracteres, ou um conjunto `[...]`, etc.) e especifica quantos do elemento anterior nós precisamos.

Ele possui algumas formas avançadas, vejamos alguns exemplos:

Quantidade exata: `pattern:{5}`
: `pattern:\d{5}` representa exatamente 5 dígitos, idêntico a `pattern:\d\d\d\d\d`.

    O exemplo abaixo procura por um número de 5 dígitos:

    ```js run
    alert( "Eu tenho 12345 anos de idade".match(/\d{5}/) ); //  "12345"
    ```

    Podemos usar o `\b` para não reconhecer números maiores: `pattern:\b\d{5}\b`.

Um alcance: `pattern:{3,5}`, repetição de 3 a 5 vezes
: Para encontrar números de 3 a 5 dígitos, podemos usar os limites entre chaves e separados por uma vírgula: `pattern:\d{3,5}`

    ```js run
    alert( "Não tenho 12, mas sim 1234 anos de idade".match(/\d{3,5}/) ); // "1234"
    ```

    Também podemos omitir o limite máximo.

    Dessa forma, a expressão `pattern:\d{3,}` reconhece qualquer número com no mínimo 3 dígitos:

    ```js run
    alert( "Não tenho 12, mas sim 345678 anos de idade".match(/\d{3,}/) ); // "345678"
    ```

Voltaremos à string `+7(903)-123-45-67`.

Um número é uma sequência contínua de um ou mais dígitos. Com base nisso, a expressão regular equivalente é `pattern:\d{1,}`:

```js run
let str = "+7(903)-123-45-67";

let numbers = str.match(/\d{1,}/g);

alert(numbers); // 7,903,123,45,67
```

## Atalhos

Existem atalhos para os quantificadores mais usados:

`pattern:+`
: Representa "um ou mais da captura anterior", equivalente ao `pattern:{1,}`.

    O padrão `pattern:\d+`, por exemplo, encontra números:

    ```js run
    let str = "+7(903)-123-45-67";

    alert( str.match(/\d+/g) ); // 7,903,123,45,67
    ```

`pattern:?`
: Representa "zero ou um da captura anterior", equivalente ao `pattern:{0,1}`; marca partes da expressão como opcionais.

    O padrão `pattern:ou?r`, por exemplo, busca por `match:o` seguido de zero ou um `match:u`, seguido de um `match:r`.

    Dessa forma, `pattern:colou?r` reconhece ambos `match:color` e `match:colour`:

    ```js run
    // Tradução: Devo escrever cor (em inglês americano) ou cor (em inglês britânico)?
    let str = "Should I write color or colour?";

    alert( str.match(/colou?r/g) ); // color, colour
    ```

`pattern:*`
: Representa "zero ou mais da captura anterior", equivalente ao `pattern:{0,}`; partes da expressão afetadas por esse quantificador podem se repetir indefinidamente ou não estarem presentes

    Por exemplo: O padrão `pattern:\d0*` procura por um dígito seguido de qualquer quantidade de zeros (nenhum ou quantos tiverem):

    ```js run
    alert( "100 10 1".match(/\d0*/g) ); // 100, 10, 1
    ```

    Comparando com o `pattern:+` (um ou mais):

    ```js run
    alert( "100 10 1".match(/\d0+/g) ); // 100, 10
    // 1 não é reconhecido, já que 0+ requer ao menos uma ocorrência do 0
    ```

## Outros exemplos

Quantificadores são usados muito frequentemente. Eles servem como um dos principais componentes de expressões regulares complexas; vejamos mais alguns exemplos.

**Regex para números com casas decimais: `pattern:\d+\.\d+`**

Em ação:
```js run
alert( "0 1 12.345 7890".match(/\d+\.\d+/g) ); // 12.345
```

**Regex de uma abertura de elemento HTML sem atributos, como um `<span>` ou um `<p>`.**

1. O mais simples: `pattern:/<[a-z]+>/i`

    ```js run
    alert( "<body> ... </body>".match(/<[a-z]+>/gi) ); // <body>
    ```

    A expressão busca pelo caractere `pattern:'<'` seguido de uma ou mais letras do alfabeto latino, seguido de um caractere `pattern:'>'`.

2. Melhorado: `pattern:/<[a-z][a-z0-9]*>/i`

    De acordo com a norma, um elemento HTML pode ter um dígito em qualquer posição exceto a primeira, como no `<h1>`.

    ```js run
    alert( "<h1>Oi!</h1>".match(/<[a-z][a-z0-9]*>/gi) ); // <h1>
    ```

**Regex de uma abertura ou fechamento de um elemento HTML sem atributos: `pattern:/<\/?[a-z][a-z0-9]*>/i`**

Adicionamos uma barra opcional `pattern:/?` próxima ao começo do padrão. Ela deve ser escapada com uma contrabarra, caso contrário, o JavaScript pode interpretá-lo como o fim da expressão.

```js run
alert( "<h1>Oi!</h1>".match(/<\/?[a-z][a-z0-9]*>/gi) ); // <h1>, </h1>
```

```smart header="Para tornar uma expressão regular mais precisa, muitas vezes precisamos torná-la mais complexa"
Podemos ver uma característica em comum entre esses exemplos: Quanto mais precisa é a expressão regular, mais comprida e complexa ela se torna.

Para elementos HTML, por exemplo, podemos usar uma expressão mais simples: `pattern:<\w+>`. Mas por conta das restrições de possíveis nomes para um elemento HTML, o padrão `pattern:<[a-z][a-z0-9]*>` é mais confiável.

Qual devemos usar então, o `pattern:<\w+>` ou o `pattern:<[a-z][a-z0-9]*>`?

Na prática, ambas as variações são aceitáveis. Tudo depende de quantas correspondências "extras" podemos aceitar, e qual a dificuldade de removê-las do nosso resultado depois da captura usando outros meios.
```
