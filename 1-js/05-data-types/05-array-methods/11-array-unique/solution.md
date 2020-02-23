Vamos percorrer os itens do array:
- Para cada item, vamos checar se o array `result` já possui esse item.
- Se sim, então será ignorado, do contrário será adicionado a `result`.

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

O código funciona, porém existe um potencial problema de performance aqui.

O método `result.includes(str)` internamente percorre o array `result` e compara cada elemento com `str` para achar um que combine.

Então se tiver `100` elementos em `result` e nenhum combine com `str`, então ele vai percorrer `result` inteiro e fazer exatamente `100` comparações. E se `result` for muito maior, como `10000`, então terá `10000` comparações.

Isso não é um problema tão preocupante porque as engines do JavaScript são muito rápidas, então percorrer um array de `10000` itens dura questões de microsegundos.

Porém, nós estamos fazendo estes teste para cada elemento em `arr` no laço de repetição `for`.

Então se `arr.length` for `10000` vamos ter algo como: `10000*10000` = 100 milhões de comparações. Isso é muito.

Então, essa solução é somente boa para arrays pequenas.

Mais adiante no capítulo <info:map-set-weakmap-weakset> vamos ver como otimizar isso.
