# Operadores básicos, matemática

Nós conhecemos muitos operadores desde a escola. Eles são coisas como adição `+`, multiplicação `*`, subtração `-`, e assim por diante.

Neste capítulo, nós começaremos com operadores simples, e então nos concentraremos em aspectos específicos do JavaScript, não cobertos pela aritmética da escola.

## Termos: "unário", "binário", "operando"

Antes de prosseguirmos, vamos entender um pouco a terminologia comum.

- *Um operando* -- é aquilo sobre o que os operadores são aplicados. Por exemplo, na multiplicação de `5 * 2` existem dois operandos: o operando da esquerda é `5` e o operando da direita é `2`. Às vezes, as pessoas chamam estes de "argumentos" ao invés de "operandos".
- Um operador é "unário" se este tiver um único operando. Por exemplo, a negação unária `-` inverte o sinal de um número:

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1, negação unária foi aplicada
    ```
- Um operador é *binário* se este possuir dois operandos. O mesmo menos também existe em forma binária:

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, menos binário subtrai valores
    ```

    Formalmente, nos exemplos acima nós temos dois operadores diferentes que compartilham o mesmo símbolo: o operador de negação, um operador unário que inverte o sinal, e o operador de subtração, um operador binário que subtrai um número de outro.

## Matemática

As seguintes operações matemáticas são suportadas:

- Adição `+`,
- Subtração `-`,
- Multiplicação `*`,
- Divisão `/`,
- Resto `%`,
- Exponenciação `**`.

Os quatro primeiros são diretos, enquanto que `%` e `**` precisam de alguma explicação a respeito.

### Resto %

O operador de resto `%`, apesar de sua aparência, não possui relação com porcentagens.

