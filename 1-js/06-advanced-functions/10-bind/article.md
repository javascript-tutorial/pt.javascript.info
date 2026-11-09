libs:
  - lodash

---

# Vínculo de função

Ao passar métodos de objeto como callbacks, por exemplo para `setTimeout`, existe um problema conhecido: "perder o `this`".

Neste capítulo vamos ver as formas de corrigir isso.

## Perdendo o "this"

Já vimos exemplos de perda do `this`. Assim que um método é passado separadamente do objeto -- o `this` é perdido.

Veja como isso pode acontecer com `setTimeout`:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(user.sayHi, 1000); // Hello, undefined!
*/!*
```

Como podemos ver, a saída não mostra "John" como `this.firstName`, mas `undefined`!

Isso acontece porque `setTimeout` recebeu a função `user.sayHi`, separadamente do objeto. A última linha pode ser reescrita como:

```js
let f = user.sayHi;
setTimeout(f, 1000); // perdeu o contexto de user
```

O método `setTimeout`, no navegador, é um pouco especial: ele define `this=window` para a chamada da função (para o Node.js, `this` se torna o objeto timer, mas isso não importa muito aqui). Então, para `this.firstName`, ele tenta obter `window.firstName`, que não existe. Em outros casos parecidos, normalmente `this` simplesmente se torna `undefined`.

A tarefa é bem típica -- queremos passar um método de objeto para algum outro lugar (aqui -- para o agendador) onde ele vai ser chamado. Como garantir que ele vai ser chamado no contexto certo?

## Solução 1: um invólucro

A solução mais simples é usar uma função de invólucro:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(function() {
  user.sayHi(); // Hello, John!
}, 1000);
*/!*
```

Agora funciona, porque ela recebe `user` do ambiente léxico externo, e então chama o método normalmente.

A mesma coisa, mas mais curta:

```js
setTimeout(() => user.sayHi(), 1000); // Hello, John!
```

Parece bom, mas surge uma pequena vulnerabilidade na estrutura do nosso código.

E se, antes do `setTimeout` disparar (há um atraso de um segundo!), `user` mudar de valor? Então, de repente, vai chamar o objeto errado!


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

// ...o valor de user muda dentro de 1 segundo
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};

// Another user in setTimeout!
```

A próxima solução garante que isso não vai acontecer.

## Solução 2: bind

Funções oferecem um método nativo, [bind](mdn:js/Function/bind), que permite fixar o `this`.

A sintaxe básica é:

```js
// uma sintaxe mais complexa vem um pouco mais tarde
let boundFunc = func.bind(context);
```

O resultado de `func.bind(context)` é um "objeto exótico" especial, parecido com uma função, que é chamável como uma função e passa a chamada para `func` de forma transparente, definindo `this=context`.

Em outras palavras, chamar `boundFunc` é como chamar `func` com `this` fixo.

Por exemplo, aqui `funcUser` passa uma chamada para `func` com `this=user`:

```js run  
let user = {
  firstName: "John"
};

function func() {
  alert(this.firstName);
}

