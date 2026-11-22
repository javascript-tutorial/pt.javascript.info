O HTML na tarefa está incorreto. Essa é a razão da coisa estranha.

O navegador precisa corrigi-lo automaticamente. Mas não pode haver texto dentro de `<table>`: de acordo com a especificação, só são permitidas tags específicas de tabela. Então o navegador mostra `"aaa"` *antes* da `<table>`.

Agora é óbvio que, quando removemos a tabela, ele permanece.

A pergunta pode ser facilmente respondida explorando o DOM usando as ferramentas do navegador. Você vai ver `"aaa"` antes da `<table>`.

O padrão HTML especifica em detalhes como processar HTML incorreto, e esse comportamento do navegador está correto.
