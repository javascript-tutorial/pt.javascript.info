Não podemos "substituir" o primeiro caractere, porque *strings* em JavaScript são imutáveis.

Mas podemos criar uma nova *string* com base na existente, com o primeiro caractere em maiúsculas:

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

Contudo, há um pequeno problema. Se `str` estiver vazia, então `str[0]` será `undefined`, e como `undefined` não possui o método `toUpperCase()`, recebemos um erro.

Existem aqui duas variantes:

1. Use `str.charAt(0)`, porque sempre retorna uma *string* (ainda que vazia).
2. Adicione um teste por uma *string* vazia.

Aqui está a segunda variante:

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```

