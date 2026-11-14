A primeira solução que poderíamos tentar aqui é a recursiva.

Os números de Fibonacci são recursivos por definição:

```js run
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

alert( fib(3) ); // 2
alert( fib(7) ); // 13
// fib(77); // vai ser extremamente lento!
```

...Mas, para valores grandes de `n`, é muito lenta. Por exemplo, `fib(77)` pode travar o motor por um tempo, consumindo todos os recursos da CPU.

Isso acontece porque a função faz muitas subchamadas. Os mesmos valores são reavaliados repetidamente.

Por exemplo, vamos ver um trecho dos cálculos para `fib(5)`:

```js no-beautify
...
fib(5) = fib(4) + fib(3)
fib(4) = fib(3) + fib(2)
...
```

Aqui podemos ver que o valor de `fib(3)` é necessário tanto para `fib(5)` quanto para `fib(4)`. Então `fib(3)` vai ser chamado e avaliado duas vezes, de forma completamente independente.

Aqui está a árvore de recursão completa:

![árvore de recursão de fibonacci](fibonacci-recursion-tree.svg)

Podemos notar claramente que `fib(3)` é avaliado duas vezes e `fib(2)` é avaliado três vezes. O total de cálculos cresce muito mais rápido do que `n`, tornando-se enorme mesmo para `n=77`.

Podemos otimizar isso lembrando os valores já avaliados: se um valor, digamos `fib(3)`, for calculado uma vez, então podemos simplesmente reutilizá-lo em cálculos futuros.

Outra variante seria abrir mão da recursão e usar um algoritmo totalmente diferente, baseado em laço.

Em vez de ir de `n` para baixo, até valores menores, podemos fazer um laço que começa em `1` e `2`, depois obtém `fib(3)` como a soma deles, depois `fib(4)` como a soma dos dois valores anteriores, depois `fib(5)` e vai subindo e subindo, até chegar ao valor necessário. A cada passo, só precisamos lembrar os dois valores anteriores.

Aqui estão os passos do novo algoritmo em detalhes.

O início:

```js
// a = fib(1), b = fib(2), esses valores são 1 por definição
let a = 1, b = 1;

// obtém c = fib(3) como a soma deles
let c = a + b;

/* agora temos fib(1), fib(2), fib(3)
a  b  c
1, 1, 2
*/
```

Agora queremos obter `fib(4) = fib(2) + fib(3)`.

Vamos deslocar as variáveis: `a,b` vão receber `fib(2),fib(3)`, e `c` vai receber a soma deles:

```js no-beautify
a = b; // agora a = fib(2)
b = c; // agora b = fib(3)
c = a + b; // c = fib(4)

/* agora temos a sequência:
   a  b  c
1, 1, 2, 3
*/
```

O próximo passo dá outro número da sequência:

```js no-beautify
a = b; // agora a = fib(3)
b = c; // agora b = fib(4)
c = a + b; // c = fib(5)

/* agora a sequência é (mais um número):
      a  b  c
1, 1, 2, 3, 5
*/
```

...E assim por diante até obtermos o valor necessário. Isso é muito mais rápido do que a recursão e não envolve cálculos duplicados.

O código completo:

```js run
function fib(n) {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

alert( fib(3) ); // 2
alert( fib(7) ); // 13
alert( fib(77) ); // 5527939700884757
```

O laço começa com `i=3`, porque o primeiro e o segundo valores da sequência já estão fixados nas variáveis `a=1`, `b=1`.

Essa abordagem é chamada de [programação dinâmica bottom-up](https://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o_din%C3%A2mica) (de baixo para cima).
