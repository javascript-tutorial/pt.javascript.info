# Estilos e classes

Antes de entrarmos nas maneiras do JavaScript lidar com estilos e classes, aqui está uma regra importante, esperamos que seja bastante óbvio, mas ainda temos que mencioná-lo.

Geralmente, existem duas maneiras de estilizar um elemento:

1. Criar uma classe no CSS e adicioná-la a um elemento: `<div class="...">`
2. Escrever as propriedades diretamente no atributo `style`: `<div style="...">`.

O JavaScript pode modificar tanto as classes quanto a propriedade `style`.

Devemos sempre preferir classes CSS no lugar do atributo `style`. Este último só deve ser usado se as classes "não conseguirem lidar com a estilização".

Por exemple, `style` é aceitável se calculamos as coordenadas de um elemento dinamicamente e queremos defini-las a partir do JavaScript, dessa maneira:

```js
let top = /* cálculos complexos */;
let left = /* cálculos complexos */;

elem.style.left = left; // por exemplo, '123px', calculado em tempo de execução
elem.style.top = top; // por exemplo, '456px'
```

Em outros casos, como deixar o texto vermelho, adicionar um ícone de fundo, descreva isso usando CSS e então adicione a classe (o JavaScript pode fazer isso). Isso é mais flexível e mais fácil de manter.

## className e classList

Alterar uma classe é uma das ações mais utilizadas em scripts.

Antigamente, havia uma limitação no JavaScript: uma palavra reservada como `"class"` não poderia ser uma propriedade de objeto. Esta limitação não existe hoje, porém naquela época era impossível haver uma propriedade `"class"`, como `elem.class`.

Portanto, para classes, uma propriedade semelhante, `"className"`, foi introduzida: o `elem.className` corresponde ao atributo `"class"`.

Por exemplo:

```html run
<body class="main page">
  <script>
    alert(document.body.className); // página principal
  </script>
</body>
```

Se atribuirmos algo a `elem.className`, isto substituirá toda a sequência de classes. Às vezes é disso que precisamos, mas muitas vezes queremos adicionar ou remover uma única classe.

Existe outra propriedade para isso `elem.classList`.

O `elem.classList` é um objeto especial com métodos para `adicionar/remover/alternar` uma única classe.

Por exemplo:

```html run
<body class="main page">
  <script>
*!*
    // adiciona uma classe
    document.body.classList.add('article');
*/!*

    alert(document.body.className); // class article da página principal
  </script>
</body>
```

Então, podemos manipular tanto a string de classes completa usando `className` quanto classes individuais usando `classList`. A escolha depende das nossas necessidades.

Métodos de `classList`:

- `elem.classList.add/remove("class")` -- adiciona/remove a classe.
- `elem.classList.toggle("class")` -- adiciona a classe se ela não existir, caso contrário a remove.
- `elem.classList.contains("class")` -- verifica se a classe especificada existe, retorna `true/false`.

Além disso, `classList` é iterável, então podemos listar todas as classes com `for..of`, assim:

```html run
<body class="main page">
  <script>
    for (let name of document.body.classList) {
      alert(name); // main, e depois page
    }
  </script>
</body>
```

## Estilo do elemento

A propriedade `elem.style` é um objeto que corresponde ao que está escrito no atributo `"style"`. Definir `elem.style.width="100px"` funciona da mesma maneira como se nós tivéssemos uma string `width:100px` no atributo `style`.

Para propriedades de múltiplas palavras, o camelCase é utilizado:

```js no-beautify
background-color  => elem.style.backgroundColor
z-index           => elem.style.zIndex
border-left-width => elem.style.borderLeftWidth
```

Por exemplo:

```js run
document.body.style.backgroundColor = prompt('background color?', 'green');
```

````smart header="Propriedades pré-fixadas"
Propriedades com prefixo de navegador como `-moz-border-radius`, `-webkit-border-radius` também segue a mesma regra: um traço indica uma letra maiúscula.

