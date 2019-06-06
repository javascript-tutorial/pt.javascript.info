importance: 5

---

# Uma pergunta sobre "if"

Quais destes `alert`s serão executados?

Quais serão os resultados das expressões dentro de `if (...)`?

```js
if (-1 || 0) alert( 'first' );
if (-1 && 0) alert( 'second' );
if (null || -1 && 1) alert( 'third' );
```

