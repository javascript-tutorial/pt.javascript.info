
# Objetos

Como sabemos, pelo capítulo <info:types>, existem sete tipos de dados em JavaScript. Seis deles são chamados de "primitivos", porque os seus valores apenas contêm uma única coisa (seja ela uma cadeia-de-carateres [*string*], um número, ou o que for).

Em contraste, objetos são empregues para armazenar por meio de uma chave, coleções de vários dados e entidades mais complexas. Em JavaScript, objetos penetram em quase todos os aspetos da linguagem. Portanto, devemos primeiro compreendê-los antes de nos envolvermos detalhadamente em algo mais.

Um objeto pode ser criado por chavetas `{…}`, com uma lista opcional de *propriedades*. Uma propriedade é um par "key: value" (chave: valor), onde `key` é uma *string* (também chamada de "nome da propriedade"), e `value` pode ser qualquer coisa.

Podemos imaginar um objeto como um fichário com ficheiros assinados. Cada peça de informação, é armazenada no seu ficheiro ligada a uma chave. É fácil encontrar um ficheiro através do seu nome, ou adicionar/remover um ficheiro.

![](object.svg)

Um objeto vazio ("fichário vazio"), pode ser criado por uma de duas sintaxes:

```js
let user = new Object(); // sintaxe de "construtor de objetos"
let user = {};  // sintaxe de "objeto literal"
```

![](object-user-empty.svg)

Geralmente, são utilizadas as chavetas `{...}`. Essa declaração é chamada de *objeto literal*.

## Literais e propriedades

Podemos imediatamente colocar algumas propriedades dentro das `{...}` como pares "chave: valor" (*key: value*):

```js
let user = {     // um objeto
  name: "John",  // na chave "name" armazene o valor "John"
  age: 30        // na chave "age" armazene o valor 30
};
```

Uma propriedade, tem uma chave (*key* - também conhecida por "nome" ou "identificador") antes dos dois-pontos `":"` e um valor à sua direita.

No objeto `user`, existem duas propriedades:

1. A primeira, tem o nome `"name"` e o valor `"John"`.
2. A segunda, tem o nome `"age"` e o valor `30`.

O objeto `user` resultante, pode ser imaginado como um fichário com dois ficheiros assinados com as etiquetas "*name*" e "*age*".

![user object](object-user.svg)

Podemos adicionar, remover e ler ficheiros dele a qualquer altura.

Valores de propriedades podem ser acedidos usando a notação por ponto (*dot notation*):

```js
// obtenha os campos do objeto:
alert( user.name ); // John
alert( user.age ); // 30
```

O valor pode ser de qualquer tipo. Vamos adicionar um booleano:

```js
user.isAdmin = true;
```

![user object 2](object-user-isadmin.svg)

Para remover uma propriedade, podemos usar o operador `delete`:

```js
delete user.age;
```

![user object 3](object-user-delete.svg)

Podemos também usar nomes de propriedades com múltiplas palavras, mas aí eles têm de estar entre aspas:

```js
let user = {
  name: "John",
  age: 30,
  "likes birds": true  // "likes birds" ("gosta de pássaros") - o nome de propriedade com múltiplas palavras tem de estar entre aspas
};
```

![](object-user-props.svg)

A última propriedade da lista pode terminar com uma vírgula:

```js
let user = {
  name: "John",
  age: 30*!*,*/!*
}
```

Esta é chamada de vírgula à direita (*trailing comma*) ou "vírgula pendurada" (*hanging comma*). Ela facilita o adicionar/remover/mover propriedades, porque todas as linhas serão semelhantes (as propriedades são separadas por vírgulas).

## Parênteses retos

Para propriedades com múltiplas palavras, o acesso por ponto não funciona:

```js run
// isto daria um erro de sintaxe
user.likes birds = true
```

Isto, porque o ponto requere que a chave (*key*) seja um identificador de variável válido. Isto é: sem espaços e outras restrições.

Existe uma alternativa, a "notação por parênteses retos", que funciona com qualquer *string* (cadeia-de-carateres):


```js run
let user = {};

// cria
user["likes birds"] = true;

// lê
alert(user["likes birds"]); // true ('verdadeiro')

// remove
delete user["likes birds"];
```

