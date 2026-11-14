A solução usando um laço:

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

P.S. Naturalmente, a fórmula é a solução mais rápida. Ela usa só 3 operações para qualquer número `n`. A matemática ajuda!

A variante com laço é a segunda em termos de velocidade. Tanto na variante recursiva quanto na de laço, somamos os mesmos números. Mas a recursão envolve chamadas aninhadas e gerenciamento da pilha de execução. Isso também consome recursos, então é mais lenta.

P.P.S. Alguns motores suportam a otimização de "chamada de cauda" (*tail call*): se uma chamada recursiva é a última da função, sem nenhum outro cálculo realizado depois, então a função externa não vai precisar retomar a execução, então o motor não precisa lembrar seu contexto de execução. Isso remove a sobrecarga na memória. Mas, se o motor do JavaScript não suportar a otimização de chamada de cauda (a maioria não suporta), vai haver um erro: tamanho máximo da pilha excedido, porque normalmente existe uma limitação no tamanho total da pilha.
