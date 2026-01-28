A tarefa demonstra como as formas pós-fixa/prefixa podem levar a resultados diferentes quando usadas em comparações.

1. **De 1 a 4**

    ```js run
    let i = 0;
    while (++i < 5) alert( i );
    ```

    O primeiro valor é `i = 1`, porque `++i` primeiro incrementa `i` e depois retorna o novo valor. Então a primeira comparação é `1 < 5` e o `alert` mostra `1`.

    Depois seguem `2, 3, 4…` -- os valores aparecem um após o outro. A comparação sempre usa o valor incrementado, porque `++` está antes da variável.

    Finalmente, `i = 4` é incrementado para `5`, a comparação `while(5 < 5)` falha, e o laço para. Então `5` não é mostrado.
2. **De 1 a 5**

    ```js run
    let i = 0;
    while (i++ < 5) alert( i );
    ```

    O primeiro valor é novamente `i = 1`. A forma pós-fixa de `i++` incrementa `i` e depois retorna o valor *antigo*, então a comparação `i++ < 5` usará `i = 0` (ao contrário de `++i < 5`).

    Mas a chamada `alert` é separada. É outra instrução que executa após o incremento e a comparação. Então ela obtém o `i = 1` atual.

    Depois seguem `2, 3, 4…`

    Vamos parar em `i = 4`. A forma prefixa `++i` incrementaria e usaria `5` na comparação. Mas aqui temos a forma pós-fixa `i++`. Então ela incrementa `i` para `5`, mas retorna o valor antigo. Portanto, a comparação é na verdade `while(4 < 5)` -- verdadeiro, e o controle segue para `alert`.

    O valor `i = 5` é o último, porque no próximo passo `while(5 < 5)` é falso.
