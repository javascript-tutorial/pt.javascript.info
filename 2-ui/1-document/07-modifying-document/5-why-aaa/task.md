importance: 1

---

# Por que "aaa" permanece?

No exemplo abaixo, a chamada `table.remove()` remove a tabela do documento.

Mas se você executar, pode ver que o texto `"aaa"` ainda fica visível.

Por que isso acontece?

```html height=100 run
<table id="table">
  aaa
  <tr>
    <td>Teste</td>
  </tr>
</table>

<script>
  alert(table); // a tabela, como deveria ser

  table.remove();
  // por que ainda há "aaa" no documento?
</script>
```
