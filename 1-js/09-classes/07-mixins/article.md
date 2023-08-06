# Mixins

Em JavaScript, só se pode herdar de um único objeto. Pode apenas existir um único `[[Prototype]]` para um objeto. E uma classe pode estender apenas uma outra classe.

Porém, algumas vezes isso parece limitante. Por exemplo, temos uma classe `StreetSweeper` e uma classe `Bicycle`, e queremos fazer uma mistura delas: uma classe `StreetSweepingBicycle`;

Ou temos uma classe `User` e uma classe `EventEmitter` que implementa a geração de eventos, e gostaríamos de adicionar a funcionalidade de `EventEmitter` à `User`, para que nossos usuários possam emitir eventos.

Existe um conceito que nos pode ajudar aqui, chamado "mixins".

Como definido no Wikipedia, um [mixin](https://en.wikipedia.org/wiki/Mixin) é uma classe contendo métodos que podem ser usados por outras classes sem a necessidade de herdar dela.

Em outras palavras, um *mixin* fornece métodos que implementam um determinado comportamento, mas não é utilizado sozinho, nós o utilizamos para adicionar o comportamento a outras classes.

## Um exemplo de mixin

A maneira mais simples de implementar um mixin em JavaScript é criando um objeto com métodos úteis, para que possamos facilmente mesclá-los em um prototype de outra classe.

Por exemplo, aqui o mixin `sayHiMixin` é usado para adicionar alguma "fala" para `User`:

```js run
*!*
// mixin
*/!*
let sayHiMixin = {
  sayHi() {
    alert(`Olá ${this.name}`);
  },
  sayBye() {
    alert(`Adeus ${this.name}`);
  }
*!*
// Utilização:
*/!*
class User {
  constructor(name) {
    this.name = name;
  }
}

// copia os métodos
Object.assign(User.prototype, sayHiMixin);

// agora User pode dizer oi
new User("Dude").sayHi(); // Olá Dude!
```

Não existe herança, mas uma simples cópia de métodos. Portanto, `User` pode herdar de outra classe e também incluir o mixin para "misturar" (mix-in) os métodos adicionais, assim:

```js
class User extends Person {
  // ...
}

Object.assign(User.prototype, sayHiMixin);
```

Mixins podem usar herança dentro deles mesmos.

Por exemplo, aqui `sayHiMixin` herda de `sayMixin`:

```js run
let sayMixin = {
  say(phrase) {
    alert(phrase);
  }
};

let sayHiMixin = {
  __proto__: sayMixin, // (ou poderíamos usar Object.setPrototypeOf para definir o prototype aqui)

  sayHi() {
    *!*
    // chama o método pai
    */!*
    super.say(`Olá ${this.name}`); // (*)
  },
  sayBye() {
    super.say(`Adeus ${this.name}`); // (*)
  }
};

class User {
  constructor(name) {
    this.name = name;
  }
}
// copia os métodos
Object.assign(User.prototype, sayHiMixin);

// agora User pode dizer oi
new User("Dude").sayHi(); // Olá Dude!
```

Observe que a chamada do método pai `super.say()` por `sayHiMixin` (nas linhas marcadas com `(*)`) procura pelo método no prototype desse mixin, não na classe.

Aqui está o diagrama (veja a parte direita):

![](mixin-inheritance.svg)

Isso porque os métodos `sayHi` e `sayBye` foram inicialmente criados em `sayHiMixin`. Portanto, mesmo que tenham sido copiados, suas propriedades internas `[[HomeObject]]` referenciam a `sayHiMixin`, como mostrado na figura acima.

Como `super` procura por métodos pais em `[[HomeObject]].[[Prototype]]`, isso significa que procura em `sayHiMixin.[[Prototype]]`.

## EventMixin

Vamos criar um mixin para a vida real.

Uma característica importante de muitos objetos do navegador (por exemplo) é que eles podem gerar eventos. Eventos são uma ótima maneira de "transmitir informação" para qualquer um que a quiser. Então, vamos criar um mixin que nos permita facilmente adicionar funções relacionadas a eventos a qualquer classe/objeto. 

- O mixin vai fornecer um método `.trigger(name, [...data])` para "gerar um evento" quando algo importante acontecer com ele. O argumento `name` é o nome do evento, e é opcionalmente seguido de argumentos provendo dados do evento.
- E também o método `.on(name, handler)` que adiciona a função `handler` como ouvinte de eventos com o dado nome. Ela será chamada quando um evento com o dado `name` disparar, e irá obter os argumentos da chamada de `.trigger`
- ...E o método `.off(name, handler)` que remove o ouvinte `handler`.

Após adicionar o mixin, um objeto `user` será capaz de gerar um evento `"login"` quando o visitante fizer login. Um outro objeto, digamos, `calendar` pode querer ouvir por tais eventos para carregar o calendário para a pessoa logada.

Ou, um `menu` pode gerar o evento `"select"` quando um item do menu for selecionado`, e outros objetos podem atribuir manipuladores (handlers) para reagir àquele evento. E assim por diante.

Aqui está o código:

```js run
let eventMixin = {
  /**
   * Se inscreve ao evento, utilização:
   *  menu.on('select', function(item) { ... }
  */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  },

  /**
   * Cancela a inscrição, utilização:
   *  menu.off('select', handler)
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName];
    if (!handlers) return;
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        handlers.splice(i--, 1);
      }
    }
  },

  /**
   * Gera um evento com o nome e dados providenciados
   *  this.trigger('select', data1, data2);
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers?.[eventName]) {
      return; // sem manipuladores (handlers) para esse nome de evento
    }

    // chama os manipuladores de eventos (handlers)
    this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
  }
};
```


- `.on(eventName, handler)` -- atribui a função `handler` para ser executada quando o evento com aquele nome ocorre. Tecnicamente, existe uma propriedade `_eventHandlers` que armazena um array de manipuladores de evento para cada nome de evento, e o método apenas adiciona o manipulador à lista.
- `.off(eventName, handler)` -- remove a função da lista de manipuladores de evento.
- `.trigger(eventName, ...args)` -- gera o evento: todos os manipuladores de eventos de `_eventHandlers[eventName]` são chamados, com a lista de argumentos `...args`.

Utilização:

```js run
// Cria uma classe
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}
// Adiciona o mixin com os métodos relacionados aos eventos.
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

// adiciona um manipulador de eventos, para ser chamado na seleção:
*!*
menu.on("select", value => alert(`Valor selecionado: ${value}`));
*/!*

// dispara o evento => o manipulador de evento acima é executado e mostra:
// Valor selecionado: 123
menu.choose("123");
```

Agora, se quisermos que qualquer código reaja a uma seleção do menu, podemos ouvir com `menu.on(...)`.

E o mixin `eventMixin` facilita a adição do tal comportamento para tantas classes quanto quisermos, sem interferir na cadeia de herança.

## Conclusão

*Mixin* -- é um termo genérico de programação orientada a objetos: uma classe que contém métodos para outras classes.

Algumas outras linguagens permitem herança múltipla. JavaScript não suporta herança múltipla, porém os mixins podem ser implementados copiando métodos para prototype.

Podemos usar mixins como uma maneira de incrementar uma classe adicionando múltiplos comportamentos, como manipulação de eventos como vimos acima.

Mixins podem se tornar num ponto de conflito se eles acidentalmente sobrescreverem métodos existentes na classe. Então geralmente deve-se pensar bem sobre a nomenclatura dos métodos de um mixin, para minimizar a probabilidade disso acontecer.
