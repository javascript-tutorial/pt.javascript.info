

```js run demo
let a = +prompt("O primeiro número?", "");
let b = +prompt("O segundo número?", "");

alert( a + b );
```

Observe o mais unário `+` antes de `prompt`. Ele converte o valor para um número imediatamente.

Caso contrário, `a` e `b` seriam strings e a soma delas seria a concatenação, ou seja: `"1" + "2" = "12"`.
