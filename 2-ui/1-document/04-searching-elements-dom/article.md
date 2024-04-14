# Pesquisando: getElement*, querySelector*

As propriedades de navegação do DOM são ótimas quando os elementos estão próximos uns dos outros. E quando não estão? Como obter um elemento arbitrário da página?

Existem métodos adicionais de busca para isso.

## document.getElementById ou apenas id

Se um elemento tem o atributo `id`, podemos obter o elemento usando o método `document.getElementById(id)`, não importa onde ele esteja.

Por exemplo:

```html run
<div id="elem">
  <div id="elem-content">Elemento</div>
</div>

<script>
  // obtém o elemento
*!*
  let elem = document.getElementById('elem');
*/!*

  // torna o fundo vermelho
  elem.style.background = 'red';
</script>
```

Além disso, existe uma variável global nomeada por `id` que referencia o elemento:

```html run
<div id="*!*elem*/!*">
  <div id="*!*elem-content*/!*">Elemento</div>
</div>

<script>
  // elem é uma referência para o elemento do DOM com id="elem"
  elem.style.background = 'red';

  // id="elem-content" tem um hífen dentro, então não pode ser um nome de variável 
  // ...mas podemos acessá-lo usando colchetes: window['elem-content']
</script>
```
...A menos que declaremos uma variável JavaScript de mesmo nome, pois ela terá prioridade:
```html run untrusted height=0
<div id="elem"></div>

<script>
  let elem = 5; // agora elem é 5, não uma referência a <div id="elem">

  alert(elem); // 5
</script>
```

```warn header="Por favor, não use variáveis globais nomeadas com id para acessar elementos"
Esse comportamento é descrito [na especificação](https://html.spec.whatwg.org/multipage/window-object.html#named-access-on-the-window-object), mas é suportado principalmente por questões de compatibilidade.

O navegador tenta nos ajudar misturando os namespaces do JavaScript e do DOM. Isso é bom para scripts simples, inseridos diretamente no HTML, mas geralmente não é algo bom. Pode haver conflitos de nomes. Além disso, quando alguém lê o código JavaScript e não tem o HTML à vista, não é óbvio de onde a variável vem.

Aqui no tutorial, usamos `id` para referenciar diretamente um elemento para sermos breve, quando é óbvio de onde o elemento vem.

Na vida real, document.getElementById é o método preferido.
```

```smart header="O `id` deve ser único"
O `id` deve ser único. Pode haver apenas um elemento no documento com o `id` especificado.

Se houver múltiplos elementos com o mesmo `id`, então o comportamento dos métodos que o utilizam é imprevisível, por exemplo, `document.getElementById` pode retornar qualquer um desses elementos aleatoriamente. Portanto, atenha-se à regra e mantenha o `id` único.
```

```warn header="Somente `document.getElementById`, não `anyElem.getElementById`"
O método `getElementById` pode ser chamado apenas no objeto `document`. Ele procura pelo dado `id` em todo o documento.
```

## querySelectorAll [#querySelectorAll]

De longe, o método mais versátil, `elem.querySelectorAll(css)` retorna todos os elementos dentro de `elem` que correspondem ao seletor CSS fornecido.

Aqui procuramos por todos os elementos `<li>` que são os últimos filhos:

```html run
<ul>
  <li>The</li>
  <li>test</li>
</ul>
<ul>
  <li>has</li>
  <li>passed</li>
</ul>
<script>
*!*
  let elements = document.querySelectorAll('ul > li:last-child');
*/!*

  for (let elem of elements) {
    alert(elem.innerHTML); // "test", "passed"
  }
</script>
```

Este método é realmente poderoso, porque qualquer seletor CSS pode ser usado.

```smart header="Pode usar pseudo-classes também"
Pseudo-classes no seletor CSS como `:hover` e `:active` também são suportadas. Por exemplo, `document.querySelectorAll(':hover')` retornará a coleção com elementos que o ponteiro está sobre agora (em ordem de aninhamento, do mais externo `<html>` ao mais aninhado).```
## querySelector [#querySelector]

