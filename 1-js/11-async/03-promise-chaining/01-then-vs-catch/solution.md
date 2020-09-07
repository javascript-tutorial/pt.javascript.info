<<<<<<< HEAD
A resposta breve é: **não, eles não são iguais**:
=======
The short answer is: **no, they are not equal**:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

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

<<<<<<< HEAD
Em outras palavras, `.then` passa resultados/erros para o próximo `.then/catch`. Então, no primeiro exemplo, há um `catch` em seguida, e no segundo exemplo não há, então o erro não é tratado. 
=======
In other words, `.then` passes results/errors to the next `.then/catch`. So in the first example, there's a `catch` below, and in the second one there isn't, so the error is unhandled.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
