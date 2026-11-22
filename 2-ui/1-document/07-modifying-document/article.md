# Modificando o documento

A modificação do DOM é a chave para criar páginas "vivas".

Aqui veremos como criar novos elementos "na hora" e modificar o conteúdo existente da página.

## Exemplo: mostrar uma mensagem

Vamos demonstrar usando um exemplo. Vamos adicionar uma mensagem na página que fique mais bonita do que `alert`.

Veja como vai ficar:

```html autorun height="80"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

*!*
<div class="alert">
  <strong>Olá!</strong> Você leu uma mensagem importante.
</div>
*/!*
```

Esse foi o exemplo em HTML. Agora vamos criar o mesmo `div` com JavaScript (assumindo que os estilos já estão no HTML/CSS).

## Criando um elemento

Para criar nós do DOM, existem dois métodos:

`document.createElement(tag)`
: Cria um novo *nó de elemento* com a tag dada:

    ```js
    let div = document.createElement('div');
    ```

`document.createTextNode(text)`
: Cria um novo *nó de texto* com o texto dado:

    ```js
    let textNode = document.createTextNode('Aqui estou');
    ```

Na maioria das vezes precisamos criar nós de elemento, como o `div` para a mensagem.

### Criando a mensagem

Criar o div da mensagem leva 3 passos:

```js
// 1. Cria o elemento <div>
let div = document.createElement('div');

// 2. Define sua classe como "alert"
div.className = "alert";

// 3. Preenche com o conteúdo
div.innerHTML = "<strong>Olá!</strong> Você leu uma mensagem importante.";
```

Criamos o elemento. Mas, por ora, ele só existe em uma variável chamada `div`, não está na página ainda. Então não podemos vê-lo.

## Métodos de inserção

Para fazer o `div` aparecer, precisamos inseri-lo em algum lugar dentro do `document`. Por exemplo, no elemento `<body>`, referenciado por `document.body`.

Há um método especial para isso, o `append`: `document.body.append(div)`.

Aqui está o código completo:

```html run height="80"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  let div = document.createElement('div');
  div.className = "alert";
  div.innerHTML = "<strong>Olá!</strong> Você leu uma mensagem importante.";

*!*
  document.body.append(div);
*/!*
</script>
```

Aqui chamamos `append` em `document.body`, mas podemos chamar o método `append` em qualquer outro elemento, para colocar outro elemento dentro dele. Por exemplo, podemos anexar algo a `<div>` chamando `div.append(outroElemento)`.

Aqui estão mais métodos de inserção, eles especificam diferentes lugares onde inserir:

- `node.append(...nós ou strings)` -- anexa nós ou strings *no final* de `node`,
- `node.prepend(...nós ou strings)` -- insere nós ou strings *no início* de `node`,
- `node.before(...nós ou strings)` –- insere nós ou strings *antes* de `node`,
- `node.after(...nós ou strings)` –- insere nós ou strings *depois* de `node`,
- `node.replaceWith(...nós ou strings)` –- substitui `node` pelos nós ou strings dados.

Os argumentos desses métodos são uma lista arbitrária de nós do DOM a inserir, ou strings de texto (que se tornam nós de texto automaticamente).

Vamos vê-los em ação.

Aqui está um exemplo de uso desses métodos para adicionar itens a uma lista e o texto antes/depois dela:

```html autorun
<ol id="ol">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>

<script>
  ol.before('before'); // insere a string "before" antes de <ol>
  ol.after('after'); // insere a string "after" depois de <ol>

  let liFirst = document.createElement('li');
  liFirst.innerHTML = 'prepend';
  ol.prepend(liFirst); // insere liFirst no início de <ol>

  let liLast = document.createElement('li');
  liLast.innerHTML = 'append';
  ol.append(liLast); // insere liLast no final de <ol>
</script>
```

Aqui está uma imagem visual do que esses métodos fazem:

![](before-prepend-append-after.svg)

Então a lista final será:

```html
before
<ol id="ol">
  <li>prepend</li>
  <li>0</li>
  <li>1</li>
  <li>2</li>
  <li>append</li>
</ol>
after
```

