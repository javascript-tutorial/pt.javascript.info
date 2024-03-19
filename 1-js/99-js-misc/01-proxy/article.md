# Proxy e Reflect

Um objeto `Proxy` envolve um outro objeto e intercepta as suas operações, como leitura/escrita de propriedades e outras, opcionalmente manipulando-as por conta própria ou permitindo, de forma transparente, que o objeto as manipule.

Os proxies são usados ​​em muitas bibliotecas e em alguns frameworks de navegador. Veremos muitas aplicações práticas neste artigo.

## Proxy

A sintaxe:

```js
let proxy = new Proxy(target, handler)
```

- `target` -- é um objeto para envolver, pode ser qualquer coisa, incluindo funções.
- `handler` -- configuração de proxy: um objeto com "armadilhas", métodos que interceptam operações, por exemplo, `get` para ler uma propriedade de `target`, `set` para escrever uma propriedade em `target` e assim por diante.

Para operações em `proxy`, se houver uma armadilha correspondente em `handler`, então ela é executada, e o proxy tem a chance de lidar com ela; caso contrário, a operação é realizada no `target`.

Como um exemplo inicial, vamos criar um proxy sem nenhuma armadilha:

```js run
let target = {};
let proxy = new Proxy(target, {}); // manipulador vazio

proxy.test = 5; // escreve no proxy (1)
alert(target.test); // 5, a propriedade apareceu em target!

alert(proxy.test); // 5, podemos lê-lo do proxy também (2)

for(let key in proxy) alert(key); // teste, a iteração funciona (3)
```

Como não há armadilhas, todas as operações em `proxy` são encaminhadas para `target`.

1. Uma operação de escrita `proxy.test=` define o valor em `target`.
2. Uma operação de leitura `proxy.test` retorna o valor de `target`.
3. Iteração sobre `proxy` retorna valores de `target`.

Como podemos ver, o `proxy`, com ausência de armadilhas, é um invólucro transparente em torno de `target`. 

![](proxy.svg)

O `Proxy` é um "objeto exótico" especial. Não possui propriedades próprias. Com um `handler` vazio ele aparentemente encaminha as operações para `target`.

Para ativar mais recursos, vamos adicionar armadilhas.

O que podemos interceptar com eles?

Para a maioria das operações em objetos, existe um "método interno" conhecido na especificação do JavaScript que descreve como ele funciona no nível mais baixo. Por exemplo, `[[Get]]`, o método interno para ler uma propriedade, `[[Set]]`, o método interno para escrever uma propriedade, e assim por diante. Esses métodos são usados apenas na especificação, não podemos chamá-los diretamente pelo nome. 

Armadilhas de proxy interceptam chamadas desses métodos. Eles estão listados na [especificação do proxy](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots) e na tabela abaixo.

Para cada método interno, há uma armadilha nesta tabela: o nome do método que podemos adicionar ao parâmetro `handler` do `new Proxy` para interceptar a operação:

| Método interno | Método manipulador | Dispara quando... |
|-----------------|----------------|-------------|
| `[[Get]]` | `get` | leitura de uma propriedade |
| `[[Set]]` | `set` | escrita em uma propriedade 
| `[[HasProperty]]` | `has` | operador `in` |
| `[[Delete]]` | `deleteProperty` | operador `delete` |
| `[[Call]]` | `apply` | chamada de função |
| `[[Construct]]` | `construct` | operador `new` |
| `[[GetPrototypeOf]]` | `getPrototypeOf` | [Object.getPrototypeOf](mdn:/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) |
| `[[SetPrototypeOf]]` | `setPrototypeOf` | [Object.setPrototypeOf](mdn:/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) |
| `[[IsExtensible]]` | `isExtensible` | [Object.isExtensible](mdn:/JavaScript/Reference/Global_Objects/Object/isExtensible) |
| `[[PreventExtensions]]` | `preventExtensions` | [Object.preventExtensions](mdn:/JavaScript/Reference/Global_Objects/Object/preventExtensions) |
| `[[DefineOwnProperty]]` | `defineProperty` | [Object.defineProperty](mdn:/JavaScript/Reference/Global_Objects/Object/defineProperty), [Object.defineProperties](mdn:/JavaScript/Reference/Global_Objects/Object/defineProperties) |
| `[[GetOwnProperty]]` | `getOwnPropertyDescriptor` | [Object.getOwnPropertyDescriptor](mdn:/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor), `for..in`, `Object.keys/values/entries` |
| `[[OwnPropertyKeys]]` | `ownKeys` | [Object.getOwnPropertyNames](mdn:/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames), [Object.getOwnPropertySymbols](mdn:/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols), `for..in`, `Object.keys/values/entries` |

