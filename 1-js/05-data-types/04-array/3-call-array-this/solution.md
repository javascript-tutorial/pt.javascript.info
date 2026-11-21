A chamada `arr[2]()` é, sintaticamente, o bom e velho `obj[method]()`, no papel de `obj` temos `arr`, e no papel de `method` temos `2`.

Então temos uma chamada da função `arr[2]` como um método de objeto. Naturalmente, ela recebe `this` referenciando o objeto `arr` e exibe o array:

```js run
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // a,b,function(){...}
```

O array tem 3 valores: inicialmente tinha dois, mais a função. 
