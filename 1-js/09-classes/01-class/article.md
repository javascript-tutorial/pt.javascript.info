
# Class basic syntax

```quote author="Wikipedia"
Em programação e na orientação a objetos, uma classe é um tipo abstrato de Dados (TAD); ou seja, uma descrição que abstrai um conjunto de objetos com características similares (um projeto do objeto), é um código da linguagem de programação orientada a objetos que define e implementa um novo tipo de objeto, que terão características (atributos) que guardaram valores e, também funções específicas para manipular estes.
```

Na prática, muitas vezes precisamos criar muitos objetos do mesmo tipo, como usuários, bens ou qualquer outra coisa.

Como já sabemos do capítulo <info:constructor-new>, `new function` pode ajudar com isso.

Mas no JavaScript moderno, há uma construção de "classe" mais avançada, que introduz novos recursos excelentes que são úteis para programação orientada a objetos.

## A sintaxe da "class"

A sintaxe básica é:
```js
class MyClass {
  // class methods
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

Então use `new MyClass()` para criar um objeto com todos os métodos listados.

O método `constructor()` é executado automaticamente pela declaração de `new`, então realizamos a inicialização o objeto através dessa chamada.

Por exemplo:

```js run
class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

// Usage:
let user = new User("John");
user.sayHi();
```

Quando `new User("John")` é executado:

1. Um novo objeto é criado (também descrito como tendo sido `instanciado`).
2. O `construtor` é executado com o argumento fornecido e o atribui a `this.name`.

...Então podemos chamar os métodos do objeto `User`, como `user.sayHi()`.


```warn header="Sem vírgula entre métodos de classe"
Uma armadilha comum para desenvolvedores iniciantes é colocar uma vírgula entre os métodos de classe, o que resultaria em um erro de sintaxe.

A notação aqui não deve ser confundida com `Object Literals`. Dentro da classe, não são necessárias vírgulas.
```

## O que é uma classe?

Então, o que exatamente é uma `classe`? Essa não é uma entidade totalmente nova em nível de linguagem, como se poderia pensar.

Vamos desvendar qualquer mágica e ver o que realmente é uma classe. Isso ajudará na compreensão de muitos aspectos complexos.

Em JavaScript, uma classe é um tipo de função.

Aqui, dê uma olhada:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// prova: o usuário é uma função
*!*
alert(typeof User); // function
*/!*
```

O que a construção `class User {...}` realmente faz é:

1. Cria uma função chamada `User`, que se torna o resultado da declaração da classe. O código da função é retirado do método `constructor` (assumido vazio se não escrevermos tal método).
2. Armazena métodos de classe, como `sayHi`, em `User.prototype`.

Após a criação do objeto via `new User`, quando chamamos um de seus métodos, ele é retirado do protótipo, exatamente como descrito no capítulo <info:function-prototype>. Assim, o objeto tem acesso a métodos de classe.

Podemos ilustrar o resultado da declaração `class User` como:

![](class-user.svg)

Aqui está o código para introspecção:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// classe é uma função
alert(typeof User); // function

// ...ou, mais precisamente, o método construtor
alert(User === User.prototype.constructor); // true

// Os métodos estão em User.prototype, por exemplo:
alert(User.prototype.sayHi); // the code of the sayHi method

// existem exatamente dois métodos no protótipo
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

## Não é apenas um syntax sugar

Às vezes as pessoas dizem que `class` é um "syntax sugar" (sintaxe projetada para tornar as coisas mais fáceis de ler, mas não introduz nada de novo), porque poderíamos declarar a mesma coisa sem usar a palavra-chave `class` em tudo:

```js run
// reescrevendo a classe User em funções puras

// 1. Cria a função construtora
function User(name) {
  this.name = name;
}
// um protótipo de função tem a propriedade "construtor" por padrão,
// então não precisamos criá-lo

// 2. Adicione o método ao protótipo
User.prototype.sayHi = function() {
  alert(this.name);
};

// Forma de uso:
let user = new User("John");
user.sayHi();
```

O resultado desta definição é aproximadamente o mesmo. Portanto, existem de fato razões pelas quais `class` pode ser considerado um açúcar sintático para definir um construtor com seus métodos de protótipo.

Ainda assim, existem diferenças importantes.

1. Primeiro, uma função criada por `class` é rotulada por uma propriedade interna especial `[[IsClassConstructor]]: true`. Portanto, não é o mesmo que criá-lo manualmente.

    A linguagem verifica essa propriedade em vários lugares. Por exemplo, diferente de uma função normal, ela deve ser chamada com `new`:

    ```js run
    class User {
      constructor() {}
    }

    alert(typeof User); // function
    User(); // Error: Class constructor User cannot be invoked without 'new'
    ```

    Além disso, uma representação textual de um construtor de classe na maioria dos mecanismos JavaScript começa com o "class..."

    ```js run
    class User {
      constructor() {}
    }

    alert(User); // class User { ... }
    ```
    Existem outras diferenças, veremos em breve.

2. Os métodos de classe não são enumeráveis.
    Uma definição de classe define a *flag* `enumerable` como `false` para todos os métodos no `"prototype"`.

    Isso é bom, porque se nós iterarmos via `for..in` sobre um objeto, geralmente não queremos seus métodos de classe.

