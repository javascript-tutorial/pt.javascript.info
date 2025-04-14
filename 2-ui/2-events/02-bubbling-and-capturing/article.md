# Bubbling and capturing

Vamos começar com um exemplo.

Este manipulador de eventos foi atribuído a `<div>`, mas também é acionado caso você clique em qualquer elemento aninhado como `<em>` ou `<code>`:

```html autorun height=60
<div onclick="alert('The handler!')">
  <em>Se você clicar no<code>EM</code>, o manipulador na <code>DIV</code> será acionado.</em>
</div>
```

Não é um pouco estranho? Por que o manipulador na `<div>` é acionado se o clique foi no `<em>`?

## Bubbling

O *bubbling*(borbulhamento) é simples.

**Quando um evento acontece em um elemento, ele primeiro executa os manipuladores nesse elemento, depois em seu elemento pai, e em seguida, sobe pelos outros ancestrais.**

Vamos supor que tenhamos 3 elementos aninhados `FORM > DIV > P` com um manipulador em cada um:

```html run autorun
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form onclick="alert('form')">FORM
  <div onclick="alert('div')">DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>
```

Um clique no `<p>` aciona primeiro o `onclick`:
1. Neste `<p>`.
2. Em seguida, na `<div>` externa.
3. Depois, no `<form>`.
4. E assim em diante até o objeto `document`.

![](event-order-bubbling.svg)

Então, se clicarmos no `<p>`, veremos 3 *alerts*: `p` -> `div` -> `form`.

O processo se chama "bubbling", porque o evento "borbulha" do elemento mais interno para os elementos pais, com uma bolha na água.

```warn header="*Quase todos os eventos borbulham."
A palavra-chave nessa frase é "quase".

Por exemplo, um evento `focus` não borbulha. Existem outros exemplos também, que iremos conhecer. Mas ainda assim é uma exceção, e não a regra. A maioria dos eventos borbulha.
```

## event.target

Um manipulador em um elemento pai sempre pode obter detalhes sobre onde o evento realmente ocorreu.

**O elemento mais interno que causou o evento é chamado de elemento *target*(alvo), acessado como `event.target`.**

Note a diferença de `this` (=`event.currentTarget`):

- `event.target` - é o elemento "*target*(alvo)" que iniciou o evento, ele não muda durante o processo *bubbling*.
- `this` - é o elemento que esta atualmente executando o manipulador.

Por exemplo, se tivermos um único manipulador `form.onclick`, ele poderá capturar todos os cliques dentro do `<form>`. Não importa onde o clique aconteceu, ele borbulha até `<form>` e executa o manipulador.

No manipulador `form.onclick`:

- `this` (=`event.currentTarget`) é o elemento `<form>`, porque o manipulador foi atribuído a ele.
- `event.target` é o elemento dentro do `<form> `que foi clicado.

Confira:

[codetabs height=220 src="bubble-target"]

É possível que `event.target` seja igual a `this` - isso acontece quando o clique é feito diretamente no elemento `<form>`.

## Parando o bubbling

Um evento *bubbling* vai do elemento alvo subindo para os elementos pais. Normalmente, ele sobe até `<html>`, em seguida ao objeto `document`, alguns eventos alcançam até mesmo o `window`, executando todos os manipuladores no caminho.

Mas qualquer manipulador pode decidir se o evento foi totalmente processado e parar o *bubbling*.

O método para isso é `event.stopPropagation()`.

Por exemplo, aqui `body.onclick` não funciona se você clicar no `<button>`:

```html run autorun height=60
<body onclick="alert(`the bubbling doesn't reach here`)">
  <button onclick="event.stopPropagation()">Clique em mim</button>
</body>
```

```smart header="event.stopImmediatePropagation()"
Se um elemento tem múltiplos manipuladores para um único evento, mesmo que um deles interrompa o *bubbling*, os outros ainda serão executados.

Em outras palavras, `event.stopPropagation()` interrompe o movimento ascendente, mas no elemento atual todos os manipuladores serão executados.

Para parar o *bubbling* e prevenir que os manipuladores do elemento atual sejam executados, existe um método `event.stopImmediatePropagation()`. Após isso, nenhum manipulador será executado.
```

```warn header="Não interrompa o *bubbling* desnecessariamente!"
*Bubbling* é conveniente. Não o interrompa sem uma razão óbvia e arquiteturalmente planejada.

Às vezes, `event.stopPropagation()` cria armadilhas que se tornam problemas futuramente.

Por exemplo:

1. Criamos um menu aninhado. Cada submenu lida com cliques em seus elementos e chama `stopPropagation`, de forma que o manipulador do menu externo não seja acionado.
2. Depois decidimos capturar cliques em toda a *window* para observar o comportamento do usuário (onde as pessoas clicam). Algum sistemas analíticos fazem isso. Em geral, os códigos usam `document.addEventListener('click'…)` para capturar todos os cliques.
3. Nossa análise não funcionará nas áreas onde os cliques são interrompidos por `stopPropagation`. Infelizmente, temos uma "zona morta".

