importance: 5

---

# Propriedade de função depois do bind

Existe um valor na propriedade de uma função. Ele vai mudar depois do `bind`? Por que sim, ou por que não?

```js run
function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

*!*
let bound = sayHi.bind({
  name: "John"
});

alert( bound.test ); // qual vai ser a saída? por quê?
*/!*
```

