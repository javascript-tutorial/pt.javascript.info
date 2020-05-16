A razão é que o prompt retorna a entrada do usuário como string.

Então as variáveis possuem valores como `"1"` e `"2"`, respectivamente.

```js run
let a = "1"; // prompt("Primeiro número?", 1);
let b = "2"; // prompt("Segundo número?", 2);

alert(a + b); // 12
```

O que deveríamos fazer é converter as strings para números antes da `+`. Por exemplo, usando `Number()` ou prefixando elas com `+`.

Por exemplo, logo antes do `prompt`:

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

Ambos os `+` unário e binário foram usados no último código. Parece estranho, não?
