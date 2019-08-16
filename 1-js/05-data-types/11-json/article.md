# Métodos JSON, toJSON

Vamos supor que temos um objeto complexo e gostaríamos de convertê-lo em uma string, para enviá-lo por uma rede ou apenas exibi-lo para fins de registro.

Naturalmente, essa string deve incluir todas as propriedades importantes.

Poderíamos implementar a conversão assim:

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

...Mas no processo de desenvolvimento, novas propriedades são adicionadas, propriedades antigas são renomeadas e removidas. Atualizar tal `toString` toda vez pode se tornar uma dor. Poderíamos tentar fazer o loop de propriedades, mas e se o objeto for complexo e tiver objetos aninhados nas propriedades? Também precisaríamos implementar a conversão deles. E, se estamos enviando o objeto através de uma rede, também precisamos fornecer o código para "ler" nosso objeto no lado do recebimento.

Luckily, there's no need to write the code to handle all this. The task has been solved already.

## JSON.stringify

O [JSON](http://pt.wikipedia.org/wiki/JSON) (JavaScript Object Notation) é um formato geral para representar valores e objetos. É descrito como no padrão [RFC 4627](http://tools.ietf.org/html/rfc4627). Inicialmente, foi feito para JavaScript, mas muitas outras linguagens também têm bibliotecas para lidar com isso. Portanto, é fácil usar o JSON para troca de dados quando o cliente usa JavaScript e o servidor é escrito em Ruby/PHP/Java/Qualquer coisa.

JavaScript fornece métodos:

- `JSON.stringify` para converter objetos em JSON.
- `JSON.parse` para converter JSON de volta em um objeto.

Por exemplo, aqui nós usamos `JSON.stringify` em um objeto student:
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

alert(typeof json); // temos uma string!

alert(json);
*!*
/* JSON-encoded object:
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

O método `JSON.stringify(student)` pega o objeto e o converte em uma string.

A string `json` resultante é chamada de objeto *JSON-codificado* ou *serializado* ou *stringified* ou *marshalled*. Estamos prontos para enviá-lo pela rede ou colocá-lo em um armazenamento de dados simples.


Observe que um objeto codificado em JSON tem várias diferenças importantes em relação ao objeto literal:

- Strings usam aspas duplas. Não há citações ou acento agudo em JSON. Então `'John'` se torna `"John"`.
- Os nomes das propriedades dos objetos são entre aspas duplas também. Isso é obrigatório. Então `age:30` torna-se `"age":30`.

`JSON.stringify` também pode ser aplicado a primitivos.

Tipos JSON suportados nativamente são:

- Objects `{ ... }`
- Arrays `[ ... ]`
- Primitives:
    - strings,
    - numbers,
    - boolean values `true/false`,
    - `null`.

Por exemplo:

```js run
// um número em JSON é apenas um número
alert( JSON.stringify(1) ) // 1

// uma string em JSON ainda é uma string, mas está entre aspas duplas
alert( JSON.stringify('test') ) // "test"

alert( JSON.stringify(true) ); // true

alert( JSON.stringify([1, 2, 3]) ); // [1,2,3]
```

O JSON é uma especificação de linguagem cruzada somente de dados, portanto, algumas propriedades de objeto específicas do JavaScript são ignoradas pelo `JSON.stringify`.

Nomeadamente:

- Propriedades do tipo função (métodos).
- Propriedades simbólicas.
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

Normalmente tudo bem. Se isso não é o que queremos, então logo veremos como personalizar o processo.

O melhor é que os objetos aninhados são suportados e convertidos automaticamente.

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
/* Toda a estrutura é convertida para string:
{
  "title":"Conference",
  "room":{"number":23,"participants":["john","ann"]},
}
*/
```

A limitação importante: não deve haver referências circulares.

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
JSON.stringify(meetup); // Erro: Convertendo estrutura circuar para JSON
*/!*
```

Aqui, a conversão falha, devido à referência circular: `room.occupiedBy` referencia `meetup` e `meetup.place` faz referência a `room`:

![](json-meetup.png)


## Excluindo e transformando: replacer

A sintaxe completa de `JSON.stringify` é:

```js
let json = JSON.stringify(value[, replacer, space])
```

value
: Um valor para codificar.

replacer
: Array de propriedades para codificar ou uma função de mapeamento `function (key, value)`.

space
: Quantidade de espaço para usar para formatação

Na maior parte do tempo, `JSON.stringify` é usado apenas com o primeiro argumento. Mas se precisarmos ajustar o processo de substituição, como filtrar referências circulares, podemos usar o segundo argumento de `JSON.stringify`.

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

Aqui estamos provavelmente muito rigorosos. A lista de propriedades é aplicada a toda a estrutura do objeto. Então os participantes estão vazios, porque o `nome` não está na lista.

Vamos incluir todas as propriedades, exceto `room.occupiedBy`, que causaria a referência circular:

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

Agora tudo, exceto `occupiedBy`, é serializado. Mas a lista de propriedades é bastante longa.

Felizmente, podemos usar uma função em vez de um array como `replacer`.

A função será chamada para cada par `(chave, valor)` e deve retornar o valor "substituído", que será usado no lugar do valor original.

No nosso caso, podemos retornar `value` "como é" para tudo, exceto `occupiedBy`. Para ignorar `occupiedBy`, o código abaixo retorna `undefined`:

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
  alert(`${key}: ${value}`); // para ver o que o replacer recebe
  return (key == 'occupiedBy') ? undefined : value;
}));

