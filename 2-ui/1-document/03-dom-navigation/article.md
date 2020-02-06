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

  // antes de <head> vem <body>
  alert( document.body.previousSibling ); // HTMLHeadElement
</script></body></html>
```

## Element-only navigation

Navigation properties listed above refer to *all* nodes. For instance, in `childNodes` we can see both text nodes, element nodes, and even comment nodes if there exist.

But for many tasks we don't want text or comment nodes. We want to manipulate element nodes that represent tags and form the structure of the page.

So let's see more navigation links that only take *element nodes* into account:

![](dom-links-elements.svg)

The links are similar to those given above, just with `Element` word inside:

- `children` -- only those children that are element nodes.
- `firstElementChild`, `lastElementChild` -- first and last element children.
- `previousElementSibling`, `nextElementSibling` -- neighbour elements.
- `parentElement` -- parent element.

````smart header="Why `parentElement`? Can the parent be *not* an element?"
The `parentElement` property returns the "element" parent, while `parentNode` returns "any node" parent. These properties are usually the same: they both get the parent.

With the one exception of `document.documentElement`:

```js run
alert( document.documentElement.parentNode ); // document
alert( document.documentElement.parentElement ); // null
```

In other words, the `documentElement` (`<html>`) is the root node. Formally, it has `document` as its parent. But `document` is not an element node, so `parentNode` returns it and `parentElement` does not.

This loop travels up from an arbitrary element `elem` to `<html>`, but not to the `document`:
```js
while(elem = elem.parentElement) {
  alert( elem ); // parent chain till <html>
}
```
````

Let's modify one of the examples above: replace `childNodes` with `children`. Now it shows only elements:

```html run
<html>
<body>
  <div>Begin</div>

  <ul>
    <li>Information</li>
  </ul>

  <div>End</div>

  <script>
*!*
    for (let elem of document.body.children) {
      alert(elem); // DIV, UL, DIV, SCRIPT
    }
*/!*
  </script>
  ...
</body>
</html>
```

## More links: tables [#dom-navigation-tables]

Till now we described the basic navigation properties.

Certain types of DOM elements may provide additional properties, specific to their type, for convenience.

Tables are a great example and important particular case of that.

**The `<table>`** element supports (in addition to the given above) these properties:
- `table.rows` -- the collection of `<tr>` elements of the table.
- `table.caption/tHead/tFoot` -- references to elements `<caption>`, `<thead>`, `<tfoot>`.
- `table.tBodies` -- the collection of `<tbody>` elements (can be many according to the standard).

**`<thead>`, `<tfoot>`, `<tbody>`** elements provide the `rows` property:
- `tbody.rows` -- the collection of `<tr>` inside.

**`<tr>`:**
- `tr.cells` -- the collection of `<td>` and `<th>` cells inside the given `<tr>`.
- `tr.sectionRowIndex` -- the position (index) of the given `<tr>` inside the enclosing `<thead>/<tbody>/<tfoot>`.
- `tr.rowIndex` -- the number of the `<tr>` in the table as a whole (including all table rows).

**`<td>` and `<th>`:**
- `td.cellIndex` -- the number of the cell inside the enclosing `<tr>`.

An example of usage:

```html run height=100
<table id="table">
  <tr>
    <td>one</td><td>two</td>
  </tr>
  <tr>
    <td>three</td><td>four</td>
  </tr>
</table>

<script>
  // get the content of the first row, second cell
  alert( table.*!*rows[0].cells[1]*/!*.innerHTML ) // "two"
</script>
```

The specification: [tabular data](https://html.spec.whatwg.org/multipage/tables.html).

There are also additional navigation properties for HTML forms. We'll look at them later when we start working with forms.

# Summary

Given a DOM node, we can go to its immediate neighbours using navigation properties.

There are two main sets of them:

- For all nodes: `parentNode`, `childNodes`, `firstChild`, `lastChild`, `previousSibling`, `nextSibling`.
- For element nodes only: `parentElement`, `children`, `firstElementChild`, `lastElementChild`, `previousElementSibling`, `nextElementSibling`.

Some types of DOM elements, e.g. tables, provide additional properties and collections to access their content.
