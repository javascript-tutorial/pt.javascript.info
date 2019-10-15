describe("potência", function() {

  describe("eleva x à potência de 3", function() {

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} na potência de 3 são ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

  });

  // ... mais testes aqui a seguir, ambos 'describe' e 'it' podem ser adicionados
});
