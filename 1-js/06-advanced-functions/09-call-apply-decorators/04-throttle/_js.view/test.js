describe("throttle(f, 1000)", function() {
  let f1000;
  let log = "";

  function f(a) {
    log += a;
  }

  before(function() {
    this.clock = sinon.useFakeTimers();
    f1000 = throttle(f, 1000);
  });

  it("a primeira chamada executa agora", function() {
    f1000(1); // executa agora
    assert.equal(log, "1");
  });

  it("então as chamadas são ignoradas até 1000ms quando a última chamada funcionar", function() {
    f1000(2); // (throttling - menos do que 1000ms desde a última execução)
    f1000(3); // (throttling - menos do que 1000ms desde a última execução)
    // depois de 1000ms a chamada f(3) é agendada

    assert.equal(log, "1"); // agora somente a primeira chamada é feita

    this.clock.tick(1000); // depois de 1000ms...
    assert.equal(log, "13"); // log==13, a chamada para f1000(3) é feita
  });

  it(" a terceira chamada espera 1000ms depois da segunda chamada", function() {
    this.clock.tick(100);
    f1000(4); // (throttling - menos do que 1000ms desde a última execução)
    this.clock.tick(100);
    f1000(5); // (throttling - menos do que 1000ms desde a última execução)
    this.clock.tick(700);
    f1000(6); // (throttling - menos do que 1000ms desde a última execução)

    this.clock.tick(100); // agora 100 + 100 + 700 + 100 = 1000ms se passaram

    assert.equal(log, "136"); // a última chamada foi f(6)
  });

  after(function() {
    this.clock.restore();
  });

});

describe('throttle', () => {

  it('executa a chamada encaminhada uma vez', done => {
    let log = '';
    const f = str => log += str;
    const f10 = throttle(f, 10);
    f10('once');

    setTimeout(() => {
      assert.equal(log, 'uma vez');
      done();
    }, 20);
  });

});
