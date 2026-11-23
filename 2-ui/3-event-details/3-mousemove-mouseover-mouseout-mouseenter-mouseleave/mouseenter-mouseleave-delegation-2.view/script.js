// <td> sob o mouse agora (se houver)
let currentElem = null;

table.onmouseover = function(event) {
  // antes de entrar num novo elemento, o mouse sempre deixa o anterior
  // se currentElem estiver definido, não deixamos o <td> anterior,
  // esse é um mouseover dentro dele, ignoramos o evento
  if (currentElem) return;

  let target = event.target.closest('td');

  // não nos movemos para dentro de um <td> - ignorar
  if (!target) return;

  // movemos para um <td>, mas fora da nossa tabela (possível em caso de tabelas aninhadas)
  // ignorar
  if (!table.contains(target)) return;

  // eba! entramos num novo <td>
  currentElem = target;
  onEnter(currentElem);
};


table.onmouseout = function(event) {
  // se estamos fora de qualquer <td> agora, então ignoramos o evento
  // isso provavelmente é um movimento dentro da tabela, mas fora de um <td>,
  // por exemplo de uma <tr> para outra <tr>
  if (!currentElem) return;

  // estamos deixando o elemento – para onde? Talvez para um descendente?
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // sobe a cadeia de pais e verifica – se ainda estamos dentro de currentElem
    // então essa é uma transição interna – ignoramos ela
    if (relatedTarget == currentElem) return;

    relatedTarget = relatedTarget.parentNode;
  }

  // deixamos o <td>. de verdade.
  onLeave(currentElem);
  currentElem = null;
};

// quaisquer funções para tratar a entrada/saída de um elemento
function onEnter(elem) {
  elem.style.background = 'pink';

  // mostra isso na área de texto
  text.value += `over -> ${currentElem.tagName}.${currentElem.className}\n`;
  text.scrollTop = 1e6;
}

function onLeave(elem) {
  elem.style.background = '';

  // mostra isso na área de texto
  text.value += `out <- ${elem.tagName}.${elem.className}\n`;
  text.scrollTop = 1e6;
}
