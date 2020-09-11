# Métodos do objeto, "this"

Objectos, geralmente são criados como representação de entidades no mundo real, como utilizadores, encomendas e assim por diante:

```js
let user = {
  name: "John",
  age: 30
};
```

E, no mundo real, um utilizador pode *interagir*: selecionar algo de um carrinho de compras, *login*, *logout*, etc.

As interações, são representadas em JavaScript por funções em propriedades.

## Exemplos de métodos

Para começar, ensinemos ao `user` a dizer olá:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
user.sayHi = function() {
  alert("Olá!");
};
*/!*

user.sayHi(); // Olá!
```

Aqui, acabamos de empregar uma Expressão de Função (*Function Expression*) para criar uma função e a atribuir à propriedade do objeto `user.sayHi`.

Depois, a podemos invocar. O utilizador pode agora falar!

Uma função que seja uma propriedade de um objeto, é chamada de seu *método* (*method*).

Assim, temos o método `sayHi` do objeto `user`.

Evidentemente, poderiamos usar uma função pré-declarada como método. Desta forma:

```js run
let user = {
  // ...
};

*!*
// primeiro, declare
function sayHi() {
  alert("Hello!");
};

// Depois adicine como método
user.sayHi = sayHi;
*/!*

user.sayHi(); // Hello!
```

```smart header="Programação orientada por objetos"
Quando escrevemos o nosso código empregando objetos para representar entidades, é chamada de [Programação orientada a objetos](https://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o_orientada_a_objetos) (*object-oriented programming*), abreviadamente: "OOP".

OOP (Programação orientada por objetos) é algo grande, uma ciência interessante por si mesma. Como escolher as entidades certas? Como organizar a interação enter elas? É arquitetura, e existem grandes livros neste tópico, como "Design Patterns: Elements of Reusable Object-Oriented Software" by E.Gamma, R.Helm, R.Johnson, J.Vissides ou "Object-Oriented Analysis and Design with Applications" by G.Booch, e mais.
```
### Abreviação de método

Existe uma sintaxe mais curta para métodos num objeto literal:

```js
// estes objetos fazem o mesmo

let user = {
  sayHi: function() {
    alert("Olá");
  }
};

// a abreviação de método tem melhor aspeto, não tem?
let user = {
*!*
  sayHi() { // o mesmo que "sayHi: function()"
*/!*
    alert("Olá");
  }
};
```

Como demonstrado, podemos omitir `"function"` e apenas escrever `sayHi()`.

Na verdade, as notações não são completamente idênticas. Existem diferenças subtis em relação à herança do objeto (a ser estudado mais adiante), mas por ora elas não interessam. Em quase todos os casos, a sintaxe mais curta é preferível.

## "*this*" em métodos

É comum que um método de um objeto precise de aceder à informação armazenada no objeto para executar a sua tarefa.

Por exemplo, o código dentro de `user.sayHi()` pode precisar do nome do `user`.

**Para aceder ao objeto, um método pode usar a palavra-chave `this`.**

O valor de `this` é o objeto "antes do ponto", o utilizado para chamar o método.

Por exemplo:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert(this.name);
*/!*
  }

};

user.sayHi(); // John
```

Aqui, durante a execução de `user.sayHi()`, o valor de `this` será `user`.

Tecnicamente, também é possível aceder ao objeto sem `this`, por meio de uma referência numa variável externa:

```js
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert(user.name); // "user" em vez de "this"
*/!*
  }

};
```

...Mas tal código não é fiável. Se decidirmos copiar `user` para outra variável, por exemplo `admin = user` e colocar outro valor em `user`, então a cópia irá aceder ao valor errado.

Isso, é demonstrado abaixo:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert( user.name ); // leva a um erro
*/!*
  }

};


let admin = user;
user = null; // atribui outro valor, para ser óbvio

admin.sayHi(); // Whoops! dentro de sayHi(), o nome antigo é utilizado! erro!
```

Se empregássemos `this.name` em vez de `user.name` dentro de `alert`, então o código funcionaria.

## "*this*" não está vinculado

Em JavaScript, a palavra-chave "this" não se comporta como em muitas outras linguagens de programação. Em primeiro lugar, pode ser utilizada em qualquer função.

Não existe algum erro de sintaxe num código como este:

```js
function sayHi() {
  alert( *!*this*/!*.name );
}
```

O valor de `this` é avaliado em tempo de execução. E, pode ser qualquer coisa.

Por exemplo, uma mesma função pode ter diferentes "*this*" quando invocada de diferentes objetos:

```js run
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

*!*
// use a mesma função em dois objectos
user.f = sayHi;
admin.f = sayHi;
*/!*

// estas chamadas têm diferentes 'this'
// "this" dentro da função é o objeto "antes do ponto"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (ponto ou parênteses retos para aceder ao método – é irrelevante)
```

Na verdade, podemos invocar a função sem nenhum objeto:

```js run
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

Neste caso, `this` está `undefined` no modo estrito (*strict mode*). Se tentarmos aceder a `this.name`, haverá um erro.