O resultado de `a % b` é o [resto](https://pt.wikipedia.org/wiki/Resto_da_divis%C3%A3o_inteira) da divisão inteira de `a` por `b`.

Por exemplo:

```js run
alert( 5 % 2 ); // 1, o resto de 5 dividido por 2
alert( 8 % 3 ); // 2, o resto de 8 dividido por 3
```

### Exponenciação **

O operador de exponenciação `a ** b` eleva `a` à potência de `b`.

Na matemática do colégio, nós escrevemos isto como a<sup>b</sup>.

Por exemplo:

```js run
alert( 2 ** 2 ); // 2² = 4
alert( 2 ** 3 ); // 2³ = 8
alert( 2 ** 4 ); // 2⁴ = 16
```

Assim como na matemática, o operador de exponenciação também é definido para números não-inteiros.

Por exemplo, a raiz quadrada é uma exponenciação por ½:

```js run
alert( 4 ** (1/2) ); // 2 (a potência de 1/2 é o mesmo que a raiz quadrada)
alert( 8 ** (1/3) ); // 2 (a potência de 1/3 é o mesmo que a raiz cúbica)
```


## Concatenação de strings com + binário

Vamos conhecer os recursos dos operadores JavaScript que estão para além da aritmética escolar.

Normalmente o operador mais `+` soma números.

Mas, se o binário `+` for aplicado a strings, ele mescla (concatena) ambas:

```js
let s = "my" + "string";
alert(s); // mystring
```

Repare que se um dos operandos for uma string, então o outro também será convertido em uma string.

Por exemplo:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

Veja, não faz diferença se o primeiro ou o segundo operando é uma string.

Aqui está um exemplo mais complexo:

```js run
alert(2 + 2 + '1' ); // "41" e não "221"
```

Aqui, os operadores atuam um após o outro. O primeiro `+` soma dois números, retornando `4`, então o próximo `+` adiciona a string `1` a ele, ficando `4 + '1' = '41'`.

```js run
alert('1' + 2 + 2); // "122" e não "14"
```
Aqui como o primeiro operando é uma string, o compilador trata os outros dois operandos também como strings. O `2` é concatenado ao `'1'`, ficando `'1' + 2 = "12"` e `"12" + 2 = "122"`.

O binário `+` é o único operador que suporta strings desta forma. Outros operadores aritméticos funcionam apenas com números e sempre convertem seus operandos em números.

Aqui está a demonstração para subtração e divisão:

```js run
alert( 6 - '2' ); // 4, converte '2' em um número
alert( '6' / '2' ); // 3, converte ambos os operandos em números
```

## Conversão numérica, + unário

O mais `+` existe em duas formas: na forma binária que usamos acima e na forma unária.

O positivo unário ou, em outras palavras, o operador mais `+` aplicado a um valor único, não faz nada com números. Mas se o operando não é um número, o positivo unário o converte em número.

Por exemplo:

```js run
// Sem efeito em números
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// Converte não-numéricos
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

Ele, na verdade, faz a mesma coisa que `Number(...)`, mas de uma maneira mais curta.

A necessidade de converter strings em números surge com frequência. Por exemplo, se nós estivermos pegando valores de campos de formulário HTML, eles são normalmente strings. E se nós quisermos somá-los?

O positivo binário os adicionaria como strings:

```js run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23", o positivo binário concatena strings
```

Se nós quisermos tratá-los como números, nós precisamos convertê-los e então somá-los:

```js run
let apples = "2";
let oranges = "3";

*!*
// ambos os valores são convertidos para números antes do positivo binário
alert( +apples + +oranges ); // 5
*/!*

// a variante mais longa
// alert( Number(apples) + Number(oranges) ); // 5
```

Do ponto de vista matemático, a abundância de sinais de mais pode parecer estranha. Mas de um ponto de vista de um programador, não há nada de especial: positivos unários são aplicados primeiro, eles convertem strings em números, e então o positivo binário os soma.

Por que positivos unários são aplicados a valores antes dos positivos binários? Como iremos ver, é devido à *maior precedência* destes.

## Precedência de operador

Se uma expressão tem mais do que um operador, a ordem de execução é definida por sua *precedência*, ou, em outras palavras, pela ordem de prioridade padrão dos operadores.

Todos sabemos da escola que a multiplicação na expressão `1 + 2 * 2` deve ser calculada antes da adição. Esta é exatamente a coisa da precedência. É dito que a multiplicação tem *uma precedência maior* do que a adição.

Os parênteses sobrepõem qualquer precedência, então se nós não estivermos satisfeitos com a ordem padrão, nós podemos usá-los para mudar isto. Por exemplo, escrevendo `(1 + 2) * 2`.

Existem muitos operadores em JavaScript. Todo operador tem um número de precedência correspondente. Aquele com maior número é executado primeiro. Se a precedência for a mesma, a ordem de execução é da esquerda para a direita.

Aqui está um extrato da [tabela de precedência](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) (você não precisa se lembrar disto, mas observe que operadores unários são maiores que os binários correspondentes):

| Precedência | Nome | Sinal |
|------------|------|------|
| ... | ... | ... |
| 15 | positivo unário | `+` |
| 15 | negativo unário | `-` |
| 14 | exponenciação | `**` |
| 13 | multiplicação | `*` |
| 13 | divisão | `/` |
| 12 | adição | `+` |
| 12 | subtração | `-` |
| ... | ... | ... |
| 2 | atribuição | `=` |
| ... | ... | ... |

Como podemos ver, o "positivo unário" tem uma prioridade de `15` que é maior que a de `12` da "adição" (positivo binário). É por este motivo que na expressão `"+apples + +oranges"`, positivos unários operam antes da adição.

## Atribuição

Vamos observar que uma atribuição `=` é também um operador. Este é listado na tabela de precedência com uma prioridade muito baixa de `2`.

É por isto que quando nós atribuímos a uma variável, como em `x = 2 * 2 + 1`, os cálculos são feitos primeiro e então o `=` é executado, armazenando o resultado em `x`.

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

### Atribuição = retorna um valor

O fato de `=` ser um operador, não uma construção "mágica" da linguagem tem uma implicação interessante.

Todos os operadores em JavaScript retornam um valor. Isto é óbvio para `+` e `-`, mas também é verdadeiro para `=`.

A chamada `x = valor` escreve o `valor` em `x` *e então o retorna*.

Aqui está uma demonstração que usa uma atribuição como parte de uma expressão mais complexa:

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

No exemplo acima, o resultado da expressão `(a = b + 1)` é o valor atribuído à `a` (isto é, `3`). Este é depois usado em avaliações adicionais.

Código engraçado, não é? Nós devemos entender como ele funciona, porque às vezes nós o vemos em bibliotecas JavaScript.

Apesar disto, por favor não escreva código assim. Tais truques definitivamente não tornam os códigos mais claros ou legíveis.

### Encadeando atribuições

Outra característica interessante é a habilidade de encadear atribuições:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Atribuições encadeadas são avaliadas da direita para a esquerda. Primeiro, a expressão mais à direita `2 + 2` é avaliada e então atribuída às variáveis na esquerda: `c`, `b` e `a`. No fim, todas as variáveis compartilham um mesmo valor.

Uma vez mais, para o propósito de legibilidade é melhor dividir tal código em algumas linhas:

```js
c = 2 + 2;
b = c;
a = c;
```
Isto é mais fácil de ler, especialmente ao passar o olho pelo código rapidamente.

## Modificar in loco (Modify-in-place)

Nós frequentemente precisamos aplicar um operador a uma variável e armazenar o novo resultado nesta mesma variável.

Por exemplo:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

Esta notação pode ser encurtada usando os operadores `+=` e `*=`: 

```js run
let n = 2;
n += 5; // agora n = 7 (o mesmo que n = n + 5)
n *= 2; // agora n = 14 (o mesmo que n = n * 2)

alert( n ); // 14
```

Operadores "modificar-e-atribuir" curtos existem para todos os operadores aritméticos e também bit a bit: `/=`, `-=`, etc.

Tais operadores têm a mesma precedência que uma atribuição normal, de modo que eles são executados após a maioria dos outros cálculos:

```js run
let n = 2;

n *= 3 + 5; // parte à direita avaliada primeiro, o mesmo que n *= 8

alert( n ); // 16
```

## Incremento/decremento

<!-- Não se pode usar '--' no título, porque o interpretador de Markdown converte isto num único 'traço longo': '–' -->

Aumentar ou diminuir um número por 1 está entre as operações numéricas mais comuns.

Portanto, existem operadores especiais para isto:

- **Incremento** `++` aumenta uma variável em 1:

    ```js run no-beautify
    let counter = 2;
    counter++;        // funciona da mesma forma que counter = counter + 1, porém de forma mais curta
    alert( counter ); // 3
    ```
- **Decremento** `--` diminui uma variável em 1:

    ```js run no-beautify
    let counter = 2;
    counter--;        // funciona da mesma forma que counter = counter - 1, porém de forma mais curta
    alert( counter ); // 1
    ```

```warn
Incremento/decremento só pode ser aplicado a variáveis. Tentar usar isto num valor como `5++` resultará em erro.
```

Os operadores `++` e `--` podem ser colocados antes ou depois de uma variável.

- Quando o operador aparece depois da variável, ele está numa "forma pós-fixa": `counter++`.
- A "forma prefixa" é quando o operador aparece antes da variável: `++counter`.

Ambas as declarações fazem a mesma coisa: aumentam o `counter` em `1`.

Existe alguma diferença? Sim, mas só podemos vê-la se usarmos o valor retornado da operação `++/--`.

Vamos esclarecer. Como sabemos, todos os operadores retornam um valor. Incremento/decremento não é exceção. A forma prefixa retorna o novo valor enquanto que a forma pós-fixa retorna o valor antigo (anterior ao incremento/decremento).

Para ver a diferença, aqui está um exemplo:

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

Na linha `(*)`, a forma *prefixa* `++counter` incrementa `counter` e retorna o novo valor, `2`. Então, o `alert` mostra `2`.

Agora, vamos usar a forma pós-fixa:

```js run
let counter = 1;
let a = counter++; // (*) mudou ++counter para counter++

alert(a); // *!*1*/!*
```

Na linha `(*)`, a forma pós-fixa `counter++` também incrementa `counter`, mas retorna o valor *antigo* (anterior ao incremento). Então, o `alerta` mostra `1`.

Resumindo:

- Se o resultado do incremento/decremento não é usado, não há diferença em qual forma usar:

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2, as linhas acima fizeram a mesma coisa
    ```
- Se quisermos aumentar o valor *e* imediatamente usar o resultado do operador, nós precisamos da forma prefixa:

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
- Se quisermos incrementar um valor, mas usar o seu valor anterior, nós precisamos da forma pós-fixa:

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

````smart header="Incremento/decremento entre outros operadores"
Os operadores `++/--` também podem ser usados dentro de expressões. A precedência deles é maior do que a maioria das outras operações aritméticas.

Por exemplo:

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

Compare com:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, pois counter++ retorna o valor "antigo"
```

Embora tecnicamente correta, tal notação normalmente torna o código menos legível. Numa linha faz-se várias coisas -- nada bom.

Ao ler um código, uma rápida olhada "vertical" pode facilmente deixar passar algo como `counter++` e não será óbvio que a variável aumentou.

Nós recomendamos um estilo de "uma linha -- uma ação":

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## Operadores bit a bit (bitwise)

Operadores bit a bit tratam argumentos como números inteiros de 32-bits e funcionam no nível de sua representação binária.

Estes operadores não são específicos do JavaScript. Eles são suportados na maioria das linguagens de programação.

A lista de operadores:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

Estes operadores são muito raramente usados, e acontece quando nós precisamos mexer com números no nível mais baixo (bit a bit). Nós não precisaremos destes operadores tão cedo, já que desenvolvimento web faz pouco uso deles, mas em algumas áreas específicas, como em criptografia, eles são úteis. Você pode ler o capítulo [Operadores bit a bit](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Expressions_and_Operators#operadores_bit_a_bit) na MDN quando surgir a necessidade.

## Vírgula

O operador vírgula `,`, é um dos operadores mais raros e incomuns. Às vezes, ele é usado para escrever código mais curto, de modo que precisamos conhecê-lo para entender o que está ocorrendo.

O operador vírgula nos permite avaliar várias expressões, dividindo-as com uma vírgula `,`. Cada uma delas é avaliada, mas somente o resultado da última é retornado.

Por exemplo:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (o resultado de 3 + 4)
```

Aqui, a primeira expressão `1 + 2` é avaliada e o seu resultado é descartado. Então, `3 + 4` é avaliado e retornado como resultado.

```smart header="Vírgula tem uma precedência muito baixa"
Por favor observe que o operador vírgula tem precedência muito baixa, mais baixa que `=`, de modo que parênteses são importantes no exemplo acima.

Sem eles: `a = 1 + 2, 3 + 4` avalia `+` primeiro, somando os números e resultando em `a = 3, 7`, com o operador de atribuição `=` atribuindo `a = 3`, e ignorando o restante. É como `(a = 1 + 2), 3 + 4`.
```

Por que precisamos de um operador que descarta tudo exceto a última expressão?

Às vezes, as pessoas o usam em construções mais complexas para pôr várias ações em uma linha.

Por exemplo:

```js
// três operações em uma linha
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

Tais truques são usados em muitos frameworks JavaScript. É por isto que nós os estamos mencionando. Mas geralmente eles não melhoram a legibilidade do código, de modo que nós precisamos pensar bem antes de usá-los.
