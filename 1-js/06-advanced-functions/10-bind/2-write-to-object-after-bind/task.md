importance: 5

---

# Função vinculada como um método

Qual vai ser a saída?

```js
function f() {
  alert( this ); // ?
}

let user = {
  g: f.bind(null)
};

user.g();
```

