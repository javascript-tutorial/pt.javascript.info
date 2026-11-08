
1. Para que a coisa toda funcione *de alguma forma*, o resultado de `sum` precisa ser uma função.
2. Essa função precisa guardar na memória o valor atual entre as chamadas.
3. De acordo com a tarefa, a função precisa se tornar o número quando usada com `==`. Funções são objetos, então a conversão acontece como descrito no capítulo <info:object-toprimitive>, e podemos fornecer nosso próprio método que retorna o número.

Agora o código:

```js demo run
function sum(a) {

  let currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function() {
    return currentSum;
  };

  return f;
}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1)(2) ); // 6
alert( sum(6)(-1)(-2)(-3) ); // 0
alert( sum(0)(1)(2)(3)(4)(5) ); // 15
```

Observe que a função `sum` na verdade só funciona uma vez. Ela retorna a função `f`.

Depois, em cada chamada subsequente, `f` soma seu parâmetro à soma `currentSum`, e retorna a si mesma.

**Não existe recursão na última linha de `f`.**

Veja como seria uma recursão:

```js
function f(b) {
  currentSum += b;
  return f(); // <-- chamada recursiva
}
```

E, no nosso caso, apenas retornamos a função, sem chamá-la:

```js
function f(b) {
  currentSum += b;
  return f; // <-- não chama a si mesma, retorna a si mesma
}
```

Esse `f` será usado na próxima chamada, de novo retornando a si mesma, quantas vezes forem necessárias. Então, quando usado como um número ou uma string -- o `toString` retorna o `currentSum`. Também poderíamos usar `Symbol.toPrimitive` ou `valueOf` aqui para a conversão.
