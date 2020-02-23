
function filterRange(arr, a, b) {
  // colchetes adicionado ao redor da expressão para melhor entendimento
  return arr.filter(item => (a <= item && item <= b));
}