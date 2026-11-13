
describe("inArray", function() {
  let arr = [1, 2, 3, 4, 5, 6, 7];

  it("retorna o filtro para valores no array", function() {

    let filter = inArray(arr);
    assert.isTrue(filter(5));
    assert.isFalse(filter(0));
  });
});


describe("inBetween", function() {

  it("retorna o filtro para valores entre", function() {
    let filter = inBetween(3, 6);
    assert.isTrue(filter(5));
    assert.isFalse(filter(0));
  });
});
