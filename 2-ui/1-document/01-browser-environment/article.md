# Ambiente do Navegador, especificações

A linguagem JavaScript foi inicialmente criada para navegadores para a web. Desde então, tem evoluído e se tornado uma linguagem com muitos usuários e plataformas.

A plataforma pode ser um navegador, ou um servidor web, ou uma máquina de lavar, ou outro *hospedeiro* (host). Cada um deles fornece funcionalidades específicas para a plataforma. Na especificação JavaScript é conhecida como *ambiente de hospedagem* (host environment).

Um ambente de hospedagem fornece objetos específicos para a platafoma e funções adicionais ao núcleo da linguagem. Navegadores web dão um meio paracontrolar páginas web. Node.js fornece funcionalidades para servidores (*server-side*), e assim por diante.

Aqui uma visão rápida do que temos quando JavaScript roda em um navegador web:

![](windowObjects.svg)

Existe um objeto "raiz" chamado `window`. Ele tem  dois papéis:

1. Primeiro, ele é um objeto global para o código JavaScript, como descrito no capítulo <info:global-object>.
2. Segundo, ele representa a "janela de navegação" e fornece métodos de controle.

Por exemplo, nós o usamos como objeto global:

```js run
function sayHi() {
  alert("Olá");
}

// funções globais sao acessíveis como propriedades de window
window.sayHi();
```

E nós o usamos como janela de navegação, para ver a altura da janela:

```js run
alert(window.innerHeight); // altura da janela interna
```

Existem mais métodos específicos de window e propriedades, vamos falar sobre eles mais tarde.

## Document Object Model (DOM)

O objeto `document` da acesso ao conteúdo da página. Nós podemos mudar ou criar qualquer coisa na página usando-o.

Por exemplo:
```js run
// mudando a cor do fundo para vermelho
document.body.style.background = "red";

// mudando a cor de volta depois de 1 segundo
setTimeout(() => document.body.style.background = "", 1000);
```

Aqui nós usamos `document.body.style`, mas existe muito, muito mais. Propriedades e métodos são descritos na especificação. 
Acontece que dois grupos de trabalho a desenvolveram:

1. [W3C](https://pt.wikipedia.org/wiki/W3C) -- a documentação está em <https://www.w3c.br/>.
2. [WhatWG](https://pt.wikipedia.org/wiki/Web_Hypertext_Application_Technology_Working_Group), publicação em <https://dom.spec.whatwg.org>.

Como às vezes acontece, os dois grupos nem sempre entram em concordância, então é como se nós tivessemos dois conjuntos de padrões (*standards*). Mas eles são muito parecidos e eventualmente as coisas se fundem. A documentação que você pode encontrar nos recursos dados é muito semelhante, com cerca de 99% de compatibilidade. Existem uma diferença pequena que você provavelmente não notaria.

Pessoalmente, eu acho <https://dom.spec.whatwg.org> mais prazeroso de usar.

Em um passado antigo, não existia nenhum tipo de padrão -- cada navegador implementava do jeito que queria. Diferentes navegadores tinham diferentes conjuntos, métodos, e propriedades para a mesma coisa, e desenvolvedores tinham que escrever códigos diferentes para cada um deles. Tempos negros e bagunçados.

Ainda hoje nós podemos nos deparar com código antigo que usa propriedades específicas de navegador e trabalha tratando incompatibilidades. Mas, neste tutorial nós iremos usar coisas modernas: não existe necessidade de aprender coisas antigas até você realmente precisar (as chances são altas de você não precisar).

Então o padrão DOM surgiu, numa tentativa de fazer com que todod mundo concordasse. A primeira versão era "DOM Level 1", e então foi estendida para DOM Level 2, depois DOM Level 3, e agora chegou a DOM Level 4. Pessoas do grupo WhatWG ficaram cansadas do número de versões e estão chamando somente "DOM", sem um número. Então vamos fazer o mesmo.

```smart header="DOM não é somente para navegadores"
A especificação DOM explica a estrutura de um documento e fornece objetos para manipulação. Existem instrumentos que não são de navegador que também usam-o.

Por exemplo, ferramentas para servidor (*server-side*) que fazem download e processam páginas HTML usam DOM. Contudo, elas podem ter suporte apenas para uma parte da especificação.
```

```smart header="CSSOM para estilizar"
Regras CSS e folhas de estilo não são estruturadas como HTML. Existe  uma especificação separada [CSSOM](https://www.w3.org/TR/cssom-1/) que explica como representá-las como objetos, e como ler e escrevê-las.

CSSOM é usado junto com DOM quando modificamoss regras de estilo para o documento. Na prática, CSSOM é raramente necessário, porque usualmente regras de CSS são estáticas. Raramente precisamos de adicionar/remover regras de CSS em JavaScript, então não iremos abordar isso agora.
```

## BOM (parte da especicação HTML)

Modelo de Objeto do Navegador (BOM) são objetos adicionais fornecidos pelo navegador (*host environment*) para trabalhar com tudo exceto o documento.

Por exemplo:

- O objeto de [navigator](mdn:api/Window/navigator) fornece informações de suporte sobre o navegador e o sistema operacional. Existem muitas propriedades, mas as duas mais usadas são: `navigator.userAgent` -- sobre o navegador atual, e `navigator.platform` -- sobre a plataforma (pode ajudar a diferenciar entre Windows/Linux/Mac etc).
- O objeto [location](mdn:api/Window/location) nos permite ler o URL atual e pode redirecionar o navegador para um novo.

Aqui um exemplo de como podemos usar o objeto `location`:

```js run
alert(location.href); // mostra o URL atual
if (confirm("Ir para wikipedia?")) {
  location.href = "https://wikipedia.org"; // redireciona o navegador para outro URL
}
```

Funções `alert/confirm/prompt` também são parte do BOM: não são diretamente relacionadas ao documento, mas representam puros métodos do navegador para comunicação com o usuário.


```smart header="especificação HTML"
BOM é parte da [Especificação HTML](https://html.spec.whatwg.org) geral.

Sim, voce ouviu direito. A especificação HTML em <https://html.spec.whatwg.org> não é somente sobre a "Linguagem HTML" (*tags*, atributos), mas também abrange vários objetos, métodos e específicas extensões ao DOM específicas para navegadores. Isso é "HTML em termos gerais". Também, algumas partes tem especificações adicionais listadas em <https://spec.whatwg.org>.
```

## Resumo

Falando sobre padrões, nós temos:

Especificação DOM
: Descreve a estrutura do documento, manipulações e eventos, veja em <https://dom.spec.whatwg.org>.

Especificação CSSOM
: Descreve folhas de estilo e regras de estilo, manipulações com elas e suas ligações a documentos, veja em <https://www.w3.org/TR/cssom-1/>.

Especificação HTML
: Descreve a linguagem HTML (ex. tags) e também o BOM (Modelo de Objeto do Navegador) -- várias funçoes de navegador: `setTimeout`, `alert`, `location` e assim por diante, veja em <https://html.spec.whatwg.org>. Basicamente a especificação DOM expandida com várias propriedades e métodos adicionais.

Agora iremos nos aprofundar em aprender DOM, porque a documentação tem papel principal na UI.

Porfavor anote os links acima, como existe muita coisa para aprender é impossível abranger e lembrar de tudo.

Quando você quiser ler sobre uma propriedade ou método, o manual da Mozilla em <https://developer.mozilla.org/en-US/search> é uma boa fonte, mas ler a espcificação correspondente pode ser melhor: é mais complexa e longo para ler, mas irá fazer seu conhecimento básico completo.
