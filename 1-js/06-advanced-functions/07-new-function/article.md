
# A sintaxe de "new Function"

Existe mais uma maneira de criar uma função. Ela é raramente usada, mas às vezes não existem alternativas.

## Sintaxe

A sintaxe para criar uma função:

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

A função é criada com os argumentos `arg1...argN` e entregue para `functionBody`.

É mais fácil de compreender olhando um exemplo. Aqui está uma função com dois argumentos:

```js run
let sum = new Function('a', 'b', 'return a + b');

alert( sum(1, 2) ); // 3
```

E aqui está uma função sem argumentos, apenas com o corpo da função:

```js run
let sayHi = new Function('alert("Olá")');

sayHi(); // Olá
```

A principal diferença de outras formas que vimos é a função ser criada literalmente a partir de uma string, e passada em tempo de execução.

Todas as declarações anteriores requeriam de nós, programadores, escrever o código da função dentro do *script*.

Mas `new Function` permite transformar qualquer `string` em uma função. Por exemplo, nós podemos receber uma nova função de um servidor e executa-la:

```js
let str = ... recebe o código de um servidor dinamicamente ...

let func = new Function(str);
func();
```

É usado em casos muito específicos, como quando recebemos código de um servidor, ou para compilar dinamicamente uma função a partir de um template, em aplicações web complexas.

## Closure

Normalmente, uma função lembra onde nasceu na propriedade especial `[[Environment]]`. Ela faz referência ao Ambiente Lexical de onde foi criado (abordaremos isso no capítulo <info:closure>).

Mas quando uma função é criada usando `new Function`, seu `[[Environment]]` é definido para fazer referência não ao Ambiente Lexical atual, mas ao ambiente global.

Portanto, tal função não tem acesso a variáveis ​​externas, apenas a variáveis globais.

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

Essa característica especial de `new Function` parece estranha, mas se apresenta muito útil, na prática.

Imagine que nós precisamos criar uma função a partir de uma `string`. O código dessa função é desconhecido durante a escrita do *script* (por esse motivo, nós não usamos funções regulares), mas vai ser conhecido durante o processo de execução. Nós podemos receber do servidor ou de outra fonte.

Nossa nova função precisa interagir com o *script* principal.

E se você pudesse acessar as variáveis ​​externas?

O problema é que antes de o JavaScript ser publicado para produção, ele é comprimido usando um "minificador" -- um programa especial que encolhe código removendo comentários, espaços e -- o mais importante, renomeia variáveis locais em variáveis mais curtas.

Por exemplo, se uma função tem uma variável `let userName`, o minificador a troca por `let a` (ou outra letra se esta estiver ocupada), e ele faz isso em toda parte. Isso usualmente é uma coisa segura de se fazer, por a variável ser local, nada fora da função pode acessar ela. E dentro da função, o minificador troca todas as suas menções. Minificadores são inteligentes, eles analisam a estrutura do código, para que eles não quebrem nada. Eles não são um simples não-inteligente "encontra-e-substitui".

Portanto, se `new Function` tivesse acesso a variáveis ​​externas, não seria possível encontrar `userName` renomeado.

**Se a `new Function` tivesse acesso a variáveis ​​externas, haveria problemas com minificadores.**

Além disso, esse código seria arquitetonicamente ruim e sujeito a erros.

Para passar algo para uma função, criada como `new Function`, devemos usar seus argumentos.

## Resumo

A sintaxe:

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

Por razões históricas, os argumentos também podem ser apresentados como uma lista separada por vírgulas.

Estas três declarações significam o mesmo:

```js
new Function('a', 'b', 'return a + b'); // sintaxe básica
new Function('a,b', 'return a + b'); // separados por vírgula
new Function('a , b', 'return a + b'); // separados por vírgula com espaços
```

Funções criadas com `new Function` têm `[[Environment]]` referenciando o ambiente lexical global, não o externo. Portanto, eles não podem usar variáveis ​​externas. Mas isso é realmente bom, porque nos protege contra erros. Passar parâmetros explicitamente é um método muito melhor do ponto de vista arquitetônico e não causa problemas com minificadores.
