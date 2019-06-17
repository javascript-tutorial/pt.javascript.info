describe("Calculator", function() {
  let calculator;

  before(function() {
    calculator = new Calculator;
  });

  it("calculate(12 + 34) = 46", function() {
    assert.equal(calculator.calculate("12 + 34"), 46);
  });

  it("calculate(34 - 12) = 22", function() {
    assert.equal(calculator.calculate("34 - 12"), 22);
  });

  it("adiciona multiplicação: calculate(2 * 3) = 6", function() {
    calculator.addMethod("*", (a, b) => a * b);
    assert.equal(calculator.calculate("2 * 3"), 6);
  });

  it("adiciona potênciação: calculate(2 ** 3) = 8", function() {
    calculator.addMethod("**", (a, b) => a ** b);
    assert.equal(calculator.calculate("2 ** 3"), 8);
  });
});
