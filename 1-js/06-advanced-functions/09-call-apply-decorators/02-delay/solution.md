A solução:

```js run demo
function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}

let f1000 = delay(alert, 1000);

f1000("test"); // imprima "test" depois 1000ms
```

Por favor note como uma função em seta (arrow function) é usada aqui. Tal como sabemos, funções em setas não tem seu próprio `this` e `arguments`, então `f.apply(this, arguments)` recebem `this` e `arguments` a partir de um encapsulador.

Se passassemos uma função normal, `setTimeout` a chamaria sem argumentos e `this=window` (assumindo que estamos no browser).

Ainda podemos passar o `this` certo atráves do uso de uma variável intermediador, porém é um pouco mais difícil:

```js
function delay(f, ms) {

  return function(...args) {
    let savedThis = this; // guarde isto dentro de uma variável intermediador
    setTimeout(function() {
      f.apply(savedThis, args); // use-o aqui
    }, ms);
  };

}
```