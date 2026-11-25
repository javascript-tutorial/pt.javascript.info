A solução tem duas partes.

1. Envolva o título de cada nó da árvore em um `<span>`. Então podemos estilizá-los com CSS no `:hover` e tratar cliques exatamente no texto, porque a largura do `<span>` é exatamente a largura do texto (diferente de sem ele).
2. Defina um manipulador no nó raiz `tree` e trate cliques nesses títulos `<span>`.
