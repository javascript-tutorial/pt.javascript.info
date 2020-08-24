describe("teste", function() {

  before(() => alert("Testes iniciados – antes de todos os testes"));
  after(() => alert("Testes terminados – depois de todos os testes"));

  beforeEach(() => alert("antes de um teste – entrando para um teste"));
  afterEach(() => alert("depois de um teste – saindo de um teste"));

  it('teste 1', () => alert(1));
  it('teste 2', () => alert(2));

});
