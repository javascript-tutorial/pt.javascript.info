Não podemos "substituir" o primeiro carátere, porque *strings* em JavaScript são imutáveis.

Mas podemos criar uma nova *string* com base na existente, com o primeiro carátere em maiúsculas:

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

Contudo, há um pequeno problema. Se `str` estiver vazia, então `str[0]` é *undefined*, e assim obtemos um erro.

Existem duas variantes aqui:

1. Use `str.charAt(0)`, porque sempre retorna uma *string* (por vezes vazia).
2. Adicione um teste por uma *string* vazia.

Aqui está a segunda variante:

```js run
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```
