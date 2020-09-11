
Aqui estão as explicações.

1. É uma regular invocação do método do objeto.

2. O mesmo. Aqui, os parênteses não alteram a ordem das operações, o ponto já funciona à primeira.

3. Aqui, temos uma chamada `(expression).method()` mais complexa. A chamada funciona como se fosse particionada em duas linhas:

    ```js no-beautify
    f = obj.go; // calcula a expressão
    f();        // invoca o resultado
    ```

    Aqui, `f()` é executada como uma função, sem `this`.

4. Algo similar a `(3)`, à esquerda do ponto `.` temos uma expressão.

Para explicar o comportamento de `(3)` e `(4)`, recordemo-nos que propriedades acessoras (o ponto ou os parênteses retos) retornam um valor do Tipo *Reference*.  

Qualquer operação com elas (como, atribuição `=` ou `||`), exceto a chamada a um método, o transforma num valor ordinário, o qual não transporta a informação necessária para configurar `this`.
