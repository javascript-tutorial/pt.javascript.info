
# Eventos de mouse

Neste capítulo vamos entrar em mais detalhes sobre os eventos de mouse e suas propriedades.

Note bem: esses eventos podem vir não só de "dispositivos de mouse", mas também de outros dispositivos, como celulares e tablets, onde são emulados para compatibilidade.

## Tipos de evento de mouse

Já vimos alguns desses eventos:

`mousedown/mouseup`
: O botão do mouse é pressionado/liberado sobre um elemento.

`mouseover/mouseout`
: O cursor do mouse entra/sai de um elemento.

`mousemove`
: Todo movimento do mouse sobre um elemento aciona esse evento.

`click`
: Acionado depois de `mousedown` e então `mouseup` sobre o mesmo elemento, se o botão esquerdo do mouse foi usado.

`dblclick`
: Acionado depois de dois cliques no mesmo elemento dentro de um curto intervalo de tempo. Raramente usado hoje em dia.

`contextmenu`
: Acionado quando o botão direito do mouse é pressionado. Há outras formas de abrir um menu de contexto, por exemplo usando uma tecla especial do teclado, que também o acionam nesse caso, então não é exatamente um evento de mouse.

...Há vários outros eventos também, vamos abordá-los depois.

## Ordem dos eventos

Como você pode ver na lista acima, uma ação do usuário pode acionar múltiplos eventos.

Por exemplo, um clique com o botão esquerdo primeiro aciona `mousedown`, quando o botão é pressionado, e depois `mouseup` e `click` quando ele é liberado.

Nos casos em que uma única ação inicia múltiplos eventos, a ordem deles é fixa. Ou seja, os manipuladores são chamados na ordem `mousedown` -> `mouseup` -> `click`.

```online
Clique no botão abaixo e você verá os eventos. Tente o duplo-clique também.

Na área de teste abaixo, todos os eventos de mouse são registrados, e se houver mais de 1 segundo de atraso entre eles, eles são separados por uma linha horizontal.

Além disso, podemos ver a propriedade `button`, que nos permite detectar o botão do mouse; ela é explicada abaixo.

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Clique em mim com o botão direito ou esquerdo do mouse" type="button"> <input onclick="logClear('test')" value="Limpar" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

## Botão do mouse

Eventos relacionados a clique sempre têm a propriedade `button`, que nos permite obter o botão exato do mouse.

Normalmente não a usamos para os eventos `click` e `contextmenu`, porque o primeiro acontece só com o clique esquerdo, e o segundo -- só com o clique direito.

Por outro lado, os manipuladores de `mousedown` e `mouseup` podem precisar de `event.button`, porque esses eventos são acionados por qualquer botão, então `button` nos permite diferenciar entre "mousedown com o botão direito" e "mousedown com o botão esquerdo".

Os valores possíveis de `event.button` são:

| Estado do botão | `event.button` |
|--------------|----------------|
| Botão esquerdo (primário) | 0 |
| Botão do meio (auxiliar) | 1 |
| Botão direito (secundário) | 2 |
| Botão X1 (voltar) | 3 |
| Botão X2 (avançar) | 4 |

A maioria dos dispositivos de mouse só tem os botões esquerdo e direito, então os valores possíveis são `0` ou `2`. Dispositivos touch também geram eventos parecidos quando se toca neles.

Há também a propriedade `event.buttons`, que tem todos os botões pressionados no momento como um inteiro, um bit por botão. Na prática essa propriedade é muito raramente usada, você pode encontrar detalhes no [MDN](mdn:/api/MouseEvent/buttons) se precisar dela algum dia.

```warn header="A propriedade `event.which`, ultrapassada"
Código antigo pode usar a propriedade `event.which`, que é uma forma antiga e não padronizada de obter um botão, com valores possíveis:

- `event.which == 1` -- botão esquerdo,
- `event.which == 2` -- botão do meio,
- `event.which == 3` -- botão direito.

Atualmente, `event.which` está obsoleto, não devemos usá-la.
```

## Modificadores: shift, alt, ctrl e meta

Todos os eventos de mouse incluem informação sobre as teclas modificadoras pressionadas.

Propriedades do evento:

- `shiftKey`: `key:Shift`
- `altKey`: `key:Alt` (ou `key:Opt` no Mac)
- `ctrlKey`: `key:Ctrl`
- `metaKey`: `key:Cmd` no Mac

Elas são `true` se a tecla correspondente estava pressionada durante o evento.

Por exemplo, o botão abaixo só funciona com `key:Alt+Shift`+clique:

```html autorun height=60
<button id="button">Alt+Shift+Clique em mim!</button>

<script>
  button.onclick = function(event) {
*!*
    if (event.altKey && event.shiftKey) {
*/!*
      alert('Oba!');
    }
  };
</script>
```

```warn header="Atenção: no Mac normalmente é `Cmd` em vez de `Ctrl`"
No Windows e no Linux há as teclas modificadoras `key:Alt`, `key:Shift` e `key:Ctrl`. No Mac há mais uma: `key:Cmd`, correspondente à propriedade `metaKey`.

Na maioria das aplicações, onde o Windows/Linux usa `key:Ctrl`, no Mac se usa `key:Cmd`.

