# Introdução aos eventos do navegador

*Um evento* é um sinal de que algo aconteceu. Todos os nós do DOM geram esses sinais (mas os eventos não se limitam ao DOM).

Aqui está uma lista dos eventos DOM mais úteis, só para dar uma olhada:

**Eventos de mouse:**
- `click` -- quando o mouse clica em um elemento (dispositivos de tela sensível ao toque o geram em um toque).
- `contextmenu` -- quando o mouse clica com o botão direito em um elemento.
- `mouseover` / `mouseout` -- quando o cursor do mouse entra em / sai de um elemento.
- `mousedown` / `mouseup` -- quando o botão do mouse é pressionado / liberado sobre um elemento.
- `mousemove` -- quando o mouse é movido.

**Eventos de teclado:**
- `keydown` e `keyup` -- quando uma tecla do teclado é pressionada e liberada.

**Eventos de elementos de formulário:**
- `submit` -- quando o visitante envia um `<form>`.
- `focus` -- quando o visitante foca em um elemento, por exemplo em um `<input>`.

**Eventos de documento:**
- `DOMContentLoaded` -- quando o HTML é carregado e processado, o DOM está completamente construído.

**Eventos CSS:**
- `transitionend` -- quando uma animação CSS termina.

Há muitos outros eventos. Vamos entrar em mais detalhes sobre eventos específicos nos próximos capítulos.

## Manipuladores de eventos

Para reagir a eventos, podemos atribuir um *manipulador* (handler) -- uma função que executa em caso de um evento.

Manipuladores são uma forma de executar código JavaScript em resposta a ações do usuário.

Há várias formas de atribuir um manipulador. Vamos ver cada uma, começando pela mais simples.

### Atributo HTML

Um manipulador pode ser definido em HTML com um atributo chamado `on<event>`.

Por exemplo, para atribuir um manipulador de `click` a um `input`, podemos usar `onclick`, assim:

```html run
<input value="Clique em mim" *!*onclick="alert('Clique!')"*/!* type="button">
```

Ao clicar com o mouse, o código dentro de `onclick` é executado.

Note que dentro de `onclick` usamos aspas simples, porque o próprio atributo está entre aspas duplas. Se esquecermos que o código está dentro do atributo e usarmos aspas duplas dentro dele, assim: `onclick="alert("Clique!")"`, então não vai funcionar corretamente.

Um atributo HTML não é um lugar conveniente para escrever muito código, então é melhor criar uma função JavaScript e chamá-la ali.

Aqui um clique executa a função `countRabbits()`:

```html autorun height=50
<script>
  function countRabbits() {
    for(let i=1; i<=3; i++) {
      alert("Coelho número " + i);
    }
  }
</script>

<input type="button" *!*onclick="countRabbits()"*/!* value="Contar coelhos!">
```

Como sabemos, os nomes de atributos HTML não diferenciam maiúsculas de minúsculas, então `ONCLICK` funciona assim como `onClick` e `onCLICK`... Mas geralmente os atributos são escritos em minúsculas: `onclick`.

### Propriedade do DOM

Podemos atribuir um manipulador usando uma propriedade do DOM `on<event>`.

Por exemplo, `elem.onclick`:

```html autorun
<input id="elem" type="button" value="Clique em mim">
<script>
*!*
  elem.onclick = function() {
    alert('Obrigado');
  };
*/!*
</script>
```

Se o manipulador é atribuído usando um atributo HTML, então o navegador o lê, cria uma nova função a partir do conteúdo do atributo e a escreve na propriedade do DOM.

Então essa forma é, na verdade, a mesma que a anterior.

Esses dois trechos de código funcionam da mesma forma:

1. Só HTML:

    ```html autorun height=50
    <input type="button" *!*onclick="alert('Clique!')"*/!* value="Botão">
    ```
2. HTML + JS:

    ```html autorun height=50
    <input type="button" id="button" value="Botão">
    <script>
    *!*
      button.onclick = function() {
        alert('Clique!');
      };
    */!*
    </script>
    ```

