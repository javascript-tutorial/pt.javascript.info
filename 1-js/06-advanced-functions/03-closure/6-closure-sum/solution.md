Para o segundo parênteses funcionar, o primeiro precisa retornar uma função.

Assim:

```js run
function sum(a) {

  return function(b) {
    return a + b; // pega "a" do ambiente léxico externo
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```

