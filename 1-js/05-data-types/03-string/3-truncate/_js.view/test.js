describe("truncate", function() {
  it("trunque a string comprida para o comprimento pretendido (incluindo as reticências)", function() {
    assert.equal(
      truncate("O que eu gostaria de dizer neste tópico é:", 20),
      "O que eu gostaria d…"
    );
  });

  it("não altera strings curtas", function() {
    assert.equal(
      truncate("Olá a todos!", 20),
      "Olá a todos!"
    );
  });

});
