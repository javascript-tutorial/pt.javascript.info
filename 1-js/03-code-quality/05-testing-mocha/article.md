# Teste automatizado com Mocha

Teste automatizado será empregue nas próximas tarefas.

É, na verdade, uma parte da "educação mínima" de um desenvolvedor.

## Porque precisamos de testes?

Quando escrevemos uma função, podemos geralmente imaginar como ela deverá ser: quais parâmetros darão quais resultados.

Durante o desenvolvimento, podemos analizar a função executando-a, e comparando o resultado obtido com o esperado. Por exemplo, podemos fazê-lo na consola.

Se alguma coisa estiver errada -- podemos corrigir o código, executá-lo de novo, verificar o resultado -- e assim sucessivamente, até que funcione.

Mas, tais "re-execuções" manuais são imperfeitas.

**Quando se testa um código com re-execuções manuais, é fácil falhar em alguma coisa.**

Por exemplo, estamos a criar uma função `f`. Escrevemos algum código, e ao testar: `f(1)` funciona, mas `f(2)` não. Corrigimos o código e agora `f(2)` funciona. Parece completa? Mas nos esquecemos de re-testar `f(1)`. Que pode fornecer um erro.

É muito típico. Quando desenvolvemos algo, mantemos uma quantidade de casos possíveis em mente. Mas, é difícil esperar que um programador os verifique todos manualmente após cada alteração. Assim, torna-se fácil corrigir uma coisa e danificar outra.

**Teste automatizado significa que testes são escritos em separado, adicionalmente ao código. Eles podem ser fácilmente executados e verificar todos os principais casos esperados.**

## Desenvolvimento Orientado por Comportamento (*BDD*)

