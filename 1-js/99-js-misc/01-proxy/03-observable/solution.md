A solução consiste em duas partes:


1. Sempre que `.observe(handler)` for chamado, precisamos lembrar do manipulador em algum lugar, para ser capaz de chamá-lo depois. Podemos armazenar os manipuladores no próprio objeto, usando nosso symbol como chave da propriedade.
2. Precisamos de um proxy com um `set` para chamar todos os manipuladores caso de aconteça qualquer alteração.

```js run
let handlers = Symbol('handlers');

function makeObservable(target) {
  // 1. inicializa o armazenamento de manipuladores
  target[handlers] = [];

  // Armazena a função manipuladora no array para futuras chamadas
  target.observe = function(handler) {
    this[handlers].push(handler);
  };

  // 2. Cria um proxy para lidar com as mudanças
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); // Encaminha a operação para o objeto
      if (success) { // Se não houver erro ao definir a propriedade
        // chama rodos os manipuladores
        target[handlers].forEach(handler => handler(property, value));
      }
      return success;
    }
  });
}

let user = {};

user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John";
```
