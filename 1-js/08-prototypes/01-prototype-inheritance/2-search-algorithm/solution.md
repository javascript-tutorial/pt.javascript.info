
1. Vamos adicionar o `__proto__`:

    ```js run
    let head = {
      glasses: 1
    };

    let table = {
      pen: 3,
      __proto__: head
    };

    let bed = {
      sheet: 1,
      pillow: 2,
      __proto__: table
    };

    let pockets = {
      money: 2000,
      __proto__: bed
    };

    alert( pockets.pen ); // 3
    alert( bed.glasses ); // 1
    alert( table.money ); // undefined
    ```

2. Em interpretadores de JavaScript modernos, com otimizações de performance (*performance-wise*), não há diferença entre obtermos uma propriedade de um objeto ou do seu protótipo. Eles se lembram onde a propriedade foi encontrada e reutilizam isso na próxima requisição.

    Por exemplo, para `pockets.glasses` elas lembram onde encontraram `glasses` (em `head`), e na próxima vez vão buscar lá. Elas também são inteligentes o suficiente para atualizar caches internos se algo mudar, então essa otimização é segura.
