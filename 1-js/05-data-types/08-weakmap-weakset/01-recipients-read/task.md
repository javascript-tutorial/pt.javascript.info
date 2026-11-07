importance: 5

---

# Guarde marcações de "não lida"

Existe um array de mensagens:

```js
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
```

Seu código pode acessá-lo, mas as mensagens são gerenciadas pelo código de outra pessoa. Mensagens novas são adicionadas, as antigas são removidas regularmente por esse código, e você não sabe os momentos exatos em que isso acontece.

Agora, qual estrutura de dados você poderia usar para guardar a informação sobre se a mensagem "já foi lida"? A estrutura precisa ser bem adequada para responder "ela foi lida?" para um determinado objeto de mensagem.

P.S. Quando uma mensagem é removida de `messages`, ela também deve desaparecer da sua estrutura.

P.P.S. Não devemos modificar os objetos de mensagem, adicionando propriedades nossas a eles. Como eles são gerenciados pelo código de outra pessoa, isso pode trazer más consequências.
