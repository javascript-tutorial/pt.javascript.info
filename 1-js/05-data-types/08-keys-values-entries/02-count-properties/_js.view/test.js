describe("count", function() {
  it("conta o número de propriedades", function() {
    assert.equal( count({a: 1, b: 2}), 2 );
  });

  it("retorna 0 para um objeto vazio", function() {
    assert.equal( count({}), 0 );
  });

  it("ignora propriedades simbólicas", function() {
    assert.equal( count({ [Symbol('id')]: 1 }), 0 );
  });
});
