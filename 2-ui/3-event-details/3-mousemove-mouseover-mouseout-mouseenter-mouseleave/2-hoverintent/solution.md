
O algoritmo parece simples:
1. Colocar manipuladores `onmouseover/out` no elemento. Também é possível usar `onmouseenter/leave` aqui, mas eles são menos universais, não funcionariam se introduzíssemos delegação.
2. Quando um cursor de mouse entra no elemento, começar a medir a velocidade em `mousemove`.
3. Se a velocidade for baixa, então executar `over`.
4. Quando estamos saindo do elemento, e `over` foi executado, executar `out`.

Mas como medir a velocidade?

A primeira ideia pode ser: executar uma função a cada `100ms` e medir a distância entre as coordenadas anteriores e as novas. Se for pequena, então a velocidade é baixa.

Infelizmente, não há como obter as "coordenadas atuais do mouse" em JavaScript. Não existe uma função como `getCurrentMouseCoordinates()`.

A única forma de obter coordenadas é escutar eventos de mouse, como `mousemove`, e pegar as coordenadas do objeto do evento.

Então, vamos definir um manipulador em `mousemove` para rastrear as coordenadas e lembrá-las. E então compará-las, uma vez a cada `100ms`.

P.S. Note bem: os testes da solução usam `dispatchEvent` para ver se a tooltip funciona corretamente.
