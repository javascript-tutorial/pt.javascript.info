# JSON methods, toJSON

Digamos que temos um objeto complexo, e gostaríamos de converte-lo em uma string, para envia-lo pela rede, ou simplesmente exibi-lo para propositos de log.

Naturalmente, tal string deve incluir todas as propriedades importantes.

Podemos implementar a conversão dessa forma:

```js run
let user = {
  name: "John",
  age: 30,

*!*
  toString() {
    return `{name: "${this.name}", age: ${this.age}}`;
  }
*/!*
};

alert(user); // {name: "John", age: 30}
```

...Mas, no processo de desenvolvimento, novas propriedades são adicionadas, propriedades antigas são renomeadas e removidas. Atualizar `toString` toda hora pode se tornar doloroso. Podemos tentar passar pelas propriedades dele, mas e se o objeto for complexo e tiver  objetos aninhados em suas propriedades ? Precisaríamos implementar essas conversões também. E se formos mandar o objeto pela rede então também precisamos fornecer o código para "ler" nosso objeto no receptor.

Por sorte, não há necessidade de escrever o código para lidar com isso. A tarefa já foi resolvida.

## JSON.stringify

O [JSON](http://pt.wikipedia.org/wiki/JSON) (JavaScript Object Notation) é um formato geral para representar valores e objetos. É descrito no padrão [RFC 4627](http://tools.ietf.org/html/rfc4627). Inicialmente foi criado para Javascript, mas muitas outras linguagens tem bibliotecas para manipulação dele também. Portanto, é fácil usar JSON para troca de dados quando o cliente usa JavaScript e o servidor é escrito em Ruby/PHP/Java/Outro qualquer.

Javascript fornece os métodos:

- `JSON.stringify` para converter objetos em JSON.
- `JSON.parse` para converter JSON de volta em objeto.

Por exemplo, aqui nós `JSON.stringify` um estudante:
```js run
let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  wife: null
};

*!*
let json = JSON.stringify(student);
*/!*

alert(typeof json); // nós temos uma string!

alert(json);
*!*
/* objeto JSON-codificado:
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "wife": null
}
*/
*/!*
```

O método `JSON.stringify(student)` pega um objeto e converte ele em uma string.

A string resultante `json` é chamada de objeto *JSON-encoded* ou *serialized* ou *stringified* ou *marshalled*. Nós estamos prontos para enviá-la pela rede ou armazena-la em uma base de dados.


Por favor, repare que um objeto JSON-encoded tem algumas diferenças importantes com relação a um objeto literal:

- Strings usam aspas duplas. Não há aspas simples ou crases em JSON. Então `'John'` se torna `"John"`.
- Nomes de propriedades de objeto também são aspas duplas. Isso é obrigatório. Então `age:30` se torna `"age":30`.

`JSON.stringify` pode ser aplicado aos tipos primitivos também.

Os tipos nativamente suportados pelo JSON são:

- Objects `{ ... }`
- Arrays `[ ... ]`
- Primitivos:
    - strings,
    - numbers,
    - boolean valores `true/false`,
    - `null`.

Por exemplo:

```js run
// um número em JSON é apenas um número
alert( JSON.stringify(1) ) // 1

// uma string em JSON ainda é uma string, mas entre aspas duplas
alert( JSON.stringify('teste') ) // "teste"

alert( JSON.stringify(true) ); // true

alert( JSON.stringify([1, 2, 3]) ); // [1,2,3]
```

JSON é uma especificação multi linguagem apenas para dados, então algumas propriedades de objeto especificas do Javascript são puladas pelo `JSON.stringfy`.

Por exemplo:

- Propriedades do tipo função (métodos)
- Propriedades do tipo Symbol
- Propriedades que armazenam `undefined`

```js run
let user = {
  sayHi() { // ignorada
    alert("Olá");
  },
  [Symbol("id")]: 123, // ignorada
  something: undefined // ignorada
};

alert( JSON.stringify(user) ); // {} (objeto vazio)
```

Geralmente isso é suficiente. Se isso não é o que queremos, então em breve veremos como customizar o processo.

A boa notiícia é que objetos aninhados são suportados e convertidos automaticamente.

Por exemplo:

```js run
let meetup = {
  title: "Conferencia",
*!*
  room: {
    number: 23,
    participants: ["john", "ann"]
  }
*/!*
};

alert( JSON.stringify(meetup) );
/* A estrutura inteira é serializada:
{
  "title":"Conferencia",
  "room":{"number":23,"participants":["john","ann"]},
}
*/
```

Uma limitação importante: não pode haver referencias circulares.

Por exemplo:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conferencia",
  participants: ["john", "ann"]
};

