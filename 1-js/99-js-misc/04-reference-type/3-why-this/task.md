importância: 3

---

# Explique o valor de "this"

No código abaixo, pretendemos chamar o método `obj.go()` 4 vezes consecutivas.

Mas as chamadas `(1)` e `(2)` funcionam de maneira diferente de `(3)` e `(4)`. Por quê?

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

