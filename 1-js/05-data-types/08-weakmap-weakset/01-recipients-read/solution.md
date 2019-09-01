Vamos guardar mensagens lidas em um `WeakSet`:

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

Ele se limpa automaticamente. A desvantagem é que não podemos interar sobre ele, não podemos receber "todas as mensagens lidas" diretamente dele. Mas podemos fazer isso iterando todas as mensagens e filtrando as que estão no conjunto.

Uma outra solução diferente pode ser adicionar uma propriedade como `message.isRead=true` a uma mensagem após ser lida. Como os objetos de mensagens são gerenciados por outro código, isso geralmente é desencorajado, mas podemos usar uma propriedade simbólica para evitar conflitos.

Como isso:
```js
// a propriedade simbólica é conhecida apenas pelo nosso código
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

Agora, o código de terceiros provavelmente não verá nossa propriedade extra.

Embora os símbolos permitam diminuir a probabilidade de problemas, o uso de `WeakSet` é melhor do ponto de vista arquitetural.