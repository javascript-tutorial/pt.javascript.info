# Eventos de ponteiro

Eventos de ponteiro são uma forma moderna de tratar entrada de uma variedade de dispositivos apontadores, como um mouse, uma pena/stylus, uma tela sensível ao toque, e assim por diante.

## Um breve histórico

Vamos fazer uma pequena visão geral, para que você entenda o panorama geral e o lugar dos Eventos de Ponteiro entre os outros tipos de evento.

- Há muito tempo, no passado, havia apenas eventos de mouse.

    Então os dispositivos de toque se tornaram difundidos, celulares e tablets em particular. Para que os scripts existentes funcionassem, eles geravam (e ainda geram) eventos de mouse. Por exemplo, tocar numa tela sensível ao toque gera `mousedown`. Então os dispositivos de toque funcionavam bem com páginas web.

    Mas dispositivos de toque têm mais capacidades do que um mouse. Por exemplo, é possível tocar em múltiplos pontos ao mesmo tempo ("multi-touch"). Porém, eventos de mouse não têm as propriedades necessárias para tratar tais multi-touches.

- Então eventos de toque foram introduzidos, como `touchstart`, `touchend`, `touchmove`, que têm propriedades específicas de toque (não os cobrimos em detalhes aqui, porque os eventos de ponteiro são ainda melhores).

    Ainda assim, não era suficiente, já que há muitos outros dispositivos, como penas, que têm suas próprias características. Além disso, escrever código que escuta tanto eventos de toque quanto de mouse era incômodo.

- Para resolver essas questões, o novo padrão Eventos de Ponteiro foi introduzido. Ele fornece um único conjunto de eventos para todos os tipos de dispositivos apontadores.

