
Usando `setInterval`:

```js run
function printNumbers(from, to) {
  let current = from;

  let timerId = setInterval(function() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }, 1000);
}

// usage:
printNumbers(5, 10);
```

Usando encadeado `setTimeout`:


```js run
function printNumbers(from, to) {
  let current = from;

  setTimeout(function go() {
    alert(current);
    if (current < to) {
      setTimeout(go, 1000);
    }
    current++;
  }, 1000);
}

// usage:
printNumbers(5, 10);
```

Note que em ambas as soluções, existe um atraso inicial antes da primeira saída. Às vezes, precisamos adicionar uma linha para fazer a primeira saída imediatamente, isso é fácil de fazer.
