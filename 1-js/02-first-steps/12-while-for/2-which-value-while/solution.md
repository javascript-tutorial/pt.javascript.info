Este exercício demonstra como formas posfixadas/prefixadas podem levar a resultados distintos quando utilizadas em comparações.

1. **De 1 a 4**

    ```js run
    let i = 0;
    while (++i < 5) alert( i );
    ```

    O primeiro valor é `i = 1`, pois `++i` primeiro incrementa `i` e em seguida retorna o novo valor. Então, a primeira comparação é `1 < 5` e o `alert` exibe `1`.

    Em seguida vêm `2, 3, 4…` -- os valores aparecem um depois do outro. A comparação sempre usa o valor incrementado, pois `++` vem antes da variável.

    Finalmente, `i = 4` é incrementado a `5`, a comparação `while(5 < 5)` falha, e o loop termina. Assim, `5` não é exibido.

2. **De 1 a 5**

    ```js run
    let i = 0;
    while (i++ < 5) alert( i );
    ```

    O primeiro valor é novamente `i = 1`. A forma posfixada `i++`incrementa `i` e em seguida retorna o valor *antigo*, então a comparação `i++ < 5` utilizará `i = 0` (diferente de `++i < 5`).

    Mas a chamada de `alert` é separada. Ela é uma declaração distinta que executa após o incremento e a comparaçào. Assim, ela recebe o valor atual `i = 1`.

    Em seguida, vêm `2, 3, 4…`

    Vamos parar em `i = 4`. A forma prefixada `++i` iria incrementar e utilizar `5` na comparação. Mas aqui temos a forma posfixada `i++`. Ela incrementa `i` para `5`, mas retorna o valor antigo. Portanto a comparação é, na verdade, `while(4 < 5)` -- verdadeira, e o controle passa para `alert`.

    O valor `i = 5` é o último, porque na próxima etapa `while(5 < 5)` é falso.
    