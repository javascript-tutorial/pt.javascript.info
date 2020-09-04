describe("multiplyNumeric", function() {
  it("multiplica todas as propriedades numéricas por 2", function() {
    let menu = {
      width: 200,
      height: 300,
      title: "O meu menu"
    };
    let result = multiplyNumeric(menu);
    assert.equal(menu.width, 400);
    assert.equal(menu.height, 600);
    assert.equal(menu.title, "O meu menu");
  });

  it("não retorna nada", function() {
    assert.isUndefined( multiplyNumeric({}) );
  });

});
