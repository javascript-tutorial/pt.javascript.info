describe('debounce', function () {
  before(function () {
    this.clock = sinon.useFakeTimers();
  });

  after(function () {
    this.clock.restore();
  });

  it('para uma chamada - execute-a após um determinado ms', function () {
    const f = sinon.spy();
    const debounced = debounce(f, 1000);

    debounced('test');
    assert(f.notCalled, 'não é chamada imediatamente');
    this.clock.tick(1000);
    assert(f.calledOnceWith('test'), 'chamada após 1000ms');
  });

  it('para 3 chamadas - executa a última após determinados ms', function () {
    const f = sinon.spy();
    const debounced = debounce(f, 1000);

    debounced('a');
    setTimeout(() => debounced('b'), 200); // ignorada (demasiado cedo)
    setTimeout(() => debounced('c'), 500); // executar (1000ms passados)
    this.clock.tick(1000);

    assert(f.notCalled, 'não é chamada após 1000ms');

    this.clock.tick(500);

    assert(f.calledOnceWith('c'), 'chamada após 1500ms');
  });

  it('mantém o contexto da chamada', function () {
    let obj = {
      f() {
        assert.equal(this, obj);
      },
    };

    obj.f = debounce(obj.f, 1000);
    obj.f('test');
    this.clock.tick(5000);
  });
  
});
