# Drag'n'Drop com eventos de mouse

Drag'n'Drop (arrastar e soltar) é uma ótima solução de interface. Pegar algo e arrastá-lo e soltá-lo é uma forma clara e simples de fazer muitas coisas, desde copiar e mover documentos (como em gerenciadores de arquivos) até fazer pedidos (soltando itens num carrinho).

No padrão HTML moderno há uma [seção sobre Drag and Drop](https://html.spec.whatwg.org/multipage/interaction.html#dnd) com eventos especiais como `dragstart`, `dragend`, e assim por diante.

Esses eventos nos permitem suportar tipos especiais de drag'n'drop, como tratar o arrastar de um arquivo do gerenciador de arquivos do sistema operacional e soltá-lo na janela do navegador. Então o JavaScript pode acessar o conteúdo de tais arquivos.

Mas os eventos nativos de Drag também têm limitações. Por exemplo, não podemos prevenir o arrasto a partir de uma certa área. Também não podemos fazer o arrasto ser só "horizontal" ou "vertical". E há muitas outras tarefas de drag'n'drop que não podem ser feitas usando-os. Além disso, o suporte de dispositivos móveis para tais eventos é muito fraco.

Então aqui vamos ver como implementar Drag'n'Drop usando eventos de mouse.

## Algoritmo de Drag'n'Drop

O algoritmo básico de Drag'n'Drop parece assim:

1. No `mousedown` - prepare o elemento para ser movido, se necessário (talvez criar um clone dele, adicionar uma classe a ele ou qualquer coisa assim).
2. Então no `mousemove` mova-o mudando `left/top` com `position:absolute`.
3. No `mouseup` - execute todas as ações relacionadas a finalizar o drag'n'drop.

Esses são os conceitos básicos. Depois vamos ver como adicionar outras funcionalidades, como destacar os elementos subjacentes atuais enquanto arrastamos sobre eles.

Aqui está a implementação de arrastar uma bola:

```js
ball.onmousedown = function(event) {
  // (1) prepara para mover: torna absoluto e no topo pelo z-index
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;

  // move-o para fora de quaisquer pais atuais, direto para o body
  // para torná-lo posicionado em relação ao body
  document.body.append(ball);

  // centraliza a bola nas coordenadas (pageX, pageY)
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }

  // move nossa bola posicionada de forma absoluta sob o cursor
  moveAt(event.pageX, event.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (2) move a bola no mousemove
  document.addEventListener('mousemove', onMouseMove);

  // (3) solta a bola, remove os manipuladores desnecessários
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};
```

Se executarmos o código, podemos notar algo estranho. No começo do drag'n'drop, a bola "se bifurca": começamos a arrastar o "clone" dela.

```online
Aqui está um exemplo em ação:

[iframe src="ball" height=230]

Tente arrastar e soltar com o mouse e você verá esse comportamento.
```

Isso acontece porque o navegador tem seu próprio suporte de drag'n'drop para imagens e alguns outros elementos. Ele é executado automaticamente e entra em conflito com o nosso.

Para desabilitá-lo:

```js
ball.ondragstart = function() {
  return false;
};
```

Agora tudo vai ficar bem.

```online
Em ação:

[iframe src="ball2" height=230]
```

Outro aspecto importante -- rastreamos `mousemove` em `document`, não em `ball`. À primeira vista pode parecer que o mouse está sempre sobre a bola, e podemos colocar `mousemove` nela.

Mas como lembramos, `mousemove` é acionado frequentemente, mas não para cada pixel. Então, depois de um movimento rápido, o cursor pode saltar da bola para algum lugar no meio do documento (ou até fora da janela).

Então devemos escutar em `document` para capturá-lo.

## Posicionamento correto

Nos exemplos acima, a bola sempre é movida de forma que seu centro fique sob o cursor:

```js
ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
```

Não é ruim, mas há um efeito colateral. Para iniciar o drag'n'drop, podemos fazer `mousedown` em qualquer lugar da bola. Mas se a "pegarmos" pela borda, então a bola subitamente "salta" para ficar centralizada sob o cursor do mouse.

Seria melhor se mantivéssemos o deslocamento inicial do elemento em relação ao cursor.

Por exemplo, se começarmos a arrastar pela borda da bola, então o cursor deveria permanecer sobre a borda enquanto arrastamos.

![](ball_shift.svg)

Vamos atualizar nosso algoritmo:

1. Quando um visitante pressiona o botão (`mousedown`) - lembre a distância do cursor até o canto superior esquerdo da bola nas variáveis `shiftX/shiftY`. Vamos manter essa distância durante o arrasto.

    Para obter esses deslocamentos podemos subtrair as coordenadas:

    ```js
    // onmousedown
    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;
    ```

2. Então, enquanto arrastamos, posicionamos a bola no mesmo deslocamento relativo ao cursor, assim:

    ```js
    // onmousemove
    // a bola tem position:absolute
    ball.style.left = event.pageX - *!*shiftX*/!* + 'px';
    ball.style.top = event.pageY - *!*shiftY*/!* + 'px';
    ```

O código final com melhor posicionamento:

```js
ball.onmousedown = function(event) {

*!*
  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;
*/!*

  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.append(ball);

  moveAt(event.pageX, event.pageY);

  // move a bola nas coordenadas (pageX, pageY)
  // levando em conta os deslocamentos iniciais
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - *!*shiftX*/!* + 'px';
    ball.style.top = pageY - *!*shiftY*/!* + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move a bola no mousemove
  document.addEventListener('mousemove', onMouseMove);

  // solta a bola, remove os manipuladores desnecessários
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};

ball.ondragstart = function() {
  return false;
};
```

```online
Em ação (dentro de `<iframe>`):

[iframe src="ball3" height=230]
```

A diferença é especialmente perceptível se arrastarmos a bola pelo seu canto inferior direito. No exemplo anterior a bola "salta" sob o cursor. Agora ela segue o cursor de forma fluida a partir da posição atual.

## Possíveis alvos de soltura (droppables)

Nos exemplos anteriores a bola podia ser solta em "qualquer lugar" para ficar. Na vida real geralmente pegamos um elemento e o soltamos sobre outro. Por exemplo, um "arquivo" numa "pasta" ou algo assim.

Falando de forma abstrata, pegamos um elemento "arrastável" e o soltamos sobre um elemento "soltável".

Precisamos saber:
- onde o elemento foi solto ao final do Drag'n'Drop -- para fazer a ação correspondente,
- e, de preferência, saber sobre qual soltável estamos arrastando, para destacá-lo.

A solução é meio interessante e só um pouco complicada, então vamos cobri-la aqui.

Qual pode ser a primeira ideia? Provavelmente definir manipuladores de `mouseover/mouseup` nos possíveis soltáveis?

Mas isso não funciona.

O problema é que, enquanto estamos arrastando, o elemento arrastável está sempre acima dos outros elementos. E os eventos de mouse só acontecem no elemento do topo, não naqueles abaixo dele.

Por exemplo, abaixo há dois elementos `<div>`, um vermelho no topo do azul (cobrindo-o totalmente). Não há como capturar um evento no azul, porque o vermelho está no topo:

```html run autorun height=60
<style>
  div {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
  }
</style>
<div style="background:blue" onmouseover="alert('nunca funciona')"></div>
<div style="background:red" onmouseover="alert('sobre o vermelho!')"></div>
```

O mesmo com um elemento arrastável. A bola está sempre no topo sobre os outros elementos, então os eventos acontecem nela. Quaisquer manipuladores que definirmos nos elementos inferiores, eles não vão funcionar.

É por isso que a ideia inicial de colocar manipuladores nos possíveis soltáveis não funciona na prática. Eles não serão executados.

Então, o que fazer?

Há um método chamado `document.elementFromPoint(clientX, clientY)`. Ele retorna o elemento mais aninhado nas coordenadas relativas à janela fornecidas (ou `null` se as coordenadas fornecidas estiverem fora da janela). Se houver múltiplos elementos sobrepostos nas mesmas coordenadas, então o do topo é retornado.

Podemos usá-lo em qualquer um dos nossos manipuladores de eventos de mouse para detectar o possível soltável sob o cursor, assim:

```js
// num manipulador de evento de mouse
ball.hidden = true; // (*) esconde o elemento que estamos arrastando

let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
// elemBelow é o elemento abaixo da bola, pode ser um soltável

ball.hidden = false;
```

Note bem: precisamos esconder a bola antes da chamada `(*)`. Caso contrário, normalmente teríamos uma bola nessas coordenadas, já que ela é o elemento do topo sob o cursor: `elemBelow=ball`. Então a escondemos e imediatamente a mostramos de novo.

Podemos usar esse código para verificar sobre qual elemento estamos "voando" em qualquer momento. E tratar a soltura quando ela acontecer.

Um código estendido de `onMouseMove` para encontrar elementos "soltáveis":

```js
// possível soltável sobre o qual estamos voando agora
let currentDroppable = null;

function onMouseMove(event) {
  moveAt(event.pageX, event.pageY);

  ball.hidden = true;
  let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
  ball.hidden = false;

  // eventos mousemove podem ser acionados fora da janela (quando a bola é arrastada para fora da tela)
  // se clientX/clientY estiverem fora da janela, então elementFromPoint retorna null
  if (!elemBelow) return;

  // possíveis soltáveis são marcados com a classe "droppable" (pode haver outra lógica)
  let droppableBelow = elemBelow.closest('.droppable');

  if (currentDroppable != droppableBelow) {
    // estamos voando para dentro ou para fora...
    // note: ambos os valores podem ser null
    //   currentDroppable=null se não estávamos sobre um soltável antes deste evento (ex: sobre um espaço vazio)
    //   droppableBelow=null se não estamos sobre um soltável agora, durante este evento

    if (currentDroppable) {
      // a lógica para processar "voar para fora" do soltável (remove o destaque)
      leaveDroppable(currentDroppable);
    }
    currentDroppable = droppableBelow;
    if (currentDroppable) {
      // a lógica para processar "voar para dentro" do soltável
      enterDroppable(currentDroppable);
    }
  }
}
```

No exemplo abaixo, quando a bola é arrastada sobre o gol de futebol, o gol é destacado.

[codetabs height=250 src="ball4"]

Agora temos o "alvo de soltura" atual, sobre o qual estamos voando, na variável `currentDroppable` durante todo o processo, e podemos usá-lo para destacar ou qualquer outra coisa.

## Resumo

Consideramos um algoritmo básico de Drag'n'Drop.

Os componentes principais:

1. Fluxo de eventos: `ball.mousedown` -> `document.mousemove` -> `ball.mouseup` (não se esqueça de cancelar o `ondragstart` nativo).
2. No início do arrasto -- lembre o deslocamento inicial do cursor em relação ao elemento: `shiftX/shiftY` e mantenha-o durante o arrasto.
3. Detecte elementos soltáveis sob o cursor usando `document.elementFromPoint`.

Podemos construir muita coisa sobre essa base.

- No `mouseup` podemos finalizar a soltura de forma inteligente: mudar dados, mover elementos.
- Podemos destacar os elementos sobre os quais estamos voando.
- Podemos limitar o arrasto a uma certa área ou direção.
- Podemos usar delegação de eventos para `mousedown/up`. Um manipulador de evento de área grande que verifica `event.target` pode gerenciar o Drag'n'Drop para centenas de elementos.
- E assim por diante.

Há frameworks que constroem arquitetura sobre isso: `DragZone`, `Droppable`, `Draggable` e outras classes. A maioria deles faz coisas parecidas com o que foi descrito acima, então deve ser fácil entendê-los agora. Ou crie o seu próprio, já que você pode ver que isso é fácil o suficiente de fazer, às vezes mais fácil do que adaptar uma solução de terceiros.
