
# Propriedades e métodos estáticos

Também podemos atribuir um método à classe como um todo. Esses métodos são chamados de *estáticos*.

Em uma declaração de classe, eles são precedidos pela palavra-chave `static`, assim:

```js run
class User {
*!*
  static staticMethod() {
*/!*
    alert(this === User);
  }
}

User.staticMethod(); // true
```

Isso, na verdade, faz a mesma coisa que atribuí-lo diretamente como uma propriedade:

```js run
class User { }

User.staticMethod = function() {
  alert(this === User);
};

User.staticMethod(); // true
```

O valor de `this` na chamada `User.staticMethod()` é o próprio construtor da classe `User` (a regra do "objeto antes do ponto").

Geralmente, métodos estáticos são usados para implementar funções que pertencem à classe como um todo, mas não a nenhum objeto específico dela.

Por exemplo, temos objetos `Article` e precisamos de uma função para compará-los.

Uma solução natural seria adicionar o método estático `Article.compare`:

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
*/!*
}

// uso
let articles = [
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1))
];

*!*
articles.sort(Article.compare);
*/!*

alert( articles[0].title ); // CSS
```

Aqui o método `Article.compare` fica "acima" dos artigos, como um meio de compará-los. Não é um método de um artigo, mas sim de toda a classe.

Outro exemplo seria um método chamado de "fábrica" (factory).

Digamos que precisamos de várias formas de criar um artigo:

1. Criar a partir de parâmetros fornecidos (`title`, `date`, etc).
2. Criar um artigo vazio com a data de hoje.
3. ...ou de alguma outra forma.

A primeira forma pode ser implementada pelo construtor. E para a segunda, podemos fazer um método estático da classe.

Como o `Article.createTodays()` aqui:

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static createTodays() {
    // lembre-se, this = Article
    return new this("Today's digest", new Date());
  }
*/!*
}

let article = Article.createTodays();

alert( article.title ); // Today's digest
```

Agora, toda vez que precisarmos criar um resumo de hoje, podemos chamar `Article.createTodays()`. Mais uma vez, isso não é um método de um artigo, mas um método de toda a classe.

Métodos estáticos também são usados em classes relacionadas a banco de dados, para buscar/salvar/remover registros do banco, assim:

```js
// supondo que Article seja uma classe especial para gerenciar artigos
// método estático para remover o artigo pelo id:
Article.remove({id: 12345});
```

````warn header="Métodos estáticos não estão disponíveis para objetos individuais"
Métodos estáticos podem ser chamados em classes, não em objetos individuais.

Por exemplo, um código assim não vai funcionar:

```js
// ...
article.createTodays(); /// Error: article.createTodays is not a function
```
````

## Propriedades estáticas

[recent browser=Chrome]

Propriedades estáticas também são possíveis, elas se parecem com propriedades comuns de classe, mas são precedidas por `static`:

```js run
class Article {
  static publisher = "Ilya Kantor";
}

alert( Article.publisher ); // Ilya Kantor
```

Isso é o mesmo que uma atribuição direta a `Article`:

```js
Article.publisher = "Ilya Kantor";
```

## Herança de propriedades e métodos estáticos [#statics-and-inheritance]

Propriedades e métodos estáticos são herdados.

Por exemplo, `Animal.compare` e `Animal.planet` no código abaixo são herdados e acessíveis como `Rabbit.compare` e `Rabbit.planet`:

```js run
class Animal {
  static planet = "Earth";

  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }

  run(speed = 0) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

*!*
  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
*/!*

}

// Herda de Animal
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}

let rabbits = [
  new Rabbit("White Rabbit", 10),
  new Rabbit("Black Rabbit", 5)
];

*!*
rabbits.sort(Rabbit.compare);
*/!*

rabbits[0].run(); // Black Rabbit runs with speed 5.

alert(Rabbit.planet); // Earth
```

Agora, quando chamamos `Rabbit.compare`, o `Animal.compare` herdado será chamado.

Como isso funciona? De novo, usando protótipos. Como você já deve ter imaginado, o `extends` dá a `Rabbit` a referência `[[Prototype]]` para `Animal`.

![](animal-rabbit-static.svg)

Então, `Rabbit extends Animal` cria duas referências `[[Prototype]]`:

1. A função `Rabbit` herda prototipicamente da função `Animal`.
2. `Rabbit.prototype` herda prototipicamente de `Animal.prototype`.

Como resultado, a herança funciona tanto para métodos comuns quanto para métodos estáticos.

Aqui, vamos conferir isso pelo código:

```js run
class Animal {}
class Rabbit extends Animal {}

// para estáticos
alert(Rabbit.__proto__ === Animal); // true

// para métodos comuns
alert(Rabbit.prototype.__proto__ === Animal.prototype); // true
```

## Resumo

Métodos estáticos são usados para funcionalidades que pertencem à classe "como um todo". Não se relacionam a uma instância concreta da classe.

Por exemplo, um método de comparação `Article.compare(article1, article2)` ou um método de fábrica `Article.createTodays()`.

Eles são identificados pela palavra `static` na declaração da classe.

Propriedades estáticas são usadas quando queremos guardar dados no nível da classe, também não vinculados a uma instância.

A sintaxe é:

```js
class MyClass {
  static property = ...;

  static method() {
    ...
  }
}
```

Tecnicamente, uma declaração estática é o mesmo que atribuir diretamente à própria classe:

```js
MyClass.property = ...
MyClass.method = ...
```

Propriedades e métodos estáticos são herdados.

Para `class B extends A`, o próprio protótipo da classe `B` aponta para `A`: `B.[[Prototype]] = A`. Então, se um campo não é encontrado em `B`, a busca continua em `A`.
