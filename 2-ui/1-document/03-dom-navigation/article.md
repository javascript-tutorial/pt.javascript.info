libs:
  - d3
  - domtree

---


# Percorrendo o DOM

O DOM nos permite fazer qualquer coisa com elementos e seu conteúdo, mas primeiro precisamos alcançar o objeto DOM correspondente.

Todas as operações no DOM começam com o objeto `document`. Esse é o principal "ponto de entrada" para o DOM. A partir dele, podemos acessar qualquer nó.

Aqui está uma imagem das interligações que permitem navegar entre os nós do DOM:

![](dom-links.svg)

Vamos abordar em mais detalhes.

## Na parte superior: documentElement e body

Os nós mais acima na árvore do DOM estão disponíveis diretamente como propriedades de `document`:

`<html>` = `document.documentElement`
: O mais alto nó de document é `document.documentElement`. Este é o nó do elemento `<html>`.

`<body>` = `document.body`
: Outro nó amplamente utilizado é o elemento `<body>` -- `document.body`.

`<head>` = `document.head`
: O elemento `<head>` está acessível como `document.head`.

````warn header="Há um problema: `document.body` pode ser `null`"
No momento da execução, um script não pode acessar um elemento que ainda não existe.

Em particular, se um script estiver dentro de `<head>`, então `document.body` estará indisponível, porquê o navegador ainda não o encontrou.

Portanto, no exemplo abaixo, o primeiro `alert` apresentará ` null`:

```html run
<html>

<head>
  <script>
*!*
    alert( "a partir de HEAD: " + document.body ); // null! Ainda não há <body>
*/!*
  </script>
</head>

<body>

  <script>
    alert( "a partir de BODY: " + document.body ); // HTMLBodyElement! Agora existe
  </script>

</body>
</html>
```
````

```smart header="No DOM, `null` significa \"não existe\""
No DOM, o valor `null` significa "não existe" ou "nenhum nó".
```

## Filhos: childNodes, firstChild, lastChild

Existem dois termos que usaremos a partir de agora:

- **Nós filhos** -- elementos que são filhos diretos. Em outras palavras, eles estão exatamente aninhados no elemento pai. Por exemplo, `<head>` e `<body>` são filhos do elemento `<html>`.
- **Descendentes** -- todos os elementos aninhados em um determinado elemento, incluindo filhos, netos, bisnetos e assim por diante.

Por exemplo, aqui `<body>` tem `<div>` e `<ul>` como filhos (e alguns nós de texto em branco):

```html run
<html>
<body>
  <div>Começo</div>

  <ul>
    <li>
      <b>Informação</b>
    </li>
  </ul>
</body>
</html>
```

...E se pedirmos todos os descendentes de `<body>`, obteremos os filhos diretos `<div>`, `<ul>` e também mais elementos aninhados como `<li>` (sendo filho de `<ul>`) e `<b>` (sendo filho de `<li>`) -- a subárvore toda.

**A coleção `childNodes` fornece acesso a todos os nós filhos, incluindo nós de textos.**

O exemplo abaixo mostra os filhos de `document.body`:

```html run
<html>
<body>
  <div>Início</div>

  <ul>
    <li>Informação</li>
  </ul>

  <div>Fim</div>

  <script>
*!*
    for (let i = 0; i < document.body.childNodes.length; i++) {
      alert( document.body.childNodes[i] ); // text, div, text, ul, ..., SCRIPT
    }
*/!*
  </script>
  ...mais coisas...
</body>
</html>
```

Observe um detalhe interessante aqui. Se executarmos o exemplo acima, o último elemento mostrado é `<script>`. De fato, o documento tem mais informações abaixo, mas no momento da execução do script o navegador ainda não leu os elementos posteriores, portanto o script não os vê.

**As propriedades `firstChild` e `lastChild` fornecem acesso rápido ao primeiro e ao último filho.**

