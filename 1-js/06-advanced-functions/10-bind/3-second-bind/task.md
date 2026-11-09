importance: 5

---

# Segundo bind

Podemos mudar o `this` com um vínculo adicional?

Qual vai ser a saída?

```js no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Ann" } );

f();
```

