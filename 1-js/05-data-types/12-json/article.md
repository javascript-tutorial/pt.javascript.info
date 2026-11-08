# Métodos JSON, toJSON

Vamos supor que temos um objeto complexo e gostaríamos de convertê-lo em uma string, para enviá-la pela rede, ou simplesmente para gerar um log.

Naturalmente, essa string deve incluir todas as propriedades importantes.

Poderíamos implementar essa conversão assim:

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

...Mas, no processo de desenvolvimento, novas propriedades são adicionadas, propriedades antigas são renomeadas e removidas. Atualizar esse `toString` toda vez pode se tornar bem chato. Poderíamos tentar percorrer as propriedades dentro dele, mas e se o objeto for complexo e tiver objetos aninhados em suas propriedades? Precisaríamos implementar a conversão deles também.

Felizmente, não é preciso escrever código para lidar com tudo isso. A tarefa já foi resolvida.

## JSON.stringify

O [JSON](https://pt.wikipedia.org/wiki/JSON) (JavaScript Object Notation, ou "Notação de Objetos JavaScript") é um formato geral para representar valores e objetos. Ele é descrito no padrão [RFC 4627](https://tools.ietf.org/html/rfc4627). Inicialmente foi criado para o JavaScript, mas muitas outras linguagens também têm bibliotecas para lidar com ele. Então é fácil usar JSON para troca de dados quando o cliente usa JavaScript e o servidor é escrito em Ruby/PHP/Java/o que for.

O JavaScript fornece os métodos:

- `JSON.stringify` para converter objetos em JSON.
- `JSON.parse` para converter JSON de volta em um objeto.

Por exemplo, aqui usamos `JSON.stringify` em um estudante:
```js run
let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  spouse: null
};

*!*
let json = JSON.stringify(student);
*/!*

alert(typeof json); // temos uma string!

alert(json);
*!*
/* objeto codificado em JSON:
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "spouse": null
}
*/
*/!*
```

O método `JSON.stringify(student)` pega o objeto e o converte em uma string.

A string `json` resultante é chamada de objeto *codificado em JSON*, *serializado*, *transformado em string* ou *empacotado* (*marshalled*). Estamos prontos para enviá-la pela rede ou colocá-la em um armazenamento de dados simples.


Observe que um objeto codificado em JSON tem várias diferenças importantes em relação ao objeto literal:

- Strings usam aspas duplas. Não há aspas simples ou crases no JSON. Então `'John'` vira `"John"`.
- Os nomes das propriedades do objeto também são colocados entre aspas duplas. Isso é obrigatório. Então `age:30` vira `"age":30`.

`JSON.stringify` também pode ser aplicado a primitivos.

O JSON suporta os seguintes tipos de dados:

- Objetos `{ ... }`
- Arrays `[ ... ]`
- Primitivos:
    - strings,
    - números,
    - valores booleanos `true`/`false`,
    - `null`.

Por exemplo:

```js run
// um número em JSON é só um número
alert( JSON.stringify(1) ) // 1

// uma string em JSON continua sendo uma string, mas entre aspas duplas
alert( JSON.stringify('test') ) // "test"

alert( JSON.stringify(true) ); // true

alert( JSON.stringify([1, 2, 3]) ); // [1,2,3]
```

JSON é uma especificação independente de linguagem e voltada só para dados, então algumas propriedades específicas de objetos do JavaScript são ignoradas pelo `JSON.stringify`.

São elas:

- Propriedades que são funções (métodos).
- Chaves e valores simbólicos.
- Propriedades que armazenam `undefined`.

```js run
let user = {
  sayHi() { // ignorado
    alert("Hello");
  },
  [Symbol("id")]: 123, // ignorado
  something: undefined // ignorado
};

alert( JSON.stringify(user) ); // {} (objeto vazio)
```

Normalmente isso não é problema. Se não for o que queremos, logo veremos como personalizar esse processo.

O melhor é que objetos aninhados são suportados e convertidos automaticamente.

Por exemplo:

```js run
let meetup = {
  title: "Conference",
*!*
  room: {
    number: 23,
    participants: ["john", "ann"]
  }
*/!*
};

alert( JSON.stringify(meetup) );
/* Toda a estrutura é transformada em string:
{
  "title":"Conference",
  "room":{"number":23,"participants":["john","ann"]},
}
*/
```

A limitação importante: não pode haver referências circulares.

Por exemplo:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: ["john", "ann"]
};

