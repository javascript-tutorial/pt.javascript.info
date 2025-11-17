# Referências e cópias de objetos

Uma das diferenças fundamentais entre objetos e primitivos é que objetos são armazenados e copiados por "referência", enquanto valores primitivos: strings, números, booleanos, etc -- são sempre copiados "como um valor integral".

Isso é fácil de entender se olharmos um pouco por debaixo dos panos do que acontece quando copiamos um valor.

Vamos começar com um primitivo, como uma string.

Aqui fazemos uma cópia de `message` para `phrase`

```js
let message = "Hello!";
let phrase = message;
```

Como resultado temos duas variáveis independentes, cada uma armazenando a string `"Hello!"`

![](variable-copy-value.svg)

Um resultado bastante óbvio, certo?

Objetos não são assim.

**Uma variável atribuída a um objeto armazena não o próprio objeto, mas sim o seu "endereço em memória" -- em outras palavras "uma referência" a ele.**

Vamos analisar o exemplo dessa variável

```js
let user = {
  name: "John",
};
```

E aqui é como ela está realmente armazenada na memória

![](variable-contains-reference.svg)

O objeto é armazenado em algum lugar na memória (à direita da imagem), enquanto a variável `user` (à esquerda) possui uma referência a ele.

<<<<<<< HEAD
Podemos pensar em uma variável de objeto, `user`, como uma folha de papel com o endereço do objeto escrito nela.
=======
We may think of an object variable, such as `user`, like a sheet of paper with the address of the object on it.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

Quando realizamos ações com o objeto, por exemplo, acessar a propriedade `user.name`, o motor do Javascript verifica o que está nesse endereço e realiza a operação no objeto real.

Agora está aqui o motivo pelo qual isso é importante:

**Quando uma variável de objeto é copiada, a referência é copiada, mas o próprio objeto não é duplicado**

Por exemplo:

```js no-beautify
let user = { name: "John" };

let admin = user; // copia a referência
```

Agora temos duas variáveis, cada uma armazenando uma referência para o mesmo objeto:

![](variable-copy-reference.svg)

Como você pode ver, ainda há apenas um objeto, porém agora com duas variáveis que o referenciam.

Podemos usar qualquer uma das variáveis para acessar o objeto e modificar o seu conteúdo:

```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // alterado pela referência "admin"
*/!*

alert(*!*user.name*/!*); // 'Pete', alterações são vistas a partir da referência "user"
```

É como se tivéssemos um armário com duas chaves e usado uma delas (`admin`) para abri-lo e fazer alterações. Então, se depois usarmos a outra chave (`user`), ainda estaremos abrindo o mesmo armário e podemos acessar o conteúdo alterado.

## Comparação por referência

Dois objetos são iguais apenas se possuem a mesma referência.

Por exemplo, aqui `a` e `b` faz referência ao mesmo objeto, por isso eles são iguais:

```js run
let a = {};
let b = a; // copia a referência

alert(a == b); // true, ambas as variáveis referenciam o mesmo objeto
alert(a === b); // true
```

E aqui, dois objetos independentes não são iguais, apesar deles pareceram iguais (ambos estão vazios):

```js run
let a = {};
let b = {}; // dois objetos independentes

alert(a == b); // false
```

Para comparações como `obj1 > obj2` ou para uma comparação com um primitivo `obj == 5`, os objetos são convertidos em primitivos. Vamos estudar como as conversões de objetos funcionam muito em breve, mas, para ser honesto, tais comparações são necessárias muito raramente - geralmente, elas surgem como resultado de um erro de programação.

<<<<<<< HEAD
````smart header="Objetos com const podem ser modificados"
Um efeito colateral importante de armazenar objetos como referência é que um objeto declarado como `const` *pode* ser modificado

Por exemplo:
=======
````smart header="Const objects can be modified"
An important side effect of storing objects as references is that an object declared as `const` *can* be modified.

For instance:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
const user = {
  name: "John"
};

*!*
user.name = "Pete"; // (*)
*/!*

