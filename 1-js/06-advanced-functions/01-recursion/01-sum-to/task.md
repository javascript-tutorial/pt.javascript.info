importance: 5

---

# Some todos os números até o dado

Escreva uma função `sumTo(n)` que calcule a soma dos números `1 + 2 + ... + n`.

Por exemplo:

```js no-beautify
sumTo(1) = 1
sumTo(2) = 2 + 1 = 3
sumTo(3) = 3 + 2 + 1 = 6
sumTo(4) = 4 + 3 + 2 + 1 = 10
...
sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
```

Faça 3 variantes de solução:

1. Usando um laço for.
2. Usando recursão, já que `sumTo(n) = n + sumTo(n-1)` para `n > 1`.
3. Usando a fórmula da [progressão aritmética](https://pt.wikipedia.org/wiki/Progress%C3%A3o_aritm%C3%A9tica).

Um exemplo do resultado:

```js
function sumTo(n) { /*... seu código ... */ }

alert( sumTo(100) ); // 5050
```

P.S. Qual variante de solução é a mais rápida? A mais lenta? Por quê?

P.P.S. Podemos usar recursão para calcular `sumTo(100000)`? 
