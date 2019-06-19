importância: 4

---

# Filtrar anagramas

[Anagramas](https://en.wikipedia.org/wiki/Anagram) são palavras que têm o mesmo número de letras iguais, mas em ordem diferente.

Por exemplo:

```
nap - pan
ear - are - era
cheaters - hectares - teachers
```

Escreva uma função `aclean(arr)` que retorna um array limpo de anagramas.

Por exemplo:

```js
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"
```

De todo grupo anagrama deve permanecer apenas uma palavra, não importa qual.