No primeiro exemplo, o atributo HTML é usado para inicializar `button.onclick`, enquanto no segundo exemplo é o script -- essa é toda a diferença.

**Como existe apenas uma propriedade `onclick`, não podemos atribuir mais de um manipulador de evento.**

No exemplo abaixo, adicionar um manipulador com JavaScript sobrescreve o manipulador existente:

```html run height=50 autorun
<input type="button" id="elem" onclick="alert('Antes')" value="Clique em mim">
<script>
*!*
  elem.onclick = function() { // sobrescreve o manipulador existente
    alert('Depois'); // só isso será mostrado
  };
*/!*
</script>
```

Para remover um manipulador -- atribua `elem.onclick = null`.

## Acessando o elemento: this

O valor de `this` dentro de um manipulador é o elemento. Aquele que tem o manipulador.

No código abaixo, `button` mostra seu conteúdo usando `this.innerHTML`:

```html height=50 autorun
<button onclick="alert(this.innerHTML)">Clique em mim</button>
```

## Possíveis erros

Se você está começando a trabalhar com eventos -- preste atenção a algumas sutilezas.

Podemos definir uma função existente como manipulador:

```js
function sayThanks() {
  alert('Obrigado!');
}

elem.onclick = sayThanks;
```

Mas tenha cuidado: a função deve ser atribuída como `sayThanks`, não `sayThanks()`.

```js
// certo
button.onclick = sayThanks;

// errado
button.onclick = sayThanks();
```

Se adicionarmos parênteses, então `sayThanks()` se torna uma chamada de função. Então a última linha, na verdade, pega o *resultado* da execução da função, que é `undefined` (já que a função não retorna nada), e o atribui a `onclick`. Isso não funciona.

...Por outro lado, na marcação precisamos sim dos parênteses:

```html
<input type="button" id="button" onclick="sayThanks()">
```

A diferença é fácil de explicar. Quando o navegador lê o atributo, ele cria uma função manipuladora com o corpo a partir do conteúdo do atributo.

Então a marcação gera essa propriedade:
```js
button.onclick = function() {
*!*
  sayThanks(); // <-- o conteúdo do atributo vai aqui
*/!*
};
```

**Não use `setAttribute` para manipuladores.**

Uma chamada assim não vai funcionar:

```js run no-beautify
// um clique em <body> vai gerar erros,
// porque atributos são sempre strings, a função se torna uma string
document.body.setAttribute('onclick', function() { alert(1) });
```

**A caixa (maiúsculas/minúsculas) das propriedades do DOM importa.**

Atribua um manipulador a `elem.onclick`, não a `elem.ONCLICK`, porque as propriedades do DOM diferenciam maiúsculas de minúsculas.

## addEventListener

O problema fundamental das formas de atribuir manipuladores mencionadas acima é que *não podemos atribuir múltiplos manipuladores a um evento*.

Digamos que uma parte do nosso código queira destacar um botão ao clicar, e outra parte queira mostrar uma mensagem no mesmo clique.

Gostaríamos de atribuir dois manipuladores de evento para isso. Mas uma nova propriedade do DOM vai sobrescrever a existente:

```js no-beautify
input.onclick = function() { alert(1); }
// ...
input.onclick = function() { alert(2); } // substitui o manipulador anterior
```

Os desenvolvedores dos padrões web entenderam isso há muito tempo e sugeriram uma forma alternativa de gerenciar manipuladores usando os métodos especiais `addEventListener` e `removeEventListener`, que não têm essa restrição.

A sintaxe para adicionar um manipulador:

```js
element.addEventListener(event, handler, [options]);
```

`event`
: Nome do evento, por exemplo `"click"`.

`handler`
: A função manipuladora.

