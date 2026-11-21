A faixa de imagens pode ser representada como uma lista `ul/li` de imagens `<img>`.

Normalmente, essa faixa é larga, mas colocamos um `<div>` de tamanho fixo em volta para "cortá-la", de forma que apenas uma parte da faixa fique visível:

![](carousel1.svg)

Para fazer a lista aparecer horizontalmente, precisamos aplicar as propriedades CSS corretas para `<li>`, como `display: inline-block`.

Para `<img>` também devemos ajustar o `display`, porque por padrão ele é `inline`. Há um espaço extra reservado sob elementos `inline` para "rabos de letras", então podemos usar `display:block` para removê-lo.

Para fazer a rolagem, podemos deslocar o `<ul>`. Há várias formas de fazer isso, por exemplo alterando `margin-left` ou (com melhor desempenho) usando `transform: translateX()`:

![](carousel2.svg)

O `<div>` externo tem uma largura fixa, então as imagens "extras" são cortadas.

O carrossel inteiro é um "componente gráfico" independente na página, então é melhor envolvê-lo em um único `<div class="carousel">` e estilizar as coisas dentro dele.
