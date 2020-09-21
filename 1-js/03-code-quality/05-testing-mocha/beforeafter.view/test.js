<<<<<<< HEAD
describe("teste", function() {

  before(() => alert("Testes iniciados – antes de todos os testes"));
  after(() => alert("Testes terminados – depois de todos os testes"));
=======
describe("test", function() {
  
   // Mocha usually waits for the tests for 2 seconds before considering them wrong
  
  this.timeout(200000); // With this code we increase this - in this case to 200,000 milliseconds

  // This is because of the "alert" function, because if you delay pressing the "OK" button the tests will not pass!
  
  before(() => alert("Testing started – before all tests"));
  after(() => alert("Testing finished – after all tests"));
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

  beforeEach(() => alert("antes de um teste – entrando para um teste"));
  afterEach(() => alert("depois de um teste – saindo de um teste"));

  it('teste 1', () => alert(1));
  it('teste 2', () => alert(2));

});