alert(user.name); // Pete
```

Pode parecer que a linha `(*)` causaria um erro, mas não causa. O valor de `user` é constante, ele deve sempre referenciar o mesmo objeto, porém as propriedades desse objeto são livres para mudar.

Em outras palavras, o `const user` gera um erro apenas se tentarmos definir `user=...` como um todo.

Dito isto, se realmente precisamos tornar as propriedades do objeto constantes, também é possível, porém usando métodos totalmente diferentes. Vamos mencionar isto no capítulo <info:property-descriptors>.
````

<<<<<<< HEAD
## Clonando e mesclando, Object.assign [#cloning-and-merging-object-assign]
=======
## Cloning and merging, Object.assign [#cloning-and-merging-object-assign]

So, copying an object variable creates one more reference to the same object.

But what if we need to duplicate an object?

We can create a new object and replicate the structure of the existing one, by iterating over its properties and copying them on the primitive level.

Like this:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // the new empty object

// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}
*/!*

// now clone is a fully independent object with the same content
clone.name = "Pete"; // changed the data in it

alert( user.name ); // still John in the original object
```

We can also use the method [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).

The syntax is:

```js
Object.assign(dest, ...sources)
```

- The first argument `dest` is a target object.
- Further arguments is a list of source objects.

It copies the properties of all source objects into the target `dest`, and then returns it as the result.

For example, we have `user` object, let's add a couple of permissions to it:

```js run
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);
*/!*

// now user = { name: "John", canView: true, canEdit: true }
alert(user.name); // John
alert(user.canView); // true
alert(user.canEdit); // true
```

If the copied property name already exists, it gets overwritten:

```js run
let user = { name: "John" };

Object.assign(user, { name: "Pete" });

alert(user.name); // now user = { name: "Pete" }
```

We also can use `Object.assign` to perform a simple object cloning:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*

alert(clone.name); // John
alert(clone.age); // 30
```

Here it copies all properties of `user` into the empty object and returns it.

There are also other methods of cloning an object, e.g. using the [spread syntax](info:rest-parameters-spread) `clone = {...user}`, covered later in the tutorial.

## Nested cloning

Until now we assumed that all properties of `user` are primitive. But properties can be references to other objects.

Like this:
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182
```

Now it's not enough to copy `clone.sizes = user.sizes`, because `user.sizes` is an object, and will be copied by reference, so `clone` and `user` will share the same sizes:

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true, same object

// user and clone share sizes
user.sizes.width = 60;    // change a property from one place
alert(clone.sizes.width); // 60, get the result from the other one
```

To fix that and make `user` and `clone` truly separate objects, we should use a cloning loop that examines each value of `user[key]` and, if it's an object, then replicate its structure as well. That is called a "deep cloning" or "structured cloning". There's [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) method that implements deep cloning.


### structuredClone

The call `structuredClone(object)` clones the `object` with all nested properties.

Here's how we can use it in our example:

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

*!*
let clone = structuredClone(user);
*/!*

alert( user.sizes === clone.sizes ); // false, different objects

// user and clone are totally unrelated now
user.sizes.width = 60;    // change a property from one place
alert(clone.sizes.width); // 50, not related
```

The `structuredClone` method can clone most data types, such as objects, arrays, primitive values.

It also supports circular references, when an object property references the object itself (directly or via a chain or references).

For instance:

```js run
let user = {};
// let's create a circular reference:
// user.me references the user itself
user.me = user;

let clone = structuredClone(user);
alert(clone.me === clone); // true
```

As you can see, `clone.me` references the `clone`, not the `user`! So the circular reference was cloned correctly as well.

Although, there are cases when `structuredClone` fails.

For instance, when an object has a function property:

```js run
// error
structuredClone({
  f: function() {}
});
```

Function properties aren't supported.