meetup.place = room;       // meetup referencia room
room.occupiedBy = meetup; // room referencia meetup

*!*
JSON.stringify(meetup); // Erro: Conversão de estrutura circular para JSON
*/!*
```

Aqui, a coversão falha, por causa da referencia circular: `room.occupiedBy` referencia `meetup`, e `meetup.place` referencia `room`:

![](json-meetup.svg)


## Excluir e tranformar: replacer

A sintaxe completa de `JSON.stringify` é:

```js
let json = JSON.stringify(value[, replacer, space])
```

value
: Um valor para codificar.

replacer
: Lista de propriedades para codificar ou uma função de mapeamento `function(key, value)`.

space
: Quantidade de spacos a usar para formatação.

Na maioria das vezes, `JSON.stringify` é usado somente com o primeiro argumento. Mas, se precisarmos refinar o processo de substituição, como filtrar referencias circulares, podemos usar o segundo argumento de `JSON.stringify`.

Se passarmos um array de propriedades para a função, somente essas propriedades serão codificadas.

Por exemplo:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conferência",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup faz referencia a room
};

room.occupiedBy = meetup; // room faz referencia a meetup

alert( JSON.stringify(meetup, *!*['title', 'participants']*/!*) );
// {"title":"Conferência","participants":[{},{}]}
```

Aqui provavelmente estamos sendo restritos demais. A lista de propriedades é aplicada a toda estrutura do objeto. Então, participants está vazio porque `name` nao esta na lista.

Vamos incluir todas propriedades, exceto `room.occupiedBy`, que causaria a referencia circular:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conferência",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup faz referência a room
};

room.occupiedBy = meetup; // room faz referência a meetup

alert( JSON.stringify(meetup, *!*['title', 'participants', 'place', 'name', 'number']*/!*) );
/*
{
  "title":"Conferência",
  "participants":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```

Agora tudo, exceto `occupiedBy` é serializado. Mas a lista de propriedades está uma tanto longa.

Felizmente, podemos usar uma função ao invés de uma lista como o `replacer`.

A função será chamada para cada par `(key, value)` e deverá retornar o valor "substituido", o qual será usado no lugar do original.

Em nosso caso, podemos retornar `value` "tal e qual" para tudo exceto `occupiedBy`. Para ignorar `occupiedBy`, o código abaixo retorna `undefined`.

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conferência",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup faz referência a room
};

room.occupiedBy = meetup; // room faz referência a meetup

alert( JSON.stringify(meetup, function replacer(key, value) {
  alert(`${key}: ${value}`); // para ver o que replacer recebe
  return (key == 'occupiedBy') ? undefined : value;
}));

/* pares key:value que chegam para o replacer:
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
*/
```

Por favor, perceba que a função `replacer` recebe cada par chave/valor, incluindo objetos aninhados e ítens de listas. É aplicado recursivamente. O valor de `this` dentro de `replacer` o é o objeto que contém a propriedade atual.

A primeira chamada é especial. Ela é feita usando um "objeto manipulador": `{"": meetup}`. Em outras palavras, o primeiro par `(key, value)` tem uma chave vazia, e o valor é o objeto alvo como um todo. Por causa disso a primeira linha é `":[object Object]"` no exemplo acima.

A ideia é fornecer a `replacer` tanto poder quanto possível: tem uma chance de analisar e substituir/pular o objeto todo se necessário.


## Formatando: spacer

O terceiro argumento de `JSON.stringify(value, replacer, spaces)` é o número de espaços a usar para uma formatação bonita.

Anteriormente, todos os objetos serializados não tinham espaços extras de identação. Isso é bom se queremos enviar um objeto pela rede. O argumento `spacer` é usado exclusivamente para uma boa saida.

Aqui `spacer = 2` diz ao Javascript para mostrar objetos aninhados em multiplas linhas, com identação de 2 espaços dentro de um objeto:

```js run
let user = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true
  }
};

alert(JSON.stringify(user, null, 2));
/* identação com 2 espaços:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

/* para JSON.stringify(user, null, 4) o resultado seria mais identado:
{
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/
```

O parâmetro `spaces` é usado unicamente para propósitos de log e saida mais amigável.

## "toJSON" personalizado

Assim como `toString`para conversão para string, um objeto pode fornecer o método de conversão `toJSON`. `JSON.stringify` automaticamente chama ele se disponível.

Por exemplo:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conferência",
  date: new Date(Date.UTC(2017, 0, 1)),
  room
};

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conferência",
*!*
    "date":"2017-01-01T00:00:00.000Z",  // (1)
*/!*
    "room": {"number":23}               // (2)
  }
