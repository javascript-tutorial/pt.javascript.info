importance: 2

---

# Soma com uma quantidade arbitrária de parênteses

Escreva a função `sum` que funcione assim:

```js
sum(1)(2) == 3; // 1 + 2
sum(1)(2)(3) == 6; // 1 + 2 + 3
sum(5)(-1)(2) == 6
sum(6)(-1)(-2)(-3) == 0
sum(0)(1)(2)(3)(4)(5) == 15
```

P.S. Dica: você pode precisar configurar uma conversão personalizada de objeto para primitivo na sua função.
