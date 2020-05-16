# Operadores básicos, matemática

Nós aprendemos sobre muitos operadores na escola. Alguns deles são a adição `+`, a multiplicação `*`, a subtração `-` e assim por diante.

Neste capítulo, iremos começar com operadores simples, então nos concentraremos em aspectos específicos do JavaScript, que não são cobertos pela aritmética escolar.

## Termos: "unário", "binário", "operando"

Antes, vamos compreender alguns termos.

- *Um operando* -- é no que os operadores são aplicados. Por exemplo, na multiplicação `5 * 2` há dois operandos: o operando da esquerda é `5` e o operando da direita é `2`. Às vezes, as pessoas os chamam de "argumentos" ao invés de "operandos".
- Um operador é *unário* se ele tem um único operando. Por exemplo, a negação unária `-` reverte o sinal de um número:

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1, negação unária foi aplicada
    ```
- Um operador é *binário* se ele tem dois operandos. O mesmo menos `-` existe na forma binária também:

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, o binário menos subtrai valores
    ```

    Formalmente, nos exemplos acima, nós temos dois operadores diferentes que compartilham o mesmo símbolo: o operador de negação, um operador unário que reverte o sinal; e o operador de subtração, um operador binário que subtrai um número de outro.

## Matemática

As operações matemáticas a seguir são suportadas:

- Adição `+`,
- Subtração `-`,
- Multiplicação `*`,
- Divisão `/`,
- Resto `%`,
- Exponenciação `**`.

As quatro primeiras são diretas, enquanto `%` e `**` precisam de uma breve explicação.

### Resto %

O operador de resto `%`, apesar da aparência, não está relacionado a porcentagens.

