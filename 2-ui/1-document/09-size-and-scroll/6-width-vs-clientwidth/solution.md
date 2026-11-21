Diferenças:

1. `clientWidth` é numérico, enquanto `getComputedStyle(elem).width` retorna uma string com `px` no final.
2. `getComputedStyle` pode retornar uma largura não numérica, como `"auto"`, para um elemento inline.
3. `clientWidth` é a área de conteúdo interna do elemento mais os preenchimentos, enquanto a largura CSS (com o `box-sizing` padrão) é a área de conteúdo interna *sem os preenchimentos*.
4. Se houver uma barra de rolagem e o navegador reservar espaço para ela, alguns navegadores subtraem esse espaço da largura CSS (já que ele não está mais disponível para o conteúdo), e alguns não subtraem. A propriedade `clientWidth` é sempre a mesma: o tamanho da barra de rolagem é subtraído se ela estiver reservada.
