

```js run demo
let a = +prompt("O primeiro número?", "");
let b = +prompt("O segundo número?", "");

alert( a + b );
```

Note o operador unário mais `+` antes do `prompt`. Ele imediatamente converte o valor para um número.

Caso contrário, `a` e `b` seriam strings e a soma deles seria sua concatenação, isto é: `"1" + "2" = "12"`.