3. As classes sempre usam `use strict`.
    Todo o código dentro da construção da classe está automaticamente no modo estrito.

Além disso, a sintaxe `class` traz muitos outros recursos que exploraremos mais tarde.

## Expressões de classe

Assim como as funções, as classes podem ser definidas dentro de outra expressão, passadas, retornadas, atribuídas, etc.

Aqui está um exemplo de uma expressão de classe:

```js
let User = class {
  sayHi() {
    alert("Hello");
  }
};
```

Assim como expressões de função nomeadas, expressões de classe podem ter um nome.

Se uma expressão de classe possuir um nome, este será visível apenas dentro da classe.

```js run
// "Expressão de Classe Nomeada"
// (nenhum termo na especificação, mas é semelhante à expressão de função nomeada)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // O nome MyClass é visível apenas dentro da classe
  }
};

new User().sayHi(); // funciona, mostra a definição de MyClass

alert(MyClass); // erro, o nome MyClass não é visível fora da classe
```

Podemos até fazer uma classe dinamicamente "sob demanda", assim:

```js run
function makeClass(phrase) {
  // declara uma classe e retorna
  return class {
    sayHi() {
      alert(phrase);
    }
  };
}

// Cria uma nova classe
let User = makeClass("Hello");

new User().sayHi(); // Hello
```


## Getters/setters

Assim como os objetos literais, as classes podem incluir getters/setters, propriedades computadas etc.

Aqui está um exemplo para `user.name` implementado usando `get/set`:

```js run
class User {

  constructor(name) {
    // invoca o setter
    this.name = name;
  }

*!*
  get name() {
*/!*
    return this._name;
  }

*!*
  set name(value) {
*/!*
    if (value.length < 4) {
      alert("Nome é muito curto.");
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
alert(user.name); // John

user = new User(""); // Nome é muito curto
```

Tecnicamente, tal declaração de classe funciona criando getters e setters em `User.prototype`.

## Nomes computados [...]

Aqui está um exemplo com um nome de método calculado usando colchetes `[...]`:

```js run
class User {

*!*
  ['say' + 'Hi']() {
*/!*
    alert("Hello");
  }

}

new User().sayHi();
```

Esses recursos são fáceis de lembrar, pois, se assemelham aos de objetos literais.

## Campos de classe

```warn header="Navegadores antigos podem precisar de um polyfill"
Os campos de classe são uma adição recente a linguagem.
```

Anteriormente, nossas classes tinham apenas métodos.

"Campos de classe" é uma sintaxe que permite adicionar quaisquer propriedades.

Por exemplo, vamos adicionar a propriedade `name` à classe `User`:

```js run
class User {
*!*
  name = "John";
*/!*

  sayHi() {
    alert(`Hello, ${this.name}!`);
  }
}

new User().sayHi(); // Hello, John!
```

Então, nós apenas escrevemos "<nome da propriedade> = <valor>" na declaração e pronto.

A diferença importante dos campos de classe é que eles são definidos em objetos individuais, não em `User.prototype`:

```js run
class User {
*!*
  name = "John";
*/!*
}

let user = new User();
alert(user.name); // John
alert(User.prototype.name); // undefined
```

Também podemos atribuir valores usando expressões mais complexas e chamadas de função:

```js run
class User {
*!*
  name = prompt("Name, please?", "John");
*/!*
}

let user = new User();
alert(user.name); // John
```


### Fazendo métodos vinculados com campos de classe

Como demonstrado no capítulo, as funções <info:bind> em JavaScript têm um `this` dinâmico. Depende do contexto da chamada.

Portanto, se um método de objeto for passado e chamado em outro contexto, `this` não será mais uma referência ao seu objeto.

Por exemplo, este código mostrará `undefined`:

```js run
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    alert(this.value);
  }
}

let button = new Button("hello");

*!*
setTimeout(button.click, 1000); // undefined
*/!*
```

O problema é chamado de "perder `this`".

Existem duas abordagens para corrigi-lo, conforme discutido no capítulo <info:bind>:

1. Passe uma função wrapper, como `setTimeout(() => button.click(), 1000)`.
2. Vincule o método ao objeto, por exemplo, no construtor.

Os campos de classe fornecem outra sintaxe bastante elegante:

```js run
class Button {
  constructor(value) {
    this.value = value;
  }
*!*
  click = () => {
    alert(this.value);
  }
*/!*
}

let button = new Button("hello");

setTimeout(button.click, 1000); // hello
```

O campo de classe `click = () => {...}` é criado por objeto, há uma função separada para cada objeto `Button`, com `this` dentro dele referenciando aquele objeto. Podemos passar `button.click` em qualquer lugar, e o valor de `this` sempre estará correto.

Isso é especialmente útil no ambiente do navegador, para ouvintes de eventos.

## Resumo

A sintaxe básica da classe se parece com isso:

```js
class MyClass {
  prop = value; // property

  constructor(...) { // constructor
    // ...
  }

  method(...) {} // method

  get something(...) {} // getter method
  set something(...) {} // setter method

  [Symbol.iterator]() {} // method with computed name (symbol here)
  // ...
}
```

`MyClass` é tecnicamente uma função (aquela que fornecemos como `constructor`), enquanto métodos, getters e setters são escritos em `MyClass.prototype`.

Nos próximos capítulos, aprenderemos mais sobre classes, incluindo herança e outros recursos.
