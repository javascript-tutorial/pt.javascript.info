# Depuração de erros no navegador

Antes de escrevermos código mais complexo, precisamos de falar de debugging (depuração de erros).

[Depuração](https://pt.wikipedia.org/wiki/Depura%C3%A7%C3%A3o) é o processo de procura e correção de erros em um dado programa. Todos os navegadores (*browsers*) modernos e muitas outras plataformas (*environments*) suportam ferramentas de (*debugging*) -- uma UI (Interface de Usuário) especial que está disponível nas ferramentas do desenvolvedor (*developer tools*) tornando assim, a depuração de erros muito mais fácil. Ela também permite rastrear o código passo-a-passo para entender exatamente o que está sendo executado.

Aqui, vamos utilizar o navegador Google Chrome dadas as suas muitas funcionalidades, porém, a maioria dos navegadores atuais possui recursos similares.

## O painel *Sources*

Devido à versão do seu Chrome, partes da interface podem parecer diferentes mas ainda assim deverá ser possível entender o que lá encontrar.

- Abra a [página exemplo](debugging/index.html) no Chrome.
- Ative as ferramentas do desenvolvedor com `key:F12` (Mac: `key:Cmd+Opt+I`).
- Selecione o painel `Sources`.

Aqui está o que poderá ser visto caso esteja a fazê-lo pela primeira vez:

![](chrome-open-sources.svg)

O botão de alternar <span class="devtools" style="background-position:-172px -98px"></span> abre o separador com os arquivos.

Vamos clicar nele e selecionar `hello.js` na representação da árvore de recursos aberta. Abaixo está o que você poderá encontrar:

![](chrome-tabs.svg)

O painel *Sources* possui 3 partes:

1. O painel **Navegador de Arquivos** (*File Navigator*), lista arquivos HTML, JavaScript, CSS e outros. Inclui Imagens anexadas à página e Extensões do Google Chrome (*Chrome extensions*) também podem aparecer aqui.
2. O painel **Editor de Código** (*Code Editor*), mostra o código-fonte do arquivo selecionado.
3. O painel **Depuração do Javascript** (*JavaScript Debugging*) serve para a depuração de erros. Iremos explorá-lo em breve.

Agora, é possível clicar novamente no mesmo botão de alternar <span class="devtools" style="background-position:-172px -122px"></span> para ocultar a lista de recursos e dar ao código algum espaço.

## Console

Se pressionarmos `key:Esc`, um terminal (*Console*) se abrirá abaixo. Assim permitindo digitar instruções e executa-las pressionando `key:Enter`.

Depois de uma instrução ser executada, o resultado será mostrado logo a seguir.

<<<<<<< HEAD
Por exemplo, a instrução `1+2` resultará em `3`, enquanto a chamada de função `hello("debugger")` não retornará nada, assim tendo como resultado `undefined`:
=======
For example, here `1+2` results in `3`, while the function call `hello("debugger")` returns nothing, so the result is `undefined`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

![](chrome-sources-console.svg)

## Breakpoints

Vamos examinar o que se passa dentro do código da [página exemplo](debugging/index.html). No arquivo `hello.js`, clique no número referente à linha `4`. Sim, exatamente sobre o dígito `4`, não sobre o código.

Parabéns! Um ponto-de-interrupção (*breakpoint*) foi criado. Clique também no número referente a linha `8`, por favor.

Deve se parecer com isto (dígitos de cor azul é onde deveria ter clicado):

![](chrome-sources-breakpoint.svg)

Um *breakpoint* é um ponto no código onde o depurador de erros (*debugger*) irá, automáticamente, efetuar uma pausa na execução do JavaScript.

Enquanto a execução do código estiver suspensa, é possível examinar valores de variáveis, executar comandos no terminal, etc. Em outras palavras, depurar erros (*debug it*).

Uma lista de *breakpoints* sempre estará disponível no painel à direita. Muito útil quando existem diferentes *breakpoints* em vários arquivos. Essa lista permite:
- Rápidamente saltar para a linha do *breakpoint* no código (ao clicar sobre ele no painel à direita).
- Temporáriamente desativar o *breakpoint* ao desmarcá-lo na caixinha seletora (*unchecking it*).
- Remover o breakpoint, clicando com o botão direito do mouse e selecionando *Remove*.
- ...E assim por diante.

<<<<<<< HEAD
```smart header="*Breakpoints* condicionais"
*Clicar com o botão direito do mouse* sobre um número de linha permite a criação de um *breakpoint condicional* o qual será ativado apenas quando a expressão inserida for verdadeira.
=======
```smart header="Conditional breakpoints"
*Right click* on the line number allows to create a *conditional* breakpoint. It only triggers when the given expression, that you should provide when you create it, is truthy.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

É prático quando precisamos de suspender a execução apenas para valores determinados de certa variável ou para parâmetros específicos numa função.
```

<<<<<<< HEAD
## O comando *debugger*
=======
## The command "debugger"
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Podemos também suspender o código utilizando o comando `debugger`, desta forma:

```js
function hello(name) {
  let phrase = `Olá, ${name}!`;

*!*
  debugger;  // <-- o *debugger* (depurador de erros) irá pausar a execução neste ponto.
*/!*

  say(phrase);
}
```

<<<<<<< HEAD
Este comando só irá funcionar quando a interface de ferramentas de desenvolvedor do navegador estiver aberta, caso contrário, será ignorado.

## Pause e dê uma olhada
=======
Such command works only when the development tools are open, otherwise the browser ignores it.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

No nosso exemplo, a função `hello()` é chamada durante o carregamento da página, assim a forma mais fácil para ativar o *debugger* (depois de termos colocado os *breakpoints*) seria recarregar a página. Desta forma, vamos pressionar `key:F5` (Windows, Linux) ou `key:Cmd+R` (Mac).

Após recarregar, como o breakpoint estará estabelecido, será feita uma pausa na execução na quarta linha:

![](chrome-sources-debugger-pause.svg)

Por favor, abra as secções de *dropdown* informacionais à direita (apontadas pelas setas). Tais *dropdowns* permitem examinar o estado atual do código:

1. **`Watch` -- mostra valores atuais das expressões.**

<<<<<<< HEAD
    É possível clicar no `+` e inserir uma expressão. O *debugger* mostrará o valor da expressão e continuará recalculando-a ao longo do processo de execução.
=======
    You can click the plus `+` and input an expression. The debugger will show its value, automatically recalculating it in the process of execution.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

2. **`Call Stack` -- mostra a sequência de chamadas de funções aninhadas.**

    No presente momento, o *debugger* está dentro da chamada da função `hello()`, invocada por código em `index.html` (não a partir de uma função, por isso o nome "*anonymous*" [anónimo]).

    Se clicar num item nessa pilha (*stack*) (por exemplo, em "*anonymous*"), o *debugger* saltará para o código correspondente e todas as suas variáveis poderão ser igualmente examinadas.
3. **`Scope` -- variáveis atuais.**

    `Local` mostra variáveis locais da função. Também será possível ver tais valores em destaque exatamente sobre o código-fonte.

    `Global` possui variáveis globais (aquelas fora de qualquer função).

    Lá também existe a palavra-chave `this` que ainda não estudámos mas o faremos em breve.

## Rastreando a execução

Agora, é o momento de *rastrearmos* (*trace*) o código.

Existem botões para isso no topo do painel direito. Vamos interagir com eles.
<!-- https://github.com/ChromeDevTools/devtools-frontend/blob/master/front_end/Images/src/largeIcons.svg -->
<span class="devtools" style="background-position:-146px -160px"></span> -- "Resume": continue executando, atalho (*hotkey*) `key:F8`.
: Retoma a execução. Se não houver *breakpoints* adicionais, a execução simplesmente prossegue e o *debugger* perde o controle.

    Aqui está o que poderemos ver após um clique sobre ele:

    ![](chrome-sources-debugger-trace-1.svg)

    A execução prosseguiu, atingiu outro *breakpoint* dentro da função `say()` e fez uma pausa lá. Dê uma olhada na "*Call stack*" à direita. Verá que aumentou por mais uma chamada. Estamos dentro da função `say()` agora.

<span class="devtools" style="background-position:-200px -190px"></span> -- "Step": execute o próximo comando, atalho (*hotkey*) `key:F9`.
: Executa a próxima instrução. Se o clicarmos agora, o `alert` será mostrado.

    Continuando a clicar nele, passará por todas as instruções do programa, uma por uma.

<<<<<<< HEAD
<span class="devtools" style="background-position:-62px -192px"></span> -- "Step over": execute o próximo comando, *mas não vá para dentro de uma função*, atalho `key:F10`.
: Similar ao comando "Step" anterior mas com um comportamento diferente se a próxima instrução for uma chamada de função. Isto é: não uma incorporada (*built-in*), como `alert`, mas uma função nossa.

    O comando "Step", vai para dentro dessa função e suspende a execução na sua primeira linha, ao contrário de "Step over" que executa essa chamada de função aninhada de forma invisível para nós, pulando todo seu funcionamento interno.

    É feita uma pausa na execução imediatamente depois dessa função.
=======
<span class="devtools" style="background-position:-62px -192px"></span> -- "Step over": run the next command, but *don't go into a function*, hotkey `key:F10`.
: Similar to the previous "Step" command, but behaves differently if the next statement is a function call (not a built-in, like `alert`, but a function of our own).

    If we compare them, the "Step" command goes into a nested function call and pauses the execution at its first line, while "Step over" executes the nested function call invisibly to us, skipping the function internals.

    The execution is then paused immediately after that function call.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    É util quando não se está interessado em ver o que acontece dentro da chamada de uma função.

<span class="devtools" style="background-position:-4px -194px"></span> -- "Step into", atalho `key:F11`.
: Similar a "Step" mas com um comportamento diferente no caso de chamadas de funções assíncronas. Se estiver começando a aprender JavaScript, poderá ignorar a diferença porque ainda não vimos chamadas assíncronas.

    Para o futuro, apenas tome nota que o comando "Step" ignora ações assíncronas, tais como `setTimeout` (chamada de função agendada), que são executadas mais tarde. O "Step into", vai para dentro do código destas funções assíncronas e aguarda a execução se necessário. Para mais detalhes, veja o [DevTools manual](https://developers.google.com/web/updates/2018/01/devtools#async).

<span class="devtools" style="background-position:-32px -194px"></span> -- "Step out": continue a execução até ao fim da função atual, atalho `key:Shift+F11`.
: Continue a execução e faça uma pausa na última linha da função atual. É útil quando acidentalmente entrámos para uma chamada aninhada usando <span class="devtools" style="background-position:-200px -190px"></span>, porém, esta chamada aninhada não nos interessa e queremos prosseguir para o final desta função o mais rápido possível.

<span class="devtools" style="background-position:-61px -74px"></span> -- ativar/desativar todos os *breakpoints*.
: Esse botão não move a execução. Simplesmente ativa/desativa *breakpoints* em conjunto.

<<<<<<< HEAD
<span class="devtools" style="background-position:-90px -146px"></span> -- ativar/desativar a pausa automática em caso de erro.
: Quando ativo e as ferramentas do desenvolvedor abertas, um erro no código automáticamente suspende a execução do código. Assim permitindo a análise de variáveis para entender o que ocorreu de errado. Desta forma, se o código falhar por um erro, é possível abrir o *debugger*, ativar esta opção e recarregar a página afim de se observar onde e em que contexto a falha ocorreu.
=======
<span class="devtools" style="background-position:-90px -146px"></span> -- enable/disable automatic pause in case of an error.
: When enabled, if the developer tools is open, an error during the script execution automatically pauses it. Then we can analyze variables in the debugger to see what went wrong. So if our script dies with an error, we can open debugger, enable this option and reload the page to see where it dies and what's the context at that moment.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```smart header="Continue até aqui"
Ao clicar com o botão direito do mouse sobre uma linha de código, abre-se o menu de contexto com uma ótima opção chamada "Continue até aqui" (*Continue to here*).

É util quando se deseja avançar por múltiplos passos até aquela linha mas estamos preguiçosos demais para estabelecer um *breakpoint*.
```

## Logging

Para mostrar no terminal (*console*) algo existente no código, existe a função `console.log`.

Por exemplo, isto mostra os valores de `0` a `4` no *console*:

```js run
// abra o console para visualizar
for (let i = 0; i < 5; i++) {
  console.log("valor,", i);
}
```

Utilizadores comuns não enxergam essa saída (*output*), ela estará no console. Para vê-la, selecione a aba *console* nas ferramentas do desenvolvedor, ou pressione `key:Esc` se estiver em uma outra aba - isso abre o console abaixo na aba atual.

Se mostrarmos mensagens (*logging*) suficientes no nosso código, então poderemos ver o que nele se passa a partir desses registos, mesmo sem a utilização do *debugger*.

## Resumo

Como podemos ver, existem três formas principais para pausar a execução de um *script*:
1. Um *breakpoint* (ponto-de-interrupção).
2. As instruções `debugger`.
3. Um erro (se as ferramentas do desenvolvedor [*dev tools*] estiverem abertas, e o botão <span class="devtools" style="background-position:-90px -146px"></span> estiver "ativo").

<<<<<<< HEAD
Enquanto suspenso, podemos depurar erros - examinar variáveis e rastear o código para ver que parte da execução ocorre com erros.
=======
When paused, we can debug: examine variables and trace the code to see where the execution goes wrong.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Existem muitas outras opções nas ferramentas do desenvolvedor além das já cobertas ao longo desta leitura. O manual completo está em <https://developers.google.com/web/tools/chrome-devtools>.

A informação neste capítulo é suficiente para iniciar a depuração de erros (o *debugging*), porém, especialmente se trabalhar muito com o navegador (*browser*), por favor consulte o manual e procure por recursos mais avançados das ferramentas do desenvolvedor.

Oh, também é possível clicar em vários locais nas ferramentas do desenvolvedor (*dev tools*) e ver o que acontece. Provávelmente, é a rota mais rápida para aprender muitos dos recursos existentes. Não se esqueça de também clicar com o botão direito do mouse e dos menus de contexto!
