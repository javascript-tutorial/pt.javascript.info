
# Sinalizadores e descritores de propriedades

Como sabemos, objetos podem armazenar propriedades.

Até agora, para nós, uma propriedade era um simples par "chave-valor". Mas uma propriedade de objeto é na verdade uma coisa mais flexível e poderosa.

Neste capítulo, nós vamos estudar opções de configurações adicionais, e no próximo nós vamos ver como invisivelmente tornar elas em funções getter/setter.

## Sinalizadores de propriedade

Propriedades de objeto, além do **`valor`** têm três atributos especiais (também chamados "sinalizadores"):

- **`gravável`** -- se `true`, o valor pode ser alterado, caso contrário, é apenas-leitura.
- **`enúmeravel`** -- se `true`, então pode ser listado em loops, caso contrário, não pode.
- **`configurável`** -- se `true`, a propriedade pode ser deletada e seus atributos modificados, caso contrário não.

Nós não vimos eles ainda, porque geralmente eles não aparecem. Quando criamos uma propriedade "do jeito comum", todos eles são `true`. Mas nós também podemos mudá-los a qualquer hora.

Primeiro, vamos ver como obter esses sinalizadores.

O método [Object.getOwnPropertyDescriptor](mdn:js/Object/getOwnPropertyDescriptor) nos permite consultar a informação *completa* sobre a propriedade.

A sintaxe é:
```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

`obj`
: O objeto do qual vamos obter a informação.

`propertyName`
: O nome da propriedade.

O valor retornado é também chamado de objeto "descritor de propriedade": ele contém o valor e todos os sinalizadores.

Por exemplo:

```js run
let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/* descritor de propriedade:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

Para mudar os sinalizadores, nós podemos usar o [Object.defineProperty](mdn:js/Object/defineProperty).

A sintaxe é:

```js
Object.defineProperty(obj, propertyName, descriptor)
```

`obj`, `propertyName`
: O objeto e a propriedade nos quais atuar.

`descriptor`
: Descritor de propriedade de objeto a aplicar.

Se a proprieade existe, `defineProperty` atualiza o seu sinalizador. Caso contrário, é criada uma propriedade com os sinalizadores e valor dados; neste caso, se um sinalizador não é fornecido, seu valor é assumido como `false`.

Por exemplo, aqui a propriedade `name` é criada com todos os sinalizadores a falso:

```js run
let user = {};

*!*
Object.defineProperty(user, "name", {
  value: "John"
});
*/!*

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "John",
*!*
  "writable": false,
  "enumerable": false,
  "configurable": false
*/!*
}
 */
```

Compare isso com o `user.name` "criado normalmente" acima: agora todos os sinalizadores são falsos. Se não é isso que queremos, então é melhor configurá-los como `true` no `descriptor`.  

Agora vamos ver os efeitos dos sinalizadores, por exemplo:

## Não-gravável

Vamos deixar `user.name` não-gravável (não pode ser reatribuído) alterando o sinalizador `writable`:

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
*!*
  writable: false
*/!*
});

*!*
user.name = "Pete";
// Error: Cannot assign to read only property 'name'... (Erro: não é possível a atribuição à variável de apenas leitura 'name'...)
*/!*
```

Agora, ninguém pode alterar o nome do nosso usuário, a não ser que eles apliquem seus próprios `defineProperty` para sobrescrever o nosso.

```smart header="Erros aparecem apenas em strict mode"
No modo não-estrito, os erros não ocorrem quando escrevendo em propriedades não-graváveis, etc. Mas a operação ainda assim não terá sucesso. Ações que violam os sinalizadores são apenas ignoradas silenciosamentes em modo não-estrito. 
```

Aqui está o mesmo exemplo, mas a propriedade é criada do zero.

```js run
let user = { };

Object.defineProperty(user, "name", {
*!*
  value: "John",
  // para novas proprieades, precisamos explicitamente de listar o que é true
  enumerable: true,
  configurable: true
*/!*
});

alert(user.name); // John
user.name = "Alice"; // Erro
```


## Não-enumerável

Agora, vamos adicionar um `toString` customizado ao `user`.

Normalmente, um `toString` embutido em objetos é não-enumerável, e não aparece em `for..in`. Mas se nós adicionarmos um `toString` por nós mesmos, então por padrão ele aparece em `for..in`, desta forma:

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

