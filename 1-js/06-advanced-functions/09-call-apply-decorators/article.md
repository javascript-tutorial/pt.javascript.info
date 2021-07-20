# Decoradores e Repassamento, call/apply

JavaScript oferece uma flexibilidade excepcional ao lidar com funções. Elas podem ser repassadas, usadas como objetos, e agora iremos ver como *repassar* suas chamas entre elas e *decorá-las*.

## Cache Transparente

Digamos que temos uma função `slow(x)` que usa muita CPU, mas seus resultados estáveis. Em outras palavras para o mesmo `x` ele sempre retorna o resultado.

Se a função for chamada várias vezes, nós podemos requer armazenar em cache (lembrar) os resultados para diferentes `x` para evitar gastar tempo extra em recalculações.

Mas ao invés de adicionar essa funcionalidade dentro de `slow()`, criaremos um encapsulador. Como veremos existem muitos benefícios em proceder deste modo.

Abaixo está o código de exemplo, e a seguir a sua explicação:

```js run
function slow(x) {
  // pode exigir um trabalho intensivo por parte da CPU
  alert(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function(x) {
    if (cache.has(x)) { // se o resultado estiver dentro do mapa
      return cache.get(x); // retorne-o
    }

    let result = func(x); // caso não estiver, chame a func

    cache.set(x, result); // e faz cache (lembrar) do resultado
    return result;
  };
}

slow = cachingDecorator(slow);

alert( slow(1) ); // slow(1) é cacheada e o resultado retornado
alert( "Again: " + slow(1) ); // slow(1) resultado retornado do cache

alert( slow(2) ); // slow(2) é cacheada e o resultado retornado
alert( "Again: " + slow(2) ); // slow(2) resultado retornado do cache
```

No código acima `cachingDecorator` é um *decorador*: uma função especial que recebe outra função e altera seu comportamento.

A ideia é que podemos chamar `cachingDecorator` para qualquer função, e ele retornará um encapsulador do cache. É ótimo, porque podemos ter muitas funções que poderiam usar essa funcionalidade, e tudo o que precisamos fazer é aplicar `cachingDecorator` a elas.

Ao separar o cache do código principal da função, também mantemos o código principal símples.

Agora vamos entrar em detalhes de como ela funciona.

O resultado do `cachingDecorator(func)` é um "encapsulador": `function(x)` que "envolve" a chamada de `func(x)` dentro da lógica do cache:

![](decorator-makecaching-wrapper.svg)

Como podemos ver, o encapsulador retorna o resultado da `func(x)` "como é". A partir de um código de fora, a função `slow` encapsulada ainda faz o mesmo. Ela apenas teve o aspecto de cache adicionado ao seu comportamento.

Resumindo, existem outros benefícios de se usar um `cacheDecorator` separado ao invés de alterar o código do próprio `slow`:

- O `cacheDecorator` é reusável. Nós podemos aplicar-lo em outras funções.
- A lógica de cache está separada, ela não adicionou a complexidade do `slow` (se havia alguma).
- Nós podemos combinar vários decoradores se for necessário (outros decoradores irão seguir).

## Usando "func.call" para o contexto

O decorador de cache mencionado acima é adequado para trabalhar com os métodos de objeto.

Por exemplo, no código abaixo `worker.slow()` para funcionar após a decoração:

```js run
// vamos fazer o cache do worker.slow
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

worker.slow = cachingDecorator(worker.slow); // agora faz o cache dele

*!*
alert( worker.slow(2) ); // Uoops! Erro: não é possível ler a propriedade 'someMethod' de undefined
*/!*
```

O erro ocorre na linha `(*)` que tenta acessar `this.someMethod` e falha. Consegues perceber o porquê?

A razão é que o encapsulador chama a função original como `func(x)` na linha `(**)`. E, quando invocada dessa maneira, a função recebe `this = undefined`.

Nós obervariamos um sintoma similar se tentássemos executar:

```js
let func = worker.slow;
func(2);
```

Então, o encapsulador passa a chamada para o método da função original, mas sem o contexto `this`. Daí o erro.

Vamos resolver isso.

Existe um método de função embutido [func.call(context, ...args)](mdn:js/Function/call) que permite chamar uma função explicitamente configurando o `this`.

A sintáxe é:

```js
func.call(context, arg1, arg2, ...)
```

Ele executa `func` provendo o primeiro argumento como `this`, e os próximos como argumentos.

Para simplificar, essas duas chamadas fazem quase a mesma:
```js
func(1, 2, 3);
func.call(obj, 1, 2, 3)
```

Ambos eles chamam `func` com argumentos `1`, `2` e `3`. A única diferença é que `func.call` também configura o `this` para `obj`.

