# Operadores

Conhecemos muitos operadores da escola. São coisas como adição `+`, multiplicação `*`, subtração `-` e assim por diante.

Neste capítulo, nos concentraremos em aspectos de operadores que não são cobertos pela aritmética da escola.

## Termos: "unário", "binário", "operando"

Antes de prosseguirmos, vamos entender algumas terminologias comuns.

- *Um operando* - é ao que os operadores são aplicados. Por exemplo, na multiplicação de `5 * 2` existem dois operandos: o operando esquerdo é `5` e o operando direito é `2`. Às vezes, as pessoas chamam eles de "argumentos" em vez de "operandos".
- Um operador é *unário* se tiver um único operando. Por exemplo, a negação unária `-` inverte o sinal de um número:

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1, negação unária foi aplicada
    ```
- Um operador é *binário* se tiver dois operandos. O mesmo menos também existe na forma binária:

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, binário menos subtrai valores
    ```

    Formalmente, estamos falando de dois operadores diferentes aqui: a negação unária (operando único: inverte o sinal) e a subtração binária (dois operandos: subtrai).

## Concatenação de string, binário +

Agora, vamos ver recursos especiais de operadores de JavaScript que estão além da aritmética da escola.

Normalmente, o operador mais `+` soma números.

Mas, se o binário `+` é aplicado às strings, ele mescla (concatena) elas:

```js
let s = "minha" + "string";
alert(s); // minhastring
```

Observe que, se um dos operandos for uma string, o outro também será convertido em uma string.

Por exemplo:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

Veja, não importa se o primeiro operando é uma string ou o segundo. A regra é simples: se um dos operandos é uma string, o outro é convertido em uma string também.

No entanto, observe que as operações são executadas da esquerda para a direita. Se houver dois números seguidos por uma string, os números serão adicionados antes de serem convertidos em uma string:


```js run
alert(2 + 2 + '1' ); // "41" e não "221"
```

A concatenação e conversão de strings é uma característica especial do binário mais `+`. Outros operadores aritméticos trabalham apenas com números e sempre convertem seus operandos em números.

Por exemplo, subtração e divisão:

```js run
alert( 2 - '1' ); // 1
alert( '6' / '2' ); // 3
```

## Conversão numérica, unário +

O mais '+' existe em duas formas: a forma binária que usamos acima e a forma unária.

O unário mais ou, em outras palavras, o operador mais `+` aplicado a um único valor, não faz nada para números. Mas se o operando não é um número, o unário mais o converte em um número.

Por exemplo:

```js run
// Nenhum efeito nos números
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// Converte não números
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

Realmente faz a mesma coisa que `Number (...)`, mas é mais curto.

A necessidade de converter seqüências de caracteres em números surge com muita freqüência. Por exemplo, se estamos obtendo valores de campos de formulário HTML, eles geralmente são strings.

E se quisermos somar?

O binário plus os adicionaria como strings:

```js run
let macas = "2";
let laranjas = "3";

alert( macas + laranjas ); // "23", o binário mais concatena strings
```

Se quisermos tratá-los como números, precisamos convertê-los e depois somar:

```js run
let macas = "2";
let laranjas = "3";

*!*
// ambos os valores convertidos em números antes do binário mais
alert( +macas + +laranjas ); // 5
*/!*

// a variante mais longa
// alert( Number(macas) + Number(laranjas) ); // 5
```

Do ponto de vista de um matemático, a abundância de vantagens pode parecer estranha. Mas, do ponto de vista de um programador, não há nada de especial: vantagens absolutas são aplicadas primeiro, elas convertem sequências de caracteres em números e, em seguida, o binário acrescenta-as.

Por que as vantagens unárias são aplicadas aos valores antes dos binários? Como vamos ver, isso é por causa de sua *precedência mais alta*.

## Operador precedente

Se uma expressão tiver mais de um operador, a ordem de execução é definida por sua *precedência* ou, em outras palavras, a ordem de prioridade implícita dos operadores.

Da escola, todos nós sabemos que a multiplicação na expressão `1 + 2 * 2` deve ser calculada antes da adição. Isso é exatamente a coisa precedente. Diz-se que a multiplicação tem *uma precedência mais alta* do que a adição.

Os parênteses anulam qualquer precedência, portanto, se não estivermos satisfeitos com a ordem implícita, podemos usá-los para alterá-la. Por exemplo: `(1 + 2) * 2`.

Existem muitos operadores em JavaScript. Todo operador tem um número de precedência correspondente. Aquele com o maior número é executado primeiro. Se a precedência é a mesma, a ordem de execução é da esquerda para a direita.

Aqui está um extrato da [tabela de precedência](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence) (você não precisa se lembrar disso, mas observe que os operadores unários são mais altos que os binários):

| Precedência | Nome | Sinal |
|------------|------|------|
| ... | ... | ... |
| 16 | Positivo Unário | `+` |
| 16 | Negativo Unário | `-` |
| 14 | Multiplicação | `*` |
| 14 | Divisão | `/` |
| 13 | Adição | `+` |
| 13 | Subtração | `-` |
| ... | ... | ... |
| 3 | Atribuição | `=` |
| ... | ... | ... |

Como podemos ver, o "positivo unário" tem uma prioridade de `16` que é maior que o `13` de "adição" (positivo binário). É por isso que, na expressão `+macas + +laranjas`, os positivos unários trabalham antes da adição.

## Atribuição

Vamos notar que uma atribuição `=` também é um operador. Está listado na tabela de precedência com a prioridade muito baixa de `3`.

É por isso que, quando atribuímos uma variável, como `x = 2 * 2 + 1`, os cálculos são feitos primeiro e depois o `=`é avaliado, armazenando o resultado em `x`.

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

É possível atribuições em cadeia:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Atribuições encadeadas avaliadas da direita para a esquerda. Primeiro, a expressão mais à direita `2 + 2` é avaliada e depois atribuída às variáveis à esquerda: `c`, `b` e `a`. No final, todas as variáveis compartilham um único valor.

````smart header="The assignment operator `\"=\"` retorna um valor"
Um operador sempre retorna um valor. Isso é óbvio para a maioria deles, como adição `+` ou multiplicação `*`. Mas o operador de atribuição também segue essa regra.

