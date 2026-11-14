importance: 4

---

# Por que 6.35.toFixed(1) == 6.3?

De acordo com a documentação, tanto `Math.round` quanto `toFixed` arredondam para o número mais próximo: `0..4` arredondam para baixo, enquanto `5..9` arredondam para cima.

Por exemplo:

```js run
alert( 1.35.toFixed(1) ); // 1.4
```

No exemplo parecido abaixo, por que `6.35` é arredondado para `6.3`, e não para `6.4`?

```js run
alert( 6.35.toFixed(1) ); // 6.3
```

Como arredondar `6.35` da forma correta?

