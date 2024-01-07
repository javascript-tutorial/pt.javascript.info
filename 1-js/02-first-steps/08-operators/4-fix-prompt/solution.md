A razão é que o prompt retorna o input do usuário como uma string.

Então as variáveis têm valores `"1"` e `"2"`, respectivamente.

```js run
let a = "1"; // prompt("Primeiro número?", 1);
let b = "2"; // prompt("Segundo número?", 2);

alert(a + b); // 12
```

O que nós devemos fazer é converter strings em números antes da adição (`+`). Por exemplo, usando `Number()` ou precedendo-os com `+`.

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

Usando ambos `+` unário e binário no último código. Parece engraçado, não é mesmo?
