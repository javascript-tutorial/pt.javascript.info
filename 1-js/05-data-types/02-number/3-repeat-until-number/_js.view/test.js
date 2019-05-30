beforeEach(function() {
  sinon.stub(window, "prompt");
});

afterEach(function() {
  prompt.restore();
});

describe("readNumber", function() {

  it("se for um número, retorne-o", function() {
    prompt.returns("123");
    assert.strictEqual(readNumber(), 123);
  });

  it("se 0, retorne-o", function() {
    prompt.returns("0");
    assert.strictEqual(readNumber(), 0);
  });

  it("continue o loop até encontrar um número", function() {
    prompt.onCall(0).returns("não é um número");
    prompt.onCall(1).returns("não é um número denovo");
    prompt.onCall(2).returns("1");
    assert.strictEqual(readNumber(), 1);
  });

  it("se for uma linha vazia, retorne null", function() {
    prompt.returns("");
    assert.isNull(readNumber());
  });

  it("se cancelar, retorne null", function() {
    prompt.returns(null);
    assert.isNull(readNumber());
  });

});
