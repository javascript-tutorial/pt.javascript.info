A escolha sensata aqui é um `WeakSet`:

```js
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];

let readMessages = new WeakSet();

// two messages have been read
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// readMessages has 2 elements

// ...let's read the first message again!
readMessages.add(messages[0]);
// readMessages still has 2 unique elements

// answer: was the message[0] read?
alert("Read message 0: " + readMessages.has(messages[0])); // true

messages.shift();
// now readMessages has 1 element (technically memory may be cleaned later)
```

O `WeakSet` permite armazenar um conjunto de mensagens e verificar facilmente a existência de uma mensagem dentro dele.

Ele se limpa automaticamente. A desvantagem é que não podemos interar sobre ele. Não podemos receber "todas as mensagens lidas" diretamente. Mas podemos fazer isso iterando todas as mensagens e filtrando as que estão no conjunto.

P.S. Adicionar uma propriedade própria a cada mensagem pode ser perigoso se as mensagens forem gerenciadas pelo código de outra pessoa, mas podemos torná-la um símbolo para evitar conflitos.

Como isso:
```js
// a propriedade simbólica é conhecida apenas pelo nosso código
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

Agora, mesmo se o código de outra pessoa usar o loop for..in para as propriedades da mensagem, nosso sinalizador secreto não aparecerá.