Agora, tudo está bem. Por favor, verifique se a *string* dentro dos parênteses retos está própriamente encerrada entre aspas (qualquer tipo de aspas serve).

Os parênteses retos, também fornecem uma forma de se obter o nome de uma propriedade como resultado de uma expressão -- em vez de uma *string* literal  -- como a partir de uma variável, a exemplo:

```js
let key = "likes birds";

// o mesmo que 'user["likes birds"] = true;'
user[key] = true;
```

Aqui, a variável `key` pode ser calculada em tempo de execução (*run-time*) ou depender de uma entrada pelo utilizador (*user input*). E depois a utilizamos para aceder à propriedade. Isso, dá-nos um grande grau de flexibilidade.

Por exemplo:

```js run
let user = {
  name: "John",
  age: 30
};

let key = prompt("O que quer saber acerca do utilizador?", "name");

// aceda à variável
alert( user[key] ); // John (se a entrada tiver sido "name")
```

A notação por ponto não pode ser usada de forma semelhante:

```js run
let user = {
  name: "John",
  age: 30
};

let key = "name";
alert( user.key ) // undefined
```

### Propriedades computadas

Podemos utilizar os parênteses retos num object literal. Chamam-se de *propriedades computadas*.

Por exemplo:

```js run
let fruit = prompt("Que fruta comprar?", "apple");

let bag = {
*!*
  [fruit]: 5, // o nome da propriedade é obtido por meio da variável 'fruit'
*/!*
};

alert( bag.apple ); // 5 if fruit="apple"
```

O significado de uma propriedade computada é simples: `[fruit]` diz que o nome da propriedade é obtido por meio de `fruit`.

Assim, se um visitante inserir `"apple"`, `bag` se tornará em `{apple: 5}`.

Essencialmente, isso é o mesmo que:
```js run
let fruit = prompt("Que fruta comprar?", "apple");
let bag = {};

// obtenha o nome da propriedade por meio da variável fruit
bag[fruit] = 5;
```

...Mas, tem uma melhor apresentação.

Podemos usar expressões mais complexas dentro dos parênteses retos:

```js
let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};
```

Parênteses retos, são mais poderosos que a notação por ponto. Eles permitem quaisquer nomes de propriedades e variáveis. Mas, eles também envolvem mais trabalho para escrever.

Assim, a maior parte as vezes, quando nomes de propriedades são conhecidos e simples, o ponto é utilizado. E, se precisarmos de algo mais complexo, mudamos para os parênteses retos.

````smart header="Reserved words are allowed as property names"
Uma variável, não pode ter um nome igual a uma das palavras reservadas ('keywords') da linguagem, como "for", "let", "return" etc.

Mas, para uma propriedade de um objeto, não existe tal restrição. Qualquer nome é aceitável:

```js run
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6
```

Basicamente, qualquer nome é permitido, mas existe um especial: `"__proto__"`, que tem um tratamento particular por razões históricas. Por exemplo, a ele não podemos atribuir um valor não-objeto:

```js run
let obj = {};
obj.__proto__ = 5;
alert(obj.__proto__); // [object Object], não resultou como esperado
```

Como vemos pelo código, a atribuição do primitivo `5` é ignorada.

Isso, pode se tornar numa fonte de erros ('bugs') e até de vulnerabilidades, se pretendermos armazenar pares chave-valor arbitrários num objeto, e permitir a um visitante especificar as chaves ('keys').

Nesse caso, o the visitante pode escolher "__proto__" como chave, e a lógica de atribuição estará arruinada (como se mostra acima).

Existe uma forma de fazer os objetos tratarem `__proto__` como uma propriedade regular, que analisaremos mais adiante, mas primeiro precisamos de saber mais sobre objetos.
Existe também outra estrutura de dados [Map](info:map-set-weakmap-weakset), que aprenderemos no capítulo <info:map-set-weakmap-weakset>, que suporta chaves arbitrárias.
````

## Abreviação do valor da propriedade

Em código real, frequentemente empregamos variáveis semelhantes a valores como nomes de propriedades.

For instance:

```js run
function makeUser(name, age) {
  return {
    name: name,
    age: age
    // ...outras propriedades
  };
}

let user = makeUser("John", 30);
alert(user.name); // John
```

