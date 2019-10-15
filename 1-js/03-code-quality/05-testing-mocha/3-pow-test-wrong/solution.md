O teste, demonstra uma das tentações que um desenvolvedor pode ter ao escrever testes.

O que na verdade temos aqui são 3 testes, mas estruturados utilizando uma única função com 3 asserts.

Por vezes, é mais fácil escrever desta forma, mas se algum erro ocorrer, é muito menos óbvio o que houve de errado.

Se um erro ocorrer dentro de uma execução de um fluxo complexo, então teremos de adivinhar quais os dados nessa altura. Na verdade, temos de efetuar uma *depuração de erros ao teste* (*debug the test*).

Seria muito melhor particionar (*break*) o teste em múltiplos blocos `it` com entrada de dados (*input*) e saída de dados (*output*) claramente escritas.

Desta forma:
```js
describe("Eleva x à potência de n", function() {
  it("5 elevado a 1 é igual a 5", function() {
    assert.equal(pow(5, 1), 5);
  });

  it("5 elevado a of 2 é igual a 25", function() {
    assert.equal(pow(5, 2), 25);
  });

  it("5 elevado a of 3 é igual a 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```

Nós substituimos um único `it` por `describe` e um grupo de blocos `it`. Então, se algo falhasse, poderíamos claramente ver que dados existiriam.

Também podemos isolar um único teste, e executá-lo no modo  *standalone* escrevendo `it.only` em vez de `it`:


```js
describe("Eleva x à potência de n", function() {
  it("5 elevado a 1 é igual a 5", function() {
    assert.equal(pow(5, 1), 5);
  });

*!*
  // O Mocha apenas correrá neste bloco
  it.only("5 elevado a 2 é igual a 25", function() {
    assert.equal(pow(5, 2), 25);
  });
*/!*

  it("5 elevado a 3 é igual a 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```
