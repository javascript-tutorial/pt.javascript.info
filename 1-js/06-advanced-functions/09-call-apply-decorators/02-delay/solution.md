A solução:

```js run demo
function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}

let f1000 = delay(alert, 1000);

f1000("teste"); // exibe "teste" após 1000ms
```

Nota como é utilizada aqui uma função de seta (ou função anónima). Como sabemos, as funções de seta não possuem `this` e `arguments` próprios, então `f.apply(this, arguments)` recebe o `this` e `arguments` da função envolvente.

Se passarmos uma função normal, `setTimeout` a chamaria sem argumentos e `this=window` (assumindo que estamos no navegador).

Nós podemos ainda passar o `this` correto utilizando uma variável intermediária, mas isso é um pouco mais complicado:

```js
function delay(f, ms) {

  return function(...args) {
    let savedThis = this; // armazenar isto numa variável intermédia
    setTimeout(function() {
      f.apply(savedThis, args); // utilizá-lo aqui
    }, ms);
  };

}
```
