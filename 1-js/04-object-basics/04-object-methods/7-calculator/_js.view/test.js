

describe("calculator", function() {
  
  context("quando são entrados 2 e 3", function() {
    beforeEach(function() {
      sinon.stub(window, "prompt");

      prompt.onCall(0).returns("2");
      prompt.onCall(1).returns("3");

      calculator.read();
    });

    afterEach(function() {
      prompt.restore();
    });
    
    it('the read get two values and saves them as object properties', function () {
      assert.equal(calculator.a, 2);
      assert.equal(calculator.b, 3);
    });

    it("a soma é 5", function() {
      assert.equal(calculator.sum(), 5);
    });

    it("o produto da multiplicação é 6", function() {
      assert.equal(calculator.mul(), 6);
    });
  });

});