Como dito, esses métodos podem inserir múltiplos nós e pedaços de texto em uma única chamada.

Por exemplo, aqui uma string e um elemento são inseridos:

```html run
<div id="div"></div>
<script>
  div.before('<p>Olá</p>', document.createElement('hr'));
</script>
```

Note: o texto é inserido "como texto", não "como HTML", com o escape adequado de caracteres como `<`, `>`.

Então o HTML final é:

```html run
*!*
&lt;p&gt;Olá&lt;/p&gt;
*/!*
<hr>
<div id="div"></div>
```

Em outras palavras, strings são inseridas de forma segura, assim como `elem.textContent` faz.

Então, esses métodos só podem ser usados para inserir nós do DOM ou pedaços de texto.

Mas e se quisermos inserir uma string HTML "como html", com todas as tags e tudo funcionando, da mesma forma que `elem.innerHTML` faz?

## insertAdjacentHTML/Text/Element

Para isso podemos usar outro método bem versátil: `elem.insertAdjacentHTML(where, html)`.

O primeiro parâmetro é uma palavra-código, especificando onde inserir em relação a `elem`. Deve ser uma das seguintes:

- `"beforebegin"` -- insere `html` imediatamente antes de `elem`,
- `"afterbegin"` -- insere `html` dentro de `elem`, no início,
- `"beforeend"` -- insere `html` dentro de `elem`, no final,
- `"afterend"` -- insere `html` imediatamente depois de `elem`.

O segundo parâmetro é uma string HTML, que é inserida "como HTML".

Por exemplo:

```html run
<div id="div"></div>
<script>
  div.insertAdjacentHTML('beforebegin', '<p>Olá</p>');
  div.insertAdjacentHTML('afterend', '<p>Tchau</p>');
</script>
```

...Levaria a:

```html run
<p>Olá</p>
<div id="div"></div>
<p>Tchau</p>
```

É assim que podemos anexar HTML arbitrário à página.

Aqui está a imagem das variantes de inserção:

![](insert-adjacent.svg)

Podemos notar facilmente as semelhanças entre esta imagem e a anterior. Os pontos de inserção são, na verdade, os mesmos, mas este método insere HTML.

O método tem dois irmãos:

- `elem.insertAdjacentText(where, text)` -- a mesma sintaxe, mas uma string de `text` é inserida "como texto" em vez de HTML,
- `elem.insertAdjacentElement(where, elem)` -- a mesma sintaxe, mas insere um elemento.

Eles existem principalmente para tornar a sintaxe "uniforme". Na prática, apenas `insertAdjacentHTML` é usado na maioria das vezes. Porque, para elementos e texto, temos os métodos `append/prepend/before/after` -- eles são mais curtos de escrever e podem inserir nós/pedaços de texto.

Então aqui está uma variante alternativa de mostrar uma mensagem:

```html run
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  document.body.insertAdjacentHTML("afterbegin", `<div class="alert">
    <strong>Olá!</strong> Você leu uma mensagem importante.
  </div>`);
</script>
```

## Remoção de nó

Para remover um nó, existe um método `node.remove()`.

Vamos fazer nossa mensagem desaparecer depois de um segundo:

```html run untrusted
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  let div = document.createElement('div');
  div.className = "alert";
  div.innerHTML = "<strong>Olá!</strong> Você leu uma mensagem importante.";

  document.body.append(div);
*!*
  setTimeout(() => div.remove(), 1000);
*/!*
</script>
```

Note: se quisermos *mover* um elemento para outro lugar -- não há necessidade de removê-lo do lugar antigo.

**Todos os métodos de inserção removem o nó do lugar antigo automaticamente.**

Por exemplo, vamos trocar elementos de lugar:

```html run height=50
<div id="first">First</div>
<div id="second">Second</div>
<script>
  // não há necessidade de chamar remove
  second.after(first); // pega #second e insere #first depois dele
</script>
```

## Clonando nós: cloneNode

