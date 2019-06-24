
function filterRange(arr, a, b) {
  // adicionado parênteses ao redor da expressão para melhor legibilidade
  return arr.filter(item => (a <= item && item <= b));
}
