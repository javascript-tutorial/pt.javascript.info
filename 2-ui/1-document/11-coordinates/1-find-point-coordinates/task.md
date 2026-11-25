importance: 5

---

# Encontre as coordenadas da janela do campo

No iframe abaixo você pode ver um documento com o "campo" verde.

Use JavaScript para encontrar as coordenadas da janela dos cantos apontados pelas setas.

Há um pequeno recurso implementado no documento para conveniência. Um clique em qualquer lugar mostra as coordenadas ali.

[iframe border=1 height=360 src="source" link edit]

Seu código deve usar o DOM para obter as coordenadas da janela de:

1. Canto externo superior esquerdo (isso é simples).
2. Canto externo inferior direito (também simples).
3. Canto interno superior esquerdo (um pouco mais difícil).
4. Canto interno inferior direito (há várias formas, escolha uma).

As coordenadas que você calcular devem ser as mesmas retornadas pelo clique do mouse.

P.S. O código também deve funcionar se o elemento tiver outro tamanho ou borda, sem ficar amarrado a nenhum valor fixo.