Como inserir mais uma mensagem semelhante?

Poderíamos criar uma função e colocar o código lá. Mas o jeito alternativo seria *clonar* o `div` existente e modificar o texto dentro dele (se necessário).

Às vezes, quando temos um elemento grande, isso pode ser mais rápido e simples.

- A chamada `elem.cloneNode(true)` cria um clone "profundo" do elemento -- com todos os atributos e subelementos. Se chamarmos `elem.cloneNode(false)`, então o clone é feito sem os elementos filhos.

Um exemplo de cópia da mensagem:

```html run height="120"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<div class="alert" id="div">
  <strong>Olá!</strong> Você leu uma mensagem importante.
</div>

<script>
*!*
  let div2 = div.cloneNode(true); // clona a mensagem
  div2.querySelector('strong').innerHTML = 'Tchau!'; // muda o clone

  div.after(div2); // mostra o clone depois do div existente
*/!*
</script>
```

## DocumentFragment [#document-fragment]

`DocumentFragment` é um nó especial do DOM que serve como um invólucro para transportar listas de nós.

Podemos anexar outros nós a ele, mas quando o inserimos em algum lugar, então seu conteúdo é inserido em vez dele.

Por exemplo, `getListContent` abaixo gera um fragmento com itens `<li>`, que são inseridos depois em `<ul>`:

```html run
<ul id="ul"></ul>

<script>
function getListContent() {
  let fragment = new DocumentFragment();

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    fragment.append(li);
  }

  return fragment;
}

*!*
ul.append(getListContent()); // (*)
*/!*
</script>
```

Note que, na última linha `(*)`, anexamos um `DocumentFragment`, mas ele "se funde", então a estrutura resultante será:

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

`DocumentFragment` raramente é usado explicitamente. Por que anexar a um tipo especial de nó, se podemos retornar um array de nós em vez disso? Exemplo reescrito:

```html run
<ul id="ul"></ul>

<script>
function getListContent() {
  let result = [];

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    result.push(li);
  }

  return result;
}

*!*
ul.append(...getListContent()); // append + operador "..." = amigos!
*/!*
</script>
```

Mencionamos `DocumentFragment` principalmente porque existem alguns conceitos construídos sobre ele, como o elemento [template](info:template-element), que vamos abordar bem mais adiante.

## Métodos antigos de inserir/remover

[old]

Também existem métodos "antiquados" de manipulação do DOM, que existem por razões históricas.

Esses métodos vêm de tempos realmente antigos. Hoje em dia, não há motivo para usá-los, já que métodos modernos, como `append`, `prepend`, `before`, `after`, `remove`, `replaceWith`, são mais flexíveis.

A única razão pela qual listamos esses métodos aqui é que você pode encontrá-los em muitos scripts antigos:

`parentElem.appendChild(node)`
: Anexa `node` como o último filho de `parentElem`.

    O exemplo a seguir adiciona um novo `<li>` ao final de `<ol>`:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>

    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'Olá, mundo!';

      list.appendChild(newLi);
    </script>
    ```

`parentElem.insertBefore(node, nextSibling)`
: Insere `node` antes de `nextSibling` em `parentElem`.

    O código a seguir insere um novo item de lista antes do segundo `<li>`:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>
    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'Olá, mundo!';

    *!*
      list.insertBefore(newLi, list.children[1]);
    */!*
    </script>
    ```
    Para inserir `newLi` como o primeiro elemento, podemos fazer assim:

    ```js
    list.insertBefore(newLi, list.firstChild);
    ```

`parentElem.replaceChild(node, oldChild)`
: Substitui `oldChild` por `node` entre os filhos de `parentElem`.

`parentElem.removeChild(node)`
: Remove `node` de `parentElem` (assumindo que `node` é um de seus filhos).

    O exemplo a seguir remove o primeiro `<li>` de `<ol>`:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>

    <script>
      let li = list.firstElementChild;
      list.removeChild(li);
    </script>
    ```

Todos esses métodos retornam o nó inserido/removido. Em outras palavras, `parentElem.appendChild(node)` retorna `node`. Mas geralmente o valor retornado não é usado, apenas executamos o método.

## Uma palavra sobre "document.write"

Há mais um método bem antigo de adicionar algo a uma página web: `document.write`.

A sintaxe:

```html run
<p>Em algum lugar na página...</p>
*!*
<script>
  document.write('<b>Olá, vindo do JS</b>');