```warn header="invariantes"
O JavaScript impõe algumas regras fixas invariantes - condições que devem ser cumpridas por métodos internos e armadilhas.

A maioria deles se refere aos valores de retorno:
- `[[Set]]` deve retornar `true` se o valor for escrito com sucesso, caso contrário, `false`. 
- `[[Delete]]` deve retornar `true` se o valor for deletado com sucesso, caso contrário, `false`.
- ...e assim por diante, vemos ver mais exemplos abaixo.

Há alguns outros invariantes, como:
- `[[GetPrototypeOf]]`, aplicado ao objeto proxy, deve retornar o mesmo valor que [[GetPrototypeOf]] aplicado ao objeto alvo do proxy. Em outras palavras, a leitura do protótipo de um proxy deve sempre retornar o protótipo do objeto alvo.

Armadilhas podem interceptar essas operações, mas elas devem seguir essas regras.

Os invariantes garantem o comportamento correto e consistente das funcionalidades da linguagem. A lista completa de invariantes está na [especificação](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots). Você provavelmente não os violará se não estiver fazendo algo incomum.
```
Vamos ver como isso funciona em exemplos práticos.

## Valor padrão com a armadinha "get"

As armadilhas mais comuns são para leitura/escrita de propriedades.

Para interceptar a leitura, o `manipulador` deve ter um método `get(target, property, receiver)`.

Ele dispara quando uma propriedade é lida, com os seguintes argumentos:
- `target` -- é o objeto alvo, o passado como primeiro argumento para `new Proxy`,
- `property` -- nome da propriedade,
- `receiver` -- se a propriedade `target` for método de acesso, então o `receiver` é o objeto que será usada como `this` nas suas chamadas. Normalmente é o próprio objeto `proxy` (ou um objeto que herda dele, se herdamos de um proxy). No momento não precisamos desse argumento, por isso ele será explicado com mais detalhes depois.

Vamos usar `get` para implementar valores padrão para um objeto.

Vamos criar um array numérico que retorna `0` para valores inexistentes.

Normalmente, quando alguém tenta acessar um item inexistente em um array, o resultado é `undefined`, mas vamos envolver um array comum em um proxy que intercepta a leitura e retorna `0` se a propriedade não existir.

```js run
let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // valor padrão
    }
  }
});

*!*
alert( numbers[1] ); // 1
alert( numbers[123] ); // 0 (item não existe)
*/!*
```

Como podemos ver, é muito fácil com um interceptador `get`.

Podemos usar `Proxy` para implementar qualquer lógica para valores "padrão". 

Imagine que temos um dicionário, com prases e suas traduções:

```js run
let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};

alert( dictionary['Hello'] ); // Hola
alert( dictionary['Welcome'] ); // undefined
```

Agora, se não houver frase, ler de `dictionary` retorna `undefined`. Mas, na prática, deixar de traduzir uma frase é melhor que `undefined`. Então vamos fazer com que retorne uma frase não traduzida nesse caso ao invés de `undefined`. 

Para conseguir fazer isso, vamos envolver `dictionary` em um proxy que intercepta operações de leitura:

```js run
let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};

dictionary = new Proxy(dictionary, {
*!*
  get(target, phrase) { // intercepta a leitura de uma propriedade de dictionary
*/!*
    if (phrase in target) { // se a tivermos em dictionary
      return target[phrase]; // retorna a tradução
    } else {
      // caso contrário, retorna a frase não traduzida
      return phrase;
    }
  }
});


// Consulta de frases arbitrárias no dicionário!
// No pior caso, elas não serão traduzidas.
alert( dictionary['Hello'] ); // Hola
*!*
alert( dictionary['Welcome to Proxy']); // Bem-vindo ao Proxy (sem tradução)
*/!*
```

````smart
Observe como o proxy sobrescreve a variável:

```js
dictionary = new Proxy(dictionary, ...);
```
O proxy deve substituir completamente o objeto alvo em todo lugar. Ninguém deve fazer referência ao objeto alvo depois que ele foi envolvido em um proxy. Caso contrário é fácil cometer erros. 
````

## Validação com a armadilha "set"

Vamos dizer que queremos um array exclusivamente para números. Se um valor de outro tipo for adicionado, deverá ocorrer um erro.

A armadilha `set` dispara quando uma propriedade é escrita.

`set(target, property, value, receiver)`:

- `target` -- é o objeto alvo, o passado como primeiro argumento para `new Proxy`,
- `property` -- nome da propriedade,
- `value` -- valor da propriedade,
- `receiver` -- semelhante à armadilha `get`, isso só importa para propriedades do tipo setter.

