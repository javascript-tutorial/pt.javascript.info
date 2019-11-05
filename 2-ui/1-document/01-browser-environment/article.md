# Ambiente do Navegador, especificações

A linguagem JavaScript foi inicialmente criada para navegadores web. Desde então, tem evoluído e se tornado uma linguagem com muitos usuários e plataformas.

A plataforma pode ser um navegador, ou servidor web, ou uma máquina de lavar, ou outro *host*. Cada um deles fornece funcionalidades específicas da plataforma. Nas especificações JavaScript são conhecidas como *ambiente de hospedagem*.

Um ambente de hospedagem fornece objetos específicos de platarfoma e funções adicionais ao núcleo da linguagem. Navegadores web dão um significado para páginas de controle web. Node.js fornece aplicações server-side, e assim vai.

Aqui uma visão rápida do que temos quando JavaScript roda em um navegador web:

![](windowObjects.svg)

Existe um objeto "raiz" chamado `window`. Que tem  dois papeis:

1. Primeiro, existe um objeto global para o código JavaScript, como descrito no capítulo <info:global-object>.
2. Segundo, representa a "janela de navegação" e fornece métodos de controle.

Por instância, aqui nós usamos como objeto global:

```js run
function sayHi() {
  alert("Olá");
}

// funcoes globais sao acessiveis como propriedades da janela
window.sayHi();
```

E aqui nós usamos como janela de navegação, para ver a altura da janela:

```js run
alert(window.innerHeight); // altura da janela interna
```

Existem mais métodos específicos de janela e propriedades, vamos falar sobre eles mais tarde.

## Modelo de Objeto de Documento (DOM)

O `objeto de documento` da acesso ao conteúdo da página. Nós podemos mudar ou criar qualquer coisa na página usando-o.

Por instância:
```js run
// mudando a cor do fundo para vermelho
document.body.style.background = "red";

// mudando a cor de volta depois de 1 segundo
setTimeout(() => document.body.style.background = "", 1000);
```

Aqui nós usamos `document.body.style`, mas existe muito, muito mais. Propriedades e métodos são descritos na especificação. 
Pode aconter que dois grupos de trabalho que desenvolveram:

1. [W3C](https://pt.wikipedia.org/wiki/W3C) -- a documentação está em <https://www.w3c.br/>.
2. [WhatWG](https://pt.wikipedia.org/wiki/Web_Hypertext_Application_Technology_Working_Group), publicação em <https://dom.spec.whatwg.org>.

Como as vezes acontece, os dois grupos nem sempre entram em concordância, então é como se nós tivessemos dois conjuntos de padrões. Mas eles são muito parecidos e eventualmente as coisas são compatíveis. A documentação que você pode encontrar nos recursos dados é muito semelhante, com 99% de compatibilidade. Existem uma diferença pequena que você provavelmente não notaria.

Pessoalmente, eu acho <https://dom.spec.whatwg.org> mais prazeroso de usar.

Em um passado antigo, não existia nenhum tipo de padrão -- cada navegador implementava do jeito que queria. Diferentes navegadores tinham diferentes conjuntos, métodos, e propriedades para a mesma coisa, e desenvolvedores tinham que escrever códigos diferentes para cada um deles. Tempos negros e bagunçados.

Even now we can sometimes meet old code that uses browser-specific properties and works around incompatibilities. But, in this tutorial we'll use modern stuff: there's no need to learn old things until you really need to (chances are high that you won't).

Then the DOM standard appeared, in an attempt to bring everyone to an agreement. The first version was "DOM Level 1", then it was extended by DOM Level 2, then DOM Level 3, and now it's reached DOM Level 4. People from WhatWG group got tired of version numbers and are calling it just "DOM", without a number. So we'll do the same.

```smart header="DOM is not only for browsers"
The DOM specification explains the structure of a document and provides objects to manipulate it. There are non-browser instruments that use it too.

For instance, server-side tools that download HTML pages and process them use the DOM. They may support only a part of the specification though.
```

```smart header="CSSOM for styling"
CSS rules and stylesheets are not structured like HTML. There's a separate specification [CSSOM](https://www.w3.org/TR/cssom-1/) that explains how they are represented as objects, and how to read and write them.

CSSOM is used together with DOM when we modify style rules for the document. In practice though, CSSOM is rarely required, because usually CSS rules are static. We rarely need to add/remove CSS rules from JavaScript, so we won't cover it right now.
```

## BOM (part of HTML spec)

Browser Object Model (BOM) are additional objects provided by the browser (host environment) to work with everything except the document.

For instance:

- The [navigator](mdn:api/Window/navigator) object provides background information about the browser and the operating system. There are many properties, but the two most widely known are: `navigator.userAgent` -- about the current browser, and `navigator.platform` -- about the platform (can help to differ between Windows/Linux/Mac etc).
- The [location](mdn:api/Window/location) object allows us to read the current URL and can redirect the browser to a new one.

Here's how we can use the `location` object:

```js run
alert(location.href); // shows current URL
if (confirm("Go to wikipedia?")) {
  location.href = "https://wikipedia.org"; // redirect the browser to another URL
}
```

Functions `alert/confirm/prompt` are also a part of BOM: they are directly not related to the document, but represent pure browser methods of communicating with the user.

<<<<<<< HEAD

```smart header="HTML specification"
BOM is the part of the general [HTML specification](https://html.spec.whatwg.org).

Yes, you heard that right. The HTML spec at <https://html.spec.whatwg.org> is not only about the "HTML language" (tags, attributes), but also covers a bunch of objects, methods and browser-specific DOM extensions. That's "HTML in broad terms".
=======
```smart header="Specifications"
BOM is the part of the general [HTML specification](https://html.spec.whatwg.org).

Yes, you heard that right. The HTML spec at <https://html.spec.whatwg.org> is not only about the "HTML language" (tags, attributes), but also covers a bunch of objects, methods and browser-specific DOM extensions. That's "HTML in broad terms". Also, some parts have additional specs listed at <https://spec.whatwg.org>.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923
```

## Summary

Talking about standards, we have:

DOM specification
: Describes the document structure, manipulations and events, see <https://dom.spec.whatwg.org>.

CSSOM specification
: Describes stylesheets and style rules, manipulations with them and their binding to documents, see <https://www.w3.org/TR/cssom-1/>.

HTML specification
: Describes the HTML language (e.g. tags) and also the BOM (browser object model) -- various browser functions: `setTimeout`, `alert`, `location` and so on, see <https://html.spec.whatwg.org>. It takes the DOM specification and extends it with many additional properties and methods.

Now we'll get down to learning DOM, because the document plays the central role in the UI.

Please note the links above, as there's so much stuff to learn it's impossible to cover and remember everything.

When you'd like to read about a property or a method, the Mozilla manual at <https://developer.mozilla.org/en-US/search> is a nice resource, but reading the corresponding spec may be better: it's more complex and longer to read, but will make your fundamental knowledge sound and complete.
