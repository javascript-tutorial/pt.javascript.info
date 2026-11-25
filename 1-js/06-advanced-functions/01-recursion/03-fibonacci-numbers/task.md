importance: 5

---

# Números de Fibonacci

A sequência dos [números de Fibonacci](https://pt.wikipedia.org/wiki/N%C3%BAmero_de_Fibonacci) tem a fórmula <code>F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub></code>. Em outras palavras, o próximo número é a soma dos dois anteriores.

Os dois primeiros números são `1`, depois `2(1+1)`, depois `3(1+2)`, `5(2+3)` e assim por diante: `1, 1, 2, 3, 5, 8, 13, 21...`.

Os números de Fibonacci estão relacionados à [proporção áurea](https://pt.wikipedia.org/wiki/Propor%C3%A7%C3%A3o_%C3%A1urea) e a muitos fenômenos naturais ao nosso redor.

Escreva uma função `fib(n)` que retorne o `n-ésimo` número de Fibonacci.

Um exemplo de funcionamento:

```js
function fib(n) { /* seu código */ }

alert(fib(3)); // 2
alert(fib(7)); // 13
alert(fib(77)); // 5527939700884757
```

P.S. A função deve ser rápida. A chamada a `fib(77)` deve levar no máximo uma fração de segundo.
