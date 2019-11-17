importance: 2

---

# Duas funções – um objeto

É possível criar funções `A` e `B` tais que `new A()==new B()`?

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

Se sim, então forneça um exemplo de seus códigos.