No modo não-estrito (*non-strict mode*), `this` será o *objeto global* (`window` num *browser*, o que veremos mais adiante no capítulo [Global object](info:global-object). Este, é um procedimento histórico que `"use strict"` corrige.

Por favor, note que geralmente uma chamada de função que use `this` sem um objeto não é normal, mas sim um erro de programação. Se uma função contiver `this`, então deverá ser invocada no contexto de um objeto.

```smart header="As consequências de 'this' não vinculado"
Se vem de uma outra linguagem de programação, então provavelmente está habituado à ideia de um `this` "vinculado", onde métodos definidos num objeto têm sempre `this` como referência a esse objeto.

Em JavaScript `this` é "livre", o seu valor é avaliado no momento da invocação (*call-time*) e não depende de onde o método foi declarado, mas sim de qual o objeto "antes do ponto".

O conceito de `this` avaliado em tempo-de-execução (*run-time*), possui ambas vantagens e desvantagens. Por um lado, uma função pode ser re-utilizada em objetos diferentes. Por outro, uma maior flexibilidade abre espaço para erros.

Aqui, a nossa posição não é julgar se a decisão no desenho desta linguagem é boa ou má. Iremos compreender como trabalhar com ele, como colher benefícios e como evitar problemas.
```

## Internamente: o Tipo Referência

```warn header="Intrínsica funcionalidade da linguagem"
Esta secção cobre um tópico avançado, para uma melhor compreensão de certos casos-limite.

Se quiser avançar mais rapidamente, pode ser saltada ou adiada.
```

Um método complicado pode perder `this`, por exemplo:

```js run
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user.hi(); // John (a chamada simples funciona)

*!*
// agora vamos invocar user.hi ou user.bye, dependendo do nome
(user.name == "John" ? user.hi : user.bye)(); // Erro!
*/!*
```

Na última linha, existe um operador ternário (*ternary operator*) que permite escolher `user.hi` ou `user.bye`. Para o presente caso, o resultado será `user.hi`.

O método é imediatamente chamado com os parênteses `()`. Mas, não funciona corretamente!

Pode observar que a chamada resulta num erro, porque o valor de `"this"` dentro da chamada torna-se `undefined`.

Isto funciona (objeto ponto método):
```js
user.hi();
```

Isto não (método avaliado):
```js
(user.name == "John" ? user.hi : user.bye)(); // Erro!
```

Porquê? Se, quisermos compreender porque acontece, vamos analisar como a chamada `obj.method()` funciona.

Observando mais de perto, podemos notar duas operações na instrução `obj.method()`:

1. Primeiro, o ponto `'.'` obtem a propriedade `obj.method`.
2. Depois, os parênteses `()` a executam.

Assim, como a informação sobre `this` passa da primeira parte para segunda?

Se colocarmos essas operações em linhas separadas, então `this` de certeza será perdido:

```js run
let user = {
  name: "John",
  hi() { alert(this.name); }
}

*!*
// particione o obter e chamar o método em duas linhas
let hi = user.hi;
hi(); // Erro, porque 'this' está undefined
*/!*
```

Aqui, `hi = user.hi` coloca a função numa variável, e a seguir na última linha ela está completamente isolada, não existe nenhum `this`.

**Para fazer a chamada `user.hi()` funcionar, JavaScript usa um truque -- o ponto `'.'` não retorna um função , mas um valor especial [Reference Type](https://tc39.github.io/ecma262/#sec-reference-specification-type) (do tipo referência).**

O *Reference Type* é um "tipo incorporado na especificação". Não o podemos utilizar explicitamente, mas é usado internamente pela linguagem.

O valor do *Reference Type* é uma combinação de três-valores `(base, name, strict)`, onde:

- `base` é o objeto.
- `name` é a propriedade.
- `strict` é *true* (verdadeiro) se `use strict` estiver em efeito.

O resultado de um acesso à propriedade `user.hi` não é uma função, mas um valor do tipo Referência (*Reference Type*). Para `user.hi` em modo estrito (*strict mode*) ele é:

```js
// valor do Tipo Referência
(user, "hi", true)
```

Quando parênteses `()` são chamados sobre o *Reference Type*, eles recebem uma completa informação sobre o objeto e o seu método, e pode ser estabelecido o `this` certo (`=user`, neste caso).

Qualquer outra operação, como a atribuição `hi = user.hi` descarta totalmente o tipo referência, toma o valor de `user.hi` (uma função) e o passa. Assim, qualquer operação posterior "perde" o `this`.

Deste modo, como resultado, o valor de `this` apenas é passado da forma correta se a função for chamada diretamente utilizando um ponto `obj.method()` ou a sintaxe de parênteses retos `obj['method']()` (eles fazem o mesmo aqui). Mais adiante neste tutorial, vamos aprender várias formas de resolver este problema, como por exemplo [func.bind()](/bind#solution-2-bind).

## As funções *arrow* não têm "this"

Funções *arrow* são especiais: elas não possuem o seu "próprio" `this`. Se fizermos referência a `this` dentro de uma tal função, ele é tomado da função externa "normal".

Por exemplo, aqui `arrow()` usa o `this` do método externo `user.sayHi()`:

```js run
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // Ilya
```

Essa, é uma particularidade especial das funções *arrow*, e é útil quando na realidade não quisermos ter um `this` em separado, mas apenas o obter do contexto exterior. Mais adiante, no capítulo <info:arrow-functions> trataremos com mais pormenor de funções *arrow*.


## Sumário

- Funções que são armazenadas em propriedades de objetos são chamadas de "métodos".
- Métodos permitem a objetos "interagir", como `object.doSomething()`.
- Métodos podem referenciar o objeto por `this`.

O valor de `this` é definido em tempo-de-execução.

- Quando uma função é declarada, pode empregar o `this`, mas esse `this` não tem qualquer valor até a função ser chamada.
- Essa função pode ser copiada entre objetos.
- Quando uma função é chamada pela sintaxe de "método" `object.method()`, o valor de `this` durante a chamada é `object`.

Por favor, note que funções *arrow* são especiais: elas não possuem `this`. Quando `this` é acedido dentro de uma função *arrow*, o valor é tomado de fora.