// Por padrão, ambas as nossas propriedades são listadas:
for (let key in user) alert(key); // name, toString
```

Se nós não gostarmos disso, então podemos configurar `enumerable:false`. Então ela não vai aparecer no loop `for..in`, tal como as propriedades embutidas:

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

Object.defineProperty(user, "toString", {
*!*
  enumerable: false
*/!*
});

*!*
// Agora nosso toString desaparece:
*/!*
for (let key in user) alert(key); // name
```

Propriedades não-enumeráveis também são excluídas de `Object.keys`:

```js
alert(Object.keys(user)); // name
```

## Não-configurável

O sinalizador não-configurável (`configurable:false`) algumas vezes está predefinido para objetos e propriedades embutidas.

Uma propriedade não-configurável não pode ser deletada.

Por exemplo, `Math.PI` é não-gravável, não-enumerável e não-configurável:

```js run
let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/
```
Então, um programador é impossibilitado de mudar o valor de `Math.PI` ou sobrescrevê-lo.

```js run
Math.PI = 3; // Erro

// deletar Math.PI também não irá funcionar
```

Deixar uma propriedade não-configurável, é um caminho só de ida. Nós não podemos alterar isso novamente com `defineProperty`.

Para ser preciso, a não-configurabilidade impões várias restrições a `defineProperty`:
1. Não poder mudar o sinalizador `configurable`.
2. Não poder mudar o sinalizador `enumerable`.
3. Não poder mudar `writable: false` para `true` (o contrário funciona).
4. Não poder mudar `get/set` por um acessador de propriedade (mas pode atribuí-los se ausente).

**A ideia de "configurable: false" é para prevenir a mudança de sinalizadores de propriedades e a sua eliminação, enquanto permite alterar o seu valor.**

Aqui `user.name` é não-configurável, mas nós ainda podemos alterá-lo (pois é gravável):

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  configurable: false
});

user.name = "Pete"; // funciona corretamente
delete user.name; // Erro
```

E aqui nós deixamos `user.name` uma constante "selada para sempre":

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false,
  configurable: false
});

// não será possível alterar user.name ou os seus sinalizadores
// nada disso irá funcionar
user.name = "Pete";
delete user.name;
Object.defineProperty(user, "name", { value: "Pete" });
```


## Object.defineProperties

Existe um método [Object.defineProperties(obj, descriptors)](mdn:js/Object/defineProperties) que permite definir várias propriedades de uma vez.

A sintaxe é:

```js
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
```

Por exemplo:

```js
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
```

Então, nós podemos configurar várias propriedades de uma vez.

## Object.getOwnPropertyDescriptors

Para obter todos os sinalizadores de propriedade de uma vez, nós podemos usar o método [Object.getOwnPropertyDescriptors(obj)](mdn:js/Object/getOwnPropertyDescriptors).

Juntamente com `Object.defineProperties` isso pode ser usado como um jeito "incluindo-sinalizadores" de clonar objetos:

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

Normalmente quando nós clonamos um objeto, nós usamos uma atribuição para copiar propriedades, desta forma:

```js
for (let key in user) {
  clone[key] = user[key]
}
```

...Mas isso não copia os sinalizadores. Assim, se nós quisermos um clone "melhor" então é preferível `Object.defineProperties`.

Outra diferença é que `for..in` ignora propriedades simbólicas, mas `Object.getOwnPropertyDescriptors` returna *todas* as propriedades descritoras, incluindo as simbólicas.

## Selando um objeto globalmente

Descritores de propriedade atuam no mesmo nível de propriedades individuais.

Também existem métodos que limitam o acesso ao objeto *inteiro*:

[Object.preventExtensions(obj)](mdn:js/Object/preventExtensions)
: Proíbe a adição de novas propriedades ao objeto.

[Object.seal(obj)](mdn:js/Object/seal)
: Proíbe a adição/remoção de propriedades. Coloca `configurable: false` para todas as propriedades existentes.

[Object.freeze(obj)](mdn:js/Object/freeze)
: Proíbe adicionar/remover/alterar propriedades. Coloca `configurable: false, writable: false` para todas as propriedades existentes.

E também existem testes para eles:

[Object.isExtensible(obj)](mdn:js/Object/isExtensible)
: Retorna `false` se a adição de propriedades é proibida, caso contrátio `true`.

[Object.isSealed(obj)](mdn:js/Object/isSealed)
: Retorna `true` se adição/remoção de propriedades são proibidas, e todas as propriedades existentes são `configurable: false`.

[Object.isFrozen(obj)](mdn:js/Object/isFrozen)
: Retorna `true` se adição/remoção/alteração de propriedades são proibidas, e todas as propriedades atuais são `configurable: false, writable: false`.

Estes métodos são raramentes usados na prática.
