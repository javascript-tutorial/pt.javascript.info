importance: 4

---

# Calcule o fatorial

O [fatorial](https://pt.wikipedia.org/wiki/Fatorial) de um número natural é um número multiplicado por `"número menos um"`, depois por `"número menos dois"`, e assim por diante até `1`. O fatorial de `n` é denotado como`n!`

Podemos escrever uma definição de fatorial assim:

```js
n! = n * (n - 1) * (n - 2) * ...*1
```

Valores de fatoriais para diferentes `n`:

```js
1! = 1
2! = 2 * 1 = 2
3! = 3 * 2 * 1 = 6
4! = 4 * 3 * 2 * 1 = 24
5! = 5 * 4 * 3 * 2 * 1 = 120
```

A tarefa é escrever uma função `factorial(n)` que calcule `n!` Usando chamadas recursivas.

```js
alert( factorial(5) ); // 120
```

Obs. Dica: `n!` pode ser escrito como `n * (n-1)!`. Por exemplo: `3! = 3*2! = 3*2*1! = 6`
