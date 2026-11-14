beforeEach(function() {
  sinon.stub(window, "prompt");
});

afterEach(function() {
  prompt.restore();
});

describe("readNumber", function() {

  it("se for um número, retorna ele", function() {
    prompt.returns("123");
    assert.strictEqual(readNumber(), 123);
  });

  it("se for 0, retorna ele", function() {
    prompt.returns("0");
    assert.strictEqual(readNumber(), 0);
  });

  it("continua o laço até encontrar um número", function() {
    prompt.onCall(0).returns("não é um número");
    prompt.onCall(1).returns("não é um número de novo");
    prompt.onCall(2).returns("1");
    assert.strictEqual(readNumber(), 1);
  });

  it("se for uma linha vazia, retorna null", function() {
    prompt.returns("");
    assert.isNull(readNumber());
  });

  it("se for cancelado, retorna null", function() {
    prompt.returns(null);
    assert.isNull(readNumber());
  });

});
