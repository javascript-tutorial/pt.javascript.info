# Uma Introdução ao JavaScript

Vamos ver o que há de tão especial no JavaScript, o que podemos fazer com ele, e que outras tecnologias funcionam bem com ele.

## O que é JavaScript?

*JavaScript* foi inicialmente criado para *" tornar páginas web vivas "*.

Os programas nesta linguagem são chamados de *scripts*. Eles podem ser escritos diretamente no HTML de uma página web e executados automaticamente quando a página é carregada.

Os scripts são fornecidos e executados como texto puro. Eles não precisam de preparação ou compilação especial para serem executados.

Neste aspecto, o JavaScript é muito diferente de outra linguagem chamada [Java](https://pt.wikipedia.org/wiki/Java_(linguagem_de_programação)).

```smart header="Por que <u>Java</u>Script?"
Quando foi criado, inicialmente o JavaScript tinha outro nome: "LiveScript". Mas Java era muito popular naquela época, então foi decidido que posicionar uma nova linguagem como um "irmão mais novo" de Java ajudaria.

Mas à medida que ele evoluiu, o JavaScript se tornou uma linguagem totalmente independente com sua própria especificação chamada [ECMAScript] (http://en.wikipedia.org/wiki/ECMAScript), e agora ele não tem nenhuma relação com Java.
```

Hoje, o JavaScript pode ser executado não só no navegador, mas também no servidor, ou mesmo em qualquer dispositivo que tenha um programa especial chamado [Interpretador JavaScript] (https://pt.wikipedia.org/wiki/Interpretador_de_JavaScript).

O navegador tem um interpretador(motor) incorporado, às vezes chamado de "máquina virtual JavaScript".

Interpretadores diferentes têm "codinomes" diferentes. Por exemplo:

- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- no Chrome e no Opera.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- no Firefox.
- ...Há outros codinomes como "Trident" e "Chakra" para diferentes versões do IE, "ChakraCore" para Microsoft Edge, "Nitro" e "SquirrelFish" para Safari, etc.

Os termos acima são bons para lembrar, pois são usados em artigos de desenvolvedores na internet. Vamos usá-los também. Por exemplo, se "um recurso X é suportado pelo V8", então ele provavelmente funciona no Chrome e no Opera.

```smart header="Como funcionam os interpretadores?"

Os interpretadores são complicados. Mas o básico é fácil.

1. O interpretador (embutido se for um navegador) lê ("analisa") o script.
2. Depois converte ("compila") o script para a linguagem da máquina.
3. E então o código da máquina é executado, bem rápido.

O interpretador aplica otimizações em cada etapa do processo. Ele ainda observa o script compilado enquanto ele roda, analisa os dados que passam por ele e aplica otimizações ao código da máquina com base nesse conhecimento. Quando isso é feito, os scripts são executados rapidamente.
```

## O que o JavaScript no navegador pode fazer?

JavaScript moderno é uma linguagem de programação "segura". Ele não fornece acesso de baixo nível à memória ou CPU, porque foi inicialmente criado para navegadores que não necessitam dele.

As capacidades do JavaScript dependem muito do ambiente em que está sendo executado. Por exemplo, [Node.js](https://wikipedia.org/wiki/Node.js) suporta funções que permitem ao JavaScript ler/gravar arquivos arbitrários, executar solicitações de rede, etc.

O JavaScript no navegador pode fazer tudo relacionado à manipulação de páginas web, interação com o usuário e o servidor web.

Por exemplo, o JavaScript no navegador é capaz de:

- Adicionar novo HTML à página, alterar o conteúdo existente, modificar estilos.
- Reagir às ações do usuário, executar em cliques de mouse, movimentos de ponteiro, pressionamentos de teclas.
- Enviar solicitações através da rede para servidores remotos, baixar e carregar arquivos (as chamadas tecnologias [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) e [COMET](https://en.wikipedia.org/wiki/Comet_(programming))).
- Obter e definir cookies, fazer perguntas ao visitante, mostrar mensagens.
- Lembre-se dos dados no lado do cliente ("local storage").

## O que o JavaScript no navegador não pode fazer?

As habilidades do JavaScript no navegador são limitadas por uma questão de segurança do usuário. O objetivo é evitar que uma página maléfica acesse informações privadas ou prejudique os dados do usuário.

Exemplos de tais restrições incluem:

- JavaScript em uma página não pode ler/gravar arquivos arbitrários no disco rígido, copiá-los ou executar programas. Não tem acesso direto às funções do sistema operacional.

    Os navegadores modernos permitem que ele trabalhe com arquivos, mas o acesso é limitado e fornecido apenas se o usuário executar determinadas ações, como "dropping" de um arquivo em uma janela do navegador ou selecioná-lo por meio de uma tag `<input>`.

   Existem maneiras de interagir com a câmera / microfone e outros dispositivos, mas eles exigem permissão explícita do usuário. Assim, uma página habilitada para JavaScript pode não habilmente habilitar uma câmera web, observar os arredores e enviar as informações para a [NSA](https://pt.wikipedia.org/wiki/Ag%C3%AAncia_de_Seguran%C3%A7a_Nacional).
- Diferentes abas/janelas geralmente não se conhecem mutuamente. Às vezes sim, por exemplo, quando uma janela usa JavaScript para abrir a outra. Mas mesmo neste caso, JavaScript de uma página pode não acessar a outra se eles vierem de sites diferentes (de um domínio, protocolo ou porta diferente).

    Isso é chamado de "Política de mesma origem ". Para contornar isso, *ambas as páginas* devem conter um código JavaScript especial que lida com a troca de dados.

    Essa limitação é, novamente, para a segurança do usuário. Uma página de `http://umsitequalquer.com.br` que um usuário abriu não deve poder alcançar uma outra aba do navegador com a URL `http://gmail.com` e roubar a informação de lá.
- O JavaScript pode se comunicar facilmente pela rede com o servidor de onde a página atual veio. Mas sua capacidade de receber dados de outros sites / domínios é prejudicada. Embora possível, requer acordo explícito (expresso em cabeçalhos HTTP) do lado remoto. Mais uma vez, isso é uma limitação de segurança.

![](limitations.svg)

Esses limites não existem se o JavaScript for usado fora do navegador, por exemplo, em um servidor. Os navegadores modernos também permitem plugins / extensões que podem solicitar permissões estendidas.

## O que torna o JavaScript único?

Há pelo menos *três* grandes aspectos do JavaScript:

```compare
+ Integração total com HTML/CSS.
+ Coisas simples são feitas de forma simples.
+ Suporte para todos os principais navegadores e ativado por padrão.
```
JavaScript é a única tecnologia de navegador que combina estas três qualidades.

Isso é o que torna o JavaScript único. É por isso que é a ferramenta mais difundida para criar interfaces de navegador.

Ao passo que planeja aprender uma nova tecnologia, é benéfico verificar suas perspectivas. Então, vamos seguir para as tendências modernas que o afetam, incluindo novas linguagens e habilidades de navegador.


## Linguagens "sobre" JavaScript

A sintaxe do JavaScript não se adapta às necessidades de todos. Pessoas diferentes querem características diferentes.

Isso é de se esperar, porque os projetos e requisitos são diferentes para todos.

Então, recentemente uma infinidade de novas linguagens apareceu, que são *transpiladas* (convertidas) para JavaScript antes de rodarem no navegador.

Ferramentas modernas tornam a transpilação muito rápida e transparente, permitindo que os desenvolvedores codifiquem em outra linguagem e auto-convertendo-a "sob o capô".

Exemplos de tais linguagens:

- [CoffeeScript](http://coffeescript.org/) é um "açúcar sintático" para JavaScript. Ele introduz uma sintaxe mais curta, permitindo-nos escrever um código mais claro e preciso. Normalmente, Ruby devs gostam dele.
- [TypeScript](http://www.typescriptlang.org/) está concentrado em adicionar "dados estritos de digitação" para simplificar o desenvolvimento e suporte de sistemas complexos. É desenvolvido pela Microsoft.
- [Dart](https://www.dartlang.org/) é uma linguagem autônoma que tem seu próprio mecanismo que roda em ambientes sem navegador (como aplicativos móveis). Ela foi inicialmente oferecida pelo Google como um substituto para JavaScript, mas a partir de agora, os navegadores exigem que ela seja transpilada para JavaScript da mesma forma que as anteriores.

Há mais. Claro que, mesmo que usemos uma dessas linguagens, também devemos saber JavaScript para entender o que estamos fazendo.

## Resumo

- O JavaScript foi inicialmente criado como uma linguagem somente de navegador, mas agora é usado em muitos outros ambientes também.
- Hoje, o JavaScript tem uma posição única como a linguagem de navegador mais amplamente adotada, com integração total com HTML/CSS.
- Existem muitas linguagens que são "transpiladas" para JavaScript e que oferecem certas funcionalidades. Recomenda-se dar uma olhada nelas, pelo menos brevemente, depois de dominar o JavaScript.
