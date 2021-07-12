# Métodos de objetos, "this"

Objetos geralmente são criados para representar entidades do mundo real, como utilizadores, encomendas, e assim por diante:

```js
let user = {
  name: "John",
  age: 30
};
```

E no mundo real, um utilizador pode *interagir*: selecionar algo de um carrinho de compras, fazer *login*, *logout*, etc.

As interações, são representadas em JavaScript por funções em propriedades.

## Exemplos de métodos

Para começar, vamos ensinar ao `user` a dizer olá:

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

Aqui, acabamos de usar uma Function Expression (*Expressão de Função*) para criar uma função, e de fazer a sua atribuição à propriedade do objeto `user.sayHi`.

A seguir, a podemos invocar como `user.sayHi()`. O utilizador pode agora falar!

Uma função que seja uma propriedade de um objeto, é chamada de seu *método* (*method*).

Assim, temos o método `sayHi` do objeto `user`.

É claro que poderíamos utilizar uma função pré-declarada como método, desta forma:

```js run
let user = {
  // ...
};

*!*
// primeiro, declare
function sayHi() {
  alert("Olá!");
};

// depois adicione como um método
user.sayHi = sayHi;
*/!*

user.sayHi(); // Olá!
```

```smart header="Programação orientada por objetos"
Quando escrevemos o nosso código empregando objetos para representar entidades, isto se chama [Programação orientada a objetos](https://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o_orientada_a_objetos), abreviadamente: "OOP" (*object-oriented programming*).

OOP (Programação orientada por objetos) é algo grande, uma ciência interessante por si mesma. Como escolher as entidades certas? Como organizar a interação entre elas? É arquitetura, e existem bons livros neste tópico, como "Design Patterns: Elements of Reusable Object-Oriented Software" by E.Gamma, R.Helm, R.Johnson, J.Vissides, ou "Object-Oriented Analysis and Design with Applications" by G.Booch, e outros.
```
### Abreviação de método

Há uma sintaxe mais curta para métodos dentro de um objeto literal:

```js
// ambos os objetos fazem o mesmo

let user = {
  sayHi: function() {
    alert("Olá");
  }
};

// a abreviação de método tem um melhor aspeto, não é?
let user = {
*!*
  sayHi() { // o mesmo que "sayHi: function(){...}"
*/!*
    alert("Olá");
  }
};
```

Como demonstrado, podemos omitir `"function"` e apenas escrever `sayHi()`.

Na verdade, as notações não são totalmente idênticas. Existem diferenças subtis relacionadas com a herança do objeto (a ser estudado mais adiante), mas por ora elas não interessam. Em quase todos os casos, a sintaxe mais curta é preferível.

## "*this*" em métodos

É comum, que um método de um objeto precise de aceder à informação armazenada no objeto para executar a sua tarefa.

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
    // "this" é o objeto atual
    alert(this.name);
*/!*
  }

};

user.sayHi(); // John
```

Aqui, durante a execução de `user.sayHi()`, o valor de `this` é `user`.

Tecnicamente, também é possível aceder ao objeto sem `this`, fazendo referência a ele através da variável externa:

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

...Mas tal código não é fiável. Se decidirmos copiar `user` para outra variável, por exemplo `admin = user` e colocar um valor diferente  em `user`, então a cópia irá aceder ao valor errado.

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
user = null; // atribui outro valor, para tornar o processo óbvio

*!*
admin.sayHi(); // TypeError: Cannot read property 'name' of null (ErroDeTipo:  Não é possível ler a propriedade 'name' de null)
*/!*
```

Se tivéssemos usado `this.name` em vez de `user.name` dentro do `alert`, então o código iria funcionar.

## "*this*" não está vinculado

Em JavaScript, a palavra-chave `this` não se comporta como em muitas outras linguagens de programação. Ela pode ser utilizada em qualquer função, mesmo que a função não seja um método de um objeto.

Não existe nenhum erro de sintaxe no exemplo seguinte:

```js
function sayHi() {
  alert( *!*this*/!*.name );
}
```

O valor de `this` é avaliado em tempo de execução, ele depende do contexto.

Por exemplo, aqui uma mesma função é atribuída a dois objetos diferentes, então tem "*this*" diferentes nas invocações:

```js run
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

*!*
// use a mesma função em dois objetos
user.f = sayHi;
admin.f = sayHi;
*/!*

// estas chamadas têm 'this' diferentes
// o "this" dentro da função, é o objeto "antes do ponto"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (ponto ou parênteses retos para se aceder ao método – tanto faz)
```

A regra é simples: se é chamado `obj.f()`, então `this` é `obj` durante a chamada de `f`. Deste modo, é `user` ou `admin` no exemplo acima.

````smart header="Chamando sem um objeto: 'this == undefined'"
Nós até podemos chamar a função sem nenhum objeto:

```js run
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

Neste caso `this` é `undefined` no modo estrito (*strict mode*). Se, tentarmos aceder a `this.name` irá ocorrer um erro.

No modo não-estrito, o valor de `this` para este caso irá ser o *objeto global* (`window` num navegador, e iremos ver isto mais adiante no capítulo [](info:global-object)). Este é um comportamento histórico que `"use strict"` corrige.

Geralmente, tal chamada é um erro de programação. Se `this` estiver dentro de uma função, ele espera ser chamado no contexto de um objeto.
````

```smart header="As consequências de 'this' não vinculado"
Se você vem de uma outra linguagem de programação, então provavelmente está habituado à ideia de um "`this` vinculado", onde métodos definidos num objeto têm sempre `this` como referência a esse objeto.

Em JavaScript `this` é "livre", o seu valor é avaliado no momento da invocação (*call-time*) e não depende da altura em que o método foi declarado, mas sim de qual é o objeto "antes do ponto".

O conceito de `this` avaliado em tempo-de-execução (*run-time*), possui ambas vantagens e desvantagens. Por um lado, uma função pode ser re-utilizada em objetos diferentes. Por outro, uma maior flexibilidade abre mais espaço para erros.

Aqui, a nossa posição não é julgar se a decisão no desenho desta linguagem é boa ou má. Iremos compreender como trabalhar com ele, como colher benefícios e evitar problemas.
```

## *Arrow functions* não têm "this"

Arrow functions (*funções seta*) são especiais: elas não possuem o seu "próprio" `this`. Se fizermos referência a `this` dentro de uma tal função, ele é tomado da função externa "normal".

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

Esta, é uma particularidade especial das funções seta, e é útil quando na realidade não queremos ter um `this` separado, mas simplesmente o obter do contexto exterior. Mais adiante, no capítulo <info:arrow-functions> trataremos em mais pormenor de funções seta.


## Sumário

- Funções que são armazenadas em propriedades de objetos são chamadas de "métodos".
- Métodos permitem aos objetos "agir", como `object.doSomething()`.
- Métodos podem referenciar o objeto por `this`.

O valor de `this` é definido em tempo-de-execução.
- Quando uma função é declarada pode utilizar o `this`, mas esse `this` não tem qualquer valor até que a função seja chamada.
- Uma função pode ser copiada entre objetos.
- Quando uma função é invocada pela sintaxe de "método", ex. `object.method()`, o valor de `this` durante a chamada é `object`.

Por favor, note que funções seta (*arrow functions*) são especiais: elas não possuem `this`. Quando `this` é acedido dentro de uma função seta, o seu valor é tomado de fora.
