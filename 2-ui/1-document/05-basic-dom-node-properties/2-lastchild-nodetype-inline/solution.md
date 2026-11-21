Há uma pegadinha aqui.

No momento da execução do `<script>`, o último nó do DOM é exatamente o `<script>`, porque o navegador ainda não processou o resto da página.

Então o resultado é `1` (nó do tipo elemento).

```html run height=60
<html>

<body>
  <script>
    alert(document.body.lastChild.nodeType);
  </script>
</body>

</html>
```
