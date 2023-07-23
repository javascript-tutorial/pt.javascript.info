# Atributos e propriedades

Quando navegador carrega a página, ele "lê" (outra palavra: "analisa") o HTML e gera objetos DOM a partir dela. Para nós de elementos, a maior parte dos atributos HTML padrão automaticamente se tornam propriedades de objetos DOM.

Por exemplo, se a tag é `<body id="page">`, então o objeto DOM tem `body.id="page"`.

Mas o mapeamento atributo-propriedade não é de um para um! Nesse capítulo vamos prestar atenção em separar essas duas noções, entender como trabalhar com eles, quando eles são os mesmos e quando eles são diferentes.

## Propriedades DOM

Nós já vimos propriedades DOM incorporadas. Há várias. Mas tecnicamente ninguém nos limita, e se não há propriedades suficientes, nós podemos adicionar nossas próprias. 

Nós DOM são objetos JavaScript. Nós podemos alterar eles.

Por exemplo, vamos criar uma propriedade nova em `document.body`:

```js run
document.body.myData = {
  name: 'Caesar',
  title: 'Imperador'
};

alert(document.body.myData.title); // Imperador
```

Nós podemos adicionar um método também:

```js run
document.body.sayTagName = function() {
  alert(this.tagName);
};

document.body.sayTagName(); // BODY (o valor de "this" no método é document.body)
```

Nós também podemos modificar prototypes incorporados como `Element.prototype` e adicionar novos métodos para todos elements:

```js run
Element.prototype.sayHi = function() {
  alert(`Olá, eu sou um ${this.tagName}`);
};

document.documentElement.sayHi(); // Olá, eu sou um HTML
document.body.sayHi(); // Olá, eu sou um BODY
```

Então, propriedades e métodos do DOM se comportam como qualquer objeto JavaScript:

- Podem ter qualquer valor.
- São sensíveis a letras maiúsculas e minúsculas (escreva `elem.nodeType`, não `elem.NoDeTyPe`).

## Atributos HTML

Em HTML, tags podem ter atributos. Quando o navegador analisa o HTML para criar objetos DOM para tags, ele reconhece atributos *padrões* e cria propriedades DOM para eles.

Então quando um elemento tem `id` ou outro atributo *padrão*, a propriedade correspontente é criada. Mas isso não acontece se o atributo não for padrão.

Por exemplo:
```html run
<body id="test" something="non-standard">
  <script>
    alert(document.body.id); // test
*!*
    // Atributo não padrão não resulta em uma propriedade
    alert(document.body.something); // undefined
*/!*
  </script>
</body>
```

