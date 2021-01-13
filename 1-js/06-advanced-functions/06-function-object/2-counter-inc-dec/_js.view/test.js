describe("counter", function() {

  it("aumenta de chamada em chamada", function() {

    let counter = makeCounter();

    assert.equal( counter(), 0 ); 
    assert.equal( counter(), 1 ); 
    assert.equal( counter(), 2 ); 
  });

  
  describe("counter.set", function() {
    it("inicializa a contagem", function() {

      let counter = makeCounter();

      counter.set(10);

      assert.equal( counter(), 10 ); 
      assert.equal( counter(), 11 ); 
    });
  });
  
  describe("counter.decrease", function() {
    it("diminui a contagem", function() {

      let counter = makeCounter();

      counter.set(10);

      assert.equal( counter(), 10 ); 

      counter.decrease();

      assert.equal( counter(), 10 ); 

    });
  });

});