A armadilha `set` deve retornar `true` se a definição for bem-sucedida e `false` caso contrário (disparando um `TypeError`) 

Vamos usá-la para validar novos valores:

```js run
let numbers = [];

numbers = new Proxy(numbers, { // (*)
*!*
  set(target, prop, val) { // para interceptar a escrita de uma propriedade
*/!*
    if (typeof val == 'number') {
      target[prop] = val;
      return true;
    } else {
      return false;
    }
  }
});

numbers.push(1); // adicionado com sucesso
numbers.push(2); // adicionado com sucesso
alert("O tamanho é: " + numbers.length); // 2

*!*
numbers.push("test"); // TypeError ('set' em proxy retornou false)
*/!*

alert("Essa linha nunca é alcançada (erro na linha de cima)");
```

Observe: a funcionalidade nativa dos arrays continua funcionando! Valores são adicionados por `push`. A propriedade `length` incrementa automaticamente quando valores são adicionados. Nosso proxy não quebra nada.

Não é necessário sobrescrever métodos de adição de valor em arrays, como `push` e `unshift`, entre outros, para adicionar verificações, pois internamente eles usam a operação `[[Set]]`, sendo interceptada pelo proxy.

Portanto, o código fica limpo e conciso.

```warn header="Não se esqueça de retornar `true`"
Como mencionado anteriormente, existem invariantes que precisam ser mantidos.

Para `set`, deve retornar `true` para uma escrita bem-sucedida.

Se esquecermos de fazer isso ou retornarmos qualquer valor considerado falso (falsy), a operação dispara um `TypeError`.

## Iteração com "ownKeys" e "getOwnPropertyDescriptor"

O `Object.keys`, o loop `for..in` e a maioria dos outros métodos que iteram sobre propriedades de objetos usam o método interno `[[OwnPropertyKeys]]` (interceptado pela armadilha `ownKeys`) par obter uma lista de propriedades.

Esses métodos diferem nos detalhes:
- `Object.getOwnPropertyNames(obj)` retorna chaves não-símbolo.
- `Object.getOwnPropertySymbols(obj)` retorna chaves símbolo.
- `Object.keys/values()` retorna chaves/valores que não são símbolos com a flag `enumerable` (as flags de propriedade foram explicadas no artigo <info:property-descriptors>).
- Loops `for..in` percorrem sobre chaves não-símbolo com a flag `enumerable` e também sobre chaves prototype.

...Porém, todos eles começam com essa lista.

No exemplo abaixo usamos a armadilha `ownKeys` para fazer o `for..in` iterar sobre `user`, e também `Object.keys` e `Object.values`, para ignorar propriedades inciadas com um sublinhado `_`:  

```js run
let user = {
  name: "John",
  age: 30,
  _password: "***"
};

