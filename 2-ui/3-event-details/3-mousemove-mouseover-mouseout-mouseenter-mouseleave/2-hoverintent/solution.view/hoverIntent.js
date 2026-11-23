'use strict';

class HoverIntent {

  constructor({
    sensitivity = 0.1, // velocidade menor que 0.1px/ms significa "passando o mouse sobre um elemento"
    interval = 100,    // medir a velocidade do mouse uma vez a cada 100ms
    elem,
    over,
    out
  }) {
    this.sensitivity = sensitivity;
    this.interval = interval;
    this.elem = elem;
    this.over = over;
    this.out = out;

    // garante que "this" seja o objeto nos manipuladores de evento.
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);

    // e na função de medição de tempo (chamada a partir de setInterval)
    this.trackSpeed = this.trackSpeed.bind(this);

    elem.addEventListener("mouseover", this.onMouseOver);

    elem.addEventListener("mouseout", this.onMouseOut);

  }

  onMouseOver(event) {

    if (this.isOverElement) {
      // se já estamos sobre o elemento, então ignoramos o evento
      // já estamos medindo a velocidade
      return;
    }

    this.isOverElement = true;

    // depois de cada mousemove vamos verificar a distância
    // entre as coordenadas anteriores e as atuais do mouse
    // se for menor que a sensibilidade, então a velocidade é baixa

    this.prevX = event.pageX;
    this.prevY = event.pageY;
    this.prevTime = Date.now();

    elem.addEventListener('mousemove', this.onMouseMove);
    this.checkSpeedInterval = setInterval(this.trackSpeed, this.interval);
  }

  onMouseOut(event) {
    // se deixou o elemento
    if (!event.relatedTarget || !elem.contains(event.relatedTarget)) {
      this.isOverElement = false;
      this.elem.removeEventListener('mousemove', this.onMouseMove);
      clearInterval(this.checkSpeedInterval);
      if (this.isHover) {
        // se houve uma parada sobre o elemento
        this.out.call(this.elem, event);
        this.isHover = false;
      }
    }
  }

  onMouseMove(event) {
    this.lastX = event.pageX;
    this.lastY = event.pageY;
    this.lastTime = Date.now();
  }

  trackSpeed() {

    let speed;

    if (!this.lastTime || this.lastTime == this.prevTime) {
      // o cursor não se moveu
      speed = 0;
    } else {
      speed = Math.sqrt(
        Math.pow(this.prevX - this.lastX, 2) +
        Math.pow(this.prevY - this.lastY, 2)
      ) / (this.lastTime - this.prevTime);
    }

    if (speed < this.sensitivity) {
      clearInterval(this.checkSpeedInterval);
      this.isHover = true;
      this.over.call(this.elem);
    } else {
      // velocidade alta, lembra as novas coordenadas como as anteriores
      this.prevX = this.lastX;
      this.prevY = this.lastY;
      this.prevTime = this.lastTime;
    }
  }

  destroy() {
    elem.removeEventListener('mousemove', this.onMouseMove);
    elem.removeEventListener('mouseover', this.onMouseOver);
    elem.removeEventListener('mouseout', this.onMouseOut);
  }

}
