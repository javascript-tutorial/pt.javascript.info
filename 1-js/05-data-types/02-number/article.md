# Números

Todos os números em JavaScript são armazenados no formato de 64 bits [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision), também conhecido como "número de ponto flutuante de precisão dupla".

Vamos expandir o que atualmente sabemos sobre eles.

## Mais maneiras de escrever um número

Imagine que precisamos escrever 1 bilhão. A maneira óbvia é:

```js
let billion = 1000000000;
```

Mas na vida real, nós geralmente evitamos escrever uma longa seqüência de zeros, pois é comum digitar errado. Além disso, somos preguiçosos. Nós geralmente escrevemos algo como `"1bn"` para um bilhão ou `"7.3bn"` para 7 bilhões e 300 milhões. O mesmo é verdadeiro para a maioria dos números grandes.

Em JavaScript, nós abreviamos um número anexando a letra `"e"` ao número e especificando a quantidade de zeros:

```js run
let billion = 1e9;  // 1 bilhão, literalmente: 1 e 9 zeros

alert( 7.3e9 );  // 7.3 bilhõess (7,300,000,000)
```

Em outras palavras, `"e"` multiplica o número por `1` com a quantidade de zeros fornecida.

```js
1e3 = 1 * 1000
1.23e6 = 1.23 * 1000000
```


Agora vamos escrever algo muito pequeno. Digamos, 1 microssegundo (um milionésimo de segundo):

```js
let ms = 0.000001;
```

Assim como anteriormente, usar `"e"` pode ajudar. Se quisermos evitar escrever os zeros explicitamente, poderíamos escrever:

```js
let ms = 1e-6; // seis zeros a esquerda partindo do 1
```

Se contarmos os zeros em `0.000001`, existem 6 deles. Então naturalmente temos `1e-6`.  

Em outras palavras, um número negativo depois de "e" significa uma divisão por 1 com o número dado de zeros:

```js
// -3 divide por 1 com 3 zeros
1e-3 = 1 / 1000 (=0.001)

// -6 divide por 1 com 6 zeros
1.23e-6 = 1.23 / 1000000 (=0.00000123)
```

### Números hexadecimais, binários e octais