meetup.place = room;       // meetup referencia room
room.occupiedBy = meetup; // room referencia meetup

*!*
JSON.stringify(meetup); // Error: Converting circular structure to JSON
*/!*
```

Aqui, a conversão falha por causa da referência circular: `room.occupiedBy` referencia `meetup`, e `meetup.place` referencia `room`:

![](json-meetup.svg)


## Excluindo e transformando: replacer

A sintaxe completa do `JSON.stringify` é:

```js
let json = JSON.stringify(value[, replacer, space])
```

value
: Um valor para codificar.

replacer
: Array de propriedades para codificar ou uma função de mapeamento `function(key, value)`.

space
: Quantidade de espaço a ser usada na formatação

Na maioria das vezes, `JSON.stringify` é usado apenas com o primeiro argumento. Mas se precisarmos ajustar o processo de substituição com mais precisão, como filtrar referências circulares, podemos usar o segundo argumento de `JSON.stringify`.

Se passarmos um array de propriedades para ele, somente essas propriedades serão codificadas.

Por exemplo:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup referencia room
};

room.occupiedBy = meetup; // room referencia meetup

alert( JSON.stringify(meetup, *!*['title', 'participants']*/!*) );
// {"title":"Conference","participants":[{},{}]}
```

Aqui estamos sendo rígidos demais, provavelmente. A lista de propriedades é aplicada a toda a estrutura do objeto. Então os objetos dentro de `participants` ficam vazios, porque `name` não está na lista.

Vamos incluir na lista toda propriedade, exceto `room.occupiedBy`, que causaria a referência circular:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup referencia room
};

room.occupiedBy = meetup; // room referencia meetup

alert( JSON.stringify(meetup, *!*['title', 'participants', 'place', 'name', 'number']*/!*) );
/*
{
  "title":"Conference",
  "participants":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```

Agora tudo, exceto `occupiedBy`, é serializado. Mas a lista de propriedades é bem longa.

Felizmente, podemos usar uma função em vez de um array como `replacer`.

A função será chamada para cada par `(key, value)` e deve retornar o valor "substituído", que será usado no lugar do valor original. Ou `undefined` se o valor deve ser ignorado.

No nosso caso, podemos retornar `value` "como está" para tudo, exceto `occupiedBy`. Para ignorar `occupiedBy`, o código abaixo retorna `undefined`:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup referencia room
};

room.occupiedBy = meetup; // room referencia meetup

alert( JSON.stringify(meetup, function replacer(key, value) {
  alert(`${key}: ${value}`);
  return (key == 'occupiedBy') ? undefined : value;
}));

/* pares key:value que chegam ao replacer:
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
occupiedBy: [object Object]
*/
```

Observe que a função `replacer` recebe cada par chave/valor, incluindo objetos aninhados e itens de array. Ela é aplicada recursivamente. O valor de `this` dentro do `replacer` é o objeto que contém a propriedade atual.

A primeira chamada é especial. Ela é feita usando um "objeto de encapsulamento" especial: `{"": meetup}`. Em outras palavras, o primeiro par `(key, value)` tem uma chave vazia, e o valor é o objeto alvo como um todo. É por isso que a primeira linha é `":[object Object]"` no exemplo acima.

A ideia é oferecer o máximo de poder possível ao `replacer`: ele tem a chance de analisar e substituir/ignorar até o objeto inteiro, se necessário.


## Formatação: space

O terceiro argumento de `JSON.stringify(value, replacer, space)` é o número de espaços a serem usados na formatação para facilitar a leitura.

Antes, todos os objetos transformados em string não tinham recuos nem espaços extras. Isso é bom se quisermos enviar um objeto pela rede. O argumento `space` é usado exclusivamente para uma saída mais agradável.

Aqui, `space = 2` diz ao JavaScript para mostrar objetos aninhados em várias linhas, com recuo de 2 espaços dentro de um objeto:

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
/* recuo de dois espaços:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

/* para JSON.stringify(user, null, 4) o resultado teria mais recuo:
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

O terceiro argumento também pode ser uma string. Nesse caso, a string é usada para o recuo em vez de um número de espaços.

O parâmetro `space` é usado exclusivamente para fins de log e para deixar a saída mais legível.

## "toJSON" personalizado

Assim como `toString` para conversão em string, um objeto pode fornecer o método `toJSON` para a conversão em JSON. O `JSON.stringify` o chama automaticamente, se disponível.

Por exemplo:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  date: new Date(Date.UTC(2017, 0, 1)),
  room
};

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "date":"2017-01-01T00:00:00.000Z",  // (1)
*/!*
    "room": {"number":23}               // (2)
  }
*/
```