</script>
*/!*
<p>O fim</p>
```

A chamada a `document.write(html)` escreve o `html` na página "aqui e agora mesmo". A string `html` pode ser gerada dinamicamente, então é relativamente flexível. Podemos usar JavaScript para criar uma página web completa e escrevê-la.

O método vem de tempos em que não havia DOM, nem padrões... Tempos realmente antigos. Ele ainda existe, porque há scripts que o usam.

Em scripts modernos, raramente o vemos, por causa da seguinte limitação importante:

**A chamada a `document.write` só funciona enquanto a página está carregando.**

Se a chamarmos depois, o conteúdo existente do documento é apagado.

Por exemplo:

```html run
<p>Depois de um segundo o conteúdo desta página será substituído...</p>
*!*
<script>
  // document.write depois de 1 segundo
  // isso é depois da página carregada, então apaga o conteúdo existente
  setTimeout(() => document.write('<b>...Por isto.</b>'), 1000);
</script>
*/!*
```

Então ele é praticamente inutilizável na fase "depois de carregado", diferente dos outros métodos do DOM que vimos acima.

Essa é a desvantagem.

Também há uma vantagem. Tecnicamente, quando `document.write` é chamado enquanto o navegador está lendo ("analisando") o HTML que chega, e ele escreve algo, o navegador o consome como se estivesse originalmente ali, no texto HTML.

Então funciona extremamente rápido, porque não há *nenhuma modificação do DOM* envolvida. Ele escreve diretamente no texto da página, enquanto o DOM ainda não foi construído.

Então, se precisarmos adicionar muito texto ao HTML dinamicamente, e estivermos na fase de carregamento da página, e a velocidade importar, isso pode ajudar. Mas, na prática, esses requisitos raramente se juntam. E geralmente vemos esse método em scripts só porque eles são antigos.

## Resumo

- Métodos para criar novos nós:
    - `document.createElement(tag)` -- cria um elemento com a tag dada,
    - `document.createTextNode(value)` -- cria um nó de texto (raramente usado),
    - `elem.cloneNode(deep)` -- clona o elemento, se `deep==true` então com todos os descendentes.  

- Inserção e remoção:
    - `node.append(...nós ou strings)` -- insere em `node`, no final,
    - `node.prepend(...nós ou strings)` -- insere em `node`, no início,
    - `node.before(...nós ou strings)` –- insere logo antes de `node`,
    - `node.after(...nós ou strings)` –- insere logo depois de `node`,
    - `node.replaceWith(...nós ou strings)` –- substitui `node`.
    - `node.remove()` –- remove o `node`.

    Strings de texto são inseridas "como texto".

- Também existem métodos "antiquados":
    - `parent.appendChild(node)`
    - `parent.insertBefore(node, nextSibling)`
    - `parent.removeChild(node)`
    - `parent.replaceChild(newElem, node)`

    Todos esses métodos retornam `node`.

- Dado algum HTML em `html`, `elem.insertAdjacentHTML(where, html)` o insere dependendo do valor de `where`:
    - `"beforebegin"` -- insere `html` logo antes de `elem`,
    - `"afterbegin"` -- insere `html` dentro de `elem`, no início,
    - `"beforeend"` -- insere `html` dentro de `elem`, no final,
    - `"afterend"` -- insere `html` logo depois de `elem`.

    Também existem métodos semelhantes, `elem.insertAdjacentText` e `elem.insertAdjacentElement`, que inserem strings de texto e elementos, mas são raramente usados.

- Para anexar HTML à página antes que ela termine de carregar:
    - `document.write(html)`

    Depois que a página é carregada, essa chamada apaga o documento. Visto principalmente em scripts antigos.
