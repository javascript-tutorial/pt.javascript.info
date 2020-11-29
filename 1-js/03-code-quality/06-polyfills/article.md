
# Polyfills

A linguagem JavaScript evolui constantemente. Novas propostas à linguagem aparecem regularmente, onde elas são analisadas e, se consideradas que valem a pena, anexadas à lista em <https://tc39.github.io/ecma262/>, onde depois avançam para a [especificação](http://www.ecma-international.org/publications/standards/Ecma-262.htm).

Os times por detrás dos interpretadores de JavaScript (_JavaScript engines_) têm as suas próprias idéias sobre o que implementar primeiro. Eles podem decidir por implementar propostas que estão em rascunho e postergar coisas que já estão na especificação, porque elas são menos interessantes ou simplesmente mais difíceis de fazer.

Assim, é bastante comum para um interpretador (_engine_) implementar apenas uma parte do padrão.

Uma boa página para visualizar o estado atual do suporte de funcionalidades é <https://kangax.github.io/compat-table/es6/> (é bastante conteúdo, ainda temos muito o que estudar).

## Babel

Quando usamos funcionalidades modernas da linguagem, alguns interpretadores (_engines_) podem não suportar esse código. Como dito anteriormente, nem todas as funcionalidades são implementadas em todos os lugares.

É aqui que o Babel vem para nos ajudar.

[Babel](https://babeljs.io) é um [_transpiler_](https://en.wikipedia.org/wiki/Source-to-source_compiler). Ele reescreve um código em JavaScript moderno em um padrão antigo.

Atualmente, o Babel possui duas partes:

1. Primeiro, o programa responsável pelo _transpile_. O desenvolvedor roda o programa na própria máquina, onde o código é reescrito para um padrão mais antigo. Após isso, o codigo é entregue ao website para os usuários. Sistemas de _build_ modernos como [webpack](http://webpack.github.io/) fornecem meios para executar o _transpiler_ automaticamente em todas as mudanças realizadas no código, de forma a tornar fácil de integrar com um processo de desenvolvimento.

2. Segundo, o _polyfill_.

    Novas funcionalidades na linguagem podem incluir não apenas estruturas de sintaxe, mas também funcionalidades embutidas.
    O _transpiler_ reescreve o código, transformando estruturas de sintaxe em outras mais antigas. Porém, para novas funcionalidades, precisamos implementá-los. O JavaScript é uma linguagem altamente dinâmica, onde _scripts_ podem não apenas adicionar novas funcionalidades, mas também modificar as já incorporadas na linguagem, de forma a que elas se comportem de acordo com o padrão moderno.

    Existe o termo "polyfill" para _scripts_ que "preenchem" essa lacuna e adicionam as implementações que faltam.

    Dois _polyfills_ interessantes são:
    - [babel _polyfill_](https://babeljs.io/docs/usage/polyfill/) que suporta várias funcionalidades, mas é bem grande.
    - [polyfill.io](http://polyfill.io) serviço que permite carregar/construir _polyfills_ sob demanda, dependendo das funcionalidades que precisamos.

Então, precisamos de configurar o _transpiler_ e adicionar o _polyfill_ para fazer com que os interpretadores (_engines_) antigos suportem novas funcionalidades.

Se nos orientarmos por _engines_ modernas e só usarmos as _features_ (funcionalidades) suportadas em toda parte, não precisamos de usar o Babel.

## Exemplos no tutorial

````online
Muitos exemplos são executáveis diretamente no local, como esse:

```js run
alert('Pressione o botão "Play" no canto superior direito para executar');
```

Exemplos que usam JavaScript moderno só irão funcionar se o seu navegador tiver suporte.
````

```offline
Como você está lendo a versão offline, os exemplos não são executáveis, mas eles geralmente funcionam :)
```

O [Chrome Canary](https://www.google.com/chrome/browser/canary.html) é bom para todos os exemplos, mas outros navegadores modernos também funcionam bem.

Note que podemos usar o Babel em produção (aplicações reais, não em fase de desenvolvimento) para tornar o código compatível para navegadores que não são tão recentes, de forma a eliminarmos tal limitação e o código ser executado em qualquer lugar.
