Internamente a fração decimal `6.35` é um binário sem fim. Como sempre nesses casos, é armazenado com uma perda de precisão.

Vejamos:

```js run
alert( 6.35.toFixed(20) ); // 6.34999999999999964473
```

A perda de precisão pode causar aumento ou diminuição de um número. Nesse caso particular o número torna-se um pouco menor, é por isso que é arredondado para baixo.

E quanto a `1.35`?

```js run
alert( 1.35.toFixed(20) ); // 1.35000000000000008882
```

Aqui a perda de precisão fez o número ficar um pouco maior, então ele arredondou para cima.

**Como podemos resolver o problema com `6.35` se nós queremos que ele seja arredondado da maneira correta?**

Nós deveriamos trazê-lo mais próximo de um inteiro antes de arredondar:

```js run
alert( (6.35 * 10).toFixed(20) ); // 63.50000000000000000000
```

Note que `63.5` não têm nenhuma perda de precisão. Isso acontece porque a parte decimal `0.5` é na verdade `1/2`. Frações divididas por potências de `2` são representadas de forma exata no sistema binário, agora podemos arredondá-lo:


```js run
alert( Math.round(6.35 * 10) / 10); // 6.35 -> 63.5 -> 64(arredondado) -> 6.4
```

