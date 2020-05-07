A resposta breve é: **não, eles não são iguais**:

A diferença é que se um erro ocorrer em `f1` ele será tratado pelo `.catch` neste caso:

```js run
promise
  .then(f1)
  .catch(f2);
```

...Mas não neste:

```js run
promise
  .then(f1, f2);
```

Isso é devido ao erro ser propagado pela cadeia, e no segundo código não há cadeia após `f1`.

Em outras palavras, `.then` passa resultados/erros para o próximo `.then/catch`. Então, no primeiro exemplo, há um `catch` em seguida, e no segundo exemplo não há, então o erro não é tratado. 
