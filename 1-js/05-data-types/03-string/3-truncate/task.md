importance: 5

---

# Cortar o texto

Crie uma função `truncate(str, maxlength)` que checa se o tamanho do `str` e, se exceder `maxlength` -- substitua o fim de `str` com o caractere de reticências `"…"`, para fazer seu tamanho igual ao `maxlength`.

O resultado da função deve ser a string cortada(se necessário).

Por exemplo:

```js
truncate("What I'd like to tell on this topic is:", 20) == "What I'd like to te…"

truncate("Hi everyone!", 20) == "Hi everyone!"
```
