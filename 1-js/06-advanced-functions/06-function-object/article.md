
# Objeto função, NFE

Como já sabemos, uma função no JavaScript é um valor.

Todo valor no JavaScript tem um tipo. Qual é o tipo de uma função?

No JavaScript, funções são objetos.

Uma boa forma de imaginar funções é como "objetos de ação" chamáveis. Podemos não só chamá-las, mas também tratá-las como objetos: adicionar/remover propriedades, passar por referência etc.


## A propriedade "name"

Objetos função contêm algumas propriedades úteis.

Por exemplo, o nome de uma função é acessível através da propriedade "name":

```js run
function sayHi() {
  alert("Hi");
}

alert(sayHi.name); // sayHi
```

O que é meio engraçado, a lógica de atribuição do nome é esperta. Ela também atribui o nome correto a uma função mesmo quando ela é criada sem um nome, e depois imediatamente atribuída:

```js run
let sayHi = function() {
  alert("Hi");
};

alert(sayHi.name); // sayHi (tem um nome!)
```

Também funciona se a atribuição for feita através de um valor padrão:

```js run
function f(sayHi = function() {}) {
  alert(sayHi.name); // sayHi (funciona!)
}

f();
```

Na especificação, esse recurso é chamado de "nome contextual". Se a função não fornecer um, então, numa atribuição, ele é deduzido a partir do contexto.

Métodos de objeto também têm nomes:

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

Mas não existe mágica nenhuma. Há casos em que não há como deduzir o nome correto. Nesse caso, a propriedade name fica vazia, como aqui:

```js run
// função criada dentro de um array
let arr = [function() {}];

alert( arr[0].name ); // <string vazia>
// o motor não tem como definir o nome correto, então não existe nenhum
```

Na prática, porém, a maioria das funções tem um nome.

## A propriedade "length"

Existe outra propriedade nativa, "length", que retorna o número de parâmetros da função, por exemplo:

```js run
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2
```

Aqui podemos ver que os parâmetros rest não são contados.

A propriedade `length` às vezes é usada para [introspecção](https://en.wikipedia.org/wiki/Type_introspection) em funções que operam sobre outras funções.

Por exemplo, no código abaixo a função `ask` recebe uma `question` para perguntar e um número arbitrário de funções `handler` para chamar.

Assim que um usuário fornece sua resposta, a função chama os handlers. Podemos passar dois tipos de handlers:

- Uma função sem argumentos, que só é chamada quando o usuário dá uma resposta positiva.
- Uma função com argumentos, que é chamada em qualquer um dos casos e retorna uma resposta.

Para chamar o `handler` da forma certa, examinamos a propriedade `handler.length`.

A ideia é que temos uma sintaxe de handler simples, sem argumentos, para os casos positivos (a variante mais frequente), mas também somos capazes de suportar handlers universais:

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

// para resposta positiva, os dois handlers são chamados
// para resposta negativa, só o segundo
ask("Question?", () => alert('You said yes'), result => alert(result));
```

Esse é um caso particular do chamado [polimorfismo](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)) -- tratar argumentos de forma diferente dependendo do seu tipo ou, no nosso caso, dependendo do `length`. Essa ideia tem uso real em bibliotecas JavaScript.

## Propriedades personalizadas

Também podemos adicionar propriedades próprias.

Aqui adicionamos a propriedade `counter` para rastrear o número total de chamadas:

```js run
function sayHi() {
  alert("Hi");

  *!*
  // vamos contar quantas vezes rodamos
  sayHi.counter++;
  */!*
}
sayHi.counter = 0; // valor inicial

sayHi(); // Hi
sayHi(); // Hi

alert( `Chamada ${sayHi.counter} vezes` ); // Chamada 2 vezes
```

```warn header="Uma propriedade não é uma variável"
Uma propriedade atribuída a uma função como `sayHi.counter = 0` *não* define uma variável local `counter` dentro dela. Em outras palavras, uma propriedade `counter` e uma variável `let counter` são duas coisas sem relação nenhuma.

Podemos tratar uma função como um objeto, armazenar propriedades nela, mas isso não tem efeito nenhum na sua execução. Variáveis não são propriedades de função, nem vice-versa. São só mundos paralelos.
```

Propriedades de função às vezes podem substituir closures. Por exemplo, podemos reescrever o exemplo da função contadora do capítulo <info:closure> para usar uma propriedade de função:

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

O `count` agora é armazenado diretamente na função, não no seu Ambiente Léxico externo.

Isso é melhor ou pior do que usar uma closure?

A principal diferença é que, se o valor de `count` vive numa variável externa, então o código externo não consegue acessá-lo. Só as funções aninhadas podem modificá-lo. E se ele estiver vinculado a uma função, então isso é possível:

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

Então, a escolha da implementação depende dos nossos objetivos.

## Expressão de Função Nomeada

Expressão de Função Nomeada, ou NFE (do inglês *Named Function Expression*), é um termo para Expressões de Função que têm um nome.

Por exemplo, vamos pegar uma Expressão de Função comum:

```js
let sayHi = function(who) {
  alert(`Hello, ${who}`);
};
```

E adicionar um nome a ela:

```js
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};
```

Conseguimos algo com isso? Qual é o propósito desse nome adicional `"func"`?

Primeiro, vamos observar que ainda temos uma Expressão de Função. Adicionar o nome `"func"` depois de `function` não a transformou numa Declaração de Função, porque ela ainda é criada como parte de uma expressão de atribuição.

Adicionar esse nome também não quebrou nada.

A função ainda está disponível como `sayHi()`:

```js run
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};