To handle such complex cases we may need to use a combination of cloning methods, write custom code or, to not reinvent the wheel, take an existing implementation, for instance [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) from the JavaScript library [lodash](https://lodash.com).

## Summary
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

Sim, copiar uma variável de objeto cria mais uma referência para o mesmo objeto.

Mas e se precisamos duplicar um objeto?

<<<<<<< HEAD
Podemos criar um novo objeto e replicar a estrutura existente, iterando sobre suas propriedades e copiando-as no nível primitivo.

Como neste exemplo:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // o novo objeto vazio

// vamos copiar todas as propriedades de usuário para ele
for (let key in user) {
  clone[key] = user[key];
}
*/!*

// agora clone é um objeto totalmente independente com o mesmo conteúdo
clone.name = "Pete"; // altera o dado nele

alert( user.name ); // Ainda será John no objeto original
```

Também podemos usar o método [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).

A sintaxe é:

```js
Object.assign(dest, ...sources);
```

- O primeiro argumento `dest` é um objeto destino.
- Os demais argumentos são uma lista de objetos de origem.

Ele copia as propriedades de todos os objetos de origem para o destino `dest`, e em seguida, retorna-o como resultado.

Por exemplo, temos o objeto `user`, vamos adicionar um par de permissões a ele:

```js run
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// copia todas as propriedades de permissions1 e permissions2 para user
Object.assign(user, permissions1, permissions2);
*/!*

// agora user = { name: "John", canView: true, canEdit: true }
alert(user.name); // John
alert(user.canView); // true
alert(user.canEdit); // true
```

Se o nome da propriedade copiada já existir, ela será sobrescrita.

```js run
let user = { name: "John" };

Object.assign(user, { name: "Pete" });

alert(user.name); // now user = { name: "Pete" }
```

Também podemos usar `Object.assign` para realizar uma clonagem simples de objeto:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*

alert(clone.name); // John
alert(clone.age); // 30
```

Aqui ele copia todas as propriedades de `user` para o objeto vazio e o retorna.

Também há outros métodos de clonar um objeto, por exemplo, usando a [sintaxe de spread](info:rest-parameters-spread) `clone = {...user}`, abordado mais tarde no tutorial.

## Clonagem aninhada

Até agora, assumimos que todas as propriedades de `user` são primitivas. No entanto, propriedades podem ser referências a outros objetos.

Como neste exemplo:

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50,
  },
};

alert(user.sizes.height); // 182
```

Agora, não é suficiente copiar `clone.sizes = user.sizes`, porque `user.sizes` é um objeto e será copiado por referência, portanto `clone` e `user` irão compartilhar o mesmo objeto `sizes`:

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50,
  },
};

let clone = Object.assign({}, user);

alert(user.sizes === clone.sizes); // true, mesmo objeto

// user e clone compartilham sizes
user.sizes.width = 60; // altera uma propriedade de um local
alert(clone.sizes.width); // 60, obtém o resultado do outro
```

Para corrigir isso e tornar `user` e `clone` objetos verdadeiramente separados, devemos usar um loop de clonagem que examina cada valor de `user[key]` e, se for um objeto, replica sua estrutura também. Isto é chamado "clonagem profunda" ou "clonagem estruturada". Existe o método [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) que implementa a clonagem profunda.

### structuredClone

A chamada `structuredClone(object)` clona o `object` com todas as propriedades aninhadas.

Aqui está com podemos usá-lo em nosso exemplo:

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

*!*
let clone = structuredClone(user);
*/!*

alert( user.sizes === clone.sizes ); // false, objetos diferentes

// Agora, user e clone são completamente independentes
user.sizes.width = 60;    // altera uma propriedade de um local
alert(clone.sizes.width); // 50, não relacionado
```

O método `structuredClone` pode clonar a maioria dos tipos de dados, como objetos, arrays e valores primitivos.

Ele também oferece suporte a referências circulares, quando uma propriedade de um objeto referencia o próprio objeto (diretamente ou através de uma cadeia de referências)

Por exemplo:

```js run
let user = {};
// vamos criar uma referência circular:
// user.me references the user itself
user.me = user;

let clone = structuredClone(user);
alert(clone.me === clone); // true
```

Como você pode ver `clone.me` faz referência a `clone`, não a `user`! Então a referência circular foi clonada corretamente também.

No entanto, existem casos em que `structuredClone` falha.

Por exemplo, quando um objeto possui uma propriedade que é uma função:

```js run
// error
structuredClone({
  f: function () {},
});
```

Propriedades que são funções não são suportadas.

Para lidar com casos complexos, podemos precisar usar uma combinação de métodos de clonagem, escrever código personalizado ou, para não inventar a roda, usar uma implementação existente, como [\_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) da biblioteca JavaScript [lodash](https://lodash.com).

## Resumo

Objetos são atribuídos e copiados por referência. Em outras palavras, uma variável armazena não o "valor do objeto", mas uma "referência" (endereço em memória) para o valor. Portanto, copiar a variável ou passá-la como argumento de uma função copia essa referência, não o objeto em si.

Todas as operações feitas através de referências copiadas (como adição/remoção de propriedades) são realizadas no mesmo objeto único.

Para fazer uma "cópia real" (um clone) podemos usar `Object.assign` caracterizando a chamada "cópia rasa" (objetos aninhados são copiados por referência) ou uma função `structuredClone` de "clonagem profunda" ou usar uma implementação de clonagem personalizada, como [\_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
=======
To make a "real copy" (a clone) we can use `Object.assign` for the so-called "shallow copy" (nested objects are copied by reference) or a "deep cloning" function `structuredClone` or use a custom cloning implementation, such as [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
