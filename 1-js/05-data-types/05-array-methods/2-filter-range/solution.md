```js run demo
function filterRange(arr, a, b) {
  // colchetes adicionado ao redor da expressão para melhor entendimento
  return arr.filter(item => (a <= item && item <= b));
}

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert( filtered ); // 3,1 (valores que coincidem com o que foi pedido)

alert( arr ); // 5,3,8,1 (array não foi modificada)
```