São apenas abreviações. Se houver nós filhos, o seguinte sempre será verdadeiro:
```js
elem.childNodes[0] === elem.firstChild
elem.childNodes[elem.childNodes.length - 1] === elem.lastChild
```

A função `elem.hasChildNodes()` verifica se há algum nó filho.

### Coleções DOM

Como podemos ver, `childNodes` se parece com uma array. Mas, na verdade, não é uma array, mas sim uma *coleção* -- um objeto iterável semelhante a uma array.

Há duas implicações importantes:

1. Podemos usar `for..of` para iterar sobre:
  ```js
  for (let node of document.body.childNodes) {
    alert(node); // mostra todos os nós da coleção
  }
  ```
  Isso ocorre porque é iterável (fornece a propriedade `Symbol.iterator`, quando necessário).

2. Métodos de array não funcionam, porque não é uma array:
  ```js run
  alert(document.body.childNodes.filter); // undefined (não possui o método filter!)
  ```

A primeira implicação é boa. A segunda é tolerável, porque podemos usar `Array.from` para criar uma array "real" a partir da coleção, se quisermos métodos de array:

  ```js run
  alert( Array.from(document.body.childNodes).filter ); // function
  ```

```warn header="Coleções DOM são somente leitura"
Coleções DOM e muito mais -- *todas* as propriedades de navegação listadas neste capítulo são somente leitura.

Não podemos substituir um filho através de uma atribuição: `childNodes[i] = ...`.

São necessários outros métodos para alterar o DOM. Veremos no próximo capítulo.
```

```warn header="Coleções DOM estão ativas"
Quase todas as coleções DOM, com pequenas exceções, são *ativas*. Em outras palavras, elas refletem o estado atual do DOM.

Se mantivermos uma referência ao `elem.childNodes` e adicionarmos nós no DOM, eles aparecerão automaticamente na coleção.
```

````warn header="Não use `for..in` para iterar coleções"
As coleções são iteráveis usando `for..of`. Às vezes as pessoas tentam usar `for..in` para isso.

Por favor, não! O loop `for..in` itera sobre todas as propriedades enumeráveis. E as coleções têm algumas propriedades "extras" raramente usadas que, geralmente, não queremos obter:

```html run
<body>
<script>
  // mostra: 0, 1, length, item, values...
  for (let prop in document.body.childNodes) alert(prop);
</script>
</body>
````

## Irmãos e pais

*Irmãos* são nós filhos do mesmo pai. Por exemplo, `<head>` e `<body>` são irmãos:

- É dito que `<body>` é o irmão "próximo" ou "à direita" de `<head>`,
- É dito que `<head>` é o irmão "anterior" ou "à esquerda" de `<body>`.

O pai está acessível como `parentNode`.

O próximo nó (próximo irmão) no mesmo pai é `nextSibling`, e o anterior é `previousSibling`.

Por exemplo:

```html run
<html><head></head><body><script>
  // O HTML é "burro" para evitar nós de textos "em branco".

  // o pai de <body> é <html>
  alert( document.body.parentNode === document.documentElement ); // true

  // depois de <head> vem <body>
  alert( document.head.nextSibling ); // HTMLBodyElement

  // antes de <body> vem <head>
  alert( document.body.previousSibling ); // HTMLHeadElement
