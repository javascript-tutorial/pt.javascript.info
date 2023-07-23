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

- `elem.hasAttribute(name)` -- checa a existencia.
- `elem.getAttribute(name)` -- obtém o valor.
- `elem.setAttribute(name, value)` -- defined um valor.
- `elem.removeAttribute(name)` -- remove o atributo.

These methods operate exactly with what's written in HTML.

Also one can read all attributes using `elem.attributes`: a collection of objects that belong to a built-in [Attr](https://dom.spec.whatwg.org/#attr) class, with `name` and `value` properties.

Here's a demo of reading a non-standard property:

```html run
<body something="non-standard">
  <script>
*!*
    alert(document.body.getAttribute('something')); // non-standard
*/!*
  </script>
</body>
```

HTML attributes have the following features:

- Their name is case-insensitive (`id` is same as `ID`).
- Their values are always strings.

Here's an extended demo of working with attributes:

```html run
<body>
  <div id="elem" about="Elephant"></div>

  <script>
    alert( elem.getAttribute('About') ); // (1) 'Elephant', reading

    elem.setAttribute('Test', 123); // (2), writing

    alert( elem.outerHTML ); // (3), see if the attribute is in HTML (yes)

    for (let attr of elem.attributes) { // (4) list all
      alert( `${attr.name} = ${attr.value}` );
    }
  </script>
</body>
```

Please note:

1. `getAttribute('About')` -- the first letter is uppercase here, and in HTML it's all lowercase. But that doesn't matter: attribute names are case-insensitive.
2. We can assign anything to an attribute, but it becomes a string. So here we have `"123"` as the value.
3. All attributes including ones that we set are visible in `outerHTML`.
4. The `attributes` collection is iterable and has all the attributes of the element (standard and non-standard) as objects with `name` and `value` properties.

## Property-attribute synchronization

When a standard attribute changes, the corresponding property is auto-updated, and (with some exceptions) vice versa.

In the example below `id` is modified as an attribute, and we can see the property changed too. And then the same backwards:

```html run
<input>

<script>
  let input = document.querySelector('input');

  // attribute => property
  input.setAttribute('id', 'id');
  alert(input.id); // id (updated)

  // property => attribute
  input.id = 'newId';
  alert(input.getAttribute('id')); // newId (updated)
</script>
```

But there are exclusions, for instance `input.value` synchronizes only from attribute -> property, but not back:

```html run
<input>

<script>
  let input = document.querySelector('input');

  // attribute => property
  input.setAttribute('value', 'text');
  alert(input.value); // text

*!*
  // NOT property => attribute
  input.value = 'newValue';
  alert(input.getAttribute('value')); // text (not updated!)
*/!*
</script>
```

In the example above:
- Changing the attribute `value` updates the property.
- But the property change does not affect the attribute.

That "feature" may actually come in handy, because the user actions may lead to `value` changes, and then after them, if we want to recover the "original" value from HTML, it's in the attribute.

## DOM properties are typed

DOM properties are not always strings. For instance, the `input.checked` property (for checkboxes) is a boolean:

```html run
<input id="input" type="checkbox" checked> checkbox

<script>
  alert(input.getAttribute('checked')); // the attribute value is: empty string
  alert(input.checked); // the property value is: true
</script>
```

There are other examples. The `style` attribute is a string, but the `style` property is an object:

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

Most properties are strings though.

Quite rarely, even if a DOM property type is a string, it may differ from the attribute. For instance, the `href` DOM property is always a *full* URL, even if the attribute contains a relative URL or just a `#hash`.

Here's an example:

```html height=30 run
<a id="a" href="#hello">link</a>
<script>
  // attribute
  alert(a.getAttribute('href')); // #hello

  // property
  alert(a.href ); // full URL in the form http://site.com/page#hello
</script>
```

If we need the value of `href` or any other attribute exactly as written in the HTML, we can use `getAttribute`.


## Non-standard attributes, dataset

When writing HTML, we use a lot of standard attributes. But what about non-standard, custom ones? First, let's see whether they are useful or not? What for?

Sometimes non-standard attributes are used to pass custom data from HTML to JavaScript, or to "mark" HTML-elements for JavaScript.

Like this:

```html run
<!-- mark the div to show "name" here -->
<div *!*show-info="name"*/!*></div>
<!-- and age here -->
<div *!*show-info="age"*/!*></div>

<script>
  // the code finds an element with the mark and shows what's requested
  let user = {
    name: "Pete",
    age: 25
  };

  for(let div of document.querySelectorAll('[show-info]')) {
    // insert the corresponding info into the field
    let field = div.getAttribute('show-info');
    div.innerHTML = user[field]; // first Pete into "name", then 25 into "age"
  }
</script>
```

Also they can be used to style an element.

For instance, here for the order state the attribute `order-state` is used:

```html run
<style>
  /* styles rely on the custom attribute "order-state" */
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
  A new order.
</div>

<div class="order" order-state="pending">
  A pending order.
</div>

<div class="order" order-state="canceled">
  A canceled order.
</div>
```

Why would using an attribute be preferable to having classes like `.order-state-new`, `.order-state-pending`, `.order-state-canceled`?

Because an attribute is more convenient to manage. The state can be changed as easy as:

```js
// a bit simpler than removing old/adding a new class
div.setAttribute('order-state', 'canceled');
```

But there may be a possible problem with custom attributes. What if we use a non-standard attribute for our purposes and later the standard introduces it and makes it do something? The HTML language is alive, it grows, and more attributes appear to suit the needs of developers. There may be unexpected effects in such case.

To avoid conflicts, there exist [data-*](https://html.spec.whatwg.org/#embedding-custom-non-visible-data-with-the-data-*-attributes) attributes.

**All attributes starting with "data-" are reserved for programmers' use. They are available in the `dataset` property.**

For instance, if an `elem` has an attribute named `"data-about"`, it's available as `elem.dataset.about`.

Like this:

```html run
<body data-about="Elephants">
<script>
  alert(document.body.dataset.about); // Elephants
</script>
```

Multiword attributes like `data-order-state` become camel-cased: `dataset.orderState`.

Here's a rewritten "order state" example:

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
  A new order.
</div>

<script>
  // read
  alert(order.dataset.orderState); // new

  // modify
  order.dataset.orderState = "pending"; // (*)
</script>
```

Using `data-*` attributes is a valid, safe way to pass custom data.

Please note that we can not only read, but also modify data-attributes. Then CSS updates the view accordingly: in the example above the last line `(*)` changes the color to blue.

## Summary

- Attributes -- is what's written in HTML.
- Properties -- is what's in DOM objects.

A small comparison:

|            | Properties | Attributes |
|------------|------------|------------|
|Type|Any value, standard properties have types described in the spec|A string|
|Name|Name is case-sensitive|Name is not case-sensitive|

Methods to work with attributes are:

- `elem.hasAttribute(name)` -- to check for existence.
- `elem.getAttribute(name)` -- to get the value.
- `elem.setAttribute(name, value)` -- to set the value.
- `elem.removeAttribute(name)` -- to remove the attribute.
- `elem.attributes` is a collection of all attributes.

For most situations using DOM properties is preferable. We should refer to attributes only when DOM properties do not suit us, when we need exactly attributes, for instance:

- We need a non-standard attribute. But if it starts with `data-`, then we should use `dataset`.
- We want to read the value "as written" in HTML. The value of the DOM property may be different, for instance the `href` property is always a full URL, and we may want to get the "original" value.
