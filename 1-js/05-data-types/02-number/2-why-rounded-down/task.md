importância: 4

---

# Por quê 6.35.toFixed(1) == 6.3?

De acordo com a documentação `Math.round` e `toFixed` ambos arredondam para o número mais próximo: `0..4` arredonda para baixo `5..9` para cima.

Por exemplo:

```js run
alert( 1.35.toFixed(1) ); // 1.4
```

No exemplo similar abaixo, por quê `6.35` é arredondado para `6.3`, e não `6.4`?

```js run
alert( 6.35.toFixed(1) ); // 6.3
```

Como arredondar `6.35` corretamente?

