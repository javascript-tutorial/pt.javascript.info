importance: 5

---

# Crie new Calculator

Crie uma função construtora `Calculator` que crie objetos com 3 métodos:

- `read()` solicita 2 valores e os guarda como propriedades do objeto com nomes `a` e `b` respectivamente.
- `sum()` retorna a soma dessas propriedades.
- `mul()` retorna o produto da multiplicação dessas propriedades.

Por exemplo:

```js
let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
```

[demo]
