describe("topSalary", function() {
  it("retorna a pessoa mais bem paga", function() {
    let salaries = {
      "John": 100,
      "Pete": 300,
      "Mary": 250
    };

    assert.equal( topSalary(salaries), "Pete" );
  });

  it("retorna null para o objeto vazio", function() {
    assert.isNull( topSalary({}) );
  });
});
