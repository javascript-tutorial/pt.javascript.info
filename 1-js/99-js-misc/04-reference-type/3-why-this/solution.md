Aqui estão as explicações.

1. Isso é uma chamada de método de objeto regular.

2. O mesmo, parênteses não alteram a ordem das operações aqui, o ponto é executado primeiro de qualquer maneira.

3. Aqui temos uma chamada mais complexa (expressão)(). A chamada funciona como se estivesse dividida em duas linhas:

    ```js no-beautify
    f = obj.go; // calcula a expressão
    f();        // chama o que temos
    ```

    Aqui, f() é executado como uma função, sem this.

4. A coisa semelhante ao `(3)`, à esquerda dos parênteses `()` temos uma expressão.

Para explicar o comportamento de `(3)` e `(4)`, precisamos lembrar que os acessadores de propriedade (ponto ou colchetes) retornam um valor do Tipo de Referência.

Qualquer operação nele, exceto uma chamada de método (como a atribuição `=` ou `||`), o transforma em um valor comum, que não carrega a informação permitindo configurar `this`.