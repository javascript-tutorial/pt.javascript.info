'use strict';

// Aqui está um esboço resumido da classe
// com as coisas que você vai precisar de qualquer forma
class HoverIntent {

  constructor({
    sensitivity = 0.1, // velocidade menor que 0.1px/ms significa "passando o mouse sobre um elemento"
    interval = 100, // medir a velocidade do mouse uma vez a cada 100ms: calcula a distância entre o ponto anterior e o próximo
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

    // atribui os manipuladores
    elem.addEventListener("mouseover", this.onMouseOver);
    elem.addEventListener("mouseout", this.onMouseOut);

    // continue a partir deste ponto

  }

  onMouseOver(event) {
    /* ... */
  }

  onMouseOut(event) {
    /* ... */
  }

  onMouseMove(event) {
    /* ... */
  }


  destroy() {
    /* seu código para "desabilitar" a funcionalidade, remova todos os manipuladores */
    /* isso é necessário para os testes funcionarem */
  }

}