</script></body></html>
```

## Navegação apenas por elementos

As propriedades de navegação listadas acima se referem a *todos* os nós. Por exemplo, em `childNodes`, podemos ver nós de textos, nós de elementos e até nós de comentários, se existirem.

Mas, para muitas tarefas, não queremos nós de textos ou comentários. Queremos manipular nós de elementos que formam a estrutura da página.

Então, vamos ver mais interligações de navegação que consideram apenas *nós de elementos*:

![](dom-links-elements.svg)

As interligações são semelhantes às apresentadas acima, acrescentando apenas a palavra `Element`:

- `children` -- somente os nós que são filhos do elemento.
- `firstElementChild`, `lastElementChild` -- primeiro e último elemento filho.
- `previousElementSibling`, `nextElementSibling` -- elementos vizinhos.
- `parentElement` -- elemento pai.

````smart header="Por que `parentElement`? O pai *não* pode ser um elemento?"
A propriedade `parentElement` retorna o "elemento" pai, enquanto `parentNode` retorna "qualquer nó" pai. Essas propriedades geralmente são as mesmas: ambas obtêm o pai.

Com exceção do `document.documentElement`:

```js run
alert( document.documentElement.parentNode ); // document
alert( document.documentElement.parentElement ); // null
```

Em outras palavras, o `documentElement` (`<html>`) é o nó raiz. Formalmente, tem `document` como pai. Mas o `document` não é um nó de elemento, portanto, somente `parentNode` o retorna. `parentElement` não.

Este laço de repetição percorre de um elemento arbitrário `elem` até `<html>`, mas não até o `document`:
```js
while(elem = elem.parentElement) {
  alert( elem ); // sequência de pais até <html>
}
```
````

Vamos modificar um dos exemplos acima: substitua `childNodes` por `children`. Agora ele mostra apenas elementos:

```html run
<html>
<body>
  <div>Início</div>

  <ul>
    <li>Informação</li>
  </ul>

  <div>Fim</div>

  <script>
*!*
    for (let elem of document.body.children) {
      alert(elem); // div, ul, div, SCRIPT
    }
*/!*
  </script>
  ...
</body>
</html>
```

## Mais interligações: tabelas [#dom-navigation-tables]

Até agora, descrevemos as propriedades básicas de navegação.

Certos tipos de elementos DOM podem fornecer propriedades adicionais, específicas ao seu tipo, por conveniência.

As tabelas são um ótimo exemplo e um importante caso particular disso.

O elemento **`<table>`** suporta, além do explicado anteriormente, estas propriedades:
- `table.rows` -- a coleção de elementos `<tr>` da tabela.
- `table.caption/tHead/tFoot` -- referências aos elementos `<caption>`, `<thead>`, `<tfoot>`.
- `table.tBodies` -- a coleção de elementos `<tbody>` (pode haver muitos, de acordo com o padrão normatizador).

**`<thead>`, `<tfoot>`, `<tbody>`** elementos que fornecem a propriedade `rows`:
- `tbody.rows` -- a coleção de `<tr>` internas.

**`<tr>`:**
- `tr.cells` -- a coleção de células `<td>` e `<th>` dentro do `<tr>` referido.
- `tr.sectionRowIndex` -- a posição (índice) do referido `<tr>` dentro de `<thead> / <tbody> / <tfoot>`.
- `tr.rowIndex` -- a posição da `<tr>` na tabela como um todo (incluindo todas as linhas da tabela).

**`<td>` e `<th>`:**
- `td.cellIndex` -- a posição da célula dentro do `<tr>`.

Um exemplo de uso:

```html run height=100
<table id="table">
  <tr>
    <td>um</td><td>dois</td>
  </tr>
  <tr>
    <td>três</td><td>quatro</td>
  </tr>
</table>

<script>
  // obter o conteúdo da primeira linha, segunda célula
  alert( table.*!*rows[0].cells[1]*/!*.innerHTML ) // "dois"
</script>
```

A especificação: [Informações sobre as tabelas](https://html.spec.whatwg.org/multipage/tables.html).

Também há propriedades de navegação adicionais para formulários HTML. Veremos quando começarmos a trabalhar com formulários.

# Resumo

Quando nos referimos a um nó DOM, podemos ir para seus vizinhos diretos usando propriedades de navegação.

Existem dois conjuntos principais:

- Para todos os nós: `parentNode`, `childNodes`, `firstChild`, `lastChild`, `previousSibling`, `nextSibling`.
- Apenas para nós de elementos: `parentElement`, `children`, `firstElementChild`, `lastElementChild`, `previousElementSibling`, `nextElementSibling`.

Alguns tipos de elementos DOM, por exemplo tabelas, fornecem propriedades e coleções adicionais para acessar seu conteúdo.
