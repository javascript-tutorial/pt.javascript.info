Internamente, a fração decimal `6.35` é um binário infinito. Como sempre acontece nesses casos, ela é armazenada com perda de precisão.

Vamos ver:

```js run
alert( 6.35.toFixed(20) ); // 6.34999999999999964473
```

A perda de precisão pode fazer um número tanto aumentar quanto diminuir. Nesse caso específico, o número fica um pouquinho menor, por isso ele foi arredondado para baixo.

E quanto ao `1.35`?

```js run
alert( 1.35.toFixed(20) ); // 1.35000000000000008882
```

Aqui a perda de precisão fez o número ficar um pouquinho maior, então ele foi arredondado para cima.

**Como podemos corrigir o problema com `6.35` se quisermos que ele seja arredondado da forma correta?**

Devemos aproximá-lo de um número inteiro antes de arredondar:

```js run
alert( (6.35 * 10).toFixed(20) ); // 63.50000000000000000000
```

Observe que `63.5` não tem nenhuma perda de precisão. Isso acontece porque a parte decimal `0.5` é, na verdade, `1/2`. Frações divididas por potências de `2` são representadas com exatidão no sistema binário, então agora podemos arredondar:


```js run
alert( Math.round(6.35 * 10) / 10 ); // 6.35 -> 63.5 -> 64(arredondado) -> 6.4
```

