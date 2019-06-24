```js run demo
function sumSalaries(salaries) {

  let sum = 0;
  for (let salary of Object.values(salaries)) {
    sum += salary;
  }

  return sum; // 650
}

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
```
Ou, opcionalmente, poderíamos também obter a soma usando `Object.values` e `reduce`:

```js
// reduce faz um loop sobre o array de salários,
// soma-os
// e retorna o resultado
function sumSalaries(salaries) {
  return Object.values(salaries).reduce((a, b) => a + b, 0) // 650
}
```
