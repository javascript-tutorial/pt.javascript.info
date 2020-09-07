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
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

  beforeEach(() => alert("antes de um teste – entrando para um teste"));
  afterEach(() => alert("depois de um teste – saindo de um teste"));

  it('teste 1', () => alert(1));
  it('teste 2', () => alert(2));

});
