Por favor repare no subtítulo, e em detalhes importantes da solução. Nós não convertemos `value` para número imediatamente após `prompt`, porque depois de `value = +value` não teríamos como ver a diferença entre uma *string* vazia (o sinal para parar) e zero (um número válido). Assim, nós o fazemos mais tarde.


```js run demo
function sumInput() {
 
  let numbers = [];

  while (true) {

    let value = prompt("Um número, por favor?", 0);

    // nós devemos cancelar?
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

