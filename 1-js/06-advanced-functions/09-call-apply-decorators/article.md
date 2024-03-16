# Decoradores e reencaminhamento, chamar/aplicar

A JavaScript oferece uma flexibilidade excecional ao lidar com funções. Podem ser transmitidas, utilizadas como objetos, e agora veremos como *encaminhar* chamadas entre elas e *decorá-las*.

## Memorização transparente

Digamos que temos uma função `slow(x)` que consume muito processamento, mas seus resultados são estáveis. Em outras palavras, para o mesmo `x` esta sempre retorna o mesmo resultado.

Se a função for chamada com frequência, podemos querer memorizar (lembrar) os resultados para evitar gastar tempo adicional em recálculos.

Mas, em vez de adicionar essa funcionalidade em `slow()` criaremos uma função de embrulho, que adiciona a memorização. Como veremos, existem muitas vantagens em fazê-lo.

Eis o código, e as explicações que se seguem:

```js run
function slow(x) {
  // pode haver um processamento intensivo aqui
  alert(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function(x) {
    if (cache.has(x)) {    // se existir tal chave na memória
      return cache.get(x); // ler o resultado do mesmo
    }

    let result = func(x);  // caso contrário, chamar função

    cache.set(x, result);  // e memorizar (lembrar) o resultado
    return result;
  };
}

slow = cachingDecorator(slow);

alert( slow(1) ); // slow(1) é memorizado e o resultado retornado
alert( "Again: " + slow(1) ); // resultado da slow(1) retornado da memória

alert( slow(2) ); // slow(2) é memorizado e o resultado retornado
alert( "Again: " + slow(2) ); // resultado da slow(2) retornado da memória
```

No código acima `cachingDecorator` é um *decorador*: uma função especial que pega em outra função e altera o seu comportamento.

A ideia é que podemos chamar `cachingDecorator` para qualquer função, e esta retornará o embrulho de memorização. Isto é ótimo, porque podemos ter muitas funções que poderiam usar esse recurso, e tudo o que precisamos fazer é aplicar `cachingDecorator` a elas.

Ao separar a memorização do código da função principal, também mantemos o código principal mais simples.

O resultado de `caching` é um "embrulho": `function(x)` que "embrulha" a chama da `func(x)` na lógica de memorização:

![](decorator-makecaching-wrapper.svg)

A partir dum código externo, a função `slow` embrulhada ainda faz o mesmo. Esta apenas tem um aspeto de memorização adicionado ao seu comportamento.

Para resumir, existem vários benefícios em utilizar um `cachingDecorator` separado ao invés de alterar o código da `slow` em si:

- O `cachingDecorator` é reutilizável. Podemos aplicá-lo a outra função.
- A lógica de memorização é separada, não aumentou a complexidade da `slow` em si (se é que existia alguma).
- Podemos combinar vários decoradores, se necessário (outros decoradores seguir-se-ão).

## Usando  `func.call` para o contexto

O decorador de memorização mencionado acima não é adequado para trabalhar com o métodos de objeto.

Por exemplo, no código abaixo `worker.slow()` para de funcionar após a decoração:

```js run
// faremos a memorização do `worker.slow`
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    // tarefa de processamento
    // assustadoramente pesado.
    alert("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};

// o mesmo código que o anterior
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

worker.slow = cachingDecorator(worker.slow); // agora, memorize-o

*!*
alert( worker.slow(2) ); // Ups! Erro: Não é possível ler a 'someMethod' de indefinido
*/!*
```

O erro ocorre na linha `(*)` que tenta acessar a `this.someMethod` e falha. Podemos ver por quê?

A razão é que o embrulhador chama a função original como `func(x)` na linha `(**)`. E, quando chamada desta maneira, a função recebe `this = undefined`.

Observaríamos um sintoma semelhante se tentássemos executar:

```js
let func = worker.slow;
func(2);
```

Assim, o embrulhador passa a chamada para o método original, mas sem o contexto `this`. Daí o erro.

Vamos corrigi-lo.

Existe uma método especial de função embutido [`func.call(context, ...args)`](mdn:js/Function/call) que permite chamar uma função definindo explicitamente `this`.

A sintaxe é:

```js
func.call(context, arg1, arg2, ...)
```

