# Métodos de objeto, "this"

Objetos são geralmente criados para representar entidades do mundo real, como usuários, pedidos e assim por diante:

```js
let user = {
  name: "John",
  age: 30
};
```

E, no mundo real, um usuário pode *agir*: selecionar algo do carrinho de compras, fazer login, logout etc.

Ações são representadas em JavaScript por funções em propriedades.

## Exemplos de métodos

Para começar, vamos ensinar o `user` a dizer olá:

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

Aqui acabamos de usar uma Expressão de Função para criar uma função e atribuí-la à propriedade `user.sayHi` do objeto.

Então podemos chamá-la como `user.sayHi()`. O usuário agora pode falar!

Uma função que é uma propriedade de um objeto é chamada de seu *método*.

Então, aqui temos um método `sayHi` do objeto `user`.

Claro, poderíamos usar uma função pré-declarada como método, assim:

```js run
let user = {
  // ...
};

*!*
// primeiro, declarar
function sayHi() {
  alert("Olá!");
}

// depois adicionar como um método
user.sayHi = sayHi;
*/!*

user.sayHi(); // Olá!
```

```smart header="Programação orientada a objetos"
Quando escrevemos nosso código usando objetos para representar entidades, isso é chamado de [programação orientada a objetos](https://pt.wikipedia.org/wiki/Programação_orientada_a_objetos), em resumo: "POO".

POO é algo grande, uma ciência interessante por si só. Como escolher as entidades corretas? Como organizar a interação entre elas? Isso é arquitetura, e existem ótimos livros sobre esse tópico, como "Padrões de Projeto: Soluções Reutilizáveis de Software Orientado a Objetos" por E. Gamma, R. Helm, R. Johnson, J. Vissides ou "Análise e Projeto Orientados a Objetos com Aplicações" por G. Booch, entre outros.
```
### Sintaxe abreviada de método

Existe uma sintaxe mais curta para métodos em um literal de objeto:

```js
// esses objetos fazem a mesma coisa

user = {
  sayHi: function() {
    alert("Olá");
  }
};

// a sintaxe abreviada de método fica melhor, certo?
user = {
*!*
  sayHi() { // mesmo que "sayHi: function(){...}"
*/!*
    alert("Olá");
  }
};
```

Como demonstrado, podemos omitir `"function"` e apenas escrever `sayHi()`.

Para falar a verdade, as notações não são totalmente idênticas. Existem diferenças sutis relacionadas à herança de objetos (a ser coberta mais tarde), mas por enquanto elas não importam. Em quase todos os casos, a sintaxe mais curta é preferida.

## "this" em métodos

É comum que um método de objeto precise acessar as informações armazenadas no objeto para fazer seu trabalho.

Por exemplo, o código dentro de `user.sayHi()` pode precisar do nome do `user`.

**Para acessar o objeto, um método pode usar a palavra-chave `this`.**

O valor de `this` é o objeto "antes do ponto", aquele usado para chamar o método.

Por exemplo:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    // "this" é o "objeto atual"
    alert(this.name);
*/!*
  }

};

user.sayHi(); // John
```

Aqui, durante a execução de `user.sayHi()`, o valor de `this` será `user`.

Tecnicamente, também é possível acessar o objeto sem `this`, referenciando-o através da variável externa:

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

...Mas tal código não é confiável. Se decidirmos copiar `user` para outra variável, por exemplo, `admin = user` e sobrescrever `user` com outra coisa, então ele acessará o objeto errado.

Isso é demonstrado abaixo:

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
user = null; // sobrescrevemos para tornar as coisas óbvias

*!*
admin.sayHi(); // TypeError: Cannot read property 'name' of null
*/!*
```

Se usássemos `this.name` em vez de `user.name` dentro do `alert`, então o código funcionaria.

## "this" não é vinculado

Em JavaScript, a palavra-chave `this` se comporta diferentemente da maioria das outras linguagens de programação. Ela pode ser usada em qualquer função, mesmo que não seja um método de um objeto.

Não há erro de sintaxe no seguinte exemplo:

```js
function sayHi() {
  alert( *!*this*/!*.name );
}
```

O valor de `this` é avaliado durante o tempo de execução, dependendo do contexto.

Por exemplo, aqui a mesma função é atribuída a dois objetos diferentes e tem "this" diferentes nas chamadas:

```js run
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

*!*
// usa a mesma função em dois objetos
user.f = sayHi;
admin.f = sayHi;
*/!*

// essas chamadas têm this diferentes
// "this" dentro da função é o objeto "antes do ponto"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (ponto ou colchetes acessam o método – não importa)
```

A regra é simples: se `obj.f()` é chamado, então `this` é `obj` durante a chamada de `f`. Então é `user` ou `admin` no exemplo acima.

````smart header="Chamando sem um objeto: `this == undefined`"
Podemos até chamar a função sem um objeto:

```js run
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

Neste caso, `this` é `undefined` no modo estrito. Se tentarmos acessar `this.name`, haverá um erro.

No modo não estrito, o valor de `this` em tal caso será o *objeto global* (`window` em um navegador, chegaremos a isso mais tarde no capítulo [](info:global-object)). Este é um comportamento histórico que `"use strict"` corrige.

Geralmente tal chamada é um erro de programação. Se há `this` dentro de uma função, ela espera ser chamada em um contexto de objeto.
````

```smart header="As consequências do `this` não vinculado"
Se você vem de outra linguagem de programação, então provavelmente está acostumado com a ideia de um "`this` vinculado", onde métodos definidos em um objeto sempre têm `this` referenciando aquele objeto.

Em JavaScript, `this` é "livre", seu valor é avaliado no momento da chamada e não depende de onde o método foi declarado, mas sim de qual objeto está "antes do ponto".

O conceito de `this` avaliado em tempo de execução tem prós e contras. Por um lado, uma função pode ser reutilizada para diferentes objetos. Por outro lado, a maior flexibilidade cria mais possibilidades para erros.

Aqui nossa posição não é julgar se essa decisão de design da linguagem é boa ou ruim. Vamos entender como trabalhar com isso, como obter benefícios e evitar problemas.
```

## Funções de seta não têm "this"

Funções de seta são especiais: elas não têm seu próprio `this`. Se referenciarmos `this` de tal função, ele é obtido da função "normal" externa.

Por exemplo, aqui `arrow()` usa `this` do método externo `user.sayHi()`:

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

Essa é uma característica especial das funções de seta, é útil quando na verdade não queremos ter um `this` separado, mas sim obtê-lo do contexto externo. Mais tarde no capítulo <info:arrow-functions> vamos mergulhar mais profundamente nas funções de seta.


## Resumo

- Funções que são armazenadas em propriedades de objeto são chamadas de "métodos".
- Métodos permitem que objetos "ajam" como `object.doSomething()`.
- Métodos podem referenciar o objeto como `this`.

O valor de `this` é definido em tempo de execução.
- Quando uma função é declarada, ela pode usar `this`, mas esse `this` não tem valor até que a função seja chamada.
- Uma função pode ser copiada entre objetos.
- Quando uma função é chamada na sintaxe de "método": `object.method()`, o valor de `this` durante a chamada é `object`.

Por favor, note que funções de seta são especiais: elas não têm `this`. Quando `this` é acessado dentro de uma função de seta, ele é obtido de fora.
