# Comentários

Como o sabemos pelo capítulo <info:structure>, comentários podem ser de linha-única: começando por `//`, e de múltiplas linhas: `/* ... */`.

Normalmente, os usamos para descrever como e porque o código funciona.

Na primeira leitura, os comentários devem ser óbvios, mas programadores inexperientes frequentemente os usam de forma errada.

## Maus comentários

Inexperientes, tendem a usar comentários para explicar "o que se passa no código". Desta forma:

```js
// Este código fará isto (...) e aquilo (...)
// ...e quem sabe o que mais...
código;
muito;
complexo;
```

Mas, em bom código, a quantidade de tais comentários "explanatórios" deveria ser mínima. A sério, o código deveria ser fácil de se compreender sem eles.

Existe uma grande regra sobre isso: "se o código for tão pouco claro que requeira um comentário, então talvez devesse ser re-escrito".

### Receita: dê relevo a funções

Por vezes, é benéfico substituir uma peça de código por uma função, como aqui:

```js
function showPrimes(n) {
  nextPrime:
  for (let i = 2; i < n; i++) {

*!*
    // verifica se i é um número primo
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
*/!*

    alert(i);
  }
}
```

A melhor variante, com uma função `isPrime` em relevo:

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }

  return true;
}
```

Agora, compreendemos o código mais fácilmente. A própria função torna-se num comentário. Código semelhante é chamado de auto-descritivo.

### Receita: crie funções

E, se tivermos uma longa "folha de código" como esta:

```js
// aqui adicionamos whiskey
for(let i = 0; i < 10; i++) {
  let drop = getWhiskey();
  smell(drop);
  add(drop, glass);
}

// aqui adicionamos sumo
for(let t = 0; t < 3; t++) {
  let tomato = getTomato();
  examine(tomato);
  let juice = press(tomato);
  add(juice, glass);
}

// ...
```

Então, poderá ser uma melhor variante reestruturar o código assim:

```js
addWhiskey(glass);
addJuice(glass);

function addWhiskey(container) {
  for(let i = 0; i < 10; i++) {
    let drop = getWhiskey();
    //...
  }
}

function addJuice(container) {
  for(let t = 0; t < 3; t++) {
    let tomato = getTomato();
    //...
  }
}
```

Mais uma vez, as próprias funções dizem o que se passa. Não há nada a comentar. E também a estrutura do código é melhorada, quando repartida. Está claro o que cada função faz, o que recebe e o que retorna.

Na realidade, não podemos evitar totalmente comentários "explanatórios". Existem algoritmos complexos. E existem "ajustes"  ("*tweaks*") inteligentes para fins de otimização. Mas, geralmente deveríamos tentar manter o código simples e auto-descritivo.

## Bons comentários

Assim, comentários explanatórios são geralmente maus. Que comentários são bons?

Descreva a arquitetura
: Forneça uma visão dos componentes a alto-nível, como eles iteragem, qual o fluxo de controlo em várias situações... Em resumo -- uma visão panorâmica do código. Existe uma linguagem especial, [UML](https://pt.wikipedia.org/wiki/UML), para construir diagramas de estruturas de alto-nível que expliquem o código. Definitivamente, vale a pena a estudar.

Documente os parâmetros e o uso da função
: Existe uma sintaxe especial, [JSDoc](http://en.wikipedia.org/wiki/JSDoc), para documentar uma função: o seu uso, parâmetros, e valor retornado.

Por exemplo:

```js
/**
 * Retorna x elevado à n-ésima potência.
 *
 * @param {number} x O número a elevar.
 * @param {number} n A potência, deve ser um número natural.
 * @return {number} x elevado à n-ésima potência.
 */
function pow(x, n) {
  ...
}
```

Tais comentários, nos permitem compreender o propósito da função e a usar de forma correta, sem olhar para o seu código.

A propósito, muitos editores, como o [WebStorm](https://www.jetbrains.com/webstorm/, podem também os perceber e os usar para fornecer completação automática de palavras (*autocomplete*), e algumas verificações de código (*code-checking*) automáticas.

Também, existem ferramentas como o [JSDoc 3](https://github.com/jsdoc3/jsdoc), que podem gerar documentação HTML a partir de comentários. Pode ler mais informação sobre o JSDoc em <http://usejsdoc.org/>.

Porque é a tarefa solucionada dessa forma?
: O que está escrito é importante. Mas, o que *não* está escrito pode ser ainda mais importante, para se compreender o que se passa. Porque é a tarefa solucionada exatamente dessa forma? O código não dá resposta alguma.

    Se existirem muitas formas de se resolver uma tarefa, porque esta? Especialmente, quando não é a mais óbvia.

    Sem tais comentários, a seguinte situação é possivel:
    1. Você (ou o seu colega) abre o código escrito há algum tempo, e vê que é "subótimo".
    2. Você pensa: "Quão estúpido fui naquela altura, e quão mais inteligente sou agora", e re-escreve o código empregando a variante "mais óbvia e correta".
    3. ...A urgência para reescrever foi boa. Mas, durante o processo você vê que a "mais óbvia" é na verdade sofrível. Você vagamente lembra-se porquê, porque já a tentou há muito tempo. Você a reverte para a variante correta, mas o tempo já foi perdido.

    Comentários que expliquem a solução são muito importantes. Eles ajudam a continuar o desenvolvimento de forma correta.

Algumas particularidades subtis no código? Onde elas são empregues?
: Se o código tem alguma coisa subtil e não-intuitiva, definitivamente vale a pena comentar.

## Resumo

Sinais importantes de um bom desenvolvedor, são comentários: a sua presença e até a sua ausência.

Bons comentários, nos permitem manter o código saudável, voltar a ele após uma demora e o usar com mais eficácia.

**Comente isto:**

- A arquitetutaem geral, numa visão de alto-nível.
- O uso das funções.
- Soluções importantes, especialmente quando não imediatamente óbvias.

**Evite comentários:**

- Que digam "como o código funciona" e "o que faz".
- Coloque-os apenas se for impossível tornar o código tão simples e auto-descritivo que não precise deles.

Comentários também são utilizados por ferramentas de auto-documentação, como o JSDoc3: elas os lêm e geram documentos em HTML (ou documentos num outro formato).