Como um exemple, no código abaixo chamamos `sayHi` no contexto de um objeto diferente: `sayHi.call(user)` executa `sayHi` provendo `this=user`, e a próxima linha configura `this=admin`:

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

E aqui usamos `call` para chamar `say` com o contexto dado e frase (phrase):

```js run
function say(phrase) {
  alert(this.name + ': ' + phrase);
}

let user = { name: "John" };

// user se torna this, e "Hello" se torna o primeiro argumento
say.call( user, "Hello" ); // John: Hello
```

Em nosso caso, podemos usar `call` no encapsulador para passar o contexto para a função original:

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

alert( worker.slow(2) ); // works
alert( worker.slow(2) ); // works, não chama o original (cacheado)
```

Agora tudo está bem.

Para deixar tudo claro, vamos analisar mais profundamente como `this` é passado:

1. Depois da decoração `worker.slow` é agora o encapsulador `function (x) { ... }`.
2. Então quando `worker.slow(2)` é executado, o encapsulador recebe `2` como um argumento e `this=worker` (é o objeto antes do ponto).
3. Dentro do encapsulador, assumindo que o resultado não está cacheado, `func.call(this, x)` passa o `this` (`=worker`) atual e o argumento atual (`=2`) para o método original.

## Passado vários argumentos

Agora, vamos fazer `cachingDecorator` mais universal. Até ao momento ele estava somente funcionando com funções com um único argumento.

Agora como fazer cache de vários argumentos `worker.slow` método?

```js
let worker = {
  slow(min, max) {
    return min + max; // assustador devorador de CPU é assumido
  }
};

// deveria lembrar de chamadas com o mesmo argumento
worker.slow = cachingDecorator(worker.slow);
```

Temos dois problemas para resolver aqui.

Primeiro é, como usar ambos argumentos `min` e `max` para a chave no mapa de `cache`. Anteriormente, para um único argumento `x` poderiamos apenas `cache.set(x, result)` para guardar o resultado e `cache.get(x)` para recuperá-lo. Porém agora precisamos lembrar o resultado para uma *combinação de argumentos* `(min,max)`. O `Map` nativo recebe um único valor somente como a chave.

Existem muitas soluções possíveis:

1. Implemente uma nova (ou use um terceiro) estrutura de dados parecida ao mapa que seja mais versátil e que permita várias chaves.
2. Usar mapas aninhados: `cache.set(min)` será um `Map` que armazena o par `(max, result)`. Então, podemos receber `result` como `cache.get(min).get(max)`.
3. Junte dois valores dentro de um. Em nosso caso particular podemos apenas usar uma string `"min,max"` como a chave do `Map`. Para flexibilizar, podemos permitir prover uma *função de hashing* para o decorador, que sabem fazer um valor a partir de muitos.

Para muitas aplicações práticas, a terceira variante é boa o suficiente, então vamos segui-la.

Também precisamos passar não apenas o `x`, mas todos argumentos em `func.call`. Vamos recapitular que em uma `function()` podemos receber um pseudo-array de seus argumentos como `arguments`, então `func.call(this, x)` deveria ser substituido com `func.call(this, ...arguments)`.

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
alert( "Again " + worker.slow(3, 5) ); // mesmo (cacheado)
```

Agora ele funciona com qualquer número de argumentos (embora a função hash também precise ser ajustada para permitir qualquer número de argumentos. Um maneira interessante para lidar com isto será coberto abaixo).

Existem duas mudanças:

- Na linha `(*)` ele chama `hash` para criar uma única chave a partir de `arguments`. Agora nós podemos usar uma única função "joining" que transforma os argumentos `(3, 5)` na chave `"3,5"`. Casos mais complexos podem requerer outras funções de hashing.
- Então `(**)` usa `func.apply` para passar ambos o contexto e todos argumentos que o encapsulador recebeu (não importa quantos) para função original.

## func.apply

Ao invés de `func.call(this, ...arguments)` poderiamos usar `func.apply(this, arguments)`.

A sintáxe do método embutido [func.apply](mdn:js/Function/apply) é:

```js
func.apply(context, args)
```

Ele executa o `func` configurando `this=context` e usando um objeto `args` parecido com array como a lista de argumentos.

O única diferença de sintáxe entre `call` e `apply` é que `call` espera uma lista de argumentos, enquanto `apply` pega um objeto parecido com um array com eles.

Então essas duas chamadas são quase equivalentes:

```js
func.call(context, ...args);
func.apply(context, args);
```

Eles performam a mesma chamada de `func` com o contexto e argumentos dado.

Há somente uma diferença sútil em relação a `args`:

- A sintáxe spread(espalhar) `...` permite passar `args` *iterável* como a lista para `call`.
- O `apply` aceita somente `args` *parecido com array (array-like)*.

