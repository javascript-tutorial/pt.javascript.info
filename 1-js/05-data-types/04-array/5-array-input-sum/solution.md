Por favor, observe o detalhe sutil, mas importante da solução. Nós não convertemos `valor` para número instantaneamente após `prompt`, porque depois de `value = + value` não poderíamos dizer uma string vazia (sinal de parada) do zero (número válido). Nós fazemos isso mais tarde.


```js run demo
function sumInput() {
 
  let numbers = [];

  while (true) {

    let value = prompt("Um número por favor?", 0);

    // should we cancel?
    if (value === "" || value === null || !isFinite(value)) break;

    numbers.push(+value);
  }

  let sum = 0;
  for (let number of numbers) {
    sum += number;
  }
  return sum;
}

alert( sumInput() ); 
```

