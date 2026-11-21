Vamos criar a tabela como uma string: `"<table>...</table>"`, e depois atribuí-la a `innerHTML`.

O algoritmo:

1. Crie o cabeçalho da tabela com `<th>` e os nomes dos dias da semana.
2. Crie o objeto de data `d = new Date(year, month-1)`. Esse é o primeiro dia de `month` (levando em conta que os meses em JavaScript começam de `0`, não de `1`).
3. As primeiras células até o primeiro dia do mês `d.getDay()` podem ficar vazias. Vamos preenchê-las com `<td></td>`.
4. Aumente o dia em `d`: `d.setDate(d.getDate()+1)`. Se `d.getMonth()` ainda não for o próximo mês, então adicione a nova célula `<td>` ao calendário. Se for um domingo, então adicione uma nova linha <code>"&lt;/tr&gt;&lt;tr&gt;"</code>.
5. Se o mês tiver terminado, mas a linha da tabela ainda não estiver completa, adicione `<td>` vazios nela, para deixá-la quadrada.
