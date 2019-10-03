# Edtilo de Código

O nosso código deve ser o mais limpo e fácil de ler, o quanto possível.

Isto é, na verdade, a arte de programar -- tomar uma tarefa complexa e codificá-la de uma forma que tanto seja correta, como humanamente legível.

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
    por favor insira um número inteiro, maior do que 0`);
} else {
  alert( pow(x, n) );
}
```

-->

Agora, vamos discutir essas regras e os razões para elas em detalhe.

```warn header="Irony Detected"
Nada está gravado em pedra aqui. Estas são preferências de estilo, não rígidos dogmas.
```

### Chavetas

Em muitos projetos em JavaScript, chavetas são escritas no estilo "Egípcio", com a de abertura na mesma linha que a palavra-chave correspondente -- não numa nova linha. Também deveria existir um espaço antes da chaveta de abertura, desta forma:

```js
if (condition) {
  // faça isto
  // ...e isso
  // ...e aquilo
}
```

Uma única linha de construção é um importante caso de exceção. Devemos utilizar chavetas, ou não? Se sim, então onde?

Aqui estão variantes com anotações, para que por si mesmo julgue a sua legíbilidade:

<!--
```js no-beautify
if (n < 0) {alert(`Power ${n} is not supported`);}

if (n < 0) alert(`Power ${n} is not supported`);

if (n < 0)
  alert(`Power ${n} is not supported`);

if (n < 0) {
  alert(`Power ${n} is not supported`);
}
```
-->
![](figure-bracket-style.png)

Em resumo:
- Para código muito curto, uma única linha é aceitável. Por exemplo: `if (cond) return null`.
- Mas, uma linha em separado para cada instrução entre chavetas, geralmente é mais fácil de se ler.

### Comprimento da linha

Ninguém gosta de ler uma longa linha horizontal de código. A melhor prática é particioná-la e limitar o comprimento de cada linha.

O comprimento máximo de linha deveria ser acordado ao nível da equipa de trabalho. Geralmente, é de 80 ou 120 carateres.

### Indentação

Existem dois tipos de indentação:

- **Indentação horizontal: 2 ou 4 espaços.**

    Uma indentação horizontal é feita quer inserindo 2 ou 4 espaços, ou empregando a tecla (*símbolo*) "Tab". Qual escolher, vem sendo uma guerra antiga. Hoje em dia, espaços são mais comuns.

    Uma vantagem de espaços sobre *tabs*, é que espaços permitem mais flexibilidade para personalizar a indentação do que o símbolo "Tab".

    Por exemplo, podemos alinhar os argumentos e a chaveta de abertura, desta forma:

    ```js no-beautify
    show(parameters,
         aligned, // 5 espaços adicionados à esquerda  
         one,
         after,
         another
      ) {
      // ...
    }
    ```

- **Indentação vertical: linhas em branco para separar o código em blocos lógicos.**

    Até uma simples função pode, por vezes, ser dividida em blocos lógicos. No exemplo abaixo, a inicialização de variáveis, o laço principal e o resultado retornado estão separados verticalmente:

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

Existem linguagens em que o ponto-e-vírgula é verdadeiramente opcional, e raramente utilizado. Contudo, em JavaScript, há casos em que uma quebra-de-linha não é interpretada como um ponto-e-vírgula, deixando o código vulnerável a erros.

