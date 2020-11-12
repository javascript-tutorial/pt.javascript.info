describe("teste", function() {
  // Mocha, geralmente espera pelos testes por 2 segundos antes de os considerar errados

  this.timeout(200000); // Com este código nós aumentamos esse tempo - neste caso, para 200,000 
  
  // Isto, por causa da função "alert", porque se você se demorar a pressionar o botão "OK" oos testes não irão passar!

  before(() => alert("Testes iniciados – antes de todos os testes"));
  after(() => alert("Testes terminados – depois de todos os testes"));

  beforeEach(() => alert("antes de um teste – entrando para um teste"));
  afterEach(() => alert("depois de um teste – saindo de um teste"));

  it('teste 1', () => alert(1));
  it('teste 2', () => alert(2));

});