Observe que um atributo padrão para um elemento pode ser desconhecido para outro elemento. Por exemplo, `"type"` é padrão para `<input>`([HTMLInputElement](https://html.spec.whatwg.org/#htmlinputelement)), mas não para `<body>` ([HTMLBodyElement](https://html.spec.whatwg.org/#htmlbodyelement)). Atributos padrão são descritos na especificação da classe correspondente ao elemento.

Aqui nós podemos ver:
```html run
<body id="body" type="...">
  <input id="input" type="text">
  <script>
    alert(input.type); // text
*!*
    alert(body.type); // undefined: DOM property not created, because it's non-standard
*/!*
  </script>
</body>
```

Então, se um atributo não é padrão, não há uma propriedade DOM para ele. Há alguma forma de acessar esses atributos?

Claro. Todos atributos são acessíveis usando os seguintes métodos:

- `elem.hasAttribute(name)` -- checa a existencia do valor.
- `elem.getAttribute(name)` -- obtém o valor.
- `elem.setAttribute(name, value)` -- define um valor.
- `elem.removeAttribute(name)` -- remove um atributo.

Esses métodos operam exatamente com o que está escrito no HTML.

É possível checar todos os atributos usando `elem.attributes`: uma coleção de objetos que pertence à classe incorporada [Attr](https://dom.spec.whatwg.org/#attr), com as propriedades `name` e `value`.

Aqui está uma demonstração da leitura de uma propriedade não padrão:

```html run
<body something="non-standard">
  <script>
*!*
    alert(document.body.getAttribute('something')); // non-standard
*/!*
  </script>
</body>
```

Atributos HTML tem as seguintes características:

- Seus nomes são insensíveis à caixa alta ou baixa (`id` é o mesmo que `ID`).
- Seus valores são sempre strings.

Aqui está uma demonstração estendida de como trabalhar com atributos:

```html run
<body>
  <div id="elem" about="Elephant"></div>

  <script>
    alert( elem.getAttribute('About') ); // (1) 'Elephant', lendo

    elem.setAttribute('Test', 123); // (2), definindo

    alert( elem.outerHTML ); // (3), checar se o atributo está no HTML(sim)

    for (let attr of elem.attributes) { // (4) lista todos
      alert( `${attr.name} = ${attr.value}` );
    }
  </script>
</body>
```

Observe:

1. `getAttribute('About')` -- a primeira letra aqui está em maiúsculo, e no HTML está totalmente em minúsculo. Mas isso não importa: nomes de atributos são insensíveis à caixa alta ou baixa.
2. Nós podemos assinalar qualquer coisa a um atributo, mas se tornará uma string. Então aqui temos `"123"` como o valor.
3. Todos os atributos, incluindo os que estão definidos, são visíveis no `outerHTML`.
4. A coleção `attributes` é iterável e tem todos os atributos do elemento (padrões e não padrões) como objetos com propriedades `name` e `value`. 

## Sincronização entre propriedade e atributo 

Quando um campo padrão muda, a propriedade correspondente é automaticamente atualizada, e (com algumas exceções) vice-versa.

No exemplo abaixo `id` é modificado como um atributo, e nós podemos ver a propriedade mudada também. E o oposto também ocorre:
In the example below `id` is modified as an attribute, and we can see the property changed too. And then the same backwards:

```html run
<input>

<script>
  let input = document.querySelector('input');

  // atributo => propriedade
  input.setAttribute('id', 'id');
  alert(input.id); // id (atualizado)

  // propriedade => atributo
  input.id = 'newId';
  alert(input.getAttribute('id')); // newId (atualizado)
</script>
```

Mas há algumas exceções, por exemplo, `input.value` sincroniza a partir de atributo -> propriedade, mas o contrário não ocorre:

```html run
<input>

<script>
  let input = document.querySelector('input');

  // atributo => propriedade
  input.setAttribute('value', 'text');
  alert(input.value); // text

*!*
  // NÃO propriedade => atributo
  input.value = 'newValue';
  alert(input.getAttribute('value')); // text (não atualizado!)
*/!*
</script>
```

No exemplo acima:
- Mudando o atributo `value` atualiza a propriedade.
- Mas a mudança da propriedade não afeta o atributo.

Essa "característica", na verdade, pode ser útil, porque as ações do usuário podem fazer com que `value` mude, então se quisermos recuperar o valor "original" do HTML, está no atributo.

## Propriedades DOM são tipadas

Propriedades DOM nem sempre são strings. Por exemplo, a propriedade `input.checked` (para caixas de seleção) é um booleano: 

```html run
<input id="input" type="checkbox" checked> checkbox

<script>
  alert(input.getAttribute('checked')); // o valor do atributo é: uma string vazia
  alert(input.checked); // o valor da propriedade é: true
</script>
```

Há outros exemplos. O campo `style` é uma string, mas a propriedade `style` é um objeto: 

```html run
<div id="div" style="color:red;font-size:120%">Hello</div>

<script>
  // string
  alert(div.getAttribute('style')); // color:red;font-size:120%

  // object
  alert(div.style); // [object CSSStyleDeclaration]
  alert(div.style.color); // red
</script>
```

No entanto, a maioria das propriedades são strings.

Raramente, mesmo que o tipo de uma propriedade DOM seja uma string, ela pode diferir do atributo em si. Por exemplo, a propriedade `href` é sempre uma URL *completa*, mesmo que o atributo contenha uma URL relativa ou apenas um `#hash`.

Aqui há um exemplo:

```html height=30 run
<a id="a" href="#hello">link</a>
<script>
  // atributo
  alert(a.getAttribute('href')); // #hello

  // propriedade
  alert(a.href); // URL completa no formulário http://site.com/page#hello
</script>
```

Se precisarmos do valor de `href` ou qualquer outro atributo exatamente como escrito no HTML, podemos usar `getAttribute`.

## Atributos não padronizados, dataset

Quando escrevemos HTML, usamos vários atributos padrões. Mas e os atributos customizados, os não padrões? Primeiro, vamos ver se eles são úteis ou não? E para que servem?

As vezes, atributos não padronizados são úteis para passar dados customizados do HTML para o JavaScript, ou para "marcar" elementos HTML para o JavaScript.

Bem assim:

```html run
<!-- marca a div para mostra "name" aqui-->
<div *!*show-info="name"*/!*></div>
<!-- and age here -->
<div *!*show-info="age"*/!*></div>

<script>
  // o código encontra um elemento com a marca e mostra o que foi requisitado
  let user = {
    name: "Pete",
    age: 25
  };

  for(let div of document.querySelectorAll('[show-info]')) {
    // insere a informação correspondente no campo
    let field = div.getAttribute('show-info');
    div.innerHTML = user[field]; // primeiro Pete em "name", então 25 em "age"
  }
</script>
```

Eles também podem ser usado para estilizar um elemento:

Por exemplo, para o estado do pedido, o atributo `order-state` é utilizado:

```html run
<style>
  /* Estilo depende do atributo customizado "order-state" */
  .order[order-state="new"] {
    color: green;
  }

  .order[order-state="pending"] {
    color: blue;
  }

  .order[order-state="canceled"] {
    color: red;
  }
</style>

<div class="order" order-state="new">
  Um pedido novo.
</div>

<div class="order" order-state="pending">
  Um pedido pendente.
</div>

<div class="order" order-state="canceled">
  Um pedido cancelado.
</div>
```

Porque é preferível usar um atributo do que ter classes como `.order-state-new`, `.order-state-pendeing`, `.order-state-canceled`?

Porque um atributo é mais conveniente de se gerenciar. O estado pode ser mudado tão facilmente quanto:

```js
// um pouco mais simples que remover classes antigas/adicionar classes novas.
div.setAttribute('order-state', 'canceled');
```

Mas podem haver possíveis problemas com atributos customizados. O que acontece se usarmos um atributos não padronizado e depois ele é introduzido como um padrão funcional? A linguagem HTML é viva e está crescendo, e mais atributos aparecem para atender as necessidades dos desenvolvedores. Isso pode causar efeitos inesperados em tais casos.

Para evitar tais conflitos, existem os atributos [data-*](https://html.spec.whatwg.org/#embedding-custom-non-visible-data-with-the-data-*-attributes).

**Todos os atributos começando com "data-" são reservados para programadores usarem. Eles estão disponíveis na propriedade `dataset`.

Por exemplo, se um `elem` tiver um atributo chamado `"data-about"`, estará disponível em `elem.dataset.about`. 
For instance, if an `elem` has an attribute named `"data-about"`, it's available as `elem.dataset.about`.

Bem assim:

```html run
<body data-about="Elephants">
<script>
  alert(document.body.dataset.about); // Elephants
</script>
```

Atributos com várias palavras como `data-order-state` são definidas em camel case: `dataset.orderState`.

Aqui vai um exemplo "estado do pedido" reescrito:

```html run
<style>
  .order[data-order-state="new"] {
    color: green;
  }

  .order[data-order-state="pending"] {
    color: blue;
  }

  .order[data-order-state="canceled"] {
    color: red;
  }
</style>

<div id="order" class="order" data-order-state="new">
  Um novo pedido.
</div>

<script>
  // leitura
  alert(order.dataset.orderState); // new

  // modificação
  order.dataset.orderState = "pending"; // (*)
</script>
```

Usar atributos `data-*` é uma forma válida e segura de passar dados customizados.

Observe que estamos não limitados ler, como bem podemos também modificar os dados. Então o CSS atualiza o visual de acordo: no exemplo acima, a última linha `(*)` muda a cor para azul.

## Summary

- Atributos -- é o que está escrito no HTML.
- Propriedades -- é o que está escrito nos objetos DOM.

Uma pequena comparação:

|      | Propriedades                                                                     | Atributos                                                            |
|------|----------------------------------------------------------------------------------|----------------------------------------------------------------------|
| Tipo | Qualquer valor, propriedades padronizadas tem o tipo descrito nas especificações | Uma string                                                           |
| Nome | Nome é sensível a caixa alta ou baixa.                                           | Nome não é sensívels a caixa alta ou baixa|

Métodos para trabalhar com atributos são:

- `elem.hasAttribute(name)` -- para checar a existência.
- `elem.getAttribute(name)` -- para obter o valor.
- `elem.setAttribute(name, value)` -- para definir o valor.
- `elem.removeAttribute(name)` -- para remover o atributo.
- `elem.attributes` é a coleção com todos os atributos.

Para a maioria das situações, usar propriedades DOM tem preferência. Nós devemos nos referir a atributos apenas quando propriedades DOM não são cabíveis, quando precisamos de atributos exatos, por exemplo:

- Quando precisamos de atributos não padronizados. Mas se começar com `data-`, então devemos usar `dataset`. 
- Quando precisamos ler o valor "a risca" no HTML. O valor da propriedade DOM pode ser diferente, por exemplo, o `href` é sempre uma URL completa, e nós talvez queremos o valor "original". 
