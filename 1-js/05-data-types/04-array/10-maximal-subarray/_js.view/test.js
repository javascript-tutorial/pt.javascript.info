describe("getMaxSubSum", function() {
  it("subsoma máxima de [1, 2, 3] é igual a 6", function() {
    assert.equal(getMaxSubSum([1, 2, 3]), 6);
  });

  it("subsoma máxima de [-1, 2, 3, -9] é igual a 5", function() {
    assert.equal(getMaxSubSum([-1, 2, 3, -9]), 5);
  });

  it("subsoma máxima de [-1, 2, 3, -9, 11] é igual a 11", function() {
    assert.equal(getMaxSubSum([-1, 2, 3, -9, 11]), 11);
  });

  it("subsoma máxima de [-2, -1, 1, 2] é igual a 3", function() {
    assert.equal(getMaxSubSum([-2, -1, 1, 2]), 3);
  });

  it("subsoma máxima de [100, -9, 2, -3, 5] é igual a 100", function() {
    assert.equal(getMaxSubSum([100, -9, 2, -3, 5]), 100);
  });

  it("subsoma máxima de [] é igual a 0", function() {
    assert.equal(getMaxSubSum([]), 0);
  });

  it("subsoma máxima de [-1] é igual a 0", function() {
    assert.equal(getMaxSubSum([-1]), 0);
  });

  it("subsoma máxima de [-1, -2] é igual a 0", function() {
    assert.equal(getMaxSubSum([-1, -2]), 0);
  });

  it("subsoma máxima de [2, -8, 5, -1, 2, -3, 2] é igual a 6", function() {
    assert.equal(getMaxSubSum([2, -8, 5, -1, 2, -3, 2]), 6);
  });
});
