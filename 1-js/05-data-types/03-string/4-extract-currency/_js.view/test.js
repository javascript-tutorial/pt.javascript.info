describe("extractCurrencyValue", function() {

  it("para a string $120 retoorne o número 120", function() {
    assert.strictEqual(extractCurrencyValue('$120'), 120);
  });


});