`options`
: Um objeto adicional opcional com propriedades:
    - `once`: se `true`, então o manipulador é removido automaticamente depois que é acionado.
    - `capture`: a fase em que tratar o evento, a ser abordada mais adiante no capítulo <info:bubbling-and-capturing>. Por razões históricas, `options` também pode ser `false/true`, o que é o mesmo que `{capture: false/true}`.
    - `passive`: se `true`, então o manipulador não vai chamar `preventDefault()`, vamos explicar isso mais adiante em <info:default-browser-action>.

Para remover o manipulador, use `removeEventListener`:

```js
element.removeEventListener(event, handler, [options]);
```

````warn header="A remoção exige a mesma função"
Para remover um manipulador devemos passar exatamente a mesma função que foi atribuída.

Isso não funciona:

```js no-beautify
elem.addEventListener( "click" , () => alert('Obrigado!'));
// ....
elem.removeEventListener( "click", () => alert('Obrigado!'));
```

O manipulador não será removido, porque `removeEventListener` recebe outra função -- com o mesmo código, mas isso não importa, já que é um objeto de função diferente.

Aqui está a forma correta:

```js
function handler() {
  alert( 'Obrigado!' );
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
```

Note -- se não armazenarmos a função em uma variável, então não podemos removê-la. Não há forma de "ler de volta" manipuladores atribuídos por `addEventListener`.
````

Várias chamadas a `addEventListener` permitem adicionar múltiplos manipuladores, assim:

```html run no-beautify
<input id="elem" type="button" value="Clique em mim"/>

<script>
  function handler1() {
    alert('Obrigado!');
  };

  function handler2() {
    alert('Obrigado de novo!');
  }

*!*
  elem.onclick = () => alert("Olá");
  elem.addEventListener("click", handler1); // Obrigado!
  elem.addEventListener("click", handler2); // Obrigado de novo!
*/!*
</script>
```

Como podemos ver no exemplo acima, podemos definir manipuladores *tanto* usando uma propriedade do DOM quanto `addEventListener`. Mas geralmente usamos apenas uma dessas formas.

````warn header="Para alguns eventos, os manipuladores só funcionam com `addEventListener`"
Existem eventos que não podem ser atribuídos via uma propriedade do DOM. Só com `addEventListener`.

Por exemplo, o evento `DOMContentLoaded`, que é acionado quando o documento é carregado e o DOM foi construído.

```js
// nunca vai executar
document.onDOMContentLoaded = function() {
  alert("DOM construído");
};
```

```js
// dessa forma funciona
document.addEventListener("DOMContentLoaded", function() {
  alert("DOM construído");
});
```
Então `addEventListener` é mais universal. No entanto, esses eventos são a exceção, não a regra.
````

## Objeto do evento

Para tratar um evento corretamente, gostaríamos de saber mais sobre o que aconteceu. Não só um "click" ou um "keydown", mas quais eram as coordenadas do ponteiro? Qual tecla foi pressionada? E assim por diante.

Quando um evento acontece, o navegador cria um *objeto de evento*, coloca detalhes nele e o passa como argumento para o manipulador.

Aqui está um exemplo de como obter as coordenadas do ponteiro a partir do objeto de evento:

```html run
<input type="button" value="Clique em mim" id="elem">

<script>
  elem.onclick = function(*!*event*/!*) {
    // mostra o tipo do evento, o elemento e as coordenadas do clique
    alert(event.type + " em " + event.currentTarget);
    alert("Coordenadas: " + event.clientX + ":" + event.clientY);
  };
</script>
```

Algumas propriedades do objeto `event`:

`event.type`
: Tipo do evento, aqui é `"click"`.

`event.currentTarget`
: Elemento que tratou o evento. É exatamente o mesmo que `this`, a menos que o manipulador seja uma arrow function, ou seu `this` esteja vinculado a outra coisa, então podemos obter o elemento a partir de `event.currentTarget`.

`event.clientX` / `event.clientY`
: Coordenadas do cursor relativas à janela, para eventos de ponteiro.