user = new Proxy(user, {
*!*
  ownKeys(target) {
*/!*
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "ownKeys" tira o _password da listagem
for(let key in user) alert(key); // name, depois: age

// mesmo efeito nesses métodos:
alert( Object.keys(user) ); // name,age
alert( Object.values(user) ); // John,30
```
Até agora, funciona.

No entanto, se retornarmos uma chave que não existe no objeto, `Object.keys` não a listará:

```js run
let user = { };

user = new Proxy(user, {
*!*
  ownKeys(target) {
*/!*
    return ['a', 'b', 'c'];
  }
});

alert( Object.keys(user) ); // <vazio>
```
Por quê? O motivo é simples: `Object.keys` retorna apenas propriedades com a flag `enumerable`. Para conferi-la, ele chama o método interno `[[GetOwnProperty]]` para todas as propriedades a fim de obter [seu descritor](info:property-descriptors). E aqui, como não existe propriedade, seu descritor está vazio, sem a flag `enumerable`, portanto é pulado.

Para que `Object.keys` retorne uma propriedade, precisamos que ela existe no objeto com a flag `enumerable` ou podemos interceptar chamadas a `[[GetOwnProperty]]` (a armadilha `getOwnPropertyDescriptor` faz isso) e retornar um descritor com `enumerable: true`.

Aqui está um exemplo disso:

```js run
let user = { };

user = new Proxy(user, {
  ownKeys(target) { // chamado uma vez para obter uma lista de propriedades
    return ['a', 'b', 'c'];
  },

  getOwnPropertyDescriptor(target, prop) { // chamado para cada propriedade
    return {
      enumerable: true,
      configurable: true
      /* ...outras flags, provavelmente "value:..." */
    };
  }

});

alert( Object.keys(user) ); // a, b, c
```
Vamos observar mais uma vez: só precisamos interceptar `[[GetOwnProperty]]` se a propriedade estiver ausente no objeto.

## Propriedades protegidas com "deleteProperty" e outras armadilhas

Existe uma convenção difundida de que propriedades e métodos prefixados por um sublinhado (`_`) são internos. Eles não devem ser acessados de fora do objeto.

Tecnicamente, isso é possível, no entanto:

```js run
let user = {
  name: "John",
  _password: "secret"
};

alert(user._password); // secreto
```

Vamos usar proxies para prevenir qualquer acesso a propriedades que começam com `_`.

Vamos precisar das armadilhas:
- `get` para lançar um erro ao ler uma propriedade,
- `set` para lançar um erro ao escrever,
- `deleteProperty` para lançar um erro ao deletar,
- `ownKeys` para excluir propriedades que começam com `_` de `for..in` e métodos como  `Object.keys`.

Aqui está o código:

```js run
let user = {
  name: "John",
  _password: "***"
};

user = new Proxy(user, {
*!*
  get(target, prop) {
*/!*
    if (prop.startsWith('_')) {
      throw new Error("Acesso negado");
    }
    let value = target[prop];
    return (typeof value === 'function') ? value.bind(target) : value; // (*)
  },
*!*
  set(target, prop, val) { // para interceptar a escrita de propriedades
*/!*
    if (prop.startsWith('_')) {
      throw new Error("Acesso negado");
    } else {
      target[prop] = val;
      return true;
    }
  },
*!*
  deleteProperty(target, prop) { // para interceptar a exclusão de propriedades
*/!*
    if (prop.startsWith('_')) {
      throw new Error("Acesso negado");
    } else {
      delete target[prop];
      return true;
    }
  },
*!*
  ownKeys(target) { // para interceptar a lista de propriedades
*/!*
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "get" não permite a leitura de _password
try {
  alert(user._password); // Error: Acesso negado
} catch(e) { alert(e.message); }

// "set" não permite a escrita em _password
try {
  user._password = "test"; // Error: Acesso negado
} catch(e) { alert(e.message); }

// "deleteProperty" não permite a exlusão de _password
try {
  delete user._password; // Error: Acesso negado
} catch(e) { alert(e.message); }

// "ownKeys" tira o _password da listagem
for(let key in user) alert(key); // name
```

Perceba o detalhe importante na armadilha `get`, na linha `(*)`:

```js
get(target, prop) {
  // ...
  let value = target[prop];
*!*
  return (typeof value === 'function') ? value.bind(target) : value; // (*)
*/!*
}
```

Por que precisamos de uma função para chamar `value.bind(target)`?

O motivo é que métodos de objetos, como `user.checkPassword()`, devem ser capazes de acessar `_password`.

```js
user = {
  // ...
  checkPassword(value) {
    // objeto deve ser capaz de ler _password
    return value === this._password;
  }
}
```

Uma chamada a `user.checkPassword()` retorna o usuário o `user` proxificado como `this` (o objeto antes do ponto se torna `this`), então, quando tentar acessar `this._password`, a armadilha `get` é ativada (ela disparada em qualquer leitura de propriedade) e dispara um erro.

Então, vinculamos o contexto dos métodos do objeto ao objeto original, `target`, na linha `(*)`. Em seguida, suas chamadas futuras usarão `target` como `this`, sem a necessidade de armadilhas.

Essa solução geralmente funciona, mas não é a ideal, pois um método pode passar um objeto sem proxy para algum outro lugar, então teremos uma bagunça: onde está o objeto original, e onde está o objeto com proxy?

Além disso, um objeto pode ser alvo de vários proxies (múltiplos proxies podem adicionar diferentes "ajustes") ao objeto, e se passarmos o objeto não encapsulado para um método, pode haver consequências inesperadas

Assim, tal proxy não deve ser usado em todos os lugares. 
```smart header="Propriedades privadas de uma classe"
Os motores JavaScript modernos suportam propriedades privadas em classes nativamente, prefixadas com `#`. Elas são descritas no artigo <info:private-protected-properties-methods>. Não são necessários proxies.

No entanto, essas propriedades têm seus próprios problemas. Particularmente, elas não são herdadas.
```

## "In range" com a armadilha "has"

Vamos ver mais exemplos.

Temos um objeto intervalo:

```js
let range = {
  start: 1,
  end: 10
};
```

Gostaríamos de usar o operador `in` para conferir se um número está em `range`

A armadilha `has` intercepta chamadas `in`.

`has(target, property)`

- `target` -- é o objeto alvo, o passado como primeiro argumento para `new Proxy`,
- `property` -- nome da propriedade

Aqui está a demo:

```js run
let range = {
  start: 1,
  end: 10
};

range = new Proxy(range, {
*!*
  has(target, prop) {
*/!*
    return prop >= target.start && prop <= target.end;
  }
});

*!*
alert(5 in range); // true
alert(50 in range); // false
*/!*
```

Belo syntactic sugar, não é? E muito simples de implementar.

## Envolvendo funções: "apply" [#proxy-apply]

Podemos envolver um proxy em torno de uma função também.

A armadilha `apply(target, thisArg, args)` lida com a chamada de um proxy como função:
- `target` é o objeto alvo (funçao é um objeto em JavaScript),
- `thisArg` é o valor de `this`.
- `args` é uma lista de argumentos.

Por exemplo, vamos relembrar o decorator `delay(f, ms)`, que fizemos no artigo <info:call-apply-decorators>.

Nesse artigo, fizemos isso sem proxies. Uma chamada para `delay(f, ms)` retornava uma função que encaminhava todas as chamadas para `f` após `ms` milissegundos.

Aqui está a implementação anterior, baseada em função:
```js run
function delay(f, ms) {
  // retorna uma função envoltória que passa a chamada para f após o intervalo
  return function() { // (*)
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// após esse encapsulamento, chamadas a para `sayHi` serão atrasadas por 3 segundos
sayHi = delay(sayHi, 3000);

sayHi("John"); // Hello, John! (depois de 3 segundos)
```

Como já vimos, isso funciona na maioria das vezes. A função encapsuladora `(*)` realiza a chamada depois do intervalo.

Mas uma função encapsuladora não encaminha as operações de leitura/escrita ou qualquer outra coisa. Depois do encapsulamento, o acesso às propriedades das funções originais é perdido, tais como `nome`, `length` e outras:

```js run
function delay(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

*!*
alert(sayHi.length); // 1 (o tamanho da função é o número de argumentos na sua declaração)
*/!*

sayHi = delay(sayHi, 3000);

*!*
alert(sayHi.length); // 0 (na declaração encapsuladora, não há argumentos)
*/!*
```

`Proxy` é muito mais poderoso, pois ele encaminha tudo para o objeto alvo.

Vamos usar `Proxy` em vez de uma função encapsuladora:

```js run
function delay(f, ms) {
  return new Proxy(f, {
    apply(target, thisArg, args) {
      setTimeout(() => target.apply(thisArg, args), ms);
    }
  });
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

sayHi = delay(sayHi, 3000);

*!*
alert(sayHi.length); // 1 (*) o proxy encaminha a operação "get length" para o objeto
*/!*

sayHi("John"); // Hello, John! (após 3 segundos)
```

O resultado é o mesmo, mas agora não apenas chamadas, mas todas as operações no proxy são encaminhadas para a função original. Assim `sayHi.length` é retornado corretamente depois do encapsulamento na linha `(*)`.

Nós temos uma camada externa "mais rica".

Outra armadilha existe: a lista completa está no início desse artigo. O padrão de uso deles é semelhante ao mencionado acima.

## Reflect

`Reflect` é um objeto nativo que simplifica a criação do `Proxy`.

Foi dito anteriormente que métodos internos, tais como `[[Get]]`, `[[Set]]` e outros, são exclusivos da especificação e não podem ser chamados diretamente.

O objeto `Reflect` torna isso algo possível em certa medida. Os métodos dele são encapsuladores mínimos em torno dos métodos internos. 

Aqui estão exemplos de operações e chamadas `Reflect` que realizam a mesma coisa:

| Operação |  chamada `Reflect` | Método interno |
|-----------------|----------------|-------------|
| `obj[prop]` | `Reflect.get(obj, prop)` | `[[Get]]` |
| `obj[prop] = value` | `Reflect.set(obj, prop, value)` | `[[Set]]` |
| `delete obj[prop]` | `Reflect.deleteProperty(obj, prop)` | `[[Delete]]` |
| `new F(value)` | `Reflect.construct(F, value)` | `[[Construct]]` |
| ... | ... | ... |

Por exemplo:

```js run
let user = {};

Reflect.set(user, 'name', 'John');

alert(user.name); // John
```

Em particular, o `Reflect` nos permite chamar operações (`new`, `delete`...) como funções (`Reflect.construct`, `Reflect.deleteProperty`, ...). Essa é uma capacidade interessante, mas aqui outra coisa importante. 

**Para cada método interno capturável por `Proxy`, há um método correspondente em `Reflect` com o mesmo nome e argumentos que as armadilhas em `Proxy`**

Assim podemos usar `Reflect` para encaminhar uma operação para o objeto original.

Nesse exemplo, as armadilhas `get` e `set` encaminha de forma transparente (como se não existissem) operações de leitura/escrita para o objeto, exibindo uma mensagem: 

```js run
let user = {
  name: "John",
};

user = new Proxy(user, {
  get(target, prop, receiver) {
    alert(`GET ${prop}`);
*!*
    return Reflect.get(target, prop, receiver); // (1)
*/!*
  },
  set(target, prop, val, receiver) {
    alert(`SET ${prop}=${val}`);
*!*
    return Reflect.set(target, prop, val, receiver); // (2)
*/!*
  }
});

let name = user.name; // exibe "GET name"
user.name = "Pete"; // exibe "SET name=Pete"
```

Aqui:

- `Reflect.get` lê a propriedade de um objeto.
- `Reflect.set` grava uma propriedade no objeto e retorna `true` se for bem-sucedido, `false` caso contrário.

Isso é, tudo é simples: se uma armadilha quiser encaminhar a chamada para o objeto, é suficiente chamar `Reflect.<method>` com os mesmos argumentos.

Na maioria dos casos podemos fazer o mesmo sem `Reflect`, por exemplo, ler uma propriedade `Reflect.get(target, prop, receiver)` pode ser substituído por `target[prop]`. Há nuances importantes, no entanto.

### Envolvendo um método de acesso em um Proxy

Vamos ver um exemplo que demonstra por que `Reflect.get` é melhor. E também veremos por que `get/set` têm o terceiro argumento `receiver`, que não utilizamos anteriormente. 

Temos um objeto `user` com uma propriedade `_name` e um método de acesso para ela.

Aqui está um proxy ao redor dele

```js run
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

*!*
let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop];
  }
});
*/!*

alert(userProxy.name); // Guest
```
A armadilha `get` é "transparente" aqui, ela retorna a propriedade original, e não faz mais nada. Isso é suficiente para o nosso exemplo.

Tudo parece estar correto. Porém, vamos tornar o exemplo um pouco mais complexo.
Após herdar outro objeto `admin` de `user`, podemos observar o comportamento incorreto:

```js run
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop]; // (*) target = user
  }
});

*!*
let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

// Expected: Admin
alert(admin.name); // outputs: Guest (?!?)
*/!*
```
Ler `admin.name` devia retornar `"Admin"`, não `"Guest"`!

Qual é o problema? Talvez nós fizemos algo errado com a herança?

Mas se removermos o proxy, então tudo funcionará como esperado.

O problema, na verdade, está no proxy, na linha `(*)`.

1. Quando lemos `admin.name`, como o objeto `admin` não tem tal propriedade própria, a busco vai para o seu protótipo.
2. O protótipo usado é `userProxy`.
3. Quando lemos a propriedade  `name` do proxy, a sua armadilha `get` dispara e o retorna do objeto original como `target[prop]` na linha `(*)`.

Uma chamada para `target[prop]`, quando `prop` é um método de acesso, executa o seu código no contexto `this=target`. Então o resultado é `this._name` do objeto original `target`, isto é: de `user`.

Para corrigir essas situações, precisamos do `receiver`, o terceiro argumento da armadilha `get`. Ele mantém o `this` correto a ser passado para um método de acesso. No nosso caso, isso é `admin`.

Como passar o contexto para um método de acesso? Para uma função regular poderíamos usar `call/apply`, mas esse é um método de acesso, ele não é "chamado", apenas acessado.

`Reflect.get` pode fazer isso. Tudo funcionará bem se o utilizarmos.

Aqui está a variante correta:

```js run
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) { // receiver = admin
*!*
    return Reflect.get(target, prop, receiver); // (*)
*/!*
  }
});


