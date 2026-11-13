importance: 5

---

# Quais variáveis estão disponíveis?

A função `makeWorker` abaixo cria outra função e a retorna. Essa nova função pode ser chamada de algum outro lugar.

Ela vai ter acesso às variáveis externas do seu lugar de criação, do lugar de invocação, ou dos dois?

```js
function makeWorker() {
  let name = "Pete";

  return function() {
    alert(name);
  };
}

let name = "John";

// cria uma função
let work = makeWorker();

// a chama
work(); // o que vai mostrar?
```

Qual valor ela vai mostrar? "Pete" ou "John"?
