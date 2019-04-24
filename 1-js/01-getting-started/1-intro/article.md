# Uma Introdução ao JavaScript

Vamos ver o que há de tão especial no JavaScript, o que podemos fazer com ele, e que outras tecnologias funcionam bem com ele.

## O que é JavaScript?

*JavaScript* foi inicialmente criado para *" tornar páginas web vivas "*.

Os programas nesta linguagem são chamados de *scripts*. Eles podem ser escritos diretamente no HTML de uma página web e executados automaticamente quando a página é carregada.

Os scripts são fornecidos e executados como texto puro. Eles não precisam de preparação ou compilação especial para serem executados.

Neste aspecto, o JavaScript é muito diferente de outra linguagem chamada [Java](https://pt.wikipedia.org/wiki/Java_(linguagem_de_programação)).

```smart header="Por que <u>Java</u>Script?"
Quando foi criado, inicialmente o JavaScript tinha outro nome: "LiveScript". Mas Java era muito popular naquela época, então foi decidido que posicionar uma nova linguagem como um "irmão mais novo" de Java ajudaria.

Mas à medida que ele evoluiu, o JavaScript se tornou uma linguagem totalmente independente com sua própria especificação chamada [ECMAScript] (http://en.wikipedia.org/wiki/ECMAScript), e agora ele não tem nenhuma relação com Java.
```

Hoje, o JavaScript pode ser executado não só no navegador, mas também no servidor, ou mesmo em qualquer dispositivo que tenha um programa especial chamado [Interpretador JavaScript] (https://pt.wikipedia.org/wiki/Interpretador_de_JavaScript).

O navegador tem um interpretador(motor) incorporado, às vezes chamado de "máquina virtual JavaScript".

Interpretadores diferentes têm "codinomes" diferentes. Por exemplo:

- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- no Chrome e no Opera.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- no Firefox.
- ...Há outros codinomes como "Trident" e "Chakra" para diferentes versões do IE, "ChakraCore" para Microsoft Edge, "Nitro" e "SquirrelFish" para Safari, etc.

Os termos acima são bons para lembrar, pois são usados em artigos de desenvolvedores na internet. Vamos usá-los também. Por exemplo, se "um recurso X é suportado pelo V8", então ele provavelmente funciona no Chrome e no Opera.

```smart header="Como funcionam os interpretadores?"

Os interpretadores são complicados. Mas o básico é fácil.

1. O interpretador (embutido se for um navegador) lê ("analisa") o script.
2. Depois converte ("compila") o script para a linguagem da máquina.
3. E então o código da máquina é executado, bem rápido.

O interpretador aplica otimizações em cada etapa do processo. Ele ainda observa o script compilado enquanto ele roda, analisa os dados que passam por ele e aplica otimizações ao código da máquina com base nesse conhecimento. Quando isso é feito, os scripts são executados rapidamente.
```

## What can in-browser JavaScript do?

Modern JavaScript is a "safe" programming language. It does not provide low-level access to memory or CPU, because it was initially created for browsers which do not require it.

JavaScript's capabilities greatly depend on the environment it's running in. For instance, [Node.js](https://wikipedia.org/wiki/Node.js) supports functions that allow JavaScript to read/write arbitrary files, perform network requests, etc.

In-browser JavaScript can do everything related to webpage manipulation, interaction with the user, and the webserver.

For instance, in-browser JavaScript is able to:

- Add new HTML to the page, change the existing content, modify styles.
- React to user actions, run on mouse clicks, pointer movements, key presses.
- Send requests over the network to remote servers, download and upload files (so-called [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) and [COMET](https://en.wikipedia.org/wiki/Comet_(programming)) technologies).
- Get and set cookies, ask questions to the visitor, show messages.
- Remember the data on the client-side ("local storage").

## What CAN'T in-browser JavaScript do?

JavaScript's abilities in the browser are limited for the sake of the user's safety. The aim is to prevent an evil webpage from accessing private information or harming the user's data.

Examples of such restrictions include:

- JavaScript on a webpage may not read/write arbitrary files on the hard disk, copy them or execute programs. It has no direct access to OS system functions.

    Modern browsers allow it to work with files, but the access is limited and only provided if the user does certain actions, like "dropping" a file into a browser window or selecting it via an `<input>` tag.

    There are ways to interact with camera/microphone and other devices, but they require a user's explicit permission. So a JavaScript-enabled page may not sneakily enable a web-camera, observe the surroundings and send the information to the [NSA](https://en.wikipedia.org/wiki/National_Security_Agency).
- Different tabs/windows generally do not know about each other. Sometimes they do, for example when one window uses JavaScript to open the other one. But even in this case, JavaScript from one page may not access the other if they come from different sites (from a different domain, protocol or port).

    This is called the "Same Origin Policy". To work around that, *both pages* must contain a special JavaScript code that handles data exchange.

    This limitation is, again, for the user's safety. A page from `http://anysite.com` which a user has opened must not be able to access another browser tab with the URL `http://gmail.com` and steal information from there.
- JavaScript can easily communicate over the net to the server where the current page came from. But its ability to receive data from other sites/domains is crippled. Though possible, it requires explicit agreement (expressed in HTTP headers) from the remote side. Once again, that's a safety limitation.

![](limitations.png)

Such limits do not exist if JavaScript is used outside of the browser, for example on a server. Modern browsers also allow plugin/extensions which may ask for extended permissions.

## What makes JavaScript unique?

There are at least *three* great things about JavaScript:

```compare
+ Full integration with HTML/CSS.
+ Simple things are done simply.
+ Support by all major browsers and enabled by default.
```
JavaScript is the only browser technology that combines these three things.

That's what makes JavaScript unique. That's why it's the most widespread tool for creating browser interfaces.

While planning to learn a new technology, it's beneficial to check its perspectives. So let's move on to the modern trends affecting it,  including new languages and browser abilities.


## Languages "over" JavaScript

The syntax of JavaScript does not suit everyone's needs. Different people want different features.

That's to be expected, because projects and requirements are different for everyone.

So recently a plethora of new languages appeared, which are *transpiled* (converted) to JavaScript before they run in the browser.

Modern tools make the transpilation very fast and transparent, actually allowing developers to code in another language and auto-converting it "under the hood".

Examples of such languages:

- [CoffeeScript](http://coffeescript.org/) is a "syntactic sugar" for JavaScript. It introduces shorter syntax, allowing us to write clearer and more precise code. Usually, Ruby devs like it.
- [TypeScript](http://www.typescriptlang.org/) is concentrated on adding "strict data typing" to simplify the development and support of complex systems. It is developed by Microsoft.
- [Dart](https://www.dartlang.org/) is a standalone language that has its own engine that runs in non-browser environments (like mobile apps). It was initially offered by Google as a replacement for JavaScript, but as of now, browsers require it to be transpiled to JavaScript just like the ones above.

There are more. Of course, even if we use one of these languages, we should also know JavaScript to really understand what we're doing.

## Summary

- JavaScript was initially created as a browser-only language, but is now used in many other environments as well.
- Today, JavaScript has a unique position as the most widely-adopted browser language with full integration with HTML/CSS.
- There are many languages that get "transpiled" to JavaScript and provide certain features. It is recommended to take a look at them, at least briefly, after mastering JavaScript.
