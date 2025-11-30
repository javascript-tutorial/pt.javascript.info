# O tipo Symbol

Por especificação, apenas dois tipos primitivos podem ser utilizados como chaves de propriedades de objetos:

- o tipo string, ou
- o tipo symbol.

Caso contrário, se for usado outro tipo, como o tipo number, ele é convertido automaticamente para string. Assim `obj[1]` é o mesmo que `obj["1"]`, e `obj[true]` é o mesmo que `obj["true"]`

Até agora, só temos utilizado strings.

Agora vamos explorar os symbols e ver o que eles podem fazer por nós.

## Symbols

Um "symbol" representa um identificador único.

Um valor desse tipo pode ser criado usando `Symbol()`:

```js
let id = Symbol();
```

Ao criá-los, podemos atribuir aos symbols uma descrição (também conhecida como nome do symbol), geralmente útil para fins de depuração:

```js
// id é um symbol com a descrição "id"
let id = Symbol("id");
```

Symbols são garantidos como únicos. Mesmo que criemos muitos symbols com exatamente a mesma descrição, eles são valores diferentes. A descrição é apenas um rótulo que não afeta nada.

Por exemplo, aqui estão dois symbols com a mesma descrição -- eles não são iguais:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

Se você estiver familiarizado com Ruby ou outra linguagem que também tenha algum tipo de "symbols", por favor, não se deixe confundir. Symbols no JavaScript são diferentes.

Então, para resumir, um symbol é um "valor primitivo único" com uma descrição opcional. Vamos ver onde podemos usá-los.

````warn header="Symbols não são automaticamente convertidos para uma string"
A maioria dos valores no JavaScript suporta conversão implícita para string. Por exemplo, podemos usar `alert` com quase qualquer valor, e isso funcionará. Symbols são especiais, pois não são convertidos automaticamente para uma string.

Por exemplo, esse `alert` vai mostrar um erro:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
*/!*
```

Isso serve como um "guardião da linguagem" contra confusões, uma vez que strings e symbols são fundamentalmente diferentes e não devem ser convertidos acidentalmente um no outro.

Se realmente queremos exibir um symbol, precisamos chamá-lo explicitamente com `.toString()`, como mostrado aqui:

```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), agora funciona
*/!*
```

Ou podemos obter a propriedade `symbol.description` para exibir apenas a descrição:

```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```

````

## Propriedades "Ocultas"

Symbols nos permitem criar propriedades "ocultas" de um objecto, as quais nenhuma outra parte do código pode acessar ou sobrescrever acidentalmente.

Por exemplo, se estivermos trabalhando com objetos `user` que pertencem a um código de terceiros, gostaríamos de adicionar identificadores a eles.

Vamos usar uma chave do tipo symbol para isso:

```js run
let user = {
  // pertence a outro código
  name: "John",
};

let id = Symbol("id");

user[id] = 1;

alert(user[id]); // podemos acessar os dados usando symbol como chave
```

Qual o benefício de usar `Symbol("id")` ao invés de uma string `"id"`?

Como os objetos `user` pertencem a outra base de código, não é seguro adicionar campos a eles, pois podemos afetar o comportamento pré-definido nessa outra base de código. No entanto, symbols não podem ser acessados acidentalmente. O código de terceiros não estará ciente da existência de symbols recém-definidos, portanto, é seguro adicionar symbols aos objetos `user`.

Além disso, imagine que outro script deseja ter seu próprio identificador dentro de `user`, para seus próprios propósitos.

Então esse script pode criar seu próprio `Symbol("id")`, dessa forma:

```js
// ...
let id = Symbol("id");

user[id] = "Their id value";
```

Não haverá conflito entre os nossos idenficadores e os deles, porque symbols são sempre diferentes, mesmo que tenham o mesmo nome.

...Porém se usarmos uma string `"id"` ao invés de um symbol para o mesmo propósito, então _haverá_ um conflito:

```js
let user = { name: "John" };

// Nosso script usa a propriedade "id"
user.id = "Our id value";

// ...Outro script também quer usar a propriedade "id" para os seus fins...

user.id = "Their id value";
// Boom! Sobrescrito por outro script!
```

### Symbols em uma notação literal de objeto

Se quisermos usar um symbol em uma notação literal de objeto `{...}`, precisamos de colchetes ao redor dele.

Assim:

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
  [id]: 123 // não "id": 123
*/!*
};
```

Isso ocorre porque precisamos do valor da variavel `id` como chave, não a string "id".

### Symbols são ignorados pelo for..in

Propriedades simbólicas não participam do loop `for..in`.

Por exemplo:

```js run
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

*!*
for (let key in user) alert(key); // name, age (sem symbols)
*/!*

// o acesso direto por meio do symbol funciona
alert( "Direct: " + user[id] ); // Direct: 123
```

[Object.keys(user)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) também as ignora. Isso faz parte do princípio geral de "esconder propriedades simbólicas". Se outro script ou uma biblioteca percorrer o nosso objeto, não acessará inesperadamente uma propriedade simbólica.

Em contraste, [Object.assign](mdn:js/Object/assign) copia tanto as propriedades da string quanto as do symbol.

```js run
let id = Symbol("id");
let user = {
  [id]: 123,
};

let clone = Object.assign({}, user);

alert(clone[id]); // 123
```

