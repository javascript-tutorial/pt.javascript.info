A solução é curta, mas pode parecer um pouco complicada, então aqui eu a apresento com comentários extensos:

```js
let sortedRows = Array.from(table.tBodies[0].rows) // 1
  .sort((rowA, rowB) => rowA.cells[0].innerHTML.localeCompare(rowB.cells[0].innerHTML));

table.tBodies[0].append(...sortedRows); // (3)
```

O algoritmo passo a passo:

1. Obtenha todos os `<tr>`, de dentro do `<tbody>`.
2. Depois ordene-os comparando pelo conteúdo do primeiro `<td>` (o campo do nome).
3. Agora insira os nós na ordem correta com `.append(...sortedRows)`.

Não precisamos remover os elementos de linha, apenas "reinseri-los", eles saem do lugar antigo automaticamente.

P.S. No nosso caso, há um `<tbody>` explícito na tabela, mas mesmo que a tabela HTML não tenha `<tbody>`, a estrutura do DOM sempre o terá.
