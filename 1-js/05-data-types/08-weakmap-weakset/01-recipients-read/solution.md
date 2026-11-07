Vamos guardar as mensagens lidas em um `WeakSet`:

```js run
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

let readMessages = new WeakSet();

// duas mensagens foram lidas
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// readMessages tem 2 elementos

// ...vamos ler a primeira mensagem de novo!
readMessages.add(messages[0]);
// readMessages ainda tem 2 elementos únicos

// resposta: a message[0] foi lida?
alert("Mensagem 0 lida: " + readMessages.has(messages[0])); // true

messages.shift();
// agora readMessages tem 1 elemento (tecnicamente a memória pode ser limpa depois)
```

O `WeakSet` nos permite guardar um conjunto de mensagens e verificar facilmente se uma mensagem existe nele.

Ele se limpa automaticamente. A desvantagem é que não podemos iterar sobre ele, nem obter "todas as mensagens lidas" diretamente. Mas conseguimos fazer isso iterando sobre todas as mensagens e filtrando as que estão no `WeakSet`.

Outra solução, diferente, seria adicionar uma propriedade como `message.isRead=true` a uma mensagem depois que ela for lida. Como os objetos de mensagem são gerenciados por outro código, isso geralmente é desaconselhado, mas podemos usar uma propriedade simbólica para evitar conflitos.

Assim:
```js
// a propriedade simbólica só é conhecida pelo nosso código
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

Agora, o código de terceiros provavelmente não vai ver nossa propriedade extra.

Embora símbolos reduzam a probabilidade de problemas, usar `WeakSet` é melhor do ponto de vista arquitetural.