Ou seja: onde um usuário de Windows pressiona `key:Ctrl+Enter` ou `key:Ctrl+A`, um usuário de Mac pressionaria `key:Cmd+Enter` ou `key:Cmd+A`, e assim por diante.

Então, se quisermos suportar combinações como `key:Ctrl`+clique, faz sentido usar `key:Cmd`+clique no Mac. Isso é mais confortável para usuários de Mac.

Mesmo se quiséssemos forçar usuários de Mac a usar `key:Ctrl`+clique -- isso é meio difícil. O problema é: um clique esquerdo com `key:Ctrl` é interpretado como um *clique direito* no MacOS, e gera o evento `contextmenu`, não `click` como no Windows/Linux.

Então, se quisermos que usuários de todos os sistemas operacionais se sintam confortáveis, junto com `ctrlKey` devemos verificar `metaKey`.

Em código JS isso significa que devemos verificar `if (event.ctrlKey || event.metaKey)`.
```

```warn header="Também há dispositivos móveis"
Combinações de teclado são boas como um adicional ao fluxo de trabalho. Assim, se o visitante usa um teclado -- elas funcionam.

Mas se o dispositivo dele não tem um -- então deve haver uma forma de viver sem as teclas modificadoras.
```

## Coordenadas: clientX/Y, pageX/Y

Todos os eventos de mouse fornecem coordenadas em duas variações:

1. Relativas à janela: `clientX` e `clientY`.
2. Relativas ao documento: `pageX` e `pageY`.

Já cobrimos a diferença entre elas no capítulo <info:coordinates>.

Resumindo, as coordenadas relativas ao documento `pageX/Y` são contadas a partir do canto superior esquerdo do documento, e não mudam quando a página é rolada, enquanto `clientX/Y` são contadas a partir do canto superior esquerdo da janela atual. Quando a página é rolada, elas mudam.

Por exemplo, se temos uma janela do tamanho 500x500, e o mouse está no canto superior esquerdo, então `clientX` e `clientY` são `0`, não importa como a página seja rolada.

E se o mouse está no centro, então `clientX` e `clientY` são `250`, não importa em qual lugar do documento isso seja. Elas são parecidas com `position:fixed` nesse aspecto.

````online
Mova o mouse sobre o campo de entrada para ver `clientX/clientY` (o exemplo está num `iframe`, então as coordenadas são relativas a esse `iframe`):

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Mouse sobre mim">
```
````

## Prevenindo a seleção no mousedown

O duplo-clique do mouse tem um efeito colateral que pode ser incômodo em algumas interfaces: ele seleciona o texto.

Por exemplo, dar um duplo-clique no texto abaixo o seleciona, além de executar nosso manipulador:

```html autorun height=50
<span ondblclick="alert('dblclick')">Dê um duplo-clique em mim</span>
```

Se alguém pressiona o botão esquerdo do mouse e, sem soltá-lo, move o mouse, isso também faz a seleção, geralmente de forma indesejada.

Há várias formas de prevenir a seleção, que você pode ler no capítulo <info:selection-range>.

Neste caso específico, a forma mais razoável é prevenir a ação do navegador no `mousedown`. Isso previne as duas seleções:

```html autorun height=50
Antes...
<b ondblclick="alert('Clique!')" *!*onmousedown="return false"*/!*>
  Dê um duplo-clique em mim
</b>
...Depois
```

Agora o elemento em negrito não é selecionado em duplo-cliques, e pressionar o botão esquerdo nele não vai iniciar a seleção.

Note bem: o texto dentro dele ainda é selecionável. Porém, a seleção deve começar não no próprio texto, mas antes ou depois dele. Geralmente isso é tranquilo para os usuários.

````smart header="Prevenindo a cópia"
Se quisermos desabilitar a seleção para proteger o conteúdo da nossa página contra copiar e colar, podemos usar outro evento: `oncopy`.

```html autorun height=80 no-beautify
<div *!*oncopy="alert('Cópia proibida!');return false"*/!*>
  Caro usuário,
  A cópia é proibida para você.
  Se você sabe JS ou HTML, pode conseguir tudo a partir do código-fonte da página mesmo assim.
</div>
```
Se você tentar copiar um trecho de texto na `<div>`, isso não vai funcionar, porque a ação padrão do `oncopy` é prevenida.

Com certeza o usuário tem acesso ao código-fonte HTML da página, e pode retirar o conteúdo dali, mas nem todo mundo sabe como fazer isso.
````

## Resumo

Eventos de mouse têm as seguintes propriedades:

- Botão: `button`.
- Teclas modificadoras (`true` se pressionadas): `altKey`, `ctrlKey`, `shiftKey` e `metaKey` (Mac).
  - Se você quiser tratar `key:Ctrl`, não esqueça dos usuários de Mac, eles geralmente usam `key:Cmd`, então é melhor verificar `if (e.metaKey || e.ctrlKey)`.

- Coordenadas relativas à janela: `clientX/clientY`.
- Coordenadas relativas ao documento: `pageX/pageY`.

A ação padrão do navegador no `mousedown` é a seleção de texto; se isso não for bom para a interface, deve ser prevenida.

No próximo capítulo vamos ver mais detalhes sobre eventos que seguem o movimento do ponteiro e como rastrear mudanças de elemento sob ele.