Ele executa `func` fornecendo o primeiro argumento como `this`, e o próximo como os argumentos.

Para simplificar, estas duas chamadas fazem quase o mesmo:

```js
func(1, 2, 3);
func.call(obj, 1, 2, 3)
```

Ambas chamam `func` com os argumentos `1`, `2`, e `3`. A única diferença é que `func.call` também define `this` como `obj`.

Como exemplo, no código abaixo chamamos `sayHi` no contexto de diferentes objetos: `sayHi.call(user)` executa `sayHi` fornecendo `this=user`, e a próxima linha define `this=admin`:

```js run
function sayHi() {
  alert(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

// usar `call` para passar
// diferentes objetos como "this"
sayHi.call( user ); // John
sayHi.call( admin ); // Admin
```

E aqui usamos `call` para chamar `say` com o dado contexto e frase:

```js run
function say(phrase) {
  alert(this.name + ': ' + phrase);
}

let user = { name: "John" };

// `user` torna-se `this`, e "Hello"
// torna-se o primeiro argumento
say.call( user, "Hello" ); // John: Hello
```

No nosso caso, podemos usar `call` no embrulhador para passar o contexto para a função original:

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
    let result = func.call(this, x); // "this" é agora passado corretamente
*/!*
    cache.set(x, result);
    return result;
  };
}

worker.slow = cachingDecorator(worker.slow); // agora, memoriza-o

alert( worker.slow(2) ); // funciona
alert( worker.slow(2) ); // funciona, não chama o original (memorizado)
```

Agora está tudo bem.

Para tornar tudo mais claro, veremos mais profundamente como `this` é passado adiante:

1. Após a decoração, `worker.slow` agora é o embrulhador `function (x) { ... }`.
2. Então quando `worker.slow(2)` é executado, o embrulhador recebe `2` como argumento e `this=worker` (é o objeto antes do ponto).
3. Dentro do embrulhador, assumindo que o resultado ainda não está memorizado, `func.call(this, x)` passa o `this` atual (`=worker`) e o argumento atual (`=2`) para o método original.

## Going multi-argument

Now let's make `cachingDecorator` even more universal. Till now it was working only with single-argument functions.

Now how to cache the multi-argument `worker.slow` method?

```js
let worker = {
  slow(min, max) {
    return min + max; // scary CPU-hogger is assumed
  }
};

// should remember same-argument calls
worker.slow = cachingDecorator(worker.slow);
```

Previously, for a single argument `x` we could just `cache.set(x, result)` to save the result and `cache.get(x)` to retrieve it. But now we need to remember the result for a *combination of arguments* `(min,max)`. The native `Map` takes single value only as the key.

There are many solutions possible:

1. Implement a new (or use a third-party) map-like data structure that is more versatile and allows multi-keys.
2. Use nested maps: `cache.set(min)` will be a `Map` that stores the pair `(max, result)`. So we can get `result` as `cache.get(min).get(max)`.
3. Join two values into one. In our particular case we can just use a string `"min,max"` as the `Map` key. For flexibility, we can allow to provide a *hashing function* for the decorator, that knows how to make one value from many.

For many practical applications, the 3rd variant is good enough, so we'll stick to it.

Also we need to pass not just `x`, but all arguments in `func.call`. Let's recall that in a `function()` we can get a pseudo-array of its arguments as `arguments`, so `func.call(this, x)` should be replaced with `func.call(this, ...arguments)`.

Here's a more powerful `cachingDecorator`:

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
    let result = func.call(this, ...arguments); // (**)
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
alert( "Again " + worker.slow(3, 5) ); // same (cached)
```

Now it works with any number of arguments (though the hash function would also need to be adjusted to allow any number of arguments. An interesting way to handle this will be covered below).

There are two changes:

- In the line `(*)` it calls `hash` to create a single key from `arguments`. Here we use a simple "joining" function that turns arguments `(3, 5)` into the key `"3,5"`. More complex cases may require other hashing functions.
- Then `(**)` uses `func.call(this, ...arguments)` to pass both the context and all arguments the wrapper got (not just the first one) to the original function.

## func.apply

Instead of `func.call(this, ...arguments)` we could use `func.apply(this, arguments)`.

The syntax of built-in method [func.apply](mdn:js/Function/apply) is:

