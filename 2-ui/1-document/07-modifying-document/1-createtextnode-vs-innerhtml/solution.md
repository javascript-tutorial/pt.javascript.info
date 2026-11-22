Resposta: **1 e 3**.

Ambos os comandos resultam em adicionar o `text` "como texto" dentro de `elem`.

Aqui está um exemplo:

```html run height=80
<div id="elem1"></div>
<div id="elem2"></div>
<div id="elem3"></div>
<script>
  let text = '<b>text</b>';

  elem1.append(document.createTextNode(text));
  elem2.innerHTML = text;
  elem3.textContent = text;
</script>
```