Vamos examinar uma técnica conhecida por [Behavior Driven Development](http://en.wikipedia.org/wiki/Behavior-driven_development) (Desenvolvimento Orientado por Comportamento) ou, abreviadamente, *BDD*. Essa prática é empregue em muitos projetos. *BDD* não é apenas usado em testes. Porém, existe para além deles.

**_BDD_ são três coisas em uma: testes E documentação E exemplos.**

Basta de palavras. Vejamos um exemplo.

## Desenvolvimento de "*pow*": a especificação (*spec*)

Digamos que queremos construir a função `pow(x, n)` que eleva `x` a uma potência inteira `n`. Assuimos que `n ≥ 0`.

Essa tarefa apenas é um exemplo: existe o operador `**` em JavaScript que a faz mas, aqui nós nos concentramos no fluxo de desenvolvimento, que pode também ser aplicado a tarefas mais complexas.

Antes de criar o código de `pow`, podemos imaginar o que a função deveria fazer e o descrever.

Tal descrição, é chamada de uma *especificação* (*specification*), ou abreviadamente uma *spec*, e tem este aspeto:

```js
describe("pow", function() {

  it("eleva à n-ésima potência", function() {
    assert.equal(pow(2, 3), 8);
  });

});
```

Uma *spec*, possui três principais blocos, que pode observar acima:

`describe("title", function() { ... })`
<br />Que funcionalidade estamos a descrever. É utilizado para agrupar "*workers*" -- os blocos `it`. No nosso caso, estamos a descrever a função `pow`.

`it("title", function() { ... })`
<br />No título de `it` nós, *numa forma humanamente-legível*, descrevemos o caso prático (*use case*) específico, e no segundo argumento está uma função que o testa.

`assert.equal(value1, value2)`
<br />O código dentro do bloco `it`, se a implementação estiver correta, deveria executar sem erros.

    Funções `assert.*`, são empregues para testar se `pow` funciona como esperado. Exatamente aqui usamos uma delas -- `assert.equal`, que compara argumentos e produz um erro se não forem iguais. Aqui, ela verifica se o resultado de `pow(2, 3)` é igual a `8`.

    Existem outros tipos de comparações e verificações, que veremos mais adiante.

## O fluxo de desenvolvimento

O fluxo de desenvolvimento, geralmente assemelha-se a este:

1. Uma *spec* inicial é escrita, com testes para as mais básicas funcionalidades.
2. Uma implementação inicial é criada.
3. Para verificar se funciona, nós corremos a *framework* de testes [Mocha](http://mochajs.org/) (mais detalhes em breve), que executa a *spec*. Erros são apresentados. Fazemos correções até que tudo funcione.
4. Agora, temos uma implementação inicial a funcionar com testes.
5. Adicionamos mais casos práticos (*use cases*) à *spec*, provavelmente ainda não suportados pelas implementações. Testes começam a falhar.
6. Retornamos ao 3, atualizamos a implementação até que os testes não produzam erros.
7. Repetimos os passos 3-6 até a funcionalidade estar pronta.

Assim, o desenvolvimento é *iterativo*. Escrevemos uma *spec*, a implementamos, certificamo-nos de que os testes passam, depois escrevemos mais testes, certificamo-nos de que eles funcionam, etc. No final, temos ambos, uma implementação a funcionar e testes para ela.

No nosso caso, o primeiro passo está completo: temos uma *spec* inicial para `pow`. Assim, façamos uma implementação. Mas, antes façamos uma execução "zero" da *spec*, apenas para ver se os testes estão a funcionar (eles todos irão falhar).

## A *spec* em ação

Aqui, no tutorial, iremos utilizar para testes as seguintes bibliotecas de JavaScript (*JavaScript libraries*):

- [Mocha](http://mochajs.org/) -- a *framework* nuclear: ela fornece funções de teste comuns, incluindo `describe` e `it`, e a principal função que executa os testes.
- [Chai](http://chaijs.com) -- uma biblioteca (*library*) com muitas *assertions*. Ela permite o uso de muitas diferentes *assertions*, mas por ora apenas precisamos de `assert.equal`.
- [Sinon](http://sinonjs.org/) -- uma biblioteca para espiar sobre funções, simular funções incorporadas à linguagem (*built-in functions*) e mais; precisaremos dela muito mais tarde.

Estas bibliotecas, são apropriadas tanto para testes de código a executar pelo navegador (*browser*) como pelo servidor (*server-side*). Aqui, iremos considerar a variante para o navegador.

A página completa em HTML com estas *frameworks*, e a *spec* `pow`:

```html
  src="index.html"
```

 A página, pode ser dividida em cinco partes:

1. A `<head>` -- adiciona bibliotecas de terceiros (*third-party libraries*) e estilos para os testes.
2. O `<script>` com a função a testar, no nosso caso -- com o código para `pow`.
3. Os testes -- no nosso caso, um programa (*script*) externo `test.js` que possui a `describe("pow", ...)` de acima.
4. O elemento de HTML `<div id="mocha">`, que será usado por Mocha para a apresentação dos resultados.
5. Os testes são iniciados pelo comando `mocha.run()`.

O resultado:

[iframe height=250 src="pow-1" border=1 edit]

Por ora, o teste falha, com um erro. Isso é lógico: temos uma função vazia em `pow`, sem código; assim, `pow(2,3)` retorna `undefined` em vez de `8`.

Para o futuro, deixamos a nota de que existem executores de testes (*test-runners*) avançados, como [karma](https://karma-runner.github.io/) e outros. Assim, geralmente não constitui um problema configurar muitos testes diferentes.

## A implementação inicial

Façamos uma simples implementação de `pow`, para os testes passarem:

```js
function pow(x, n) {
  return 8; // :) aldrabámos!
}
```

Uau, agora funciona!

[iframe height=250 src="pow-min" border=1 edit]

## Melhorando a *spec*

O que fizémos foi definitivamente enganar. A função não funciona: uma tentativa para calcular `pow(3,4)` daria um resultado incorreto, porém os testes correm.

...Mas a situação é muita típica, acontece na prática. Testes passam, mas a função funciona de forma errada. A nossa *spec* é imperfeita. Precisamos de adicionar mais casos práticos (*use cases*) a ela.

Adicionemos mais um teste, para ver se `pow(3, 4) = 81`.

Podemos selecionar uma ou duas formas de organizar o teste aqui:

1. A primeira variante -- adiciona mais um `assert` ao mesmo `it`:

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
2. A segunda -- elabora dois testes:

    ```js
    describe("pow", function() {

      it("2 elevado à potência de 3 são 8", function() {
        assert.equal(pow(2, 3), 8);
      });

      it("3 elevado à potência de 3 são 27", function() {
        assert.equal(pow(3, 3), 27);
      });

    });
    ```

A principal diferença está em que, quando o `assert` desencadeia (*triggers*) um erro, o bloco `it` termina imediatamente. Assim, na primeira variante, se o primeiro `assert` falhar, nunca veremos o resultado do segundo `assert`.

Efetuar testes em separado, é útil para se obter mais informção sobre o que se passa, assim a segunda variante é melhor.

E para além disso, há mais uma boa regra a seguir.

**Um teste verifica uma coisa.**

Se, olharmos para o teste e nele virmos duas verificações independentes, o melhor será o particionar em dois mais simples.

Asim, prossigamos com a segunda variante.

O resultado:

[iframe height=250 src="pow-2" edit border="1"]

Como poderíamos esperar, o segundo teste falha. Certamente, a nossa função retorna sempre `8`, quando o `assert` espera `27`.

## Melhorando a implementação

Vamos escrever algo mais real, para os testes passarem:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Para termos a certeza de que a função trabalha bem, vamos testá-la com mais valores. Em vez de escrevemos blocos `it` manualmente, podemos os gerar com um `for`:

```js
describe("pow", function() {

  function makeTest(x) {
    let expected = x * x * x;
    it(`${x} elevado a 3 são ${expected}`, function() {
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

## *describe* aninhados (*nested*)

Vamos adicionar ainda mais testes. Mas, antes anotemos que a função auxiliar `makeTest` e o laço `for` deveriam estar juntos, agrupados. Não precisaremos de `makeTest` em outros testes, apenas é necessária no  `for`: a tarefa comum é verificar como `pow` eleva à potência em questão.

O agrupamento é feito com um `describe` aninhado (*nested*):

```js
describe("pow", function() {

*!*
  describe("eleva x à potência de 3", function() {
*/!*

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} elevado a 3 são ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

*!*
  });
*/!*

  // ... mais testes aqui a seguir, ambos `describe` e `it` podem ser adicionados
});
```

O `describe` aninhado (*nested*) define um novo "subgrupo" de testes. Na apresentação do resultado, podemos ver o título indentado:

[iframe height=250 src="pow-4" edit border="1"]

No futuro, poderemos adicionar mais `it` e `describe` ao nível de topo com funções auxiliares autónomas, que não terão necessidade de `makeTest`.

```smart header="before/after and beforeEach/afterEach"
Podemos configurar funções `before/after` que sejam executadas antes/depois (*before/after*) de corrermos os testes, e também funções `beforeEach/afterEach` para execução antes/depois de *cada* `it`.
```

Por exemplo:

```js no-beautify
describe("test", function() {

  before(() => alert("Iniciando testes  – antes de todos os testes"));
  after(() => alert("Terminando testes  – depois de todos os testes"));

  beforeEach(() => alert("Antes de um teste – entra para um teste"));
  afterEach(() => alert("Depois de um teste – sai de um teste"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
```

A sequência de execução será:

```
Iniciando testes  – antes de todos os testes (*before*)
Antes de um teste – entra para um teste (*beforeEach*)
1
Depois de um teste – sai de um teste (*afterEach*)
Antes de um teste – entra para um teste     (*beforeEach*)
2
Depois de um teste – sai de um teste     (*afterEach*)
Terminando testes  – depois de todos os testes (*after*)
```

[edit src="beforeafter" title="Open the example in the sandbox."]

Geralmente, `beforeEach/afterEach` (`before/after`) são utilizadas para efetuar inicialização, zerar contadores ou fazer algo entre os testes (ou grupos de testes).

## Aumentando a 'spec'

A funcionalidade básica de `pow` está completa. A primeira iteração do desenvolvimento está feita. Quando terminarmos a celebração e de beber champanhe -- continuaremos a melhorá-la.

Como foi dito, a função `pow(x, n)` é destinada a trabalhar com valores inteiros positivos de `n`.

Para indicar um erro matemático, as funções em JavaScript geralmente retornam `NaN` (*Not a Number*). Façamos o mesmo para valores inválidos de `n`.

Vamos primeiro adicionar o comportamento à 'spec'(!):

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

Os testes agora adicionados falham, porque a nossa implementação não os suporta. É como BDD (Desenvolvimento Orientado por Comportamento) é feito: primeiro escrevemos testes que falhem, e depois construimos uma implementação para eles.

```smart header="Other assertions"
Por favor, note que a asserção `assert.isNaN`: verifica por `NaN`.

Existem também outras asserções em Chai, como por exemplo:

- `assert.equal(value1, value2)` -- verifica a igualdade  `value1 == value2`.
- `assert.strictEqual(value1, value2)` -- verifica a igualdade exata (*strict*) `value1 === value2`.
- `assert.notEqual`, `assert.notStrictEqual` -- verifica o inverso das igualdades acima.
- `assert.isTrue(value)` -- verifica se `value === true`
- `assert.isFalse(value)` -- verifica se `value === false`
- ...a lista completa está em [docs](http://chaijs.com/api/assert/)
```

Assim, deveríamos adicionar cerca de um par de linhas a `pow`:

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

[edit src="pow-full" title="Open the full final example in the sandbox."]

## Sumário

Em BDD (Desenvolvimento Orientado por Comportamento), a *spec* é feita primeiro, seguida pela implementação. No final, temos ambos a *spec* e o código.

A *spec* pode ser utilizada de três formas:

1. **Testes** -- garantem que o código funciona corretamente.
2. **Docs** -- os títulos de `describe` e `it` dizem o que a função faz.
3. **Exemplos** -- os testes são na realidade exemplos práticos a funcionar, mostrando como uma função pode ser empregue.

Com uma *spec*, podemos com segurança melhorar, alterar, ou até mesmo re-escrever a função do início, tendo a certeza de ainda funciona corretamente.

Isso, é especialmente importante em grandes projetos, quando uma função é empregue em muitos locais. Quando alteramos tal função, não há forma de manualmente confirmar se funciona corretamente em todos os locais em que é empregue.

Sem testes, as pessoas têm dois caminhos:

1. Efetuar as alterações, a qualquer preço. E então os utilizadores encontram erros (*bugs*) e os reportam. Se, os codificadores poderem dar-se a esse luxo.
2. Ou as pessoas ficam com receio de alterar tais funções, se a punição pelos erros for dura. Então tornam-se velhas, cheias de teias-de-aranha, ninguém quer involver-se, e isso não é bom.

**Código testado automaticamente é o inverso disso!**

Se o projeto for coberto por testes, não existe tal problema. Podemos executar testes e efetuar muitas verificações em segundos.

**Além disso, código apropriadamente testado tem melhor arquitetura.**

Naturalmente, porque é mais fácil alterá-lo e melhorá-lo. Mas, não apenas por isso.

Para escrever testes, o código deverá estar organizado de tal forma que cada função tenha uma tarefa claramente descrita, e bem definidas entradas e saídas. Isso, significa uma boa arquitetura desde o início.

Na vida real, isso por vezes nao é tão fácil. Por vezes, é difícil escrever uma *spec* antes do código para ela, por ainda não ser claro como este se comportará. Mas, em geral escrever testes torna o desenvolvimento mais rápido e mais estável.

## Próximos passos?

Mais adiante no tutorial, você encontrará muitas tarefas com testes incluidos. Assim, verá mais exemplos práticos.

Escrever testes requere um bom conhecimento de JavaScript. Mas, apenas estamos a começar a aprender. Portanto, para assegurá-lo, por ora não terá de escrever testes, mas já deveria ser capaz de os ler, mesmo que sejam um pouco mais complexos do que os deste capítulo.
