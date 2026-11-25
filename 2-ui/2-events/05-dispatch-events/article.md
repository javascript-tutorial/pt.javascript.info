# Disparando eventos personalizados

Podemos não apenas atribuir manipuladores, mas também gerar eventos a partir do JavaScript.

Eventos personalizados podem ser usados para criar "componentes gráficos". Por exemplo, um elemento raiz do nosso próprio menu baseado em JS pode disparar eventos informando o que acontece com o menu: `open` (menu aberto), `select` (um item é selecionado) e assim por diante. Outro código pode escutar esses eventos e observar o que está acontecendo com o menu.

Podemos gerar não apenas eventos completamente novos, que inventamos para nossos próprios propósitos, mas também eventos nativos, como `click`, `mousedown` etc. Isso pode ser útil para testes automatizados.

## Construtor Event

As classes de eventos nativas formam uma hierarquia, parecida com as classes de elementos do DOM. A raiz é a classe nativa [Event](https://dom.spec.whatwg.org/#events).

Podemos criar objetos `Event` assim:

```js
let event = new Event(type[, options]);
```

Argumentos:

- *type* -- tipo do evento, uma string como `"click"` ou a nossa própria, como `"my-event"`.
- *options* -- o objeto com duas propriedades opcionais:
  - `bubbles: true/false` -- se `true`, então o evento faz bubbling.
  - `cancelable: true/false` -- se `true`, então a "ação padrão" pode ser prevenida. Mais adiante veremos o que isso significa para eventos personalizados.

  Por padrão, ambas são false: `{bubbles: false, cancelable: false}`.

## dispatchEvent

Depois que um objeto de evento é criado, devemos "executá-lo" em um elemento usando a chamada `elem.dispatchEvent(event)`.

Então os manipuladores reagem a ele como se fosse um evento normal do navegador. Se o evento foi criado com a flag `bubbles`, então ele faz bubbling.

No exemplo abaixo, o evento `click` é iniciado em JavaScript. O manipulador funciona da mesma forma como se o botão tivesse sido clicado:

```html run no-beautify
<button id="elem" onclick="alert('Clique!');">Clique automático</button>

<script>
  let event = new Event("click");
  elem.dispatchEvent(event);
</script>
```

```smart header="event.isTrusted"
Há uma forma de diferenciar um evento "real" do usuário de um gerado por script.

A propriedade `event.isTrusted` é `true` para eventos que vêm de ações reais do usuário e `false` para eventos gerados por script.
```

## Exemplo de bubbling

Podemos criar um evento com bubbling chamado `"hello"` e capturá-lo em `document`.

Tudo que precisamos é definir `bubbles` como `true`:

```html run no-beautify
<h1 id="elem">Olá, vindo do script!</h1>

<script>
  // captura em document...
  document.addEventListener("hello", function(event) { // (1)
    alert("Olá, de " + event.target.tagName); // Olá, de H1
  });

  // ...dispara em elem!
  let event = new Event("hello", {bubbles: true}); // (2)
  elem.dispatchEvent(event);

  // o manipulador em document vai ser ativado e exibir a mensagem.

</script>
```


Notas:

1. Devemos usar `addEventListener` para nossos eventos personalizados, porque `on<event>` só existe para eventos nativos, `document.onhello` não funciona.
2. Devemos definir `bubbles:true`, caso contrário o evento não vai borbulhar para cima.

A mecânica de bubbling é a mesma para eventos nativos (`click`) e personalizados (`hello`). Também há os estágios de capturing e bubbling.

## MouseEvent, KeyboardEvent e outros

Aqui está uma breve lista de classes para UI Events da [especificação UI Event](https://www.w3.org/TR/uievents):

- `UIEvent`
- `FocusEvent`
- `MouseEvent`
- `WheelEvent`
- `KeyboardEvent`
- ...

Devemos usá-las em vez de `new Event` se quisermos criar esses eventos. Por exemplo, `new MouseEvent("click")`.

O construtor correto permite especificar propriedades padrão para aquele tipo de evento.

Como `clientX/clientY` para um evento de mouse:

```js run
let event = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // 100
*/!*
```

Note: o construtor genérico `Event` não permite isso.

Vamos tentar:

```js run
let event = new Event("click", {
  bubbles: true, // só bubbles e cancelable
  cancelable: true, // funcionam no construtor Event
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // undefined, a propriedade desconhecida é ignorada!
*/!*
```

Tecnicamente, podemos contornar isso atribuindo diretamente `event.clientX=100` depois da criação. Então isso é uma questão de conveniência e de seguir as regras. Eventos gerados pelo navegador sempre têm o tipo correto.

A lista completa de propriedades para diferentes UI events está na especificação, por exemplo, [MouseEvent](https://www.w3.org/TR/uievents/#mouseevent).

## Eventos personalizados

Para nossos próprios tipos de eventos completamente novos, como `"hello"`, devemos usar `new CustomEvent`. Tecnicamente, [CustomEvent](https://dom.spec.whatwg.org/#customevent) é igual a `Event`, com uma exceção.

No segundo argumento (objeto) podemos adicionar uma propriedade adicional `detail`, para qualquer informação personalizada que quisermos passar junto com o evento.

Por exemplo:

```html run refresh
<h1 id="elem">Olá, John!</h1>

<script>
  // os detalhes adicionais chegam com o evento no manipulador
  elem.addEventListener("hello", function(event) {
    alert(*!*event.detail.name*/!*);
  });

  elem.dispatchEvent(new CustomEvent("hello", {
*!*
    detail: { name: "John" }
*/!*
  }));
</script>
```

A propriedade `detail` pode ter qualquer dado. Tecnicamente poderíamos viver sem ela, porque podemos atribuir quaisquer propriedades a um objeto `new Event` comum depois da sua criação. Mas `CustomEvent` fornece o campo especial `detail` para evitar conflitos com outras propriedades do evento.

Além disso, a classe do evento descreve "que tipo de evento" ele é, e se o evento é personalizado, então devemos usar `CustomEvent` só para deixar claro o que ele é.

## event.preventDefault()

Muitos eventos do navegador têm uma "ação padrão", como navegar para um link, iniciar uma seleção, e assim por diante.

Para eventos novos e personalizados, definitivamente não há ações padrão do navegador, mas um código que dispara tal evento pode ter seus próprios planos sobre o que fazer depois de acionar o evento.

Ao chamar `event.preventDefault()`, um manipulador de evento pode enviar um sinal de que essas ações devem ser canceladas.

Nesse caso, a chamada a `elem.dispatchEvent(event)` retorna `false`. E o código que a disparou sabe que não deve continuar.

Vamos ver um exemplo prático -- um coelho que se esconde (poderia ser um menu que se fecha ou outra coisa).

Abaixo você pode ver um `#rabbit` e uma função `hide()` que dispara o evento `"hide"` nele, para avisar a todos os interessados que o coelho vai se esconder.

Qualquer manipulador pode escutar esse evento com `rabbit.addEventListener('hide',...)` e, se necessário, cancelar a ação usando `event.preventDefault()`. Então o coelho não vai desaparecer:

```html run refresh autorun
<pre id="rabbit">
  |\   /|
   \|_|/
   /. .\
  =\_Y_/=
   {>o<}
</pre>
<button onclick="hide()">Hide()</button>

<script>
  function hide() {
    let event = new CustomEvent("hide", {
      cancelable: true // sem essa flag, preventDefault não funciona
    });
    if (!rabbit.dispatchEvent(event)) {
      alert('A ação foi prevenida por um manipulador');
    } else {
      rabbit.hidden = true;
    }
  }

  rabbit.addEventListener('hide', function(event) {
    if (confirm("Chamar preventDefault?")) {
      event.preventDefault();
    }
  });
</script>
```

Note: o evento precisa ter a flag `cancelable: true`, caso contrário a chamada `event.preventDefault()` é ignorada.

## Eventos-dentro-de-eventos são síncronos

Normalmente os eventos são processados em uma fila. Ou seja: se o navegador está processando `onclick` e um novo evento acontece, por exemplo o mouse se move, então seu tratamento é colocado na fila, os manipuladores correspondentes de `mousemove` serão chamados depois que o processamento de `onclick` terminar.

A exceção notável é quando um evento é iniciado de dentro de outro, por exemplo usando `dispatchEvent`. Tais eventos são processados imediatamente: os novos manipuladores de evento são chamados, e então o tratamento do evento atual é retomado.

Por exemplo, no código abaixo o evento `menu-open` é acionado durante o `onclick`.

Ele é processado imediatamente, sem esperar o manipulador `onclick` terminar:


```html run autorun
<button id="menu">Menu (clique em mim)</button>

<script>
  menu.onclick = function() {
    alert(1);

    menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    }));

    alert(2);
  };

  // é acionado entre 1 e 2
  document.addEventListener('menu-open', () => alert('aninhado'));
</script>
```

A ordem de saída é: 1 -> aninhado -> 2.

Note que o evento aninhado `menu-open` é capturado em `document`. A propagação e o tratamento do evento aninhado terminam antes que o processamento volte para o código externo (`onclick`).

Isso não é só sobre `dispatchEvent`, há outros casos. Se um manipulador de evento chama métodos que disparam outros eventos -- eles também são processados sincronamente, de forma aninhada.

Digamos que não gostamos disso. Gostaríamos que `onclick` fosse totalmente processado primeiro, independentemente de `menu-open` ou de qualquer outro evento aninhado.

Então podemos colocar o `dispatchEvent` (ou outra chamada que dispara eventos) no final de `onclick` ou, talvez melhor, envolvê-lo em um `setTimeout` com atraso zero:

```html run
<button id="menu">Menu (clique em mim)</button>

<script>
  menu.onclick = function() {
    alert(1);

    setTimeout(() => menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    })));

    alert(2);
  };

  document.addEventListener('menu-open', () => alert('aninhado'));
</script>
```

Agora `dispatchEvent` é executado de forma assíncrona depois que a execução do código atual termina, incluindo `menu.onclick`, então os manipuladores de evento ficam totalmente separados.

A ordem de saída se torna: 1 -> 2 -> aninhado.

## Resumo

Para gerar um evento a partir do código, primeiro precisamos criar um objeto de evento.

O construtor genérico `Event(name, options)` aceita um nome de evento arbitrário e o objeto `options` com duas propriedades:
- `bubbles: true` se o evento deve fazer bubbling.
- `cancelable: true` se `event.preventDefault()` deve funcionar.

Outros construtores de eventos nativos, como `MouseEvent`, `KeyboardEvent` e assim por diante, aceitam propriedades específicas para aquele tipo de evento. Por exemplo, `clientX` para eventos de mouse.

Para eventos personalizados devemos usar o construtor `CustomEvent`. Ele tem uma opção adicional chamada `detail`, à qual devemos atribuir os dados específicos do evento. Então todos os manipuladores podem acessá-la como `event.detail`.

Apesar da possibilidade técnica de gerar eventos do navegador como `click` ou `keydown`, devemos usá-los com muito cuidado.

Não devemos gerar eventos do navegador, já que essa é uma forma improvisada de executar manipuladores. Isso é, na maioria das vezes, uma arquitetura ruim.

Eventos nativos podem ser gerados:

- Como uma gambiarra para fazer bibliotecas de terceiros funcionarem da forma necessária, se elas não fornecerem outros meios de interação.
- Para testes automatizados, para "clicar no botão" no script e ver se a interface reage corretamente.

Eventos personalizados com nossos próprios nomes são frequentemente gerados por motivos arquiteturais, para sinalizar o que acontece dentro dos nossos menus, sliders, carrosséis etc.
