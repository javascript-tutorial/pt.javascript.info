importance: 5

---

# Soma todos os números até o número informado

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

1. Usando um loop `for`.
2. Usando uma recursão, onde `sumTo(n) = n + sumTo(n-1)` para `n > 1`.
3. Usando a fórmula da [progressão aritmética](https://pt.wikipedia.org/wiki/Progress%C3%A3o_aritm%C3%A9tica).

Um exemplo do resultado:

```js
function sumTo(n) { /*... seu código ... */ }

alert( sumTo(100) ); // 5050
```

Obs. Qual variante de solução é a mais rápida? A mais lenta? Por quê?

Obs. Podemos usar a recursão para contar `sumTo(100000)`? 
