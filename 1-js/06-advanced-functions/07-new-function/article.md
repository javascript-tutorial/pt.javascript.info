
# A sintaxe de "new Function"

Existe mais uma maneira de criar uma função. Ela é raramente usada, mas as vezes não existem alternativas.

## Sintaxe

A sintaxe para criar uma função:

```js
let func = new Function ([arg1[, arg2[, ...argN]],] functionBody)
```

Em outras palavras, os parâmetros da função (ou, mais precisamente, os nomes deles) vêm primeiro, e o corpo da função vem por último. Todos os argumentos são `strings`.

É mais fácil de compreender olhando um exemplo. Aqui está uma função com dois argumentos:

```js run
let sum = new Function('a', 'b', 'return a + b'); 

alert( sum(1, 2) ); // 3
```

Se não existem argumentos, então somente existe um único argumento, que é o corpo da função:

```js run
let sayHi = new Function('alert("Olá")');

sayHi(); // Olá
```

A maior diferença de outros métodos vistos é que a função é literalmente criada a partir de uma `string`, que é passada em tempo de execução. 

Todas as declarações anteriores requeriam de nós, programadores, escrever o código da função dentro do *script*.

Mas `new Function` permite transformar qualquer `string` em uma função. Por exemplo, nós podemos receber uma nova função de um servidor e executa-la:

```js
let str = ... recebe o código de um servidor dinamicamente ...

let func = new Function(str);
func();
```

Ela é usada em casos muito específicos, como quando nós recebemos código de um servidor, ou para compilar dinamicamente a função a partir de um *template*. A necessidade disso geralmente surge em estágios avançados de desenvolvimento.

## Closure

No geral, uma função se "lembra" de onde ela foi criada na propriedade especial `[[Environment]]`. Ela referencia o escopo léxico de onde ela foi criada.

Porém quando uma função é criada usando `new Function`, a sua `[[Environment]]` não referencia o atual escopo léxico, mas sim o escopo global.

```js run

function getFunc() {
  let value = "teste";

*!*
  let func = new Function('alert(value)');
*/!*

  return func;
}

getFunc()(); // erro: value não foi definido
```

Compare-a com o comportamento padrão:

```js run 
function getFunc() {
  let value = "teste";

*!*
  let func = function() { alert(value); };
*/!*

  return func;
}

getFunc()(); // *!*"teste"*/!*, do escopo léxico de getFunc
```

Essa caracteristica especial de `new Function` parece estranha, mas se apresenta muito útil na prática.

Imagine que nós precisamos criar uma função a partir de uma `string`. O código dessa função é desconhecido durante a escrita do *script* (por esse motivo nós não usamos funções regulares), mas vai ser conhecido durante o processo de execução. Nós podemos recebe-lo do servidor ou de outra fonte.

Nossa nova função precisa interagir com o *script* principal.

Talvez nós queremos que ela consiga acessar variáveis locias externas?

O problema é que antes do JavaScript ser publicado para produção, ele é comprimido usando um "minificador" -- um programa especial que encolhe código removendo comentários, espaços e -- o mais importante, renomeia variáveis locais em variáveis mais curtas.

Por exemplo, se uma função tem `let userName`, o minificador o troca  por `let a` (ou outra letra se esta estiver ocupada), e ele faz isso em toda parte. Isso usualmente é uma coisa segura de se fazer, porque a variável é local, nada fora da função pode acessar ela. E dentro da função, o minificador troca todas as suas menções. Minificadores são inteligentes, eles analisam a estrutura do código, para que eles não quebrem nada. Eles não são um simples "encontra-e-repõem".

Entretanto, se `new Function` pudesse acessar variáveis externas, então ele não conseguiria encontrar `userName`, pois ele é passado como uma `string` **depois** que o código é minificado.

**Mesmo se nós pudessemos acessar o escopo léxico externo na `new Function`, nós teriamos problemas com minificadores.**

A "característica especial" de `new Function` nos salva de erros.

E ela assegura um código melhor. Se nós precisarmos passar algo para uma função criada por `new Function`, nós devemos passar ele explicitamente como um argumento.

A nossa função "sum" faz isso corretamente:

```js run 
*!*
let sum = new Function('a', 'b', 'return a + b');
*/!*

let a = 1, b = 2;

*!*
// variáveis externas são passdas como argumentos
alert( sum(a, b) ); // 3
*/!*
```

## Resumo

A sintaxe:

```js
let func = new Function(arg1, arg2, ..., body);
```

Por razões históricas, argumentos também podem ser dados como uma lista separada por vírgulas. 

Estes três significam o mesmo:

```js 
new Function('a', 'b', 'return a + b'); // sintaxe básica
new Function('a,b', 'return a + b'); // separada por vírgula
new Function('a , b', 'return a + b'); // separada por vírgula com espaços
```

Funções criadas com `new Function`, têm `[[Environment]]` referenciando o escopo léxico global, e não o escopo externo. Por isso, elas não podem usar variáveis externas. Porém isso na verdade é bom, porque isto nos salva de erros. Passar parametros explicitamente é um método muito melhor arquiteturamente e não causa problemas com minificadores.
