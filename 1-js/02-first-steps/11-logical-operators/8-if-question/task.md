importance: 5

---

# Uma questão sobre "if"

Qual destes `alert`s serão executados?

Qual será o resultado das expressões dentro dos `if(...)`s?

```js
if (-1 || 0) alert( 'primeiro' );
if (-1 && 0) alert( 'segundo' );
if (null || -1 && 1) alert( 'terceiro' );
```
