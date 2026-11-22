# Tamanhos e rolagem da janela

Como encontramos a largura e a altura da janela do navegador? Como obtemos a largura e a altura completas do documento, incluindo a parte rolada para fora? Como rolamos a página usando JavaScript?

Para esse tipo de informação, podemos usar o elemento raiz do documento `document.documentElement`, que corresponde à tag `<html>`. Mas há métodos adicionais e peculiaridades a considerar.

## Largura/altura da janela

Para obter a largura e a altura da janela, podemos usar `clientWidth/clientHeight` de `document.documentElement`:

![](document-client-width-height.svg)

```online
Por exemplo, este botão mostra a altura da sua janela:

<button onclick="alert(document.documentElement.clientHeight)">alert(document.documentElement.clientHeight)</button>
```

````warn header="Não `window.innerWidth/innerHeight`"
Os navegadores também suportam propriedades como `window.innerWidth/innerHeight`. Elas parecem ser o que queremos, então por que não usá-las?

Se existe uma barra de rolagem, e ela ocupa algum espaço, `clientWidth/clientHeight` fornecem a largura/altura sem ela (subtraindo-a). Em outras palavras, elas retornam a largura/altura da parte visível do documento, disponível para o conteúdo.

`window.innerWidth/innerHeight` inclui a barra de rolagem.

Se há uma barra de rolagem, e ela ocupa algum espaço, então essas duas linhas mostram valores diferentes:
```js run
alert( window.innerWidth ); // largura completa da janela
alert( document.documentElement.clientWidth ); // largura da janela menos a barra de rolagem
```

Na maioria dos casos, precisamos da largura *disponível* da janela para desenhar ou posicionar algo dentro das barras de rolagem (se houver alguma), então devemos usar `documentElement.clientHeight/clientWidth`.
````

```warn header="`DOCTYPE` é importante"
Note: as propriedades de geometria de nível superior podem funcionar de forma um pouco diferente quando não há `<!DOCTYPE HTML>` no HTML. Coisas estranhas são possíveis.

No HTML moderno devemos sempre escrever o `DOCTYPE`.
```

## Largura/altura do documento

Teoricamente, como o elemento raiz do documento é `document.documentElement`, e ele envolve todo o conteúdo, poderíamos medir o tamanho completo do documento como `document.documentElement.scrollWidth/scrollHeight`.

Mas nesse elemento, para a página como um todo, essas propriedades não funcionam como esperado. No Chrome/Safari/Opera, se não houver rolagem, então `documentElement.scrollHeight` pode ser até menor que `documentElement.clientHeight`! Estranho, não é?

Para obter de forma confiável a altura completa do documento, devemos pegar o máximo entre essas propriedades:

```js run
let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

alert('Altura completa do documento, com a parte rolada para fora: ' + scrollHeight);
```

Por que isso acontece? Melhor nem perguntar. Essas inconsistências vêm de tempos antigos, não de uma lógica "inteligente".

## Obtenha a rolagem atual [#page-scroll]

Os elementos do DOM têm seu estado de rolagem atual em suas propriedades `scrollLeft/scrollTop`.