Há mais propriedades. Muitas delas dependem do tipo do evento: eventos de teclado têm um conjunto de propriedades, eventos de ponteiro -- outro, vamos estudá-las mais adiante conforme avançarmos para os detalhes de diferentes eventos.

````smart header="O objeto de evento também está disponível em manipuladores HTML"
Se atribuirmos um manipulador em HTML, também podemos usar o objeto `event`, assim:

```html autorun height=60
<input type="button" onclick="*!*alert(event.type)*/!*" value="Tipo do evento">
```

Isso é possível porque, quando o navegador lê o atributo, ele cria um manipulador assim: `function(event) { alert(event.type) }`. Ou seja: seu primeiro argumento é chamado `"event"`, e o corpo é retirado do atributo.
````


## Manipuladores de objeto: handleEvent

Podemos atribuir não apenas uma função, mas um objeto como manipulador de evento usando `addEventListener`. Quando um evento ocorre, seu método `handleEvent` é chamado.

Por exemplo:


```html run
<button id="elem">Clique em mim</button>

<script>
  let obj = {
    handleEvent(event) {
      alert(event.type + " em " + event.currentTarget);
    }
  };

  elem.addEventListener('click', obj);
</script>
```

Como podemos ver, quando `addEventListener` recebe um objeto como manipulador, ele chama `obj.handleEvent(event)` em caso de um evento.

Também poderíamos usar objetos de uma classe personalizada, assim:


```html run
<button id="elem">Clique em mim</button>

<script>
  class Menu {
    handleEvent(event) {
      switch(event.type) {
        case 'mousedown':
          elem.innerHTML = "Botão do mouse pressionado";
          break;
        case 'mouseup':
          elem.innerHTML += "...e liberado.";
          break;
      }
    }
  }

*!*
  let menu = new Menu();

  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
*/!*
</script>
```

Aqui o mesmo objeto trata os dois eventos. Note que precisamos configurar explicitamente os eventos a serem escutados usando `addEventListener`. O objeto `menu` só recebe `mousedown` e `mouseup` aqui, e nenhum outro tipo de evento.

O método `handleEvent` não precisa fazer todo o trabalho por si só. Ele pode chamar outros métodos específicos de evento em vez disso, assim:

```html run
<button id="elem">Clique em mim</button>

<script>
  class Menu {
    handleEvent(event) {
      // mousedown -> onMousedown
      let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
      this[method](event);
    }

    onMousedown() {
      elem.innerHTML = "Botão do mouse pressionado";
    }

    onMouseup() {
      elem.innerHTML += "...e liberado.";
    }
  }

  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
</script>
```

Agora os manipuladores de evento estão claramente separados, o que pode facilitar a manutenção.

## Resumo

Há 3 formas de atribuir manipuladores de evento:

1. Atributo HTML: `onclick="..."`.
2. Propriedade do DOM: `elem.onclick = function`.
3. Métodos: `elem.addEventListener(event, handler[, phase])` para adicionar, `removeEventListener` para remover.

Atributos HTML são usados com moderação, porque JavaScript no meio de uma tag HTML parece um pouco estranho e deslocado. Além disso, não é possível escrever muito código ali.

Propriedades do DOM podem ser usadas sem problema, mas não podemos atribuir mais de um manipulador para um evento específico. Em muitos casos essa limitação não é um problema.

A última forma é a mais flexível, mas também a mais longa de escrever. Há poucos eventos que só funcionam com ela, por exemplo `transitionend` e `DOMContentLoaded` (a ser abordado). Além disso, `addEventListener` suporta objetos como manipuladores de evento. Nesse caso, o método `handleEvent` é chamado quando o evento ocorre.

Não importa como você atribua o manipulador -- ele recebe um objeto de evento como primeiro argumento. Esse objeto contém os detalhes sobre o que aconteceu.

Vamos aprender mais sobre eventos em geral e sobre diferentes tipos de eventos nos próximos capítulos.