sayHi("John"); // Hello, John
```

Há duas coisas especiais sobre o nome `func`, que são os motivos para ele existir:

1. Ele permite que a função referencie a si mesma internamente.
2. Ele não é visível fora da função.

Por exemplo, a função `sayHi` abaixo chama a si mesma novamente com `"Guest"` se nenhum `who` for fornecido:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // usa func para se chamar de novo
*/!*
  }
};

sayHi(); // Hello, Guest

// Mas isso não vai funcionar:
func(); // Erro, func não está definido (não é visível fora da função)
```

Por que usamos `func`? Será que não podemos simplesmente usar `sayHi` para a chamada aninhada?


Na verdade, na maioria dos casos podemos:

```js
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest");
*/!*
  }
};
```

O problema com esse código é que `sayHi` pode mudar no código externo. Se a função for atribuída a outra variável, o código vai começar a gerar erros:

```js run
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest"); // Erro: sayHi não é uma função
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Erro, a chamada aninhada de sayHi não funciona mais!
```

Isso acontece porque a função pega `sayHi` do seu ambiente léxico externo. Não existe um `sayHi` local, então a variável externa é usada. E, no momento da chamada, aquele `sayHi` externo é `null`.

O nome opcional que podemos colocar na Expressão de Função serve justamente para resolver esse tipo de problema.

Vamos usá-lo para corrigir nosso código:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // Agora está tudo bem
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Hello, Guest (a chamada aninhada funciona)
```

Agora funciona, porque o nome `"func"` é local à função. Ele não é pego de fora (e nem é visível lá fora). A especificação garante que ele sempre vai referenciar a função atual.

O código externo ainda tem sua variável `sayHi` ou `welcome`. E `func` é um "nome interno de função", a forma da função chamar a si mesma de forma confiável.

```smart header="Não existe algo assim para Declaração de Função"
O recurso de "nome interno" descrito aqui está disponível apenas para Expressões de Função, não para Declarações de Função. Para Declarações de Função, não existe sintaxe para adicionar um nome "interno".

Às vezes, quando precisamos de um nome interno confiável, esse é o motivo para reescrever uma Declaração de Função no formato de Expressão de Função Nomeada.
```

## Resumo

Funções são objetos.

Aqui cobrimos suas propriedades:

- `name` -- o nome da função. Normalmente obtido a partir da definição da função, mas se não houver nenhum, o JavaScript tenta adivinhá-lo a partir do contexto (ex.: uma atribuição).
- `length` -- o número de argumentos na definição da função. Parâmetros rest não são contados.

Se a função for declarada como uma Expressão de Função (fora do fluxo principal do código), e ela carregar um nome, então ela é chamada de Expressão de Função Nomeada. O nome pode ser usado internamente para referenciar a si mesma, para chamadas recursivas ou algo do tipo.

Além disso, funções podem carregar propriedades adicionais. Muitas bibliotecas JavaScript bem conhecidas fazem ótimo uso desse recurso.

Elas criam uma função "principal" e anexam muitas outras funções "auxiliares" a ela. Por exemplo, a biblioteca [jQuery](https://jquery.com) cria uma função chamada `$`. A biblioteca [lodash](https://lodash.com) cria uma função `_`, e depois adiciona `_.clone`, `_.keyBy` e outras propriedades a ela (veja a [documentação](https://lodash.com/docs) quando quiser aprender mais sobre elas). Na verdade, elas fazem isso para diminuir a poluição do espaço global, de forma que uma única biblioteca forneça apenas uma variável global. Isso reduz a possibilidade de conflitos de nomes.


Então, uma função pode fazer um trabalho útil sozinha e também carregar um monte de outras funcionalidades em propriedades.