Os números [Hexadecimais](https://pt.wikipedia.org/wiki/Sistema_de_numera%C3%A7%C3%A3o_hexadecimal) são amplamente usados ​​em JavaScript para representar cores, codificar caracteres e muitas outras coisas. Então, naturalmente, existe uma maneira mais curta de escrevê-los: `0x` e depois o número.

Por exemplo:

```js run
alert( 0xff ); // 255
alert( 0xFF ); // 255 (o mesmo, letra maiúscula ou minúscula não importa)
```

Sistemas numéricos binários e octal são raramente usados, mas também suportados usando os prefixos `0b` e` 0o`:


```js run
let a = 0b11111111; // forma binária de 255
let b = 0o377; // forma octal de 255

alert( a == b ); // true, o mesmo número 255 em ambos os lados
```

Existem apenas 3 sistemas numéricos com esse suporte. Para outros sistemas numéricos, devemos usar a função `parseInt` (a qual veremos mais adiante neste capítulo).

## toString(base)

O método `num.toString(base)` retorna uma representação em string do `num` no sistema numérico da `base` fornecida.

Por exemplo:
```js run
let num = 255;

alert( num.toString(16) );  // ff
alert( num.toString(2) );   // 11111111
```

A `base` pode variarde `2` a `36`. Por padrão é `10`.

Casos de uso comuns para isso são:

- **base=16** é usado para cores hexadecimais, codificações de caracteres, etc., dígitos podem ser `0..9` ou `A..F`.
- **base=2** é principalmente para depurar operações bit a bit, dígitos podem ser `0` ou `1`.
- **base=36** é o máximo, os dígitos podem ser `0..9` ou `A..Z`. O alfabeto latino inteiro é usado para representar um número. Um caso engraçado, mas útil para o `36` é quando precisamos transformar um identificador numérico longo em algo mais curto, por exemplo, para fazer uma URL curta. Podemos simplesmente representá-lo no sistema numérico com base `36`:

    ```js run
    alert( 123456..toString(36) ); // 2n9c
    ```

```warn header="Dois pontos para chamar um método"
Por favor note que dois pontos em `123456..toString (36)` não é um erro de digitação. Se quisermos chamar um método diretamente em um número, como `toString` no exemplo acima, então precisamos colocar dois pontos `..` depois dele.

Se usarmos um único ponto: `123456.toString(36)`, então ocorreria um erro, porque a sintaxe do JavaScript implica a parte decimal após o primeiro ponto. E se colocarmos mais um ponto, então o JavaScript sabe que a parte decimal é vazia e agora vai para o método.

Também pode se escrever `(123456).toString(36)`.
```

## Arredondamento

Uma das operações mais usadas quando se trabalha com números é o arredondamento.

Existem várias funções internas para arredondamento:

`Math.floor`
: Arredonda para baixo: `3.1` torna-se `3`, e `-1.1` torna-se `-2`.

`Math.ceil`
: Arredonda para cima: `3.1` torna-se `4`, e `-1.1` torna-se `-1`.

`Math.round`
: Arredonda para o inteiro mais próximo: `3.1` torna-se `3`, `3.6` torna-se `4` e `-1.1` torna-se `-1`.

`Math.trunc` (não suportado pelo Internet Explorer)
: Remove qualquer coisa depois do ponto decimal sem arredondar: `3.1` torna-se `3`, `-1.1` torna-se `-1`.

Aqui está a tabela para resumir as diferenças entre eles:

|   | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|---|---------|--------|---------|---------|
|`3.1`|  `3`    |   `4`  |    `3`  |   `3`   |
|`3.6`|  `3`    |   `4`  |    `4`  |   `3`   |
|`-1.1`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.6`|  `-2`    |   `-1`  |    `-2`  |   `-1`   |


Essas funções abrangem todas as maneiras possíveis de lidar com a parte decimal de um número. Mas e se quisermos arredondar o número para o dígito `n-ésimo` depois do decimal?

Por exemplo, temos `1.2345` e queremos arredondá-lo para 2 dígitos, obtendo apenas `1.23`.

Existem duas maneiras de fazer isso:

1. Multiplicar-e-dividir.

    Por exemplo, para arredondar o número para o segundo dígito das casas decimais, podemos multiplicar o número por `100`, chamar a função de arredondamento e então dividir devolta.
    ```js run
    let num = 1.23456;

    alert( Math.floor(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
    ```

2. O método [toFixed(n)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) arredonda o número para `n` dígitos depois do ponto e retorna uma representação  em string do resultado.

    ```js run
    let num = 12.34;
    alert( num.toFixed(1) ); // "12.3"
    ```

    Isso arredonda para cima ou para baixo até o valor mais próximo, similar ao método `Math.round`:

    ```js run
    let num = 12.36;
    alert( num.toFixed(1) ); // "12.4"
    ```

    Por favor note que o resultado de `toFixed` é uma string. Se a parte decimal é menor do que o necessário, zeros são adicionados ao final:

    ```js run
    let num = 12.34;
    alert( num.toFixed(5) ); // "12.34000", adicionou zeros para ficar com exatamente 5 dígitos
    ```

    Podemos converter para um número usando o operador unário + ou uma chamada `Number()`: `+num.toFixed(5)`.

## Cálculos imprecisos

Internamente um número é representado no formato de 64-bit  [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision), então existem exatamente 64 bits para guardar um número: 52 deles são usados para guardar os dígitos, 11 deles para guardar a posição do ponto decimal (eles são zero para números inteiros), e 1 bit é para o sinal.

Se um número é muito grande, iria estourar o armazenamento de 64 bits, potencialmente retornando Infinity:

```js run
alert( 1e500 ); // Infinity
```

O que pode ser um pouco menos óbvio, mas acontece frequentemente, é a perda de precisão.

Considere este teste (falso!):

```js run
alert( 0.1 + 0.2 == 0.3 ); // *!*false*/!*
```

É isso mesmo, se checarmos se a soma de `0.1` e `0.2` é `0.3`, obtemos `false`.

Estranho! Qual é o resultado senão `0.3`?

```js run
alert( 0.1 + 0.2 ); // 0.30000000000000004
```

Ai! Existem mais consequências do que uma comparação incorreta aqui. Imagine que você está fazendo um site de uma loja virtual e o visitante coloca produtos de valores `$0.10` e `$0.20` no carrinho de compras. O total da ordem será `$0.30000000000000004`. Isso surpreenderia qualquer um.

Mas por que isso acontece?

Um número é armazenado na memória em sua forma binária, uma sequência de bits - zeros e uns. Mas frações como `0.1`, `0.2` que parecem simples no sistema numérico decimal na verdade são frações infinitas em sua forma binária.

Em outras palavras, o que é `0.1`? É um dividído por dez `1/10`, um décimo. No sistema numérico decimal tais números são facilmente representados. Compare-o a um terço: `1/3`. Se torna uma fração sem fim `0.33333(3)`.

Então, divisão por potências de `10` é garantido que vai funcionar bem no sistema decimal, mas divisão por `3` não é. Pelo mesmo motivo, no sistema numérico binário, divisão por potências de `2` é garantido que irá funcionar, mas `1/10` torna-se uma fração binária sem fim.

Não existe maneira de armazenar *exatamente 0.1* ou *exatamente 0.2* usando o sistema binário, da mesma maneira que não há como armazenar um terço como fração decimal.

O formato numérico IEEE-754 resolve isso arredondando para o número mais próximo possível. Essas regras de arredondamento normalmente não nos permitem ver aquela "pequena perda de precisão", mas ela existe.

Podemos ver isso em ação:
```js run
alert( 0.1.toFixed(20) ); // 0.10000000000000000555
```

E quando nós somamos dois números, a "perda de precisão" deles se soma.

É por isso que `0.1 + 0.2` não é exatamente `0.3`.

```smart header="Não apenas JavaScript"
O mesmo problema existe em muitas outras linguagens de programação.

PHP, Java, C, Perl, Ruby dão exatamente o mesmo resultado, porqe elas são baseadas no mesmo formato numérico.
```

Podemos trabalhar em torno do problema? Claro, a maneira mais confiável é arredondar o resultado com a ajuda do método [toFixed(n)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed):

```js run
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // 0.30
```

Por favor note que `toFixed` sempre retorna uma string. Ele garante que existem 2 dígitos depois do ponto decimal. Na verdade isso é conveniente se temos uma loja virtual e precisamos mostrar `$0.30`. Para outros casos, podemos usar o operador unário + para converter em um número:

```js run
let sum = 0.1 + 0.2;
alert( +sum.toFixed(2) ); // 0.3
```

Podemos também temorariamente multiplicar os números por 100 (ou um número maior) para transformá-los em inteiros, fazer os cálculos, e divir de volta. Então, enquanto estamos fazendo cálculos com inteiros, o erro diminui de certa forma, mas ainda temos erros na divisão:

```js run
alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
alert( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001
```

Portanto, o método multiplicar/dividir reduz o erro, mas não o remove totalmente.

As vezes podemos tentar evitar frações completamente. Como se estivessemos lidando com uma loja, então podemos armazenar os preços em centavos ao invés de dólares. Mas e se aplicarmos um disconto de 30%? Na prática, evitar totalmente frações é raramente possível. Apenas arredonde elas para cortar "caudas" quando preciso.

````smart header="Algo engraçado"
Tente executar isso:

```js run
// Olá! Eu sou um número que se auto-incrementa!
alert( 9999999999999999 ); // mostra 10000000000000000
```

Isso sofre do mesmo problema: uma perda de precisão. Existem 64 bits para o número, 52 deles podem ser usados para armazenar dígitos, mas isso não é suficiente. Então o dígito menos significativo desaparece.

JavaScript não aciona um erro nesses tipos de eventos. Ele faz o seu melhor para encaixar o número no formato desejado, mas infelismente, esse formato não é grande o suficiente.
````

```smart header="Dois zeros"
Outra consequência engraçada da representação interna de números é a existência de dois zeros: `0` e `-0`.

Isso é porque o sinal é representado por um único bit, então todo número pode ser positivo ou negativo, incluindo o zero.

Na maioria dos casos a distinção é inotável, porque operadores tratam ambos igualmente.
```



## Testes: isFinite e isNaN

Lembra desses dois valores numéricos especiais?

- `Infinity` (e `-Infinity`) é um valor numérico especial que é maior (menor) do que qualquer coisa.
- `NaN` representa um erro.

Eles pertenem ao tipo `number`, mas não são números "normais", então existem funções especiais para checar por eles:


- `isNaN(valor)` converte seu argumento para um número  e então testa se é `NaN`:

    ```js run
    alert( isNaN(NaN) ); // true
    alert( isNaN("str") ); // true
    ```

    Mas nós precisamos dessa função? Não podemos apenas usara comparação `=== NaN`? Desculpe, mas a resposta é não. O valor `NaN` é único de forma que não é igual a nada, incluindo a si mesmo:

    ```js run
    alert( NaN === NaN ); // false
    ```

- `isFinite(valor)` converte seu argumento para um número e retorna `true` se é um número regular, não `NaN/Infinity/-Infinity`:

    ```js run
    alert( isFinite("15") ); // true
    alert( isFinite("str") ); // false, porque é um valor especial: NaN
    alert( isFinite(Infinity) ); // false, porque é um valor especial: Infinity
    ```

As vezes `isFinite` é usado para validar se o valor de string é um número regular:


```js run
let num = +prompt("Enter a number", '');

// will be true unless you enter Infinity, -Infinity or not a number
alert( isFinite(num) );
```

Por favor note que uma string vazia ou apenas com espaços é tratada como `0`  em todas funções numéricas incluindo `isFinite`.  

```smart header="Compare com `Object.is`"

Existe um método interno especial [Object.is](mdn:js/Object/is) que compara valores como o operador `===`, mas é mais confiável em dois casos extremos:

1. Funciona com `NaN`: `Object.is(NaN, NaN) === true`, isso é uma coisa boa.
2. Valores `0` e `-0` são diferentes: `Object.is(0, -0) === false`, tecnicamente isso é verdade, porque internamente o número tem um bit de sinal que pode ser diferente, mesmo se todos outros bits são zeros.

Em todos outros casos, `Object.is(a, b)` é o mesmo que `a === b`.

Essa manera de comparação é frequentemente usada na especificação do JavaScript. Quando um algorítimo interno precisa comparar se dois valores são exatamente o mesmo, ele usa `Object.is` (internamente chamado de  [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).
```


## parseInt e parseFloat

Conversão numérica usando um mais `+` ou `Number()` sõ estritas. Se um valor não é exatamente um número, ela falha:

```js run
alert( +"100px" ); // NaN
```

A única exceção são espaços no início ou no final da string, pois eles são ignorados.

Mas na vida real frequentemente temos valores em unidades, como `"100px"` ou `"12pt"` em CSS. Também em muitos países o símbolo da moeda vai depois do montante, então temos `"19€"` e queremos extrair um valor numérico disso.

É para isso que `parseInt` e `parseFloat` servem.

Eles "lêem" um número a partir de uma string até não poderem mais. No caso de um erro, o número lido é retornado. A função `parseInt` retorna um inteiro, enquanto `parseFloat` retornará um número de ponto flutuante:

```js run
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, apenas a parte inteira é retornada
alert( parseFloat('12.3.4') ); // 12.3, o segundo ponto para a leitura
```

Existem situações nas quais `parseInt/parseFloat` retornará `NaN`. Isso acontece quando nenhum dígito pode ser lido:

```js run
alert( parseInt('a123') ); // NaN, o primeiro caractere para o processo
```

````smart header="O segundo argumento de `parseInt(str, radix)`"
A função `parseInt()` tem um segundo parâmetro opcional. Ele especifica a base do sistema numérico, então `parseInt` também pode converter strings de números hexadecimais, números binários e assim por diante:

```js run
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, sem 0x também funciona

alert( parseInt('2n9c', 36) ); // 123456
```
````

## Outras funções matemáticas

JavaScript possui um objeto interno [Math](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math) que contém uma pequena biblioteca de funções matemáticas e constantes.

Alguns exemplos:

`Math.random()`
: Retorna um  número aleatório de 0 a 1 (não incluindo 1)

    ```js run
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (quaisquer números aleatórios)
    ```

`Math.max(a, b, c...)` / `Math.min(a, b, c...)`
: Retorna o maior/menor de uma quantidade arbritária de argumentos.

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

`Math.pow(n, power)`
: Retorna `n` elevado a potência fornecida no argumento power

    ```js run
    alert( Math.pow(2, 10) ); // 2 elevado a 10 = 1024
    ```

Existem mais funções e consantes no objeto `Math`, incluindo trigonométricas, as quais você pode encontrar na [documentação para o objeto Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math).

## Resumo

Para escrever números grandes:

- Acrescente `"e"` com a quantidade de zeros ao número. Como: `123e6` é `123` com 6 zeros.
- Um número negativo após `"e"` faz com que número seja divido por 1 com a quantidade dada de zeros. Isto é, um milionésimo, ou algo do tipo.

Para sistemas numéricos diferentes:

- Pode-se escrever números diretamento nos sitemas hexadecimal (`0x`), octal (`0o`) e binário (`0b`)
- `parseInt(str, base)` converte para um inteiro de qualquer sistema numérico com base: `2 ≤ base ≤ 36`.
- `num.toString(base)` converte um número para string no sistema numérico com a `base` dada.

Para converter valores como `12pt` e `100px` para um número:

- Use `parseInt/parseFloat` para a conversão "leve", que lê um número de uma string e então retorna o valor numérico que foi lido antes de um erro.

Para frações:

- Arredondar usando `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` oo `num.toFixed(precisão)`.
- Lembre-se que existe uma perda de precisão quando trabalhando com frações.

Mais funções matemáticas:

- Veja o objeto [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) quando precisar delas. A biblioteca é bem pequena, mas pode cobrir necessidades básicas.
