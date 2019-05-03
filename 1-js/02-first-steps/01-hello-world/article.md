# Olá, mundo!

O tutorial que você está lendo é sobre a core do JavaScript, que é independente de plataforma. Mais tarde, você vai aprender sobre Node.js e outras plataformas que o usam.

Mas precisamos de um ambiente de trabalho para rodar nossos scripts e, como esse livro está online, o navegador é uma boa escolha. Vamos manter a quantidade de comandos específicos do navegador (como `alert`) no mínimo para que você não gaste tempo com eles se você planeja se concentrar em outro ambiente (como Node.js). Vamos focar em JavaScript no navegador na [próxima parte](/ui) do tutorial.

Então, primeiro, vamos ver como anexar um script a uma página. Para ambientes server-side (como Node.js), você pode executar o script com um comando como `"node my.js"`.


## A tag "script"

Os programas JavaScript podem ser inseridos em qualquer parte de um documento HTML com a ajuda da tag `<script>`.

Por exemplo:

```html run height=100
<!DOCTYPE HTML>
<html>

<body>

  <p>Antes do script...</p>

*!*
  <script>
    alert( 'Olá, mundo!' );
  </script>
*/!*

  <p>...Depois do script.</p>

</body>

</html>
```

```online
Você pode executar o exemplo clicando no botão "Jogar" no canto superior direito da caixa acima.
```

A tag `<script>` contém código JavaScript que é executado automaticamente quando o navegador processa a tag.


## Marcação moderna

A tag `<script>` tem alguns atributos que raramente são usados hoje em dia, mas que ainda podem ser encontrados em códigos antigos:

O atributo `type`: <code>&lt;script <u>type</u>=...&gt;</code>
: O antigo padrão HTML, HTML4, requeria um script para ter um `type`. Normalmente era `type="text/javascript"`. Não é mais necessário. Além disso, o moderno padrão HTML, HTML5, mudou totalmente o significado deste atributo. Agora, ele pode ser usado para módulos JavaScript. Mas esse é um tópico avançado; vamos falar sobre módulos em outra parte do tutorial. 

O atributo `language`: <code>&lt;script <u>language</u>=...&gt;</code>
: Este atributo foi criado para mostrar o idioma do script. Este atributo não faz mais sentido porque JavaScript é a linguagem padrão. Não há necessidade de usá-lo.

Comentários antes e depois dos scripts.
: Em livros e guias realmente antigos, você pode encontrar comentários dentro de tags `<script>`, assim:

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

    Esse truque não é usado no JavaScript moderno. Esses comentários esconderam código JavaScript de navegadores antigos que não sabiam como processar a tag `<script>`. Como os navegadores lançados nos últimos 15 anos não têm esse problema, esse tipo de comentário pode ajudá-lo a identificar códigos realmente antigos.


## Scripts externos

Se tivermos muito código JavaScript, podemos colocá-lo em um arquivo separado.

Os arquivos de script são anexados ao HTML com o atributo `src`:

```html
<script src="/path/to/script.js"></script>
```

Aqui, `/path/to/script.js` é um caminho absoluto para o arquivo script (da raiz do site).

Você também pode fornecer um caminho relativo a partir da página atual. Por exemplo, `src="script.js"` significaria um arquivo `"script.js"` na pasta atual.

Nós também podemos dar uma URL completa. Por exemplo:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js"></script>
```

Para anexar vários scripts, use múltiplas tags:

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
Como regra, apenas os scripts mais simples são colocados em HTML. Os mais complexos residem em arquivos separados.

O benefício de um arquivo separado é que o navegador irá baixá-lo e armazená-lo em seu [cache] (https://pt.wikipedia.org/wiki/Web_cache).

Outras páginas que referenciam o mesmo script o tirarão do cache ao invés de baixá-lo, então o arquivo é baixado apenas uma vez.

Isso reduz o tráfego e torna as páginas mais rápidas.

```

````warn header="Se `src` estiver definido, o conteúdo do script é ignorado."
Uma única tag `<script>` não pode ter tanto o atributo `src` quanto o código dentro dela.

Isso não vai funcionar:

```html
<script *!*src*/!*="file.js">
  alert(1); // o conteúdo é ignorado, porque o src está definido
</script>
```

Devemos escolher um `<script src="...">` ou um `<script>` com código.

O exemplo acima pode ser dividido em dois scripts para funcionar:

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```

## Resumo

- Podemos usar uma tag `<script>` para adicionar código JavaScript a uma página.
- Os atributos `type` e `language` não são necessários.
- Um script em um arquivo externo pode ser inserido com `<script src="path/to/script.js"></script>`.


Há muito mais a aprender sobre os scripts dos navegadores e sua interação com a página. Mas vamos ter em mente que esta parte do tutorial é dedicada à linguagem JavaScript, então não devemos nos distrair com implementações específicas de navegadores. Estaremos usando o navegador como uma maneira de rodar JavaScript, que é muito conveniente para leitura online, mas apenas um de muitos.
