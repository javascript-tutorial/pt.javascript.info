# Regex para cores hexadecimais

Crie uma expressão regular que reconhece cores escritas no formato `#ABCDEF`: Primeiro um `#`, seguido de 6 caracteres hexadecimais

Um caso de uso para a expressão:

```js
let regexp = /...sua expressão.../

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";

alert( str.match(regexp) )  // #121212,#AA00ef
```

P.S. Nesse exercício nós não precisamos de outros formatos de cor, como o `#123` ou `rgb(1,2,3)`, etc.