A chamada `x = value` escreve o `value` em `x` *e depois o retorna*.

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

No exemplo acima, o resultado de `(a = b + 1)` é o valor que é atribuído a `a` (isto é `3`). É então usado para subtrair de `3`.

Código engraçado, não é? Devemos entender como funciona, porque às vezes vemos em bibliotecas de terceiros, mas não devemos escrever nada assim. Esses truques definitivamente não tornam o código mais claro ou legível.
````

## Restante %

O operador restante `%`, apesar de sua aparência, não está relacionado a porcentagens.

O resultado de `a % b` é o restante da divisão inteira de `a` por `b`.

Por exemplo:

```js run
alert( 5 % 2 ); // 1 é o restante de 5 dividido por 2
alert( 8 % 3 ); // 2 é o restante de 8 dividido por 3
alert( 6 % 3 ); // 0 é o restante de 6 dividido por 3
```

## Exponenciação **

O operador de exponenciação `**` é uma adição recente ao idioma.

Para um número natural `b`, o resultado de `a ** b` é `a` multiplicado por si mesmo `b` vezes.

Por exemplo:
```js run
alert( 2 ** 2 ); // 4  (2 * 2)
alert( 2 ** 3 ); // 8  (2 * 2 * 2)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2)
```

O operador também trabalha para números não inteiros.

Por exemplo:

```js run
alert( 4 ** (1/2) ); // 2 (potência1/2 é o mesmo que uma raiz quadrada, isso é matemática)
alert( 8 ** (1/3) ); // 2 (potência de 1/3 é o mesmo que uma raiz cúbica)
```

## Incremento/decremento

<!-- Não é possível usar -- no título, porque a análise interna a transforma em - -->

Aumentar ou diminuir um número por um está entre as operações numéricas mais comuns.

Então, existem operadores especiais para isso:

- **Incremento** `++` aumenta uma variável por 1:

    ```js run no-beautify
    let contador = 2;
    contador++;      // funciona da mesma forma que o contador = contador + 1, mas é mais curto
    alert( contador ); // 3
    ```
- **Decremento** `--` diminui uma variável por 1:

    ```js run no-beautify
    let contador = 2;
    contador--;      // funciona da mesma forma que o contador = contador - 1, mas é mais curto
    alert( contador ); // 1
    ```

```aviso
Incremento/decremento só pode ser aplicado a variáveis. Tentando usá-lo em um valor como `5 ++` irá dar um erro.
```

Os operadores `++` e `--` podem ser colocados antes ou depois de uma variável.

- Quando o operador vai atrás da variável, está na "forma sufixo": `contador++`.
- A "forma prefixo" é quando o operador vai antes da variável: `++contador`.

Ambas as declarações fazem a mesma coisa: aumentar `contador` por `1`.

Existe alguma diferença? Sim, mas só podemos vê-lo se usarmos o valor retornado de `++/--`.

Vamos esclarecer. Como sabemos, todos os operadores retornam um valor. Incremento/decremento não é exceção. O formulário de prefixo retorna o novo valor enquanto o formulário de postfix retorna o valor antigo (antes do incremento / decremento).

Para ver a diferença, aqui está um exemplo:

```js run
let contador = 1;
let a = ++contador; // (*)

alert(a); // *!*2*/!*
```

