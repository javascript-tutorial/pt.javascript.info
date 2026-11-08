importance: 5

---

# Guarde as datas de leitura

Existe um array de mensagens, igual ao da [tarefa anterior](info:task/recipients-read). A situação é parecida.

```js
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
```

A pergunta agora é: qual estrutura de dados você sugeriria para guardar a informação "quando a mensagem foi lida?".

Na tarefa anterior, só precisávamos guardar o fato "sim/não". Agora precisamos guardar a data, e ela só deve permanecer na memória até que a mensagem seja removida pela coleta de lixo.

P.S. Datas podem ser guardadas como objetos da classe nativa `Date`, que veremos mais adiante.
