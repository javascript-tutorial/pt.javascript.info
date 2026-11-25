# Ações padrão do navegador

Muitos eventos levam automaticamente a certas ações executadas pelo navegador.

Por exemplo:

- Um clique em um link -- inicia a navegação para sua URL.
- Um clique no botão de envio de um formulário -- inicia o envio dele ao servidor.
- Pressionar o botão do mouse sobre um texto e movê-lo -- seleciona o texto.

Se tratarmos um evento em JavaScript, podemos não querer que a ação correspondente do navegador aconteça e, em vez disso, querer implementar outro comportamento.

## Prevenindo ações do navegador

Há duas formas de dizer ao navegador que não queremos que ele aja:

- A forma principal é usar o objeto `event`. Há um método `event.preventDefault()`.
- Se o manipulador for atribuído usando `on<event>` (não por `addEventListener`), então retornar `false` também funciona da mesma forma.

Neste HTML, um clique em um link não leva à navegação; o navegador não faz nada:

```html autorun height=60 no-beautify
<a href="/" onclick="return false">Clique aqui</a>
ou
<a href="/" onclick="event.preventDefault()">aqui</a>
```

No próximo exemplo vamos usar essa técnica para criar um menu baseado em JavaScript.

```warn header="Retornar `false` de um manipulador é uma exceção"
O valor retornado por um manipulador de evento geralmente é ignorado.

A única exceção é `return false` de um manipulador atribuído usando `on<event>`.

Em todos os outros casos, o valor de `return` é ignorado. Em particular, não faz sentido retornar `true`.
```

### Exemplo: o menu

Considere um menu de site, como este:

```html
<ul id="menu" class="menu">
  <li><a href="/html">HTML</a></li>
  <li><a href="/javascript">JavaScript</a></li>
  <li><a href="/css">CSS</a></li>
</ul>
```

Veja como fica com algum CSS:

[iframe height=70 src="menu" link edit]

Os itens do menu são implementados como links HTML `<a>`, não botões `<button>`. Há várias razões para isso, por exemplo:

- Muitas pessoas gostam de usar o "clique direito" -- "abrir em uma nova janela". Se usarmos `<button>` ou `<span>`, isso não funciona.
- Mecanismos de busca seguem links `<a href="...">` ao indexar.

Então usamos `<a>` na marcação. Mas normalmente pretendemos tratar os cliques em JavaScript. Então devemos prevenir a ação padrão do navegador.

Assim:

```js
menu.onclick = function(event) {
  if (event.target.nodeName != 'A') return;

  let href = event.target.getAttribute('href');
  alert( href ); // ...pode ser carregado do servidor, geração de UI etc

*!*
  return false; // previne a ação do navegador (não vai para a URL)
*/!*
};
```

Se omitirmos `return false`, então, depois que nosso código for executado, o navegador vai fazer sua "ação padrão" -- navegar para a URL em `href`. E não precisamos disso aqui, já que estamos tratando o clique nós mesmos.

A propósito, usar delegação de eventos aqui torna nosso menu muito flexível. Podemos adicionar listas aninhadas e estilizá-las usando CSS para "deslizar para baixo".

````smart header="Eventos subsequentes"
Certos eventos fluem de um para outro. Se prevenirmos o primeiro evento, não haverá o segundo.

Por exemplo, `mousedown` em um campo `<input>` leva ao foco nele, e ao evento `focus`. Se prevenirmos o evento `mousedown`, não há foco.

Tente clicar no primeiro `<input>` abaixo -- o evento `focus` acontece. Mas se você clicar no segundo, não há foco.

```html run autorun
<input value="O foco funciona" onfocus="this.value=''">
<input *!*onmousedown="return false"*/!* onfocus="this.value=''" value="Clique em mim">
```

Isso acontece porque a ação do navegador é cancelada em `mousedown`. O foco ainda é possível se usarmos outra forma de entrar no input. Por exemplo, a tecla `key:Tab` para alternar do 1º input para o 2º. Mas não mais com o clique do mouse.
````

## A opção "passive" do manipulador

A opção `passive: true` de `addEventListener`, que é opcional, sinaliza ao navegador que o manipulador não vai chamar `preventDefault()`.

Por que isso pode ser necessário?

Há alguns eventos como `touchmove` em dispositivos móveis (quando o usuário move o dedo pela tela), que causam rolagem por padrão, mas essa rolagem pode ser prevenida usando `preventDefault()` no manipulador.

Então, quando o navegador detecta tal evento, ele primeiro precisa processar todos os manipuladores, e só então, se `preventDefault` não for chamado em nenhum lugar, ele pode continuar com a rolagem. Isso pode causar atrasos e "engasgos" desnecessários na interface.

A opção `passive: true` diz ao navegador que o manipulador não vai cancelar a rolagem. Então o navegador rola imediatamente, fornecendo uma experiência o mais fluida possível, e o evento é tratado ao longo do caminho.

Em alguns navegadores (Firefox, Chrome), `passive` é `true` por padrão para os eventos `touchstart` e `touchmove`.


## event.defaultPrevented

A propriedade `event.defaultPrevented` é `true` se a ação padrão foi prevenida, e `false` caso contrário.

Há um caso de uso interessante para ela.

Você lembra que no capítulo <info:bubbling-and-capturing> falamos sobre `event.stopPropagation()` e por que parar o bubbling é ruim?

Às vezes podemos usar `event.defaultPrevented` em vez disso, para sinalizar a outros manipuladores de evento que o evento foi tratado.

Vamos ver um exemplo prático.

Por padrão, o navegador no evento `contextmenu` (clique com o botão direito do mouse) mostra um menu de contexto com opções padrão. Podemos prevenir isso e mostrar o nosso próprio, assim:

```html autorun height=50 no-beautify run
<button>Clique com o botão direito mostra o menu de contexto do navegador</button>

<button *!*oncontextmenu="alert('Desenha nosso menu'); return false"*/!*>
  Clique com o botão direito mostra nosso menu de contexto
</button>
```

Agora, além desse menu de contexto, gostaríamos de implementar um menu de contexto no nível do documento.

Ao clicar com o botão direito, o menu de contexto mais próximo deve aparecer.

```html autorun height=80 no-beautify run
<p>Clique com o botão direito aqui para o menu de contexto do documento</p>
<button id="elem">Clique com o botão direito aqui para o menu de contexto do botão</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Menu de contexto do botão");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Menu de contexto do documento");
  };
</script>
```

O problema é que, quando clicamos em `elem`, obtemos dois menus: o do nível do botão e (o evento borbulha para cima) o do nível do documento.

Como corrigir isso? Uma das soluções é pensar assim: "Quando tratarmos o clique direito no manipulador do botão, vamos parar seu bubbling" e usar `event.stopPropagation()`:

```html autorun height=80 no-beautify run
<p>Clique com o botão direito para o menu do documento</p>
<button id="elem">Clique com o botão direito para o menu do botão (corrigido com event.stopPropagation)</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
*!*
    event.stopPropagation();
*/!*
    alert("Menu de contexto do botão");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Menu de contexto do documento");
  };
</script>
```

Agora o menu no nível do botão funciona como pretendido. Mas o preço é alto. Negamos para sempre o acesso à informação sobre cliques com o botão direito para qualquer código externo, incluindo contadores que coletam estatísticas e assim por diante. Isso não é nada sensato.

Uma solução alternativa seria verificar no manipulador de `document` se a ação padrão foi prevenida. Se for o caso, então o evento foi tratado, e não precisamos reagir a ele.


```html autorun height=80 no-beautify run
<p>Clique com o botão direito para o menu do documento (adicionamos uma verificação de event.defaultPrevented)</p>
<button id="elem">Clique com o botão direito para o menu do botão</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Menu de contexto do botão");
  };

  document.oncontextmenu = function(event) {
*!*
    if (event.defaultPrevented) return;
*/!*

    event.preventDefault();
    alert("Menu de contexto do documento");
  };
</script>
```

Agora tudo também funciona corretamente. Se tivermos elementos aninhados, e cada um deles tiver seu próprio menu de contexto, isso também funcionaria. Só precisamos garantir que verificamos `event.defaultPrevented` em cada manipulador de `contextmenu`.

```smart header="event.stopPropagation() e event.preventDefault()"
Como podemos ver claramente, `event.stopPropagation()` e `event.preventDefault()` (também conhecido como `return false`) são duas coisas diferentes. Elas não têm relação uma com a outra.
```

```smart header="Arquitetura de menus de contexto aninhados"
Há também formas alternativas de implementar menus de contexto aninhados. Uma delas é ter um único objeto global com um manipulador para `document.oncontextmenu`, e também métodos que nos permitem armazenar outros manipuladores nele.

O objeto vai capturar qualquer clique direito, procurar entre os manipuladores armazenados e executar o apropriado.

Mas então cada pedaço de código que quiser um menu de contexto deve saber sobre esse objeto e usar sua ajuda em vez do próprio manipulador de `contextmenu`.
```

## Resumo

Há muitas ações padrão do navegador:

- `mousedown` -- inicia a seleção (mova o mouse para selecionar).
- `click` em `<input type="checkbox">` -- marca/desmarca o `input`.
- `submit` -- clicar em um `<input type="submit">` ou pressionar `key:Enter` dentro de um campo de formulário faz esse evento acontecer, e o navegador envia o formulário depois disso.
- `keydown` -- pressionar uma tecla pode levar à adição de um caractere em um campo, ou outras ações.
- `contextmenu` -- o evento acontece em um clique com o botão direito, a ação é mostrar o menu de contexto do navegador.
- ...há mais...

Todas as ações padrão podem ser prevenidas se quisermos tratar o evento exclusivamente com JavaScript.

Para prevenir uma ação padrão -- use `event.preventDefault()` ou `return false`. O segundo método só funciona para manipuladores atribuídos com `on<event>`.

A opção `passive: true` de `addEventListener` diz ao navegador que a ação não vai ser prevenida. Isso é útil para alguns eventos de dispositivos móveis, como `touchstart` e `touchmove`, para dizer ao navegador que ele não deve esperar que todos os manipuladores terminem antes de rolar.

Se a ação padrão foi prevenida, o valor de `event.defaultPrevented` se torna `true`, caso contrário é `false`.

```warn header="Mantenha a semântica, não abuse"
Tecnicamente, prevenindo ações padrão e adicionando JavaScript, podemos personalizar o comportamento de qualquer elemento. Por exemplo, podemos fazer um link `<a>` funcionar como um botão, e um botão `<button>` se comportar como um link (redirecionar para outra URL ou algo assim).

Mas geralmente devemos manter o significado semântico dos elementos HTML. Por exemplo, `<a>` deve executar navegação, não um botão.

Além de ser "apenas uma coisa boa", isso torna seu HTML melhor em termos de acessibilidade.

Também, se considerarmos o exemplo com `<a>`, note: um navegador nos permite abrir tais links em uma nova janela (clicando com o botão direito neles e outros meios). E as pessoas gostam disso. Mas se fizermos um botão se comportar como um link usando JavaScript e até parecer um link usando CSS, os recursos específicos de `<a>` do navegador ainda não vão funcionar para ele.
```