let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

*!*
alert(admin.name); // Admin
*/!*
```

Agora, `receiver`, que mantém uma referência ao `this` correto (que é `admin`), é passado para o método de acesso usando `Reflect.get` na linha `(*)`.

Podemos reescrever a armadilha de forma ainda mais curta:

```js
get(target, prop, receiver) {
  return Reflect.get(*!*...arguments*/!*);
}
```

As chamadas de `Reflect` têm exatamente o mesmo nome que as armadilhas e aceitam os mesmos argumentos.

Assim, `return Reflect...` fornece uma maneira segura e direta de encaminhar a operação e garantir que não esquecemos de nada relacionado e isso.

## Limitações do Proxy

Proxies fornecem um jeito único de alterar ou ajustar o comportamento de objetos existente no nível mais baixo. Ainda assim, não é perfeito. Existem limitações.

### Objetos nativos: slots internos 

Muitos objetos nativos, por exemplo, `Map`, `Set`, `Date`, `Promise` e outros recorrem aos chamados "slots internos". 

Esses são semelhantes a propriedades, porém reservado para fins internos, exclusivos da especificação. Por exemplo, `Map` armazena items no slot interno `[[MapData]]`. Métodos nativos acessam esses slots diretamente, não por meio dos métodos internos `[[Get]]/[[Set]]`. Portanto, `Proxy` não pode interceptar. 

Por que se importar? Afinal, eles são internos!

Bem, aqui está o problema. Depois que um objeto nativo desse tipo é colocado sob um proxy, o proxy não possui esses slots internos, então os métodos nativos irão falhar. 

Por exemplo:

```js run
let map = new Map();

