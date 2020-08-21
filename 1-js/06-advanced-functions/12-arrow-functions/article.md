# Revisitando Arrow Functions (funções seta)

Vamos revisitar as *arrow functions*.

As *arrow functions* não são somente uma "abreviação" para escrevermos menos código.

O *JavaScript* está cheio de situações onde precisamos escrever uma pequena função que será executada em um outro lugar.

Por exemplo:

- `arr.forEach(func)` -- `func` é executada por `forEach` para cada item do *array*.
- `setTimeout(func)` -- `func` é executada pelo agendador embutido.
- ...entre outros.

Uma das características mais marcantes do *JavaScript* é criar uma função e passá-la para outro lugar.

E, nessas funções, geralmente não queremos sair de nosso contexto atual.

## Arrow functions não possuem "this"

Assim como vimos no capítulo <info:object-methods>, *arrow functions* não possuem `this`. Se `this` é acessada, ela vem do contexto externo em que está inserida.

Por exemplo, podemos usá-la para iterar dentro de um método de objeto:

```js run
let group = {
  title: "Nosso Grupo",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(
      student => alert(this.title + ': ' + student)
    );
*/!*
  }
};

group.showList();
```

Aqui em `forEach`, a *arrow function* é usada, então `this.title` dentro dela é a mesma que a da função em que está inserida `showList`. Ou seja: `group.title`.

Se usássemos uma função "regular", haveria um erro:

```js run
let group = {
  title: "Nosso Grupo",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(function(student) {
      // Error: Cannot read property 'title' of undefined
      alert(this.title + ': ' + student)
    });
*/!*
  }
};

group.showList();
```

O erro acontece porque `forEach` executa funções com `this=undefined` por padrão. Então, a tentativa de acessar `undefined.title` é feita.

Isso não acontece com *arrow functions*, porque elas não possuem `this`.

```warn header="Arrow functions não podem ser executadas com `new`"
Não possuir `this` traz naturalmente outra limitação: *arrow functions* não podem ser usadas com construtores. Elas não podem ser chamadas com `new`.
```

```smart header="Arrow functions VS bind"
Existe uma diferença sutil entre uma *arrow function* `=>` e uma função regular chamada com `.bind(this)`:

- `.bind(this)` cria uma "versão vinculada" da função.
- A *arrow* `=>` não cria nenhum vínculo. A função simplesmente não possui `this`. A  busca por `this` é feita exatamente da mesma maneira que uma busca por uma variável regular: em seu contexto léxico onde está inserida.
```

## Arrows não possuem "arguments" (argumentos)

*Arrow functions* também não possuem a variável `arguments`.

Isso é ótimo para *decorators*, quando precisamos encaminhar uma chamada com os atuais `this` e `arguments`.

Por exemplo, `defer(f, ms)` recebe uma função e retorna um *wrapper* (invólucro) ao seu redor que atrasa a chamada por `ms` milissegundos:

```js run
function defer(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms)
  };
}

function sayHi(who) {
  alert('Olá, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // Olá, John depois de 2 segundos
```

O mesmo sem uma *arrow function* seria algo assim:

```js
function defer(f, ms) {
  return function(...args) {
    let ctx = this;
    setTimeout(function() {
      return f.apply(ctx, args);
    }, ms);
  };
}
```

Aqui precisamos criar as variáveis adicionais `args` e `ctx` para que a função chamada dentro de `setTimeout` possam acessá-las.

## Resumo

*Arrow functions* (funções seta):

- Não possuem `this`.
- Não possuem `arguments`.
- Não podem ser chamadas com `new`.
- (Elas também não possuem `super`, mas ainda não a estudamos. Veremos no capítulo <info:class-inheritance>).

Isso porque elas são feitas para pequenos trechos de código que não possuem seus próprios "contextos", mas sim utilizam o contexto em que estão inseridas. E elas realmente brilham nesses casos.
