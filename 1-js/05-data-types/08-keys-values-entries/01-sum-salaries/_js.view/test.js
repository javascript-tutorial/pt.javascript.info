describe("sumSalaries", function() {
  it("retorna a soma dos salários", function() {
    let salaries = {
      "John": 100,
      "Pete": 300,
      "Mary": 250
    };

    assert.equal( sumSalaries(salaries), 650 );
  });

  it("retorna 0 para um objeto vazio", function() {
    assert.strictEqual( sumSalaries({}), 0);
  });
});