let proxy = new Proxy(map, {});

*!*
proxy.set('test', 1); // Erro
*/!*
```

Internamente, um `Map` armazena todos os dados no seu slot interno `[[MapData]]`. O proxy não o possui. O [método nativo `Map.prototype.set`](https://tc39.es/ecma262/#sec-map.prototype.set) tenta acessar a propriedade interna `this.[[MapData]]`, mas como `this=proxy`, não consegue encontrá-la em `proxy` e falha. 

Felizmente, há uma maneira de corrigir isso:

```js run
let map = new Map();

let proxy = new Proxy(map, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
*!*s
    return typeof value == 'function' ? value.bind(target) : value;
*/!*
  }
});

proxy.set('test', 1);
alert(proxy.get('test')); // 1 (funciona!)
```

Agora funciona bem, porque a armadilha `get` vincula as propriedades de função, como `map.set`, ao próprio objeto alvo (`map`).

Ao contrário do exemplo anterior, o valor de `this` dentro de `proxy.set(...)` não será `proxy`, mas o `map` original. Portanto, quando a implementação interna de `set` tenta acessar o slot interno `this.[[MapData]]`, ela é bem-sucedida.

```smart header="`Array` não tem slots internos"
Uma notável exceção: O `Array` nativo não utiliza slots internos. Isso é por razões históricas, pois foi introduzido há muito tempo.

