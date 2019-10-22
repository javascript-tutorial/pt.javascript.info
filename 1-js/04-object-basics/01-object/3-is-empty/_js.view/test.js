describe("isEmpty", function() {
  it("retorna verdadeiro para um objeto vazio", function() {
    assert.isTrue(isEmpty({}));
  });

  it("retorna falso se uma propriedade existir", function() {
    assert.isFalse(isEmpty({
      anything: false
    }));
  });
});