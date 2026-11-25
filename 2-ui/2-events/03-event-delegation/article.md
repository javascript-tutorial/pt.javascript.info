
# Delegação de eventos

Capturing e bubbling nos permitem implementar um dos padrões mais poderosos de tratamento de eventos, chamado *delegação de eventos*.

A ideia é que, se temos muitos elementos tratados de forma parecida, então, em vez de atribuir um manipulador a cada um deles -- colocamos um único manipulador no seu ancestral comum.

No manipulador, obtemos `event.target` para ver onde o evento realmente aconteceu e tratá-lo.

Vamos ver um exemplo -- o [diagrama Ba-Gua](http://en.wikipedia.org/wiki/Ba_gua), que reflete a antiga filosofia chinesa.

Aqui está:

[iframe height=350 src="bagua" edit link]

O HTML é assim:

```html
<table>
  <tr>
    <th colspan="3"><em>Bagua</em>: Direção, Elemento, Cor, Significado</th>
  </tr>
  <tr>
    <td class="nw"><strong>Noroeste</strong><br>Metal<br>Prata<br>Idosos</td>
    <td class="n">...</td>
    <td class="ne">...</td>
  </tr>
  <tr>...mais 2 linhas desse tipo...</tr>
  <tr>...mais 2 linhas desse tipo...</tr>
</table>
```

A tabela tem 9 células, mas poderia ter 99 ou 9999, não importa.

**Nossa tarefa é destacar uma célula `<td>` ao clicar.**

Em vez de atribuir um manipulador `onclick` a cada `<td>` (podem ser muitos) -- vamos configurar o manipulador "pega-tudo" no elemento `<table>`.

Ele vai usar `event.target` para obter o elemento clicado e destacá-lo.

O código:

```js
let selectedTd;

*!*
table.onclick = function(event) {
  let target = event.target; // onde foi o clique?

  if (target.tagName != 'TD') return; // não foi em TD? Então não estamos interessados

  highlight(target); // destaca
};
*/!*

function highlight(td) {
  if (selectedTd) { // remove o destaque existente, se houver
    selectedTd.classList.remove('highlight');
  }
  selectedTd = td;
  selectedTd.classList.add('highlight'); // destaca o novo td
}
```

Esse código não se importa com quantas células há na tabela. Podemos adicionar/remover `<td>` dinamicamente em qualquer momento e o destaque continuará funcionando.

Ainda assim, há uma desvantagem.

O clique pode ocorrer não no `<td>`, mas dentro dele.

No nosso caso, se olharmos dentro do HTML, podemos ver tags aninhadas dentro de `<td>`, como `<strong>`:

```html
<td>
*!*
  <strong>Noroeste</strong>
*/!*
  ...
</td>
```

Naturalmente, se um clique acontece nesse `<strong>`, então ele se torna o valor de `event.target`.

![](bagua-bubble.svg)

No manipulador `table.onclick` devemos pegar esse `event.target` e descobrir se o clique foi dentro de um `<td>` ou não.

Aqui está o código melhorado:

```js
table.onclick = function(event) {
  let td = event.target.closest('td'); // (1)

  if (!td) return; // (2)

  if (!table.contains(td)) return; // (3)

  highlight(td); // (4)
};
```

Explicações:
1. O método `elem.closest(selector)` retorna o ancestral mais próximo que corresponde ao seletor. No nosso caso, procuramos por `<td>` subindo a partir do elemento de origem.
2. Se `event.target` não estiver dentro de nenhum `<td>`, então a chamada retorna imediatamente, já que não há nada a fazer.
3. No caso de tabelas aninhadas, `event.target` pode ser um `<td>`, mas fora da nossa tabela atual. Então verificamos se é realmente o `<td>` *da nossa tabela*.
4. E, se for, então o destacamos.

Como resultado, temos um código de destaque rápido e eficiente, que não se importa com o número total de `<td>` na tabela.

## Exemplo de delegação: ações na marcação

Há outros usos para a delegação de eventos.

Digamos que queremos fazer um menu com botões "Salvar", "Carregar", "Buscar" e assim por diante. E há um objeto com métodos `save`, `load`, `search`... Como relacioná-los?

A primeira ideia pode ser atribuir um manipulador separado a cada botão. Mas há uma solução mais elegante. Podemos adicionar um manipulador para o menu inteiro e atributos `data-action` para os botões que contêm o método a chamar:

```html
<button *!*data-action="save"*/!*>Clique para Salvar</button>
```

O manipulador lê o atributo e executa o método. Dê uma olhada no exemplo funcional:

```html autorun height=60 run untrusted
<div id="menu">
  <button data-action="save">Salvar</button>
  <button data-action="load">Carregar</button>
  <button data-action="search">Buscar</button>
</div>

<script>
  class Menu {
    constructor(elem) {
      this._elem = elem;
      elem.onclick = this.onClick.bind(this); // (*)
    }

    save() {
      alert('salvando');
    }

    load() {
      alert('carregando');
    }

    search() {
      alert('buscando');
    }

    onClick(event) {
*!*
      let action = event.target.dataset.action;
      if (action) {
        this[action]();
      }
*/!*
    };
  }

  new Menu(menu);
</script>
```

Note que `this.onClick` está vinculado a `this` em `(*)`. Isso é importante, porque, caso contrário, `this` dentro dele referenciaria o elemento do DOM (`elem`), não o objeto `Menu`, e `this[action]` não seria o que precisamos.

Então, quais vantagens a delegação nos dá aqui?

```compare
+ Não precisamos escrever o código para atribuir um manipulador a cada botão. Basta criar um método e colocá-lo na marcação.
+ A estrutura HTML é flexível, podemos adicionar/remover botões em qualquer momento.
```

Também poderíamos usar classes `.action-save`, `.action-load`, mas um atributo `data-action` é semanticamente melhor. E também podemos usá-lo em regras CSS.

## O padrão "comportamento"

Também podemos usar a delegação de eventos para adicionar "comportamentos" a elementos *declarativamente*, com atributos e classes especiais.

O padrão tem duas partes:
1. Adicionamos um atributo personalizado a um elemento que descreve seu comportamento.
2. Um manipulador no nível do documento rastreia eventos, e, se um evento acontece em um elemento com esse atributo -- executa a ação.

### Comportamento: Contador

Por exemplo, aqui o atributo `data-counter` adiciona um comportamento: "aumentar o valor ao clicar" a botões:

```html run autorun height=60
Contador: <input type="button" value="1" data-counter>
Mais um contador: <input type="button" value="2" data-counter>

<script>
  document.addEventListener('click', function(event) {

    if (event.target.dataset.counter != undefined) { // se o atributo existir...
      event.target.value++;
    }

  });
</script>
```

Se clicarmos em um botão -- seu valor é aumentado. Não os botões, mas a abordagem geral é o que importa aqui.

Pode haver quantos atributos `data-counter` quisermos. Podemos adicionar novos ao HTML em qualquer momento. Usando a delegação de eventos, "estendemos" o HTML, adicionando um atributo que descreve um novo comportamento.

```warn header="Para manipuladores no nível do documento -- sempre `addEventListener`"
Quando atribuímos um manipulador de evento ao objeto `document`, devemos sempre usar `addEventListener`, não `document.on<event>`, porque o último vai causar conflitos: novos manipuladores sobrescrevem os antigos.

Em projetos reais é normal que existam muitos manipuladores em `document` definidos por diferentes partes do código.
```

### Comportamento: Alternador (Toggler)

Mais um exemplo de comportamento. Um clique em um elemento com o atributo `data-toggle-id` vai mostrar/ocultar o elemento com o `id` dado:

```html autorun run height=60
<button *!*data-toggle-id="subscribe-mail"*/!*>
  Mostrar o formulário de inscrição
</button>

<form id="subscribe-mail" hidden>
  Seu e-mail: <input type="email">
</form>

<script>
*!*
  document.addEventListener('click', function(event) {
    let id = event.target.dataset.toggleId;
    if (!id) return;

    let elem = document.getElementById(id);

    elem.hidden = !elem.hidden;
  });
*/!*
</script>
```

Vamos notar de novo o que fizemos. Agora, para adicionar funcionalidade de alternância a um elemento -- não há necessidade de saber JavaScript, basta usar o atributo `data-toggle-id`.

Isso pode se tornar realmente conveniente -- sem necessidade de escrever JavaScript para cada elemento assim. Basta usar o comportamento. O manipulador no nível do documento faz isso funcionar para qualquer elemento da página.

Também podemos combinar múltiplos comportamentos em um único elemento.

O padrão "comportamento" pode ser uma alternativa a mini-fragmentos de JavaScript.

## Resumo

A delegação de eventos é realmente ótima! É um dos padrões mais úteis para eventos do DOM.

É frequentemente usada para adicionar o mesmo tratamento a muitos elementos parecidos, mas não só para isso.

O algoritmo:

1. Coloque um único manipulador no container.
2. No manipulador -- verifique o elemento de origem `event.target`.
3. Se o evento aconteceu dentro de um elemento que nos interessa, então trate o evento.

Benefícios:

```compare
+ Simplifica a inicialização e economiza memória: não há necessidade de adicionar muitos manipuladores.
+ Menos código: ao adicionar ou remover elementos, não há necessidade de adicionar/remover manipuladores.
+ Modificações no DOM: podemos adicionar/remover elementos em massa com `innerHTML` e similares.
```

A delegação tem suas limitações, claro:

```compare
- Primeiro, o evento precisa fazer bubbling. Alguns eventos não fazem bubbling. Além disso, manipuladores de nível mais baixo não devem usar `event.stopPropagation()`.
- Segundo, a delegação pode adicionar carga à CPU, porque o manipulador no nível do container reage a eventos em qualquer lugar do container, não importa se nos interessam ou não. Mas geralmente a carga é insignificante, então não a levamos em conta.
```
