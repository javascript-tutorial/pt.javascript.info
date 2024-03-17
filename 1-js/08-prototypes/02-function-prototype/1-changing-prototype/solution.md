
Respostas:

1. `true`. 

    A atribuição a `Rabbit.prototype` configura o `[[Prototype]]` para novos objetos, mas não afeta os objetos que já existem.

2. `false`. 

    Objetos são atribuídos por referência. O objeto do `Rabbit.prototype` não é duplicado, ele continua sendo um único objeto referenciado por `Rabbit.prototype` e pelo `[[Prototype]]` do `rabbit`. 

    Portanto, quando nós mudamos o seu conteúdo através de uma referência, ele fica visível para as outras.

3. `true`.

    Todas as operações de `delete` são aplicadas diretamente ao objeto. Neste caso, `delete rabbit.eats` tenta remover a propriedade `eats` do `rabbit`, mas ele não a tem. Assim, essa operação não tem nenhum efeito.

4. `undefined`.

    A propriedade `eats` é deletada do protótipo, então ela realmente não existe mais.
