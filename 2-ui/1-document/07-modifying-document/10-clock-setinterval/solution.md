Primeiro, vamos fazer o HTML/CSS.

Cada componente da hora ficaria ótimo em seu próprio `<span>`:

```html
<div id="clock">
  <span class="hour">hh</span>:<span class="min">mm</span>:<span class="sec">ss</span>
</div>
```

Também vamos precisar de CSS para colori-los.

A função `update` vai atualizar o relógio, sendo chamada pelo `setInterval` a cada segundo:

```js
function update() {
  let clock = document.getElementById('clock');
*!*
  let date = new Date(); // (*)
*/!*
  let hours = date.getHours();
  if (hours < 10) hours = '0' + hours;
  clock.children[0].innerHTML = hours;

  let minutes = date.getMinutes();
  if (minutes < 10) minutes = '0' + minutes;
  clock.children[1].innerHTML = minutes;

  let seconds = date.getSeconds();
  if (seconds < 10) seconds = '0' + seconds;
  clock.children[2].innerHTML = seconds;
}
```

Na linha `(*)` verificamos a data atual a cada vez. As chamadas a `setInterval` não são confiáveis: podem acontecer com atrasos.

As funções que gerenciam o relógio:

```js
let timerId;

function clockStart() { // inicia o relógio  
  if (!timerId) { // só define um novo intervalo se o relógio não estiver em execução
    timerId = setInterval(update, 1000);
  }
  update(); // (*)
}

function clockStop() {
  clearInterval(timerId);
  timerId = null; // (**)
}
```

Note que a chamada a `update()` não é apenas agendada em `clockStart()`, mas também executada imediatamente na linha `(*)`. Caso contrário, o visitante teria que esperar até a primeira execução do `setInterval`. E o relógio ficaria vazio até então.

Também é importante definir um novo intervalo em `clockStart()` apenas quando o relógio não estiver em execução. Caso contrário, clicar no botão de início várias vezes definiria múltiplos intervalos simultâneos. Pior ainda - manteríamos apenas o `timerID` do último intervalo, perdendo as referências a todos os outros. Então nunca mais conseguiríamos parar o relógio! Note que precisamos limpar o `timerID` quando o relógio é parado na linha `(**)`, para que ele possa ser iniciado novamente ao executar `clockStart()`.
