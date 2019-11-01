
# O tipo Symbol

Segundo a especificação, as chaves das propriedades dos objetos podem ser quer do tipo *string* como do tipo *symbol*. Não números, não booleanos, apenas *strings* (cadeias-de-carateres) ou *symbols* (símbolos), estes dois tipos.

Até agora, vimos apenas utilizando *strings*. Então, vejamos os benefícios que *symbols* nos dão.

## Símbolos

Um "símbolo" representa um único identicador.

Um valor deste tipo, pode ser criado utilizando `Symbol()`:

```js
// 'id' é um novo símbolo
let id = Symbol();
```

Podemos também dar ao símbolo uma descrição (igualmente chamada de nome do símbolo), sendo mais útil para fins de *debugging* (depuração de erros):

```js run
// 'id' é um símbolo com a descrição "id"
let id = Symbol("id");
```

Símbolos têm a garantia de serem únicos. Mesmo que criemos muitos símbolos com a mesma descrição, eles são valores diferentes. A descrição apenas é um rótulo, sem efeito algum.

Por exemplo, aqui estão dois símbolos com a mesma descrição -- eles não são iguais:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false (falso)
*/!*
```

Se tiver familiaridade com Ruby ou outra linguagem que também empregue algum tipo de "símbolos" -- por favor, não se confunda. Símbolos em JavaScript são diferentes.

````warn header="Símbolos não são auto-convertidos para strings"
Muitos valores em JavaScript suportam conversão implícita para *string*. Por exemplo, podemos usar `alert` com quase qualquer valor, e funcionará. Símbolos são especiais. Não há auto-conversão.

Por exemplo, este `alert` exibirá um erro:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
           // TypeError: Não é possível converter um valor 'Symbol' para uma 'string'
*/!*
```

Existe uma "salvaguarda na linguagem" contra a mistura de ambos, porque *strings* e *symbols* são fundamentalmente diferentes, e não deveriam ser convertidos de um tipo para o outro ao acaso.

Se realmente quisermos exibir um *symbol*, temos que explicitamente invocar `.toString()` sobre ele, como aqui:
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // 'Symbol(id)', agora funciona
*/!*
```

Ou empregar a propriedade `symbol.description` para apenas mostrar a sua descrição:
```js run
let id = Symbol("id");
*!*
alert(id.description); // 'id'
*/!*
```

````

## Propriedades "Ocultas"

Símbolos permitem-nos criar propriedades "ocultas" para um objeto, que nenhuma outra parte do código as possa aceder ou alterar.

Por exemplo, se estivermos a trabalhar com objetos `user`, que pertençam a código de terceiros. E queremos de adicionar identicadores a eles.

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

Façamos um exemplo um pouco mais aprofundado para o vermos.

Imagine que um outro programa (*script*) quer a sua própria propriedade "id" dentro de `user`, para seus próprios fins. Isto pode estar noutra biblioteca (*library*) de JavaScript, por isso  os *scripts* podem não ter nenhum conhecimento um do outro.

Então, aquele programa pode criar o seu próprio `Symbol("id")`, desta forma:

```js
// ...
let id = Symbol("id");

user[id] = "O seu 'id' é válido";
```

Não haverá conflito, porque símbolos são sempre diferentes, mesmo que tenham o mesmo nome.

Agora, note que se tivéssemos empregue uma *string* `"id"` em vez de um *symbol* para o mesmo propósito, então *haveria* um conflito:

```js run
let user = { name: "John" };

// O nosso script utiliza uma propriedade "id"
user.id = "O nosso valor 'id'";

// ...Um outro script também quer "id" para os seus fins...

user.id = "O seu valor 'id'"
// Boom! Alterado pelo outro script!
```

### Símbolos num literal

Se quisermos utilizar um *symbol* num objeto literal, precisamos de parênteses retos.

Desta forma:

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
  [id]: 123 // não "id: 123"
*/!*
};
```

Isto, porque precisamos do valor que está na variável `id` como chave (*key*), não da *string* "id".

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

Isto, é uma parte do conceito geral de "ocultação". Se, um outro programa (*script*) ou uma biblioteca (*library*) percorrer o nosso objeto com um ciclo (*loop*), não irá inadvertidamente aceder a uma propriedade simbólica.

Em contraste, [Object.assign](mdn:js/Object/assign) copia ambas as propriedades *string* e *symbol*:

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

Não existe nenhum paradoxo aqui. Esse é o propósito. A ideia é que ao clonar ou fundir objetos, queremos geralmente *todas* as propriedades copiadas (incluindo símbolos como `id`).

````smart header="Chaves de propriedades de outros tipos são convertidas para strings"
Podemos apenas utilizar *strings* ou *symbols* como chaves em objetos. Outros tipos são forçados para *strings*.

Por exemplo, um número `0` torna-se numa *string* `"0"` quando usado como chave de uma propriedade:

```js run
let obj = {
  0: "test" // o mesmo que "0": "test"
};

// ambos os *alerts* acedem à mesma propriedade (o número 0 é convertido para a *string* "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (a mesma propriedade)
```
````

## Símbolos globais

