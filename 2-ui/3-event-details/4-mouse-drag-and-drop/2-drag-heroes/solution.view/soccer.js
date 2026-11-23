let isDragging = false;

document.addEventListener('mousedown', function(event) {

  let dragElement = event.target.closest('.draggable');

  if (!dragElement) return;

  event.preventDefault();

  dragElement.ondragstart = function() {
      return false;
  };

  let coords, shiftX, shiftY;

  startDrag(dragElement, event.clientX, event.clientY);

  function onMouseUp(event) {
    finishDrag();
  };

  function onMouseMove(event) {
    moveAt(event.clientX, event.clientY);
  }

  // no início do arrasto:
  //   lembra o deslocamento inicial
  //   move o elemento para position:fixed e filho direto do body
  function startDrag(element, clientX, clientY) {
    if(isDragging) {
      return;
    }

    isDragging = true;

    document.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseup', onMouseUp);

    shiftX = clientX - element.getBoundingClientRect().left;
    shiftY = clientY - element.getBoundingClientRect().top;

    element.style.position = 'fixed';

    moveAt(clientX, clientY);
  };

  // troca para coordenadas absolutas ao final, para fixar o elemento no documento
  function finishDrag() {
    if(!isDragging) {
      return;
    }

    isDragging = false;

    dragElement.style.top = parseInt(dragElement.style.top) + window.pageYOffset + 'px';
    dragElement.style.position = 'absolute';

    document.removeEventListener('mousemove', onMouseMove);
    dragElement.removeEventListener('mouseup', onMouseUp);
  }

  function moveAt(clientX, clientY) {
    // novas coordenadas relativas à janela
    let newX = clientX - shiftX;
    let newY = clientY - shiftY;

    // verifica se as novas coordenadas estão abaixo da borda inferior da janela
    let newBottom = newY + dragElement.offsetHeight; // novo fundo

    // abaixo da janela? vamos rolar a página
    if (newBottom > document.documentElement.clientHeight) {
      // coordenada relativa à janela do fim do documento
      let docBottom = document.documentElement.getBoundingClientRect().bottom;

      // rolar o documento 10px para baixo tem um problema
      // pode rolar além do fim do documento
      // Math.min(quanto falta até o fim, 10)
      let scrollY = Math.min(docBottom - newBottom, 10);

      // os cálculos são imprecisos, pode haver erros de arredondamento que levam a rolar para cima
      // isso deveria ser impossível, corrige isso aqui
      if (scrollY < 0) scrollY = 0;

      window.scrollBy(0, scrollY);

      // um movimento rápido do mouse pode colocar o cursor além do fim do documento
      // se isso acontecer -
      // limita o novo Y pelo máximo possível (exatamente no fundo do documento)
      newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
    }

    // verifica se as novas coordenadas estão acima da borda superior da janela (lógica parecida)
    if (newY < 0) {
      // rola para cima
      let scrollY = Math.min(-newY, 10);
      if (scrollY < 0) scrollY = 0; // verifica erros de precisão

      window.scrollBy(0, -scrollY);
      // um movimento rápido do mouse pode colocar o cursor além do início do documento
      newY = Math.max(newY, 0); // newY não pode ser menor que 0
    }


    // limita o novo X dentro dos limites da janela
    // não há rolagem aqui, então é simples
    if (newX < 0) newX = 0;
    if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
      newX = document.documentElement.clientWidth - dragElement.offsetWidth;
    }

    dragElement.style.left = newX + 'px';
    dragElement.style.top = newY + 'px';
  }

});
