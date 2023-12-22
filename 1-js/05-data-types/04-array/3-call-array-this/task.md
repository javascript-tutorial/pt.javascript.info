importance: 5

---

# Chamando uma função no contexto de um *array*

Qual é o resultado? Porquê?

```js
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
});

arr[2](); // ?
```