Atualmente, a especificação [Pointer Events Level 2](https://www.w3.org/TR/pointerevents2/) é suportada em todos os principais navegadores, enquanto a mais nova [Pointer Events Level 3](https://w3c.github.io/pointerevents/) está em desenvolvimento e é majoritariamente compatível com a Pointer Events level 2.

A menos que você desenvolva para navegadores antigos, como o Internet Explorer 10, ou para o Safari 12 ou anterior, não há mais motivo para usar eventos de mouse ou de toque -- podemos trocar para eventos de ponteiro.

Então seu código vai funcionar bem tanto com dispositivos de toque quanto de mouse.

Com isso dito, há algumas peculiaridades importantes que é bom saber para usar os Eventos de Ponteiro corretamente e evitar surpresas. Vamos anotá-las neste artigo.

## Tipos de evento de ponteiro

Eventos de ponteiro são nomeados de forma parecida com eventos de mouse:

| Evento de ponteiro | Evento de mouse parecido |
|---------------|-------------|
| `pointerdown` | `mousedown` |
| `pointerup` | `mouseup` |
| `pointermove` | `mousemove` |
| `pointerover` | `mouseover` |
| `pointerout` | `mouseout` |
| `pointerenter` | `mouseenter` |
| `pointerleave` | `mouseleave` |
| `pointercancel` | - |
| `gotpointercapture` | - |
| `lostpointercapture` | - |

Como podemos ver, para cada `mouse<event>`, há um `pointer<event>` que desempenha um papel parecido. Também há 3 eventos de ponteiro adicionais que não têm uma contraparte `mouse...` correspondente, vamos explicá-los em breve.

```smart header="Substituindo `mouse<event>` por `pointer<event>` no nosso código"
Podemos substituir eventos `mouse<event>` por `pointer<event>` no nosso código e esperar que as coisas continuem funcionando bem com o mouse.

O suporte para dispositivos de toque também vai melhorar "magicamente". Porém, talvez precisemos adicionar `touch-action: none` em alguns lugares no CSS. Vamos cobrir isso abaixo na seção sobre `pointercancel`.
```

## Propriedades do evento de ponteiro

Eventos de ponteiro têm as mesmas propriedades que eventos de mouse, como `clientX/Y`, `target`, etc., mais algumas outras:

- `pointerId` - o identificador único do ponteiro que está causando o evento.

    Gerado pelo navegador. Nos permite tratar múltiplos ponteiros, como uma tela sensível ao toque com stylus e multi-touch (exemplos virão a seguir).
- `pointerType` - o tipo do dispositivo apontador. Deve ser uma string, uma de: "mouse", "pen" ou "touch".

    Podemos usar essa propriedade para reagir de forma diferente a vários tipos de ponteiro.
- `isPrimary` - é `true` para o ponteiro primário (o primeiro dedo num multi-touch).

Alguns dispositivos apontadores medem área de contato e pressão, por exemplo para um dedo na tela sensível ao toque, há propriedades adicionais para isso:

- `width` - a largura da área onde o ponteiro (por exemplo, um dedo) toca o dispositivo. Onde não suportado, por exemplo para um mouse, é sempre `1`.
- `height` - a altura da área onde o ponteiro toca o dispositivo. Onde não suportado, é sempre `1`.
- `pressure` - a pressão da ponta do ponteiro, num intervalo de 0 a 1. Para dispositivos que não suportam pressão, deve ser `0.5` (pressionado) ou `0`.
- `tangentialPressure` - a pressão tangencial normalizada.
- `tiltX`, `tiltY`, `twist` - propriedades específicas de pena que descrevem como a pena está posicionada em relação à superfície.

Essas propriedades não são suportadas pela maioria dos dispositivos, então são raramente usadas. Você pode encontrar os detalhes sobre elas na [especificação](https://w3c.github.io/pointerevents/#pointerevent-interface) se precisar.

## Multi-touch

Uma das coisas que os eventos de mouse simplesmente não suportam é o multi-touch: um usuário pode tocar em vários lugares ao mesmo tempo no celular ou tablet dele, ou realizar gestos especiais.

Os Eventos de Ponteiro permitem tratar o multi-touch com a ajuda das propriedades `pointerId` e `isPrimary`.

Aqui está o que acontece quando um usuário toca numa tela sensível ao toque em um lugar, e então coloca outro dedo em algum outro lugar nela:

1. No toque do primeiro dedo:
    - `pointerdown` com `isPrimary=true` e algum `pointerId`.
2. Para o segundo dedo e mais dedos (assumindo que o primeiro ainda está tocando):
    - `pointerdown` com `isPrimary=false` e um `pointerId` diferente para cada dedo.

Note bem: o `pointerId` não é atribuído ao dispositivo inteiro, mas para cada dedo que toca. Se usarmos 5 dedos para tocar a tela simultaneamente, temos 5 eventos `pointerdown`, cada um com suas respectivas coordenadas e um `pointerId` diferente.

Os eventos associados ao primeiro dedo sempre têm `isPrimary=true`.

Podemos rastrear múltiplos dedos tocando usando seus `pointerId`. Quando o usuário move e então remove um dedo, obtemos eventos `pointermove` e `pointerup` com o mesmo `pointerId` que tínhamos em `pointerdown`.

```online
Aqui está a demonstração que registra eventos `pointerdown` e `pointerup`:

[iframe src="multitouch" edit height=200]

Note bem: você precisa estar usando um dispositivo com tela sensível ao toque, como um celular ou um tablet, para realmente ver a diferença em `pointerId/isPrimary`. Para dispositivos de toque único, como um mouse, sempre haverá o mesmo `pointerId` com `isPrimary=true`, para todos os eventos de ponteiro.
```

## Evento: pointercancel

O evento `pointercancel` é acionado quando há uma interação de ponteiro em andamento, e então algo acontece que faz com que ela seja abortada, de forma que nenhum outro evento de ponteiro é gerado.

Tais causas são:
- O hardware do dispositivo apontador foi desabilitado fisicamente.
- A orientação do dispositivo mudou (o tablet foi rotacionado).
- O navegador decidiu tratar a interação por conta própria, considerando-a um gesto de mouse ou uma ação de zoom-and-pan ou outra coisa.

Vamos demonstrar o `pointercancel` num exemplo prático para ver como ele nos afeta.

Digamos que estamos implementando o drag'n'drop de uma bola, assim como no começo do artigo <info:mouse-drag-and-drop>.

Aqui está o fluxo das ações do usuário e os eventos correspondentes:

1) O usuário pressiona numa imagem, para começar a arrastar
    - o evento `pointerdown` é acionado
2) Então ele começa a mover o ponteiro (arrastando assim a imagem)
    - `pointermove` é acionado, talvez várias vezes