Não existe paradoxo aqui. Isso foi projetado dessa forma. A ideia é que, ao clonar um objeto ou mesclar objetos, geralmente queremos que _todas_ as propriedade sejam copiadas (incluindo symbols como `id`).

## Symbols globais

Como vimos, normalmente, todos os symbols são diferentes, mesmo que tenham o mesmo nome. Porém, às vezes, queremos que symbols com o mesmo nome representem as mesmas entidades. Por exemplo, diferentes partes da nossa aplicação podem querer acessar o symbol `"id"`, significando exatamente a mesma propriedade.

Para alcançar isso, existe um _registro global de symbols_. Podemos criar symbols nele e acessá-los posteriormente, garantindo que acessos repetidos pelo mesmo nome retornem exatamente o mesmo symbol.

Para ler (ou criar se ausente) um symbol do registro, use `Symbol.for(chave)`.

Esta chamada verifica o registro global e, se existir um symbol descrito como `chave`, o retorna; caso contrário, cria um novo symbol `Symbol(chave)` e o armazena no registro com `chave` fornecida.

Por exemplo:

```js run
// lê do registro global
let id = Symbol.for("id"); // se o symbol não existir, ele é criado

// lê novamente (talvez de alguma outra parte do código)
let idAgain = Symbol.for("id");

// o mesmo symbol
alert(id === idAgain); // true
```

Symbols dentro do registro são chamados de _symbols globais_. Se quisermos um symbol de escopo global na aplicação, acessível em todos os lugares do código, é para isso que eles servem.

```smart header="Isso parece com Ruby"
Em algumas linguagens de programação, como no Ruby, há um único symbol por nome.

Em JavaScript, como podemos ver, isso é verdade para symbols globais.
```

### Symbol.keyFor

Nós vimos que, para symbols globais, `Symbol.for(chave)` retorna um symbol pelo nome. Para fazer o oposto -- retornar um nome pelo symbol global -- podemos usar: `Symbol.keyFor(sym)`:

Por exemplo:

```js run
// obtém o symbol pelo nome
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// obtém o nome pelo symbol
alert(Symbol.keyFor(sym)); // name
alert(Symbol.keyFor(sym2)); // id
```

O `Symbol.keyFor` utiliza internamente o registro global de symbols para procurar a chave associada ao symbol. Portanto, não funciona para symbols não globais. Se o symbol não for global, não será possível encontrá-lo, e a função retornará `undefined`

Dito isso, todos os symbols têm a propriedade `description`

Por exemplo:

```js run
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert(Symbol.keyFor(globalSymbol)); // name, symbol global
alert(Symbol.keyFor(localSymbol)); // undefined, não global

alert(localSymbol.description); // name
```

## Symbols do sistema

Existem muitos symbols "do sistema" (System symbols) que o JavaScript usa internamente, e podemos utilizá-los para ajustar vários aspectos dos nossos objetos.

Eles estão listados na especificação na tabela de [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols):

- `Symbol.hasInstance`:
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ...e assim por diante.

Por exemplo, `Symbol.toPrimitive` nos permite descrever a conversão de um objeto para um primitivo. Veremos seu uso muito em breve.

Outros symbols também se tornarão familiares à medida que estudarmos as características correspondentes da linguagem.

## Resumo

`Symbol` é um tipo primitivo para identificadores ínicos.

Symbols são criados com a chamada `Symbol()` com uma descrição opcional (nome).

Symbols são sempre valores diferentes, mesmo se tiverem o mesmo nome. Se desejamos que symbols com o mesmo nome sejam iguals, então devemos usar o registro global: `Symbol.for(chave)` retorna (cria, se necessário) um symbol global com `chave` como nome. Múltiplas chamadas de `Symbol.for` com a mesma `chave` return exatamente o mesmo symbol.

Symbols têm dois principais casos de uso:

1. Propriedades "ocultas" de objetos.

   Se desejamos adicionar uma propriedade a um objeto que "pertence" a outro script ou biblioteca, podemos criar um símbolo e usá-lo como chave de propriedade. Uma propriedade simbólica não aparece em for..in, portanto, não será processada acidentalmente junto com outras propriedades. Além disso, ela não será acessada diretamente, porque outro script não possui o nosso símbolo. Assim, a propriedade estará protegida contra uso ou sobrescrita acidental.

   Portanto, podemos "ocultar discretamente" algo em objetos que precisamos, mas que outros não devem ver, usando propriedades simbólicas.

2. Existem muitos símbolos do sistema usados pelo JavaScript que são acessíveis como `Symbol.*`. Podemos utilizá-los para alterar alguns comportamentos embutidos. Por exemplo, mais tarde no tutorial, utilizaremos `Symbol.iterator` para [iteráveis](info:iterable), `Symbol.toPrimitive` para configurar [conversão de objeto para primitivo](info:object-toprimitive) e assim por diante.

Tecnicamente, symbols nao são 100% ocultos. Existe um método embutido [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) que nos permite obter todos os symbols. Também há um método chamado [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) que retorna _todas_ as chaves de um objeto, incluindo as simbólicas. No entanto, a maioria das bibliotecas, funções embutidas e construções de syntaxe não utilizam esses métodos.
