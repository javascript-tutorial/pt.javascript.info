describe("ucFirst", function() {
  it('Primeiro símbolo em maiúsculas', function() {
    assert.strictEqual(ucFirst("john"), "John");
  });

  it("Não aborta numa string vazia", function() {
    assert.strictEqual(ucFirst(""), "");
  });
});