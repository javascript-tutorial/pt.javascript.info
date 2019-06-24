describe("camelize", function() {

  it("deixa uma linha vazia como é", function() {
    assert.equal(camelize(""), "");
  });

  it("transforma background-color em backgroundColor", function() {
    assert.equal(camelize("background-color"), "backgroundColor");
  });

  it("transforma list-style-image em listStyleImage", function() {
    assert.equal(camelize("list-style-image"), "listStyleImage");
  });

  it("transforma -webkit-transition em WebkitTransition", function() {
    assert.equal(camelize("-webkit-transition"), "WebkitTransition");
  });

});