...E para objetos que são ambos iterável e parecido a array, tal como um array real, podemos usar qualquer um deles, porém `apply` irá provavelmente ser o mais rápido, porque a maioria dos motores de JavaScript internamente otimizam ele melhor.

Passar todos argumentos junto com o contexto para outra função é chamado de *encaminhamento de chamada*.

Esta é a forma mais símples disso:

```js
let wrapper = function() {
  return func.apply(this, arguments);
};
```

Quando um código externo chama tal `encapsulador`, ele é indistinguível da chamada da função original `func`.

## Emprestando um método [#emprestando-método]

Agora vamos fazer mais uma pequena melhoria na função de hashing:

```js
function hash(args) {
  return args[0] + ',' + args[1];
}
```

A partir de agora, ele funciona somente sobre dois argumentos. Seria melhor se pudesse colar qualquer número de `args`.

A solução natural seria melhor usar [arr.join](mdn:js/Array/join) método:

```js
function hash(args) {
  return args.join();
}
```

...Infelizmente, isso não funcionará. Porque estamos chamando `hash(arguments)`, e o objeto `arguments` é tanto iterável e parecido com array, mas não um real array.

Portanto, chamar `join` nele falharia, assim como podemos ver abaixo:

```js run
function hash() {
*!*
  alert( arguments.join() ); // Erro: arguments.join não é uma função
*/!*
}

hash(1, 2);
```

Ainda assim, há uma maneira fácil de usar a combinação de array

```js run
function hash() {
*!*
  alert( [].join.call(arguments) ); // 1,2
*/!*
}

hash(1, 2);
```

A técnica é chamada *emprestando método*.

Pegamos (emprestamos) um método de combinação de um array comum (`[].join()`) e usar `[].join.call` para executá-lo no contexto de `arguments`.

Por quê ele funciona?

É porque o algoritmo interno do método nativo `arr.join(glue)` é muito símples.

Retirado da especificação quase "como-é":

1. Deixa a `glue` ser o primeiro argumento ou, se não houver argumentos, então uma vírgula `","`.
2. Deixa `result` ser uma string vázia.
3. Acrescentar `this[0]` ao `result`.
4. Acrescentar `glue` e `this[1]`.
5. Acrescentar `glue` e `this[2]`.
6. ...Faça isso até os itens `this.length` sejam colados.
7. Retorne `result`.

Portanto, tecnicamente ele pega o `this` e combina `this[0]`, `this[1]` ...etc tudo junto. Foi intecionalmente escrito em uma maneira que permite qualquer objeto parecido com array `this` (não é uma conscidência, vários métodos seguem esta prática). Aí está o porquê que isto também funciona com `this=arguments`.

## Decoradores e propriedades de funções

É geralmente seguro substituir uma função or um método por um decorado, exceto para uma pequena coisa. Se a função original tiver propriedades nela, tipo `func.calledCount` ou que seja, a função decorada não as forncerá. Por que ela é um encapsulador. Portanto é preciso ser cuidadoso ao usá-los.

Alguns decoradores podem fornecer suas próprias propriedades. Exemplo, um decorador pode contar quantas vezes uma função foi invocada e quanto tempo ela levou, e expor essas informações atráves das propriedades do encapsulador.

Existe uma maneira de criar decoradores que mantém o acesso às propriedades da função, mas isto requer usar um objeto `Proxy` especial para encapsular uma função. Discutiremos isso depois no artigo <info:proxy#proxy-apply>.

## Resumindo

O *Decorador* é um encapsulador em volta de uma funçaõ que altera seu comportamento. O trabalho principal ainda é realizado pela função.

Decoradores podem ser vistos como "funcionalidades" ou "aspectos" que podem ser adicionados a uma função. Podemos adicionar um ou vários. E tudo isso sem alterar o seu código.

Para implementar `cachingDecorator`, estudamos os métodos:

- [func.call(context, arg1, arg2...)](mdn:js/Function/call) -- chama `func` com o seu contexto e argumentos dados.
- [func.apply(context, args)](mdn:js/Function/apply) -- chama `func` passando `context` como `this` e um objeto `args` parecido com array dentro de uma lista de argumentos.

O *encaminhamento de chamadas* genérico é comumente realizado com `apply`:

```js
let wrapper = function() {
  return original.apply(this, arguments);
}
```

Também vimos um exemplo de *emprestimo de método* quando pegamos um método de um objeto e `chamamos(call)` ele em um contexto de outro objeto. É bem comum pegar métodos de um array e aplicá-los aos argumentos. A alternativa é usar o resto dos parâmetros do objeto que é um array real.

Existem muitos decoradores por aí na selva. Verifique como bem você os recebeu ao resolver as tarefas deste capítulo.