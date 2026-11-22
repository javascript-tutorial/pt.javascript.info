
# HTML/CSS
Primeiro vamos criar o HTML/CSS.

Um menu é um componente gráfico independente na página, então é melhor colocá-lo em um único elemento do DOM.

Uma lista de itens do menu pode ser organizada como uma lista `ul/li`.

Aqui está a estrutura de exemplo:

```html
<div class="menu">
  <span class="title">Doces (clique em mim)!</span>
  <ul>
    <li>Bolo</li>
    <li>Rosquinha</li>
    <li>Mel</li>
  </ul>
</div>
```

Usamos `<span>` para o título, porque `<div>` tem um `display:block` implícito, e vai ocupar 100% da largura horizontal.

Assim:

```html autorun height=50
<div style="border: solid red 1px" onclick="alert(1)">Doces (clique em mim)!</div>
```

Então, se definirmos `onclick` nele, ele vai capturar cliques à direita do texto.

Como `<span>` tem um `display: inline` implícito, ele ocupa exatamente o espaço suficiente para caber todo o texto:

```html autorun height=50
<span style="border: solid red 1px" onclick="alert(1)">Doces (clique em mim)!</span>
```

# Alternando o menu

Alternar o menu deve mudar a seta e mostrar/ocultar a lista do menu.

Todas essas mudanças são perfeitamente tratadas pelo CSS. Em JavaScript devemos sinalizar o estado atual do menu adicionando/removendo a classe `.open`.

Sem ela, o menu ficará fechado:

```css
.menu ul {
  margin: 0;
  list-style: none;
  padding-left: 20px;
  display: none;
}

.menu .title::before {
  content: '▶ ';
  font-size: 80%;
  color: green;
}
```

...E com `.open` a seta muda e a lista aparece:

```css
.menu.open .title::before {
  content: '▼ ';
}

.menu.open ul {
  display: block;
}
```
