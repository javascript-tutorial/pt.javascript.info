importance: 3

---

# Tag em comentário

O que este código mostra?

```html
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // o que há aqui?
</script>
```
