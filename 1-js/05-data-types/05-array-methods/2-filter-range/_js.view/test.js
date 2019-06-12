describe("filterRange", function() {

  it("retorna os valores filtrados", function() {

    let arr = [5, 3, 8, 1];

    let filtered = filterRange(arr, 1, 4); 

    assert.deepEqual(filtered, [3, 1]);
  });

  it("não modifica o array", function() {

    let arr = [5, 3, 8, 1];

    let filtered = filterRange(arr, 1, 4); 

    assert.deepEqual(arr, [5,3,8,1]);
  });

});
