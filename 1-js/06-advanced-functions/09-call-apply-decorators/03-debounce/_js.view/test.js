describe('debounce', function () {
  before(function () {
    this.clock = sinon.useFakeTimers();
  });

  after(function () {
    this.clock.restore();
  });

  it('para uma chamada - executo-o depois de dado milissegundos', function () {
    const f = sinon.spy();
    const debounced = debounce(f, 1000);

    debounced('test');
    assert(f.notCalled, 'não é chamada imediatamente');
    this.clock.tick(1000);
    assert(f.calledOnceWith('test'), 'é chamada depois de 1000ms');
  });

  it('para 3 chamadas - execute a última depois de dado milissegundos', function () {
    const f = sinon.spy();
    const debounced = debounce(f, 1000);

    debounced('a');
    setTimeout(() => debounced('b'), 200); // ignorada (cedo demais)
    setTimeout(() => debounced('c'), 500); // executa (1000ms passados)
    this.clock.tick(1000);

    assert(f.notCalled, 'não é chamada depois de 1000ms');

    this.clock.tick(500);

    assert(f.calledOnceWith('c'), 'é chamada depois de 1500ms');
  });

  it('preserva o contexto da chamada', function () {
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
