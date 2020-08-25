# Teste automatizado com mocha

Teste automatizado será utilizado nos exercícios seguintes, e também é amplamente usado em projetos reais.

## Porque precisamos de testes?

Quando escrevemos uma função, nós geralmente podemos imaginar o que ela deveria fazer: que parâmetros dariam que resultados.

Durante o desenvolvimento, podemos analisar a função executando-a e comparando o resultado obtido ao esperado. Por exemplo, podemos fazê-lo na consola.

Se algo estiver errado -- então corrigimos o código, executamos de novo, verificamos o resultado -- e continuamos até ela funcionar.

Mas, tais "re-execuções" manuais são imperfeitas.

**Ao testar código com re-execuções manuais, é fácil olvidar alguma coisa.**

Por exemplo, estamos a criar uma função `f`. Escrevemos algum código, e testamos: `f(1)` funciona, mas `f(2)` não. Corrigimos o código e agora `f(2)` funciona. Parece completo? Mas, nos esquecemos de re-testar `f(1)`. Que pode estar agora a produzir um erro.

Isso é muito comum. Quando desenvolvemos algo, mantemos uma quantidade de possíveis casos exemplo (*use cases*) em mente. Mas, é difícil esperar que um programador os verifique todos manualmente após cada alteração. Assim, torna-se fácil corrigir uma coisa e quebrar outra.

**Teste automatizado significa que testes são escritos separadamente, adicionalmente ao código. Eles correm as nossas funções de várias maneiras e comparam os resultados obtidos aos esperados.**

## Desenvolvimento Guiado por Comportamento (Behavior Driven Desenvolvimento [BDD])

