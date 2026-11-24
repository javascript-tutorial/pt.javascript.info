
Devemos usar dois manipuladores: `document.onkeydown` e `document.onkeyup`.

Vamos criar um set `pressed = new Set()` para manter as teclas atualmente pressionadas.

O primeiro manipulador adiciona a ele, enquanto o segundo remove dele. A cada `keydown` verificamos se temos teclas suficientes pressionadas, e executamos a função se for o caso.