Por isso não há esse tipo de problema ao envolver um array em um proxy.
```

### Campos privados

Algo semelhante acontece com campos privados de classe.

Por exemplo, o método `getName()` acessa a propriedade privada `#name` e falha após ser envolvido por um Proxy:

```js run
class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

let user = new User();

user = new Proxy(user, {});

*!*
alert(user.getName()); // Erro
*/!*
```

O motivo é que campos privados são implementados usando slots internos. O JavaScript não usa `[[Get]]/[[Set]]` quando os acessa.

Na chamada `getName()` o valor de `this` é o `user` que está sendo utilizado por meio do proxy, e ele não tem o slot com campos privados. 

Novamente, a solução de vincular o método faz com que funcione: 

```js run
class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

let user = new User();

user = new Proxy(user, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == 'function' ? value.bind(target) : value;
  }
});

alert(user.getName()); // Guest
```
Dito isto, a solução tem desvantagens, como explicado anteriormente: ela expõe o objeto original ao método, potencialmente permitindo que ele seja passado adiante e quebrando outras funcionalidades do proxy. 

### Proxy != target

O proxy e o objeto original são objetos diferentes. Isso é natural, certo?

Então, se usarmos o objeto original como uma chave e, em seguida, o colocarmos em um proxy, o proxy não poderá ser encontrado:

```js run
let allUsers = new Set();

class User {
  constructor(name) {
    this.name = name;
    allUsers.add(this);
  }
}

let user = new User("John");

alert(allUsers.has(user)); // true

user = new Proxy(user, {});

*!*
alert(allUsers.has(user)); // false
*/!*
```

Como podemos ver, após a criação do proxy, não conseguimos encontrar `user` no conjunto `allUsers`, pois o proxy é um objeto diferente.

```warn header="Proxies não podem interceptar um teste de igualdade estrita `===`"
Proxies podem interceptar muitas operações, tais como `new` (com `construct`), `in` (com `has`), `delete` (com `deleteProperty`) e assim por diante.

Mas não há como interceptar um teste de igualdade estrita para objetos. Um objeto sé estritamente igual apenas a si mesmo, e a nenhum outro valor.

Portanto, todas as operações e classes nativas que comparam objetos pela igualdade vão diferenciar entre o objeto e o proxy. Aqui não há nenhuma substituição transparente.
```