No exemplo acima, propriedades têm os mesmos nomes que as variáveis. O caso prático (*use-case*) de construir uma propriedade com base numa variável é tão comum, que existe uma especial *abreviação do valor da propriedade* (*property value shorthand*) para a tornar mais curta.

Em vez de `name:name`, podemos simplesmente escrever `name`, como abaixo:

```js
function makeUser(name, age) {
*!*
  return {
    name, // o mesmo que name: name
    age   // o mesmo que age: age
    // ...
  };
*/!*
}
```

Podemos empregar ambas, as propriedades normais e as abreviações (*shorthands*) no mesmo objeto:

```js
let user = {
  name,  // o mesmo que name:name
  age: 30
};
```

## Verificação de existência

Uma particularidade notável de objetos, é que é possível aceder a qualquer propriedade. Não haverá erro se a propriedade não existir! Aceder a uma propriedade não-existente apenas retorna `undefined`. Ela, fornece uma forma muito comum de testar se a propriedade existe -- aceda, e compare o resultado com *undefined*:

```js run
let user = {};

alert( user.noSuchProperty === undefined ); // true, significa "propriedade não existente" (no such property)
```

Também existe um operador especial, `"in"`, para verificar a existência de uma propriedade.

A sintaxe é:

```js
"key" in object
```

Por exemplo:

```js run
let user = { name: "John", age: 30 };

alert( "age" in user ); // true (verdadeiro), 'user.age' existe
alert( "blabla" in user ); // false (falso), 'user.blabla' não existe
```

Por favor, note que no lado esquerdo de `in` deve existir um *nome de propriedade*. Geralmente, é uma *string* entre aspas.

Se omitirmos as aspas, isso terá o significado de uma variável contendo o atual nome a ser testado. Por exemplo:

```js run
let user = { age: 30 };

let key = "age";
alert( *!*key*/!* in user ); // true (verdadeiro), recebe o nome por meio de 'key' e procura por tal propriedade
```

````smart header="Using "in" for properties that store "undefined""
Geralmente, a comparação exata ('strict') para a verificação `"=== undefined"` funciona bem. Mas, existe um caso especial em que falha. Contudo, `"in"` funciona corretamente.

É quando uma propriedade de um objeto existe, mas possui `undefined` nela armazenado:

```js run
let obj = {
  test: undefined
};

alert( obj.test ); // exibe 'undefined', então - tal propriedade não existe?

alert( "test" in obj ); // true (verdadeiro), a propriedade na realidade existe!
```

No código acima, a propriedade `obj.test` tecnicamente existe. Deste modo, o operador `in` funciona corretamente.

Situações como esta muito raramente ocorrem, porque `undefined` não é usualmente atribuido. Em geral, empregamos `null` para valores "desconhecidos" ou "vazios". Deste modo, o operador `in` é um convidado exótico na codificação.
````

## O laço "for..in"

Para navegar por todas as chaves (*keys*) de um objeto, existe uma forma especial de laço (*loop*): `for..in`. Esta, é uma construção completamente diferente da do `for(;;)`, que estudámos antes.

A sintaxe:

```js
for (key in object) {
  // executa o corpo do laço, por cada chave (key) de entre as propriedades do objeto
}
```

Por exemplo, vamos imprimir todas propriedades de  `user`:

```js run
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // key (chave)
  alert( key );  // 'name', 'age', isAdmin'
  // valor por chave (key)
  alert( user[key] ); // John, 30, true
}
```

Note, que todas as construções "for" permitem-nos declarar a variável do laço dentro do ciclo (*loop*), como `let key` aqui.

De igual modo, poderíamos usar aqui um nome de variável differente de `key`. Por exemplo, `"for (let prop in obj)"` também é largamente utilizado.

### Ordenado como um objeto

Os objetos são ordenados? Por outras palavras, se percorrermos um objeto com um laço, será que obtemos todas as propriedades pela mesma ordem em que foram adicionadas? Poderemos confiar nisso?

A curta resposta é: "ordenados de um modo especial" - propriedades inteiras são ordenadas de forma crescente, outras aparecem na ordem em que foram criadas. Detalhes a seguir.

