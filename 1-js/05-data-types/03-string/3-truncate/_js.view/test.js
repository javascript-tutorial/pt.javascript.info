describe("truncate", function() {
  it("truncar a longa string até o comprimento determinado (incluindo as reticências)
", function() {
    assert.equal(
      truncate("What I'd like to tell on this topic is:", 20),
      "What I'd like to te…"
    );
  });

  it("não muda strings curtas", function() {
    assert.equal(
      truncate("Hi everyone!", 20),
      "Hi everyone!"
    );
  });

});