Há medida que ganhar maturidade como programador, poderá ser que escolha um estilo sem ponto-e-vírgula como [StandardJS](https://standardjs.com/). Até lá, o melhor será utilizar pontos-e-vírgula para evitar possíveis precalços.

### Níveis aninhados

Tente evitar aninhar (*nesting*) código a muitos níveis de profundidade.

Por vezes, é boa ideia utilizar a diretiva ["continue"](info:while-for#continue) num laço, afim de evitar mais aninhamentos.

Por exemplo, em vez de adicionar uma condição `if` aninhada (*nested*) desta forma:

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

A segunda é mais legível, porque o "caso limite" (*edge case*) de `n < 0` é tratado cedo. Uma vez a verificação feita, podemos prosseguir para o fluxo "principal" do código, sem necessidade de aninhamento (*nesting*) adicional.

## Localização da função

Se estiver a escrever várias funções "auxiliares" (*"helper" functions*) acompanhadas do código que as utilizem, existem três formas para organizar as funções.

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

Isto porque ao ler o código, queremos primeiro saber *o que faz*. Se o código estiver primeiro, então ele fornece essa informação. Aí, talvez nem precisemos de ler as funções, especialmente se os seus nomes descreverem o que na verdade fazem.

## Guias de Estilo

Um guia de estilo contém regras gerais sobre "como escrever" código, ex. que aspas utilizar, quantos espaços indentar, onde colocar quebras de linha, etc. Uma quantidade de aspetos menores.

Quando todos os membros de uma equipa usam o mesmo guia de estilo, o código parece uniforme, qualquer que seja o membro da equipa que o tenha escrito.

Óbviamente, que uma equipa pode sempre escrever o seu próprio guia de estilo. Contudo, a maior parte das vezes não há necessidade. Existem muitas opções testadas e juramentadas por onde escolher, por isso adotar uma delas geralmente será a sua melhor aposta.

Algumas escolhas populares:

- [Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.xml)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)
- [StandardJS](https://standardjs.com/)
- (e muitas mais)

Se for um programador iniciante, começe pela cábula (*cheatsheet*) dísponivel no início deste capítulo. Dominando aquela, poderá procurar por outros guias de estilo afim de colher princípios gerais e decidir qual prefere.

## *Linters* Automatizados

*Linters*, são ferramentas que automáticamente verificam o estilo do seu código e fazem sugestões para o alterar.

O seu ponto-forte reside em, à medida que verificam o estilo, poderem encontrar alguns erros (*bugs*), como nomes de variáveis ou de funções mal-escritos. Devido a esta capacidade, é recomendado que instale um *linter* mesmo que não queira aderir a um "estilo de código" em particular.

Aqui estão as mais conhcidas ferramentas de *linting*:

- [JSLint](http://www.jslint.com/) -- um dos primeiros *linters*.
- [JSHint](http://www.jshint.com/) -- mais configurações do que *JSLint*.
- [ESLint](http://eslint.org/) -- provávelmente o mais recente.

Todos eles podem executar a tarefa. O autor utiliza [ESLint](http://eslint.org/).

A maioria dos *linters* está integrada em muitos editores populares: apenas ative a extensão (*plugin*) no editor e configure o estilo.

Por exemplo, para o *ESLint* deveria efetuar o seguinte:

1. Instalar o [Node.js](https://nodejs.org/).
2. Instalar o *ESLint* com o comando `npm install -g eslint` (*npm* é um instalador de pacotes [*package installer*] para JavaScript).
3. Criar um ficheiro de configuração (*config file*) com o nome `.eslintrc` na raiz do seu projeto em JavaScript (na pasta que contém todos os seus ficheiros).
4. Instalar/ativar a extensão (*plugin*) no seu editor que faça a integração com o *ESLint*. A maior parte dos editores tem uma.

Aqui está um exemplo do ficheiro `.eslintrc`:

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

Aqui a diretiva `"extends"` denota que a configuração está baseada no conjunto de configurações em "eslint:recommended". A seguir, podemos especificar as nossas próprias.

Também é possível descarregar conjuntos de regras de estilo da web e estendê-las. Veja em <http://eslint.org/docs/user-guide/getting-started> mais detalhes sobre a sua instalação.

De igual modo, certos *IDEs* (Ambientes de Desenvolvimento Integrado) têm *linting* incorporado (*built-in*), o que é conveniente mas não tão personalizável como pelo *ESLint*.

## Sumário

Todas as regras sintáticas descritas neste capítulo (e nos guias de estilo referenciados) têm como objetivo aumentar a legibilidade do seu código, mas todas são discutíveis.

Quando pensarmos em escrever "melhor" código, as questões que deveríamos perguntar são, "O que faz o código mais legível e mais fácil de compreender?" e "O que nos pode ajudar a evitar erros?" Estes são os principais aspetos a ter em mente ao escolher e debater estilos de código.

A leitura de guias de estilo populares permite-nos estar a par das mais recentes ideias sobre tendências, e melhores práticas, de estilos de código.
