
# Polyfills e transpiladores

A linguagem JavaScript evolui constantemente. Novas propostas para a linguagem surgem regularmente, elas são analisadas e, se consideradas interessantes,  serão adicionadas à lista <https://tc39.github.io/ecma262/> e depois progridem para a [especificação](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/).

As equipes por trás dos mecanismos JavaScript têm suas próprias ideias sobre o que implementar primeiro. Eles podem decidir implementar propostas que estão em rascunho e adiar coisas que já estão dentro das especificações, porque são menos interessantes ou simplesmente mais difíceis de fazer.

Portanto, é bastante comum que um mecanismo implemente apenas parte do padrão.

Uma excelente página para ver o estado atual do suporte aos recursos da linguagem é <https://compat-table.github.io/compat-table/es6> (a lista é gigante, temos muito o que estudar pela frente!)

Como programadores, gostaríamos de usar os recursos mais recentes. Quanto mais coisas boas – melhor!

Por outro lado, como fazer nosso código moderno funcionar em motores (engines) mais antigos que ainda não entendem os recursos recentes?

Existem duas ferramentas para contornar isso:

1. Transpiladores (Transpilers).
2. Scripts de Preenchimentos (Polyfills).

Aqui, neste capítulo, nosso objetivo é entender a essência de como eles funcionam e seu lugar no mundo do desenvolvimento web.

## Transpiladores

Um [transpilador](https://en.wikipedia.org/wiki/Source-to-source_compiler) é um software especial que traduz o código-fonte em outro código-fonte. Ele pode analisar ("ler e compreender") código moderno e reescrevê-lo usando construções de sintaxe mais antigas, para que também funcione em mecanismos desatualizados.

Por exemplo, JavaScript antes do ano 2020 não tinha o "operador de coalescência nulo" `??`. Portanto, se um usuário utilizar um navegador desatualizado, ele poderá não entender o código como `height = height ?? 100`.

Um transpilador analisaria nosso código e reescreveria a `height ?? 100` em algo parecido com `(height !== undefined && height !== null) ? height : 100`

```js
// antes de executar o transpilador
height = height ?? 100;

// após executar o transpilador
height = (height !== undefined && height !== null) ? height : 100;
```

Agora, o código reescrito é adequado para mecanismos JavaScript mais antigos.

Normalmente, um desenvolvedor executa o transpilador em seu próprio computador e, em seguida, faz o deploy do código transpilado para o servidor.

Falando em nomes, [Babel](https://babeljs.io) é um dos transpiladores mais populares que existe.

Sistemas modernos de construção de projetos, como o [webpack](https://webpack.js.org/), fornecem um meio de executar um transpilador automaticamente em cada alteração de código, por isso é muito fácil integrá-lo ao processo de desenvolvimento.

## Scripts de Preenchimentos (Polyfills)

Novos recursos de linguagem podem incluir não apenas construções e operadores de sintaxe, mas também funções integradas (built-in functions).

Por exemplo, `Math.trunc(n)` é uma função que "retira" a parte decimal de um número, por exemplo, `Math.trunc(1.23)` retorna `1`.

Em alguns mecanismos JavaScript (muito desatualizados), não há `Math.trunc`, portanto, esse código falhará.

Como estamos falando de novas funções, não de mudanças de sintaxe (como linguagem é escrita), não há necessidade de transpilar nada aqui. Precisamos apenas declarar a função que falta.

Um script que atualiza/adiciona novas funções é chamado de "polyfill". Ele "preenche" a lacuna e adiciona implementações ausentes.

Para este caso específico, o polyfill para `Math.trunc` seria um script implementado da seguinte forma:

```js
if (!Math.trunc) { // se não existir a função
  // Implementação da função
  Math.trunc = function(number) {
    // Math.ceil and Math.floor já existem mesmo em mecanismos bem antigos
    // elas serão abordadas posteriormente
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```
JavaScript é uma linguagem altamente dinâmica. Os scripts podem adicionar/modificar qualquer função, mesmo as integradas (built-in functions).


Duas bibliotecas de polyfills interessantes são:

- [core js](https://github.com/zloirock/core-js) que oferece suporte a muitas funcionalidades e permite incluir apenas as necessárias.
- [polyfill.io](https://polyfill.io/) um serviço que fornece um script com polyfills, dependendo das funcionalidades e do navegador do usuário.


## Resumo

Neste capítulo, gostaríamos de motivá-lo a estudar recursos de linguagem modernos e até mesmo "de ponta", mesmo que ainda não sejam bem suportados por mecanismos JavaScript.

Só não se esqueça de usar um transpilador (se estiver usando sintaxe ou operadores modernos) e polyfills (para preencher funções que possam estar faltando). Eles garantirão que o código funcione.

Por exemplo, mais tarde, quando estiver familiarizado com JavaScript, você poderá configurar um sistema de construção de código baseado em [webpack](https://webpack.js.org/) com o plugin [babel-loader](https://github.com/babel/babel-loader).

Sites que mostram o estado atual do suporte para vários recursos da linguagem:
- <https://kangax.github.io/compat-table/es6/> - para JavaScript puro.
- <https://caniuse.com/> - para funcionalidades relacionadas ao navegador.

**Observação:**
O Google Chrome geralmente é o mais atualizado em termos de recursos de linguagem. 
Experimente alguns recursos listado no [Caniuse](https://caniuse.com), veja se consegue encontrar algum recurso que falha na versão atual do Google Chrome, ou do seu navegador favorito. 

A maioria dos tutoriais de demonstrações apresentados aqui funcionam com qualquer navegador moderno. Fique à vontade para experimentá-los!