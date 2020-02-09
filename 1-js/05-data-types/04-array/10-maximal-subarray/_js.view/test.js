describe("getMaxSubSum", function() {
  it("máxima subsoma de [1, 2, 3] igual a 6", function() {
    assert.equal(getMaxSubSum([1, 2, 3]), 6);
  });

  it("máxima subsoma de [-1, 2, 3, -9] igual a 5", function() {
    assert.equal(getMaxSubSum([-1, 2, 3, -9]), 5);
  });

  it("máxima subsoma de [-1, 2, 3, -9, 11] igual a 11", function() {
    assert.equal(getMaxSubSum([-1, 2, 3, -9, 11]), 11);
  });

  it("máxima subsoma de [-2, -1, 1, 2] igual a 3", function() {
    assert.equal(getMaxSubSum([-2, -1, 1, 2]), 3);
  });

  it("máxima subsoma de [100, -9, 2, -3, 5] igual a 100", function() {
    assert.equal(getMaxSubSum([100, -9, 2, -3, 5]), 100);
  });

  it("máxima subsoma de [] igual a 0", function() {
    assert.equal(getMaxSubSum([]), 0);
  });

  it("máxima subsoma de [-1] igual a 0", function() {
    assert.equal(getMaxSubSum([-1]), 0);
  });

  it("máxima subsoma de [-1, -2] igual a 0", function() {
    assert.equal(getMaxSubSum([-1, -2]), 0);
  });

  it("máxima subsoma de [2, -8, 5, -1, 2, -3, 2] igual a 6", function() {
    assert.equal(getMaxSubSum([2, -8, 5, -1, 2, -3, 2]), 6);
  });
});
