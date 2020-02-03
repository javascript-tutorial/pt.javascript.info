The first solution we could try here is the recursive one.

Os números de Fibonacci são recursivos por definição:

```js run
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

alert( fib(3) ); // 2
alert( fib(7) ); // 13
// fib(77); // será extremamente lento!
```

...Mas para `n` muito altos é muito lento. Por exemplo, `fib(77)` pode travar por algum tempo consumindo todos os recursos da CPU.

Isso ocorre porque a função faz muitas sub-chamadas. Os mesmos valores são reavaliados repetidamente.

Por exemplo, vamos ver alguns cálculos para `fib(5)`:

```js no-beautify
...
fib(5) = fib(4) + fib(3)
fib(4) = fib(3) + fib(2)
...
```

Aqui podemos ver que o valor de `fib(3)` é necessário para `fib(5)` e `fib(4)`. Portanto, `fib(3)` será chamado e avaliado duas vezes de forma completamente independente.

Aqui está a árvore de recursão completa:

![árvore de recursão de fibonacci](fibonacci-recursion-tree.svg)

Podemos notar claramente que `fib(3)` é avaliado duas vezes e `fib (2)` é avaliado três vezes. A quantidade total de cálculos cresce muito mais rápido que `n`, tornando-o enorme mesmo para `n=77`.

Podemos otimizar isso lembrando os valores já avaliados: se um valor do tipo `fib(3)` for calculado uma vez, então podemos apenas reutilizá-lo em cálculos futuros.

Outra variante seria desistir da recursão e usar um algoritmo baseado em loop totalmente diferente.

Em vez de passar de `n` para valores mais baixos, podemos fazer um loop que começa com` 1` e `2`, e depois recebe `fib(3) `como sua soma, depois `fib(4) `como a soma de dois valores anteriores, depois `fib(5)` e sobe e sobe, até chegar ao valor necessário. Em cada etapa, precisamos apenas lembrar dois valores anteriores.

Aqui estão as etapas do novo algoritmo em detalhes.

O começo:

```js
// a = fib(1), b = fib(2), esses valores por definição são 1
let a = 1, b = 1;

// get c = fib(3) é a soma deles
let c = a + b;

/* agora nós temos fib(1), fib(2), fib(3)
a  b  c
1, 1, 2
*/
```

Agora queremos `fib(4) = fib(2) + fib(3)`.

Vamos mudar as variáveis: `a,b` receberá `fib(2),fib(3)`, e `c` a soma delas:

```js no-beautify
a = b; // agora a = fib(2)
b = c; // agora b = fib(3)
c = a + b; // c = fib(4)

/* agora nós temos a sequência:
   a  b  c
1, 1, 2, 3
*/
```

O próximo passo fornece outro número de sequência:

```js no-beautify
a = b; // agora a = fib(3)
b = c; // agora b = fib(4)
c = a + b; // c = fib(5)

/* agora a sequência é (mais um número):
      a  b  c
1, 1, 2, 3, 5
*/
```

...E assim por diante até obtermos o valor necessário. Isso é muito mais rápido que a recursão e não envolve cálculos duplicados.

O código inteiro:

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

O loop começa com `i=3`, porque o primeiro e o segundo valores da sequência são codificados nas variáveis `a=1`, `b=1`.

A abordagem é chamada [programação dinâmica Bottom-Up](https://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o_din%C3%A2mica).
