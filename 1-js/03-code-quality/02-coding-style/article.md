# Estilo de Código

O nosso código, deve ser o mais limpo e fácil de ler o quanto possível.

Isto é, na verdade, a arte de programar -- tomar uma tarefa complexa e codificá-la de uma forma que tanto seja correta, como humanamente legível. Um bom estilo de código em muito ajuda para tal.

## Sintaxe

Aqui está uma cábula (*cheatsheet*) com algumas sugestões de regras (veja abaixo mais detalhes):

![](code-style.svg)
<!--
```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n < 0) {
  alert(`A potência de ${n} não é suportada,
    por favor insira um número inteiro positivo`);
} else {
  alert( pow(x, n) );
}
```

-->

Agora, vamos discutir em pormenor as regras e razões para as sugestões.

```warn header="Não exitem regras \"você deve\" "
Nada está gravado em pedra aqui. Estas são preferências de estilo, não rígidos dogmas.
```

### Chavetas

Em muitos projetos em JavaScript, as chavetas são escritas no estilo "Egípcio", com a de abertura na mesma linha que a palavra-chave correspondente -- não numa nova linha. Também deveria existir um espaço antes da chaveta de abertura, desta forma:

```js
if (condição) {
  // faça isto
  // ...e isso
  // ...e aquilo
}
```

Uma construção de única-linha, tal como `if (condição) doSomething()`, é um importante caso de exceção. Devemos utilizar chavetas, ou não?

Aqui estão variantes com anotações, para que por si mesmo você possa avaliar a sua legíbilidade:

1. 😠 Principiantes, por vezes fazem isto. É mau! As chavetas não são necessárias:
    ```js
    if (n < 0) *!*{*/!*alert(`A potência ${n} não é suportada`);*!*}*/!*
    ```
2. 😠 Dividida por linhas em separado, sem chavetas. Nunca faça isso; é fácil cometer erros ao adicionar mais linhas:
    ```js
    if (n < 0)
      alert(`A potência ${n} não é suportada`);
    ```
3. 😏 Uma linha, sem chavetas - aceitável, se for curta:
    ```js
    if (n < 0) alert(`A potência ${n} não é suportada`);
    ```
4. 😃 A melhor variante:
    ```js
    if (n < 0) {
      alert(`A potência ${n} não é suportada`);
    }
    ```

Para código muito curto, uma única linha é aceitável, ex: `if (cond) return null`. Mas, um bloco de código (a última variante) é geralmente mais legível.

### Comprimento da linha

Ninguém gosta de ler uma longa linha horizontal de código. A melhor prática é a particionar.

Por exemplo:

