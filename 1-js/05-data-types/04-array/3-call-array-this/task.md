importance: 5

---

# Chamando no contexto de um array

Qual é o resultado? Por quê?

```js
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
});

arr[2](); // ?
```

