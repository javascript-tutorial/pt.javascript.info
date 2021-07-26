A solução:

```js run demo
function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}

let f1000 = delay(alert, 1000);

f1000("test"); // exibe "test" depois de 1000ms
```

Por favor note como uma função seta (arrow function) é usada aqui. Tal como sabemos, funções seta não têm seus próprios `this` e `arguments`, então `f.apply(this, arguments)` recebe `this` e `arguments` a partir do encapsulador.

Se passássemos uma função normal, `setTimeout` iria chamá-la sem argumentos nem `this=window` (assumindo que estávamos no browser).

Ainda podemos passar o `this` certo atráves do uso de uma variável intermediador, porém é um pouco mais difícil:

```js
function delay(f, ms) {

  return function(...args) {
    let savedThis = this; // guarde isto numa variável intermédia
    setTimeout(function() {
      f.apply(savedThis, args); // use-a aqui
    }, ms);
  };

}
```