3) E então a surpresa acontece! O navegador tem suporte nativo de drag'n'drop para imagens, que entra em ação e assume o processo de drag'n'drop, gerando assim o evento `pointercancel`.
    - O navegador agora trata o drag'n'drop da imagem por conta própria. O usuário pode até arrastar a imagem da bola para fora do navegador, para o programa de e-mail dele ou um gerenciador de arquivos.
    - Não há mais eventos `pointermove` para nós.

Então o problema é que o navegador "sequestra" a interação: `pointercancel` é acionado no começo do processo de "drag-and-drop", e nenhum outro evento `pointermove` é gerado.

```online
Aqui está a demonstração de drag'n'drop com o registro de eventos de ponteiro (apenas `up/down`, `move` e `cancel`) na `textarea`:

[iframe src="ball" height=240 edit]
```

Gostaríamos de implementar o drag'n'drop por conta própria, então vamos dizer ao navegador para não assumir o controle.

**Previna a ação padrão do navegador para evitar o `pointercancel`.**

Precisamos fazer duas coisas:

1. Prevenir que o drag'n'drop nativo aconteça:
    - Podemos fazer isso definindo `ball.ondragstart = () => false`, assim como descrito no artigo <info:mouse-drag-and-drop>.
    - Isso funciona bem para eventos de mouse.
2. Para dispositivos de toque, há outras ações do navegador relacionadas a toque (além do drag'n'drop). Para evitar problemas com elas também:
    - Previna-as definindo `#ball { touch-action: none }` no CSS.
    - Então nosso código vai começar a funcionar em dispositivos de toque.

Depois de fazermos isso, os eventos vão funcionar como pretendido, o navegador não vai sequestrar o processo e não vai emitir `pointercancel`.

```online
Esta demonstração adiciona essas linhas:

[iframe src="ball-2" height=240 edit]

Como você pode ver, não há mais `pointercancel`.
```

Agora podemos adicionar o código para realmente mover a bola, e nosso drag'n'drop vai funcionar para dispositivos de mouse e de toque.

## Captura de ponteiro

A captura de ponteiro é uma funcionalidade especial dos eventos de ponteiro.

A ideia é bem simples, mas pode parecer bem estranha a princípio, já que nada parecido existe para qualquer outro tipo de evento.

O método principal é:
- `elem.setPointerCapture(pointerId)` -- vincula eventos com o `pointerId` dado a `elem`. Depois da chamada, todos os eventos de ponteiro com o mesmo `pointerId` vão ter `elem` como o target (como se tivessem acontecido em `elem`), não importa onde no documento eles realmente aconteceram.

Em outras palavras, `elem.setPointerCapture(pointerId)` redireciona todos os eventos subsequentes com o `pointerId` dado para `elem`.

A vinculação é removida:
- automaticamente quando os eventos `pointerup` ou `pointercancel` ocorrem,
- automaticamente quando `elem` é removido do documento,
- quando `elem.releasePointerCapture(pointerId)` é chamado.

Agora, para que isso serve? É hora de ver um exemplo da vida real.

**A captura de ponteiro pode ser usada para simplificar interações do tipo drag'n'drop.**

Vamos lembrar como podemos implementar um slider personalizado, descrito no <info:mouse-drag-and-drop>.

Podemos fazer um elemento `slider` para representar a faixa e o "controle deslizante" (`thumb`) dentro dele:

```html
<div class="slider">
  <div class="thumb"></div>
</div>
```

Com estilos, fica assim:

[iframe src="slider-html" height=40 edit]

<p></p>

E aqui está a lógica de funcionamento, como foi descrita, depois de substituir eventos de mouse por eventos de ponteiro parecidos:

1. O usuário pressiona no `thumb` do slider -- `pointerdown` é acionado.
2. Então ele move o ponteiro -- `pointermove` é acionado, e nosso código move o elemento `thumb` junto.
    - ...Conforme o ponteiro se move, ele pode deixar o elemento `thumb` do slider, ir acima ou abaixo dele. O `thumb` deve se mover estritamente na horizontal, permanecendo alinhado com o ponteiro.

Na solução baseada em eventos de mouse, para rastrear todos os movimentos do ponteiro, incluindo quando ele vai acima/abaixo do `thumb`, tínhamos que atribuir um manipulador de evento `mousemove` no `document` inteiro.

