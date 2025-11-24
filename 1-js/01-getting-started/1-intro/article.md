# Uma Introdução ao JavaScript

Vamos ver o que há de tão especial no JavaScript, o que podemos fazer com ele, e que outras tecnologias funcionam bem com ele.

## O que é JavaScript?

*JavaScript* foi inicialmente criado para *" tornar páginas web vivas "*.

Os programas nesta linguagem são chamados de *scripts*. Eles podem ser escritos diretamente no HTML de uma página web e executados automaticamente quando a página é carregada.

Os scripts são fornecidos e executados como texto puro. Eles não precisam de preparação ou compilação especial para serem executados.

Neste aspecto, o JavaScript é muito diferente de outra linguagem chamada [Java](https://pt.wikipedia.org/wiki/Java_(linguagem_de_programação)).

```smart header="Por que é chamado <u>Java</u>Script?"
Quando o JavaScript foi criado, inicialmente tinha outro nome: "LiveScript". Mas Java era muito popular naquela época, então foi decidido que posicionar uma nova linguagem como um "irmão mais novo" de Java ajudaria.

Mas à medida que ele evoluiu, o JavaScript se tornou uma linguagem totalmente independente com sua própria especificação chamada [ECMAScript] (http://en.wikipedia.org/wiki/ECMAScript), e agora ele não tem nenhuma relação com Java.
```

Hoje, o JavaScript pode ser executado não só no navegador, mas também no servidor, ou mesmo em qualquer dispositivo que tenha um programa especial chamado [Interpretador JavaScript] (https://pt.wikipedia.org/wiki/Interpretador_de_JavaScript).

O navegador tem um interpretador(motor) incorporado, às vezes chamado de "máquina virtual JavaScript".

Interpretadores diferentes têm "codinomes" diferentes. Por exemplo:

- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- no Chrome, Opera e Edge.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- no Firefox.
- ...Há outros codinomes como "Chakra" para o IE, "JavaScriptCore", "Nitro" e "SquirrelFish" para Safari, etc.

Os termos acima são bons para lembrar, pois são usados em artigos de desenvolvedores na internet. Vamos usá-los também. Por exemplo, se "um recurso X é suportado pelo V8", então ele provavelmente funciona no Chrom, Opera e Edge.

```smart header="Como funcionam os interpretadores?"

Os interpretadores são complicados. Mas o básico é fácil.

<<<<<<< HEAD
1. O interpretador (embutido se for um navegador) lê ("analisa") o script.
2. Depois converte ("compila") o script para a linguagem da máquina.
3. E então o código da máquina é executado, bem rápido.
=======
1. The engine (embedded if it's a browser) reads ("parses") the script.
2. Then it converts ("compiles") the script to machine code.
3. And then the machine code runs, pretty fast.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

O interpretador aplica otimizações em cada etapa do processo. Ele ainda observa o script compilado enquanto ele roda, analisa os dados que passam por ele e aplica otimizações ao código da máquina com base nesse conhecimento.
```

## O que o JavaScript no navegador pode fazer?

<<<<<<< HEAD
JavaScript moderno é uma linguagem de programação "segura". Ele não fornece acesso de baixo nível à memória ou CPU, porque foi inicialmente criado para navegadores que não necessitam dele.
=======
Modern JavaScript is a "safe" programming language. It does not provide low-level access to memory or the CPU, because it was initially created for browsers which do not require it.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

As capacidades do JavaScript dependem muito do ambiente em que está sendo executado. Por exemplo, [Node.js]https://pt.wikipedia.org/wiki/Node.js) suporta funções que permitem ao JavaScript ler/gravar arquivos arbitrários, executar solicitações de rede, etc.

O JavaScript no navegador pode fazer tudo relacionado à manipulação de páginas web, interação com o usuário e o servidor web.

Por exemplo, o JavaScript no navegador é capaz de:

- Adicionar novo HTML à página, alterar o conteúdo existente, modificar estilos.
- Reagir às ações do usuário, executar em cliques de mouse, movimentos de ponteiro, pressionamentos de teclas.
- Enviar solicitações através da rede para servidores remotos, baixar e carregar arquivos (as chamadas tecnologias [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) e [COMET](https://en.wikipedia.org/wiki/Comet_(programming))).
- Obter e definir cookies, fazer perguntas ao visitante, mostrar mensagens.
- Lembre-se dos dados no lado do cliente ("local storage").

## O que o JavaScript no navegador não pode fazer?

<<<<<<< HEAD
As habilidades do JavaScript no navegador são limitadas por uma questão de segurança do usuário. O objetivo é evitar que uma página maléfica acesse informações privadas ou prejudique os dados do usuário.
=======
JavaScript's abilities in the browser are limited to protect the user's safety. The aim is to prevent an evil webpage from accessing private information or harming the user's data.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

Exemplos de tais restrições incluem:

- JavaScript em uma página não pode ler/gravar arquivos arbitrários no disco rígido, copiá-los ou executar programas. Não tem acesso direto às funções do sistema operacional.

    Os navegadores modernos permitem que ele trabalhe com arquivos, mas o acesso é limitado e fornecido apenas se o usuário executar determinadas ações, como "dropping" de um arquivo em uma janela do navegador ou selecioná-lo por meio de uma tag `<input>`.

<<<<<<< HEAD
   Existem maneiras de interagir com a câmera / microfone e outros dispositivos, mas eles exigem permissão explícita do usuário. Assim, uma página habilitada para JavaScript pode não habilmente habilitar uma câmera web, observar os arredores e enviar as informações para a [NSA](https://pt.wikipedia.org/wiki/Ag%C3%AAncia_de_Seguran%C3%A7a_Nacional).
- Diferentes abas/janelas geralmente não se conhecem mutuamente. Às vezes sim, por exemplo, quando uma janela usa JavaScript para abrir a outra. Mas mesmo neste caso, JavaScript de uma página pode não acessar a outra se eles vierem de sites diferentes (de um domínio, protocolo ou porta diferente).

    Isso é chamado de "Política de mesma origem ". Para contornar isso, *ambas as páginas* devem conter um código JavaScript especial que lida com a troca de dados.

    Essa limitação é, novamente, para a segurança do usuário. Uma página de `http://umsitequalquer.com.br` que um usuário abriu não deve poder alcançar uma outra aba do navegador com a URL `http://gmail.com` e roubar a informação de lá.
- O JavaScript pode se comunicar facilmente pela rede com o servidor de onde a página atual veio. Mas sua capacidade de receber dados de outros sites / domínios é prejudicada. Embora possível, requer acordo explícito (expresso em cabeçalhos HTTP) do lado remoto. Mais uma vez, isso é uma limitação de segurança.

![](limitations.svg)

Esses limites não existem se o JavaScript for usado fora do navegador, por exemplo, em um servidor. Os navegadores modernos também permitem plugins / extensões que podem solicitar permissões estendidas.
=======
    There are ways to interact with the camera/microphone and other devices, but they require a user's explicit permission. So a JavaScript-enabled page may not sneakily enable a web-camera, observe the surroundings and send the information to the [NSA](https://en.wikipedia.org/wiki/National_Security_Agency).
- Different tabs/windows generally do not know about each other. Sometimes they do, for example when one window uses JavaScript to open the other one. But even in this case, JavaScript from one page may not access the other page if they come from different sites (from a different domain, protocol or port).

    This is called the "Same Origin Policy". To work around that, *both pages* must agree for data exchange and must contain special JavaScript code that handles it. We'll cover that in the tutorial.

    This limitation is, again, for the user's safety. A page from `http://anysite.com` which a user has opened must not be able to access another browser tab with the URL `http://gmail.com`, for example, and steal information from there.
- JavaScript can easily communicate over the net to the server where the current page came from. But its ability to receive data from other sites/domains is crippled. Though possible, it requires explicit agreement (expressed in HTTP headers) from the remote side. Once again, that's a safety limitation.

![](limitations.svg)

Such limitations do not exist if JavaScript is used outside of the browser, for example on a server. Modern browsers also allow plugins/extensions which may ask for extended permissions.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

## O que torna o JavaScript único?

Há pelo menos *três* grandes aspectos do JavaScript:

```compare
+ Integração total com HTML/CSS.
+ Coisas simples são feitas de forma simples.
+ Suporte para todos os principais navegadores e ativado por padrão.
```
JavaScript é a única tecnologia de navegador que combina estas três qualidades.

Isso é o que torna o JavaScript único. É por isso que é a ferramenta mais difundida para criar interfaces de navegador.

<<<<<<< HEAD
Ao passo que planeja aprender uma nova tecnologia, é benéfico verificar suas perspectivas. Então, vamos seguir para as tendências modernas que o afetam, incluindo novas linguagens e habilidades de navegador.
=======
That said, JavaScript can be used to create servers, mobile applications, etc.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

## Linguagens "sobre" JavaScript

A sintaxe do JavaScript não se adapta às necessidades de todos. Pessoas diferentes querem características diferentes.

Isso é de se esperar, porque os projetos e requisitos são diferentes para todos.

<<<<<<< HEAD
Então, recentemente uma infinidade de novas linguagens apareceu, que são *transpiladas* (convertidas) para JavaScript antes de rodarem no navegador.
=======
So, recently a plethora of new languages appeared, which are *transpiled* (converted) to JavaScript before they run in the browser.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

Ferramentas modernas tornam a transpilação muito rápida e transparente, permitindo que os desenvolvedores codifiquem em outra linguagem e auto-convertendo-a "sob o capô".

Exemplos de tais linguagens:

<<<<<<< HEAD
- [CoffeeScript](http://coffeescript.org/) é um "açúcar sintático" para JavaScript. Ele introduz uma sintaxe mais curta, permitindo-nos escrever um código mais claro e preciso. Normalmente, Ruby devs gostam dele.
- [TypeScript](http://www.typescriptlang.org/) está concentrado em adicionar "estritos tipos de dados" para simplificar o desenvolvimento e suporte de sistemas complexos. É desenvolvido pela Microsoft.
- [Flow](http://flow.org/) também adiciona tipos de dados, mas de uma forma diferente. Desenvolvido pela Facebook.
- [Dart](https://www.dartlang.org/) é uma linguagem autônoma que tem seu próprio interpretador que roda em ambientes fora do navegador (como aplicativos móveis), mas também pode ser transpilada para JavaScript. Desenvolvida pela Google.
- [Brython](https://brython.info/) é um transpilador de Python para JavaScript que permite escrever aplicativos em puro Python, sem JavaScript.
- [Kotlin](https://kotlinlang.org/docs/js-overview.html) é uma linguagem de programação moderna, concisa e segura, que pode ser usada no navegador ou no Node.

Há mais. Claro que, mesmo que usemos uma dessas linguagens transpiladas, também devemos saber JavaScript para entender o que estamos fazendo.
=======
- [CoffeeScript](https://coffeescript.org/) is "syntactic sugar" for JavaScript. It introduces shorter syntax, allowing us to write clearer and more precise code. Usually, Ruby devs like it.
- [TypeScript](https://www.typescriptlang.org/) is concentrated on adding "strict data typing" to simplify the development and support of complex systems. It is developed by Microsoft.
- [Flow](https://flow.org/) also adds data typing, but in a different way. Developed by Facebook.
- [Dart](https://www.dartlang.org/) is a standalone language that has its own engine that runs in non-browser environments (like mobile apps), but also can be transpiled to JavaScript. Developed by Google.
- [Brython](https://brython.info/) is a Python transpiler to JavaScript that enables the writing of applications in pure Python without JavaScript.
- [Kotlin](https://kotlinlang.org/docs/reference/js-overview.html) is a modern, concise and safe programming language that can target the browser or Node.

There are more. Of course, even if we use one of these transpiled languages, we should also know JavaScript to really understand what we're doing.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

## Resumo

- O JavaScript foi inicialmente criado como uma linguagem somente de navegador, mas agora é usado em muitos outros ambientes também.
- Hoje, o JavaScript tem uma posição única como a linguagem de navegador mais amplamente adotada, com integração total com HTML/CSS.
- Existem muitas linguagens que são "transpiladas" para JavaScript e que oferecem certas funcionalidades. Recomenda-se dar uma olhada nelas, pelo menos brevemente, depois de dominar o JavaScript.
