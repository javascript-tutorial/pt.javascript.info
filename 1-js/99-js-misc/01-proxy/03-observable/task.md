
# Observable

Crie uma função makeObservable(target) que "torna o objeto observável" ao retornar um proxy.

Veja como deveria funcionar:

```js run
function makeObservable(target) {
  /* seu código */
}

let user = {};
user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John"; // alerts: SET name=John
```

Em outras palavras, um objeto retornado por makeObservable é como o original, mas também tem o método `observe(handler)` que define a função `handler` a ser chamada em qualquer alteração de propriedade.

Sempre que uma propriedade muda, `handler(key, value)` é chamado com o nome e o valor da propriedade.

P.S. Nessa tarefa, preocupe-se apenas com a escrita em uma propriedade. Outras operações podem ser implementadas de maneira semelhante.
