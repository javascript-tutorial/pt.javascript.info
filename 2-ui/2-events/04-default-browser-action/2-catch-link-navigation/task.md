importance: 5

---

# Capture links no elemento

Faça com que todos os links dentro do elemento com `id="contents"` perguntem ao usuário se ele realmente quer sair. E, se ele não quiser, não navegue.

Assim:

[iframe height=100 border=1 src="solution"]

Detalhes:

- O HTML dentro do elemento pode ser carregado ou regenerado dinamicamente em qualquer momento, então não podemos encontrar todos os links e colocar manipuladores neles. Use delegação de eventos.
- O conteúdo pode ter tags aninhadas. Dentro de links também, como `<a href=".."><i>...</i></a>`.