Por exemplo:

```js
button.style.MozBorderRadius = '5px';
button.style.WebkitBorderRadius = '5px';
```
````

## Redefinindo a propriedade de estilo

Às vezes queremos atribuir uma propriedade de estilo, e depois removê-la.

Por exemplo, para esconder um elemento, podemos definir `elem.style.display = "none"`.

Depois, podemos querer remover o `style.display` como se não estivesse sido definido. Em vez de `delete elem.style.display`, devemos atribuir uma string vazia a ele: `elem.style.display = ""`.

```js run
// Se executarmos esse código o <body> irá piscar.
document.body.style.display = "none"; // esconder

setTimeout(() => document.body.style.display = "", 1000); // de volta ao normal
```
Se definirmos `style.display` como uma string vazia o navegador aplicará classes CSS e seus estilos nativos normalmente, como se, de fato, não existisse nenhuma propriedade `style.display`.

Também existe um método especial para isso, `elem.style.removeProperty('style property')`. Assim, podemos remover uma propriedade desta forma:

```js run
document.body.style.background = 'red'; // define a cor de fundo para vermelho

setTimeout(() => document.body.style.removeProperty('background'), 1000); // remove o fundo após um segundo
```

````smart header="Reescrita completa com `style.cssText`"
Normalmente, usamos `style.*` para atribuir propriedades de estilos individuais. Não podemos definir o estilo completo como `div.style="color: red; width: 100px"`, pois `div.style` é um objeto sendo somente para leitura.

Para definir o estilo completo como uma string, existe uma propriedade especial `style.cssText`:
```html run
<div id="div">Button</div>

<script>
  // podemos definir flags de estilo especiais como "important" aqui
  div.style.cssText=`color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
  `;

  alert(div.style.cssText);
</script>
```
Esta propriedade é raramente usada, pois, a atribuição remove todos os estilos existentes: ela não adiciona, mas os substitui. Pode ocasionalmente deletar algo necessário. Mas podemos usá-la com segurança para elementos novos, quando sabemos que não vamos deletar um estilo existente.

O mesmo pode ser alcançado definindo um atributo: `div.setAttribute('style', 'color: red...')`.
````

## Fique atento às unidades

Não se esqueça de adicionar as unidades CSS aos valores.

Por exemplo, não devemos definir `elem.style.top` como `10`, mas sim como `10px`. Caso contrário, não funcionará:

```html run height=100
<body>
  <script>
  *!*
    // não funciona!
    document.body.style.margin = 20;
    alert(document.body.style.margin); // '' (string vazia, a atribuição é ignorada)
  */!*

    // agora adiciona a unidade CSS (px) - e funciona
    document.body.style.margin = '20px';
    alert(document.body.style.margin); // 20px

    alert(document.body.style.marginTop); // 20px
    alert(document.body.style.marginLeft); // 20px
  </script>
</body>
```
Repare: o navegador "descompacta" a propriedade `style.margin` nas últimas linhas e infere `style.marginLeft` e `style.marginTop` a partir dela.

## Estilos computados: getComputedStyle

Portanto, modificar um estilo é fácil. Mas como lê-lo?

Por exemplo, queremos saber o tamanho, as margens e a cor de um elemento. Como fazer isso?

**A propriedade `style` opera apenas no valor do atributo `"style"`, sem qualquer cascata CSS.**

Então, não podemos ler nada que venha de classes CSS usando `elem.style`.

Por exemplo, aqui `style` não consegue ver a margem:

```html run height=60 no-beautify
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  O texto vermelho
  <script>
*!*
    alert(document.body.style.color); // vazio
    alert(document.body.style.marginTop); // vazio
*/!*
  </script>
</body>
```
...Mas e se precisarmos, por exemplo, aumentar a margem em `20px`? Nós iriamos querer o valor atual dela.