*!*
let funcUser = func.bind(user);
funcUser(); // John  
*/!*
```

Aqui `func.bind(user)` é uma "variante vinculada" de `func`, com `this=user` fixo.

Todos os argumentos são passados para o `func` original "como estão", por exemplo:

```js run  
let user = {
  firstName: "John"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

// vincula this a user
let funcUser = func.bind(user);

*!*
funcUser("Hello"); // Hello, John (o argumento "Hello" é passado, e this=user)
*/!*
```

Agora vamos tentar com um método de objeto:


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
let sayHi = user.sayHi.bind(user); // (*)
*/!*

// pode rodar sem um objeto
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// mesmo que o valor de user mude dentro de 1 segundo
// sayHi usa o valor pré-vinculado, que é uma referência ao antigo objeto user
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};
```

Na linha `(*)` pegamos o método `user.sayHi` e o vinculamos a `user`. O `sayHi` é uma função "vinculada", que pode ser chamada sozinha ou passada para `setTimeout` -- não importa, o contexto vai estar certo.

Aqui podemos ver que os argumentos são passados "como estão", só o `this` é fixado pelo `bind`:

```js run
let user = {
  firstName: "John",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

say("Hello"); // Hello, John! (o argumento "Hello" é passado para say)
say("Bye"); // Bye, John! ("Bye" é passado para say)
```

````smart header="Método de conveniência: `bindAll`"
Se um objeto tem muitos métodos e planejamos passá-lo adiante ativamente, podemos vincular todos eles num laço:

```js
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```

Bibliotecas JavaScript também fornecem funções para vinculação em massa de forma conveniente, ex.: [_.bindAll(object, methodNames)](https://lodash.com/docs#bindAll) no lodash.
````

## Funções parciais

Até agora só falamos sobre vincular o `this`. Vamos dar um passo além.

Podemos vincular não só o `this`, mas também argumentos. Isso raramente é feito, mas às vezes pode ser útil.

A sintaxe completa do `bind`:

```js
let bound = func.bind(context, [arg1], [arg2], ...);
```

Isso permite vincular o contexto como `this` e os argumentos iniciais da função.

Por exemplo, temos uma função de multiplicação `mul(a, b)`:

```js
function mul(a, b) {
  return a * b;
}
```

Vamos usar `bind` para criar uma função `double` com base nela:

```js run
function mul(a, b) {
  return a * b;
}

*!*
let double = mul.bind(null, 2);
*/!*

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

A chamada a `mul.bind(null, 2)` cria uma nova função `double` que passa chamadas para `mul`, fixando `null` como o contexto e `2` como o primeiro argumento. Os argumentos seguintes são passados "como estão".

Isso é chamado de [aplicação parcial de função](https://en.wikipedia.org/wiki/Partial_application) -- criamos uma nova função fixando alguns parâmetros da existente.

Observe que, na verdade, não usamos o `this` aqui. Mas o `bind` exige ele, então precisamos colocar algo como `null`.

A função `triple` no código abaixo triplica o valor:

```js run
function mul(a, b) {
  return a * b;
}

*!*
let triple = mul.bind(null, 3);
*/!*

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
```

Por que normalmente fazemos uma função parcial?

O benefício é que podemos criar uma função independente com um nome legível (`double`, `triple`). Podemos usá-la e não precisar fornecer o primeiro argumento toda vez, já que ele está fixado pelo `bind`.

Em outros casos, a aplicação parcial é útil quando temos uma função bem genérica e queremos uma variante menos universal dela, por conveniência.

Por exemplo, temos uma função `send(from, to, text)`. Então, dentro de um objeto `user`, podemos querer usar uma variante parcial dela: `sendTo(to, text)`, que envia a partir do usuário atual.

## Indo parcial sem contexto

E se quisermos fixar alguns argumentos, mas não o contexto `this`? Por exemplo, para um método de objeto.

O `bind` nativo não permite isso. Não podemos simplesmente omitir o contexto e pular para os argumentos.

Felizmente, uma função `partial` para vincular apenas argumentos pode ser facilmente implementada.

Assim:

```js run
*!*
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}
*/!*

// Uso:
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// adiciona um método parcial com o horário fixo
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Algo como:
// [10:00] John: Hello!
```

O resultado da chamada `partial(func[, arg1, arg2...])` é um invólucro `(*)` que chama `func` com:
- O mesmo `this` que recebe (para a chamada `user.sayNow` é `user`)
- Depois passa a ele `...argsBound` -- argumentos da chamada `partial` (`"10:00"`)
- Depois passa a ele `...args` -- argumentos dados ao invólucro (`"Hello"`)

Fácil de fazer com a sintaxe spread, não é?

Também existe uma implementação pronta, [_.partial](https://lodash.com/docs#partial), da biblioteca lodash.

## Resumo

O método `func.bind(context, ...args)` retorna uma "variante vinculada" da função `func` que fixa o contexto `this` e os primeiros argumentos, se fornecidos.

Normalmente aplicamos o `bind` para fixar o `this` de um método de objeto, para que possamos passá-lo adiante. Por exemplo, para `setTimeout`.

Quando fixamos alguns argumentos de uma função existente, a função resultante (menos universal) é chamada de *parcialmente aplicada* ou *parcial*.

Parciais são convenientes quando não queremos repetir o mesmo argumento o tempo todo. Tipo se temos uma função `send(from, to)`, e `from` deveria ser sempre o mesmo para a nossa tarefa, podemos obter uma parcial e seguir com ela.
