importance: 5

---

# Invocando o contexto de um *array*

Qual é o resultado? Porquê?

```js
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // ?
```

