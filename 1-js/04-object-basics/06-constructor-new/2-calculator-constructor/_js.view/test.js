
describe("calculator", function() {
  let calculator;
  before(function() {
    sinon.stub(window, "prompt")

    prompt.onCall(0).returns("2");
    prompt.onCall(1).returns("3");

    calculator = new Calculator();
    calculator.read();
  });
  
  it("o método read solicita por 2 valores usando o prompt e os guarda em propriedades do objeto", function() {
    assert.equal(calculator.a, 2);
    assert.equal(calculator.b, 3);
  });

  it("quando 2 e 3 são inseridos, a soma é 5", function() {
    assert.equal(calculator.sum(), 5);
  });

  it("quando 2 e 3 são inseridos, o produto é 6", function() {
    assert.equal(calculator.mul(), 6);
  });

  after(function() {
    prompt.restore();
  });
});
