A resposta: **`BODY`**.

```html run
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // BODY
</script>
```

O que está acontecendo, passo a passo:

1. O conteúdo de `<body>` é substituído pelo comentário. O comentário é `<!--BODY-->`, porque `body.tagName == "BODY"`. Como lembramos, `tagName` é sempre em maiúsculas em HTML.
2. O comentário agora é o único nó filho, então o obtemos em `body.firstChild`.
3. A propriedade `data` do comentário é o seu conteúdo (dentro de `<!--...-->`): `"BODY"`.