Aqui podemos ver que `date` `(1)` virou uma string. Isso acontece porque todas as datas têm um método `toJSON` embutido que retorna esse tipo de string.

Agora vamos adicionar um `toJSON` personalizado para o nosso objeto `room` `(2)`:

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
  title: "Conference",
  room
};

*!*
alert( JSON.stringify(room) ); // 23
*/!*

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "room": 23
*/!*
  }
*/
```

Como podemos ver, `toJSON` é usado tanto na chamada direta `JSON.stringify(room)` quanto quando `room` está aninhado dentro de outro objeto codificado.


## JSON.parse

Para decodificar uma string JSON, precisamos de outro método chamado [JSON.parse](mdn:js/JSON/parse).

A sintaxe:
```js
let value = JSON.parse(str[, reviver]);
```

str
: String JSON para analisar.

reviver
: Função opcional `function(key,value)` que será chamada para cada par `(key, value)` e pode transformar o valor.

Por exemplo:

```js run
// array transformado em string
let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

alert( numbers[1] ); // 1
```

Ou para objetos aninhados:

```js run
let userData = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

let user = JSON.parse(userData);

alert( user.friends[1] ); // 1
```

O JSON pode ser tão complexo quanto necessário, objetos e arrays podem incluir outros objetos e arrays. Mas eles devem obedecer ao mesmo formato JSON.

Aqui estão erros comuns ao escrever JSON manualmente (às vezes precisamos escrevê-lo para fins de depuração):

```js
let json = `{
  *!*name*/!*: "John",                     // erro: nome da propriedade sem aspas
  "surname": *!*'Smith'*/!*,               // erro: aspas simples no valor (devem ser duplas)
  *!*'isAdmin'*/!*: false                  // erro: aspas simples na chave (devem ser duplas)
  "birthday": *!*new Date(2000, 2, 3)*/!*, // erro: não é permitido usar "new", apenas valores soltos
  "friends": [0,1,2,3]              // aqui está tudo certo
}`;
```

Além disso, JSON não suporta comentários. Adicionar um comentário ao JSON o torna inválido.

Existe outro formato chamado [JSON5](https://json5.org/), que permite chaves sem aspas, comentários etc. Mas essa é uma biblioteca independente, não faz parte da especificação da linguagem.

O JSON padrão é rigoroso assim não porque seus desenvolvedores são preguiçosos, mas para permitir implementações fáceis, confiáveis e muito rápidas do algoritmo de análise.

## Usando reviver

Imagine que recebemos do servidor um objeto `meetup` transformado em string.

Ele se parece com isto:

```js
// title: (título do meetup), date: (data do meetup)
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
```

...E agora precisamos *desserializá-lo*, para transformá-lo de volta em um objeto JavaScript.

Vamos fazer isso chamando `JSON.parse`:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str);

*!*
alert( meetup.date.getDate() ); // Erro!
*/!*
```

Opa! Um erro!

O valor de `meetup.date` é uma string, não um objeto `Date`. Como o `JSON.parse` saberia que deveria transformar essa string em um `Date`?

Vamos passar para o `JSON.parse` a função `reviver` como segundo argumento, que retorna todos os valores "como estão", mas `date` se tornará um `Date`:

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

A propósito, isso também funciona para objetos aninhados:

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
- JSON suporta objetos simples, arrays, strings, números, booleanos e `null`.
- O JavaScript fornece os métodos [JSON.stringify](mdn:js/JSON/stringify) para serializar em JSON e [JSON.parse](mdn:js/JSON/parse) para ler a partir do JSON.
- Ambos os métodos suportam funções transformadoras para leitura/escrita inteligente.
- Se um objeto tiver `toJSON`, ele será chamado pelo `JSON.stringify`.
