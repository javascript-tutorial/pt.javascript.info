
# Getters e setters de propriedades

Existem dois tipos de propriedades de objeto.

O primeiro tipo são as *propriedades de dados*. Já sabemos como trabalhar com elas. Todas as propriedades que usamos até agora eram propriedades de dados.

O segundo tipo de propriedade é algo novo. É uma *propriedade de acesso*. Elas são, essencialmente, funções que executam ao obter e definir um valor, mas parecem propriedades normais para um código externo.

## Getters e setters

Propriedades de acesso são representadas por métodos "getter" e "setter". Num objeto literal, eles são indicados por `get` e `set`:

```js
let obj = {
  *!*get propName()*/!* {
    // getter, o código executado ao obter obj.propName
  },

  *!*set propName(value)*/!* {
    // setter, o código executado ao definir obj.propName = value
  }
};
```

O getter funciona quando `obj.propName` é lido, o setter -- quando é atribuído.

Por exemplo, temos um objeto `user` com `name` e `surname`:

```js
let user = {
  name: "John",
  surname: "Smith"
};
```

Agora queremos adicionar uma propriedade `fullName`, que deve ser `"John Smith"`. Claro, não queremos copiar e colar informações já existentes, então podemos implementá-la como um acessor:

```js run
let user = {
  name: "John",
  surname: "Smith",

*!*
  get fullName() {
    return `${this.name} ${this.surname}`;
  }
*/!*
};

*!*
alert(user.fullName); // John Smith
*/!*
```

De fora, uma propriedade de acesso parece uma propriedade normal. Essa é a ideia das propriedades de acesso. Nós não *chamamos* `user.fullName` como uma função, nós a *lemos* normalmente: o getter roda nos bastidores.

Por enquanto, `fullName` só tem um getter. Se tentarmos atribuir `user.fullName=`, vai haver um erro:

```js run
let user = {
  get fullName() {
    return `...`;
  }
};

*!*
user.fullName = "Test"; // Erro (a propriedade só tem um getter)
*/!*
```

Vamos corrigir isso adicionando um setter para `user.fullName`:

```js run
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

*!*
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
};

// set fullName é executado com o valor dado.
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
```

Como resultado, temos uma propriedade "virtual" `fullName`. Ela é legível e gravável.

## Descritores de acesso

Os descritores de propriedades de acesso são diferentes dos de propriedades de dados.

Para propriedades de acesso, não existe `value` ou `writable`, mas, em vez disso, existem as funções `get` e `set`.

Ou seja, um descritor de acesso pode ter:

- **`get`** -- uma função sem argumentos, que funciona quando uma propriedade é lida,
- **`set`** -- uma função com um argumento, que é chamada quando a propriedade é definida,
- **`enumerable`** -- igual às propriedades de dados,
- **`configurable`** -- igual às propriedades de dados.

Por exemplo, para criar um acessor `fullName` com `defineProperty`, podemos passar um descritor com `get` e `set`:

```js run
let user = {
  name: "John",
  surname: "Smith"
};

*!*
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
});

alert(user.fullName); // John Smith

for(let key in user) alert(key); // name, surname
```

Observe que uma propriedade pode ser um acessor (tem métodos `get/set`) ou uma propriedade de dados (tem um `value`), mas não as duas coisas.

Se tentarmos fornecer `get` e `value` no mesmo descritor, vai haver um erro:

```js run
*!*
// Erro: Invalid property descriptor.
*/!*
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});
```

## Getters/setters mais espertos

Getters/setters podem ser usados como invólucros sobre valores "reais" de propriedades, pra ganhar mais controle sobre as operações com eles.

Por exemplo, se quisermos proibir nomes muito curtos para `user`, podemos ter um setter `name` e manter o valor numa propriedade separada, `_name`:

```js run
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert("O nome é muito curto, precisa ter pelo menos 4 caracteres");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // O nome é muito curto...
```

Então, o nome é armazenado na propriedade `_name`, e o acesso é feito via getter e setter.

Tecnicamente, código externo consegue acessar o nome diretamente usando `user._name`. Mas existe uma convenção amplamente conhecida de que propriedades começando com um sublinhado `"_"` são internas e não devem ser tocadas de fora do objeto.


## Usando para compatibilidade

Um dos grandes usos dos acessores é que eles permitem assumir o controle sobre uma propriedade de dados "normal" a qualquer momento, substituindo-a por um getter e um setter e ajustando seu comportamento.

Imagine que começamos a implementar objetos de usuário usando as propriedades de dados `name` e `age`:

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

let john = new User("John", 25);

alert( john.age ); // 25
```

...Mas, mais cedo ou mais tarde, as coisas podem mudar. Em vez de `age`, podemos decidir armazenar `birthday`, porque é mais preciso e conveniente:

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let john = new User("John", new Date(1992, 6, 1));
```

Agora, o que fazer com o código antigo que ainda usa a propriedade `age`?

Podemos tentar encontrar todos esses lugares e corrigi-los, mas isso leva tempo e pode ser difícil se esse código for usado por muitas outras pessoas. E, além disso, `age` é algo bom de se ter em `user`, não é?

Vamos mantê-lo.

Adicionar um getter para `age` resolve o problema:

```js run no-beautify
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

*!*
  // age é calculado a partir da data atual e do birthday
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
*/!*
}

let john = new User("John", new Date(1992, 6, 1));

alert( john.birthday ); // birthday está disponível
alert( john.age );      // ...assim como age
```

Agora o código antigo também funciona e ganhamos uma boa propriedade adicional.
