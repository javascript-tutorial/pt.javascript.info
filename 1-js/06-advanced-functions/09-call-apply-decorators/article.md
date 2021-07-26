# Decoradores e Repassamento, call/apply

JavaScript oferece uma flexibilidade excepcional para lidar com funções. Elas podem ser repassadas, usadas como objetos, e agora iremos ver como *repassar* chamadas entre elas e *decorá-las*.

## Cache Transparente

Digamos que temos uma função `slow(x)` que usa muita CPU, mas seus resultados são estáveis. Por outras palavras, para o mesmo `x` ela sempre retorna o mesmo resultado.

Se a função for chamada com frequência, nós podemos querer armazenar em cache (lembrar) os resultados para diferentes `x` para evitar gastar tempo extra em recalculações.

Mas ao invés de adicionar essa funcionalidade a`slow()`, iremos criar um encapsulador. Como veremos, existem muitos benefícios em proceder deste modo.

Aqui está o código, e a seguir a sua explicação:

```js run
function slow(x) {
  // pode existir um trabalho intensivo por parte da CPU aqui
  alert(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function(x) {
    if (cache.has(x)) { // se o resultado estiver dentro do mapa
      return cache.get(x); // retorne-o
    }

    let result = func(x); // se não estiver, chame func

    cache.set(x, result); // e faça a cache (lembre-se) do resultado
    return result;
  };
}

slow = cachingDecorator(slow);

alert( slow(1) ); // slow(1) é cacheada e o resultado retornado
alert( "Again: " + slow(1) ); // slow(1) o resultado é retornado da cache

alert( slow(2) ); // slow(2) é cacheada e o resultado retornado
alert( "Again: " + slow(2) ); // slow(2) o resultado é retornado da cache

```

No código acima `cachingDecorator` é um *decorador*: uma função especial que recebe outra função e altera o seu comportamento.

A ideia é que podemos chamar `cachingDecorator` com qualquer função, e ele retornará o encapsulador de cache. É ótimo, porque podemos ter muitas funções que poderiam usar essa funcionalidade, e tudo o que precisamos de fazer é aplicar `cachingDecorator` a elas.

Ao separar o cache do código principal da função, também mantemos o código principal mais simples.

Agora, vamos entrar em detalhes de como isso funciona.

O resultado do `cachingDecorator(func)` é um "encapsulador": `function(x)` que "envolve" a chamada de `func(x)` dentro duma lógica de cache:

![](decorator-makecaching-wrapper.svg)

Como podemos ver, o encapsulador retorna o resultado da `func(x)` "como ele é". A partir de um código exterior, a função `slow` encapsulada ainda faz o mesmo. Ela apenas teve o aspecto de cache adicionado ao seu comportamento.

Resumindo, existem muitos benefícios em usar um `cacheDecorator` separado ao invés de alterar o próprio  código de `slow`:

- O `cacheDecorator` é reusável. Nós o podemos aplicar a outras funções.
- A lógica de cache está separada, ela não adicionou complexidade a `slow` (se havia alguma).
- Nós podemos combinar vários decoradores se necessário (outros decoradores virão a seguir).

## Usando "func.call" para o contexto

O decorador de cache mencionado acima não é adequado para trabalhar com os métodos de objeto.

Por exemplo, no código abaixo `worker.slow()` pára de funcionar após a decoração:

```js run
// vamos fazer o cache de worker.slow
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    // uma tarefa que faz uso assustador da CPU  
    alert("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};

// o mesmo código de antes
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
*!*
    let result = func(x); // (**)
*/!*
    cache.set(x, result);
    return result;
  };
}

alert( worker.slow(1) ); // o método original funciona

worker.slow = cachingDecorator(worker.slow); // agora faça o cache dele

*!*
alert( worker.slow(2) ); // Uoops! Erro: não é possível ler a propriedade 'someMethod' de undefined
*/!*
```

