# Animações CSS

Animações CSS nos permitem criar animações simples sem usar *Javascript*.

*Javascript* pode ser usado para controlar a animação CSS e torná-la ainda melhor com pouco código.

## Transições CSS [#css-transition]

A idéia das transições CSS é simples. Descrevemos uma propriedade e como suas mudanças devem ser animadas. Quando a propriedade muda, o navegador desenha a animação.

Isto é: tudo que precisamos fazer é mudar uma propriedade. E a transição é feita pelo navegador.

Por exemplo, o CSS abaixo anima as mudanças em `background-color` por 3 segundos:

```css
.animated {
  transition-property: background-color;
  transition-duration: 3s;
}
```

Agora, se algum elemento possui a classe `.animated`, qualquer mudança em `background-color` é animada durante 3 segundos.

Clique no botão abaixo para animar a cor de seu fundo:

```html run autorun height=60
<button id="color">Clique-me!</button>

<style>
  #color {
    transition-property: background-color;
    transition-duration: 3s;
  }
</style>

<script>
  color.onclick = function() {
    this.style.backgroundColor = 'red';
  };
</script>
```

Existem 4 propriedades que descrevem as transições CSS:

- `transition-property`
- `transition-duration`
- `transition-timing-function`
- `transition-delay`

Iremos falar delas daqui a pouco, por ora notemos que a propriedade comum `transition` permite declará-las juntas em ordem: `property duration timing-function delay`, e permite também animar várias propriedades de uma vez.

Por exemplo, esse botão anima as propriedades `color` e `font-size` ao mesmo tempo:

```html run height=80 autorun no-beautify
<button id="growing">Clique-me!</button>

<style>
#growing {
*!*
  transition: font-size 3s, color 2s;
*/!*
}
</style>

<script>
growing.onclick = function() {
  this.style.fontSize = '36px';
  this.style.color = 'red';
};
</script>
```

Agora, vamos falar de cada uma das propriedades de animação.

## transition-property

Em `transition-property`, escrevemos uma lista de propriedades para animar, por exemplo: `left`, `margin-left`, `height`, `color`.

