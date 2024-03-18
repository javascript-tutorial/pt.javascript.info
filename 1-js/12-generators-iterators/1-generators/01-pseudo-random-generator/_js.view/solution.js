function* pseudoRandom(semente) {
  let valor = semente;

  while(true) {
    valor = valor * 16807 % 2147483647
    yield valor;
  }

};