O erro ocorre na linha `(*)` que tenta acessar `this.someMethod` e falha. Consegue perceber porquê?

A razão é que o encapsulador chama a função original como `func(x)` na linha `(**)`. E, quando invocada dessa maneira, a função recebe `this = undefined`.

Nós observaríamos um sintoma similar se tentássemos executar:

```js
let func = worker.slow;
func(2);
```

Assim, o encapsulador passa a chamada para o método original, mas sem o contexto `this`. Daí o erro.

Vamos corrigir isso.

Existe um método de função embutido [func.call(context, ...args)](mdn:js/Function/call) que permite chamar uma função explicitamente configurando o `this`.

A sintáxe é:

```js
func.call(context, arg1, arg2, ...)
```

Ele executa `func` provendo o primeiro argumento como `this`, e os seguintes como argumentos.

Para simplificar, essas duas chamadas fazem quase o mesmo:
```js
func(1, 2, 3);
func.call(obj, 1, 2, 3)
```

Ambas chamam `func` com argumentos `1`, `2` e `3`. A única diferença é que `func.call` também configura o `this` para `obj`.

Como um exemplo, no código abaixo chamamos `sayHi` num contexto de diferentes objetos: `sayHi.call(user)` executa `sayHi` provendo `this=user`, e na linha seguinte configura `this=admin`:

```js run
function sayHi() {
  alert(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

// use call para passar objetos diferentes como "this"
sayHi.call( user ); // John
sayHi.call( admin ); // Admin
```

E aqui usamos `call` para chamar `say` com o contexto e frase dados:

```js run
function say(phrase) {
  alert(this.name + ': ' + phrase);
}

let user = { name: "John" };

// user se torna this, e "Hello" se torna o primeiro argumento
say.call( user, "Hello" ); // John: Hello
```

No nosso caso, podemos usar `call` no encapsulador para passar o contexto para a função original:

```js run
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    alert("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};

function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
*!*
    let result = func.call(this, x); // "this" é passado corretamente agora
*/!*
    cache.set(x, result);
    return result;
  };
}

worker.slow = cachingDecorator(worker.slow); // agora faça o cache

alert( worker.slow(2) ); // funciona
alert( worker.slow(2) ); // funciona, não chama a original (cacheado)
```

Agora tudo está bem.

Para deixar tudo claro, vamos analisar mais profundamente como `this` é passado:

1. Depois da decoração `worker.slow` é agora o encapsulador `function (x) { ... }`.
2. Então quando `worker.slow(2)` é executado, o encapsulador recebe `2` como um argumento e `this=worker` (é o objeto antes do ponto).
3. Dentro do encapsulador, assumindo que o resultado não está ainda cacheado, `func.call(this, x)` passa o `this` (`=worker`) atual e o argumento atual (`=2`) para o método original.

## Passando vários argumentos

Agora, vamos fazer `cachingDecorator` ainda mais universal. Até ao momento ele estava somente funcionando com funções com um único argumento.

Agora como fazer cache de vários argumentos no método `worker.slow` ?

```js
let worker = {
  slow(min, max) {
    return min + max; // é assumido um assustador devorador de CPU 
  }
};

// deveria se lembrar de chamadas com o mesmo argumento
worker.slow = cachingDecorator(worker.slow);
```

Temos dois problemas para resolver aqui.

Primeiro, é como usar ambos os argumentos `min` e `max` com uma chave no mapa de `cache`. Anteriormente, para um único argumento `x` poderiamos apenas `cache.set(x, result)` para guardar o resultado e `cache.get(x)` para recuperá-lo. Porém agora precisamos de nos lembrar do resultado para uma *combinação de argumentos* `(min,max)`. O `Map` nativo recebe somente um único valor como chave.

Existem muitas soluções possíveis:

1. Implemente uma nova (ou use a de um terceiro fornecedor) estrutura de dados parecida ao mapa que seja mais versátil e que permita várias chaves.
2. Use mapas aninhados: `cache.set(min)` será um `Map` que armazena o par `(max, result)`. Então, podemos receber `result` como `cache.get(min).get(max)`.
3. Junte dois valores em um. No nosso caso particular podemos apenas usar uma string `"min,max"` como a chave do `Map`. Para flexibilidade, podemos permitir prover uma *função de hashing* ao decorador, que saiba como fazer um valor a partir de muitos.


Para muitas aplicações práticas, a terceira variante é suficientemente boa, então vamos segui-la.

Também precisamos de passar não apenas o `x`, mas todos argumentos em `func.call`. Vamos recapitular que em uma `function()` podemos receber um pseudo-array de seus argumentos como `arguments`, então `func.call(this, x)` deveria ser substituida por `func.call(this, ...arguments)`.

Agora vamos condensar tudo dentro do mais poderoso `cachingDecorator`:

```js run
let worker = {
  slow(min, max) {
    alert(`Called with ${min},${max}`);
    return min + max;
  }
};

function cachingDecorator(func, hash) {
  let cache = new Map();
  return function() {
*!*
    let key = hash(arguments); // (*)
*/!*
    if (cache.has(key)) {
      return cache.get(key);
    }

*!*
    let result = func.apply(this, arguments); // (**)
*/!*

    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);

alert( worker.slow(3, 5) ); // works
alert( "Again " + worker.slow(3, 5) ); // o mesmo (cacheado)
```

Agora ele funciona com qualquer número de argumentos (embora a função hash também precise de ser ajustada para permitir qualquer número de argumentos. Um maneira interessante de lidar com isso será coberta abaixo).

Existem duas mudanças:

- Na linha `(*)` ele chama `hash` para criar uma única chave a partir de `arguments`. Aqui nós usamos uma única função "de concatenação" que transforma os argumentos `(3, 5)` na chave `"3,5"`. Casos mais complexos podem requerer outras funções de hashing.
- Então `(**)` usa `func.apply` para passar ambos o contexto e todos argumentos que o encapsulador recebeu (não importa quantos) para a função original.

## func.apply

Ao invés de `func.call(this, ...arguments)` poderíamos usar `func.apply(this, arguments)`.

A sintáxe do método embutido [func.apply](mdn:js/Function/apply) é:

```js
func.apply(context, args)
```

Ele executa `func` configurando `this=context` e usando um objeto parecido com  array `args`  como lista de argumentos.

A única diferença de sintáxe entre `call` e `apply` é que `call` espera uma lista de argumentos, enquanto `apply` recebe um objeto parecido com um array com eles.

Então essas duas chamadas são quase equivalentes:

```js
func.call(context, ...args);
func.apply(context, args);
```

Eles executam a mesma chamada de `func` com o contexto e argumentos dados.

Há somente uma diferença sútil em relação a `args`:

- A sintaxe spread (espalhar) `...` permite passar `args` *iterável* como a lista para `call`.
- O `apply` aceita somente `args` *parecido com array (array-like)*.

...E para objetos que são ambos iteráveis e parecidos com array, tal como um verdadeiro array, podemos usar qualquer um deles, porém `apply` irá provavelmente ser o mais rápido, porque a maioria dos interpretadores de JavaScript internamente otimizam ele melhor.

Passar todos argumentos junto com o contexto para outra função é chamado de *encaminhamento de chamada*.

Esta é a forma mais símples disso:

```js
let wrapper = function() {
  return func.apply(this, arguments);
};
```

Quando um código externo chama tal `encapsulador`, ele é indistinguível da chamada da função original `func`.

## Emprestando um método [#method-borrowing]

Agora vamos fazer mais uma pequena melhoria na função de hashing:

```js
function hash(args) {
  return args[0] + ',' + args[1];
}
```

Até agora, ela funciona somente com dois argumentos. Seria melhor se pudesse colar qualquer número de `args`.

