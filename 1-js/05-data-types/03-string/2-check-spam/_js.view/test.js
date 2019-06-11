describe("checkSpam", function() {
  it('encontra spam em "buy ViAgRA now"', function() {
    assert.isTrue(checkSpam('buy ViAgRA now'));
  });

  it('encontra spam em "free xxxxx"', function() {
    assert.isTrue(checkSpam('free xxxxx'));
  });

  it('nenhum spam em "innocent rabbit"', function() {
    assert.isFalse(checkSpam('innocent rabbit'));
  });
});
