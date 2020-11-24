describe("checkSpam", function() {
  it('encontra spam em "compre ViAgRA agora"', function() {
    assert.isTrue(checkSpam('compre ViAgRA agora'));
  });

  it('encontra spam em "xxxxx grátis"', function() {
    assert.isTrue(checkSpam('xxxxx grátis'));
  });

  it('nenhum spam em "coelhinha inocente"', function() {
    assert.isFalse(checkSpam('coelhinha inocente'));
  });
});