## Proxies revogáveis

Um proxy "revogável" é um proxy que pode ser desativado.

Vamos supor que temos um recurso e gostaríamos de encerrar o acesso a ele a qualquer momento.

O que podemos fazer é envolvê-lo em um proxy revogável, sem armadilhas. Tal proxy encaminhará as operações para o objeto, e podemos desativá-lo a qualquer momento.

A sintaxe é:

```js
let {proxy, revoke} = Proxy.revocable(target, handler)
```

A chamada retorna um objeto com o `proxy` e a função `revoke` para desativá-lo.

Aqui está um exemplo:

```js run
let object = {
  data: "Valuable data"
};

let {proxy, revoke} = Proxy.revocable(object, {});

// passa o proxy para algum lugar no lugar do objeto...
alert(proxy.data); // Valuable data

// mais tarde em nosso código
revoke();

// o proxy não está funcionando mais (revogado)
alert(proxy.data); // Error
```

Uma chamada a `revoke()` remove todas as referências internas ao objeto alvo do proxy, então eles não estão mais conectados.

Inicialmente, `revoke` é separado de `proxy`, para podermos passar `proxy` para diferentes partes do código, enquanto deixamos `revoke` no escopo atual.

Também podemos associar o método `revoke` ao proxy definindo `proxy.revoke = revoke`.

Outra opção é criar um `WeakMap` que tem o `proxy` como chave e o correspondente `revoke` como valor, o que permite encontrar facilmente o `revoke` para um proxy:


```js run
*!*
let revokes = new WeakMap();
*/!*

let object = {
  data: "Valuable data"
};

let {proxy, revoke} = Proxy.revocable(object, {});

revokes.set(proxy, revoke);

// ..em algum outro lugar no nosso código..
revoke = revokes.get(proxy);
revoke();

alert(proxy.data); // Error (revogado)
```

Aqui usamos o `WeakMap` em vez do `Map`, pois não bloqueará a coleta de lixo (garbage colllection). Se um objeto de proxy se torna "inalcançável" (por exemplo, nenhuma variável mais o referencia), o `WeakMap` permite que ele seja removido da memória juntamente com seu `revoke`, que não precisaremos mais.

## Referências

- Especificação: [Proxy](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots).
- MDN: [Proxy](mdn:/JavaScript/Reference/Global_Objects/Proxy).

## Resumo

`Proxy` é um invólucro ao redor de um objeto que encaminha operações para o objeto, opcionalmente capturando algumas delas. 

Ele pode envolver qualquer tipo de objeto, incluindo classes e funções.

A sintaxe é:

```js
let proxy = new Proxy(target, {
  /* armadilhas */
});
```

...Então devemos usar `proxy` em todos os lugares em vez de `target`. Um proxy não tem suas próprias propriedades ou métodos. Ele captura uma operação se a armadilha for fornecida, caso contrário, encaminha para o objeto `target`.

Podemos capturar:
- Leitura (`get`), escrita (`set`), exclusão (`deleteProperty`) de uma propriedade (mesmo que não exista).
- Chamada de uma função (armadilha `apply`).
- O operador `new` (armadilha `construct`).
- Muitas outras operações (a lista ccompleta está no início do artigo e na [documentação](mdn:/JavaScript/Reference/Global_Objects/Proxy)).

Isso nos permite criar propriedades e métodos "virtuais", implementar valores padrão, objetos observáveis, decoradores (decorators) de funções e muito mais. 

Também podemos envolver um objeto várias vezes em diferentes proxies, decorando-os com vários aspectos de funcionalidade. 

A API [Reflect](mdn:/JavaScript/Reference/Global_Objects/Reflect) é projetada para complementar [Proxy](mdn:/JavaScript/Reference/Global_Objects/Proxy). Para qualquer armadilha(`trap`) de `Proxy` , há uma chamada `Reflect` com os mesmos argumentos. Devemos usar essas chamadas para encaminhar operações para os objetos alvo. 

Proxies têm algumas limitações:

- Objetos nativos têm slots internos, o acesso a esses slots não pode ser realizado por meio de proxies. Veja a alternativa acima.
- O mesmo se aplica aos campos privados de uma classe, pois eles são implementados internamento usando slots. Portanto, chamadas de método realizadas por meio de proxies devem ter o objeto alvo como `this` para acessá-los.
- Os testes de igualdade de objetos usando `===` não podem ser interceptados.
- Performance: benchmarks dependem de um motor, mas, em geral, acessar uma propriedade usando um proxy simples leva um pouco mais de tempo. Na prática, isso só é relevante para alguns objetos que são "gargalos". 
