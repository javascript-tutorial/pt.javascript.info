```js run demo
function filterRange(arr, a, b) {
  // adicionado parênteses ao redor da expressão para melhor legibilidade
  return arr.filter(item => (a <= item && item <= b));
}

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert( filtered ); // 3,1 (matching values)

alert( arr ); // 5,3,8,1 (not modified)
```
