A chamada `arr[2]()` é sintaticamente o bom e velho `obj[method]()`, no lugar de `obj` temos `arr`, e no lugar de `method` temos `2`.

Então nós temos uma chamada da função `arr[2]` como um método de objeto. Naturalmente, ele recebe 'this' fazendo referência ao objeto `arr` e gera o array:

```js run
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // "a","b",function
```

O array tem 3 valores: inicialmente ele tinha dois, mais a função.
