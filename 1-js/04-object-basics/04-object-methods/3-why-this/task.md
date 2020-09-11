importância: 3

---

# Explique o valor de "this"

No código abaixo, pretendemos invocar o método `user.go()` 4 vezes seguidas.

Mas, as chamadas `(1)` e `(2)` funcionam de forma diferente do que as  `(3)` e `(4)`. Porquê?

```js run no-beautify
let obj, method;

obj = {
  go: function() { alert(this); }
};

obj.go();               // (1) [object Object]

(obj.go)();             // (2) [object Object]

(method = obj.go)();    // (3) undefined

(obj.go || obj.stop)(); // (4) undefined
```