```js
// o acento grave (*backtick*) ` permite repartir uma *string* por múltiplas linhas
let str = `
  O TC39 da ECMA International, é um grupo de desenvolvedores e implementadores de  JavaScript, académicos, e outros, colaborando com a comunidade para manter e
  evoluir a definição de JavaScript.
`;
```

E, para instruções `if`:

```js
if (
  id === 123 &&
  moonPhase === 'Waning Gibbous' &&
  zodiacSign === 'Libra'
) {
  letTheSorceryBegin();
}
```

O máximo comprimento da linha deveria ser acordado entre os membros de uma equipa de trabalho. Geralmente, vai de 80 a 120 caráteres.

### Indentação

Existem dois tipos de indentação:

- **Indentação horizontal: 2 ou 4 espaços.**

    Uma indentação horizontal é feita quer inserindo 2 ou 4 espaços, quer usando símbolo de tabulação horizontal (tecla `key:Tab`). Qual deles escolher, vem sendo uma guerra antiga. Hoje em dia, os espaços são mais comuns.

    Uma vantagem dos espaços sobre *tabs*, é que espaços permitem configurações de indentação mais flexíveis do que o símbolo "Tab".

    Por exemplo, podemos alinhar os argumentos com o parêntese de abertura, desta forma:

    ```js no-beautify
    show(parameters,
         alinhada, // 5 espaços adicionados à esquerda  
         uma,
         após,
         outra
      ) {
      // ...
    }
    ```

- **Indentação vertical: linhas em branco para separar o código em blocos lógicos.**

    Até uma simples função pode, por vezes, ser dividida em blocos lógicos. No exemplo abaixo, a inicialização de variáveis, o laço (*loop*), e o resultado retornado estão separados verticalmente:

    ```js
    function pow(x, n) {
      let result = 1;
      //              <--
      for (let i = 0; i < n; i++) {
        result *= x;
      }
      //              <--
      return result;
    }
    ```

    Insira uma nova linha extra onde ajudar a tornar o código mais legível. Não deveriam existir mais de nove linhas de código sem uma indentação vertical.

### Pontos-e-vírgula

Um ponto-e-vírgula deveria estar presente no fim de cada instrução, mesmo que possívelmente pudesse ser omitido.

Existem linguagens em que o ponto-e-vírgula é verdadeiramente opcional, e raramente utilizado. Contudo, em JavaScript, há casos em que uma quebra-de-linha não é interpretada como um ponto-e-vírgula, deixando o código vulnerável a erros. Veja mais sobre isto no capítulo <info:structure#semicolon>.

Se for programador de JavaScript experiente, poderá escolher um estilo de código sem ponto-e-vírgula como [StandardJS](https://standardjs.com/). Até lá, o melhor será usar pontos-e-vírgula para evitar possíveis precalços. A maior parte dos desenvolvedores coloca pontos-e-vírgula.

### Níveis aninhados

Tente evitar aninhar (*nesting*) código a muitos níveis de profundidade.

Por exemplo, num ciclo (*loop*) por vezes é boa ideia utilizar o comando ["continue"](info:while-for#continue) para evitar mais aninhamentos.

Por exemplo, em vez de adicionar uma condição `if` aninhada como esta:

```js
for (let i = 0; i < 10; i++) {
  if (cond) {
    ... // <- mais um nível de aninhamento
  }
}
```

Poderá escrever:

```js
for (let i = 0; i < 10; i++) {
  if (!cond) *!*continue*/!*;
  ...  // <- nenhum nível de aninhamento extra
}
```

O mesmo poderá ser feito com `if/else` e `return`.

Por exemplo, as duas construções abaixo são idênticas.

Opção 1:

```js
function pow(x, n) {
  if (n < 0) {
    alert("'n' negativo não suportado");
  } else {
    let result = 1;

    for (let i = 0; i < n; i++) {
      result *= x;
    }

    return result;
  }  
}
```

Opção 2:

```js
function pow(x, n) {
  if (n < 0) {
    alert("'n' negativo não suportado");
    return;
  }

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

A segunda é mais legível, porque o "caso especial" `n < 0` é tratado cedo. Uma vez a verificação feita, podemos prosseguir para o fluxo "principal" do código, sem necessidade de aninhamento (*nesting*) adicional.

## Local da função

Se estiver a escrever várias funções "auxiliares" (*"helper" functions*) acompanhadas do código que as utiliza, existem três formas para organizar as funções.

1. Funções acima do código que as utiliza:

    ```js
    // *!*declarações de funções*/!*
    function createElement() {
      ...
    }

    function setHandler(elem) {
      ...
    }

    function walkAround() {
      ...
    }

    // *!*o código que as utiliza*/!*
    let elem = createElement();
    setHandler(elem);
    walkAround();
    ```

2. O código primeiro, depois as funções:

    ```js
    // *!*o código que utiliza as funções*/!*
    let elem = createElement();
    setHandler(elem);
    walkAround();

    // --- *!*funções auxiliares (*helper functions*)*/!* ---
    function createElement() {
      ...
    }

    function setHandler(elem) {
      ...
    }

    function walkAround() {
      ...
    }
    ```

3. Mista: uma função é declarada onde for empregue pela primeir vez.

A maior parte da vezes, a segunda variante é a preferida.

Isto porque ao ler o código, queremos primeiro saber *o que faz*. Se o código estiver primeiro, então isso se torna claro a partir do início. Aí, talvez nem precisemos de ler as funções, especialmente se os seus nomes descreverem o que na verdade fazem.

## Guias de Estilo

Um guia de estilo contém regras gerais sobre "como escrever" código, ex. que aspas utilizar, quantos espaços indentar, qual o máximo comprimento de linha, etc. Uma quantidade de aspetos menores.

Quando todos os membros de uma equipa usam o mesmo guia de estilo, o código parece uniforme, independentemente do membro da equipa que o tenha escrito.

Óbviamente, que uma equipa pode sempre escrever o seu próprio guia de estilo, mas geralmente não há necessidade. Existem muitos guias à escolha.

Algumas opções populares:

- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)
- [StandardJS](https://standardjs.com/)
- (e muitas mais)

Se for um programador iniciante, começe pela cábula (*cheatsheet*) dísponivel no início deste capítulo. Depois, poderá procurar por outros guias de estilo afim de colher mais ideias e decidir qual prefere.

## *Linters* Automatizados

*Linters*, são ferramentas que automáticamente verificam o estilo do seu código e fazem sugestões para o alterar.

O seu ponto-forte reside em, à medida que verificam o estilo, poderem encontrar alguns erros (*bugs*), como nomes de variáveis ou de funções mal-escritos. Devido a esta capacidade, é recomendado que use um *linter* mesmo que não queira aderir a um certo "estilo de código".

Aqui estão algumas das mais conhecidas ferramentas de *linting*:

- [JSLint](http://www.jslint.com/) -- um dos primeiros *linters*.
- [JSHint](http://www.jshint.com/) -- mais configurações do que *JSLint*.
- [ESLint](http://eslint.org/) -- provávelmente o mais recente.

Todos eles podem executar a tarefa. O autor utiliza [ESLint](http://eslint.org/).

Muitos *linters* estão integrados em editores populares: apenas ative a extensão (*plugin*) no editor e configure o estilo.

Por exemplo, para o *ESLint* deveria efetuar o seguinte:

1. Instale o [Node.js](https://nodejs.org/pt-br/).
2. Instale o *ESLint* com o comando `npm install -g eslint` (*npm* é um instalador de pacotes [*package installer*] para JavaScript).
3. Crie um ficheiro de configuração (*config file*) com o nome `.eslintrc` na raiz do seu projeto em JavaScript (na pasta que contém todos os seus ficheiros).
4. Instale/ative a extensão (*plugin*) para o seu editor que faça a integração com o *ESLint*. A maior parte dos editores tem uma.

Aqui está um exemplo de um ficheiro `.eslintrc`:

```js
{
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "rules": {
    "no-console": 0,
  },
  "indent": 2
}
```

Aqui a diretiva `"extends"` denota que a configuração tem como base o conjunto de configurações em "eslint:recommended". Depois disso, podemos especificar as nossas próprias.

Também é possível descarregar conjuntos de regras de estilo da web e depois estendê-los. Veja em <http://eslint.org/docs/user-guide/getting-started> mais detalhes sobre a instalação.

De igual modo, certos *IDEs* (Ambientes de Desenvolvimento Integrado) têm *linting* incorporado (*built-in*), o que é conveniente mas não tão personalizável como o *ESLint*.

## Resumo

Todas as regras sintáticas descritas neste capítulo (e nos guias de estilo referenciados) têm como objetivo aumentar a legibilidade do seu código. Todas elas são questionáveis.

Quando pensarmos em escrever "melhor" código, as questões que deveríamos nos perguntar são: "O que faz o código mais legível e mais fácil de compreender?" e "O que nos pode ajudar a evitar erros?" Estes são os principais aspetos a ter em mente ao escolher e debater estilos de código.

A leitura de guias de estilo populares, permite-nos estar a par das mais recentes ideias sobre tendências, e melhores práticas, de estilos de código.
