# Data e hora

Vamos conhecer um novo objeto embutido: [Date](mdn:js/Date). Ele armazena a data, hora e fornece métodos para gerenciamento de data/hora.

Por exemplo, podemos usá-lo para armazenar tempos de criação/modificação, para medir o tempo ou apenas para imprimir a data atual.

## Criação

Para criar um novo objeto `Date`, chame `new Date()` com um dos seguintes argumentos:

`new Date()`
: Sem argumentos - crie um objeto `Date` para a data e hora atuais:

    ```js run
    let now = new Date();
    alert( now ); // mostra a data/hora atual
    ```

`new Date(milliseconds)`
: Cria um objeto `Date` com o tempo igual ao número de milissegundos (1/1000 de segundo) passado após 1 de janeiro de 1970 UTC+0.

    ```js run
    // 0 significa 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // agora adicione 24 horas, recebe 02.01.1970 UTC+0
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
    ```

    Um número inteiro representando o número de milissegundos que passou desde o início de 1970 é chamado de *timestamp*.

    É uma representação numérica leve de uma data. Podemos sempre criar uma data a partir de um timestamp usando `new Date(timestamp)` e converter o objeto `Date` existente em um timestamp usando o método `date.getTime()` (veja abaixo).

`new Date(datestring)`
: Se existe um único argumento, e é uma string, então ele é analisado com o algoritmo `Date.parse` (veja abaixo).

    ```js run
    let date = new Date("2017-01-26");
    alert(date);
    // A hora não foi dada, então é assumida como meia-noite GMT e
    // é ajustado de acordo com o fuso horário no qual o código é executado
    // Então o resultado poderia ser
    // Thu 26 Jan 2017 11:00:00 GMT+1100 (Horário de Verão da Austrália Oriental)
    // ou
    // Thu 25 Jan 2017 16:00:00 GMT-0800 (Hora Padrão do Pacífico)
    ```

`new Date(year, month, date, hours, minutes, seconds, ms)`
: Crie a data com os componentes fornecidos no fuso horário local. Apenas os dois primeiros argumentos são obrigatórios.

    - O ano `year` deve ter 4 dígitos: `2013` está certo, `98` não está.
    - A contagem do mês `month` começa em `0` (Jan), até `11` (Dec).
    - O parâmetro `date` é na verdade o dia do mês, se ausente então assume-se `1`.
    - Se `hours/minutes/seconds/ms` são ausentes, são assumidos como sendo `0`.

    Por exemplo:

    ```js
    new Date(2011, 0, 1, 0, 0, 0, 0); // // 1 Jan 2011, 00:00:00
    new Date(2011, 0, 1); // o mesmo, horas etc são 0 por padrão
    ```

    A precisão mínima é 1 ms (1/1000 sec):

    ```js run
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567
    ```

## Acessar componentes da data

Existem métodos para acessar o ano, mês e assim por diante do objeto `Date`:

[getFullYear()](mdn:js/Date/getFullYear)
: Recebe o ano (4 dígitos)

[getMonth()](mdn:js/Date/getMonth)
: Recebe o mês, **de 0 a 11**.

[getDate()](mdn:js/Date/getDate)
: Recebe o dia do mês, de 1 a 31, o nome do método parece um pouco estranho.

[getHours()](mdn:js/Date/getHours), [getMinutes()](mdn:js/Date/getMinutes), [getSeconds()](mdn:js/Date/getSeconds), [getMilliseconds()](mdn:js/Date/getMilliseconds)
: Recebem os correspondentes componentes do horário.

```warn header="Não `getYear()`, mas `getFullYear()`"
Muitos mecanismos JavaScript implementam um método não padrão `getYear()`. Este método está obsoleto. Retorna o ano de 2 dígitos às vezes. Por favor, nunca use isso. Existe `getFullYear ()` para o ano.
```

Além disso, podemos obter um dia da semana:

[getDay()](mdn:js/Date/getDay)
: Obtém o dia da semana, de `0` (domingo) a `6` (sábado). O primeiro dia é sempre domingo, em alguns países isso não acontece, mas não pode ser alterado.

**Todos os métodos acima retornam os componentes em relação ao fuso horário local.**

Há também suas contrapartes UTC, que retornam dia, mês, ano e assim por diante para o fuso horário UTC+0: [getUTCFullYear()](mdn:js/Data/getUTCFullYear), [getUTCMonth()] (mdn:js/Date/getUTCMonth), [getUTCDay()](mdn:js/data/getUTCDay). Apenas insira o `"UTC"` logo após `"get"`.

Se o seu fuso horário local for alterado em relação ao UTC, o código abaixo mostrará horários diferentes:

```js run
// data atual
let date = new Date();

// a hora no seu fuso horário atual
alert( date.getHours() );

// a hora no fuso horário UTC+0 (horário de Londres sem horário de verão)
alert( date.getUTCHours() );
```

Além dos métodos fornecidos, há dois especiais que não têm uma variante UTC:

[getTime()](mdn:js/Date/getTime)
: Retorna o timestamp da data - um número de milissegundos passado a partir de 1º de janeiro de 1970 UTC+0.

