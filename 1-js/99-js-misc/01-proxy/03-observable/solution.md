A solução consiste em duas partes:

1. Sempre que `.observe(handler)` for chamado, precisamos lembrar handler em algum lugar, para ser possível chamá-lo mais tarde. Podemos armazenar os handlers diretamente no objeto, usando nosso symbol como chave da propriedade.
2. Precisamos de um proxy com uma armadilha (trap) `set` para chamar os handlers no caso de alguma mudança.

```js run
let handlers = Symbol('handlers');

function makeObservable(target) {
  // 1. Inicializa o armazenamento de manipuladores
  target[handlers] = [];

  // Armazena a função handler no array para futuras chamadas
  target.observe = function(handler) {
    this[handlers].push(handler);
  };

  // 2. Cria um proxy para lidar com as mudanças
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); // Encaminha a operação para o objeto
      if (success) { // Se não houve erro ao definir a propriedade
        // chama rodos os handlers
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
