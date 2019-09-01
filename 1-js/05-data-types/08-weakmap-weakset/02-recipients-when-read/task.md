importance: 5

---

# Armazenar data de leitura

Há um array de mensagens como na [tarefa anterior](info:task/recipients-read). A situação é semelhante.

```js
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
```

A questão agora é: qual estrutura de dados você sugeriria para armazenar as informações: "quando a mensagem foi lida?".

Na tarefa anterior, precisávamos apenas armazenar o fato "sim/não". Agora precisamos armazenar a data e ela deve permanecer na memória até a mensagem ser coletada como lixo.

P.S. As datas podem ser armazenadas como objetos da classe `Date 'incorporada, que abordaremos mais adiante.