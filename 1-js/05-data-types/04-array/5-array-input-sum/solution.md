Por favor repare no subtítulo, e em importantes detalhes da solução. Nós não convertemos `value` para número imediatamente após `prompt`, porque depois de `value = +value` não temos como diferenciar uma *string* vazia (sinal para parar) de zero (número válido). Em vez disso, o fazemos mais tarde.


```js run demo
function sumInput() {
 
  let numbers = [];

  while (true) {

    let value = prompt("Um número, por favor?", 0);

    // devemos cancelar?
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
