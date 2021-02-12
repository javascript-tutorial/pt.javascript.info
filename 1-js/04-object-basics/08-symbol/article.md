
# O tipo Symbol

Segundo a especificação, as chaves das propriedades dos objetos podem ser quer do tipo *string* como do tipo *symbol*. Não números, nem booleanos, mas apenas *strings* ou *symbols* (símbolos), estes dois tipos.

Até agora, apenas utilizámos *strings*. Então, vamos ver os benefícios que *symbols* nos podem dar.

## Símbolos

Um "símbolo" representa um identificador único .

Um valor deste tipo pode ser criado usando `Symbol()`:

```js
// 'id' é um novo símbolo
let id = Symbol();
```

Quando o criamos, podemos dar ao símbolo uma descrição (também chamada de nome do símbolo), sendo ela mais útil para propósitos de *debugging* (depuração de erros):

```js run
// 'id' é um símbolo com a descrição "id"
let id = Symbol("id");
```

Símbolos têm a garantia de serem únicos. Mesmo que criemos muitos símbolos com a mesma descrição, eles são valores diferentes. A descrição é apenas um rótulo, não afeta nada.

Por exemplo, aqui estão dois símbolos com a mesma descrição -- eles não são iguais:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false (falso)
*/!*
```

Se você tiver familiaridade com Ruby, ou outra linguagem que também tenha alguma espécie de "símbolos" -- por favor, não se confunda. Os símbolos em JavaScript,  são diferentes.

````warn header="Símbolos não são auto-convertidos para strings"
A maior parte dos valores em JavaScript suporta conversão implícita para *string*. Por exemplo, podemos usar `alert` com quase qualquer valor, e irá funcionar. Símbolos são especiais. Eles não são automaticamente convertidos.

Por exemplo, este `alert` irá mostrar um erro:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string (ErroDeTipo: Não é possível converter um valor 'Symbol' para uma 'string')
*/!*
```

Esta é uma "salvaguarda na linguagem" contra tal mistura, porque *strings* e *symbols* são fundamentalmente diferentes, e não deveriam ser acidentalmente convertidos de um tipo para o outro.

Se realmente quisermos exibir um *symbol*, teremos que explicitamente invocar `.toString()` sobre ele, como aqui:
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // 'Symbol(id)', agora funciona
*/!*
```

Ou usar a propriedade `symbol.description` para mostrar apenas a sua descrição:
```js run
let id = Symbol("id");
*!*
alert(id.description); // 'id'
*/!*
```

````

## Propriedades "Ocultas"

Símbolos nos permitem criar propriedades "ocultas" num objeto, que nenhuma outra parte do código possa acidentalmente aceder ou alterar.

Por exemplo, se estivermos a trabalhar com um objeto `user`, que pertença a um código de terceiros, e quisermos adicionar identificadores a ele.

Vamos utilizar uma chave *symbol* para isso:

```js run
let user = { // pertence a outro código
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] ); // podemos aceder aos dados usando o 'symbol' como chave (key)
```

Qual o benefício de se usar `Symbol("id")` sobre uma *string* `"id"`?

Como o objeto `user` pertence a outro código, e aquele código funciona bem com ele, não deveríamos sómente adicionar quaisquer propriedades a ele. Isso não é seguro. Mas, um símbolo não pode ser acedido acidentalmente, o código de terceiros provavelmente nem o irá ver, então talvez seja a coisa certa a fazer.

De igual modo, imagine ainda que um outro programa (*script*) quer ter o seu próprio identificador dentro de `user`, para seus próprios fins. Isto pode estar noutra biblioteca (*library*) de JavaScript, por isso estes *scripts* podem não ter nenhum conhecimento um do outro.

Então, aquele programa pode criar o seu próprio `Symbol("id")`, desta forma:

```js
// ...
let id = Symbol("id");

user[id] = "O valor 'id' dos outros";
```

Não haverá conflito entre o nosso identificador e o dos outros, porque símbolos são sempre diferentes, mesmo que tenham o mesmo nome.

...Mas, se tivéssemos usado uma *string* `"id"` em vez de um *symbol* para o mesmo propósito, então *haveria* um conflito:

```js
let user = { name: "John" };

// O nosso script utiliza uma propriedade "id"
user.id = "O nosso valor 'id'";

// ...Um outro script também quer "id" para os seus fins...

user.id = "O valor 'id' dos outros"
// Boom! Alterado pelo outro script!
```

### Símbolos num objeto literal

Se quisermos utilizar um *symbol* num objeto literal `{...}`, precisamos de parênteses retos à sua volta.

Desta forma:

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
  [id]: 123 // não "id": 123
*/!*
};
```
Isto, porque precisamos do valor que está na variável `id` como chave, não da *string* "id".

### Símbolos são saltados num *for..in*

Propriedades simbólicas não são consideradas num laço (*loop*) `for..in`.

Por exemplo:

```js run
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

*!*
for (let key in user) alert(key); // 'name', 'age' (nenhum símbolo)
*/!*

// o acesso direto por meio do símbolo funciona
alert( "Direct: " + user[id] );
```

`Object.keys(user)` também os ignora. Isto, faz parte do conceito geral de "ocultação de propriedades simbólicas". Se, um outro programa ou uma biblioteca percorrer o nosso objeto com um ciclo (*loop*), não irá inadvertidamente aceder a uma propriedade simbólica.

Em contraste, [Object.assign](mdn:js/Object/assign) copia ambas as propriedades *string* e *symbol*:

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

