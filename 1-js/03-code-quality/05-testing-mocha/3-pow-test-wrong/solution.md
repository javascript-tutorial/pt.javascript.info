O teste demonstra uma das tentações que um desenvolvedor encontra ao escrever testes.

O que aqui temos são na verdade 3 testes, mas colocados numa única função com 3 *asserts*.

Por vezes, é mais fácil escrever dessa forma mas, se ocorrer um erro, é menos óbvio ver o que está errado.

Se houver um erro dentro de um fluxo de execução complexo, então teremos que procurar entender os dados nessa altura. Teremos, na verdade, que fazer o *debug do teste*.

Seria muito melhor repartir o teste em múltiplos blocos `it`, com claramente escritas entradas e saídas.

Desta forma:
```js
describe("Eleva x à potência n", function() {
  it("5 elevado a 1 é igual a 5", function() {
    assert.equal(pow(5, 1), 5);
  });

  it("5 elevado a 2 é igual a 25", function() {
    assert.equal(pow(5, 2), 25);
  });

  it("5 elevado a 3 é igual a 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```

Nós substituimos o único `it` por `describe` e um grupo de blocos `it`. Agora, se algo falhar, vemos claramente que dados estão errados.

Também, podemos isolar um único teste e executá-lo à parte (*standalone*) escrevendo `it.only` em vez de `it`:


```js
describe("Eleva x à potência n", function() {
  it("5 elevado a 1 é igual a 5", function() {
    assert.equal(pow(5, 1), 5);
  });

*!*
  // Mocha apenas irá executar este bloco
  it.only("5 elevado a 2 é igual a 25", function() {
    assert.equal(pow(5, 2), 25);
  });
*/!*

  it("5 elevado a 3 é igual a 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```