/* pares chave:valor que chegam a replacer:
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

Por favor, note que a função `replacer` recebe todos os pares chave/valor incluindo objetos aninhados e itens de array. É aplicada recursivamente. O valor de `this` dentro de `replacer` é o objeto que contém a propriedade atual.

A primeira chamada é especial. É feito usando um "invólucro de objeto" especial: `{" ": meetup}`. Em outras palavras, o primeiro par `(chave, valor)` tem uma chave vazia, e o valor é o objeto alvo como um todo. É por isso que a primeira linha é `":[object Object]"` ​​no exemplo acima.

A idéia é fornecer o máximo possível de poder ao `replacer`: ele tem a chance de analisar e substituir/pular todo o objeto, se necessário.


## Formatação: spacer

O terceiro argumento de `JSON.stringify(value, replacer, spaces)` é o número de espaços a serem usados ​​para formatação.

Anteriormente, todos os objetos transformados em string não tinham recuos e espaços extras. Tudo bem se quisermos enviar um objeto através de uma rede. O argumento `spacer` é usado exclusivamente para um resultado bonito.

Aqui `spacer = 2` diz ao JavaScript para mostrar objetos aninhados em múltiplas linhas, com recuo de 2 espaços dentro de um objeto:

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
/* identação de dois espaços:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

/* para JSON.stringify(user, null, 4) o resultado seria mais indentado:
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

O parâmetro `spaces` é usado apenas para fins de registro e finalização.

## "toJSON" personalizado

Como `toString` para conversão de string, um objeto pode fornecer o método `toJSON` para a conversão para JSON. `JSON.stringify` chama automaticamente, se disponível.

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

Aqui podemos ver que `date` `(1) `se tornou uma string. Isso porque todas as datas têm um método `toJSON` embutido que retorna esse tipo de string.

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

Como podemos ver, `toJSON` é usado tanto para a chamada direta `JSON.stringify(room)` como para o objeto aninhado.


## JSON.parse

Para decodificar uma string JSON, precisamos de outro método chamado [JSON.parse](mdn:js/JSON/parse).

A sintaxe:
```js
let value = JSON.parse(str[, reviver]);
```

str
: String JSON para analisar.

reviver
: function(chave, valor) opicional que será chamada para cada par `(chave, valor)` e pode transformar o valor.

Por exemplo:

```js run
// array em formato de string
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

O JSON pode ser tão complexo quanto necessário, objetos e arrays podem incluir outros objetos e arrays. Mas eles devem obedecer ao formato.

Aqui estão os erros típicos no JSON escrito à mão (às vezes temos que escrevê-lo para fins de debug):

```js
let json = `{
  *!*name*/!*: "John",                     // erro: nome da propriedade sem aspas
  "surname": *!*'Smith'*/!*,               // erro: aspas simples em valor (deve ser duplo)
  *!*'isAdmin'*/!*: false                  // erro: aspas simples na chave (deve ser dupla)
  "birthday": *!*new Date(2000, 2, 3)*/!*, // erro: nenhum "novo" é permitido, apenas valores crus
  "friends": [0,1,2,3]              // aqui tudo certo
}`;
```

Além disso, o JSON não suporta comentários. Adicionar um comentário ao JSON torna-o inválido.

Existe outro formato chamado [JSON5](http://json5.org/), que permite chaves não comentadas, comentários, etc. Mas esta é uma biblioteca independente, não na especificação da linguagem.

O JSON normal é estrito não porque seus desenvolvedores sejam preguiçosos, mas para permitir implementações fáceis, confiáveis ​​e muito rápidas do algoritmo de análise.

## Usando o reviver

Imagine, nós temos um objeto convertido em string `meetup` do servidor.

Se parece com isso:

```js
// title: (título da meetup), date: (data da meetup)
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
```

...E agora precisamos *deserializar*, voltar para o objeto JavaScript.

Vamos fazer isso chamando `JSON.parse`:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str);

*!*
alert( meetup.date.getDate() ); // Erro!
*/!*
```

Ops! Um erro!

O valor de `meetup.date` é uma string, não um objeto `Date`. Como o `JSON.parse` sabia que deveria transformar aquela string em `Date`?

Vamos passar para `JSON.parse` a função de revivificação que retorna todos os valores "como estão", mas `date` se tornará um `Date`:

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

Aliás, isso também funciona para objetos aninhados:

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
alert( schedule.meetups[1].date.getDate() ); // works!
*/!*
```



## Resumo

- JSON é um formato de dados que possui seu próprio padrão independente e bibliotecas para a maioria das linguagens de programação.
- JSON suporta objetos simples, arrayss, strings, números, booleanos e `null`.
- JavaScript fornece métodos [JSON.stringify](mdn:js/JSON/stringify) para serializar para JSON e [JSON.parse](mdn:js/JSON/parse) para ler de JSON.
- Ambos os métodos suportam funções de transformador para leitura/escrita inteligentes.
- Se um objeto tem `toJSON`, então ele é chamado por `JSON.stringify`.