Como vimos, geralmente todos os *symbols* são diferentes, mesmo que tenham o mesmo nome. Mas, por vezes queremos que *symbols* com o mesmo nome se refiram às mesmas entidades.

Por exemplo, diferentes partes na nossa aplicação pretendem aceder ao *symbol* `"id"`, significando este uma única mesma propriedade.

Para alcançar isso, existe um  *registo global de símbolos* (*global symbol registry*). Podemos criar *symbols* nele e acedê-los mais tarde, e ele garante que acessos repetidos ao mesmo nome retornem exatamente o mesmo *symbol*.

Para criar e ler um *symbol* do registo, use `Symbol.for(key)`.

Essa chamada verifica o registo global (*global registry*), e se houver um *symbol* descrito como `key`, ele o retorna, senão cria um novo *symbol* com `Symbol(key)` e o armazena no registo sob a chave `key`.

Por exemplo:

```js run
// lê a partir do registo global
let id = Symbol.for("id"); // se o símbolo não existir, ele o cria

// volta a ler
let idAgain = Symbol.for("id");

// é o mesmo símbolo
alert( id === idAgain ); // true (verdadeiro)
```

Símbolos dentro do registo são chamados de *símbolos globais* (*global symbols*). Quando quisermos um *symbol* para toda a aplicação, acessível em qualquer parte do código -- é para o que eles servem.

```smart header="Isto parece Ruby"
Em algumas linguagens de programação, como Ruby, existe um único *symbol* por nome.

Em JavaScript, como podemos ver, esses são símbolos globais.
```

### Symbol.keyFor

Para símbolos globais, não apenas `Symbol.for(key)` retorna um *symbol* por nome, mas existe uma chamada inversa: `Symbol.keyFor(sym)`, que faz ao contrário - retorna um nome de um símbolo global.

Por exemplo:

```js run
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// Obtenha o nome do 'symbol'
alert( Symbol.keyFor(sym) ); // 'name'
alert( Symbol.keyFor(sym2) ); // 'id'
```

O `Symbol.keyFor` utiliza internamente o registo global de símbolos para procurar pela chave do símbolo. Por isso, não funciona para símbolos não globais. Se o símbolo não for global, não será capaz de o encontrar e retorna `undefined`.

Por exemplo:

```js run
alert( Symbol.keyFor(Symbol.for("name")) ); // 'name', símbolo global

alert( Symbol.keyFor(Symbol("name2")) ); // undefined, o argumento não é um símbolo global
```

## Símbolos do sistema

Existem muitos símbolos do "sistema" que o JavaScript usa internamente, e os podemos utilizar para afinar vários aspetos dos nossos objetos.

Eles vêm listados na especificação, na tabela [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols):

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ... e assim por diante.

Por exemplo, `Symbol.toPrimitive` permite-nos descrever a conversão objeto-para-primitivo. Veremos o seu uso muito em breve.

Outros *symbols* também se tornarão familiares quando estudarmos as funcionalidades correspondentes na linguagem.

## Sumário

`Symbol`, é um tipo primitivo para identicadores únicos.

Símbolos são criados pela chamada a `Symbol()`, com uma descrição opcional.

Símbolos são sempre valores diferentes, mesmo que tenham o mesmo nome. Se quisermos que símbolos com o mesmo nome sejam iguais, teremos de utilizar o registo global: `Symbol.for(key)` retorna (cria, se necessário) um símbolo global com `key` como nome. Múltiplas chamadas a `Symbol.for` retornam exatamente o mesmo símbolo.

Símbolos têm dois principais casos práticos:

1. "Ocultação" de propriedades de objetos.

    Se quisermos adicionar uma propriedade a um objeto que "peetença" a outro programa ou biblioteca, podemos criar um símbolo e o utilizar como a chave da propriedade. Uma propriedade simbólica não aparece num `for..in`, por isso em certas ocasiões não será listada. Também, não será diretamente acedida porque outro programa não terá o nosso símbolo, e portanto não irá inadvertidamente intervir nas suas ações .

    Assim, podemos "secretamente" esconder em objetos algo que precisemos, e que outros não possam ver, empregando propriedades simbólicas.

2. Existem muitos símbolos de sistema usados por JavaScript que podem ser acedidos com `Symbol.*`. Podemos os utilizar para alterar alguns comportamentos padrão (*built-in*). Por exemplo, mais adiante no tutorial usaremos `Symbol.iterator` para [iterables](info:iterable) (iteráveis), `Symbol.toPrimitive` para configurar a [object-to-primitive conversion](info:object-toprimitive) (conversão objeto-para-primitivo), e assim por diante.

Tecnicamente, símbolos não são 100% ocultados. Existe um método incorporado (*built-in*) [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) que nos permite obter todos os  símbolos. Também, existe um método chamado [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) que retorna *todas* as chaves de um objeto, incluindo as simbólicas. Assim, eles não estão realmente ocultos. Mas muitas bibliotecas, métodos e construções sintáticas incorporados aderem ao comum acordo de que estão. E, quem invocar os métodos agora mencionados provavelmente compreende bem o que está a fazer.
