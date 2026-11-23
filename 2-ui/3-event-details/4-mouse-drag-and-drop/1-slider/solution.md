Como podemos ver pelo HTML/CSS, o slider é uma `<div>` com um fundo colorido, que contém um controle deslizante -- outra `<div>` com `position:relative`.

Para posicionar o controle deslizante usamos `position:relative`, para fornecer as coordenadas relativas ao seu pai, aqui isso é mais conveniente do que `position:absolute`.

Então implementamos um Drag'n'Drop apenas horizontal com limitação pela largura.
