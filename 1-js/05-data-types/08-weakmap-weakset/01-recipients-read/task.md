importance: 5

---

# Armazena sinalizadores "não lidos"

Existe um array de mensagens:

```js
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
```

Seu código pode acessá-lo, mas as mensagens são gerenciadas pelo código de outra pessoa. Novas mensagens são adicionadas, as antigas são removidas regularmente por esse código e você não sabe exatamente quando isso acontece.

Agora, qual estrutura de dados você poderia usar para armazenar informações se a mensagem "foi lida"? A estrutura deve ser adequada para dar a resposta "foi lida?" para o objeto de mensagem fornecido.

P.S. Quando uma mensagem é removida de `messages`, ela também deve desaparecer da sua estrutura.

P.P.S. Não devemos modificar objetos de mensagem, adicionar nossas propriedades a eles. Como eles são gerenciados pelo código de outra pessoa, isso pode levar a consequências ruins.