[getTimezoneOffset()](mdn:js/Date/getTimezoneOffset)
: Retorna a diferença entre o fuso horário local e o UTC, em minutos:

    ```js run
    // se você estiver no fuso horário UTC-1, retorna 60
    // se você estiver no fuso horário UTC + 3, retorna -180
    alert( new Date().getTimezoneOffset() );

    ```

## Configuração de componentes de data

Os métodos a seguir permitem definir componentes de data/hora:

- [`setFullYear(year, [month], [date])`](mdn:js/Date/setFullYear)
- [`setMonth(month, [date])`](mdn:js/Date/setMonth)
- [`setDate(date)`](mdn:js/Date/setDate)
- [`setHours(hour, [min], [sec], [ms])`](mdn:js/Date/setHours)
- [`setMinutes(min, [sec], [ms])`](mdn:js/Date/setMinutes)
- [`setSeconds(sec, [ms])`](mdn:js/Date/setSeconds)
- [`setMilliseconds(ms)`](mdn:js/Date/setMilliseconds)
- [`setTime(milliseconds)`](mdn:js/Date/setTime) (define a data inteira por milissegundos desde 01.01.1970 UTC)

Cada um deles, exceto `setTime()`, tem uma variante UTC, por exemplo: `setUTCHours()`.

Como podemos ver, alguns métodos podem definir vários componentes de uma só vez, por exemplo, `setHours`. Os componentes que não são mencionados não são modificados.

Por exemplo:

```js run
let today = new Date();

today.setHours(0);
alert(today); // ainda hoje, mas a hora foi mudada para 0

today.setHours(0, 0, 0, 0);
alert(today); // ainda hoje, agora 00:00:00 em ponto.
```

## Autocorreção

A *autocorreção* é uma característica muito útil dos objetos `Date`. Podemos definir valores fora do intervalo e ele se ajustará automaticamente.

Por exemplo:

```js run
let date = new Date(2013, 0, *!*32*/!*); // 32 Jan 2013 ?!?
alert(date); // ...é 1 de Fevereiro de 2013!
```

Os componentes de data fora do intervalo são distribuídos automaticamente.

Digamos que precisamos aumentar a data "28 de fevereiro de 2016" em 2 dias. Pode ser "2 Mar" ou "1 Mar" no caso de um ano bissexto. Nós não precisamos pensar sobre isso. Apenas adicione 2 dias. O objeto `Date` fará o resto:

```js run
let date = new Date(2016, 1, 28);
*!*
date.setDate(date.getDate() + 2);
*/!*

alert( date ); // 1 Mar 2016
```

Esse recurso costuma ser usado para obter a data após o período de tempo determinado. Por exemplo, vamos pegar a data para "70 segundos depois de agora":

```js run
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert( date ); // mostra a data correta
```

Também podemos definir valores zero ou até negativos. Por exemplo:

```js run
let date = new Date(2016, 0, 2); // 2 Jan 2016

date.setDate(1); // define o dia 1 do mês
alert( date );

date.setDate(0); // o mínimo do dia é 1, então o último dia do mês anterior é assumido
alert( date ); // 31 Dec 2015
```

## Data para número, date diff

Quando um objeto `Date` é convertido em número, ele se torna o timestamp igual a `date.getTime()`:

```js run
let date = new Date();
alert(+date); // o número de milissegundos, o mesmo que date.getTime()
```

O efeito colateral importante: as datas podem ser subtraídas, o resultado é a sua diferença em ms.

Isso pode ser usado para medições de tempo:

```js run
let start = new Date(); // começa a medir o tempo

// fazer o trabalho
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // termina de medir o tempo

alert( `O loop levou ${end - start} ms` );
```

## Date.now()

Se quisermos apenas medir o tempo, não precisamos do objeto 'Data'.

Existe um método especial `Date.now()` que retorna o timestamp atual.

É semanticamente equivalente a `new Date().getTime()`, mas não cria um objeto `Date` intermediário. Portanto, é mais rápido e não pressiona a coleta de lixo.

Ele é usado principalmente por conveniência ou quando o desempenho é importante, como em jogos em JavaScript ou outros aplicativos especializados.

Então, isso é provavelmente melhor:

```js run
*!*
let start = Date.now(); // contagem de milissegundos desde 1 Jan 1970
*/!*

// faça o trabalho
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // feito
*/!*

alert( `The loop took ${end - start} ms` ); // subtrai números, não datas
```

## Benchmarking

Se queremos um benchmark confiável da função faminta por CPU, devemos ter cuidado.

Por exemplo, vamos medir duas funções que calculam a diferença entre duas datas: qual delas é mais rápida?

Tais medições de desempenho são freqüentemente chamadas de "benchmarks".

```js
// temos date1 e date2, qual função retorna mais rapidamente sua diferença em ms?
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// ou
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```

Estes dois fazem exatamente a mesma coisa, mas um deles usa um `date.getTime()` explícito para obter a data em ms, e o outro depende de uma transformação data-para-numero. Seu resultado é sempre o mesmo.

Então, qual é mais rápido?

A primeira ideia pode ser executá-las várias vezes seguidas e medir a diferença de tempo. Para o nosso caso, as funções são muito simples, então temos que fazer isso pelo menos 100 mil vezes.