A solução natural seria usar o método [arr.join](mdn:js/Array/join) :

```js
function hash(args) {
  return args.join();
}
```

...Infelizmente, isso não funcionará. Porque estamos chamando `hash(arguments)`, e o objeto `arguments` é tanto iterável como parecido com array, mas não um verdadeiro array.

Portanto, chamar `join` sobre ele falharia, assim como podemos ver abaixo:

```js run
function hash() {
*!*
  alert( arguments.join() ); // Erro: arguments.join não é uma função
*/!*
}

hash(1, 2);
```

Ainda assim, há uma maneira fácil de usar a combinação de array:

```js run
function hash() {
*!*
  alert( [].join.call(arguments) ); // 1,2
*/!*
}

hash(1, 2);
```

O truque é chamado de *emprestando método*.

Pegamos (emprestamos) um método de concatenação de um array comum (`[].join()`) e usamos `[].join.call` para executá-lo no contexto de `arguments`.

Porque ele funciona?

É porque o algoritmo interno do método nativo `arr.join(glue)` é muito símples.

Retirado da especificação quase "como-é":

1. Deixe `glue` ser o primeiro argumento ou, se não houver argumentos, então uma vírgula `","`.
2. Deixe `result` ser uma string vazia.
3. Acrescente `this[0]` ao `result`.
4. Acrescente `glue` e `this[1]`.
5. Acrescente `glue` e `this[2]`.
6. ...Faça isso até que `this.length` itens estejam colados.
7. Retorne `result`.

Portanto, tecnicamente ele pega o `this` e combina `this[0]`, `this[1]` ...etc juntos. Foi intencionalmente escrito de uma maneira que permita qualquer objeto parecido com array `this` (não é uma coincidência, muitos métodos seguem esta prática). Aí está o porque isto também funciona com `this=arguments`.

## Propriedades de decoradores e de funções

É geralmente seguro substituir uma função ou um método por outro decorados, exceto por uma pequena coisa. Se a função original tiver propriedades nela, como `func.calledCount` ou qualquer outra, a função decorada não as forncerá. Porque ela é um encapsulador. Portanto é preciso ser cuidadoso ao usá-los.

Alguns decoradores podem fornecer suas próprias propriedades. Exemplo, um decorador pode contar quantas vezes uma função foi invocada e quanto tempo ela levou, e expor essa informação atráves das propriedades do encapsulador.

Existe uma maneira de criar decoradores que mantêm o acesso às propriedades da função, mas isto requer o uso de um objeto `Proxy` especial para encapsular uma função. Discutiremos isso depois no artigo <info:proxy#proxy-apply>.

## Resumindo

O *Decorador* é um encapsulador à volta de uma funçaõ que altera o seu comportamento. O trabalho principal ainda é realizado pela função.

Decoradores podem ser vistos como "funcionalidades" ou "aspectos" que podem ser adicionados a uma função. Podemos adicionar um ou vários. E tudo isso sem alterar o seu código.

Para implementar `cachingDecorator`, estudámos métodos:

- [func.call(context, arg1, arg2...)](mdn:js/Function/call) -- chama `func` com o seu contexto e argumentos dados.
- [func.apply(context, args)](mdn:js/Function/apply) -- chama `func` passando `context` como `this` e um objeto parecido com array `args` a uma lista de argumentos.

O *encaminhamento de chamadas* genérico é comumente realizado com `apply`:

```js
let wrapper = function() {
  return original.apply(this, arguments);
}
```

Também vimos um exemplo de *emprestimo de método* quando pegamos num método de um objeto e o chamamos (`call`) no contexto de outro objeto. É bem comum pegar em métodos de um array e aplicá-los aos argumentos. A alternativa é usar un objeto de parâmetros rest que seja um verdadeiro array.

Existem muitos decoradores por aí na selva. Verifique como bem você os recebeu ao resolver as tarefas deste capítulo.
