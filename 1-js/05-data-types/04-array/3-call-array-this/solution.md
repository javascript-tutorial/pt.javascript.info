A invocação `arr[2]()` é sintáticamente a antiga `obj[method]()`; no papel de `obj` temos `arr`, e no papel de `method` temos `2`.

Assim, temos uma chamada da função `arr[2]` como um método de objeto. Naturalmente, como ela recebe em `this` a referência ao objeto `arr`, ela exibe o *array*:

```js run
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // a,b,function(){...}
```

O *array* tem 3 valores: inicialmente dois, mais a função.