Vamos medir:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

alert( 'Time of diffSubtract: ' + bench(diffSubtract) + 'ms' );
alert( 'Time of diffGetTime: ' + bench(diffGetTime) + 'ms' );
```

Uau! Usando o `getTime()` é muito mais rápido! Isso porque não há conversão de tipo, é muito mais fácil para os motores otimizarem.

Ok, nós temos alguma coisa. Mas isso não é uma boa benchmark ainda.

Imagine que na hora de rodar o `bench(diffSubtract)` a CPU estava fazendo algo em paralelo, e estava tomando recursos. E na hora de rodar o `bench(diffGetTime)` esse trabalho terminou.

Um cenário bastante real para um sistema operacional multi-processo moderno.

Como resultado, o primeiro benchmark terá menos recursos de CPU do que o segundo. Isso pode levar a resultados errados.

**Para um benchmarking mais confiável, todo o pacote de benchmarks deve ser reexecutado várias vezes.**

Por exemplo, assim:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

*!*
// execute bench(upperSlice) e bench(upperLoop) 10 vezes cada um alternando
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'Tempo total para diffSubtract: ' + time1 );
alert( 'Tempo total para diffGetTime: ' + time2 );
```

Mecanismos modernos de JavaScript começam a aplicar otimizações avançadas apenas ao "hot code" que é executado várias vezes (não é necessário otimizar as coisas raramente executadas). Portanto, no exemplo acima, as primeiras execuções não são bem otimizadas. Podemos querer adicionar uma corrida de aquecimento:

```js
// adicionado para "aquecimento" antes do loop principal
bench(diffSubtract);
bench(diffGetTime);

// now benchmark
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

```warn header="Tenha cuidado fazendo microbenchmarking"
Mecanismos modernos de JavaScript realizam muitas otimizações. Eles podem ajustar os resultados de "testes artificiais" em comparação ao "uso normal", especialmente quando comparamos algo muito pequeno, como o funcionamento de um operador ou uma função interna. Então, se você quer seriamente entender o desempenho, então, por favor, estude como o mecanismo JavaScript funciona. E então você provavelmente não precisará de microbenchmarks.

O grande pacote de artigos sobre o V8 pode ser encontrado em <http://mrale.ph>.
```

## Date.parse de uma string

O método [Date.parse(str)](mdn:js/Date/parse) pode ler uma data de uma string.

O formato da string deve ser: `AAAA-MM-DDTHH:mm:ss.sssZ`, onde:

- `AAAA-MM-DD` -- é a data: ano-mês-dia.
- O caracter `"T"` é usado como delimitador.
- `HH:mm:ss.sss` -- é o horário: horas, minutos, segundos e milissegundos.
- A parte opcional `'Z'` indica o fuso horário no formato `+-hh:mm`. Uma única letra `Z` que significaria UTC+0.

Variantes mais curtas também são possíveis, como `AAAA-MM-DD` ou `AAAA-MM` ou mesmo `AAAA`.

A chamada para `Date.parse(str)` analisa a string no formato dado e retorna o timestamp (número de milissegundos a partir de 1 de janeiro de 1970 UTC+0). Se o formato for inválido, retorna `NaN`.

Por exemplo:

```js run
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (timestamp)
```

Podemos criar instantaneamente um objeto `new Date` a partir do timestamp:

```js run
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);  
```

## Resumo

- A data e a hora em JavaScript são representadas com o objeto [Date](mdn:js/Date). Não podemos criar "apenas data" ou "apenas tempo": os objetos `Date` sempre carregam os dois.
- Os meses são contados a partir de zero (sim, janeiro é um mês zero).
- Dias da semana em `getDay()` também são contados a partir de zero (que é domingo).
- `Date` corrige-se automaticamente quando os componentes fora do intervalo são definidos. Bom para adicionar/subtrair dias/meses/horas.
- As datas podem ser subtraídas, dando sua diferença em milissegundos. Isso é porque um `Date` se torna o timestamp quando convertido em um número.
- Use `Date.now()` para obter o timestamp atual rapidamente.

Observe que, diferentemente de muitos outros sistemas, os timestamps no JavaScript estão em milissegundos, não em segundos.

Às vezes precisamos de medições de tempo mais precisas. O próprio JavaScript não tem uma maneira de medir o tempo em microssegundos (1 milionésimo de segundo), mas a maioria dos ambientes o fornece. Por exemplo, o navegador tem [performance.now()](mdn:api/Performance/now) que fornece o número de milissegundos a partir do início do carregamento da página com precisão de microssegundos (3 dígitos após o ponto):

```js run
alert(`Loading started ${performance.now()}ms ago`);
// Algo do tipo: "Carregamento começou 34731.26000000001ms atrás"
// .26 é microssegundos (260 microssegundos)
// mais de 3 dígitos após o ponto decimal são erros de precisão, mas somente os 3 primeiros estão corretos
```

O Node.js possui o módulo `microtime` e outras formas. Tecnicamente, quase qualquer dispositivo e ambiente permite obter mais precisão, não é apenas em `Date`.
