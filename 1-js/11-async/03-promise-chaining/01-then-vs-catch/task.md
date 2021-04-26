# Promessa: then versus catch

Estes fragmentos de código são iguais? Em outras palavras, eles se comportam da mesma maneira, em quaisquer circunstâncias, para qualquer função tratadora?

```js
promise.then(f1).catch(f2);
```

Versus:

```js
promise.then(f1, f2);
```
