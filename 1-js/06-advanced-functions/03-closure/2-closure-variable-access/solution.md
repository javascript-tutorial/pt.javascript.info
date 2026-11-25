A resposta é: **Pete**.

A função `work()` no código abaixo pega `name` do seu lugar de origem, através da referência do ambiente léxico externo:

![](lexenv-nested-work.svg)

Então, o resultado aqui é `"Pete"`.

Mas se não houvesse `let name` em `makeWorker()`, então a busca iria para fora e pegaria a variável global, como podemos ver pela cadeia acima. Nesse caso, o resultado seria `"John"`.
