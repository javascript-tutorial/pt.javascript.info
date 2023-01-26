
# O objeto Função, NFE

Como  já sabemos, funções em JavaScript são valores.

Todos os valores em JavaScript têm um tipo. De que tipo são funções?

Em JavaScript, as funções são objetos.

Uma boa forma de imaginar funções é como "objetos que atuam" invocáveis. Nós, não só as podemos chamar, como também as tratar como objetos: adicionar/remover propriedades, passar por referencia, etc.

## A propriedade "name"

Os objetos Function contêm algumas propriedades úteis.

Por exemplo, o nome de uma função está acessível por meio da propriedade "name":

```js run
function sayHi() {
  alert("Hi");
}

alert(sayHi.name); // sayHi
```

O engraçado, é que a lógica de atribuição do nome é inteligente. Ela também atribui o nome correto a uma função mesmo que ela seja criada sem um, e a seguir é imediatamente atribuída:

```js run
let sayHi = function() {
  alert("Hi");
};

alert(sayHi.name); // sayHi (aí está o nome!)
```

Ela também funciona se a atribuição for feita utilizando um valor pré-definido:

```js run
function f(sayHi = function() {}) {
  alert(sayHi.name); // sayHi (funciona!)
}

f();
```

Na especificação, esta funcionalidade é chamada de "nome contextual". Se a função não tiver nome, então numa atribuição ele é inferido a partir do contexto.

Métodos de objetos também têm nomes:

```js run
let user = {

  sayHi() {
    // ...
  },

  sayBye: function() {
    // ...
  }

}

alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye
```

Porém, não há magia. Existem casos em que não há forma de adivinhar o nome certo. Nesses casos, o nome da propriedade está vazio, como aqui:

```js run
// função criada dentro do array
let arr = [function() {}];

alert( arr[0].name ); // <string vazia>
// o interpretador não tem forma de atribuir o nome certo, por isso não há nenhum
```

Na prática, contudo, a maior parte das funções têm um nome.

## A propriedade "length"

Existe outra propriedade incorporada, "length", que retorna o numero de parâmetros da função, por exemplo:

```js run
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2
```

Aqui, nós podemos ver que os parâmetros *rest* não contam.

