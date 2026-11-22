importance: 4

---

# Tabela ordenável

Faça a tabela ser ordenável: cliques nos elementos `<th>` devem ordená-la pela coluna correspondente.

Cada `<th>` tem o tipo no atributo, assim:

```html
<table id="grid">
  <thead>
    <tr>
*!*
      <th data-type="number">Idade</th>
      <th data-type="string">Nome</th>
*/!*
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>5</td>
      <td>John</td>
    </tr>
    <tr>
      <td>10</td>
      <td>Ann</td>
    </tr>
    ...
  </tbody>
</table>
```

No exemplo acima, a primeira coluna tem números, e a segunda -- strings. A função de ordenação deve tratar a ordenação de acordo com o tipo.

Só os tipos `"string"` e `"number"` devem ser suportados.

O exemplo funcional:

[iframe border=1 src="solution" height=190]

P.S. A tabela pode ser grande, com qualquer número de linhas e colunas.
