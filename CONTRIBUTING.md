# Contribuições

Esse documento contém recomendações de como contribuir com traduções para o tutorial.

## Passo a passo

1. Abra a issue #1
1. Escolha um artigo sem atribuição
1. Adicione um novo comentário na issue com o nome do artigo **exatamente** como está na lista
1. Crie um fork do repositório e traduza o conteúdo do artigo, isso inclui os exercícios
1. Abra um pull request com o título idêntico ao usado no comentário.

> [!TIP]
> Segure a tecla <kbd>Alt</kbd> para selecionar o texto de um link sem acessar a página

## Traduções

Ao traduzir qualquer texto, mantenha algumas considerações em mente:

**Uma tradução verbatim (literal, palavra por palavra) normalmente não auxilia no entendimento do conteúdo.** Lembre-se: Estamos contribuindo com um tutorial! O mais importante é oferecer um texto de fácil compreensão. Expressar os conceitos de maneira clara é mais importante do que uma correspondência exata ao texto original.

**Evite usar serviços de tradução para trechos inteiros**. Se o trabalho de tradução fosse algo tão trivial quanto usar uma ferramenta automatizada, não teríamos todo esse trabalho, não é mesmo? Quando estiver com dificuldades para traduzir um trecho ou um termo, considere as seguintes alternativas:

1. Qual a ideia que o texto apresenta? Tente expressar essa ideia usando suas próprias palavras (usando sempre do bom senso, claro).
1. Peça ajuda a outras pessoas! É um trabalho colaborativo no final das contas.
1. Talvez parte do texto seja uma expressão popular que não possui uma equivalência exata. Nesses casos a dica 1 é bem útil. Busque entender a expressão na língua original para realizar a tradução.
1. Ao invés de usar um serviço de tradução direta, procure o termo em alguma enciclopédia online na língua original, e mude a página para a sua língua de destino em seguida. Isso é bem útil para traduzir termos técnicos!

> [!NOTE]
> Independente do que escolher, lembre-se que a recomendação é contra *trechos inteiros*. Nada impede você de usar esses serviços para traduzir um termo isolado, ou buscar sinônimos de uma tradução que você já conheça.

**Gramática e concordância são importantes, mas não deixe que isso te impeça de contribuir!** É para isso que temos o processo de revisão em duas etapas. Duas pessoas diferentes vão revisar sua contribuição e sugerir mudanças antes de qualquer coisa ser integrada do projeto de fato. É uma ótima oportunidade para você aprender mais sobre as línguas também!

**É um tutorial que te ensina JavaScript, não um documento oficial.** Repare que em diversos momentos do texto o próprio autor usa de expressões, maneirismos e passagens descontraídas. Claro, como mencionado acima, gramática é importante! Mas não precisamos usar uma linguagem tão formal - Priorize o entendimento!

**E o mais importante, conte conosco!** Somos uma *comunidade* num esforço *coletivo* em benefício de *toda a comunidade lusófona*. Em caso de dúvidas, não exite em abrir uma issue.

> [!CAUTION]
> Os artigos contam com uma sintaxe específica do tutorial para certos elementos: `pattern:`, `subject:`, `match:`, etc. Os termos antes do `:` não devem ser traduzidos.

## Links internos

Todos os links do tutorial devem ser relativos e começar da raiz, sem o domínio.

✅ Correto:

```md
Abordaremos isso no capítulo [sobre funções](/function-basics)
```

❌ Errado:

```md
Abordaremos isso no capítulo [sobre funções](https://javascript.info/function-basics)
```

Além disso, para referenciar um capítulo, há uma sintaxe especial "info:":

```md
Abordaremos isso no capítulo <info:function-basics>.
```

Que torna-se:

```html
Abordaremos isso no capítulo <a href="/function-basics">Funções básicas</a>.
```

O título é inserido automaticamente a partir do artigo referenciado. Isso tem a vantagem de manter o título correto se o artigo for renomeado.

## TODO

Pergunte a @iliakan para mais detalhes.