Como exemplo, considermos um objeto com indicativos telefónicos de países:

```js run
let codes = {
  "49": "Alemanha",
  "41": "Suíça",
  "44": "Grã Bretanha",
  // ..,
  "1": "EUA"
};

*!*
for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}
*/!*
```

O objeto, pode ser empregue como sugestão de uma lista de opções para o utilizador. Se, estivermos a construir um *site* maioritariamente para uma audiência Alemã, então provavelmente queremos `49` como o primeiro.

Mas, ao correr o código, vemos uma imagem totalmente diferente:

- EUA (1) vem em primeiro lugar,
- depois a Suiça (41), e assim por adiante.

Os indicativos telefónicos, são ordenados por ordem ascendente, porque são inteiros. Por isso, vemos `1, 41, 44, 49`.

````smart header="Integer properties? What's that?"
O termo "propriedade inteira" aqui, significa que uma *string* pode ser convertida para inteiro ('integer') e, de volta reconvertida sem qualquer alteração.

Assim, "49" é um nome de propriedade inteiro porque, ao ser transformado num número inteiro e de volta reconvertido, continua o mesmo. Mas, "+49" e "1.2" não são:

```js run
// Math.trunc é uma função incorporada (*built-in function*) que remove a parte decimal

alert( String(Math.trunc(Number("49"))) ); // "49", inalterado ⇒ propriedade inteira

alert( String(Math.trunc(Number("+49"))) ); // "49", não o mesmo que "+49" ⇒ não é uma propriedade inteira

alert( String(Math.trunc(Number("1.2"))) ); // "1", não o mesmo que "1.2" ⇒ não é uma propriedade inteira
```
````

...Por outro lado, se as chaves (*keys*) forem não-inteiras, elas são listadas segundo a ordem em que foram criadas, por exemplo:

```js run
let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // adicione mais uma propriedade

*!*
// propriedades não-inteiras são listadas segundo a ordem em que foram criadas
*/!*
for (let prop in user) {
  alert( prop ); // 'name', 'surname', 'age'
}
```

Portanto, para corrigir o problema dos indicativos telefónicos, podemos "aldrabar" tornando-os não-inteiros. Adicionar um sinal de mais `"+"`, antes de cada código é o suficiente.

Desta forma:

```js run
let codes = {
  "+49": "Alemanha",
  "+41": "Suiça",
  "+44": "Grã Bretanha",
  // ..,
  "+1": "EUA"
};

for (let code in codes) {
  alert( +code ); // 49, 41, 44, 1
}
```

Agora, funciona como pretendido.

## Cópia por referência

Uma das principais diferenças entre objetos vs primitivos, está em que os primeiros são armazenados e copiados "por referência"  (*by reference*).

Valores primitivos: *strings*, números, booleanos -- são atribuidos/copiados como "o próprio valor".

Por exemplo:

```js
let message = "Hello!";
let phrase = message;
```

Como resultado, temos duas variáveis independentes, mas cada uma armazenando a *string* (cadeia-de-carateres) `"Hello!"`.

![](variable-copy-value.svg)

Objetos não são assim.

**Uma variável não armazena o próprio objeto, mas o seu "endereço em memória" (*address in memory*), por outras palavras "uma referência" (*reference*) a ele.**

Aqui, está a imagem para o objeto:

```js
let user = {
  name: "John"
};
```

![](variable-contains-reference.svg)

Aqui, o objeto é armazenado algures na memória. E a variável `user` contém uma "referência" para ele.

**Quando uma variável com um objeto é copiada -- é a referência copiada, o objeto não é duplicado.**

Se imaginarmos um objeto como um fichário, então uma variável será uma chave (*a key*) para ele. Copiando uma variável duplica a chave (*the key*), não o próprio fichário.

Por exemplo:

```js no-beautify
let user = { name: "John" };

let admin = user; // copia a referência
```

Agora, temos duas variáveis, e cada uma com a referência para o mesmo objeto:

![](variable-copy-reference.svg)

Podemos utilizar qualquer das variáveis, para aceder ao fichário e alterar o seu conteúdo:

```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // alterado através da referência em "admin"
*/!*

alert(*!*user.name*/!*); // 'Pete', as alterações também são visíveis por meio da referência em "user"
```

