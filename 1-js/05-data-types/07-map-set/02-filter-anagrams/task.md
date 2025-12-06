importance: 4

---

# Filtrar anagramas

[Anagramas](https://en.wikipedia.org/wiki/Anagram) são palavras que têm o mesmo número das mesmas letras, mas em ordem diferente.

Por exemplo:

```
nap - pan
ear - are - era
cheaters - hectares - teachers
```

Escreva uma função `aclean(arr)` que retorne um array limpo de anagramas.

Por exemplo:

```js
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" ou "PAN,cheaters,era"
```

De cada grupo de anagramas, deve permanecer apenas uma palavra, não importa qual.