Para a rolagem do documento, `document.documentElement.scrollLeft/scrollTop` funciona na maioria dos navegadores, exceto nos mais antigos baseados em WebKit, como o Safari (bug [5991](https://bugs.webkit.org/show_bug.cgi?id=5991)), onde devemos usar `document.body` em vez de `document.documentElement`.

Felizmente, não precisamos lembrar dessas peculiaridades, porque a rolagem está disponível nas propriedades especiais `window.pageXOffset/pageYOffset`:

```js run
alert('Rolagem atual a partir do topo: ' + window.pageYOffset);
alert('Rolagem atual a partir da esquerda: ' + window.pageXOffset);
```

Essas propriedades são apenas leitura.

```smart header="Também disponível como as propriedades `scrollX` e `scrollY` de `window`"
Por razões históricas, ambas as propriedades existem, mas são a mesma coisa:
- `window.pageXOffset` é outro nome para `window.scrollX`.
- `window.pageYOffset` é outro nome para `window.scrollY`.
```

## Rolagem: scrollTo, scrollBy, scrollIntoView [#window-scroll]

```warn
Para rolar a página com JavaScript, seu DOM deve estar completamente construído.

Por exemplo, se tentarmos rolar a página com um script no `<head>`, não vai funcionar.
```

Elementos comuns podem ser rolados alterando `scrollTop/scrollLeft`.

Podemos fazer o mesmo para a página usando `document.documentElement.scrollTop/scrollLeft` (exceto no Safari, onde `document.body.scrollTop/Left` deve ser usado em vez disso).

Alternativamente, há uma solução mais simples e universal: os métodos especiais [window.scrollBy(x,y)](mdn:api/Window/scrollBy) e [window.scrollTo(pageX,pageY)](mdn:api/Window/scrollTo).

- O método `scrollBy(x,y)` rola a página *em relação à sua posição atual*. Por exemplo, `scrollBy(0,10)` rola a página `10px` para baixo.

    ```online
    O botão abaixo demonstra isso:

    <button onclick="window.scrollBy(0,10)">window.scrollBy(0,10)</button>
    ```
- O método `scrollTo(pageX,pageY)` rola a página *para coordenadas absolutas*, de forma que o canto superior esquerdo da parte visível tenha coordenadas `(pageX, pageY)` em relação ao canto superior esquerdo do documento. É como definir `scrollLeft/scrollTop`.

    Para rolar até o início, podemos usar `scrollTo(0,0)`.

    ```online
    <button onclick="window.scrollTo(0,0)">window.scrollTo(0,0)</button>
    ```

Esses métodos funcionam da mesma forma em todos os navegadores.

## scrollIntoView

Para completar, vamos abordar mais um método: [elem.scrollIntoView(top)](mdn:api/Element/scrollIntoView).

A chamada a `elem.scrollIntoView(top)` rola a página para fazer `elem` ficar visível. Ela tem um argumento:

- Se `top=true` (esse é o padrão), então a página será rolada para fazer `elem` aparecer no topo da janela. A borda superior do elemento será alinhada com o topo da janela.
- Se `top=false`, então a página rola para fazer `elem` aparecer na parte de baixo. A borda inferior do elemento será alinhada com a parte de baixo da janela.

```online
O botão abaixo rola a página para se posicionar no topo da janela:

<button onclick="this.scrollIntoView()">this.scrollIntoView()</button>

E este botão rola a página para se posicionar na parte de baixo:

<button onclick="this.scrollIntoView(false)">this.scrollIntoView(false)</button>
```

## Impedindo a rolagem

Às vezes precisamos tornar o documento "não rolável". Por exemplo, quando precisamos cobrir a página com uma mensagem grande que requer atenção imediata, e queremos que o visitante interaja com essa mensagem, não com o documento.

Para tornar o documento não rolável, basta definir `document.body.style.overflow = "hidden"`. A página vai "congelar" na sua posição de rolagem atual.

```online
Tente:

<button onclick="document.body.style.overflow = 'hidden'">document.body.style.overflow = 'hidden'</button>

<button onclick="document.body.style.overflow = ''">document.body.style.overflow = ''</button>

O primeiro botão congela a rolagem, enquanto o segundo a libera.
```

Podemos usar a mesma técnica para congelar a rolagem de outros elementos, não só de `document.body`.

A desvantagem desse método é que a barra de rolagem desaparece. Se ela ocupava algum espaço, então esse espaço fica livre e o conteúdo "salta" para preenchê-lo.

Isso parece um pouco estranho, mas pode ser contornado se compararmos `clientWidth` antes e depois do congelamento. Se ele aumentou (a barra de rolagem desapareceu), então adicione `padding` a `document.body` no lugar da barra de rolagem para manter a largura do conteúdo a mesma.

## Resumo

Geometria:

- Largura/altura da parte visível do documento (largura/altura da área de conteúdo): `document.documentElement.clientWidth/clientHeight`
- Largura/altura de todo o documento, com a parte rolada para fora:

    ```js
    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    ```

Rolagem:

- Ler a rolagem atual: `window.pageYOffset/pageXOffset`.
- Alterar a rolagem atual:

    - `window.scrollTo(pageX,pageY)` -- coordenadas absolutas,
    - `window.scrollBy(x,y)` -- rola em relação ao local atual,
    - `elem.scrollIntoView(top)` -- rola para fazer `elem` ficar visível (alinhando com o topo/a parte de baixo da janela).