Nem todas as propriedades podem ser animadas, mas [várias delas](http://www.w3.org/TR/css3-transitions/#animatable-properties-). O valor `all` significa "animar todas as propriedades".

## transition-duration

Em `transition-duration` especificamos quanto tempo a animação deve durar. Ele deve estar em [formato de tempo CSS](http://www.w3.org/TR/css3-values/#time): em segundos `s` ou milissegundos `ms`.

## transition-delay

Em `transition-delay` especificamos o atraso *antes* da animação começar. Por exemplo, se  `transition-delay: 1s`, então a animação começará 1 segundo após a mudança.

Valores negativos também são possíveis. Dessa forma, a animação começará do meio, como se ela já estivesse ocorrendo. Por exemplo, se `transition-duration` é `2s`, e o atraso é de `-1s`, então a animação dura 1 segundo e começa do estado que estaria na metade de seu ciclo.

Essa é uma animação que desloca números de `0` a `9` usando a propriedade CSS `translate`:

[codetabs src="digits"]

A propriedade `transform` é animada assim:

```css
#stripe.animate {
  transform: translate(-90%);
  transition-property: transform;
  transition-duration: 9s;
}
```

No exemplo acima, *Javascript* adiciona a classe `.animate` no elemento, iniciando a animação:

```js
stripe.classList.add('animate');
```

Podemos também iniciar a animação "do meio", de um número exato, por exemplo, correspondendo ao segundo atual, usando um valor negativo em `transition-delay`.

Nesse exemplo, se você clicar no dígito, ele iniciará a animação à partir do segundo atual:

[codetabs src="digits-negative-delay"]

*JavaScript* faz isso por meio de uma linha extra:

```js
stripe.onclick = function() {
  let sec = new Date().getSeconds() % 10;
*!*
  // por exemplo, -3s aqui inicia a animação à partir do terceiro segundo
  stripe.style.transitionDelay = '-' + sec + 's';
*/!*
  stripe.classList.add('animate');
};
```

## transition-timing-function

*Timing function* (função de sincronização) descreve como o processo da animação é distribuído ao longo do tempo. Por exemplo, ela deve começar devagar e depois acelerar ou vice e versa.

Essa parece ser a propriedade mais complicada à primeira vista. Mas fica simples se dedicarmos um pouco de tempo para ela.

Essa propriedade aceita dois tipos de valores: uma curva Bezier ou *steps* (passos). Vamos começar com a curva, pois ela é usada com mais frequência.

### Curva Bezier

A *timing function* pode ser setada como uma [curva Bezier](/bezier-curve) com 4 pontos de controle que satisfaça as condições:

1. Primeiro ponto de controle: `(0,0)`.
2. Último ponto de controle: `(1,1)`.
3. Para pontos intermediários, valores de `x` precisam estar no intervalo `0..1`, `y` pode ser qualquer coisa.

A sintaxe para a curva Bezier no CSS é: `cubic-bezier(x2, y2, x3, y3)`. Aqui precisamos especificar somente o segundo e o terceiro pontos de controle, porque o primeiro é fixado em `(0,0)` e o quarto, em `(1,1)`.

A *timing function* descreve o quão rápido a animação acontece no tempo:

- O eixo `x` é o tempo: `0` -- representa o início, `1` -- representa o último momento da `transition-duration`.
- O eixo `y` especifica o estado do processo: `0` -- representa o valor inicial da propriedade, `1` -- representa o valor final.

A variação mais simples é quando a animação acontece uniformemente, com a mesma velocidade linear. Ela pode ser especificada pela curva `cubic-bezier(0, 0, 1, 1)`.

A curva se assemelha à imagem abaixo:

![](bezier-linear.svg)

...Como podemos ver, é apenas uma linha reta. Conforme o tempo (`x`) passa, o estado da animação (`y`) passa de forma uniforme de `0` para `1`.

O trem no exemplo abaixo vai da esquerda para a direita com uma velocidade permanente (clique sobre ele para ver):

[codetabs src="train-linear"]

A propriedade CSS `transition` é baseada na curva:

```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, 0, 1, 1);
  /* JavaScript configura a propriedade left para 450px */
}
```

...E como podemos mostrar um trem desacelerando?

Podemos usar uma outra curva Bezier: `cubic-bezier(0.0, 0.5, 0.5 ,1.0)`.

Seu gráfico:

![](train-curve.svg)

Como podemos ver, o processo começa rápido: a curva inclina-se para o alto, e depois, inclina-se menos e menos.

Aqui está a curva em ação (clique no trem para ver):

[codetabs src="train"]

CSS:
```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, .5, .5, 1);
  /* JavaScript configura a propriedade left para 450px */
}
```

Existem várias curvas embutidas: `linear`, `ease`, `ease-in`, `ease-out` e `ease-in-out`.

A `linear` é uma abreviação para `cubic-bezier(0, 0, 1, 1)` -- uma linha reta, já a estudamos.

Outros nomes são usados como abreviações para as seguintes `cubic-bezier`:

| <code>ease</code><sup>*</sup> | <code>ease-in</code> | <code>ease-out</code> | <code>ease-in-out</code> |
|-------------------------------|----------------------|-----------------------|--------------------------|
| <code>(0.25, 0.1, 0.25, 1.0)</code> | <code>(0.42, 0, 1.0, 1.0)</code> | <code>(0, 0, 0.58, 1.0)</code> | <code>(0.42, 0, 0.58, 1.0)</code> |
| ![ease, figure](ease.svg) | ![ease-in, figure](ease-in.svg) | ![ease-out, figure](ease-out.svg) | ![ease-in-out, figure](ease-in-out.svg) |

`*` -- por padrão, se nenhuma curva é especificada, `ease` é usada.

Então, podemos usar `ease-out` para desacelerar nosso trem:


```css
.train {
  left: 0;
  transition: left 5s ease-out;
  /* transition: left 5s cubic-bezier(0, .5, .5, 1); */
}
```

Mas ele parece um pouco diferente.

**Uma curva Bezier pode fazer uma animação "pular fora" de seu alcance.**

Os pontos de controle da curva podem ter qualquer valor para a coordenada `y`: até mesmo negativo ou enorme. Então, a curva Bezier também pularia muito baixo ou muito alto, fazendo com que a animação vá além de seu alcance normal.

No exemplo abaixo, o código da animação é:
```css
.train {
  left: 100px;
  transition: left 5s cubic-bezier(.5, -1, .5, 2);
  /* JavaScript configura a propriedade left para 400px */
}
```

A propriedade `left` deve animar de `100px` para `400px`.

Mas, se você clicar no trem, verá que:

- Primeiro, o trem *volta*: `left` se torna menos que `100px`.
- Depois ele vai para frente, um pouco mais longe de `400px`.
- E depois volta novamente -- para `400px`.

[codetabs src="train-over"]

Por que isso acontece? A resposta é óbvia se olharmos para o gráfico da seguinte curva:

![](bezier-train-over.svg)

Nós movemos a coordenada `y` do segundo ponto para abaixo de zero, e para o terceiro ponto, fizemos acima de `1`, então a curva ultrapassa seu quadrante "regular". O `y` está fora de seu alcance "padrão" `0..1`.

Como sabemos, `y` mede "o estado do processo da animação". O valor `y = 0` corresponde ao valor inicial da propriedade e `y = 1` -- ao valor final. Então, o valor `y<0` move a propriedade abaixo da propriedade inicial `left` e `y>1` -- para além do valor final `left`.

Essa é uma variação "leve". Se definirmos valores de `y` como `-99` e `99` então, o trem pularia ainda mais fora de seu alcance.

Mas, como criar uma curva Bezier para uma tarefa específica? Existem várias ferramentas. Por exemplo, podemos fazer isso em <http://cubic-bezier.com/>.

### Steps (Passos)

A *Timing function* `steps(number of steps[, start/end])` nos permite separar a animação em passos.

Vamos examiná-la em um exemplo com dígitos.

Aqui está uma lista de dígitos, sem nenhuma animação, apenas a fonte:

[codetabs src="step-list"]

Nós iremos fazer com que os dígitos apareçam de uma forma discreta, tornando invisível a parte da lista fora da "janela" vermelha e deslocando a lista para a esquerda a cada passo.

Haverá 9 passos, um para cada dígito:

```css
#stripe.animate  {
  transform: translate(-90%);
  transition: transform 9s *!*steps(9, start)*/!*;
}
```

Em ação:

[codetabs src="step"]

O primeiro argumento de `steps(9, start)` é o número de passos. A transformação será dividida em 9 partes (10% cada). O intervalo de tempo é dividido automaticamente em 9 partes também, então `transition: 9s` nos dá 9 segundos para a animação inteira -- 1 segundo por dígito.

O segundo argumento é umas das duas palavras: `start`("início") ou `end`("fim").

O `start` significa que, no início da animação, precisamos executar o primeiro passo imediatamente.

Nós podemos observar isso na animação: quando clicamos no dígito, ele muda para `1` (o primeiro passo) imediatamente, e depois muda para o início do segundo passo.

O processo evolui assim:

- `0s` -- `-10%` (primeira mudança no início do primeiro segundo, imediatamente)
- `1s` -- `-20%`
- ...
- `8s` -- `-80%`
- (o último segundo mostra o valor final).

O valor alternativo `end` significaria que a mudança devesse ser aplicada não no início, mas ao final de cada segundo.

Então, o processo evoluiria assim:

- `0s` -- `0`
- `1s` -- `-10%` (primeira mudança ao final do primeiro segundo)
- `2s` -- `-20%`
- ...
- `9s` -- `-90%`

Aqui está o `steps(9, end)` em ação (note a pausa antes da primeira mudança de dígito):

[codetabs src="step-end"]

Existem também valores abreviados:

- `step-start` -- é o mesmo que `steps(1, start)`. Isto é, a animação inicia-se imediatamente e leva 1 passo. Então, ela começa e acaba imediatamente, como se não houvesse animação.
- `step-end` -- o mesmo que `steps(1, end)`: executa a animação em um único passo ao final de `transition-duration`.

Esses valores são usados raramente, porque não são realmente animações, mas sim, uma mudança de um único passo.

## Evento *transitionend* (transitado)

Quando a animação CSS é finalizada, o evento `transitionend` é disparado.

É amplamente usado para executar uma ação assim que animação é finalizada. Também podemos utilizá-lo para encadear animações.

Por exemplo, ao clicar no navio do exemplo abaixo, ele começa a navegar para frente e para trás, indo, a cada vez, mais e mais longe para a direita:

[iframe src="boat" height=300 edit link]

A animação é iniciada por meio da função `go` que é reexecutada a cada vez que a animação é finalizada:

```js
boat.onclick = function() {
  //...
  let times = 1;

  function go() {
    if (times % 2) {
      // navegue para a direita
      boat.classList.remove('back');
      boat.style.marginLeft = 100 * times + 200 + 'px';
    } else {
      // navegue para a esquerda
      boat.classList.add('back');
      boat.style.marginLeft = 100 * times - 200 + 'px';
    }

  }

  go();

  boat.addEventListener('transitionend', function() {
    times++;
    go();
  });
};
```

O objeto do evento `transitionend` possui algumas propriedades específicas:

`event.propertyName`
: A propriedade que acabou de ser animada. Pode ser útil se animarmos múltiplas propriedades ao mesmo tempo.

`event.elapsedTime`
: O tempo (em segundos) que a animação dura, sem `transition-delay`.

## Keyframes (quadros-chaves)

Nós podemos unir diversas animações simples juntas usando a regra CSS `@keyframes`.

Ela especifica o "nome" da animação e regras: o quê, quando e onde animar. Então, usando a propriedade `animation` nós anexamos a animação ao elemento e especificamos parâmetros adicionais.

Veja um exemplo com explicações:

```html run height=60 autorun="no-epub" no-beautify
<div class="progress"></div>

<style>
*!*
  @keyframes go-left-right {        /* dá um nome: "go-left-right" (vá-para-esquerda-direita) */
    from { left: 0px; }             /* anima de left: 0px */
    to { left: calc(100% - 50px); } /* anima para left: 100%-50px */
  }
*/!*

  .progress {
*!*
    animation: go-left-right 3s infinite alternate;
    /* aplica a animação "go-left-right" ao elemento
       duração de 3 segundos
       número de vezes: infinite (infinito)
       alterna a direção a cada vez
    */
*/!*

    position: relative;
    border: 2px solid green;
    width: 50px;
    height: 20px;
    background: lime;
  }
</style>
```

Existem vários artigos sobre `@keyframes` e uma [especificação detalhada](https://drafts.csswg.org/css-animations/).

Provavelmente, você não precisará de `@keyframes` regularmente, a não ser que tudo estiver em movimento constante em sua página.

## Resumo

Animações CSS permitem animar de forma suave (ou não) mudanças em uma ou diversas propriedades CSS.

Elas são úteis para a maioria das tarefas envolvendo animações. Também podemos usar *Javascript* para animações, o próximo capítulo é dedicado a isso.

Limitações de animações CSS comparadas a animações usando *JavaScript*:

```compare plus="CSS animations" minus="JavaScript animations"
+ Animações simples de forma simples.
+ Rápidas e leves para a CPU.
- Animações *Javascript* são flexíveis. Elas podem produzir qualquer lógica de animação, como a "explosão" de um elemento.
- Não são apenas as propriedades que mudam. Podemos criar novos elementos em *JavaScript* para os propósitos da animação.
```

A maioria das animações pode ser implementada usando CSS como descrito nesse capítulo. E o evento `transitionend` nos permite rodar *Javascript* após a animação, integrando-se bem com o código.

Mas, no próximo capítulo, iremos criar animações em *Javascript* para cobrir casos mais complexos.