A propriedade `length` é por vezes usada para [Introspecção ](https://pt.wikipedia.org/wiki/Introspec%C3%A7%C3%A3o_(computa%C3%A7%C3%A3o)) em funções que operam em outras funções.

Por exemplo, no código abaixo a função `ask` aceita uma `question` para ser feita, e um numero arbitrário de funções `handler` para serem chamadas.

Depois do utilizador dar a sua resposta, a função chama os handlers. Nós podemos fornecer dois tipos de handlers:

- Uma função com zero-argumentos, que só é chamada quando o utilizador der uma resposta positiva.
- Uma função com argumentos, que é chamada em ambos os casos e retorna uma resposta.

Para chamar os `handlers` de forma correta, nós examinamos a propriedade `handler.length`.

A ideia é que, nós temos uma sintaxe simples com um handler sem argumentos para casos positivos (a variante mais frequente), mas também somos capazes de suportar handlers universais:

```js run
function ask(question, ...handlers) {
  let isYes = confirm(question);

  for(let handler of handlers) {
    if (handler.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    }
  }

}

// para uma resposta positiva, ambos os handlers são chamados
// para uma resposta negativa, apenas o segundo
ask("Pergunta?", () => alert('Você concordou'), result => alert(result));
```

Este, é um caso particular do chamado [Polimorfismo](https://pt.wikipedia.org/wiki/Polimorfismo_(ci%C3%AAncia_da_computa%C3%A7%C3%A3o)) -- tratar argumentos de maneira diferente dependendo do seu tipo ou, no nosso caso dependendo de `length`. O conceito tem, de facto, uso em bibliotecas de JavaScript.

## Propriedades personalizadas

Nós também podemos adicionar as nossas próprias propriedades.

Aqui, nós adicionamos a propriedade `counter` para armazenar a contagem total das invocações:

```js run
function sayHi() {
  alert("Hi");

  *!*
  // vamos contar quantas vezes nós executamos
  sayHi.counter++;
  */!*
}
sayHi.counter = 0; //  valor inicial

sayHi(); // Olá
sayHi(); // Olá

alert( `Called ${sayHi.counter} times` ); // Chamada 2 vezes
```

```warn header="Uma propriedade não é uma variável"
Uma propriedade atribuída a uma função como `sayHi.counter = 0` *não* define uma variável local `counter` dentro dela. Por outras palavras, uma propriedade `counter` e uma variável `let counter` são duas coisas não relacionadas.

Nós podemos tratar uma função como um objeto, e guardar propriedades nela, mas isso não tem nenhum efeito na sua execução. Variáveis não são propriedades de função, e vice-versa. Estes, são simplesmente mundos paralelos.

Por vezes, propriedades de funções podem substituir clausuras (*closures*). Por exemplo, nós podemos re-escrever a função *counter* do capítulo  <info:closure> para usar uma propriedade de função:

```js run
function makeCounter() {
  // em vez de:
  // let count = 0

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1
```

A `count` está agora diretamente armazenada na função, não no seu Ambiente Léxico exterior.

É melhor ou pior do que usar uma *closure*?

A principal diferença é que se o valor de `count` estiver numa variável exterior, então o código externo não o consegue aceder. Só funções aninhadas (*nested*) o podem modificar. Mas se estiver ligado a uma função, então isso já é possível:

```js run
function makeCounter() {

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();

*!*
counter.count = 10;
alert( counter() ); // 10
*/!*
```

Assim, a escolha da implementação depende dos nossos objetivos.

## Function Expression com Nome

Function Expression com Nome, ou NFE (Named Function Expression), é um termo para Function Expressions que têm nomes.

Por exemplo, vamos tomar uma Function Expression normal:

```js
let sayHi = function(who) {
  alert(`Olá, ${who}`);
};
```

E adicionar a ela um nome:

```js
let sayHi = function *!*func*/!*(who) {
  alert(`Olá, ${who}`);
};
```

Nós alcançámos algum resultado aqui? Qual o propósito desse nome `"func"` adicionado?

Em primeiro lugar, notemos que nós ainda temos uma Function Expression. Adicionar o nome `"func"` após `function` não faz dela uma Function Declaration, porque ela ainda é criada como parte de uma expressão de atribuição.

Adicionar esse nome também não quebrou nada.

A função ainda está disponível como `sayHi()`:

```js run
let sayHi = function *!*func*/!*(who) {
  alert(`Olá, ${who}`);
};

sayHi("John"); // Olá, John
```

Existem duas coisas especiais sobre o nome `func`, e que são a sua razão de ser:

1. Ele permite à função fazer referência a si mesma internamente.
2. Ele não é visível fora da função.

Por exemplo, a função `sayHi` abaixo chama a si própria de novo com `"Convidado"` se nenhum `who` for fornecido:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Olá, ${who}`);
  } else {
*!*
    func("Convidado"); // usa 'func' para chamar a si mesma
*/!*
  }
};

sayHi(); // Olá, Convidado

// Mas isto não irá funcionar
func(); // Erro, 'func' não está definida (não visível fora da função)
```

Porque é que usamos `func`? Possivelmente, basta usar `sayHi` na chamada aninhada?


Na verdade, em muitos casos nós podemos:

```js
let sayHi = function(who) {
  if (who) {
    alert(`Olá, ${who}`);
  } else {
*!*
    sayHi("Convidado");
*/!*
  }
};
```

O problema com esse código, é que `sayHi` pode mudar no código exterior. Se a função for atribuída a outra variável, o código começará a apresentar erros:

```js run
let sayHi = function(who) {
  if (who) {
    alert(`Olá, ${who}`);
  } else {
*!*
    sayHi("Convidado"); // Erro: 'sayHi' não é uma função
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Erro, a chamada aninhada 'sayHi' já não existe mais!
```

Isso acontece porque a função toma `sayHi` do seu ambiente léxico exterior. Como não há uma `sayHi` local, a variável exterior é usada. E no momento da chamada aquela `sayHi` exterior é `null`.

O nome opcional que nós podemos colocar na Function Expression serve exatamente para resolver estes tipos de problemas.

Então nós vamos usá-lo para corrigir o nosso código:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Olá, ${who}`);
  } else {
*!*
    func("Convidado"); // Agora, tudo bem
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Olá, Convidado (a chamada aninhada funciona)
```

Agora ela funciona, porque o nome `"func"` é local à função. Não é tomado do exterior (e também não é visível lá). A especificação garante que ele irá sempre fazer referencia à função corrente.

O código exterior continua a ter a sua variável `sayHi` ou `welcome`. E `func` é um "nome de função interno", permitindo à função chamar internamente a si mesma.

```smart header="Isso não existe para a Function Declaration"
A particularidade de "nome interno" descrita aqui apenas está disponível para Function Expressions, não para Function Declarations. Para Function Declarations, não há nenhuma sintaxe para adicionar um nome "interno".

Por vezes, quando nós precisamos de um nome interno confiável, esse é o motivo para se re-escrever uma Function Declaration numa forma de Function Expression com nome.
```

## Sumário

Funções são objetos.

Aqui, nós vimos as suas propriedades:

- `name` -- o nome da função. Geralmente, tomado da definição da função, mas se não houver nenhum, o JavaScript tenta adivinhar a partir do contexto (por exempmlo: numa atribuição).
- `length` -- o numero de argumentos na definição da função. Parâmetros *rest* não contam.

Se a função for declarada como uma Function Expression (não no fluxo principal do código), e tiver um nome, então é chamada de Function Expression com Nome. O nome pode ser usado dentro dela para fazer referencia a si mesma, para chamadas recursivas ou similares.

De igual modo, Funções podem ter propriedades adicionais. Muitas bem conhecidas bibliotecas de JavaScript fazem grande uso desta particularidade.

Elas criam uma função "main" (principal) e a anexam muitas outras funções "helper" (auxiliares) como tal. Por exemplo, a biblioteca [jQuery](https://jquery.com) cria uma função chamada `$`. A biblioteca [lodash](https://lodash.com) cria uma função `_`, e depois adiciona `_.clone`, `_.keyBy` e outras propriedades a ela (veja as [docs](https://lodash.com/docs) quando quiser aprender mais sobre elas). Na verdade, elas o fazem para diminuir a poluição do espaço global, de tal modo que uma única biblioteca apenas  forneça uma variável global. Isso reduz a possibilidade de conflitos de nomes.


Assim, uma função pode fazer um trabalho útil por si mesma e também possuir uma quantidade de outras funcionalidades em propriedades.
