describe("concat", function() {
  let chunks = [
    new Uint8Array([0, 1, 2]),
    new Uint8Array([3, 4, 5]),
    new Uint8Array([6, 7, 8])
  ];

  it("resultado possui o mesmo tipo de array", function() {

    let result = concat(chunks);

    assert.equal(result.constructor, Uint8Array);
  });

  it("concatena arrays", function() {

    let result = concat(chunks);

    assert.deepEqual(result, new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8]));

  });

  it("Retorna um array vazio se a entrada estiver vazia.", function() {

    let result = concat([]);

    assert.equal(result.length, 0);

  });

});