Vamos começar por uma técnica chamada [Desenvolvimento Guiado por Comportamento](https://pt.wikipedia.org/wiki/Behavior_Driven_Development), ou abreviadamente BDD (em Inglês).

**BDD são três coisas em uma: testes E documentação E exemplos.**

Para se compreender BDD, vamos examinar um caso prático de desenvolvimento.

## Desenvolvimento de "pow": a *spec*

Digamos que queremos fazer uma função `pow(x, n)` que eleve `x` a uma potência inteira `n`. Nós assumimos que `n≥0`.

Essa tarefa é apenas um exemplo: existe o operador `**` em JavaScript que pode fazer isso, mas aqui nós nos concentramos no fluxo de desenvolvimento que pode também ser aplicado a tarefas mais complexas.

Antes de criarmos o código de `pow`, podemos imaginar o que a função deveria fazer e descrevê-lo (*describe it*).

Tal descrição é chamada de *especificação*, ou abreviadamente uma *spec*, e contém descrições de casos exemplo (*use cases*) acompanhados de testes para eles, como por exemplo:

```js
describe("pow", function() {

  it("eleva à n-ésima potência", function() {
    assert.equal(pow(2, 3), 8);
  });

});
```

Uma *spec* tem três principais blocos construtores, como pode ver acima:

`describe("título", function() { ... })`
: Que funcionalidade estamos a descrever. No nosso caso, estamos a descrever a função `pow`. São usados para agrupar "executores" ("*workers*") -- os blocos `it`.

`it("descrição do caso exemplo", function() { ... })`
: No título de `it` nós, *de uma forma claramente legível*, descrevemos o caso exemplo em questão, e no segundo argumento está uma função que o testa.

`assert.equal(valor1, valor2)`
: O código dentro do bloco `it`, se a implementação estiver correta, não deverá mostrar erros.

```text
Funções `assert.*` são usadas para verificar se `pow` funciona como esperado. Aqui mesmo, estamos a usar uma delas -- `assert.equal`, que compara argumentos e dá como resultado um erro se eles não forem iguais. Aqui, ela verifica se o resultado de `pow(2, 3)` é `8`. Existem outros tipos de comparações e verificações, que adicionaremos mais adiante.
```

A especificação pode ser executada, e irá correr o teste especificado no bloco `it`. O que veremos mais adiante.

## O fluxo de desenvolvimento

Geralmente, o fluxo de desenvolvimento se assemelha a:

1. Uma *spec* inicial é escrita, com testes para a mais básica funcionalidade.
2. Uma implementação inicial é criada.
3. Para verificar se ela funciona, nós corremos a infraestrutura de teste [Mocha](http://mochajs.org/) (mais detalhes em breve) que corre a *spec*. Enquanto a funcionalidade não estiver completa, erros são mostrados. Nós a corrigimos até que tudo funcione.
4. Agora, temos uma implementação inicial a funcionar com testes.
5. Adicionamos mais casos exemplo (*use cases*) à *spec*, provávelmente ainda não suportados pelas implementações. Testes começam a falhar.
6. Vamos para 3, atualizamos a implementação até que os testes nâo forneçam erros.
7. Repetimos os passos 3-6 até que a funcionalidade esteja pronta.

Assim, o desenvolvimento é *iterativo*. Nós escrevemos a *spec*, a implementamos, nos asseguramos de que os testes passam, depois escrevemos mais testes, nos asseguramos de que eles funcionam, etc. No final nós temos ambos, uma implementação a funcionar e testes para ela.

Vejamos este fluxo de desenvolvimento no nosso caso prático.

O primeiro passo já está completo: nós temos uma *spec* inicial para `pow`. Agora, antes de fazer a implementação, vamos utilizar umas poucas bibliotecas (*libraries*) de JavaScript para executar os testes, apenas para ver se eles estão a funcionar (todos irão falhar).

## A *spec* em ação

Aqui, no tutorial, nós iremos usar as seguintes bibliotecas de JavaScript para testes:

- [Mocha](http://mochajs.org/) -- a infraestrutura principal: ela fornece funções de teste comuns, incluindo `describe` e `it` e a principal função que executa os testes.
- [Chai](http://chaijs.com) -- a biblioteca (*library*) com muitas *asserções*. Ela permite usar muitas diferentes *asserções*; por ora, nós precisamos de apenas `assert.equal`.
- [Sinon](http://sinonjs.org/) -- a biblioteca para espiar sobre funções, simular funções incorporadas (built-in) e mais; nós a vamos precisar muito mais tarde.

Estas bibliotecas, são adequadas a testes quer usando um navegador (*in-browser*) como efetuados num servidor (*server-side*). Aqui, nós vamos considerar a variante do navegador.

A página HTML completa, com estas infraestruturas e a *spec* `pow`:

```html
  src="index.html"
```

A página pode ser dividida em cinco partes:

1. A `<head>` -- adiciona bibliotecas de terceiros (*third-party*) e estilos para testes.
2. O `<script>` com a função para o teste, no nosso caso -- com o código para `pow`.
3. Os testes -- no nosso caso um programa externo `test.js`, que tem o `describe("pow", ...)` visto acima.
4. O elemento HTML `<div id="mocha">`, será usado por Mocha para a saída dos resultados.
5. Os testes são iniciados com o comando `mocha.run()`.

O resultado:

[iframe height=250 src="pow-1" border=1 edit]

Por ora, o teste falha, existe um erro. O que é lógico: nós temos uma função sem código em `pow`; assim, `pow(2,3)` retorna `undefined` em vez de `8`.

Para o futuro, vamos tomar nota de que existem executadores de testes (*test-runners*) de nível mais elevado, como [karma](https://karma-runner.github.io/) e outros, que tornam fácil correr automáticamente (*autorun*) muitos testes diferentes.

## Implementação inicial

Vamos fazer uma implementação simples de `pow`, para passar os testes:

```js
function pow(x, n) {
  return 8; // :) nós fizémos batota!
}
```

Wow, agora ela funciona!

[iframe height=250 src="pow-min" border=1 edit]

## Melhorando a *spec*

O que nós fizémos é definitivamente uma batota. A função não funciona: uma tentativa para calcular `pow(3,4)` daria um resultado incorreto, mas os testes passam.

...Mas a situação é muito comum, acontece na prática. Testes passam, mas a função funciona de forma errada. A nossa *spec* está imperfeita. Nós precisamos de lhe adicionar mais casos exemplo (*use cases*).

Vamos adicionar mais um teste para verificar se `pow(3, 4) = 81`.

Aqui, nós podemos selecionar uma das duas formas para organizar o teste:

1. A primeira variante -- adicione mais um `assert` a um mesmo `it`:

    ```js
    describe("pow", function() {

      it("eleva à n-ésima potência", function() {
        assert.equal(pow(2, 3), 8);
    *!*
        assert.equal(pow(3, 4), 81);
    */!*
      });

    });
    ```

2. A segunda -- faça dois testes:

    ```js
    describe("pow", function() {

      it("2 elevado a 3 é 8", function() {
        assert.equal(pow(2, 3), 8);
      });

      it("3 elevado a 3 é 27", function() {
        assert.equal(pow(3, 3), 27);
      });

    });
    ```

A principal diferença é que quando um `assert` desencadeia um erro, o bloco `it` termina imediatamente. Assim, na primeira variante se o primeiro `assert` falhar, nós nunca veremos o resultado do segundo `assert`.

Fazer testes em separado é útil para se obter mais informação sobre o que se está a passar, portanto a segunda variante é melhor.

E para além disso, é mais uma boa regra para se seguir.

**Um teste verifica uma coisa.**

Se olharmos para o teste e virmos duas verificações independentes, o melhor é reparti-lo em dois mais simples.

Assim, vamos prosseguir pela segunda variante.

O resultado:

[iframe height=250 src="pow-2" edit border="1"]

Como nós esperávamos, o segundo teste falhou. Seguramente, a nossa função retorna sempre `8`, enquanto o `assert` espera `27`.

## Melhorando a implementação

Vamos escrever algo mais real para os testes passarem:

```js
function pow(x, n) {
  let resultado = 1;

  for (let i = 0; i < n; i++) {
    resultado *= x;
  }

  return resultado;
}
```

Para se ter a certeza de que a função trabalha bem, vamos testá-la para mais valores. Em vez de escrever blocos `it` manualmente, nós os podemos gerar num `for`:

```js
describe("pow", function() {

  function makeTest(x) {
    let expected = x * x * x;
    it(`${x} na potência 3 é ${expected}`, function() {
      assert.equal(pow(x, 3), expected);
    });
  }

  for (let x = 1; x <= 5; x++) {
    makeTest(x);
  }

});
```

O resultado:

[iframe height=250 src="pow-3" edit border="1"]

## describe aninhados

Agora, vamos adicionar ainda mais testes. Mas, antes tomemos nota de que a função auxiliar `makeTest` e o `for` deveriam estar juntos agrupados. Nós não precisaremos de `makeTest` em outros testes, apenas é necessária no `for`: a sua tarefa comum é verificar como `pow` eleva à potência pretendida.

O agrupamento é feito com `describe` aninhados:

```js
describe("pow", function() {

*!*
  describe("eleva x à potência 3", function() {
*/!*

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} elevado a 3 é ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

*!*
  });
*/!*

  // ... mais testes a seguir aqui, ambos 'describe' e 'it' podem ser adicionados
});
```

O `describe` aninhado define um novo "subgrupo" de testes. No resultado mostrado, nós podemos ver os títulos indentados:

[iframe height=250 src="pow-4" edit border="1"]

No futuro, nós podemos adicionar mais `it` e `describe` ao nível de topo com outras funções auxiliares, elas não irão ver `makeTest`.

```smart header="'before/after' e 'beforeEach/afterEach'"
Nós podemos definir funções `before/after`, que corram antes/após os testes serem executados, e também funções `beforeEach/afterEach` que corram antes/após *cada* `it`.

```

Por exemplo:

```js no-beautify
describe("test", function() {

  before(() => alert("Testes iniciados – antes de todos os testes"));
  after(() => alert("Testes terminados – após todos os testes"));

  beforeEach(() => alert("Antes de um teste - entrando para um teste"));
  afterEach(() => alert("Após um teste - saindo de um teste"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
```

A sequência da execução será:

```text
Testes iniciados – antes de todos os testes (before)
Antes de um teste - entrando para um teste (beforeEach)
1
Após um teste - saindo de um teste   (afterEach)
Antes de um teste - entrando para um teste (beforeEach)
2
Após um teste - saindo de um teste   (afterEach)
Testes terminados – após todos os testes (after)
```

[edit src="beforeafter" title="Open the example in the sandbox."]

Geralmente, `beforeEach/afterEach` e `before/after` são usadas para executar a  inicialização, zerar contadores ou fazer mais alguma coisa entre os testes (ou grupos de testes).

## Aumentando a *spec*

A funcionalidade básica de `pow` está completa. A primeira parte do desenvolvimento está feita. Quando acabarmos de celebrar e de beber champagne -- vamos a tornar melhor.

Como foi dito, a função `pow(x, n)` foi feita para trabalhar com valores inteiros positivos de `n`.

Para indicar um erro matemático, geralmente as funções de JavaScript retornam `NaN`. Vamos fazer o mesmo para valores inválidos de `n`.

Primeiro vamos adicionar a funcionalidade à spec(!):

```js
describe("pow", function() {

  // ...

  it("para n negativos, o resultado é NaN", function() {
*!*
    assert.isNaN(pow(2, -1));
*/!*
  });

  it("para n não-inteiros, o resultado é NaN", function() {
*!*
    assert.isNaN(pow(2, 1.5));
*/!*
  });

});
```

O resultado com novos testes:

[iframe height=530 src="pow-nan" edit border="1"]

Os testes agora adicionados falham, porque a nossa implementação não possui suporte para eles. É assim como BDD é feito: primeiro nós escrevemos testes que falham, e depois fazemos uma implementação para eles.

```smart header="Outras asserções"

Por favor, observe a asserção `assert.isNaN`: ela verifica por `NaN`.

Existem ainda outras asserções em [Chai](http://chaijs.com), como por exemplo:

- `assert.equal(valor1, valor2)` -- verifica a igualdade `valor1 == valor2`.
- `assert.strictEqual(valor1, valor2)` -- verifica a igualdade exata (*strict*) `valor1 === valor2`.
- `assert.notEqual`, `assert.notStrictEqual` -- verificação inversa às de acima.
- `assert.isTrue(valor)` -- verifica se `valor === true`
- `assert.isFalse(valor)` -- verifica se `valor === false`
- ...a lista completa está em [docs](http://chaijs.com/api/assert/)
```

Assim, nós deveríamos adicionar algumas linhas a `pow`:

```js
function pow(x, n) {
*!*
  if (n < 0) return NaN;
  if (Math.round(n) != n) return NaN;
*/!*

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Agora funciona, todos os testes passam:

[iframe height=300 src="pow-full" edit border="1"]

[edit src="pow-full" title="Abra o exemplo final completo no ambiente isolado de processos (*sandbox*)."]

## Resumo

Em BDD, a *spec* vem primeiro, seguida pela implementação. No final, nós temos ambos a *spec* e o código.

A *spec* pode ser usada de três formas:

1. Como **Testes** - eles guarantem que o código funciona corretamente.
2. Como **Docs** -- os títulos de `describe` e `it` dizem o que a função faz.
3. Como **Exemplos** -- os testes são, na verdade, exemplos práticos mostrando como a função pode ser usada.

Com a *spec*, nós podemos com segurança melhorar, alterar, e até reescrever a função do início e ter a certeza de que ainda funciona corretamente.

Isso é especialmente importante em grandes projetos, quando uma função é usada em muitos lugares. Quando nós alteramos essa função, simplesmente não há forma de manualmente verificar se ainda funciona corretamente em cada lugar em que é usada.

Sem testes, as pessoas têm duas formas:

1. Executar a alteração, não importa o que aconteça. E aí, os nossos utilizadores encontram *bugs*, porque provavelmente falhámos ao não testar algo manualmente.
2. Ou, se a punição por erros for severa, como não existem testes, as pessoas ficam com receio de modificar tais funções, e aí o código se torna obsoleto, ninguém quer se involver nele. Nada bom para o desenvolvimento.

**Testes automáticos ajudam a evitar estes problemas!**

Se o projeto estiver coberto por testes, simplesmente não existe tal problema. Depois de quaisquer alterações, nós podemos correr testes e observar muitas análises numa questão de segundos.

**Adicionalmente, um código bem testado tem melhor arquitetura.**

Naturalmente, isto porque código auto-testado é mais fácil de modificar e melhorar. Mas, também há outro motivo.

Para se escrever testes, o código deverá estar organizado de tal forma que cada função tenha uma tarefa claramente descrita, e entrada e saida de dados bem definidas. Isso, significa uma boa arquitetura a partir do início.

Na vida real, por vezes isto não é tão fácil. Ás vezes, é dificil escrever uma *spec* antes do respetivo código, por ainda não estar claro como ele se deveria comportar. Mas, em geral, escrever testes torna o desenvolvimento mais rápido e mais estável.

Mais adiante, no tutorial, você irá encontrar muitas tarefas com testes preparados. Assim, poderá ver mais exemplos práticos.

Escrever testes, requere um bom conhecimento de JavaScript. Mas, estamos a começar a aprender. Assim, para facilitar, por ora não se pede que escreva testes, mas você já deveria ser capaz de os ler, mesmo que sejam um pouco mais complexos que os deste capítulo.
