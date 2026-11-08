# Numbers

No JavaScript moderno, existem dois tipos de números:

1. Os números comuns do JavaScript são armazenados no formato de 64 bits [IEEE-754](https://pt.wikipedia.org/wiki/IEEE_754), também conhecido como "números de ponto flutuante de precisão dupla". Esses são os números que usamos na maior parte do tempo, e vamos falar sobre eles neste capítulo.

2. Os números BigInt representam números inteiros de tamanho arbitrário. Às vezes eles são necessários porque um número inteiro comum não pode exceder com segurança <code>(2<sup>53</sup>-1)</code> nem ser menor que <code>-(2<sup>53</sup>-1)</code>, como mencionamos antes no capítulo <info:types>. Como os bigints são usados em poucas áreas especiais, dedicamos um capítulo especial a eles: <info:bigint>.

Então aqui vamos falar sobre os números comuns. Vamos expandir nosso conhecimento sobre eles.

## Mais formas de escrever um número

Imagine que precisamos escrever 1 bilhão. A forma óbvia é:

```js
let billion = 1000000000;
```

Também podemos usar o sublinhado `_` como separador:

```js
let billion = 1_000_000_000;
```

Aqui o sublinhado `_` desempenha o papel de "[açúcar sintático](https://pt.wikipedia.org/wiki/A%C3%A7%C3%BAcar_sint%C3%A1tico)", tornando o número mais legível. O motor do JavaScript simplesmente ignora o `_` entre os dígitos, então é exatamente o mesmo bilhão de antes.

Na vida real, porém, tentamos evitar escrever longas sequências de zeros. Somos preguiçosos demais para isso. Vamos tentar escrever algo como `"1bi"` para um bilhão ou `"7,3bi"` para 7 bilhões e 300 milhões. O mesmo vale para a maioria dos números grandes.

No JavaScript, podemos encurtar um número adicionando a letra `"e"` a ele e especificando a quantidade de zeros:

```js run
let billion = 1e9;  // 1 bilhão, literalmente: 1 e 9 zeros

alert( 7.3e9 );  // 7,3 bilhões (o mesmo que 7300000000 ou 7_300_000_000)
```

Em outras palavras, `e` multiplica o número por `1` com a quantidade de zeros dada.

```js
1e3 === 1 * 1000; // e3 significa *1000
1.23e6 === 1.23 * 1000000; // e6 significa *1000000
```

Agora vamos escrever algo bem pequeno. Digamos, 1 microssegundo (um milionésimo de segundo):

```js
let mсs = 0.000001;
```

Assim como antes, usar `"e"` pode ajudar. Se quisermos evitar escrever os zeros explicitamente, podemos escrever o mesmo valor como:

```js
let mcs = 1e-6; // cinco zeros à esquerda do 1
```

Se contarmos os zeros em `0.000001`, há 6 deles. Então, naturalmente, é `1e-6`.

Em outras palavras, um número negativo depois do `"e"` significa uma divisão por 1 com a quantidade de zeros dada:

```js
// -3 divide por 1 com 3 zeros
1e-3 === 1 / 1000; // 0.001

// -6 divide por 1 com 6 zeros
1.23e-6 === 1.23 / 1000000; // 0.00000123

// um exemplo com um número maior
1234e-2 === 1234 / 100; // 12.34, o ponto decimal se move 2 vezes
```

### Números hexadecimais, binários e octais

Os números [hexadecimais](https://pt.wikipedia.org/wiki/Sistema_de_numera%C3%A7%C3%A3o_hexadecimal) são amplamente usados no JavaScript para representar cores, codificar caracteres, e muitas outras coisas. Então, naturalmente, existe uma forma mais curta de escrevê-los: `0x` seguido do número.

Por exemplo:

```js run
alert( 0xff ); // 255
alert( 0xFF ); // 255 (o mesmo, a caixa não importa)
```

Os sistemas numéricos binário e octal são raramente usados, mas também são suportados usando os prefixos `0b` e `0o`:


```js run
let a = 0b11111111; // forma binária de 255
let b = 0o377; // forma octal de 255

alert( a == b ); // true, o mesmo número 255 dos dois lados
```

Existem apenas 3 sistemas numéricos com esse suporte. Para outros sistemas numéricos, devemos usar a função `parseInt` (que veremos mais adiante neste capítulo).

## toString(base)

O método `num.toString(base)` retorna uma representação em string de `num` no sistema numérico com a `base` dada.

Por exemplo:
```js run
let num = 255;

alert( num.toString(16) );  // ff
alert( num.toString(2) );   // 11111111
```

A `base` pode variar de `2` a `36`. Por padrão, é `10`.

Casos de uso comuns para isso são:

- **base=16** é usada para cores hexadecimais, codificações de caracteres etc., os dígitos podem ser `0..9` ou `A..F`.
- **base=2** é usada principalmente para depurar operações bit a bit, os dígitos podem ser `0` ou `1`.
- **base=36** é o máximo, os dígitos podem ser `0..9` ou `A..Z`. O alfabeto latino inteiro é usado para representar um número. Um caso curioso, mas útil, para `36` é quando precisamos transformar um identificador numérico longo em algo mais curto, por exemplo, para fazer uma url curta. Podemos simplesmente representá-lo no sistema numérico de base `36`:

    ```js run
    alert( 123456..toString(36) ); // 2n9c
    ```

```warn header="Dois pontos para chamar um método"
Observe que os dois pontos em `123456..toString(36)` não são um erro de digitação. Se quisermos chamar um método diretamente num número, como `toString` no exemplo acima, precisamos colocar dois pontos `..` depois dele.

Se colocássemos um único ponto: `123456.toString(36)`, haveria um erro, porque a sintaxe do JavaScript entende que vem uma parte decimal depois do primeiro ponto. E se colocarmos mais um ponto, o JavaScript entende que a parte decimal está vazia e agora usa o método.

Também poderíamos escrever `(123456).toString(36)`.

```

## Arredondamento

Uma das operações mais usadas ao trabalhar com números é o arredondamento.

Existem várias funções nativas para arredondamento:

`Math.floor`
: Arredonda para baixo: `3.1` vira `3`, e `-1.1` vira `-2`.

`Math.ceil`
: Arredonda para cima: `3.1` vira `4`, e `-1.1` vira `-1`.

`Math.round`
: Arredonda para o inteiro mais próximo: `3.1` vira `3`, `3.6` vira `4`. Nos casos intermediários, `3.5` arredonda para cima, virando `4`, e `-3.5` arredonda para cima, virando `-3`.

`Math.trunc` (não suportado pelo Internet Explorer)
: Remove tudo depois do ponto decimal sem arredondar: `3.1` vira `3`, `-1.1` vira `-1`.

Aqui está a tabela que resume as diferenças entre elas:

|   | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|---|---------|--------|---------|---------|
|`3.1`|  `3`    |   `4`  |    `3`  |   `3`   |
|`3.5`|  `3`    |   `4`  |    `4`  |   `3`   |
|`3.6`|  `3`    |   `4`  |    `4`  |   `3`   |
|`-1.1`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.5`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.6`|  `-2`    |   `-1`  |    `-2`  |   `-1`   |


Essas funções cobrem todas as formas possíveis de lidar com a parte decimal de um número. Mas e se quisermos arredondar o número até o `n-ésimo` dígito depois da vírgula?

Por exemplo, temos `1.2345` e queremos arredondá-lo para 2 dígitos, obtendo só `1.23`.

Há duas formas de fazer isso:

1. Multiplicar e dividir.

    Por exemplo, para arredondar o número até o 2º dígito depois da vírgula, podemos multiplicar o número por `100`, chamar a função de arredondamento e depois dividir de volta.
    ```js run
    let num = 1.23456;

    alert( Math.round(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
    ```

2. O método [toFixed(n)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) arredonda o número para `n` dígitos depois da vírgula e retorna uma representação em string do resultado.

    ```js run
    let num = 12.34;
    alert( num.toFixed(1) ); // "12.3"
    ```

    Isso arredonda para cima ou para baixo até o valor mais próximo, de forma parecida com `Math.round`:

    ```js run
    let num = 12.36;
    alert( num.toFixed(1) ); // "12.4"
    ```

    Observe que o resultado de `toFixed` é uma string. Se a parte decimal for mais curta do que o necessário, zeros são adicionados no final:

    ```js run
    let num = 12.34;
    alert( num.toFixed(5) ); // "12.34000", zeros adicionados para completar exatamente 5 dígitos
    ```

    Podemos convertê-lo para um número usando o mais unário ou uma chamada `Number()`, por exemplo, escrevendo `+num.toFixed(5)`.

## Cálculos imprecisos

Internamente, um número é representado no formato de 64 bits [IEEE-754](https://pt.wikipedia.org/wiki/IEEE_754), então há exatamente 64 bits para armazenar um número: 52 deles são usados para armazenar os dígitos, 11 deles armazenam a posição do ponto decimal, e 1 bit é para o sinal.

Se um número for realmente enorme, ele pode ultrapassar o armazenamento de 64 bits e se tornar um valor numérico especial, `Infinity`:

```js run
alert( 1e500 ); // Infinity
```

O que pode ser um pouco menos óbvio, mas acontece com bastante frequência, é a perda de precisão.

Considere este teste de igualdade (falso!):

```js run
alert( 0.1 + 0.2 == 0.3 ); // *!*false*/!*
```

Isso mesmo, se verificarmos se a soma de `0.1` e `0.2` é `0.3`, obtemos `false`.

Estranho! Então o que é, se não `0.3`?

```js run
alert( 0.1 + 0.2 ); // 0.30000000000000004
```

Ai! Imagine que você está criando um site de e-commerce e o visitante coloca itens de `$0.10` e `$0.20` no carrinho. O total do pedido vai ser `$0.30000000000000004`. Isso surpreenderia qualquer um.

Mas por que isso acontece?

Um número é armazenado na memória em sua forma binária, uma sequência de bits — uns e zeros. Mas frações como `0.1`, `0.2`, que parecem simples no sistema numérico decimal, são na verdade frações intermináveis em sua forma binária.

```js run
alert(0.1.toString(2)); // 0.0001100110011001100110011001100110011001100110011001101
alert(0.2.toString(2)); // 0.001100110011001100110011001100110011001100110011001101
alert((0.1 + 0.2).toString(2)); // 0.0100110011001100110011001100110011001100110011001101
```

O que é `0.1`? É um dividido por dez, `1/10`, um décimo. No sistema numérico decimal, esses números são facilmente representáveis. Compare com um terço: `1/3`. Isso se torna uma fração infinita: `0.33333(3)`.

Então, a divisão por potências de `10` tem garantia de funcionar bem no sistema decimal, mas a divisão por `3` não. Pelo mesmo motivo, no sistema numérico binário, a divisão por potências de `2` tem garantia de funcionar, mas `1/10` se torna uma fração binária infinita.

Simplesmente não há como armazenar *exatamente 0.1* ou *exatamente 0.2* usando o sistema binário, assim como não há como armazenar um terço como uma fração decimal.

O formato numérico IEEE-754 resolve isso arredondando para o número possível mais próximo. Essas regras de arredondamento normalmente não nos deixam ver essa "pequena perda de precisão", mas ela existe.

Podemos ver isso em ação:
```js run
alert( 0.1.toFixed(20) ); // 0.10000000000000000555
```

E quando somamos dois números, suas "perdas de precisão" se somam.

É por isso que `0.1 + 0.2` não é exatamente `0.3`.

```smart header="Não é só o JavaScript"
O mesmo problema existe em muitas outras linguagens de programação.

PHP, Java, C, Perl e Ruby dão exatamente o mesmo resultado, porque são baseados no mesmo formato numérico.
```

Podemos contornar o problema? Claro, o método mais confiável é arredondar o resultado com a ajuda de um método [toFixed(n)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed):

```js run
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // "0.30"
```

Observe que `toFixed` sempre retorna uma string. Ele garante que o resultado tenha 2 dígitos depois do ponto decimal. Isso é, na verdade, conveniente se temos um e-commerce e precisamos mostrar `$0.30`. Para outros casos, podemos usar o mais unário para convertê-lo em um número:

```js run
let sum = 0.1 + 0.2;
alert( +sum.toFixed(2) ); // 0.3
```

Também podemos multiplicar temporariamente os números por 100 (ou um número maior) para transformá-los em inteiros, fazer as contas, e depois dividir de volta. Então, como estamos fazendo contas com inteiros, o erro diminui um pouco, mas ainda o obtemos na divisão:

```js run
alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
alert( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001
```

Então, a abordagem de multiplicar/dividir reduz o erro, mas não o remove totalmente.

Às vezes podemos tentar evitar frações por completo. Por exemplo, se estamos lidando com uma loja, podemos armazenar os preços em centavos em vez de dólares. Mas e se aplicarmos um desconto de 30%? Na prática, evitar frações totalmente é raramente possível. Apenas arredonde-as para cortar as "caudas" quando necessário.

````smart header="A coisa engraçada"
Tente rodar isto:

```js run
// Olá! Eu sou um número que se autoincrementa!
alert( 9999999999999999 ); // mostra 10000000000000000
```

Isso sofre do mesmo problema: uma perda de precisão. Existem 64 bits para o número, 52 deles podem ser usados para armazenar dígitos, mas isso não é suficiente. Então os dígitos menos significativos desaparecem.

O JavaScript não dispara um erro nesses casos. Ele faz o melhor que pode para encaixar o número no formato desejado, mas infelizmente esse formato não é grande o suficiente.
````

```smart header="Dois zeros"
Outra consequência engraçada da representação interna dos números é a existência de dois zeros: `0` e `-0`.

Isso acontece porque um sinal é representado por um único bit, então ele pode estar marcado ou não para qualquer número, incluindo o zero.

Na maioria dos casos, a distinção passa despercebida, porque os operadores são feitos para tratá-los como iguais.
```

## Testes: isFinite e isNaN

Lembra desses dois valores numéricos especiais?

- `Infinity` (e `-Infinity`) é um valor numérico especial que é maior (menor) que qualquer coisa.
- `NaN` representa um erro.

Eles pertencem ao tipo `number`, mas não são números "normais", então existem funções especiais para verificá-los:


- `isNaN(value)` converte seu argumento para um número e então testa se ele é `NaN`:

    ```js run
    alert( isNaN(NaN) ); // true
    alert( isNaN("str") ); // true
    ```

    Mas precisamos mesmo dessa função? Não podemos simplesmente usar a comparação `=== NaN`? Infelizmente não. O valor `NaN` é único no sentido de que ele não é igual a nada, nem a si mesmo:

    ```js run
    alert( NaN === NaN ); // false
    ```

- `isFinite(value)` converte seu argumento para um número e retorna `true` se for um número normal, não `NaN/Infinity/-Infinity`:

    ```js run
    alert( isFinite("15") ); // true
    alert( isFinite("str") ); // false, porque é um valor especial: NaN
    alert( isFinite(Infinity) ); // false, porque é um valor especial: Infinity
    ```

Às vezes `isFinite` é usado para validar se um valor em string é um número normal:


```js run
let num = +prompt("Digite um número", '');

// será true a menos que você digite Infinity, -Infinity ou algo que não seja um número
alert( isFinite(num) );
```

Observe que uma string vazia ou com apenas espaços é tratada como `0` em todas as funções numéricas, incluindo `isFinite`.

````smart header="`Number.isNaN` e `Number.isFinite`"
Os métodos [Number.isNaN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) e [Number.isFinite](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) são as versões mais "rígidas" das funções `isNaN` e `isFinite`. Eles não convertem automaticamente seu argumento para um número, mas verificam se ele pertence ao tipo `number`.

- `Number.isNaN(value)` retorna `true` se o argumento pertence ao tipo `number` e é `NaN`. Em qualquer outro caso, retorna `false`.

    ```js run
    alert( Number.isNaN(NaN) ); // true
    alert( Number.isNaN("str" / 2) ); // true

    // Observe a diferença:
    alert( Number.isNaN("str") ); // false, porque "str" pertence ao tipo string, não ao tipo number
    alert( isNaN("str") ); // true, porque isNaN converte a string "str" para um número e obtém NaN como resultado dessa conversão
    ```

- `Number.isFinite(value)` retorna `true` se o argumento pertence ao tipo `number` e não é `NaN/Infinity/-Infinity`. Em qualquer outro caso, retorna `false`.

    ```js run
    alert( Number.isFinite(123) ); // true
    alert( Number.isFinite(Infinity) ); // false
    alert( Number.isFinite(2 / 0) ); // false

    // Observe a diferença:
    alert( Number.isFinite("123") ); // false, porque "123" pertence ao tipo string, não ao tipo number
    alert( isFinite("123") ); // true, porque isFinite converte a string "123" para o número 123
    ```

De certa forma, `Number.isNaN` e `Number.isFinite` são mais simples e diretos do que as funções `isNaN` e `isFinite`. Na prática, porém, `isNaN` e `isFinite` são mais usados, já que são mais curtos de escrever.
````

```smart header="Comparação com `Object.is`"
Existe um método nativo especial, `Object.is`, que compara valores como `===`, mas é mais confiável para dois casos extremos:

1. Ele funciona com `NaN`: `Object.is(NaN, NaN) === true`, o que é uma coisa boa.
2. Os valores `0` e `-0` são diferentes: `Object.is(0, -0) === false`, o que tecnicamente está correto, porque internamente o número tem um bit de sinal que pode ser diferente mesmo que todos os outros bits sejam zeros.

Em todos os outros casos, `Object.is(a, b)` é o mesmo que `a === b`.

Mencionamos `Object.is` aqui porque ele é frequentemente usado na especificação do JavaScript. Quando um algoritmo interno precisa comparar dois valores para ver se são exatamente iguais, ele usa `Object.is` (chamado internamente de [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).
```


## parseInt e parseFloat

A conversão numérica usando o mais unário `+` ou `Number()` é rígida. Se um valor não for exatamente um número, ela falha:

```js run
alert( +"100px" ); // NaN
```

A única exceção são os espaços no início ou no fim da string, que são ignorados.

Mas, na vida real, frequentemente temos valores em unidades, como `"100px"` ou `"12pt"` em CSS. Além disso, em muitos países, o símbolo da moeda vem depois do valor, então temos `"19€"` e gostaríamos de extrair um valor numérico disso.

É para isso que servem `parseInt` e `parseFloat`.

Eles "leem" um número de uma string até onde conseguem. Em caso de erro, o número já obtido é retornado. A função `parseInt` retorna um número inteiro, enquanto `parseFloat` retorna um número de ponto flutuante:

```js run
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, apenas a parte inteira é retornada
alert( parseFloat('12.3.4') ); // 12.3, o segundo ponto interrompe a leitura
```

Existem situações em que `parseInt/parseFloat` retornam `NaN`. Isso acontece quando nenhum dígito pode ser lido:

```js run
alert( parseInt('a123') ); // NaN, o primeiro símbolo interrompe o processo
```

````smart header="O segundo argumento de `parseInt(str, radix)`"
A função `parseInt()` tem um segundo parâmetro opcional. Ele especifica a base do sistema numérico, então `parseInt` também pode analisar strings de números hexadecimais, binários e assim por diante:

```js run
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, também funciona sem o 0x

alert( parseInt('2n9c', 36) ); // 123456
```
````

## Outras funções matemáticas

O JavaScript tem um objeto nativo [Math](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math), que contém uma pequena biblioteca de funções e constantes matemáticas.

Alguns exemplos:

`Math.random()`
: Retorna um número aleatório de 0 a 1 (sem incluir o 1).

    ```js run
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (quaisquer números aleatórios)
    ```

`Math.max(a, b, c...)` e `Math.min(a, b, c...)`
: Retorna o maior e o menor valor dentre um número arbitrário de argumentos.

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

`Math.pow(n, power)`
: Retorna `n` elevado à potência dada.

    ```js run
    alert( Math.pow(2, 10) ); // 2 elevado a 10 = 1024
    ```

Existem mais funções e constantes no objeto `Math`, incluindo trigonometria, que você pode encontrar na [documentação do objeto Math](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math).

## Resumo

Para escrever números com muitos zeros:

- Adicione `"e"` com a quantidade de zeros ao número. Por exemplo: `123e6` é o mesmo que `123` com 6 zeros, `123000000`.
- Um número negativo depois do `"e"` faz com que o número seja dividido por 1 com a quantidade de zeros dada. Ex.: `123e-6` significa `0.000123` (`123` milionésimos).

Para diferentes sistemas numéricos:

- Podemos escrever números diretamente nos sistemas hexadecimal (`0x`), octal (`0o`) e binário (`0b`).
- `parseInt(str, base)` analisa a string `str` transformando-a num inteiro no sistema numérico com a `base` dada, `2 ≤ base ≤ 36`.
- `num.toString(base)` converte um número para uma string no sistema numérico com a `base` dada.

Para testes de números comuns:

- `isNaN(value)` converte seu argumento para um número e então testa se ele é `NaN`
- `Number.isNaN(value)` verifica se seu argumento pertence ao tipo `number` e, se sim, testa se ele é `NaN`
- `isFinite(value)` converte seu argumento para um número e então testa se ele não é `NaN/Infinity/-Infinity`
- `Number.isFinite(value)` verifica se seu argumento pertence ao tipo `number` e, se sim, testa se ele não é `NaN/Infinity/-Infinity`

Para converter valores como `12pt` e `100px` para um número:

- Use `parseInt/parseFloat` para a conversão "suave", que lê um número de uma string e retorna o valor que conseguiu ler antes do erro.

Para frações:

- Arredonde usando `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` ou `num.toFixed(precision)`.
- Lembre-se de que há perda de precisão ao trabalhar com frações.

Mais funções matemáticas:

- Veja o objeto [Math](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math) quando precisar delas. A biblioteca é bem pequena, mas pode cobrir as necessidades básicas.
