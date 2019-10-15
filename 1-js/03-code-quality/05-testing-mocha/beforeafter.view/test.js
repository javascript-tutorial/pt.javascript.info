describe("teste", function() {

  before(() => alert("Iniciando os testes – antes de todos os testes"));
  after(() => alert("Terminando os testes – depois de todos os testes"));

  beforeEach(() => alert("Antes de um teste – entrando para um teste"));
  afterEach(() => alert("Depois de um teste – saindo de um teste"));

  it('teste 1', () => alert(1));
  it('teste 2', () => alert(2));

});
