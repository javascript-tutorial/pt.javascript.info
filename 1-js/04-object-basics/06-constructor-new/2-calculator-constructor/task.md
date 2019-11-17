importance: 5

---

# Crie uma calculadora new

Crie uma função construtora `Calculator` que crie objetos com 3 métodos:

- `read()` pergunta por 2 valores usando `prompt` e os guarda nas propriedades do objeto.
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