```js
func.apply(context, args)
```

It runs the `func` setting `this=context` and using an array-like object `args` as the list of arguments.

The only syntax difference between `call` and `apply` is that `call` expects a list of arguments, while `apply` takes an array-like object with them.

So these two calls are almost equivalent:

```js
func.call(context, ...args);
func.apply(context, args);
```

They perform the same call of `func` with given context and arguments.

There's only a subtle difference regarding `args`:

- The spread syntax `...` allows to pass *iterable* `args` as the list to `call`.
- The `apply` accepts only *array-like* `args`.

...And for objects that are both iterable and array-like, such as a real array, we can use any of them, but `apply` will probably be faster, because most JavaScript engines internally optimize it better.

Passing all arguments along with the context to another function is called *call forwarding*.

That's the simplest form of it:

```js
let wrapper = function() {
  return func.apply(this, arguments);
};
```

When an external code calls such `wrapper`, it is indistinguishable from the call of the original function `func`.

## Borrowing a method [#method-borrowing]

Now let's make one more minor improvement in the hashing function:

```js
function hash(args) {
  return args[0] + ',' + args[1];
}
```

As of now, it works only on two arguments. It would be better if it could glue any number of `args`.

The natural solution would be to use [arr.join](mdn:js/Array/join) method:

```js
function hash(args) {
  return args.join();
}
```

...Unfortunately, that won't work. Because we are calling `hash(arguments)`, and `arguments` object is both iterable and array-like, but not a real array.

So calling `join` on it would fail, as we can see below:

```js run
function hash() {
*!*
  alert( arguments.join() ); // Error: arguments.join is not a function
*/!*
}

hash(1, 2);
```

Still, there's an easy way to use array join:

```js run
function hash() {
*!*
  alert( [].join.call(arguments) ); // 1,2
*/!*
}

hash(1, 2);
```

The trick is called *method borrowing*.

We take (borrow) a join method from a regular array (`[].join`) and use `[].join.call` to run it in the context of `arguments`.

Why does it work?

That's because the internal algorithm of the native method `arr.join(glue)` is very simple.

Taken from the specification almost "as-is":

1. Let `glue` be the first argument or, if no arguments, then a comma `","`.
2. Let `result` be an empty string.
3. Append `this[0]` to `result`.
4. Append `glue` and `this[1]`.
5. Append `glue` and `this[2]`.
6. ...Do so until `this.length` items are glued.
7. Return `result`.

So, technically it takes `this` and joins `this[0]`, `this[1]` ...etc together. It's intentionally written in a way that allows any array-like `this` (not a coincidence, many methods follow this practice). That's why it also works with `this=arguments`.

## Decorators and function properties

It is generally safe to replace a function or a method with a decorated one, except for one little thing. If the original function had properties on it, like `func.calledCount` or whatever, then the decorated one will not provide them. Because that is a wrapper. So one needs to be careful if one uses them.

E.g. in the example above if `slow` function had any properties on it, then `cachingDecorator(slow)` is a wrapper without them.

Some decorators may provide their own properties. E.g. a decorator may count how many times a function was invoked and how much time it took, and expose this information via wrapper properties.

There exists a way to create decorators that keep access to function properties, but this requires using a special `Proxy` object to wrap a function. We'll discuss it later in the article <info:proxy#proxy-apply>.

## Summary

*Decorator* is a wrapper around a function that alters its behavior. The main job is still carried out by the function.

Decorators can be seen as "features" or "aspects" that can be added to a function. We can add one or add many. And all this without changing its code!

To implement `cachingDecorator`, we studied methods:

- [func.call(context, arg1, arg2...)](mdn:js/Function/call) -- calls `func` with given context and arguments.
- [func.apply(context, args)](mdn:js/Function/apply) -- calls `func` passing `context` as `this` and array-like `args` into a list of arguments.

The generic *call forwarding* is usually done with `apply`:

```js
let wrapper = function() {
  return original.apply(this, arguments);
};
```

We also saw an example of *method borrowing* when we take a method from an object and `call` it in the context of another object. It is quite common to take array methods and apply them to `arguments`. The alternative is to use rest parameters object that is a real array.

There are many decorators there in the wild. Check how well you got them by solving the tasks of this chapter.
