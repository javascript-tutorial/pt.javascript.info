Observe o detalhe sutil, mas importante, da solução. Não convertemos `value` para número logo depois do `prompt`, porque depois de `value = +value` não conseguiríamos mais distinguir uma string vazia (sinal de parada) do zero (número válido). Fazemos isso mais tarde, em vez disso.


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