Geralmente, não existe necessidade de prevenir o *bubbling*. Uma tarefa que aparentemente necessita disso pode ser resolvida por outros meios. Um deles é usar eventos customizados, que veremos em breve. Também podemos escrever nossos dados no objeto `event` em um manipulador e lê-los em outro, para podermos passar informações sobre o processamento aos manipuladores dos elementos pais.
```


## Capturing

Existe outra fase do processamento de eventos chamada *capturing*(captura). Raramente é usado no dia a dia, mas pode ser útil às vezes.

O Padrão [DOM Events](https://www.w3.org/TR/DOM-Level-3-Events/) descreve três fases da propagação de eventos:

1. Fase de captura -- o evento desce até o elemento.
2. Fase alvo -- o evento alcança o elemento alvo.
3. Fase de borbulhamento -- o evento borbulha do elemento.

Aqui está a imagem da especificação, das fases de captura `(1)`, alvo `(2)` e borbulhamento `(3)` para um evento clique no `<td>` dentro de um table:

![](eventflow.svg)

Isto é: um evento clique no `<td>`, o evento passa pela cadeia de ancestrais até o elemento (fase de captura), chega ao alvo e aciona lá (fase alvo), depois sobe (fase de borbulhamento), acionando os manipuladores no caminho.

Até agora, só falamos do *bubbling*, *capturing* raramente é utilizado.

Na verdade, a fase de captura é invisível para nós, porque manipuladores adicionados usando a propriedade `on<event>`, atributos HTML ou `addEventListener(event, handler)` não lidam com a captura, sendo executados somente na segunda e terceira fases.

Para pegarmos um evento na fase de captura, nós precisamos configurar a opção `capture` do manipulador como `true`:

```js
elem.addEventListener(..., {capture: true})

// or, just "true" is an alias to {capture: true}
elem.addEventListener(..., true)
```

A opção `capture` tem dois valores possíveis:

- Se for `false` (padrão),  o manipulador é configurado na fase de borbulhamento.
- Se for `true`, o manipulador é configurado para a fase de captura.


Embora existam três fases, a segunda fase (fase alvo: o evento alcançou o elemento) não é tratada separadamente. Manipuladores definidos para as fases de captura e borbulhamento também são acionados nessa fase.

Vejamos a captura e o borbulhamento em ação:

```html run autorun height=140 edit
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form>FORM
  <div>DIV
    <p>P</p>
  </div>
</form>

<script>
  for(let elem of document.querySelectorAll('*')) {
    elem.addEventListener("click", e => alert(`Capturing: ${elem.tagName}`), true);
    elem.addEventListener("click", e => alert(`Bubbling: ${elem.tagName}`));
  }
</script>
```

The code sets click handlers on *every* element in the document to see which ones are working.

If you click on `<p>`, then the sequence is:

1. `HTML` -> `BODY` -> `FORM` -> `DIV -> P` (capturing phase, the first listener):
2. `P` -> `DIV` -> `FORM` -> `BODY` -> `HTML` (bubbling phase, the second listener).

Please note, the `P` shows up twice, because we've set two listeners: capturing and bubbling. The target triggers at the end of the first and at the beginning of the second phase.

There's a property `event.eventPhase` that tells us the number of the phase on which the event was caught. But it's rarely used, because we usually know it in the handler.

```smart header="To remove the handler, `removeEventListener` needs the same phase"
If we `addEventListener(..., true)`, then we should mention the same phase in `removeEventListener(..., true)` to correctly remove the handler.
```

````smart header="Listeners on the same element and same phase run in their set order"
If we have multiple event handlers on the same phase, assigned to the same element with `addEventListener`, they run in the same order as they are created:

```js
elem.addEventListener("click", e => alert(1)); // guaranteed to trigger first
elem.addEventListener("click", e => alert(2));
```
````

```smart header="The `event.stopPropagation()` during the capturing also prevents the bubbling"
The `event.stopPropagation()` method and its sibling `event.stopImmediatePropagation()` can also be called on the capturing phase. Then not only the futher capturing is stopped, but the bubbling as well.

In other words, normally the event goes first down ("capturing") and then up ("bubbling"). But if `event.stopPropagation()` is called during the capturing phase, then the event travel stops, no bubbling will occur.
```


## Summary

When an event happens -- the most nested element where it happens gets labeled as the "target element" (`event.target`).

- Then the event moves down from the document root to `event.target`, calling handlers assigned with `addEventListener(..., true)` on the way (`true` is a shorthand for `{capture: true}`).
- Then handlers are called on the target element itself.
- Then the event bubbles up from `event.target` to the root, calling handlers assigned using `on<event>`, HTML attributes and `addEventListener` without the 3rd argument or with the 3rd argument `false/{capture:false}`.

Each handler can access `event` object properties:

- `event.target` -- the deepest element that originated the event.
- `event.currentTarget` (=`this`) -- the current element that handles the event (the one that has the handler on it)
- `event.eventPhase` -- the current phase (capturing=1, target=2, bubbling=3).

Any event handler can stop the event by calling `event.stopPropagation()`, but that's not recommended, because we can't really be sure we won't need it above, maybe for completely different things.

The capturing phase is used very rarely, usually we handle events on bubbling. And there's a logical explanation for that.

In real world, when an accident happens, local authorities react first. They know best the area where it happened. Then higher-level authorities if needed.

The same for event handlers. The code that set the handler on a particular element knows maximum details about the element and what it does. A handler on a particular `<td>` may be suited for that exactly `<td>`, it knows everything about it, so it should get the chance first. Then its immediate parent also knows about the context, but a little bit less, and so on till the very top element that handles general concepts and runs the last one.

Bubbling and capturing lay the foundation for "event delegation" -- an extremely powerful event handling pattern that we study in the next chapter.