O exemplo acima, demonstra que apenas existe um objecto. Como se tivéssemos um fichário com duas chaves, e usássemos uma delas (`admin`) para o aceder. E depois, se mais tarde usássemos a outra chave (`user`) poderíamos ver as alterações.

### Comparação por referência

Os operadores de igualdade `==` e de igualdade exata (*strict*) `===` para objetos funcionam exatamente da mesma forma.

**Dois objetos apenas são iguais se eles forem o mesmo objeto.**

Por exemplo, duas variáveis referenciam o mesmo objeto, elas são iguais:

```js run
let a = {};
let b = a; // cópia por referência

alert( a == b ); // true (verdadeiro), ambas as variáveis referenciam o mesmo objeto
alert( a === b ); // true (verdadeiro)
```

E aqui, dois objetos independentes não são iguais, muito embora ambos sejam vazios:

```js run
let a = {};
let b = {}; // dois objetos independentes

alert( a == b ); // false (falso)
```

Para comparações como `obj1 > obj2` ou para uma comparação com um primitivo `obj == 5`, objetos são convertidos para primitivos. Estudaremos como funciona a conversão de objetos muito em breve, mas para dizer a verdade, tais comparações são muito raramente necessárias e são geralmente o resultado de um erro de código.

### Objeto constante

Um objeto declarado com `const` *pode* ser alterado.

Por exemplo:

```js run
const user = {
  name: "John"
};

*!*
user.age = 25; // (*)
*/!*

alert(user.age); // 25
```

Parece que a linha `(*)` irá causar um erro, mas não, não há totalmente qualquer problema. Isso, porque `const` apenas fixa o valor de `user`. Então, aqui `user` armazena uma referência para um mesmo objeto pelo tempo todo. A linha `(*)` vai para *dentro* do objeto, não faz uma re-atribuição a `user`.

A `const` produzirá um erro se tentarmos colocar em `user` qualquer outra coisa, por exemplo:

```js run
const user = {
  name: "John"
};

*!*
// Erro (não é possível reatribuir a 'user')
*/!*
user = {
  name: "Pete"
};
```

...Mas, se quisermos tornar as propriedades do objeto constantes? Então, aí `user.age = 25` produzirá um erro. Isso, também é possível. Iremos cobrir isto no capítulo <info:property-descriptors>.

## Clonar e fundir, Object.assign

Portanto, a cópia de uma variável de objeto cria mais uma referência para o mesmo objeto.

Mas, se quisermos duplicar um objecto? Criar uma cópia independente, um *clone*?

Também se pode fazer, mas é um pouco mais difícil, porque não existe método incorporado (*built-in*) ao JavaScript para isso. Na verdade, isso raramente é necessário. A cópia por referência é a maior parte das vezes boa.

Mas, se realmente quisermos isto, aí precisaremos de criar um novo objeto e replicar a estrutura do existente iterando pelas suas propriedades e copiando-as, digamos num nível primitivo.

Desta forma:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // o novo objeto vazio

// copiemos todas as propriedades de 'user' para aquele
for (let key in user) {
  clone[key] = user[key];
}
*/!*

// agora,'clone' é um clone completamente independente 
clone.name = "Pete"; // altere dados nele

alert( user.name ); // contudo, ainda está 'John' no objeto original 
```

Podemos também empregar o método [Object.assign](mdn:js/Object/assign) para isso.

A sintaxe é:

```js
Object.assign(dest, [src1, src2, src3...])
```

- Os argumentos `dest`, e `src1, ..., srcN` (que podem ser tantos quantos necessários) são objetos.
- Ele copia as propriedades de todos os objects `src1, ..., srcN` para `dest`. Por outras palavras, propriedades de todos os objetos, a começar pelo segundo, são copiadas para o primeiro. Depois, ele retorna `dest`.

Por exemplo, podemos utilizá-lo para fundir vários objetos num só:
```js
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// copia todas propriedades de 'permissions1' e 'permissions2' para 'user'
Object.assign(user, permissions1, permissions2);
*/!*