Existe um outro método para isso: `getComputedStyle`.

A sintaxe é:

```js
getComputedStyle(element, [pseudo])
```

element
: O elemento para ler o valor.

pseudo
: Um pseudo-elemento, se necessário, como por exemplo `::before`. Uma string vazia ou a ausência de argumento indica o próprio elemento.

O resultado é um objeto com estilos, como `elem.style`, mas agora considerando todas as classes CSS.

Por exemplo:

```html run height=100
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  <script>
    let computedStyle = getComputedStyle(document.body);

    // agora podemos ler a margem e a cor a partir dele

    alert( computedStyle.marginTop ); // 5px
    alert( computedStyle.color ); // rgb(255, 0, 0)
  </script>

</body>
```

```smart header="Valores computados e resolvidos"
Existem dois conceitos no [CSS](https://drafts.csswg.org/cssom/#resolved-values):

1. Um valor de estilo *computado* é o valor depois que todas as regras e heranças do CSS são aplicadas, como resultado da cascata CSS. Pode parecer com `height:1em` ou `font-size:125%`.
2. Um estilo *resolvido* é aquele finalmente aplicado ao element. Valores como  `1em` ou `125%` são relativos. O navegador pega o valor computado e converte todas as unidades para fixas ou absoluta, por exemplo: `height:20px` ou `font-size:16px`. Para propriedades geométricas, os valores resolvidos podem ter ponto flutuante, como `width:50.5px`.

Há muito tempo, `getComputedStyle` foi criado para obter valores computados, mas acabou sendo mais conveniente obter valores resolvidos, e o padrão mudou.

Portanto, hoje em dia, `getComputedStyle` na verdade retorna o valor resolvido da propriedade, normalmente em `px` para propriedades geométricas.
```

````warn header="`getComputedStyle` requer o nome completo da propriedade"
Devemos sempre solicitar a propriedade exata que queremos, como `paddingLeft`, `marginTop` ou `borderTopWidth`. Caso contrário, o resultado correto não é garantido.

Por exemplo, se existem propriedades `paddingLeft/paddingTop`, então o que deveríamos obter para `getComputedStyle(elem).padding`? Nada, ou talvez um valor "gerado" a partir de propriedades de paddings conhecidos? Não há uma regra padrão aqui.

````

```smart header="Os estilos aplicados a links `:visited` são ocultados!"

Links visitados podem ser coloridos usando a pseudo-classe CSS `:visited`.

No entanto, `getComputedStyle` não dá acesso a essa cor, pois, caso contrário, uma página arbitrária poderia descobrir se o usuário visitou um link ao criá-lo na página e verificar os estilos.

O JavaScript pode não conseguir visualizar os estilos aplicados pela pseudo-classe `:visited`. Além disso, existe uma limitação no CSS que proíbe a aplicação de estilos que alteram a geometria em `:visited`. Isso garante que não haja uma maneira indireta de uma página mal-intencionada testar se um link foi visitado e, assim, quebrar a privacidade.
```

## Resumo

Para gerenciar classes, existem duas propriedades do DOM:

- `className` -- o valor em string, bom para gerenciar o conjunto inteiro de classes.
- `classList` -- o objeto com os métodos `add/remove/toggle/contains`, bom para classes individuais.

Para modificar os estilos:

- A propriedade `style` é um objeto com estilos em camelCase. Ler e escrever nela tem equivale a modificar propriedades individuais no atributo `"style"`. Para ver como aplicar `important` e outras coisas raras há uma lista de métodos no [MDN](mdn:api/CSSStyleDeclaration)

- A propriedade `style.cssText` corresponde a atributo `"style"` inteiro, a string completa de estilos.

Para ler os estilos resolvidos (considerando todas as classes, após a aplicação de todo o CSS e cálculo dos valores finais):

- A função getComputedStyle(elem, [pseudo]) retorna um objeto que contém os estilos finais do elemento, e é somente leitura.
