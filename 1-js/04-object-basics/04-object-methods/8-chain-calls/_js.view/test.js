
describe('Escada', function() {
  before(function() {
    window.alert = sinon.stub(window, "alert");
  });
  
  beforeEach(function() {
    ladder.step = 0;
  });

  it('up() deveria retornar this', function() {
    assert.equal(ladder.up(), ladder);
  });

  it('down() deveria retornar this', function() {
    assert.equal(ladder.down(), ladder);
  });

  it('showStep() deveria invocar alert', function() {
    ladder.showStep();
    assert(alert.called);
  });

  it('up() deveria incrementar step', function() {
    assert.equal(ladder.up().up().step, 2);
  });

  it('down() deveria decrementar step', function() {
    assert.equal(ladder.down().step, -1);
  });

  it('down().up().up().up() ', function() {
    assert.equal(ladder.down().up().up().up().step, 2);
  });
  
  after(function() {
    ladder.step = 0;
    alert.restore();
  });
});
