importância: 5

---

# Chamando em um contexto de array

Qual é o resultado? Por quê?

```js
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // ?
```

