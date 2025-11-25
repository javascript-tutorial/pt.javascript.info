importance: 5

---

# O que está errado no teste?

O que está errado no teste de `pow` abaixo?

```js
it("Eleva x à potência n", function() {
  let x = 5;

  let result = x;
  assert.equal(pow(x, 1), result);

  result *= x;
  assert.equal(pow(x, 2), result);

  result *= x;
  assert.equal(pow(x, 3), result);
});
```

P.S. Sintáticamente, o teste está correto e passa.