*/
```

Aqui podemos ver que `date` `(1)` se torna uma string. Isso porque todas as datas tem um metodo `toJSON` nativo, o qual retorna tal tipo de string.

Agora vamos adicionar um `toJSON` personalizado para nosso objeto `room` `(2)`

```js run
let room = {
  number: 23,
*!*
  toJSON() {
    return this.number;
  }
*/!*
};

let meetup = {
  title: "Conferência",
  room
};

*!*
alert( JSON.stringify(room) ); // 23
*/!*

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conferência",
*!*
    "room": 23
*/!*
  }
*/
```

Como podemos ver, `toJSON` é usado tanto para chamada direta `JSON.stringify(room)` quanto para objetos aninhados.


## JSON.parse

Para decodificar uma string JSON, precisamos de outro método chamado [JSON.parse](mdn:js/JSON/parse).

A sintaxe:
```js
let value = JSON.parse(str[, reviver]);
```

str
: String JSON a ser decodificada.

reviver
: Função opcional(chave, valor) que será chamada para cada par `(key, value)` e que pode transformar o valor.

Por exemplo:

```js run
// lista codificada
let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

alert( numbers[1] ); // 1
```

Ou para objetos aninhados:

```js run
let user = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

user = JSON.parse(user);

alert( user.friends[1] ); // 1
```

O JSON pode ser tão complexo quanto necessário. Objetos e listas podem incluir outros objetos e listas. Mas eles devem obedecer o formato.

Aqui estão erros típicos em JSON escritos a mão (às vezes precisamos escreve-los para propósitos de debug):

```js
let json = `{
  *!*name*/!*: "John",                     // erro: nome de propriedade sm aspas duplas
  "surname": *!*'Smith'*/!*,               // erro: aspa simples no valor (deve ser dupla)
  *!*'isAdmin'*/!*: false                  // erro: aspa simples na chave (deve ser dupla)
  "birthday": *!*new Date(2000, 2, 3)*/!*, // erro: "new" não é permitido, somente valores
  "friends": [0,1,2,3]                     // Aqui está correto
}`;
```

Além disso, JSON não suporta comentários. Adicionar um comentário ao JSON torna ele inválido.

Existe outro formato chamado [JSON5](http://json5.org/), o qual permite chaves sem aspas, comentários etc... Mas esta é uma biblioteca indepedente, não presente na especificação da linguagem.

O JSON padrão é assim restrito não porque seus desenvolvedores são preguiçosos, mas para permitir uma fácil, confiável e muito rápida implementação do algoritmo de codificação.

## Usando reviver

Imagine, nós recebemos um objeto `meetup` codificado do servidor.

Ele se parece com:

```js
// title: (meetup title), date: (meetup date)
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
```

...E agora pprecisamos *decodifica-lo*, para voltá-lo a um objeto Javascript.

Vamos fazer isso chamando `JSON.parse`:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str);

*!*
alert( meetup.date.getDate() ); // Error!
*/!*
```

Opa! Um erro!

O valor de `meetup.date` é uma string, não um objeto `Date`. Como `JSON.parse` poderia saber que ele deveria transformar essa string em um `Date`?

Vamos passar para `JSON.parse` a função `reviver` que retorna todos os valores iguais, mas `date` se tornará um `Date`:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

*!*
let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});
*/!*

alert( meetup.date.getDate() ); // agora funciona!
```

Aliás, isso funciona para objetos aninhados também:

```js run
let schedule = `{
  "meetups": [
    {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
    {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
  ]
}`;

schedule = JSON.parse(schedule, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

*!*
alert( schedule.meetups[1].date.getDate() ); // funciona!
*/!*
```



## Resumo

- JSON é um formato de dados que tem seu próprio padrão independente e bibliotecas para a maioria das linguagens de programação.
- JSON suporta objetos, listas, strings, números, lógicos e `null`.
- Javascript fornece métodos [JSON.stringify](mdn:js/JSON/stringify) para codificar em JSON  e [JSON.parse](mdn:js/JSON/parse) para ler a partir de JSON.
- Ambos métodos suportam funções de transformação para uma leitura/escrita mais inteligente.
- Se um objeto tem um método `toJSON`, então ele é chamado pelo `JSON.stringify`.
