importance: 3

---

# Por que "return false" não funciona?

Por que no código abaixo `return false` não funciona de forma alguma?

```html autorun run
<script>
  function handler() {
    alert( "..." );
    return false;
  }
</script>

<a href="https://w3.org" onclick="handler()">o navegador vai para w3.org</a>
```

O navegador segue a URL ao clicar, mas não queremos isso.

Como corrigir?
