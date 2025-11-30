

```js run
Function.prototype.defer = function(ms) {
  setTimeout(this, ms);
};

function f() {
  alert("Olá!");
}

f.defer(1000); // mostra "Olá!" depois de 1 segundo
```