Na linha `(*)`, a forma *prefixo* `++contador` incrementa `contador` e retorna o novo valor, `2`. Então, o `alert` mostra `2`.

Agora vamos usar a forma sufixo:

```js run
let contador = 1;
let a = contador++; // (*) altere ++contador a contador++

alert(a); // *!*1*/!*
```

Na linha `(*)`, a forma *sufixo* `contador++` também incrementa `contador` mas retorna o valor *antigo* (antes do incremento). Então, o `alert` mostra `1`.

Para resumir:

- Se o resultado de incremento/decremento não for usado, não há diferença em qual formulário usar:

    ```js run
    let contador = 0;
    contador++;
    ++contador;
    alert( contador ); // 2, as linhas acima fizeram o mesmo
    ```
- Se quisermos aumentar um valor *e* imediatamente usar o resultado do operador, precisamos da forma prefixo:

    ```js run
    let contador = 0;
    alert( ++contador ); // 1
    ```
- Se quisermos incrementar um valor, mas usar seu valor anterior, precisamos da forma sufixo:

    ```js run
    let contador = 0;
    alert( contador++ ); // 0
    ```

````smart header="Increment/decrement among other operators"
Os operadores `++/--` também podem ser usados dentro de expressões. Sua precedência é maior do que a maioria das outras operações aritméticas.

Por exemplo:

```js run
let contador = 1;
alert( 2 * ++contador ); // 4
```

Compare com:

```js run
let contador = 1;
alert( 2 * contador++ ); // 2, porque contador++ retorna o valor "antigo"
```

Embora tecnicamente bem, essa notação geralmente torna o código menos legível. Uma linha faz várias coisas -- não é boa.

Durante a leitura do código, uma rápida varredura ocular "vertical" pode facilmente perder algo como "contador ++" e não será óbvio que a variável tenha aumentado.

Aconselhamos um estilo de "uma linha -- uma ação":

```js run
let contador = 1;
alert( 2 * contador );
contador++;
```
````

## Operadores bit a bit

Operadores bit a bit tratam argumentos como números inteiros de 32 bits e trabalham no nível de sua representação binária.

Esses operadores não são específicos do JavaScript. Eles são suportados na maioria das linguagens de programação.

A lista de operadores:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

Esses operadores são usados muito raramente. Para entendê-los, precisamos nos aprofundar na representação numérica de baixo nível e não seria ideal fazer isso agora, especialmente porque não precisaremos deles em breve. Se você está curioso, você pode ler o artigo [Bitwise Operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) no MDN. Seria mais prático fazer isso quando surgir uma necessidade real.

## Modificar-no-local

Geralmente, precisamos aplicar um operador a uma variável e armazenar o novo resultado nessa mesma variável.

Por exemplo:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

Esta notação pode ser encurtada usando os operadores `+=` e `*=`:

```js run
let n = 2;
n += 5; // agora n = 7 (igual a n = n + 5)
n *= 2; // agora n = 14 (igual a n = n * 2)

alert( n ); // 14
```

Operadores curtos de "modificar e atribuir" existem para todos os operadores aritméticos e bit a bit: `/=`, `-=`, etc.

Esses operadores têm a mesma precedência que uma atribuição normal, portanto, eles são executados após a maioria dos outros cálculos:

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (parte direita avaliada primeiro, o mesmo que n *= 8)
```

## Vírgula

O operador de vírgula `,` é um dos operadores mais raros e incomuns. Às vezes, é usado para escrever códigos mais curtos, então precisamos conhecê-lo para entender o que está acontecendo.

O operador vírgula nos permite avaliar várias expressões, dividindo-as com uma vírgula `,`. Cada um deles é avaliado, mas somente o resultado do último é retornado.

Por exemplo:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (o resultado de 3 + 4)
```

Aqui, a primeira expressão `1 + 2` é avaliada e seu resultado é descartado. Então, `3 + 4` é avaliado e retornado como resultado.

```smart header="Comma has a very low precedence"
Por favor, note que o operador vírgula tem precedência muito baixa, menor que `=`, então parênteses são importantes no exemplo acima.

Sem eles: `a = 1 + 2, 3 + 4` avalia primeiro o `+`, somando os números em `a = 3, 7`, então o operador de atribuição `=` atribui `a = 3` e finalmente o número depois da vírgula, `7`, não é processado, então é ignorado.
```

Por que precisamos de um operador que jogue fora tudo, exceto a última parte?

Às vezes, as pessoas usam em construções mais complexas para colocar várias ações em uma linha.

Por exemplo:

```js
// três operações em uma linha
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

Esses truques são usados em muitos frameworks JavaScript. É por isso que estamos mencionando eles. Mas, geralmente, eles não melhoram a legibilidade do código, então devemos pensar bem antes de usá-los.