Essa não é a solução mais limpa, porém. Um dos problemas é que, quando um usuário move o ponteiro pelo documento, isso pode acionar manipuladores de evento (como `mouseover`) em outros elementos, invocar funcionalidades de UI totalmente não relacionadas, e não queremos isso.

Esse é o lugar onde o `setPointerCapture` entra em ação.

- Podemos chamar `thumb.setPointerCapture(event.pointerId)` no manipulador de `pointerdown`,
- Então os eventos de ponteiro futuros até `pointerup/cancel` serão redirecionados para `thumb`.
- Quando `pointerup` acontece (arrasto concluído), a vinculação é removida automaticamente, não precisamos nos preocupar com isso.

Então, mesmo se o usuário mover o ponteiro por todo o documento, os manipuladores de evento serão chamados em `thumb`. Apesar disso, as propriedades de coordenadas dos objetos de evento, como `clientX/clientY`, ainda estarão corretas -- a captura só afeta `target/currentTarget`.

Aqui está o código essencial:

```js
thumb.onpointerdown = function(event) {
  // redireciona todos os eventos de ponteiro (até pointerup) para thumb
  thumb.setPointerCapture(event.pointerId);

  // começa a rastrear os movimentos do ponteiro
  thumb.onpointermove = function(event) {
    // movendo o slider: escuta no thumb, já que todos os eventos de ponteiro são redirecionados para ele
    let newLeft = event.clientX - slider.getBoundingClientRect().left;
    thumb.style.left = newLeft + 'px';
  };

  // ao soltar o ponteiro, termina de rastrear os movimentos do ponteiro
  thumb.onpointerup = function(event) {
    thumb.onpointermove = null;
    thumb.onpointerup = null;
    // ...também processa o "fim do arrasto" se necessário
  };
};

// note: não é necessário chamar thumb.releasePointerCapture,
// isso acontece em pointerup automaticamente
```

```online
A demonstração completa:

[iframe src="slider" height=100 edit]

<p></p>

Na demonstração, também há um elemento adicional com manipulador de `onmouseover` mostrando a data atual.

Note bem: enquanto você está arrastando o thumb, você pode passar o mouse sobre esse elemento, e o manipulador dele *não* é acionado.

Então o arrasto agora está livre de efeitos colaterais, graças ao `setPointerCapture`.
```



No final, a captura de ponteiro nos dá dois benefícios:
1. O código se torna mais limpo já que não precisamos mais adicionar/remover manipuladores no `document` inteiro. A vinculação é liberada automaticamente.
2. Se há outros manipuladores de evento de ponteiro no documento, eles não serão acionados acidentalmente pelo ponteiro enquanto o usuário está arrastando o slider.

### Eventos de captura de ponteiro

Há mais uma coisa a mencionar aqui, por uma questão de completude.

Há dois eventos associados à captura de ponteiro:

- `gotpointercapture` é acionado quando um elemento usa `setPointerCapture` para habilitar a captura.
- `lostpointercapture` é acionado quando a captura é liberada: seja explicitamente com a chamada `releasePointerCapture`, seja automaticamente em `pointerup`/`pointercancel`.

## Resumo

Eventos de ponteiro permitem tratar eventos de mouse, toque e pena simultaneamente, com um único pedaço de código.

Eventos de ponteiro estendem eventos de mouse. Podemos substituir `mouse` por `pointer` nos nomes dos eventos e esperar que nosso código continue funcionando para o mouse, com melhor suporte para outros tipos de dispositivo.

Para drag'n'drops e interações de toque complexas que o navegador pode decidir sequestrar e tratar por conta própria -- lembre-se de cancelar a ação padrão nos eventos e definir `touch-action: none` no CSS para os elementos que envolvemos.

Habilidades adicionais dos eventos de ponteiro são:

- Suporte a multi-touch usando `pointerId` e `isPrimary`.
- Propriedades específicas de dispositivo, como `pressure`, `width/height`, e outras.
- Captura de ponteiro: podemos redirecionar todos os eventos de ponteiro para um elemento específico até `pointerup`/`pointercancel`.

Atualmente, eventos de ponteiro são suportados em todos os principais navegadores, então podemos trocar para eles com segurança, especialmente se o IE10- e o Safari 12- não forem necessários. E mesmo com esses navegadores, há polyfills que habilitam o suporte a eventos de ponteiro.
