# Construtor, operador "new"

A sintaxe regular `{...}` permite criar um objeto. Mas frequentemente precisamos de criar vários objetos iguais, como diversos usuários, itens de um menu, etc.

Isto pode ser feito usando as funções construtoras e o operador `"new"` .

## Funções construtoras

Funções construtoras são tecnicamente, funções regulares. Entretanto, existem duas convenções: 

1. Elas são nomeadas com a primeira letra em maiúsculas.
2. Elas devem ser executadas apenas através do operador `"new"`.

Por exemplo:

```js run
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

*!*
let user = new User("Jack");
*/!*

alert(user.name); // Jack
alert(user.isAdmin); // false
```

Quando uma função é executada através de `new`, ela segue os seguintes passos:

1. Um novo objeto é criado e atribuído ao `this`.
2. O corpo da função é executado. Normalmente, ele modifica o `this`, adicionando novas propriedades.
3. O valor de `this` é retornado.

Em outras palavras, `new User(...)` faz algo parecido com:

```js
function User(name) {
*!*
  // this = {};  (implicitamente)
*/!*

  // adiciona propriedades ao this
  this.name = name;
  this.isAdmin = false;

*!*
  // return this;  (implicitamente)
*/!*
}
```

Então, `let user = new User("Jack")` resulta no mesmo que:

```js
let user = {
  name: "Jack",
  isAdmin: false (falso)
};
```

Agora se queremos criar outros usuários, podemos chamar `new User("Ann")`, `new User("Alice")` e assim por diante. Muito mais curto do que usar objetos literais toda vez, e também mais fácil de ler.

Este é o principal propósito dos construtores -- implementar códigos de criação de objetos reutilizáveis.

Note mais uma vez -- tecnicamente, qualquer função (com exceção das arrow functions, já que elas não possuem o `this`) pode ser usada como um construtor. Pode ser chamada com `new`, e irá executar o algoritmo acima. A "primeira letra maiúscula" é um acordo comum, para deixar claro que uma função é para ser executada com `new`.

````smart header="new function() { ... }"
Se tivermos várias linhas de código voltadas para a criação de um único objeto complexo, nós podemos embrulhá-las em uma função construtora, como:

```js
// cria uma função e imediatamente a chama com new
let user = new function() {
  this.name = "John";
  this.isAdmin = false;

  // ...outro código para criação de usuário
  // possivelmente lógica complexa e declarações
  // variáveis locais etc
};
```
Esse construtor não pode ser chamado novamente porque ele não está salvo em nenhum lugar, apenas foi criado e chamado. Então, esse truque visa encapsular o código que constrói o único objeto, sem reutilização futura.
````

## Teste para o modo construtor: new.target

```smart header="Material avançado"
A sintaxe desta seção é raramente usada, pule a menos que você queira saber sobre tudo. 
```

Dentro de uma função, nós podemos checar se ela foi chamada com `new` ou sem ele, usando a propriedade especial `new.target`.

Ela é vazia para chamadas regulares e igual à função se esta foi chamada com ``new`:
```js run
function User() {
  alert(new.target);
}

// sem "new":
*!*
User(); // undefined
*/!*

// com "new":
*!*
new User(); // function User { ... }
*/!*
```

Isto pode ser usado dentro da função para saber se ela foi chamada através do `new`, "em modo construtor", ou sem ele, "em modo comum" .

Nós também podemos fazer com que ambos, `new` e chamadas comuns, se comportem da mesma maneira, assim:

```js run
function User(name) {
  if (!new.target) { // se você me executar sem new
    return new User(name); // ...eu irei adicioná-lo para você
  }

  this.name = name;
}

let john = User("John"); // redireciona a chamada para new User
alert(john.name); // John
```

Essa abordagem é utilizada algumas vezes em bibliotecas para deixar a sintaxe mais flexível. Para que as pessoas possam chamar as funções com ou sem `new`, e ela ainda sim, funcionará.

Porém, provavelmente não é boa para usar em qualquer lugar, pois omitir `new` faz ficar um pouco menos óbvio o que está acontecendo. Com `new` todos sabemos que o novo objeto está sendo criado.

## Return dentro de construtores

Geralmente, construtores não têm uma declaração `return`. A tarefa deles é escrever todas as coisas dentro do `this`, e ele automaticamente se torna no resultado.

Mas se existir uma declaração `return`, então a regra é simples:

- Se `return` é chamado com um objeto, então ele é retornado ao invés de `this`.
- Se `return` é chamado com um primitivo, ele é ignorado.

Em outras palavras, `return` com um objeto retorna o objeto, em todos os outros casos, o `this` é retornado.

Por exemplo, aqui, `return` sobrepõe o `this` retornando um objeto:

```js run
function BigUser() {

  this.name = "John";

  return { name: "Godzilla" };  // <-- retorna esse objeto
}

alert( new BigUser().name );  // Godzilla, pegou aquele objeto
```

E aqui está um exemplo com um `return` vazio (ou poderíamos colocar um primitivo depois dele, não importa):

```js run
function SmallUser() {

  this.name = "John";

  return; // <-- retorna this
}

alert( new SmallUser().name );  // John
```

Geralmente os construtores não têm uma declaração `return`. Aqui, nós mencionamos o comportamento especial com objetos retornados principalmente por uma questão de integralidade.

````smart header="Omitindo parênteses"
A propósito, nós podemos omitir os parênteses depois de `new`:

```js
let user = new User; // <-- sem parênteses
// igual a
let user = new User();
```

Omitir os parênteses aqui não é considerada uma boa prática, mas a sintaxe é permitida pela especificação.
````

## Métodos no construtor

Usar funções construtoras para criar objetos nos dá bastante flexibilidade. A função construtora pode ter parâmetros que definam como construir o objeto, e o que colocar dentro dele.

Claro, nós podemos adicionar ao `this` não apenas propriedades, mas métodos também.

Por exemplo, `new User(name)` abaixo, cria um objeto com o dado `name` e o método `sayHi`:

```js run
function User(name) {
  this.name = name;

  this.sayHi = function() {
    alert( "Meu nome é: " + this.name );
  };
}

*!*
let john = new User("John");

john.sayHi(); // Meu nome é: John
*/!*

/*
john = {
   name: "John",
   sayHi: function() { ... }
}
*/
```

Para criar objetos complexos, existe uma sintaxe mais avançada, [classes](info:classes), que nós iremos abordar mais para frente.

## Sumário

- Funções construtoras ou, resumidamente, construtores, são funções comuns, mas existe um acordo comum para nomeá-las com a primeira letra em maiúsculas.
- Funções construtoras deveriam ser chamadas apenas usando `new`. Tal chamada implica a criação de um `this` vazio no começo e o retornando completo ao final.

Nós podemos usar funções construtoras para fazer diversos objetos iguais.

JavaScript fornece funções construtoras para muitos objetos internos da linguagem: como `Date` para datas, `Set` para conjuntos e outros que nós planejamos estudar.

```smart header="Objetos, nós voltaremos!"
Nesse capítulo nós cobrimos apenas o básico sobre objetos e construtores. Eles são essenciais para aprender mais sobre tipos de dados e funções nos próximos capítulos.

Depois que aprendermos isso, nós voltamos para os objetos e os cobrimos a fundo nos capítulos <info:prototypes> e <info:classes>.
```
