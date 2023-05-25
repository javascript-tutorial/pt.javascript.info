A razão é que o prompt retorna a entrada de um usuário como uma string.

Portanto, as variáveis tem valores `"1"` e `"2"` respectivamente.


```js run
let a = "1"; // prompt("Primeiro número?", 1);
let b = "2"; // prompt("Segundo número?", 2);

alert(a + b); // 12
```

O que devemos fazer para converter string em números antes de `+`. Por exemplo, usando `Number()` or anexando-os com `+`.

Por exemplo, logo antes de `prompt`:

```js run
let a = +prompt("Primeiro número?", 1);
let b = +prompt("Segundo número?", 2);

alert(a + b); // 3
```

Ou no `alert`:

```js run
let a = prompt("Primeiro número?", 1);
let b = prompt("Segundo número?", 2);

alert(+a + +b); // 3
```

Usando ambos, unário e binário `+` no código mais recente. Parece engraçado, não é?