A chamada para `elem.querySelector(css)` retorna o primeiro elemento para o dado seletor CSS.

Em outras palavras, o resultado é o mesmo que `elem.querySelectorAll(css)[0]`, mas o último está procurando por *todos* os elementos e escolhendo um, enquanto `elem.querySelector` apenas procura por um. Então, é mais rápido e também mais curto para escrever.

## matches

Os métodos anteriores estavam procurando no DOM.

O método [elem.matches(css)](https://dom.spec.whatwg.org/#dom-element-matches) não procura por nada, apenas verifica se `elem` corresponde ao seletor CSS fornecido. Ele retorna `true` ou `false`.

O método é útil quando estamos iterando sobre elementos (como em um array ou algo do tipo) e tentando filtrar aqueles que nos interessam.

Por exemplo:

```html run
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
  // pode ser qualquer coleção em vez de document.body.children
  for (let elem of document.body.children) {
*!*
    if (elem.matches('a[href$="zip"]')) {
*/!*
      alert("A referência do arquivo: " + elem.href );
    }
  }
</script>
```

## closest

*Antecessores* de um elemento são: o pai, o pai do pai, seu pai e assim por diante. Os antecessores juntos formam a cadeia de pais do elemento até o topo.

O método `elem.closest(css)` procura pelo antecessor mais próximo que corresponda ao seletor CSS. O próprio `elem` também é incluído na busca.

Em outras palavras, o método `closest` sobe a partir do elemento e verifica cada um dos pais. Se ele corresponder ao seletor, então a busca para, e o antecessor é retornado.

Poe exemplo:

```html run
<h1>Conteúdo</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">Capítulo 1</li>
    <li class="chapter">Capítulo 2</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector('.chapter'); // LI

  alert(chapter.closest('.book')); // UL
  alert(chapter.closest('.contents')); // DIV

  alert(chapter.closest('h1')); // null (porque h1 não é um antecessor)
</script>
```

## getElementsBy*

Existem também outros métodos para procurar nós por uma tag, classe, etc.

Hoje, eles são história em sua maioria, já que `querySelector` é mais poderoso e mais curto de escrever.

Portanto, abordamos esses métodos principalmente para sermos abrangentes, embora ainda seja possível encontrá-los em scripts mais antigos.

- `elem.getElementsByTagName(tag)` procura por elementos com a tag fornecida e retorna a coleção deles. O parâmetro `tag` também pode ser um asterisco `"*"` para "qualquer tag".
- `elem.getElementsByClassName(className)` retorna elementos que têm a classe CSS dada.
- `document.getElementsByName(name)` retorna elementos com o atributo `name` dado, em todo o documento. Muito raramente usado.

Por exemplo:
```js
// obtém todos os divs no documento
let divs = document.getElementsByTagName('div');
```

Vamos encontrar todas as tags `input` dentro da tabela:

```html run height=50
<table id="table">
  <tr>
    <td>Sua idade:</td>

    <td>
      <label>
        <input type="radio" name="age" value="young" checked> menor que 18
      </label>
      <label>
        <input type="radio" name="age" value="mature"> de 18 a 50
      </label>
      <label>
        <input type="radio" name="age" value="senior"> mais de 60
      </label>
    </td>
  </tr>
</table>

<script>
*!*
  let inputs = table.getElementsByTagName('input');
*/!*

  for (let input of inputs) {
    alert( input.value + ': ' + input.checked );
  }
</script>
```

```warn header="Não esqueça da letra `\"s\"`!"
Desenvolvedores iniciantes às vezes esquecem a letra `"s"`. Ou seja, eles tentam chamar `getElementByTagName` em vez de <code>getElement<b>s</b>ByTagName</code>.

A letra `"s"` está ausente em `getElementById`, porque retorna um único elemento. Mas `getElementsByTagName` retorna uma coleção de elementos, então possui um `"s"`.
```

````warn header="Ele retorna uma coleção, não um elemento!"
Outro erro comum entre iniciantes é escrever:

```js
// não funciona
document.getElementsByTagName('input').value = 5;
```

Isso não vai funcionar, porque pega uma *coleção* de inputs e atribui o valor a ela em vez de aos elementos dentro dela.

Devemos ou iterar sobre a coleção ou obter um elemento pelo seu índice, e então atribuir, assim:

```js
// deve funcionar (se houver um input)
document.getElementsByTagName('input')[0].value = 5;
```
````

Procurando por elementos `.article`:

```html run height=50
<form name="my-form">
  <div class="article">Artigo</div>
  <div class="long article">Artigo longo</div>
</form>

<script>
  // encontra pelo nome do atributo
  let form = document.getElementsByName('my-form')[0];

  // encontra pela classe dentro do formulário
  let articles = form.getElementsByClassName('article');
  alert(articles.length); // 2, encontrou dois elementos com a classe "article"
</script>
```

## Coleções vivas

Todos os métodos "getElementsBy*" retornam uma coleção *viva*. Essas coleções sempre refletem o estado atual do documento e se "atualizam automaticamente" quando ele muda.

No exemplo abaixo, existem dois scripts.

1. O primeiro cria uma referência à coleção de `<div>`. Até o momento, seu tamanho é `1`.
2. O segundo script é executado após o navegador encontrar mais um `<div>`, então seu tamanho é `2`.

```html run
<div>Primeiro div</div>

<script>
  let divs = document.getElementsByTagName('div');
  alert(divs.length); // 1
</script>

<div>Segundo div</div>

<script>
*!*
  alert(divs.length); // 2
*/!*
</script>
```

Em contraste, `querySelectorAll` retorna uma coleção estática. É como um array fixo de elementos.

Se o usarmos em vez disso, então ambos os scripts vão produzir `1`:
```html run
<div>Primeiro div</div>

<script>
  let divs = document.querySelectorAll('div');
  alert(divs.length); // 1
</script>

<div>Segundo div</div>

<script>
*!*
  alert(divs.length); // 1
*/!*
</script>
```

Agora podemos ver facilmente a diferença. A coleção estática não aumentou após o aparecimento de um novo `div` no documento.

## Resumo

Existem 6 métodos principais para procurar nós no DOM:

<table>
<thead>
<tr>
<td>Método</td>
<td>Pesquisa por...</td>
<td>Pode chamar em um elemento?</td>
<td>Vivo?</td>
</tr>
</thead>
<tbody>
<tr>
<td><code>querySelector</code></td>
<td>seletor-CSS</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>querySelectorAll</code></td>
<td>seletor-CSS</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementById</code></td>
<td><code>id</code></td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementsByName</code></td>
<td><code>nome</code></td>
<td>-</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByTagName</code></td>
<td>tag ou <code>'*'</code></td>
<td>✔</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByClassName</code></td>
<td>classe</td>
<td>✔</td>
<td>✔</td>
</tr>
</tbody>
</table>


De longe os mais usados são `querySelector` e `querySelectorAll`, mas `getElement(s)By*` podem ser esporadicamente úteis ou encontrados em scripts antigos.

Além disso:

- Existe `elem.matches(css)` para verificar se `elem` corresponde ao seletor CSS fornecido.
- Existe `elem.closest(css)` para procurar pelo antecessor mais próximo que corresponda ao seletor CSS fornecido. O próprio `elem` também é verificado.

E vamos mencionar mais um método aqui para verificar a relação filho-pai, já que às vezes é útil:
- `elemA.contains(elemB)` retorna verdadeiro se `elemB` está dentro de `elemA` (um descendente de `elemA`) ou quando `elemA==elemB`.
