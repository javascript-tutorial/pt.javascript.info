describe("Accumulator", function() {

  beforeEach(function() {
    sinon.stub(window, "prompt")
  });

  afterEach(function() {
    prompt.restore();
  });

  it("o valor inicial é o argumento do construtor", function() {
    let accumulator = new Accumulator(1);

    assert.equal(accumulator.value, 1);
  });

  it("após ler 0, o valor é 1", function() {
    let accumulator = new Accumulator(1);
    prompt.returns("0");
    accumulator.read();
    assert.equal(accumulator.value, 1);
  });

  it("após ler 1, o valor é 2", function() {
    let accumulator = new Accumulator(1);
    prompt.returns("1");
    accumulator.read();
    assert.equal(accumulator.value, 2);
  });
});
