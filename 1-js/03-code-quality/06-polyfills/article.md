
# Polyfills e transpilers

A linguagem JavaScript evolui constantemente. Novas propostas para a linguagem aparecem regularmente, elas são analisadas e, se consideradas valiosas, são anexadas à lista em <https://tc39.github.io/ecma262/> e depois progridem para a [especificação (en)](http://www.ecma-international.org/publications/standards/Ecma-262.htm).

Grupos por detrás dos interpretadores de JavaScript têm as suas próprias ideias sobre o que implementar primeiro. Eles podem decidir implementar propostas que estão em esboço e adiar coisas que já estão na spec, por serem menos interessantes ou apenas mais difíceis de fazer.

Assim, é muito comum que um interpretador implemente apenas parte de um padrão.

Uma boa página para se ver o estágio atual de suporte de funcionalidades da linguagem é <https://kangax.github.io/compat-table/es6/> (é extensa, nós ainda temos muito que estudar).

Como programadores, nós gostaríamos de usar as funcionalidades mais recentes. Quantas mais forem as coisas boas - melhor!

Por outro lado, como fazer o nosso código moderno funcionar em interpretadores antigos que ainda não compreendam as funcionalidades recentes?

Existem duas ferramentas para isso:

1. Transpilers.
2. Polyfills.

Aqui, neste capítulo, o nosso propósito é obter o essencial de como elas funcionam, e o seu lugar dentro do desenvolvimento para a web.

## Transpilers

Um [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) é uma peça especial de software que pode interpretar ("ler e compreender") código moderno, e o reescrever usando construções sintáticas antigas, mas de forma a que o resultado seja o mesmo.

Por exemplo, o JavaScript antes de 2020 não tinha o "operador de coalescência nula" `??`. Assim, se um visitante usar um navegador desatualizado, este não conseguirá compreender código como `height = height ?? 100`.

Um transpiler iria analisar o nosso código e reescrever `height ?? 100` para `(height !== undefined && height !== null) ? height : 100`.

```js
// antes de correr o transpiler
height = height ?? 100;

// depois de correr o transpiler
height = (height !== undefined && height !== null) ? height : 100;
```

Agora, o código reescrito está adequado a interpretadores de JavaScript antigos.

Geralmente, um desenvolvedor corre o transpiler na sua própria máquina, e depois coloca o código transpilado no servidor.

Falando em nomes, o [Babel](https://babeljs.io) é um dos mais prominentes transpilers por aí.

Sistemas para a construção de projetos modernos, tais como o [webpack](http://webpack.github.io/), fornecem meios para automaticamente correr o transpiler em cada alteração do código, e assim é muito fácil o integrar no processo de desenvolvimento.

## Polyfills

Novas funcionalidades da linguagem podem incluir não só construções sintáticas e operadores, mas também funções incorporadas.

Por exemplo, `Math.trunc(n)` é uma função que "corta" a parte decimal de um número, ex. `Math.trunc(1.23) = 1` retorna 1.

Em alguns (muito desatualizados) interpretadores de JavaScript, não existe `Math.trunc`, por isto esse código irá falhar.

Como estamos a falar de novas funções, e não de alterações sintáticas, não é necessário transpilar nada aqui. Nós, apenas precisamos de declarar a função em falta.

Um script que atualize/adicione novas funções é chamado de "polyfill". Ele "preenche" o intervalo e adiciona implementações que faltem.

Para o caso em particular, o polyfill para `Math.trunc` é um script que o implementa, como aqui:

```js
if (!Math.trunc) { // se a função não existir
  // implemente-a
  Math.trunc = function(number) {
    // Math.ceil e Math.floor existem mesmo em interpretadores de JavaScript antigos
    // elas são estudadas mais adiante neste tutorial
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

O JavaScript é uma linguagem altamente dinâmica, e scripts podem adicionar/modificar quaisquer funções, incluindo até incorporadas.

Duas interessantes bibliotecas de polyfills são:
- [core js](https://github.com/zloirock/core-js) que suporta muitas funcionalidades, e permite apenas incluir aquelas necessárias.
- [polyfill.io](http://polyfill.io) um serviço que fornece um script com polyfills, dependendo das funcionalidades e do navegador do utilizador.


## Resumo

Neste capítulo, gostaríamos de o motivar a estudar funcionalidades modernas ou até em esboço da linguagem, mesmo que elas ainda não tenham um bom suporte pelos interpretadores de JavaScript.

Apenas não se esqueça de usar um transpiler (se empregar sintaxe ou operadores modernos) e polyfills (para adicionar funções que possam estar ausentes). E eles irão garantir que o código funciona.

Por exemplo, mais adiante quando estiver familiarizado com o JavaScript, você pode configurar um sistema para a construção de código com base no [webpack](http://webpack.github.io/) e com o plugin [babel-loader](https://github.com/babel/babel-loader).

Bons recursos que mostram o estágio atual do suporte para várias funcionalidades:
- <https://kangax.github.io/compat-table/es6/> - para puro JavaScript.
- <https://caniuse.com/> - para funções com relação ao navegador.

P.S. O Google Chrome, geralmente é o mais atualizado relativamente a funcionalidades da linguagem, tente-o se um exemplo no tutorial falhar. Contudo, a maioria dos exemplos no tutorial funcionam com qualquer navegador moderno.
