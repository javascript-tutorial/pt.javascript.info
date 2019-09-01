Não podemos substituir o primeiro caractere, pois strings em JavaScript são imutáveis.

Mas podemos fazer uma nova string baseada na existente, com o primeiro caractere maiúsculo:

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

No entanto existe um pequeno problema. Se `str` for vazia, então `str[0]` é undefined, e como `undefined` não possui o método `toUpperCase()`, obtemos um erro.

Existem duas possibilidades:

1. Use `str.charAt(0)`, já que sempre retorna uma string (talvez vazia).
2. Adicione um teste para string vazia.

Aqui está a segunda possibilidade:

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```