// agora, user = { name: "John", canView: true, canEdit: true }
```

Se, o objeto recetor (`user`) já tiver alguma propriedade com o mesmo nome, ela será substituída (*overwritten*):

```js
let user = { name: "John" };

// substitua ('overwrite') 'nome', e adicione 'isAdmin'
Object.assign(user, { name: "Pete", isAdmin: true });

// agora, user = { name: "Pete", isAdmin: true }
```

Podemos também utilizar `Object.assign` para substituir o ciclo (*loop*) acima para uma clonagem simples:

```js
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*
```

Ele copia todas as propriedades de `user` para o objecto vazio e retorna este. Na verdade, é o mesmo laço (*loop*), mas mais curto.

Até agora, assumimos que todas as propriedades de `user` são primitivas. Mas, propriedades podem ser referências para outros objetos. O que fazer nesse caso?

Como aqui:

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

Agora, não é suficiente efetuar a cópia `clone.sizes = user.sizes`, porque `user.sizes` é um objeto, e aí seria copiado por referência. Então, `clone` e `user` iriam partilhar a mesma propriedade "*sizes*":

Deste modo:

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true (verdadeiro), é o mesmo objeto

// 'user' e 'clone' partilham 'sizes'
user.sizes.width++;       // altere uma propriedade num lugar
alert(clone.sizes.width); // 51, e verá o resultado a partir do outro
```

Para corrigir isso, deveriamos empregar o laço (*loop*) para clonagem, que examina cada valor de `user[key]` e, se for um objeto, então também replica essa estrutura. Essa, é chamada de uma "clonagem profunda" ("*deep cloning*").

Existe um algoritmo padrão (*standard*) para clonagem profunda (deep cloning), que trata tanto do caso acima como de mais complexos, chamado de [Structured cloning algorithm](http://w3c.github.io/html/infrastructure.html#safe-passing-of-structured-data) (algoritmo de clonagem de estruturas). Para não se reinventar a roda, poderemos utilizar uma implementação operacional do mesmo disponível na biblioteca (*library*) de JavaScript [lodash](https://lodash.com), o método é chamado [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).

## Sumário

Objetos são *arrays* associativos (*associative arrays*), com várias funcionalidades especiais.

Eles armazenam propriedades em pares chave-valor, onde:
- As chaves das propriedades devem ser *strings* ou símbolos (geralmente *strings*).
- Valores podem ser de qualquer tipo.

Para aceder a uma propriedade, podemos utilizar:
- A notação por ponto: `obj.property`.
- A notação por parênteses retos `obj["property"]`. Os parênteses retos permitem receber a chave de uma variável, como por exemplo `obj[varWithKey]`.

Operadores adicionais:
- Para remover uma propriedade: `delete obj.prop`.
- Para verificar se uma propriedade com uma dada chave existe: `"key" in obj`.
- Para iterar sobre um objeto: o ciclo `for (let key in obj)`.

Objetos são atribuidos e copiados por referência. Por outras palavras, uma variável não armazena o "valor do objeto", mas uma "referência" (endereço em memória) do valor. Assim, copiar tal variável ou passá-la como argumento de uma função copia tal referência, não o objeto. Todas as operações sobre cópias de referências (como adicionar/remover propriedades) são executadas sobre um mesmo único objeto.

 Para efetuar uma "verdadeira cópia" (um clone), podemos utilizar `Object.assign` ou  [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).

O que estudámos neste capítulo é o chamado "objeto simples" ("*plain object*"), ou simplesmente `Objeto`.

Existem muitos outros tipos de objetos em JavaScript:

- `Array` para armazenar coleções de dados ordenadas,
- `Date` para armazenar informação sobre data e tempo,
- `Error` para armazenar informação sobre um erro.
- ...E outros mais.

Eles têm as suas funcionalidades especiais, que estudaremos mais adiante. Por vezes, pessoas dizem algo como "o tipo
Array" ou "o tipo Data" (*Date*), mas formalmente eles não são própriamente tipos, mas pertencem a um único tipo de dados "objeto". E o extendem de várias formas.

Objetos em JavaScript são muito poderosos. Aqui, apenas tocámos na superfície de um realmente amplo tópico. Iremos, mais especificamente, trabalhar e aprender sobre objetos em futuras partes do tutorial.