O resultado de `a % b` é o [resto](https://pt.wikipedia.org/wiki/Resto_da_divis%C3%A3o_inteira) da divisão inteira de `a` por `b`.

Por exemplo:

```js run
alert( 5 % 2 ); // 1, resto de 5 dividido por 2
alert( 8 % 3 ); // 2, resto de 8 dividido por 3
```

### Exponenciação **

O operador de exponenciação `a ** b` multiplica `a` por ele mesmo `b` vezes.

Por exemplo:

```js run
alert( 2 ** 2 ); // 4  (2 multiplicado por ele mesmo 2 vezes)
alert( 2 ** 3 ); // 8  (2 * 2 * 2, 3 vezes)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2, 4 vezes)
```

Matematicamente, a exponenciação é definida também para número não-inteiros. Por exemplo, a raiz quadrada é a exponenciação por `1/2`: 

```js run
alert( 4 ** (1/2) ); // 2 (elevar a 1/2 é o mesmo que uma raiz quadrada)
alert( 8 ** (1/3) ); // 2 (elevar a 1/3 é o mesmo que uma raiz cúbica)
```


## Concatenação de string com o + binário

Agora, vamos ver características especiais dos operadores de JavaScript que vão além da aritmética escolar.

Normalmente, o operador mais `+` soma números.

Mas, se o binário `+` é aplicado a strings, ele junta (concatena) elas:

```js
let s = "minha" + "string";
alert(s); // minhastring
```

Note que se um dos operandos é uma string, o outro é convertido para uma string também.

Por exemplo:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

Veja, não importa se o primeiro operando é uma string ou o segundo.

Aqui, um exemplo mais complexo:

```js run
alert(2 + 2 + '1' ); // "41" e não "221"
```

Nesse exemplo, os operadores são aplicados um após o outro. O primeiro `+` soma dois números, retornando `4`, então o próximo `+` adiciona a string `1` a ele, sendo como `4 + '1' = 41`.

O binário `+` é o único operador que suporta strings dessa maneira. Outros operadores aritméticos funcionam apenas com números e sempre convertem seus operandos a números.

Aqui, uma demonstração para subtração e divisão:

```js run
alert( 6 - '2' ); // 4, converte '2' em um número
alert( '6' / '2' ); // 3, converte ambos operandos em números
```

## Conversão numérica, + unário

O mais `+` existe em duas formas: a forma binária que usamos acima e a forma unária.

O unário mais ou, em outras palavras, o operador mais `+`, aplicado a um único valor não faz nada para números. Mas se o operando não é um número, o unário mais converte-o em um número.

Por exemplo:

```js run
// Sem efeito em números
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// Converte o que não é número
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

Na realidade, faz a mesma coisa que `Number(...)`, porém é mais curto.

A necessidade de converter strings em números surge frequentemente. Por exemplo, se nós estamos pegando valores de campos de um formulário HTML, eles são geralmente strings. E se quisermos somá-los?

O binário mais deve somá-los como strings:

```js run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23", o binário mais concatena strings
```

E se nós quisermos tratá-los como números, nós precisamos convertê-los e então somá-los:

```js run
let apples = "2";
let oranges = "3";

*!*
// ambos valores convertidos para números antes do binário mais
alert( +apples + +oranges ); // 5
*/!*

// a outra forma mais longa
// alert( Number(apples) + Number(oranges) ); // 5
```

Do ponto de vista de um matemático, a abundância de operadores mais pode parecer estranha. Mas do ponto de vista de um programador, não há nada de especial: os mais unários são aplicados primeiro, eles convertem strings em números, então o mais binário os soma.

Por que os mais unários são aplicados aos valores antes dos mais binários? Como vamos ver, isso é por causa da *maior precedência* do operador mais unário.

## Precedência de operador

Se uma expressão tem mais de um operador, a ordem de execução é definida pela *precedência* deles, ou, em outras palavras, a ordem padrão de prioridade dos operadores.

Da escola, sabemos que a multiplicação na expressão `1 + 2 * 2` deve ser calculada antes da adição. Isso é exatamente a questão da precedência. Diz-se que a multiplicação possui *uma maior precedência* que a adição.

Parênteses sobrescrevem qualquer precedência, então se não estivermos satisfeitos com a ordem padrão, podemos usá-los para alterá-la. Por exemplo, escrevendo `(1 + 2) * 2`.

Há muitos operadores em JavaScript. Todo operador possui um número correspondente de precedência. O operador com o maior número executa primeiro. Se a precedência é a mesma, a ordem de execução é da esquerda para direita.

Aqui está uma parte da [tabela de precedências](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) (você não precisa lembrar disso, mas observe que os operadores unários possuem maior precedência que os correspondentes binários):

| Precedência | Nome | Sinal |
|------------|------|------|
| ... | ... | ... |
| 17 | mais unário | `+` |
| 17 | negação unária | `-` |
| 16 | exponenciação | `**` |
| 15 | multiplicação | `*` |
| 15 | divisão | `/` |
| 13 | adição | `+` |
| 13 | subtração | `-` |
| ... | ... | ... |
| 3 | atribuição | `=` |
| ... | ... | ... |

Como podemos ver, o "mais unário" possui a prioridade de `17` que é maior do que a `13` da "adição" (mais binário). Por isso, na expressão `"+apples + +oranges"`, os mais unários executam primeiro que a adição.

## Atribuição

Perceba que a atribuição `=` também é um operador. Ela está listada na tabela de precedência com a prioridade bem baixa de `3`.   

Por isso, quando atribuímos uma variável, como `x = 2 * 2 + 1`, os cálculos são feitos primeiro e então o `=` é avaliado, armazenando o resultado em `x`. 

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

### Atribuição = retorna um valor

O fato de `=` ser um operador, não uma construção "mágica" da linguagem, tem uma implicação interessante.

A maioria dos operadores em JavaScript retornam um valor. Isso é óbvio para `+` e `-`, mas também é verdade para `=`.

A chamada `x = value` escreve `value` em `x` *e então o retorna*.

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

No exemplo acima, o resultado da expressão `(a = b + 1)` é o valor que foi atribuído à `a` (isto é `3`). Ele é usado então para avaliações posteriores.

Código estranho, não é? Nós devemos entender como ele funciona, pois às vezes o vemos em bibliotecas JavaScript.

Entretanto, por favor não escreva código desse jeito. Esses truques definitivamente não tornam o código claro ou legível.

### Encadeando atribuições

Outra "feature" interessante é a capacidade de encadear atribuições:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Atribuições encadeadas são avaliadas da direita para esquerda. Primeiro, a mais à direita `2 + 2` é avaliada e atribuída às variáveis à esquerda: `c`, `b` and `a`. Por fim, todas as variáveis compartilharão um mesmo valor.

De novo, visando legibilidade, é melhor separar esse código em algumas linhas:

```js
c = 2 + 2;
b = c;
a = c;
```
Assim é mais fácil de ler, especialmente quando escaneando o código rapidamente.

## Modificação "in-place" (no lugar)

Precisamos com frequência aplicar um operador a uma variável e armazenar o novo resultado nessa mesma variável.

Por exemplo:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

Essa notação pode ser resumida usando os operadores `+=` e `*=`:

```js run
let n = 2;
n += 5; // agora n = 7 (mesmo que n = n + 5)
n *= 2; // agora n = 14 (mesmo que n = n * 2)

alert( n ); // 14
```

Operadores curtos "modify-and-assign" (modifica e atribui) existem para todos os operadores aritméticos e "bitwise" (bit-a-bit): `/=`, `-=`, etc.

Esses operadores possuem a mesma precedência que uma atribuição normal, então eles rodam depois da maioria de outros cálculos.

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (parte à direita avaliada primeiro, mesmo que n *= 8)
```

## Incremento/decremento

<!-- Can't use -- in title, because the built-in parser turns it into a 'long dash' – -->

Incrementar ou decrementar um número em 1 está entre as operações numéricas mais comuns.

Então, existem operadores especiais para isso:

- **Incremento** `++` incrementa a variável em 1:

    ```js run no-beautify
    let counter = 2;
    counter++;        // funciona como counter = counter + 1, mas é mais curto
    alert( counter ); // 3
    ```
- **Decremento** `--` decrementa a variável em 1:

    ```js run no-beautify
    let counter = 2;
    counter--;        // funciona como counter = counter - 1, mas é mais curto
    alert( counter ); // 1
    ```

```warn
Incremento/decremento podem apenas ser aplicados a variáveis. Tentar usá-los em um valor como `5++` acarretará em erro.
```

Os operadores `++` e `--` podem ser colocados antes ou depois de uma variável.

- Quando o operador vai depois da variável, ele está em "forma pós-fixada": `counter++`.
- A "forma pré-fixada" é quando o operador vem antes da variável: `++counter`.

Ambas as declarações fazem a mesma coisa: incrementar `counter` em `1`.  

Existe alguma diferença? Sim, mas só podemos vê-la se usarmos o valor retornado de `++/--`.

Vamos clarear. Como sabemos, todos os operadores retornam um valor. Incremento/decremento não é exceção. A forma pré-fixada retorna o novo valor enquanto que a forma pós-fixada retorna o valor antigo (anterior ao incremento/decremento).

Para ver a diferença, aqui está um exemplo:

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

Na linha `(*)`, a forma *pré-fixada* `++counter` incrementa `counter` e retorna o novo valor, `2`. Então, o `alert` exibe `2`. 

Agora, vamos usar a forma pós-fixada:

```js run
let counter = 1;
let a = counter++; // (*) alterado ++counter para counter++

alert(a); // *!*1*/!*
```

Na linha `(*)`, a forma *pós-fixada* `counter++` também incrementa `counter` mas retorna o valor *antigo* (anterior ao incremento). Então, o `alert` exibe `1`.

Para resumir:

- Se o resultado do incremento/decremento não é usado, não há diferença em qual forma for usada:

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2, the lines above did the same
    ```
- Se queremos incrementar um valor *e* imediatamente usar o resultado do operador, nós precisamos da forma pré-fixada:

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
- Se queremos incrementar um valor mas usar o valor anterior, nós precisamos da forma pós-fixada:

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

````smart header="Incremento/decremento entre outros operadores"
Os operadores `++/--` podem também ser usados dentro de expressões. A precedência deles é mais alta que a maioria das outras operações aritméticas.

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

Embora tecnicamente "okay", essa notação normalmente torna o código menos legível. Uma linha multiplica mesmo as coisas -- nada legal.

Enquanto lendo código, uma rápida passagem de olho "na vertical" pode facilmente perder algo como `counter++` e não será óbvio que a variável foi incrementada.

Nós recomendamos um estilo de "uma linha -- uma ação":

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## Operadores "bitwise" (bit-a-bit)

Operadores bit-a-bit tratam os argumentos como números inteiros 32-bit e trabalham no nível da representação binária.

Esses operadores não são específicos do JavaScript. Eles possuem suporte na maioria das linguagens de programação.

A lista de operadores:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

Esses operadores são muito raramente usados, quando precisamos mexer com números no seu menor nível (bit-a-bit). Não precisaremos desses operadores tão cedo, pois o desenvolvimento web faz pouco uso deles, mas em algumas áreas especiais, como criptografia, eles são muito úteis. Você pode ler o artigo [Operadores bit-a-bit](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) no MDN quando tiver necessidade.

## Vírgula

O operador vírgula `,` é um dos operadores mais raros e estranhos. Às vezes, é usado para escrever códigos mais curtos, então precisamos conhecê-lo para entender melhor o que está se passando.

O operador vírgula permite avaliar várias expressões, separando-as com uma vírgula `,`. Cada uma é avaliada mas somente o resultado da última é retornado.

Por exemplo:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (o resultado de 3 + 4)
```

Aqui, a primeira expressão `1 + 2` é avaliada e o seu resultado é descartado. Então, `3 + 4` é avaliado e retornado como resultado.

```smart header="Vírgula tem uma precedência muito baixa"
Por favor, note que o operador vírgula possui uma precedência muito baixa, menor que `=`, então parênteses são importantes no exemplo acima.

Sem eles: `a = 1 + 2, 3 + 4` avalia `+` primeiro, somando os números em `a = 3, 7`, então o operador de atribuição `=` atribui `a = 3`, e o resto é ignorado. Sendo como `(a = 1 + 2), 3 + 4`.
```

Por que precisamos de um operador que descarta tudo menos a última expressão?

Às vezes, pessoas o usam em construções mais complexas para colocar várias ações em uma linha.

Por exemplo:

```js
// três operações em uma linha
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

Esses truques são usando em muitos frameworks JavaScript. Por isso que estamos mencionando eles. Mas normalmente eles não melhoram a legibilidade do código então devemos pensar bem antes de usá-los.