Não existe nenhum paradoxo aqui. Assim está concebido. A ideia é que ao clonar um objeto ou fundir (*merge*) objetos, geralmente queremos *todas* as propriedades copiadas (incluindo símbolos como `id`).

## Símbolos globais

Como nós vimos, geralmente todos os *symbols* são diferentes, mesmo que tenham o mesmo nome. Mas, por vezes queremos que *symbols* com o mesmo nome sejam a mesma entidade. Por exemplo, diferentes partes da nossa aplicação querem aceder ao *symbol* `"id"`, sendo este exatamente a mesma propriedade.

Para alcançar isto, existe um  *registo global de símbolos* (*global symbol registry*). Nós podemos criar *symbols* nele e os aceder mais tarde, e ele garante que acessos repetidos ao mesmo nome retornem exatamente o mesmo *symbol*.

Para ler (criar, se ausente) um *symbol* do registo, use `Symbol.for(key)`.

Esta chamada verifica o registo global, e se houver um *symbol* descrito como `key`, ele o retorna, senão cria um novo *symbol* com `Symbol(key)` e o armazena no registo sob a chave `key`.

Por exemplo:

```js run
// lê a partir do registo global
let id = Symbol.for("id"); // se o símbolo não existir, ele é criado

// volta a ler (talvez a partir de outra secção no código)
let idAgain = Symbol.for("id");

// é o mesmo símbolo
alert( id === idAgain ); // true (verdadeiro)
```

Símbolos dentro do registo são chamados de *símbolos globais* (*global symbols*). Quando queremos um *symbol* para toda a aplicação, acessível em qualquer lugar no código -- é para isso que eles servem.

```smart header="Isso parece Ruby"
Em algumas linguagens de programação, como Ruby, existe um único *symbol* por nome.

Em JavaScript, como podemos ver, esses são os símbolos globais.
```

### Symbol.keyFor

Para símbolos globais, não apenas `Symbol.for(key)` retorna um *symbol* por nome, mas existe uma chamada inversa: `Symbol.keyFor(sym)`, que faz ao contrário - retorna o nome de um símbolo global.

Por exemplo:

```js run
// obtenha o símbolo a partir do nome
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// obtenha o nome a partir do 'symbol'
alert( Symbol.keyFor(sym) ); // 'name'
alert( Symbol.keyFor(sym2) ); // 'id'
```

O `Symbol.keyFor` utiliza internamente o registo global de símbolos para procurar pela chave do símbolo. Por isso, não funciona para símbolos não globais. Se o símbolo não for global, não será capaz de o encontrar e retorna `undefined`.

Deste modo, todos os símbolos têm uma propriedade `description`.

Por exemplo:

```js run
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // 'name', símbolo global
alert( Symbol.keyFor(localSymbol) ); // 'undefined', não global

alert( localSymbol.description ); // 'name'
```

## Símbolos do sistema

Existem muitos símbolos do "sistema" que o JavaScript usa internamente, e nós os podemos utilizar para afinar vários aspetos dos nossos objetos.

Eles vêm listados na especificação, na tabela [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols):

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ... e assim por diante.

Por exemplo, `Symbol.toPrimitive` nos permite descrever a conversão objeto-para-primitivo. Iremos ver o seu uso muito em breve.

Outros *symbols* também se irão tornar familiares quando estudarmos as funcionalidades correspondentes na linguagem.

## Resumo

`Symbol`, é um tipo primitivo para identificadores únicos.

Símbolos são criados pela chamada a `Symbol()`, com uma descrição (nome) opcional.

Símbolos são sempre valores diferentes, mesmo que tenham o mesmo nome. Se quisermos que símbolos com o mesmo nome sejam iguais, teremos de utilizar o registo global: `Symbol.for(key)` retorna (cria, se necessário) um símbolo global com `key` como nome. Múltiplas chamadas a `Symbol.for` com a mesma `key` retornam exatamente o mesmo símbolo.

Símbolos têm dois principais casos práticos:

1. "Ocultação" de propriedades de objetos.
    Se quisermos adicionar uma propriedade a um objeto, "pertencendo" este a outro programa ou biblioteca, podemos criar um símbolo e o usar como a chave dessa propriedade. Uma propriedade simbólica não aparece num `for..in`, por isso não será acidentalmente processada juntamente com outras  propriedades. Também, não será acedida diretamente, porque um outro programa não terá o nosso símbolo. Assim, a propriedade estará protegida contra uso ou alteração acidentais.

    Assim, nós podemos "secretamente" esconder nos objetos algo que precisamos, mas que outros não devam ver, empregando propriedades simbólicas.

2. Existem muitos símbolos do sistema usados pelo JavaScript que podem ser acedidos com `Symbol.*`. Podemos os utilizar para alterar alguns comportamentos pré-definidos (*built-in*). Por exemplo, mais adiante no tutorial iremos usar `Symbol.iterator` para [iterables](info:iterable) (iteráveis), `Symbol.toPrimitive` para configurar a [object-to-primitive conversion](info:object-toprimitive) (conversão objeto-para-primitivo), e assim por diante.

Tecnicamente, símbolos não são 100% ocultados. Existe um método incorporado (*built-in*) [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) que nos permite obter todos os símbolos. Também, existe um método chamado [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) que retorna *todas* as chaves de um objeto, incluindo as simbólicas. Assim, eles não estão realmente ocultos. Mas, muitas bibliotecas, assim como métodos e construções sintáticas incorporados não usam esses métodos.
