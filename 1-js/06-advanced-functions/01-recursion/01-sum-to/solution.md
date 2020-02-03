A solução usando um loop:

```js run
function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

alert( sumTo(100) );
```

A solução usando recursão:

```js run
function sumTo(n) {
  if (n == 1) return 1;
  return n + sumTo(n - 1);
}

alert( sumTo(100) );
```

A solução usando a fórmula: `sumTo(n) = n*(n+1)/2`:

```js run
function sumTo(n) {
  return n * (n + 1) / 2;
}

alert( sumTo(100) );
```

Obs. Naturalmente, a fórmula é a solução mais rápida. Ela usa apenas 3 operações para qualquer número `n`. A matemática ajuda!

A solução de loop é a segunda em termos de velocidade. Nas soluções recursiva e loop, somamos os mesmos números. Mas a recursão envolve chamadas aninhadas e gerenciamento de pilha de execução. Isso também requer recursos, por isso é mais lento.

Obs. O padrão descreve uma otimização denominada "chamada do fim": se a chamada recursiva for a última na função (como em `sumTo` acima), a função externa não precisará retomar a execução e não precisamos nos lembrar seu contexto de execução. Nesse caso, `sumTo (100000)` é contável. Mas se o seu JavaScript não o suportar, haverá um erro: o tamanho máximo da pilha excedido, porque geralmente há uma limitação no tamanho total da pilha.
