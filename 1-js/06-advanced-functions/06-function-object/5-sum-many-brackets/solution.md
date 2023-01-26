
1. Para que tudo funcione *de qualquer jeito*, o resultado de `sum` tem de ser uma função.
2. Essa função tem de guardar na memória o valor corrente entre as chamadas.
3. De acordo com a tarefa, a função tem de se tornar no numero quando for usada em `==`. Funções são objetos, portanto a conversão se faz como descrito no capítulo <info:object-toprimitive>, e nós podemos fornecer o nosso próprio método para retornar o numero.

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

Por favor, note que a função `sum`, na verdade, apenas trabalha uma vez. Ela retorna a função `f`.

Assim, em cada subsequente chamada, `f` adiciona o seu parâmetro à soma `currentSum`, e retorna a si própria.

**Não existe recursão na última linha de `f`.**

Aqui está como se parece a recursão:

```js
function f(b) {
  currentSum += b;
  return f(); // <-- chamada recursiva
}
```

E no nosso caso, nós apenas retornamos a função, sem a chamar:

```js
function f(b) {
  currentSum += b;
  return f; // <-- não chama a si própria, retorna a si própria
}
```

Esta `f` será usada na próxima chamada, retornando novamente ela mesma, tantas vezes quantas necessárias. Assim, quando usada como  um numero ou uma string -- o `toString` retorna a `currentSum`. Nós poderíamos também usar `Symbol.toPrimitive` ou `valueOf` aqui para a conversão.
