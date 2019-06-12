Vamos percorrer os itens do array:
- Para cada item, verificaremos se o array resultante já possui esse item.
- Se for assim, então ignore, caso contrário, adicione aos resultados.

```js run demo
function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

let strings = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(strings) ); // Hare, Krishna, :-O
```

O código funciona, mas há um problema de desempenho potencial nele.

O método `result.includes(str)` orienta internamente o array `result` e compara cada elemento com `str` para encontrar a correspondência.

Então, se houver `100` elementos em` result` e ninguém corresponder a `str`, ele irá percorrer todo o `result` e fará exatamente `100` comparações. E se `result` for grande, como` 10000`, haveria `10000` comparações.

Isso não é um problema por si só, porque os mecanismos de JavaScript são muito rápidos, então o array `10000` é uma questão de microssegundos.

Mas nós fazemos esse teste para cada elemento de `arr`, no loop `for`.

Então, se `arr.length` for `10000`, teremos algo como `10000 * 10000` = 100 milhões de comparações. Isso é muito.

Portanto, a solução é boa apenas para matrizes pequenas.

Mais adiante, no capítulo <info:map-set-weakmap-weakset>, veremos como otimizá-lo.
