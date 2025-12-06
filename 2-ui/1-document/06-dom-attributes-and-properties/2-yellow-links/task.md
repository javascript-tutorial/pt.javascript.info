importance: 3

---

# Faça com que links externos fiquem laranja

Faça com que todos os links externos fiquem laranjas alterando a propriedade `style`.

Um link é externo se:
- Seu `href` contém `://`.
- Mas não começa com `http://internal.com`.

Por exemplo:

```html run
<a name="list">a lista</a>
<ul>
  <li><a href="http://google.com">http://google.com</a></li>
  <li><a href="/tutorial">/tutorial.html</a></li>
  <li><a href="local/path">local/path</a></li>
  <li><a href="ftp://ftp.com/my.zip">ftp://ftp.com/my.zip</a></li>
  <li><a href="http://nodejs.org">http://nodejs.org</a></li>
  <li><a href="http://internal.com/test">http://internal.com/test</a></li>
</ul>

<script>
  // Definindo o estilo para um único link
  let link = document.querySelector('a');
  link.style.color = 'orange';
</script>
```

O resultado deverá ser:

[iframe border=1 height=180 src="solution"]
